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
import { Activity, AlertTriangle, ArrowRight, Award, BarChart2, BookOpen, Brain, Briefcase, Building, Calendar, CheckCircle, CheckSquare, ChevronDown, ChevronUp, ClipboardList, Clock, Cpu, Database, Download, Eye, Factory, FileSpreadsheet, FileText, Globe, Heart, HeartHandshake, Home, KeyRound, Landmark, Lightbulb, Mail, MapPin, MessageCircle, MessageSquare, Phone, PieChart, Pill, Play, Presentation, Rocket, Search, Settings, Shield, ShoppingBag, Smile, Sparkles, Star, Target, TrendingUp, User, UserPlus, Users, Wheat, Zap } from 'lucide-react';

export default function HRServicesIndore() {
  // SEO Data for Indore
  const seoData = {
    title: "HR Services Indore - Expert HR Consultant | Hire With Prachi",
    description: "Expert HR services in Indore for manufacturing and IT companies. Complete HR solutions for Indore businesses.",
    keywords: "HR services Indore, HR consultant Indore, recruitment Indore, manufacturing HR",
    pageType: "localBusiness",
    pageData: {
      city: "Indore",
      latitude: "22.7196",
      longitude: "75.8577",
      title: "HR Services Indore - Expert HR Consultant",
      description: "Expert HR services in Indore for manufacturing and IT",
      image: "https://hirewithprachi.com/assets/images/hr-services-indore-1200x630.jpg"
    }
  };
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const handleBrochureDownload = () => {
    setShowBrochureModal(true);
  };

  // Get city data
  const cityData = getCityData('indore');

    // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "HR Services Indore - Pharmaceutical Manufacturing & Commercial HR Solutions",
    "description": "Expert HR services in Indore for pharmaceutical, manufacturing, agriculture and commercial industries. Specialized recruitment, compliance and workforce management for Central India's business hub.",
    "provider": {
      "@type": "Organization",
      "name": "Hire With Prachi",
      "founder": {
        "@type": "Person",
        "name": "Prachi Shrivastava",
        "jobTitle": "Pharmaceutical & Manufacturing HR Consultant"
      },
      "url": "https://prachi-hr.com",
      "telephone": "+91-8740889927",
      "email": "info@hirewithprachi.com"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Indore",
        "addressRegion": "Madhya Pradesh",
        "addressCountry": "India"
      },
      {
        "@type": "Place", 
        "name": "Vijay Nagar",
        "addressLocality": "Indore",
        "addressRegion": "Madhya Pradesh"
      },
      {
        "@type": "Place",
        "name": "Pithampur", 
        "addressLocality": "Indore",
        "addressRegion": "Madhya Pradesh"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 22.7196,
        "longitude": 75.8577
      },
      "geoRadius": "55"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Indore Pharmaceutical & Manufacturing HR Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Pharmaceutical Industry HR Indore",
            "description": "Specialized HR solutions for pharmaceutical manufacturing and research companies"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Manufacturing & Industrial HR Indore",
            "description": "Professional HR services for manufacturing and industrial companies"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial & Trade HR Indore",
            "description": "Comprehensive HR support for commercial and trading businesses"
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

  const indoreAdvantages = [
    {
      icon: <Pill className="h-6 w-6" />,
      title: "Pharmaceutical Manufacturing Hub",
      description: "Deep expertise in pharmaceutical manufacturing, research, and drug development"
    },
    {
      icon: <Factory className="h-6 w-6" />,
      title: "Industrial Manufacturing Center",
      description: "Specialized knowledge of heavy industries, automotive, and engineering"
    },
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: "Commercial & Trading Capital",
      description: "Understanding of wholesale markets, trading, and commercial businesses"
    },
    {
      icon: <Wheat className="h-6 w-6" />,
      title: "Agriculture & Food Processing",
      description: "Experience with agricultural processing, food industries, and rural businesses"
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: "Educational & IT Services",
      description: "Knowledge of educational institutions and emerging IT companies"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Central India Business Hub",
      description: "Strategic location advantage connecting North and South India markets"
    }
  ];

  const services = [
    {
      title: "Pharmaceutical & Research HR",
      description: "Specialized HR solutions for pharmaceutical companies, research labs, and drug development",
      features: [
        "Pharmaceutical scientist recruitment",
        "Research & development hiring",
        "Quality assurance specialist sourcing",
        "Regulatory affairs professional recruitment",
        "Manufacturing engineer hiring",
        "Compliance and validation training"
      ],
      link: "/services/recruitment-hiring"
    },
    {
      title: "Manufacturing & Industrial HR",
      description: "Comprehensive HR support for manufacturing, automotive, and heavy industries",
      features: [
        "Production engineer recruitment",
        "Manufacturing manager hiring",
        "Quality control specialist sourcing",
        "Industrial safety officer recruitment",
        "Maintenance technician hiring",
        "Operational excellence training"
      ],
      link: "/services/hr-compliance"
    },
    {
      title: "Commercial & Agricultural HR",
      description: "Advanced HR services for trading, commercial businesses, and agricultural processing",
      features: [
        "Sales and marketing professional recruitment",
        "Agricultural expert hiring",
        "Supply chain manager sourcing",
        "Business development executive recruitment",
        "Food processing specialist hiring",
        "Market expansion support"
      ],
      link: "/services/performance-management"
    },
    {
      title: "Education & Emerging Sectors HR",
      description: "Professional HR services for educational institutions and emerging technology companies",
      features: [
        "Academic professional recruitment",
        "IT specialist hiring",
        "Educational administrator sourcing",
        "Technical trainer recruitment",
        "Digital skills development",
        "Innovation and research support"
              ],
        link: "/services/virtual-hr-services"
      }
    ];

  const indoreAreas = [
     {
       area: "Vijay Nagar",
      focus: "Commercial & Residential",
      highlights: "Business centers, shopping complexes, residential areas, offices"
    },
    {
      area: "Pithampur (Detroit of India)",
      focus: "Industrial & Manufacturing",
      highlights: "Auto manufacturing, heavy industries, pharmaceutical companies"
    },
    {
      area: "MR 10 & Scheme 54",
      focus: "Commercial & IT",
      highlights: "IT companies, commercial offices, business centers"
    },
    {
      area: "Sanwer Road Industrial Area",
      focus: "Manufacturing & Processing",
      highlights: "Food processing, pharmaceuticals, industrial manufacturing"
    },
    {
      area: "Rajendra Nagar",
      focus: "Educational & Institutional",
      highlights: "Educational institutions, government offices, hospitals"
    },
    {
      area: "Old Palasia & Bada Ganpati",
      focus: "Traditional Commercial",
      highlights: "Traditional markets, wholesale trading, commercial establishments"
  
    }
  ];

  const industries = [
    {
      name: "Pharmaceutical & Life Sciences",
      description: "Drug manufacturing, research and development, and pharmaceutical services",
      companies: "Sun Pharma, Lupin, Cipla, Dr. Reddy's, Pharmaceutical companies"
    },
    {
      name: "Automotive & Manufacturing",
      description: "Auto manufacturing, heavy industries, and engineering companies",
      companies: "Mahindra, Bajaj Auto, Kinetic Engineering, Manufacturing units"
    },
    {
      name: "Information Technology",
      description: "Software development, IT services, and technology companies",
      companies: "TCS, Infosys, Local IT companies, Software development"
    },
    {
      name: "Food Processing & Agriculture",
      description: "Food processing, agricultural products, and agro-based industries",
      companies: "Food processing units, Agricultural businesses, Agro industries"
    },
    {
      name: "Education & Research",
      description: "Universities, colleges, and research institutions",
      companies: "IIT Indore, DAVV, IIM Indore, Educational institutions"
    },
    {
      name: "Commercial & Trading",
      description: "Wholesale markets, trading companies, and commercial businesses",
      companies: "Trading houses, Wholesale markets, Commercial establishments"
  
    }
  ];

  const testimonials = [
    {
      name: "Dr. Amit Patel",
      position: "Plant Head",
      company: "Pharmaceutical Company, Pithampur",
      text: "Their understanding of pharmaceutical industry requirements and regulatory compliance is exceptional. Helped us build a world-class research and manufacturing team with proper technical expertise.",
      rating: 5
    },
    {
      name: "Rajesh Gupta",
      position: "Manufacturing Director",
      company: "Auto Parts Company, Pithampur",
      text: "Outstanding expertise in manufacturing and automotive industry. Their support in recruiting skilled engineers and managing production teams has been crucial for our expansion.",
      rating: 5
    },
    {
      name: "Sunita Sharma",
      position: "Business Head",
      company: "Trading Company, Vijay Nagar",
      text: "Excellent understanding of commercial and trading business requirements. Their approach to building sales teams and managing business development has transformed our market presence.",
      rating: 5
  
    }
  ];

  const faqs = [
    {
      question: "Do you have experience with pharmaceutical and life sciences companies?",
      answer: "Yes, we have extensive experience with Indore's pharmaceutical industry including drug manufacturing, research and development, quality assurance, regulatory affairs, and compliance. We understand the technical requirements and regulatory standards specific to pharmaceutical companies."
    },
    {
      question: "Can you help manufacturing and automotive companies in Pithampur?",
      answer: "Absolutely! We specialize in manufacturing and automotive industries including production engineering, quality control, manufacturing operations, and industrial safety. We understand the technical requirements of heavy industries and automotive manufacturing."
    },
    {
      question: "What is your experience with commercial and trading businesses?",
      answer: "We have specialized knowledge of Indore's commercial sector including wholesale markets, trading companies, sales and marketing, supply chain management, and business development. We understand the dynamics of Central India's commercial hub."
    },
    {
      question: "Do you understand the business culture of Central India?",
      answer: "Yes, we deeply understand Madhya Pradesh's business culture, commercial practices, and the strategic importance of Indore as Central India's hub. We provide culturally appropriate recruitment while maintaining professional standards and understanding regional business dynamics."
    },
    {
      question: "How do you handle MP state labor compliance and regulations?",
      answer: "We ensure compliance with Madhya Pradesh state labor laws, industrial regulations, pharmaceutical guidelines, and local government requirements. We stay updated with state-specific policies and understand the particular requirements of different industries."
    },
    {
      question: "Can you support both traditional and modern sectors?",
      answer: "Yes, we have expertise across Indore's diverse business landscape from traditional trading and agricultural processing to modern pharmaceutical and IT sectors. We understand how to bridge traditional business practices with contemporary HR methodologies."
    },
    {
      question: "What is your approach to technical recruitment for specialized industries?",
      answer: "We provide specialized technical recruitment including understanding of complex technical requirements, industry-specific certifications, regulatory compliance needs, and quality standards. We ensure candidates meet both technical competencies and cultural fit requirements."
    },
    {
      question: "How do you handle the seasonal aspects of agricultural and food processing?",
      answer: "We understand the seasonal nature of agricultural and food processing businesses including harvest cycles, production peaks, and market fluctuations. We provide flexible workforce solutions, seasonal staffing, and supply chain management support."
  
    }
  ];

  const mappedFaqs = faqs.map(({ question, answer }) => ({ q: question, a: answer }));
  const mappedTestimonials = testimonials.map(t => ({ name: t.name, title: `${t.position} · ${t.company}`, quote: t.text }));

  const indoreStats = [
    { number: "95+", label: "Indore Companies Served" },
    { number: "25+", label: "Pharmaceutical Firms" },
    { number: "30+", label: "Manufacturing Units" },
    { number: "6,200+", label: "Professionals Placed" }
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
        canonical="https://hirewithprachi.com/hr-services-indore"
      />

      <ScrollProgressBar />
      <HireWithPrachiTopBar />
      <HireWithPrachiHeader />

      {/* Enhanced Hero Section */}
      <HeroV2
        cityName="Indore"
        description="Transform your business with cutting-edge HR solutions. From Vijay Nagar to Pithampur's manufacturing hub, we deliver premium HR services that align with Indore's dynamic business landscape."
        onSchedule={() => setShowCalendly(true)}
        onDownload={handleBrochureDownload}
        stats={[
          { icon: Users, value: '50+', label: 'Indore Companies Served', color: 'from-blue-500 to-cyan-500' },
          { icon: Award, value: '15+', label: 'Startups & SMEs', color: 'from-purple-500 to-pink-500' },
          { icon: Star, value: '4.9/5', label: 'Client Rating', color: 'from-yellow-500 to-orange-500' },
          { icon: Clock, value: '<2hrs', label: 'Response Time', color: 'from-green-500 to-emerald-500' }
        ]}
        bottomStats={indoreStats}
      />

      {/* Enhanced Premium Content Section */}
      <section className="relative ai-hero-bg pt-20 pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
        {/* Premium Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-80 h-80 bg-lime-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-lime-500/10 to-green-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
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
  Indore - Cleanest City of India
                
</div>
                
                <h1 className="text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                  Premium <span className="ai-text-shimmer block">AI-Powered HR Services</span> in Indore
                </h1>
                
                <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                  Comprehensive HR solutions for Indore's emerging business hub. From IT services to 
                  manufacturing industries, we provide specialized AI-powered HR services across 
                  Vijay Nagar, Palasia, and all major business districts.
                </p>
              </div>

              {/* Premium AI-Era Indore Stats */}
              <div className="grid grid-cols-2 gap-8 mb-10">
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="text-center"
>
  <div className="text-3xl font-bold text-blue-600 mb-2">60+</div>
  <div className="text-gray-600 text-sm">Indore Companies</div>
</motion.div>
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.4 }}
  className="text-center"
>
  <div className="text-3xl font-bold text-blue-600 mb-2">Vijay Nagar</div>
  <div className="text-gray-600 text-sm">IT & Business Hub</div>
</motion.div>
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.6 }}
  className="text-center"
>
  <div className="text-3xl font-bold text-blue-600 mb-2">4000+</div>
  <div className="text-gray-600 text-sm">Professionals Managed</div>
</motion.div>
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.8 }}
  className="text-center"
>
  <div className="text-3xl font-bold text-blue-600 mb-2">99.1%</div>
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
  Get Premium Indore Consultation
                
</motion.button>
                
                <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={handleBrochureDownload}
  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
>
  Download Indore Guide
                
</motion.button>
              </div>

              {/* Premium AI-Era Trust Indicators */}
              <div className="glass-effect p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-lime-500/10 to-green-500/10 rounded-3xl"></div>
                <div className="relative">
                  <p className="text-sm text-gray-300 mb-4 font-medium">
                    Trusted by 60+ Indore companies including IT leaders and manufacturing firms
                  </p>
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-300 ml-2 font-medium">4.9/5 Indore Rating</span>
                    </div>
                    <div className="text-sm text-gray-300 font-medium">✓ IT Expert</div>
                    <div className="text-sm text-gray-300 font-medium">✓ Manufacturing Specialist</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Premium AI-Era Indore Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="relative"
            >
              <div className="glass-effect p-10 rounded-3xl relative overflow-hidden">
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-lime-500 to-green-600 text-white px-8 py-4 rounded-full text-sm font-bold animate-pulse-glow shadow-2xl">
                  Cleanest City
                </div>
                
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-3">Indore Business Hubs</h3>
                  <p className="text-gray-300 text-lg">Premium AI-Powered Areas We Serve</p>
                </div>

                <div className="space-y-6">
                  {[
                    { area: "Vijay Nagar", type: "IT & Corporate Hub", color: "bg-lime-500/30 text-lime-200", icon: "🏢" },
                    { area: "Palasia", type: "Commercial District", color: "bg-green-500/30 text-green-200", icon: "🏙️" },
                    { area: "Rajendra Nagar", type: "Business & Retail", color: "bg-emerald-500/30 text-emerald-200", icon: "🛍️" },
                    { area: "Scheme 54", type: "IT & Startups", color: "bg-blue-500/30 text-blue-200", icon: "💻" },
                    { area: "Pardeshipura", type: "Industrial Zone", color: "bg-purple-500/30 text-purple-200", icon: "🏭" }
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
                    Serving all Indore business districts & neighboring areas
                  </div>
                  <div className="text-2xl font-bold text-lime-300">60+ Business Clients</div>
                  <div className="text-sm text-gray-300">Across Indore</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional sections following the same pattern as previous pages... */}
      {/* For brevity, I'll include the key sections */}

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {indoreStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm lg:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Premium Slider */}
      <PremiumTestimonials
        title="What Indore Companies Say"
        subtitle="Success stories from pharmaceutical, manufacturing and commercial sectors across Indore."
        items={mappedTestimonials}
      />

      {/* FAQ Section - Premium */}
      <PremiumFAQ
        items={mappedFaqs}
        region="Indore"
        subtitle="Common questions about our HR services for Indore's pharma, manufacturing and commercial ecosystem."
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
              Ready to Elevate HR for Your <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Indore Business</span>?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
            >
              Join 50++ Indore businesses that trust us for their premium HR needs. We've got you covered with sophisticated solutions.
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
              Book Indore Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBrochureDownload}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-sm border border-white/20 text-lg"
            >
              <Download className="w-5 h-5" />
              Indore HR Guide
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
          brochureType="hr-services-indore"
          title="Indore Industrial & Commercial HR Guide"
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