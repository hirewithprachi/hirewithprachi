import { motion } from 'framer-motion';
import React, { useState } from 'react';
import SEOOptimizer from '../components/SEOOptimizer';
import HeroV2 from '../components/city-landing/HeroV2';

import { Link } from 'react-router-dom';
import HireWithPrachiTopBar from '../components/hirable/HirableTopBar';
import HireWithPrachiHeader from '../components/hirable/HirableHeader';
import HireWithPrachiFooter from '../components/hirable/HirableFooter';
import GPT4oMiniChatbot from '../components/GPT4oMiniChatbot';
import ScrollProgressBar from '../components/ScrollProgressBar';
import BrochureDownloadModal from '../components/BrochureDownloadModal';
import CalendlyBooking from '../components/CalendlyBooking';
import { getCityData } from '../data/cityData';
import PremiumFAQ from '../components/sections/PremiumFAQ';
import PremiumTestimonials from '../components/sections/PremiumTestimonials';
import CityInternalLinks from '../components/sections/CityInternalLinks';
import { Activity, AlertTriangle, ArrowRight, Award, BarChart2, BookOpen, Brain, Briefcase, Building, Calendar, CheckCircle, CheckSquare, ChevronDown, ChevronUp, ClipboardList, Clock, Cpu, Database, Download, Eye, Factory, FileSpreadsheet, FileText, Beaker, Diamond, Globe, Heart, HeartHandshake, Home, KeyRound, Landmark, Lightbulb, Mail, MapPin, MessageCircle, MessageSquare, Phone, PieChart, Play, Presentation, Rocket, Search, Settings, Shield, Shirt, Smile, Sparkles, Star, Target, TrendingUp, User, UserPlus, Users, Zap } from 'lucide-react';

export default function HRServicesAhmedabad() {
  // SEO Data for Ahmedabad
  const seoData = {
    title: "HR Services Ahmedabad - Expert HR Consultant | Hire With Prachi",
    description: "Expert HR services in Ahmedabad for manufacturing and textile companies. Complete HR solutions for Ahmedabad businesses.",
    keywords: "HR services Ahmedabad, HR consultant Ahmedabad, recruitment Ahmedabad, manufacturing HR",
    pageType: "localBusiness",
    pageData: {
      city: "Ahmedabad",
      latitude: "23.0225",
      longitude: "72.5714",
      title: "HR Services Ahmedabad - Expert HR Consultant",
      description: "Expert HR services in Ahmedabad for manufacturing and textile",
      image: "https://hirewithprachi.com/assets/images/hr-services-ahmedabad-1200x630.jpg"
    }
  };
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const handleBrochureDownload = () => {
    setShowBrochureModal(true);
  };

  // Get city data
  const cityData = getCityData('ahmedabad');

    // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "HR Services Ahmedabad - Textile & Chemical Industry HR Solutions",
    "description": "Expert HR services in Ahmedabad for textile, chemical, pharmaceutical and manufacturing companies. Specialized recruitment, compliance and workforce management for Gujarat's commercial capital.",
    "provider": {
      "@type": "Organization",
      "name": "Hire With Prachi",
      "founder": {
        "@type": "Person",
        "name": "Prachi Shrivastava",
        "jobTitle": "Industrial & Textile HR Consultant"
      },
      "url": "https://prachi-hr.com",
      "telephone": "+91-8740889927",
      "email": "info@hirewithprachi.com"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Ahmedabad",
        "addressRegion": "Gujarat",
        "addressCountry": "India"
      },
        {
        "@type": "Place", 
        "name": "GIFT City",
        "addressLocality": "Ahmedabad",
        "addressRegion": "Gujarat"
      },
      {
        "@type": "Place",
        "name": "Naroda", 
        "addressLocality": "Ahmedabad",
        "addressRegion": "Gujarat"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 23.0225,
        "longitude": 72.5714
      },
      "geoRadius": "60"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Ahmedabad Industrial HR Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Textile Industry HR Ahmedabad",
            "description": "Specialized HR solutions for textile manufacturing and garment industries"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Chemical Industry HR Ahmedabad",
          "description": "Professional HR services for chemical and pharmaceutical manufacturing"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "GIFT City Corporate HR",
          "description": "Corporate HR solutions for financial services in GIFT City"
        }
      }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "100"
    }
  };

  const ahmedabadAdvantages = [
    {
      icon: <Shirt className="h-6 w-6" />,
      title: "Textile Industry Capital",
      description: "Deep expertise in textile manufacturing, garment production, and fabric industries"
    },
    {
      icon: <Beaker className="h-6 w-6" />,
      title: "Chemical & Pharma Hub",
      description: "Specialized knowledge of chemical processing, pharmaceutical manufacturing"
    },
    {
      icon: <Diamond className="h-6 w-6" />,
      title: "Diamond & Jewelry Expertise",
      description: "Understanding of diamond cutting, jewelry manufacturing, and precious stones industry"
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: "GIFT City Financial Hub",
      description: "Experience with international financial services and fintech companies"
    },
    {
      icon: <Factory className="h-6 w-6" />,
      title: "Manufacturing Excellence",
      description: "Comprehensive knowledge of industrial manufacturing and processing industries"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Entrepreneurial Ecosystem",
      description: "Understanding of Gujarat's business-friendly environment and entrepreneurial culture"
    }
  ];

  const services = [
    {
      title: "Textile & Garment Industry HR",
      description: "Specialized HR solutions for textile mills, garment manufacturers, and fabric industries",
      features: [
        "Textile engineer recruitment",
        "Production supervisor hiring",
        "Quality control specialist sourcing",
        "Garment designer recruitment",
        "Factory operations management",
        "Compliance and safety training"
      ],
      link: "/services/recruitment-hiring"
    },
    {
      title: "Chemical & Pharmaceutical HR",
      description: "Comprehensive HR support for chemical processing and pharmaceutical manufacturing",
      features: [
        "Chemical engineer recruitment",
        "Process technician hiring",
        "Quality assurance specialist sourcing",
        "R&D scientist recruitment",
        "Safety officer hiring",
        "Regulatory compliance training"
      ],
      link: "/services/hr-compliance"
    },
    {
      title: "GIFT City Financial Services HR",
      description: "Advanced HR services for financial institutions and fintech companies in GIFT City",
      features: [
        "Financial analyst recruitment",
        "Fintech developer hiring",
        "Investment banker sourcing",
        "Compliance officer recruitment",
        "Risk management specialist hiring",
        "International finance expertise"
      ],
      link: "/services/performance-management"
    },
    {
      title: "Diamond & Jewelry Industry HR",
      description: "Specialized HR services for diamond cutting, jewelry manufacturing, and precious stones",
      features: [
        "Diamond grader recruitment",
        "Jewelry designer hiring",
        "Craftsperson sourcing",
        "Quality inspector recruitment",
        "Export specialist hiring",
        "Traditional skill preservation"
      ],
      link: "/services/virtual-hr-services"
    }
  ];

  const ahmedabadAreas = [
    {
      area: "GIFT City",
      focus: "Financial Services & Fintech",
      highlights: "International finance, fintech companies, global banks"
    },
    {
      area: "Naroda",
      focus: "Industrial Manufacturing",
      highlights: "Chemical plants, pharmaceutical companies, industrial estates"
    },
    {
      area: "Vatva",
      focus: "Textile & Chemical",
      highlights: "Textile mills, chemical processing, dyeing units"
    },
    {
      area: "Sanand",
      focus: "Automotive & Manufacturing",
      highlights: "Tata Nano plant, auto components, manufacturing units"
    },
    {
      area: "Bopal",
      focus: "IT & Corporate",
      highlights: "IT companies, corporate offices, business centers"
    },
    {
      area: "Vastrapur",
      focus: "Diamond & Jewelry",
      highlights: "Diamond cutting, jewelry manufacturing, precious stones"
  
    }
  ];

  const industries = [
    {
      name: "Textile & Garment",
      description: "Textile manufacturing, garment production, and fabric processing",
      companies: "Arvind Mills, Welspun Group, Vardhman Group, Raymond, Textile mills"
    },
    {
      name: "Chemical & Petrochemical",
      description: "Chemical processing, petrochemicals, and specialty chemicals",
      companies: "Reliance Industries, ONGC, Indian Oil, Chemical complexes"
    },
    {
      name: "Pharmaceutical",
      description: "Drug manufacturing, API production, and pharmaceutical research",
      companies: "Zydus Cadila, Torrent Pharma, Intas Pharma, Sun Pharma"
    },
    {
      name: "Diamond & Jewelry",
      description: "Diamond cutting, polishing, and jewelry manufacturing",
      companies: "Surat Diamond Bourse, Jewelry exporters, Diamond traders"
    },
    {
      name: "Financial Services",
      description: "Banking, investment, and financial technology in GIFT City",
      companies: "NSE, BSE, Banks, Fintech companies, Investment firms"
    },
    {
      name: "Engineering & Manufacturing",
      description: "Mechanical engineering, industrial equipment, and precision manufacturing",
      companies: "L&T, Tata Motors, Engineering firms, Manufacturing units"
  
    }
  ];

  const testimonials = [
    {
      name: "Kiran Patel",
      position: "Plant Manager",
      company: "Textile Manufacturing, Vatva",
      text: "Their understanding of textile industry requirements and local labor dynamics is exceptional. Helped us optimize our production team and improve efficiency by 35%.",
      rating: 5
    },
    {
      name: "Dr. Amit Shah",
      position: "Head of Operations",
      company: "Chemical Company, Naroda",
      text: "Outstanding expertise in chemical industry compliance and safety requirements. Their support in building our technical teams has been invaluable for our expansion.",
      rating: 5
    },
    {
      name: "Priya Mehta",
      position: "VP Finance",
      company: "Fintech Firm, GIFT City",
      text: "Professional service with deep understanding of financial services requirements. Perfect partner for scaling our fintech operations in Gujarat's international financial hub.",
      rating: 5
  
    }
  ];

  const faqs = [
    {
      question: "Do you have experience with textile and garment industry recruitment?",
      answer: "Yes, we have extensive experience with Gujarat's textile industry including textile mills, garment manufacturers, dyeing units, and fabric processing companies. We understand textile engineering roles, production processes, quality standards, and the unique requirements of this traditional yet modern industry."
    },
    {
      question: "Can you help chemical and pharmaceutical companies with specialized recruitment?",
      answer: "Absolutely! We specialize in chemical and pharmaceutical industry recruitment including process engineers, quality assurance specialists, R&D scientists, safety officers, and regulatory compliance professionals. We understand the technical requirements and safety standards specific to these industries."
    },
    {
      question: "What is your experience with GIFT City and financial services?",
      answer: "We have specialized knowledge of GIFT City's international financial services ecosystem including banks, fintech companies, investment firms, and regulatory bodies. We understand global compliance requirements, international banking standards, and can recruit for both domestic and international financial roles."
    },
    {
      question: "Do you understand the diamond and jewelry industry requirements?",
      answer: "Yes, we have experience with Gujarat's diamond and jewelry industry including diamond grading, cutting, polishing, jewelry design, and precious stones trading. We understand the traditional skills, quality standards, and export requirements specific to this specialized industry."
    },
    {
      question: "How do you handle Gujarat state labor compliance and regulations?",
      answer: "We ensure compliance with Gujarat state labor laws, industrial regulations, factory acts, and local government requirements. We stay updated with state-specific regulations including those for industrial estates, SEZs, and special economic zones like GIFT City."
    },
    {
      question: "Can you support both traditional industries and modern sectors?",
      answer: "Yes, we have expertise across Gujarat's diverse industrial landscape from traditional textile and chemical industries to modern fintech and IT sectors. We understand how to bridge traditional business practices with modern HR methodologies while respecting local culture."
    },
    {
      question: "What is your approach to industrial safety and compliance in manufacturing?",
      answer: "We provide comprehensive industrial safety training, compliance workshops, and ensure adherence to factory safety standards including chemical handling, textile machinery safety, and environmental compliance. We understand the specific safety requirements of different manufacturing sectors."
    },
    {
      question: "How do you handle the cultural aspects of working in Gujarat?",
      answer: "We understand Gujarat's entrepreneurial culture, business traditions, and the importance of community relationships in business. We provide cultural orientation, ensure respectful workplace practices, and help companies build inclusive environments that honor local customs while maintaining professional standards."
  
    }
  ];

  const mappedFaqs = faqs.map(({ question, answer }) => ({ q: question, a: answer }));
  const mappedTestimonials = testimonials.map(t => ({ name: t.name, title: `${t.position} · ${t.company}`, quote: t.text }));

  const ahmedabadStats = [
    { number: "160+", label: "Ahmedabad Companies Served" },
    { number: "45+", label: "Textile & Chemical Firms" },
    { number: "30+", label: "Manufacturing Units" },
    { number: "14,000+", label: "Workers Managed" }
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
        canonical="https://hirewithprachi.com/hr-services-ahmedabad"
      />

      <ScrollProgressBar />
      <HireWithPrachiTopBar />
      <HireWithPrachiHeader />

      {/* Enhanced Hero Section */}
      <HeroV2
        cityName="Ahmedabad"
        description="Transform your business with cutting-edge HR solutions. From SG Road to GIFT City's financial hub, we deliver premium HR services that align with Ahmedabad's dynamic business landscape."
        onSchedule={() => setShowCalendly(true)}
        onDownload={handleBrochureDownload}
        stats={[
          { icon: Users, value: '80+', label: 'Ahmedabad Companies Served', color: 'from-blue-500 to-cyan-500' },
          { icon: Award, value: '25+', label: 'Startups & SMEs', color: 'from-purple-500 to-pink-500' },
          { icon: Star, value: '4.9/5', label: 'Client Rating', color: 'from-yellow-500 to-orange-500' },
          { icon: Clock, value: '<2hrs', label: 'Response Time', color: 'from-green-500 to-emerald-500' }
        ]}
        bottomStats={ahmedabadStats}
      />

      {/* Enhanced Premium Content Section */}
      <section className="relative ai-hero-bg pt-20 pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
        {/* Premium Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-80 h-80 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            
            {/* Premium AI-Era Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-10 lg:mb-0"
            >
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
  Ahmedabad - Manchester of India
                
</div>
                
                <h1 className="text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                  Premium <span className="ai-text-shimmer block">AI-Powered HR Services</span> in Ahmedabad
                </h1>
                
                <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                  Comprehensive HR solutions for Ahmedabad's textile and manufacturing hub. From textile 
                  industries to diamond processing, we provide specialized AI-powered HR services across 
                  Vastrapur, SG Road, and all major industrial areas.
                </p>
              </div>

              {/* Premium AI-Era Ahmedabad Stats */}
              <div className="grid grid-cols-2 gap-8 mb-10">
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="text-center"
>
  <div className="text-3xl font-bold text-blue-600 mb-2">120+</div>
  <div className="text-gray-600 text-sm">Ahmedabad Companies</div>
</motion.div>
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.4 }}
  className="text-center"
>
  <div className="text-3xl font-bold text-blue-600 mb-2">Vastrapur</div>
  <div className="text-gray-600 text-sm">Textile & Diamond Hub</div>
</motion.div>
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.6 }}
  className="text-center"
>
  <div className="text-3xl font-bold text-blue-600 mb-2">10000+</div>
  <div className="text-gray-600 text-sm">Workers Managed</div>
</motion.div>
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.8 }}
  className="text-center"
>
  <div className="text-3xl font-bold text-blue-600 mb-2">99.5%</div>
  <div className="text-gray-600 text-sm">Compliance Rate</div>
</motion.div>
              </div>

              {/* Premium AI-Era CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 mb-10">
                <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => setShowCalendly(true)}
  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
>
  Get Premium Ahmedabad Consultation
                
</motion.button>
                
                <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={handleBrochureDownload}
  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
>
  Download Ahmedabad Guide
                
</motion.button>
              </div>

              {/* Premium AI-Era Trust Indicators */}
              <div className="glass-effect p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-3xl"></div>
                <div className="relative">
                  <p className="text-sm text-gray-300 mb-4 font-medium">
                    Trusted by 120+ Ahmedabad companies including textile giants and diamond processors
                  </p>
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-300 ml-2 font-medium">4.9/5 Ahmedabad Rating</span>
                    </div>
                    <div className="text-sm text-gray-300 font-medium">✓ Textile Expert</div>
                    <div className="text-sm text-gray-300 font-medium">✓ Diamond Specialist</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Premium AI-Era Ahmedabad Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="relative"
            >
              <div className="glass-effect p-10 rounded-3xl relative overflow-hidden">
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full text-sm font-bold animate-pulse-glow shadow-2xl">
                  Manchester India
                </div>
                
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-3">Ahmedabad Industrial Hubs</h3>
                  <p className="text-gray-300 text-lg">Premium AI-Powered Areas We Serve</p>
                </div>

                <div className="space-y-6">
                  {[
                    { area: "Vastrapur", type: "Textile Manufacturing", color: "bg-amber-500/30 text-amber-200", icon: "🧵" },
                    { area: "SG Road", type: "Corporate Offices", color: "bg-orange-500/30 text-orange-200", icon: "🏢" },
                    { area: "Satellite", type: "Diamond Processing", color: "bg-yellow-500/30 text-yellow-200", icon: "💎" },
                    { area: "Bopal", type: "IT & Startups", color: "bg-green-500/30 text-green-200", icon: "💻" },
                    { area: "Naroda", type: "Industrial Zone", color: "bg-blue-500/30 text-blue-200", icon: "🏭" }
                  ].map((location, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={`p-4 rounded-2xl ${location.color} backdrop-blur-sm border border-white/20`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{location.icon}</span>
                        <div>
                          <div className="font-bold text-lg">{location.area}</div>
                          <div className="text-sm opacity-90">{location.type}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <div className="text-sm text-gray-300 mb-3">
                    <MapPin className="h-5 w-5 inline mr-2" />
                    Serving all Ahmedabad industrial corridors & neighboring areas
                  </div>
                  <div className="text-2xl font-bold text-amber-300">120+ Industrial Clients</div>
                  <div className="text-sm text-gray-300">Across Ahmedabad</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Premium Slider */}
      <PremiumTestimonials
        title="What Ahmedabad Companies Say"
        subtitle="Success stories from textile, chemical, financial, and manufacturing companies across Gujarat's commercial landscape."
        items={mappedTestimonials}
      />

      {/* FAQ Section - Premium */}
      <PremiumFAQ
        items={mappedFaqs}
        region="Ahmedabad"
        subtitle="Common questions about our HR services specifically for Ahmedabad's industrial and financial ecosystem."
      />

      
      <CityInternalLinks />

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl lg:text-6xl font-bold text-white mb-6"
            >
              Ready to Elevate HR for Your <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Ahmedabad Business</span>?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
            >
              Join 80++ Ahmedabad businesses that trust us for their premium HR needs. We've got you covered with sophisticated solutions.
            </motion.p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCalendly(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-500/20 text-lg"
            >
              <Calendar className="w-5 h-5" />
              Book Ahmedabad Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBrochureDownload}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-sm border border-white/20 text-lg"
            >
              <Download className="w-5 h-5" />
              Ahmedabad HR Guide
            </motion.button>
          </div>
        </div>
      </section>

      <HireWithPrachiFooter />
      <GPT4oMiniChatbot />

      {/* Modals */}
      {showBrochureModal && (
        <BrochureDownloadModal
          isOpen={showBrochureModal}
          onClose={() => setShowBrochureModal(false)}
          brochureType="hr-services-ahmedabad"
          title="Ahmedabad Industrial HR Guide"
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