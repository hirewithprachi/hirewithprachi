import React from 'react';
import ResponsiveImage from './ui/ResponsiveImage';
import { motion } from 'framer-motion';

const services = [
  { name: 'Recruitment & Hiring', img: 'https://demo.awaikenthemes.com/hirable/wp-content/uploads/2025/04/service-1.jpg', desc: 'Attract and onboard top talent with our expert recruitment solutions.' },
  { name: 'Payroll & Compliance', img: 'https://demo.awaikenthemes.com/hirable/wp-content/uploads/2025/04/service-2.jpg', desc: 'Accurate payroll and full legal compliance for your business.' },
  { name: 'Employee Management', img: 'https://demo.awaikenthemes.com/hirable/wp-content/uploads/2025/04/service-3.jpg', desc: 'Streamline HR operations and boost engagement.' },
  { name: 'AI HR Analytics', img: 'https://demo.awaikenthemes.com/hirable/wp-content/uploads/2025/04/service-4.jpg', desc: 'AI-powered insights to optimize your workforce.' },
  { name: 'Remote Work Solutions', img: 'https://demo.awaikenthemes.com/hirable/wp-content/uploads/2025/04/service-5.jpg', desc: 'Flexible solutions for distributed teams and hybrid work.' },
  { name: 'Executive Consulting', img: 'https://demo.awaikenthemes.com/hirable/wp-content/uploads/2025/04/service-6.jpg', desc: 'Strategic HR consulting for leadership and growth.' },
];

export default function ServicesGrid() {
  return (
    <section className="py-20 font-heading bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary text-center">Our HR Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center p-8 hover:shadow-2xl transition duration-300 group"
              whileHover={{ scale: 1.04 }}
            >
              <ResponsiveImage src={s.img} alt={s.name} className="w-24 h-24 object-cover rounded-full mb-6 border-4 border-primary group-hover:scale-110 transition duration-300" />
              <h3 className="text-xl font-bold text-primary mb-2 text-center">{s.name}</h3>
              <p className="text-neutral text-base text-center mb-4">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}