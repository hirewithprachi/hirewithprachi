import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatbotUIService } from '../../services/chatbotUIService';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { 
  MessageCircle, 
  X, 
  Settings,
  Maximize2,
  Minimize2,
  RefreshCw,
  User,
  Bot
} from 'lucide-react';

export function ChatUI({ isOpen, onClose, isMinimized, onToggleMinimize }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Initialize session when chat opens
  useEffect(() => {
    if (isOpen && !sessionId) {
      initializeChat();
    }
  }, [isOpen, sessionId]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const initializeChat = async () => {
    try {
      const newSessionId = await ChatbotUIService.createSession();
      setSessionId(newSessionId);
      setConnectionStatus('connected');
      
      // Add welcome message
      const welcomeMessage = {
        role: 'assistant',
        content: `Hello! 👋 I'm Prachi's HR Assistant. I'm here to help you with:\n\n• Resume reviews and career guidance\n• HR tools and templates\n• Job search strategies\n• Hiring and recruitment\n• HR compliance and policies\n\nWhat brings you here today? Job search ya hiring ke liye? 😊`,
        timestamp: new Date().toISOString(),
        quickReplies: ['Resume Help', 'HR Tools', 'Job Search', 'Hiring Help', 'Pricing Info']
      };
      
      setMessages([welcomeMessage]);
    } catch (error) {
      console.error('Failed to initialize chat:', error);
      setConnectionStatus('error');
    }
  };

  // Handle sending message
  const handleSendMessage = async (message) => {
    if (!message.trim() || isTyping) return;

    setIsTyping(true);
    setConnectionStatus('connected');
    
    // Add user message
    const userMessage = { 
      role: 'user', 
      content: message,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Create abort controller for cancellation
    abortControllerRef.current = new AbortController();
    
    try {
      const response = await ChatbotUIService.sendMessage(message, sessionId);
      
      // Add assistant message
      const assistantMessage = { 
        role: 'assistant', 
        content: response.content,
        quickReplies: response.quickReplies || [],
        cta: response.cta || null,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, assistantMessage]);
      
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Message cancelled');
      } else {
        console.error('Error sending message:', error);
        setConnectionStatus('error');
        
        // Add error message with retry option
        const errorMessage = {
          role: 'assistant',
          content: 'Sorry, I encountered a technical issue. Please try again or contact our support team at support@hirewithprachi.com',
          isError: true,
          timestamp: new Date().toISOString(),
          quickReplies: ['Try Again', 'Contact Support', 'WhatsApp Help']
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } finally {
      setIsTyping(false);
      abortControllerRef.current = null;
    }
  };

  // Handle quick reply
  const handleQuickReply = (reply) => {
    if (reply === 'Try Again') {
      // Retry last user message
      const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
      if (lastUserMessage) {
        handleSendMessage(lastUserMessage.content);
      }
    } else if (reply === 'Contact Support') {
      window.open('mailto:support@hirewithprachi.com', '_blank');
    } else if (reply === 'WhatsApp Help') {
      window.open('https://wa.me/919876543210?text=Hi, I need help with HR services', '_blank');
    } else {
      handleSendMessage(reply);
    }
  };

  // Handle CTA click
  const handleCTA = (cta) => {
    console.log('CTA clicked:', cta);
    
    // Track CTA clicks
    if (sessionId) {
      console.log(`CTA clicked: ${cta.type} by session ${sessionId}`);
    }
    
    // Handle different CTA types
    switch (cta.type) {
      case 'booking':
        window.open(cta.url || 'https://calendly.com/hirewithprachi/consultation', '_blank');
        break;
      case 'demo':
        window.open(cta.url || '/resources', '_blank');
        break;
      case 'pricing':
        window.open(cta.url || '/services', '_blank');
        break;
      case 'whatsapp':
        window.open(cta.url || 'https://wa.me/919876543210', '_blank');
        break;
      case 'download':
        window.open(cta.url || '/resources', '_blank');
        break;
      default:
        if (cta.url) {
          window.open(cta.url, '_blank');
        }
    }
  };

  // Handle stop typing
  const handleStopTyping = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsTyping(false);
  };

  // Handle new chat
  const handleNewChat = () => {
    setMessages([]);
    setSessionId(null);
    setConnectionStatus('connecting');
    initializeChat();
  };

  // Handle maximize/minimize
  const handleToggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className={`fixed bottom-4 right-4 z-50 ${
        isMaximized 
          ? 'inset-4' 
          : isMinimized 
            ? 'w-16 h-16' 
            : 'w-96 h-[600px]'
      }`}
    >
      {/* Chat Container */}
      <div className={`bg-white/95 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl overflow-hidden ${
        isMaximized ? 'h-full' : isMinimized ? 'w-full h-full' : 'h-full'
      }`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500/90 to-blue-500/90 backdrop-blur-xl border-b border-white/40 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">
                Prachi's HR Assistant
              </h3>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  connectionStatus === 'connected' ? 'bg-green-400' :
                  connectionStatus === 'connecting' ? 'bg-yellow-400' :
                  'bg-red-400'
                }`} />
                <p className="text-white/80 text-xs">
                  {isTyping ? 'Typing...' : 
                   connectionStatus === 'connected' ? 'Online' :
                   connectionStatus === 'connecting' ? 'Connecting...' :
                   'Connection Issue'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* New Chat */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNewChat}
              className="p-1.5 text-white/80 hover:text-white transition-colors"
              title="New chat"
            >
              <RefreshCw className="w-4 h-4" />
            </motion.button>
            
            {/* Maximize/Minimize */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleMaximize}
              className="p-1.5 text-white/80 hover:text-white transition-colors"
              title={isMaximized ? "Minimize" : "Maximize"}
            >
              {isMaximized ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </motion.button>
            
            {/* Close */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Messages Area */}
        <div className={`flex-1 overflow-y-auto p-4 ${
          isMinimized ? 'hidden' : ''
        }`}>
          <div className="space-y-4">
            
            {/* Messages */}
            <AnimatePresence>
              {messages.map((message, index) => (
                <ChatMessage
                  key={`${message.timestamp}-${index}`}
                  message={message}
                  onQuickReply={handleQuickReply}
                  onCTA={handleCTA}
                />
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && <TypingIndicator />}
            </AnimatePresence>

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <AnimatePresence>
          {!isMinimized && (
            <ChatInput
              onSendMessage={handleSendMessage}
              isTyping={isTyping}
              onStopTyping={handleStopTyping}
              disabled={connectionStatus === 'error'}
              placeholder={connectionStatus === 'error' ? 
                'Connection issue - try refreshing...' : 
                'Type your message...'
              }
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
