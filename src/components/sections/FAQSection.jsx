import React, { useState } from 'react';
import { motion } from 'framer-motion';

const faqs = [
  {
    q: 'What is virtual HR consulting and how does it work?',
    a: 'Virtual HR consulting provides professional HR services remotely through video calls, email, and online tools. I handle recruitment, compliance, policy development, and strategic HR planning, saving you up to 60% on HR costs while providing expert guidance tailored to your business needs.'
  },
  {
    q: 'How much do virtual HR services cost compared to hiring a full-time HR manager?',
    a: 'Virtual HR services start at ₹25,000-50,000 per month, saving you 60-70% compared to hiring a full-time HR manager (₹8-15 lakhs annually). This includes all HR functions without the overhead costs of employee benefits, training, or turnover.'
  },
  {
    q: 'What comprehensive HR services do you provide for startups and SMEs?',
    a: 'I provide end-to-end HR solutions including recruitment & talent acquisition, HR policy development, compliance management, employee handbook creation, performance management systems, payroll guidance, employee engagement strategies, and strategic HR planning tailored to your business growth.'
  },
  {
    q: 'How do you ensure HR compliance with Indian labor laws?',
    a: 'I stay updated with all Indian labor laws including the Industrial Disputes Act, Factories Act, Shops & Establishments Act, POSH Act, and statutory requirements. I conduct compliance audits, develop compliant policies, and ensure your business meets all obligations including PF, ESI, and workplace safety standards.'
  },
  {
    q: 'Can you help with remote team management and virtual workplace policies?',
    a: 'Yes! I specialize in remote HR support, virtual workplace policies, digital onboarding processes, virtual performance management systems, and tools for maintaining team engagement in remote environments. I help you build a strong remote work culture.'
  },
  {
    q: 'What makes your virtual HR services different from traditional HR agencies?',
    a: 'I provide personalized, one-on-one attention as a freelance HR consultant with 8+ years of experience. My services are flexible, cost-effective, and specifically designed for startups and SMEs. You get direct access to an experienced HR professional without the overhead of a large agency.'
  },
  {
    q: 'How quickly can you implement HR processes and policies?',
    a: 'I can implement basic HR processes within 2-4 weeks, including policy development, compliance setup, and recruitment systems. For comprehensive HR transformation, the timeline is 6-8 weeks depending on your business size and complexity.'
  },
  {
    q: 'Do you provide ongoing HR support or just one-time consulting?',
    a: 'I offer both ongoing HR support and one-time consulting. Many clients prefer ongoing monthly support for continuous HR management, while others need specific projects like policy development or compliance audits. I\'m flexible to meet your needs.'
  },
  {
    q: 'How do you handle recruitment and talent acquisition virtually?',
    a: 'I use modern recruitment tools and platforms to source, screen, and interview candidates. This includes job posting optimization, candidate screening, virtual interviews, reference checks, and onboarding support. I can reduce your time-to-hire by 40-50%.'
  },
  {
    q: 'What HR technology and tools do you recommend for small businesses?',
    a: 'I recommend cost-effective HR tools based on your business size and needs. This includes HRIS systems, recruitment platforms, performance management tools, and compliance tracking software. I help you choose and implement the right technology stack.'
  },
  {
    q: 'How do you ensure data security and confidentiality in virtual HR services?',
    a: 'I maintain strict confidentiality agreements and use secure communication channels. All client data is protected under professional HR consultant ethics. I use encrypted platforms for document sharing and maintain secure records as per data protection regulations.'
  },
  {
    q: 'Can you help with employee engagement and culture building?',
    a: 'Absolutely! I develop employee engagement strategies, conduct pulse surveys, design recognition programs, and help build a positive workplace culture. This includes remote team engagement activities, communication strategies, and performance recognition systems.'
  },
  {
    q: 'What industries and business sizes do you typically work with?',
    a: 'I work with startups, SMEs, and growing companies across various industries including technology, healthcare, education, manufacturing, and services. My services are scalable from 5-500 employees, with customized solutions for each business stage.'
  },
  {
    q: 'How do you measure the success and ROI of your HR services?',
    a: 'I establish clear KPIs including reduced hiring time, improved employee retention, compliance audit scores, and cost savings. I provide regular reports and analytics to track progress and demonstrate the value of our HR partnership.'
  },
  {
    q: 'What is your approach to handling HR crises or employee relations issues?',
    a: 'I provide immediate crisis management support for HR emergencies, employee conflicts, or compliance issues. This includes investigation support, policy guidance, legal compliance advice, and communication strategies to resolve issues professionally.'
  }
];

export default function FAQSection({ customFaqs = null, title = "Frequently Asked Questions", subtitle = "Everything you need to know about our virtual HR consulting services" }) {
  const [open, setOpen] = useState(null);
  const [showAll, setShowAll] = useState(false);
  
  // Use custom FAQs if provided, otherwise use default FAQs
  const faqData = customFaqs || faqs;
  
  // Show only 6 questions initially, then all when "View All" is clicked
  const displayedFaqs = showAll ? faqData : faqData.slice(0, 6);
  
  // Schema markup for FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <>
      {/* Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      
              <section className="py-24 font-heading bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/40 relative overflow-hidden">
          {/* Elegant Background Elements */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-l from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto max-w-7xl px-4 relative z-10">
            {/* Enhanced Header */}
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 shadow-lg mb-8">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 text-sm font-semibold uppercase tracking-widest">FAQ</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                {title.split(' ').map((word, index) => 
                  index === title.split(' ').length - 1 ? 
                    <span key={index} className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">{word}</span> : 
                    <span key={index}>{word} </span>
                )}
              </h2>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            </motion.div>
            
            {/* Enhanced 2-Column Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {displayedFaqs.map((faq, i) => (
                <motion.div 
                  key={i} 
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  {/* Enhanced Glassmorphism Card */}
                  <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/40 overflow-hidden hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 relative">
                    {/* Gradient Border Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                    
                    <button
                      className="w-full flex justify-between items-start px-10 py-8 text-left hover:bg-gradient-to-r hover:from-blue-50/60 hover:to-purple-50/60 transition-all duration-300 group relative"
                      onClick={() => setOpen(open === i ? null : i)}
                    >
                      <span className="text-xl font-bold text-gray-900 pr-6 leading-relaxed group-hover:text-blue-600 transition-colors duration-300">
                        {faq.q}
                      </span>
                      <span className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:rotate-3">
                        {open === i ? '−' : '+'}
                      </span>
                    </button>
                    
                    {open === i && (
                      <motion.div 
                        className="px-10 pb-8 text-gray-700 leading-relaxed"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="border-t border-gradient-to-r from-blue-200 to-purple-200 pt-6">
                          <p className="text-lg leading-relaxed">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Enhanced View All Button */}
            {!showAll && faqData.length > 6 && (
              <motion.div 
                className="text-center mb-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <button
                  onClick={() => setShowAll(true)}
                  className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-12 py-5 rounded-full font-bold text-lg hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 group"
                >
                  <span>View All Questions</span>
                  <svg 
                    className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </motion.div>
            )}
            
            {/* Show Less Button */}
            {showAll && (
              <motion.div 
                className="text-center mb-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <button
                  onClick={() => setShowAll(false)}
                  className="inline-flex items-center gap-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-12 py-5 rounded-full font-bold text-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 group"
                >
                  <span>Show Less</span>
                  <svg 
                    className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-2 rotate-180" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </motion.div>
            )}
            
            {/* Enhanced CTA Section */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 border border-white/20 shadow-2xl relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-black/5"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                      Still have questions?
                    </h3>
                  </div>
                  
                  <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                    Get personalized answers to your specific HR challenges. Book a free consultation call with Prachi.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <a 
                      href="/contact" 
                      className="inline-flex items-center gap-3 bg-white text-gray-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 group"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Contact Us
                    </a>
                    <a 
                      href="tel:+918740889927" 
                      className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-xl hover:shadow-2xl transform hover:scale-105 group"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call +91 87408 89927
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
    </>
  );
}