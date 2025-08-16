import React from 'react';
import { motion } from 'framer-motion';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { 
  Bot, 
  User, 
  Copy, 
  ThumbsUp, 
  ThumbsDown,
  CheckCircle,
  Sparkles
} from 'lucide-react';

// Configure marked for better rendering
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: false,
  mangle: false
});

export function ChatMessage({ message, onQuickReply, onCTA }) {
  const isUser = message.role === 'user';
  
  const renderMarkdown = (content) => {
    try {
      const html = marked.parse(content || '', { breaks: true });
      return DOMPurify.sanitize(html);
    } catch {
      return DOMPurify.sanitize((content || '').replace(/\n/g, '<br>'));
    }
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy message:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-4 mb-6 ${
        isUser ? 'flex-row-reverse' : ''
      }`}
    >
      {/* Avatar */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-xl ${
        isUser 
          ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/40' 
          : 'bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/40'
      }`}>
        {isUser ? (
          <User className="w-5 h-5 text-blue-600" />
        ) : (
          <Bot className="w-5 h-5 text-purple-600" />
        )}
      </div>

      {/* Message Content */}
      <div className={`max-w-[88%] ${
        isUser ? 'text-right' : ''
      }`}>
        <div className={`rounded-3xl px-6 py-4 shadow-2xl ${
          isUser 
            ? 'bg-gradient-to-r from-blue-500/90 to-purple-500/90 backdrop-blur-xl border border-blue-400/40 text-white' 
            : 'bg-gradient-to-r from-white/70 to-white/50 backdrop-blur-xl border border-white/40'
        }`}>
          {/* Message Text */}
          <div className={`prose prose-sm max-w-none leading-relaxed ${
            isUser ? 'text-white' : 'text-gray-800'
          }`}>
            <div 
              dangerouslySetInnerHTML={{ 
                __html: renderMarkdown(message.content) 
              }} 
            />
          </div>

          {/* Quick Replies (for assistant messages) */}
          {!isUser && message.quickReplies && message.quickReplies.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {message.quickReplies.map((reply, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onQuickReply && onQuickReply(reply)}
                  className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-sm font-medium text-gray-700 hover:bg-white/30 transition-all duration-200"
                >
                  {reply}
                </motion.button>
              ))}
            </div>
          )}

          {/* CTA Button (for assistant messages) */}
          {!isUser && message.cta && (
            <div className="mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onCTA && onCTA(message.cta)}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {message.cta.text}
              </motion.button>
            </div>
          )}
        </div>

        {/* Message Actions (for assistant messages) */}
        {!isUser && (
          <div className="mt-2 flex items-center gap-2 justify-start">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCopyMessage}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Copy message"
            >
              <Copy className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 hover:text-green-600 transition-colors"
              title="Helpful"
            >
              <ThumbsUp className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Not helpful"
            >
              <ThumbsDown className="w-4 h-4" />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
