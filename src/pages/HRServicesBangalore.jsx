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
import { CheckCircle, Users, Shield, Zap, Award, MessageSquare, BarChart2, Search, Phone, Mail, ChevronDown, ChevronUp, Download, Calendar, MessageCircle, FileText, MapPin, Building, Briefcase, TrendingUp, Globe, Star, Clock, ArrowRight, Play, Landmark, Home, User, Heart, Eye, AlertTriangle, CheckSquare, ClipboardList, BookOpen, Settings, Target, Rocket, Cpu, Brain, Sparkles, HeartHandshake, Smile, Presentation, PieChart, Activity, Database, KeyRound, UserPlus, FileSpreadsheet, Lightbulb, Code } from 'lucide-react';

export default function HRServicesBangalore() {
  // SEO Data for Bangalore
  const seoData = {
    title: "HR Services Bangalore - Expert HR Consultant | Hire With Prachi",
    description: "Expert HR services in Bangalore for tech startups and IT companies. Complete HR solutions for Bangalore businesses.",
    keywords: "HR services Bangalore, HR consultant Bangalore, recruitment Bangalore, IT HR",
    pageType: "localBusiness",
    pageData: {
      city: "Bangalore",
      latitude: "12.9716",
      longitude: "77.5946",
      title: "HR Services Bangalore - Expert HR Consultant",
      description: "Expert HR services in Bangalore for tech startups",
      image: "https://hirewithprachi.com/assets/images/hr-services-bangalore-1200x630.jpg"
    }
  };

  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const handleBrochureDownload = () => {
    setShowBrochureModal(true);
  };

  // Get city data
  const cityData = getCityData('bangalore');

    // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "HR Services Bangalore - IT Capital HR Solutions",
    "description": "Expert HR services in Bangalore for IT companies, startups, R&D centers and tech MNCs. Specialized recruitment, payroll, compliance and employee engagement for India's Silicon Valley.",
    "provider": {
      "@type": "Organization",
      "name": "Hire With Prachi",
      "founder": {
        "@type": "Person",
        "name": "Prachi Shrivastava",
        "jobTitle": "IT HR Consultant"
      },
      "url": "https://prachi-hr.com",
      "telephone": "+91-8740889927",
      "email": "info@hirewithprachi.com"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Bangalore",
        "addressRegion": "Karnataka",
        "addressCountry": "India"
      },
      {
        "@type": "Place", 
        "name": "Electronic City",
        "addressLocality": "Bangalore",
        "addressRegion": "Karnataka"
      },
      {
        "@type": "Place",
        "name": "Whitefield", 
        "addressLocality": "Bangalore",
        "addressRegion": "Karnataka"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 12.9716,
        "longitude": 77.5946
      },
      "geoRadius": "50"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "IT HR Services Bangalore",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "IT Recruitment Bangalore",
            "description": "Specialized technical recruitment for software companies in Bangalore"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Startup HR Services Bangalore",
            "description": "Agile HR solutions for tech startups and scale-ups"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "MNC HR Support Bangalore",
            "description": "Enterprise HR services for multinational R&D centers"
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

  const bangaloreAdvantages = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "IT & Tech Expertise",
      description: "Deep understanding of software development lifecycle and tech roles"
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: "Startup Ecosystem Knowledge",
      description: "Experience with India's largest startup hub and scaling challenges"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "MNC R&D Center Focus",
      description: "Specialized services for global R&D centers and innovation labs"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Tech Talent Pipeline",
      description: "Access to Bangalore's vast pool of engineers and tech professionals"
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Innovation HR Practices",
      description: "Modern HR approaches for agile, innovative technology companies"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Scale-up Support",
      description: "Proven experience helping companies scale from 10 to 1000+ employees"
    }
  ];

  const services = [
    {
      title: "IT Recruitment & Talent Acquisition",
      description: "Specialized technical recruitment for software companies and tech startups",
      features: [
        "Full-stack developer recruitment",
        "Data scientist and AI specialist hiring",
        "DevOps and cloud architect sourcing",
        "Technical interview coordination",
        "Coding assessment and screening",
        "Remote work talent acquisition"
      ],
      link: "/services/recruitment-hiring"
    },
    {
      title: "Startup HR Solutions",
      description: "Agile HR services designed for fast-growing technology startups",
      features: [
        "Rapid scaling HR support",
        "ESOP design and implementation",
        "Startup culture development",
        "Flexible work policy creation",
        "Lean HR process design",
        "Investor-ready HR documentation"
      ],
      link: "/services/virtual-hr-services"
    },
    {
      title: "MNC R&D Center Support",
      description: "Enterprise HR services for multinational research and development centers",
      features: [
        "Global policy localization",
        "Innovation team management",
        "Cross-cultural team building",
        "Research talent retention",
        "IP and confidentiality training",
        "Global mobility support"
      ],
      link: "/services/performance-management"
    },
    {
      title: "Tech Industry Compliance",
      description: "Specialized compliance services for IT and technology sector requirements",
      features: [
        "IT sector labor law compliance",
        "Data protection and GDPR training",
        "Software export compliance",
        "Remote work legal framework",
        "Contractor vs employee classification",
        "Karnataka state IT policies"
      ],
      link: "/services/hr-compliance"
    }
  ];

  const techHubs = [
    {
      area: "Electronic City",
      focus: "Software Development",
      highlights: "Infosys, Wipro, TCS, Biocon, Tech parks"
    },
    {
      area: "Whitefield",
      focus: "Global R&D Centers",
      highlights: "SAP Labs, Dell, Oracle, Microsoft, Cisco"
    },
    {
      area: "Koramangala",
      focus: "Startup Hub",
      highlights: "Flipkart, Myntra, Ola, numerous startups"
    },
    {
      area: "Hebbal & Manyata",
      focus: "IT Parks",
      highlights: "Manyata Tech Park, Embassy Tech Village"
    },
    {
      area: "Sarjapur Road",
      focus: "Emerging Tech",
      highlights: "New tech companies, innovation centers"
    },
    {
      area: "Outer Ring Road",
      focus: "Mixed Tech",
      highlights: "Various IT companies and service centers"
    }
  ];

  const industries = [
    {
      name: "Software Development",
      description: "Custom software, product development, and enterprise solutions",
      companies: "TCS, Infosys, Wipro, HCL, Mindtree, Mphasis"
    },
    {
      name: "Global R&D Centers",
      description: "Multinational innovation and research centers",
      companies: "SAP Labs, Microsoft, Oracle, Dell, Cisco, Intel"
    },
    {
      name: "Tech Startups",
      description: "Innovative startups and unicorns in various tech domains",
      companies: "Flipkart, Myntra, Ola, Swiggy, BigBasket, Byju's"
    },
    {
      name: "Fintech & Banking",
      description: "Financial technology and digital banking solutions",
      companies: "Razorpay, PhonePe, Paytm, CRED, various banks' tech arms"
    },
    {
      name: "Biotechnology",
      description: "Biotech research and pharmaceutical companies",
      companies: "Biocon, Strides Pharma, Syngene, various biotech startups"
    },
    {
            name: "Aerospace & Defense",
      description: "Aerospace engineering and defense technology",
      companies: "HAL, ISRO, Boeing, Airbus, defense contractors"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      position: "CTO",
      company: "TechInnovate Startup, Koramangala",
      text: "Their understanding of startup culture and scaling challenges is exceptional. Helped us build our tech team from 15 to 200 engineers seamlessly.",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      position: "Head of HR",
      company: "Global R&D Center, Whitefield",
      text: "Professional service with deep understanding of MNC requirements. Their support in localizing global policies while maintaining compliance was outstanding.",
      rating: 5
    },
    {
      name: "Priya Nair",
      position: "Founder",
      company: "AI Startup, Electronic City",
      text: "Perfect partner for our journey from idea to IPO. They understand the unique challenges of deep-tech companies and provided excellent talent acquisition support.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Do you specialize in IT and technology sector recruitment?",
      answer: "Yes, we have extensive experience in IT recruitment including full-stack developers, data scientists, DevOps engineers, cloud architects, AI/ML specialists, and product managers. We understand technical roles, skill requirements, and can coordinate technical interviews and coding assessments."
    },
    {
      question: "Can you help startups with ESOP and equity management?",
      answer: "Absolutely! We provide comprehensive ESOP design, implementation, and management services. This includes equity structure planning, vesting schedules, tax optimization, employee communication, and compliance with SEBI regulations for startups looking to offer employee stock options."
    },
    {
      question: "How do you support MNC R&D centers in Bangalore?",
      answer: "We provide specialized services for global R&D centers including policy localization, innovation team management, cross-cultural team building, research talent retention strategies, IP protection training, and global mobility support for international assignments."
    },
    {
      question: "What is your experience with Bangalore's startup ecosystem?",
      answer: "We have extensive experience working with startups across all stages - from early-stage to unicorns. We understand the unique challenges of rapid scaling, fundraising requirements, investor expectations, and the agile work culture typical of Bangalore's startup scene."
    },
    {
      question: "Do you understand remote work policies for tech companies?",
      answer: "Yes, we help design and implement flexible remote work policies, hybrid work models, distributed team management, remote onboarding processes, and compliance requirements for companies with remote or distributed teams."
    },
    {
      question: "How do you handle compliance for IT companies in Karnataka?",
      answer: "We ensure compliance with Karnataka state IT policies, software export regulations, data protection requirements, contractor classification rules, and industry-specific labor laws. We stay updated with the latest regulatory changes affecting the IT sector."
    },
    {
      question: "Can you help with technical interview processes?",
      answer: "Yes, we can coordinate and manage technical interview processes including coding assessments, system design interviews, technical panel coordination, reference checks, and offer negotiations for technical roles across various tech stacks."
    },
    {
      question: "What are your rates for Bangalore IT companies?",
      answer: "Our pricing is competitive and tailored to company size and requirements. For startups, we offer flexible packages starting from ₹25,000/month. For larger companies and MNCs, we provide comprehensive enterprise solutions with custom pricing based on scope and complexity."
    }
  ];

  const mappedFaqs = faqs.map(({ question, answer }) => ({ q: question, a: answer }));
  const mappedTestimonials = testimonials.map(t => ({ name: t.name, title: `${t.position} · ${t.company}`, quote: t.text }));

  const bangaloreStats = [
    { number: "200+", label: "Tech Companies Served" },
    { number: "50+", label: "Startup Clients" },
    { number: "15,000+", label: "IT Professionals Hired" },
    { number: "25+", label: "MNC R&D Centers" }
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
        canonical="https://hirewithprachi.com/hr-services-bangalore"
      />

      <ScrollProgressBar />
      <HireWithPrachiTopBar />
      <HireWithPrachiHeader />

      {/* Enhanced Hero Section */}
      <HeroV2
        cityName="Bangalore"
        description="Accelerate your business with cutting-edge HR solutions. From Electronic City to Whitefield's tech hub, we deliver premium HR services that align with Bangalore's dynamic business landscape."
        onSchedule={() => setShowCalendly(true)}
        onDownload={handleBrochureDownload}
        stats={[
          { icon: Users, value: '200+', label: 'Bangalore Companies Served', color: 'from-blue-500 to-cyan-500' },
          { icon: Award, value: '50+', label: 'Startups & SMEs', color: 'from-purple-500 to-pink-500' },
          { icon: Star, value: '4.9/5', label: 'Client Rating', color: 'from-yellow-500 to-orange-500' },
          { icon: Clock, value: '<2hrs', label: 'Response Time', color: 'from-green-500 to-emerald-500' }
        ]}
        bottomStats={bangaloreStats}
      />

      {/* Enhanced Premium Content Section */}
      <CityLandingPremium
        cityName={cityData.name}
        description={cityData.description}
        stats={cityData.stats}
        advantages={bangaloreAdvantages}
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

      {/* Testimonials Section - Premium Slider */}
      <PremiumTestimonials
        title="What Bangalore Tech Companies Say"
        subtitle="Success stories from startups, MNCs, and established tech companies across India's Silicon Valley."
        items={mappedTestimonials}
      />

      {/* FAQ Section - Premium */}
      <PremiumFAQ
        items={mappedFaqs}
        region="Bangalore"
        subtitle="Common questions about our HR services specifically for Bangalore's tech ecosystem."
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
              Ready to Elevate HR for Your <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Bangalore Business</span>?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
            >
              Join 200++ Bangalore businesses that trust us for their premium HR needs. We've got you covered with sophisticated solutions.
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
              Book Bangalore Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBrochureDownload}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-sm border border-white/20 text-lg"
            >
              <Download className="w-5 h-5" />
              Bangalore HR Guide
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
          brochureType="hr-services-bangalore"
          title="Bangalore Tech HR Services Guide"
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