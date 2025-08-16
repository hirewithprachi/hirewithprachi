import { motion } from 'framer-motion';
import React, { useState } from 'react';

import CallToActionSection from '../components/sections/CallToActionSection';
import CTASection from '../components/sections/CallToActionSection';

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
import SEOOptimizer from '../components/SEOOptimizer';
import { Activity, AlertTriangle, ArrowRight, Award, BarChart2, BookOpen, Brain, Briefcase, Building, Calendar, CheckCircle, CheckSquare, ChevronDown, ChevronUp, ClipboardList, Clock, Cpu, Database, Download, Eye, Factory, FileSpreadsheet, FileText, Globe, Heart, HeartHandshake, Home, KeyRound, Landmark, Lightbulb, Mail, MapPin, MessageCircle, MessageSquare, Phone, PieChart, Play, Presentation, Rocket, Scale, Search, Settings, Shield, Smile, Sparkles, Star, Target, TrendingUp, User, UserPlus, Users, Zap } from 'lucide-react';

export default function HRServicesDelhi() {
  // SEO Data for Delhi
  const seoData = {
    title: "HR Services Delhi - Expert HR Consultant | Hire With Prachi",
    description: "Expert HR services in Delhi for startups and SMEs. Complete HR solutions for Delhi businesses. Free consultation available.",
    keywords: "HR services Delhi, HR consultant Delhi, recruitment Delhi, HR compliance Delhi",
    pageType: "localBusiness",
    pageData: {
      city: "Delhi",
      latitude: "28.7041",
      longitude: "77.1025",
      title: "HR Services Delhi - Expert HR Consultant",
      description: "Expert HR services in Delhi for startups and SMEs",
      image: "https://hirewithprachi.com/assets/images/hr-services-delhi-1200x630.jpg"
    }
  };

  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const handleBrochureDownload = () => {
    setShowBrochureModal(true);
  };

  // Get city data
  const cityData = getCityData('delhi');

  // Delhi-specific advantages
  const delhiAdvantages = [
    {
      icon: <Landmark className="h-6 w-6" />,
      title: "Government Sector Expertise",
      description: "Deep understanding of government and PSU HR requirements in Delhi"
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: "Corporate Headquarters Knowledge",
      description: "Specialized HR solutions for Delhi's corporate headquarters"
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Startup Ecosystem Support",
      description: "Tailored HR services for Gurgaon and Noida's startup ecosystem"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "NCR Compliance",
      description: "Expert knowledge of Delhi, Haryana, and UP labor laws"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Quick Response Time",
      description: "Local presence ensures rapid response to NCR business needs"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "NCR Talent Network",
      description: "Extensive network of quality candidates across Delhi NCR"
    }
  ];

  // Delhi-specific services
  const services = [
    {
      title: "HR Compliance for Delhi NCR Businesses",
      description: "Stay compliant with Delhi, Haryana, and UP labor laws",
      features: [
        "Delhi Shops & Establishments Act compliance",
        "Haryana and UP labor law adherence", 
        "NCR-specific regulatory requirements",
        "Government sector compliance",
        "Regular compliance audits and updates"
      ],
      link: "/services/hr-compliance"
    },
    {
      title: "Recruitment Services in Delhi NCR",
      description: "Tap into Delhi NCR's diverse talent pool for your hiring needs",
      features: [
        "Local candidate sourcing across Delhi NCR",
        "Government and corporate sector recruitment",
        "Campus recruitment from Delhi NCR colleges",
        "Executive search for senior positions",
        "Quick turnaround for urgent requirements"
      ],
      link: "/services/recruitment-hiring"
    },
    {
      title: "Payroll Management Delhi NCR",
      description: "Accurate payroll processing with NCR-specific considerations",
      features: [
        "NCR cost of living adjustments",
        "Local transport allowance calculations",
        "Multi-state tax compliance",
        "Multi-location payroll for NCR offices",
        "Statutory compliance with NCR requirements"
      ],
      link: "/services/payroll-management"
    },
    {
      title: "Virtual HR Services Delhi NCR",
      description: "Cost-effective HR solutions for Delhi NCR startups and SMEs",
      features: [
        "Remote HR support with local understanding",
        "NCR business culture alignment",
        "Cost-effective solutions for NCR businesses",
        "Scalable services for growing NCR companies",
        "24/7 support across time zones"
      ],
      link: "/services/virtual-hr-services"
    }
  ];

  // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "HR Services Delhi NCR - Hire With Prachi",
    "description": "Professional HR services in Delhi NCR for government, corporate and startup sectors. Expert HR compliance, recruitment, payroll, and employee engagement solutions in Delhi, Gurgaon, Noida.",
    "provider": {
      "@type": "Organization",
      "name": "Hire With Prachi",
      "founder": {
        "@type": "Person",
        "name": "Prachi Shrivastava",
        "jobTitle": "HR Consultant"
      },
      "url": "https://prachi-hr.com",
      "telephone": "+91-8740889927",
      "email": "info@hirewithprachi.com"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Delhi",
        "addressRegion": "Delhi",
        "addressCountry": "India"
      },
      {
        "@type": "City", 
        "name": "Gurgaon",
        "addressRegion": "Haryana",
        "addressCountry": "India"
      },
      {
        "@type": "City",
        "name": "Noida", 
        "addressRegion": "Uttar Pradesh",
        "addressCountry": "India"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 28.6139,
        "longitude": 77.2090
      },
      "geoRadius": "100"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "HR Services Delhi NCR",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Government Sector HR Delhi",
            "description": "Specialized HR services for government and PSU organizations in Delhi"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Corporate HR Services Delhi",
            "description": "Professional HR solutions for corporate headquarters in Delhi"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Startup HR Gurgaon Noida",
            "description": "Startup-focused HR services in Gurgaon and Noida"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "120"
    }
  };

  const industries = [
    {
      name: "Consulting & Professional Services",
      description: "Management consulting and professional service firms",
      companies: "McKinsey, BCG, Deloitte, PwC, EY, KPMG, Law firms"
    }
  ];

  const ncrAreas = [
    {
      area: "Central Delhi",
      focus: "Government & Corporate HQs",
      highlights: "Connaught Place, India Gate area, Government offices"
    },
    {
      area: "Gurgaon (Gurugram)",
      focus: "Corporate & Startups",
      highlights: "Cyber City, DLF, Udyog Vihar, Golf Course Road"
    },
    {
      area: "Noida",
      focus: "IT & Manufacturing",
      highlights: "Sector 62, Film City, IT parks, Industrial areas"
    },
    {
      area: "South Delhi",
      focus: "Corporate Offices",
      highlights: "Nehru Place, Lajpat Nagar, Corporate centers"
    },
    {
      area: "East Delhi",
      focus: "Manufacturing & Trade",
      highlights: "Industrial areas, trading centers"
    },
    {
      area: "Faridabad",
      focus: "Manufacturing Hub",
      highlights: "Industrial complex, manufacturing units"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      position: "Deputy Director HR",
      company: "BHEL, Delhi",
      text: "Their understanding of PSU requirements and government procedures is exceptional. Helped streamline our recruitment and performance management processes.",
      rating: 5
    },
    {
      name: "Anita Sharma",
      position: "CHRO",
      company: "Fortune 500 Company, Gurgaon",
      text: "Professional service with deep understanding of corporate governance. Their support during our organizational restructuring was invaluable.",
      rating: 5
    },
    {
      name: "Vikash Agarwal",
      position: "Co-founder",
      company: "TechStartup, Noida",
      text: "Perfect partner for our scaling journey. They understand the unique challenges of growing tech companies in NCR.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Do you have experience with government and PSU organizations?",
      answer: "Yes, we have extensive experience working with PSUs, government departments, and regulatory bodies in Delhi. We understand the unique requirements of public sector organizations including recruitment processes, performance management, and compliance with government regulations and audit requirements."
    },
    {
      question: "Can you handle HR for companies across Delhi NCR?",
      answer: "Absolutely! We provide comprehensive HR services across the entire Delhi NCR region including Delhi, Gurgaon, Noida, Faridabad, and surrounding areas. Our team understands the different state regulations (Delhi, Haryana, UP) and can manage multi-location operations seamlessly."
    },
    {
      question: "What industries do you specialize in within Delhi NCR?",
      answer: "We serve all major Delhi NCR industries including Government & PSU, Banking & Financial Services, IT & Technology, Automotive & Manufacturing, Telecommunications, and Consulting & Professional Services. Our team has sector-specific expertise for each industry."
    },
    {
      question: "How do you support startup companies in Gurgaon and Noida?",
      answer: "We provide startup-friendly HR solutions including rapid scaling support, cost-effective recruitment, agile policy development, ESOP management assistance, and compliance guidance. Our services are designed to support the fast-paced growth typical of Delhi NCR startups."
    },
    {
      question: "What is your approach to corporate headquarters in Delhi?",
      answer: "For corporate headquarters, we provide strategic HR consulting, executive recruitment, global policy implementation, corporate governance support, and senior management performance systems. We understand the complexity of managing headquarters operations and multiple subsidiary relationships."
    },
    {
      question: "How do you handle different state compliances across NCR?",
      answer: "Delhi NCR spans multiple states (Delhi, Haryana, UP), each with different labor laws. We have expertise in all three jurisdictions and ensure compliance with state-specific regulations including Delhi Shops & Establishments Act, Haryana labor laws, and UP state requirements."
    },
    {
      question: "Do you understand the government procurement and tender processes?",
      answer: "Yes, we have experience with government procurement processes, tender participation requirements, and the specific documentation needs for working with government organizations. This includes understanding of GEM portal, tender compliance, and government project requirements."
    },
    {
      question: "What are your response times for Delhi NCR clients?",
      answer: "We provide same-day response for urgent queries within Delhi NCR. For complex requirements, our detailed response time is 24-48 hours. We can schedule in-person meetings across Delhi, Gurgaon, and Noida within 2-3 business days as needed."
    }
  ];

  const mappedFaqs = faqs.map(({ question, answer }) => ({ q: question, a: answer }));
  const mappedTestimonials = testimonials.map(t => ({ name: t.name, title: `${t.position} · ${t.company}`, quote: t.text }));

  const delhiStats = [
    { number: "120+", label: "Delhi NCR Clients" },
    { number: "25+", label: "PSU Organizations" },
    { number: "8000+", label: "Employees Managed" },
    { number: "99.9%", label: "Compliance Record" }
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
        canonical="https://hirewithprachi.com/hr-services-delhi"
      />

      <ScrollProgressBar />
      <HireWithPrachiTopBar />
      <HireWithPrachiHeader />

      {/* Enhanced Hero Section */}
      <HeroV2
        cityName="Delhi"
        description="Transform your business with cutting-edge HR solutions. From Connaught Place to Gurgaon's corporate hub, we deliver premium HR services that align with Delhi NCR's dynamic business landscape."
        onSchedule={() => setShowCalendly(true)}
        onDownload={handleBrochureDownload}
        stats={[
          { icon: Users, value: '200+', label: 'Delhi Companies Served', color: 'from-blue-500 to-cyan-500' },
          { icon: Award, value: '70+', label: 'Startups & SMEs', color: 'from-purple-500 to-pink-500' },
          { icon: Star, value: '4.9/5', label: 'Client Rating', color: 'from-yellow-500 to-orange-500' },
          { icon: Clock, value: '<2hrs', label: 'Response Time', color: 'from-green-500 to-emerald-500' }
        ]}
        bottomStats={delhiStats}
      />

      {/* Enhanced Premium Content Section */}
      <CityLandingPremium
        cityName={cityData.name}
        description={cityData.description}
        stats={cityData.stats}
        advantages={delhiAdvantages}
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
      {/* Premium AI-Era Delhi Advantages Section */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-8">
  Delhi NCR Expertise
            
</div>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
              Why Delhi NCR Organizations Choose Our <span className="gradient-text-ai">Premium AI Solutions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Deep expertise across government, corporate, and startup sectors with comprehensive understanding 
              of NCR's diverse business landscape enhanced by intelligent automation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {delhiAdvantages.map((feature, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
        {feature.icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
    </motion.div>
  ))}
</div>
        </div>
      </section>

      {/* Premium AI-Era Services for Delhi Section */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-8">
  Delhi NCR Solutions
            
</div>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
              Specialized <span className="gradient-text-ai">AI-Powered HR Services</span> for Delhi NCR
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Tailored HR solutions for the unique requirements of government, corporate, and startup sectors 
              across Delhi NCR with intelligent automation and expert insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {services.map((service, index) => (
              <motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: index * 0.1 }}
  whileHover={{ y: -10, scale: 1.02 }}
  className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full"
>
  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-4 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={service.link}
                  className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors duration-300 group"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
</motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Section - Premium Slider */}
      <PremiumTestimonials
        title="What Delhi NCR Clients Say"
        subtitle="Success stories from government, corporate, and startup organizations across the capital region."
        items={mappedTestimonials}
      />

      {/* FAQ Section - Premium */}
      <PremiumFAQ
        items={mappedFaqs}
        region="Delhi NCR"
        subtitle="Common questions about our HR services specifically for Delhi NCR organizations."
      />

      {/* Internal links to other city pages */}
      <CityInternalLinks />

      {/* Premium AI-Era CTA Section */}
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
              Ready to Elevate HR for Your <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Delhi Business</span>?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
            >
              Join 200++ Delhi businesses that trust us for their premium HR needs. We've got you covered with sophisticated solutions.
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
              Book Delhi Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBrochureDownload}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-sm border border-white/20 text-lg"
            >
              <Download className="w-5 h-5" />
              Delhi HR Guide
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
          brochureType="hr-services-delhi"
          title="Delhi NCR HR Services Guide"
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