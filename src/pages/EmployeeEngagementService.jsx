import React, { useState } from 'react';
import ResponsiveImage from '../components/ui/ResponsiveImage';
import SEOOptimizer from '../components/SEOOptimizer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HireWithPrachiTopBar from '../components/hirable/HirableTopBar';
import HireWithPrachiHeader from '../components/hirable/HirableHeader';
import HireWithPrachiFooter from '../components/hirable/HirableFooter';
import GPT4oMiniChatbot from '../components/GPT4oMiniChatbot';
import ScrollProgressBar from '../components/ScrollProgressBar';
import BrochureDownloadModal from '../components/BrochureDownloadModal';
import { CheckCircle, Users, Shield, Zap, Award, MessageSquare, BarChart2, Search, Phone, Mail, ChevronDown, ChevronUp, Download, Calendar, MessageCircle, Heart, Smile, Users as TeamIcon } from 'lucide-react';

export default function EmployeeEngagementService() {
  // SEO Data for Employee Engagement Service
  const seoData = {
    title: "Employee Engagement Services - Boost Team Performance",
    description: "Employee engagement services to boost team performance and retention. Engagement strategies, team building, and performance management.",
    keywords: "employee engagement, team performance, retention, team building, performance management",
    pageType: "service",
    pageData: {
      title: "Employee Engagement Services",
      description: "Boost team performance and retention",
      image: "https://hirewithprachi.com/assets/images/employee-engagement-1200x630.jpg"
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
    "name": "Employee Engagement & Culture Services",
    "description": "Build a thriving workplace culture that retains top talent. Employee satisfaction surveys, culture assessment, recognition programs, and team building initiatives.",
    "provider": {
      "@type": "ProfessionalService",
      "name": "Hire With Prachi",
      "founder": {
        "@type": "Person",
        "name": "Prachi Shrivastava",
        "jobTitle": "Virtual HR Consultant"
      }
    },
    "serviceType": "Employee Engagement & Culture",
    "areaServed": ["India", "United States", "United Kingdom", "Canada", "Australia"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Employee Engagement Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Employee Satisfaction Surveys",
            "description": "Comprehensive surveys to measure and improve employee satisfaction"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Culture Assessment & Strategy",
            "description": "Assess and develop workplace culture strategies"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Recognition Programs",
            "description": "Design and implement employee recognition programs"
          }
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
          "name": "Lisa Rodriguez"
        },
        "reviewBody": "Prachi's employee engagement programs transformed our workplace culture. Employee satisfaction increased by 60% and turnover reduced by 40%."
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const otherServices = [
    {
      id: 'hr-compliance',
      title: 'HR Compliance & Legal Services',
      description: 'Comprehensive compliance management to keep your business legally protected',
      icon: '⚖️',
      link: '/services/hr-compliance'
    },
    {
      id: 'recruitment',
      title: 'Strategic Recruitment & Hiring',
      description: 'End-to-end recruitment solutions to build your dream team',
      icon: '🎯',
      link: '/services/recruitment-hiring'
    },
    {
      id: 'performance-management',
      title: 'Performance Management Systems',
      description: 'Data-driven performance frameworks to maximize productivity',
      icon: '📊',
      link: '/services/performance-management'
    },
    {
      id: 'hr-automation',
      title: 'HR Technology & Automation',
      description: 'Streamline HR processes with cutting-edge technology solutions',
      icon: '🤖',
      link: '/services/hr-technology'
    },
    {
      id: 'startup-hr',
      title: 'Startup HR Foundation',
      description: 'Complete HR setup for startups from day one',
      icon: '🚀',
      link: '/services/startup-hr'
    }
  ];

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
        canonical="https://hirewithprachi.com/services/employee-engagement"
      />

      <main className="min-h-screen bg-white" role="main">
        <ScrollProgressBar />
        <HireWithPrachiTopBar />
        <HireWithPrachiHeader />
        
        {/* Enhanced Page Header Section - Mobile Optimized */}
        <div className="bg-gradient-to-r from-pink-900 via-rose-900 to-red-900 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 md:w-80 md:h-80 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
            {/* Breadcrumb - Mobile Optimized */}
            <nav className="mb-6 md:mb-8">
              <ol className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm flex-wrap">
                <li>
                  <Link to="/" className="text-pink-200 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-pink-300">/</li>
                <li>
                  <Link to="/services" className="text-pink-200 hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li className="text-pink-300">/</li>
                <li className="text-white font-medium truncate">Employee Engagement & Culture</li>
              </ol>
            </nav>
            
            {/* Service Title with Enhanced Design - Mobile Optimized */}
            <div className="max-w-5xl">
              <div className="inline-flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full border border-white/20 mb-4 md:mb-6">
                <Heart className="w-4 h-4 md:w-5 md:h-5 text-pink-200" />
                <span className="text-pink-200 text-xs md:text-sm font-semibold uppercase tracking-widest">Workplace Culture</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                Employee Engagement & 
                <span className="bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent"> Culture</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-pink-100 leading-relaxed mb-6 md:mb-8 max-w-4xl">
                Build a thriving workplace culture that retains top talent. Transform your organization with proven employee engagement strategies and culture-building initiatives that drive satisfaction and productivity.
              </p>
              
              {/* Key Benefits - Mobile Optimized */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
                  <Heart className="w-6 h-6 md:w-8 md:h-8 text-pink-300 mb-2" />
                  <h3 className="font-semibold text-white mb-1 text-sm md:text-base">Culture Focus</h3>
                  <p className="text-pink-200 text-xs md:text-sm">Build positive workplace culture</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
                  <Smile className="w-6 h-6 md:w-8 md:h-8 text-pink-300 mb-2" />
                  <h3 className="font-semibold text-white mb-1 text-sm md:text-base">Employee Happiness</h3>
                  <p className="text-pink-200 text-xs md:text-sm">60% satisfaction increase</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20 sm:col-span-2 md:col-span-1">
                  <Award className="w-6 h-6 md:w-8 md:h-8 text-pink-300 mb-2" />
                  <h3 className="font-semibold text-white mb-1 text-sm md:text-base">Retention Focus</h3>
                  <p className="text-pink-200 text-xs md:text-sm">40% reduced turnover</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8 md:space-y-12">
              {/* Hero Image Section - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="aspect-video relative overflow-hidden">
                  <ResponsiveImage src="/assets/images/services/employee-engagement-service.webp" alt="Employee Engagement Services - Workplace culture and team building solutions for Indian businesses by Prachi Shrivastava" className="w-full h-full object-cover" />
                </div>
              </motion.div>

              {/* Service Overview Section - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Service Overview</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
                  <div>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4 md:mb-6">
                      Build a thriving workplace culture that retains top talent. Employee satisfaction surveys, culture assessment, recognition programs, and team building initiatives to create a positive and motivated workforce.
                    </p>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-start gap-2 md:gap-3">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-pink-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base">Employee Satisfaction Surveys</span>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-pink-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base">Culture Assessment & Strategy</span>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-pink-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base">Recognition Programs</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Key Highlights</h3>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-center gap-2 md:gap-3">
                        <Award className="w-4 h-4 md:w-5 md:h-5 text-pink-600" />
                        <span className="text-gray-700 text-sm md:text-base">40% Reduced Turnover</span>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3">
                        <Award className="w-4 h-4 md:w-5 md:h-5 text-pink-600" />
                        <span className="text-gray-700 text-sm md:text-base">₹20K Per Month</span>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3">
                        <Award className="w-4 h-4 md:w-5 md:h-5 text-pink-600" />
                        <span className="text-gray-700 text-sm md:text-base">60% Satisfaction Increase</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Why Choose Us Section - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">Why Choose Employee Engagement Services?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {[
                    { icon: Heart, title: 'Culture Focus', desc: 'Build positive workplace culture' },
                    { icon: Smile, title: 'Employee Happiness', desc: 'Increase satisfaction by 60%' },
                    { icon: Zap, title: 'Retention Focus', desc: 'Reduce turnover by 40%' },
                    { icon: Award, title: 'Proven Results', desc: 'Data-driven strategies' },
                    { icon: MessageSquare, title: '24/7 Support', desc: 'Round-the-clock assistance' },
                    { icon: BarChart2, title: 'Expert Guidance', desc: '8+ years of experience' }
                  ].map((item, index) => (
                    <div key={index} className="text-center p-4 md:p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                        <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-xs md:text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Supporting Imagery Section - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
              >
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl md:rounded-2xl p-6 md:p-8 text-center">
                  <div className="text-4xl md:text-6xl mb-3 md:mb-4">📊</div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Data-Driven Approach</h3>
                  <p className="text-gray-600 text-sm md:text-base">We use analytics and insights to deliver optimal results for your business.</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl md:rounded-2xl p-6 md:p-8 text-center">
                  <div className="text-4xl md:text-6xl mb-3 md:mb-4">🎯</div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Customized Solutions</h3>
                  <p className="text-gray-600 text-sm md:text-base">Tailored strategies that align with your specific business needs and goals.</p>
                </div>
              </motion.div>

              {/* Service-Specific Description - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Employee Engagement & Culture Solutions</h2>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-6 md:mb-8">
                  Our employee engagement services focus on creating a positive workplace culture that motivates employees, reduces turnover, and drives productivity. We help organizations build environments where employees feel valued, engaged, and committed to company success.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">What's Included</h3>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-start gap-2 md:gap-3">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-pink-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base">Employee Satisfaction Surveys</span>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-pink-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base">Culture Assessment & Strategy</span>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-pink-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base">Recognition Programs</span>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-pink-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base">Team Building Initiatives</span>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-pink-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base">Wellness Programs</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Our Process</h3>
                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-pink-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold flex-shrink-0">1</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm md:text-base">Culture Assessment</h4>
                          <p className="text-gray-600 text-xs md:text-sm">Evaluate current workplace culture and engagement levels</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-pink-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold flex-shrink-0">2</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm md:text-base">Strategy Development</h4>
                          <p className="text-gray-600 text-xs md:text-sm">Create customized engagement strategies</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-pink-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold flex-shrink-0">3</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm md:text-base">Program Implementation</h4>
                          <p className="text-gray-600 text-xs md:text-sm">Roll out engagement programs and initiatives</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-pink-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold flex-shrink-0">4</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm md:text-base">Monitoring & Optimization</h4>
                          <p className="text-gray-600 text-xs md:text-sm">Track results and continuously improve programs</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced FAQ Accordion Section with 6 FAQs - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Frequently Asked Questions</h2>
                <div className="space-y-3 md:space-y-4">
                  {[
                    { q: 'What employee engagement services do you provide?', a: 'We provide comprehensive employee engagement services including satisfaction surveys, culture assessment, recognition programs, team building activities, wellness programs, and ongoing engagement monitoring to create a positive workplace culture.' },
                    { q: 'How do you measure employee engagement?', a: 'We use scientifically validated surveys, pulse checks, focus groups, and analytics tools to measure engagement levels, satisfaction scores, and identify areas for improvement in your workplace culture.' },
                    { q: 'How much do employee engagement services cost?', a: 'Our employee engagement services start at ₹20,000 per month with flexible pricing based on organization size and engagement needs. We offer comprehensive packages to improve workplace culture and reduce turnover.' },
                    { q: 'Do you provide team building activities?', a: 'Yes, we design and facilitate virtual and in-person team building activities, games, and contests to boost morale, collaboration, and team spirit in your organization.' },
                    { q: 'How do you improve workplace culture?', a: 'We assess your current culture, identify improvement areas, and implement strategies including recognition programs, communication frameworks, wellness initiatives, and culture-building activities.' },
                    { q: 'What results can I expect?', a: 'Our clients typically see 60% increase in employee satisfaction, 40% reduction in turnover, improved productivity, and stronger team collaboration within 6-12 months of implementing our engagement programs.' }
                  ].map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full px-4 md:px-6 py-3 md:py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                      >
                        <span className="font-semibold text-gray-900 text-sm md:text-base pr-2">{faq.q}</span>
                        {openFaq === index ? (
                          <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-gray-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-gray-600 flex-shrink-0" />
                        )}
                      </button>
                      {openFaq === index && (
                        <div className="px-4 md:px-6 py-3 md:py-4 bg-white">
                          <p className="text-gray-700 text-sm md:text-base">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar Section - Mobile Optimized */}
            <div className="space-y-4 md:space-y-6">
              {/* Service List */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6"
              >
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Our Services</h3>
                <div className="space-y-2 md:space-y-3">
                  {otherServices.map((service) => (
                    <Link
                      key={service.id}
                      to={service.link}
                      className={`block p-2 md:p-3 rounded-lg transition-colors ${
                        service.id === 'employee-engagement'
                          ? 'bg-pink-50 text-pink-700 border border-pink-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 md:gap-3">
                        <span className="text-xl md:text-2xl">{service.icon}</span>
                        <div>
                          <h4 className="font-semibold text-xs md:text-sm">{service.title}</h4>
                          <p className="text-xs text-gray-500">{service.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6"
              >
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Search Services</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for services..."
                    className="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
              </motion.div>

              {/* Download Brochure */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-pink-600 to-rose-600 rounded-xl md:rounded-2xl p-4 md:p-6 text-white"
              >
                <div className="text-center">
                  <Download className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 md:mb-4" />
                  <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Download Brochure</h3>
                  <p className="text-pink-100 text-sm md:text-base mb-3 md:mb-4">Get detailed information about our Employee Engagement services</p>
                  <button 
                    onClick={handleBrochureDownload}
                    className="w-full bg-white text-pink-600 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base"
                  >
                    Download PDF
                  </button>
                </div>
              </motion.div>

              {/* Contact Widget */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6"
              >
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Need Help?</h3>
                <div className="space-y-3 md:space-y-4">
                  <a
                    href="tel:+918740889927"
                    className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-pink-50 text-pink-700 rounded-lg hover:bg-pink-100 transition-colors"
                  >
                    <Phone className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="font-semibold text-sm md:text-base">Call Us</span>
                  </a>
                  <a
                    href="https://wa.me/918740889927"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-pink-50 text-pink-700 rounded-lg hover:bg-pink-100 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="font-semibold text-sm md:text-base">WhatsApp</span>
                  </a>
                  <a
                    href="mailto:info@hirewithprachi.com"
                    className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-pink-50 text-pink-700 rounded-lg hover:bg-pink-100 transition-colors"
                  >
                    <Mail className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="font-semibold text-sm md:text-base">Email Us</span>
                  </a>
                </div>
              </motion.div>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl md:rounded-2xl p-4 md:p-6 text-white"
              >
                <div className="text-center">
                  <Calendar className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 md:mb-4" />
                  <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Talk to our Experts</h3>
                  <p className="text-purple-100 text-sm md:text-base mb-3 md:mb-4">Get a free engagement assessment and personalized quote</p>
                  <a
                    href="/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-white text-purple-600 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base"
                  >
                    Book Free Consultation
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <HireWithPrachiFooter />
        <GPT4oMiniChatbot />
        
        {/* Brochure Download Modal */}
        <BrochureDownloadModal
          isOpen={showBrochureModal}
          onClose={() => setShowBrochureModal(false)}
          serviceName="Employee Engagement & Culture"
          brochureUrl="/downloads/employee-engagement-brochure.pdf"
        />
      </main>
    </>
  );
} 