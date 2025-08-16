import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EnhancedChatbotService } from '../services/enhancedChatbotService';
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
          <motion.div
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="inline-block w-2 h-5 bg-gradient-to-b from-purple-500 to-blue-600 ml-2 rounded-full"
          />
        )}
      </div>
    </motion.div>
  );
});

// Polished Message Bubble Component
const MessageBubble = React.memo(({ message, onCopy, copiedMessageId, onToggleCollapse, isCollapsed }) => {
  const [showActions, setShowActions] = useState(false);
  
  const renderMarkdown = useCallback((md) => {
    try {
      const html = marked.parse(md || '', { breaks: true });
      return DOMPurify.sanitize(html);
    } catch {
      return DOMPurify.sanitize((md || '').replace(/\n/g, '<br>'));
    }
  }, []);

  const isLongMessage = message.content.length > 400;
  const shouldShowToggle = isLongMessage;
  const displayContent = isCollapsed && isLongMessage 
    ? message.content.substring(0, 400) + '...' 
    : message.content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-6`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={`max-w-[88%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
        <div className={`flex items-start gap-4 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* Enhanced Avatar */}
          <div className={`w-10 h-10 rounded-full backdrop-blur-md border border-white/40 flex items-center justify-center shadow-xl ${
            message.role === 'user' 
              ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20' 
              : 'bg-gradient-to-br from-purple-500/20 to-blue-500/20'
          }`}>
            {message.role === 'user' ? (
              <User className="w-5 h-5 text-blue-600" />
            ) : (
              <Bot className="w-5 h-5 text-purple-600" />
            )}
          </div>

          {/* Enhanced Message Content */}
          <div className={`relative group backdrop-blur-xl border border-white/40 rounded-3xl px-6 py-4 shadow-2xl ${
            message.role === 'user'
              ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-900'
              : message.isError
              ? 'bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-900 border-red-200/50'
              : 'bg-gradient-to-r from-white/70 to-white/50 text-gray-800'
          }`}>
            
            {/* Enhanced Message Text */}
            <div className="prose prose-sm max-w-none leading-relaxed">
              <div 
                dangerouslySetInnerHTML={{ __html: renderMarkdown(displayContent) }}
                className={message.role === 'user' ? 'text-blue-900' : 'text-gray-800'}
              />
            </div>

            {/* Enhanced Collapse Toggle */}
            {shouldShowToggle && (
              <button
                onClick={() => onToggleCollapse(message.id)}
                className="mt-3 text-xs font-medium text-purple-600 hover:text-purple-700 flex items-center gap-2 transition-all duration-200 hover:bg-purple-50 px-3 py-1 rounded-full"
              >
                {isCollapsed ? (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Show more
                  </>
                ) : (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Show less
                  </>
                )}
              </button>
            )}

            {/* Enhanced Message Actions */}
            <AnimatePresence>
              {showActions && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -5 }}
                  className="absolute -top-3 -right-3"
                >
                  <button
                    onClick={() => onCopy(message.content, message.id)}
                    className="w-8 h-8 bg-white/95 backdrop-blur-md hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 shadow-xl border border-white/50 hover:scale-110"
                    title="Copy message"
                  >
                    {copiedMessageId === message.id ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enhanced Timestamp */}
            <div className="text-xs mt-3 flex items-center gap-2 opacity-70">
              <Clock className="w-3 h-3" />
              {new Date(message.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// Polished Message Input Component
const MessageInput = React.memo(({ 
  inputMessage, 
  setInputMessage, 
  onSend, 
  isLoading, 
  onFileUpload,
  inputRef 
}) => {
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }, [onSend]);

  return (
    <div className="p-6 bg-gradient-to-r from-white/50 to-white/30 backdrop-blur-xl border-t border-white/40">
      <form onSubmit={(e) => { e.preventDefault(); onSend(); }} className="flex items-end gap-4">
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
            className="w-full resize-none rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 placeholder-gray-500 shadow-lg"
            rows="1"
            style={{ minHeight: '56px', maxHeight: '140px' }}
            disabled={isLoading}
          />
          
          {/* Enhanced File Upload Button */}
          <button
            type="button"
            onClick={onFileUpload}
            className="absolute right-4 bottom-4 w-8 h-8 text-gray-500 hover:text-gray-700 transition-all duration-200 hover:scale-110"
            disabled={isLoading}
          >
            <Paperclip className="w-5 h-5" />
          </button>
        </div>
        
        {/* Enhanced Send Button */}
        <button
          type="submit"
          disabled={!inputMessage.trim() || isLoading}
          className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-3xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-2xl hover:shadow-purple-500/25"
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <Send className="w-6 h-6" />
          )}
        </button>
      </form>
    </div>
  );
});

// Enhanced Scroll to Bottom Button
const ScrollToBottom = React.memo(({ onClick, isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.button
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0, y: 20 }}
        onClick={onClick}
        className="absolute bottom-24 right-6 w-12 h-12 bg-white/95 backdrop-blur-xl hover:bg-white shadow-2xl rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 border border-white/50 hover:shadow-purple-500/25"
      >
        <ArrowDown className="w-6 h-6 text-gray-600" />
      </motion.button>
    )}
  </AnimatePresence>
));

// Enhanced Chat Container Component
const ChatContainer = React.memo(({ children, isMinimized }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: 20 }}
    transition={{ type: "spring", damping: 25, stiffness: 300 }}
    className={`relative bg-gradient-to-br from-white/85 to-white/65 backdrop-blur-2xl rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-500 border border-white/40 ${
      isMinimized ? 'w-80 h-16' : 'w-full max-w-md h-[750px]'
    }`}
    style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.65) 100%)',
      backdropFilter: 'blur(24px)',
      boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
    }}
  >
    {children}
  </motion.div>
));

export default function GPT4oMiniChatbot() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [conversationId, setConversationId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [rating, setRating] = useState(null);
  const [showRating, setShowRating] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const [messageCount, setMessageCount] = useState(0);
  const [lastActivity, setLastActivity] = useState(new Date());
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [lastSendAt, setLastSendAt] = useState(0);
  
  // New streaming states
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [collapsedMessages, setCollapsedMessages] = useState(new Set());
  const [showScrollButton, setShowScrollButton] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Enhanced quick action buttons with better categorization
  const quickActions = [
    {
      category: "Core Services",
      actions: [
        { text: "HR Compliance Help", icon: "🛡️", description: "Legal requirements & best practices" },
        { text: "Recruitment Services", icon: "👥", description: "Hiring strategies & processes" },
        { text: "Employee Handbook", icon: "📖", description: "Handbook development & maintenance" },
        { text: "Performance Management", icon: "📊", description: "Performance systems & reviews" }
      ]
    },
    {
      category: "Business Solutions",
      actions: [
        { text: "Book Consultation", icon: "📅", description: "Schedule a free consultation" },
        { text: "Get Quote", icon: "💰", description: "Request pricing information" },
        { text: "HR Audit", icon: "🔍", description: "Comprehensive HR assessment" },
        { text: "Policy Development", icon: "📝", description: "Custom policy creation" }
      ]
    }
  ];

  // Enhanced welcome message with better formatting
  const welcomeMessage = {
    id: 'welcome',
    role: 'assistant',
    content: `Hello! I'm your AI HR Assistant from **Hire With Prachi** 👋\n\nI'm here to help you with all your HR needs:\n\n🎯 **Core Services:**\n• HR compliance and legal requirements\n• Recruitment and hiring strategies  \n• Employee handbook development\n• Performance management systems\n\n💼 **Business Solutions:**\n• Workplace policies and procedures\n• HR outsourcing decisions\n• Employee engagement strategies\n• Payroll and benefits management\n\n🚀 **Quick Start:**\nChoose from the options below or ask me anything specific about your HR challenges!\n\n*I'm available 24/7 and can provide instant, professional guidance tailored to your business needs.*`,
    timestamp: new Date()
  };

  // LocalStorage helpers
  const storageKey = useCallback((sid) => `hwp_chat_${sid}`, []);
  const loadSession = useCallback((sid) => {
    try {
      const raw = localStorage.getItem(storageKey(sid));
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && Array.isArray(parsed.messages) ? parsed : null;
    } catch { return null; }
  }, [storageKey]);
  const saveSession = useCallback((sid, data) => {
    try {
      localStorage.setItem(storageKey(sid), JSON.stringify({ messages: data.messages || [], conversationId: data.conversationId || null }));
    } catch {}
  }, [storageKey]);
  const clearSession = useCallback((sid) => {
    try { localStorage.removeItem(storageKey(sid)); } catch {}
  }, [storageKey]);

  useEffect(() => {
    // Show the widget after 2 seconds (reduced from 3)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Enhanced event listener for tool-specific chatbot requests
  useEffect(() => {
    const handleOpenChat = (event) => {
      const { context, service } = event.detail;
      console.log('Opening chatbot with context:', context, 'service:', service);
      setIsModalOpen(true);
      if (context) {
        handleQuickAction(context);
      }
    };

    window.addEventListener('open-chat', handleOpenChat);
    
    return () => {
      window.removeEventListener('open-chat', handleOpenChat);
    };
  }, []);

  useEffect(() => {
    // Initialize session when modal opens
    if (isModalOpen && !sessionId) {
      const newSessionId = EnhancedChatbotService.generateSessionId();
      setSessionId(newSessionId);
      setMessageCount(0);
      setLastActivity(new Date());

      // Try load from localStorage
      const restored = loadSession(newSessionId);
      if (restored) {
        setMessages(restored.messages);
        setConversationId(restored.conversationId);
        setShowQuickActions(restored.messages.length <= 1);
      } else {
        setMessages([welcomeMessage]);
      }
    }
  }, [isModalOpen, sessionId, loadSession]);

  // Persist messages to localStorage when they change
  useEffect(() => {
    if (!sessionId || !messages) return;
    saveSession(sessionId, { messages, conversationId });
  }, [messages, sessionId, conversationId, saveSession]);

  useEffect(() => {
    // Enhanced auto-scroll with smooth behavior
    if (autoScroll && messagesEndRef.current && !showScrollButton) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  }, [messages, autoScroll, showScrollButton, streamingMessage]);

  // Enhanced session management
  useEffect(() => {
    if (sessionId) {
      const interval = setInterval(() => {
        setLastActivity(new Date());
      }, 60000); // Update every minute

      return () => clearInterval(interval);
    }
  }, [sessionId]);

  const handleChatClick = useCallback(() => {
    setIsModalOpen(true);
    setIsMinimized(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setShowRating(false);
    setShowSettings(false);
    setRating(null);
    setIsMinimized(false);
  }, []);

  const handleMinimize = useCallback(() => {
    setIsMinimized(!isMinimized);
  }, [isMinimized]);

  const handleQuickAction = useCallback(async (action) => {
    const message = typeof action === 'string' ? action : action.text;
    setInputMessage(message);
    await sendMessage(message);
    setShowQuickActions(false);
  }, []);

  // Scroll handling
  const handleScroll = useCallback(() => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollButton(!isNearBottom);
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Toggle message collapse
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
    setMessageCount(prev => prev + 1);
    setLastActivity(new Date());

    try {
      const result = await EnhancedChatbotService.processUserMessageStreaming(
        sessionId, 
        message, 
        '', 
        (chunk) => {
          setStreamingMessage(prev => prev + chunk);
        }
      );
      
      if (result.success) {
        const assistantMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: result.response,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);
        setConversationId(result.conversationId);
        setMessageCount(prev => prev + 1);
        
        // Show rating after assistant response
        setShowRating(true);
        
        // Play notification sound if not muted
        if (!isMuted) {
          playNotificationSound();
        }
      } else {
        // Enhanced error handling
        const errorMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: "I apologize, but I'm experiencing a temporary issue. Please try again in a moment, or contact our support team if the problem persists.",
          timestamp: new Date(),
          isError: true
        };
        setMessages(prev => [...prev, errorMessage]);
        setConnectionStatus('error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please check your internet connection and try again. If the issue persists, feel free to contact us directly.",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
      setConnectionStatus('error');
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      setStreamingMessage('');
      setConnectionStatus('connected');
    }
  }, [inputMessage, isLoading, sessionId, isMuted, lastSendAt]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    sendMessage();
  }, [sendMessage]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }, [sendMessage]);

  const handleRating = useCallback((value) => {
    setRating(value);
    console.log('Chat rating:', value);
    
    // Enhanced feedback collection
    const feedback = {
      rating: value,
      conversationId,
      timestamp: new Date().toISOString(),
      messageCount,
      sessionDuration: Date.now() - lastActivity.getTime()
    };
    
    // Here you could send feedback to analytics
    console.log('Feedback collected:', feedback);
    
    setTimeout(() => setShowRating(false), 2000);
  }, [conversationId, messageCount, lastActivity]);

  const handleCopyMessage = useCallback(async (content, messageId) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (error) {
      console.error('Failed to copy message:', error);
    }
  }, []);

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
    }
  }, []);

  const downloadTranscript = useCallback(() => {
    try {
      const lines = messages.map(m => {
        const role = m.role === 'assistant' ? 'Assistant' : 'You';
        const time = new Date(m.timestamp).toLocaleString();
        return `[${time}] ${role}:\n${m.content}\n`;
      }).join('\n');
      const blob = new Blob([lines], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chat_${sessionId || 'session'}.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.warn('Download transcript failed:', e?.message || e);
    }
  }, [messages, sessionId]);

  const clearConversation = useCallback(() => {
    setMessages([welcomeMessage]);
    setConversationId(null);
    clearSession(sessionId);
    setShowQuickActions(true);
    setCollapsedMessages(new Set());
    setStreamingMessage('');
  }, [sessionId, clearSession]);

  const playNotificationSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      console.log('Audio notification not supported');
    }
  }, []);

  const formatTime = useCallback((timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }, []);

  const formatDuration = useCallback((timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp).toLocaleDateString();
  }, []);

  const getConnectionStatusColor = useCallback(() => {
    switch (connectionStatus) {
      case 'connected': return 'text-green-500';
      case 'error': return 'text-red-500';
      case 'connecting': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  }, [connectionStatus]);

  if (!isVisible) return null;

  return (
    <>
      {/* Enhanced Floating Chat Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="fixed bottom-6 right-6 z-50"
      >
        <button
          onClick={handleChatClick}
          className="group relative flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
          aria-label="Chat with AI HR Assistant"
        >
          {/* Enhanced Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Enhanced Icon */}
          <div className="relative z-10">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>

          {/* Enhanced Pulse Animation */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-ping opacity-30"></div>
          
          {/* Connection Status Indicator */}
          <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white ${getConnectionStatusColor()}`}></div>
        </button>

        {/* Enhanced Tooltip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>AI HR Assistant</span>
          </div>
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </motion.div>
      </motion.div>

      {/* Premium Glassmorphism Chat Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-end p-4"
            style={{
              background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)'
            }}
          >
            {/* Premium Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-purple-900/10 backdrop-blur-sm"
              onClick={handleCloseModal}
            />
            
            {/* Glassmorphism Chat Container */}
            <ChatContainer isMinimized={isMinimized}>
              {/* Premium Glassmorphism Header */}
              <div className="flex items-center justify-between p-6 bg-gradient-to-r from-white/30 to-white/20 backdrop-blur-xl border-b border-white/40 text-gray-800 flex-shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-white/40 rounded-full flex items-center justify-center shadow-xl">
                    <Bot className="w-7 h-7 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold flex items-center gap-3 text-gray-800">
                      AI HR Assistant
                      <div className={`w-3 h-3 rounded-full bg-green-500 border-2 border-white ${getConnectionStatusColor()}`}></div>
                    </h2>
                    <p className="text-sm opacity-80 flex items-center gap-2">
                      {isStreaming ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                          <span className="text-purple-600 font-medium">Thinking...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-gray-600 font-medium">Online & Ready</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
                
                {/* Premium Header Actions */}
                <div className="flex items-center gap-3">
                  {/* Download transcript */}
                  <button
                    onClick={downloadTranscript}
                    className="w-10 h-10 bg-white/30 backdrop-blur-xl hover:bg-white/40 rounded-full flex items-center justify-center transition-all duration-300 border border-white/40 shadow-xl hover:scale-110"
                    aria-label="Download transcript"
                  >
                    <Download className="w-5 h-5 text-gray-700" />
                  </button>

                  {/* Clear conversation */}
                  <button
                    onClick={clearConversation}
                    className="w-10 h-10 bg-white/30 backdrop-blur-xl hover:bg-white/40 rounded-full flex items-center justify-center transition-all duration-300 border border-white/40 shadow-xl hover:scale-110"
                    aria-label="Clear conversation"
                  >
                    <RefreshCw className="w-5 h-5 text-gray-700" />
                  </button>

                  {/* Settings Button */}
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="w-10 h-10 bg-white/30 backdrop-blur-xl hover:bg-white/40 rounded-full flex items-center justify-center transition-all duration-300 border border-white/40 shadow-xl hover:scale-110"
                    aria-label="Settings"
                  >
                    <Settings className="w-5 h-5 text-gray-700" />
                  </button>
                  
                  {/* Minimize Button */}
                  <button
                    onClick={handleMinimize}
                    className="w-10 h-10 bg-white/30 backdrop-blur-xl hover:bg-white/40 rounded-full flex items-center justify-center transition-all duration-300 border border-white/40 shadow-xl hover:scale-110"
                    aria-label={isMinimized ? "Maximize" : "Minimize"}
                  >
                    {isMinimized ? <Maximize2 className="w-5 h-5 text-gray-700" /> : <Minimize2 className="w-5 h-5 text-gray-700" />}
                  </button>
                  
                  {/* Close Button */}
                  <button
                    onClick={handleCloseModal}
                    className="w-10 h-10 bg-white/30 backdrop-blur-xl hover:bg-white/40 rounded-full flex items-center justify-center transition-all duration-300 border border-white/40 shadow-xl hover:scale-110"
                    aria-label="Close chat"
                  >
                    <X className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Premium Settings Panel */}
              <AnimatePresence>
                {showSettings && !isMinimized && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-gradient-to-r from-white/30 to-white/20 backdrop-blur-xl border-b border-white/40 overflow-hidden"
                  >
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700">Sound Notifications</span>
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className={`w-12 h-6 rounded-full transition-all duration-300 ${
                            isMuted ? 'bg-gray-300' : 'bg-purple-500'
                          }`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                            isMuted ? 'translate-x-1' : 'translate-x-7'
                          }`} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700">Auto-scroll</span>
                        <button
                          onClick={() => setAutoScroll(!autoScroll)}
                          className={`w-12 h-6 rounded-full transition-all duration-300 ${
                            !autoScroll ? 'bg-gray-300' : 'bg-purple-500'
                          }`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                            !autoScroll ? 'translate-x-1' : 'translate-x-7'
                          }`} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Premium Messages Container */}
              {!isMinimized && (
                <div 
                  ref={messagesContainerRef}
                  onScroll={handleScroll}
                  className="flex-1 overflow-y-auto p-4 relative"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                  }}
                >
                  {/* Messages */}
                  {messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      onCopy={handleCopyMessage}
                      copiedMessageId={copiedMessageId}
                      onToggleCollapse={toggleMessageCollapse}
                      isCollapsed={collapsedMessages.has(message.id)}
                    />
                  ))}

                  {/* Streaming Message */}
                  {isStreaming && streamingMessage && (
                    <StreamingMessage 
                      content={streamingMessage} 
                      isComplete={false}
                    />
                  )}

                  {/* Typing Indicator */}
                  {isLoading && !isStreaming && <TypingIndicator />}

                  {/* Premium Quick Actions */}
                  {showQuickActions && messages.length === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      {quickActions.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="space-y-2">
                          <h3 className="text-sm font-semibold text-gray-700 text-center">
                            {category.category}
                          </h3>
                          <div className="grid grid-cols-2 gap-2">
                            {category.actions.map((action, actionIndex) => (
                              <button
                                key={actionIndex}
                                onClick={() => handleQuickAction(action)}
                                className="text-xs bg-white/80 backdrop-blur-md rounded-xl px-3 py-3 text-left hover:bg-white transition-all duration-200 border border-white/30 hover:border-purple-300/50 hover:shadow-lg group shadow-lg"
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-lg">{action.icon}</span>
                                  <span className="font-medium text-gray-800">{action.text}</span>
                                </div>
                                <p className="text-gray-600 text-xs leading-tight">{action.description}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* Premium Rating */}
                  {showRating && !isLoading && (
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
