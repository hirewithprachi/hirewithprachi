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
  Target,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  MessageSquare,
  Smartphone
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

// Enhanced Typing Indicator
const TypingIndicator = React.memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="flex items-center gap-3 mb-6"
    role="status"
    aria-live="polite"
  >
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-xl">
      <Bot className="w-5 h-5 text-purple-600" aria-hidden="true" />
    </div>
    <div className="bg-gradient-to-r from-white/70 to-white/50 backdrop-blur-xl rounded-3xl px-6 py-4 border border-white/40 shadow-2xl">
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
        <span className="ml-3 text-sm font-medium text-gray-700">AI is thinking...</span>
      </div>
    </div>
  </motion.div>
));

// Enhanced Message Bubble with Quick Replies
const MessageBubble = React.memo(({ message, onCopy, copiedMessageId, onToggleCollapse, isCollapsed, onQuickReply, quickReplies, cta }) => {
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
      <div className={`max-w-[85%] sm:max-w-[88%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
        <div className={`flex items-start gap-3 sm:gap-4 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* Enhanced Avatar */}
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full backdrop-blur-md border border-white/40 flex items-center justify-center shadow-xl ${
            message.role === 'user' 
              ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20' 
              : 'bg-gradient-to-br from-purple-500/20 to-blue-500/20'
          }`}>
            {message.role === 'user' ? (
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            ) : (
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            )}
          </div>

          {/* Enhanced Message Content */}
          <div className={`relative group backdrop-blur-xl border border-white/40 rounded-3xl px-4 sm:px-6 py-3 sm:py-4 shadow-2xl ${
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
                className={message.role === 'user' ? 'text-blue-900' : message.isError ? 'text-red-800' : 'text-gray-800'}
              />
            </div>

            {/* Quick Replies */}
            {message.role === 'assistant' && quickReplies && quickReplies.length > 0 && (
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => onQuickReply(reply)}
                    className="px-2 sm:px-3 py-1.5 sm:py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105"
                    aria-label={`Quick reply: ${reply}`}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* CTA Button */}
            {message.role === 'assistant' && cta && (
              <div className="mt-3 sm:mt-4">
                <button
                  onClick={() => onQuickReply(cta.text)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    cta.type === 'booking' 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : cta.type === 'quote'
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : cta.type === 'whatsapp'
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-purple-500 hover:bg-purple-600 text-white'
                  }`}
                  aria-label={cta.text}
                >
                  {cta.type === 'booking' && <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" aria-hidden="true" />}
                  {cta.type === 'quote' && <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" aria-hidden="true" />}
                  {cta.type === 'demo' && <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" aria-hidden="true" />}
                  {cta.type === 'whatsapp' && <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" aria-hidden="true" />}
                  {cta.text}
                </button>
              </div>
            )}

            {/* Enhanced Collapse Toggle */}
            {shouldShowToggle && (
              <button
                onClick={() => onToggleCollapse(message.id)}
                className="mt-2 sm:mt-3 text-xs font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1 sm:gap-2 transition-all duration-200 hover:bg-purple-50 px-2 sm:px-3 py-1 rounded-full"
              >
                {isCollapsed ? (
                  <>
                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Show more
                  </>
                ) : (
                  <>
                    <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
                    className="w-7 h-7 sm:w-8 sm:h-8 bg-white/95 backdrop-blur-md hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 shadow-xl border border-white/50 hover:scale-110"
                    title="Copy message"
                  >
                    {copiedMessageId === message.id ? (
                      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enhanced Timestamp */}
            <div className="text-xs mt-2 sm:mt-3 flex items-center gap-1.5 sm:gap-2 opacity-70">
              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
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

// Lead Capture Modal
const LeadCaptureModal = React.memo(({ isVisible, onClose, onSave, leadData, setLeadData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [consent, setConsent] = useState(false);

  const steps = [
    { id: 1, title: 'Name', field: 'name', icon: User },
    { id: 2, title: 'Email', field: 'email', icon: Mail },
    { id: 3, title: 'Phone', field: 'phone', icon: Phone },
    { id: 4, title: 'Consent', field: 'consent', icon: Shield }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    if (consent && leadData.name && leadData.email) {
      onSave({ ...leadData, consent: true });
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 w-full max-w-md shadow-2xl"
      >
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-800">Personalized HR Plan</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                currentStep >= step.id 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > step.id ? (
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                ) : (
                  <step.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 sm:w-12 h-1 mx-1 sm:mx-2 ${
                  currentStep > step.id ? 'bg-purple-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="space-y-3 sm:space-y-4">
          {currentStep === 1 && (
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                What's your name?
              </label>
              <input
                type="text"
                value={leadData.name || ''}
                onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                placeholder="Enter your full name"
              />
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                What's your email address?
              </label>
              <input
                type="email"
                value={leadData.email || ''}
                onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                placeholder="Enter your email"
              />
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                What's your phone number? (Optional)
              </label>
              <input
                type="tel"
                value={leadData.phone || ''}
                onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                placeholder="Enter your phone number"
              />
              <p className="text-xs text-gray-500 mt-1 sm:mt-2">
                We'll use this to send you WhatsApp updates if you prefer
              </p>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Privacy & Consent
              </label>
              <div className="space-y-2 sm:space-y-3">
                <label className="flex items-start gap-2 sm:gap-3">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-xs sm:text-sm text-gray-600">
                    I agree to receive personalized HR consultation plans and updates from Hire With Prachi. 
                    I understand that my information will be used only for providing HR services and I can 
                    opt-out anytime.
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4 sm:mt-6">
          {currentStep > 1 && (
            <button
              onClick={handlePrevious}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-gray-600 hover:text-gray-800 transition-colors text-xs sm:text-sm"
            >
              Previous
            </button>
          )}
          
          {currentStep < steps.length ? (
            <button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !leadData.name) ||
                (currentStep === 2 && !leadData.email)
              }
              className="ml-auto px-4 sm:px-6 py-1.5 sm:py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white rounded-lg sm:rounded-xl font-medium transition-colors disabled:cursor-not-allowed text-xs sm:text-sm"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={!consent}
              className="ml-auto px-4 sm:px-6 py-1.5 sm:py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-lg sm:rounded-xl font-medium transition-colors disabled:cursor-not-allowed text-xs sm:text-sm"
            >
              Save & Continue
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
});

// Enhanced Message Input with Lead Capture
const MessageInput = React.memo(({ 
  inputMessage, 
  setInputMessage, 
  onSend, 
  isLoading, 
  onFileUpload,
  inputRef,
  showLeadCapture,
  onLeadCapture,
  className
}) => {
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }, [onSend]);

  return (
    <div className={`p-4 sm:p-5 md:p-6 bg-gradient-to-r from-white/50 to-white/30 backdrop-blur-xl border-t border-white/40 ${className || ''}`} style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 16px)' }}>
      {/* Lead Capture Prompt */}
      {showLeadCapture && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 sm:mb-4 p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-800">
                Get your personalized HR consultation plan!
              </p>
              <p className="text-xs text-gray-600 hidden sm:block">
                Share your details and we'll create a custom plan for your business
              </p>
            </div>
            <button
              onClick={onLeadCapture}
              className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-purple-500 hover:bg-purple-600 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors"
              aria-label="Open lead capture"
            >
              Get Plan
            </button>
          </div>
        </motion.div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); onSend(); }} className="flex items-end gap-2 sm:gap-3 md:gap-4">
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
            className="w-full resize-none rounded-2xl sm:rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl px-4 sm:px-5 md:px-6 py-3 sm:py-4 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 placeholder-gray-500 shadow-lg"
            rows="1"
            style={{ minHeight: '48px', maxHeight: '140px' }}
            disabled={isLoading}
            aria-label="Chat message input"
          />
          
          <button
            type="button"
            onClick={onFileUpload}
            className="absolute right-3 sm:right-4 bottom-3 sm:bottom-4 w-6 h-6 sm:w-8 sm:h-8 text-gray-500 hover:text-gray-700 transition-all duration-200 hover:scale-110"
            disabled={isLoading}
            aria-label="Attach a file"
          >
            <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
          </button>
        </div>
        
        <button
          type="submit"
          disabled={!inputMessage.trim() || isLoading}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-2xl sm:rounded-3xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-xl sm:shadow-2xl hover:shadow-purple-500/25"
          aria-label="Send message"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
          )}
        </button>
      </form>
    </div>
  );
});

// Enhanced Quick Actions
const QuickActions = React.memo(({ onAction }) => {
  const actions = [
    {
      category: "Core Services",
      items: [
        { text: "HR Compliance Help", icon: "🛡️", description: "Legal requirements & best practices" },
        { text: "Recruitment Services", icon: "👥", description: "Hiring strategies & processes" },
        { text: "Employee Handbook", icon: "📖", description: "Handbook development & maintenance" },
        { text: "Performance Management", icon: "📊", description: "Performance systems & reviews" }
      ]
    },
    {
      category: "Business Solutions",
      items: [
        { text: "Book Consultation", icon: "📅", description: "Schedule a free consultation" },
        { text: "Get Quote", icon: "💰", description: "Request pricing information" },
        { text: "HR Audit", icon: "🔍", description: "Comprehensive HR assessment" },
        { text: "Policy Development", icon: "📝", description: "Custom policy creation" }
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {actions.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-2">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-700 text-center">
            {category.category}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {category.items.map((action, actionIndex) => (
              <button
                key={actionIndex}
                onClick={() => onAction(action.text)}
                className="text-xs bg-white/80 backdrop-blur-md rounded-xl px-2 sm:px-3 py-2 sm:py-3 text-left hover:bg-white transition-all duration-200 border border-white/30 hover:border-purple-300/50 hover:shadow-lg group shadow-lg"
                aria-label={`Quick action: ${action.text}`}
              >
                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                  <span className="text-base sm:text-lg">{action.icon}</span>
                  <span className="font-medium text-gray-800 text-xs sm:text-sm">{action.text}</span>
                </div>
                <p className="text-gray-600 text-xs leading-tight">{action.description}</p>
              </button>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
});

export default function EnhancedChatbot() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [conversationId, setConversationId] = useState(null);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [rating, setRating] = useState(null);
  const [showRating, setShowRating] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [collapsedMessages, setCollapsedMessages] = useState(new Set());
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadData, setLeadData] = useState({});
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setShowScrollToBottom(false);
    setIsAtBottom(true);
  }, []);

  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const { scrollTop, scrollHeight, clientHeight } = container;
    const atBottom = scrollHeight - (scrollTop + clientHeight) < 60;
    setIsAtBottom(atBottom);
    setShowScrollToBottom(!atBottom);
  }, []);

  // Enhanced welcome message
  const welcomeMessage = {
    id: 'welcome',
    role: 'assistant',
    content: `Hello! I'm your AI HR Assistant from **Hire With Prachi** 👋\n\nI'm here to help you with all your HR needs:\n\n🎯 **Core Services:**\n• HR compliance and legal requirements\n• Recruitment and hiring strategies  \n• Employee handbook development\n• Performance management systems\n\n💼 **Business Solutions:**\n• Workplace policies and procedures\n• HR outsourcing decisions\n• Employee engagement strategies\n• Payroll and benefits management\n\n🚀 **Quick Start:**\nChoose from the options below or ask me anything specific about your HR challenges!\n\n*I'm available 24/7 and can provide instant, professional guidance tailored to your business needs.*`,
    timestamp: new Date()
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isModalOpen && !sessionId) {
      const newSessionId = EnhancedChatbotService.generateSessionId();
      setSessionId(newSessionId);
      setMessages([welcomeMessage]);
    }
  }, [isModalOpen, sessionId]);

  useEffect(() => {
    if (isAtBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAtBottom]);

  const handleChatClick = useCallback(() => {
    setIsModalOpen(true);
    setIsMinimized(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setShowRating(false);
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

  const sendMessage = useCallback(async (message = inputMessage) => {
    if (!message.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setShowQuickActions(false);

    try {
      const result = await EnhancedChatbotService.processUserMessageStreaming(
        sessionId, 
        message
      );
      
      if (result.success) {
        const assistantMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: result.response,
          timestamp: new Date(),
          quickReplies: result.quickReplies,
          cta: result.cta,
          isError: result.response.includes("I'm sorry, I encountered an error")
        };

        setMessages(prev => [...prev, assistantMessage]);
        setConversationId(result.conversationId);
        
        // Show lead capture after 2-3 exchanges if not an error response
        if (messages.length >= 4 && !showLeadCapture && !assistantMessage.isError) {
          setShowLeadCapture(true);
        }
        
        // Only show rating for non-error responses
        if (!assistantMessage.isError) {
          setShowRating(true);
        }
      } else {
        const errorMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: "I apologize, but I'm experiencing a temporary issue. Please try again in a moment, or contact our support team if the problem persists.",
          timestamp: new Date(),
          isError: true,
          quickReplies: ['Try Again', 'Contact Support', 'Different Question']
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please check your internet connection and try again. If the issue persists, feel free to contact us directly.",
        timestamp: new Date(),
        isError: true,
        quickReplies: ['Try Again', 'Contact Support']
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [inputMessage, isLoading, sessionId, messages.length, showLeadCapture]);

  const handleQuickReply = useCallback((reply) => {
    sendMessage(reply);
  }, [sendMessage]);

  const handleLeadCapture = useCallback(() => {
    setShowLeadModal(true);
  }, []);

  const handleSaveLead = useCallback(async (leadData) => {
    try {
      const result = await EnhancedChatbotService.createLead({
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        notes: 'Lead captured through enhanced chatbot',
        source: 'enhanced_chatbot'
      });

      if (result.success) {
        setShowLeadCapture(false);
        setLeadData({});
        
        // Send confirmation message
        const confirmationMessage = {
          id: Date.now(),
          role: 'assistant',
          content: `Perfect! I've saved your details, ${leadData.name}. I'll create a personalized HR consultation plan and send it to ${leadData.email} within the next hour.\n\nIn the meantime, is there anything specific about HR that you'd like to discuss?`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, confirmationMessage]);
      }
    } catch (error) {
      console.error('Error saving lead:', error);
    }
  }, []);

  const handleRating = useCallback((value) => {
    setRating(value);
    console.log('Chat rating:', value);
    setTimeout(() => setShowRating(false), 2000);
  }, []);

  const handleCopyMessage = useCallback(async (content, messageId) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (error) {
      console.error('Failed to copy message:', error);
    }
  }, []);

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

  const clearConversation = useCallback(() => {
    setMessages([welcomeMessage]);
    setConversationId(null);
    setShowQuickActions(true);
    setCollapsedMessages(new Set());
    setShowLeadCapture(false);
    setLeadData({});
  }, []);

+  useEffect(() => {
+    if (!isModalOpen) return;
+    // Initialize scroll state and focus input on open
+    const timer = setTimeout(() => {
+      handleScroll();
+      inputRef.current?.focus();
+    }, 100);
+    const onKeyDown = (e) => {
+      if (e.key === 'Escape') {
+        handleCloseModal();
+      }
+    };
+    document.addEventListener('keydown', onKeyDown);
+    return () => {
+      clearTimeout(timer);
+      document.removeEventListener('keydown', onKeyDown);
+    };
+  }, [isModalOpen, handleCloseModal, handleScroll]);

  if (!isVisible) return null;

  return (
    <>
      {/* Enhanced Floating Chat Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="fixed bottom-4 sm:bottom-5 md:bottom-6 right-4 sm:right-5 md:right-6 z-50"
      >
        <button
          onClick={handleChatClick}
          className="group relative flex items-center justify-center w-14 h-14 sm:w-15 sm:h-15 md:w-16 md:h-16 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
          aria-label="Chat with AI HR Assistant"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative z-10">
            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>

          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-ping opacity-30"></div>
          
          <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 border-2 border-white"></div>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-gray-900 text-white text-xs sm:text-sm rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
            <span>AI HR Assistant</span>
          </div>
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </motion.div>
      </motion.div>

      {/* Enhanced Chat Modal */}
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-purple-900/10 backdrop-blur-sm"
              onClick={handleCloseModal}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`relative bg-gradient-to-br from-white/85 to-white/65 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-500 border border-white/40 ${
                isMinimized ? 'w-64 sm:w-80 h-16' : 'w-full max-w-[90vw] sm:max-w-md h-[500px] sm:h-[600px] md:h-[750px]'
              }`}
              style={{ maxHeight: isMinimized ? '4rem' : 'calc(100vh - 40px)' }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="chatbot-title"
            >
              {/* Enhanced Header */}
              <div className="flex items-center justify-between p-4 sm:p-5 md:p-6 bg-gradient-to-r from-white/30 to-white/20 backdrop-blur-xl border-b border-white/40 text-gray-800 flex-shrink-0">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-white/40 rounded-full flex items-center justify-center shadow-xl">
                    <Bot className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-purple-600" />
                  </div>
                  <div>
                    <h2 id="chatbot-title" className="text-base sm:text-lg font-bold flex items-center gap-2 sm:gap-3 text-gray-800">
                      AI HR Assistant
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-green-500 border-2 border-white"></div>
                    </h2>
                    <p className="text-xs sm:text-sm opacity-80 flex items-center gap-1 sm:gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-green-600" />
                      <span className="text-gray-600 font-medium">Online & Ready</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={clearConversation}
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white/30 backdrop-blur-xl hover:bg-white/40 rounded-full flex items-center justify-center transition-all duration-300 border border-white/40 shadow-xl hover:scale-110"
                    aria-label="Clear conversation"
                  >
                    <RefreshCw className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-gray-700" />
                  </button>
                  
                  <button
                    onClick={handleMinimize}
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white/30 backdrop-blur-xl hover:bg-white/40 rounded-full flex items-center justify-center transition-all duration-300 border border-white/40 shadow-xl hover:scale-110"
                    aria-label={isMinimized ? "Maximize" : "Minimize"}
                  >
                    {isMinimized ? <Maximize2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-gray-700" /> : <Minimize2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-gray-700" />}
                  </button>
                  
                  <button
                    onClick={handleCloseModal}
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white/30 backdrop-blur-xl hover:bg-white/40 rounded-full flex items-center justify-center transition-all duration-300 border border-white/40 shadow-xl hover:scale-110"
                    aria-label="Close chat"
                  >
                    <X className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Enhanced Messages Container */}
              {!isMinimized && (
                <div 
                  ref={messagesContainerRef}
                  className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-5 relative"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    overscrollBehavior: 'contain'
                  }}
                  role="log"
                  aria-live="polite"
                  aria-relevant="additions text"
                  aria-label="Chat messages"
                  aria-busy={isLoading}
                  onScroll={handleScroll}
                >
                  {messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      onCopy={handleCopyMessage}
                      copiedMessageId={copiedMessageId}
                      onToggleCollapse={toggleMessageCollapse}
                      isCollapsed={collapsedMessages.has(message.id)}
                      onQuickReply={handleQuickReply}
                      quickReplies={message.quickReplies}
                      cta={message.cta}
                    />
                  ))}

                  {isLoading && <TypingIndicator />}

                  {showQuickActions && messages.length === 1 && (
                    <QuickActions onAction={handleQuickAction} />
                  )}

                  {showRating && !isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-center pt-2"
                    >
                      <div className="bg-white/80 backdrop-blur-md rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-lg border border-white/30">
                        <p className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3 text-center">Was this response helpful?</p>
                        <div className="flex gap-2 sm:gap-3 justify-center">
                          <button
                            onClick={() => handleRating('thumbs_up')}
                            className={`p-1.5 sm:p-2 rounded-lg transition-all duration-200 ${
                              rating === 'thumbs_up' 
                                ? 'bg-green-100 text-green-600 scale-110' 
                                : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                            }`}
                            aria-label="Rate response helpful"
                          >
                            <ThumbsUp className="w-4 sm:w-5 h-4 sm:h-5" aria-hidden="true" />
                          </button>
                          <button
                            onClick={() => handleRating('thumbs_down')}
                            className={`p-1.5 sm:p-2 rounded-lg transition-all duration-200 ${
                              rating === 'thumbs_down' 
                                ? 'bg-red-100 text-red-600 scale-110' 
                                : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                            }`}
                            aria-label="Rate response not helpful"
                          >
                            <ThumbsDown className="w-4 sm:w-5 h-4 sm:h-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />

                  {/* Scroll To Bottom Floating Button */}
                  <AnimatePresence>
                    {showScrollToBottom && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        onClick={scrollToBottom}
                        className="absolute bottom-20 right-4 sm:right-5 bg-white/80 backdrop-blur-md rounded-full p-2 shadow-lg border border-white/30 text-gray-600 hover:text-purple-600 transition-colors"
                        aria-label="Scroll to latest messages"
                      >
                        <ArrowDown className="w-5 h-5" aria-hidden="true" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Enhanced Message Input */}
              {!isMinimized && (
                <MessageInput
                  inputMessage={inputMessage}
                  setInputMessage={setInputMessage}
                  onSend={sendMessage}
                  isLoading={isLoading}
                  onFileUpload={() => fileInputRef.current?.click()}
                  inputRef={inputRef}
                  showLeadCapture={showLeadCapture}
                  onLeadCapture={handleLeadCapture}
                  className="px-2 sm:px-4 md:px-6"
                />
              )}

              <input
                ref={fileInputRef}
                type="file"
                onChange={() => {}}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isVisible={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        onSave={handleSaveLead}
        leadData={leadData}
        setLeadData={setLeadData}
      />
    </>
  );
}
