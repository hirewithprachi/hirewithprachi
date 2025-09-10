import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EnhancedChatbotService } from '../services/enhancedChatbotService';

// Custom scrollbar styles
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(147, 51, 234, 0.3);
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(147, 51, 234, 0.5);
  }
`;

// Inject styles
if (typeof document !== 'undefined' && !document.getElementById('chatbot-scrollbar-styles')) {
  const styleElement = document.createElement('style');
  styleElement.id = 'chatbot-scrollbar-styles';
  styleElement.textContent = scrollbarStyles;
  document.head.appendChild(styleElement);
}
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Paperclip,
  Download,
  Settings,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RefreshCw,
  Maximize2,
  Minimize2,
  Clock,
  CheckCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowDown,
  ArrowRight,
  Star,
  Heart,
  Zap,
  Shield,
  Target
} from 'lucide-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Configure marked for better rendering
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: false,
  mangle: false
});

// ===== ENHANCED MODULAR COMPONENTS =====

// Polished Typing Indicator Component
const TypingIndicator = React.memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="flex items-center gap-3 mb-6"
  >
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-xl">
      <Bot className="w-5 h-5 text-purple-600" />
    </div>
    <div className="bg-gradient-to-r from-white/70 to-white/50 backdrop-blur-xl rounded-3xl px-6 py-4 border border-white/40 shadow-2xl">
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
        <span className="ml-3 text-sm font-medium text-gray-700">AI is thinking...</span>
      </div>
    </div>
  </motion.div>
));

// Enhanced Streaming Message Component
const StreamingMessage = React.memo(({ content, isComplete }) => {
  const renderMarkdown = useCallback((md) => {
    try {
      const html = marked.parse(md || '', { breaks: true });
      return DOMPurify.sanitize(html);
    } catch {
      return DOMPurify.sanitize((md || '').replace(/\n/g, '<br>'));
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-4 mb-6"
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-xl">
        <Bot className="w-5 h-5 text-purple-600" />
      </div>
      <div className="bg-gradient-to-r from-white/70 to-white/50 backdrop-blur-xl rounded-3xl px-6 py-4 border border-white/40 shadow-2xl max-w-[88%] relative">
        <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
        </div>
        {!isComplete && (
          <div className="absolute bottom-4 right-4 animate-pulse">
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
          </div>
        )}
      </div>
    </motion.div>
  );
});

// Message Component with Collapsible Content
const Message = React.memo(({ message, isCollapsed, onToggleCollapse }) => {
  const renderMarkdown = useCallback((md) => {
    try {
      const html = marked.parse(md || '', { breaks: true });
      return DOMPurify.sanitize(html);
    } catch {
      return DOMPurify.sanitize((md || '').replace(/\n/g, '<br>'));
    }
  }, []);

  const isLongMessage = message.content.length > 500;
  const previewContent = isLongMessage && isCollapsed 
    ? message.content.slice(0, 300) + '...' 
    : message.content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-4 mb-6"
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-xl">
        {message.role === 'user' ? (
          <User className="w-5 h-5 text-blue-600" />
        ) : (
          <Bot className="w-5 h-5 text-purple-600" />
        )}
      </div>
      <div className={`${message.role === 'user' 
        ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10' 
        : 'bg-gradient-to-r from-white/70 to-white/50'} 
        backdrop-blur-xl rounded-3xl px-6 py-4 border border-white/40 shadow-2xl max-w-[88%]`}
      >
        <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(previewContent) }} />
        </div>
        
        {isLongMessage && (
          <button 
            onClick={() => onToggleCollapse(message.id)}
            className="mt-2 text-xs flex items-center gap-1 text-purple-600 hover:text-purple-800 transition-colors"
          >
            {isCollapsed ? (
              <>
                <ChevronDown className="w-3 h-3" />
                Show more
              </>
            ) : (
              <>
                <ChevronUp className="w-3 h-3" />
                Show less
              </>
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
});

// Scroll to Bottom Button Component
const ScrollToBottom = React.memo(({ onClick, isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        onClick={onClick}
        className="absolute bottom-20 right-6 bg-white/80 backdrop-blur-md rounded-full p-2 shadow-lg border border-white/30 text-gray-600 hover:text-purple-600 transition-colors"
      >
        <ArrowDown className="w-5 h-5" />
      </motion.button>
    )}
  </AnimatePresence>
));

// Message Input Component
const MessageInput = React.memo(({ 
  inputMessage, 
  setInputMessage, 
  onSend, 
  isLoading, 
  onFileUpload,
  inputRef
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-3 sm:p-4 border-t border-white/20 bg-white/10 backdrop-blur-md rounded-b-3xl">
      <div className="relative flex items-end gap-2 sm:gap-3">
        <button
          onClick={onFileUpload}
          className="p-2 sm:p-2.5 rounded-full bg-white/50 hover:bg-white/80 text-gray-500 hover:text-purple-600 transition-all duration-200 hover:scale-110 shadow-sm"
          title="Upload file"
        >
          <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about HR services..."
            className="w-full bg-white/60 backdrop-blur-md rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 resize-none h-10 sm:h-12 max-h-32 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/70 border border-white/50 placeholder-gray-400 text-gray-700 text-sm sm:text-base transition-all duration-200"
            style={{ minHeight: '40px' }}
            rows={1}
          />
          <button
            onClick={onSend}
            disabled={isLoading || !inputMessage.trim()}
            className={`absolute right-2 sm:right-3 bottom-1.5 sm:bottom-2 p-1.5 sm:p-2 rounded-full transition-all duration-200 ${
              isLoading || !inputMessage.trim() 
                ? 'bg-gray-200 text-gray-400' 
                : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md hover:shadow-lg hover:scale-110'
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
            ) : (
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

// Quick Actions Component
const QuickActions = React.memo(({ onSelect }) => {
  const quickActions = [
    { text: "What HR services do you offer?", icon: "🎯", category: "Services" },
    { text: "How can you help with HR compliance?", icon: "🛡️", category: "Compliance" },
    { text: "Tell me about your recruitment services", icon: "👥", category: "Recruitment" },
    { text: "What are your pricing plans?", icon: "💰", category: "Pricing" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 sm:p-4 space-y-3"
    >
      <div className="text-center mb-4">
        <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-1">✨ Quick questions to get started</p>
        <p className="text-xs text-gray-500">Choose a topic or ask your own question</p>
      </div>
      <div className="grid gap-2.5">
        {quickActions.map((action, index) => (
          <motion.button
            key={index}
            onClick={() => onSelect(action)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group text-left px-3 sm:px-4 py-3 sm:py-3.5 bg-gradient-to-r from-white/70 to-white/50 hover:from-white/90 hover:to-white/70 backdrop-blur-md rounded-xl border border-white/40 hover:border-blue-200/60 text-xs sm:text-sm transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg group-hover:scale-110 transition-transform duration-200">{action.icon}</span>
              <div className="flex-1">
                <p className="text-gray-700 group-hover:text-blue-700 font-medium leading-tight">{action.text}</p>
                <p className="text-xs text-gray-500 group-hover:text-blue-500 mt-0.5">{action.category}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" />
            </div>
          </motion.button>
        ))}
      </div>
      <div className="text-center pt-2">
        <p className="text-xs text-gray-400">💬 Or type your own question below</p>
      </div>
    </motion.div>
  );
});

// Styled Chat Container
const ChatContainer = React.memo(({ children, isMinimized, onMinimize, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: 20 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/95 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-2xl overflow-hidden z-50 transition-all duration-300 ${
      isMinimized 
        ? 'w-auto h-auto' 
        : 'w-[90vw] xs:w-[380px] sm:w-[400px] lg:w-[420px] max-w-[95vw] h-[70vh] xs:h-[550px] sm:h-[600px] lg:h-[650px] max-h-[90vh]'
    }`}
    style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)'
    }}
  >
    <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/20 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        {!isMinimized && (
          <div>
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">HR Assistant</h3>
            <p className="text-xs text-gray-500">Powered by GPT-4o</p>
          </div>
        )}
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={onMinimize}
          className="p-1.5 sm:p-2 rounded-full hover:bg-white/50 text-gray-500 hover:text-purple-600 transition-all duration-200 hover:scale-110"
        >
          {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
        </button>
        <button
          onClick={onClose}
          className="p-1.5 sm:p-2 rounded-full hover:bg-white/50 text-gray-500 hover:text-red-600 transition-all duration-200 hover:scale-110"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
    {children}
  </motion.div>
));

// ===== MAIN COMPONENT =====

export default function GPT4oMiniChatbot() {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [collapsedMessages, setCollapsedMessages] = useState(new Set());
  const [rating, setRating] = useState(null);
  const [showRating, setShowRating] = useState(false);
  const [lastSendAt, setLastSendAt] = useState(0);

  // Refs
  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  // Note: EnhancedChatbotService uses static methods, no instance needed
  
  const [sessionId, setSessionId] = useState(() => 
    EnhancedChatbotService.generateSessionId ? 
    EnhancedChatbotService.generateSessionId() : 
    `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );

  // Define callback functions first to avoid reference errors
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleScroll = useCallback(() => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollButton(!isNearBottom);
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
      // Focus input after opening
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      localStorage.setItem('chatbot_dismissed', 'true');
    }
  }, [isOpen]);

  const handleMinimize = useCallback(() => {
    setIsMinimized(!isMinimized);
  }, [isMinimized]);

  const toggleMessageCollapse = useCallback((messageId) => {
    setCollapsedMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  }, []);

  const handleRating = useCallback((type) => {
    setRating(type);
    // Here you would typically send the rating to your analytics or feedback system
    setTimeout(() => setShowRating(false), 1000);
  }, []);

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Here you would typically handle file upload
    // For now, we'll just mention the file in the chat
    setInputMessage(`I'd like to discuss this file: ${file.name}`);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  // Define sendMessage after the other handlers but before it's used
  const sendMessage = useCallback(async (message = inputMessage) => {
    if (!message.trim() || isLoading) return;
    const now = Date.now();
    if (now - lastSendAt < 900) return; // simple cooldown
    setLastSendAt(now);

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsStreaming(true);
    setStreamingMessage('');
    setShowRating(false);

    try {
      // Stream the response
      let fullResponse = '';
      
      const response = await EnhancedChatbotService.processUserMessageStreaming(
        sessionId,
        message,
        '',
        (chunk) => {
          fullResponse += chunk;
          setStreamingMessage(fullResponse);
        }
      );

      // Add the complete message
      const botMessage = {
        id: Date.now(),
        role: 'assistant',
        content: fullResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setShowRating(true);
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage = {
        id: Date.now(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error processing your request. Please try again later.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      setStreamingMessage('');
    }
  }, [inputMessage, messages, isLoading, lastSendAt]);

  const handleQuickAction = useCallback(async (action) => {
    const message = typeof action === 'string' ? action : action.text;
    setInputMessage(message);
    await sendMessage(message);
    setShowQuickActions(false);
  }, [sendMessage]);

  // Effects
  useEffect(() => {
    // Auto-open chatbot after 5 seconds if no interaction
    const timer = setTimeout(() => {
      if (!isOpen && !localStorage.getItem('chatbot_dismissed')) {
        setIsOpen(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (!isMinimized) {
      scrollToBottom();
    }
  }, [messages, streamingMessage, isMinimized, scrollToBottom]);

  useEffect(() => {
    // Add scroll event listener
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={handleToggle}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        } bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white border-2 border-white/20 touch-manipulation`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        aria-label="Open HR Assistant Chat"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <ChatContainer 
              isMinimized={isMinimized} 
              onMinimize={handleMinimize} 
              onClose={handleToggle}
            >
              {!isMinimized && (
                <div 
                  ref={messagesContainerRef}
                  className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 custom-scrollbar scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent overscroll-contain"
                  style={{ height: 'calc(100% - 120px)', WebkitOverflowScrolling: 'touch' }}
                  onScroll={handleScroll}
                >
                  {/* Welcome Message */}
                  {messages.length === 0 && !isStreaming && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-start gap-2 sm:gap-4 mb-4 sm:mb-6"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-xl flex-shrink-0">
                        <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" aria-hidden="true" />
                      </div>
                      <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl px-3 sm:px-6 py-3 sm:py-4 border border-blue-100/50 shadow-2xl max-w-[85%] sm:max-w-[88%]">
                        <div className="prose prose-sm max-w-none text-gray-800 text-sm sm:text-base">
                          <p className="mb-2 font-medium">👋 Hi there! I'm your HR Assistant powered by GPT-4o.</p>
                          <p className="mb-2">I can help with questions about Prachi's HR services, compliance requirements, recruitment processes, and more.</p>
                          <p className="mb-0">How can I assist you today?</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Quick Actions */}
                  {messages.length === 0 && showQuickActions && !isStreaming && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <QuickActions onSelect={handleQuickAction} />
                    </motion.div>
                  )}

                  {/* Message History */}
                  {messages.map(message => (
                    <Message 
                      key={message.id} 
                      message={message} 
                      isCollapsed={collapsedMessages.has(message.id)}
                      onToggleCollapse={toggleMessageCollapse}
                    />
                  ))}

                  {/* Streaming Message */}
                  {isStreaming && streamingMessage && (
                    <StreamingMessage content={streamingMessage} isComplete={false} />
                  )}

                  {/* Typing Indicator */}
                  {isLoading && !streamingMessage && <TypingIndicator />}

                  {/* Rating UI */}
                  {showRating && !isLoading && !isStreaming && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-center pt-2"
                    >
                      <div className="bg-white/80 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg border border-white/30">
                        <p className="text-sm text-gray-700 mb-3 text-center">Was this response helpful?</p>
                        <div className="flex gap-3 justify-center">
                          <button
                            onClick={() => handleRating('thumbs_up')}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                              rating === 'thumbs_up' 
                                ? 'bg-green-100 text-green-600 scale-110' 
                                : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                            }`}
                          >
                            <ThumbsUp className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleRating('thumbs_down')}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                              rating === 'thumbs_down' 
                                ? 'bg-red-100 text-red-600 scale-110' 
                                : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                            }`}
                          >
                            <ThumbsDown className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                  
                  {/* Scroll to Bottom Button */}
                  <ScrollToBottom onClick={scrollToBottom} isVisible={showScrollButton} />
                </div>
              )}

              {/* Premium Message Input */}
              {!isMinimized && (
                <MessageInput
                  inputMessage={inputMessage}
                  setInputMessage={setInputMessage}
                  onSend={sendMessage}
                  isLoading={isLoading}
                  onFileUpload={() => fileInputRef.current?.click()}
                  inputRef={inputRef}
                />
              )}

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              />
            </ChatContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}