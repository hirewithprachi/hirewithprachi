import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-4 mb-6"
    >
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md border border-purple-400/40 flex items-center justify-center shadow-xl">
        <Bot className="w-5 h-5 text-purple-600" />
      </div>

      {/* Typing Indicator */}
      <div className="bg-gradient-to-r from-white/70 to-white/50 backdrop-blur-xl rounded-3xl px-6 py-4 border border-white/40 shadow-2xl">
        <div className="flex items-center gap-2">
          {/* Animated Dots */}
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
          
          {/* Text */}
          <span className="ml-3 text-sm font-medium text-gray-700">
            Prachi's HR Assistant is thinking...
          </span>
        </div>
      </div>
    </motion.div>
  );
}
