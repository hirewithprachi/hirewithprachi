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
import { CheckCircle, Users, Shield, Zap, Award, MessageSquare, BarChart2, Search, Phone, Mail, ChevronDown, ChevronUp, Download, Calendar, MessageCircle, FileText, MapPin, Building, Briefcase, TrendingUp, Globe, Star, Clock, ArrowRight, Play, Landmark, Home, User, Heart, Eye, AlertTriangle, CheckSquare, ClipboardList, BookOpen, Settings, Target, Rocket, Cpu, Brain, Sparkles, HeartHandshake, Smile, Presentation, PieChart, Activity, Database, KeyRound, UserPlus, FileSpreadsheet, Lightbulb, Utensils, Scale, Wheat } from 'lucide-react';

export default function HRServicesLucknow() {
  // SEO Data for Lucknow
  const seoData = {
    title: "HR Services Lucknow - Expert HR Consultant | Hire With Prachi",
    description: "Expert HR services in Lucknow for government and IT companies. Complete HR solutions for Lucknow businesses.",
    keywords: "HR services Lucknow, HR consultant Lucknow, recruitment Lucknow, government HR",
    pageType: "localBusiness",
    pageData: {
      city: "Lucknow",
      latitude: "26.8467",
      longitude: "80.9462",
      title: "HR Services Lucknow - Expert HR Consultant",
      description: "Expert HR services in Lucknow for government and IT",
      image: "https://hirewithprachi.com/assets/images/hr-services-lucknow-1200x630.jpg"
    }
  };
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const handleBrochureDownload = () => {
    setShowBrochureModal(true);
  };

  // Get city data
  const cityData = getCityData('lucknow');

    // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "HR Services Lucknow - Government Food & Cultural Industry HR Solutions",
    "description": "Expert HR services in Lucknow for government, food processing, handicrafts and cultural industries. Specialized recruitment, compliance and workforce management for UP's Nawabi capital.",
    "provider": {
      "@type": "Organization",
      "name": "Hire With Prachi",
      "founder": {
        "@type": "Person",
        "name": "Prachi Shrivastava",
        "jobTitle": "Government & Cultural HR Consultant"
      },
      "url": "https://prachi-hr.com",
      "telephone": "+91-8740889927",
      "email": "info@hirewithprachi.com"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Lucknow",
        "addressRegion": "Uttar Pradesh",
        "addressCountry": "India"
      },
        {
        "@type": "Place", 
        "name": "Gomti Nagar",
        "addressLocality": "Lucknow",
        "addressRegion": "Uttar Pradesh"
      },
      {
        "@type": "Place",
        "name": "Hazratganj", 
        "addressLocality": "Lucknow",
        "addressRegion": "Uttar Pradesh"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 26.8467,
        "longitude": 80.9462
      },
      "geoRadius": "60"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Lucknow Government & Cultural HR Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Government & Administration HR Lucknow",
            "description": "Specialized HR solutions for UP government and administrative organizations"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Food Processing & Agro HR Lucknow",
            "description": "Professional HR services for food processing and agricultural industries"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cultural & Heritage HR Lucknow",
            "description": "Comprehensive HR support for cultural industries and heritage organizations"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "100"
    }
  };

  const lucknowAdvantages = [
    {
      icon: <Landmark className="h-6 w-6" />,
      title: "Government & Administrative Hub",
      description: "Deep expertise in UP state government, administrative services, and public sector"
    },
    {
      icon: <Utensils className="h-6 w-6" />,
      title: "Food Processing & Agro Industries",
      description: "Specialized knowledge of food processing, agricultural, and agro-based industries"
    },
    {
      icon: <Scale className="h-6 w-6" />,
      title: "Legal & Judicial Services",
      description: "Understanding of legal firms, courts, and judicial administration"
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: "Cultural & Heritage Organizations",
      description: "Experience with Nawabi culture, arts, music, and cultural institutions"
    },
    {
      icon: <Wheat className="h-6 w-6" />,
      title: "Agriculture & Rural Development",
      description: "Knowledge of agricultural cooperatives, rural development, and farming"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Emerging Business Sectors",
      description: "Understanding of IT services, education, and modern business development"
    }
  ];

  const services = [
    {
      title: "Government & Administrative HR",
      description: "Specialized HR solutions for UP government departments and administrative organizations",
      features: [
        "Government officer recruitment",
        "Administrative staff hiring",
        "Policy implementation support",
        "Public service training programs",
        "Compliance and governance",
        "Bureaucratic process optimization"
      ],
      link: "/services/recruitment-hiring"
    },
    {
      title: "Food Processing & Agro Industries HR",
      description: "Comprehensive HR support for food processing, agricultural, and agro-based businesses",
      features: [
        "Food technologist recruitment",
        "Agricultural expert hiring",
        "Quality control specialist sourcing",
        "Production manager recruitment",
        "Supply chain professional hiring",
        "Rural development coordination"
      ],
      link: "/services/hr-compliance"
    },
    {
      title: "Cultural & Legal Services HR",
      description: "Advanced HR services for cultural organizations, legal firms, and judicial administration",
      features: [
        "Legal professional recruitment",
        "Cultural program manager hiring",
        "Arts and music specialist sourcing",
        "Heritage preservation expert recruitment",
        "Judicial support staff hiring",
        "Traditional arts development"
      ],
      link: "/services/performance-management"
    },
    {
      title: "Education & Emerging Sectors HR",
      description: "Professional HR services for educational institutions and emerging business sectors",
      features: [
        "Academic professional recruitment",
        "IT specialist hiring",
        "Educational administrator sourcing",
        "Training and development coordinator",
        "Modern business support",
        "Digital transformation assistance"
              ],
        link: "/services/virtual-hr-services"
      }
    ];

  const lucknowAreas = [
    {
      area: "Hazratganj",
      focus: "Commercial & Business",
      highlights: "Business centers, banks, commercial establishments, shopping"
    },
    {
      area: "Gomti Nagar",
      focus: "Modern Corporate",
      highlights: "IT companies, modern offices, residential complexes, malls"
    },
    {
      area: "Lalbagh",
      focus: "Government & Administration",
      highlights: "Secretariat, government offices, administrative centers"
    },
    {
      area: "Aliganj",
      focus: "Industrial & Manufacturing",
      highlights: "Industrial area, manufacturing units, warehouses"
    },
    {
      area: "Indira Nagar",
      focus: "Educational & Residential",
      highlights: "Universities, colleges, educational institutions, housing"
    },
    {
      area: "Chowk",
      focus: "Traditional & Cultural",
      highlights: "Old city, traditional markets, cultural centers, heritage"
  
    }
  ];

  const industries = [
    {
      name: "Government & Public Administration",
      description: "UP state government, administrative services, and public sector organizations",
      companies: "UP Government, Administrative offices, Public sector undertakings"
    },
    {
      name: "Food Processing & Agriculture",
      description: "Food processing, agricultural products, and agro-based industries",
      companies: "Food processing units, Agricultural cooperatives, Agro industries"
    },
    {
      name: "Information Technology",
      description: "Software development, IT services, and emerging technology companies",
      companies: "TCS, Local IT companies, Software development centers"
    },
    {
      name: "Education & Research",
      description: "Universities, colleges, research institutions, and educational services",
      companies: "Lucknow University, IIM Lucknow, Educational institutions"
    },
    {
      name: "Legal & Judicial Services",
      description: "High court, legal firms, and judicial administration",
      companies: "Lucknow High Court, Legal firms, Judicial services"
    },
    {
      name: "Cultural & Heritage",
      description: "Cultural organizations, arts, music, and heritage preservation",
      companies: "Cultural centers, Music institutions, Heritage organizations"
  
    }
  ];

  const testimonials = [
    {
      name: "Anil Kumar Singh",
      position: "Joint Secretary",
      company: "UP Government, Lalbagh",
      text: "Their understanding of government procedures and administrative requirements is exceptional. Helped us streamline our recruitment processes and improve efficiency across departments.",
      rating: 5
    },
    {
      name: "Sunita Sharma",
      position: "Plant Manager",
      company: "Food Processing Company, Aliganj",
      text: "Outstanding expertise in food processing industry and quality standards. Their support in building our technical teams and managing seasonal workforce has been invaluable.",
      rating: 5
    },
    {
      name: "Dr. Rajesh Verma",
      position: "Principal",
      company: "Educational Institution, Indira Nagar",
      text: "Excellent understanding of educational sector requirements and cultural sensitivities. Their approach to recruiting academic staff while preserving institutional values has transformed our capabilities.",
      rating: 5
  
    }
  ];

  const faqs = [
    {
      question: "Do you have experience with UP government and administrative recruitment?",
      answer: "Yes, we have extensive experience with Uttar Pradesh state government departments, administrative services, and public sector organizations. We understand government procedures, compliance requirements, bureaucratic processes, and the unique culture of public administration in UP."
    },
    {
      question: "Can you help food processing and agricultural businesses?",
      answer: "Absolutely! We specialize in food processing, agricultural, and agro-based industries including food technology, quality control, supply chain management, and rural development. We understand seasonal workforce management and agricultural cycles."
    },
    {
      question: "What is your experience with legal and judicial services?",
      answer: "We have specialized knowledge of legal firms, judicial administration, and court operations. We can recruit legal professionals, judicial support staff, and administrative personnel while understanding the formal requirements and protocols of legal institutions."
    },
    {
      question: "Do you understand Lucknow's cultural and traditional aspects?",
      answer: "Yes, we deeply understand Lucknow's rich Nawabi culture, traditional arts, music, and heritage. We provide culturally sensitive recruitment, ensure respectful workplace practices, and help organizations balance traditional values with modern professional requirements."
    },
    {
      question: "How do you handle UP state labor compliance and regulations?",
      answer: "We ensure compliance with Uttar Pradesh state labor laws, government regulations, and local administrative requirements. We stay updated with state-specific policies and understand the particular requirements for different sectors including government and agriculture."
    },
    {
      question: "Can you support both traditional and modern sectors?",
      answer: "Yes, we have expertise across Lucknow's diverse business landscape from traditional government and cultural sectors to modern IT and educational institutions. We understand how to bridge traditional administrative practices with contemporary HR methodologies."
    },
    {
      question: "What is your approach to working with government organizations?",
      answer: "We provide specialized government HR services including understanding of bureaucratic processes, compliance with administrative procedures, recruitment according to government protocols, and training programs that align with public service requirements and cultural expectations."
    },
    {
      question: "How do you handle the formal protocols and etiquette required in Lucknow?",
      answer: "We understand the importance of formal protocols, traditional etiquette, and respectful communication in Lucknow's business environment. We ensure all interactions maintain appropriate dignity, respect cultural nuances, and follow established protocols while achieving modern business objectives."
  
    }
  ];

  const mappedFaqs = faqs.map(({ question, answer }) => ({ q: question, a: answer }));
  const mappedTestimonials = testimonials.map(t => ({ name: t.name, title: `${t.position} · ${t.company}`, quote: t.text }));

  const lucknowStats = [
    { number: "110+", label: "Lucknow Organizations Served" },
    { number: "30+", label: "Government Departments" },
    { number: "25+", label: "Food & Agro Companies" },
    { number: "7,800+", label: "Professionals Placed" }
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
        canonical="https://hirewithprachi.com/hr-services-lucknow"
      />

      <ScrollProgressBar />
      <HireWithPrachiTopBar />
      <HireWithPrachiHeader />

      {/* Enhanced Hero Section */}
      <HeroV2
        cityName="Lucknow"
        description="Accelerate your business with cutting-edge HR solutions. From Gomti Nagar to Hazratganj's business hub, we deliver premium HR services that align with Lucknow's dynamic business landscape."
        onSchedule={() => setShowCalendly(true)}
        onDownload={handleBrochureDownload}
        stats={[
          { icon: Users, value: '30+', label: 'Lucknow Companies Served', color: 'from-blue-500 to-cyan-500' },
          { icon: Award, value: '8+', label: 'Startups & SMEs', color: 'from-purple-500 to-pink-500' },
          { icon: Star, value: '4.9/5', label: 'Client Rating', color: 'from-yellow-500 to-orange-500' },
          { icon: Clock, value: '<2hrs', label: 'Response Time', color: 'from-green-500 to-emerald-500' }
        ]}
        bottomStats={lucknowStats}
      />

      {/* Enhanced Premium Content Section */}
      <section className="relative ai-hero-bg pt-20 pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
        {/* Premium Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
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
  Lucknow - City of Nawabs
                
</div>
                
                <h1 className="text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                  Premium <span className="ai-text-shimmer block">AI-Powered HR Services</span> in Lucknow
                </h1>
                
                <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                  Comprehensive HR solutions for Lucknow's cultural and business hub. From government 
                  services to modern IT companies, we provide specialized AI-powered HR services across 
                  Gomti Nagar, Hazratganj, and all major business districts.
                </p>
              </div>

              {/* Premium AI-Era Lucknow Stats */}
              <div className="grid grid-cols-2 gap-8 mb-10">
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="text-center"
>
  <div className="text-3xl font-bold text-blue-600 mb-2">70+</div>
  <div className="text-gray-600 text-sm">Lucknow Companies</div>
</motion.div>
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.4 }}
  className="text-center"
>
  <div className="text-3xl font-bold text-blue-600 mb-2">Gomti Nagar</div>
  <div className="text-gray-600 text-sm">Government & IT Hub</div>
</motion.div>
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.6 }}
  className="text-center"
>
  <div className="text-3xl font-bold text-blue-600 mb-2">5000+</div>
  <div className="text-gray-600 text-sm">Professionals Managed</div>
</motion.div>
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.8 }}
  className="text-center"
>
  <div className="text-3xl font-bold text-blue-600 mb-2">99.2%</div>
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
  Get Premium Lucknow Consultation
                
</motion.button>
                
                <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={handleBrochureDownload}
  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
>
  Download Lucknow Guide
                
</motion.button>
              </div>

              {/* Premium AI-Era Trust Indicators */}
              <div className="glass-effect p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-3xl"></div>
                <div className="relative">
                  <p className="text-sm text-gray-300 mb-4 font-medium">
                    Trusted by 70+ Lucknow companies including government agencies and modern IT firms
                  </p>
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-300 ml-2 font-medium">4.9/5 Lucknow Rating</span>
                    </div>
                    <div className="text-sm text-gray-300 font-medium">✓ Government Expert</div>
                    <div className="text-sm text-gray-300 font-medium">✓ Cultural Specialist</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Premium AI-Era Lucknow Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="relative"
            >
              <div className="glass-effect p-10 rounded-3xl relative overflow-hidden">
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-8 py-4 rounded-full text-sm font-bold animate-pulse-glow shadow-2xl">
                  City of Nawabs
                </div>
                
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-3">Lucknow Business Hubs</h3>
                  <p className="text-gray-300 text-lg">Premium AI-Powered Areas We Serve</p>
                </div>

                <div className="space-y-6">
                  {[
                    { area: "Gomti Nagar", type: "Government & IT Hub", color: "bg-indigo-500/30 text-indigo-200", icon: "🏛️" },
                    { area: "Hazratganj", type: "Commercial District", color: "bg-blue-500/30 text-blue-200", icon: "🏢" },
                    { area: "Aliganj", type: "Residential & Business", color: "bg-purple-500/30 text-purple-200", icon: "🏘️" },
                    { area: "Mahanagar", type: "Corporate Offices", color: "bg-green-500/30 text-green-200", icon: "🏢" },
                    { area: "Indira Nagar", type: "IT & Startups", color: "bg-cyan-500/30 text-cyan-200", icon: "💻" }
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
                    Serving all Lucknow business districts & neighboring areas
                  </div>
                  <div className="text-2xl font-bold text-indigo-300">70+ Business Clients</div>
                  <div className="text-sm text-gray-300">Across Lucknow</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <PremiumTestimonials
        title="What Lucknow Organizations Say"
        subtitle="Success stories from government, food processing, educational, and cultural organizations across UP's Nawabi capital."
        items={mappedTestimonials}
      />

      <PremiumFAQ
        items={mappedFaqs}
        region="Lucknow"
        subtitle="Common questions about our HR services specifically for Lucknow's government, cultural, and business ecosystem."
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
              Ready to Elevate HR for Your <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Lucknow Business</span>?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
            >
              Join 30++ Lucknow businesses that trust us for their premium HR needs. We've got you covered with sophisticated solutions.
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
              Book Lucknow Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBrochureDownload}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-sm border border-white/20 text-lg"
            >
              <Download className="w-5 h-5" />
              Lucknow HR Guide
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
          brochureType="hr-services-lucknow"
          title="Lucknow Government & Cultural HR Guide"
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