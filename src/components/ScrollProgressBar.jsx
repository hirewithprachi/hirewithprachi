import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function ScrollProgressBar() {
  const [width, setWidth] = useState(0);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setWidth(percent);
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      <motion.div
        className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 rounded-full shadow-lg"
        style={{ width: reduceMotion ? `${width}%` : undefined }}
        animate={reduceMotion ? {} : { width: `${width}%` }}
        transition={{ type: 'spring', stiffness: 120, damping: 20, duration: 0.3 }}
      >
        {/* Glowing dot at the end */}
        <motion.div
          className="absolute top-0 -right-2 w-4 h-4 rounded-full bg-gradient-to-br from-pink-400 via-indigo-400 to-purple-400 shadow-xl"
          style={{ x: `calc(${width}% - 8px)`, opacity: width > 2 ? 1 : 0 }}
          animate={width === 100 && !reduceMotion ? { scale: [1, 1.3, 1], boxShadow: ['0 0 16px #f093fb', '0 0 32px #f093fb', '0 0 16px #f093fb'] } : { scale: 1, boxShadow: '0 0 16px #f093fb' }}
          transition={{ duration: 0.6, repeat: width === 100 && !reduceMotion ? Infinity : 0, repeatType: 'loop' }}
        />
      </motion.div>
    </div>
  );
} 