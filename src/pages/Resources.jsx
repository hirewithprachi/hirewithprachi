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
  MapPin
} from 'lucide-react';
import HireWithPrachiTopBar from '@/components/hirable/HirableTopBar';
import HireWithPrachiHeader from '@/components/hirable/HirableHeader';
import HireWithPrachiFooter from '@/components/hirable/HirableFooter';
import FreeTools from '@/components/FreeTools';
import ResourceLibrary from '@/components/ResourceLibrary';
import CallToActionSection from '@/components/sections/CallToActionSection';
import FAQSection from '@/components/sections/FAQSection';
import BlogSection from '@/components/BlogSection';

export default function Resources() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tools');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [templateSearch, setTemplateSearch] = useState('');
  const [selectedTemplateCategory, setSelectedTemplateCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

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
    "url": "https://virtualhrconsultant.com/resources",
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
            "description": "Ready-to-use survey templates to measure employee engagement",
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
    "publisher": {
      "@type": "Organization",
      "name": "Virtual HR Consultant",
      "url": "https://virtualhrconsultant.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://virtualhrconsultant.com/logo.png"
      }
    },
    "author": {
      "@type": "Person",
      "name": "Prachi Shrivastava",
      "jobTitle": "Virtual HR Consultant",
      "url": "https://virtualhrconsultant.com/about"
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
      link: "/hr-cost-savings-calculator",
      description: "Calculate potential HR cost savings with virtual HR services"
    },
    { 
      title: "Compliance Checker", 
      icon: Shield, 
      color: "from-red-500 to-orange-500", 
      link: "/compliance-risk-checker",
      description: "Assess your organization's HR compliance risk level"
    },
    { 
      title: "ROI Calculator", 
      icon: TrendingUp, 
      color: "from-green-500 to-teal-500", 
      link: "/roi-calculator",
      description: "Calculate return on investment for HR initiatives"
    },
    { 
      title: "Salary Benchmarking", 
      icon: BarChart3, 
      color: "from-blue-500 to-indigo-500", 
      link: "/salary-benchmarking-tool",
      description: "Compare salaries across industries and locations"
    }
  ];

  // Template data with enhanced descriptions
  const templates = [
    {
      id: 1,
      title: "Employee Handbook Template 2024",
      description: "Comprehensive employee handbook template with all essential policies, procedures, and company guidelines compliant with Indian labor laws",
      category: "Policies",
      type: "DOCX",
      downloads: 2341,
      rating: 4.9,
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      size: "2.1 MB",
      lastUpdated: "2024-01-15",
      link: "/resource-downloads/employee-handbook-template-2024"
    },
    {
      id: 2,
      title: "Job Description Template - Professional",
      description: "Professional job description template with customizable sections for any role, including key responsibilities, qualifications, and performance metrics",
      category: "Recruitment",
      type: "DOCX",
      downloads: 1892,
      rating: 4.8,
      icon: Briefcase,
      color: "from-green-500 to-emerald-500",
      size: "0.8 MB",
      lastUpdated: "2024-01-12",
      link: "/resource-downloads/job-description-template-professional"
    },
    {
      id: 3,
      title: "360-Degree Performance Review Form",
      description: "Comprehensive 360-degree performance review template with evaluation criteria, self-assessment, peer review, and manager feedback sections",
      category: "Performance",
      type: "PDF",
      downloads: 1567,
      rating: 4.7,
      icon: UserCheck,
      color: "from-purple-500 to-pink-500",
      size: "1.2 MB",
      lastUpdated: "2024-01-10",
      link: "/resource-downloads/360-degree-performance-review-form"
    },
    {
      id: 4,
      title: "Employment Contract Template - India",
      description: "Standard employment contract template fully compliant with Indian labor laws, including all statutory requirements and employee rights",
      category: "Legal",
      type: "DOCX",
      downloads: 2103,
      rating: 4.9,
      icon: FileCheck,
      color: "from-red-500 to-orange-500",
      size: "1.5 MB",
      lastUpdated: "2024-01-08",
      link: "/resource-downloads/employment-contract-template-india"
    },
    {
      id: 5,
      title: "Leave Application Form - Professional",
      description: "Professional leave application form with approval workflow, leave balance tracking, and manager approval process",
      category: "Forms",
      type: "PDF",
      downloads: 1345,
      rating: 4.6,
      icon: Calendar,
      color: "from-indigo-500 to-purple-500",
      size: "0.6 MB",
      lastUpdated: "2024-01-05",
      link: "/resource-downloads/leave-application-form-professional"
    },
    {
      id: 6,
      title: "Salary Structure Template - Comprehensive",
      description: "Comprehensive salary structure template with benefits breakdown, allowances, deductions, and tax calculations for Indian employees",
      category: "Compensation",
      type: "XLSX",
      downloads: 987,
      rating: 4.8,
      icon: DollarSign,
      color: "from-yellow-500 to-orange-500",
      size: "1.8 MB",
      lastUpdated: "2024-01-03",
      link: "/resource-downloads/salary-structure-template-comprehensive"
    }
  ];

  const templateCategories = [
    { id: 'all', name: 'All Templates', count: templates.length },
    { id: 'Policies', name: 'Policies', count: templates.filter(t => t.category === 'Policies').length },
    { id: 'Recruitment', name: 'Recruitment', count: templates.filter(t => t.category === 'Recruitment').length },
    { id: 'Performance', name: 'Performance', count: templates.filter(t => t.category === 'Performance').length },
    { id: 'Legal', name: 'Legal', count: templates.filter(t => t.category === 'Legal').length },
    { id: 'Forms', name: 'Forms', count: templates.filter(t => t.category === 'Forms').length },
    { id: 'Compensation', name: 'Compensation', count: templates.filter(t => t.category === 'Compensation').length }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedTemplateCategory === 'all' || template.category === selectedTemplateCategory;
    const matchesSearch = template.title.toLowerCase().includes(templateSearch.toLowerCase()) ||
                         template.description.toLowerCase().includes(templateSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle download with loading state
  const handleDownload = async (resource, type = 'resource') => {
    setIsLoading(true);
    try {
      // Track download analytics
      console.log(`${type} download requested:`, resource.title);
      
      // Always navigate to download page for form-first approach
      if (resource.link && resource.link.includes('/resource-downloads/')) {
        navigate(resource.link);
      } else if (resource.link && resource.link.includes('/calculator') || resource.link.includes('/tool')) {
        navigate(resource.link);
      } else {
        // For featured resources, navigate to download page
        const downloadPath = `/resource-downloads/${resource.id || resource.title.toLowerCase().replace(/\s+/g, '-')}`;
        navigate(downloadPath);
      }
    } catch (error) {
      console.error('Download failed:', error);
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
      
      {/* Hero Section - Enhanced for SEO and Mobile */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              Premium HR Resources & Tools
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Your Complete
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                HR Resource Hub
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed px-4">
              Access cutting-edge tools, templates, and insights to transform your HR operations and drive organizational success
            </p>

            {/* Search Bar - Enhanced for Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl mx-auto mb-12 px-4"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search resources, tools, templates..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 sm:px-6 py-2 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-sm sm:text-base">
                  Search
                </button>
              </div>
            </motion.div>

            {/* Quick Stats - Responsive Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto px-4"
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
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 text-center"
                >
                  <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-xl sm:text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
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

      {/* Quick Actions Section - Enhanced for Mobile */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
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
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Jump straight into our most popular HR tools and calculators designed for Indian businesses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                onClick={() => handleQuickAction(action)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 text-left"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
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
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Downloading...
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
            transition={{ duration: 0.5 }}
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
            transition={{ duration: 0.5 }}
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
            transition={{ duration: 0.5 }}
            className="py-20 bg-gradient-to-br from-gray-50 to-white"
          >
            <div className="container mx-auto px-4 max-w-7xl">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <FileText className="h-4 w-4" />
                  HR Templates & Forms
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Professional <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">HR Templates</span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                  Ready-to-use templates and forms designed by HR experts to streamline your processes and ensure compliance
                </p>
              </motion.div>

              {/* Search and Filters - Enhanced for Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-12"
              >
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-center justify-between">
                  {/* Search Bar */}
                  <div className="relative flex-1 max-w-2xl w-full">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      value={templateSearch}
                      onChange={e => setTemplateSearch(e.target.value)}
                      placeholder="Search templates..."
                      className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 shadow-sm"
                    />
                  </div>

                  {/* Category Filter - Scrollable on Mobile */}
                  <div className="flex gap-2 flex-wrap overflow-x-auto pb-2 lg:pb-0">
                    {templateCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedTemplateCategory(category.id);
                          handleCategoryChange(category.name);
                        }}
                        className={`px-3 sm:px-4 py-2 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                          selectedTemplateCategory === category.id
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        {category.name} ({category.count})
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Templates Grid - Enhanced for Mobile */}
              {filteredTemplates.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">No templates found</p>
                    <p className="text-sm">Try adjusting your search or filters</p>
                  </div>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                      {/* Icon */}
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-4 sm:mx-6 mt-4 sm:mt-6 mb-4 group-hover:scale-110 transition-transform duration-300">
                        <template.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>

                      {/* Content */}
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                            {template.category}
                          </span>
                          <span className="text-xs text-gray-500">{template.type}</span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                          {template.title}
                        </h3>
                        
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
                          disabled={isLoading}
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                        >
                          {isLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              Downloading...
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

      {/* Blog Section */}
      <BlogSection />

      {/* Call to Action */}
      <CallToActionSection />
      
      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <HireWithPrachiFooter />
    </>
  );
} 