import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const services = [
  {
    name: 'Recruitment & Hiring',
    icon: '👥',
    desc: 'Find, attract, and onboard top talent with our expert recruitment solutions.',
  },
  {
    name: 'Payroll & Compliance',
    icon: '💸',
    desc: 'Ensure accurate payroll and full legal compliance for your business.',
  },
  {
    name: 'Employee Management',
    icon: '📋',
    desc: 'Streamline HR operations and boost employee engagement and retention.',
  },
  {
    name: 'AI HR Analytics',
    icon: '🤖',
    desc: 'Leverage AI-powered insights to optimize your workforce and HR strategy.',
  },
];

function ServiceCard({ service, i }) {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const cardRef = useRef(null);
  const reduceMotion = useReducedMotion();

  function handleMouseMove(e) {
    if (reduceMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setTilt({ x, y });
  }
  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
    setActive(false);
    setFlipped(false);
  }
  function handleMouseEnter() {
    setActive(true);
  }

  return (
    <motion.div
      key={service.name}
      ref={cardRef}
      className={`bg-white rounded-2xl shadow-lg p-0 flex flex-col items-center text-center hover:shadow-2xl transition perspective-1000 relative`}
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      animate={reduceMotion ? {} : { scale: active ? 1.04 : 1, boxShadow: active ? '0 8px 32px rgba(102,126,234,0.18)' : undefined }}
    >
      {/* Animated border for active/hovered */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
        initial={false}
        animate={active ? { boxShadow: '0 0 0 4px #667eea55, 0 0 32px #f093fb55' } : { boxShadow: '0 0 0 0px #667eea00' }}
        transition={{ duration: 0.3 }}
      />
      <div
        className={`relative w-full h-64 transition-transform duration-500 transform-style-preserve-3d ${flipped ? 'rotate-y-180' : ''}`}
        style={reduceMotion ? {} : { minHeight: '16rem', transform: `rotateY(${flipped ? 180 : 0}deg) rotateX(${-tilt.y}deg) rotateY(${tilt.x}deg)` }}
      >
        {/* Front */}
        <div className="absolute inset-0 flex flex-col items-center justify-center backface-hidden">
          <div className="text-5xl mb-4">{service.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
          <button className="mt-auto px-6 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium hover:bg-indigo-200 transition">Learn More</button>
        </div>
        {/* Back */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-600 text-white rounded-2xl p-4 backface-hidden rotate-y-180">
          <p className="mb-4">{service.desc}</p>
          <button className="mt-auto px-6 py-2 rounded-full bg-white text-indigo-700 font-medium hover:bg-indigo-50 transition">Back</button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesOverview() {
  return (
    <section className="py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Our Core HR Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {services.map((service, i) => (
          <ServiceCard key={service.name} service={service} i={i} />
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <a href="/services" className="px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition">View All Services</a>
      </div>
    </section>
  );
} 