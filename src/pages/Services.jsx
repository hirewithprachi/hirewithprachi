import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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
import FAQSection from '../components/sections/FAQSection';
import { servicesPageFaqs } from '../data/faqData';
import { formSubmission } from '../lib/supabase';

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    companySize: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Use static data directly - no loading states needed
  const services = servicesData.services;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { id: 'all', name: 'All Services', icon: '🌟' },
    { id: 'core-hr', name: 'Core HR', icon: '👥' },
    { id: 'corporate-startup', name: 'Corporate & Startup', icon: '🏢' },
    { id: 'posh', name: 'POSH Compliance', icon: '🛡️' },
    { id: 'educational', name: 'Educational', icon: '🎓' },
    { id: 'women-child', name: 'Women & Child Rights', icon: '🤱' }
  ];

  // Filter services based on selected category
  const filteredServices = selectedService === 'all' 
    ? services 
    : services.filter(service => service.category === selectedService);

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit form to Supabase (which also sends to HubSpot)
      const result = await formSubmission.submitForm({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        company_size: formData.companySize,
        message: formData.message,
        service_interest: 'General HR Services',
        lead_source: 'Services Page'
      }, 'service_inquiry');
      
      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          fullName: '',
          company: '',
          email: '',
          phone: '',
          companySize: '',
          message: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        console.error('Form submission failed:', result.error);
        alert('Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <meta property="twitter:creator" content="@hirewithprachi" />
        
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
        

        
        {/* Hero Section - 2025 Modern Design */}
        <section className="relative overflow-hidden pt-8 pb-20 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
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
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Breadcrumbs integrated into hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <Breadcrumbs variant="dark" />
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
              {/* Left Side - Content */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
                className="text-left"
            >
              <motion.div
                  className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-bold uppercase tracking-widest">2025 HR Excellence</span>
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </motion.div>
              
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Transform Your{' '}
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    HR Operations
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Experience the future of HR with AI-powered solutions, strategic consulting, and compliance excellence. Drive growth with data-driven insights.
                </motion.p>
                
                <motion.div 
                  className="flex flex-wrap gap-4 mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <span>Get Free HR Audit</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.a>
                  
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <span>Get Custom Quote</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </motion.a>
                </motion.div>

                {/* Enhanced Stats */}
                <motion.div 
                  className="grid grid-cols-3 gap-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">13</div>
                    <div className="text-sm text-gray-300">Core Services</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">₹2Cr+</div>
                    <div className="text-sm text-gray-300">Cost Savings</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">95%</div>
                    <div className="text-sm text-gray-300">Success Rate</div>
                </div>
                </motion.div>
              </motion.div>

              {/* Right Side - Hero Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="relative">
                  {/* Main Image */}
                  <motion.img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Modern HR Services"
                    className="w-full h-96 md:h-[500px] object-cover rounded-3xl shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Floating Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="absolute top-6 right-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg backdrop-blur-sm"
                  >
                    <span className="font-bold text-lg">AI-Powered</span>
                  </motion.div>
                  
                  {/* Floating Stats Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/20"
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">500+</div>
                      <div className="text-sm text-white/80">Happy Clients</div>
              </div>
            </motion.div>
                </div>
                
                {/* Trust Indicators */}
                <motion.div 
                  className="mt-8 flex flex-wrap gap-6 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                >
                  {[
                    { icon: "🏆", text: "8+ Years Experience" },
                    { icon: "⚡", text: "24/7 Support" },
                    { icon: "🔒", text: "100% Secure" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-white text-sm font-medium">{item.text}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
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
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => setSelectedService(category.id)}
                  className={`group px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 hover:scale-105 ${
                    selectedService === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/25 transform scale-105'
                      : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl'
                  }`}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300">{category.icon}</span>
                  <span className="whitespace-nowrap">{category.name}</span>
                  {selectedService === category.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* New Comprehensive Services Section */}
        <ServicesSection showAll={true} filteredServices={filteredServices} />

        {/* Enhanced Lead Generation CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-700/20"></div>
            <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-8 py-4 rounded-full border border-white/30 mb-8">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-bold uppercase tracking-widest">Get Started Today</span>
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">HR Operations?</span>
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Join 500+ companies that have revolutionized their HR with our expert consulting. 
                Get a free consultation and discover how we can save you 40-60% on HR costs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-2">500+</div>
                  <div className="text-blue-100 text-sm">Happy Clients</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-2">₹2Cr+</div>
                  <div className="text-blue-100 text-sm">Cost Savings Delivered</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-2">95%</div>
                  <div className="text-blue-100 text-sm">Client Satisfaction</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Book Free Consultation
                </a>
                <a 
                  href="https://wa.me/918740889927" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-green-500 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.205 5.077 4.372.71.306 1.263.489 1.695.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
              
              <p className="text-blue-200 text-sm mt-6">
                ⭐ No commitment required • 30-minute free consultation • Expert HR guidance
              </p>
            </motion.div>
          </div>
        </section>

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
            <FreeTools showLimited={true} />
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

        {/* FAQ Section - Services Page Specific */}
        <FAQSection 
          customFaqs={servicesPageFaqs}
          title="HR Services - Frequently Asked Questions"
          subtitle="Everything you need to know about our professional HR consulting services"
        />

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
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    {submitSuccess && (
                      <div className="bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-4 text-center">
                        <div className="text-green-300 font-semibold mb-2">✅ Thank you!</div>
                        <div className="text-green-200 text-sm">Your inquiry has been submitted successfully. We'll get back to you within 24 hours.</div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleFormChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">Company</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleFormChange}
                          required
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
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                          placeholder="+91 87408 89927"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-white/90 text-sm font-medium mb-2">Company Size</label>
                      <select 
                        name="companySize"
                        value={formData.companySize}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                      >
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
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        required
                        rows="4"
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Tell us about your HR needs..."
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Submitting...
                        </div>
                      ) : (
                        'Get Free Consultation'
                      )}
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
        <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
          {/* Background Elements */}
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
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-8 py-4 rounded-full border border-blue-500/30 backdrop-blur-sm mb-8">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                <span className="text-blue-700 text-sm font-bold uppercase tracking-widest">Decision Guide</span>
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                How to Choose the Right <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">HR Service</span> for Your Business
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Selecting the right HR service depends on your business size, industry, and unique challenges. 
                Consider your compliance needs, hiring goals, employee engagement, and technology adoption to make an informed decision.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '🔍',
                  title: 'Assess Your Current HR Challenges',
                  description: 'Identify pain points such as compliance gaps, slow hiring, or low employee engagement to prioritize solutions.',
                  color: 'from-blue-500 to-cyan-500',
                  bgColor: 'from-blue-50 to-cyan-50'
                },
                {
                  icon: '🎯',
                  title: 'Define Your Business Goals',
                  description: 'Align HR services with your growth plans, whether it\'s scaling your team, improving retention, or automating processes.',
                  color: 'from-purple-500 to-pink-500',
                  bgColor: 'from-purple-50 to-pink-50'
                },
                {
                  icon: '💡',
                  title: 'Consult with an HR Expert',
                  description: 'Book a free consultation to get personalized recommendations based on your industry and company size.',
                  color: 'from-orange-500 to-red-500',
                  bgColor: 'from-orange-50 to-red-50'
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group relative"
                >
                  <div className={`bg-gradient-to-br ${step.bgColor} p-8 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 h-full transform group-hover:scale-105 relative overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-4 right-4 w-16 h-16 border-2 border-current rounded-full"></div>
                      <div className="absolute bottom-4 left-4 w-12 h-12 border-2 border-current rounded-full"></div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-2xl">{step.icon}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                        {step.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                      
                      <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600">
                        <span>Step {index + 1}</span>
                        <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mt-12"
            >
              <a
                href="/contact"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 group"
              >
                <span>Get Personalized Recommendations</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </section>

        {/* HR Success Stories: Case Studies */}
        <section className="py-20 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute top-40 right-10 w-48 md:w-72 h-48 md:h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-48 md:w-72 h-48 md:h-72 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-8 py-4 rounded-full border border-blue-500/30 backdrop-blur-sm mb-8">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                <span className="text-blue-300 text-sm font-bold uppercase tracking-widest">Success Stories</span>
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                HR Success Stories: <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Case Studies</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Discover how our HR solutions have transformed businesses across industries. Real results, real impact, real success stories.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '🚀',
                  title: 'Startup Scales from 10 to 100 Employees',
                  description: 'Our recruitment and onboarding solutions enabled a tech startup to rapidly scale, reduce hiring time by 60%, and improve retention.',
                  metrics: ['60% faster hiring', '95% retention rate', '10x growth'],
                  color: 'from-blue-500 to-cyan-500',
                  bgColor: 'from-blue-500/10 to-cyan-500/10'
                },
                {
                  icon: '🏭',
                  title: 'Manufacturing Firm Achieves 100% Compliance',
                  description: 'We implemented compliance audits and policy updates, helping a manufacturer avoid legal penalties and improve workplace safety.',
                  metrics: ['100% compliance', '0 legal issues', '40% safety improvement'],
                  color: 'from-green-500 to-emerald-500',
                  bgColor: 'from-green-500/10 to-emerald-500/10'
                },
                {
                  icon: '📈',
                  title: 'SME Boosts Employee Engagement by 40%',
                  description: 'Our engagement programs and performance management systems increased satisfaction and productivity for a mid-sized business.',
                  metrics: ['40% engagement boost', '25% productivity increase', '90% satisfaction'],
                  color: 'from-purple-500 to-pink-500',
                  bgColor: 'from-purple-500/10 to-pink-500/10'
                }
              ].map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group relative"
                >
                  <div className={`bg-gradient-to-br ${story.bgColor} backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 h-full transform group-hover:scale-105 relative overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-4 right-4 w-16 h-16 border-2 border-current rounded-full"></div>
                      <div className="absolute bottom-4 left-4 w-12 h-12 border-2 border-current rounded-full"></div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${story.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-2xl">{story.icon}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                        {story.title}
                      </h3>
                      
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {story.description}
                      </p>
                      
                      <div className="space-y-2">
                        {story.metrics.map((metric, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                            <span className="text-blue-300 font-semibold">{metric}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2 text-sm font-semibold text-blue-400">
                          <span>Case Study {index + 1}</span>
                          <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mt-12"
            >
              <a
                href="/contact"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 group"
              >
                <span>Create Your Success Story</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </section>

        {/* Our HR Service Process */}
        <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-indigo-50 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-8 py-4 rounded-full border border-indigo-500/30 backdrop-blur-sm mb-8">
                <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
                <span className="text-indigo-700 text-sm font-bold uppercase tracking-widest">Our Process</span>
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">HR Service Process</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                We follow a proven, step-by-step process to deliver exceptional HR results for every client, 
                ensuring transparency, measurable outcomes, and lasting success.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  icon: '🔍',
                  title: 'Discovery & Assessment',
                  description: 'We analyze your current HR systems, identify gaps, and understand your business goals.',
                  color: 'from-blue-500 to-cyan-500',
                  bgColor: 'from-blue-50 to-cyan-50'
                },
                {
                  step: '02',
                  icon: '🎨',
                  title: 'Custom Solution Design',
                  description: 'Our team crafts a tailored HR strategy and implementation plan for your unique needs.',
                  color: 'from-purple-500 to-pink-500',
                  bgColor: 'from-purple-50 to-pink-50'
                },
                {
                  step: '03',
                  icon: '🚀',
                  title: 'Implementation & Support',
                  description: 'We execute the plan, provide training, and offer ongoing support to ensure lasting success.',
                  color: 'from-orange-500 to-red-500',
                  bgColor: 'from-orange-50 to-red-50'
                }
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group relative"
                >
                  <div className={`bg-gradient-to-br ${phase.bgColor} p-8 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 h-full transform group-hover:scale-105 relative overflow-hidden`}>
                    <div className="absolute top-6 right-6 text-6xl font-bold text-gray-200/50 group-hover:text-gray-300/70 transition-colors duration-300">
                      {phase.step}
                    </div>
                    
                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${phase.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-2xl">{phase.icon}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                        {phase.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {phase.description}
                      </p>
                      
                      <div className="mt-6 pt-4 border-t border-gray-200/50">
                        <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
                          <span>Phase {index + 1}</span>
                          <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <HireWithPrachiFooter />
        <AIChatbotWidget />
      </main>
    </>
  );
} 