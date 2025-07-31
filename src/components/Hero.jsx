import React, { useState } from 'react';
import { motion, useCycle } from 'framer-motion';
import Typewriter from './Typewriter.jsx';

export default function Hero() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [morph, cycleMorph] = useCycle(
    'M44.8,-77.2C56.7,-67.2,63.7,-50.2,70.2,-34.2C76.7,-18.2,82.7,-3.1,80.2,10.7C77.7,24.5,66.7,37,55.2,48.2C43.7,59.4,31.7,69.3,17.2,75.2C2.7,81.1,-14.3,83,-29.2,77.2C-44.1,71.4,-56.9,57.9,-66.2,43.1C-75.5,28.3,-81.3,12.1,-80.2,-4.2C-79.1,-20.5,-71.1,-36.9,-59.2,-47.7C-47.3,-58.5,-31.6,-63.7,-15.2,-70.2C1.2,-76.7,17.3,-84.5,32.2,-83.2C47.1,-81.9,61.9,-71.2,44.8,-77.2Z',
    'M54.6,-70.2C67.2,-59.2,70.7,-36.2,74.2,-14.2C77.7,7.8,81.2,28.8,72.2,41.2C63.2,53.6,41.7,57.4,23.2,62.2C4.7,67,-10.8,72.7,-25.2,69.2C-39.6,65.7,-52.9,53,-62.2,38.2C-71.5,23.4,-76.7,6.7,-74.2,-8.2C-71.7,-23.1,-61.5,-36.2,-48.7,-47.2C-35.9,-58.2,-20.5,-67.1,-2.7,-65.2C15.1,-63.3,30.2,-50.6,54.6,-70.2Z'
  );
  React.useEffect(() => {
    const interval = setInterval(() => cycleMorph(), 3500);
    return () => clearInterval(interval);
  }, [cycleMorph]);
  function handleMouseMove(e) {
    const { innerWidth, innerHeight } = window;
    const x = ((e.clientX / innerWidth) - 0.5) * 30;
    const y = ((e.clientY / innerHeight) - 0.5) * 30;
    setParallax({ x, y });
  }
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[60vh] py-16 text-center overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Morphing SVG Blob Background */}
      <motion.svg
        width="480" height="480" viewBox="0 0 200 200" fill="none"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-60 pointer-events-none"
        style={{ transform: `translate(-50%,-50%) scale(1.2) translate(${parallax.x / 3}px, ${parallax.y / 3}px)` }}
      >
        <motion.path
          d={morph}
          fill="url(#hero-gradient)"
          animate={{ d: morph }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
        />
        <defs>
          <linearGradient id="hero-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="100%" stopColor="#f093fb" />
          </linearGradient>
        </defs>
      </motion.svg>
      {/* Parallax Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-300 opacity-30" style={{ transform: `translate(${parallax.x / 2}px, ${parallax.y / 2}px)` }} />
      {/* TODO: Video Background (optional, behind content) */}
      <div className="relative z-10">
        {/* Dynamic Text Animation */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Typewriter text="Streamline Your HR, Amplify Your Success" speed={60} loop={true} />
        </motion.h1>
        {/* Interactive Avatar with Parallax */}
        <div className="mx-auto my-6 w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center" style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}>
          {/* TODO: Replace with 3D model or high-quality image with parallax */}
          <span className="text-3xl font-bold text-indigo-600">PS</span>
        </div>
        {/* Floating CTAs */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
          <button className="px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition">Get Started</button>
          <button className="px-8 py-3 rounded-full bg-white text-indigo-600 font-semibold shadow-lg border border-indigo-600 hover:bg-indigo-50 transition">Book a Consultation</button>
        </div>
        {/* Trust Indicators: Client Logos Carousel */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 opacity-80">
          {/* TODO: Replace with animated carousel of client logos */}
          <span className="text-gray-500">[Client Logo 1]</span>
          <span className="text-gray-500">[Client Logo 2]</span>
          <span className="text-gray-500">[Client Logo 3]</span>
          <span className="text-gray-500">[Client Logo 4]</span>
        </div>
      </div>
    </section>
  );
} 