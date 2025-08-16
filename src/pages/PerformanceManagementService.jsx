import React, { useState } from 'react';
import SEOOptimizer from '../components/SEOOptimizer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HireWithPrachiTopBar from '../components/hirable/HirableTopBar';
import HireWithPrachiHeader from '../components/hirable/HirableHeader';
import HireWithPrachiFooter from '../components/hirable/HirableFooter';
import GPT4oMiniChatbot from '../components/GPT4oMiniChatbot';
import ScrollProgressBar from '../components/ScrollProgressBar';
import BrochureDownloadModal from '../components/BrochureDownloadModal';
import { CheckCircle, Users, Shield, Zap, Award, MessageSquare, BarChart2, Search, Phone, Mail, ChevronDown, ChevronUp, Download, Calendar, MessageCircle, FileText, Target, TrendingUp, Clock, Star, Eye, Activity, ArrowRight, Play } from 'lucide-react';

export default function PerformanceManagementService() {
  // SEO Data for Performance Management Service
  const seoData = {
    title: "Performance Management Services - Optimize Team Performance",
    description: "Performance management services to optimize team performance. KPI tracking, performance reviews, and performance optimization strategies.",
    keywords: "performance management, KPI tracking, performance reviews, team optimization",
    pageType: "service",
    pageData: {
      title: "Performance Management Services",
      description: "Optimize team performance and productivity",
      image: "https://hirewithprachi.com/assets/images/performance-management-1200x630.jpg"
    }
  };
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleBrochureDownload = () => {
    setShowBrochureModal(true);
  };

  // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Performance Management Services India",
    "description": "Comprehensive performance management solutions including goal setting, employee appraisals, 360-degree feedback, and performance improvement plans for Indian businesses.",
    "provider": {
      "@type": "ProfessionalService",
      "name": "Hire With Prachi",
      "founder": {
        "@type": "Person",
        "name": "Prachi Shrivastava",
        "jobTitle": "Performance Management Consultant"
      },
      "url": "https://prachi-hr.com",
      "telephone": "+91-8740889927",
      "email": "info@hirewithprachi.com"
    },
    "serviceType": "Performance Management & Employee Development",
    "areaServed": ["India", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Performance Management Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Goal Setting & OKR Implementation",
            "description": "Strategic goal alignment and OKR framework implementation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Employee Appraisal Systems",
            "description": "Comprehensive performance appraisal and review processes"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "360-Degree Feedback",
            "description": "Multi-source feedback and development programs"
          }
        }
      ]
    },
    "offers": {
      "@type": "Offer",
      "price": "15999",
      "priceCurrency": "INR",
      "description": "Starting from ₹15,999/month for performance management services"
    }
  };

  const otherServices = [
    {
      id: 'recruitment',
      title: 'Strategic Recruitment & Hiring',
      description: 'End-to-end recruitment solutions to build your dream team',
      icon: '🎯',
      link: '/services/recruitment-hiring'
    },
    {
      id: 'employee-engagement',
      title: 'Employee Engagement & Culture',
      description: 'Build a thriving workplace culture that retains top talent',
      icon: '❤️',
      link: '/services/employee-engagement'
    },
    {
      id: 'hr-compliance',
      title: 'HR Compliance & Legal Services',
      description: 'Stay compliant with comprehensive legal protection',
      icon: '⚖️',
      link: '/services/hr-compliance'
    },
    {
      id: 'virtual-hr',
      title: 'Virtual HR Services',
      description: 'Complete HR management without the overhead',
      icon: '🌐',
      link: '/services/virtual-hr-services'
    },
    {
      id: 'payroll',
      title: 'Payroll Management',
      description: 'Accurate and compliant payroll processing',
      icon: '💰',
      link: '/services/payroll-management'
    },
    {
      id: 'hr-audit',
      title: 'HR Audit Services',
      description: 'Comprehensive HR process evaluation and optimization',
      icon: '🔍',
      link: '/services/hr-audit'
    }
  ];

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Performance Management Services | Expert Performance Management India</title>
        <meta name="title" content="Performance Management Services | Expert Performance Management India" />
        <meta name="description" content="Comprehensive performance management solutions including goal setting, employee appraisals, 360-degree feedback, and performance improvement plans for Indian businesses." />
        <meta name="keywords" content="performance management, employee appraisal, goal setting, OKR implementation, 360-degree feedback, performance improvement, KPI tracking, employee development, performance review, performance management system, HR performance, employee evaluation, performance metrics, performance optimization" />
        <meta name="author" content="Prachi Shrivastava" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hirewithprachi.com/services/performance-management" />
        <meta property="og:title" content="Performance Management Services | Expert Performance Management India" />
        <meta property="og:description" content="Comprehensive performance management solutions including goal setting, employee appraisals, 360-degree feedback, and performance improvement plans." />
        <meta property="og:image" content="https://hirewithprachi.com/performance-management-og-image.png" />
        <meta property="og:site_name" content="Hire With Prachi" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://hirewithprachi.com/services/performance-management" />
        <meta property="twitter:title" content="Performance Management Services | Expert Performance Management India" />
        <meta property="twitter:description" content="Comprehensive performance management solutions including goal setting, employee appraisals, 360-degree feedback, and performance improvement plans." />
        <meta property="twitter:image" content="https://hirewithprachi.com/performance-management-twitter-image.png" />
        <meta property="twitter:creator" content="@prachi_hr" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Performance Management Services" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://hirewithprachi.com/services/performance-management" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* FAQ Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What performance management services do you provide?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We provide comprehensive performance management services including goal setting and OKR implementation, employee appraisal systems, 360-degree feedback programs, performance improvement plans, KPI tracking, and employee development frameworks to maximize productivity and engagement."
                }
              },
              {
                "@type": "Question",
                "name": "How do you implement OKR frameworks?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We design and implement OKR frameworks aligned with your business objectives, establish measurable key results, provide training for managers and employees, and create regular review cycles to ensure continuous improvement and goal achievement."
                }
              },
              {
                "@type": "Question",
                "name": "How much do performance management services cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our performance management services start at ₹15,999 per month with flexible pricing based on organization size and complexity. We offer comprehensive packages including system setup, training, and ongoing support to ensure successful implementation."
                }
              },
              {
                "@type": "Question",
                "name": "Do you provide 360-degree feedback systems?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we design and implement comprehensive 360-degree feedback systems that gather input from peers, managers, subordinates, and self-assessments. We provide training, anonymous surveys, and detailed reporting to support employee development."
                }
              },
              {
                "@type": "Question",
                "name": "How often should performance reviews be conducted?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We recommend quarterly performance check-ins with annual comprehensive reviews. We also implement continuous feedback systems and real-time performance tracking to ensure ongoing development and goal alignment throughout the year."
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
        
        {/* Enhanced Page Header Section - Mobile Optimized */}
        <div className="bg-gradient-to-r from-green-900 via-emerald-900 to-teal-900 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 md:w-80 md:h-80 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
            {/* Breadcrumb - Mobile Optimized */}
            <nav className="mb-6 md:mb-8">
              <ol className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm flex-wrap">
                <li>
                  <Link to="/" className="text-green-200 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-green-300">/</li>
                <li>
                  <Link to="/services" className="text-green-200 hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li className="text-green-300">/</li>
                <li className="text-white font-medium truncate">Performance Management Services</li>
              </ol>
            </nav>
            
            {/* Service Title with Enhanced Design - Mobile Optimized */}
            <div className="max-w-5xl">
              <div className="inline-flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full border border-white/20 mb-4 md:mb-6">
                <Target className="w-4 h-4 md:w-5 md:h-5 text-green-200" />
                <span className="text-green-200 text-xs md:text-sm font-semibold uppercase tracking-widest">Performance Excellence</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                Performance 
                <span className="bg-gradient-to-r from-green-300 to-teal-300 bg-clip-text text-transparent"> Management</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-green-100 leading-relaxed mb-6 md:mb-8 max-w-4xl">
                Comprehensive performance management solutions to maximize productivity and employee engagement. Expert guidance on goal setting, appraisals, and performance improvement to drive organizational success.
              </p>
              
              {/* Key Benefits - Mobile Optimized */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
                  <Target className="w-6 h-6 md:w-8 md:h-8 text-green-300 mb-2" />
                  <h3 className="font-semibold text-white mb-1 text-sm md:text-base">Goal Alignment</h3>
                  <p className="text-green-200 text-xs md:text-sm">Strategic OKR implementation and tracking</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
                  <BarChart2 className="w-6 h-6 md:w-8 md:h-8 text-green-300 mb-2" />
                  <h3 className="font-semibold text-white mb-1 text-sm md:text-base">Performance Tracking</h3>
                  <p className="text-green-200 text-xs md:text-sm">Comprehensive KPI and metric monitoring</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20 sm:col-span-2 md:col-span-1">
                  <Users className="w-6 h-6 md:w-8 md:h-8 text-green-300 mb-2" />
                  <h3 className="font-semibold text-white mb-1 text-sm md:text-base">360° Feedback</h3>
                  <p className="text-green-200 text-xs md:text-sm">Multi-source evaluation and development</p>
                </div>
              </div>
              
              {/* CTA Buttons - Mobile Optimized */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBrochureDownload}
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Download className="w-5 h-5" />
                  Download Brochure
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-xl border border-white/20 flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <Calendar className="w-5 h-5" />
                  Book Consultation
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Service Overview Section */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Transform Your Performance Management
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Our comprehensive performance management solutions help organizations establish clear goals, 
                track progress effectively, and create a culture of continuous improvement and development.
              </p>
            </div>

            {/* Service Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Goal Setting & OKRs</h3>
                <p className="text-gray-600 leading-relaxed">
                  Strategic goal alignment with measurable objectives and key results. We help you implement 
                  effective OKR frameworks that drive performance and accountability.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                  <BarChart2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Appraisals</h3>
                <p className="text-gray-600 leading-relaxed">
                  Comprehensive performance review systems with structured evaluation criteria, 
                  regular feedback cycles, and development planning for continuous growth.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">360° Feedback</h3>
                <p className="text-gray-600 leading-relaxed">
                  Multi-source feedback systems that gather insights from peers, managers, 
                  subordinates, and self-assessments for comprehensive performance evaluation.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Improvement</h3>
                <p className="text-gray-600 leading-relaxed">
                  Structured performance improvement plans with coaching, training, and 
                  development opportunities to help employees reach their full potential.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">KPI Tracking</h3>
                <p className="text-gray-600 leading-relaxed">
                  Advanced performance metrics and KPI tracking systems with real-time 
                  dashboards and automated reporting for data-driven decision making.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recognition Programs</h3>
                <p className="text-gray-600 leading-relaxed">
                  Employee recognition and reward systems that celebrate achievements, 
                  boost morale, and reinforce positive performance behaviors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our Performance Management Process
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                A systematic approach to implementing effective performance management systems 
                that drive results and employee engagement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Assessment</h3>
                <p className="text-gray-600">
                  Evaluate current performance management practices and identify improvement opportunities
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Design</h3>
                <p className="text-gray-600">
                  Create customized performance management frameworks and evaluation systems
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Implementation</h3>
                <p className="text-gray-600">
                  Deploy systems with comprehensive training and change management support
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Optimization</h3>
                <p className="text-gray-600">
                  Continuous monitoring, feedback collection, and system improvements
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg md:text-xl text-gray-600">
                  Get answers to common questions about our performance management services
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    question: "What performance management services do you provide?",
                    answer: "We provide comprehensive performance management services including goal setting and OKR implementation, employee appraisal systems, 360-degree feedback programs, performance improvement plans, KPI tracking, and employee development frameworks to maximize productivity and engagement."
                  },
                  {
                    question: "How do you implement OKR frameworks?",
                    answer: "We design and implement OKR frameworks aligned with your business objectives, establish measurable key results, provide training for managers and employees, and create regular review cycles to ensure continuous improvement and goal achievement."
                  },
                  {
                    question: "How much do performance management services cost?",
                    answer: "Our performance management services start at ₹15,999 per month with flexible pricing based on organization size and complexity. We offer comprehensive packages including system setup, training, and ongoing support to ensure successful implementation."
                  },
                  {
                    question: "Do you provide 360-degree feedback systems?",
                    answer: "Yes, we design and implement comprehensive 360-degree feedback systems that gather input from peers, managers, subordinates, and self-assessments. We provide training, anonymous surveys, and detailed reporting to support employee development."
                  },
                  {
                    question: "How often should performance reviews be conducted?",
                    answer: "We recommend quarterly performance check-ins with annual comprehensive reviews. We also implement continuous feedback systems and real-time performance tracking to ensure ongoing development and goal alignment throughout the year."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-gray-900">{faq.question}</span>
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Other Services Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Explore Our Other Services
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                Comprehensive HR solutions to support your business growth
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherServices.map((service) => (
                <Link
                  key={service.id}
                  to={service.link}
                  className="group bg-gray-50 rounded-2xl p-6 md:p-8 hover:bg-gradient-to-r hover:from-green-50 hover:to-teal-50 transition-all duration-300 border border-gray-200 hover:border-green-200"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700 transition-colors">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-green-900 via-emerald-900 to-teal-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Performance Management?
            </h2>
            <p className="text-lg md:text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Let's work together to create a high-performance culture that drives results 
              and employee engagement. Get started with a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBrochureDownload}
                className="bg-white text-green-900 font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5" />
                Download Brochure
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl border border-white/20 flex items-center justify-center gap-2 transition-all duration-300"
              >
                <Calendar className="w-5 h-5" />
                Book Free Consultation
              </motion.button>
            </div>
          </div>
        </section>

        <HireWithPrachiFooter />
        <GPT4oMiniChatbot />
      </main>

      {/* Brochure Download Modal */}
      {showBrochureModal && (
        <BrochureDownloadModal
          isOpen={showBrochureModal}
          onClose={() => setShowBrochureModal(false)}
          serviceName="Performance Management Services"
          brochureUrl="/downloads/performance-management-brochure.pdf"
        />
      )}
    </>
  );
}