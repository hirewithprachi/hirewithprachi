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

export default function RecruitmentService() {
  // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Strategic Recruitment & Hiring Services",
    "description": "End-to-end recruitment solutions including job description optimization, candidate sourcing, interview management, and onboarding programs. Build your dream team efficiently.",
    "provider": {
      "@type": "ProfessionalService",
      "name": "Hire With Prachi",
      "founder": {
        "@type": "Person",
        "name": "Prachi Shrivastava",
        "jobTitle": "Virtual HR Consultant"
      }
    },
    "serviceType": "Recruitment & Hiring",
    "areaServed": ["India", "United States", "United Kingdom", "Canada", "Australia"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Recruitment Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Job Description Optimization",
            "description": "Create compelling job descriptions that attract top talent"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Candidate Sourcing & Screening",
            "description": "Find and screen the best candidates for your positions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Interview Process Design",
            "description": "Design effective interview processes and assessments"
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
          "name": "Michael Chen"
        },
        "reviewBody": "Prachi's recruitment services helped us hire 50% faster with better quality candidates. Highly recommended!"
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
        <title>Strategic Recruitment & Hiring Services | Expert HR Recruitment India</title>
        <meta name="title" content="Strategic Recruitment & Hiring Services | Expert HR Recruitment India" />
        <meta name="description" content="End-to-end recruitment solutions including job description optimization, candidate sourcing, interview management, and onboarding programs. Hire 50% faster with better quality candidates." />
        <meta name="keywords" content="recruitment services, hiring services, job description optimization, candidate sourcing, interview management, HR recruitment, talent acquisition, hiring solutions, recruitment agency, HR hiring services, candidate screening, onboarding programs" />
        <meta name="author" content="Prachi Shrivastava" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hirewithprachi.com/services/recruitment-hiring" />
        <meta property="og:title" content="Strategic Recruitment & Hiring Services | Expert HR Recruitment India" />
        <meta property="og:description" content="End-to-end recruitment solutions including job description optimization, candidate sourcing, interview management, and onboarding programs." />
        <meta property="og:image" content="https://hirewithprachi.com/recruitment-og-image.png" />
        <meta property="og:site_name" content="Hire With Prachi" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://hirewithprachi.com/services/recruitment-hiring" />
        <meta property="twitter:title" content="Strategic Recruitment & Hiring Services | Expert HR Recruitment India" />
        <meta property="twitter:description" content="End-to-end recruitment solutions including job description optimization, candidate sourcing, interview management, and onboarding programs." />
        <meta property="twitter:image" content="https://hirewithprachi.com/recruitment-twitter-image.png" />
        <meta property="twitter:creator" content="@prachi_hr" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Recruitment Services" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://hirewithprachi.com/services/recruitment-hiring" />
        
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
                "name": "What recruitment services do you provide?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We provide end-to-end recruitment solutions including job description optimization, candidate sourcing & screening, interview process design, background verification, onboarding programs, and employer branding."
                }
              },
              {
                "@type": "Question",
                "name": "How much do recruitment services cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our recruitment services can save you 50% in hiring time while improving candidate quality. We offer flexible packages based on your hiring volume. Contact us for a free consultation."
                }
              },
              {
                "@type": "Question",
                "name": "How do you source candidates?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We use multiple channels including job portals (Naukri, LinkedIn, Indeed), professional networks, referrals, and direct sourcing to find the best candidates for your positions."
                }
              },
              {
                "@type": "Question",
                "name": "Do you handle the entire interview process?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we design and manage the entire interview process including scheduling, coordination, assessment design, and feedback collection to ensure a smooth hiring experience."
                }
              },
              {
                "@type": "Question",
                "name": "What industries do you recruit for?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We recruit across all industries including IT, manufacturing, healthcare, finance, e-commerce, and startups. Our expertise spans from entry-level to senior management positions."
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
        <section className="pt-24 pb-8 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="container mx-auto px-4">
            <Breadcrumbs 
              items={[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
                { label: 'Strategic Recruitment & Hiring', href: '/services/recruitment-hiring', current: true }
              ]}
            />
          </div>
        </section>
        
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-8 pb-20">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"></div>
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-full blur-3xl"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-sm font-semibold uppercase tracking-wider">Talent Acquisition</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 leading-tight">
                Strategic Recruitment & Hiring
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                End-to-end recruitment solutions to build your dream team. Hire 50% faster with better quality candidates through our expert recruitment services.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Get Free Recruitment Audit
                </button>
                <button className="px-8 py-4 border-2 border-green-500 text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300">
                  View Pricing Plans
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">50%</div>
                  <div className="text-sm text-gray-600">Faster Hiring</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">₹15K</div>
                  <div className="text-sm text-gray-600">Per Hire</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">95%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
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
                Comprehensive recruitment services designed to find and hire the best talent for your organization
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '📝',
                  title: 'Job Description Optimization',
                  description: 'Create compelling job descriptions that attract top talent and clearly communicate role requirements.',
                  features: ['Role Analysis', 'Market Research', 'Compelling Copy', 'SEO Optimization']
                },
                {
                  icon: '🔍',
                  title: 'Candidate Sourcing & Screening',
                  description: 'Find and screen the best candidates using multiple channels and advanced screening techniques.',
                  features: ['Multi-Channel Sourcing', 'Resume Screening', 'Skill Assessment', 'Background Checks']
                },
                {
                  icon: '🎯',
                  title: 'Interview Process Design',
                  description: 'Design effective interview processes and assessments to evaluate candidate fit.',
                  features: ['Interview Design', 'Assessment Tools', 'Structured Process', 'Feedback Collection']
                },
                {
                  icon: '🛡️',
                  title: 'Background Verification',
                  description: 'Comprehensive background verification to ensure candidate authenticity and reliability.',
                  features: ['Employment Verification', 'Education Checks', 'Reference Checks', 'Criminal Records']
                },
                {
                  icon: '🚀',
                  title: 'Onboarding Programs',
                  description: 'Smooth onboarding programs to ensure new hires integrate quickly and effectively.',
                  features: ['Welcome Kits', 'Orientation Sessions', 'Documentation', 'Integration Support']
                },
                {
                  icon: '🏢',
                  title: 'Employer Branding',
                  description: 'Build a strong employer brand to attract top talent and improve candidate experience.',
                  features: ['Brand Strategy', 'Career Pages', 'Social Media', 'Candidate Experience']
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl border border-green-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <span className="text-green-500 mr-2">✓</span>
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
        <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Benefits of Our Recruitment Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transform your hiring process and build a high-performing team with our expert recruitment services
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '⚡',
                  title: '50% Faster Hiring',
                  description: 'Streamlined processes and expert sourcing reduce time-to-hire by 50%.',
                  benefit: 'Fill positions quickly'
                },
                {
                  icon: '🎯',
                  title: 'Better Quality Candidates',
                  description: 'Advanced screening and assessment ensure higher quality hires.',
                  benefit: 'Reduce turnover rates'
                },
                {
                  icon: '💰',
                  title: 'Cost Effective',
                  description: 'Save on recruitment costs while getting professional expertise.',
                  benefit: 'Lower hiring costs'
                },
                {
                  icon: '🔄',
                  title: 'Scalable Process',
                  description: 'Processes that scale with your business growth and hiring needs.',
                  benefit: 'Grow without limits'
                },
                {
                  icon: '📊',
                  title: 'Data-Driven Insights',
                  description: 'Analytics and reporting to improve your recruitment strategy.',
                  benefit: 'Make informed decisions'
                },
                {
                  icon: '🤝',
                  title: 'Dedicated Support',
                  description: 'Personal attention and ongoing support throughout the hiring process.',
                  benefit: 'Professional partnership'
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
                  <div className="bg-green-50 p-3 rounded-lg">
                    <span className="text-green-700 font-semibold text-sm">{benefit.benefit}</span>
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
                Our Recruitment Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A systematic approach to finding and hiring the best talent for your organization
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Requirement Analysis',
                  description: 'Understand your hiring needs, role requirements, and company culture'
                },
                {
                  step: '02',
                  title: 'Sourcing & Screening',
                  description: 'Source candidates from multiple channels and screen for best fit'
                },
                {
                  step: '03',
                  title: 'Interview & Assessment',
                  description: 'Conduct structured interviews and assessments to evaluate candidates'
                },
                {
                  step: '04',
                  title: 'Onboarding Support',
                  description: 'Support smooth onboarding and integration of selected candidates'
                }
              ].map((process, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
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
        <section className="py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 relative overflow-hidden">
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
                Ready to Build Your <br />
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Dream Team?
                </span>
              </h2>

              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Join 500+ companies that trust us with their recruitment. Hire 50% faster with better quality candidates.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                  { icon: '⚡', text: '50% faster hiring' },
                  { icon: '🎯', text: 'Better quality candidates' },
                  { icon: '💰', text: 'Cost-effective solutions' }
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
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-green-600 font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span>Get Free Recruitment Audit</span>
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
        <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
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
                      <div className="flex items-center text-green-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
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
      </main>
    </>
  );
} 