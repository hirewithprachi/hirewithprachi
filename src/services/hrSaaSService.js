// HR SaaS Business Platform Service
// Core service for managing HR tools, user interactions, and business logic

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export class HRSaaSService {
  
  // =============================================
  // User Management
  // =============================================

  static async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      if (!user) return { success: false, error: 'No authenticated user' };
      
      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('hr_user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (profileError) throw profileError;
      
      return { 
        success: true, 
        user: { ...user, profile } 
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      return { success: false, error: error.message };
    }
  }

  static async updateUserProfile(updates) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      const { data, error: updateError } = await supabase
        .from('hr_user_profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();
      
      if (updateError) throw updateError;
      
      return { success: true, profile: data };
    } catch (error) {
      console.error('Error updating user profile:', error);
      return { success: false, error: error.message };
    }
  }

  static async getUserUsage() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      const { data: profile, error: profileError } = await supabase
        .from('hr_user_profiles')
        .select('subscription_plan, monthly_document_limit, documents_used_this_month, total_documents_created')
        .eq('user_id', user.id)
        .single();
      
      if (profileError) throw profileError;
      
      return { 
        success: true, 
        usage: {
          plan: profile.subscription_plan,
          limit: profile.monthly_document_limit,
          used: profile.documents_used_this_month,
          total: profile.total_documents_created,
          remaining: profile.monthly_document_limit === -1 ? -1 : profile.monthly_document_limit - profile.documents_used_this_month
        }
      };
    } catch (error) {
      console.error('Error getting user usage:', error);
      return { success: false, error: error.message };
    }
  }

  // =============================================
  // HR Tools Management
  // =============================================

  static async getToolCategories() {
    try {
      const { data, error } = await supabase
        .from('hr_tool_categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      
      return { success: true, categories: data };
    } catch (error) {
      console.error('Error getting tool categories:', error);
      return { success: false, error: error.message };
    }
  }

  static async getTools(categorySlug = null, limit = 20) {
    try {
      let query = supabase
        .from('hr_tools')
        .select(`
          *,
          hr_tool_categories(name, slug, icon, color)
        `)
        .eq('status', 'published')
        .order('usage_count', { ascending: false })
        .limit(limit);
      
      if (categorySlug) {
        query = query.eq('hr_tool_categories.slug', categorySlug);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      
      return { success: true, tools: data };
    } catch (error) {
      console.error('Error getting tools:', error);
      return { success: false, error: error.message };
    }
  }

  static async getToolBySlug(slug) {
    try {
      const { data, error } = await supabase
        .from('hr_tools')
        .select(`
          *,
          hr_tool_categories(name, slug, icon, color),
          document_templates(id, name, description, template_type, is_premium, price_inr)
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .single();
      
      if (error) throw error;
      
      return { success: true, tool: data };
    } catch (error) {
      console.error('Error getting tool:', error);
      return { success: false, error: error.message };
    }
  }

  static async getPopularTools(limit = 6) {
    try {
      const { data, error } = await supabase
        .from('hr_tools')
        .select(`
          *,
          hr_tool_categories(name, slug, icon, color)
        `)
        .eq('status', 'published')
        .eq('is_popular', true)
        .order('usage_count', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      
      return { success: true, tools: data };
    } catch (error) {
      console.error('Error getting popular tools:', error);
      return { success: false, error: error.message };
    }
  }

  // =============================================
  // Document Generation & Management
  // =============================================

  static async createDocument(toolId, inputData, title) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      // Check user usage limits
      const usageResult = await this.getUserUsage();
      if (!usageResult.success) throw new Error(usageResult.error);
      
      if (usageResult.usage.remaining === 0) {
        return { 
          success: false, 
          error: 'Document limit reached. Please upgrade your plan.',
          requiresUpgrade: true 
        };
      }
      
      // Create document record
      const { data: document, error: docError } = await supabase
        .from('user_documents')
        .insert({
          user_id: user.id,
          tool_id: toolId,
          title: title,
          document_type: 'generated',
          input_data: inputData,
          status: 'processing',
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
        })
        .select()
        .single();
      
      if (docError) throw docError;
      
      // Track usage
      await this.trackToolUsage(toolId, document.id, 'start');
      
      return { success: true, document };
    } catch (error) {
      console.error('Error creating document:', error);
      return { success: false, error: error.message };
    }
  }

  static async updateDocumentStatus(documentId, status, outputFileUrl = null) {
    try {
      const updates = {
        status,
        processing_time_seconds: status === 'completed' ? Math.floor(Math.random() * 30) + 5 : null
      };
      
      if (outputFileUrl) {
        updates.output_file_url = outputFileUrl;
        updates.file_size_bytes = Math.floor(Math.random() * 1000000) + 50000; // Mock file size
      }
      
      const { data, error } = await supabase
        .from('user_documents')
        .update(updates)
        .eq('id', documentId)
        .select()
        .single();
      
      if (error) throw error;
      
      // Track completion
      if (status === 'completed') {
        await this.trackToolUsage(data.tool_id, documentId, 'complete');
      }
      
      return { success: true, document: data };
    } catch (error) {
      console.error('Error updating document status:', error);
      return { success: false, error: error.message };
    }
  }

  static async getUserDocuments(limit = 20) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      const { data, error: docsError } = await supabase
        .from('user_documents')
        .select(`
          *,
          hr_tools(name, slug, hr_tool_categories(name, icon))
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (docsError) throw docsError;
      
      return { success: true, documents: data };
    } catch (error) {
      console.error('Error getting user documents:', error);
      return { success: false, error: error.message };
    }
  }

  static async downloadDocument(documentId) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      // Get document
      const { data: document, error: docError } = await supabase
        .from('user_documents')
        .select('*')
        .eq('id', documentId)
        .eq('user_id', user.id)
        .single();
      
      if (docError) throw docError;
      
      if (document.status !== 'completed') {
        return { success: false, error: 'Document not ready for download' };
      }
      
      // Update download count
      await supabase
        .from('user_documents')
        .update({
          download_count: document.download_count + 1,
          last_downloaded_at: new Date().toISOString()
        })
        .eq('id', documentId);
      
      // Track download
      await this.trackToolUsage(document.tool_id, documentId, 'download');
      
      return { success: true, document };
    } catch (error) {
      console.error('Error downloading document:', error);
      return { success: false, error: error.message };
    }
  }

  // =============================================
  // Subscription & Payment Management
  // =============================================

  static async getSubscriptionPlans() {
    try {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('price_inr', { ascending: true });
      
      if (error) throw error;
      
      return { success: true, plans: data };
    } catch (error) {
      console.error('Error getting subscription plans:', error);
      return { success: false, error: error.message };
    }
  }

  static async getUserSubscription() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      const { data, error: subError } = await supabase
        .from('user_subscriptions')
        .select(`
          *,
          subscription_plans(name, slug, price_inr, features)
        `)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();
      
      if (subError && subError.code !== 'PGRST116') throw subError; // PGRST116 = no rows returned
      
      return { success: true, subscription: data };
    } catch (error) {
      console.error('Error getting user subscription:', error);
      return { success: false, error: error.message };
    }
  }

  static async createPaymentOrder(amount, description, metadata = {}) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      // Create payment transaction record
      const { data: transaction, error: transError } = await supabase
        .from('payment_transactions')
        .insert({
          user_id: user.id,
          transaction_type: 'one_time',
          amount_inr: amount,
          description: description,
          status: 'pending',
          metadata: metadata
        })
        .select()
        .single();
      
      if (transError) throw transError;
      
      return { success: true, transaction };
    } catch (error) {
      console.error('Error creating payment order:', error);
      return { success: false, error: error.message };
    }
  }

  // =============================================
  // Analytics & Tracking
  // =============================================

  static async trackToolUsage(toolId, documentId, actionType) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) return; // Don't fail if user not authenticated
      
      await supabase
        .from('tool_usage_analytics')
        .insert({
          user_id: user?.id,
          tool_id: toolId,
          document_id: documentId,
          action_type: actionType,
          session_id: this.getSessionId(),
          user_agent: navigator.userAgent,
          metadata: { timestamp: new Date().toISOString() }
        });
    } catch (error) {
      console.error('Error tracking tool usage:', error);
    }
  }

  static async trackUserBehavior(eventType, eventData) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) return; // Don't fail if user not authenticated
      
      await supabase
        .from('user_behavior_analytics')
        .insert({
          user_id: user?.id,
          event_type: eventType,
          event_data: eventData,
          session_id: this.getSessionId(),
          page_url: window.location.href,
          user_agent: navigator.userAgent
        });
    } catch (error) {
      console.error('Error tracking user behavior:', error);
    }
  }

  static getSessionId() {
    let sessionId = sessionStorage.getItem('hr_saas_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('hr_saas_session_id', sessionId);
    }
    return sessionId;
  }

  // =============================================
  // AI Content Generation
  // =============================================

  static async generateContent(toolId, inputData, templateName = null) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      // Create AI generation request
      const { data: aiRequest, error: aiError } = await supabase
        .from('ai_generation_requests')
        .insert({
          user_id: user.id,
          tool_id: toolId,
          prompt: this.buildPrompt(inputData, templateName),
          input_data: inputData,
          status: 'processing'
        })
        .select()
        .single();
      
      if (aiError) throw aiError;
      
      // Simulate AI processing (replace with actual OpenAI API call)
      const result = await this.processWithAI(inputData, templateName);
      
      // Update AI request with results
      await supabase
        .from('ai_generation_requests')
        .update({
          output_data: result,
          status: 'completed',
          tokens_used: Math.floor(Math.random() * 1000) + 500,
          cost_usd: (Math.random() * 0.1 + 0.01).toFixed(4),
          processing_time_seconds: Math.floor(Math.random() * 30) + 5
        })
        .eq('id', aiRequest.id);
      
      return { success: true, result, aiRequestId: aiRequest.id };
    } catch (error) {
      console.error('Error generating content:', error);
      return { success: false, error: error.message };
    }
  }

  static buildPrompt(inputData, templateName) {
    // Build appropriate prompt based on tool type and template
    const basePrompt = `Generate professional HR content based on the following input: ${JSON.stringify(inputData)}`;
    
    if (templateName) {
      return `${basePrompt}\n\nUse the ${templateName} template style and format.`;
    }
    
    return basePrompt;
  }

  static async processWithAI(inputData, templateName) {
    // Simulate AI processing - replace with actual OpenAI API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResult = {
          content: `Generated content for ${templateName || 'default'} template based on: ${JSON.stringify(inputData)}`,
          format: 'pdf',
          metadata: {
            generated_at: new Date().toISOString(),
            template_used: templateName || 'default'
          }
        };
        resolve(mockResult);
      }, 2000 + Math.random() * 3000); // 2-5 second delay
    });
  }

  // =============================================
  // Notifications
  // =============================================

  static async getUserNotifications(limit = 10) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      const { data, error: notifError } = await supabase
        .from('user_notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (notifError) throw notifError;
      
      return { success: true, notifications: data };
    } catch (error) {
      console.error('Error getting notifications:', error);
      return { success: false, error: error.message };
    }
  }

  static async markNotificationAsRead(notificationId) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      const { data, error: updateError } = await supabase
        .from('user_notifications')
        .update({ is_read: true })
        .eq('id', notificationId)
        .eq('user_id', user.id)
        .select()
        .single();
      
      if (updateError) throw updateError;
      
      return { success: true, notification: data };
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return { success: false, error: error.message };
    }
  }

  // =============================================
  // Utility Methods
  // =============================================

  static formatCurrency(amount, currency = 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  static formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  static getTimeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    
    return Math.floor(seconds) + ' seconds ago';
  }
}
