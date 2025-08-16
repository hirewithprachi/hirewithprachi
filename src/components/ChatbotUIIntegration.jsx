import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { ChatUI } from './chatbot-ui/ChatUI';

export function ChatbotUIIntegration() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Listen for custom events to open chat
  useEffect(() => {
    const handleOpenChat = (event) => {
      setIsOpen(true);
      setIsMinimized(false);
    };

    window.addEventListener('open-chat', handleOpenChat);
    
    return () => {
      window.removeEventListener('open-chat', handleOpenChat);
    };
  }, []);

  const handleToggleChat = () => {
    if (isOpen) {
      setIsMinimized(!isMinimized);
    } else {
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  const handleCloseChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleChat}
            className="fixed bottom-4 right-4 z-50 w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group"
          >
            <MessageCircle className="w-8 h-8 text-white" />
            
            {/* Pulse animation */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 animate-ping opacity-20"></div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Chat with Prachi's HR Assistant
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat UI */}
      <AnimatePresence>
        {isOpen && (
          <ChatUI
            isOpen={isOpen}
            onClose={handleCloseChat}
            isMinimized={isMinimized}
            onToggleMinimize={() => setIsMinimized(!isMinimized)}
          />
        )}
      </AnimatePresence>

      {/* Minimized Chat Button */}
      <AnimatePresence>
        {isOpen && isMinimized && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMinimized(false)}
            className="fixed bottom-4 right-4 z-50 w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group"
          >
            <MessageCircle className="w-6 h-6 text-white" />
            
            {/* Notification dot */}
            <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Click to expand chat
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
