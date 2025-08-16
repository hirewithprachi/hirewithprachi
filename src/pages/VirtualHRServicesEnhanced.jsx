import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HireWithPrachiTopBar from '../components/hirable/HirableTopBar';
import HireWithPrachiHeader from '../components/hirable/HirableHeader';
import HireWithPrachiFooter from '../components/hirable/HirableFooter';
import GPT4oMiniChatbot from '../components/GPT4oMiniChatbot';
import ScrollProgressBar from '../components/ScrollProgressBar';
import BrochureDownloadModal from '../components/BrochureDownloadModal';
import CalendlyBooking from '../components/CalendlyBooking';
import { 
  CheckCircle, Users, Shield, Zap, Award, MessageSquare, BarChart2, Search, 
  Phone, Mail, ChevronDown, ChevronUp, Download, Calendar, MessageCircle, 
  FileText, Cloud, DollarSign, Clock, TrendingUp, Globe, Headphones, 
  Sparkles, Play, Star, Brain, ArrowRight, Target, Rocket, Cpu, 
  BarChart3, Building, ShieldCheck
} from 'lucide-react';

export default function VirtualHRServicesEnhanced() {
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [showCalendly, setShowCalendly] = useState(false);
  const [employeeCount, setEmployeeCount] = useState(50);
  const [currentCost, setCurrentCost] = useState(100000);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleBrochureDownload = () => {
    setShowBrochureModal(true);
  };

  // Calculate ROI
  const calculateSavings = () => {
    const baseCost = currentCost;
    const virtualHRCost = employeeCount * 1500; // ₹1500 per employee per month
    const savings = baseCost - virtualHRCost;
    const savingsPercentage = ((savings / baseCost) * 100).toFixed(1);
    return { savings, savingsPercentage, virtualHRCost };
  };

  const { savings, savingsPercentage, virtualHRCost } = calculateSavings();

  // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI-Powered Virtual HR Services India",
    "description": "Transform your HR with AI-driven virtual HR solutions. Save up to 60% on costs while getting enterprise-level HR support. Complete compliance, recruitment, and payroll management.",
    "provider": {
      "@type": "ProfessionalService",
      "name": "Hire With Prachi",
      "founder": {
        "@type": "Person",
        "name": "Prachi Shrivastava",
        "jobTitle": "AI-Powered Virtual HR Consultant"
      },
      "url": "https://prachi-hr.com",
      "telephone": "+91-8740889927",
      "email": "info@hirewithprachi.com"
    },
    "serviceType": "AI-Powered Virtual HR Management",
    "areaServed": ["India", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI-Powered Virtual HR Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI-Driven HR Outsourcing",
            "description": "Intelligent HR management with AI insights"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Smart Compliance Management",
            "description": "AI-powered compliance monitoring and alerts"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Intelligent Recruitment",
            "description": "AI-enhanced candidate screening and matching"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Automated Payroll Processing",
            "description": "Smart payroll with AI-powered accuracy"
          }
        }
      ]
    },
    "offers": {
      "@type": "Offer",
      "price": "9999",
      "priceCurrency": "INR",
      "description": "Starting from ₹9,999/month for AI-powered virtual HR services"
    }
  };

  const aiFeatures = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Insights",
      description: "Get intelligent HR analytics and predictive insights to make data-driven decisions"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Smart Recruitment",
      description: "AI-enhanced candidate screening and matching for better hiring outcomes"
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Automated Compliance",
      description: "Real-time compliance monitoring with AI-powered alerts and updates"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Performance Analytics",
      description: "Advanced analytics to track employee performance and engagement"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Process Automation",
      description: "Automate repetitive HR tasks with intelligent workflow management"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Scalable Solutions",
      description: "Grow your HR capabilities seamlessly as your business expands"
    }
  ];

  const services = [
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Complete HR Outsourcing",
      description: "Full-service AI-powered HR management without the overhead of in-house staff",
      features: [
        "AI-driven HR strategy development",
        "Intelligent workforce planning",
        "Automated policy management",
        "Smart employee lifecycle management",
        "Real-time HR analytics dashboard"
      ],
      link: "/services/virtual-hr-services"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Cost Optimization",
      description: "Reduce HR costs by up to 60% while improving efficiency and compliance",
      features: [
        "Automated cost analysis",
        "Intelligent budget optimization",
        "ROI tracking and reporting",
        "Predictive cost modeling",
        "Efficiency improvement recommendations"
      ],
      link: "/services/payroll-management"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Smart Compliance",
      description: "AI-powered compliance management with real-time monitoring and alerts",
      features: [
        "Real-time compliance monitoring",
        "Automated policy updates",
        "Risk assessment and alerts",
        "Audit trail management",
        "Regulatory change tracking"
      ],
      link: "/services/hr-compliance"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Intelligent Recruitment",
      description: "AI-enhanced recruitment process for better candidate matching and faster hiring",
      features: [
        "AI candidate screening",
        "Intelligent job matching",
        "Automated interview scheduling",
        "Predictive hiring analytics",
        "Talent pipeline management"
      ],
      link: "/services/recruitment-hiring"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      position: "CEO",
      company: "TechStart India",
      text: "The AI-powered insights have transformed our HR decision-making. We've reduced costs by 55% while improving employee satisfaction.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      position: "HR Director",
      company: "InnovateCorp",
      text: "The automated compliance monitoring is a game-changer. We never miss regulatory updates anymore.",
      rating: 5
    },
    {
      name: "Amit Patel",
      position: "Founder",
      company: "ScaleUp Solutions",
      text: "AI-enhanced recruitment helped us hire 40% faster with better quality candidates. Highly recommended!",
      rating: 5
    },
    {
      name: "Neha Singh",
      position: "Operations Head",
      company: "Growth Ventures",
      text: "The cost savings are incredible. We're saving ₹3.5 lakhs monthly while getting better HR support.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "How does AI improve HR services?",
      answer: "Our AI-powered platform provides intelligent insights, automates repetitive tasks, enhances recruitment accuracy, and offers predictive analytics for better decision-making. This results in 60% cost savings and improved efficiency."
    },
    {
      question: "What's included in virtual HR services?",
      answer: "Complete HR management including compliance, recruitment, payroll, employee engagement, performance management, policy development, and 24/7 HR support with AI-powered insights and automation."
    },
    {
      question: "How much can I save with virtual HR?",
      answer: "Most businesses save 50-70% on HR costs compared to traditional in-house HR teams. Our AI-powered solutions reduce manual work and improve efficiency, leading to significant cost savings."
    },
    {
      question: "Is the service suitable for startups?",
      answer: "Absolutely! Our AI-powered virtual HR services are perfect for startups and SMEs. We provide enterprise-level HR support at a fraction of the cost, helping you scale efficiently."
    },
    {
      question: "How does AI recruitment work?",
      answer: "Our AI recruitment system uses intelligent algorithms to screen candidates, match skills to job requirements, schedule interviews, and provide predictive analytics for better hiring decisions."
    },
    {
      question: "What about data security?",
      answer: "We use enterprise-grade security with end-to-end encryption, secure cloud infrastructure, and strict data protection protocols to ensure your HR data is completely secure."
    }
  ];

  const FloatingCard = ({ children, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ 
        y: -10, 
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:border-white/40 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );

  return (
    <>
      {/* SEO Metadata */}
      <Helmet>
        <title>AI-Powered Virtual HR Services India | Transform HR with AI | Hire With Prachi</title>
        <meta name="description" content="Transform your HR with AI-powered virtual HR solutions. Save up to 60% on costs while getting enterprise-level HR support. Complete compliance, recruitment, and payroll management." />
        <meta name="keywords" content="AI-powered virtual HR services, AI HR solutions, virtual HR management, HR automation, AI recruitment, smart HR compliance, HR cost optimization, virtual HR consultant" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AI-Powered Virtual HR Services India" />
        <meta property="og:description" content="Transform your HR with AI-powered virtual HR solutions. Save up to 60% on costs while getting enterprise-level HR support." />
        <meta property="og:type" content="service" />
        <meta property="og:url" content="https://prachi-hr.com/services/virtual-hr-services" />
        <meta property="og:image" content="https://prachi-hr.com/assets/images/ai-virtual-hr-services.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI-Powered Virtual HR Services India" />
        <meta name="twitter:description" content="Transform your HR with AI-powered virtual HR solutions. Save up to 60% on costs while getting enterprise-level HR support." />
        <meta name="twitter:image" content="https://prachi-hr.com/assets/images/ai-virtual-hr-services-twitter.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://prachi-hr.com/services/virtual-hr-services" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <ScrollProgressBar />
      <HireWithPrachiTopBar />
      <HireWithPrachiHeader />

      {/* AI-Era Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.05)_50%,transparent_75%)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        
        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="text-center">
            {/* AI-Era Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm mb-8"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              <span className="text-sm font-medium text-white">AI-Powered HR Solutions</span>
            </motion.div>
            
            {/* Hero Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Transform Your HR
              </span>
              <br />
              <span className="text-white">With AI-Powered Solutions</span>
            </motion.h1>
            
            {/* Hero Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Experience the future of HR management with our AI-driven virtual HR services. 
              Save up to 60% on costs while getting enterprise-level HR support.
            </motion.p>
            
            {/* Advanced CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              {/* Primary CTA */}
              <button 
                onClick={() => setShowCalendly(true)}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-semibold text-white text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Free AI Assessment
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              {/* Secondary CTA */}
              <button className="group px-8 py-4 border-2 border-white/20 rounded-2xl font-semibold text-white text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Watch AI Demo
              </button>
            </motion.div>
            
            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center items-center gap-8 text-gray-400"
            >
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-white" />
                  ))}
                </div>
                <span className="text-sm">500+ AI-Powered Clients</span>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-sm">4.9/5 AI Satisfaction Score</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-sm">60% Cost Reduction</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-6">
              <Brain className="w-5 h-5 text-purple-500 mr-2" />
              <span className="text-sm font-medium text-purple-700">AI-Powered Features</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Experience the Future of
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> HR Management</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-driven platform combines human expertise with cutting-edge technology 
              to deliver unprecedented HR efficiency and insights.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiFeatures.map((feature, index) => (
              <FloatingCard key={index} delay={index * 0.1}>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center text-sm text-purple-600 font-medium">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Learn More
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive ROI Calculator */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Calculate Your
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> ROI</span>
            </h2>
            <p className="text-xl text-gray-300">
              See how much you can save with our AI-powered HR solutions
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Your Current Setup</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Number of Employees: {employeeCount}</label>
                    <input 
                      type="range" 
                      min="1" 
                      max="500" 
                      value={employeeCount}
                      onChange={(e) => setEmployeeCount(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Current HR Costs (₹/month)</label>
                    <input 
                      type="number" 
                      value={currentCost}
                      onChange={(e) => setCurrentCost(parseInt(e.target.value))}
                      placeholder="50000"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-6">Your Savings</h3>
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8">
                  <div className="text-4xl font-bold text-white mb-2">₹{savings.toLocaleString()}</div>
                  <div className="text-white/80">Monthly Savings</div>
                </div>
                <div className="mt-4 text-gray-300">
                  <div className="text-2xl font-bold text-green-400">{savingsPercentage}%</div>
                  <div>Cost Reduction</div>
                </div>
                <div className="mt-4 text-gray-300">
                  <div className="text-lg font-bold text-blue-400">₹{virtualHRCost.toLocaleString()}</div>
                  <div>Virtual HR Cost</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Complete AI-Powered
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> HR Solutions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From recruitment to compliance, our AI-powered platform handles every aspect of HR management
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-[2px] bg-white rounded-2xl" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to={service.link}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 inline-block text-center"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Trusted by Leading Companies
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.position}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our AI-powered virtual HR services
            </p>
          </motion.div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your HR?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join 500+ companies that have already transformed their HR with AI-powered solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowCalendly(true)}
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Start Free AI Assessment
              </button>
              <button
                onClick={handleBrochureDownload}
                className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Download AI Guide
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <HireWithPrachiFooter />
      <GPT4oMiniChatbot />
      
      {/* Modals */}
      {showCalendly && (
        <CalendlyBooking 
          isOpen={showCalendly} 
          onClose={() => setShowCalendly(false)} 
        />
      )}
      
      {showBrochureModal && (
        <BrochureDownloadModal 
          isOpen={showBrochureModal} 
          onClose={() => setShowBrochureModal(false)} 
        />
      )}
    </>
  );
} 