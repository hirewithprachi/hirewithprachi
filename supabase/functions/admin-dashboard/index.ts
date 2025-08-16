import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const { method, url } = req
    const urlObj = new URL(url)
    const path = urlObj.pathname.split('/').pop()
    const searchParams = urlObj.searchParams

    // Verify admin access
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if user has admin role by querying the users table
    console.log('Checking admin access for user:', user.id, user.email)
    
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    console.log('User profile query result:', { userProfile, profileError })

    if (profileError) {
      console.log('Profile error:', profileError)
      return new Response(
        JSON.stringify({ error: 'User profile not found', details: profileError.message }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!userProfile) {
      console.log('No user profile found for ID:', user.id)
      return new Response(
        JSON.stringify({ error: 'User profile not found' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (userProfile.role !== 'admin') {
      console.log('User role is not admin:', userProfile.role)
      return new Response(
        JSON.stringify({ error: 'Admin access required', userRole: userProfile.role }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Admin access granted for user:', user.id)

    // Route handling
    switch (method) {
      case 'GET':
        return await handleGet(supabase, path, searchParams)
      case 'POST':
        return await handlePost(supabase, req, path)
      case 'PUT':
        return await handlePut(supabase, req, path)
      case 'DELETE':
        return await handleDelete(supabase, path)
      default:
        return new Response(
          JSON.stringify({ error: 'Method not allowed' }),
          { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function handleGet(supabase: any, path: string, searchParams: URLSearchParams) {
  switch (path) {
    case 'dashboard-stats':
      return await getDashboardStats(supabase)
    case 'leads':
      return await getLeads(supabase, searchParams)
    case 'users':
      return await getUsers(supabase, searchParams)
    case 'blog-posts':
      return await getBlogPosts(supabase, searchParams)
    case 'services':
      return await getServices(supabase, searchParams)
    case 'analytics':
      return await getAnalytics(supabase, searchParams)
    case 'files':
      return await getFiles(supabase, searchParams)
    default:
      return new Response(
        JSON.stringify({ error: 'Endpoint not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
  }
}

async function handlePost(supabase: any, req: Request, path: string) {
  const body = await req.json()
  
  switch (path) {
    case 'leads':
      return await createLead(supabase, body)
    case 'users':
      return await createUser(supabase, body)
    case 'blog-posts':
      return await createBlogPost(supabase, body)
    case 'services':
      return await createService(supabase, body)
    case 'files':
      return await createFile(supabase, body)
    default:
      return new Response(
        JSON.stringify({ error: 'Endpoint not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
  }
}

async function handlePut(supabase: any, req: Request, path: string) {
  const body = await req.json()
  const id = path.split('/')[1]
  
  switch (path.split('/')[0]) {
    case 'leads':
      return await updateLead(supabase, id, body)
    case 'users':
      return await updateUser(supabase, id, body)
    case 'blog-posts':
      return await updateBlogPost(supabase, id, body)
    case 'services':
      return await updateService(supabase, id, body)
    case 'files':
      return await updateFile(supabase, id, body)
    default:
      return new Response(
        JSON.stringify({ error: 'Endpoint not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
  }
}

async function handleDelete(supabase: any, path: string) {
  const id = path.split('/')[1]
  
  switch (path.split('/')[0]) {
    case 'leads':
      return await deleteLead(supabase, id)
    case 'users':
      return await deleteUser(supabase, id)
    case 'blog-posts':
      return await deleteBlogPost(supabase, id)
    case 'services':
      return await deleteService(supabase, id)
    case 'files':
      return await deleteFile(supabase, id)
    default:
      return new Response(
        JSON.stringify({ error: 'Endpoint not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
  }
}

// Dashboard Statistics
async function getDashboardStats(supabase: any) {
  try {
    // Get total leads
    const { count: totalLeads } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })

    // Get recent leads (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const { count: recentLeads } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo.toISOString())

    // Get total users
    const { count: totalUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })

    // Get blog posts
    const { count: totalPosts } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })

    // Get conversion rate (leads with status 'converted')
    const { count: convertedLeads } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'converted')

    const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : '0.0'

    // Get recent activity
    const { data: recentActivity } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    const stats = {
      totalLeads,
      recentLeads,
      totalUsers,
      totalPosts,
      conversionRate,
      recentActivity
    }

    return new Response(
      JSON.stringify({ data: stats }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch dashboard stats' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

// Leads Management
async function getLeads(supabase: any, searchParams: URLSearchParams) {
  try {
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    let query = supabase
      .from('leads')
      .select('*', { count: 'exact' })

    if (status) {
      query = query.eq('status', status)
    }

    if (search) {
      query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`)
    }

    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)

    if (error) throw error

    return new Response(
      JSON.stringify({ 
        data, 
        pagination: { 
          page, 
          limit, 
          total: count,
          totalPages: Math.ceil((count || 0) / limit)
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch leads' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

async function createLead(supabase: any, body: any) {
  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([body])
      .select()
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify({ data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to create lead' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

async function updateLead(supabase: any, id: string, body: any) {
  try {
    const { data, error } = await supabase
      .from('leads')
      .update(body)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify({ data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to update lead' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

async function deleteLead(supabase: any, id: string) {
  try {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id)

    if (error) throw error

    return new Response(
      JSON.stringify({ message: 'Lead deleted successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to delete lead' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

// Users Management
async function getUsers(supabase: any, searchParams: URLSearchParams) {
  try {
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const role = searchParams.get('role')

    let query = supabase
      .from('users')
      .select('id, email, first_name, last_name, role, company, position, is_active, created_at', { count: 'exact' })

    if (role) {
      query = query.eq('role', role)
    }

    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)

    if (error) throw error

    return new Response(
      JSON.stringify({ 
        data, 
        pagination: { 
          page, 
          limit, 
          total: count,
          totalPages: Math.ceil((count || 0) / limit)
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch users' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

async function createUser(supabase: any, body: any) {
  try {
    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: body.email,
      password: body.password,
      email_confirm: true
    })

    if (authError) throw authError

    // Create user profile
    const { data, error } = await supabase
      .from('users')
      .insert([{
        id: authData.user.id,
        email: body.email,
        first_name: body.first_name,
        last_name: body.last_name,
        role: body.role || 'client',
        company: body.company,
        position: body.position,
        phone: body.phone
      }])
      .select()
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify({ data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to create user' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

async function updateUser(supabase: any, id: string, body: any) {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(body)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify({ data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to update user' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

async function deleteUser(supabase: any, id: string) {
  try {
    // Delete from Supabase Auth
    const { error: authError } = await supabase.auth.admin.deleteUser(id)
    if (authError) throw authError

    // Delete from users table
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)

    if (error) throw error

    return new Response(
      JSON.stringify({ message: 'User deleted successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to delete user' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

// Blog Posts Management
async function getBlogPosts(supabase: any, searchParams: URLSearchParams) {
  try {
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')

    let query = supabase
      .from('blog_posts')
      .select('*', { count: 'exact' })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)

    if (error) throw error

    return new Response(
      JSON.stringify({ 
        data, 
        pagination: { 
          page, 
          limit, 
          total: count,
          totalPages: Math.ceil((count || 0) / limit)
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch blog posts' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

async function createBlogPost(supabase: any, body: any) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([body])
      .select()
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify({ data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to create blog post' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

async function updateBlogPost(supabase: any, id: string, body: any) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(body)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify({ data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to update blog post' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

async function deleteBlogPost(supabase: any, id: string) {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) throw error

    return new Response(
      JSON.stringify({ message: 'Blog post deleted successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to delete blog post' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

// Services Management
async function getServices(supabase: any, searchParams: URLSearchParams) {
  try {
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const { data, count, error } = await supabase
      .from('services')
      .select('*', { count: 'exact' })
      .order('sort_order', { ascending: true })
      .range((page - 1) * limit, page * limit - 1)

    if (error) throw error

    return new Response(
      JSON.stringify({ 
        data, 
        pagination: { 
          page, 
          limit, 
          total: count,
          totalPages: Math.ceil((count || 0) / limit)
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch services' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

async function createService(supabase: any, body: any) {
  try {
    const { data, error } = await supabase
      .from('services')
      .insert([body])
      .select()
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify({ data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to create service' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

async function updateService(supabase: any, id: string, body: any) {
  try {
    const { data, error } = await supabase
      .from('services')
      .update(body)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify({ data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to update service' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

async function deleteService(supabase: any, id: string) {
  try {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id)

    if (error) throw error

    return new Response(
      JSON.stringify({ message: 'Service deleted successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to delete service' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

// Analytics
async function getAnalytics(supabase: any, searchParams: URLSearchParams) {
  try {
    const period = searchParams.get('period') || '30' // days
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - parseInt(period))

    // Lead analytics
    const { data: leadData } = await supabase
      .from('leads')
      .select('created_at, status')
      .gte('created_at', startDate.toISOString())

    // Calculate lead conversion rate
    const totalLeads = leadData?.length || 0
    const convertedLeads = leadData?.filter(lead => lead.status === 'converted').length || 0
    const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : '0.0'

    // Blog analytics
    const { data: blogData } = await supabase
      .from('blog_posts')
      .select('view_count, created_at')
      .gte('created_at', startDate.toISOString())

    const totalViews = blogData?.reduce((sum, post) => sum + (post.view_count || 0), 0) || 0

    // Calculator usage
    const { data: calculatorData } = await supabase
      .from('calculator_sessions')
      .select('created_at')
      .gte('created_at', startDate.toISOString())

    const analytics = {
      period,
      leads: {
        total: totalLeads,
        converted: convertedLeads,
        conversionRate: parseFloat(conversionRate)
      },
      blog: {
        totalViews,
        posts: blogData?.length || 0
      },
      calculators: {
        totalUsage: calculatorData?.length || 0
      }
    }

    return new Response(
      JSON.stringify({ data: analytics }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch analytics' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

// Files Management
async function getFiles(supabase: any, searchParams: URLSearchParams) {
  try {
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const { data, count, error } = await supabase
      .from('downloads')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)

    if (error) throw error

    return new Response(
      JSON.stringify({ 
        data, 
        pagination: { 
          page, 
          limit, 
          total: count,
          totalPages: Math.ceil((count || 0) / limit)
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch files' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

async function createFile(supabase: any, body: any) {
  try {
    const { data, error } = await supabase
      .from('downloads')
      .insert([body])
      .select()
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify({ data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to create file record' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

async function updateFile(supabase: any, id: string, body: any) {
  try {
    const { data, error } = await supabase
      .from('downloads')
      .update(body)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify({ data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to update file' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

async function deleteFile(supabase: any, id: string) {
  try {
    const { error } = await supabase
      .from('downloads')
      .delete()
      .eq('id', id)

    if (error) throw error

    return new Response(
      JSON.stringify({ message: 'File deleted successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to delete file' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}
