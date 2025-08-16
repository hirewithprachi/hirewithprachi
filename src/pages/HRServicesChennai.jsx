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
import { CheckCircle, Users, Shield, Zap, Award, MessageSquare, BarChart2, Search, Phone, Mail, ChevronDown, ChevronUp, Download, Calendar, MessageCircle, FileText, MapPin, Building, Briefcase, TrendingUp, Globe, Star, Clock, ArrowRight, Play, Landmark, Home, User, Heart, Eye, AlertTriangle, CheckSquare, ClipboardList, BookOpen, Settings, Target, Rocket, Cpu, Brain, Sparkles, HeartHandshake, Smile, Presentation, PieChart, Activity, Database, KeyRound, UserPlus, FileSpreadsheet, Lightbulb, Car, Ship } from 'lucide-react';

export default function HRServicesChennai() {
  // SEO Data for Chennai
  const seoData = {
    title: "HR Services Chennai - Expert HR Consultant | Hire With Prachi",
    description: "Expert HR services in Chennai for manufacturing and IT companies. Complete HR solutions for Chennai businesses.",
    keywords: "HR services Chennai, HR consultant Chennai, recruitment Chennai, manufacturing HR",
    pageType: "localBusiness",
    pageData: {
      city: "Chennai",
      latitude: "13.0827",
      longitude: "80.2707",
      title: "HR Services Chennai - Expert HR Consultant",
      description: "Expert HR services in Chennai for manufacturing and IT",
      image: "https://hirewithprachi.com/assets/images/hr-services-chennai-1200x630.jpg"
    }
  };
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const handleBrochureDownload = () => {
    setShowBrochureModal(true);
  };

  // Get city data
  const cityData = getCityData('chennai');

    // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "HR Services Chennai - Manufacturing & Healthcare HR Solutions",
    "description": "Expert HR services in Chennai for automotive, healthcare, manufacturing and IT companies. Specialized recruitment, compliance and employee management for Tamil Nadu's industrial capital.",
    "provider": {
      "@type": "Organization",
      "name": "Hire With Prachi",
      "founder": {
        "@type": "Person",
        "name": "Prachi Shrivastava",
        "jobTitle": "Industrial HR Consultant"
      },
      "url": "https://prachi-hr.com",
      "telephone": "+91-8740889927",
      "email": "info@hirewithprachi.com"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Chennai",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "India"
      },
        {
        "@type": "Place", 
        "name": "Sriperumbudur",
        "addressLocality": "Chennai",
        "addressRegion": "Tamil Nadu"
              },
        {
          "@type": "Place",
          "name": "Ambattur", 
          "addressLocality": "Chennai",
          "addressRegion": "Tamil Nadu"
        }
      ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 13.0827,
        "longitude": 80.2707
      },
      "geoRadius": "75"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Chennai Industrial HR Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Automotive HR Chennai",
            "description": "Specialized HR solutions for automotive manufacturing in Chennai"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Healthcare HR Chennai",
          "description": "Professional HR services for hospitals and healthcare organizations"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Manufacturing HR Chennai",
          "description": "Industrial HR solutions for manufacturing plants and factories"
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

  const chennaiAdvantages = [
    {
      icon: <Car className="h-6 w-6" />,
      title: "Automotive Capital Expertise",
      description: "Deep knowledge of automotive manufacturing and supplier ecosystem"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Healthcare Sector Focus",
      description: "Specialized services for hospitals, clinics, and medical device companies"
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: "Manufacturing Hub Knowledge",
      description: "Expertise in heavy industries, textile, and manufacturing operations"
    },
    {
      icon: <Ship className="h-6 w-6" />,
      title: "Port & Logistics Understanding",
      description: "Experience with port operations, shipping, and logistics companies"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Tamil Culture Integration",
      description: "Local cultural understanding with Tamil language support"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Industrial Compliance",
      description: "Expert knowledge of Tamil Nadu state regulations and industrial laws"
    }
  ];

  const services = [
    {
      title: "Automotive Manufacturing HR",
      description: "Specialized HR solutions for Chennai's automotive manufacturing ecosystem",
      features: [
        "Automotive engineer recruitment",
        "Blue-collar workforce management",
        "Supplier ecosystem HR support",
        "Quality control team building",
        "Manufacturing safety compliance",
        "Shift management optimization"
      ],
      link: "/services/recruitment-hiring"
    },
    {
      title: "Healthcare HR Services",
      description: "Comprehensive HR support for hospitals, clinics, and healthcare organizations",
      features: [
        "Medical professional recruitment",
        "Healthcare compliance management",
        "Nursing staff optimization",
        "Medical equipment training",
        "Patient care standards",
        "Healthcare worker retention"
      ],
      link: "/services/virtual-hr-services"
    },
    {
      title: "Manufacturing & Industrial HR",
      description: "Complete HR solutions for heavy manufacturing and industrial operations",
      features: [
        "Industrial engineer hiring",
        "Factory worker management",
        "Production team optimization",
        "Industrial safety training",
        "Manufacturing compliance",
        "Operational efficiency programs"
      ],
      link: "/services/performance-management"
    },
    {
      title: "Port & Logistics HR",
      description: "Specialized HR services for Chennai port operations and logistics companies",
      features: [
        "Port operations staffing",
        "Logistics coordinator recruitment",
        "Maritime compliance training",
        "Shipping industry expertise",
        "Cargo handling team management",
        "International trade HR support"
              ],
        link: "/services/hr-compliance"
      }
    ];

  const chennaiAreas = [
    {
      area: "Sriperumbudur",
      focus: "Automotive Manufacturing",
      highlights: "Hyundai, Ford, BMW, Nissan, Auto components"
    },
    {
      area: "Ambattur",
      focus: "Industrial Manufacturing",
      highlights: "Heavy industries, textile mills, manufacturing units"
    },
    {
      area: "OMR (IT Corridor)",
      focus: "IT & Services",
      highlights: "TCS, Infosys, Wipro, Cognizant, IT parks"
    },
    {
      area: "Chennai Port",
      focus: "Port & Logistics",
      highlights: "Chennai Port Trust, shipping companies, logistics"
    },
    {
      area: "Guindy & Taramani",
      focus: "Healthcare & Research",
      highlights: "Hospitals, medical colleges, research centers"
    },
    {
      area: "Central Chennai",
      focus: "Corporate Offices",
      highlights: "Banking, finance, corporate headquarters"
    }
  ];

  const industries = [
    {
      name: "Automotive Manufacturing",
      description: "Car manufacturing, auto components, and supplier ecosystem",
      companies: "Hyundai, Ford, BMW, Nissan, Renault, TVS, Ashok Leyland"
    },
    {
      name: "Healthcare & Medical",
      description: "Hospitals, medical colleges, and healthcare organizations",
      companies: "Apollo Hospitals, MIOT, Sankara Nethralaya, Medical colleges"
    },
    {
      name: "Heavy Manufacturing",
      description: "Heavy engineering, machinery, and industrial equipment",
      companies: "L&T, BHEL, HCL, Heavy engineering units"
    },
    {
      name: "Textile & Leather",
      description: "Textile manufacturing and leather processing industries",
      companies: "Textile mills, leather exporters, garment manufacturers"
    },
    {
      name: "IT & Software Services",
      description: "Software development and IT services companies",
      companies: "TCS, Infosys, Wipro, Cognizant, HCL, Tech Mahindra"
    },
    {
      name: "Port & Logistics",
      description: "Port operations, shipping, and logistics services",
      companies: "Chennai Port, Container Corporation, Shipping lines"
    }
  ];

  const testimonials = [
    {
      name: "Suresh Kumar",
      position: "Plant HR Manager",
      company: "Auto Manufacturing, Sriperumbudur",
      text: "Their understanding of automotive manufacturing HR challenges is exceptional. Helped us optimize our blue-collar workforce and improve production efficiency.",
      rating: 5
    },
    {
      name: "Dr. Priya Venkatesh",
      position: "Chief Administrator",
      company: "Multi-Specialty Hospital, Chennai",
      text: "Professional service with deep healthcare expertise. Their support in recruiting medical professionals and ensuring compliance has been invaluable.",
      rating: 5
    },
    {
      name: "Rajesh Narayanan",
      position: "Operations Director",
      company: "Heavy Industries, Ambattur",
      text: "Excellent understanding of manufacturing operations and safety requirements. Their industrial HR solutions have significantly improved our operational efficiency.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Do you have experience with automotive manufacturing HR?",
      answer: "Yes, we have extensive experience with Chennai's automotive sector including car manufacturers like Hyundai, Ford, BMW, and their supplier ecosystem. We understand automotive engineering roles, production line management, quality control, and the unique HR challenges of automotive manufacturing."
    },
    {
      question: "Can you help healthcare organizations with medical staff recruitment?",
      answer: "Absolutely! We specialize in healthcare HR including recruitment of doctors, nurses, medical technicians, and healthcare administrators. We understand medical licensing requirements, healthcare compliance, and the specific needs of hospitals and medical institutions."
    },
    {
      question: "What is your experience with manufacturing and industrial HR?",
      answer: "We have deep expertise in manufacturing HR including heavy industries, textile manufacturing, and industrial operations. This includes blue-collar workforce management, industrial safety compliance, shift operations, and production team optimization."
    },
    {
      question: "Do you provide Tamil language support for local workforce?",
      answer: "Yes, we understand the importance of local language communication in Chennai. We provide Tamil language support for workforce communication, training materials, and ensure cultural sensitivity in all HR processes while maintaining professional standards."
    },
    {
      question: "How do you handle Chennai port and logistics industry requirements?",
      answer: "We have specialized knowledge of port operations, shipping industry requirements, maritime compliance, and logistics management. This includes understanding of port labor regulations, shipping documentation, and international trade compliance requirements."
    },
    {
      question: "What are the Tamil Nadu state compliance requirements you handle?",
      answer: "We ensure compliance with Tamil Nadu Shops & Establishments Act, state labor laws, industrial regulations, and local government requirements. We stay updated with state-specific regulations and ensure full legal compliance for all our clients."
    },
    {
      question: "Can you support both blue-collar and white-collar recruitment?",
      answer: "Yes, we have expertise in both blue-collar recruitment (factory workers, technicians, operators) and white-collar recruitment (engineers, managers, executives). We understand the different requirements and can manage the entire spectrum of workforce needs."
    },
    {
      question: "How do you handle industrial safety and compliance training?",
      answer: "We provide comprehensive industrial safety training programs, compliance workshops, and ensure adherence to factory safety standards. This includes safety protocol training, emergency procedures, and regulatory compliance specific to manufacturing environments."
    }
  ];

  const mappedFaqs = faqs.map(({ question, answer }) => ({ q: question, a: answer }));
  const mappedTestimonials = testimonials.map(t => ({ name: t.name, title: `${t.position} · ${t.company}`, quote: t.text }));

  const chennaiStats = [
    { number: "150+", label: "Chennai Companies Served" },
    { number: "40+", label: "Manufacturing Plants" },
    { number: "12,000+", label: "Workers Managed" },
    { number: "25+", label: "Healthcare Organizations" }
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
        canonical="https://hirewithprachi.com/hr-services-chennai"
      />

      <ScrollProgressBar />
      <HireWithPrachiTopBar />
      <HireWithPrachiHeader />

      {/* Enhanced Hero Section */}
      <HeroV2
        cityName="Chennai"
        description="Transform your business with cutting-edge HR solutions. From T Nagar to OMR's tech corridor, we deliver premium HR services that align with Chennai's dynamic business landscape."
        onSchedule={() => setShowCalendly(true)}
        onDownload={handleBrochureDownload}
        stats={[
          { icon: Users, value: '150+', label: 'Chennai Companies Served', color: 'from-blue-500 to-cyan-500' },
          { icon: Award, value: '40+', label: 'Startups & SMEs', color: 'from-purple-500 to-pink-500' },
          { icon: Star, value: '4.9/5', label: 'Client Rating', color: 'from-yellow-500 to-orange-500' },
          { icon: Clock, value: '<2hrs', label: 'Response Time', color: 'from-green-500 to-emerald-500' }
        ]}
        bottomStats={chennaiStats}
      />

      {/* Enhanced Premium Content Section */}
      <CityLandingPremium
        cityName={cityData.name}
        description={cityData.description}
        stats={cityData.stats}
        advantages={chennaiAdvantages}
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
        title="What Chennai Industries Say"
        subtitle="Success stories from automotive, healthcare, and manufacturing companies across Chennai's industrial landscape."
        items={mappedTestimonials}
      />

      <PremiumFAQ
        items={mappedFaqs}
        region="Chennai"
        subtitle="Common questions about our HR services specifically for Chennai's industrial ecosystem."
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
              Ready to Elevate HR for Your <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Chennai Business</span>?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
            >
              Join 150++ Chennai businesses that trust us for their premium HR needs. We've got you covered with sophisticated solutions.
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
              Book Chennai Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBrochureDownload}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-sm border border-white/20 text-lg"
            >
              <Download className="w-5 h-5" />
              Chennai HR Guide
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
          brochureType="hr-services-chennai"
          title="Chennai Industrial HR Services Guide"
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