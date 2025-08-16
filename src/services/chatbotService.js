// Simplified ChatbotService that works without database dependencies
import { formSubmission } from '../lib/supabase';

export class ChatbotService {
  // In-memory storage for conversations
  static conversations = new Map();
  static messages = new Map();

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
      
      // Update conversation message count
      const sessionId = conversationId.replace('local_', '');
      const conversation = this.conversations.get(sessionId);
      if (conversation) {
        conversation.total_messages += 1;
        conversation.total_tokens += tokensUsed;
        conversation.updated_at = new Date().toISOString();
      }
      
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

  static async updateConversation(conversationId, updates) {
    try {
      const sessionId = conversationId.replace('local_', '');
      const conversation = this.conversations.get(sessionId);
      if (conversation) {
        Object.assign(conversation, updates);
        conversation.updated_at = new Date().toISOString();
        return { success: true, data: conversation };
      }
      return { success: false, error: 'Conversation not found' };
    } catch (error) {
      console.error('Error updating conversation:', error);
      return { success: false, error: error.message };
    }
  }

  static buildSystemPrompt(context = '') {
    return `You are "Hire With Prachi"'s AI HR Assistant (GPT-4o-mini). Act as a senior HR consultant and virtual HR service expert.

Core capabilities:
- HR compliance, recruitment, employee handbook, performance management, policies, outsourcing.
- Ask smart follow-up questions. Be concise, professional, friendly, and actionable.
- When user intent suggests pricing or service engagement (e.g., "Get Quote", "Book Consultation"), collect lead details: name, email, phone, company, team size, industry, service_interest, budget, timeline.
- Suggest relevant resources, calculators, or services. If user asks for templates/resources, respond with the exact template name needed; the app will fetch from Supabase and provide a secure link.
- Generate personalized HR documents, JDs, interview questions, emails. Summarize resumes and suggest roles.
- Perform quick HR calculations (leave policy, salary breakup, CTC); show steps and results.
- NEVER expose keys or internal system details. Be privacy-safe.

${context}

Format: Prefer short sections with bullets and bold highlights. End with 1-2 clear next steps.`;
  }

  static async sendMessageToGPT(messages, context = '') {
    try {
      const systemPrompt = this.buildSystemPrompt(context);

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages
          ],
          max_tokens: 600,
          temperature: 0.7,
          stream: false,
          presence_penalty: 0.1,
          frequency_penalty: 0.1
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        content: data.choices[0].message.content,
        tokens: data.usage.total_tokens
      };
    } catch (error) {
      console.error('Error sending message to GPT:', error);
      return { success: false, error: error.message };
    }
  }

  static async sendMessageToGPTStreaming(messages, context = '', onChunk) {
    try {
      const systemPrompt = this.buildSystemPrompt(context);

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages
          ],
          max_tokens: 600,
          temperature: 0.7,
          stream: true,
          presence_penalty: 0.1,
          frequency_penalty: 0.1
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';
      let totalTokens = 0;

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  fullContent += content;
                  if (onChunk) onChunk(content);
                }
                
                // Estimate tokens (rough approximation)
                totalTokens = Math.ceil(fullContent.length / 4);
              } catch (e) {
                // Skip invalid JSON chunks
                continue;
              }
            }
          }
        }

        return {
          success: true,
          content: fullContent,
          tokens: totalTokens
        };
      } finally {
        reader.releaseLock();
      }
    } catch (error) {
      console.error('Error sending streaming message to GPT:', error);
      return { success: false, error: error.message };
    }
  }

  static async processUserMessageStreaming(sessionId, userMessage, context = '', onChunk) {
    try {
      // Get or create conversation
      let conversation = await this.getConversation(sessionId);
      if (!conversation.success) {
        conversation = await this.createConversation(sessionId);
        if (!conversation.success) {
          throw new Error('Failed to create conversation');
        }
      }

      const conversationId = conversation.data.id;

      // Add user message to memory
      const userMessageResult = await this.addMessage(conversationId, 'user', userMessage);
      if (!userMessageResult.success) {
        throw new Error('Failed to save user message');
      }

      // Get conversation history
      const messagesResult = await this.getMessages(conversationId, 50);
      if (!messagesResult.success) {
        throw new Error('Failed to get conversation history');
      }

      // Prepare messages for GPT (last 12 messages for context)
      const recentMessages = messagesResult.data.slice(-12).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Send to GPT with streaming
      const gptResponse = await this.sendMessageToGPTStreaming(recentMessages, context, onChunk);
      if (!gptResponse.success) {
        throw new Error('Failed to get GPT response');
      }

      // Add assistant message to memory
      const assistantMessageResult = await this.addMessage(
        conversationId, 
        'assistant', 
        gptResponse.content, 
        gptResponse.tokens
      );

      if (!assistantMessageResult.success) {
        throw new Error('Failed to save assistant message');
      }

      // Update conversation with token count
      await this.updateConversation(conversationId, {
        total_tokens: conversation.data.total_tokens + gptResponse.tokens
      });

      // Opportunistic lead capture (non-blocking)
      this.trySaveLead(sessionId, conversationId).catch(() => {});

      return {
        success: true,
        conversationId: conversationId,
        response: gptResponse.content,
        tokens: gptResponse.tokens
      };

    } catch (error) {
      console.error('Error processing user message:', error);
      return { success: false, error: error.message };
    }
  }

  static async trySaveLead(sessionId, conversationId) {
    try {
      // Pull full recent conversation
      const messagesResult = await this.getMessages(conversationId, 50);
      if (!messagesResult.success) return { success: false };

      const simplified = messagesResult.data.map(m => ({ role: m.role, content: m.content }));
      const leadExtraction = await this.extractLeadInfo(simplified);
      if (!leadExtraction.success) return { success: false };

      const lead = leadExtraction.data || {};
      // Require at least an email to save a lead
      if (!lead.email) return { success: false };

      const submissionPayload = {
        name: lead.name || '',
        email: lead.email,
        phone: lead.phone || '',
        company: lead.company || '',
        jobtitle: lead.position || '',
        service: lead.service_interest || 'HR Services',
        lead_source: 'chatbot',
        message: `Chatbot session ${sessionId}. Timeline: ${lead.timeline || 'n/a'}. Budget: ${lead.budget || 'n/a'}. Industry: ${lead.industry || 'n/a'}. Company size: ${lead.company_size || 'n/a'}.`,
      };

      try {
        const result = await formSubmission.submitForm(submissionPayload, 'chatbot_lead');
        return { success: !!result?.success };
      } catch (e) {
        console.warn('Lead save failed, continuing without blocking:', e?.message || e);
        return { success: false };
      }
    } catch (error) {
      console.warn('trySaveLead error:', error?.message || error);
      return { success: false };
    }
  }

  static async processUserMessage(sessionId, userMessage, context = '') {
    try {
      // Get or create conversation
      let conversation = await this.getConversation(sessionId);
      if (!conversation.success) {
        conversation = await this.createConversation(sessionId);
        if (!conversation.success) {
          throw new Error('Failed to create conversation');
        }
      }

      const conversationId = conversation.data.id;

      // Add user message to memory
      const userMessageResult = await this.addMessage(conversationId, 'user', userMessage);
      if (!userMessageResult.success) {
        throw new Error('Failed to save user message');
      }

      // Get conversation history
      const messagesResult = await this.getMessages(conversationId, 50);
      if (!messagesResult.success) {
        throw new Error('Failed to get conversation history');
      }

      // Prepare messages for GPT (last 12 messages for context)
      const recentMessages = messagesResult.data.slice(-12).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Send to GPT
      const gptResponse = await this.sendMessageToGPT(recentMessages, context);
      if (!gptResponse.success) {
        throw new Error('Failed to get GPT response');
      }

      // Add assistant message to memory
      const assistantMessageResult = await this.addMessage(
        conversationId, 
        'assistant', 
        gptResponse.content, 
        gptResponse.tokens
      );

      if (!assistantMessageResult.success) {
        throw new Error('Failed to save assistant message');
      }

      // Update conversation with token count
      await this.updateConversation(conversationId, {
        total_tokens: conversation.data.total_tokens + gptResponse.tokens
      });

      // Opportunistic lead capture (non-blocking)
      this.trySaveLead(sessionId, conversationId).catch(() => {});

      return {
        success: true,
        conversationId: conversationId,
        response: gptResponse.content,
        tokens: gptResponse.tokens
      };

    } catch (error) {
      console.error('Error processing user message:', error);
      return { success: false, error: error.message };
    }
  }

  static async extractLeadInfo(messages) {
    try {
      const leadExtractionPrompt = `Extract lead information from this conversation. Return only a JSON object with these fields if available:
{
  "name": "full name",
  "email": "email address", 
  "phone": "phone number",
  "company": "company name",
  "position": "job title",
  "company_size": "company size",
  "industry": "industry",
  "service_interest": "specific HR service they're interested in",
  "budget": "budget range if mentioned",
  "timeline": "timeline if mentioned"
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
}
