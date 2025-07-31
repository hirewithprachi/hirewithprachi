import React, { useState } from 'react';

const faqs = [
  {
    question: "What is virtual HR consulting?",
    answer: "Virtual HR consulting provides professional HR services remotely through video calls, email, and online tools. I handle recruitment, compliance, policy development, and strategic HR planning, saving you up to 60% on HR costs.",
    icon: "🎯",
    category: "Services"
  },
  {
    question: "How much do virtual HR services cost?",
    answer: "Virtual HR services start at ₹25,000-50,000 per month, saving you 60-70% compared to hiring a full-time HR manager (₹8-15 lakhs annually).",
    icon: "💰",
    category: "Pricing"
  },
  {
    question: "What services do you provide?",
    answer: "Recruitment, HR policy development, compliance management, employee handbook creation, performance management, payroll guidance, and strategic HR planning tailored to your business.",
    icon: "🛠️",
    category: "Services"
  },
  {
    question: "How do you ensure HR compliance?",
    answer: "I stay updated with all Indian labor laws, conduct compliance audits, develop compliant policies, and ensure your business meets all statutory obligations including PF, ESI, and workplace safety.",
    icon: "⚖️",
    category: "Compliance"
  },
  {
    question: "Can you help with remote team management?",
    answer: "Yes! I specialize in remote HR support, virtual workplace policies, digital onboarding, virtual performance management, and tools for maintaining team engagement in remote environments.",
    icon: "🌐",
    category: "Remote Work"
  },
  {
    question: "What makes your services different?",
    answer: "I provide personalized, one-on-one attention as a freelance HR consultant with 8+ years of experience. My services are flexible, cost-effective, and specifically designed for startups and SMEs.",
    icon: "⭐",
    category: "Why Choose Us"
  }
];

export default function HirableFAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Services', 'Pricing', 'Compliance', 'Remote Work', 'Why Choose Us'];
  const filteredFaqs = activeCategory === 'All' ? faqs : faqs.filter(faq => faq.category === activeCategory);

  return (
    <section className="relative py-20 md:py-32 font-heading overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 shadow-lg mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700 text-sm font-semibold uppercase tracking-widest">Frequently Asked Questions</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Got <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Questions?</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about our virtual HR consulting services
          </p>
              </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-white/20 shadow-sm hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {filteredFaqs.map((faq, index) => (
            <div 
              key={index} 
              className="group relative"
            >
              {/* Glassmorphism Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <button
                  className="relative w-full px-8 py-6 text-left flex items-start justify-between hover:bg-white/50 transition-all duration-300"
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-2xl mt-1">{faq.icon}</div>
                    <div className="flex-1">
                      <span className="font-bold text-gray-900 text-lg leading-tight block">
                        {faq.question}
                  </span>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 ml-4">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center transition-all duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}>
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-8 pb-6 border-t border-white/20 bg-gradient-to-br from-white/50 to-white/30">
                    <div className="pt-4">
                      <p className="text-gray-700 leading-relaxed text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              </div>
            ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="relative">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">Still have questions?</h3>
              </div>
              
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Can't find what you're looking for? Let's have a conversation and get you the answers you need.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl group"
                >
                  Schedule a meeting
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/919205769797"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm group"
                >
                  Chat with Prachi
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 