import React from 'react';
import { motion } from 'framer-motion';

export default function AboutBranding() {
  return (
    <section className="py-12 flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto">
      {/* Photo Placeholder */}
      <motion.div
        className="w-56 h-56 rounded-3xl bg-gradient-to-br from-indigo-400 to-pink-300 flex items-center justify-center shadow-2xl"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
      >
        {/* TODO: Replace with real photo */}
        <span className="text-7xl text-white font-bold">PS</span>
      </motion.div>
      {/* Info Card */}
      <motion.div
        className="flex-1 bg-white rounded-2xl shadow-lg p-10"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Prachi Shrivastava</h1>
        <h2 className="text-lg text-indigo-600 font-semibold mb-4">Virtual HR Expert & Consultant</h2>
        <p className="text-gray-700 mb-2">Empowering organizations to thrive through people-first HR, technology, and compliance excellence. Passionate about digital transformation, talent development, and building future-ready workplaces.</p>
      </motion.div>
    </section>
  );
} 