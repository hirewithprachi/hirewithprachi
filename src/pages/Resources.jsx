import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Download, 
  BookOpen, 
  Calculator, 
  TrendingUp, 
  Shield, 
  Users, 
  FileText, 
  ArrowRight, 
  Sparkles, 
  Star, 
  Clock, 
  Filter,
  Grid,
  List,
  Play,
  ExternalLink,
  ChevronRight,
  Bookmark,
  Share2,
  Eye,
  Zap,
  Target,
  BarChart3,
  CheckCircle,
  Award,
  Globe,
  Smartphone,
  Monitor,
  Briefcase,
  UserCheck,
  FileCheck,
  Calendar,
  DollarSign,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import HireWithPrachiTopBar from '@/components/hirable/HirableTopBar';
import HireWithPrachiHeader from '@/components/hirable/HirableHeader';
import HireWithPrachiFooter from '@/components/hirable/HirableFooter';
import FreeTools from '@/components/FreeTools';
import ResourceLibrary from '@/components/ResourceLibrary';
import CallToActionSection from '@/components/sections/CallToActionSection';
import FAQSection from '@/components/sections/FAQSection';
import { resourcesPageFaqs } from '@/data/faqData';
import BlogSection from '@/components/BlogSection';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function Resources() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tools');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [templateSearch, setTemplateSearch] = useState('');
  const [selectedTemplateCategory, setSelectedTemplateCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Analytics tracking function
  const trackEvent = (name, params) => {
    if (window.gtag) {
      window.gtag('event', name, params);
    }
    console.log('Analytics Event:', name, params);
  };

  // SEO Schema Markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "HR Resources & Tools - Free HR Templates, Calculators & Guides",
    "description": "Access 500+ professional HR resources including free templates, calculators, compliance checklists, and expert guides. Download employee handbooks, job descriptions, performance reviews, and more.",
    "url": "https://hirewithprachi.com/resources",
    "mainEntity": {
      "@type": "ItemList",
      "name": "HR Resources Collection",
      "description": "Comprehensive collection of HR tools, templates, and resources",
      "numberOfItems": 500,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "SoftwareApplication",
            "name": "HR Compliance Checklist 2024",
            "description": "Comprehensive compliance checklist covering all major HR regulations",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "SoftwareApplication",
            "name": "Employee Engagement Survey Template",
            "description": "Ready-to-use survey templates to measure and improve employee engagement",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "SoftwareApplication",
            "name": "Salary Benchmarking Calculator",
            "description": "Advanced calculator to benchmark salaries across industries and locations",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          }
        }
      ]
    },
    "author": {
      "@type": "Person",
      "name": "Prachi Shrivastava",
      "jobTitle": "Virtual HR Consultant",
      "url": "https://hirewithprachi.com/about"
    }
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What HR resources are available for free download?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer 500+ free HR resources including employee handbooks, job description templates, performance review forms, compliance checklists, salary benchmarking tools, and employee engagement surveys."
        }
      },
      {
        "@type": "Question",
        "name": "How can I download HR templates and forms?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply browse our resource library, select the template you need, and click the download button. All templates are available in PDF, DOCX, or XLSX formats and are completely free."
        }
      },
      {
        "@type": "Question",
        "name": "Are these HR resources compliant with Indian labor laws?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all our HR resources are designed to comply with Indian labor laws and regulations. They are regularly updated to reflect the latest legal requirements and best practices."
        }
      },
      {
        "@type": "Question",
        "name": "Can I request custom HR templates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! If you can't find the template you need, we can create custom templates tailored to your specific requirements and industry standards."
        }
      },
      {
        "@type": "Question",
        "name": "What types of HR calculators are available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer various HR calculators including cost savings calculator, ROI calculator, compliance risk checker, salary benchmarking tool, and employee engagement calculator."
        }
      }
    ]
  };

  const featuredResources = [
    {
      id: 1,
      title: "HR Compliance Checklist 2024",
      description: "Comprehensive compliance checklist covering all major HR regulations and statutory requirements for Indian businesses",
      category: "Compliance",
      type: "PDF",
      downloads: 1247,
      rating: 4.9,
      icon: Shield,
      color: "from-red-500 to-pink-500",
      link: "/resource-downloads/hr-compliance-checklist-2024"
    },
    {
      id: 2,
      title: "Employee Engagement Survey Template",
      description: "Ready-to-use survey templates to measure and improve employee engagement with proven questions and scoring methods",
      category: "Engagement",
      type: "Template",
      downloads: 892,
      rating: 4.8,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      link: "/resource-downloads/employee-engagement-survey-template"
    },
    {
      id: 3,
      title: "Salary Benchmarking Calculator",
      description: "Advanced calculator to benchmark salaries across industries, locations, and experience levels in India",
      category: "Compensation",
      type: "Tool",
      downloads: 1567,
      rating: 4.9,
      icon: Calculator,
      color: "from-green-500 to-emerald-500",
      link: "/salary-benchmarking-tool"
    }
  ];

  const quickActions = [
    { 
      title: "HR Cost Calculator", 
      icon: Calculator, 
      color: "from-purple-500 to-pink-500", 
      description: "Calculate HR cost savings and ROI",
      link: "/hr-cost-savings-calculator"
    },
    { 
      title: "Compliance Checker", 
      icon: Shield, 
      color: "from-blue-500 to-cyan-500", 
      description: "Assess your compliance risk level",
      link: "/compliance-risk-checker"
    },
    { 
      title: "Salary Benchmarking", 
      icon: TrendingUp, 
      color: "from-green-500 to-emerald-500", 
      description: "Benchmark salaries across industries",
      link: "/salary-benchmarking-tool"
    },
    { 
      title: "Employee Engagement", 
      icon: Users, 
      color: "from-orange-500 to-red-500", 
      description: "Measure team engagement levels",
      link: "/employee-engagement-calculator"
    }
  ];

  const templateCategories = [
    { id: 'all', label: 'All Templates', count: 150 },
    { id: 'recruitment', label: 'Recruitment', count: 25 },
    { id: 'onboarding', label: 'Onboarding', count: 20 },
    { id: 'performance', label: 'Performance', count: 30 },
    { id: 'compliance', label: 'Compliance', count: 35 },
    { id: 'compensation', label: 'Compensation', count: 20 },
    { id: 'engagement', label: 'Engagement', count: 20 }
  ];

  const templates = [
    {
      id: 1,
      title: "Employee Handbook Template 2024",
      description: "Comprehensive employee handbook template covering all essential policies and procedures for Indian businesses",
      category: "compliance",
      type: "Handbook",
      downloads: 2341,
      rating: 4.9,
      size: "45 pages",
      format: "PDF/DOCX"
    },
    {
      id: 2,
      title: "Job Description Template - Professional",
      description: "Detailed job description template with key responsibilities, requirements, and performance indicators",
      category: "recruitment",
      type: "Template",
      downloads: 1892,
      rating: 4.8,
      size: "3 pages",
      format: "DOCX"
    },
    {
      id: 3,
      title: "Performance Review Form - 360 Degree",
      description: "Comprehensive 360-degree performance review form with self-assessment and peer feedback sections",
      category: "performance",
      type: "Form",
      downloads: 1567,
      rating: 4.9,
      size: "8 pages",
      format: "PDF/XLSX"
    },
    {
      id: 4,
      title: "Leave Application Form - Professional",
      description: "Professional leave application form with approval workflow and tracking system",
      category: "compliance",
      type: "Form",
      downloads: 1234,
      rating: 4.7,
      size: "2 pages",
      format: "PDF/DOCX"
    },
    {
      id: 5,
      title: "Salary Structure Template - Comprehensive",
      description: "Complete salary structure template with pay grades, benefits, and compensation philosophy",
      category: "compensation",
      type: "Template",
      downloads: 987,
      rating: 4.8,
      size: "12 pages",
      format: "XLSX/DOCX"
    },
    {
      id: 6,
      title: "Employment Contract Template - India",
      description: "Legally compliant employment contract template for Indian businesses with all statutory requirements",
      category: "compliance",
      type: "Contract",
      downloads: 1456,
      rating: 4.9,
      size: "15 pages",
      format: "DOCX"
    }
  ];

  // Enhanced download handler with better error handling
  const handleDownload = async (resource, type = 'resource') => {
    try {
      setIsLoading(true);
      setDownloadStatus(prev => ({ ...prev, [resource.id]: 'downloading' }));

      // Track download event
      trackEvent('resource_download', {
        resource_name: resource.title,
        resource_type: type,
        resource_category: resource.category
      });

      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update download status
      setDownloadStatus(prev => ({ ...prev, [resource.id]: 'success' }));
      setShowSuccessMessage(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
        setDownloadStatus(prev => ({ ...prev, [resource.id]: null }));
      }, 3000);

      // Navigate to download page or trigger actual download
      if (resource.link) {
        navigate(resource.link);
      }

    } catch (error) {
      console.error('Download error:', error);
      setDownloadStatus(prev => ({ ...prev, [resource.id]: 'error' }));
      
      // Reset error status after 3 seconds
      setTimeout(() => {
        setDownloadStatus(prev => ({ ...prev, [resource.id]: null }));
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle quick action navigation
  const handleQuickAction = (action) => {
    // Track quick action clicks
    trackEvent('quick_action_click', {
      action_name: action.title,
      action_link: action.link
    });
    navigate(action.link);
  };

  // Track search queries
  const handleSearch = (query) => {
    if (query.trim()) {
      trackEvent('search_query', {
        search_term: query,
        page: 'resources'
      });
    }
  };

  // Track category filter changes
  const handleCategoryChange = (category) => {
    trackEvent('category_filter', {
      category: category,
      page: 'resources'
    });
  };

  // Filter templates based on search and category
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(templateSearch.toLowerCase()) ||
                         template.description.toLowerCase().includes(templateSearch.toLowerCase());
    const matchesCategory = selectedTemplateCategory === 'all' || template.category === selectedTemplateCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>HR Resources & Tools - Free HR Templates, Calculators & Guides | Virtual HR Consultant</title>
        <meta name="description" content="Access 500+ professional HR resources including free templates, calculators, compliance checklists, and expert guides. Download employee handbooks, job descriptions, performance reviews, and more. Expert HR consulting services in India." />
        <meta name="keywords" content="HR resources, HR templates, free HR tools, employee handbook template, job description template, performance review form, HR compliance checklist, salary benchmarking, employee engagement survey, HR calculator, virtual HR consultant, HR services India" />
        <meta name="author" content="Prachi Shrivastava - Virtual HR Consultant" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Open Graph */}
        <meta property="og:title" content="HR Resources & Tools - Free HR Templates, Calculators & Guides" />
        <meta property="og:description" content="Access 500+ professional HR resources including free templates, calculators, compliance checklists, and expert guides. Download employee handbooks, job descriptions, performance reviews, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://virtualhrconsultant.com/resources" />
        <meta property="og:image" content="https://virtualhrconsultant.com/og-resources.jpg" />
        <meta property="og:site_name" content="Virtual HR Consultant" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HR Resources & Tools - Free HR Templates & Calculators" />
        <meta name="twitter:description" content="Access 500+ professional HR resources including free templates, calculators, compliance checklists, and expert guides." />
        <meta name="twitter:image" content="https://virtualhrconsultant.com/twitter-resources.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://virtualhrconsultant.com/resources" />
        
        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        
        {/* Additional SEO */}
        <meta name="language" content="English" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
      </Helmet>

      <HireWithPrachiTopBar />
      <HireWithPrachiHeader />
      

      
      {/* Success Message Toast */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3"
          >
            <CheckCircle2 className="h-5 w-5" />
            <span>Download started successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Premium Resources Hero Section - Ultra Classy 2025 Design */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 overflow-hidden">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Gradient Mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/95 to-blue-900/90"></div>
          
          {/* Floating Orbs with Enhanced Animation */}
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          
          {/* Geometric Patterns */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white/30 rounded-full"></div>
            <div className="absolute top-40 right-32 w-24 h-24 border-2 border-white/30 rotate-45"></div>
            <div className="absolute bottom-32 left-1/3 w-40 h-40 border-2 border-white/30 rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-28 h-28 border-2 border-white/30 rotate-12"></div>
          </div>
        </div>
        
        {/* Enhanced Floating Particles */}
        <div className="absolute top-20 left-1/3 w-2 h-2 bg-purple-400/60 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-1/4 w-1 h-1 bg-pink-400/80 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-2/3 w-1.5 h-1.5 bg-blue-400/70 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-indigo-400/70 rounded-full animate-bounce" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-bounce" style={{animationDelay: '4s'}}></div>
        
        {/* Enhanced Grid Pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          {/* Breadcrumbs integrated into hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Breadcrumbs variant="dark" />
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Side - Enhanced Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              {/* Premium Badge */}
              <motion.div
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-bold uppercase tracking-widest">2025 HR Excellence Hub</span>
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </motion.div>
              
              {/* Enhanced Main Headline */}
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Your Complete{' '}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  HR Resource
                </span>{' '}
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Universe
                </span>
              </motion.h1>
              
              {/* Enhanced Subheadline */}
              <motion.p 
                className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 leading-relaxed font-medium"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Access cutting-edge tools, templates, and insights to transform your HR operations. 
                Drive organizational success with AI-powered solutions and expert-curated resources.
              </motion.p>

              {/* Premium CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap gap-4 mb-12"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  <span className="relative z-10">Explore Resources</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span>Get Free Templates</span>
                  <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </motion.button>
              </motion.div>

              {/* Enhanced Premium Stats */}
              <motion.div 
                className="grid grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">500+</div>
                  <div className="text-sm text-gray-300 font-medium">Premium Resources</div>
                </div>
                <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">50+</div>
                  <div className="text-sm text-gray-300 font-medium">AI-Powered Tools</div>
                </div>
                <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">100+</div>
                  <div className="text-sm text-gray-300 font-medium">Expert Templates</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                {/* Main Image */}
                <motion.img
                  src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="HR Resources Hub"
                  className="w-full h-96 md:h-[500px] object-cover rounded-3xl shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute top-6 right-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg backdrop-blur-sm"
                >
                  <span className="font-bold text-lg">Free Access</span>
                </motion.div>
                
                {/* Floating Stats Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/20"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">10K+</div>
                    <div className="text-sm text-white/80">Downloads</div>
                  </div>
                </motion.div>
              </div>
              
              {/* Trust Indicators */}
              <motion.div 
                className="mt-8 flex flex-wrap gap-6 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                {[
                  { icon: "🏆", text: "Premium Quality" },
                  { icon: "⚡", text: "Instant Access" },
                  { icon: "🔒", text: "100% Secure" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-white text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Quick Stats Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-purple-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { label: "Resources", value: "500+", icon: FileText },
              { label: "Downloads", value: "50K+", icon: Download },
              { label: "Users", value: "10K+", icon: Users },
              { label: "Rating", value: "4.9★", icon: Star }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center"
              >
                <stat.icon className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs - Enhanced for Mobile */}
      <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 gap-4">
            <div className="flex space-x-1 bg-gray-100 rounded-2xl p-1 overflow-x-auto">
              {[
                { id: 'tools', label: 'Tools & Calculators', icon: Calculator },
                { id: 'resources', label: 'Resource Library', icon: BookOpen },
                { id: 'templates', label: 'Templates', icon: FileText }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 sm:px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-white text-purple-600 shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quick Access Tools
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Get instant access to our most popular HR tools and calculators
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                onClick={() => handleQuickAction(action)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 text-left"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {action.description}
                </p>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all duration-300" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources - Enhanced for Mobile */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Star className="h-4 w-4" />
              Featured Resources
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Most Popular Downloads
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Our most downloaded and highly-rated resources trusted by thousands of HR professionals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className={`h-24 sm:h-32 bg-gradient-to-r ${resource.color} flex items-center justify-center`}>
                  <resource.icon className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                      {resource.category}
                    </span>
                    <span className="text-xs text-gray-500">{resource.type}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">
                    {resource.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                        {resource.downloads}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                        {resource.rating}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDownload(resource, 'featured')}
                    disabled={isLoading || downloadStatus[resource.id] === 'downloading'}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {downloadStatus[resource.id] === 'downloading' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Downloading...
                      </>
                    ) : downloadStatus[resource.id] === 'success' ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Downloaded!
                      </>
                    ) : downloadStatus[resource.id] === 'error' ? (
                      <>
                        <AlertCircle className="h-4 w-4" />
                        Try Again
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        Download Now
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <AnimatePresence mode="wait">
        {activeTab === 'tools' && (
          <motion.div
            key="tools"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <FreeTools />
          </motion.div>
        )}

        {activeTab === 'resources' && (
          <motion.div
            key="resources"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ResourceLibrary />
          </motion.div>
        )}

        {activeTab === 'templates' && (
          <motion.div
            key="templates"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="py-20 bg-gray-50"
          >
            <div className="container mx-auto px-4">
              {/* Template Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Professional HR Templates
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                  Download ready-to-use templates designed by HR experts and compliant with Indian labor laws
                </p>
              </motion.div>

              {/* Template Filters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8"
              >
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  {/* Search */}
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search templates..."
                      value={templateSearch}
                      onChange={(e) => setTemplateSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-2">
                    {templateCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedTemplateCategory(category.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          selectedTemplateCategory === category.id
                            ? 'bg-purple-500 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category.label} ({category.count})
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Templates Grid */}
              {filteredTemplates.length > 0 ? (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {filteredTemplates.map((template, index) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
                    >
                      {/* Header */}
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-white/80 bg-white/20 px-2 py-1 rounded-full">
                            {template.category}
                          </span>
                          <span className="text-xs text-white/80">{template.type}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                          {template.title}
                        </h3>
                      </div>

                      {/* Content */}
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                        <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">
                          {template.description}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-4">
                          <span className="flex items-center gap-1">
                            <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                            {template.downloads}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                            {template.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                            {template.size}
                          </span>
                        </div>

                        {/* Download Button */}
                        <button 
                          onClick={() => handleDownload(template, 'template')}
                          disabled={isLoading || downloadStatus[template.id] === 'downloading'}
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                        >
                          {downloadStatus[template.id] === 'downloading' ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              Downloading...
                            </>
                          ) : downloadStatus[template.id] === 'success' ? (
                            <>
                              <CheckCircle2 className="h-4 w-4" />
                              Downloaded!
                            </>
                          ) : downloadStatus[template.id] === 'error' ? (
                            <>
                              <AlertCircle className="h-4 w-4" />
                              Try Again
                            </>
                          ) : (
                            <>
                              <Download className="h-4 w-4" />
                              Download Template
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="text-gray-400 mb-4">
                    <Search className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No templates found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </motion.div>
              )}

              {/* Request Custom Template */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 sm:p-8 text-center text-white"
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-4">Need a Custom Template?</h3>
                <p className="text-purple-100 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
                  Can't find the template you need? We can create custom templates tailored to your specific requirements and industry standards
                </p>
                <Link 
                  to="/contact"
                  className="inline-flex items-center bg-white text-purple-600 px-6 sm:px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 gap-2"
                >
                  <ArrowRight className="h-4 w-4" />
                  Request Custom Template
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blog Section - Removed as requested */}
      {/* <BlogSection /> */}

      {/* Call to Action */}
      <CallToActionSection />
      
      {/* FAQ Section */}
      <FAQSection 
        customFaqs={resourcesPageFaqs}
        title="HR Resources - Frequently Asked Questions"
        subtitle="Everything you need to know about our free HR resources and tools"
      />

      {/* Footer */}
      <HireWithPrachiFooter />
    </>
  );
} 