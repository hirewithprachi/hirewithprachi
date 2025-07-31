import React from 'react';

const stats = [
  { label: 'Years of Experience', value: '12+', icon: <i className="fas fa-award text-primary text-3xl"></i> },
  { label: 'Our Satisfied Clients', value: '245+', icon: <i className="fas fa-users text-secondary text-3xl"></i> },
  { label: 'Employee On Worldwide', value: '1,200+', icon: <i className="fas fa-globe text-accent text-3xl"></i> },
  { label: 'Projects Completed', value: '39+', icon: <i className="fas fa-briefcase text-primary text-3xl"></i> },
];

export default function HirableStats() {
  return (
    <section className="py-8 md:py-12 font-heading bg-white">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-6xl">
        {stats.map((s, i) => (
          <div key={s.label} className="bg-white rounded-2xl shadow-md flex flex-col items-center justify-center p-6 md:p-8 border border-gray-100">
            <div className="mb-2">{s.icon}</div>
            <div className="text-3xl md:text-4xl font-bold text-[#6C63FF] mb-1">{s.value}</div>
            <div className="text-gray-700 text-base font-medium text-center">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
} 