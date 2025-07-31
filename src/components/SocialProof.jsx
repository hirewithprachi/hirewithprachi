import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const stats = [
  { label: 'Projects Completed', value: 220 },
  { label: 'Clients Served', value: 150 },
  { label: 'Years in Business', value: 12 },
];

function useCountUp(target, duration = 1.2) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / (duration * 60));
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [target, duration]);
  return count;
}

export default function SocialProof() {
  return (
    <section className="py-12 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Impact</h2>
      <div className="flex flex-wrap justify-center gap-10">
        {stats.map((stat, i) => {
          const count = useCountUp(stat.value, 1.2 + i * 0.2);
          return (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center bg-white rounded-2xl shadow-lg px-10 py-8 min-w-[180px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="text-4xl font-bold text-indigo-600 mb-2">{count}+</span>
              <span className="text-gray-600 text-lg font-medium">{stat.label}</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
} 