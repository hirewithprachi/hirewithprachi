import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HireWithPrachiTopBar from '../components/hirable/HirableTopBar';
import HireWithPrachiHeader from '../components/hirable/HirableHeader';
import HireWithPrachiFooter from '../components/hirable/HirableFooter';
import AIChatbotWidget from '../components/AIChatbotWidget';
import ScrollProgressBar from '../components/ScrollProgressBar';
import BrochureDownloadModal from '../components/BrochureDownloadModal';
import { CheckCircle, Users, Shield, Zap, Award, MessageSquare, BarChart2, Search, Phone, Mail, ChevronDown, ChevronUp, Download, Calendar, MessageCircle, FileText, Gavel, AlertTriangle } from 'lucide-react';

export default function HRComplianceService() {
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
    "name": "HR Compliance & Legal Services",
    "description": "Comprehensive HR compliance management including labor law audits, employment contracts, policy development, and legal risk assessment. Stay compliant with Indian labor laws.",
    "provider": {
      "@type": "ProfessionalService",
      "name": "Hire With Prachi",
      "founder": {
        "@type": "Person",
        "name": "Prachi Shrivastava",
        "jobTitle": "Virtual HR Consultant"
      }
    },
    "serviceType": "HR Compliance Management",
    "areaServed": ["India", "United States", "United Kingdom", "Canada", "Australia"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "HR Compliance Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Labor Law Compliance Audits",
            "description": "Comprehensive audits to ensure compliance with all Indian labor laws"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Employment Contract Drafting",
            "description": "Legally sound employment contracts and agreements"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Policy Development & Updates",
            "description": "HR policy development and regular updates"
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
          "name": "Sarah Johnson"
        },
        "reviewBody": "Prachi's HR compliance services saved us from potential legal issues. Her expertise in labor laws is exceptional."
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
      <Helmet>
        {/* Primary Meta Tags */}
        <title>HR Compliance & Legal Services | Expert HR Compliance Management India</title>
        <meta name="title" content="HR Compliance & Legal Services | Expert HR Compliance Management India" />
        <meta name="description" content="Comprehensive HR compliance management including labor law audits, employment contracts, policy development, and legal risk assessment. Stay compliant with Indian labor laws and avoid legal issues." />
        <meta name="keywords" content="HR compliance, labor law compliance, employment contracts, HR policies, legal risk assessment, Indian labor laws, HR audit, compliance management, employment law, workplace compliance, HR legal services, labor law consultant, HR compliance audit, employment contract drafting, HR policy development" />
        <meta name="author" content="Prachi Shrivastava" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hirewithprachi.com/services/hr-compliance" />
        <meta property="og:title" content="HR Compliance & Legal Services | Expert HR Compliance Management India" />
        <meta property="og:description" content="Comprehensive HR compliance management including labor law audits, employment contracts, policy development, and legal risk assessment." />
        <meta property="og:image" content="https://hirewithprachi.com/hr-compliance-og-image.png" />
        <meta property="og:site_name" content="Hire With Prachi" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://hirewithprachi.com/services/hr-compliance" />
        <meta property="twitter:title" content="HR Compliance & Legal Services | Expert HR Compliance Management India" />
        <meta property="twitter:description" content="Comprehensive HR compliance management including labor law audits, employment contracts, policy development, and legal risk assessment." />
        <meta property="twitter:image" content="https://hirewithprachi.com/hr-compliance-twitter-image.png" />
        <meta property="twitter:creator" content="@prachi_hr" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="HR Compliance Services" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://hirewithprachi.com/services/hr-compliance" />
        
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
                "name": "What HR compliance services do you provide?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We provide comprehensive HR compliance services including labor law audits, employment contract drafting, policy development, legal risk assessment, compliance training, and ongoing compliance monitoring to ensure your organization meets all legal requirements."
                }
              },
              {
                "@type": "Question",
                "name": "How do you ensure compliance with Indian labor laws?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We conduct thorough audits of your current HR practices, identify compliance gaps, provide legal documentation, and offer ongoing monitoring to ensure adherence to all Indian labor laws and regulations including the Industrial Disputes Act, Factories Act, and Minimum Wages Act."
                }
              },
              {
                "@type": "Question",
                "name": "How much do HR compliance services cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our HR compliance services start at ₹25,000 per month with flexible pricing based on organization size and compliance requirements. We offer comprehensive packages to ensure complete legal protection and avoid costly legal disputes."
                }
              },
              {
                "@type": "Question",
                "name": "Do you provide employment contract templates?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we draft legally compliant employment contracts, offer letters, and HR policies tailored to your organization\'s specific needs and industry requirements. All documents are reviewed by legal experts to ensure compliance."
                }
              },
              {
                "@type": "Question",
                "name": "How often should HR compliance audits be conducted?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We recommend annual compliance audits, with quarterly reviews for high-risk areas. We also provide ongoing monitoring and updates as laws change to ensure your organization remains compliant at all times."
                }
              },
              {
                "@type": "Question",
                "name": "What happens if we\'re not compliant?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We identify compliance gaps and provide immediate action plans to rectify issues. Our team ensures you meet all legal requirements and avoid potential penalties or legal disputes through proactive compliance management."
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
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 md:w-80 md:h-80 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
            {/* Breadcrumb - Mobile Optimized */}
            <nav className="mb-6 md:mb-8">
              <ol className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm flex-wrap">
                <li>
                  <Link to="/" className="text-blue-200 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-blue-300">/</li>
                <li>
                  <Link to="/services" className="text-blue-200 hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li className="text-blue-300">/</li>
                <li className="text-white font-medium truncate">HR Compliance & Legal Services</li>
              </ol>
            </nav>
            
            {/* Service Title with Enhanced Design - Mobile Optimized */}
            <div className="max-w-5xl">
              <div className="inline-flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full border border-white/20 mb-4 md:mb-6">
                <Gavel className="w-4 h-4 md:w-5 md:h-5 text-blue-200" />
                <span className="text-blue-200 text-xs md:text-sm font-semibold uppercase tracking-widest">Legal Protection</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                HR Compliance & 
                <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent"> Legal Services</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 leading-relaxed mb-6 md:mb-8 max-w-4xl">
                Comprehensive HR compliance management to keep your business legally protected. Expert guidance on labor laws, employment contracts, and policy development to ensure complete legal compliance.
              </p>
              
              {/* Key Benefits - Mobile Optimized */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
                  <Shield className="w-6 h-6 md:w-8 md:h-8 text-blue-300 mb-2" />
                  <h3 className="font-semibold text-white mb-1 text-sm md:text-base">Legal Protection</h3>
                  <p className="text-blue-200 text-xs md:text-sm">Complete compliance with Indian labor laws</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
                  <FileText className="w-6 h-6 md:w-8 md:h-8 text-blue-300 mb-2" />
                  <h3 className="font-semibold text-white mb-1 text-sm md:text-base">Expert Documentation</h3>
                  <p className="text-blue-200 text-xs md:text-sm">Legally sound contracts and policies</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20 sm:col-span-2 md:col-span-1">
                  <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-blue-300 mb-2" />
                  <h3 className="font-semibold text-white mb-1 text-sm md:text-base">Risk Mitigation</h3>
                  <p className="text-blue-200 text-xs md:text-sm">Identify and prevent legal issues</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8 md:space-y-12">
                            {/* Hero Image Section with Real Image - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src="/assets/images/services/hr-compliance-service.webp" 
                    alt="HR Compliance Services - Expert labor law compliance and audit services for Indian businesses by Prachi Shrivastava"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

                            {/* Enhanced Service Overview Section with SEO Content - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Comprehensive HR Compliance Management</h2>
                <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-start">
                  <div>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4 md:mb-6">
                      Our comprehensive HR compliance and legal services ensure your organization operates within the framework of all applicable labor laws and regulations. We provide expert guidance on employment law compliance, contract drafting, policy development, and legal risk assessment to protect your business from potential legal disputes and regulatory penalties.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4 md:mb-6">
                      With our deep understanding of Indian labor laws, including the Industrial Disputes Act, Factories Act, Minimum Wages Act, and other relevant legislation, we help organizations of all sizes maintain compliance while building robust HR frameworks that support business growth and employee satisfaction.
                    </p>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-start gap-2 md:gap-3">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base">Labor Law Compliance Audits & Assessments</span>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base">Employment Contract Drafting & Review</span>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base">HR Policy Development & Implementation</span>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base">Legal Risk Assessment & Mitigation</span>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base">Compliance Training & Workshops</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Key Highlights</h3>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-center gap-2 md:gap-3">
                        <Award className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                        <span className="text-gray-700 text-sm md:text-base">100% Legal Compliance</span>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3">
                        <Award className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                        <span className="text-gray-700 text-sm md:text-base">₹25K Per Month</span>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3">
                        <Award className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                        <span className="text-gray-700 text-sm md:text-base">Zero Legal Disputes</span>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3">
                        <Award className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                        <span className="text-gray-700 text-sm md:text-base">Expert Legal Team</span>
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
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">Why Choose HR Compliance Services?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {[
                    { icon: Gavel, title: 'Legal Expertise', desc: 'Deep knowledge of labor laws' },
                    { icon: Shield, title: 'Risk Protection', desc: 'Prevent legal disputes' },
                    { icon: FileText, title: 'Documentation', desc: 'Legally sound contracts' },
                    { icon: AlertTriangle, title: 'Compliance Audit', desc: 'Regular legal assessments' },
                    { icon: MessageSquare, title: 'Expert Support', desc: 'Round-the-clock assistance' },
                    { icon: BarChart2, title: 'Proven Results', desc: '8+ years of experience' }
                  ].map((item, index) => (
                    <div key={index} className="text-center p-4 md:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
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
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl md:rounded-2xl p-6 md:p-8 text-center">
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
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Comprehensive HR Compliance Solutions</h2>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-6 md:mb-8">
                  Our HR compliance services are designed to protect your business from legal risks while ensuring you meet all regulatory requirements. We provide comprehensive solutions that cover every aspect of HR compliance, from initial audits to ongoing monitoring and support.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">What's Included</h3>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-start gap-2 md:gap-3">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base">Complete Labor Law Compliance Audit</span>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base">Employment Contract Templates</span>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base">HR Policy Development</span>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base">Legal Risk Assessment</span>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base">Compliance Training Programs</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Our Process</h3>
                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold flex-shrink-0">1</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm md:text-base">Initial Assessment</h4>
                          <p className="text-gray-600 text-xs md:text-sm">Comprehensive audit of current HR practices and compliance status</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold flex-shrink-0">2</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm md:text-base">Gap Analysis</h4>
                          <p className="text-gray-600 text-xs md:text-sm">Identify compliance gaps and legal risks</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold flex-shrink-0">3</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm md:text-base">Solution Development</h4>
                          <p className="text-gray-600 text-xs md:text-sm">Create customized compliance solutions</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold flex-shrink-0">4</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm md:text-base">Implementation</h4>
                          <p className="text-gray-600 text-xs md:text-sm">Roll out compliance programs and training</p>
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
                    { q: 'What HR compliance services do you provide?', a: 'We provide comprehensive HR compliance services including labor law audits, employment contract drafting, policy development, legal risk assessment, compliance training, and ongoing compliance monitoring to ensure your organization meets all legal requirements.' },
                    { q: 'How do you ensure compliance with Indian labor laws?', a: 'We conduct thorough audits of your current HR practices, identify compliance gaps, provide legal documentation, and offer ongoing monitoring to ensure adherence to all Indian labor laws and regulations including the Industrial Disputes Act, Factories Act, and Minimum Wages Act.' },
                    { q: 'How much do HR compliance services cost?', a: 'Our HR compliance services start at ₹25,000 per month with flexible pricing based on organization size and compliance requirements. We offer comprehensive packages to ensure complete legal protection and avoid costly legal disputes.' },
                    { q: 'Do you provide employment contract templates?', a: 'Yes, we draft legally compliant employment contracts, offer letters, and HR policies tailored to your organization\'s specific needs and industry requirements. All documents are reviewed by legal experts to ensure compliance.' },
                    { q: 'How often should HR compliance audits be conducted?', a: 'We recommend annual compliance audits, with quarterly reviews for high-risk areas. We also provide ongoing monitoring and updates as laws change to ensure your organization remains compliant at all times.' },
                    { q: 'What happens if we\'re not compliant?', a: 'We identify compliance gaps and provide immediate action plans to rectify issues. Our team ensures you meet all legal requirements and avoid potential penalties or legal disputes through proactive compliance management.' }
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
                        service.id === 'hr-compliance'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
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
                    className="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
              </motion.div>

              {/* Download Brochure with Modal */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl md:rounded-2xl p-4 md:p-6 text-white"
              >
                <div className="text-center">
                  <Download className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 md:mb-4" />
                  <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Download Brochure</h3>
                  <p className="text-blue-100 text-sm md:text-base mb-3 md:mb-4">Get detailed information about our HR Compliance services</p>
                  <button 
                    onClick={handleBrochureDownload}
                    className="w-full bg-white text-blue-600 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base"
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
                    className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Phone className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="font-semibold text-sm md:text-base">Call Us</span>
                  </a>
                  <a
                    href="https://wa.me/918740889927"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="font-semibold text-sm md:text-base">WhatsApp</span>
                  </a>
                  <a
                    href="mailto:info@hirewithprachi.com"
                    className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
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
                  <p className="text-purple-100 text-sm md:text-base mb-3 md:mb-4">Get a free compliance audit and personalized quote</p>
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
        <AIChatbotWidget />
        
        {/* Brochure Download Modal */}
        <BrochureDownloadModal
          isOpen={showBrochureModal}
          onClose={() => setShowBrochureModal(false)}
          serviceName="HR Compliance & Legal Services"
          brochureUrl="/downloads/hr-compliance-brochure.pdf"
        />
      </main>
    </>
  );
} 