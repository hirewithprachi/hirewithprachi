import { supabase } from '../lib/supabase';

export class BlogService {
  static async createBlogPost(postData) {
    try {
      // Generate slug if not provided
      if (!postData.slug) {
        postData.slug = postData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }

      // Ensure slug is unique
      const { data: existingPost } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', postData.slug)
        .single();

      if (existingPost) {
        postData.slug = `${postData.slug}-${Date.now()}`;
      }

      // Set published_at if status is published
      if (postData.status === 'published' && !postData.published_at) {
        postData.published_at = new Date().toISOString();
      }

      // Insert the blog post - only include columns that exist in the database schema
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([{
          title: postData.title,
          slug: postData.slug,
          content: postData.content,
          excerpt: postData.excerpt || this.generateExcerpt(postData.content),
          category: postData.category,
          tags: postData.tags || [],
          featured_image_url: postData.featured_image_url,
          status: postData.status || 'draft',
          published_at: postData.published_at,
          related_services: postData.related_services || [],
          author_id: postData.author_id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      console.log('Blog post created successfully:', data);
      return { success: true, data };

    } catch (error) {
      console.error('Error creating blog post:', error);
      
      // Fallback: save to localStorage for offline functionality
      const localPosts = JSON.parse(localStorage.getItem('offline_blog_posts') || '[]');
      const newPost = {
        id: `local_${Date.now()}`,
        ...postData,
        slug: postData.slug || this.generateSlug(postData.title),
        excerpt: postData.excerpt || this.generateExcerpt(postData.content),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        offline: true
      };
      
      localPosts.push(newPost);
      localStorage.setItem('offline_blog_posts', JSON.stringify(localPosts));
      
      return { 
        success: true, 
        data: newPost,
        offline: true,
        message: 'Post saved locally (database unavailable)' 
      };
    }
  }

  static async updateBlogPost(id, updates) {
    try {
      // Filter out non-existent columns from the database schema
      const { 
        meta_title, 
        meta_description, 
        meta_keywords,
        allow_comments, 
        is_featured, 
        custom_fields,
        author_name,
        author_bio,
        seo_keywords,
        schema_markup,
        social_media_image,
        reading_time,
        // related_services column now exists in schema
        ...validUpdates 
      } = updates;

      validUpdates.updated_at = new Date().toISOString();
      
      // If status changed to published, set published_at
      if (validUpdates.status === 'published' && !validUpdates.published_at) {
        validUpdates.published_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .update(validUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };

    } catch (error) {
      console.error('Error updating blog post:', error);
      
      // Fallback: update localStorage
      const localPosts = JSON.parse(localStorage.getItem('offline_blog_posts') || '[]');
      const index = localPosts.findIndex(post => post.id === id);
      
      if (index !== -1) {
        localPosts[index] = { ...localPosts[index], ...updates };
        localStorage.setItem('offline_blog_posts', JSON.stringify(localPosts));
        
        return { 
          success: true, 
          data: localPosts[index],
          offline: true,
          message: 'Post updated locally (database unavailable)' 
        };
      }
      
      throw error;
    }
  }

  static async deleteBlogPost(id) {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return { success: true };

    } catch (error) {
      console.error('Error deleting blog post:', error);
      
      // Fallback: remove from localStorage
      const localPosts = JSON.parse(localStorage.getItem('offline_blog_posts') || '[]');
      const filteredPosts = localPosts.filter(post => post.id !== id);
      localStorage.setItem('offline_blog_posts', JSON.stringify(filteredPosts));
      
      return { 
        success: true,
        offline: true,
        message: 'Post deleted locally (database unavailable)' 
      };
    }
  }

  static async getAllBlogPosts(options = {}) {
    try {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (options.status) {
        query = query.eq('status', options.status);
      }

      if (options.category) {
        query = query.eq('category', options.category);
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Merge with offline posts
      const localPosts = JSON.parse(localStorage.getItem('offline_blog_posts') || '[]');
      const allPosts = [...(data || []), ...localPosts];

      // Sort by created_at
      allPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      return { success: true, data: allPosts };

    } catch (error) {
      console.error('Error fetching blog posts:', error);
      
      // Fallback: return only localStorage posts
      const localPosts = JSON.parse(localStorage.getItem('offline_blog_posts') || '[]');
      return { 
        success: true, 
        data: localPosts,
        offline: true,
        message: 'Showing offline posts only (database unavailable)' 
      };
    }
  }

  static async getBlogPostBySlug(slug) {
    try {
      console.log('🔍 BlogService: Getting blog post by slug:', slug);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

      console.log('🔍 BlogService: Supabase response - data:', data, 'error:', error);

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        console.log('🔍 BlogService: Found blog post:', data.title);
        return { success: true, data };
      }

      // Check localStorage
      const localPosts = JSON.parse(localStorage.getItem('offline_blog_posts') || '[]');
      const localPost = localPosts.find(post => post.slug === slug);

      if (localPost) {
        return { 
          success: true, 
          data: localPost,
          offline: true 
        };
      }

      return { success: false, error: 'Post not found' };

    } catch (error) {
      console.error('Error fetching blog post:', error);
      return { success: false, error: error.message };
    }
  }

  static async incrementViewCount(id) {
    try {
      await supabase.rpc('increment_blog_views', { blog_id: id });
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  }

  static generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  static generateExcerpt(content, maxLength = 200) {
    // Strip HTML tags and get plain text
    const textContent = content.replace(/<[^>]*>/g, '').trim();
    
    if (textContent.length <= maxLength) {
      return textContent;
    }

    // Find the last complete word within the limit
    const truncated = textContent.substring(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    
    return lastSpaceIndex > 0 
      ? truncated.substring(0, lastSpaceIndex) + '...' 
      : truncated + '...';
  }

  static async searchBlogPosts(searchTerm, options = {}) {
    try {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%`)
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (options.category) {
        query = query.eq('category', options.category);
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      if (error) throw error;

      return { success: true, data: data || [] };

    } catch (error) {
      console.error('Error searching blog posts:', error);
      
      // Fallback: search localStorage
      const localPosts = JSON.parse(localStorage.getItem('offline_blog_posts') || '[]');
      const filteredPosts = localPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      return { 
        success: true, 
        data: filteredPosts,
        offline: true 
      };
    }
  }

  static getCategories() {
    return [
      'HR Strategy',
      'Recruitment',
      'Employee Engagement',
      'Compliance',
      'Performance Management',
      'Payroll',
      'Benefits',
      'Training & Development',
      'Leadership',
      'Culture',
      'Remote Work',
      'Technology'
    ];
  }

  static getServices() {
    return [
      { id: 'virtual-hr-management', name: 'Virtual HR Management' },
      { id: 'hr-compliance', name: 'HR Compliance' },
      { id: 'payroll-management', name: 'Payroll Management' },
      { id: 'recruitment-service', name: 'Recruitment Service' },
      { id: 'performance-management', name: 'Performance Management' },
      { id: 'employee-engagement', name: 'Employee Engagement' },
      { id: 'hr-audit', name: 'HR Audit' },
      { id: 'mumbai', name: 'HR Services Mumbai' },
      { id: 'delhi', name: 'HR Services Delhi' },
      { id: 'bangalore', name: 'HR Services Bangalore' },
      { id: 'hyderabad', name: 'HR Services Hyderabad' },
      { id: 'chennai', name: 'HR Services Chennai' },
      { id: 'pune', name: 'HR Services Pune' },
      { id: 'kolkata', name: 'HR Services Kolkata' },
      { id: 'ahmedabad', name: 'HR Services Ahmedabad' },
      { id: 'jaipur', name: 'HR Services Jaipur' },
      { id: 'lucknow', name: 'HR Services Lucknow' },
      { id: 'indore', name: 'HR Services Indore' },
      { id: 'nagpur', name: 'HR Services Nagpur' },
      { id: 'bhubaneswar', name: 'HR Services Bhubaneswar' },
      { id: 'coimbatore', name: 'HR Services Coimbatore' }
    ];
  }
}

export default BlogService;
