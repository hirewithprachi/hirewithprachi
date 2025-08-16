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
import { Activity, AlertTriangle, ArrowRight, Award, BarChart2, BookOpen, Brain, Briefcase, Building, Calendar, Car, CheckCircle, CheckSquare, ChevronDown, ChevronUp, ClipboardList, Clock, Code, Cog, Cpu, Database, Download, Eye, FileSpreadsheet, FileText, Globe, GraduationCap, Heart, HeartHandshake, Home, KeyRound, Landmark, Lightbulb, Mail, MapPin, MessageCircle, MessageSquare, Phone, PieChart, Play, Presentation, Rocket, Search, Settings, Shield, Smile, Sparkles, Star, Target, TrendingUp, User, UserPlus, Users, Zap } from 'lucide-react';

export default function HRServicesPune() {
  // SEO Data for Pune
  const seoData = {
    title: "HR Services Pune - Expert HR Consultant | Hire With Prachi",
    description: "Expert HR services in Pune for IT and automotive companies. Complete HR solutions for Pune businesses.",
    keywords: "HR services Pune, HR consultant Pune, recruitment Pune, IT HR",
    pageType: "localBusiness",
    pageData: {
      city: "Pune",
      latitude: "18.5204",
      longitude: "73.8567",
      title: "HR Services Pune - Expert HR Consultant",
      description: "Expert HR services in Pune for IT and automotive",
      image: "https://hirewithprachi.com/assets/images/hr-services-pune-1200x630.jpg"
    }
  };
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const handleBrochureDownload = () => {
    setShowBrochureModal(true);
  };

  // Get city data
  const cityData = getCityData('pune');

    // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "HR Services Pune - Automotive & Manufacturing HR Solutions",
    "description": "Expert HR services in Pune for automotive, manufacturing, IT and engineering companies. Specialized recruitment, compliance and talent management for Maharashtra's industrial and educational hub.",
    "provider": {
      "@type": "Organization",
      "name": "Hire With Prachi",
      "founder": {
        "@type": "Person",
        "name": "Prachi Shrivastava",
        "jobTitle": "Industrial & IT HR Consultant"
      },
      "url": "https://prachi-hr.com",
      "telephone": "+91-8740889927",
      "email": "info@hirewithprachi.com"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Pune",
        "addressRegion": "Maharashtra",
        "addressCountry": "India"
      },
      {
        "@type": "Place", 
        "name": "Hinjewadi",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra"
      },
      {
        "@type": "Place",
        "name": "Pimpri-Chinchwad", 
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 18.5204,
        "longitude": 73.8567
      },
      "geoRadius": "70"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Pune Automotive & IT HR Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Automotive HR Pune",
            "description": "Specialized HR solutions for automotive manufacturing and engineering in Pune"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Manufacturing HR Pune",
            "description": "Comprehensive HR services for manufacturing and engineering companies"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "IT HR Pune",
            "description": "Professional HR support for IT companies and tech startups in Pune"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "125"
    }
  };

  const puneAdvantages = [
    {
      icon: <Car className="h-6 w-6" />,
      title: "Automotive Manufacturing Hub",
      description: "Deep expertise in automotive engineering, manufacturing, and supplier ecosystems"
    },
    {
      icon: <Cog className="h-6 w-6" />,
      title: "Engineering Excellence",
      description: "Strong understanding of mechanical, electrical, and software engineering disciplines"
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "IT & Software Expertise",
      description: "Comprehensive knowledge of IT services, product development, and tech startups"
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Educational Hub Knowledge",
      description: "Understanding of Pune's rich educational ecosystem and talent pipeline"
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: "Industrial Cluster Experience",
      description: "Expert knowledge of Pimpri-Chinchwad industrial belt and manufacturing zones"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Innovation & R&D Focus",
      description: "Experience with research centers, innovation labs, and technology development"
    }
  ];

  const services = [
    {
      title: "Automotive & Engineering HR",
      description: "Specialized HR solutions for automotive manufacturers and engineering companies",
      features: [
        "Automotive engineer recruitment",
        "Design and development team building",
        "Quality and testing specialist hiring",
        "Production and manufacturing management",
        "R&D and innovation team support",
        "Supplier ecosystem HR coordination"
      ],
      link: "/services/recruitment-hiring"
    },
    {
      title: "Manufacturing & Industrial HR",
      description: "Comprehensive HR support for manufacturing plants and industrial operations",
      features: [
        "Industrial engineer recruitment",
        "Production line optimization",
        "Quality control team management",
        "Safety and compliance training",
        "Lean manufacturing implementation",
        "Operational excellence programs"
      ],
      link: "/services/performance-management"
    },
    {
      title: "IT & Technology HR",
      description: "Advanced HR services for IT companies, startups, and technology firms",
      features: [
        "Software developer recruitment",
        "Product management hiring",
        "Tech startup scaling support",
        "Agile team development",
        "Innovation center staffing",
        "Digital transformation teams"
      ],
      link: "/services/virtual-hr-services"
    },
    {
      title: "Educational & Research HR",
      description: "Specialized HR services for educational institutions and research organizations",
      features: [
        "Academic faculty recruitment",
        "Research scientist hiring",
        "Educational administration support",
        "Student services team building",
        "Campus operations management",
        "Industry-academia collaboration"
      ],
      link: "/services/hr-compliance"
    }
  ];

  const puneAreas = [
    {
      area: "Hinjewadi",
      focus: "IT & Software",
      highlights: "IT parks, software companies, tech startups, innovation centers"
    },
    {
      area: "Pimpri-Chinchwad",
      focus: "Automotive & Manufacturing",
      highlights: "Bajaj Auto, Tata Motors, Mahindra, automotive suppliers"
    },
    {
      area: "Aundh & Baner",
      focus: "Corporate & Services",
      highlights: "Corporate offices, service companies, business centers"
    },
    {
      area: "Kharadi",
      focus: "IT & Emerging Tech",
      highlights: "IT companies, emerging technology firms, innovation hubs"
    },
    {
      area: "Chakan",
      focus: "Automotive Manufacturing",
      highlights: "Auto manufacturing plants, supplier parks, industrial zones"
    },
    {
      area: "Pune University Area",
      focus: "Education & Research",
      highlights: "Universities, research institutes, educational institutions"
    }
  ];

  const industries = [
    {
      name: "Automotive Manufacturing",
      description: "Vehicle manufacturing, auto components, and engineering services",
      companies: "Bajaj Auto, Tata Motors, Mahindra, Force Motors, TVS, Auto suppliers"
    },
    {
      name: "Information Technology",
      description: "Software development, IT services, and technology consulting",
      companies: "TCS, Infosys, Wipro, Tech Mahindra, Persistent Systems, startups"
    },
    {
      name: "Engineering & Manufacturing",
      description: "Mechanical engineering, industrial equipment, and precision manufacturing",
      companies: "Thermax, Forbes Marshall, Kirloskar Group, Alfa Laval, ABB"
    },
    {
      name: "Education & Research",
      description: "Universities, research institutions, and educational services",
      companies: "Pune University, COEP, VJTI, Research institutes, Private colleges"
    },
    {
      name: "Financial Services",
      description: "Banking, insurance, and financial technology companies",
      companies: "Banks, Insurance companies, Fintech startups, Financial services"
    },
    {
      name: "Biotechnology & Pharma",
      description: "Pharmaceutical research, biotechnology, and life sciences",
      companies: "Serum Institute, Biocon, Glenmark, Research organizations"
    }
  ];

  const testimonials = [
    {
      name: "Amit Kulkarni",
      position: "Head of Manufacturing",
      company: "Automotive Company, Pimpri-Chinchwad",
      text: "Their understanding of automotive manufacturing processes and engineering talent requirements is outstanding. Helped us build a world-class production team.",
      rating: 5
    },
    {
      name: "Priya Deshmukh",
      position: "VP Engineering",
      company: "IT Product Company, Hinjewadi",
      text: "Excellent expertise in IT recruitment and startup culture. Their support in scaling our engineering teams from 50 to 300+ people was exceptional.",
      rating: 5
    },
    {
      name: "Rajesh Marathe",
      position: "Plant Director",
      company: "Engineering Firm, Chakan",
      text: "Professional service with deep manufacturing expertise. Their understanding of industrial operations and safety requirements has been invaluable for our expansion.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Do you have experience with automotive manufacturing in Pune?",
      answer: "Yes, we have extensive experience with Pune's automotive sector including companies like Bajaj Auto, Tata Motors, Mahindra, and numerous auto component suppliers. We understand automotive engineering roles, manufacturing processes, quality standards, and the complete automotive value chain from design to production."
    },
    {
      question: "Can you help IT companies in Hinjewadi with technical recruitment?",
      answer: "Absolutely! We specialize in IT recruitment for Hinjewadi's tech ecosystem including software developers, product managers, DevOps engineers, data scientists, and technical architects. We understand agile methodologies, modern tech stacks, and can assess candidates' technical skills effectively."
    },
    {
      question: "What is your experience with manufacturing and industrial operations?",
      answer: "We have deep expertise in manufacturing HR including production management, quality control, industrial engineering, lean manufacturing, and operational excellence. We understand safety requirements, manufacturing processes, and can recruit for both technical and operational roles in industrial settings."
    },
    {
      question: "Do you work with educational institutions and research organizations?",
      answer: "Yes, we provide HR services to educational institutions including faculty recruitment, research scientist hiring, administrative support, and campus operations management. We understand academic requirements, research environments, and the unique needs of educational organizations."
    },
    {
      question: "How do you handle recruitment for both engineering and IT roles?",
      answer: "We have specialized teams for both domains. For engineering roles, we assess technical competencies, project experience, and domain knowledge. For IT roles, we evaluate programming skills, technology expertise, and software development experience. We use appropriate assessment methods for each field."
    },
    {
      question: "What are the Maharashtra state compliance requirements you manage?",
      answer: "We ensure compliance with Maharashtra state labor laws, industrial regulations, Shops & Establishments Act, and local government requirements specific to Pune and Pimpri-Chinchwad. We stay updated with state-specific regulations and ensure full legal compliance for all our clients."
    },
    {
      question: "Can you support both blue-collar and white-collar hiring in manufacturing?",
      answer: "Yes, we have expertise across the complete spectrum from shop floor workers and technicians to engineers and management. We understand the different skill requirements, assessment methods, and can manage recruitment for all levels in manufacturing organizations."
    },
    {
      question: "How do you handle the cultural aspects of working in Pune?",
      answer: "We understand Pune's unique culture that blends traditional values with modern business practices. We provide cultural orientation, ensure respectful workplace practices, and help companies build inclusive environments that respect local customs while maintaining professional standards."
    }
  ];

  const mappedFaqs = faqs.map(({ question, answer }) => ({ q: question, a: answer }));
  const mappedTestimonials = testimonials.map(t => ({ name: t.name, title: `${t.position} · ${t.company}`, quote: t.text }));

  const puneStats = [
    { number: "220+", label: "Pune Companies Served" },
    { number: "80+", label: "Manufacturing Firms" },
    { number: "65+", label: "IT Companies" },
    { number: "22,000+", label: "Professionals Hired" }
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
        canonical="https://hirewithprachi.com/hr-services-pune"
      />

      <ScrollProgressBar />
      <HireWithPrachiTopBar />
      <HireWithPrachiHeader />

      {/* Enhanced Hero Section */}
      <HeroV2
        cityName="Pune"
        description="Transform your business with cutting-edge HR solutions. From Hinjewadi to Kharadi's tech hub, we deliver premium HR services that align with Pune's dynamic business landscape."
        onSchedule={() => setShowCalendly(true)}
        onDownload={handleBrochureDownload}
        stats={[
          { icon: Users, value: '120+', label: 'Pune Companies Served', color: 'from-blue-500 to-cyan-500' },
          { icon: Award, value: '35+', label: 'Startups & SMEs', color: 'from-purple-500 to-pink-500' },
          { icon: Star, value: '4.9/5', label: 'Client Rating', color: 'from-yellow-500 to-orange-500' },
          { icon: Clock, value: '<2hrs', label: 'Response Time', color: 'from-green-500 to-emerald-500' }
        ]}
        bottomStats={puneStats}
      />

      {/* Enhanced Premium Content Section */}
      <CityLandingPremium
        cityName={cityData.name}
        description={cityData.description}
        stats={cityData.stats}
        advantages={puneAdvantages}
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
        title="What Pune Companies Say"
        subtitle="Success stories from automotive, IT, manufacturing, and educational organizations across Pune's diverse business landscape."
        items={mappedTestimonials}
      />

      <PremiumFAQ
        items={mappedFaqs}
        region="Pune"
        subtitle="Common questions about our HR services specifically for Pune's automotive, IT, and manufacturing ecosystem."
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
              Ready to Elevate HR for Your <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Pune Business</span>?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
            >
              Join 120++ Pune businesses that trust us for their premium HR needs. We've got you covered with sophisticated solutions.
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
              Book Pune Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBrochureDownload}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-sm border border-white/20 text-lg"
            >
              <Download className="w-5 h-5" />
              Pune HR Guide
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
          brochureType="hr-services-pune"
          title="Pune Industrial & IT HR Guide"
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