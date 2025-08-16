import { motion } from 'framer-motion';
import React, { useState } from 'react';
import SEOOptimizer from '../components/SEOOptimizer';

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
import CityLandingPremium from '../components/CityLandingPremium';
import HeroV2 from '../components/city-landing/HeroV2';
import { Activity, AlertTriangle, ArrowRight, Award, BarChart2, Book, BookOpen, Brain, Briefcase, Building, Calendar, CheckCircle, CheckSquare, ChevronDown, ChevronUp, ClipboardList, Clock, Coffee, Cpu, Database, Download, Eye, FileSpreadsheet, FileText, Globe, Heart, HeartHandshake, Home, KeyRound, Landmark, Lightbulb, Mail, MapPin, MessageCircle, MessageSquare, Phone, PieChart, Play, Presentation, Rocket, Search, Settings, Shield, Smile, Sparkles, Star, Target, Train, TrendingUp, User, UserPlus, Users, Zap } from 'lucide-react';

export default function HRServicesKolkata() {
  // SEO Data for Kolkata
  const seoData = {
    title: "HR Services Kolkata - Expert HR Consultant | Hire With Prachi",
    description: "Expert HR services in Kolkata for IT and manufacturing companies. Complete HR solutions for Kolkata businesses.",
    keywords: "HR services Kolkata, HR consultant Kolkata, recruitment Kolkata, IT HR",
    pageType: "localBusiness",
    pageData: {
      city: "Kolkata",
      latitude: "22.5726",
      longitude: "88.3639",
      title: "HR Services Kolkata - Expert HR Consultant",
      description: "Expert HR services in Kolkata for IT and manufacturing",
      image: "https://hirewithprachi.com/assets/images/hr-services-kolkata-1200x630.jpg"
    }
  };
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const handleBrochureDownload = () => {
    setShowBrochureModal(true);
  };

  // Get city data
  const cityData = getCityData('kolkata');

  // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "HR Services Kolkata - Banking Government & Cultural Industry HR Solutions",
    "description": "Expert HR services in Kolkata for banking, government, jute, tea and cultural industries. Specialized recruitment, compliance and workforce management for Eastern India's business capital.",
    "provider": {
      "@type": "Organization",
      "name": "Hire With Prachi",
      "founder": {
        "@type": "Person",
        "name": "Prachi Shrivastava",
        "jobTitle": "Banking & Government HR Consultant"
      },
      "url": "https://prachi-hr.com",
      "telephone": "+91-8740889927",
      "email": "info@hirewithprachi.com"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Kolkata",
        "addressRegion": "West Bengal",
        "addressCountry": "India"
      },
        {
        "@type": "Place", 
        "name": "Salt Lake City",
        "addressLocality": "Kolkata",
        "addressRegion": "West Bengal"
      },
      {
        "@type": "Place",
        "name": "Park Street", 
        "addressLocality": "Kolkata",
        "addressRegion": "West Bengal"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 22.5726,
        "longitude": 88.3639
      },
      "geoRadius": "70"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Kolkata Banking & Government HR Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Banking & Finance HR Kolkata",
            "description": "Specialized HR solutions for banks and financial institutions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Government & PSU HR Kolkata",
            "description": "Professional HR services for government organizations and PSUs"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cultural Industry HR Kolkata",
                        "description": "Comprehensive HR support for media, publishing, and cultural organizations"
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

  const kolkataAdvantages = [
    {
      icon: <Landmark className="h-6 w-6" />,
      title: "Banking & Finance Heritage",
      description: "Deep understanding of traditional banking, insurance, and financial services"
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: "Government & PSU Expertise",
      description: "Extensive experience with government offices, PSUs, and regulatory bodies"
    },
    {
      icon: <Book className="h-6 w-6" />,
      title: "Educational & Cultural Hub",
      description: "Knowledge of academic institutions, publishing, and cultural organizations"
    },
    {
      icon: <Coffee className="h-6 w-6" />,
      title: "Tea & Jute Industry",
      description: "Traditional expertise in tea gardens, jute mills, and agro-industries"
    },
    {
      icon: <Train className="h-6 w-6" />,
      title: "Transportation & Logistics",
      description: "Understanding of railways, port operations, and logistics networks"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Eastern India Gateway",
      description: "Regional expertise covering entire Eastern India business ecosystem"
    }
  ];

  const services = [
    {
      title: "Banking & Financial Services HR",
      description: "Specialized HR solutions for banks, insurance companies, and financial institutions",
      features: [
        "Bank officer recruitment",
        "Insurance agent training",
        "Financial analyst hiring",
        "Credit specialist sourcing",
        "Compliance officer recruitment",
        "Customer service optimization"
      ],
      link: "/services/recruitment-hiring"
    },
    {
      title: "Government & PSU HR",
      description: "Comprehensive HR support for government departments and public sector organizations",
      features: [
        "Government officer recruitment",
        "PSU management hiring",
        "Administrative staff sourcing",
        "Policy implementation support",
        "Training and development programs",
        "Public service optimization"
      ],
      link: "/services/hr-compliance"
    },
    {
      title: "Cultural & Media Industry HR",
      description: "Advanced HR services for publishing, media, entertainment, and cultural organizations",
      features: [
        "Editor and journalist recruitment",
        "Creative professional hiring",
        "Media production team building",
        "Cultural event management staffing",
        "Publishing house support",
        "Arts and culture administration"
      ],
      link: "/services/performance-management"
    },
    {
      title: "Traditional Industries HR",
      description: "Specialized HR services for tea, jute, textile, and traditional manufacturing",
      features: [
        "Tea estate management",
        "Jute mill operations staffing",
        "Plantation supervisor recruitment",
        "Quality control specialist hiring",
        "Export coordination team building",
        "Traditional craft preservation"
              ],
        link: "/services/virtual-hr-services"
      }
    ];

  const kolkataAreas = [
    {
      area: "BBD Bagh (Dalhousie)",
      focus: "Banking & Finance",
      highlights: "RBI, Commercial banks, Insurance companies, Financial headquarters"
    },
    {
      area: "Salt Lake City (Sector V)",
      focus: "IT & Corporate",
      highlights: "IT companies, corporate offices, business centers, tech parks"
    },
    {
      area: "Park Street & Central",
      focus: "Cultural & Commercial",
      highlights: "Publishing houses, media companies, cultural centers, hotels"
    },
    {
      area: "Howrah",
      focus: "Industrial & Manufacturing",
      highlights: "Jute mills, engineering works, industrial complexes"
    },
    {
      area: "Rajarhat New Town",
      focus: "Modern Business",
      highlights: "New corporate centers, residential complexes, modern offices"
    },
    {
      area: "Esplanade & Chowringhee",
      focus: "Government & Administration",
      highlights: "Government offices, administrative centers, public sector"
    }
  ];

  const industries = [
    {
      name: "Banking & Financial Services",
      description: "Traditional banking, insurance, and financial institutions",
      companies: "SBI, UCO Bank, United Bank, LIC, Insurance companies"
    },
    {
      name: "Government & Public Sector",
      description: "Government departments, PSUs, and administrative organizations",
      companies: "West Bengal Govt, Railways, Coal India, ONGC, Public offices"
    },
    {
      name: "Information Technology",
      description: "Software development, IT services, and technology consulting",
      companies: "TCS, Infosys, Wipro, Cognizant, Local IT companies"
    },
    {
      name: "Media & Publishing",
      description: "Newspapers, magazines, publishing houses, and media organizations",
      companies: "ABP Group, Telegraph, Bartaman, Book publishers, Media houses"
    },
    {
      name: "Tea & Jute Industries",
      description: "Tea gardens, jute mills, and agro-processing industries",
      companies: "Tea estates, Jute mills, Agro-industries, Export houses"
    },
    {
      name: "Education & Research",
      description: "Universities, colleges, and research institutions",
      companies: "Jadavpur University, Presidency, ISI, Research institutes"
    }
  ];

  const testimonials = [
    {
      name: "Subrata Chatterjee",
      position: "General Manager",
      company: "Nationalized Bank, BBD Bagh",
      text: "Their understanding of banking operations and regulatory requirements is exceptional. Helped us build a strong customer service team and improve operational efficiency.",
      rating: 5
    },
    {
      name: "Priya Mukherjee",
      position: "Editor-in-Chief",
      company: "Publishing House, Park Street",
      text: "Outstanding expertise in media and publishing industry. Their support in recruiting editorial talent and managing creative teams has been invaluable for our growth.",
      rating: 5
    },
    {
      name: "Rajesh Ghosh",
      position: "Plant Manager",
      company: "Jute Mill, Howrah",
      text: "Excellent understanding of traditional industries and local workforce dynamics. Their approach to managing seasonal workers and improving productivity has transformed our operations.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Do you have experience with banking and financial institutions in Kolkata?",
      answer: "Yes, we have extensive experience with Kolkata's banking sector including nationalized banks, private banks, insurance companies, and financial institutions. We understand banking operations, regulatory compliance, customer service requirements, and the traditional banking culture of Eastern India."
    },
    {
      question: "Can you help government organizations and PSUs with recruitment?",
      answer: "Absolutely! We specialize in government and PSU recruitment including administrative officers, technical specialists, policy implementers, and support staff. We understand government procedures, compliance requirements, and the unique culture of public sector organizations."
    },
    {
      question: "What is your experience with media and publishing companies?",
      answer: "We have specialized knowledge of Kolkata's rich media and publishing ecosystem including newspapers, magazines, book publishers, and cultural organizations. We can recruit editors, journalists, creative professionals, and support teams while understanding the creative and deadline-driven nature of media work."
    },
    {
      question: "Do you understand traditional industries like tea and jute?",
      answer: "Yes, we have experience with West Bengal's traditional industries including tea estates, jute mills, and agro-processing units. We understand seasonal workforce management, plantation operations, quality control requirements, and the unique challenges of traditional manufacturing sectors."
    },
    {
      question: "How do you handle West Bengal state labor compliance?",
      answer: "We ensure compliance with West Bengal state labor laws, industrial regulations, and local government requirements. We stay updated with state-specific regulations and understand the particular requirements for different sectors including traditional industries and government organizations."
    },
    {
      question: "Can you support both traditional and modern sectors?",
      answer: "Yes, we have expertise across Kolkata's diverse business landscape from traditional industries like tea and jute to modern IT and financial services. We understand how to bridge traditional business practices with contemporary HR methodologies while respecting local culture and customs."
    },
    {
      question: "What is your approach to cultural sensitivity in Kolkata?",
      answer: "We deeply understand Kolkata's rich cultural heritage and intellectual traditions. We provide cultural orientation, ensure respectful workplace practices, and help companies build inclusive environments that honor Bengali culture while maintaining professional standards and fostering innovation."
    },
    {
      question: "How do you handle recruitment for both Bengali and non-Bengali speaking roles?",
      answer: "We provide bilingual support and understand the importance of language skills in different roles. Whether recruiting for local Bengali-speaking positions or roles requiring broader linguistic capabilities, we ensure proper communication skills assessment and cultural fit evaluation."
  
    }
  ];

  const mappedFaqs = faqs.map(({ question, answer }) => ({ q: question, a: answer }));
  const mappedTestimonials = testimonials.map(t => ({ name: t.name, title: `${t.position} · ${t.company}`, quote: t.text }));

  const kolkataStats = [
    { number: "140+", label: "Kolkata Companies Served" },
    { number: "35+", label: "Banking & Finance Firms" },
    { number: "25+", label: "Government Organizations" },
    { number: "11,000+", label: "Professionals Placed" }
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
        canonical="https://hirewithprachi.com/hr-services-kolkata"
      />

      <ScrollProgressBar />
      <HireWithPrachiTopBar />
      <HireWithPrachiHeader />

      {/* Enhanced Hero Section */}
      <HeroV2
        cityName="Kolkata"
        description="Accelerate your business with cutting-edge HR solutions. From Park Street to Salt Lake's business hub, we deliver premium HR services that align with Kolkata's dynamic business landscape."
        onSchedule={() => setShowCalendly(true)}
        onDownload={handleBrochureDownload}
        stats={[
          { icon: Users, value: '100+', label: 'Kolkata Companies Served', color: 'from-blue-500 to-cyan-500' },
          { icon: Award, value: '30+', label: 'Startups & SMEs', color: 'from-purple-500 to-pink-500' },
          { icon: Star, value: '4.9/5', label: 'Client Rating', color: 'from-yellow-500 to-orange-500' },
          { icon: Clock, value: '<2hrs', label: 'Response Time', color: 'from-green-500 to-emerald-500' }
        ]}
        bottomStats={kolkataStats}
      />

      {/* Enhanced Premium Content Section */}
      <CityLandingPremium
        cityName={cityData.name}
        description={cityData.description}
        stats={cityData.stats}
        advantages={kolkataAdvantages}
        services={services}
        industries={industries}
        testimonials={cityData.testimonials}
        onSchedule={() => setShowCalendly(true)}
        onDownload={handleBrochureDownload}
        contactInfo={{
          phone: "+91-8740889927",
          email: "info@hirewithprachi.com"
        }}
      />

      <PremiumTestimonials
        title="What Kolkata Organizations Say"
        subtitle="Success stories from banking, government, media, and traditional industry organizations across Eastern India's cultural capital."
        items={mappedTestimonials}
      />

      <PremiumFAQ
        items={mappedFaqs}
        region="Kolkata"
        subtitle="Common questions about our HR services specifically for Kolkata's banking, government, and cultural ecosystem."
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
              Ready to Elevate HR for Your <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Kolkata Business</span>?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
            >
              Join 100++ Kolkata businesses that trust us for their premium HR needs. We've got you covered with sophisticated solutions.
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
              Book Kolkata Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBrochureDownload}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-sm border border-white/20 text-lg"
            >
              <Download className="w-5 h-5" />
              Kolkata HR Guide
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
          brochureType="hr-services-kolkata"
          title="Kolkata Cultural & Banking HR Guide"
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