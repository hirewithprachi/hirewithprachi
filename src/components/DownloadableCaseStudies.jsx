import React from 'react';
import { motion } from 'framer-motion';

const cases = [
  { title: 'Digital HR Transformation', desc: 'How we helped a tech startup automate HR and boost retention.', link: '#' },
  { title: 'Payroll Compliance Success', desc: 'Case study on achieving 100% payroll accuracy for a manufacturer.', link: '#' },
];

export default function DownloadableCaseStudies() {
  return (
    <section className="py-12 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Downloadable Case Studies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cases.map((c, i) => (
          <motion.div
            key={c.title}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-2">{c.title}</h3>
            <p className="text-gray-600 mb-4">{c.desc}</p>
            <a href={c.link} className="mt-auto px-6 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium hover:bg-indigo-200 transition" download>
              Download PDF
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 