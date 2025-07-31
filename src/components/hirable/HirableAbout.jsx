import React from 'react';

export default function HirableAbout() {
  return (
    <section className="relative py-16 md:py-20 font-heading bg-white overflow-visible">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20 px-4">
        {/* Left: Images Grid */}
        <div className="flex flex-col gap-4 md:gap-6 items-center md:items-start w-full md:w-1/2">
          <div className="flex flex-row gap-4 md:gap-6 items-center">
            <img src="/Hirable – Human Resources & Recruiting WordPress Theme_files/about-img-1.jpg" alt="HR Consultant Badge" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-contain border-6 md:border-8 border-[#d4ff3f] bg-[#d4ff3f]" loading="lazy" />
            <img src="/Hirable – Human Resources & Recruiting WordPress Theme_files/about-img-2.jpg" alt="Virtual HR Services" className="w-44 h-56 md:w-56 md:h-72 rounded-2xl md:rounded-3xl object-cover shadow-xl" loading="lazy" />
          </div>
          <div className="flex flex-row gap-4 md:gap-6 mt-2">
            <img src="/Hirable – Human Resources & Recruiting WordPress Theme_files/about-img-3.jpg" alt="Remote HR Support" className="w-32 h-24 md:w-40 md:h-32 rounded-xl md:rounded-2xl object-cover shadow-lg" loading="lazy" />
            <img src="/Hirable – Human Resources & Recruiting WordPress Theme_files/about-img-1.jpg" alt="HR Consulting" className="w-32 h-24 md:w-40 md:h-32 rounded-xl md:rounded-2xl object-cover shadow-lg" loading="lazy" />
            <div className="flex flex-col justify-end">
              <div className="bg-[#d4ff3f] text-[#222] rounded-xl md:rounded-2xl px-6 md:px-8 py-4 md:py-6 text-center font-extrabold text-2xl md:text-3xl leading-tight shadow-lg">
                8+
                <div className="text-sm md:text-base font-semibold mt-1">Years of<br />HR Excellence</div>
              </div>
            </div>
          </div>
        </div>
        {/* Right: Text and Features */}
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
          <span className="text-[#d4ff3f] text-xs font-bold uppercase tracking-widest mb-2">• About Prachi Shrivastava</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Your trusted <span className="text-[#7c5cff]">Virtual HR Consultant</span> for business growth
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-6 max-w-xl leading-relaxed">
            As a freelance HR agency, I help startups and SMEs build strong HR foundations. Get expert remote HR support, compliance guidance, and strategic HR solutions without the cost of a full-time HR team.
          </p>
          <ul className="space-y-4 md:space-y-6 mb-6 md:mb-8 w-full">
            <li className="flex items-start gap-3 md:gap-4">
              <span className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#edeaff] text-[#7c5cff] flex-shrink-0">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /></svg>
              </span>
              <div>
                <div className="font-bold text-base md:text-lg text-black mb-1">Virtual HR Solutions for Modern Businesses</div>
                <div className="text-gray-500 text-sm md:text-base leading-relaxed">Comprehensive remote HR support including recruitment, compliance, employee relations, and strategic HR planning.</div>
              </div>
            </li>
            <li className="flex items-start gap-3 md:gap-4">
              <span className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#edeaff] text-[#7c5cff] flex-shrink-0">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" /></svg>
              </span>
              <div>
                <div className="font-bold text-base md:text-lg text-black mb-1">Cost-Effective HR Outsourcing for SMEs</div>
                <div className="text-gray-500 text-sm md:text-base leading-relaxed">Save up to 60% on HR costs while getting professional expertise. Perfect for startups and growing businesses.</div>
              </div>
            </li>
          </ul>
          <button className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 rounded-full bg-[#7c5cff] text-white font-bold text-base md:text-lg shadow-xl hover:bg-[#5a3fd6] transition-colors duration-200 relative">
            Download Free HR Toolkit
            <span className="ml-2 bg-[#d4ff3f] rounded-full p-1">
              <svg width="16" height="16" fill="none" stroke="#222" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
} 