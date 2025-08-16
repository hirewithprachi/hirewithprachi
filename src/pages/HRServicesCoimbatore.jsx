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
import { Activity, AlertTriangle, ArrowRight, Award, BarChart2, BookOpen, Brain, Briefcase, Building, Calendar, CheckCircle, CheckSquare, ChevronDown, ChevronUp, ClipboardList, Clock, Cpu, Database, Download, Eye, FileSpreadsheet, FileText, Globe, Heart, HeartHandshake, Home, KeyRound, Landmark, Lightbulb, Mail, MapPin, MessageCircle, MessageSquare, Phone, PieChart, Play, Presentation, Rocket, Search, Settings, Shield, Shirt, Smile, Sparkles, Star, Target, TrendingUp, User, UserPlus, Users, Wheat, Zap } from 'lucide-react';

export default function HRServicesCoimbatore() {
  // SEO Data for Coimbatore
  const seoData = {
    title: "HR Services Coimbatore - Expert HR Consultant | Hire With Prachi",
    description: "Expert HR services in Coimbatore for manufacturing and IT companies. Complete HR solutions for Coimbatore businesses.",
    keywords: "HR services Coimbatore, HR consultant Coimbatore, recruitment Coimbatore, manufacturing HR",
    pageType: "localBusiness",
    pageData: {
      city: "Coimbatore",
      latitude: "11.0168",
      longitude: "76.9558",
      title: "HR Services Coimbatore - Expert HR Consultant",
      description: "Expert HR services in Coimbatore for manufacturing and IT",
      image: "https://hirewithprachi.com/assets/images/hr-services-coimbatore-1200x630.jpg"
    }
  };
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const handleBrochureDownload = () => {
    setShowBrochureModal(true);
  };

  // Get city data
  const cityData = getCityData('coimbatore');

    // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "HR Services Coimbatore - Textile Manufacturing & Engineering HR Solutions",
    "description": "Expert HR services in Coimbatore for textile, manufacturing, engineering and IT industries. Specialized recruitment, compliance and workforce management for South India's textile capital.",
    "provider": {
      "@type": "Organization",
      "name": "Hire With Prachi",
      "founder": {
        "@type": "Person",
        "name": "Prachi Shrivastava",
        "jobTitle": "Textile & Manufacturing HR Consultant"
      },
      "url": "https://prachi-hr.com",
      "telephone": "+91-8740889927",
      "email": "info@hirewithprachi.com"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Coimbatore",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "India"
      },
      {
        "@type": "Place", 
        "name": "Peelamedu",
        "addressLocality": "Coimbatore",
        "addressRegion": "Tamil Nadu"
      },
      {
        "@type": "Place",
        "name": "Tidel Park",
        "addressLocality": "Coimbatore",
        "addressRegion": "Tamil Nadu"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 11.0168,
        "longitude": 76.9558
      },
      "geoRadius": "50"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Coimbatore Textile & Manufacturing HR Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Textile Industry HR Coimbatore",
            "description": "Specialized HR solutions for textile manufacturing and garment industries"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Engineering & Manufacturing HR Coimbatore",
          "description": "Professional HR services for engineering and manufacturing companies"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "IT & Technology HR Coimbatore",
          "description": "Comprehensive HR support for IT companies and technology businesses"
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

  const coimbatoreAdvantages = [
    {
      icon: <Shirt className="h-6 w-6" />,
      title: "Textile Capital of South India",
      description: "Deep expertise in textile manufacturing, spinning, weaving, and garment industries"
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Engineering & Manufacturing Hub",
      description: "Specialized knowledge of engineering works, machinery, and precision manufacturing"
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Emerging IT & Technology Center",
      description: "Understanding of growing IT sector, software development, and technology companies"
    },
    {
      icon: <Wheat className="h-6 w-6" />,
      title: "Agriculture & Food Processing",
      description: "Experience with agricultural processing, food industries, and agro-based businesses"
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: "Educational & Research Hub",
      description: "Knowledge of universities, research institutions, and technical education"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "South India Industrial Gateway",
      description: "Strategic advantage as major industrial center of Tamil Nadu and South India"
    }
  ];

  const services = [
    {
      title: "Textile & Garment Industry HR",
      description: "Specialized HR solutions for textile mills, spinning units, and garment manufacturing companies",
      features: [
        "Textile engineer recruitment",
        "Production manager hiring",
        "Quality control specialist sourcing",
        "Spinning technician recruitment",
        "Garment designer hiring",
        "Export coordinator recruitment"
      ],
      link: "/services/recruitment-hiring"
    },
    {
      title: "Engineering & Manufacturing HR",
      description: "Comprehensive HR support for engineering works, machinery manufacturing, and precision industries",
      features: [
        "Mechanical engineer recruitment",
        "Manufacturing engineer hiring",
        "Tool & die maker sourcing",
        "CNC operator recruitment",
        "Quality engineer hiring",
        "Industrial maintenance specialist"
      ],
      link: "/services/hr-compliance"
    },
    {
      title: "IT & Technology Sector HR",
      description: "Advanced HR services for IT companies, software development, and technology businesses",
      features: [
        "Software developer recruitment",
        "IT project manager hiring",
        "System administrator sourcing",
        "Technical support specialist recruitment",
        "Digital marketing professional hiring",
        "Technology innovation support"
      ],
      link: "/services/performance-management"
    },
    {
      title: "Agriculture & Food Processing HR",
      description: "Professional HR services for agro-industries, food processing, and agricultural businesses",
      features: [
        "Food technologist recruitment",
        "Agricultural engineer hiring",
        "Quality assurance specialist sourcing",
        "Supply chain manager recruitment",
        "Processing plant manager hiring",
        "Export business development"
      ],
      link: "/services/virtual-hr-services"
  
    }
  ];

  const coimbatoreAreas = [
    {
      area: "Peelamedu & SIPCOT",
      focus: "Industrial & Manufacturing",
      highlights: "Industrial estate, textile mills, engineering works, manufacturing units"
    },
    {
      area: "Tidel Park & IT Corridor",
      focus: "IT & Technology",
      highlights: "IT companies, software parks, technology centers, corporate offices"
    },
    {
      area: "Race Course & RS Puram",
      focus: "Commercial & Business",
      highlights: "Commercial centers, business offices, banking, trading establishments"
    },
    {
      area: "Saravanampatti",
      focus: "Residential & Mixed Development",
      highlights: "Residential complexes, educational institutions, commercial areas"
    },
    {
      area: "Kurichi & Thudiyalur",
      focus: "Textile & Traditional Industries",
      highlights: "Textile mills, spinning units, traditional manufacturing"
    },
    {
      area: "Ganapathy & Singanallur",
      focus: "Engineering & Heavy Industries",
      highlights: "Engineering works, heavy machinery, precision manufacturing"
    }
  ];

  const industries = [
    {
      name: "Textile & Apparel",
      description: "Textile manufacturing, spinning, weaving, and garment production",
      companies: "KPR Mill, Lakshmi Mills, Textile manufacturers, Garment exporters"
    },
    {
      name: "Engineering & Manufacturing",
      description: "Engineering works, machinery manufacturing, and precision industries",
      companies: "L&T, Engineering companies, Machinery manufacturers, Tool makers"
    },
    {
      name: "Information Technology",
      description: "Software development, IT services, and technology companies",
      companies: "Robert Bosch, IT companies, Software development centers"
    },
    {
      name: "Agriculture & Food Processing",
      description: "Food processing, agricultural products, and agro-based industries",
      companies: "Food processing units, Agricultural businesses, Export companies"
    },
    {
      name: "Education & Research",
      description: "Universities, colleges, and technical institutions",
      companies: "Anna University, PSG Tech, Bharathiar University, Educational institutions"
    },
    {
      name: "Healthcare & Pharmaceuticals",
      description: "Hospitals, healthcare services, and pharmaceutical companies",
      companies: "Healthcare organizations, Pharmaceutical companies, Medical equipment"
  
    }
  ];

  const testimonials = [
    {
      name: "Ravi Kumar",
      position: "Plant Manager",
      company: "Textile Mill, Peelamedu",
      text: "Their understanding of textile industry requirements and local workforce dynamics is exceptional. Helped us optimize our production teams and improve efficiency across all manufacturing processes.",
      rating: 5
    },
    {
      name: "Priya Rajesh",
      position: "Engineering Head",
      company: "Manufacturing Company, SIPCOT",
      text: "Outstanding expertise in engineering and manufacturing sector. Their support in recruiting skilled engineers and managing technical teams has been crucial for our expansion and automation projects.",
      rating: 5
    },
    {
      name: "Deepak Menon",
      position: "CTO",
      company: "IT Company, Tidel Park",
      text: "Excellent understanding of IT industry and emerging technology trends. Their approach to building our development teams and managing tech talent has transformed our capabilities in the South Indian market.",
      rating: 5
  
    }
  ];

  const faqs = [
    {
      question: "Do you have experience with textile and garment industries in Coimbatore?",
      answer: "Yes, we have extensive experience with Coimbatore's textile sector including textile mills, spinning units, weaving companies, garment manufacturing, and export businesses. We understand the technical requirements and production processes specific to textile industries."
    },
    {
      question: "Can you help engineering and manufacturing companies?",
      answer: "Absolutely! We specialize in engineering and manufacturing industries including machinery manufacturing, precision engineering, tool and die making, CNC operations, and heavy engineering works that Coimbatore is famous for."
    },
    {
      question: "What is your experience with IT companies in Coimbatore?",
      answer: "We have growing experience with Coimbatore's emerging IT sector including software development, IT services, digital transformation, and technology companies. We understand the unique requirements of IT businesses in Tier-2 cities."
    },
    {
      question: "Do you understand the business culture of South India?",
      answer: "Yes, we deeply understand Tamil Nadu's business culture, industrial traditions, and the specific work environment of Coimbatore. We provide culturally appropriate recruitment while maintaining professional standards and respecting regional business practices."
    },
    {
      question: "How do you handle Tamil Nadu state labor compliance?",
      answer: "We ensure compliance with Tamil Nadu state labor laws, industrial regulations, textile industry guidelines, and local government requirements. We stay updated with state-specific policies and understand the regulatory environment for different sectors."
    },
    {
      question: "Can you support both traditional and modern sectors?",
      answer: "Yes, we have expertise across Coimbatore's diverse industrial landscape from traditional textile and engineering industries to modern IT and technology sectors. We bridge traditional manufacturing practices with contemporary HR methodologies."
    },
    {
      question: "What is your approach to technical recruitment for specialized industries?",
      answer: "We provide specialized technical recruitment including understanding of complex manufacturing processes, textile technology, engineering specifications, and quality standards. We ensure candidates meet both technical competencies and cultural fit requirements."
    },
    {
      question: "How do you handle the seasonal aspects of textile and agricultural industries?",
      answer: "We understand the seasonal nature of textile production and agricultural processing including cotton seasons, export cycles, and production peaks. We provide flexible workforce solutions, seasonal staffing, and capacity management support."
  
    }
  ];

  const mappedFaqs = faqs.map(({ question, answer }) => ({ q: question, a: answer }));
  const mappedTestimonials = testimonials.map(t => ({ name: t.name, title: `${t.position} · ${t.company}`, quote: t.text }));

  const coimbatoreStats = [
    { number: "90+", label: "Coimbatore Companies Served" },
    { number: "35+", label: "Textile & Manufacturing" },
    { number: "20+", label: "Engineering Firms" },
    { number: "6,800+", label: "Professionals Placed" }
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
        canonical="https://hirewithprachi.com/hr-services-coimbatore"
      />

      <ScrollProgressBar />
      <HireWithPrachiTopBar />
      <HireWithPrachiHeader />

      {/* Enhanced Hero Section */}
      <HeroV2
        cityName="Coimbatore"
        description="Transform your business with cutting-edge HR solutions. From Peelamedu to Tidel Park's tech hub, we deliver premium HR services that align with Coimbatore's dynamic business landscape."
        onSchedule={() => setShowCalendly(true)}
        onDownload={handleBrochureDownload}
        stats={[
          { icon: Users, value: '35+', label: 'Coimbatore Companies Served', color: 'from-blue-500 to-cyan-500' },
          { icon: Award, value: '10+', label: 'Startups & SMEs', color: 'from-purple-500 to-pink-500' },
          { icon: Star, value: '4.9/5', label: 'Client Rating', color: 'from-yellow-500 to-orange-500' },
          { icon: Clock, value: '<2hrs', label: 'Response Time', color: 'from-green-500 to-emerald-500' }
        ]}
        bottomStats={coimbatoreStats}
      />

      {/* Enhanced Premium Content Section */}
      <section className="relative ai-hero-bg pt-20 pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
        {/* Premium Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-80 h-80 bg-violet-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-80 h-80 bg-fuchsia-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
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
  Coimbatore - Manchester of South India
                
</div>
                
                <h1 className="text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                  Premium <span className="ai-text-shimmer block">AI-Powered HR Services</span> in Coimbatore
                </h1>
                
                <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                  Comprehensive HR solutions for Coimbatore's textile and manufacturing hub. From textile 
                  industries to modern IT services, we provide specialized AI-powered HR services across 
                  Peelamedu, Race Course, and all major business districts.
                </p>
              </div>

              {/* Premium AI-Era Coimbatore Stats */}
              <div className="grid grid-cols-2 gap-8 mb-10">
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="text-center"
>
  <div className="text-3xl font-bold text-blue-600 mb-2">40+</div>
  <div className="text-gray-600 text-sm">Coimbatore Companies</div>
</motion.div>
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.4 }}
  className="text-center"
>
  <div className="text-3xl font-bold text-blue-600 mb-2">Peelamedu</div>
  <div className="text-gray-600 text-sm">Textile & IT Hub</div>
</motion.div>
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.6 }}
  className="text-center"
>
  <div className="text-3xl font-bold text-blue-600 mb-2">2500+</div>
  <div className="text-gray-600 text-sm">Professionals Managed</div>
</motion.div>
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.8 }}
  className="text-center"
>
  <div className="text-3xl font-bold text-blue-600 mb-2">98.9%</div>
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
  Get Premium Coimbatore Consultation
                
</motion.button>
                
                <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={handleBrochureDownload}
  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
>
  Download Coimbatore Guide
                
</motion.button>
              </div>

              {/* Premium AI-Era Trust Indicators */}
              <div className="glass-effect p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-3xl"></div>
                <div className="relative">
                  <p className="text-sm text-gray-300 mb-4 font-medium">
                    Trusted by 40+ Coimbatore companies including textile giants and modern IT firms
                  </p>
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-300 ml-2 font-medium">4.9/5 Coimbatore Rating</span>
                    </div>
                    <div className="text-sm text-gray-300 font-medium">✓ Textile Expert</div>
                    <div className="text-sm text-gray-300 font-medium">✓ Manufacturing Specialist</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Premium AI-Era Coimbatore Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="relative"
            >
              <div className="glass-effect p-10 rounded-3xl relative overflow-hidden">
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-violet-500 to-purple-600 text-white px-8 py-4 rounded-full text-sm font-bold animate-pulse-glow shadow-2xl">
                  Manchester South
                </div>
                
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-3">Coimbatore Business Hubs</h3>
                  <p className="text-gray-300 text-lg">Premium AI-Powered Areas We Serve</p>
                </div>

                <div className="space-y-6">
                  {[
                    { area: "Peelamedu", type: "Textile & IT Hub", color: "bg-violet-500/30 text-violet-200", icon: "🧵" },
                    { area: "Race Course", type: "Commercial District", color: "bg-purple-500/30 text-purple-200", icon: "🏙️" },
                    { area: "Singanallur", type: "Industrial Zone", color: "bg-fuchsia-500/30 text-fuchsia-200", icon: "🏭" },
                    { area: "Gandhipuram", type: "Business & Retail", color: "bg-blue-500/30 text-blue-200", icon: "🛍️" },
                    { area: "Saibaba Colony", type: "IT & Startups", color: "bg-green-500/30 text-green-200", icon: "💻" }
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
                    Serving all Coimbatore business districts & neighboring areas
                  </div>
                  <div className="text-2xl font-bold text-violet-300">40+ Business Clients</div>
                  <div className="text-sm text-gray-300">Across Coimbatore</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {coimbatoreStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-indigo-600 mb-2">
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
        title="What Coimbatore Companies Say"
        subtitle="Success stories from textile, engineering, manufacturing, and IT companies across Coimbatore."
        items={mappedTestimonials}
      />

      {/* FAQ Section - Premium */}
      <PremiumFAQ
        items={mappedFaqs}
        region="Coimbatore"
        subtitle="Common questions about our HR services for textile, engineering, manufacturing and IT in Coimbatore."
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
              Ready to Elevate HR for Your <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Coimbatore Business</span>?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
            >
              Join 35++ Coimbatore businesses that trust us for their premium HR needs. We've got you covered with sophisticated solutions.
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
              Book Coimbatore Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBrochureDownload}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-sm border border-white/20 text-lg"
            >
              <Download className="w-5 h-5" />
              Coimbatore HR Guide
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
          brochureType="hr-services-coimbatore"
          title="Coimbatore Textile & Manufacturing HR Guide"
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