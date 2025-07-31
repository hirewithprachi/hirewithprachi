import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import workflowLottie from '../../public/assets/images/workflow-lottie.json';

const steps = [
  { icon: '💬', label: 'Consult' },
  { icon: '📝', label: 'Plan' },
  { icon: '⚙️', label: 'Implement' },
  { icon: '🤝', label: 'Support' },
];

export default function ProcessVisualization() {
  return (
    <section className="py-12 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">How Our Process Works</h2>
      {/* Lottie Animation */}
      <div className="flex justify-center mb-8">
        <div className="w-64 h-64">
          <Lottie animationData={workflowLottie} loop={true} autoplay={true} />
        </div>
      </div>
      <div className="flex justify-between items-center gap-4">
        {steps.map((step, i) => (
          <motion.div
            key={step.label}
            className="flex flex-col items-center flex-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-3xl mb-2 shadow-lg">
              {step.icon}
            </div>
            <span className="font-semibold text-gray-700">{step.label}</span>
            {i < steps.length - 1 && (
              <div className="w-full h-1 bg-indigo-200 my-2" />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
} 