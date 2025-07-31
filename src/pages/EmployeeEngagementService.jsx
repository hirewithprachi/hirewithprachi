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

export default function EmployeeEngagementService() {
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
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Employee Engagement & Culture Services | Build Thriving Workplace Culture</title>
        <meta name="title" content="Employee Engagement & Culture Services | Build Thriving Workplace Culture" />
        <meta name="description" content="Build a thriving workplace culture that retains top talent. Employee satisfaction surveys, culture assessment, recognition programs, and team building initiatives. Reduce turnover by 40%." />
        <meta name="keywords" content="employee engagement, workplace culture, employee satisfaction surveys, culture assessment, recognition programs, team building, employee retention, workplace wellness, employee motivation, HR culture services, employee experience, workplace happiness" />
        <meta name="author" content="Prachi Shrivastava" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hirewithprachi.com/services/employee-engagement" />
        <meta property="og:title" content="Employee Engagement & Culture Services | Build Thriving Workplace Culture" />
        <meta property="og:description" content="Build a thriving workplace culture that retains top talent. Employee satisfaction surveys, culture assessment, recognition programs, and team building initiatives." />
        <meta property="og:image" content="https://hirewithprachi.com/employee-engagement-og-image.png" />
        <meta property="og:site_name" content="Hire With Prachi" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://hirewithprachi.com/services/employee-engagement" />
        <meta property="twitter:title" content="Employee Engagement & Culture Services | Build Thriving Workplace Culture" />
        <meta property="twitter:description" content="Build a thriving workplace culture that retains top talent. Employee satisfaction surveys, culture assessment, recognition programs, and team building initiatives." />
        <meta property="twitter:image" content="https://hirewithprachi.com/employee-engagement-twitter-image.png" />
        <meta property="twitter:creator" content="@prachi_hr" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Employee Engagement Services" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://hirewithprachi.com/services/employee-engagement" />
        
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
                "name": "What employee engagement services do you provide?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We provide comprehensive employee engagement services including employee satisfaction surveys, culture assessment & strategy, recognition programs, team building initiatives, communication frameworks, and wellness programs."
                }
              },
              {
                "@type": "Question",
                "name": "How do you measure employee engagement?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We use scientifically designed employee satisfaction surveys, pulse surveys, and engagement metrics to measure and track employee engagement levels. Our surveys provide actionable insights for improvement."
                }
              },
              {
                "@type": "Question",
                "name": "How much do employee engagement services cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our employee engagement services start at ₹20,000/month and can reduce turnover by 40%. We offer flexible pricing plans tailored to your organization size and engagement needs."
                }
              },
              {
                "@type": "Question",
                "name": "Do you provide team building activities?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we design and facilitate virtual and in-person team building activities, games, and contests to boost morale, collaboration, and team spirit in your organization."
                }
              },
              {
                "@type": "Question",
                "name": "How do you improve workplace culture?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We assess your current culture, identify improvement areas, and implement strategies including recognition programs, communication frameworks, wellness initiatives, and culture-building activities."
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
        <section className="pt-24 pb-8 bg-gradient-to-r from-pink-50 to-rose-50">
          <div className="container mx-auto px-4">
            <Breadcrumbs 
              items={[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
                { label: 'Employee Engagement & Culture', href: '/services/employee-engagement', current: true }
              ]}
            />
          </div>
        </section>
        
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-8 pb-20">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50"></div>
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-rose-200 to-red-200 rounded-full blur-3xl"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-sm font-semibold uppercase tracking-wider">Workplace Culture</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 leading-tight">
                Employee Engagement & Culture
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Build a thriving workplace culture that retains top talent. Transform your organization with proven employee engagement strategies and culture-building initiatives.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Get Free Culture Assessment
                </button>
                <button className="px-8 py-4 border-2 border-pink-500 text-pink-600 rounded-xl font-semibold hover:bg-pink-50 transition-all duration-300">
                  View Pricing Plans
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600">40%</div>
                  <div className="text-sm text-gray-600">Reduced Turnover</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600">₹20K</div>
                  <div className="text-sm text-gray-600">Per Month</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600">60%</div>
                  <div className="text-sm text-gray-600">Satisfaction Increase</div>
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
                Comprehensive employee engagement services designed to create a positive, motivated, and connected workforce
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '📊',
                  title: 'Employee Satisfaction Surveys',
                  description: 'Comprehensive surveys to measure and improve employee satisfaction, engagement, and workplace happiness.',
                  features: ['Pulse Surveys', 'Annual Surveys', 'Anonymous Feedback', 'Action Planning']
                },
                {
                  icon: '🎯',
                  title: 'Culture Assessment & Strategy',
                  description: 'Assess your current workplace culture and develop strategies to improve employee experience.',
                  features: ['Culture Audit', 'Strategy Development', 'Implementation Plan', 'Progress Tracking']
                },
                {
                  icon: '🏆',
                  title: 'Recognition Programs',
                  description: 'Design and implement employee recognition programs to boost morale and motivation.',
                  features: ['Award Programs', 'Peer Recognition', 'Milestone Celebrations', 'Performance Rewards']
                },
                {
                  icon: '🤝',
                  title: 'Team Building Initiatives',
                  description: 'Virtual and in-person team building activities to strengthen relationships and collaboration.',
                  features: ['Virtual Activities', 'Team Games', 'Collaboration Exercises', 'Bonding Events']
                },
                {
                  icon: '💬',
                  title: 'Communication Frameworks',
                  description: 'Improve internal communication to enhance transparency and employee engagement.',
                  features: ['Communication Channels', 'Feedback Systems', 'Transparency Tools', 'Engagement Platforms']
                },
                {
                  icon: '🧘',
                  title: 'Wellness Programs',
                  description: 'Mental health and wellness programs to support employee well-being and work-life balance.',
                  features: ['Mental Health Support', 'Wellness Webinars', 'Work-Life Balance', 'Stress Management']
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-3xl border border-pink-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <span className="text-pink-500 mr-2">✓</span>
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
        <section className="py-20 bg-gradient-to-br from-pink-50 to-rose-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Benefits of Employee Engagement
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transform your workplace culture and reap the rewards of engaged, motivated employees
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '📈',
                  title: 'Increased Productivity',
                  description: 'Engaged employees are 21% more productive and deliver better results.',
                  benefit: 'Boost team performance'
                },
                {
                  icon: '💼',
                  title: 'Reduced Turnover',
                  description: 'Strong engagement reduces employee turnover by up to 40%.',
                  benefit: 'Retain top talent'
                },
                {
                  icon: '😊',
                  title: 'Higher Satisfaction',
                  description: 'Improve employee satisfaction and workplace happiness scores.',
                  benefit: 'Create happy workplace'
                },
                {
                  icon: '🤝',
                  title: 'Better Collaboration',
                  description: 'Enhanced team building and communication improve collaboration.',
                  benefit: 'Strengthen teamwork'
                },
                {
                  icon: '🏆',
                  title: 'Improved Recognition',
                  description: 'Recognition programs boost motivation and employee morale.',
                  benefit: 'Increase motivation'
                },
                {
                  icon: '🧘',
                  title: 'Better Well-being',
                  description: 'Wellness programs support mental health and work-life balance.',
                  benefit: 'Support employee health'
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
                  <div className="bg-pink-50 p-3 rounded-lg">
                    <span className="text-pink-700 font-semibold text-sm">{benefit.benefit}</span>
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
                Our Engagement Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A systematic approach to building engaged, motivated, and happy employees
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Assessment',
                  description: 'Evaluate current employee engagement levels and workplace culture'
                },
                {
                  step: '02',
                  title: 'Strategy Development',
                  description: 'Develop customized engagement strategies and programs'
                },
                {
                  step: '03',
                  title: 'Implementation',
                  description: 'Roll out engagement initiatives and monitor progress'
                },
                {
                  step: '04',
                  title: 'Continuous Improvement',
                  description: 'Regular assessment and refinement of engagement programs'
                }
              ].map((process, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
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
        <section className="py-20 bg-gradient-to-br from-pink-600 via-rose-600 to-red-600 relative overflow-hidden">
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
                Ready to Build a <br />
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Thriving Culture?
                </span>
              </h2>

              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Join 500+ companies that have transformed their workplace culture. Reduce turnover by 40% and boost employee satisfaction.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                  { icon: '📈', text: '40% reduced turnover' },
                  { icon: '😊', text: '60% satisfaction increase' },
                  { icon: '🤝', text: 'Better team collaboration' }
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
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-pink-600 font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span>Get Free Culture Assessment</span>
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
        <section className="py-20 bg-gradient-to-br from-gray-50 to-pink-50">
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
                      <div className="flex items-center text-pink-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
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