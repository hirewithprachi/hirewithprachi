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
import { CheckCircle, Users, Shield, Zap, Award, MessageSquare, BarChart2, Search, Phone, Mail, ChevronDown, ChevronUp, Download, Calendar, MessageCircle, FileText, Calculator, DollarSign, Clock, TrendingUp, Globe, Headphones, CreditCard, Banknote, ArrowRight, Play } from 'lucide-react';

export default function PayrollManagementService() {
  // SEO Data for Payroll Management Service
  const seoData = {
    title: "Payroll Management Services - Accurate Payroll Processing",
    description: "Professional payroll management services for Indian businesses. Accurate payroll processing, tax compliance, and salary management.",
    keywords: "payroll management, payroll processing, tax compliance, salary management, India",
    pageType: "service",
    pageData: {
      title: "Payroll Management Services",
      description: "Accurate payroll processing and tax compliance",
      image: "https://hirewithprachi.com/assets/images/payroll-management-1200x630.jpg"
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
    "name": "Payroll Management Services India",
    "description": "Professional payroll processing services for Indian businesses. Accurate salary calculation, statutory compliance, tax filing, and payroll outsourcing solutions.",
    "provider": {
      "@type": "ProfessionalService",
      "name": "Hire With Prachi",
      "founder": {
        "@type": "Person",
        "name": "Prachi Shrivastava",
        "jobTitle": "HR & Payroll Consultant"
      },
      "url": "https://prachi-hr.com",
      "telephone": "+91-8740889927",
      "email": "info@hirewithprachi.com"
    },
    "serviceType": "Payroll Processing & Management",
    "areaServed": ["India", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Payroll Management Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Monthly Payroll Processing",
            "description": "Complete monthly salary processing with statutory compliance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tax Filing & Compliance",
            "description": "TDS, PF, ESI, and other statutory compliance management"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Payroll Audit",
            "description": "Comprehensive payroll audit and compliance review"
          }
        }
      ]
    },
    "offers": {
      "@type": "Offer",
      "price": "2999",
      "priceCurrency": "INR",
      "description": "Starting from ₹2,999/month for payroll management services"
    }
  };

  const features = [
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "Accurate Salary Calculation",
      description: "Precise payroll processing with automated calculations and error-free results"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "100% Statutory Compliance",
      description: "Stay compliant with PF, ESI, TDS, PT, and all labor law requirements"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Timely Processing",
      description: "On-time salary processing and statutory filings every month"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Comprehensive Reports",
      description: "Detailed payroll reports, salary slips, and compliance documents"
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Cost-Effective Solution",
      description: "Reduce payroll costs by up to 50% compared to in-house processing"
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: "Expert Support",
      description: "Dedicated payroll experts and customer support team"
    }
  ];

  const services = [
    {
      category: "Core Payroll Services",
      items: [
        "Monthly Salary Processing",
        "Overtime & Bonus Calculations",
        "Leave & Attendance Management",
        "Salary Slip Generation",
        "Final Settlement Processing",
        "Payroll Register Maintenance"
      ]
    },
    {
      category: "Statutory Compliance",
      items: [
        "PF (Provident Fund) Management",
        "ESI (Employee State Insurance)",
        "TDS (Tax Deducted at Source)",
        "Professional Tax Filing",
        "Labour Welfare Fund",
        "Gratuity Calculations"
      ]
    },
    {
      category: "Tax & Filing Services",
      items: [
        "Form 16 Generation",
        "Annual Tax Filing Support",
        "Tax Planning & Consultation",
        "Income Tax Compliance",
        "TDS Return Filing",
        "Tax Reconciliation"
      ]
    },
    {
      category: "Payroll Analytics",
      items: [
        "Payroll Cost Analysis",
        "Compensation Benchmarking",
        "Payroll Trend Reports",
        "Budget Planning Support",
        "Cost Center Analysis",
        "Variance Reporting"
      ]
    }
  ];

  const benefits = [
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "50% Cost Reduction",
      description: "Save significantly on payroll processing costs",
      metric: "Average savings: ₹2-4 lakhs annually"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "99.9% Accuracy",
      description: "Error-free payroll processing with automated checks",
      metric: "Zero calculation errors"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Complete Compliance",
      description: "Stay updated with all statutory requirements",
      metric: "100% compliance record"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Time Savings",
      description: "Free up 20+ hours monthly for core business",
      metric: "80% time reduction"
    }
  ];

  const process = [
    {
      step: "1",
      title: "Data Collection",
      description: "Gather employee data, attendance, and salary structures"
    },
    {
      step: "2", 
      title: "Salary Processing",
      description: "Calculate salaries, deductions, and statutory contributions"
    },
    {
      step: "3",
      title: "Review & Validation",
      description: "Quality check and validation of all calculations"
    },
    {
      step: "4",
      title: "Payroll Generation",
      description: "Generate salary slips, reports, and payment files"
    },
    {
      step: "5",
      title: "Statutory Filing",
      description: "File all required statutory returns and compliances"
    },
    {
      step: "6",
      title: "Reporting",
      description: "Provide detailed payroll reports and analytics"
    }
  ];

  const packages = [
    {
      name: "Basic Payroll",
      price: "₹2,999",
      period: "/month",
      description: "Essential payroll processing for small businesses",
      employees: "Up to 25 employees",
      features: [
        "Monthly salary processing",
        "Basic statutory compliance",
        "Salary slips generation",
        "Email support",
        "Standard reports"
      ],
      popular: false
    },
    {
      name: "Professional Payroll",
      price: "₹7,999",
      period: "/month",
      description: "Comprehensive payroll solution for growing companies",
      employees: "Up to 100 employees",
      features: [
        "All Basic features",
        "Advanced statutory management",
        "Form 16 generation",
        "Payroll analytics",
        "Phone support",
        "Custom reports",
        "Dedicated account manager"
      ],
      popular: true
    },
    {
      name: "Enterprise Payroll",
      price: "Custom",
      period: "pricing",
      description: "Complete payroll outsourcing for large organizations",
      employees: "100+ employees",
      features: [
        "All Professional features",
        "Multi-location support",
        "Advanced analytics",
        "API integration",
        "Priority support",
        "Custom workflows",
        "Compliance consulting"
      ],
      popular: false
    }
  ];

  const faqs = [
    {
      question: "What is included in your payroll management service?",
      answer: "Our payroll management service includes monthly salary processing, statutory compliance (PF, ESI, TDS, PT), salary slip generation, tax calculations, compliance reporting, and dedicated support. We handle everything from data collection to final salary disbursement."
    },
    {
      question: "How do you ensure payroll accuracy and compliance?",
      answer: "We use automated payroll software with built-in compliance checks, maintain updated tax tables and statutory rates, conduct multi-level reviews, and have experienced payroll professionals overseeing all processes. We guarantee 99.9% accuracy in our calculations."
    },
    {
      question: "Can you handle payroll for multiple locations?",
      answer: "Yes, we can manage payroll for businesses with multiple locations across India. We handle state-specific compliance requirements, different tax structures, and local statutory obligations while providing consolidated reporting."
    },
    {
      question: "How secure is our payroll data?",
      answer: "We follow bank-level security protocols with 256-bit encryption, secure data centers, access controls, regular backups, and compliance with data protection regulations. All payroll data is handled with strict confidentiality."
    },
    {
      question: "What happens if there are errors in payroll processing?",
      answer: "While our error rate is less than 0.1%, if any errors occur, we immediately rectify them at no additional cost, provide corrected documents, and handle any necessary adjustments or re-filings with government authorities."
    },
    {
      question: "Do you provide Form 16 and tax filing support?",
      answer: "Yes, we generate Form 16 for all employees, provide tax planning consultation, assist with annual tax filings, and offer comprehensive tax support including TDS calculations and quarterly return filings."
    },
    {
      question: "How quickly can you start processing our payroll?",
      answer: "We can typically start processing payroll within 7-10 business days after receiving all employee data and completing the setup. This includes data migration, system configuration, and compliance setup."
    },
    {
      question: "What reports do you provide?",
      answer: "We provide comprehensive reports including payroll registers, salary summaries, statutory reports (PF, ESI, TDS), cost center analysis, variance reports, and custom reports based on your business requirements."
    }
  ];

  const testimonials = [
    {
      name: "Rakesh Gupta",
      position: "Finance Director",
      company: "TechSoft Solutions, Mumbai",
      text: "Outsourcing payroll to Hire With Prachi saved us ₹3 lakhs annually and eliminated all compliance worries. Their accuracy is exceptional!",
      rating: 5
    },
    {
      name: "Sunita Sharma",
      position: "HR Manager",
      company: "Global Enterprises, Delhi",
      text: "Best decision for our growing company. They handle 150+ employees across 3 locations flawlessly. Reports are detailed and always on time.",
      rating: 5
    },
    {
      name: "Vikram Patel",
      position: "CEO",
      company: "StartupHub, Bangalore",
      text: "Professional service with great support. They made payroll stress-free for our startup and helped us scale without hiring additional HR staff.",
      rating: 5
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
        canonical="https://hirewithprachi.com/services/payroll-management"
      />

      <ScrollProgressBar />
      <HireWithPrachiTopBar />
      <HireWithPrachiHeader />

      {/* AI-Era Hero Section */}
      <section className="relative ai-hero-bg pt-20 pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
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
                <HeroBadge variant="primary" className="mb-6">
                  AI-Powered Payroll Solutions
                </HeroBadge>
                
                <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Transform Your Business with 
                  <span className="ai-text-shimmer block">AI-Enabled Payroll</span>
                  Management
                </h1>
                
                <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                  Experience the future of payroll processing with our AI-powered solutions. 
                  Achieve 99.9% accuracy, 100% compliance, and 50% cost savings with 
                  intelligent automation and expert support.
                </p>
              </div>

              {/* AI-Era Stats */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <AnimatedStat 
                  icon={Calculator} 
                  value="99.9%" 
                  label="Accuracy Rate" 
                  delay={0.2}
                />
                <AnimatedStat 
                  icon={Shield} 
                  value="100%" 
                  label="Compliance" 
                  delay={0.4}
                />
                <AnimatedStat 
                  icon={DollarSign} 
                  value="50%" 
                  label="Cost Savings" 
                  delay={0.6}
                />
                <AnimatedStat 
                  icon={Clock} 
                  value="<2hrs" 
                  label="Response Time" 
                  delay={0.8}
                />
              </div>

              {/* AI-Era CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <AIEraButton
                  variant="primary"
                  size="lg"
                  icon={Calendar}
                  onClick={() => setShowCalendly(true)}
                >
                  Book a Free Strategic Payroll Call
                </AIEraButton>
                
                <AIEraButton
                  variant="outline"
                  size="lg"
                  icon={Download}
                  onClick={handleBrochureDownload}
                >
                  Download Payroll Brochure
                </AIEraButton>
              </div>

              {/* AI-Era Trust Indicators */}
              <div className="glass-effect p-6 rounded-2xl">
                <p className="text-sm text-gray-300 mb-4 font-medium">
                  Trusted by 300+ companies for intelligent payroll processing
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
                  <div className="text-sm text-gray-300 font-medium">✓ Data Secure</div>
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
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-bold animate-pulse-glow">
                  AI-Powered
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Monthly Payroll Costs</h3>
                  <p className="text-gray-600">For 50 employees</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">In-House Processing</span>
                      <span className="text-xl font-bold text-red-600">₹45,000</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Staff + Software + Compliance</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">Our Service</span>
                      <span className="text-xl font-bold text-green-600">₹7,999</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Complete payroll outsourcing</p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">₹37,001</div>
                    <p className="text-sm text-gray-600">Monthly Savings</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI-Era Features Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <HeroBadge variant="secondary" className="mb-6">
              AI-Powered Features
            </HeroBadge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our <span className="gradient-text-ai">AI-Enabled Payroll</span> Management?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of payroll processing with intelligent automation, 
              expert support, and guaranteed compliance for your peace of mind.
            </p>
          </motion.div>

          <FeatureGrid features={features} />
        </div>
      </section>

      {/* AI-Era Services Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <HeroBadge variant="primary" className="mb-6">
              Complete Solutions
            </HeroBadge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Complete <span className="gradient-text-ai">AI-Powered Payroll</span> Management Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              End-to-end payroll processing covering every aspect of salary management, 
              statutory compliance, and intelligent reporting.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <FloatingCard key={index} delay={index * 0.1} className="h-full">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.category}
                  </h3>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="w-8 h-8 text-white" />
                  </div>
                </div>
                <ul className="space-y-4">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </FloatingCard>
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
              Our Payroll Processing Workflow
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Streamlined 6-step process ensuring accurate, timely, and compliant payroll processing every month.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl text-center"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                </div>
                <div className="pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
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
              Measurable Business Benefits
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience significant cost savings, improved accuracy, and enhanced compliance with our professional payroll services.
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
                <div className="text-green-600 flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-3">
                  {benefit.description}
                </p>
                <div className="text-sm font-semibold text-green-600">
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
              Payroll Management Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the right payroll package for your business size and requirements. All packages include our core payroll services.
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
                  pkg.popular ? 'ring-2 ring-green-600 transform scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
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
                    <span className="text-lg font-normal text-gray-600">{pkg.period}</span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    {pkg.description}
                  </p>
                  <p className="text-sm font-semibold text-green-600">
                    {pkg.employees}
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
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Need payroll for more than 100 employees? We offer custom enterprise solutions.
            </p>
            <button
              onClick={() => setShowCalendly(true)}
              className="text-green-600 font-semibold hover:text-green-700 transition-colors duration-300"
            >
              Contact us for enterprise pricing →
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
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from businesses that have streamlined their payroll operations with our professional services.
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
                  <div className="text-sm text-green-600">{testimonial.company}</div>
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
              Get answers to common questions about our payroll management services.
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
        title="Ready to Transform Your Payroll with AI?"
        subtitle="Join 300+ businesses that have reduced payroll costs by 50% while ensuring 100% compliance and accuracy with our AI-powered solutions."
        primaryAction={{
          text: "Schedule Free Strategic Call",
          icon: Calendar,
          onClick: () => setShowCalendly(true)
        }}
        secondaryAction={{
          text: "Download AI Payroll Guide",
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
          brochureType="payroll-management"
          title="Payroll Management Services Brochure"
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