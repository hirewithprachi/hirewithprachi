import React from 'react';
import ResponsiveImage from '../ui/ResponsiveImage';

const mainFeatures = [
  {
    icon: (
      <svg width="32" height="32" fill="none" stroke="#7c5cff" strokeWidth="2" viewBox="0 0 28 28"><circle cx="14" cy="14" r="12" /><circle cx="14" cy="14" r="4" /></svg>
    ),
    title: 'Executive Search for Top Leadership Talent',
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" stroke="#7c5cff" strokeWidth="2" viewBox="0 0 28 28"><rect x="6" y="6" width="16" height="16" rx="4" /><rect x="10" y="10" width="8" height="8" rx="2" /></svg>
    ),
    title: 'Employee Engagement & Retention',
  },
];

const checkFeatures = [
  'Tailored Talent Acquisition for Business Success',
  'Ensuring Compliance and Risk Management Excellence',
  'Accurate Payroll and Benefits Administration Services',
];

export default function HirableWhatWeDo() {
  return (
    <section className="relative w-full flex flex-col md:flex-row min-h-[520px]">
      {/* Left: Image */}
      <div className="w-full md:w-1/2 h-[340px] md:h-auto">
        <ResponsiveImage src="/assets/images/about-img-3.jpg" alt="What We Do" className="w-full h-full object-cover md:rounded-none rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none" />
      </div>
      {/* Right: Purple Content */}
      <div className="w-full md:w-1/2 bg-[#7c5cff] flex flex-col justify-center px-6 md:px-12 py-12 text-white relative">
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2 text-lime-300">
          <span className="inline-block w-2 h-2 rounded-full bg-lime-300"></span>
          What We Do
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
          Transforming workforces with tailored <span className="text-lime-300">HR solutions</span>
        </h2>
        <p className="text-lg text-white/90 mb-6 max-w-2xl">
          We provide customized HR services that enhance talent management, drive performance, and foster a positive workplace culture for sustained business success.
        </p>
        {/* Main Features */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {mainFeatures.map((f, i) => (
            <div key={f.title} className="flex items-center gap-3 bg-white/10 rounded-2xl px-6 py-4 min-w-[260px]">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#edeaff] text-[#7c5cff]">{f.icon}</span>
              <span className="font-bold text-lg text-white">{f.title}</span>
            </div>
          ))}
        </div>
        <hr className="border-white/20 mb-6" />
        {/* Check Features and Contact Badge */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <ul className="flex-1 space-y-4">
            {checkFeatures.map((f, i) => (
              <li key={f} className="flex items-center gap-3 text-base md:text-lg text-white font-medium">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-lime-300 text-[#7c5cff]">
                  <svg width="18" height="18" fill="none" stroke="#7c5cff" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                </span>
                {f}
              </li>
            ))}
          </ul>
          {/* Contact Us Circular Badge */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg viewBox="0 0 140 140" className="absolute inset-0 w-full h-full">
                <circle cx="70" cy="70" r="65" fill="#d4ff3f" />
                <text x="70" y="70" textAnchor="middle" dy=".3em" fontSize="14" fontWeight="bold" fill="#222">
                  <tspan dx="0" dy="-30">Contact Us *</tspan>
                  <tspan dx="0" dy="30">Contact Us *</tspan>
                  <tspan dx="0" dy="30">Contact Us *</tspan>
                </text>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path d="M12 2v20M2 12h20" stroke="#7c5cff" strokeWidth="2" strokeLinecap="round" /></svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}