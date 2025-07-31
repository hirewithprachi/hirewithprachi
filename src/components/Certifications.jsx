import React from 'react';
import { motion } from 'framer-motion';

const badges = [
  { name: 'SHRM-CP', color: 'bg-indigo-500' },
  { name: 'HR Analytics Pro', color: 'bg-pink-500' },
  { name: 'Compliance Expert', color: 'bg-green-500' },
  { name: 'AI HR Innovator', color: 'bg-yellow-400 text-gray-900' },
];

export default function Certifications() {
  return (
    <section className="py-12 max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Certifications</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {badges.map((badge, i) => (
          <motion.div
            key={badge.name}
            className={`rounded-full px-6 py-3 text-white font-semibold shadow-lg text-lg ${badge.color}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            {badge.name}
          </motion.div>
        ))}
      </div>
    </section>
  );
} 