import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import HireWithPrachiTopBar from '../components/hirable/HirableTopBar';
import HireWithPrachiHeader from '../components/hirable/HirableHeader';
import HireWithPrachiFooter from '../components/hirable/HirableFooter';
import AIChatbotWidget from '../components/AIChatbotWidget';
import FreeTools from '../components/FreeTools';
import ScrollProgressBar from '../components/ScrollProgressBar';
import Breadcrumbs from '../components/Breadcrumbs';
import ServicesSection from '../components/ServicesSection';
import { servicesData } from '../data/servicesData';

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Use static data directly - no loading states needed
  const services = servicesData.services;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { id: 'all', name: 'All Services', icon: '🌟' },
    { id: 'compliance', name: 'Compliance', icon: '⚖️' },
    { id: 'talent', name: 'Talent', icon: '🎯' },
    { id: 'culture', icon: '❤️', name: 'Culture' },
    { id: 'performance', name: 'Performance', icon: '📊' },
    { id: 'technology', name: 'Technology', icon: '🤖' },
    { id: 'startup', name: 'Startup', icon: '🚀' }
  ];

  // Remove category filtering if category is missing
  const filteredServices = services; // Show all services

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Virtual HR Services & Solutions | Professional HR Consulting for Startups & SMEs</title>
        <meta name="title" content="Virtual HR Services & Solutions | Professional HR Consulting for Startups & SMEs" />
        <meta name="description" content="Expert virtual HR services including compliance management, strategic recruitment, employee engagement, performance management, and HR technology solutions. Transform your HR operations with professional consulting." />
        <meta name="keywords" content="virtual HR services, HR consulting, HR compliance services, recruitment solutions, employee engagement, performance management, HR technology, startup HR services, SME HR solutions, remote HR support, HR outsourcing, HR audit, HR policy development" />
        <meta name="author" content="Prachi Shrivastava" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hirewithprachi.com/services" />
        <meta property="og:title" content="Virtual HR Services & Solutions | Professional HR Consulting for Startups & SMEs" />
        <meta property="og:description" content="Expert virtual HR services including compliance management, strategic recruitment, employee engagement, performance management, and HR technology solutions." />
        <meta property="og:image" content="https://hirewithprachi.com/services-og-image.png" />
        <meta property="og:site_name" content="Hire With Prachi" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://hirewithprachi.com/services" />
        <meta property="twitter:title" content="Virtual HR Services & Solutions | Professional HR Consulting for Startups & SMEs" />
        <meta property="twitter:description" content="Expert virtual HR services including compliance management, strategic recruitment, employee engagement, performance management, and HR technology solutions." />
        <meta property="twitter:image" content="https://hirewithprachi.com/services-twitter-image.png" />
        <meta property="twitter:creator" content="@prachi_hr" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Hire With Prachi Services" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://hirewithprachi.com/services" />
        
        {/* Structured Data for Services */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Virtual HR Services",
            "description": "Comprehensive virtual HR services including compliance management, strategic recruitment, employee engagement, performance management, and HR technology solutions.",
            "provider": {
              "@type": "ProfessionalService",
              "name": "Hire With Prachi",
              "founder": {
                "@type": "Person",
                "name": "Prachi Shrivastava",
                "jobTitle": "Virtual HR Consultant"
              }
            },
            "serviceType": [
              "HR Compliance Services",
              "Strategic Recruitment",
              "Employee Engagement",
              "Performance Management",
              "HR Technology Solutions",
              "Startup HR Foundation"
            ],
            "areaServed": ["India", "United States", "United Kingdom", "Canada", "Australia"],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Virtual HR Services Catalog",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "HR Compliance & Legal Services",
                    "description": "Comprehensive compliance management to keep your business legally protected"
                  },
                  "price": "₹25,000/month",
                  "priceCurrency": "INR"
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Strategic Recruitment & Hiring",
                    "description": "End-to-end recruitment solutions to build your dream team"
                  },
                  "price": "₹15,000/hire",
                  "priceCurrency": "INR"
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Employee Engagement & Culture",
                    "description": "Build a thriving workplace culture that retains top talent"
                  },
                  "price": "₹20,000/month",
                  "priceCurrency": "INR"
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Performance Management Systems",
                    "description": "Data-driven performance frameworks to maximize productivity"
                  },
                  "price": "₹30,000/setup",
                  "priceCurrency": "INR"
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "HR Technology & Automation",
                    "description": "Streamline HR processes with cutting-edge technology solutions"
                  },
                  "price": "₹50,000/setup",
                  "priceCurrency": "INR"
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Startup HR Foundation",
                    "description": "Complete HR setup for startups from day one"
                  },
                  "price": "₹75,000/package",
                  "priceCurrency": "INR"
                }
              ]
            },
            "review": [
              {
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "author": {
                  "@type": "Person",
                  "name": "Sarah Johnson"
                },
                "reviewBody": "Prachi's virtual HR services transformed our startup. Her expertise in HR compliance and policy development saved us countless hours and potential legal issues."
              },
              {
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "author": {
                  "@type": "Person",
                  "name": "Michael Chen"
                },
                "reviewBody": "Working with Prachi as our virtual HR consultant has been game-changing. Her remote HR support is professional, efficient, and cost-effective."
              }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127",
              "bestRating": "5",
              "worstRating": "1"
            }
          })}
        </script>
        
        {/* FAQ Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                             {
                 "@type": "Question",
                 "name": "What professional HR services do you offer?",
                 "acceptedAnswer": {
                   "@type": "Answer",
                   "text": "We offer comprehensive HR consulting services including strategic recruitment, compliance management, employee engagement programs, performance management systems, HR technology implementation, and startup HR foundation setup."
                 }
               },
                             {
                 "@type": "Question",
                 "name": "What are the costs for professional HR services?",
                 "acceptedAnswer": {
                   "@type": "Answer",
                   "text": "Our professional HR services start at ₹25,000/month and can save you 40-60% compared to in-house HR teams. We offer flexible pricing plans tailored to your business size and needs."
                 }
               },
                             {
                 "@type": "Question",
                 "name": "How do you handle HR compliance management?",
                 "acceptedAnswer": {
                   "@type": "Answer",
                   "text": "We maintain up-to-date knowledge of all Indian labor laws, conduct comprehensive compliance audits, develop compliant policies, and ensure your business meets all statutory obligations including PF, ESI, and workplace safety requirements."
                 }
               },
                             {
                 "@type": "Question",
                 "name": "Which HR services are most popular?",
                 "acceptedAnswer": {
                   "@type": "Answer",
                   "text": "Our most popular services include strategic recruitment, compliance management, employee engagement programs, performance management systems, and HR technology implementation. Each service is customized to your business needs."
                 }
               },
                             {
                 "@type": "Question",
                 "name": "What makes your HR consulting unique?",
                 "acceptedAnswer": {
                   "@type": "Answer",
                   "text": "We provide personalized, one-on-one attention with 8+ years of experience. Our services are flexible, cost-effective, and specifically designed for startups and SMEs. We focus on delivering measurable results and long-term partnerships."
                 }
               }
            ]
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-white" role="main">
        <ScrollProgressBar />
        <HireWithPrachiTopBar />
        <HireWithPrachiHeader />
        
        {/* Breadcrumbs */}
        <section className="pt-24 pb-8 bg-gradient-to-r from-teal-50 to-blue-50">
          <div className="container mx-auto px-4">
            <Breadcrumbs 
              items={[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services', current: true }
              ]}
            />
          </div>
        </section>
        
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-8 pb-20">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50"></div>
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-teal-200 to-blue-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full blur-3xl"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-sm font-semibold uppercase tracking-wider">Comprehensive Solutions</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 leading-tight">
                Professional HR Services & Solutions
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Comprehensive HR consulting services designed for modern businesses. From strategic recruitment to compliance management, we deliver results that drive growth.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Get Free HR Audit
                </button>
                <button className="px-8 py-4 border-2 border-teal-500 text-teal-600 rounded-xl font-semibold hover:bg-teal-50 transition-all duration-300">
                  View Pricing Plans
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600">13</div>
                  <div className="text-sm text-gray-600">Core Services</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600">₹2Cr+</div>
                  <div className="text-sm text-gray-600">Cost Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600">95%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Service Categories Filter */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedService(category.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                    selectedService === category.id
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* New Comprehensive Services Section */}
        <ServicesSection />

        {/* Why Choose Us */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
          {/* Enhanced Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              {/* Enhanced Header Badge */}
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-8 py-4 rounded-full border border-blue-500/30 backdrop-blur-sm mb-8">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                <span className="text-blue-700 text-sm font-bold uppercase tracking-widest">Why Choose Us</span>
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Choose Our <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Professional HR Services?</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the advantages of working with a dedicated HR consultant who understands your business challenges and delivers customized solutions
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '💰',
                  title: 'Cost Effective',
                  description: 'Save 40-60% compared to in-house HR teams while getting expert-level service'
                },
                {
                  icon: '⚡',
                  title: 'Fast Implementation',
                  description: 'Get your HR systems up and running in weeks, not months'
                },
                {
                  icon: '🎯',
                  title: 'Expert Knowledge',
                  description: '8+ years of experience across 500+ companies and industries'
                },
                {
                  icon: '🔄',
                  title: 'Scalable Solutions',
                  description: 'HR systems that grow with your business from startup to enterprise'
                },
                {
                  icon: '🛡️',
                  title: 'Risk Mitigation',
                  description: 'Stay compliant and avoid costly legal issues with expert guidance'
                },
                {
                  icon: '📈',
                  title: 'Measurable Results',
                  description: 'Track improvements in employee satisfaction, retention, and productivity'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl h-full transform group-hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-2xl border border-white/20 relative overflow-hidden group/card">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Enhanced Icon */}
                    <div className="relative w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
                      <div className="relative z-10">{benefit.icon}</div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4 relative z-10">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 relative z-10 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Served */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Industries We Serve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From startups to enterprises, we provide expert HR solutions across diverse industries
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { name: 'Startups', icon: '🚀', description: 'HR foundation & scaling support' },
                { name: 'E-commerce', icon: '🛒', description: 'Retail HR & seasonal hiring' },
                { name: 'IT & Tech', icon: '💻', description: 'Tech talent & remote teams' },
                { name: 'Manufacturing', icon: '🏭', description: 'Industrial compliance & safety' },
                { name: 'Healthcare', icon: '🏥', description: 'Medical HR & compliance' },
                { name: 'Finance', icon: '💰', description: 'Financial sector HR' },
                { name: 'Education', icon: '🎓', description: 'Academic HR & training' },
                { name: 'Real Estate', icon: '🏢', description: 'Property sector HR' },
                { name: 'Consulting', icon: '📊', description: 'Professional services HR' },
                { name: 'Non-Profit', icon: '🤝', description: 'NGO & social sector HR' },
                { name: 'Hospitality', icon: '🏨', description: 'Service industry HR' },
                { name: 'Agencies', icon: '🎯', description: 'Creative & marketing HR' }
              ].map((industry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group text-center"
                >
                  <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-6 rounded-2xl h-full transform group-hover:scale-105 transition-all duration-300 hover:shadow-xl">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {industry.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {industry.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {industry.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-20 bg-gradient-to-br from-teal-50 to-blue-50 relative overflow-hidden">
          {/* Enhanced Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-gradient-to-r from-teal-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-l from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
          </div>
          
          {/* Floating Particles */}
          <div className="absolute top-32 left-1/3 w-2 h-2 bg-teal-400/60 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-32 right-1/3 w-1 h-1 bg-blue-400/80 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              {/* Enhanced Header Badge */}
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-500/20 to-blue-500/20 px-8 py-4 rounded-full border border-teal-500/30 backdrop-blur-sm mb-8">
                <div className="w-3 h-3 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full animate-pulse"></div>
                <span className="text-teal-700 text-sm font-bold uppercase tracking-widest">Unique Advantages</span>
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Work With <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">Us?</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the unique advantages that make us the preferred choice for virtual HR services
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '👩‍💼',
                  title: 'Expert Consultant',
                  description: 'Prachi Shrivastava brings 8+ years of HR expertise with proven track record across 500+ companies'
                },
                {
                  icon: '🎯',
                  title: 'Personalized Approach',
                  description: 'One-on-one attention with customized solutions tailored to your specific business needs'
                },
                {
                  icon: '⚡',
                  title: 'Quick Turnaround',
                  description: 'Fast implementation with most HR systems operational within 2-4 weeks'
                },
                {
                  icon: '🛡️',
                  title: 'Compliance Guarantee',
                  description: '100% compliance assurance with up-to-date knowledge of all labor laws and regulations'
                },
                {
                  icon: '📱',
                  title: '24/7 Support',
                  description: 'Round-the-clock availability for urgent HR matters and ongoing support'
                },
                {
                  icon: '📊',
                  title: 'Data-Driven Insights',
                  description: 'Analytics and reporting to track HR performance and make informed decisions'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl h-full transform group-hover:scale-105 transition-all duration-500 hover:shadow-2xl border border-white/20 relative overflow-hidden group/card">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Enhanced Icon */}
                    <div className="relative w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
                      <div className="relative z-10">{benefit.icon}</div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4 relative z-10">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 relative z-10 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials - Using Hirable Homepage Version */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>

          <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-8 py-4 rounded-full border border-blue-500/30 backdrop-blur-sm mb-8">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                <span className="text-blue-600 text-sm font-bold uppercase tracking-widest">Client Success Stories</span>
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
                What Our <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Clients Say</span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                See how our professional HR consulting services have helped businesses optimize their HR operations and achieve sustainable growth
              </p>
            </motion.div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                {
                  quote: "Prachi's virtual HR services transformed our startup. Her expertise in HR compliance and policy development saved us countless hours and potential legal issues. Highly recommended for any growing business!",
                  author: "Sarah Johnson",
                  title: "CEO Of Company",
                  image: "/Hirable – Human Resources & Recruiting WordPress Theme_files/author-1.jpg",
                  rating: 5,
                  isHighlighted: false,
                },
                {
                  quote: "Working with Prachi as our virtual HR consultant has been game-changing. Her remote HR support is professional, efficient, and cost-effective. She's become an invaluable part of our team.",
                  author: "Michael Chen",
                  title: "CEO Of Company",
                  image: "/Hirable – Human Resources & Recruiting WordPress Theme_files/author-2.jpg",
                  rating: 5,
                  isHighlighted: true,
                },
                {
                  quote: "As a small business owner, I was struggling with HR compliance. Prachi's virtual HR agency provided the perfect solution - expert guidance without the overhead. Our HR processes are now streamlined and compliant.",
                  author: "Emily Rodriguez",
                  title: "CEO Of Company",
                  image: "/Hirable – Human Resources & Recruiting WordPress Theme_files/author-3.jpg",
                  rating: 5,
                  isHighlighted: false,
                },
                {
                  quote: "The level of professionalism and attention to detail Prachi brings is exceptional. Our employee satisfaction scores increased by 40% within 6 months of working with her virtual HR services.",
                  author: "David Kumar",
                  title: "CEO Of Company",
                  image: "/Hirable – Human Resources & Recruiting WordPress Theme_files/author-4.jpg",
                  rating: 5,
                  isHighlighted: false,
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`group relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                    testimonial.isHighlighted ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' : ''
                  }`}
                >
                  {/* Profile Picture */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-lg"
                      />
                      {testimonial.isHighlighted && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white text-lg shadow-lg">
                          "
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className={`font-bold text-lg ${testimonial.isHighlighted ? 'text-white' : 'text-gray-900'}`}>
                        {testimonial.author}
                      </h4>
                      <p className={`text-sm ${testimonial.isHighlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                  
                  {/* Quote Text */}
                  <blockquote className={`text-sm leading-relaxed mb-4 ${
                    testimonial.isHighlighted ? 'text-white/90' : 'text-gray-600'
                  }`}>
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${testimonial.isHighlighted ? 'text-blue-300' : 'text-yellow-400'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Free Tools Section */}
        <section className="py-20 bg-gradient-to-br from-teal-50 to-blue-50">
          <div className="container mx-auto px-4">
            <FreeTools limit={4} />
          </div>
        </section>

        {/* Amazing Call to Action Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
          
          {/* Floating Particles */}
          <div className="absolute top-20 left-1/3 w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-40 right-1/4 w-1 h-1 bg-white/80 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-2/3 w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Header Badge */}
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-8 py-4 rounded-full border border-white/30 mb-8">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-bold uppercase tracking-widest">Limited Time Offer</span>
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </div>

              {/* Main Heading */}
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Ready to Transform Your <br />
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  HR Operations?
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Join 500+ satisfied clients who have revolutionized their HR processes and saved millions in costs
              </p>

              {/* Benefits List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                  { icon: '💰', text: 'Save 40-60% on HR costs' },
                  { icon: '⚡', text: 'Get started in 48 hours' },
                  { icon: '🎯', text: '100% compliance guarantee' }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
                  >
                    <div className="text-2xl">{benefit.icon}</div>
                    <span className="text-white font-semibold">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <motion.a
                  href="/contact"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span>Get Free HR Audit</span>
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.a>
                
                <motion.a
                  href="/contact"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold text-lg rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span>Book Free Consultation</span>
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </motion.a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm font-medium">No Setup Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm font-medium">Cancel Anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm font-medium">Money-Back Guarantee</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section - Using Hirable Homepage Version */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
          
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 shadow-lg mb-6">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 text-sm font-semibold uppercase tracking-widest">Frequently Asked Questions</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Got <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Questions?</span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Common questions about our professional HR consulting services and how we can help your business
              </p>
            </motion.div>

            {/* FAQ Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
              {[
                {
                  question: "What professional HR services do you offer?",
                  answer: "We offer comprehensive HR consulting services including strategic recruitment, compliance management, employee engagement programs, performance management systems, HR technology implementation, and startup HR foundation setup.",
                  icon: "🎯",
                  category: "Services"
                },
                {
                  question: "What are the costs for professional HR services?",
                  answer: "Our professional HR services provide significant cost savings compared to hiring a full-time HR manager. We offer flexible packages tailored to your business needs. Contact us for a free consultation to discuss your requirements.",
                  icon: "💰",
                  category: "Pricing"
                },
                {
                  question: "Which HR services are most popular?",
                  answer: "Our most popular services include strategic recruitment, compliance management, employee engagement programs, performance management systems, and HR technology implementation. Each service is customized to your business needs.",
                  icon: "🛠️",
                  category: "Services"
                },
                {
                  question: "How do you handle HR compliance management?",
                  answer: "We maintain up-to-date knowledge of all Indian labor laws, conduct comprehensive compliance audits, develop compliant policies, and ensure your business meets all statutory obligations including PF, ESI, and workplace safety requirements.",
                  icon: "⚖️",
                  category: "Compliance"
                },
                {
                  question: "Do you support remote and hybrid teams?",
                  answer: "Yes! We specialize in remote HR support, virtual workplace policies, digital onboarding, virtual performance management, and tools for maintaining team engagement in remote and hybrid work environments.",
                  icon: "🌐",
                  category: "Remote Work"
                },
                {
                  question: "What makes your HR consulting unique?",
                  answer: "We provide personalized, one-on-one attention with 8+ years of experience. Our services are flexible, cost-effective, and specifically designed for startups and SMEs. We focus on delivering measurable results and long-term partnerships.",
                  icon: "⭐",
                  category: "Why Choose Us"
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  {/* Glassmorphism Card */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                    {/* Gradient Border Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <details className="group">
                      <summary className="relative w-full px-8 py-6 text-left flex items-start justify-between hover:bg-white/50 transition-all duration-300 cursor-pointer">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="text-2xl mt-1">{faq.icon}</div>
                          <div className="flex-1">
                            <span className="font-bold text-gray-900 text-lg leading-tight block">
                              {faq.question}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex-shrink-0 ml-4">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center transition-all duration-300 group-open:rotate-180">
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
                      </summary>
                      
                      <div className="px-8 pb-6 border-t border-white/20 bg-gradient-to-br from-white/50 to-white/30">
                        <div className="pt-4">
                          <p className="text-gray-700 leading-relaxed text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </details>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
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
                    <button className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl group">
                      Schedule a Call
                      <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </button>
                    
                    <button className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm group">
                      View All FAQs
                      <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Classy CTA Inquiry Form with Image - 2025 Trendy Design */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          
          {/* Floating Particles */}
          <div className="absolute top-20 left-1/3 w-2 h-2 bg-purple-400/60 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-40 right-1/4 w-1 h-1 bg-pink-400/80 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-2/3 w-1.5 h-1.5 bg-blue-400/70 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Image & Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="HR Consultation"
                    className="w-full h-96 md:h-[500px] object-cover rounded-3xl shadow-2xl"
                  />
                  {/* Overlay Badge */}
                  <div className="absolute top-6 right-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg backdrop-blur-sm">
                    <span className="font-bold text-lg">Free Consultation</span>
                  </div>
                  {/* Floating Stats */}
                  <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">500+</div>
                      <div className="text-sm text-white/80">Happy Clients</div>
                    </div>
                  </div>
                </div>
                
                {/* Trust Indicators */}
                <div className="mt-8 flex flex-wrap gap-6 justify-center">
                  {[
                    { icon: '⭐', text: '5-Star Rated' },
                    { icon: '🛡️', text: '100% Secure' },
                    { icon: '⚡', text: '24/7 Support' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-white/90 text-sm font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right Side - Inquiry Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-full border border-purple-500/30 mb-4">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <span className="text-purple-300 text-sm font-semibold">Ready to Transform Your HR?</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      Get Your Free HR Consultation
                    </h3>
                    <p className="text-white/80 text-lg">
                      Let's discuss your HR needs and create a customized solution for your business
                    </p>
                  </div>

                  {/* Inquiry Form */}
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">Full Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">Company</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                          placeholder="Your company name"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">Phone</label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-white/90 text-sm font-medium mb-2">Company Size</label>
                      <select className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300">
                        <option value="" className="text-gray-800">Select company size</option>
                        <option value="1-10" className="text-gray-800">1-10 employees</option>
                        <option value="11-50" className="text-gray-800">11-50 employees</option>
                        <option value="51-200" className="text-gray-800">51-200 employees</option>
                        <option value="200+" className="text-gray-800">200+ employees</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-white/90 text-sm font-medium mb-2">Message</label>
                      <textarea
                        rows="4"
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Tell us about your HR needs..."
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Get Free Consultation
                    </button>
                  </form>
                  
                  <p className="text-center text-white/60 text-sm mt-4">
                    By submitting this form, you agree to our privacy policy and terms of service
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How to Choose the Right HR Service */}
        <section className="py-20 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">How to Choose the Right HR Service for Your Business</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Selecting the right HR service depends on your business size, industry, and unique challenges. Consider your compliance needs, hiring goals, employee engagement, and technology adoption to make an informed decision. Our experts are here to guide you every step of the way.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold mb-2">Assess Your Current HR Challenges</h3>
                <p>Identify pain points such as compliance gaps, slow hiring, or low employee engagement to prioritize solutions.</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold mb-2">Define Your Business Goals</h3>
                <p>Align HR services with your growth plans, whether it's scaling your team, improving retention, or automating processes.</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold mb-2">Consult with an HR Expert</h3>
                <p>Book a free consultation to get personalized recommendations based on your industry and company size.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our HR Service Process */}
        <section className="py-20 bg-gradient-to-br from-teal-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our HR Service Process</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We follow a proven, step-by-step process to deliver exceptional HR results for every client, ensuring transparency and measurable outcomes.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-md">
                <h3 className="text-lg font-bold mb-2">1. Discovery & Assessment</h3>
                <p>We analyze your current HR systems, identify gaps, and understand your business goals.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-md">
                <h3 className="text-lg font-bold mb-2">2. Custom Solution Design</h3>
                <p>Our team crafts a tailored HR strategy and implementation plan for your unique needs.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-md">
                <h3 className="text-lg font-bold mb-2">3. Implementation & Support</h3>
                <p>We execute the plan, provide training, and offer ongoing support to ensure lasting success.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies Section (if available) */}
        <section className="py-20 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">HR Success Stories: Case Studies</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover how our HR solutions have transformed businesses across industries. Real results, real impact.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-100 to-teal-100 p-8 rounded-2xl shadow-md">
                <h3 className="text-lg font-bold mb-2">Startup Scales from 10 to 100 Employees</h3>
                <p>Our recruitment and onboarding solutions enabled a tech startup to rapidly scale, reduce hiring time by 60%, and improve retention.</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-teal-100 p-8 rounded-2xl shadow-md">
                <h3 className="text-lg font-bold mb-2">Manufacturing Firm Achieves 100% Compliance</h3>
                <p>We implemented compliance audits and policy updates, helping a manufacturer avoid legal penalties and improve workplace safety.</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-teal-100 p-8 rounded-2xl shadow-md">
                <h3 className="text-lg font-bold mb-2">SME Boosts Employee Engagement by 40%</h3>
                <p>Our engagement programs and performance management systems increased satisfaction and productivity for a mid-sized business.</p>
              </div>
            </div>
          </div>
        </section>

        <HireWithPrachiFooter />
        <AIChatbotWidget />
      </main>
    </>
  );
} 