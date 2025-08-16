import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

interface BlogPost {
  id?: string
  title: string
  content: string
  excerpt: string
  slug: string
  status: 'draft' | 'published' | 'archived'
  author_id: string
  tags: string[]
  meta_title?: string
  meta_description?: string
  featured_image?: string
  published_at?: string
  created_at?: string
  updated_at?: string
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const { method } = req

    // Get user token for authentication
    const authHeader = req.headers.get('Authorization')
    let userId: string | null = null
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '')
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser(token)
        if (!authError && user) {
          userId = user.id
        }
      } catch (error) {
        console.log('Auth error:', error.message)
      }
    }

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if user is admin
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single()

    if (profileError || userProfile?.role !== 'admin') {
      return new Response(
        JSON.stringify({ error: 'Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const url = new URL(req.url)
    const pathSegments = url.pathname.split('/').filter(Boolean)
    const postId = pathSegments[pathSegments.length - 1]

    switch (method) {
      case 'GET':
        if (postId && postId !== 'blog-management') {
          // Get specific blog post
          return await getBlogPost(supabase, postId)
        } else {
          // Get all blog posts
          return await getBlogPosts(supabase, url.searchParams)
        }

      case 'POST':
        // Create new blog post
        return await createBlogPost(supabase, userId, await req.json())

      case 'PUT':
        if (postId && postId !== 'blog-management') {
          // Update blog post
          return await updateBlogPost(supabase, postId, await req.json())
        } else {
          return new Response(
            JSON.stringify({ error: 'Post ID required for update' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

      case 'DELETE':
        if (postId && postId !== 'blog-management') {
          // Delete blog post
          return await deleteBlogPost(supabase, postId)
        } else {
          return new Response(
            JSON.stringify({ error: 'Post ID required for deletion' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

      default:
        return new Response(
          JSON.stringify({ error: 'Method not allowed' }),
          { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }

  } catch (error) {
    console.error('Blog management error:', error)
    return new Response(
      JSON.stringify({ error: 'Operation failed', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function getBlogPosts(supabase: any, searchParams: URLSearchParams) {
  const status = searchParams.get('status')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const offset = (page - 1) * limit

  let query = supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (status && status !== 'all') {
    query = query.eq('status', status)
  }

  const { data: posts, error, count } = await query

  if (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch blog posts', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  return new Response(
    JSON.stringify({
      success: true,
      posts,
      pagination: {
        page,
        limit,
        total: count || posts.length,
        hasMore: posts.length === limit
      }
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function getBlogPost(supabase: any, postId: string) {
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      author:users!blog_posts_author_id_fkey(first_name, last_name, email)
    `)
    .eq('id', postId)
    .single()

  if (error) {
    return new Response(
      JSON.stringify({ error: 'Blog post not found', details: error.message }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  return new Response(
    JSON.stringify({ success: true, post }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function createBlogPost(supabase: any, userId: string, postData: BlogPost) {
  // Validate required fields
  if (!postData.title || !postData.content) {
    return new Response(
      JSON.stringify({ error: 'Title and content are required' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  // Generate slug from title
  const slug = postData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  const newPost = {
    ...postData,
    author_id: userId,
    slug,
    status: postData.status || 'draft',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  const { data: post, error } = await supabase
    .from('blog_posts')
    .insert([newPost])
    .select()
    .single()

  if (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to create blog post', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  return new Response(
    JSON.stringify({ success: true, post }),
    { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function updateBlogPost(supabase: any, postId: string, postData: Partial<BlogPost>) {
  // Check if post exists
  const { data: existingPost, error: fetchError } = await supabase
    .from('blog_posts')
    .select('id, title')
    .eq('id', postId)
    .single()

  if (fetchError) {
    return new Response(
      JSON.stringify({ error: 'Blog post not found' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  // Generate new slug if title changed
  let slug = existingPost.slug
  if (postData.title && postData.title !== existingPost.title) {
    slug = postData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const updateData = {
    ...postData,
    slug,
    updated_at: new Date().toISOString()
  }

  // Set published_at if status is changing to published
  if (postData.status === 'published') {
    const { data: currentPost } = await supabase
      .from('blog_posts')
      .select('published_at')
      .eq('id', postId)
      .single()

    if (!currentPost?.published_at) {
      updateData.published_at = new Date().toISOString()
    }
  }

  const { data: post, error } = await supabase
    .from('blog_posts')
    .update(updateData)
    .eq('id', postId)
    .select()
    .single()

  if (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to update blog post', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  return new Response(
    JSON.stringify({ success: true, post }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function deleteBlogPost(supabase: any, postId: string) {
  // Check if post exists
  const { data: existingPost, error: fetchError } = await supabase
    .from('blog_posts')
    .select('id')
    .eq('id', postId)
    .single()

  if (fetchError) {
    return new Response(
      JSON.stringify({ error: 'Blog post not found' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', postId)

  if (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to delete blog post', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  return new Response(
    JSON.stringify({ success: true, message: 'Blog post deleted successfully' }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}
