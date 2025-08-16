// Chatbot UI Service - Bridge between chatbot-ui components and existing enhanced service
import { EnhancedChatbotService } from './enhancedChatbotService.js'

export class ChatbotUIService {
  static async sendMessage(message, sessionId) {
    try {
      // Use existing enhanced service with correct parameter order
      const response = await EnhancedChatbotService.processUserMessageStreaming(
        sessionId, 
        message
      )
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to process message');
      }
      
      return {
        content: response.response,
        quickReplies: response.quickReplies || [],
        cta: response.cta || null,
        leadInfo: null,
        toolCalls: null
      }
    } catch (error) {
      console.error('Chatbot UI Service Error:', error)
      throw error
    }
  }
  
  static async createSession() {
    return EnhancedChatbotService.generateSessionId()
  }
  
  static async saveLead(leadData) {
    return EnhancedChatbotService.createLead(leadData)
  }
  
  static async updateSession(sessionId, updates) {
    // Enhanced service uses in-memory storage, just log the update
    console.log('Session updated:', sessionId, updates);
    return { success: true };
  }
  
  static async detectIntent(message) {
    // Basic intent detection based on keywords
    const intents = {
      pricing: /pricing|price|cost|fee|charge|expensive|cheap/i,
      booking: /book|schedule|appointment|call|meeting|demo/i,
      services: /service|tool|template|resume|cv|interview|hr/i,
      support: /help|problem|issue|question|support/i,
      contact: /contact|phone|email|whatsapp|reach/i
    };
    
    for (const [intent, pattern] of Object.entries(intents)) {
      if (pattern.test(message)) {
        return intent;
      }
    }
    
    return 'general';
  }
  
  static async generateQuickReplies(message, context) {
    return EnhancedChatbotService.generateQuickReplies(message, context)
  }
  
  static async extractCTA(message) {
    return EnhancedChatbotService.extractCTA(message)
  }
  
  static async trySaveLead(sessionId, conversationId) {
    return EnhancedChatbotService.trySaveLead(sessionId, conversationId)
  }
}
