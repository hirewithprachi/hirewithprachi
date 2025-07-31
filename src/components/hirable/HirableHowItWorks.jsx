import React from 'react';

const steps = [
  { label: 'Consultation & Assessment', desc: 'We analyze your HR need customized strategy that align with your business goals and workforce requirements.', step: 'STEP 01', img: '/Hirable – Human Resources & Recruiting WordPress Theme_files/how-work-process-img-1.jpg' },
  { label: 'Talent Sourcing & Screening', desc: 'We analyze your HR need customized strategy that align with your business goals and workforce requirements.', step: 'STEP 02', img: '/Hirable – Human Resources & Recruiting WordPress Theme_files/how-work-process-img-2.jpg' },
  { label: 'Compliance Support', desc: 'We analyze your HR need customized strategy that align with your business goals and workforce requirements.', step: 'STEP 03', img: '/Hirable – Human Resources & Recruiting WordPress Theme_files/how-work-process-img-3.jpg' },
];

export default function HirableHowItWorks() {
  return (
    <section className="relative py-20 font-heading bg-white overflow-hidden">
      {/* Decorative SVG divider at the top */}
      <svg className="absolute left-0 top-0 w-full h-16 z-0" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#a5b4fc" fillOpacity="0.25" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
      </svg>
      {/* Decorative SVG background */}
      <svg className="absolute right-0 top-0 w-1/2 h-32 z-0 opacity-20 pointer-events-none" viewBox="0 0 720 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="howitworks-bg-gradient" x1="0" y1="0" x2="720" y2="160" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7C3AED" />
            <stop offset="1" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <path d="M0,80 C180,160 540,0 720,80 L720,160 L0,160 Z" fill="url(#howitworks-bg-gradient)" />
      </svg>
      <div className="container mx-auto max-w-6xl relative z-10 animate-fadeInUp">
        <h3 className="text-lg md:text-xl font-semibold text-accent mb-2 tracking-widest uppercase text-center">HOW IT WORK</h3>
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-primary text-center">Streamlining success through proven process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((s, i) => (
            <div key={s.label} className="bg-background rounded-2xl shadow flex flex-col items-center justify-center p-8 border border-gray-100 animate-fadeInUp" style={{ animationDelay: `${i * 100}ms` }}>
              <img src={s.img} alt={s.label} className="w-32 h-32 object-cover rounded-2xl mb-4 border-4 border-primary" loading="lazy" />
              <div className="text-lg font-semibold text-primary mb-2 text-center">{s.label}</div>
              <div className="text-neutral text-base text-center mb-2">{s.desc}</div>
              <div className="text-accent font-bold text-sm mt-2">{s.step}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 