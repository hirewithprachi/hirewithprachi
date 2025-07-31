import React from 'react';
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
      <div className="pt-12 md:pt-16 pb-6 md:pb-8">
        <div className="max-w-7xl mx-auto px-4">
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
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6">
                Expert virtual HR services for startups and SMEs. Transform your business with professional HR solutions, compliance expertise, and strategic HR planning.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-base md:text-lg font-bold text-white mb-6">Virtual HR Services</h3>
              <ul className="space-y-3 md:space-y-4">
                <li><a href="#" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">HR Consulting</a></li>
                <li><a href="#" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">Remote HR Support</a></li>
                <li><a href="#" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">HR Compliance</a></li>
                <li><a href="#" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">Policy Development</a></li>
                <li><a href="#" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">Startup HR Solutions</a></li>
                <li><a href="#" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">SME HR Services</a></li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h3 className="text-base md:text-lg font-bold text-white mb-6">Company</h3>
              <ul className="space-y-3 md:space-y-4">
                <li><a href="#" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">About Prachi</a></li>
                <li><a href="#" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">HR Services</a></li>
                <li><a href="#" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">Client Success</a></li>
                <li><a href="#" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">HR Resources</a></li>
                <li><a href="#" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">Blog & Insights</a></li>
                <li><a href="#" className="text-sm md:text-base text-neutral-400 hover:text-white transition-colors duration-200">Contact Us</a></li>
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
                    <div className="text-sm md:text-base text-neutral-400">info@hirewithprachi.com</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-primary-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <div className="text-sm md:text-base text-white font-medium">Phone</div>
                    <div className="text-sm md:text-base text-neutral-400">+91 98765 43210</div>
                  </div>
                </div>
              </div>
              
              {/* Subscribe */}
              <div className="mt-6 md:mt-8">
                <h4 className="text-sm md:text-base font-bold text-white mb-3">Get Free HR Resources</h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-white placeholder-neutral-400 focus:border-primary-500 focus:outline-none transition-colors duration-200"
                  />
                  <button className="px-4 py-2 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-lg hover:from-accent-600 hover:to-accent-700 transition-all duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>
                </div>
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
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Privacy Policy</a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Terms of Service</a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 