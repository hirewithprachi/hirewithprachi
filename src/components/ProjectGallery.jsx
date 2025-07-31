import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  { title: 'HR Digital Transformation', industry: 'Tech Startup' },
  { title: 'Payroll Compliance Overhaul', industry: 'Manufacturing' },
  { title: 'AI-Driven Talent Acquisition', industry: 'Finance' },
  { title: 'Remote Onboarding System', industry: 'E-commerce' },
  { title: 'GDPR Audit Success', industry: 'Healthcare' },
  { title: 'Executive HR Consulting', industry: 'Logistics' },
];

export default function ProjectGallery() {
  return (
    <section className="py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Project Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <span className="text-indigo-600 text-sm mb-4">{project.industry}</span>
            <button className="mt-auto px-6 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium hover:bg-indigo-200 transition">View Details</button>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 