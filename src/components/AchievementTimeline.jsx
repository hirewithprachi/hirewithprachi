import React from 'react';
import { motion } from 'framer-motion';

const timeline = [
  { year: '2012', title: 'Started HR Career', desc: 'Began as HR Associate at a leading tech firm.' },
  { year: '2016', title: 'Certified HR Professional', desc: 'Earned SHRM-CP and expanded into compliance.' },
  { year: '2019', title: 'Launched Virtual HR Services', desc: 'Founded Prachi HR Services, serving 100+ clients.' },
  { year: '2023', title: 'AI HR Analytics Pioneer', desc: 'Introduced AI-driven analytics for client success.' },
];

export default function AchievementTimeline() {
  return (
    <section className="py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Achievements Timeline</h2>
      <div className="flex flex-col gap-8">
        {timeline.map((item, i) => (
          <motion.div
            key={item.year}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6 hover:shadow-2xl transition"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="text-3xl font-bold text-primary mb-2 md:mb-0 md:mr-8 w-20 text-center">{item.year}</div>
            <div>
              <div className="text-lg font-semibold mb-1">{item.title}</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">{item.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 