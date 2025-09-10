import React, { useState } from 'react';
import ResponsiveImage from './ui/ResponsiveImage';
import { motion } from 'framer-motion';

const showcases = [
  {
    title: 'Payroll Compliance Overhaul',
    beforeImg: '/images/services/generic-service.svg',
    afterImg: '/images/services/generic-service.svg',
    before: 'Frequent payroll errors, compliance risks',
    after: '100% error-free payroll, audit ready',
  },
  {
    title: 'AI-Driven Talent Acquisition',
    beforeImg: '/images/services/generic-service.svg',
    afterImg: '/images/services/generic-service.svg',
    before: 'Slow hiring, poor candidate fit',
    after: 'AI-matched hires, 2x faster recruitment',
  },
];

function BeforeAfterSlider({ beforeImg, afterImg }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden shadow-lg mb-4 select-none">
      <ResponsiveImage src={beforeImg} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
      <ResponsiveImage src={afterImg} alt="After" className="absolute inset-0 w-full h-full object-cover" />
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={e => setPos(Number(e.target.value))}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4 z-10 accent-indigo-600"
        aria-label="Slider to compare before and after"
      />
      <div className="absolute left-2 top-2 bg-white/80 text-xs px-2 py-1 rounded">Before</div>
      <div className="absolute right-2 top-2 bg-white/80 text-xs px-2 py-1 rounded">After</div>
    </div>
  );
}

export default function BeforeAfterShowcase() {
  return (
    <section className="py-12 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Before & After Showcases</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {showcases.map((s, i) => (
          <motion.div
            key={s.title}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
            <BeforeAfterSlider beforeImg={s.beforeImg} afterImg={s.afterImg} />
            <div className="flex flex-col gap-2 mb-4 w-full">
              <div className="bg-gray-100 rounded p-2 text-sm">
                <span className="font-semibold text-gray-500">Before: </span>{s.before}
              </div>
              <div className="bg-green-50 rounded p-2 text-sm">
                <span className="font-semibold text-green-600">After: </span>{s.after}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}