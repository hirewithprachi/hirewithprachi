import React from 'react';

const stats = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 28 28"><circle cx="14" cy="14" r="12" stroke="#7c5cff" strokeWidth="2" fill="#edeaff" /><circle cx="14" cy="14" r="4" stroke="#7c5cff" strokeWidth="2" fill="white" /></svg>
    ),
    label: 'Seamless Onboarding',
    value: '75%',
    desc: 'New hires feel valued and confident as they begin their journey.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 28 28"><circle cx="14" cy="14" r="12" stroke="#7c5cff" strokeWidth="2" fill="#edeaff" /><path d="M14 10v4l2 2" stroke="#7c5cff" strokeWidth="2" strokeLinecap="round" /></svg>
    ),
    label: 'Employee Engagement',
    value: '90%',
    desc: 'Boost motivation and productivity by fostering a culture of recognition.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 28 28"><rect x="6" y="6" width="16" height="16" rx="4" stroke="#7c5cff" strokeWidth="2" fill="#edeaff" /><rect x="10" y="10" width="8" height="8" rx="2" stroke="#7c5cff" strokeWidth="2" fill="white" /></svg>
    ),
    label: 'Growth & Development',
    value: '80%',
    desc: 'Support employees in reaching their full potential with training.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 28 28"><circle cx="14" cy="14" r="12" stroke="#7c5cff" strokeWidth="2" fill="#edeaff" /><path d="M8 14h12" stroke="#7c5cff" strokeWidth="2" strokeLinecap="round" /></svg>
    ),
    label: 'Workplace Satisfaction',
    value: '85%',
    desc: 'Create a positive work environment that priority employee well-being.',
  },
];

export default function HirableEmployeeExperience() {
  return (
    <section className="relative py-12 font-heading bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <span className="text-[#d4ff3f] text-[10px] font-bold uppercase tracking-widest mb-1 block">• Employee Experience</span>
            <h2 className="text-2xl md:text-3xl font-extrabold leading-tight mb-1 text-black">
              Employee-centered solutions for <span className="text-[#7c5cff]">lasting success</span>
            </h2>
          </div>
          <a href="#contact" className="inline-flex items-center px-5 py-2 rounded-full bg-[#7c5cff] text-white font-bold text-base shadow-xl hover:bg-[#5a3fd6] transition-colors duration-200 relative">
            Contact Us
            <span className="ml-2 bg-[#d4ff3f] rounded-full p-1">
              <svg width="16" height="16" fill="none" stroke="#222" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </a>
        </div>
        <div className="flex flex-row gap-6 overflow-x-auto pb-2 hide-scrollbar justify-center">
          {stats.map((s, i) => (
            <div key={s.label} className="w-[260px] rounded-3xl border border-[#f0f0f5] p-6 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-300 group bg-white flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-full mb-4 bg-[#edeaff] text-[#7c5cff] text-xl">
                {s.icon}
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-black mb-1">{s.value}</div>
              <div className="text-base font-bold text-[#7c5cff] mb-0.5">{s.label}</div>
              <div className="text-gray-500 text-xs mb-1">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 