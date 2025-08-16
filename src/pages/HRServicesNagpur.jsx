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
import { Activity, AlertTriangle, ArrowRight, Award, BarChart2, BookOpen, Brain, Briefcase, Building, Calendar, CheckCircle, CheckSquare, ChevronDown, ChevronUp, ClipboardList, Clock, Compass, Cpu, Database, Download, Eye, FileSpreadsheet, FileText, Globe, Heart, HeartHandshake, Home, KeyRound, Landmark, Lightbulb, Mail, MapPin, MessageCircle, MessageSquare, Phone, PieChart, Play, Presentation, Rocket, Search, Settings, Shield, Smile, Sparkles, Star, Target, Leaf, TrendingUp, Truck, User, UserPlus, Users, Zap } from 'lucide-react';

export default function HRServicesNagpur() {
  // SEO Data for Nagpur
  const seoData = {
    title: "HR Services Nagpur - Expert HR Consultant | Hire With Prachi",
    description: "Expert HR services in Nagpur for manufacturing and IT companies. Complete HR solutions for Nagpur businesses.",
    keywords: "HR services Nagpur, HR consultant Nagpur, recruitment Nagpur, manufacturing HR",
    pageType: "localBusiness",
    pageData: {
      city: "Nagpur",
      latitude: "21.1458",
      longitude: "79.0882",
      title: "HR Services Nagpur - Expert HR Consultant",
      description: "Expert HR services in Nagpur for manufacturing and IT",
      image: "https://hirewithprachi.com/assets/images/hr-services-nagpur-1200x630.jpg"
    }
  };
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const handleBrochureDownload = () => {
    setShowBrochureModal(true);
  };

  // Get city data
  const cityData = getCityData('nagpur');

    // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "HR Services Nagpur - Logistics Transportation & Government HR Solutions",
    "description": "Expert HR services in Nagpur for logistics, transportation, government and mining industries. Specialized recruitment, compliance and workforce management for Central India's geographic hub.",
    "provider": {
      "@type": "Organization",
      "name": "Hire With Prachi",
      "founder": {
        "@type": "Person",
        "name": "Prachi Shrivastava",
        "jobTitle": "Logistics & Government HR Consultant"
      },
      "url": "https://prachi-hr.com",
      "telephone": "+91-8740889927",
      "email": "info@hirewithprachi.com"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Nagpur",
        "addressRegion": "Maharashtra",
        "addressCountry": "India"
      },
      {
        "@type": "Place", 
        "name": "MIDC Hingna",
        "addressLocality": "Nagpur",
        "addressRegion": "Maharashtra"
      },
      {
        "@type": "Place",
        "name": "Wardha Road", 
        "addressLocality": "Nagpur",
        "addressRegion": "Maharashtra"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 21.1458,
        "longitude": 79.0882
      },
      "geoRadius": "60"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Nagpur Logistics & Government HR Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Logistics & Transportation HR Nagpur",
            "description": "Specialized HR solutions for logistics, transportation, and supply chain companies"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Government & Administration HR Nagpur",
            "description": "Professional HR services for government organizations and administrative centers"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mining & Power Industry HR Nagpur",
            "description": "Comprehensive HR support for mining, power generation, and energy companies"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "70"
    }
  };

  const nagpurAdvantages = [
    {
      icon: <Compass className="h-6 w-6" />,
      title: "Geographic Center of India",
      description: "Strategic location advantage as India's central hub for logistics and transportation"
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Logistics & Transportation Hub",
      description: "Deep expertise in logistics, supply chain, transportation, and distribution networks"
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: "Government & Administrative Center",
      description: "Understanding of Maharashtra government offices and administrative organizations"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Power & Energy Industries",
      description: "Specialized knowledge of power generation, energy, and electrical industries"
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "Mining & Natural Resources",
      description: "Experience with mining operations, coal, and natural resource industries"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Central India Business Gateway",
      description: "Regional expertise connecting North, South, East, and West India markets"
    }
  ];

  const services = [
    {
      title: "Logistics & Transportation HR",
      description: "Specialized HR solutions for logistics companies, transportation networks, and supply chain operations",
      features: [
        "Logistics manager recruitment",
        "Transportation coordinator hiring",
        "Supply chain specialist sourcing",
        "Warehouse operations manager recruitment",
        "Fleet management professional hiring",
        "Distribution network optimization"
      ],
      link: "/services/recruitment-hiring"
    },
    {
      title: "Government & Administrative HR",
      description: "Comprehensive HR support for government departments and administrative organizations",
      features: [
        "Government officer recruitment",
        "Administrative staff hiring",
        "Policy implementation support",
        "Public service training programs",
        "Compliance and governance",
        "Efficiency improvement initiatives"
      ],
      link: "/services/hr-compliance"
    },
    {
      title: "Power & Mining Industry HR",
      description: "Advanced HR services for power generation, mining companies, and energy sector organizations",
      features: [
        "Power plant engineer recruitment",
        "Mining operations manager hiring",
        "Electrical specialist sourcing",
        "Safety officer recruitment",
        "Environmental compliance expert hiring",
        "Technical operations training"
      ],
      link: "/services/performance-management"
    },
    {
      title: "Education & Emerging Sectors HR",
      description: "Professional HR services for educational institutions and emerging business sectors",
      features: [
        "Academic professional recruitment",
        "Research scientist hiring",
        "IT specialist sourcing",
        "Technical trainer recruitment",
        "Innovation and development support",
        "Modern skills training programs"
      ],
      link: "/services/virtual-hr-services"
    }
  ];

  const nagpurAreas = [
    {
      area: "MIDC Hingna",
      focus: "Industrial & Manufacturing",
      highlights: "Industrial estate, manufacturing units, logistics centers, warehouses"
    },
    {
      area: "Wardha Road",
      focus: "Commercial & IT",
      highlights: "IT companies, commercial centers, business offices, corporate hubs"
    },
    {
      area: "Civil Lines",
      focus: "Government & Administration",
      highlights: "Government offices, administrative centers, public sector organizations"
    },
    {
      area: "Sadar & Sitabuldi",
      focus: "Commercial & Trading",
      highlights: "Commercial markets, trading centers, business establishments"
    },
    {
      area: "Butibori Industrial Area",
      focus: "Heavy Industries",
      highlights: "Heavy industries, power plants, manufacturing complexes"
    },
    {
      area: "Kamptee Road",
      focus: "Logistics & Transportation",
      highlights: "Transportation hubs, logistics centers, distribution networks"
    }
  ];

  const industries = [
    {
      name: "Logistics & Transportation",
      description: "Supply chain, logistics, transportation, and distribution companies",
      companies: "CONCOR, Transportation companies, Logistics providers, Warehousing"
    },
    {
      name: "Government & Administration",
      description: "Maharashtra government departments and administrative organizations",
      companies: "Maharashtra Government, Administrative offices, Public sector"
    },
    {
      name: "Power & Energy",
      description: "Power generation, electrical equipment, and energy companies",
      companies: "NTPC, Power Grid, Electrical companies, Energy sector"
    },
    {
      name: "Mining & Coal",
      description: "Coal mining, mineral extraction, and natural resource companies",
      companies: "Coal India, Mining companies, Mineral processing units"
    },
    {
      name: "Information Technology",
      description: "Software development, IT services, and technology companies",
      companies: "TCS, Local IT companies, Software development centers"
    },
    {
      name: "Education & Research",
      description: "Universities, colleges, and research institutions",
      companies: "VNIT, RTM Nagpur University, Educational institutions"
    }
  ];

  const testimonials = [
    {
      name: "Suresh Patil",
      position: "Operations Head",
      company: "Logistics Company, MIDC Hingna",
      text: "Their understanding of logistics and supply chain requirements is exceptional. Helped us build efficient operations teams and optimize our distribution network across Central India.",
      rating: 5
    },
    {
      name: "Kavita Sharma",
      position: "Divisional Commissioner",
      company: "Government Office, Civil Lines",
      text: "Outstanding expertise in government operations and administrative efficiency. Their support in modernizing our recruitment processes while maintaining protocols has been invaluable.",
      rating: 5
    },
    {
      name: "Rajesh Deshmukh",
      position: "Plant Manager",
      company: "Power Company, Butibori",
      text: "Excellent understanding of power and energy sector requirements. Their approach to recruiting technical specialists and managing industrial workforce has transformed our operational efficiency.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Do you have experience with logistics and transportation companies?",
      answer: "Yes, we have extensive experience with Nagpur's logistics and transportation sector including supply chain management, distribution networks, warehousing, fleet management, and transportation coordination. We understand the strategic importance of Nagpur's central location."
    },
    {
      question: "Can you help government organizations and administrative departments?",
      answer: "Absolutely! We specialize in government and administrative recruitment including Maharashtra state departments, public sector organizations, policy implementation, administrative efficiency, and public service requirements while maintaining proper protocols."
    },
    {
      question: "What is your experience with power and energy industries?",
      answer: "We have specialized knowledge of power generation, electrical industries, energy sector operations, power plant management, electrical engineering, and technical operations including safety protocols and environmental compliance."
    },
    {
      question: "Do you understand the mining and coal industry requirements?",
      answer: "Yes, we have experience with mining operations, coal industry, mineral extraction, mining safety, environmental compliance, and the technical requirements specific to mining and natural resource industries in Central India."
    },
    {
      question: "How do you handle Maharashtra state labor compliance?",
      answer: "We ensure compliance with Maharashtra state labor laws, industrial regulations, government procedures, and local administrative requirements. We understand state-specific policies and regulatory environments for different sectors."
    },
    {
      question: "Can you support companies leveraging Nagpur's central location advantage?",
      answer: "Yes, we understand Nagpur's strategic advantage as India's geographic center and can help companies optimize their operations, build regional teams, and leverage the location for pan-India business expansion and logistics optimization."
    },
    {
      question: "What is your approach to industrial safety and compliance?",
      answer: "We provide comprehensive industrial safety training, compliance programs, environmental awareness, and ensure adherence to safety standards especially for heavy industries, power plants, and mining operations while maintaining operational efficiency."
    },
    {
      question: "How do you handle the diverse industrial landscape of Nagpur?",
      answer: "We have expertise across Nagpur's diverse industries from traditional government and mining to modern logistics and IT sectors. We understand how to adapt HR practices for different industrial requirements while maintaining consistent quality standards."
    }
  ];

  const mappedFaqs = faqs.map(({ question, answer }) => ({ q: question, a: answer }));
  const mappedTestimonials = testimonials.map(t => ({ name: t.name, title: `${t.position} · ${t.company}`, quote: t.text }));

  const nagpurStats = [
    { number: "85+", label: "Nagpur Companies Served" },
    { number: "20+", label: "Logistics & Transportation" },
    { number: "18+", label: "Government Organizations" },
    { number: "5,500+", label: "Professionals Placed" }
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
        canonical="https://hirewithprachi.com/hr-services-nagpur"
      />

      <ScrollProgressBar />
      <HireWithPrachiTopBar />
      <HireWithPrachiHeader />

      {/* Enhanced Hero Section */}
      <HeroV2
        cityName="Nagpur"
        description="Transform your business with cutting-edge HR solutions. From MIHAN to Civil Lines' corporate hub, we deliver premium HR services that align with Nagpur's dynamic business landscape."
        onSchedule={() => setShowCalendly(true)}
        onDownload={handleBrochureDownload}
        stats={[
          { icon: Users, value: '25+', label: 'Nagpur Companies Served', color: 'from-blue-500 to-cyan-500' },
          { icon: Award, value: '6+', label: 'Startups & SMEs', color: 'from-purple-500 to-pink-500' },
          { icon: Star, value: '4.9/5', label: 'Client Rating', color: 'from-yellow-500 to-orange-500' },
          { icon: Clock, value: '<2hrs', label: 'Response Time', color: 'from-green-500 to-emerald-500' }
        ]}
        bottomStats={nagpurStats}
      />

      {/* Enhanced Premium Content Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-green-50 pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(16,185,129,0.05)_50%,transparent_75%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10 lg:mb-0"
            >
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 mb-4">
                  <Compass className="h-4 w-4 mr-1" />
                  Geographic Center of India
                </span>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">HR Services in Nagpur</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Comprehensive HR solutions for India's geographic center and logistics hub. From transportation companies on Kamptee Road to government offices in Civil Lines, we provide expert recruitment, compliance, and workforce management across strategic and industrial sectors.
                </p>
              </div>

              {/* Nagpur-specific highlights */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 font-medium">Logistics Hub</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 font-medium">Government Center</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 font-medium">Power & Mining</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 font-medium">Central India</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowCalendly(true)}
                  className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Get Logistics & Government Consultation
                </button>
                <button
                  onClick={handleBrochureDownload}
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-emerald-600 hover:text-emerald-600 transition-all duration-300 flex items-center justify-center"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Central India Guide
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-4">Trusted by 85+ companies across Nagpur's logistics, government, and industrial sectors</p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">4.8/5 Central Rating</span>
                  </div>
                  <div className="text-sm text-gray-600">✓ Logistics Expert</div>
                  <div className="text-sm text-gray-600">✓ Government</div>
                </div>
              </div>
            </motion.div>

            {/* Nagpur Strategic Visual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white p-8 rounded-2xl shadow-2xl">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Nagpur Business Areas</h3>
                  <p className="text-gray-600">Complete Strategic & Industrial Coverage</p>
                </div>

                <div className="space-y-3">
                  {nagpurAreas.map((area, index) => (
                    <div key={index} className="p-3 rounded-lg bg-gray-50 border-l-4 border-emerald-500">
                      <div className="font-semibold text-gray-900">{area.area}</div>
                      <div className="text-sm text-emerald-600 font-medium">{area.focus}</div>
                      <div className="text-xs text-gray-500">{area.highlights}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <div className="text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    All Strategic Areas Covered
                  </div>
                  <div className="text-lg font-bold text-emerald-600">5,500+ Professionals</div>
                  <div className="text-sm text-gray-600">Successfully Placed</div>
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
            {nagpurStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-emerald-600 mb-2">
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
        title="What Nagpur Organizations Say"
        subtitle="Success stories from logistics, government and power industries across Nagpur."
        items={mappedTestimonials}
      />

      {/* FAQ Section - Premium */}
      <PremiumFAQ
        items={mappedFaqs}
        region="Nagpur"
        subtitle="Common questions about our HR services for Nagpur's logistics, government and energy ecosystem."
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
              Ready to Elevate HR for Your <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Nagpur Business</span>?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
            >
              Join 25++ Nagpur businesses that trust us for their premium HR needs. We've got you covered with sophisticated solutions.
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
              Book Nagpur Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBrochureDownload}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-sm border border-white/20 text-lg"
            >
              <Download className="w-5 h-5" />
              Nagpur HR Guide
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
          brochureType="hr-services-nagpur"
          title="Nagpur Logistics & Government HR Guide"
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