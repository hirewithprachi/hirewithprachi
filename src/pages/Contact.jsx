import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactForm from '../components/ContactForm';
import ContactMap from '../components/ContactMap';
import CalendlyBooking from '../components/CalendlyBooking';
import HireWithPrachiTopBar from '../components/hirable/HirableTopBar';
import HireWithPrachiHeader from '../components/hirable/HirableHeader';
import HireWithPrachiFooter from '../components/hirable/HirableFooter';
import GPT4oMiniChatbot from '../components/GPT4oMiniChatbot';
import FAQSection from '../components/sections/FAQSection';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOOptimizer from '../components/SEOOptimizer';

export default function Contact() {
  // SEO Data for Contact page
  const seoData = {
    title: "Contact Hire With Prachi - HR Consultant | Get Free Consultation",
    description: "Contact Hire With Prachi for expert HR services. Get free consultation for HR compliance, recruitment, and employee engagement solutions.",
    keywords: "contact HR consultant, HR consultation, HR services contact, free HR consultation",
    pageType: "contact",
    pageData: {
      title: "Contact Hire With Prachi",
      description: "Get free HR consultation and expert advice",
      image: "https://hirewithprachi.com/assets/images/contact-1200x630.jpg"
    }
  };

  const [activeTab, setActiveTab] = useState('contact');

  return (
    <>
      {/* Comprehensive SEO Optimization */}
      <SEOOptimizer
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        image={seoData.pageData.image}
        pageType={seoData.pageType}
        pageData={seoData.pageData}
        canonical="https://hirewithprachi.com/contact"
      />

      <style>
        {`
          .glass-effect {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .floating-animation {
            animation: float 6s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .pulse-glow {
            animation: pulse-glow 2s ease-in-out infinite alternate;
          }
          
          @keyframes pulse-glow {
            from { box-shadow: 0 0 20px rgba(102, 126, 234, 0.4); }
            to { box-shadow: 0 0 40px rgba(102, 126, 234, 0.8); }
          }
          
          .animate-bounce-slow {
            animation: bounce 2s infinite;
          }
          
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
              transform: translate3d(0,0,0);
            }
            40%, 43% {
              transform: translate3d(0, -8px, 0);
            }
            70% {
              transform: translate3d(0, -4px, 0);
            }
            90% {
              transform: translate3d(0, -2px, 0);
            }
          }
        `}
      </style>

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-x-hidden">
        <HireWithPrachiTopBar />
        <HireWithPrachiHeader />
        <GPT4oMiniChatbot />
        
        

        {/* Hero Section with Advanced Animations */}
        <section className="relative pt-24 pb-20 overflow-hidden safe-area-top">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full floating-animation"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-indigo-400/15 to-pink-400/15 rounded-full floating-animation" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full floating-animation" style={{animationDelay: '4s'}}></div>
          </div>
          
          <div className="mobile-container mx-auto px-4 relative z-10">
            {/* Breadcrumbs integrated into hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 text-center"
            >
              <Breadcrumbs variant="light" />
            </motion.div>
            
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50 mb-6 hover:bg-blue-500/20 transition-all duration-300">
                  <span className="w-2 h-2 bg-blue-500 rounded-full pulse-glow"></span>
                  <span className="text-sm font-medium text-blue-700">Let's Connect</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold gradient-text mb-6 leading-tight">
                  Get in Touch
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto px-4">
                  Let's build a better workplace together. Reach out for a free consultation 
                  or just say hello! I'm here to help transform your HR operations.
                </p>
              </motion.div>

              {/* Quick Contact Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto"
              >
                <div className="glass-effect rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 card-mobile">
                  <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">24h</div>
                  <div className="text-gray-600 font-medium text-sm md:text-base">Response Time</div>
                  <div className="text-xs md:text-sm text-gray-500 mt-1">Usually faster</div>
                  <div className="text-xs text-green-600 font-semibold mt-2">✓ Urgent: WhatsApp</div>
                </div>
                <div className="glass-effect rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 card-mobile">
                  <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">Free</div>
                  <div className="text-gray-600 font-medium text-sm md:text-base">Initial Consultation</div>
                  <div className="text-xs md:text-sm text-gray-500 mt-1">No obligations</div>
                  <div className="text-xs text-blue-600 font-semibold mt-2">⏱️ 30 minutes</div>
                </div>
                <div className="glass-effect rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 card-mobile sm:col-span-2 md:col-span-1">
                  <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">100+</div>
                  <div className="text-gray-600 font-medium text-sm md:text-base">Happy Clients</div>
                  <div className="text-xs md:text-sm text-gray-500 mt-1">Across India</div>
                  <div className="text-xs text-purple-600 font-semibold mt-2">🌍 Global Services</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="py-8 bg-white/50 backdrop-blur-sm">
          <div className="mobile-container mx-auto px-4">
            <div className="flex justify-center overflow-x-auto">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-gray-200 min-w-max" role="tablist" aria-label="Contact methods">
                <div className="flex gap-1 md:gap-2">
                  {[
                    { id: 'contact', label: 'Contact Form', shortLabel: 'Form', icon: '📧' },
                    { id: 'booking', label: 'Book Consultation', shortLabel: 'Book', icon: '📅' },
                    { id: 'location', label: 'Location', shortLabel: 'Location', icon: '📍' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      id={`${tab.id}-tab`}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 sm:px-4 md:px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 text-sm md:text-base whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      aria-label={`Switch to ${tab.label} tab`}
                      aria-selected={activeTab === tab.id}
                      role="tab"
                    >
                      <span aria-hidden="true">{tab.icon}</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">{tab.shortLabel}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* Left Column - Contact Form */}
                <div className="lg:col-span-2">
                  <AnimatePresence mode="wait">
                    {activeTab === 'contact' && (
                      <motion.div
                        key="contact"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.5 }}
                        className="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl"
                        role="tabpanel"
                        aria-labelledby="contact-tab"
                        id="contact-panel"
                      >
                        <div className="mb-8">
                          <h2 className="text-3xl font-bold gradient-text mb-4 flex items-center gap-3">
                            <span className="text-3xl">📧</span>
                            Send a Message
                          </h2>
                          <p className="text-gray-600 text-lg">
                            We usually reply within a few hours. Let's start a conversation about your HR needs.
                          </p>
                        </div>
                        <ContactForm />
                      </motion.div>
                    )}

                    {activeTab === 'booking' && (
                      <motion.div
                        key="booking"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.5 }}
                        className="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl"
                        role="tabpanel"
                        aria-labelledby="booking-tab"
                        id="booking-panel"
                      >

                        <CalendlyBooking />
                      </motion.div>
                    )}

                    {activeTab === 'location' && (
                      <motion.div
                        key="location"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.5 }}
                        className="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl"
                        role="tabpanel"
                        aria-labelledby="location-tab"
                        id="location-panel"
                      >
                        <div className="mb-8">
                          <h2 className="text-3xl font-bold gradient-text mb-4 flex items-center gap-3">
                            <span className="text-3xl">📍</span>
                            Service Areas
                          </h2>
                          <p className="text-gray-600 text-lg">
                            Serving clients across India and globally with virtual HR services.
                          </p>
                        </div>
                        <ContactMap />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Right Column - Contact Info */}
                <div className="lg:col-span-1">
                  <div className="glass-effect rounded-3xl p-8 shadow-2xl h-fit sticky top-24">
                    <h3 className="text-2xl font-bold gradient-text mb-6 flex items-center gap-3">
                      <span className="text-2xl">💼</span>
                      Contact Information
                    </h3>
                    
                    <div className="space-y-6">
                      {/* Email */}
                      <div className="flex items-start gap-4 p-4 bg-white/50 rounded-2xl hover:bg-white/70 transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white animate-bounce-slow">
                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                          <a href="mailto:info@hirewithprachi.com" className="text-blue-600 hover:text-blue-800 transition-colors">
              info@hirewithprachi.com
                          </a>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-start gap-4 p-4 bg-white/50 rounded-2xl hover:bg-white/70 transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white animate-bounce-slow" style={{animationDelay: '0.5s'}}>
                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                          <a href="tel:+918740889927" className="text-blue-600 hover:text-blue-800 transition-colors">
              +91-87408-89927
                          </a>
                        </div>
                      </div>

                      {/* Hours */}
                      <div className="flex items-start gap-4 p-4 bg-white/50 rounded-2xl hover:bg-white/70 transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white animate-bounce-slow" style={{animationDelay: '1s'}}>
                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
                          <p className="text-gray-600">Mon-Fri: 9am - 6pm IST</p>
                          <p className="text-sm text-gray-500">Weekend consultations available</p>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-start gap-4 p-4 bg-white/50 rounded-2xl hover:bg-white/70 transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white animate-bounce-slow" style={{animationDelay: '1.5s'}}>
                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Service Areas</h4>
                          <p className="text-gray-600">India & Global (Remote)</p>
                          <p className="text-sm text-gray-500">Virtual HR services worldwide</p>
                        </div>
                      </div>



                      {/* Consultation Status */}
                      <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white animate-pulse">
                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Consultation Status</h4>
                          <p className="text-green-600 font-semibold">Available for New Clients</p>
                          <p className="text-sm text-gray-500">Next slot: Today 2:00 PM</p>
                        </div>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-4">Connect With Me</h4>
                      <div className="flex gap-3 justify-center">
                        <a href="https://wa.me/918740889927" target="_blank" rel="noopener noreferrer"
                           className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.205 5.077 4.372.71.306 1.263.489 1.695.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                          </svg>
                        </a>
                        <a href="http://linkedin.com/company/hirewithprachi/" target="_blank" rel="noopener noreferrer"
                           className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                        <a href="https://www.facebook.com/hirewithprachi/" target="_blank" rel="noopener noreferrer"
                           className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </a>
                        <a href="https://www.instagram.com/hirewithprachi/" target="_blank" rel="noopener noreferrer"
                           className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection />

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
                  <div className="absolute top-20 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
                  <div className="absolute bottom-20 left-20 w-12 h-12 border-2 border-white rounded-full"></div>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
                  Ready to Transform Your HR?
                </h2>
                <p className="text-xl mb-8 opacity-90 relative z-10 max-w-2xl mx-auto">
                  Let's discuss how we can help streamline your HR processes, ensure compliance, 
                  and create a better workplace for your team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                                                   <a 
                   href="/contact" 
                   className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                 >
                  Book Free Consultation
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
                  <a 
                    href="https://wa.me/918740889927" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-4 bg-green-500 text-white rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    Chat on WhatsApp
                    <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.205 5.077 4.372.71.306 1.263.489 1.695.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>



        <HireWithPrachiFooter />
      </main>
    </>
  );
} 