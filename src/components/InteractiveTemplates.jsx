import React from 'react';
import { motion } from 'framer-motion';

const templates = [
  { title: 'Offer Letter Builder', icon: '🛠️', link: '#' },
  { title: 'Employee Handbook Generator', icon: '📚', link: '#' },
];

export default function InteractiveTemplates() {
  return (
    <section className="py-12 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Interactive Templates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {templates.map((t, i) => (
          <motion.div
            key={t.title}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="text-5xl mb-4">{t.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{t.title}</h3>
            <a href={t.link} className="mt-auto px-6 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium hover:bg-indigo-200 transition">Customize</a>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 