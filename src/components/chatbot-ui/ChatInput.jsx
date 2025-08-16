import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Paperclip, Mic, StopCircle } from 'lucide-react';

export function ChatInput({ onSendMessage, isTyping = false, onStopTyping }) {
  const [message, setMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isTyping) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky bottom-0 bg-gradient-to-t from-white/95 to-white/80 backdrop-blur-xl border-t border-white/40 p-4"
    >
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Input Container */}
          <div className="relative bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl overflow-hidden">
            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              placeholder="Type your message here... (Shift + Enter for new line)"
              className="w-full min-h-[56px] max-h-[120px] px-4 py-3 pr-20 bg-transparent border-none outline-none resize-none text-gray-800 placeholder-gray-500 leading-relaxed"
              disabled={isTyping}
            />
            
            {/* Action Buttons */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {/* Stop Button (when typing) */}
              {isTyping && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onStopTyping}
                  className="p-2 text-red-500 hover:text-red-600 transition-colors"
                  title="Stop generating"
                >
                  <StopCircle className="w-5 h-5" />
                </motion.button>
              )}
              
              {/* Send Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!message.trim() || isTyping}
                className={`p-2 rounded-full transition-all duration-200 ${
                  message.trim() && !isTyping
                    ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                title="Send message"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Additional Features Bar */}
          <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              {/* File Upload */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                title="Attach file"
              >
                <Paperclip className="w-4 h-4" />
                <span>Attach</span>
              </motion.button>
              
              {/* Voice Input */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                title="Voice input"
              >
                <Mic className="w-4 h-4" />
                <span>Voice</span>
              </motion.button>
            </div>
            
            {/* Character Count */}
            <div className="text-xs">
              {message.length}/4000
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
