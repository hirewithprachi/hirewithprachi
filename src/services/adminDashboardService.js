import { supabase } from '../lib/supabase';

class AdminDashboardService {
  // =============================================
  // DASHBOARD OVERVIEW DATA
  // =============================================

  async getDashboardData() {
    try {
      // Fetch all data in parallel
      const [
        leadsResult,
        paymentsResult,
        formSubmissionsResult,
        calculatorResultsResult,
        emailLogsResult,
        activityLogsResult,
        systemSettingsResult
      ] = await Promise.all([
        this.getLeadsData(),
        this.getPaymentData(),
        this.getFormSubmissions(),
        this.getCalculatorResults(),
        this.getEmailLogs(),
        this.getActivityLogs(),
        this.getSystemSettings()
      ]);

      // Calculate metrics
      const totalLeads = leadsResult.data?.length || 0;
      const newLeads = leadsResult.data?.filter(lead => lead.status === 'new').length || 0;
      const convertedLeads = leadsResult.data?.filter(lead => lead.status === 'converted').length || 0;
      const totalRevenue = paymentsResult.data?.filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + parseFloat(p.amount || 0), 0) || 0;
      const pendingPayments = paymentsResult.data?.filter(p => p.status === 'pending').length || 0;

      return {
        success: true,
        data: {
          totalLeads,
          newLeads,
          convertedLeads,
          totalRevenue,
          pendingPayments,
          conversionRate: totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : 0,
          leads: leadsResult.data || [],
          payments: paymentsResult.data || [],
          formSubmissions: formSubmissionsResult.data || [],
          calculatorResults: calculatorResultsResult.data || [],
          emailLogs: emailLogsResult.data || [],
          activityLogs: activityLogsResult.data || [],
          systemSettings: systemSettingsResult.data || [],
          recentActivity: this.formatRecentActivity([
            ...(leadsResult.data || []),
            ...(formSubmissionsResult.data || []),
            ...(paymentsResult.data || [])
          ])
        }
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      return {
        success: false,
        error: error.message,
        data: {}
      };
    }
  }

  // =============================================
  // LEADS MANAGEMENT
  // =============================================

  async getLeadsData() {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Error fetching leads:', error);
      return { success: false, error: error.message };
    }
  }

  async createLead(leadData) {
    try {
      // Ensure name field is populated if not provided
      const processedData = {
        ...leadData,
        name: leadData.name || `${leadData.first_name} ${leadData.last_name || ''}`.trim(),
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('leads')
        .insert([processedData])
        .select();

      if (error) throw error;

      // Log activity
      await this.logActivity('lead_created', 'lead', data[0].id, {
        lead_name: data[0].name || `${leadData.first_name} ${leadData.last_name || ''}`,
        email: leadData.email
      });

      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Error creating lead:', error);
      return { success: false, error: error.message };
    }
  }

  async updateLead(leadId, updates) {
    try {
      // Ensure name field is updated if first_name or last_name changed
      const processedUpdates = {
        ...updates,
        updated_at: new Date().toISOString()
      };

      if (updates.first_name || updates.last_name) {
        processedUpdates.name = updates.name || `${updates.first_name || ''} ${updates.last_name || ''}`.trim();
      }

      const { data, error } = await supabase
        .from('leads')
        .update(processedUpdates)
        .eq('id', leadId)
        .select();

      if (error) throw error;

      // Log activity
      await this.logActivity('lead_updated', 'lead', leadId, processedUpdates);

      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Error updating lead:', error);
      return { success: false, error: error.message };
    }
  }

  async deleteLead(leadId) {
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId);

      if (error) throw error;

      // Log activity
      await this.logActivity('lead_deleted', 'lead', leadId, {});

      return { success: true };
    } catch (error) {
      console.error('Error deleting lead:', error);
      return { success: false, error: error.message };
    }
  }

  // =============================================
  // PAYMENT TRACKING
  // =============================================

  async getPaymentData() {
    try {
      const { data, error } = await supabase
        .from('payment_attempts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Error fetching payment data:', error);
      return { success: false, error: error.message };
    }
  }

  async createPaymentAttempt(paymentData) {
    try {
      const { data, error } = await supabase
        .from('payment_attempts')
        .insert([{
          ...paymentData,
          created_at: new Date().toISOString()
        }])
        .select();

      if (error) throw error;

      // Create lead if user details are provided and it's an incomplete payment
      if (paymentData.user_details && paymentData.status !== 'completed') {
        await this.createLeadFromPayment(paymentData);
      }

      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Error creating payment attempt:', error);
      return { success: false, error: error.message };
    }
  }

  async updatePaymentStatus(paymentId, status, additionalData = {}) {
    try {
      const { data, error } = await supabase
        .from('payment_attempts')
        .update({
          status,
          ...additionalData,
          updated_at: new Date().toISOString()
        })
        .eq('id', paymentId)
        .select();

      if (error) throw error;

      // Log activity
      await this.logActivity('payment_updated', 'payment', paymentId, { status, ...additionalData });

      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Error updating payment status:', error);
      return { success: false, error: error.message };
    }
  }

  async createLeadFromPayment(paymentData) {
    try {
      const userDetails = paymentData.user_details;
      const toolDetails = paymentData.tool_details;

      // Check if lead already exists
      const { data: existingLead } = await supabase
        .from('leads')
        .select('id')
        .eq('email', userDetails.email)
        .single();

      if (existingLead) {
        // Update existing lead
        await this.updateLead(existingLead.id, {
          notes: `Attempted purchase of ${toolDetails?.title || 'Unknown Tool'} for ₹${paymentData.amount}`,
          lead_score: Math.min(100, (existingLead.lead_score || 50) + 15)
        });
      } else {
        // Create new lead
        await this.createLead({
          name: userDetails.name || 'Unknown User',
          first_name: userDetails.name?.split(' ')[0] || 'Unknown',
          last_name: userDetails.name?.split(' ').slice(1).join(' ') || '',
          email: userDetails.email,
          phone: userDetails.phone,
          company_name: userDetails.company,
          source: 'payment_attempt',
          status: 'new',
          lead_score: 75, // High score for payment attempts
          notes: `Attempted purchase of ${toolDetails?.title || 'Unknown Tool'} for ₹${paymentData.amount}`,
          metadata: {
            payment_attempt_id: paymentData.id,
            attempted_tool: toolDetails?.title,
            attempted_amount: paymentData.amount
          }
        });
      }
    } catch (error) {
      console.error('Error creating lead from payment:', error);
    }
  }

  // =============================================
  // SYSTEM SETTINGS
  // =============================================

  async getSystemSettings() {
    try {
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .order('setting_type', { ascending: true });

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Error fetching system settings:', error);
      return { success: false, error: error.message };
    }
  }

  async updateSystemSetting(settingKey, settingValue, settingType = 'general') {
    try {
      const { data, error } = await supabase
        .from('system_settings')
        .upsert({
          setting_key: settingKey,
          setting_value: settingValue,
          setting_type: settingType,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'setting_key'
        })
        .select();

      if (error) throw error;

      // Log activity
      await this.logActivity('setting_updated', 'system_setting', settingKey, {
        setting_key: settingKey,
        new_value: settingValue
      });

      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Error updating system setting:', error);
      return { success: false, error: error.message };
    }
  }

  // =============================================
  // FORM SUBMISSIONS
  // =============================================

  async getFormSubmissions() {
    try {
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Error fetching form submissions:', error);
      return { success: false, error: error.message };
    }
  }

  async createFormSubmission(formType, formData, sessionId = null) {
    try {
      const { data, error } = await supabase
        .from('form_submissions')
        .insert([{
          form_type: formType,
          form_data: formData,
          session_id: sessionId,
          created_at: new Date().toISOString()
        }])
        .select();

      if (error) throw error;

      // Create lead from contact form if applicable
      if (formType === 'contact' && formData.email) {
        await this.createLeadFromForm(formData, formType);
      }

      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Error creating form submission:', error);
      return { success: false, error: error.message };
    }
  }

  async createLeadFromForm(formData, formType) {
    try {
      // Check if lead already exists
      const { data: existingLead } = await supabase
        .from('leads')
        .select('id')
        .eq('email', formData.email)
        .single();

      if (!existingLead) {
        await this.createLead({
          name: formData.name || 'Unknown User',
          first_name: formData.name?.split(' ')[0] || 'Unknown',
          last_name: formData.name?.split(' ').slice(1).join(' ') || '',
          email: formData.email,
          phone: formData.phone,
          company_name: formData.company,
          source: formType,
          status: 'new',
          lead_score: 60,
          notes: formData.message || `Submitted ${formType} form`,
          metadata: {
            form_type: formType,
            form_data: formData
          }
        });
      }
    } catch (error) {
      console.error('Error creating lead from form:', error);
    }
  }

  // =============================================
  // ACTIVITY LOGGING
  // =============================================

  async getActivityLogs() {
    try {
      const { data, error } = await supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      return { success: false, error: error.message };
    }
  }

  async logActivity(action, entityType, entityId, details = {}) {
    try {
      const { error } = await supabase
        .from('activity_logs')
        .insert([{
          action,
          entity_type: entityType,
          entity_id: entityId,
          details,
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  }

  // =============================================
  // CALCULATOR RESULTS
  // =============================================

  async getCalculatorResults() {
    try {
      const { data, error } = await supabase
        .from('calculator_results')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Error fetching calculator results:', error);
      return { success: false, error: error.message };
    }
  }

  // =============================================
  // EMAIL LOGS
  // =============================================

  async getEmailLogs() {
    try {
      const { data, error } = await supabase
        .from('email_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Error fetching email logs:', error);
      return { success: false, error: error.message };
    }
  }

  // =============================================
  // UTILITY FUNCTIONS
  // =============================================

  formatRecentActivity(activities) {
    return activities
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 10)
      .map(activity => ({
        ...activity,
        action: this.generateActivityDescription(activity)
      }));
  }

  generateActivityDescription(activity) {
    if (activity.first_name) {
      // Lead activity
      return `New lead: ${activity.first_name} ${activity.last_name || ''}`;
    } else if (activity.form_type) {
      // Form submission
      return `New ${activity.form_type} form submission`;
    } else if (activity.amount) {
      // Payment activity
      return `Payment ${activity.status}: ₹${activity.amount}`;
    } else if (activity.action) {
      // Activity log
      return activity.action;
    }
    return 'New activity';
  }

  // =============================================
  // REAL-TIME STATS
  // =============================================

  async getRealTimeStats() {
    try {
      const today = new Date().toISOString().split('T')[0];
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const [
        todayLeads,
        weekLeads,
        todayPayments,
        weekPayments,
        todayForms,
        weekForms
      ] = await Promise.all([
        supabase.from('leads').select('id').gte('created_at', today),
        supabase.from('leads').select('id').gte('created_at', weekAgo),
        supabase.from('payment_attempts').select('id, amount').gte('created_at', today),
        supabase.from('payment_attempts').select('id, amount').gte('created_at', weekAgo),
        supabase.from('form_submissions').select('id').gte('created_at', today),
        supabase.from('form_submissions').select('id').gte('created_at', weekAgo)
      ]);

      return {
        success: true,
        data: {
          todayLeads: todayLeads.data?.length || 0,
          weekLeads: weekLeads.data?.length || 0,
          todayRevenue: todayPayments.data?.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0) || 0,
          weekRevenue: weekPayments.data?.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0) || 0,
          todayForms: todayForms.data?.length || 0,
          weekForms: weekForms.data?.length || 0
        }
      };
    } catch (error) {
      console.error('Error fetching real-time stats:', error);
      return { success: false, error: error.message };
    }
  }
}

export const adminDashboardService = new AdminDashboardService();
export default adminDashboardService;
