import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import ConsultationModal from '../LeadCapturePreview';
import { useState } from 'react';

const features = [
  'Virtual HR Solutions for Startups',
  'Remote HR Support & Consulting',
  'HR Services for SMEs & Growing Businesses',
];

const platforms = [
  { name: 'Upwork', icon: '💼' },
  { name: 'Fiverr', icon: '🎯' },
  { name: 'LinkedIn', icon: '🔗' },
  { name: 'Freelancer', icon: '🚀' },
  { name: 'PeoplePerHour', icon: '⏰' },
  { name: 'FlexJobs', icon: '💪' },
  { name: 'Refrens', icon: '🤝' },
  { name: 'Truelancer', icon: '✅' },
  { name: 'Toptal', icon: '⭐' },
];

export default function HirableHero({ openConsultationModal }) {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[85vh] overflow-hidden w-full px-4 pt-12 pb-0" role="banner" aria-label="Virtual HR Services Hero Section">
      {/* Ultra-Trendy 2025 Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Gradient Mesh */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-600/80 via-primary-700/90 to-primary-800/80"></div>
          
          {/* Floating Orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary-400/30 to-primary-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-primary-500/30 to-accent-400/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-accent-400/20 to-primary-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          
          {/* Geometric Patterns */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white/30 rounded-full"></div>
            <div className="absolute top-40 right-32 w-24 h-24 border-2 border-white/30 rotate-45"></div>
            <div className="absolute bottom-32 left-1/3 w-40 h-40 border-2 border-white/30 rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-28 h-28 border-2 border-white/30 rotate-12"></div>
          </div>
          
          {/* Floating Particles */}
          <div className="absolute top-1/3 left-1/6 w-2 h-2 bg-accent-300 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/3 left-2/3 w-1.5 h-1.5 bg-primary-300 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-accent-400 rounded-full animate-bounce" style={{animationDelay: '3s'}}></div>
        </div>
      </div>

      {/* Decorative geometric shapes */}
      <div className="absolute left-4 md:left-8 top-16 md:top-24 w-6 h-6 md:w-8 md:h-8 rotate-12 z-10">
        <svg width="100%" height="100%" viewBox="0 0 32 32" aria-hidden="true">
          <polygon points="16,0 32,32 0,32" fill="#facc15" />
        </svg>
      </div>
      <div className="absolute right-4 md:right-8 top-20 md:top-32 w-6 h-6 md:w-8 md:h-8 z-10">
        <svg width="100%" height="100%" viewBox="0 0 32 32" aria-hidden="true">
          <rect x="12" y="0" width="8" height="32" fill="#fff"/>
          <rect x="0" y="12" width="32" height="8" fill="#fff"/>
        </svg>
      </div>
      <div className="absolute left-1/4 bottom-16 md:bottom-24 w-4 h-4 md:w-6 md:h-6 z-10">
        <svg width="100%" height="100%" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" fill="none" />
        </svg>
      </div>
      <div className="absolute right-1/4 bottom-8 md:bottom-12 w-6 h-6 md:w-10 md:h-10 z-10">
        <svg width="100%" height="100%" viewBox="0 0 40 40" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#facc15" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center text-center z-20 mt-2 md:mt-4 lg:mt-8 relative px-2 md:px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 md:gap-3 bg-white/20 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full border border-white/30 mb-4 md:mb-6">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-300 rounded-full animate-pulse"></div>
          <span className="text-white text-xs md:text-sm font-bold uppercase tracking-widest">Prachi Shrivastava - Virtual HR Service</span>
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-4 md:mb-6 lg:mb-8 px-2 text-white" style={{lineHeight: '1.1'}}>
          Expert <span className="bg-gradient-to-r from-accent-300 to-accent-400 bg-clip-text text-transparent">Virtual HR Consultant</span><br />
          for Startups & SMEs
        </h1>

        {/* Subheadline */}
        <p className="text-white/90 text-base md:text-lg lg:text-xl xl:text-2xl mb-6 md:mb-8 lg:mb-10 max-w-2xl md:max-w-3xl leading-relaxed font-medium px-2">
          Transform your business with professional HR services. Get remote HR support, compliance expertise, and strategic HR solutions without the overhead of an in-house team.
        </p>

        {/* Features List */}
        <ul className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8 lg:mb-10 px-2 md:px-4" role="list" aria-label="Key HR Services">
          {features.map((feature, i) => (
            <li key={feature} className="flex items-center gap-2 md:gap-3 text-sm md:text-base lg:text-lg xl:text-xl text-white font-medium bg-white/10 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/20">
              <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-accent-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
              <span className="text-xs md:text-sm lg:text-base xl:text-lg">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Section */}
        <div className="relative flex flex-col items-center mb-6 md:mb-8 lg:mb-10">
          <button
            type="button"
            className="group relative inline-flex items-center px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 rounded-xl md:rounded-2xl bg-gradient-to-r from-accent-400 to-accent-500 text-gray-900 font-bold text-sm md:text-lg lg:text-xl shadow-xl md:shadow-2xl hover:shadow-glow-accent transition-all duration-300 overflow-hidden"
            aria-label="Book Free HR Consultation"
            onClick={openConsultationModal}
          >
            {/* Button Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            
            <span className="relative z-10 flex items-center gap-2 md:gap-3">
              <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 7V3a4 4 0 118 0v4m-4 6v6m-4-6h8" />
              </svg>
              <span className="text-xs md:text-sm lg:text-base xl:text-lg">Book Free HR Consultation</span>
              <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
          
          <p className="text-white/80 text-xs md:text-sm lg:text-base mt-3 md:mt-4 text-center px-2">
            <span className="inline-flex items-center gap-1 md:gap-2">
              <svg className="w-3 h-3 md:w-4 md:h-4 text-accent-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
              <span className="text-xs md:text-sm">No commitment</span>
            </span>
            <span className="mx-1 md:mx-2">•</span>
            <span className="inline-flex items-center gap-1 md:gap-2">
              <svg className="w-3 h-3 md:w-4 md:h-4 text-accent-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
              <span className="text-xs md:text-sm">30-minute session</span>
            </span>
            <span className="mx-1 md:mx-2">•</span>
            <span className="inline-flex items-center gap-1 md:gap-2">
              <svg className="w-3 h-3 md:w-4 md:h-4 text-accent-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
              <span className="text-xs md:text-sm">Expert advice</span>
            </span>
          </p>

          {/* Animated Arrow */}
          <div className="absolute -bottom-6 md:-bottom-8 lg:-bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-12 h-6 md:w-16 md:h-8 lg:w-20 lg:h-10" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M10 30 Q40 10 70 30" stroke="#facc15" strokeWidth="3" fill="none" />
              <path d="M70 30 l-6 -4 m6 4 l-6 4" stroke="#facc15" strokeWidth="3" fill="none" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative w-full flex justify-center z-20" style={{marginTop: '0.5rem', marginBottom: '-2rem'}}>
        <img
          src="/Hirable – Human Resources & Recruiting WordPress Theme_files/hero-image.png"
          alt="Virtual HR Consultant Prachi Shrivastava - Professional HR Services for Startups and SMEs"
          className="w-full max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-3xl rounded-xl md:rounded-2xl lg:rounded-3xl shadow-xl md:shadow-2xl border-2 md:border-4 border-white/20 backdrop-blur-sm object-cover"
          style={{objectPosition: 'center bottom'}}
          loading="lazy"
          width="800"
          height="600"
          decoding="async"
          fetchpriority="high"
        />
      </div>

      {/* Enhanced Platform Bar with Proper Spacing and Yellow Color */}
      <div className="absolute left-0 right-0 w-screen bg-gradient-to-r from-accent-300 to-accent-400 py-1.5 md:py-2 lg:py-3 mt-8 md:mt-12 lg:mt-16 z-30 border-t-2 border-accent-500 shadow-xl md:shadow-2xl" style={{marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)', bottom: 0}}>
        <div className="container mx-auto px-2 md:px-4">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={2}
            loop={true}
            autoplay={{ delay: 0, disableOnInteraction: false }}
            speed={3000}
            breakpoints={{
              480: { slidesPerView: 3, spaceBetween: 40 },
              640: { slidesPerView: 4, spaceBetween: 50 },
              768: { slidesPerView: 5, spaceBetween: 60 },
              1024: { slidesPerView: 6, spaceBetween: 70 },
              1280: { slidesPerView: 7, spaceBetween: 80 },
            }}
            style={{ width: '100%' }}
            aria-label="Freelance platforms where our services are available"
          >
            {platforms.concat(platforms).map((platform, i) => (
              <SwiperSlide key={platform.name + i} className="flex justify-center items-center">
                <div className="flex items-center gap-2 md:gap-3 px-2 md:px-4 py-0.5">
                  <span className="text-sm md:text-lg lg:text-xl flex-shrink-0">
                    {platform.icon}
                  </span>
                  <span className="text-gray-800 text-xs md:text-sm lg:text-base font-bold leading-tight whitespace-nowrap">
                    {platform.name}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
} 