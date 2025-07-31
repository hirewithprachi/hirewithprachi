import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  { name: 'HR Strategy', level: 95 },
  { name: 'Compliance', level: 90 },
  { name: 'HR Tech', level: 85 },
  { name: 'Analytics', level: 80 },
];

export default function SkillBars() {
  return (
    <section className="py-12 max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Key Skills</h2>
      <div className="flex flex-col gap-6">
        {skills.map((skill, i) => (
          <div key={skill.name} className="mb-2">
            <div className="flex justify-between mb-1">
              <span className="font-medium text-gray-700">{skill.name}</span>
              <span className="text-indigo-600 font-bold">{skill.level}%</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-4 bg-gradient-to-r from-indigo-500 to-pink-400 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: skill.level + '%' }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1 + i * 0.2 }}
                style={{ width: skill.level + '%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 