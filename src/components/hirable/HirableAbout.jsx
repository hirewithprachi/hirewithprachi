import React, { useState } from 'react';

export default function HirableAbout() {
  const [showToolkitModal, setShowToolkitModal] = useState(false);
  const [toolkitForm, setToolkitForm] = useState({ name: '', email: '', phone: '', businessType: '', intendedUse: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleToolkitChange = e => setToolkitForm({ ...toolkitForm, [e.target.name]: e.target.value });
  
  const handleToolkitSubmit = e => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setShowToolkitModal(false);
        setSubmitted(false);
        // Redirect to Google Drive ZIP
        window.location.href = 'https://drive.google.com/drive/folders/1q-GrYuR2rUOubK7UJu4NFAuJsbQaKeRO?usp=sharing'; // Updated HR Toolkit link
      }, 1500);
    }, 1000);
  };

  return (
    <>
      <section className="relative py-16 md:py-20 font-heading bg-white overflow-visible">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20 px-4">
          {/* Left: Images Grid */}
          <div className="flex flex-col gap-4 md:gap-6 items-center md:items-start w-full md:w-1/2">
            <div className="flex flex-row gap-4 md:gap-6 items-center">
              <img src="/assets/images/about-img-1.jpg" alt="HR Consultant Badge" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-contain border-6 md:border-8 border-[#d4ff3f] bg-[#d4ff3f]" loading="lazy" />
<img src="/assets/images/about-img-2.jpg" alt="Virtual HR Services" className="w-44 h-56 md:w-56 md:h-72 rounded-2xl md:rounded-3xl object-cover shadow-xl" loading="lazy" />
            </div>
            <div className="flex flex-row gap-4 md:gap-6 mt-2">
              <img src="/assets/images/about-img-3.jpg" alt="Remote HR Support" className="w-32 h-24 md:w-40 md:h-32 rounded-xl md:rounded-2xl object-cover shadow-lg" loading="lazy" />
<img src="/assets/images/about-img-1.jpg" alt="HR Consulting" className="w-32 h-24 md:w-40 md:h-32 rounded-xl md:rounded-2xl object-cover shadow-lg" loading="lazy" />
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
            <button 
              onClick={() => setShowToolkitModal(true)}
              className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 rounded-full bg-[#7c5cff] text-white font-bold text-base md:text-lg shadow-xl hover:bg-[#5a3fd6] transition-colors duration-200 relative"
            >
              Download Free HR Toolkit
              <span className="ml-2 bg-[#d4ff3f] rounded-full p-1">
                <svg width="16" height="16" fill="none" stroke="#222" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* HR Toolkit Download Modal */}
      {showToolkitModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full flex flex-col gap-4 relative">
            <button
              type="button"
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setShowToolkitModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            
            {!submitted ? (
              <form onSubmit={handleToolkitSubmit}>
                <h2 className="text-2xl font-bold mb-2 text-center">Download Free HR Toolkit</h2>
                <p className="mb-4 text-gray-700 text-center">Fill in your details to access the comprehensive HR toolkit ZIP.</p>
                
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={toolkitForm.name}
                  onChange={handleToolkitChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7c5cff] focus:border-transparent mb-3"
                />
                
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  value={toolkitForm.email}
                  onChange={handleToolkitChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7c5cff] focus:border-transparent mb-3"
                />
                
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Mobile Number *"
                  value={toolkitForm.phone}
                  onChange={handleToolkitChange}
                  required
                  pattern="[0-9]{10,12}"
                  title="Please enter a valid 10-12 digit mobile number"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7c5cff] focus:border-transparent mb-3"
                />
                
                <input
                  type="text"
                  name="businessType"
                  placeholder="Business Type (e.g., Startup, SME, Corporate) *"
                  value={toolkitForm.businessType}
                  onChange={handleToolkitChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7c5cff] focus:border-transparent mb-3"
                />
                
                <textarea
                  name="intendedUse"
                  placeholder="How do you plan to use this toolkit? *"
                  value={toolkitForm.intendedUse}
                  onChange={handleToolkitChange}
                  required
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7c5cff] focus:border-transparent mb-6"
                />
                
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#7c5cff] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#5a3fd6] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Processing...' : 'Download Toolkit'}
                </button>
              </form>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-4">Your download will start automatically...</p>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7c5cff] mx-auto"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
} 