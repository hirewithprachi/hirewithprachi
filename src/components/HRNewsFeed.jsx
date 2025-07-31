import React from 'react';
import { motion } from 'framer-motion';

const news = [
  { icon: '📰', headline: 'New Labor Law Updates for 2025', date: 'Jul 2025', link: '#' },
  { icon: '💡', headline: 'AI in HR: Top Trends', date: 'Jun 2025', link: '#' },
  { icon: '🌐', headline: 'Remote Work Compliance Guide', date: 'May 2025', link: '#' },
];

export default function HRNewsFeed() {
  return (
    <section className="py-12 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">HR News Feed</h2>
      <div className="flex flex-col gap-6">
        {news.map((item, i) => (
          <motion.div
            key={item.headline}
            className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-6 hover:shadow-2xl transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="text-3xl">{item.icon}</div>
            <div className="flex-1">
              <div className="font-semibold text-lg mb-1">{item.headline}</div>
              <div className="text-gray-400 text-xs mb-2">{item.date}</div>
              <a href={item.link} className="text-indigo-600 hover:underline text-sm">Read More</a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 