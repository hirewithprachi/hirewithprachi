import React from 'react';
import { motion } from 'framer-motion';

export default function AboutPreview() {
  return (
    <section className="py-16 flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto">
      {/* Photo Placeholder */}
      <motion.div
        className="w-40 h-40 rounded-2xl bg-gradient-to-br from-indigo-400 to-pink-300 flex items-center justify-center shadow-lg"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        {/* TODO: Replace with real photo */}
        <span className="text-6xl text-white font-bold">PS</span>
      </motion.div>
      {/* Info Card */}
      <motion.div
        className="flex-1 bg-white rounded-2xl shadow-lg p-8"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Meet Prachi Shrivastava</h2>
        <p className="text-gray-700 mb-6">Virtual HR expert with a passion for transforming organizations through people-first strategies, technology, and compliance excellence.</p>
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-indigo-600">12+</span>
            <span className="text-gray-500 text-sm">Years Experience</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-indigo-600">150+</span>
            <span className="text-gray-500 text-sm">Clients Served</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-indigo-600">8</span>
            <span className="text-gray-500 text-sm">Certifications</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 