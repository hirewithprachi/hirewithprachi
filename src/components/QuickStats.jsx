import React from 'react';

const stats = [
  { icon: <i className="fas fa-users text-primary text-3xl"></i>, label: 'Clients Served', value: '245+' },
  { icon: <i className="fas fa-briefcase text-secondary text-3xl"></i>, label: 'Projects Completed', value: '39+' },
  { icon: <i className="fas fa-star text-accent text-3xl"></i>, label: 'Avg. Client Rating', value: '4.9/5' },
  { icon: <i className="fas fa-rocket text-primary text-3xl"></i>, label: 'Success Rate', value: '98%' },
];

export default function QuickStats() {
  return (
    <section className="py-8 font-heading bg-background">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl">
        {stats.map((s, i) => (
          <div key={s.label} className="bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 border border-gray-100">
            <div className="mb-2">{s.icon}</div>
            <div className="text-2xl font-bold text-primary mb-1">{s.value}</div>
            <div className="text-neutral text-base font-medium">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
} 