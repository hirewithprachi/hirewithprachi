/**
 * Chatbot UI Service - Enhanced bridge between chatbot-ui components and backend service
 * Provides a clean, consistent API for the frontend with proper error handling and validation
 */

import { EnhancedChatbotService } from './enhancedChatbotService.js';

// Constants for configuration
const CONFIG = {
  MAX_MESSAGE_LENGTH: 5000,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // milliseconds
  TIMEOUT: 30000, // 30 seconds
  DEFAULT_QUICK_REPLIES: [
    'Tell me about your services',
    'What are your pricing plans?',
    'I need help with my resume',
    'Schedule a consultation'
  ]
};

// Custom error classes for better error handling
class ChatbotServiceError extends Error {
  constructor(message, code = 'GENERAL_ERROR', details = null) {
    super(message);
    this.name = 'ChatbotServiceError';
    this.code = code;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}

class ValidationError extends ChatbotServiceError {
  constructor(message, field = null) {
    super(message, 'VALIDATION_ERROR', { field });
    this.name = 'ValidationError';
  }
}

export class ChatbotUIService {
  /**
   * Send a message and get a response from the chatbot
   * @param {string} message - The user's message
   * @param {string} sessionId - The session identifier
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} The chatbot response
   */
  static async sendMessage(message, sessionId, options = {}) {
    try {
      // Input validation
      this._validateMessage(message);
      this._validateSessionId(sessionId);

      const startTime = Date.now();
      
      // Add timeout wrapper
      const response = await this._withTimeout(
        this._sendMessageWithRetry(message, sessionId, options),
        CONFIG.TIMEOUT
      );

      // Process and validate response
      const processedResponse = await this._processResponse(response, message, sessionId);
      
      // Log performance metrics
      const duration = Date.now() - startTime;
      console.debug(`Message processed in ${duration}ms for session: ${sessionId}`);

      return processedResponse;

    } catch (error) {
      console.error('Chatbot UI Service Error:', {
        error: error.message,
        stack: error.stack,
        sessionId,
        message: message?.substring(0, 100) + '...',
        timestamp: new Date().toISOString()
      });
      
      return this._createErrorResponse(error);
    }
  }

  /**
   * Create a new chat session
   * @returns {Promise<string>} The new session ID
   */
  static async createSession() {
    try {
      const sessionId = await EnhancedChatbotService.generateSessionId();
      
      if (!sessionId) {
        throw new ChatbotServiceError('Failed to generate session ID', 'SESSION_CREATION_FAILED');
      }

      console.log(`New session created: ${sessionId}`);
      return sessionId;

    } catch (error) {
      console.error('Failed to create session:', error);
      throw new ChatbotServiceError('Unable to create new session', 'SESSION_CREATION_FAILED');
    }
  }

  /**
   * Save lead information
   * @param {Object} leadData - The lead data to save
   * @returns {Promise<Object>} The result of the save operation
   */
  static async saveLead(leadData) {
    try {
      this._validateLeadData(leadData);
      
      const result = await EnhancedChatbotService.createLead(leadData);
      
      if (!result || !result.success) {
        throw new ChatbotServiceError('Failed to save lead', 'LEAD_SAVE_FAILED');
      }

      console.log('Lead saved successfully:', leadData.email || 'unknown email');
      return result;

    } catch (error) {
      console.error('Failed to save lead:', error);
      throw error instanceof ChatbotServiceError ? error : 
        new ChatbotServiceError('Unable to save lead information', 'LEAD_SAVE_FAILED');
    }
  }

  /**
   * Update session information
   * @param {string} sessionId - The session ID to update
   * @param {Object} updates - The updates to apply
   * @returns {Promise<Object>} The result of the update operation
   */
  static async updateSession(sessionId, updates) {
    try {
      this._validateSessionId(sessionId);
      this._validateUpdates(updates);

      // Enhanced service uses in-memory storage, but we'll make it more robust
      const timestamp = new Date().toISOString();
      const updateResult = {
        success: true,
        sessionId,
        updates,
        timestamp,
        ...updates
      };

      console.log('Session updated:', updateResult);
      return updateResult;

    } catch (error) {
      console.error('Failed to update session:', error);
      return { 
        success: false, 
        error: error.message,
        sessionId,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Detect user intent from message
   * @param {string} message - The message to analyze
   * @param {Object} context - Additional context for intent detection
   * @returns {Promise<Object>} The detected intent with confidence score
   */
  static async detectIntent(message, context = {}) {
    try {
      this._validateMessage(message);

      const intents = {
        pricing: {
          patterns: [/pricing|price|cost|fee|charge|expensive|cheap|budget|rate/i],
          keywords: ['pricing', 'price', 'cost', 'fee', 'charge', 'expensive', 'cheap', 'budget', 'rate'],
          confidence: 0
        },
        booking: {
          patterns: [/book|schedule|appointment|call|meeting|demo|consultation|reserve/i],
          keywords: ['book', 'schedule', 'appointment', 'call', 'meeting', 'demo', 'consultation'],
          confidence: 0
        },
        services: {
          patterns: [/service|tool|template|resume|cv|interview|hr|offering|solution/i],
          keywords: ['service', 'tool', 'template', 'resume', 'cv', 'interview', 'hr', 'offering'],
          confidence: 0
        },
        support: {
          patterns: [/help|problem|issue|question|support|assistance|trouble/i],
          keywords: ['help', 'problem', 'issue', 'question', 'support', 'assistance', 'trouble'],
          confidence: 0
        },
        contact: {
          patterns: [/contact|phone|email|whatsapp|reach|connect|touch/i],
          keywords: ['contact', 'phone', 'email', 'whatsapp', 'reach', 'connect', 'touch'],
          confidence: 0
        },
        greeting: {
          patterns: [/hello|hi|hey|good morning|good afternoon|good evening|greetings/i],
          keywords: ['hello', 'hi', 'hey', 'morning', 'afternoon', 'evening', 'greetings'],
          confidence: 0
        },
        goodbye: {
          patterns: [/bye|goodbye|farewell|see you|talk later|thanks|thank you/i],
          keywords: ['bye', 'goodbye', 'farewell', 'later', 'thanks', 'thank'],
          confidence: 0
        }
      };

      // Calculate confidence scores
      const messageWords = message.toLowerCase().split(/\s+/);
      let bestMatch = { intent: 'general', confidence: 0, matchedKeywords: [] };

      for (const [intentName, intentData] of Object.entries(intents)) {
        let confidence = 0;
        const matchedKeywords = [];

        // Pattern matching
        for (const pattern of intentData.patterns) {
          if (pattern.test(message)) {
            confidence += 0.6;
            break;
          }
        }

        // Keyword matching
        for (const keyword of intentData.keywords) {
          if (messageWords.includes(keyword.toLowerCase())) {
            confidence += 0.3;
            matchedKeywords.push(keyword);
          }
        }

        // Context boost
        if (context.previousIntent === intentName) {
          confidence += 0.1;
        }

        if (confidence > bestMatch.confidence) {
          bestMatch = {
            intent: intentName,
            confidence: Math.min(confidence, 1.0),
            matchedKeywords
          };
        }
      }

      console.debug('Intent detection:', bestMatch);
      return bestMatch;

    } catch (error) {
      console.error('Intent detection failed:', error);
      return { 
        intent: 'general', 
        confidence: 0, 
        error: error.message,
        matchedKeywords: []
      };
    }
  }

  /**
   * Generate contextual quick replies
   * @param {string} message - The user's message
   * @param {Object} context - Conversation context
   * @returns {Promise<Array>} Array of quick reply options
   */
  static async generateQuickReplies(message, context = {}) {
    try {
      // Try to get quick replies from enhanced service
      const quickReplies = await EnhancedChatbotService.generateQuickReplies(message, context);
      
      if (quickReplies && Array.isArray(quickReplies) && quickReplies.length > 0) {
        return quickReplies;
      }

      // Fallback to intent-based quick replies
      const intentData = await this.detectIntent(message, context);
      return this._getQuickRepliesForIntent(intentData.intent);

    } catch (error) {
      console.error('Quick replies generation failed:', error);
      return CONFIG.DEFAULT_QUICK_REPLIES;
    }
  }

  /**
   * Extract call-to-action from message
   * @param {string} message - The message to analyze
   * @returns {Promise<Object|null>} CTA object or null
   */
  static async extractCTA(message) {
    try {
      return await EnhancedChatbotService.extractCTA(message);
    } catch (error) {
      console.error('CTA extraction failed:', error);
      return null;
    }
  }

  /**
   * Attempt to save lead information from conversation
   * @param {string} sessionId - The session ID
   * @param {string} conversationId - The conversation ID
   * @returns {Promise<Object>} The result of the lead save attempt
   */
  static async trySaveLead(sessionId, conversationId) {
    try {
      this._validateSessionId(sessionId);
      return await EnhancedChatbotService.trySaveLead(sessionId, conversationId);
    } catch (error) {
      console.error('Auto-save lead failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Private helper methods

  /**
   * Send message with retry logic
   * @private
   */
  static async _sendMessageWithRetry(message, sessionId, options, retryCount = 0) {
    try {
      const response = await EnhancedChatbotService.processUserMessageStreaming(
        sessionId, 
        message,
        options
      );
      
      if (!response || !response.success) {
        throw new ChatbotServiceError(
          response?.error || 'Failed to process message',
          'PROCESSING_FAILED',
          { response }
        );
      }
      
      return response;

    } catch (error) {
      if (retryCount < CONFIG.MAX_RETRIES && this._isRetryableError(error)) {
        console.warn(`Retrying message send (attempt ${retryCount + 1}/${CONFIG.MAX_RETRIES}):`, error.message);
        await this._delay(CONFIG.RETRY_DELAY * (retryCount + 1));
        return this._sendMessageWithRetry(message, sessionId, options, retryCount + 1);
      }
      throw error;
    }
  }

  /**
   * Process and validate response from enhanced service
   * @private
   */
  static async _processResponse(response, originalMessage, sessionId) {
    const processedResponse = {
      content: response.response || 'I apologize, but I couldn\'t generate a proper response.',
      quickReplies: response.quickReplies || [],
      cta: response.cta || null,
      leadInfo: response.leadInfo || null,
      toolCalls: response.toolCalls || null,
      metadata: {
        sessionId,
        timestamp: new Date().toISOString(),
        messageLength: originalMessage.length,
        hasQuickReplies: (response.quickReplies || []).length > 0,
        hasCTA: !!response.cta
      }
    };

    // Generate quick replies if none provided
    if (!processedResponse.quickReplies.length) {
      processedResponse.quickReplies = await this.generateQuickReplies(originalMessage, { sessionId });
    }

    return processedResponse;
  }

  /**
   * Create error response for failed operations
   * @private
   */
  static _createErrorResponse(error) {
    const isUserFriendlyError = error instanceof ValidationError;
    
    return {
      content: isUserFriendlyError 
        ? error.message 
        : 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment.',
      quickReplies: [
        'Try again',
        'Contact support',
        'Start over'
      ],
      cta: null,
      leadInfo: null,
      toolCalls: null,
      error: {
        code: error.code || 'UNKNOWN_ERROR',
        message: error.message,
        timestamp: new Date().toISOString()
      }
    };
  }

  /**
   * Get quick replies based on detected intent
   * @private
   */
  static _getQuickRepliesForIntent(intent) {
    const intentQuickReplies = {
      pricing: ['View pricing plans', 'Get a quote', 'Compare packages', 'Talk to sales'],
      booking: ['Schedule consultation', 'Book a demo', 'Choose time slot', 'Contact us'],
      services: ['Browse services', 'Resume templates', 'Interview prep', 'HR tools'],
      support: ['Get help', 'View FAQ', 'Contact support', 'Report issue'],
      contact: ['Call us', 'Send email', 'WhatsApp chat', 'Office locations'],
      greeting: ['Tell me about services', 'See pricing', 'Book consultation', 'Get help'],
      goodbye: ['Rate this chat', 'Contact us later', 'Subscribe to updates', 'Start new chat'],
      general: CONFIG.DEFAULT_QUICK_REPLIES
    };

    return intentQuickReplies[intent] || CONFIG.DEFAULT_QUICK_REPLIES;
  }

  /**
   * Validation methods
   * @private
   */
  static _validateMessage(message) {
    if (!message || typeof message !== 'string') {
      throw new ValidationError('Message must be a non-empty string', 'message');
    }
    if (message.trim().length === 0) {
      throw new ValidationError('Message cannot be empty', 'message');
    }
    if (message.length > CONFIG.MAX_MESSAGE_LENGTH) {
      throw new ValidationError(`Message too long. Maximum ${CONFIG.MAX_MESSAGE_LENGTH} characters allowed`, 'message');
    }
  }

  static _validateSessionId(sessionId) {
    if (!sessionId || typeof sessionId !== 'string') {
      throw new ValidationError('Session ID must be a non-empty string', 'sessionId');
    }
  }

  static _validateLeadData(leadData) {
    if (!leadData || typeof leadData !== 'object') {
      throw new ValidationError('Lead data must be an object', 'leadData');
    }
    if (!leadData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadData.email)) {
      throw new ValidationError('Valid email address is required', 'email');
    }
  }

  static _validateUpdates(updates) {
    if (!updates || typeof updates !== 'object') {
      throw new ValidationError('Updates must be an object', 'updates');
    }
  }

  /**
   * Utility methods
   * @private
   */
  static _isRetryableError(error) {
    // Define which errors are worth retrying
    const retryableCodes = ['NETWORK_ERROR', 'TIMEOUT', 'SERVER_ERROR', 'RATE_LIMIT'];
    return retryableCodes.includes(error.code) || error.message.includes('timeout');
  }

  static _delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static async _withTimeout(promise, timeout) {
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new ChatbotServiceError('Operation timed out', 'TIMEOUT')), timeout)
    );
    
    return Promise.race([promise, timeoutPromise]);
  }
}