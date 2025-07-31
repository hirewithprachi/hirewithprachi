import React, { useState, useEffect } from 'react';
import ConsultationModal from '../LeadCapturePreview';

const services = [
  {
    title: 'Virtual HR Consulting',
    desc: 'Expert HR guidance for startups and SMEs. Get strategic HR advice, policy development, and compliance support remotely.',
    icon: '🎯',
    image: '/Hirable – Human Resources & Recruiting WordPress Theme_files/about-img-1.jpg',
    features: ['Strategic HR Planning', 'Policy Development', 'Compliance Support', 'Remote Implementation'],
    color: 'from-blue-500 to-cyan-500',
    delay: 0
  },
  {
    title: 'Remote HR Support',
    desc: 'Complete HR outsourcing for growing businesses. Handle recruitment, employee relations, and HR administration remotely.',
    icon: '🌐',
    image: '/Hirable – Human Resources & Recruiting WordPress Theme_files/about-img-2.jpg',
    features: ['Recruitment & Hiring', 'Employee Relations', 'HR Administration', 'Performance Management'],
    color: 'from-purple-500 to-pink-500',
    delay: 100
  },
  {
    title: 'HR Compliance & Policies',
    desc: 'Ensure your business meets all HR regulations. Get expert compliance guidance, policy development, and audit support.',
    icon: '⚖️',
    image: '/Hirable – Human Resources & Recruiting WordPress Theme_files/about-img-3.jpg',
    features: ['Legal Compliance', 'Policy Development', 'Audit Support', 'Risk Management'],
    color: 'from-emerald-500 to-teal-500',
    delay: 200,
    featured: true
  },
  {
    title: 'Startup HR Solutions',
    desc: 'Tailored HR services for startups and small businesses. Build strong HR foundations from day one with expert guidance.',
    icon: '🚀',
    image: '/Hirable – Human Resources & Recruiting WordPress Theme_files/hero-image.png',
    features: ['HR Foundation', 'Growth Strategy', 'Team Building', 'Scalable Solutions'],
    color: 'from-orange-500 to-red-500',
    delay: 300
  },
  {
    title: 'Employee Engagement',
    desc: 'Boost team morale and productivity with our employee engagement strategies and performance management solutions.',
    icon: '💪',
    image: '/Hirable – Human Resources & Recruiting WordPress Theme_files/benefit-img-1.jpg',
    features: ['Team Building', 'Performance Reviews', 'Employee Recognition', 'Culture Development'],
    color: 'from-indigo-500 to-purple-500',
    delay: 400
  },
];

export default function HirableServices({ openConsultationModal }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('.services-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="services-section relative py-20 md:py-32 font-heading overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-l from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 shadow-lg mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700 text-sm font-semibold uppercase tracking-widest">Virtual HR Services</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Complete <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Virtual HR Solutions</span> for your business
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your HR operations with our comprehensive virtual services designed for modern businesses
          </p>
        </div>

        {/* Featured Service - Enhanced */}
        <div className={`mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {services.filter(service => service.featured).map((service, index) => (
            <div key={service.title} className="group relative">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  
                  {/* Enhanced Image Section */}
                  <div className="lg:col-span-1 relative overflow-hidden h-64 lg:h-full">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Enhanced Floating Elements */}
                    <div className={`absolute top-6 left-6 w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-xl shadow-xl backdrop-blur-sm`}>
                      {service.icon}
                    </div>
                    
                    <div className="absolute top-6 right-6">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        ⭐ Most Popular
            </span>
                    </div>
                    
                    {/* Price Badge */}
                    {/* <div className="absolute bottom-6 left-6">
                      <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
                        <div className="text-2xl font-bold text-gray-900">₹25,000</div>
                        <div className="text-xs text-gray-500">per month</div>
                      </div>
                    </div> */}
                  </div>
                  
                  {/* Enhanced Content Section */}
                  <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-center">
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                          {service.title}
                        </h3>
                        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed text-lg mb-6">
                        {service.desc}
                      </p>
                    </div>
                    
                    {/* Enhanced Features Grid */}
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">What's Included:</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`}></div>
                            <span className="text-sm text-gray-700 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Enhanced CTA Section */}
                    <div className="flex items-center justify-between">
                      <a 
                        href="/services/hr-compliance" 
                        className={`inline-flex items-center px-8 py-4 bg-gradient-to-r ${service.color} text-white font-bold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 group`}
                        onClick={openConsultationModal}
                      >
                        Get Started Now
                        <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                      
                      <div className="text-right">
                        <div className="text-sm text-gray-500 mb-1">Free consultation included</div>
                        <div className="text-sm font-semibold text-green-600">✓ No setup fees</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Services Grid - Now 4 columns */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {services.filter(service => !service.featured).map((service, index) => (
            <div
              key={service.title}
              className="group relative transition-all duration-500"
              style={{ animationDelay: `${service.delay}ms` }}
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full">
                
                {/* Compact Image Section */}
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  
                  {/* Compact Floating Icon */}
                  <div className={`absolute top-3 left-3 w-10 h-10 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center text-sm shadow-lg backdrop-blur-sm`}>
                    {service.icon}
                  </div>
                </div>
                
                {/* Compact Content Section */}
                <div className="p-4">
                  <h3 className="text-base font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-3">
                    {service.desc}
                  </p>
                  
                  {/* Compact Features List */}
                  <div className="mb-4">
                    <div className="grid grid-cols-1 gap-1">
                      {service.features.slice(0, 2).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${service.color}`}></div>
                          <span className="text-xs text-gray-600 font-medium line-clamp-1">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Trendy CTA Button */}
                  <div className="relative group">
                    <a 
                      href="/services" 
                      className={`relative inline-flex items-center px-4 py-2.5 bg-gradient-to-r ${service.color} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 group overflow-hidden text-xs`}
                      onClick={openConsultationModal}
                    >
                      {/* Button Background Animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Button Content */}
                      <span className="relative z-10 flex items-center">
                        Explore Service
                        <svg className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                      
                      {/* Shine Effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative overflow-hidden">
            {/* Background with Multiple Layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl"></div>
            
            {/* Floating Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12 animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
            
            {/* Main Content */}
            <div className="relative z-10 p-8 md:p-12 text-white">
              <div className="max-w-4xl mx-auto">
                {/* Header with Icon */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-2">Ready to Transform Your HR?</h3>
                    <p className="text-lg opacity-90">Join 150+ businesses that trust our virtual HR solutions</p>
                  </div>
                </div>
                
                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  {[
                    { icon: "💰", title: "Save 60% Costs", desc: "Compared to in-house HR" },
                    { icon: "⚡", title: "Instant Setup", desc: "Get started in 24 hours" },
                    { icon: "🛡️", title: "100% Compliant", desc: "Stay updated with laws" }
                  ].map((benefit, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                      <div className="text-3xl mb-3">{benefit.icon}</div>
                      <h4 className="text-lg font-bold mb-2">{benefit.title}</h4>
                      <p className="text-sm opacity-80">{benefit.desc}</p>
                    </div>
                  ))}
                </div>
                
                {/* Enhanced CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    className="group relative inline-flex items-center px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden"
                    onClick={openConsultationModal}
                  >
                    {/* Button Shine Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-gray-100 to-transparent"></div>
                    
                    <span className="relative z-10 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Book Free Consultation
                      <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                  
                  <button
                    className="group relative inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm overflow-hidden"
                    onClick={() => window.location.href = '/services'}
                  >
                    {/* Button Shine Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                    
                    <span className="relative z-10 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                      View All Services
                      <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                </div>
                
                {/* Trust Indicators */}
                <div className="mt-8 pt-8 border-t border-white/20">
                  <div className="flex flex-wrap justify-center items-center gap-6 text-sm opacity-80">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <span>No setup fees</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Free consultation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Cancel anytime</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 