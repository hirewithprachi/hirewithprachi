import React from 'react';
import { motion } from 'framer-motion';

const services = ['Recruitment', 'Payroll', 'Analytics'];
const features = [
  { name: 'Automated Process', values: [true, true, true] },
  { name: 'Compliance Support', values: [false, true, true] },
  { name: 'AI Insights', values: [false, false, true] },
];

export default function ServiceComparison() {
  return (
    <section className="py-12 max-w-4xl mx-auto">
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Service Comparison</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-indigo-50">
                <th className="p-3 text-left font-semibold">Feature</th>
                {services.map(s => (
                  <th key={s} className="p-3 text-center font-semibold">{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map(f => (
                <tr key={f.name} className="border-t border-gray-100">
                  <td className="p-3 font-medium text-gray-700">{f.name}</td>
                  {f.values.map((v, i) => (
                    <td key={i} className="p-3 text-center">
                      {v ? <span className="text-green-500 font-bold">✔</span> : <span className="text-gray-300">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
} 