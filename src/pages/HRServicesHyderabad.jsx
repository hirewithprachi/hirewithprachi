import { motion } from 'framer-motion';
import React, { useState } from 'react';
import SEOOptimizer from '../components/SEOOptimizer';

import { Link } from 'react-router-dom';
import HireWithPrachiTopBar from '../components/hirable/HirableTopBar';
import HireWithPrachiHeader from '../components/hirable/HirableHeader';
import HireWithPrachiFooter from '../components/hirable/HirableFooter';
import PremiumFAQ from '../components/sections/PremiumFAQ';
import CityInternalLinks from '../components/sections/CityInternalLinks';
import CityLandingPremium from '../components/CityLandingPremium';
import HeroV2 from '../components/city-landing/HeroV2';
import GPT4oMiniChatbot from '../components/GPT4oMiniChatbot';
import ScrollProgressBar from '../components/ScrollProgressBar';
import BrochureDownloadModal from '../components/BrochureDownloadModal';
import CalendlyBooking from '../components/CalendlyBooking';
import { getCityData } from '../data/cityData';
import { Activity, AlertTriangle, ArrowRight, Award, BarChart2, Beaker, BookOpen, Brain, Briefcase, Building, Calendar, CheckCircle, CheckSquare, ChevronDown, ChevronUp, ClipboardList, Clock, Cpu, Database, Download, Eye, Factory, FileSpreadsheet, FileText, Globe, Heart, HeartHandshake, Home, KeyRound, Landmark, Lightbulb, Mail, MapPin, MessageCircle, MessageSquare, Phone, PieChart, Play, Presentation, Rocket, Scale, Search, Settings, Shield, Smile, Sparkles, Star, Target, TrendingUp, User, UserPlus, Users, Zap } from 'lucide-react';

export default function HRServicesHyderabad() {
  // SEO Data for Hyderabad
  const seoData = {
    title: "HR Services Hyderabad - Expert HR Consultant | Hire With Prachi",
    description: "Expert HR services in Hyderabad for IT and pharmaceutical companies. Complete HR solutions for Hyderabad businesses.",
    keywords: "HR services Hyderabad, HR consultant Hyderabad, recruitment Hyderabad, IT HR",
    pageType: "localBusiness",
    pageData: {
      city: "Hyderabad",
      latitude: "17.3850",
      longitude: "78.4867",
      title: "HR Services Hyderabad - Expert HR Consultant",
      description: "Expert HR services in Hyderabad for IT and pharmaceutical",
      image: "https://hirewithprachi.com/assets/images/hr-services-hyderabad-1200x630.jpg"
    }
  };
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const handleBrochureDownload = () => {
    setShowBrochureModal(true);
  };

  // Get city data
  const cityData = getCityData('hyderabad');

  // Hyderabad-specific advantages
  const hyderabadAdvantages = [
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "IT Services Expertise",
      description: "Deep understanding of IT services and software development HR requirements"
    },
    {
      icon: <Beaker className="h-6 w-6" />,
      title: "Pharma & Biotech Knowledge",
      description: "Specialized HR solutions for pharmaceutical and biotechnology companies"
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Startup Ecosystem Support",
      description: "Tailored HR services for Hyderabad's growing startup ecosystem"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Telangana Compliance",
      description: "Expert knowledge of Telangana-specific labor laws and regulations"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Quick Response Time",
      description: "Local presence ensures rapid response to Hyderabad business needs"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Local Talent Network",
      description: "Extensive network of quality candidates in Hyderabad job market"
    }
  ];

  // Hyderabad-specific stats
  const hyderabadStats = [
    { number: "180+", label: "Hyderabad Clients Served" },
    { number: "12+", label: "Industries Covered" },
    { number: "6000+", label: "Employees Managed" },
    { number: "99.8%", label: "Compliance Record" }
  ];

  // Hyderabad-specific services
  const services = [
    {
      title: "HR Compliance for Hyderabad Businesses",
      description: "Stay compliant with Telangana labor laws and Hyderabad-specific regulations",
      features: [
        "Telangana Shops & Establishments Act compliance",
        "IT policy and SEZ requirements", 
        "Pharma industry regulations",
        "HITEC City specific compliance",
        "Regular compliance audits and updates"
      ],
      link: "/services/hr-compliance"
    },
    {
      title: "Recruitment Services in Hyderabad",
      description: "Tap into Hyderabad's IT and pharma talent pool for your hiring needs",
      features: [
        "IT services and software development recruitment",
        "Pharmaceutical and biotech recruitment",
        "Campus recruitment from Hyderabad colleges",
        "Executive search for senior positions",
        "Quick turnaround for urgent requirements"
      ],
      link: "/services/recruitment-hiring"
    },
    {
      title: "Payroll Management Hyderabad",
      description: "Accurate payroll processing with Hyderabad-specific considerations",
      features: [
        "Hyderabad cost of living adjustments",
        "IT sector allowance calculations",
        "Telangana state-specific deductions",
        "Multi-location payroll for Hyderabad offices",
        "Statutory compliance with Hyderabad requirements"
      ],
      link: "/services/payroll-management"
    },
    {
      title: "Virtual HR Services Hyderabad",
      description: "Cost-effective HR solutions for Hyderabad startups and SMEs",
      features: [
        "Remote HR support with local understanding",
        "Hyderabad business culture alignment",
        "Cost-effective solutions for IT and pharma companies",
        "Scalable services for growing Hyderabad businesses",
        "24/7 support across time zones"
      ],
      link: "/services/virtual-hr-services"
    }
  ];

  // Hyderabad-specific industries
  const industries = [
    {
      name: "Information Technology",
      description: "Specialized HR services for Hyderabad's IT sector",
      companies: "TCS, Infosys, Wipro, Tech Mahindra, HCL, Microsoft, Google, Amazon"
    },
    {
      name: "Pharmaceuticals & Biotech",
      description: "HR solutions for pharma and biotechnology companies",
      companies: "Dr. Reddy's, Aurobindo Pharma, Divis Labs, Biocon, Genome Valley companies"
    },
    {
      name: "Life Sciences & Research",
      description: "HR management for research and development organizations",
      companies: "Research institutions, Clinical research organizations, Biotech startups"
    },
    {
      name: "Financial Services",
      description: "HR services for banking and financial institutions",
      companies: "HDFC Bank, ICICI Bank, Axis Bank, Kotak Mahindra, Financial services companies"
    },
    {
      name: "Manufacturing & Engineering",
      description: "Industrial HR solutions for manufacturing sector",
      companies: "BHEL, HAL, Manufacturing units, Engineering companies"
    },
    {
      name: "Real Estate & Construction",
      description: "HR services for Hyderabad's growing real estate sector",
      companies: "Property developers, Construction companies, Real estate firms"
    }
  ];

  // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "HR Services Hyderabad - IT & Pharma HR Solutions",
    "description": "Expert HR services in Hyderabad for IT companies, pharmaceutical firms, biotech and life sciences. Specialized recruitment, compliance and talent management for Cyberabad and HITEC City.",
    "provider": {
      "@type": "Organization",
      "name": "Hire With Prachi",
      "founder": {
        "@type": "Person",
        "name": "Prachi Shrivastava",
        "jobTitle": "IT & Pharma HR Consultant"
      },
      "url": "https://prachi-hr.com",
      "telephone": "+91-8740889927",
      "email": "info@hirewithprachi.com"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Hyderabad",
        "addressRegion": "Telangana",
        "addressCountry": "India"
      },
      {
        "@type": "Place", 
        "name": "HITEC City",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana"
      },
      {
        "@type": "Place",
        "name": "Genome Valley", 
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 17.3850,
        "longitude": 78.4867
      },
      "geoRadius": "60"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Hyderabad IT & Pharma HR Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "IT Services HR Hyderabad",
            "description": "Specialized HR solutions for IT companies in HITEC City and Cyberabad"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Pharma HR Hyderabad",
            "description": "Professional HR services for pharmaceutical and biotech companies"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Life Sciences HR Hyderabad",
            "description": "Comprehensive HR support for life sciences and research organizations"
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

  // FAQ data for Hyderabad
  const faqs = [
    {
      question: "Do you have experience with IT services companies in HITEC City?",
      answer: "Yes, we have extensive experience with IT services companies including global delivery centers, offshore development units, and software product companies. We understand delivery models, client interface requirements, technical skill sets, and the unique challenges of managing global teams from Hyderabad."
    },
    {
      question: "Can you help pharmaceutical companies with regulatory compliance hiring?",
      answer: "Absolutely! We specialize in pharma industry recruitment including regulatory affairs specialists, clinical research associates, quality assurance professionals, and drug development scientists. We understand FDA regulations, clinical trial requirements, and pharmaceutical compliance standards."
    },
    {
      question: "What is your experience with data science and AI companies?",
      answer: "We have deep expertise in recruiting for data science, machine learning, and AI roles including data scientists, ML engineers, AI researchers, business intelligence specialists, and analytics consultants. We understand the technical requirements and can assess candidates' skills in statistics, programming, and domain expertise."
    },
    {
      question: "How do you support global delivery centers and captive units?",
      answer: "We provide comprehensive support for global delivery centers including cross-cultural training, 24/7 operations management, international client communication skills, time zone coordination, and global compliance requirements. We understand the unique challenges of offshore delivery models."
    },
    {
      question: "Do you understand Genome Valley and pharma industry requirements?",
      answer: "Yes, we have specialized knowledge of Genome Valley's pharmaceutical and biotech ecosystem. This includes understanding of drug development lifecycles, clinical trial processes, regulatory requirements, quality standards, and the specific talent needs of pharma and biotech companies."
    },
    {
      question: "Can you help with both technical and non-technical roles in IT companies?",
      answer: "Yes, we support recruitment for the full spectrum of IT roles including software engineers, architects, project managers, delivery managers, business analysts, sales professionals, and support functions. We understand the complete organizational structure of IT services companies."
    },
    {
      question: "What are the Telangana state compliance requirements you handle?",
      answer: "We ensure compliance with Telangana state labor laws, IT policy regulations, SEZ requirements for companies in HITEC City, pharmaceutical industry regulations, and state-specific employment practices. We stay updated with the latest regulatory changes affecting businesses in Hyderabad."
    },
    {
      question: "How do you handle recruitment for emerging technologies like AI and blockchain?",
      answer: "We have experience recruiting for emerging technologies including AI/ML engineers, blockchain developers, IoT specialists, cybersecurity experts, and cloud architects. We understand the skill requirements, market trends, and can identify candidates with the right technical expertise and learning agility."
    }
  ];

  // Map local question/answer format to the reusable FAQ section props
  const faqsForSection = faqs.map(({ question, answer }) => ({ q: question, a: answer }));

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
        canonical="https://hirewithprachi.com/hr-services-hyderabad"
      />

      <ScrollProgressBar />
      <HireWithPrachiTopBar />
      <HireWithPrachiHeader />

      {/* Enhanced Hero Section */}
      <HeroV2
        cityName="Hyderabad"
        description="Accelerate your business with cutting-edge HR solutions. From Hitec City to Gachibowli's tech hub, we deliver premium HR services that align with Hyderabad's dynamic business landscape."
        onSchedule={() => setShowCalendly(true)}
        onDownload={handleBrochureDownload}
        stats={[
          { icon: Users, value: '180+', label: 'Hyderabad Companies Served', color: 'from-blue-500 to-cyan-500' },
          { icon: Award, value: '45+', label: 'Startups & SMEs', color: 'from-purple-500 to-pink-500' },
          { icon: Star, value: '4.9/5', label: 'Client Rating', color: 'from-yellow-500 to-orange-500' },
          { icon: Clock, value: '<2hrs', label: 'Response Time', color: 'from-green-500 to-emerald-500' }
        ]}
        bottomStats={hyderabadStats}
      />

      {/* Enhanced Premium Content Section */}
      <CityLandingPremium
        cityName={cityData.name}
        description={cityData.description}
        stats={cityData.stats}
        advantages={hyderabadAdvantages}
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

      {/* FAQ Section - Premium */}
      <PremiumFAQ
        items={faqsForSection}
        region="Hyderabad"
        subtitle="Common questions about our HR services specifically for Hyderabad's IT and pharma ecosystem."
      />

      {/* Internal links to other city pages */}
      
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
              Ready to Elevate HR for Your <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Hyderabad Business</span>?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
            >
              Join 180++ Hyderabad businesses that trust us for their premium HR needs. We've got you covered with sophisticated solutions.
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
              Book Hyderabad Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBrochureDownload}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-sm border border-white/20 text-lg"
            >
              <Download className="w-5 h-5" />
              Hyderabad HR Guide
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
          brochureType="hr-services-hyderabad"
          title="Hyderabad Tech & Pharma HR Guide"
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