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
import { Activity, AlertTriangle, ArrowRight, Award, BarChart2, BookOpen, Brain, Briefcase, Building, Calendar, Camera, CheckCircle, CheckSquare, ChevronDown, ChevronUp, ClipboardList, Clock, Cpu, Crown, Database, Download, Eye, FileSpreadsheet, FileText, Diamond, Globe, Heart, HeartHandshake, Home, KeyRound, Landmark, Lightbulb, Mail, MapPin, MessageCircle, MessageSquare, Palette, Phone, PieChart, Play, Presentation, Rocket, Search, Settings, Shield, Smile, Sparkles, Star, Target, TrendingUp, User, UserPlus, Users, Zap } from 'lucide-react';

export default function HRServicesJaipur() {
  // SEO Data for Jaipur
  const seoData = {
    title: "HR Services Jaipur - Expert HR Consultant | Hire With Prachi",
    description: "Expert HR services in Jaipur for tourism and IT companies. Complete HR solutions for Jaipur businesses.",
    keywords: "HR services Jaipur, HR consultant Jaipur, recruitment Jaipur, tourism HR",
    pageType: "localBusiness",
    pageData: {
      city: "Jaipur",
      latitude: "26.9124",
      longitude: "75.7873",
      title: "HR Services Jaipur - Expert HR Consultant",
      description: "Expert HR services in Jaipur for tourism and IT",
      image: "https://hirewithprachi.com/assets/images/hr-services-jaipur-1200x630.jpg"
    }
  };
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const handleBrochureDownload = () => {
    setShowBrochureModal(true);
  };

  // Get city data
  const cityData = getCityData('jaipur');

    // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "HR Services Jaipur - Tourism Handicrafts & Heritage Industry HR Solutions",
    "description": "Expert HR services in Jaipur for tourism, handicrafts, gems & jewelry and heritage industries. Specialized recruitment, compliance and workforce management for Rajasthan's Pink City.",
    "provider": {
      "@type": "Organization",
      "name": "Hire With Prachi",
      "founder": {
        "@type": "Person",
        "name": "Prachi Shrivastava",
        "jobTitle": "Tourism & Heritage HR Consultant"
      },
      "url": "https://prachi-hr.com",
      "telephone": "+91-8740889927",
      "email": "info@hirewithprachi.com"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Jaipur",
        "addressRegion": "Rajasthan",
        "addressCountry": "India"
      },
        {
        "@type": "Place", 
        "name": "Malviya Nagar",
        "addressLocality": "Jaipur",
        "addressRegion": "Rajasthan"
      },
      {
        "@type": "Place",
        "name": "Vaishali Nagar", 
        "addressLocality": "Jaipur",
        "addressRegion": "Rajasthan"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 26.9124,
        "longitude": 75.7873
      },
      "geoRadius": "50"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Jaipur Tourism & Heritage HR Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tourism Industry HR Jaipur",
            "description": "Specialized HR solutions for hotels, travel agencies, and tourism businesses"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Handicrafts & Heritage HR Jaipur",
            "description": "Professional HR services for handicrafts, textiles, and traditional arts"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Gems & Jewelry HR Jaipur",
            "description": "Comprehensive HR support for gems, jewelry, and precious stones industry"
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

  const jaipurAdvantages = [
    {
      icon: <Crown className="h-6 w-6" />,
      title: "Tourism & Hospitality Capital",
      description: "Deep expertise in heritage tourism, hotels, resorts, and travel industry"
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Handicrafts & Traditional Arts",
      description: "Specialized knowledge of traditional crafts, textiles, and artisan communities"
    },
    {
      icon: <Diamond className="h-6 w-6" />,
      title: "Gems & Jewelry Hub",
      description: "Understanding of precious stones, jewelry manufacturing, and traditional designs"
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: "Government & Administrative",
      description: "Experience with Rajasthan state government and administrative organizations"
    },
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Creative & Cultural Industries",
      description: "Knowledge of film production, photography, and cultural organizations"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Emerging IT & Startups",
      description: "Understanding of Jaipur's growing technology and startup ecosystem"
    }
  ];

  const services = [
    {
      title: "Tourism & Hospitality HR",
      description: "Specialized HR solutions for hotels, resorts, travel agencies, and tourism businesses",
      features: [
        "Hotel management recruitment",
        "Tour guide training and certification",
        "Guest relations specialist hiring",
        "Travel consultant recruitment",
        "Heritage site management staffing",
        "Seasonal workforce management"
      ],
      link: "/services/recruitment-hiring"
    },
    {
      title: "Handicrafts & Traditional Arts HR",
      description: "Comprehensive HR support for handicrafts, textiles, and traditional artisan communities",
      features: [
        "Master craftsperson recruitment",
        "Traditional skill preservation training",
        "Artisan community development",
        "Quality control specialist hiring",
        "Export coordinator recruitment",
        "Cultural heritage management"
      ],
      link: "/services/hr-compliance"
    },
    {
      title: "Gems & Jewelry Industry HR",
      description: "Advanced HR services for gems, jewelry manufacturing, and precious stones businesses",
      features: [
        "Gemologist recruitment",
        "Jewelry designer hiring",
        "Precious stones specialist sourcing",
        "Quality assessment expert recruitment",
        "Export business development",
        "Traditional design preservation"
      ],
      link: "/services/performance-management"
    },
    {
      title: "Government & Emerging Sectors HR",
      description: "Professional HR services for government organizations and emerging IT/startup ecosystem",
      features: [
        "Government officer recruitment",
        "IT professional hiring",
        "Startup team building",
        "Administrative staff sourcing",
        "Policy implementation support",
        "Digital transformation assistance"
      ],
      link: "/services/virtual-hr-services"
  
    }
  ];

  const jaipurAreas = [
     {
       area: "Pink City (Walled City)",
      focus: "Heritage & Tourism",
      highlights: "Palaces, heritage hotels, traditional markets, handicrafts"
    },
    {
      area: "Malviya Nagar",
      focus: "Commercial & IT",
      highlights: "IT companies, commercial centers, modern offices"
    },
    {
      area: "Vaishali Nagar",
      focus: "Corporate & Residential",
      highlights: "Corporate offices, business centers, residential complexes"
    },
    {
      area: "Sitapura Industrial Area",
      focus: "Manufacturing & Export",
      highlights: "Gems & jewelry, textiles, handicrafts manufacturing"
    },
    {
      area: "Mansarovar",
      focus: "Mixed Development",
      highlights: "Educational institutions, hospitals, commercial areas"
    },
    {
      area: "Sanganer",
      focus: "Traditional Crafts",
      highlights: "Block printing, handicrafts, traditional textiles"
  
    }
  ];

  const industries = [
    {
      name: "Tourism & Hospitality",
      description: "Hotels, resorts, travel agencies, and heritage tourism",
      companies: "ITC Rajputana, Taj Rambagh Palace, Trident, Heritage hotels, Travel agencies"
    },
    {
      name: "Gems & Jewelry",
      description: "Precious stones, jewelry manufacturing, and traditional designs",
      companies: "Diamond Palace, Rajasthan Gems, Jewelry exporters, Precious stones traders"
    },
    {
      name: "Handicrafts & Textiles",
      description: "Traditional crafts, block printing, textiles, and artisan products",
      companies: "Block printing units, Handicraft exporters, Textile manufacturers"
    },
    {
      name: "Information Technology",
      description: "Software development, IT services, and emerging startups",
      companies: "Infosys, Local IT companies, Startups, Software development"
    },
    {
      name: "Government & Administration",
      description: "Rajasthan state government and administrative organizations",
      companies: "Rajasthan Govt, Administrative offices, Public sector organizations"
    },
    {
      name: "Education & Research",
      description: "Universities, colleges, and research institutions",
      companies: "University of Rajasthan, IIT Jodhpur extension, Educational institutions"
  
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Sharma",
      position: "General Manager",
      company: "Heritage Hotel, Pink City",
      text: "Their understanding of tourism industry requirements and local cultural nuances is exceptional. Helped us build a world-class hospitality team while preserving traditional service values.",
      rating: 5
    },
    {
      name: "Meera Agarwal",
      position: "Export Director",
      company: "Handicrafts Company, Sanganer",
      text: "Outstanding expertise in traditional crafts and artisan communities. Their support in developing our craftsperson teams and maintaining quality standards has been invaluable.",
      rating: 5
    },
    {
      name: "Vikram Singh",
      position: "CEO",
      company: "Gems & Jewelry Firm, Sitapura",
      text: "Excellent understanding of gems and jewelry industry. Their approach to recruiting skilled craftspeople and managing seasonal demands has transformed our business operations.",
      rating: 5
  
    }
  ];

  const faqs = [
    {
      question: "Do you have experience with tourism and hospitality industry in Jaipur?",
      answer: "Yes, we have extensive experience with Jaipur's tourism sector including heritage hotels, luxury resorts, travel agencies, and tour operators. We understand the unique requirements of hospitality services, cultural sensitivity needed for international guests, and seasonal workforce management for peak tourist seasons."
    },
    {
      question: "Can you help handicrafts and traditional arts businesses?",
      answer: "Absolutely! We specialize in handicrafts and traditional arts including block printing, textiles, pottery, jewelry making, and other artisan crafts. We understand the importance of preserving traditional skills while meeting modern quality and export standards."
    },
    {
      question: "What is your experience with gems and jewelry industry?",
      answer: "We have specialized knowledge of Rajasthan's gems and jewelry industry including precious stones trading, jewelry manufacturing, traditional designs, and export businesses. We can recruit gemologists, designers, craftspeople, and quality control specialists."
    },
    {
      question: "Do you understand the cultural aspects of working in Rajasthan?",
      answer: "Yes, we deeply understand Rajasthani culture, traditions, and business practices. We provide cultural orientation, ensure respectful workplace environments, and help companies balance traditional values with modern professional practices while honoring local customs and heritage."
    },
    {
      question: "How do you handle Rajasthan state labor compliance?",
      answer: "We ensure compliance with Rajasthan state labor laws, tourism industry regulations, handicrafts export requirements, and local government policies. We stay updated with state-specific regulations and understand the particular requirements of traditional industries."
    },
    {
      question: "Can you support both traditional and modern sectors?",
      answer: "Yes, we have expertise across Jaipur's diverse business landscape from traditional handicrafts and tourism to modern IT and startup sectors. We understand how to bridge traditional business practices with contemporary HR methodologies."
    },
    {
      question: "What is your approach to seasonal workforce management?",
      answer: "We provide comprehensive seasonal workforce solutions including peak tourism season staffing, festival period management, and export season scaling. We understand the cyclical nature of tourism and handicrafts businesses and provide flexible HR solutions."
    },
    {
      question: "How do you handle heritage and cultural preservation in recruitment?",
      answer: "We prioritize cultural heritage preservation by recruiting artisans who understand traditional techniques, providing training programs that maintain authentic practices, and ensuring knowledge transfer from master craftspeople to new generations while adapting to modern business needs."
  
    }
  ];

  const mappedFaqs = faqs.map(({ question, answer }) => ({ q: question, a: answer }));
  const mappedTestimonials = testimonials.map(t => ({ name: t.name, title: `${t.position} · ${t.company}`, quote: t.text }));

  const jaipurStats = [
    { number: "120+", label: "Jaipur Companies Served" },
    { number: "40+", label: "Tourism & Hospitality" },
    { number: "35+", label: "Heritage & Handicrafts" },
    { number: "8,500+", label: "Professionals Placed" }
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
        canonical="https://hirewithprachi.com/hr-services-jaipur"
      />

      <ScrollProgressBar />
      <HireWithPrachiTopBar />
      <HireWithPrachiHeader />

      {/* Enhanced Hero Section */}
      <HeroV2
        cityName="Jaipur"
        description="Accelerate your business with cutting-edge HR solutions. From Malviya Nagar to Sitapura's industrial hub, we deliver premium HR services that align with Jaipur's dynamic business landscape."
        onSchedule={() => setShowCalendly(true)}
        onDownload={handleBrochureDownload}
        stats={[
          { icon: Users, value: '60+', label: 'Jaipur Companies Served', color: 'from-blue-500 to-cyan-500' },
          { icon: Award, value: '20+', label: 'Startups & SMEs', color: 'from-purple-500 to-pink-500' },
          { icon: Star, value: '4.9/5', label: 'Client Rating', color: 'from-yellow-500 to-orange-500' },
          { icon: Clock, value: '<2hrs', label: 'Response Time', color: 'from-green-500 to-emerald-500' }
        ]}
        bottomStats={jaipurStats}
      />

      {/* Enhanced Premium Content Section */}
      <section className="relative ai-hero-bg pt-20 pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
        {/* Premium Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-80 h-80 bg-rose-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
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
  Jaipur - Pink City
                
</div>
                
                <h1 className="text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                  Premium <span className="ai-text-shimmer block">AI-Powered HR Services</span> in Jaipur
                </h1>
                
                <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                  Comprehensive HR solutions for Jaipur's heritage and business hub. From tourism and 
                  handicrafts to modern IT services, we provide specialized AI-powered HR services across 
                  Malviya Nagar, Vaishali Nagar, and all major business districts.
                </p>
              </div>

              {/* Premium AI-Era Jaipur Stats */}
              <div className="grid grid-cols-2 gap-8 mb-10">
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="text-center"
>
  <div className="text-3xl font-bold text-blue-600 mb-2">80+</div>
  <div className="text-gray-600 text-sm">Jaipur Companies</div>
</motion.div>
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.4 }}
  className="text-center"
>
  <div className="text-3xl font-bold text-blue-600 mb-2">Malviya Nagar</div>
  <div className="text-gray-600 text-sm">IT & Tourism Hub</div>
</motion.div>
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.6 }}
  className="text-center"
>
  <div className="text-3xl font-bold text-blue-600 mb-2">6000+</div>
  <div className="text-gray-600 text-sm">Professionals Managed</div>
</motion.div>
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.8 }}
  className="text-center"
>
  <div className="text-3xl font-bold text-blue-600 mb-2">99.3%</div>
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
  Get Premium Jaipur Consultation
                
</motion.button>
                
                <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={handleBrochureDownload}
  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
>
  Download Jaipur Guide
                
</motion.button>
              </div>

              {/* Premium AI-Era Trust Indicators */}
              <div className="glass-effect p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-3xl"></div>
                <div className="relative">
                  <p className="text-sm text-gray-300 mb-4 font-medium">
                    Trusted by 80+ Jaipur companies including tourism leaders and modern IT firms
                  </p>
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-300 ml-2 font-medium">4.9/5 Jaipur Rating</span>
                    </div>
                    <div className="text-sm text-gray-300 font-medium">✓ Tourism Expert</div>
                    <div className="text-sm text-gray-300 font-medium">✓ Heritage Specialist</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Premium AI-Era Jaipur Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="relative"
            >
              <div className="glass-effect p-10 rounded-3xl relative overflow-hidden">
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-pink-500 to-rose-600 text-white px-8 py-4 rounded-full text-sm font-bold animate-pulse-glow shadow-2xl">
                  Pink City
                </div>
                
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-3">Jaipur Business Hubs</h3>
                  <p className="text-gray-300 text-lg">Premium AI-Powered Areas We Serve</p>
                </div>

                <div className="space-y-6">
                  {[
                    { area: "Malviya Nagar", type: "IT & Corporate Hub", color: "bg-pink-500/30 text-pink-200", icon: "🏢" },
                    { area: "Vaishali Nagar", type: "Business District", color: "bg-rose-500/30 text-rose-200", icon: "🏙️" },
                    { area: "C-Scheme", type: "Heritage & Tourism", color: "bg-purple-500/30 text-purple-200", icon: "🏛️" },
                    { area: "Raja Park", type: "Retail & Commerce", color: "bg-blue-500/30 text-blue-200", icon: "🛍️" },
                    { area: "Sitapura", type: "Industrial Zone", color: "bg-green-500/30 text-green-200", icon: "🏭" }
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
                    Serving all Jaipur business districts & neighboring areas
                  </div>
                  <div className="text-2xl font-bold text-pink-300">80+ Business Clients</div>
                  <div className="text-sm text-gray-300">Across Jaipur</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Premium Slider */}
      <PremiumTestimonials
        title="What Jaipur Companies Say"
        subtitle="Success stories from tourism, handicrafts, heritage, and business companies across Rajasthan's Pink City."
        items={mappedTestimonials}
      />

      {/* FAQ Section - Premium */}
      <PremiumFAQ
        items={mappedFaqs}
        region="Jaipur"
        subtitle="Common questions about our HR services specifically for Jaipur's tourism, heritage, and handicrafts ecosystem."
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
              Ready to Elevate HR for Your <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Jaipur Business</span>?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
            >
              Join 60++ Jaipur businesses that trust us for their premium HR needs. We've got you covered with sophisticated solutions.
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
              Book Jaipur Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBrochureDownload}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-sm border border-white/20 text-lg"
            >
              <Download className="w-5 h-5" />
              Jaipur HR Guide
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
          brochureType="hr-services-jaipur"
          title="Jaipur Heritage & Tourism HR Guide"
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