import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Debug environment variables
console.log('Supabase URL:', supabaseUrl ? 'Set' : 'NOT SET')
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Set' : 'NOT SET')

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase environment variables are not set!')
  console.error('Please create a .env.local file with your Supabase credentials:')
  console.error('VITE_SUPABASE_URL=https://your-project-id.supabase.co')
  console.error('VITE_SUPABASE_ANON_KEY=your-anon-key-here')
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Database helper functions
export const db = {
  // Salary calculations
  async saveSalaryCalculation(data) {
    const { data: result, error } = await supabase
      .from('salary_calculations')
      .insert([data])
      .select()
    
    if (error) throw error
    return result[0]
  },

  async getSalaryCalculations(userId) {
    const { data, error } = await supabase
      .from('salary_calculations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getSalaryBenchmarks(position, location, experience) {
    const { data, error } = await supabase
      .from('salary_benchmarks')
      .select('*')
      .eq('position', position)
      .eq('location', location)
      .eq('experience_level', experience)
      .order('last_updated', { ascending: false })
      .limit(1)
    
    if (error) throw error
    return data[0]
  },

  // HR Cost Analysis
  async saveHRCostAnalysis(data) {
    const { data: result, error } = await supabase
      .from('hr_cost_analysis')
      .insert([data])
      .select()
    
    if (error) throw error
    return result[0]
  },

  async getHRCostAnalysis(userId) {
    const { data, error } = await supabase
      .from('hr_cost_analysis')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Compliance Audits
  async saveComplianceAudit(data) {
    const { data: result, error } = await supabase
      .from('compliance_audits')
      .insert([data])
      .select()
    
    if (error) throw error
    return result[0]
  },

  async getComplianceAudits(userId) {
    const { data, error } = await supabase
      .from('compliance_audits')
      .select('*')
      .eq('user_id', userId)
      .order('audit_date', { ascending: false })
    
    if (error) throw error
    return data
  },

  // User Profiles removed - admin-only setup

  // User Interactions
  async trackInteraction(data) {
    try {
      const { error } = await supabase
        .from('user_interactions')
        .insert([data])
      
      if (error) throw error
    } catch (error) {
      console.error('Failed to track interaction:', error)
    }
  },

  // Leads
  async createLead(data) {
    const { data: result, error } = await supabase
      .from('leads')
      .insert([data])
      .select()
    
    if (error) throw error
    return result[0]
  },

  // AI Recommendations
  async getAIRecommendations(userId) {
    const { data, error } = await supabase
      .from('ai_recommendations')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .order('priority', { ascending: true })
    
    if (error) throw error
    return data
  },

  // Market Trends
  async getMarketTrends(metricType, industry = null) {
    let query = supabase
      .from('market_trends')
      .select('*')
      .eq('metric_type', metricType)
      .order('created_at', { ascending: false })
      .limit(10)
    
    if (industry) {
      query = query.eq('industry', industry)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return data
  },

  // Blog Posts
  async getBlogPosts(limit = 10) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  },

  async getBlogPost(slug) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    
    if (error) throw error
    return data
  },

  // Resources
  async getResources(category = null, limit = 20) {
    let query = supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (category) {
      query = query.eq('category', category)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return data
  },

  async incrementDownloadCount(resourceId) {
    try {
      const { error } = await supabase
        .from('resources')
        .update({ download_count: supabase.sql`download_count + 1` })
        .eq('id', resourceId)
      
      if (error) throw error
    } catch (error) {
      console.error('Failed to increment download count:', error)
    }
  },

  // Form Submissions
  async saveFormSubmission(data) {
    const { data: result, error } = await supabase
      .from('form_submissions')
      .insert([data])
      .select()
    
    if (error) throw error
    return result[0]
  },

  async getFormSubmissions(userId, limit = 50) {
    const { data, error } = await supabase
      .from('form_submissions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  },

  async getFormSubmissionsByType(formType, limit = 100) {
    const { data, error } = await supabase
      .from('form_submissions')
      .select('*')
      .eq('form_type', formType)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  },

  async updateFormSubmissionStatus(submissionId, status) {
    const { data, error } = await supabase
      .from('form_submissions')
      .update({ status })
      .eq('id', submissionId)
      .select()
    
    if (error) throw error
    return data[0]
  },

  async getFormSubmissionStats() {
    const { data, error } = await supabase
      .from('form_submissions')
      .select('form_type, status, created_at')
    
    if (error) throw error
    
    // Process stats
    const stats = {
      total: data.length,
      byType: {},
      byStatus: {},
      recent: data.filter(item => {
        const date = new Date(item.created_at)
        const now = new Date()
        return (now - date) < (7 * 24 * 60 * 60 * 1000) // Last 7 days
      }).length
    }
    
    data.forEach(item => {
      // Count by form type
      stats.byType[item.form_type] = (stats.byType[item.form_type] || 0) + 1
      // Count by status
      stats.byStatus[item.status] = (stats.byStatus[item.status] || 0) + 1
    })
    
    return stats
  }
}

// Real-time subscriptions
export const subscribeToChanges = (table, callback) => {
  return supabase
    .channel(`${table}_changes`)
    .on('postgres_changes', 
      { event: '*', schema: 'public', table }, 
      callback
    )
    .subscribe()
}

// Authentication helpers
export const auth = {
  // signUp removed - admin-only setup

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  async resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
  },

  async updatePassword(newPassword) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })
    if (error) throw error
  }
}

// Analytics helpers temporarily disabled
// TODO: Re-enable analytics tracking after form submission is working properly

// Form submission helpers
export const formSubmission = {
  // Unified form submission function
  async submitForm(formData, formType = 'general') {
    try {
      console.log('Starting form submission for type:', formType, 'with data:', formData);
      
      // Get current user if available
      const { data: { user } } = await supabase.auth.getUser();
      
      // Prepare form submission data for Supabase
      const submissionData = {
        user_id: user?.id || null,
        form_type: formType,
        form_data: {
          name: formData.name || formData.firstname + ' ' + formData.lastname || '',
          email: formData.email,
          phone: formData.phone || '',
          company: formData.company || '',
          designation: formData.designation || formData.jobtitle || '',
          service_interest: formData.service || formData.service_interest || '',
          lead_source: formData.source || formData.lead_source || formType,
          message: formData.message || '',
          additional_data: formData
        },
        status: 'new',
        created_at: new Date().toISOString()
      };

      console.log('Submitting to Supabase:', submissionData);

      // Save to Supabase form_submissions table
      console.log('About to insert into form_submissions table...');
      
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 10000); // 10 second timeout
      });
      
      const insertPromise = supabase
        .from('form_submissions')
        .insert([submissionData])
        .select()
        .single();
      
      const { data: supabaseSubmission, error: supabaseError } = await Promise.race([
        insertPromise,
        timeoutPromise
      ]);

      console.log('Insert operation completed. Data:', supabaseSubmission, 'Error:', supabaseError);

      if (supabaseError) {
        console.error('Supabase form submission save error:', supabaseError);
        console.error('Error details:', {
          message: supabaseError.message,
          code: supabaseError.code,
          details: supabaseError.details,
          hint: supabaseError.hint
        });
        throw supabaseError;
      }

      console.log('Supabase submission successful:', supabaseSubmission);

      // HubSpot is only used for analytics/tracking, not for saving leads/forms
      // All data is saved to Supabase only

      // Analytics tracking temporarily disabled to fix form submission issues
      // TODO: Re-enable analytics tracking after form submission is working properly

      console.log('Form submission completed successfully');
      return {
        success: true,
        submission_id: supabaseSubmission.id,
        message: 'Form submitted successfully'
      };

    } catch (error) {
      console.error('Form submission error:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Form submission failed';
      
      if (error.message.includes('row-level security policy')) {
        errorMessage = 'Access denied. Please try again.';
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Request timed out. Please try again.';
      } else {
        errorMessage = error.message || 'An unexpected error occurred.';
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }
  },

  // Specific form type handlers
  async submitContactForm(formData) {
    return this.submitForm(formData, 'contact');
  },

  async submitNewsletterForm(formData) {
    return this.submitForm(formData, 'newsletter');
  },

  async submitCalculatorForm(formData, calculatorType) {
    return this.submitForm(formData, `calculator_${calculatorType}`);
  },

  async submitBrochureForm(formData, serviceName) {
    console.log('submitBrochureForm called with:', { formData, serviceName });
    const result = await this.submitForm({
      ...formData,
      service: serviceName,
      source: 'Brochure Download'
    }, 'brochure_download');
    console.log('submitBrochureForm result:', result);
    return result;
  },

  async submitResourceForm(formData, resourceType) {
    return this.submitForm({
      ...formData,
      service: resourceType,
      source: 'Resource Download'
    }, 'resource_download');
  },

  async submitServiceInquiryForm(formData, serviceName) {
    return this.submitForm({
      ...formData,
      service: serviceName,
      source: 'Service Inquiry'
    }, 'service_inquiry');
  },

  async submitGDPRForm(formData) {
    return this.submitForm({
      ...formData,
      source: 'GDPR Request'
    }, 'gdpr_request');
  }
}

export default supabase 