import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HireWithPrachiTopBar from '../components/hirable/HirableTopBar';
import HireWithPrachiHeader from '../components/hirable/HirableHeader';
import HireWithPrachiFooter from '../components/hirable/HirableFooter';
import AIChatbotWidget from '../components/AIChatbotWidget';
import ScrollProgressBar from '../components/ScrollProgressBar';
import Breadcrumbs from '../components/Breadcrumbs';
import ConsultationModal from '../components/LeadCapturePreview';
import { useState } from 'react';

export default function HRComplianceService() {
  const [showConsultation, setShowConsultation] = useState(false);
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
        <meta name="description" content="Expert HR compliance services including labor law audits, employment contracts, policy development, and legal risk assessment. Stay compliant with Indian labor laws. Get free consultation today!" />
        <meta name="keywords" content="HR compliance services, labor law compliance, employment contracts, HR policy development, legal risk assessment, Indian labor laws, HR compliance audit, employment law, workplace compliance, HR legal services, compliance management, statutory compliance" />
        <meta name="author" content="Prachi Shrivastava" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hirewithprachi.com/services/hr-compliance" />
        <meta property="og:title" content="HR Compliance & Legal Services | Expert HR Compliance Management India" />
        <meta property="og:description" content="Expert HR compliance services including labor law audits, employment contracts, policy development, and legal risk assessment. Stay compliant with Indian labor laws." />
        <meta property="og:image" content="https://hirewithprachi.com/hr-compliance-og-image.png" />
        <meta property="og:site_name" content="Hire With Prachi" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://hirewithprachi.com/services/hr-compliance" />
        <meta property="twitter:title" content="HR Compliance & Legal Services | Expert HR Compliance Management India" />
        <meta property="twitter:description" content="Expert HR compliance services including labor law audits, employment contracts, policy development, and legal risk assessment." />
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
                  "text": "We provide comprehensive HR compliance services including labor law compliance audits, employment contract drafting, policy development & updates, legal risk assessment, compliance training programs, and audit support & documentation."
                }
              },
              {
                "@type": "Question",
                "name": "How do you ensure compliance with Indian labor laws?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We stay updated with all Indian labor laws including PF, ESI, TDS, Gratuity, and workplace safety requirements. Our team conducts comprehensive compliance audits and provides expert guidance to ensure your business meets all statutory obligations."
                }
              },
              {
                "@type": "Question",
                "name": "What is included in HR compliance audit?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our HR compliance audit includes reviewing employment contracts, HR policies, statutory compliance (PF, ESI, TDS), workplace safety, employee documentation, and identifying potential legal risks with actionable recommendations."
                }
              },
              {
                "@type": "Question",
                "name": "How much do HR compliance services cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our HR compliance services start at ₹25,000/month and can save you ₹5L+ annually by preventing legal issues. We offer flexible pricing plans tailored to your business size and compliance needs."
                }
              },
              {
                "@type": "Question",
                "name": "Do you provide employment contract drafting?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we specialize in drafting legally sound employment contracts, offer letters, appointment letters, and non-disclosure agreements (NDAs) that comply with Indian labor laws and protect your business interests."
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
                { label: 'Services', href: '/services' },
                { label: 'HR Compliance & Legal Services', href: '/services/hr-compliance', current: true }
              ]}
            />
          </div>
        </section>
        
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-8 pb-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-teal-50 to-indigo-50"></div>
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-200 to-teal-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-teal-200 to-indigo-200 rounded-full blur-3xl"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-sm font-semibold uppercase tracking-wider">Legal Protection</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 leading-tight">
                HR Compliance & Legal Services
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Comprehensive compliance management to keep your business legally protected. Expert guidance on Indian labor laws, employment contracts, and statutory compliance.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Get Free Compliance Audit
                </button>
                <button className="px-8 py-4 border-2 border-blue-500 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300">
                  View Pricing Plans
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">100%</div>
                  <div className="text-sm text-gray-600">Compliance Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">₹5L+</div>
                  <div className="text-sm text-gray-600">Annual Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-gray-600">Audits Completed</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What We Provide Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                What We Provide
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive HR compliance services designed to protect your business and ensure full adherence to Indian labor laws
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '⚖️',
                  title: 'Labor Law Compliance Audits',
                  description: 'Comprehensive audits to ensure compliance with all Indian labor laws including PF, ESI, TDS, and workplace safety requirements.',
                  features: ['PF & ESI Compliance', 'TDS Management', 'Workplace Safety', 'Legal Risk Assessment']
                },
                {
                  icon: '📄',
                  title: 'Employment Contract Drafting',
                  description: 'Legally sound employment contracts, offer letters, appointment letters, and non-disclosure agreements.',
                  features: ['Offer Letters', 'Appointment Letters', 'NDAs', 'Legal Compliance']
                },
                {
                  icon: '📋',
                  title: 'Policy Development & Updates',
                  description: 'Custom HR policies covering leave, WFH, code of conduct, and other workplace regulations.',
                  features: ['Leave Policies', 'WFH Guidelines', 'Code of Conduct', 'Regular Updates']
                },
                {
                  icon: '🛡️',
                  title: 'Legal Risk Assessment',
                  description: 'Identify potential legal risks and provide actionable recommendations to mitigate compliance issues.',
                  features: ['Risk Identification', 'Mitigation Strategies', 'Legal Guidance', 'Preventive Measures']
                },
                {
                  icon: '🎓',
                  title: 'Compliance Training Programs',
                  description: 'Training sessions for HR teams and management on labor laws and compliance requirements.',
                  features: ['HR Training', 'Management Workshops', 'Legal Updates', 'Best Practices']
                },
                {
                  icon: '📊',
                  title: 'Audit Support & Documentation',
                  description: 'Complete documentation support and audit assistance for statutory compliance requirements.',
                  features: ['Documentation', 'Audit Support', 'Record Keeping', 'Compliance Reports']
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-3xl border border-blue-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <span className="text-blue-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Benefits of Our HR Compliance Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Protect your business from legal risks and ensure smooth operations with our expert compliance services
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '💰',
                  title: 'Cost Savings',
                  description: 'Save ₹5L+ annually by preventing legal issues and avoiding costly penalties.',
                  benefit: 'Prevent expensive legal battles'
                },
                {
                  icon: '🛡️',
                  title: 'Legal Protection',
                  description: 'Comprehensive protection against labor law violations and legal disputes.',
                  benefit: 'Stay compliant with all laws'
                },
                {
                  icon: '⚡',
                  title: 'Peace of Mind',
                  description: 'Focus on your business while we handle all compliance requirements.',
                  benefit: 'Reduce stress and worry'
                },
                {
                  icon: '📈',
                  title: 'Business Growth',
                  description: 'Compliance enables smooth business operations and sustainable growth.',
                  benefit: 'Scale without legal hurdles'
                },
                {
                  icon: '🎯',
                  title: 'Expert Guidance',
                  description: 'Access to 8+ years of HR compliance expertise and legal knowledge.',
                  benefit: 'Professional expertise'
                },
                {
                  icon: '🔄',
                  title: 'Continuous Support',
                  description: 'Ongoing compliance monitoring and regular updates on legal changes.',
                  benefit: 'Always stay updated'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 mb-4">{benefit.description}</p>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <span className="text-blue-700 font-semibold text-sm">{benefit.benefit}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Compliance Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A systematic approach to ensure your business stays compliant with all legal requirements
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Initial Assessment',
                  description: 'Comprehensive review of your current HR practices and compliance status'
                },
                {
                  step: '02',
                  title: 'Gap Analysis',
                  description: 'Identify compliance gaps and potential legal risks in your HR processes'
                },
                {
                  step: '03',
                  title: 'Implementation',
                  description: 'Develop and implement compliant policies, contracts, and procedures'
                },
                {
                  step: '04',
                  title: 'Ongoing Support',
                  description: 'Continuous monitoring and updates to maintain compliance standards'
                }
              ].map((process, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{process.title}</h3>
                  <p className="text-gray-600">{process.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Classy CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-teal-600 to-indigo-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-8 py-4 rounded-full border border-white/30 mb-8">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-bold uppercase tracking-widest">Get Started Today</span>
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </div>

              <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Ready to Protect Your <br />
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Business?
                </span>
              </h2>

              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Join 500+ businesses that trust us with their HR compliance. Get your free compliance audit today.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                  { icon: '💰', text: 'Save ₹5L+ annually' },
                  { icon: '⚡', text: 'Get audit in 48 hours' },
                  { icon: '🛡️', text: '100% compliance guarantee' }
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

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span>Get Free Compliance Audit</span>
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.button>
                
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold text-lg rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => setShowConsultation(true)}
                >
                  <span>Book Free Consultation</span>
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </motion.button>
              </div>

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

        {/* Other Services Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Explore Our Other Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our comprehensive range of HR services designed to transform your business operations
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={service.link}>
                    <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                      <div className="text-4xl mb-4">{service.icon}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                        Learn More
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <HireWithPrachiFooter />
        <AIChatbotWidget />
        <ConsultationModal open={showConsultation} onClose={() => setShowConsultation(false)} />
      </main>
    </>
  );
} 