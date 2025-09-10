import React from 'react';
import ResponsiveImage from '../ui/ResponsiveImage';

const featureCards = [
  {
    title: 'Paid Time Off',
    desc: 'We streamline payroll processing, ensuring timely, accurate.',
  },
  {
    title: 'Performance Rewards',
    desc: 'We streamline payroll processing, ensuring timely, accurate.',
  },
];

const checkFeatures = [
  'Health & Wellness Programs',
  'Work-Life Balance Support',
  'Competitive Compensation',
  'Employee Assistance Program',
];

export default function HirableBenefits() {
  return (
    <section className="relative py-16 font-heading bg-[#fafafd] overflow-visible">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16 px-4">
        {/* Left: Text and Features */}
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center animate-fadeInUp">
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2 text-[#7c5cff]">
            <span className="inline-block w-2 h-2 rounded-full bg-lime-300"></span>
            Our Benefits
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 text-black">
            Empowering success with tailored <span className="text-[#7c5cff]">HR benefits</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-6 max-w-xl">
            We provide customized HR benefits that enhance employee satisfaction performance and support organizational growth through comprehensive solutions.
          </p>
          {/* Feature Cards */}
          <div className="flex flex-row gap-6 mb-4 w-full">
            {featureCards.map((f, i) => (
              <div key={f.title} className="flex-1 bg-white rounded-2xl border border-[#ececec] p-6 shadow-sm hover:shadow-lg transition-all duration-300 group animate-fadeInUp">
                <h3 className="text-lg font-bold mb-2 text-black">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
          {/* Check Features Grid */}
          <div className="bg-white rounded-2xl border border-[#ececec] p-6 flex flex-wrap gap-x-8 gap-y-3 w-full animate-fadeInUp">
            {checkFeatures.map((f, i) => (
              <div key={f} className="flex items-center gap-2 w-1/2 min-w-[180px]">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#edeaff] text-[#7c5cff]">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
                </span>
                <span className="text-sm text-black font-medium">{f}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Right: Images and Stat */}
        <div className="w-full md:w-1/2 flex flex-col items-center gap-6 relative animate-fadeInRight">
          <div className="relative w-full flex flex-col items-end gap-6">
            {/* Top Image with Contact Badge */}
            <div className="relative w-[340px] h-[220px] rounded-3xl overflow-hidden shadow-lg">
              <ResponsiveImage src="/assets/images/benefit-img-1.jpg" alt="Benefits" className="w-full h-full object-cover" />
              {/* Circular Contact Badge */}
              <div className="absolute -right-10 top-8 z-10 animate-fadeInDown">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg viewBox="0 0 140 140" className="absolute inset-0 w-full h-full">
                    <circle cx="70" cy="70" r="65" fill="#d4ff3f" />
                    <text x="70" y="70" textAnchor="middle" dy=".3em" fontSize="12" fontWeight="bold" fill="#222">
                      <tspan dx="0" dy="-20">Contact Us *</tspan>
                      <tspan dx="0" dy="20">Contact Us *</tspan>
                    </text>
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg width="28" height="28" fill="#7c5cff" viewBox="0 0 24 24"><path d="M12 2v20M2 12h20" stroke="#7c5cff" strokeWidth="2" strokeLinecap="round" /></svg>
                  </span>
                </div>
              </div>
            </div>
            {/* Bottom Image with Stat Card */}
            <div className="relative w-[320px] h-[180px] rounded-3xl overflow-hidden shadow-lg mt-4">
              <ResponsiveImage src="/assets/images/benefit-img-2.jpg" alt="Benefits" className="w-full h-full object-cover" />
              {/* Floating Stat Card */}
              <div className="absolute -left-16 top-10 bg-white rounded-2xl shadow-lg flex items-center gap-3 px-6 py-4 border border-[#ececec] animate-fadeInUp">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#edeaff] text-[#7c5cff]">
                  <svg width="24" height="24" fill="none" stroke="#7c5cff" strokeWidth="2" viewBox="0 0 28 28"><circle cx="14" cy="14" r="12" /><circle cx="14" cy="14" r="4" /></svg>
                </span>
                <div>
                  <div className="text-xl font-bold text-black">250 +</div>
                  <div className="text-xs text-gray-500">Product Liability</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}