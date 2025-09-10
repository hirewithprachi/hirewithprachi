import React, { useState, useEffect } from 'react';
import ResponsiveImage from './ui/ResponsiveImage';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';

export default function ServicesSection({ showAll = false, filteredServices = null }) {
  const [hoveredService, setHoveredService] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageErrors, setImageErrors] = useState(new Set());

  // Use filtered services if provided, otherwise show all services if showAll is true, or only 4 featured services for homepage
  const featuredServices = filteredServices || (showAll ? servicesData.services : servicesData.services.slice(0, 4));

  // Handle image loading errors
  const handleImageError = (serviceId) => {
    setImageErrors(prev => new Set(prev).add(serviceId));
  };

  // Check if image should show fallback
  const shouldShowFallback = (serviceId) => {
    return imageErrors.has(serviceId);
  };

  // Force animation to trigger on mount
  useEffect(() => {
    // This ensures the component is fully mounted before animations start
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Show loading state while preparing
  if (!isLoaded) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading services...</p>
          </div>
        </div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-blue-500/30 backdrop-blur-sm mb-4 sm:mb-6">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-blue-700 text-xs sm:text-sm font-bold uppercase tracking-widest">Comprehensive HR Solutions</span>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Professional <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">HR & Human Rights Services</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Comprehensive HR consulting and human rights services designed for modern businesses, educational institutions, and organizations committed to workplace excellence and social responsibility.
          </p>
        </motion.div>

        {/* Services Grid - Show only 4 services */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12"
          role="grid"
          aria-label="Featured HR Services"
        >
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              onHoverStart={() => setHoveredService(service.id)}
              onHoverEnd={() => setHoveredService(null)}
              className="group"
              role="gridcell"
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-white/20 h-full flex flex-col overflow-hidden transition-all duration-500 hover:shadow-lg sm:hover:shadow-xl hover:-translate-y-1 hover:border-blue-200/50 relative">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Service Image */}
                <div className="h-32 sm:h-36 w-full overflow-hidden relative">
                  {!shouldShowFallback(service.id) ? (
                    <ResponsiveImage 
                      src={service.imageUrl} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      onError={() => handleImageError(service.id)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl sm:text-4xl">
                      {service.icon}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                    <span className="px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700">
                      {servicesData.categories.find(cat => cat.id === service.category)?.name}
                    </span>
                  </div>
                </div>

                {/* Service Icon */}
                <div className="flex items-center justify-center -mt-4 sm:-mt-6 mb-2 sm:mb-3 relative z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg sm:text-xl text-white shadow-md border-2 sm:border-3 border-white group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                </div>

                {/* Service Content */}
                <div className="flex-1 flex flex-col px-3 sm:px-4 pb-3 sm:pb-4 pt-1 relative z-10">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2 text-center group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 text-center leading-relaxed">
                    {service.description}
                  </p>

                  {/* Benefits */}
                  <div className="mb-3 sm:mb-4">
                    <h4 className="text-xs font-semibold text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-1.5">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                      Key Benefits
                    </h4>
                    <ul className="space-y-1 sm:space-y-1.5">
                      {service.benefits.slice(0, 2).map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-xs text-gray-600">
                          <span className="text-blue-500 text-xs mt-0.5">✓</span>
                          <span className="line-clamp-1">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Features */}
                  <div className="mb-3 sm:mb-4">
                    <h4 className="text-xs font-semibold text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-1.5">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
                      What's Included
                    </h4>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {service.features.slice(0, 2).map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 sm:px-2 py-0.5 bg-gradient-to-r from-blue-50 to-purple-50 text-xs font-medium text-gray-700 rounded-full border border-blue-100"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="mt-auto">
                    <Link to={`/services/${service.id}`} className="block">
                      <button className="w-full py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-1.5 group-hover:scale-105">
                        <span>Learn More</span>
                        <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                {hoveredService === service.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl sm:rounded-2xl"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Services Button - Only show when not showing all services */}
        {!showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <Link to="/services" className="inline-flex items-center px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 group">
              <span>View All Services</span>
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        )}


      </div>
    </section>
  );
}