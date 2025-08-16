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
import CalendlyBooking from '../components/CalendlyBooking';
import { CTASection } from '../components/AIEraComponents';

import { CheckCircle, Users, Shield, Zap, Award, MessageSquare, BarChart2, Search, Phone, Mail, ChevronDown, ChevronUp, Download, Calendar, MessageCircle, FileText, Eye, AlertTriangle, CheckSquare, ClipboardList, BookOpen, TrendingUp, ArrowRight, Play } from 'lucide-react';

export default function HRAuditService() {
  // SEO Data for HR Audit Service
  const seoData = {
    title: "HR Audit Services - Comprehensive HR Assessment",
    description: "Professional HR audit services for comprehensive HR assessment. Compliance audits, process reviews, and HR optimization strategies.",
    keywords: "HR audit, compliance audit, HR assessment, process review, HR optimization",
    pageType: "service",
    pageData: {
      title: "HR Audit Services",
      description: "Comprehensive HR assessment and optimization",
      image: "https://hirewithprachi.com/assets/images/hr-audit-1200x630.jpg"
    }
  };
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [showCalendly, setShowCalendly] = useState(false);

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
    "name": "HR Audit Services India",
    "description": "Comprehensive HR audit and compliance review services for Indian businesses. Expert assessment of HR policies, processes, legal compliance, and organizational effectiveness.",
    "provider": {
      "@type": "ProfessionalService",
      "name": "Hire With Prachi",
      "founder": {
        "@type": "Person",
        "name": "Prachi Shrivastava",
        "jobTitle": "HR Audit Consultant"
      },
      "url": "https://prachi-hr.com",
      "telephone": "+91-8740889927",
      "email": "info@hirewithprachi.com"
    },
    "serviceType": "HR Audit & Compliance Review",
    "areaServed": ["India", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "HR Audit Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Comprehensive HR Audit",
            "description": "Complete assessment of HR policies, processes, and compliance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Legal Compliance Audit",
            "description": "Review of labor law compliance and regulatory requirements"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "HR Process Optimization",
            "description": "Assessment and improvement of HR operational efficiency"
          }
        }
      ]
    },
    "offers": {
      "@type": "Offer",
      "price": "25999",
      "priceCurrency": "INR",
      "description": "Starting from ₹25,999 for comprehensive HR audit services"
    }
  };

  const features = [
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Comprehensive Assessment",
      description: "360-degree review of all HR policies, processes, and practices"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Legal Compliance Review",
      description: "Thorough audit of labor law compliance and regulatory adherence"
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Risk Identification",
      description: "Identify potential HR risks and compliance gaps before they become issues"
    },
    {
      icon: <CheckSquare className="h-6 w-6" />,
      title: "Gap Analysis",
      description: "Detailed analysis of gaps between current state and best practices"
    },
    {
      icon: <ClipboardList className="h-6 w-6" />,
      title: "Action Plan",
      description: "Prioritized recommendations with clear implementation roadmap"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Performance Improvement",
      description: "Strategic recommendations to enhance HR effectiveness and efficiency"
    }
  ];

  const auditAreas = [
    {
      category: "Policy & Documentation",
      items: [
        "Employee handbook and policies review",
        "Code of conduct and ethics assessment",
        "HR policy alignment with business goals",
        "Documentation completeness and accuracy",
        "Policy communication and implementation",
        "Regular policy update mechanisms"
      ]
    },
    {
      category: "Legal & Compliance",
      items: [
        "Labor law compliance assessment",
        "Statutory filing and reporting review",
        "Employment contract analysis",
        "Workplace safety and POSH compliance",
        "Data privacy and protection audit",
        "Government regulation adherence"
      ]
    },
    {
      category: "Recruitment & Onboarding",
      items: [
        "Hiring process effectiveness review",
        "Job description accuracy and clarity",
        "Interview and selection process audit",
        "Background verification procedures",
        "Onboarding program assessment",
        "Diversity and inclusion practices"
      ]
    },
    {
      category: "Performance Management",
      items: [
        "Performance appraisal system review",
        "Goal setting and tracking processes",
        "Feedback and coaching mechanisms",
        "Performance improvement plans",
        "Career development programs",
        "Succession planning assessment"
      ]
    },
    {
      category: "Compensation & Benefits",
      items: [
        "Salary structure and pay equity analysis",
        "Benefits program competitiveness",
        "Incentive and bonus plan effectiveness",
        "Payroll accuracy and compliance",
        "Leave and time-off policy review",
        "Total rewards strategy assessment"
      ]
    },
    {
      category: "Employee Relations",
      items: [
        "Employee engagement levels assessment",
        "Communication effectiveness review",
        "Grievance handling procedures",
        "Disciplinary action consistency",
        "Exit interview process analysis",
        "Workplace culture evaluation"
      ]
    }
  ];

  const auditProcess = [
    {
      step: "1",
      title: "Initial Consultation",
      description: "Understanding business context, objectives, and specific audit requirements"
    },
    {
      step: "2",
      title: "Scope Definition",
      description: "Defining audit scope, timeline, and key focus areas based on business needs"
    },
    {
      step: "3",
      title: "Data Collection",
      description: "Gathering HR documents, policies, data, and conducting stakeholder interviews"
    },
    {
      step: "4",
      title: "Analysis & Assessment",
      description: "Comprehensive review and analysis against best practices and legal requirements"
    },
    {
      step: "5",
      title: "Gap Identification",
      description: "Identifying compliance gaps, process inefficiencies, and improvement opportunities"
    },
    {
      step: "6",
      title: "Report & Recommendations",
      description: "Detailed audit report with prioritized recommendations and implementation plan"
    },
    {
      step: "7",
      title: "Implementation Support",
      description: "Ongoing support for implementing recommendations and monitoring progress"
    }
  ];

  const benefits = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Risk Mitigation",
      description: "Identify and address potential legal and compliance risks",
      metric: "90% risk reduction"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Process Optimization",
      description: "Improve HR efficiency and effectiveness through best practices",
      metric: "40% efficiency gain"
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Compliance Assurance",
      description: "Ensure full compliance with labor laws and regulations",
      metric: "100% compliance rate"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Employee Satisfaction",
      description: "Enhance employee experience through improved HR practices",
      metric: "25% satisfaction increase"
    }
  ];

  const packages = [
    {
      name: "Basic HR Audit",
      price: "₹25,999",
      period: "one-time",
      description: "Essential HR audit for small businesses",
      scope: "Up to 50 employees",
      features: [
        "Policy and documentation review",
        "Basic compliance assessment",
        "Key risk identification",
        "Executive summary report",
        "Priority recommendations",
        "1 follow-up consultation"
      ],
      popular: false
    },
    {
      name: "Comprehensive HR Audit",
      price: "₹65,999",
      period: "one-time",
      description: "Complete HR audit for growing organizations",
      scope: "Up to 200 employees",
      features: [
        "All Basic audit features",
        "Detailed compliance review",
        "Process efficiency analysis",
        "Employee survey inclusion",
        "Comprehensive action plan",
        "3-month implementation support",
        "Progress monitoring"
      ],
      popular: true
    },
    {
      name: "Strategic HR Audit",
      price: "Custom",
      period: "pricing",
      description: "Advanced audit for large enterprises",
      scope: "200+ employees",
      features: [
        "All Comprehensive features",
        "Strategic alignment assessment",
        "Benchmarking analysis",
        "Change management support",
        "Executive presentation",
        "6-month implementation support",
        "Quarterly review sessions"
      ],
      popular: false
    }
  ];

  const faqs = [
    {
      question: "What is included in a comprehensive HR audit?",
      answer: "A comprehensive HR audit includes review of all HR policies and procedures, legal compliance assessment, recruitment and onboarding processes, performance management systems, compensation and benefits analysis, employee relations evaluation, and identification of risks and improvement opportunities. We provide a detailed report with prioritized recommendations."
    },
    {
      question: "How long does an HR audit take to complete?",
      answer: "The duration depends on organization size and complexity. A basic audit for small companies (up to 50 employees) typically takes 2-3 weeks, while comprehensive audits for larger organizations may take 4-8 weeks. We provide a detailed timeline during the initial consultation based on your specific requirements."
    },
    {
      question: "What documents and information do you need for the audit?",
      answer: "We typically need access to HR policies, employee handbook, organizational charts, job descriptions, employment contracts, performance management documents, compensation data, compliance records, and any existing HR metrics. We provide a comprehensive checklist during the engagement kickoff."
    },
    {
      question: "How do you ensure confidentiality during the audit process?",
      answer: "We maintain strict confidentiality through signed NDAs, secure data handling protocols, limited access controls, and anonymized reporting where appropriate. All team members are bound by confidentiality agreements, and we follow industry best practices for data protection throughout the audit process."
    },
    {
      question: "What happens after the audit is completed?",
      answer: "After completion, we provide a detailed audit report with findings, risk assessment, gap analysis, and prioritized recommendations. We also offer implementation support, progress monitoring, and follow-up consultations to ensure successful implementation of our recommendations."
    },
    {
      question: "Can you help implement the audit recommendations?",
      answer: "Yes, we offer implementation support as part of our comprehensive packages or as a separate service. This includes policy development, process redesign, training programs, compliance setup, and change management support to ensure successful implementation of audit recommendations."
    },
    {
      question: "How often should companies conduct HR audits?",
      answer: "We recommend annual comprehensive HR audits for most organizations, with focused audits every 6 months for high-growth companies or those in heavily regulated industries. Regular audits help maintain compliance, identify emerging issues, and ensure HR practices evolve with business needs."
    },
    {
      question: "Do you provide industry-specific HR audit services?",
      answer: "Yes, we tailor our audit approach to specific industries including IT, manufacturing, healthcare, finance, retail, and others. We understand industry-specific compliance requirements, best practices, and unique challenges, ensuring relevant and actionable audit recommendations."
    }
  ];

  const testimonials = [
    {
      name: "Sanjay Verma",
      position: "CEO",
      company: "Manufacturing Solutions Ltd, Pune",
      text: "Their HR audit revealed critical compliance gaps we weren't aware of. The detailed action plan and implementation support helped us achieve 100% compliance within 6 months.",
      rating: 5
    },
    {
      name: "Meera Patel",
      position: "Head of HR",
      company: "TechInnovate, Bangalore",
      text: "Excellent audit process with practical recommendations. The team's expertise in IT sector HR practices was evident throughout. Our HR efficiency improved significantly.",
      rating: 5
    },
    {
      name: "Rajesh Gupta",
      position: "Director",
      company: "Financial Services Group, Mumbai",
      text: "Professional and thorough audit that identified both compliance risks and process improvement opportunities. The ROI from implementing their recommendations was substantial.",
      rating: 5
    }
  ];

  return (
    <>
      {/* SEO Metadata */}
      <Helmet>
        <title>HR Audit Services India - Comprehensive HR Assessment & Compliance Review | Hire With Prachi</title>
        <meta name="description" content="Professional HR audit services in India. Comprehensive assessment of HR policies, legal compliance, processes & risks. Expert gap analysis & recommendations. Free consultation." />
        <meta name="keywords" content="hr audit services india, hr compliance audit, hr assessment, hr gap analysis, labor law audit, hr process review, hr risk assessment, hr policy audit, hr effectiveness audit" />
        
        {/* Open Graph */}
        <meta property="og:title" content="HR Audit Services India - Professional HR Assessment" />
        <meta property="og:description" content="Comprehensive HR audit services. Policy review, compliance assessment, risk identification & strategic recommendations. Ensure HR excellence. Starting ₹25,999." />
        <meta property="og:type" content="service" />
        <meta property="og:url" content="https://prachi-hr.com/services/hr-audit" />
        <meta property="og:image" content="https://prachi-hr.com/assets/images/hr-audit-services.jpg" />
        
        {/* Local SEO */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="geo.position" content="20.5937;78.9629" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>

        {/* Canonical URL */}
        <link rel="canonical" href="https://prachi-hr.com/services/hr-audit" />
      </Helmet>

      <ScrollProgressBar />
      <HireWithPrachiTopBar />
      <HireWithPrachiHeader />

      {/* AI-Era Hero Section */}
      <section className="relative ai-hero-bg pt-20 pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            
            {/* AI-Era Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-10 lg:mb-0"
            >
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-violet-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                  AI-Powered Audit Solutions
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Transform Your Business with 
                  <span className="ai-text-shimmer block">AI-Enabled HR Audit</span>
                  & Assessment
                </h1>
                
                <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                  Identify risks, ensure compliance, and optimize HR effectiveness with our 
                  AI-powered audit services. Get expert assessment of policies, processes, 
                  and legal compliance with intelligent insights.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-purple-300 mb-2">360°</div>
                  <div className="text-gray-300 text-sm">Comprehensive Review</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-purple-300 mb-2">100%</div>
                  <div className="text-gray-300 text-sm">Compliance Rate</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-purple-300 mb-2">&lt;24hrs</div>
                  <div className="text-gray-300 text-sm">Risk Detection</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-purple-300 mb-2">150+</div>
                  <div className="text-gray-300 text-sm">Companies Audited</div>
                </motion.div>
              </div>

              {/* AI-Era CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => setShowCalendly(true)}
  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
>
  Schedule AI-Powered HR Audit
                
</motion.button>
                
                <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={handleBrochureDownload}
  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
>
  Download AI Audit Checklist
                
</motion.button>
              </div>

              {/* AI-Era Trust Indicators */}
              <div className="glass-effect p-6 rounded-2xl">
                <p className="text-sm text-gray-300 mb-4 font-medium">
                  Trusted by 150+ companies for AI-powered HR audits and assessments
                </p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Award key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-300 ml-2 font-medium">4.9/5 AI Rating</span>
                  </div>
                  <div className="text-sm text-gray-300 font-medium">✓ AI-Powered</div>
                  <div className="text-sm text-gray-300 font-medium">✓ Risk Specialist</div>
                </div>
              </div>
            </motion.div>

            {/* AI-Era Visual Element */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="glass-effect p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-bold animate-pulse-glow">
                  AI-Powered
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Audit Coverage</h3>
                  <p className="text-gray-600">Comprehensive Assessment</p>
                </div>

                <div className="space-y-4">
                  {[
                    { area: "Legal Compliance", coverage: "100%", color: "bg-green-50 text-green-700" },
                    { area: "Policy Review", coverage: "95%", color: "bg-blue-50 text-blue-700" },
                    { area: "Process Assessment", coverage: "90%", color: "bg-indigo-50 text-indigo-700" },
                    { area: "Risk Analysis", coverage: "98%", color: "bg-purple-50 text-purple-700" },
                    { area: "Best Practices", coverage: "85%", color: "bg-orange-50 text-orange-700" }
                  ].map((item, index) => (
                    <div key={index} className={`p-4 rounded-lg ${item.color}`}>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.area}</span>
                        <span className="text-xl font-bold">{item.coverage}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <div className="text-sm text-gray-600 mb-2">
                    <Eye className="h-4 w-4 inline mr-1" />
                    Complete HR Assessment
                  </div>
                  <div className="text-lg font-bold text-indigo-600">150+ Audits</div>
                  <div className="text-sm text-gray-600">Successfully Completed</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI-Era Features Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
  AI-Powered Features
            
</div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive <span className="gradient-text-ai">AI-Enabled HR Audit</span> Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our systematic AI-powered approach ensures thorough assessment of all HR aspects, 
              identifying risks and opportunities for improvement with intelligent insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {features.map((feature, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
        {feature.icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
    </motion.div>
  ))}
</div>
        </div>
      </section>

      {/* AI-Era Audit Areas Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
  Complete Coverage
            
</div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Key <span className="gradient-text-ai">AI-Powered HR Audit</span> Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive assessment covering all critical aspects of human resource management 
              and organizational effectiveness with intelligent automation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {auditAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full"
              >
  <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {area.category}
                  </h3>
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                </div>
                <ul className="space-y-4">
                  {area.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
</motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Our HR Audit Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Systematic 7-step audit methodology ensuring comprehensive assessment and actionable recommendations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {auditProcess.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl text-center"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                </div>
                <div className="pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              HR Audit Benefits & ROI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Measurable improvements in compliance, efficiency, and employee satisfaction through professional HR audit insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="text-indigo-600 flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-3">
                  {benefit.description}
                </p>
                <div className="text-sm font-semibold text-indigo-600">
                  {benefit.metric}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              HR Audit Service Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the right audit package based on your organization size and assessment requirements.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white p-8 rounded-2xl shadow-lg ${
                  pkg.popular ? 'ring-2 ring-indigo-600 transform scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {pkg.name}
                  </h3>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {pkg.price}
                    <span className="text-lg font-normal text-gray-600">/{pkg.period}</span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    {pkg.description}
                  </p>
                  <p className="text-sm font-semibold text-indigo-600">
                    {pkg.scope}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setShowCalendly(true)}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-colors duration-300 ${
                    pkg.popular
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Schedule Audit
                </button>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Need a custom audit scope? We can design specialized audits for unique organizational requirements.
            </p>
            <button
              onClick={() => setShowCalendly(true)}
              className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors duration-300"
            >
              Contact us for custom audit design →
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              HR Audit Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from organizations that improved their HR effectiveness through our comprehensive audit services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Award key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.position}</div>
                  <div className="text-sm text-indigo-600">{testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about our HR audit and assessment services.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 rounded-xl transition-colors duration-300"
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI-Era CTA Section */}
      <CTASection
        title="Ready to Audit Your HR with AI?"
        subtitle="Join 150+ organizations that have mitigated risks and optimized HR operations through our AI-powered comprehensive audit services with intelligent insights."
        primaryAction={{
          text: "Schedule AI-Powered HR Audit",
          icon: Calendar,
          onClick: () => setShowCalendly(true)
        }}
        secondaryAction={{
          text: "Download AI Audit Checklist",
          icon: Download,
          onClick: handleBrochureDownload
        }}
        background="gradient"
      />

      <HireWithPrachiFooter />
      <GPT4oMiniChatbot />

      {/* Modals */}
      {showBrochureModal && (
        <BrochureDownloadModal
          isOpen={showBrochureModal}
          onClose={() => setShowBrochureModal(false)}
          brochureType="hr-audit"
          title="HR Audit Services Guide"
        />
      )}

      {showCalendly && (
        <CalendlyBooking
          isOpen={showCalendly}
          onClose={() => setShowCalendly(false)}
        />
      )}
    </>
  );
}