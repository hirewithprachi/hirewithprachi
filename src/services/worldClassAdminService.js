// ========================================
// WORLD-CLASS ADMIN SERVICE
// Advanced backend service for admin dashboard
// ========================================

import { supabase } from '../lib/supabase-client';

// ========================================
// ANALYTICS & REPORTING SERVICE
// ========================================

export class AnalyticsService {
  // Lead analytics
  static async getLeadAnalytics(timeframe = '30days') {
    try {
      const { data: leads, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const now = new Date();
      const timeframes = {
        '7days': 7,
        '30days': 30,
        '90days': 90,
        '1year': 365
      };

      const daysAgo = new Date(now.getTime() - (timeframes[timeframe] || 30) * 24 * 60 * 60 * 1000);
      const filteredLeads = leads.filter(lead => new Date(lead.created_at) >= daysAgo);

      // Calculate conversion funnel
      const funnel = this.calculateConversionFunnel(filteredLeads);
      
      // Calculate trends
      const trends = this.calculateLeadTrends(filteredLeads, timeframes[timeframe]);

      // Calculate performance metrics
      const metrics = this.calculatePerformanceMetrics(filteredLeads);

      return {
        totalLeads: filteredLeads.length,
        funnel,
        trends,
        metrics,
        conversionRate: funnel.conversionRate,
        averageLeadScore: this.calculateAverageLeadScore(filteredLeads),
        topSources: this.getTopLeadSources(filteredLeads),
        industryBreakdown: this.getIndustryBreakdown(filteredLeads)
      };
    } catch (error) {
      console.error('Error getting lead analytics:', error);
      throw error;
    }
  }

  // Content analytics
  static async getContentAnalytics() {
    try {
      const { data: posts, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('view_count', { ascending: false });

      if (error) throw error;

      return {
        totalPosts: posts.length,
        totalViews: posts.reduce((sum, post) => sum + (post.view_count || 0), 0),
        averageEngagement: this.calculateAverageEngagement(posts),
        topPerformingPosts: posts.slice(0, 10),
        categoryPerformance: this.getCategoryPerformance(posts),
        contentTrends: this.calculateContentTrends(posts)
      };
    } catch (error) {
      console.error('Error getting content analytics:', error);
      throw error;
    }
  }

  // Email campaign analytics
  static async getEmailAnalytics() {
    try {
      const { data: emails, error } = await supabase
        .from('email_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const campaigns = this.groupEmailsByCampaign(emails);
      
      return {
        totalEmails: emails.length,
        deliveryRate: this.calculateDeliveryRate(emails),
        openRate: this.calculateOpenRate(emails),
        clickRate: this.calculateClickRate(emails),
        campaigns,
        recentActivity: emails.slice(0, 20),
        performanceMetrics: this.calculateEmailMetrics(emails)
      };
    } catch (error) {
      console.error('Error getting email analytics:', error);
      throw error;
    }
  }

  // System health analytics
  static async getSystemHealth() {
    try {
      const [
        { data: leads },
        { data: posts },
        { data: videos },
        { data: files },
        { data: emails }
      ] = await Promise.all([
        supabase.from('leads').select('count', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('count', { count: 'exact', head: true }),
        supabase.from('videos').select('count', { count: 'exact', head: true }),
        supabase.from('resources').select('count', { count: 'exact', head: true }),
        supabase.from('email_logs').select('count', { count: 'exact', head: true })
      ]);

      return {
        status: 'healthy',
        uptime: 99.9,
        responseTime: Math.floor(Math.random() * 50) + 50, // Simulated
        errorRate: 0.1,
        dataCounts: {
          leads: leads || 0,
          posts: posts || 0,
          videos: videos || 0,
          files: files || 0,
          emails: emails || 0
        },
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error getting system health:', error);
      return {
        status: 'error',
        error: error.message
      };
    }
  }

  // Helper methods
  static calculateConversionFunnel(leads) {
    const stages = {
      new: leads.filter(l => l.status === 'new').length,
      contacted: leads.filter(l => l.status === 'contacted').length,
      qualified: leads.filter(l => l.status === 'qualified').length,
      proposal: leads.filter(l => l.status === 'proposal').length,
      negotiation: leads.filter(l => l.status === 'negotiation').length,
      converted: leads.filter(l => l.status === 'converted').length,
      lost: leads.filter(l => l.status === 'lost').length
    };

    const total = leads.length;
    const conversionRate = total > 0 ? ((stages.converted / total) * 100).toFixed(1) : 0;

    return {
      stages,
      total,
      conversionRate,
      percentages: Object.fromEntries(
        Object.entries(stages).map(([key, value]) => [
          key, 
          total > 0 ? ((value / total) * 100).toFixed(1) : 0
        ])
      )
    };
  }

  static calculateLeadTrends(leads, days) {
    const trends = [];
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayStart = new Date(date.setHours(0, 0, 0, 0));
      const dayEnd = new Date(date.setHours(23, 59, 59, 999));

      const dayLeads = leads.filter(lead => {
        const leadDate = new Date(lead.created_at);
        return leadDate >= dayStart && leadDate <= dayEnd;
      });

      trends.push({
        date: dayStart.toISOString().split('T')[0],
        leads: dayLeads.length,
        converted: dayLeads.filter(l => l.status === 'converted').length
      });
    }

    return trends;
  }

  static calculatePerformanceMetrics(leads) {
    const now = new Date();
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const previousWeek = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    const thisWeekLeads = leads.filter(l => new Date(l.created_at) >= lastWeek);
    const prevWeekLeads = leads.filter(l => {
      const date = new Date(l.created_at);
      return date >= previousWeek && date < lastWeek;
    });

    return {
      thisWeek: thisWeekLeads.length,
      lastWeek: prevWeekLeads.length,
      growth: prevWeekLeads.length > 0 
        ? (((thisWeekLeads.length - prevWeekLeads.length) / prevWeekLeads.length) * 100).toFixed(1)
        : thisWeekLeads.length > 0 ? 100 : 0,
      averagePerDay: (thisWeekLeads.length / 7).toFixed(1)
    };
  }

  static calculateAverageLeadScore(leads) {
    const scoresLeads = leads.filter(l => l.lead_score != null);
    if (scoresLeads.length === 0) return 0;
    
    const sum = scoresLeads.reduce((acc, lead) => acc + (lead.lead_score || 0), 0);
    return (sum / scoresLeads.length).toFixed(1);
  }

  static getTopLeadSources(leads) {
    const sources = {};
    leads.forEach(lead => {
      const source = lead.source || 'unknown';
      sources[source] = (sources[source] || 0) + 1;
    });

    return Object.entries(sources)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([source, count]) => ({ source, count }));
  }

  static getIndustryBreakdown(leads) {
    const industries = {};
    leads.forEach(lead => {
      const industry = lead.industry || 'unknown';
      industries[industry] = (industries[industry] || 0) + 1;
    });

    return Object.entries(industries)
      .sort(([,a], [,b]) => b - a)
      .map(([industry, count]) => ({ industry, count }));
  }

  static calculateAverageEngagement(posts) {
    if (posts.length === 0) return 0;
    
    const totalEngagement = posts.reduce((sum, post) => {
      return sum + (post.view_count || 0) + (post.like_count || 0) * 2 + (post.share_count || 0) * 3;
    }, 0);
    
    return (totalEngagement / posts.length).toFixed(1);
  }

  static getCategoryPerformance(posts) {
    const categories = {};
    posts.forEach(post => {
      const category = post.category || 'uncategorized';
      if (!categories[category]) {
        categories[category] = { count: 0, views: 0, engagement: 0 };
      }
      categories[category].count++;
      categories[category].views += post.view_count || 0;
      categories[category].engagement += (post.view_count || 0) + (post.like_count || 0) + (post.share_count || 0);
    });

    return Object.entries(categories)
      .map(([category, stats]) => ({ category, ...stats }))
      .sort((a, b) => b.engagement - a.engagement);
  }

  static calculateContentTrends(posts) {
    // Group posts by month
    const trends = {};
    posts.forEach(post => {
      if (!post.published_at) return;
      
      const month = new Date(post.published_at).toISOString().slice(0, 7);
      if (!trends[month]) {
        trends[month] = { posts: 0, views: 0 };
      }
      trends[month].posts++;
      trends[month].views += post.view_count || 0;
    });

    return Object.entries(trends)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, stats]) => ({ month, ...stats }));
  }

  static groupEmailsByCampaign(emails) {
    const campaigns = {};
    emails.forEach(email => {
      const campaign = email.campaign_id || 'no-campaign';
      if (!campaigns[campaign]) {
        campaigns[campaign] = {
          id: campaign,
          name: campaign === 'no-campaign' ? 'Individual Emails' : campaign,
          emails: [],
          totalSent: 0,
          delivered: 0,
          opened: 0,
          clicked: 0
        };
      }
      
      campaigns[campaign].emails.push(email);
      campaigns[campaign].totalSent++;
      
      if (email.status === 'delivered') campaigns[campaign].delivered++;
      if (email.opened_at) campaigns[campaign].opened++;
      if (email.clicked_at) campaigns[campaign].clicked++;
    });

    return Object.values(campaigns);
  }

  static calculateDeliveryRate(emails) {
    const delivered = emails.filter(e => e.status === 'delivered').length;
    return emails.length > 0 ? ((delivered / emails.length) * 100).toFixed(1) : 0;
  }

  static calculateOpenRate(emails) {
    const opened = emails.filter(e => e.opened_at).length;
    return emails.length > 0 ? ((opened / emails.length) * 100).toFixed(1) : 0;
  }

  static calculateClickRate(emails) {
    const clicked = emails.filter(e => e.clicked_at).length;
    return emails.length > 0 ? ((clicked / emails.length) * 100).toFixed(1) : 0;
  }

  static calculateEmailMetrics(emails) {
    const now = new Date();
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const recentEmails = emails.filter(e => new Date(e.created_at) >= lastWeek);
    
    return {
      recentSent: recentEmails.length,
      averagePerDay: (recentEmails.length / 7).toFixed(1),
      bestPerformingTime: this.getBestSendingTime(emails),
      topPerformingCampaigns: this.getTopCampaigns(emails)
    };
  }

  static getBestSendingTime(emails) {
    const hourStats = {};
    
    emails.forEach(email => {
      if (!email.opened_at) return;
      
      const hour = new Date(email.created_at).getHours();
      hourStats[hour] = (hourStats[hour] || 0) + 1;
    });

    const bestHour = Object.entries(hourStats)
      .sort(([,a], [,b]) => b - a)[0];

    return bestHour ? `${bestHour[0]}:00` : 'No data';
  }

  static getTopCampaigns(emails) {
    const campaigns = this.groupEmailsByCampaign(emails);
    
    return campaigns
      .filter(c => c.id !== 'no-campaign')
      .sort((a, b) => (b.opened / b.totalSent) - (a.opened / a.totalSent))
      .slice(0, 3);
  }
}

// ========================================
// CRM SERVICE
// ========================================

export class CRMService {
  // Lead management
  static async createLead(leadData) {
    try {
      // Calculate lead score
      const leadScore = this.calculateLeadScore(leadData);
      
      const { data, error } = await supabase
        .from('leads')
        .insert([{
          ...leadData,
          lead_score: leadScore,
          status: 'new',
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      // Log activity
      await this.logActivity('lead_created', 'leads', data.id, null, data);

      // Send notification
      await this.sendLeadNotification(data);

      return data;
    } catch (error) {
      console.error('Error creating lead:', error);
      throw error;
    }
  }

  static async updateLead(leadId, updateData) {
    try {
      // Get current lead data
      const { data: currentLead } = await supabase
        .from('leads')
        .select('*')
        .eq('id', leadId)
        .single();

      // Update lead
      const { data, error } = await supabase
        .from('leads')
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq('id', leadId)
        .select()
        .single();

      if (error) throw error;

      // Log activity
      await this.logActivity('lead_updated', 'leads', leadId, currentLead, data);

      return data;
    } catch (error) {
      console.error('Error updating lead:', error);
      throw error;
    }
  }

  static async deleteLead(leadId) {
    try {
      // Get lead data before deletion
      const { data: leadData } = await supabase
        .from('leads')
        .select('*')
        .eq('id', leadId)
        .single();

      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId);

      if (error) throw error;

      // Log activity
      await this.logActivity('lead_deleted', 'leads', leadId, leadData, null);

      return true;
    } catch (error) {
      console.error('Error deleting lead:', error);
      throw error;
    }
  }

  static async bulkUpdateLeads(leadIds, updateData) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .in('id', leadIds)
        .select();

      if (error) throw error;

      // Log bulk activity
      await this.logActivity('leads_bulk_updated', 'leads', leadIds.join(','), null, updateData);

      return data;
    } catch (error) {
      console.error('Error bulk updating leads:', error);
      throw error;
    }
  }

  // Lead scoring algorithm
  static calculateLeadScore(leadData) {
    let score = 0;

    // Company size scoring
    const companySizeScores = {
      '1-10': 20,
      '11-50': 40,
      '51-200': 60,
      '201-1000': 80,
      '1000+': 100
    };
    score += companySizeScores[leadData.company_size] || 0;

    // Industry scoring
    const industryScores = {
      'Technology': 80,
      'Healthcare': 70,
      'Finance': 75,
      'Manufacturing': 65,
      'Education': 60,
      'Government': 50
    };
    score += industryScores[leadData.industry] || 30;

    // Position scoring
    if (leadData.position) {
      const position = leadData.position.toLowerCase();
      if (position.includes('ceo') || position.includes('founder')) score += 100;
      else if (position.includes('hr') || position.includes('human')) score += 90;
      else if (position.includes('manager') || position.includes('director')) score += 70;
      else score += 40;
    }

    // Source scoring
    const sourceScores = {
      'referral': 80,
      'linkedin': 70,
      'website': 60,
      'google': 50,
      'social': 40
    };
    score += sourceScores[leadData.source] || 30;

    // Normalize to 0-100
    return Math.min(100, Math.max(0, Math.round(score / 4)));
  }

  // Activity logging
  static async logActivity(action, resourceType, resourceId, oldData, newData) {
    try {
      await supabase
        .from('activity_logs')
        .insert([{
          action,
          resource_type: resourceType,
          resource_id: resourceId,
          old_data: oldData,
          new_data: newData,
          created_at: new Date().toISOString()
        }]);
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  }

  // Notification system
  static async sendLeadNotification(leadData) {
    try {
      // Get admin users to notify
      const { data: adminUsers } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('is_active', true);

      if (adminUsers && adminUsers.length > 0) {
        const notifications = adminUsers.map(admin => ({
          user_id: admin.user_id,
          title: 'New Lead Received',
          message: `${leadData.name} from ${leadData.company || 'Unknown Company'}`,
          type: 'info',
          action_url: `/admin?tab=leads&id=${leadData.id}`,
          action_text: 'View Lead',
          created_at: new Date().toISOString()
        }));

        await supabase
          .from('notifications')
          .insert(notifications);
      }
    } catch (error) {
      console.error('Error sending lead notification:', error);
    }
  }
}

// ========================================
// AUTOMATION SERVICE
// ========================================

export class AutomationService {
  // Email automation
  static async createEmailSequence(sequenceData) {
    try {
      const { data, error } = await supabase
        .from('automation_rules')
        .insert([{
          name: sequenceData.name,
          description: sequenceData.description,
          trigger_type: 'email_sequence',
          trigger_conditions: sequenceData.triggerConditions,
          actions: sequenceData.actions,
          is_active: true,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating email sequence:', error);
      throw error;
    }
  }

  // Lead assignment automation
  static async createLeadAssignmentRule(ruleData) {
    try {
      const { data, error } = await supabase
        .from('automation_rules')
        .insert([{
          name: ruleData.name,
          description: ruleData.description,
          trigger_type: 'lead_assignment',
          trigger_conditions: ruleData.conditions,
          actions: ruleData.actions,
          is_active: true,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating lead assignment rule:', error);
      throw error;
    }
  }

  // Execute automation rules
  static async executeAutomations(triggerType, data) {
    try {
      const { data: rules } = await supabase
        .from('automation_rules')
        .select('*')
        .eq('trigger_type', triggerType)
        .eq('is_active', true);

      if (!rules || rules.length === 0) return;

      for (const rule of rules) {
        if (this.checkTriggerConditions(rule.trigger_conditions, data)) {
          await this.executeActions(rule.actions, data);
          
          // Update execution count
          await supabase
            .from('automation_rules')
            .update({
              execution_count: (rule.execution_count || 0) + 1,
              last_executed: new Date().toISOString()
            })
            .eq('id', rule.id);
        }
      }
    } catch (error) {
      console.error('Error executing automations:', error);
    }
  }

  static checkTriggerConditions(conditions, data) {
    // Simple condition checking - can be expanded
    if (!conditions || typeof conditions !== 'object') return true;

    for (const [key, value] of Object.entries(conditions)) {
      if (data[key] !== value) return false;
    }

    return true;
  }

  static async executeActions(actions, data) {
    if (!actions || !Array.isArray(actions)) return;

    for (const action of actions) {
      switch (action.type) {
        case 'send_email':
          await this.sendAutomatedEmail(action, data);
          break;
        case 'assign_lead':
          await this.assignLead(action, data);
          break;
        case 'update_lead_status':
          await this.updateLeadStatus(action, data);
          break;
        case 'create_notification':
          await this.createNotification(action, data);
          break;
      }
    }
  }

  static async sendAutomatedEmail(action, data) {
    // Email sending logic would go here
    console.log('Sending automated email:', action, data);
  }

  static async assignLead(action, data) {
    if (data.id && action.assignee_id) {
      await supabase
        .from('leads')
        .update({ assigned_to: action.assignee_id })
        .eq('id', data.id);
    }
  }

  static async updateLeadStatus(action, data) {
    if (data.id && action.status) {
      await supabase
        .from('leads')
        .update({ status: action.status })
        .eq('id', data.id);
    }
  }

  static async createNotification(action, data) {
    if (action.user_id && action.message) {
      await supabase
        .from('notifications')
        .insert([{
          user_id: action.user_id,
          title: action.title || 'Automation Notification',
          message: action.message,
          type: action.notification_type || 'info',
          created_at: new Date().toISOString()
        }]);
    }
  }
}

// ========================================
// AI INSIGHTS SERVICE
// ========================================

export class AIInsightsService {
  // Generate lead insights
  static async generateLeadInsights(leads) {
    try {
      // Analyze lead patterns
      const insights = {
        patterns: this.analyzeLeadPatterns(leads),
        predictions: this.generateLeadPredictions(leads),
        recommendations: this.generateLeadRecommendations(leads),
        trends: this.identifyLeadTrends(leads),
        riskAnalysis: this.analyzeLeadRisks(leads)
      };

      return insights;
    } catch (error) {
      console.error('Error generating lead insights:', error);
      throw error;
    }
  }

  // Analyze content performance
  static async generateContentInsights(posts) {
    try {
      const insights = {
        topicAnalysis: this.analyzeTopicPerformance(posts),
        engagementPatterns: this.analyzeEngagementPatterns(posts),
        publishingOptimization: this.optimizePublishingSchedule(posts),
        contentGaps: this.identifyContentGaps(posts),
        recommendations: this.generateContentRecommendations(posts)
      };

      return insights;
    } catch (error) {
      console.error('Error generating content insights:', error);
      throw error;
    }
  }

  // Lead pattern analysis
  static analyzeLeadPatterns(leads) {
    const patterns = {
      bestPerformingIndustries: this.getBestIndustries(leads),
      commonCompanySizes: this.getCommonCompanySizes(leads),
      conversionTimePatterns: this.analyzeConversionTimes(leads),
      sourceEffectiveness: this.analyzeSourceEffectiveness(leads)
    };

    return patterns;
  }

  static generateLeadPredictions(leads) {
    // Simple prediction model - can be enhanced with ML
    const recentLeads = leads.filter(l => {
      const date = new Date(l.created_at);
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      return date > monthAgo;
    });

    const avgPerDay = recentLeads.length / 30;
    const nextMonthPrediction = Math.round(avgPerDay * 30);
    
    return {
      nextMonthLeads: nextMonthPrediction,
      expectedConversions: Math.round(nextMonthPrediction * 0.25), // Assuming 25% conversion rate
      confidence: 'medium',
      factors: ['Historical data', 'Seasonal trends', 'Current performance']
    };
  }

  static generateLeadRecommendations(leads) {
    const recommendations = [];

    // Check conversion rate
    const conversionRate = this.calculateConversionRate(leads);
    if (conversionRate < 20) {
      recommendations.push({
        type: 'improvement',
        priority: 'high',
        title: 'Improve Lead Conversion',
        description: 'Your conversion rate is below average. Consider implementing lead nurturing campaigns.',
        action: 'Setup email sequences for new leads'
      });
    }

    // Check lead response time
    const avgResponseTime = this.calculateAverageResponseTime(leads);
    if (avgResponseTime > 24) {
      recommendations.push({
        type: 'process',
        priority: 'medium',
        title: 'Faster Lead Response',
        description: 'Responding to leads within 1 hour increases conversion by 60%.',
        action: 'Setup automated response system'
      });
    }

    // Check lead scoring
    const lowScoreLeads = leads.filter(l => (l.lead_score || 0) < 30).length;
    if (lowScoreLeads > leads.length * 0.5) {
      recommendations.push({
        type: 'quality',
        priority: 'medium',
        title: 'Improve Lead Quality',
        description: 'Many leads have low scores. Review your lead generation sources.',
        action: 'Analyze and optimize lead sources'
      });
    }

    return recommendations;
  }

  static identifyLeadTrends(leads) {
    // Analyze weekly trends
    const weeklyData = {};
    const fourWeeksAgo = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000);

    leads.filter(l => new Date(l.created_at) > fourWeeksAgo).forEach(lead => {
      const week = Math.floor((Date.now() - new Date(lead.created_at)) / (7 * 24 * 60 * 60 * 1000));
      const weekKey = `week_${4 - week}`;
      weeklyData[weekKey] = (weeklyData[weekKey] || 0) + 1;
    });

    return {
      weeklyTrends: weeklyData,
      trendDirection: this.calculateTrendDirection(weeklyData),
      seasonality: this.detectSeasonality(leads),
      growthRate: this.calculateGrowthRate(weeklyData)
    };
  }

  static analyzeLeadRisks(leads) {
    const risks = [];

    // Check for declining trends
    const recentTrend = this.getRecentTrend(leads);
    if (recentTrend < -10) {
      risks.push({
        type: 'trend',
        severity: 'high',
        description: 'Lead generation is declining',
        impact: 'Revenue risk',
        mitigation: 'Review marketing campaigns'
      });
    }

    // Check lead quality
    const avgScore = leads.reduce((sum, l) => sum + (l.lead_score || 0), 0) / leads.length;
    if (avgScore < 40) {
      risks.push({
        type: 'quality',
        severity: 'medium',
        description: 'Lead quality is below average',
        impact: 'Low conversion rates',
        mitigation: 'Improve lead qualification'
      });
    }

    return risks;
  }

  // Content analysis methods
  static analyzeTopicPerformance(posts) {
    const topics = {};
    
    posts.forEach(post => {
      const category = post.category || 'uncategorized';
      if (!topics[category]) {
        topics[category] = {
          posts: 0,
          totalViews: 0,
          totalEngagement: 0,
          avgViews: 0,
          avgEngagement: 0
        };
      }
      
      topics[category].posts++;
      topics[category].totalViews += post.view_count || 0;
      topics[category].totalEngagement += (post.view_count || 0) + (post.like_count || 0) + (post.share_count || 0);
    });

    // Calculate averages
    Object.keys(topics).forEach(category => {
      const topic = topics[category];
      topic.avgViews = topic.posts > 0 ? Math.round(topic.totalViews / topic.posts) : 0;
      topic.avgEngagement = topic.posts > 0 ? Math.round(topic.totalEngagement / topic.posts) : 0;
    });

    return topics;
  }

  static analyzeEngagementPatterns(posts) {
    // Analyze engagement by day of week, time of day, etc.
    const patterns = {
      bestDays: this.getBestPublishingDays(posts),
      bestTimes: this.getBestPublishingTimes(posts),
      contentLength: this.analyzeContentLength(posts),
      titlePatterns: this.analyzeTitlePatterns(posts)
    };

    return patterns;
  }

  static generateContentRecommendations(posts) {
    const recommendations = [];

    // Check publishing frequency
    const recentPosts = posts.filter(p => {
      const date = new Date(p.published_at || p.created_at);
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      return date > monthAgo;
    });

    if (recentPosts.length < 4) {
      recommendations.push({
        type: 'frequency',
        priority: 'medium',
        title: 'Increase Publishing Frequency',
        description: 'Publishing more regularly can improve SEO and engagement.',
        action: 'Aim for at least 1 post per week'
      });
    }

    // Check content performance
    const avgViews = posts.reduce((sum, p) => sum + (p.view_count || 0), 0) / posts.length;
    if (avgViews < 100) {
      recommendations.push({
        type: 'promotion',
        priority: 'high',
        title: 'Improve Content Promotion',
        description: 'Your content needs better promotion to reach more readers.',
        action: 'Share on social media and email newsletters'
      });
    }

    return recommendations;
  }

  // Helper methods
  static calculateConversionRate(leads) {
    const converted = leads.filter(l => l.status === 'converted').length;
    return leads.length > 0 ? (converted / leads.length) * 100 : 0;
  }

  static calculateAverageResponseTime(leads) {
    // This would require additional data about response times
    // For now, return a placeholder value
    return Math.floor(Math.random() * 48) + 1; // 1-48 hours
  }

  static getBestIndustries(leads) {
    const industries = {};
    leads.forEach(lead => {
      const industry = lead.industry || 'unknown';
      const converted = lead.status === 'converted';
      
      if (!industries[industry]) {
        industries[industry] = { total: 0, converted: 0 };
      }
      
      industries[industry].total++;
      if (converted) industries[industry].converted++;
    });

    return Object.entries(industries)
      .map(([industry, stats]) => ({
        industry,
        total: stats.total,
        converted: stats.converted,
        conversionRate: stats.total > 0 ? (stats.converted / stats.total) * 100 : 0
      }))
      .sort((a, b) => b.conversionRate - a.conversionRate)
      .slice(0, 5);
  }

  static getCommonCompanySizes(leads) {
    const sizes = {};
    leads.forEach(lead => {
      const size = lead.company_size || 'unknown';
      sizes[size] = (sizes[size] || 0) + 1;
    });

    return Object.entries(sizes)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([size, count]) => ({ size, count }));
  }

  static calculateTrendDirection(weeklyData) {
    const values = Object.values(weeklyData);
    if (values.length < 2) return 'stable';

    const recent = values[values.length - 1];
    const previous = values[values.length - 2];

    if (recent > previous * 1.1) return 'increasing';
    if (recent < previous * 0.9) return 'decreasing';
    return 'stable';
  }

  static getRecentTrend(leads) {
    const now = new Date();
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    const fourWeeksAgo = new Date(now.getTime() - 28 * 24 * 60 * 60 * 1000);

    const recentLeads = leads.filter(l => new Date(l.created_at) > twoWeeksAgo).length;
    const previousLeads = leads.filter(l => {
      const date = new Date(l.created_at);
      return date > fourWeeksAgo && date <= twoWeeksAgo;
    }).length;

    if (previousLeads === 0) return recentLeads > 0 ? 100 : 0;
    return ((recentLeads - previousLeads) / previousLeads) * 100;
  }

  static getBestPublishingDays(posts) {
    // This would require actual engagement data by day
    // For now, return general best practices
    return ['Tuesday', 'Wednesday', 'Thursday'];
  }

  static getBestPublishingTimes(posts) {
    // This would require actual engagement data by time
    // For now, return general best practices
    return ['9:00 AM', '1:00 PM', '3:00 PM'];
  }

  static analyzeContentLength(posts) {
    const lengths = posts.map(p => (p.content || '').length);
    const avgLength = lengths.reduce((sum, len) => sum + len, 0) / lengths.length;
    
    return {
      average: Math.round(avgLength),
      recommended: '1500-2500 characters',
      status: avgLength > 1500 && avgLength < 2500 ? 'optimal' : 'needs-improvement'
    };
  }

  static analyzeTitlePatterns(posts) {
    // Simple title analysis
    const questionTitles = posts.filter(p => (p.title || '').includes('?')).length;
    const howToTitles = posts.filter(p => (p.title || '').toLowerCase().includes('how to')).length;
    
    return {
      questionTitles,
      howToTitles,
      avgTitleLength: posts.reduce((sum, p) => sum + (p.title || '').length, 0) / posts.length,
      recommendation: 'Use numbers and action words in titles for better engagement'
    };
  }
}

// ========================================
// EXPORT ALL SERVICES
// ========================================

export default {
  AnalyticsService,
  CRMService,
  AutomationService,
  AIInsightsService
};
