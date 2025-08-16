import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { Helmet } from 'react-helmet-async';

import { Link } from 'react-router-dom';
import HireWithPrachiTopBar from '../components/hirable/HirableTopBar';
import HireWithPrachiHeader from '../components/hirable/HirableHeader';
import HireWithPrachiFooter from '../components/hirable/HirableFooter';
import GPT4oMiniChatbot from '../components/GPT4oMiniChatbot';
import ScrollProgressBar from '../components/ScrollProgressBar';
import BrochureDownloadModal from '../components/BrochureDownloadModal';
import CalendlyBooking from '../components/CalendlyBooking';
import PremiumFAQ from '../components/sections/PremiumFAQ';
import PremiumTestimonials from '../components/sections/PremiumTestimonials';
import CityInternalLinks from '../components/sections/CityInternalLinks';
import CityLandingPremium from '../components/CityLandingPremium';
import HeroV2 from '../components/city-landing/HeroV2';
import SEOOptimizer from '../components/SEOOptimizer';
import { getCityData } from '../data/cityData';
import { CheckCircle, Users, Shield, Zap, Award, MessageSquare, BarChart2, Search, Phone, Mail, ChevronDown, ChevronUp, Download, Calendar, MessageCircle, FileText, MapPin, Building, Briefcase, TrendingUp, Globe, Star, Clock, ArrowRight, Play, Landmark, Home, User, Heart, Eye, AlertTriangle, CheckSquare, ClipboardList, BookOpen, Settings, Target, Rocket, Cpu, Brain, Sparkles, HeartHandshake, Smile, Presentation, PieChart, Activity, Database, KeyRound, UserPlus, FileSpreadsheet, Lightbulb } from 'lucide-react';

export default function HRServicesMumbai() {
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const handleBrochureDownload = () => {
    setShowBrochureModal(true);
  };

  // Get city data
  const cityData = getCityData('mumbai');

  // SEO Data for Mumbai
  const seoData = {
    title: "HR Services Mumbai - Expert HR Consultant",
    description: "Expert HR services in Mumbai for financial services and entertainment. Complete HR solutions for Mumbai businesses.",
    keywords: "HR services Mumbai, HR consultant Mumbai, recruitment Mumbai, HR compliance Mumbai, BKC HR services, Andheri HR consultant, payroll Mumbai, employee engagement Mumbai, virtual HR Mumbai",
    pageType: "localBusiness",
    pageData: {
      city: "Mumbai",
      latitude: "19.0760",
      longitude: "72.8777",
      title: "HR Services Mumbai - Expert HR Consultant",
      description: "Expert HR services in Mumbai for financial services, entertainment & manufacturing. Complete HR solutions for Mumbai businesses.",
      image: "https://hirewithprachi.com/assets/images/hr-services-mumbai-1200x630.jpg"
    }
  };

  const mumbaiAdvantages = [
    {
      icon: <Building className="h-6 w-6" />,
      title: "Financial Capital Expertise",
      description: "Deep understanding of Mumbai's finance and banking sector HR requirements"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Entertainment Industry Knowledge",
      description: "Specialized HR solutions for Mumbai's thriving entertainment and media industry"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Startup Ecosystem Support",
      description: "Tailored HR services for Mumbai's growing startup and tech ecosystem"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Maharashtra Compliance",
      description: "Expert knowledge of Maharashtra-specific labor laws and regulations"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Quick Response Time",
      description: "Local presence ensures rapid response to Mumbai business needs"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Local Talent Network",
      description: "Extensive network of quality candidates in Mumbai job market"
    }
  ];

  const services = [
    {
      title: "HR Compliance for Mumbai Businesses",
      description: "Stay compliant with Maharashtra labor laws and Mumbai-specific regulations",
      features: [
        "Mumbai Shops & Establishments Act compliance",
        "Maharashtra labor law adherence", 
        "Local municipal corporation requirements",
        "Industry-specific compliance (Finance, Entertainment, IT)",
        "Regular compliance audits and updates"
      ],
      link: "/services/hr-compliance"
    },
    {
      title: "Recruitment Services in Mumbai",
      description: "Tap into Mumbai's diverse talent pool for your hiring needs",
      features: [
        "Local candidate sourcing in Mumbai",
        "Industry-specific recruitment (BFSI, Entertainment, IT)",
        "Campus recruitment from Mumbai colleges",
        "Executive search for senior positions",
        "Quick turnaround for urgent requirements"
      ],
      link: "/services/recruitment-hiring"
    },
    {
      title: "Payroll Management Mumbai",
      description: "Accurate payroll processing with Mumbai-specific considerations",
      features: [
        "Mumbai cost of living adjustments",
        "Local transport allowance calculations",
        "Maharashtra state-specific deductions",
        "Multi-location payroll for Mumbai offices",
        "Statutory compliance with Mumbai requirements"
      ],
      link: "/services/payroll-management"
    },
    {
      title: "Virtual HR Services Mumbai",
      description: "Cost-effective HR solutions for Mumbai startups and SMEs",
      features: [
        "Remote HR support with local understanding",
        "Mumbai business culture alignment",
        "Cost-effective solutions for high Mumbai overhead",
        "Scalable services for growing Mumbai businesses",
        "24/7 support across time zones"
      ],
      link: "/services/virtual-hr-services"
    }
  ];

  const industries = [
    {
      name: "Banking & Financial Services",
      description: "Specialized HR services for Mumbai's BFSI sector",
      companies: "HDFC, ICICI, SBI, Axis Bank, Kotak Mahindra"
    },
    {
      name: "Entertainment & Media",
      description: "HR solutions for Bollywood and media companies",
      companies: "Film studios, Production houses, TV channels, Digital platforms"
    },
    {
      name: "Information Technology",
      description: "Tech startup and IT company HR management",
      companies: "TCS, Infosys, Wipro, Tech startups, Software companies"
    },
    {
      name: "Pharmaceuticals",
      description: "HR compliance for pharma and healthcare sector",
      companies: "Cipla, Dr. Reddy's, Lupin, Healthcare startups"
    },
    {
      name: "Textiles & Manufacturing",
      description: "Industrial HR solutions for manufacturing sector",
      companies: "Garment exporters, Gem cutting, Manufacturing units"
    },
    {
      name: "Real Estate & Construction",
      description: "HR services for Mumbai's booming real estate sector",
      companies: "Property developers, Construction companies, Real estate firms"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Sharma",
      position: "HR Director",
      company: "FinTech Solutions, BKC Mumbai",
      text: "Their understanding of Mumbai's financial sector requirements is exceptional. Helped us scale from 50 to 200 employees seamlessly.",
      rating: 5
    },
    {
      name: "Priya Mehta", 
      position: "Founder",
      company: "Creative Media House, Andheri",
      text: "Perfect for our entertainment industry needs. They understand the unique challenges of Mumbai's media sector.",
      rating: 5
    },
    {
      name: "Vikram Patel",
      position: "CEO",
      company: "TechStart Mumbai, Lower Parel",
      text: "Cost-effective HR solutions that allowed us to focus on growth. Their Mumbai market knowledge is invaluable.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Do you have a physical office in Mumbai?",
      answer: "While we operate virtually to keep costs low, we have local representatives in Mumbai who can visit your office for important meetings and onboarding. We also have partnerships with local co-working spaces for in-person consultations when needed."
    },
    {
      question: "How well do you understand Mumbai's business environment?",
      answer: "We have extensive experience working with Mumbai businesses across various sectors including BFSI, entertainment, IT, and manufacturing. Our team understands local business culture, labor market dynamics, and industry-specific requirements unique to Mumbai."
    },
    {
      question: "Can you handle compliance for Mumbai-specific regulations?",
      answer: "Yes, we specialize in Mumbai and Maharashtra-specific compliance including Shops & Establishments Act, local municipal requirements, state labor laws, and industry-specific regulations for finance, entertainment, and other key Mumbai sectors."
    },
    {
      question: "What industries do you serve in Mumbai?",
      answer: "We serve all major Mumbai industries including Banking & Financial Services (BKC area), Entertainment & Media (Film City, Andheri), Information Technology (Lower Parel, BKC), Pharmaceuticals, Textiles & Manufacturing, and Real Estate & Construction."
    },
    {
      question: "How do you handle recruitment in Mumbai's competitive market?",
      answer: "We leverage our extensive Mumbai talent network, maintain relationships with local colleges and institutions, understand salary benchmarks for different Mumbai areas, and have specialized recruitment strategies for high-demand sectors like finance and tech."
    },
    {
      question: "What are your response times for Mumbai clients?",
      answer: "We provide same-day response for urgent queries and 24-48 hours for detailed requests. Our local Mumbai representatives can schedule in-person meetings within 2-3 business days when required."
    },
    {
      question: "Do you understand Mumbai's cost of living for salary structuring?",
      answer: "Absolutely. We factor in Mumbai's high cost of living, housing costs, transportation expenses, and area-specific variations (South Mumbai vs. Suburbs) when designing compensation packages and salary structures for our Mumbai clients."
    },
    {
      question: "Can you help with multiple Mumbai office locations?",
      answer: "Yes, we can manage HR for businesses with multiple Mumbai locations (Andheri, BKC, Lower Parel, Navi Mumbai, etc.) with unified policies while addressing location-specific requirements and compliance needs."
    }
  ];

  const mappedFaqs = faqs.map(({ question, answer }) => ({ q: question, a: answer }));
  const mappedTestimonials = testimonials.map(t => ({ name: t.name, title: `${t.position} · ${t.company}`, quote: t.text }));

  const mumbaiStats = [
    { number: "100+", label: "Mumbai Clients Served" },
    { number: "15+", label: "Industries Covered" },
    { number: "5000+", label: "Employees Managed" },
    { number: "99.8%", label: "Compliance Record" }
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
        canonical="https://hirewithprachi.com/hr-services-mumbai"
      />

      <ScrollProgressBar />
      <HireWithPrachiTopBar />
      <HireWithPrachiHeader />

      {/* Enhanced Hero Section */}
      <HeroV2
        cityName="Mumbai"
        description="Elevate your business with sophisticated HR solutions. From BKC's financial district to Andheri's creative hub, we deliver premium HR services that align with Mumbai's dynamic business landscape."
        onSchedule={() => setShowCalendly(true)}
        onDownload={handleBrochureDownload}
        stats={[
          { icon: Users, value: '250+', label: 'Mumbai Companies Served', color: 'from-blue-500 to-cyan-500' },
          { icon: Award, value: '80+', label: 'Startups & SMEs', color: 'from-purple-500 to-pink-500' },
          { icon: Star, value: '4.9/5', label: 'Client Rating', color: 'from-yellow-500 to-orange-500' },
          { icon: Clock, value: '<2hrs', label: 'Response Time', color: 'from-green-500 to-emerald-500' }
        ]}
        bottomStats={mumbaiStats}
      />

      {/* Enhanced Premium Content Section */}
      <CityLandingPremium
        cityName="Mumbai"
        advantages={mumbaiAdvantages}
        services={services}
        industries={industries}
        stats={mumbaiStats}
        onSchedule={() => setShowCalendly(true)}
        onDownload={handleBrochureDownload}
      />

      {/* Premium Testimonials Section */}
      <PremiumTestimonials
        title="What Mumbai Clients Say"
        subtitle="Success stories from businesses across Mumbai's diverse industry landscape."
        items={mappedTestimonials}
      />

      {/* Premium FAQ Section */}
      <PremiumFAQ
        items={mappedFaqs}
        region="Mumbai"
        subtitle="Common questions about our premium HR services specifically for Mumbai businesses."
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
              Ready to Elevate HR for Your <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Mumbai Business</span>?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
            >
              Join 250+ Mumbai businesses that trust us for their premium HR needs. From BKC to Andheri, we've got you covered with sophisticated solutions.
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
              Book Mumbai Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBrochureDownload}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-sm border border-white/20 text-lg"
            >
              <Download className="w-5 h-5" />
              Mumbai HR Guide
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
          brochureType="hr-services-mumbai"
          title="Mumbai HR Services Guide"
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