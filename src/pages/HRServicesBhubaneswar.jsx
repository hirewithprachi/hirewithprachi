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
import { CheckCircle, Users, Shield, Zap, Award, MessageSquare, BarChart2, Search, Phone, Mail, ChevronDown, ChevronUp, Download, Calendar, MessageCircle, FileText, MapPin, Building, Briefcase, TrendingUp, Globe, Star, Clock, ArrowRight, Play, Landmark, Home, User, Heart, Eye, AlertTriangle, CheckSquare, ClipboardList, BookOpen, Settings, Target, Rocket, Cpu, Brain, Sparkles, HeartHandshake, Smile, Presentation, PieChart, Activity, Database, KeyRound, UserPlus, FileSpreadsheet, Lightbulb, Mountain, Droplets } from 'lucide-react';

export default function HRServicesBhubaneswar() {
  // SEO Data for Bhubaneswar
  const seoData = {
    title: "HR Services Bhubaneswar - Expert HR Consultant | Hire With Prachi",
    description: "Expert HR services in Bhubaneswar for IT and government companies. Complete HR solutions for Bhubaneswar businesses.",
    keywords: "HR services Bhubaneswar, HR consultant Bhubaneswar, recruitment Bhubaneswar, IT HR",
    pageType: "localBusiness",
    pageData: {
      city: "Bhubaneswar",
      latitude: "20.2961",
      longitude: "85.8245",
      title: "HR Services Bhubaneswar - Expert HR Consultant",
      description: "Expert HR services in Bhubaneswar for IT and government",
      image: "https://hirewithprachi.com/assets/images/hr-services-bhubaneswar-1200x630.jpg"
    }
  };
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const handleBrochureDownload = () => {
    setShowBrochureModal(true);
  };

  // Get city data
  const cityData = getCityData('bhubaneswar');

    // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "HR Services Bhubaneswar - Government IT & Mining Industry HR Solutions",
    "description": "Expert HR services in Bhubaneswar for government, IT, mining and steel industries. Specialized recruitment, compliance and workforce management for Odisha's Temple City.",
    "provider": {
      "@type": "Organization",
      "name": "Hire With Prachi",
      "founder": {
        "@type": "Person",
        "name": "Prachi Shrivastava",
        "jobTitle": "Government & IT HR Consultant"
      },
      "url": "https://prachi-hr.com",
      "telephone": "+91-8740889927",
      "email": "info@hirewithprachi.com"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Bhubaneswar",
        "addressRegion": "Odisha",
        "addressCountry": "India"
      },
        {
        "@type": "Place", 
        "name": "Patia",
        "addressLocality": "Bhubaneswar",
        "addressRegion": "Odisha"
      },
      {
        "@type": "Place",
        "name": "Infocity", 
        "addressLocality": "Bhubaneswar",
        "addressRegion": "Odisha"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 20.2961,
        "longitude": 85.8245
      },
      "geoRadius": "50"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Bhubaneswar Government & IT HR Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Government & Administration HR Bhubaneswar",
            "description": "Specialized HR solutions for Odisha government and administrative organizations"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "IT & Technology HR Bhubaneswar",
          "description": "Professional HR services for IT companies and technology businesses"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Mining & Steel Industry HR Bhubaneswar",
          "description": "Comprehensive HR support for mining, steel, and heavy industries"
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

  const bhubaneswarAdvantages = [
    {
      icon: <Landmark className="h-6 w-6" />,
      title: "Government & Administrative Hub",
      description: "Deep expertise in Odisha state government, administrative services, and public sector"
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Emerging IT & Tech Hub",
      description: "Understanding of growing IT sector, software development, and technology companies"
    },
    {
      icon: <Mountain className="h-6 w-6" />,
      title: "Mining & Steel Industries",
      description: "Specialized knowledge of mining operations, steel plants, and heavy industries"
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: "Educational & Research Center",
      description: "Experience with universities, research institutions, and educational organizations"
    },
    {
      icon: <Droplets className="h-6 w-6" />,
      title: "Cultural & Tourism Industries",
      description: "Knowledge of temple tourism, cultural organizations, and heritage management"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Eastern India Gateway",
      description: "Strategic advantage as Odisha's capital and Eastern India business center"
    }
  ];

  const services = [
    {
      title: "Government & Administrative HR",
      description: "Specialized HR solutions for Odisha government departments and administrative organizations",
      features: [
        "Government officer recruitment",
        "Administrative staff hiring",
        "Policy implementation support",
        "Public service training programs",
        "Compliance and governance",
        "Bureaucratic efficiency improvement"
      ],
      link: "/services/recruitment-hiring"
    },
    {
      title: "IT & Technology Sector HR",
      description: "Comprehensive HR support for IT companies, software development, and technology businesses",
      features: [
        "Software developer recruitment",
        "IT project manager hiring",
        "Technical architect sourcing",
        "Quality assurance specialist recruitment",
        "Digital transformation support",
        "Technology skills development"
      ],
      link: "/services/hr-compliance"
    },
    {
      title: "Mining & Heavy Industries HR",
      description: "Advanced HR services for mining companies, steel plants, and heavy industrial operations",
      features: [
        "Mining engineer recruitment",
        "Safety officer hiring",
        "Plant operations manager sourcing",
        "Technical specialist recruitment",
        "Industrial safety training",
        "Environmental compliance support"
      ],
      link: "/services/performance-management"
    },
    {
      title: "Education & Tourism HR",
      description: "Professional HR services for educational institutions and tourism industry organizations",
      features: [
        "Academic professional recruitment",
        "Research scientist hiring",
        "Tourism manager sourcing",
        "Cultural program coordinator recruitment",
        "Heritage management specialist hiring",
        "Educational administration support"
      ],
      link: "/services/virtual-hr-services"
    }
  ];

  const bhubaneswarAreas = [
    {
      area: "Infocity & Patia",
      focus: "IT & Technology",
      highlights: "IT companies, software parks, technology centers, corporate offices"
    },
    {
      area: "Secretariat & Unit-2",
      focus: "Government & Administration",
      highlights: "Government offices, administrative centers, public sector organizations"
    },
    {
      area: "Nayapalli & Jaydev Vihar",
      focus: "Educational & Residential",
      highlights: "Universities, educational institutions, residential complexes"
    },
    {
      area: "Chandrasekharpur",
      focus: "Corporate & Commercial",
      highlights: "Corporate offices, business centers, commercial establishments"
    },
    {
      area: "Old Town & Temple Area",
      focus: "Cultural & Tourism",
      highlights: "Temples, heritage sites, cultural centers, tourism offices"
    },
    {
      area: "Industrial Estate",
      focus: "Manufacturing & Industry",
      highlights: "Industrial units, manufacturing companies, processing plants"
    }
  ];

  const industries = [
    {
      name: "Government & Public Administration",
      description: "Odisha state government, administrative services, and public sector organizations",
      companies: "Odisha Government, Administrative offices, Public sector undertakings"
    },
    {
      name: "Information Technology",
      description: "Software development, IT services, and emerging technology companies",
      companies: "TCS, Infosys, Mindtree, Local IT companies, Software development"
    },
    {
      name: "Mining & Steel",
      description: "Mining operations, steel plants, and heavy industrial companies",
      companies: "SAIL, NALCO, OMC, Mining companies, Steel plants"
    },
    {
      name: "Education & Research",
      description: "Universities, colleges, research institutions, and educational services",
      companies: "IIT Bhubaneswar, KIIT, Utkal University, Research institutes"
    },
    {
      name: "Tourism & Culture",
      description: "Tourism companies, cultural organizations, and heritage management",
      companies: "Tourism companies, Heritage organizations, Cultural centers"
    },
    {
      name: "Healthcare & Pharmaceuticals",
      description: "Hospitals, healthcare services, and pharmaceutical companies",
      companies: "AIIMS Bhubaneswar, Healthcare organizations, Pharma companies"
    }
  ];

  const testimonials = [
    {
      name: "Pradeep Kumar Mohanty",
      position: "Joint Secretary",
      company: "Odisha Government, Secretariat",
      text: "Their understanding of government procedures and administrative requirements is exceptional. Helped us modernize our recruitment processes while maintaining administrative protocols and efficiency.",
              rating: 5
      },
      {
        name: "Anita Das",
      position: "Project Manager",
      company: "IT Company, Infocity",
      text: "Outstanding expertise in IT sector requirements and emerging technology trends. Their support in building our technical teams has been crucial for our expansion in Eastern India.",
              rating: 5
      },
      {
        name: "Rajesh Panda",
      position: "Plant Head",
      company: "Steel Company, Industrial Estate",
      text: "Excellent understanding of heavy industries and safety requirements. Their approach to recruiting technical specialists and managing industrial workforce has transformed our operations.",
      rating: 5
  
    }
  ];

  const faqs = [
    {
      question: "Do you have experience with Odisha government and administrative recruitment?",
      answer: "Yes, we have extensive experience with Odisha state government departments, administrative services, and public sector organizations. We understand state-specific procedures, compliance requirements, and the administrative culture of Odisha government institutions."
    },
    {
      question: "Can you help IT companies and technology businesses in Bhubaneswar?",
      answer: "Absolutely! We specialize in IT sector recruitment including software development, project management, technical architecture, and emerging technologies. We understand the growing IT ecosystem in Bhubaneswar and can help scale technology teams."
    },
    {
      question: "What is your experience with mining and heavy industries?",
      answer: "We have specialized knowledge of Odisha's mining and steel industries including mining operations, steel plant management, safety protocols, environmental compliance, and technical expertise required for heavy industries and mineral processing."
    },
    {
      question: "Do you understand Bhubaneswar's cultural and temple tourism aspects?",
      answer: "Yes, we understand Bhubaneswar's rich cultural heritage as the Temple City and its importance in Odisha tourism. We can recruit for tourism management, cultural preservation, heritage site management, and hospitality services while respecting local traditions."
    },
    {
      question: "How do you handle Odisha state labor compliance and regulations?",
      answer: "We ensure compliance with Odisha state labor laws, mining regulations, IT industry guidelines, and local government requirements. We stay updated with state-specific policies and understand the regulatory environment for different sectors."
    },
    {
      question: "Can you support both traditional and emerging sectors?",
      answer: "Yes, we have expertise across Bhubaneswar's diverse landscape from traditional government and mining sectors to emerging IT and technology companies. We bridge traditional administrative practices with modern technological requirements."
    },
    {
      question: "What is your approach to working with government organizations?",
      answer: "We provide specialized government HR services including understanding of bureaucratic processes, administrative protocols, public service requirements, and maintaining appropriate formal procedures while implementing modern HR practices."
    },
    {
      question: "How do you handle the cultural sensitivity required in Odisha?",
      answer: "We deeply understand Odia culture, temple traditions, and local customs. We ensure respectful recruitment practices, cultural orientation programs, and help organizations maintain cultural sensitivity while achieving professional objectives and modern standards."
  
    }
  ];

  const mappedFaqs = faqs.map(({ question, answer }) => ({ q: question, a: answer }));
  const mappedTestimonials = testimonials.map(t => ({ name: t.name, title: `${t.position} · ${t.company}`, quote: t.text }));

  const bhubaneswarStats = [
    { number: "80+", label: "Bhubaneswar Organizations Served" },
    { number: "20+", label: "Government Departments" },
    { number: "15+", label: "IT Companies" },
    { number: "4,800+", label: "Professionals Placed" }
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
        canonical="https://hirewithprachi.com/hr-services-bhubaneswar"
      />

      <ScrollProgressBar />
      <HireWithPrachiTopBar />
      <HireWithPrachiHeader />

      {/* Enhanced Hero Section */}
      <HeroV2
        cityName="Bhubaneswar"
        description="Accelerate your business with cutting-edge HR solutions. From KIIT to Infocity's tech hub, we deliver premium HR services that align with Bhubaneswar's dynamic business landscape."
        onSchedule={() => setShowCalendly(true)}
        onDownload={handleBrochureDownload}
        stats={[
          { icon: Users, value: '40+', label: 'Bhubaneswar Companies Served', color: 'from-blue-500 to-cyan-500' },
          { icon: Award, value: '12+', label: 'Startups & SMEs', color: 'from-purple-500 to-pink-500' },
          { icon: Star, value: '4.9/5', label: 'Client Rating', color: 'from-yellow-500 to-orange-500' },
          { icon: Clock, value: '<2hrs', label: 'Response Time', color: 'from-green-500 to-emerald-500' }
        ]}
        bottomStats={bhubaneswarStats}
      />

      {/* Enhanced Premium Content Section */}
      <section className="relative ai-hero-bg pt-20 pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
        {/* Premium Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-80 h-80 bg-sky-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-sky-500/10 to-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
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
  Bhubaneswar - Temple City
                
</div>
                
                <h1 className="text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                  Premium <span className="ai-text-shimmer block">AI-Powered HR Services</span> in Bhubaneswar
                </h1>
                
                <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                  Comprehensive HR solutions for Bhubaneswar's emerging IT hub. From government 
                  services to modern IT companies, we provide specialized AI-powered HR services across 
                  Infocity, Patia, and all major business districts.
                </p>
              </div>

              {/* Premium AI-Era Bhubaneswar Stats */}
              <div className="grid grid-cols-2 gap-8 mb-10">
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="text-center"
>
  <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
  <div className="text-gray-600 text-sm">Bhubaneswar Companies</div>
</motion.div>
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.4 }}
  className="text-center"
>
  <div className="text-3xl font-bold text-blue-600 mb-2">Infocity</div>
  <div className="text-gray-600 text-sm">IT & Government Hub</div>
</motion.div>
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.6 }}
  className="text-center"
>
  <div className="text-3xl font-bold text-blue-600 mb-2">3000+</div>
  <div className="text-gray-600 text-sm">Professionals Managed</div>
</motion.div>
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.8 }}
  className="text-center"
>
  <div className="text-3xl font-bold text-blue-600 mb-2">99.0%</div>
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
  Get Premium Bhubaneswar Consultation
                
</motion.button>
                
                <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={handleBrochureDownload}
  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
>
  Download Bhubaneswar Guide
                
</motion.button>
              </div>

              {/* Premium AI-Era Trust Indicators */}
              <div className="glass-effect p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-blue-500/10 rounded-3xl"></div>
                <div className="relative">
                  <p className="text-sm text-gray-300 mb-4 font-medium">
                    Trusted by 50+ Bhubaneswar companies including government agencies and IT firms
                  </p>
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-300 ml-2 font-medium">4.9/5 Bhubaneswar Rating</span>
                    </div>
                    <div className="text-sm text-gray-300 font-medium">✓ Government Expert</div>
                    <div className="text-sm text-gray-300 font-medium">✓ IT Specialist</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Premium AI-Era Bhubaneswar Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="relative"
            >
              <div className="glass-effect p-10 rounded-3xl relative overflow-hidden">
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-4 rounded-full text-sm font-bold animate-pulse-glow shadow-2xl">
                  Temple City
                </div>
                
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-3">Bhubaneswar Business Hubs</h3>
                  <p className="text-gray-300 text-lg">Premium AI-Powered Areas We Serve</p>
                </div>

                <div className="space-y-6">
                  {[
                    { area: "Infocity", type: "IT & Government Hub", color: "bg-sky-500/30 text-sky-200", icon: "🏛️" },
                    { area: "Patia", type: "IT & Corporate Hub", color: "bg-blue-500/30 text-blue-200", icon: "🏢" },
                    { area: "Khandagiri", type: "Business District", color: "bg-indigo-500/30 text-indigo-200", icon: "🏙️" },
                    { area: "Nayapalli", type: "Commercial Area", color: "bg-purple-500/30 text-purple-200", icon: "🛍️" },
                    { area: "Saheed Nagar", type: "Government Offices", color: "bg-green-500/30 text-green-200", icon: "🏛️" }
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
                    Serving all Bhubaneswar business districts & neighboring areas
                  </div>
                  <div className="text-2xl font-bold text-sky-300">50+ Business Clients</div>
                  <div className="text-sm text-gray-300">Across Bhubaneswar</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Premium Slider */}
      <PremiumTestimonials
        title="What Bhubaneswar Organizations Say"
        subtitle="Success stories from government, IT and heavy industries across Bhubaneswar."
        items={mappedTestimonials}
      />

      {/* FAQ Section - Premium */}
      <PremiumFAQ
        items={mappedFaqs}
        region="Bhubaneswar"
        subtitle="Common questions about our HR services for Bhubaneswar's government, IT and mining ecosystem."
      />

      <CityInternalLinks />

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {bhubaneswarStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-teal-600 mb-2">
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
      <HireWithPrachiFooter />
      <GPT4oMiniChatbot />

      {/* Modals */}
      {showBrochureModal && (
        <BrochureDownloadModal
          isOpen={showBrochureModal}
          onClose={() => setShowBrochureModal(false)}
          brochureType="hr-services-bhubaneswar"
          title="Bhubaneswar Government & IT HR Guide"
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