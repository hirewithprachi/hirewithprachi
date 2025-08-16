// Enhanced Chatbot Service with Function Calling, RAG, and Analytics
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export class EnhancedChatbotService {
  static conversations = new Map();
  static messages = new Map();
  static leadProfiles = new Map(); // Track lead information gathering

  static buildSystemPrompt(context = '') {
    return `You are "Prachi's HR Assistant" - an expert AI assistant for hirewithprachi.com, India's leading HR consultancy.

PERSONALITY & TONE:
- Speak like a warm, professional HR expert who genuinely cares about helping people
- Use friendly Hinglish (mix of English and Hindi words naturally)
- Be conversational, empathetic, and solution-oriented
- Show enthusiasm about HR solutions and career growth

PRIMARY GOALS:
1. UNDERSTAND THE VISITOR: Identify their role (Job Seeker, Employer, HR Professional, Student)
2. GATHER CONTACT INFO: Naturally collect name → email → phone with proper consent
3. PROVIDE VALUE: Offer relevant HR services, tools, and guidance
4. GUIDE TO ACTION: Direct to appropriate CTAs (Demo, Call, Purchase, Download)

INFORMATION GATHERING STRATEGY:
- Start with understanding their current situation/challenge
- Ask one question at a time to avoid overwhelming
- Show genuine interest in their career/business goals
- Offer immediate value before asking for contact details
- Use consent-based approach: "To send you the best resources, may I have your email?"

KEY SERVICES TO PROMOTE:
- HR Tools & Resources: Resume templates, JD generators, interview prep
- HR Consulting: Recruitment, compliance, policies, training
- Career Services: Resume reviews, interview coaching, career guidance
- Business Services: HR audits, cost analysis, process optimization

RESPONSE STRUCTURE:
1. Acknowledge their message warmly
2. Provide helpful information/solution
3. Ask one relevant follow-up question
4. Suggest next action with clear CTA

LEAD QUALIFICATION QUESTIONS:
- "What brings you here today? Job search ya hiring ke liye?"
- "What's your current role/industry?"
- "What's your biggest HR challenge right now?"
- "Company size?" (for employers)
- "Experience level?" (for job seekers)

TOOLS AVAILABLE:
- get_services: Get AI HR tools list
- get_pricing: Get pricing for specific tools
- create_lead: Save visitor contact info with consent
- schedule_call: Book consultation calls
- create_order: Process payments for tools
- send_whatsapp_optin: Send WhatsApp verification

CONVERSATION FLOW:
1. Warm greeting + understand their need
2. Provide relevant solution/information
3. Offer to help further with contact collection
4. Guide to appropriate next action

Remember: Build trust first, then gather information naturally. Always ask for consent before saving details.

${context}`;
  }

  static tools = {
    get_services: {
      description: "Fetch AI HR tools/templates listing by category",
      parameters: { 
        type: "object", 
        properties: { 
          category: { type: "string", enum: ["resume", "interview", "recruitment", "compliance", "all"] } 
        } 
      }
    },
    get_pricing: {
      description: "Fetch pricing information for a specific tool",
      parameters: { 
        type: "object", 
        properties: { 
          tool_id: { type: "string" } 
        }, 
        required: ["tool_id"] 
      }
    },
    get_page_copy: {
      description: "Get website content by page slug",
      parameters: { 
        type: "object", 
        properties: { 
          slug: { type: "string" } 
        }, 
        required: ["slug"] 
      }
    },
    get_faqs: {
      description: "Get frequently asked questions by category",
      parameters: { 
        type: "object", 
        properties: { 
          category: { type: "string" } 
        } 
      }
    },
    create_lead: {
      description: "Create a lead record with visitor information after getting consent",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string" }, 
          email: { type: "string" }, 
          phone: { type: "string" },
          company: { type: "string" },
          position: { type: "string" },
          company_size: { type: "string" },
          industry: { type: "string" },
          service_interest: { type: "string" },
          budget: { type: "string" },
          timeline: { type: "string" },
          notes: { type: "string" }, 
          source: { type: "string", default: "chatbot" }
        }, 
        required: ["name"]
      }
    },
    schedule_call: {
      description: "Book a consultation call or provide booking link",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string" }, 
          email: { type: "string" }, 
          phone: { type: "string" }, 
          preferred_time: { type: "string" },
          consultation_type: { type: "string" }
        }, 
        required: ["name"]
      }
    },
    create_order: {
      description: "Create payment order for AI HR tools",
      parameters: {
        type: "object",
        properties: { 
          tool_id: { type: "string" }, 
          plan_id: { type: "string" }, 
          amount_inr: { type: "number" },
          user_email: { type: "string" }
        },
        required: ["tool_id", "amount_inr"]
      }
    },
    send_whatsapp_optin: {
      description: "Send WhatsApp verification for Indian phone numbers",
      parameters: {
        type: "object",
        properties: { 
          phone: { type: "string" }, 
          name: { type: "string" }, 
          purpose: { type: "string", default: "HR assistance" } 
        },
        required: ["phone"]
      }
    }
  };

  static async executeTool(toolName, parameters) {
    try {
      switch (toolName) {
        case 'get_services':
          return await this.getServices(parameters.category);
        case 'get_pricing':
          return await this.getPricing(parameters.tool_id);
        case 'get_page_copy':
          return await this.getPageCopy(parameters.slug);
        case 'get_faqs':
          return await this.getFaqs(parameters.category);
        case 'get_slots':
          return await this.getSlots(parameters.from, parameters.to);
        case 'create_lead':
          return await this.createLead(parameters);
        case 'schedule_call':
          return await this.scheduleCall(parameters);
        case 'create_order':
          return await this.createOrder(parameters);
        case 'send_whatsapp_optin':
          return await this.sendWhatsAppOptin(parameters);
        default:
          throw new Error(`Unknown tool: ${toolName}`);
      }
    } catch (error) {
      console.error(`Error executing tool ${toolName}:`, error);
      return { error: error.message };
    }
  }

  static async getServices(category = null) {
    try {
      let query = supabase
        .from('ai_hr_tools')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (category && category !== 'All') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      if (error) throw error;

      return {
        success: true,
        services: data || [],
        count: data?.length || 0
      };
    } catch (error) {
      console.error('Error fetching services:', error);
      return { success: false, error: error.message };
    }
  }

  static async getPricing(toolId) {
    try {
      const { data, error } = await supabase
        .from('service_pricing')
        .select('*')
        .eq('tool_id', toolId)
        .order('amount_inr', { ascending: true });

      if (error) throw error;

      return {
        success: true,
        pricing: data || [],
        count: data?.length || 0
      };
    } catch (error) {
      console.error('Error fetching pricing:', error);
      return { success: false, error: error.message };
    }
  }

  static async getPageCopy(slug) {
    try {
      const { data, error } = await supabase
        .from('site_copies')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;

      return {
        success: true,
        content: data?.content || '',
        title: data?.title || ''
      };
    } catch (error) {
      console.error('Error fetching page copy:', error);
      return { success: false, error: error.message };
    }
  }

  static async getFaqs(category = null) {
    try {
      let query = supabase
        .from('faqs')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      if (error) throw error;

      return {
        success: true,
        faqs: data || [],
        count: data?.length || 0
      };
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      return { success: false, error: error.message };
    }
  }

  static async getSlots(from = null, to = null) {
    try {
      let query = supabase
        .from('booking_slots')
        .select('*')
        .eq('is_available', true)
        .gte('start_at', new Date().toISOString())
        .order('start_at', { ascending: true });

      if (from) {
        query = query.gte('start_at', from);
      }
      if (to) {
        query = query.lte('end_at', to);
      }

      const { data, error } = await query.limit(10);
      if (error) throw error;

      return {
        success: true,
        slots: data || [],
        count: data?.length || 0
      };
    } catch (error) {
      console.error('Error fetching slots:', error);
      return { success: false, error: error.message };
    }
  }

  static async createLead(parameters) {
    try {
      const { 
        name, email, phone, company, position, company_size, 
        industry, service_interest, budget, timeline, notes, 
        source = 'chatbot' 
      } = parameters;
      
      if (!name) {
        return { success: false, error: 'Name is required' };
      }

      const leadData = {
        name,
        email: email || null,
        phone: phone || null,
        company: company || null,
        position: position || null,
        company_size: company_size || null,
        industry: industry || null,
        service_interest: service_interest || null,
        budget: budget || null,
        timeline: timeline || null,
        source,
        notes: notes || null,
        consent: true,
        consent_given_at: new Date().toISOString(),
        lead_score: this.calculateLeadScore(parameters),
        status: 'new'
      };

      const { data, error } = await supabase
        .from('chatbot_leads')
        .insert([leadData])
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        lead_id: data.id,
        message: 'Thank you! Your information has been saved securely. Our team will reach out soon! 😊'
      };
    } catch (error) {
      console.error('Error creating lead:', error);
      return { success: false, error: error.message };
    }
  }

  static calculateLeadScore(lead) {
    let score = 0;
    
    // Contact completeness
    if (lead.email) score += 25;
    if (lead.phone) score += 25;
    
    // Professional details
    if (lead.company) score += 15;
    if (lead.position) score += 15;
    
    // Business potential
    if (lead.budget) score += 10;
    if (lead.timeline) score += 10;
    
    return Math.min(score, 100);
  }

  static async processUserMessageStreaming(sessionId, userMessage, context = '', onChunk) {
    try {
      let conversation = await this.getConversation(sessionId);
      if (!conversation.success) {
        conversation = await this.createConversation(sessionId);
        if (!conversation.success) {
          throw new Error('Failed to create conversation');
        }
      }

      const conversationId = conversation.data.id;

      // Store user message
      await this.addMessage(conversationId, 'user', userMessage);

      // Get conversation history
      const messagesResult = await this.getMessages(conversationId, 12);
      if (!messagesResult.success) {
        throw new Error('Failed to get conversation history');
      }

      const recentMessages = messagesResult.data.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Get AI response
      const assistantMessage = await this.chatTurn(recentMessages, sessionId, conversationId);
      
      // Store assistant message
      await this.addMessage(conversationId, 'assistant', assistantMessage.content);

      // Try to extract and save lead information automatically
      this.trySaveLead(sessionId, conversationId).catch(() => {});

      return {
        success: true,
        conversationId: conversationId,
        response: assistantMessage.content,
        quickReplies: this.generateQuickReplies(assistantMessage.content),
        cta: this.extractCTA(assistantMessage.content)
      };

    } catch (error) {
      console.error('Error processing user message:', error);
      return { 
        success: false, 
        error: error.message,
        response: "I'm sorry, I encountered an issue. Please try again or contact our support team."
      };
    }
  }

  static generateQuickReplies(content) {
    const replies = [];
    const contentLower = content.toLowerCase();
    
    // Context-aware quick replies
    if (contentLower.includes('resume') || contentLower.includes('cv')) {
      replies.push('Resume Review', 'CV Templates', 'Resume Tips');
    }
    
    if (contentLower.includes('interview')) {
      replies.push('Interview Prep', 'Common Questions', 'Mock Interview');
    }
    
    if (contentLower.includes('pricing') || contentLower.includes('cost')) {
      replies.push('View Pricing', 'Free Tools', 'Get Quote');
    }
    
    if (contentLower.includes('hiring') || contentLower.includes('recruitment')) {
      replies.push('JD Generator', 'Screening Tools', 'HR Audit');
    }
    
    if (contentLower.includes('book') || contentLower.includes('call') || contentLower.includes('consultation')) {
      replies.push('Book Free Call', 'Schedule Demo', 'WhatsApp Chat');
    }
    
    // Default helpful options
    if (replies.length === 0) {
      replies.push('Our Services', 'Pricing', 'Book a Call', 'Free Resources');
    }
    
    return replies.slice(0, 3); // Limit to 3 quick replies
  }

  static extractCTA(content) {
    const contentLower = content.toLowerCase();
    
    if (contentLower.includes('book') && (contentLower.includes('call') || contentLower.includes('consultation'))) {
      return { type: 'booking', text: 'Book Free Consultation', url: 'https://calendly.com/hirewithprachi/consultation' };
    }
    
    if (contentLower.includes('demo') || contentLower.includes('try')) {
              return { type: 'demo', text: 'Try Free Demo', url: '/resources' };
    }
    
    if (contentLower.includes('pricing') || contentLower.includes('quote')) {
              return { type: 'pricing', text: 'View Pricing', url: '/services' };
    }
    
    if (contentLower.includes('whatsapp')) {
      return { type: 'whatsapp', text: 'WhatsApp Support', url: 'https://wa.me/919876543210' };
    }
    
    if (contentLower.includes('download') || contentLower.includes('resource')) {
      return { type: 'download', text: 'Free Resources', url: '/resources' };
    }
    
    return null;
  }

  static async trySaveLead(sessionId, conversationId) {
    try {
      // Check if lead already exists for this session
      if (this.leadProfiles.has(sessionId)) {
        return { success: false, reason: 'Already processed' };
      }

      const messagesResult = await this.getMessages(conversationId, 50);
      if (!messagesResult.success) return { success: false };

      const simplified = messagesResult.data.map(m => ({ role: m.role, content: m.content }));
      const leadExtraction = await this.extractLeadInfo(simplified);
      
      if (!leadExtraction.success || !leadExtraction.data) {
        return { success: false, reason: 'No lead info extracted' };
      }

      const lead = leadExtraction.data;
      
      // Only save if we have at least name and email
      if (!lead.name || !lead.email) {
        return { success: false, reason: 'Insufficient contact info' };
      }

      // Mark this session as processed
      this.leadProfiles.set(sessionId, lead);

      const result = await this.createLead({
        name: lead.name,
        email: lead.email,
        phone: lead.phone || '',
        company: lead.company || '',
        position: lead.position || '',
        company_size: lead.company_size || '',
        industry: lead.industry || '',
        service_interest: lead.service_interest || '',
        budget: lead.budget || '',
        timeline: lead.timeline || '',
        notes: `Chatbot conversation ${sessionId}. Auto-extracted from conversation.`
      });

      return result;
    } catch (error) {
      console.warn('trySaveLead error:', error?.message || error);
      return { success: false, error: error.message };
    }
  }

  static async extractLeadInfo(messages) {
    try {
      const leadExtractionPrompt = `Analyze this conversation and extract lead information. Look for:

1. Personal Details: Name, email, phone number
2. Professional Info: Company name, job title/position, industry
3. Company Details: Company size (startup/small/medium/large/enterprise)
4. Intent: What HR service they're interested in
5. Budget/Timeline: Any mention of budget range or timeline

Return ONLY a JSON object with these exact fields (set to null if not mentioned):
{
  "name": "full name",
  "email": "email address", 
  "phone": "phone number with country code",
  "company": "company name",
  "position": "job title or role",
  "company_size": "startup/small/medium/large/enterprise",
  "industry": "industry sector",
  "service_interest": "specific HR service they need",
  "budget": "budget range if mentioned",
  "timeline": "when they need the service"
}

If a field is not mentioned, set it to null.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: leadExtractionPrompt },
            { role: 'user', content: JSON.stringify(messages) }
          ],
          max_tokens: 300,
          temperature: 0.1
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      try {
        const leadInfo = JSON.parse(content);
        return { success: true, data: leadInfo };
      } catch (parseError) {
        console.error('Failed to parse lead extraction:', content);
        return { success: false, error: 'Failed to parse lead information' };
      }

    } catch (error) {
      console.error('Error extracting lead info:', error);
      return { success: false, error: error.message };
    }
  }

  static generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  static async chatTurn(messages, sessionId, conversationId) {
    try {
      const systemPrompt = this.buildSystemPrompt();
      
      const tools = Object.entries(this.tools).map(([name, tool]) => ({
        type: "function",
        function: {
          name,
          description: tool.description,
          parameters: tool.parameters
        }
      }));

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          temperature: 0.3,
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages
          ],
          tools,
          tool_choice: 'auto',
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const choice = data.choices[0];

      if (choice.finish_reason === 'tool_calls') {
        const toolCalls = choice.message.tool_calls || [];
        const toolResponses = [];

        for (const call of toolCalls) {
          const result = await this.executeTool(
            call.function.name, 
            JSON.parse(call.function.arguments)
          );
          
          toolResponses.push({
            tool_call_id: call.id,
            role: 'tool',
            name: call.function.name,
            content: JSON.stringify(result)
          });
        }

        const finalResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            temperature: 0.3,
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages,
              choice.message,
              ...toolResponses
            ],
            max_tokens: 500
          })
        });

        if (!finalResponse.ok) {
          throw new Error(`OpenAI API error: ${finalResponse.status}`);
        }

        const finalData = await finalResponse.json();
        return finalData.choices[0].message;
      }

      return choice.message;
    } catch (error) {
      console.error('Error in chat turn:', error);
      throw error;
    }
  }

  static async createConversation(sessionId, leadData = {}) {
    try {
      const conversation = {
        id: `local_${sessionId}`,
        session_id: sessionId,
        lead_data: leadData,
        status: 'active',
        total_messages: 0,
        total_tokens: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      this.conversations.set(sessionId, conversation);
      return { success: true, data: conversation };
    } catch (error) {
      console.error('Error creating conversation:', error);
      return { success: false, error: error.message };
    }
  }

  static async getConversation(sessionId) {
    try {
      const conversation = this.conversations.get(sessionId);
      if (conversation) {
        return { success: true, data: conversation };
      }
      return { success: false, error: 'Conversation not found' };
    } catch (error) {
      console.error('Error getting conversation:', error);
      return { success: false, error: error.message };
    }
  }

  static async addMessage(conversationId, role, content, tokensUsed = 0, metadata = {}) {
    try {
      const message = {
        id: `local_${Date.now()}`,
        conversation_id: conversationId,
        role: role,
        content: content,
        tokens_used: tokensUsed,
        metadata: metadata,
        created_at: new Date().toISOString()
      };
      
      if (!this.messages.has(conversationId)) {
        this.messages.set(conversationId, []);
      }
      this.messages.get(conversationId).push(message);
      
      return { success: true, data: message };
    } catch (error) {
      console.error('Error adding message:', error);
      return { success: false, error: error.message };
    }
  }

  static async getMessages(conversationId, limit = 50) {
    try {
      const messages = this.messages.get(conversationId) || [];
      return { success: true, data: messages.slice(-limit) };
    } catch (error) {
      console.error('Error getting messages:', error);
      return { success: false, error: error.message };
    }
  }
}
