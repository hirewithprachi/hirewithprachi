import React from 'react';

const steps = [
  { icon: <i className="fas fa-comments text-primary text-3xl"></i>, title: 'Consultation', desc: 'Understand your HR needs and goals.' },
  { icon: <i className="fas fa-lightbulb text-secondary text-3xl"></i>, title: 'Strategy', desc: 'Develop a tailored HR plan for your business.' },
  { icon: <i className="fas fa-cogs text-accent text-3xl"></i>, title: 'Implementation', desc: 'Deploy solutions and optimize processes.' },
  { icon: <i className="fas fa-chart-line text-primary text-3xl"></i>, title: 'Growth', desc: 'Track results and support ongoing success.' },
];

export default function ProcessSection() {
  return (
    <section className="py-20 font-heading bg-background">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">How We Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {steps.map((s, i) => (
            <div key={s.title} className="bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center p-8">
              <div className="mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold text-primary mb-2 text-center">{s.title}</h3>
              <p className="text-neutral text-base text-center">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 