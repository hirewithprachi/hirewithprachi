import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const footerServices = [
  'Virtual HR Services',
  'HR Consulting',
  'Remote HR Support',
  'HR Compliance',
  'Startup HR Solutions',
  'SME HR Services',
  'Virtual HR Agency',
  'HR Prachi Shrivastava',
  'Policy Development',
  'Employee Engagement',
  'Recruitment Support',
  'HR Strategy',
];

export default function HirableFooter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Simulate API call - replace with actual form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically send to your email service
      console.log('Email submitted:', email);
      
      setIsSubmitted(true);
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
      
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-neutral-900 text-white font-heading overflow-hidden">
      {/* Ticker Bar with Swiper */}
      <div className="bg-gradient-to-r from-accent-300 to-accent-400 py-2 md:py-3 overflow-hidden">
        <div className="container mx-auto px-4">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={40}
            slidesPerView={2}
            loop={true}
            autoplay={{ delay: 0, disableOnInteraction: false }}
            speed={3000}
            breakpoints={{
              480: { slidesPerView: 3, spaceBetween: 50 },
              640: { slidesPerView: 4, spaceBetween: 60 },
              768: { slidesPerView: 5, spaceBetween: 70 },
              1024: { slidesPerView: 6, spaceBetween: 80 },
              1280: { slidesPerView: 7, spaceBetween: 90 },
            }}
            style={{ width: '100%' }}
            aria-label="Footer services ticker"
          >
            {footerServices.concat(footerServices).map((service, i) => (
              <SwiperSlide key={service + i} className="flex justify-center items-center">
                <div className="flex items-center gap-3 px-4 py-0.5">
                  <span className="text-lg md:text-xl flex-shrink-0">💼</span>
                  <span className="text-gray-800 text-xs md:text-sm lg:text-base font-bold leading-tight whitespace-nowrap">
                    {service}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="pt-12 md:pt-16 pb-6 md:pb-8 safe-area-bottom">
        <div className="max-w-7xl mx-auto px-4 mobile-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold text-white">Prachi Shrivastava</div>
                  <div className="text-sm md:text-base text-neutral-400">Virtual HR Consultant</div>
                </div>
              </div>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-4">
                Expert virtual HR services for startups and SMEs. Transform your business with professional HR solutions, compliance expertise, and strategic HR planning.
              </p>
              <div className="flex items-start gap-2 text-sm text-neutral-400 mb-6">
                <svg className="w-4 h-4 text-accent-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>New Delhi, India</span>
              </div>
              <div className="flex gap-4">
                <a href="http://linkedin.com/company/hirewithprachi/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://www.facebook.com/hirewithprachi/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://wa.me/918740889927" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
                </a>
              </div>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-base md:text-lg font-bold text-white mb-6">Virtual HR Services</h3>
              <ul className="space-y-3 md:space-y-4">
                <li><Link to="/services" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">HR Consulting</Link></li>
                <li><Link to="/services" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">Remote HR Support</Link></li>
                <li><Link to="/services" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">HR Compliance</Link></li>
                <li><Link to="/services" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">Policy Development</Link></li>
                <li><Link to="/services" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">Startup HR Solutions</Link></li>
                <li><Link to="/services" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">SME HR Services</Link></li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h3 className="text-base md:text-lg font-bold text-white mb-6">Company</h3>
              <ul className="space-y-3 md:space-y-4">
                <li><Link to="/about" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">About Prachi</Link></li>
                <li><Link to="/services" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">HR Services</Link></li>
                <li><Link to="/about" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">Client Success</Link></li>
                <li><Link to="/resources" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">HR Resources</Link></li>
                <li><Link to="/blog" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">Blog & Insights</Link></li>
                <li><Link to="/contact" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">Contact Us</Link></li>
              </ul>
            </div>
            
            {/* Contact & Subscribe */}
            <div>
              <h3 className="text-base md:text-lg font-bold text-white mb-6">Get In Touch</h3>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-primary-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div className="text-sm md:text-base text-white font-medium">Email</div>
                    <a href="mailto:info@hirewithprachi.com" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">info@hirewithprachi.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-primary-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <div className="text-sm md:text-base text-white font-medium">Phone</div>
                    <a href="tel:+918740889927" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">+91 87408 89927</a>
                  </div>
                </div>
              </div>
              
              {/* Subscribe */}
              <div className="mt-6 md:mt-8">
                <h4 className="text-sm md:text-base font-bold text-white mb-4">Get Free HR Resources</h4>
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="flex-1 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 input-mobile"
                      disabled={isSubmitting}
                    />
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl hover:from-accent-600 hover:to-accent-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm whitespace-nowrap btn-mobile-primary"
                    >
                      {isSubmitting ? (
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {error && (
                    <div className="text-red-400 text-xs">{error}</div>
                  )}
                  {isSubmitted && (
                    <div className="text-green-400 text-xs">Thank you! You'll receive HR resources soon.</div>
                  )}
                </form>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-neutral-800 mt-8 md:mt-12 pt-6 md:pt-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-sm md:text-base text-neutral-400">
                © 2024 Prachi Shrivastava. All rights reserved. Virtual HR Consultant & Agency.
              </div>
              <div className="flex gap-6 text-sm md:text-base">
                <Link to="/privacy-policy" className="text-neutral-400 hover:text-white transition-colors duration-200">Privacy Policy</Link>
                <Link to="/terms-of-service" className="text-neutral-400 hover:text-white transition-colors duration-200">Terms of Service</Link>
                <Link to="/privacy-policy" className="text-neutral-400 hover:text-white transition-colors duration-200">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 