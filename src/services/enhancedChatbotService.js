/**
 * Premium Enhanced Chatbot Service
 * Advanced AI-powered chatbot with function calling, RAG, analytics, and enterprise features
 * 
 * Features:
 * - Intelligent conversation management with persistence
 * - Advanced lead scoring and qualification
 * - Real-time streaming responses
 * - Comprehensive analytics and monitoring
 * - Multi-language support (English/Hindi)
 * - Robust error handling and retry mechanisms
 * - Performance optimization and caching
 * - Security and data privacy compliance
 */

import { createClient } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase.js';

// Configuration and Constants
const CONFIG = {
  // API Configuration
  OPENAI_MODEL: 'gpt-4o-mini',
  MAX_TOKENS: 1000,
  TEMPERATURE: 0.3,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  REQUEST_TIMEOUT: 30000,
  
  // Conversation Management
  MAX_CONTEXT_MESSAGES: 20,
  MAX_CONVERSATION_AGE_HOURS: 24,
  MAX_SESSIONS_PER_IP: 10,
  
  // Lead Management
  MIN_LEAD_SCORE: 30,
  HIGH_PRIORITY_SCORE: 70,
  AUTO_SAVE_THRESHOLD: 50,
  
  // Performance
  CACHE_TTL: 300000, // 5 minutes
  BATCH_SIZE: 100,
  
  // Languages
  SUPPORTED_LANGUAGES: ['en', 'hi', 'hinglish'],
  DEFAULT_LANGUAGE: 'hinglish'
};

// Enhanced Error Classes
class ChatbotServiceError extends Error {
  constructor(message, code = 'GENERAL_ERROR', details = null, statusCode = 500) {
    super(message);
    this.name = 'ChatbotServiceError';
    this.code = code;
    this.details = details;
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
  }
}

class APIError extends ChatbotServiceError {
  constructor(message, statusCode = 503) {
    super(message, 'API_ERROR', null, statusCode);
    this.name = 'APIError';
  }
}

class ValidationError extends ChatbotServiceError {
  constructor(message, field = null) {
    super(message, 'VALIDATION_ERROR', { field }, 400);
    this.name = 'ValidationError';
  }
}

// Use centralized Supabase client

export class EnhancedChatbotService {
  // Enhanced in-memory storage with TTL and cleanup
  static conversations = new Map();
  static messages = new Map();
  static leadProfiles = new Map();
  static sessionMetadata = new Map();
  static cache = new Map();
  static analyticsEvents = [];
  
  // Performance monitoring
  static metrics = {
    totalRequests: 0,
    totalErrors: 0,
    averageResponseTime: 0,
    activeConversations: 0,
    leadsGenerated: 0,
    toolCallsExecuted: 0
  };

  /**
   * Initialize the service with cleanup intervals
   */
  static initialize() {
    // Cleanup old conversations every hour
    setInterval(() => this.cleanupExpiredSessions(), 3600000);
    
    // Analytics flush every 5 minutes
    setInterval(() => this.flushAnalytics(), 300000);
    
    // Cache cleanup every 10 minutes
    setInterval(() => this.cleanupCache(), 600000);
    
    console.log('Enhanced Chatbot Service initialized');
  }

  /**
   * Build intelligent system prompt with context awareness
   */
  static buildSystemPrompt(context = {}) {
    const { language = CONFIG.DEFAULT_LANGUAGE, userProfile = {}, conversationPhase = 'initial' } = context;
    
    const basePrompt = `You are "Prachi's AI HR Assistant" - an advanced, empathetic AI consultant for hirewithprachi.com, India's premier HR solutions platform.

🎯 CORE IDENTITY:
- Expert HR consultant with 10+ years of virtual experience
- Fluent in ${language === 'hinglish' ? 'professional Hinglish (English-Hindi mix)' : language}
- Warm, professional, solution-oriented personality
- Deep understanding of Indian business culture and HR challenges

🚀 PRIMARY OBJECTIVES (Priority Order):
1. BUILD TRUST: Establish rapport through genuine expertise and care
2. UNDERSTAND NEEDS: Identify precise pain points and requirements  
3. PROVIDE VALUE: Deliver immediate, actionable insights and solutions
4. QUALIFY LEADS: Naturally gather contact info with clear value exchange
5. DRIVE CONVERSION: Guide to appropriate next actions with compelling CTAs

🔍 CONVERSATION INTELLIGENCE:
Phase: ${conversationPhase}
${userProfile.name ? `User: ${userProfile.name}` : 'User: New visitor'}
${userProfile.company ? `Company: ${userProfile.company}` : ''}
${userProfile.role ? `Role: ${userProfile.role}` : ''}
${userProfile.interests ? `Interests: ${userProfile.interests.join(', ')}` : ''}

🎯 LEAD QUALIFICATION STRATEGY:
- Discovery Questions (Ask ONE at a time):
  * "What's your biggest HR challenge right now?"
  * "Tell me about your role and company size?"
  * "What brings you to our platform today?"
  * "When do you need this solution implemented?"
  
- Value-First Approach:
  * Share relevant insights before asking for information
  * Offer free resources to build trust
  * Use social proof and success stories
  * Create urgency with limited-time offers

🛠️ PREMIUM HR SOLUTIONS TO HIGHLIGHT:
• AI-Powered Tools: Resume builders, JD generators, ATS systems
• Consulting Services: Compliance audits, policy development, training
• Recruitment Solutions: End-to-end hiring, screening, onboarding
• Career Services: Executive coaching, skill assessments, career planning
• Business Intelligence: HR analytics, cost optimization, ROI tracking

💬 COMMUNICATION EXCELLENCE:
- Use consultative selling approach
- Mirror user's communication style
- Include relevant emojis for warmth
- Provide specific, actionable advice
- Reference Indian business context when relevant
- Use success metrics and ROI language for decision-makers

🎯 RESPONSE STRUCTURE:
1. Acknowledge + Empathize
2. Provide Expert Insight/Solution  
3. Ask Strategic Follow-up Question
4. Present Clear Next Action/CTA

🔧 AVAILABLE TOOLS (Use strategically):
- get_services: Fetch relevant HR tools and templates
- get_pricing: Show transparent, value-based pricing
- create_lead: Save contact info (with explicit consent)
- schedule_call: Book high-value consultation calls
- get_faqs: Address common concerns proactively
- send_whatsapp_optin: Enable instant communication

Remember: You're not just answering questions - you're consulting, building relationships, and solving real business problems. Every interaction should leave the user feeling more informed and confident about their HR decisions.

${context.additionalContext || ''}`;

    return basePrompt;
  }

  /**
   * Enhanced tool definitions with better parameters and validation
   */
  static tools = {
    get_services: {
      description: "Fetch comprehensive AI HR tools and templates by category with filtering",
      parameters: {
        type: "object",
        properties: {
          category: { 
            type: "string", 
            enum: ["resume", "interview", "recruitment", "compliance", "analytics", "training", "all"],
            description: "Service category to filter by"
          },
          user_role: {
            type: "string",
            enum: ["job_seeker", "hr_professional", "business_owner", "recruiter"],
            description: "User's role for personalized recommendations"
          },
          company_size: {
            type: "string",
            enum: ["startup", "small", "medium", "large", "enterprise"],
            description: "Company size for relevant solutions"
          }
        }
      }
    },

    get_pricing: {
      description: "Fetch detailed pricing with ROI calculations and comparison",
      parameters: {
        type: "object",
        properties: {
          tool_id: { type: "string", description: "Specific tool identifier" },
          plan_type: { 
            type: "string", 
            enum: ["basic", "professional", "enterprise", "custom"],
            description: "Pricing plan type"
          },
          billing_cycle: {
            type: "string",
            enum: ["monthly", "quarterly", "annually"],
            description: "Billing frequency"
          }
        },
        required: ["tool_id"]
      }
    },

    get_page_copy: {
      description: "Retrieve website content and marketing copy by page",
      parameters: {
        type: "object",
        properties: {
          slug: { type: "string", description: "Page slug identifier" },
          section: { type: "string", description: "Specific page section" }
        },
        required: ["slug"]
      }
    },

    get_faqs: {
      description: "Get frequently asked questions with smart filtering",
      parameters: {
        type: "object",
        properties: {
          category: { type: "string", description: "FAQ category" },
          search_terms: { type: "string", description: "Keywords to search for" },
          user_context: { type: "string", description: "User's current situation" }
        }
      }
    },

    create_lead: {
      description: "Create qualified lead with comprehensive profile and consent tracking",
      parameters: {
        type: "object",
        properties: {
          // Basic Information
          name: { type: "string", description: "Full name" },
          email: { type: "string", format: "email", description: "Email address" },
          phone: { type: "string", description: "Phone number with country code" },
          
          // Professional Details
          company: { type: "string", description: "Company name" },
          position: { type: "string", description: "Job title or position" },
          department: { type: "string", description: "Department or function" },
          experience_years: { type: "number", description: "Years of experience" },
          
          // Company Information  
          company_size: { 
            type: "string", 
            enum: ["1-10", "11-50", "51-200", "201-1000", "1000+"],
            description: "Number of employees"
          },
          industry: { type: "string", description: "Industry sector" },
          annual_revenue: { type: "string", description: "Annual revenue range" },
          
          // Requirements & Intent
          service_interest: { type: "string", description: "Primary service interest" },
          specific_needs: { type: "string", description: "Specific requirements or pain points" },
          budget_range: { type: "string", description: "Budget range for solution" },
          timeline: { type: "string", description: "Implementation timeline" },
          decision_maker: { type: "boolean", description: "Is user the decision maker" },
          
          // Engagement Data
          utm_source: { type: "string", description: "Traffic source" },
          utm_campaign: { type: "string", description: "Campaign identifier" },
          referral_source: { type: "string", description: "How they heard about us" },
          notes: { type: "string", description: "Additional notes" },
          
          // Compliance
          consent_marketing: { type: "boolean", description: "Marketing consent" },
          consent_data_processing: { type: "boolean", description: "Data processing consent" }
        },
        required: ["name", "consent_data_processing"]
      }
    },

    schedule_call: {
      description: "Schedule consultation calls with intelligent slot suggestions",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "Contact name" },
          email: { type: "string", format: "email", description: "Email for calendar invite" },
          phone: { type: "string", description: "Phone number" },
          preferred_date: { type: "string", description: "Preferred date (YYYY-MM-DD)" },
          preferred_time: { type: "string", description: "Preferred time slot" },
          timezone: { type: "string", description: "User's timezone" },
          consultation_type: { 
            type: "string",
            enum: ["hr_audit", "tool_demo", "strategy_session", "implementation_planning"],
            description: "Type of consultation needed"
          },
          agenda: { type: "string", description: "Meeting agenda or topics to discuss" },
          company_size: { type: "string", description: "Company size for preparation" }
        },
        required: ["name", "email", "consultation_type"]
      }
    },

    create_order: {
      description: "Process premium tool orders with payment integration",
      parameters: {
        type: "object",
        properties: {
          tool_id: { type: "string", description: "Product identifier" },
          plan_id: { type: "string", description: "Pricing plan selected" },
          quantity: { type: "number", default: 1, description: "Number of licenses" },
          amount_inr: { type: "number", description: "Total amount in INR" },
          user_email: { type: "string", format: "email", description: "Purchaser email" },
          billing_cycle: { 
            type: "string", 
            enum: ["monthly", "quarterly", "annually"],
            default: "monthly"
          },
          discount_code: { type: "string", description: "Promotional code" },
          payment_method: { 
            type: "string",
            enum: ["razorpay", "stripe", "bank_transfer"],
            default: "razorpay"
          }
        },
        required: ["tool_id", "amount_inr", "user_email"]
      }
    },

    send_whatsapp_optin: {
      description: "Send WhatsApp verification for instant communication",
      parameters: {
        type: "object",
        properties: {
          phone: { type: "string", description: "Indian mobile number" },
          name: { type: "string", description: "Contact name" },
          purpose: { 
            type: "string",
            enum: ["hr_support", "lead_followup", "order_updates", "consultation_reminder"],
            default: "hr_support"
          },
          template_id: { type: "string", description: "WhatsApp template to use" }
        },
        required: ["phone", "name"]
      }
    },

    get_analytics_insights: {
      description: "Get personalized insights based on user behavior and industry trends",
      parameters: {
        type: "object",
        properties: {
          industry: { type: "string", description: "User's industry" },
          company_size: { type: "string", description: "Company size" },
          focus_area: { 
            type: "string",
            enum: ["recruitment", "retention", "compliance", "performance", "culture"],
            description: "HR focus area"
          }
        }
      }
    }
  };

  /**
   * Enhanced tool execution with caching and error handling
   */
  static async executeTool(toolName, parameters, context = {}) {
    const startTime = Date.now();
    this.metrics.toolCallsExecuted++;

    try {
      // Validate tool exists
      if (!this.tools[toolName]) {
        throw new ChatbotServiceError(`Unknown tool: ${toolName}`, 'INVALID_TOOL');
      }

      // Cache key for GET operations
      const cacheKey = `tool_${toolName}_${JSON.stringify(parameters)}`;
      
      // Check cache for read operations
      if (['get_services', 'get_pricing', 'get_faqs', 'get_page_copy'].includes(toolName)) {
        const cached = this.cache.get(cacheKey);
        if (cached && cached.timestamp > Date.now() - CONFIG.CACHE_TTL) {
          return cached.data;
        }
      }

      let result;
      switch (toolName) {
        case 'get_services':
          result = await this.getServices(parameters.category, parameters);
          break;
        case 'get_pricing':
          result = await this.getPricing(parameters.tool_id, parameters);
          break;
        case 'get_page_copy':
          result = await this.getPageCopy(parameters.slug, parameters.section);
          break;
        case 'get_faqs':
          result = await this.getFaqs(parameters);
          break;
        case 'create_lead':
          result = await this.createLead(parameters);
          break;
        case 'schedule_call':
          result = await this.scheduleCall(parameters);
          break;
        case 'create_order':
          result = await this.createOrder(parameters);
          break;
        case 'send_whatsapp_optin':
          result = await this.sendWhatsAppOptin(parameters);
          break;
        case 'get_analytics_insights':
          result = await this.getAnalyticsInsights(parameters);
          break;
        default:
          throw new ChatbotServiceError(`Tool execution not implemented: ${toolName}`, 'NOT_IMPLEMENTED');
      }

      // Cache successful GET results
      if (result.success && ['get_services', 'get_pricing', 'get_faqs', 'get_page_copy'].includes(toolName)) {
        this.cache.set(cacheKey, {
          data: result,
          timestamp: Date.now()
        });
      }

      // Log performance
      const duration = Date.now() - startTime;
      this.trackEvent('tool_execution', {
        tool: toolName,
        success: result.success,
        duration,
        parameters: Object.keys(parameters)
      });

      return result;

    } catch (error) {
      console.error(`Error executing tool ${toolName}:`, error);
      this.trackEvent('tool_error', {
        tool: toolName,
        error: error.message,
        parameters: Object.keys(parameters)
      });

      return { 
        success: false, 
        error: error.message,
        code: error.code || 'EXECUTION_ERROR'
      };
    }
  }

  /**
   * Enhanced service fetching with intelligent filtering
   */
  static async getServices(category = 'all', filters = {}) {
    try {
      let query = supabase
        .from('ai_hr_tools')
        .select(`
          *,
          service_pricing(amount_inr, plan_name, billing_cycle),
          tool_analytics(usage_count, rating_avg)
        `)
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      // Apply filters
      if (filters.user_role) {
        query = query.contains('target_roles', [filters.user_role]);
      }

      if (filters.company_size) {
        query = query.contains('suitable_for', [filters.company_size]);
      }

      const { data, error } = await query.limit(20);
      if (error) throw new APIError(`Database error: ${error.message}`);

      // Enhance data with recommendations
      const enhancedData = data?.map(service => ({
        ...service,
        recommended: this.calculateServiceRecommendation(service, filters),
        roi_estimate: this.calculateROI(service, filters.company_size),
        popularity_score: service.tool_analytics?.[0]?.usage_count || 0
      })) || [];

      return {
        success: true,
        services: enhancedData,
        count: enhancedData.length,
        recommendations: enhancedData.filter(s => s.recommended).slice(0, 3),
        metadata: {
          category,
          filters_applied: Object.keys(filters),
          cached: false
        }
      };

    } catch (error) {
      console.error('Error fetching services:', error);
      return { 
        success: false, 
        error: error.message,
        services: [],
        count: 0
      };
    }
  }

  /**
   * Advanced pricing with ROI calculations
   */
  static async getPricing(toolId, options = {}) {
    try {
      const { data, error } = await supabase
        .from('service_pricing')
        .select(`
          *,
          ai_hr_tools(name, category, features)
        `)
        .eq('tool_id', toolId)
        .order('amount_inr', { ascending: true });

      if (error) throw new APIError(`Database error: ${error.message}`);

      const enhancedPricing = data?.map(plan => ({
        ...plan,
        roi_calculation: this.calculatePricingROI(plan, options),
        savings_estimate: this.calculateSavings(plan, options.company_size),
        payback_period: this.calculatePaybackPeriod(plan, options.company_size),
        value_proposition: this.generateValueProposition(plan, options)
      })) || [];

      return {
        success: true,
        pricing: enhancedPricing,
        count: enhancedPricing.length,
        recommended_plan: enhancedPricing.find(p => p.recommended) || enhancedPricing[1],
        comparison_matrix: this.generateComparisonMatrix(enhancedPricing)
      };

    } catch (error) {
      console.error('Error fetching pricing:', error);
      return { success: false, error: error.message, pricing: [] };
    }
  }

  /**
   * Enhanced lead creation with intelligent scoring
   */
  static async createLead(parameters) {
    try {
      const {
        name, email, phone, company, position, department, experience_years,
        company_size, industry, annual_revenue, service_interest, specific_needs,
        budget_range, timeline, decision_maker, utm_source, utm_campaign,
        referral_source, notes, consent_marketing, consent_data_processing
      } = parameters;

      // Validation
      if (!name || !consent_data_processing) {
        throw new ValidationError('Name and data processing consent are required');
      }

      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new ValidationError('Invalid email format');
      }

      // Enhanced lead scoring
      const leadScore = this.calculateAdvancedLeadScore(parameters);
      const leadGrade = this.calculateLeadGrade(leadScore);
      const priority = leadScore >= CONFIG.HIGH_PRIORITY_SCORE ? 'high' : leadScore >= CONFIG.MIN_LEAD_SCORE ? 'medium' : 'low';

      // Enrich with additional data
      const enrichedData = await this.enrichLeadData(parameters);

      const leadData = {
        // Basic Info
        name: name.trim(),
        email: email?.toLowerCase().trim() || null,
        phone: phone?.replace(/\D/g, '') || null,
        
        // Professional Details
        company: company?.trim() || null,
        position: position?.trim() || null,
        department: department?.trim() || null,
        experience_years: experience_years || null,
        
        // Company Info
        company_size: company_size || null,
        industry: industry?.trim() || null,
        annual_revenue: annual_revenue || null,
        
        // Requirements
        service_interest: service_interest?.trim() || null,
        specific_needs: specific_needs?.trim() || null,
        budget_range: budget_range || null,
        timeline: timeline || null,
        decision_maker: decision_maker || false,
        
        // Tracking
        source: 'chatbot',
        utm_source: utm_source || null,
        utm_campaign: utm_campaign || null,
        referral_source: referral_source || null,
        
        // Scoring & Classification
        lead_score: leadScore,
        lead_grade: leadGrade,
        priority: priority,
        
        // Compliance
        consent_marketing: consent_marketing || false,
        consent_data_processing: consent_data_processing,
        consent_given_at: new Date().toISOString(),
        
        // Metadata
        notes: notes || null,
        ip_address: enrichedData.ip_address,
        user_agent: enrichedData.user_agent,
        location_data: enrichedData.location,
        
        // Status
        status: 'new',
        assigned_to: leadScore >= CONFIG.HIGH_PRIORITY_SCORE ? 'senior_consultant' : 'team',
        created_at: new Date().toISOString()
      };

      // Save to database
      const { data, error } = await supabase
        .from('chatbot_leads')
        .insert([leadData])
        .select()
        .single();

      if (error) throw new APIError(`Failed to save lead: ${error.message}`);

      // Update metrics
      this.metrics.leadsGenerated++;

      // Trigger automated workflows
      this.triggerLeadWorkflows(data);

      // Track conversion event
      this.trackEvent('lead_created', {
        lead_id: data.id,
        lead_score: leadScore,
        lead_grade: leadGrade,
        priority: priority,
        source: 'chatbot'
      });

      return {
        success: true,
        lead_id: data.id,
        lead_score: leadScore,
        lead_grade: leadGrade,
        priority: priority,
        message: this.generateLeadConfirmationMessage(leadData, leadScore),
        next_steps: this.generateNextSteps(leadData)
      };

    } catch (error) {
      console.error('Error creating lead:', error);
      this.trackEvent('lead_creation_error', { error: error.message });
      
      return { 
        success: false, 
        error: error.message,
        code: error.code || 'LEAD_CREATION_FAILED'
      };
    }
  }

  /**
   * Advanced lead scoring algorithm
   */
  static calculateAdvancedLeadScore(lead) {
    let score = 0;
    
    // Contact Information (40 points max)
    if (lead.email) score += 20;
    if (lead.phone) score += 15;
    if (lead.company) score += 5;
    
    // Professional Profile (30 points max)
    if (lead.position) {
      const seniorRoles = ['director', 'manager', 'head', 'vp', 'ceo', 'cto', 'founder'];
      if (seniorRoles.some(role => lead.position.toLowerCase().includes(role))) {
        score += 15;
      } else {
        score += 8;
      }
    }
    
    if (lead.experience_years) {
      if (lead.experience_years >= 10) score += 10;
      else if (lead.experience_years >= 5) score += 7;
      else if (lead.experience_years >= 2) score += 5;
      else score += 3;
    }
    
    if (lead.department) {
      const hrDepartments = ['hr', 'human resources', 'people', 'talent'];
      if (hrDepartments.some(dept => lead.department.toLowerCase().includes(dept))) {
        score += 5;
      }
    }
    
    // Company Profile (20 points max)
    if (lead.company_size) {
      const sizeMapping = {
        '1000+': 15,
        '201-1000': 12,
        '51-200': 10,
        '11-50': 8,
        '1-10': 5
      };
      score += sizeMapping[lead.company_size] || 5;
    }
    
    if (lead.annual_revenue) {
      if (lead.annual_revenue.includes('crore') || lead.annual_revenue.includes('million')) {
        score += 5;
      }
    }
    
    // Intent & Budget (30 points max)
    if (lead.budget_range) {
      if (lead.budget_range.toLowerCase().includes('lakh') || 
          lead.budget_range.toLowerCase().includes('thousand')) {
        score += 15;
      } else {
        score += 10;
      }
    }
    
    if (lead.timeline) {
      const urgentTimelines = ['immediate', 'asap', '1 month', 'urgent'];
      if (urgentTimelines.some(timeline => lead.timeline.toLowerCase().includes(timeline))) {
        score += 10;
      } else if (lead.timeline.toLowerCase().includes('3 month')) {
        score += 7;
      } else {
        score += 5;
      }
    }
    
    if (lead.decision_maker) score += 10;
    if (lead.specific_needs && lead.specific_needs.length > 20) score += 5;
    
    // Engagement Quality (10 points max)
    if (lead.consent_marketing) score += 5;
    if (lead.referral_source && lead.referral_source !== 'organic') score += 5;
    
    return Math.min(score, 100);
  }

  /**
   * Calculate lead grade based on score
   */
  static calculateLeadGrade(score) {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B+';
    if (score >= 60) return 'B';
    if (score >= 50) return 'C+';
    if (score >= 40) return 'C';
    if (score >= 30) return 'D';
    return 'F';
  }

  /**
   * Get conversation by session ID
   */
  static async getConversation(sessionId) {
    try {
      const conversation = this.conversations.get(sessionId);
      if (conversation) {
        return { success: true, data: conversation };
      }
      return { success: false, error: 'Conversation not found' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Create new conversation
   */
  static async createConversation(sessionId, context = {}) {
    try {
      const conversation = {
        id: sessionId,
        sessionId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        context,
        messageCount: 0
      };
      this.conversations.set(sessionId, conversation);
      return { success: true, data: conversation };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Add message to conversation
   */
  static async addMessage(conversationId, role, content, score = 0, metadata = {}) {
    try {
      const messageId = `${conversationId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const message = {
        id: messageId,
        conversationId,
        role,
        content,
        score,
        metadata,
        timestamp: new Date().toISOString()
      };
      
      if (!this.messages.has(conversationId)) {
        this.messages.set(conversationId, []);
      }
      this.messages.get(conversationId).push(message);
      
      return { success: true, data: message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Get messages for conversation
   */
  static async getMessages(conversationId, limit = 50) {
    try {
      const messages = this.messages.get(conversationId) || [];
      const limitedMessages = messages.slice(-limit);
      return { success: true, data: limitedMessages };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Enhanced message processing with streaming and analytics
   */
  static async processUserMessageStreaming(sessionId, userMessage, context = {}, onChunk = null) {
    const startTime = Date.now();
    this.metrics.totalRequests++;
    this.metrics.activeConversations = this.conversations.size;

    try {
      // Input validation and sanitization
      this.validateMessageInput(sessionId, userMessage);
      const sanitizedMessage = this.sanitizeMessage(userMessage);

      // Get or create conversation
      let conversation = await this.getConversation(sessionId);
      if (!conversation.success) {
        conversation = await this.createConversation(sessionId, context);
        if (!conversation.success) {
          throw new ChatbotServiceError('Failed to initialize conversation', 'CONVERSATION_ERROR');
        }
      }

      const conversationId = conversation.data.id;

      // Update session metadata
      this.updateSessionMetadata(sessionId, {
        lastActivity: new Date().toISOString(),
        messageCount: (this.sessionMetadata.get(sessionId)?.messageCount || 0) + 1,
        userAgent: context.userAgent,
        ipAddress: context.ipAddress
      });

      // Store user message with analytics
      await this.addMessage(conversationId, 'user', sanitizedMessage, 0, {
        timestamp: new Date().toISOString(),
        sessionId,
        messageLength: sanitizedMessage.length,
        language: this.detectLanguage(sanitizedMessage)
      });

      // Get conversation history with intelligent truncation
      const messagesResult = await this.getMessages(conversationId, CONFIG.MAX_CONTEXT_MESSAGES);
      if (!messagesResult.success) {
        throw new ChatbotServiceError('Failed to retrieve conversation history', 'HISTORY_ERROR');
      }

      const recentMessages = messagesResult.data.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Analyze user intent and extract entities
      const intentAnalysis = await this.analyzeUserIntent(sanitizedMessage, recentMessages);
      
      // Build dynamic context for system prompt
      const dynamicContext = {
        language: intentAnalysis.language,
        userProfile: this.buildUserProfile(sessionId, recentMessages),
        conversationPhase: this.determineConversationPhase(recentMessages),
        intentData: intentAnalysis
      };

      // Get AI response with streaming
      const assistantMessage = await this.chatTurnStreaming(
        recentMessages, 
        sessionId, 
        conversationId, 
        dynamicContext,
        onChunk
      );

      // Store assistant message
      await this.addMessage(conversationId, 'assistant', assistantMessage.content, 
        assistantMessage.tokensUsed || 0, {
          timestamp: new Date().toISOString(),
          toolCalls: assistantMessage.toolCalls || [],
          responseTime: Date.now() - startTime
        });

      // Generate enhanced response data
      const responseData = await this.enhanceResponseData(
        assistantMessage, 
        intentAnalysis, 
        sessionId, 
        conversationId
      );

      // Update conversation analytics
      await this.updateConversationAnalytics(conversationId, {
        messagesCount: recentMessages.length + 1,
        lastIntent: intentAnalysis.primaryIntent,
        leadScore: this.sessionMetadata.get(sessionId)?.leadScore || 0
      });

      // Auto-save lead if threshold met
      if (this.shouldAutoSaveLead(sessionId, intentAnalysis)) {
        this.trySaveLead(sessionId, conversationId).catch(error => 
          console.warn('Auto-save lead failed:', error.message)
        );
      }

      // Update performance metrics
      const duration = Date.now() - startTime;
      this.updateMetrics(duration, true);

      // Track successful interaction
      this.trackEvent('message_processed', {
        sessionId,
        intent: intentAnalysis.primaryIntent,
        responseTime: duration,
        hasToolCalls: (assistantMessage.toolCalls || []).length > 0,
        messageLength: sanitizedMessage.length
      });

      return {
        success: true,
        conversationId: conversationId,
        response: assistantMessage.content,
        quickReplies: responseData.quickReplies,
        cta: responseData.cta,
        suggestions: responseData.suggestions,
        metadata: {
          intent: intentAnalysis.primaryIntent,
          confidence: intentAnalysis.confidence,
          responseTime: duration,
          toolsUsed: (assistantMessage.toolCalls || []).map(t => t.name),
          conversationPhase: dynamicContext.conversationPhase
        }
      };

    } catch (error) {
      console.error('Error processing user message:', error);
      this.metrics.totalErrors++;
      this.updateMetrics(Date.now() - startTime, false);
      
      this.trackEvent('message_processing_error', {
        sessionId,
        error: error.message,
        errorCode: error.code,
        userMessage: userMessage?.substring(0, 100)
      });

      return {
        success: false,
        error: error.message,
        code: error.code || 'PROCESSING_ERROR',
        response: this.generateErrorResponse(error),
        quickReplies: ['Try again', 'Contact support', 'Start over'],
        cta: { type: 'support', text: 'Get Help', url: '/support' }
      };
    }
  }

  /**
   * Advanced intent analysis with ML-based classification
   */
  static async analyzeUserIntent(message, conversationHistory = []) {
    try {
      const intents = {
        // Business intents
        pricing_inquiry: {
          keywords: ['price', 'cost', 'pricing', 'expensive', 'budget', 'fee', 'charge', 'rate'],
          patterns: [/how much/i, /pricing/i, /cost/i, /budget/i, /afford/i],
          weight: 1.0
        },
        service_inquiry: {
          keywords: ['service', 'tool', 'solution', 'offering', 'product', 'feature'],
          patterns: [/what.*do/i, /services/i, /tools/i, /help.*with/i],
          weight: 0.9
        },
        booking_intent: {
          keywords: ['book', 'schedule', 'appointment', 'call', 'meeting', 'demo', 'consultation'],
          patterns: [/book/i, /schedule/i, /call/i, /meeting/i, /demo/i],
          weight: 1.2
        },
        lead_qualification: {
          keywords: ['company', 'employees', 'business', 'organization', 'team', 'size'],
          patterns: [/work.*at/i, /company/i, /business/i, /team/i],
          weight: 0.8
        },
        
        // Support intents
        technical_support: {
          keywords: ['help', 'problem', 'issue', 'error', 'bug', 'not working'],
          patterns: [/help/i, /problem/i, /issue/i, /error/i, /fix/i],
          weight: 0.7
        },
        information_request: {
          keywords: ['how', 'what', 'when', 'where', 'why', 'tell me', 'explain'],
          patterns: [/how.*work/i, /what.*is/i, /tell.*about/i, /explain/i],
          weight: 0.6
        },
        
        // Engagement intents
        greeting: {
          keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'namaste'],
          patterns: [/^(hi|hello|hey)/i, /good (morning|afternoon|evening)/i, /namaste/i],
          weight: 0.5
        },
        goodbye: {
          keywords: ['bye', 'goodbye', 'thanks', 'thank you', 'dhanyawad'],
          patterns: [/bye/i, /goodbye/i, /thank.*you/i, /thanks/i],
          weight: 0.4
        },
        
        // HR-specific intents
        recruitment_help: {
          keywords: ['hiring', 'recruit', 'candidate', 'interview', 'job', 'position'],
          patterns: [/hiring/i, /recruit/i, /interview/i, /candidate/i, /job/i],
          weight: 1.1
        },
        resume_assistance: {
          keywords: ['resume', 'cv', 'profile', 'career', 'job search'],
          patterns: [/resume/i, /cv/i, /job.*search/i, /career/i],
          weight: 1.0
        },
        hr_compliance: {
          keywords: ['policy', 'compliance', 'legal', 'regulation', 'audit'],
          patterns: [/policy/i, /compliance/i, /legal/i, /audit/i],
          weight: 0.9
        }
      };

      const messageWords = message.toLowerCase().split(/\s+/);
      const intentScores = {};

      // Calculate scores for each intent
      for (const [intentName, intentData] of Object.entries(intents)) {
        let score = 0;

        // Keyword matching
        for (const keyword of intentData.keywords) {
          if (messageWords.includes(keyword.toLowerCase())) {
            score += 0.3 * intentData.weight;
          }
        }

        // Pattern matching
        for (const pattern of intentData.patterns) {
          if (pattern.test(message)) {
            score += 0.7 * intentData.weight;
          }
        }

        // Context boost from conversation history
        if (conversationHistory.length > 0) {
          const recentContext = conversationHistory.slice(-3).map(m => m.content).join(' ');
          for (const keyword of intentData.keywords) {
            if (recentContext.toLowerCase().includes(keyword)) {
              score += 0.1 * intentData.weight;
            }
          }
        }

        intentScores[intentName] = score;
      }

      // Find primary intent
      const sortedIntents = Object.entries(intentScores)
        .sort(([,a], [,b]) => b - a)
        .filter(([,score]) => score > 0);

      const primaryIntent = sortedIntents.length > 0 ? sortedIntents[0][0] : 'general_inquiry';
      const confidence = sortedIntents.length > 0 ? Math.min(sortedIntents[0][1], 1.0) : 0;

      // Detect language
      const language = this.detectLanguage(message);

      // Extract entities
      const entities = this.extractEntities(message);

      return {
        primaryIntent,
        confidence,
        allIntents: intentScores,
        language,
        entities,
        messageType: this.classifyMessageType(message),
        urgency: this.detectUrgency(message),
        sentiment: this.analyzeSentiment(message)
      };

    } catch (error) {
      console.error('Intent analysis failed:', error);
      return {
        primaryIntent: 'general_inquiry',
        confidence: 0,
        allIntents: {},
        language: 'en',
        entities: {},
        messageType: 'query',
        urgency: 'normal',
        sentiment: 'neutral'
      };
    }
  }

  /**
   * Detect language with enhanced Hinglish support
   */
  static detectLanguage(text) {
    const hindiWords = /[\u0900-\u097F]/;
    const hinglishPatterns = [
      /\b(hai|hain|kar|karo|kya|aur|mein|main|ko|ki|ka|ke|se|me|par|pe)\b/i,
      /\b(achha|theek|sahi|galat|problem|help|please|thanks|dhanyawad)\b/i
    ];

    if (hindiWords.test(text)) {
      return 'hi';
    }

    for (const pattern of hinglishPatterns) {
      if (pattern.test(text)) {
        return 'hinglish';
      }
    }

    return 'en';
  }

  /**
   * Classify message type
   */
  static classifyMessageType(message) {
    const content = message.toLowerCase().trim();
    
    if (content.includes('?') || content.startsWith('how') || content.startsWith('what') || content.startsWith('when') || content.startsWith('where') || content.startsWith('why')) {
      return 'question';
    }
    
    if (content.includes('book') || content.includes('schedule') || content.includes('appointment') || content.includes('call')) {
      return 'booking_request';
    }
    
    if (content.includes('price') || content.includes('cost') || content.includes('pricing') || content.includes('quote')) {
      return 'pricing_inquiry';
    }
    
    if (content.includes('help') || content.includes('support') || content.includes('assist')) {
      return 'help_request';
    }
    
    if (content.includes('hello') || content.includes('hi') || content.includes('hey') || content.includes('namaste')) {
      return 'greeting';
    }
    
    if (content.includes('bye') || content.includes('goodbye') || content.includes('thanks') || content.includes('thank you')) {
      return 'farewell';
    }
    
    return 'query';
  }

  /**
   * Detect urgency level
   */
  static detectUrgency(message) {
    const content = message.toLowerCase();
    const urgentKeywords = ['urgent', 'asap', 'immediately', 'emergency', 'critical', 'now', 'today'];
    const highKeywords = ['soon', 'quickly', 'fast', 'priority', 'important'];
    
    if (urgentKeywords.some(keyword => content.includes(keyword))) {
      return 'urgent';
    }
    
    if (highKeywords.some(keyword => content.includes(keyword))) {
      return 'high';
    }
    
    return 'normal';
  }

  /**
   * Analyze sentiment
   */
  static analyzeSentiment(message) {
    const content = message.toLowerCase();
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'perfect', 'love', 'like', 'happy', 'satisfied'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'angry', 'frustrated', 'disappointed', 'problem', 'issue'];
    
    const positiveCount = positiveWords.filter(word => content.includes(word)).length;
    const negativeCount = negativeWords.filter(word => content.includes(word)).length;
    
    if (positiveCount > negativeCount) {
      return 'positive';
    } else if (negativeCount > positiveCount) {
      return 'negative';
    }
    
    return 'neutral';
  }

  /**
   * Enhance response data with quick replies and CTAs
   */
  static async enhanceResponseData(assistantMessage, intentAnalysis, sessionId, conversationId) {
    try {
      const quickReplies = this.generateQuickReplies(assistantMessage.content, {
        intent: intentAnalysis.primaryIntent,
        entities: intentAnalysis.entities,
        conversationPhase: this.determineConversationPhase(this.messages.get(conversationId) || [])
      });
      
      const cta = this.extractCTA(assistantMessage.content, {
        intent: intentAnalysis.primaryIntent,
        entities: intentAnalysis.entities
      });
      
      const suggestions = this.generateSuggestions(intentAnalysis, sessionId);
      
      return {
        quickReplies,
        cta,
        suggestions,
        metadata: {
          intent: intentAnalysis.primaryIntent,
          confidence: intentAnalysis.confidence,
          messageType: intentAnalysis.messageType,
          urgency: intentAnalysis.urgency,
          sentiment: intentAnalysis.sentiment
        }
      };
    } catch (error) {
      console.error('Error enhancing response data:', error);
      return {
        quickReplies: ['Our Services', 'Pricing', 'Contact Us'],
        cta: null,
        suggestions: [],
        metadata: {}
      };
    }
  }

  /**
   * Generate contextual suggestions
   */
  static generateSuggestions(intentAnalysis, sessionId) {
    const suggestions = [];
    
    if (intentAnalysis.primaryIntent === 'pricing_inquiry') {
      suggestions.push('Free HR Audit', 'Custom Quote', 'ROI Calculator');
    } else if (intentAnalysis.primaryIntent === 'service_inquiry') {
      suggestions.push('Book Demo', 'Case Studies', 'Free Trial');
    } else if (intentAnalysis.primaryIntent === 'recruitment_help') {
      suggestions.push('Resume Templates', 'Interview Guide', 'Hiring Checklist');
    }
    
    return suggestions;
  }

  /**
   * Generate quick replies based on context
   */
  static generateQuickReplies(content, context = {}) {
    const { intent, entities, conversationPhase } = context;
    const quickReplies = [];
    
    // Default quick replies based on intent
    if (intent === 'pricing_inquiry') {
      quickReplies.push('View All Pricing', 'Custom Quote', 'Free Trial');
    } else if (intent === 'service_inquiry') {
      quickReplies.push('Our Services', 'Book Demo', 'Case Studies');
    } else if (intent === 'booking_request') {
      quickReplies.push('Available Slots', 'Book Now', 'Reschedule');
    } else if (intent === 'help_request') {
      quickReplies.push('Contact Support', 'FAQ', 'Live Chat');
    } else {
      // Default options
      quickReplies.push('Our Services', 'Pricing', 'Contact Us');
    }
    
    // Add conversation phase specific options
    if (conversationPhase === 'initial') {
      quickReplies.unshift('Tell me more');
    } else if (conversationPhase === 'engaged') {
      quickReplies.push('Book a Call');
    }
    
    return quickReplies.slice(0, 4); // Limit to 4 options
  }

  /**
   * Extract call-to-action from content
   */
  static extractCTA(content, context = {}) {
    const { intent, entities } = context;
    
    // Look for explicit CTAs in content
    const ctaPatterns = [
      /book.*call/i,
      /schedule.*meeting/i,
      /get.*quote/i,
      /try.*demo/i,
      /contact.*us/i,
      /sign.*up/i,
      /start.*trial/i
    ];
    
    for (const pattern of ctaPatterns) {
      if (pattern.test(content)) {
        const match = content.match(pattern)[0];
        return {
          text: this.formatCTAText(match),
          action: this.determineCTAAction(match, intent),
          priority: 'high'
        };
      }
    }
    
    // Intent-based CTAs
    if (intent === 'pricing_inquiry') {
      return {
        text: 'Get Custom Quote',
        action: 'get_quote',
        priority: 'medium'
      };
    } else if (intent === 'service_inquiry') {
      return {
        text: 'Book Free Demo',
        action: 'book_demo',
        priority: 'medium'
      };
    } else if (intent === 'booking_request') {
      return {
        text: 'Schedule Call',
        action: 'schedule_call',
        priority: 'high'
      };
    }
    
    return null;
  }

  /**
   * Determine conversation phase
   */
  static determineConversationPhase(messages) {
    if (!messages || messages.length === 0) {
      return 'initial';
    }
    
    if (messages.length <= 2) {
      return 'initial';
    } else if (messages.length <= 6) {
      return 'engaged';
    } else {
      return 'advanced';
    }
  }

  /**
   * Build user profile from conversation
   */
  static buildUserProfile(sessionId, messages) {
    const profile = {
      sessionId,
      messageCount: messages.length,
      interests: [],
      intent: 'unknown',
      engagementLevel: 'low'
    };
    
    // Analyze messages for interests and intent
    const userMessages = messages.filter(msg => msg.role === 'user');
    const allContent = userMessages.map(msg => msg.content).join(' ').toLowerCase();
    
    // Detect interests
    if (allContent.includes('recruitment') || allContent.includes('hiring')) {
      profile.interests.push('recruitment');
    }
    if (allContent.includes('hr') || allContent.includes('human resource')) {
      profile.interests.push('hr_management');
    }
    if (allContent.includes('resume') || allContent.includes('cv')) {
      profile.interests.push('resume_services');
    }
    if (allContent.includes('pricing') || allContent.includes('cost')) {
      profile.interests.push('pricing');
    }
    
    // Determine engagement level
    if (messages.length > 6) {
      profile.engagementLevel = 'high';
    } else if (messages.length > 3) {
      profile.engagementLevel = 'medium';
    }
    
    return profile;
  }

  /**
   * Format CTA text for display
   */
  static formatCTAText(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  /**
   * Determine CTA action type
   */
  static determineCTAAction(text, intent) {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('book') || lowerText.includes('schedule')) {
      return 'schedule_call';
    } else if (lowerText.includes('quote')) {
      return 'get_quote';
    } else if (lowerText.includes('demo') || lowerText.includes('trial')) {
      return 'book_demo';
    } else if (lowerText.includes('contact')) {
      return 'contact_us';
    }
    
    return 'default';
  }

  /**
   * Extract entities from message
   */
  static extractEntities(message) {
    const entities = {};

    // Email extraction
    const emailMatch = message.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
    if (emailMatch) entities.email = emailMatch[0];

    // Phone extraction (Indian numbers)
    const phoneMatch = message.match(/(?:\+91|91)?\s*[6-9]\d{9}/);
    if (phoneMatch) entities.phone = phoneMatch[0];

    // Company size extraction
    const companySizePatterns = {
      'startup': /startup|small team|few people/i,
      'small': /small company|10-50|under 50/i,
      'medium': /medium|100-500|mid-size/i,
      'large': /large company|500+|big company/i,
      'enterprise': /enterprise|1000+|multinational/i
    };

    for (const [size, pattern] of Object.entries(companySizePatterns)) {
      if (pattern.test(message)) {
        entities.companySize = size;
        break;
      }
    }

    // Budget extraction
    const budgetMatch = message.match(/(\d+(?:,\d+)*)\s*(lakh|thousand|crore|rupees?|rs|₹)/i);
    if (budgetMatch) entities.budget = budgetMatch[0];

    // Name extraction (when user introduces themselves)
    const nameMatch = message.match(/(?:i am|my name is|i'm|call me)\s+([a-zA-Z\s]+)/i);
    if (nameMatch) entities.name = nameMatch[1].trim();

    return entities;
  }

  /**
   * Enhanced streaming chat with improved error handling
   */
  static async chatTurnStreaming(messages, sessionId, conversationId, context, onChunk) {
    try {
      const systemPrompt = this.buildSystemPrompt(context);
      
      const tools = Object.entries(this.tools).map(([name, tool]) => ({
        type: "function",
        function: {
          name,
          description: tool.description,
          parameters: tool.parameters
        }
      }));

      const requestBody = {
        model: CONFIG.OPENAI_MODEL,
        temperature: CONFIG.TEMPERATURE,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.slice(-CONFIG.MAX_CONTEXT_MESSAGES)
        ],
        tools,
        tool_choice: 'auto',
        max_tokens: CONFIG.MAX_TOKENS,
        stream: true,
        user: sessionId // For usage tracking
      };

      const response = await this.makeOpenAIRequest(requestBody);
      
      return await this.processStreamingResponse(response, onChunk, sessionId, conversationId);

    } catch (error) {
      console.error('Error in streaming chat turn:', error);
      throw new ChatbotServiceError(`Chat processing failed: ${error.message}`, 'CHAT_ERROR');
    }
  }

  /**
   * Make OpenAI request with retry logic
   */
  static async makeOpenAIRequest(requestBody, retryCount = 0) {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      throw new ChatbotServiceError('OpenAI API key not configured', 'CONFIG_ERROR');
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'User-Agent': 'HireWithPrachi-Chatbot/1.0'
        },
        body: JSON.stringify(requestBody),
        signal: AbortSignal.timeout(CONFIG.REQUEST_TIMEOUT)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Handle rate limiting
        if (response.status === 429 && retryCount < CONFIG.MAX_RETRIES) {
          const retryAfter = parseInt(response.headers.get('retry-after') || '1') * 1000;
          await new Promise(resolve => setTimeout(resolve, retryAfter));
          return this.makeOpenAIRequest(requestBody, retryCount + 1);
        }

        throw new APIError(
          errorData.error?.message || `OpenAI API error: ${response.status}`, 
          response.status
        );
      }

      return response;

    } catch (error) {
      if (error.name === 'AbortError') {
        throw new ChatbotServiceError('Request timeout', 'TIMEOUT_ERROR');
      }
      
      // Retry on network errors
      if (retryCount < CONFIG.MAX_RETRIES && this.isRetryableError(error)) {
        const delay = CONFIG.RETRY_DELAY * Math.pow(2, retryCount);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.makeOpenAIRequest(requestBody, retryCount + 1);
      }

      throw error;
    }
  }

  /**
   * Process streaming response with tool calls support
   */
  static async processStreamingResponse(response, onChunk, sessionId, conversationId) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullContent = '';
    let buffer = '';
    let toolCalls = [];

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;

            try {
              const parsed = JSON.parse(data);
              const choice = parsed.choices?.[0];
              
              if (!choice) continue;

              const delta = choice.delta;
              
              // Handle content streaming
              if (delta?.content) {
                fullContent += delta.content;
                onChunk?.(delta.content);
              }

              // Handle tool calls
              if (delta?.tool_calls) {
                this.processToolCallDeltas(delta.tool_calls, toolCalls);
              }

              // Handle completion
              if (choice.finish_reason === 'tool_calls') {
                const toolResults = await this.executeToolCalls(toolCalls, sessionId);
                // For streaming, we'll append tool results to content
                fullContent += this.formatToolResults(toolResults);
              }

            } catch (parseError) {
              console.warn('Failed to parse streaming chunk:', parseError.message);
            }
          }
        }
      }

      return {
        content: fullContent,
        role: 'assistant',
        toolCalls,
        tokensUsed: this.estimateTokens(fullContent)
      };

    } finally {
      reader.releaseLock();
    }
  }

  /**
   * Execute multiple tool calls in parallel
   */
  static async executeToolCalls(toolCalls, sessionId) {
    const results = await Promise.allSettled(
      toolCalls.map(async (call) => {
        try {
          const args = JSON.parse(call.function.arguments);
          return await this.executeTool(call.function.name, args, { sessionId });
        } catch (error) {
          console.error(`Tool call failed: ${call.function.name}`, error);
          return { success: false, error: error.message };
        }
      })
    );

    return results.map((result, index) => ({
      toolCall: toolCalls[index],
      result: result.status === 'fulfilled' ? result.value : { success: false, error: result.reason?.message }
    }));
  }

  /**
   * Enhanced conversation analytics and insights
   */
  static async updateConversationAnalytics(conversationId, data) {
    try {
      const analytics = {
        conversation_id: conversationId,
        messages_count: data.messagesCount,
        last_intent: data.lastIntent,
        lead_score: data.leadScore,
        session_duration: data.sessionDuration,
        tools_used: data.toolsUsed || [],
        conversion_events: data.conversionEvents || [],
        updated_at: new Date().toISOString()
      };

      // In production, save to analytics database
      // For now, track in memory
      this.trackEvent('conversation_analytics', analytics);

    } catch (error) {
      console.warn('Failed to update conversation analytics:', error);
    }
  }

  /**
   * Smart lead auto-save logic
   */
  static shouldAutoSaveLead(sessionId, intentAnalysis) {
    const session = this.sessionMetadata.get(sessionId);
    if (!session) return false;

    // Don't auto-save if already saved
    if (this.leadProfiles.has(sessionId)) return false;

    // High-intent conversations
    if (intentAnalysis.primaryIntent === 'booking_intent' && intentAnalysis.confidence > 0.7) {
      return true;
    }

    // Multiple messages with business intent
    if (session.messageCount >= 5 && 
        ['pricing_inquiry', 'service_inquiry', 'recruitment_help'].includes(intentAnalysis.primaryIntent)) {
      return true;
    }

    // Contact information provided
    if (intentAnalysis.entities.email || intentAnalysis.entities.phone) {
      return true;
    }

    return false;
  }

  /**
   * Enhanced quick replies generation
   */
  static generateQuickReplies(content, context = {}) {
    const replies = [];
    const contentLower = content.toLowerCase();
    const { intent, entities, conversationPhase } = context;

    // Intent-based replies
    if (intent === 'pricing_inquiry' || contentLower.includes('pricing') || contentLower.includes('cost')) {
      replies.push('View Detailed Pricing', 'Get Custom Quote', 'Compare Plans');
    }
    
    else if (intent === 'booking_intent' || contentLower.includes('book') || contentLower.includes('call')) {
      replies.push('Book Free Consultation', 'Schedule Demo', 'Choose Time Slot');
    }
    
    else if (intent === 'service_inquiry' || contentLower.includes('service') || contentLower.includes('tool')) {
      replies.push('Browse All Services', 'HR Tools Demo', 'Success Stories');
    }
    
    else if (contentLower.includes('resume') || contentLower.includes('cv')) {
      replies.push('Resume Templates', 'CV Review Service', 'Career Guidance');
    }
    
    else if (contentLower.includes('hiring') || contentLower.includes('recruitment')) {
      replies.push('Recruitment Solutions', 'JD Generator', 'Screening Tools');
    }
    
    else if (contentLower.includes('interview')) {
      replies.push('Interview Prep Kit', 'Mock Interviews', 'Question Bank');
    }

    // Phase-based replies
    if (conversationPhase === 'initial' && replies.length === 0) {
      replies.push('Our Services', 'Free Resources', 'Get Started');
    }
    
    else if (conversationPhase === 'qualification' && replies.length === 0) {
      replies.push('Book Consultation', 'Get Pricing', 'See Case Studies');
    }
    
    else if (conversationPhase === 'conversion' && replies.length === 0) {
      replies.push('Start Free Trial', 'Schedule Demo', 'Contact Sales');
    }

    // Default helpful options
    if (replies.length === 0) {
      replies.push('Our Services', 'Pricing Plans', 'Book a Call', 'Free Tools');
    }

    // Add contextual support options
    if (!replies.includes('WhatsApp Support') && entities?.phone) {
      replies.push('WhatsApp Support');
    }

    return replies.slice(0, 3); // Limit to 3 for better UX
  }

  /**
   * Enhanced CTA extraction with conversion optimization
   */
  static extractCTA(content, context = {}) {
    const contentLower = content.toLowerCase();
    const { intent, leadScore = 0 } = context;

    // High-priority CTAs for qualified leads
    if (leadScore >= CONFIG.HIGH_PRIORITY_SCORE) {
      if (contentLower.includes('call') || contentLower.includes('consultation')) {
        return {
          type: 'priority_booking',
          text: 'Book Priority Consultation',
          url: 'https://calendly.com/hirewithprachi/priority-consultation',
          style: 'primary',
          urgency: 'high'
        };
      }
    }

    // Intent-based CTAs
    if (intent === 'booking_intent' || contentLower.includes('book') || contentLower.includes('schedule')) {
      return {
        type: 'booking',
        text: 'Book Free Consultation',
        url: 'https://calendly.com/hirewithprachi/consultation',
        style: 'primary'
      };
    }

    if (intent === 'pricing_inquiry' || contentLower.includes('pricing') || contentLower.includes('quote')) {
      return {
        type: 'pricing',
        text: 'Get Custom Quote',
        url: '/pricing?source=chatbot',
        style: 'secondary'
      };
    }

    if (contentLower.includes('demo') || contentLower.includes('try')) {
      return {
        type: 'demo',
        text: 'Try Free Demo',
        url: '/demo?source=chatbot',
        style: 'primary'
      };
    }

    if (contentLower.includes('whatsapp') || contentLower.includes('chat')) {
      return {
        type: 'whatsapp',
        text: 'WhatsApp Us',
        url: 'https://wa.me/919876543210?text=Hi, I need help with HR solutions',
        style: 'success'
      };
    }

    if (contentLower.includes('download') || contentLower.includes('resource') || contentLower.includes('template')) {
      return {
        type: 'download',
        text: 'Download Free Resources',
        url: '/resources?source=chatbot',
        style: 'outline'
      };
    }

    return null;
  }

  /**
   * Utility functions for service management
   */

  static validateMessageInput(sessionId, message) {
    if (!sessionId || typeof sessionId !== 'string') {
      throw new ValidationError('Invalid session ID');
    }
    if (!message || typeof message !== 'string') {
      throw new ValidationError('Message must be a non-empty string');
    }
    if (message.length > 5000) {
      throw new ValidationError('Message too long (max 5000 characters)');
    }
  }

  static sanitizeMessage(message) {
    return message
      .trim()
      .replace(/[<>]/g, '') // Basic XSS prevention
      .substring(0, 5000); // Enforce length limit
  }

  static updateSessionMetadata(sessionId, updates) {
    const current = this.sessionMetadata.get(sessionId) || {};
    this.sessionMetadata.set(sessionId, { ...current, ...updates });
  }

  static determineConversationPhase(messages) {
    if (messages.length <= 2) return 'initial';
    if (messages.length <= 5) return 'discovery';
    if (messages.length <= 8) return 'qualification';
    return 'conversion';
  }

  static buildUserProfile(sessionId, messages) {
    const entities = {};
    const interests = new Set();

    // Extract information from conversation
    messages.forEach(msg => {
      if (msg.role === 'user') {
        const msgEntities = this.extractEntities(msg.content);
        Object.assign(entities, msgEntities);

        // Track interests
        const content = msg.content.toLowerCase();
        if (content.includes('resume')) interests.add('resume_services');
        if (content.includes('hiring')) interests.add('recruitment');
        if (content.includes('training')) interests.add('training');
        if (content.includes('compliance')) interests.add('compliance');
      }
    });

    return {
      ...entities,
      interests: Array.from(interests),
      sessionId,
      messageCount: messages.length
    };
  }

  static updateMetrics(duration, success) {
    this.metrics.averageResponseTime = (
      (this.metrics.averageResponseTime * (this.metrics.totalRequests - 1)) + duration
    ) / this.metrics.totalRequests;

    if (!success) {
      this.metrics.totalErrors++;
    }
  }

  static trackEvent(eventType, data) {
    this.analyticsEvents.push({
      type: eventType,
      data,
      timestamp: new Date().toISOString(),
      sessionId: data.sessionId
    });

    // Prevent memory bloat
    if (this.analyticsEvents.length > 1000) {
      this.analyticsEvents.splice(0, 500);
    }
  }

  static cleanupExpiredSessions() {
    const cutoffTime = Date.now() - (CONFIG.MAX_CONVERSATION_AGE_HOURS * 3600000);
    
    for (const [sessionId, conversation] of this.conversations) {
      if (new Date(conversation.created_at).getTime() < cutoffTime) {
        this.conversations.delete(sessionId);
        this.messages.delete(conversation.id);
        this.sessionMetadata.delete(sessionId);
        this.leadProfiles.delete(sessionId);
      }
    }
  }

  static cleanupCache() {
    for (const [key, item] of this.cache) {
      if (item.timestamp < Date.now() - CONFIG.CACHE_TTL) {
        this.cache.delete(key);
      }
    }
  }

  static flushAnalytics() {
    if (this.analyticsEvents.length === 0) return;

    // In production, send to analytics service
    console.log(`Flushing ${this.analyticsEvents.length} analytics events`);
    this.analyticsEvents.length = 0;
  }

  static isRetryableError(error) {
    return error.code === 'NETWORK_ERROR' || 
           error.code === 'TIMEOUT_ERROR' || 
           error.statusCode >= 500;
  }

  static estimateTokens(text) {
    return Math.ceil(text.length / 4); // Rough estimation
  }

  static generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Additional utility methods...
  static generateErrorResponse(error) {
    if (error instanceof ValidationError) {
      return "I need some clarification to help you better. Could you please rephrase your request?";
    }
    
    if (error instanceof APIError) {
      return "I'm experiencing some technical difficulties right now. Please try again in a moment, or contact our support team if the issue persists.";
    }

    return "I apologize for the inconvenience. Let me connect you with our support team to resolve this quickly.";
  }

  // Initialize the service
  static {
    this.initialize();
  }
}