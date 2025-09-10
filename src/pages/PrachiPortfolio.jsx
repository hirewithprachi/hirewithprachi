import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Linkedin, 
  Mail, 
  MessageCircle, 
  Download, 
  ArrowRight, 
  Star, 
  Users, 
  Award, 
  Shield,
  Heart,
  Users2,
  CheckCircle,
  Calendar,
  MapPin,
  Phone,
  ExternalLink,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Zap,
  Menu,
  X,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Home,
  User,
  Briefcase as WorkIcon,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  RotateCcw,
  FileText,
  Sparkles,
  Crown,
  Target,
  Rocket
} from 'lucide-react';
import OptimizedImage from '../components/ui/OptimizedImage';
import HireWithPrachiTopBar from '../components/hirable/HirableTopBar';
import HireWithPrachiHeader from '../components/hirable/HirableHeader';
import HireWithPrachiFooter from '../components/hirable/HirableFooter';

const PrachiPortfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedNeed, setSelectedNeed] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stats, setStats] = useState({
    projects: 0,
    companies: 0,
    contracts: 0,
    experience: 0
  });
  const [showStickyCta, setShowStickyCta] = useState(false);

  const { scrollYProgress } = useScroll();
  const parallaxYSlow = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const parallaxYFast = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse tracking for kinetic typography
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    
    // Animate statistics
    const animateStats = () => {
      const targetStats = {
        projects: 500,
        companies: 200,
        contracts: 50,
        experience: 8
      };

      const duration = 2000;
      const steps = 60;
      const increment = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setStats({
          projects: Math.floor(targetStats.projects * progress),
          companies: Math.floor(targetStats.companies * progress),
          contracts: Math.floor(targetStats.contracts * progress),
          experience: Math.floor(targetStats.experience * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setStats(targetStats);
        }
      }, increment);

      return () => clearInterval(timer);
    };

    const timeout = setTimeout(animateStats, 500);
    return () => clearTimeout(timeout);
  }, []);

  // Sticky CTA visibility on scroll
  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.6;
      setShowStickyCta(window.scrollY > threshold);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const services = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "HR Compliance & POSH Training",
      description: "Comprehensive compliance solutions and certified POSH training for safe workplaces",
      projects: 150,
      features: ["POSH Training", "Policy Development", "Compliance Audits", "Legal Advisory"],
      gradient: "from-blue-600 via-purple-600 to-pink-600",
      bgGradient: "from-blue-50 via-purple-50 to-pink-50"
    },
    {
      icon: <Users2 className="w-8 h-8" />,
      title: "Recruitment & Hiring",
      description: "End-to-end recruitment solutions from job posting to onboarding",
      projects: 200,
      features: ["Talent Acquisition", "Interview Process", "Background Checks", "Onboarding"],
      gradient: "from-emerald-600 via-teal-600 to-cyan-600",
      bgGradient: "from-emerald-50 via-teal-50 to-cyan-50"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Employee Engagement",
      description: "Build thriving workplace culture and boost employee satisfaction",
      projects: 100,
      features: ["Culture Building", "Employee Surveys", "Recognition Programs", "Team Building"],
      gradient: "from-rose-600 via-pink-600 to-purple-600",
      bgGradient: "from-rose-50 via-pink-50 to-purple-50"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "HR Director",
      company: "TechCorp Solutions",
      content: "Prachi transformed our HR processes completely. Her POSH training was eye-opening and her recruitment strategies helped us hire top talent. Highly recommended!",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Rajesh Kumar",
      position: "CEO",
      company: "StartupHub India",
      content: "Working with Prachi was a game-changer for our startup. She helped us build a strong HR foundation and create an inclusive workplace culture.",
      rating: 5,
      avatar: "RK"
    },
    {
      name: "Emily Chen",
      position: "Operations Manager",
      company: "Global Innovations",
      content: "Prachi's expertise in employee engagement helped us reduce turnover by 40%. Her strategies are practical and results-driven.",
      rating: 5,
      avatar: "EC"
    }
  ];

  const achievements = [
    {
      icon: <Crown className="w-6 h-6" />,
      title: "Certified POSH Trainer",
      description: "Authorized to conduct POSH training sessions",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "HR Management Expert",
      description: "8+ years of comprehensive HR experience",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Compliance Specialist",
      description: "Expert in labor laws and workplace safety",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Employee Engagement Pro",
      description: "Specialized in culture building and retention",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  const scrollToSection = (sectionId) => {
    setCurrentSection(sectionId);
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Prachi Shrivastava - Leading HR Expert & Virtual HR Consultant | Hire With Prachi</title>
        <meta name="description" content="Prachi Shrivastava - India's leading Virtual HR Consultant, POSH Expert & Director at Hire With Prachi. 8+ years transforming businesses through strategic HR solutions, compliance expertise & employee engagement. Trusted by 200+ companies." />
        <meta name="keywords" content="Prachi Shrivastava, Virtual HR Consultant India, POSH Expert, HR Compliance Specialist, Employee Engagement Expert, HR Consultant Delhi, Startup HR Solutions, SME HR Services, HR Policy Development, Recruitment Expert, HR Thought Leader, Prachi HR, Hire With Prachi Director" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="Prachi Shrivastava" />

        {/* Canonical */}
        <link rel="canonical" href="https://hirewithprachi.com/prachi-shrivastava" />

        {/* Open Graph */}
        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="Hire With Prachi" />
        <meta property="og:title" content="Prachi Shrivastava - Director & Virtual HR Consultant" />
        <meta property="og:description" content="Certified HR professional with 8+ years of experience in compliance, recruitment, and engagement. Director at Hire With Prachi." />
        <meta property="og:url" content="https://hirewithprachi.com/prachi-shrivastava" />
        <meta property="og:image" content="https://hirewithprachi.com/assets/images/about-img-1.jpg" />
        <meta property="profile:first_name" content="Prachi" />
        <meta property="profile:last_name" content="Shrivastava" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Prachi Shrivastava - Director & Virtual HR Consultant" />
        <meta name="twitter:description" content="Certified HR professional helping businesses build better workplaces through expert HR solutions." />
        <meta name="twitter:image" content="https://hirewithprachi.com/assets/images/about-img-1.jpg" />

        {/* Structured Data: ProfilePage + Person */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "name": "Prachi Shrivastava",
            "url": "https://hirewithprachi.com/prachi-shrivastava",
            "primaryImageOfPage": {
              "@type": "ImageObject",
              "contentUrl": "https://hirewithprachi.com/assets/images/about-img-1.jpg"
            },
            "about": {
              "@type": "Person",
              "name": "Prachi Shrivastava",
              "gender": "Female",
              "nationality": "Indian",
              "jobTitle": "Director & Virtual HR Consultant",
              "knowsLanguage": ["English", "Hindi"],
              "description": "India's leading Virtual HR Consultant and POSH Expert with 8+ years of experience transforming businesses through strategic HR solutions. Director at Hire With Prachi, specializing in HR compliance, recruitment excellence, employee engagement, and organizational development. Trusted advisor to 200+ companies across startups and SMEs.",
              "url": "https://hirewithprachi.com/prachi-shrivastava",
              "image": [
                { "@type": "ImageObject", "contentUrl": "https://hirewithprachi.com/assets/images/about-img-1.jpg" },
                { "@type": "ImageObject", "contentUrl": "https://hirewithprachi.com/assets/images/100.jpg" }
              ],
              "sameAs": [
                "https://www.linkedin.com/in/prachi-shrivastava",
                "https://www.facebook.com/hirewithprachi/",
                "https://www.instagram.com/hirewithprachi/",
                "https://www.youtube.com/@hirewithprachi"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Hire With Prachi",
                "url": "https://hirewithprachi.com"
              },
              "knowsAbout": [
                "Human Resources Management",
                "POSH Training & Compliance",
                "Strategic Recruitment",
                "Employee Engagement & Retention",
                "HR Compliance & Audit",
                "Virtual HR Consulting",
                "Startup HR Solutions",
                "SME HR Strategy",
                "Organizational Development",
                "HR Policy Development",
                "Performance Management",
                "Payroll Management",
                "Labor Law Compliance",
                "Workplace Culture Building",
                "HR Technology Implementation"
              ],
              "hasCredential": [
                "Certified POSH Trainer & Expert",
                "HR Management Professional Certification",
                "Labor Law Compliance Specialist",
                "Virtual HR Consulting Expert",
                "Employee Engagement Specialist",
                "Organizational Development Consultant",
                "Strategic HR Planning Professional"
              ],
              "address": { "@type": "PostalAddress", "addressCountry": "IN" },
              "telephone": "+918740889927",
              "email": "prachi@rejoin.co.in",
              "potentialAction": {
                "@type": "ContactAction",
                "target": "https://calendly.com/prachi-hr/virtual-hr-consultation",
                "name": "Book Consultation"
              }
            }
          })}
        </script>

        {/* Structured Data: Breadcrumbs */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://hirewithprachi.com/" },
              { "@type": "ListItem", "position": 2, "name": "About", "item": "https://hirewithprachi.com/about" },
              { "@type": "ListItem", "position": 3, "name": "Prachi Shrivastava", "item": "https://hirewithprachi.com/prachi-shrivastava" }
            ]
          })}
        </script>

        {/* Structured Data: FAQ for AI Overviews */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {"@type":"Question","name":"Who is Prachi Shrivastava?","acceptedAnswer":{"@type":"Answer","text":"Prachi Shrivastava is India's leading Virtual HR Consultant, POSH Expert, and Director at Hire With Prachi. With 8+ years of experience, she has transformed 200+ businesses through strategic HR solutions, specializing in compliance, recruitment, and employee engagement."}},
              {"@type":"Question","name":"What makes Prachi Shrivastava a top HR expert in India?","acceptedAnswer":{"@type":"Answer","text":"Prachi is a Certified POSH Trainer with 8+ years of experience, having successfully served 200+ companies. She specializes in virtual HR consulting, startup HR solutions, compliance expertise, and has a proven track record of reducing employee turnover by 40% and improving workplace culture."}},
              {"@type":"Question","name":"What services does Prachi Shrivastava offer?","acceptedAnswer":{"@type":"Answer","text":"Prachi offers comprehensive virtual HR services including POSH training & compliance, strategic recruitment, employee engagement programs, HR policy development, compliance audits, payroll management, performance management, and organizational development for startups and SMEs."}},
              {"@type":"Question","name":"How can I hire Prachi Shrivastava for HR consulting?","acceptedAnswer":{"@type":"Answer","text":"Contact Prachi at prachi@rejoin.co.in, call +91 87408 89927, or book a free consultation at calendly.com/prachi-hr/virtual-hr-consultation. She offers virtual HR consulting services across India and globally."}},
              {"@type":"Question","name":"Does Prachi Shrivastava work with startups and small businesses?","acceptedAnswer":{"@type":"Answer","text":"Yes, Prachi specializes in cost-effective HR solutions for startups and SMEs. She has helped 200+ companies build strong HR foundations, ensuring compliance while optimizing costs and improving employee satisfaction."}},
              {"@type":"Question","name":"What are Prachi Shrivastava's qualifications and certifications?","acceptedAnswer":{"@type":"Answer","text":"Prachi is a Certified POSH Trainer & Expert, HR Management Professional, Labor Law Compliance Specialist, and Virtual HR Consulting Expert. She holds multiple certifications in employee engagement, organizational development, and strategic HR planning."}},
              {"@type":"Question","name":"What is Prachi Shrivastava's experience in POSH training?","acceptedAnswer":{"@type":"Answer","text":"Prachi is a Certified POSH Trainer with extensive experience in conducting POSH training sessions, policy development, and compliance audits. She has helped numerous organizations create safe and inclusive workplaces while ensuring legal compliance."}},
              {"@type":"Question","name":"How does Prachi Shrivastava help with employee engagement?","acceptedAnswer":{"@type":"Answer","text":"Prachi specializes in employee engagement strategies that have proven to reduce turnover by 40%. She focuses on culture building, recognition programs, employee surveys, team building, and creating thriving workplace environments that boost satisfaction and retention."}}
            ]
          })}
        </script>
      </Helmet>

      <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>

        {/* Premium Sticky CTA Bar */}
        <AnimatePresence>
          {showStickyCta && (
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-4 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[720px] z-50"
            >
              <div className="mx-auto bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <div className="text-sm text-white/80 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    Ready to elevate HR?
                  </div>
                  <div className="font-semibold text-lg">Book a free 15-min consultation with Prachi</div>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://calendly.com/prachi-hr/virtual-hr-consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Book Now
                  </a>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                  >
                    Contact
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Brand Header */}
        <HireWithPrachiTopBar />
        <HireWithPrachiHeader />

        {/* Premium Floating Action Button */}
        <motion.div 
          className="fixed bottom-6 right-6 z-40"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <button 
            onClick={() => scrollToSection('contact')}
            className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center group"
          >
            <MessageSquare className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
          </button>
        </motion.div>

        {/* Premium Header with Glassmorphism */}
        <header className="sticky top-0 z-40 bg-white/5 backdrop-blur-xl border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3 group">
                <motion.div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg border border-white/20 bg-gradient-to-r from-yellow-500 to-orange-500"
                  whileHover={{ rotate: 5 }}
                >
                  <span className="text-black font-bold text-xl">P</span>
                </motion.div>
                <div>
                  <h1 className="text-xl font-bold text-white">Prachi Shrivastava</h1>
                  <p className="text-xs text-white/70">Director & Virtual HR Consultant</p>
                </div>
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                {[
                  { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
                  { id: 'about', label: 'About', icon: <User className="w-4 h-4" /> },
                  { id: 'services', label: 'Services', icon: <WorkIcon className="w-4 h-4" /> },
                  { id: 'skills', label: 'Skills', icon: <Zap className="w-4 h-4" /> },
                  { id: 'portfolio', label: 'Portfolio', icon: <Briefcase className="w-4 h-4" /> },
                  { id: 'contact', label: 'Contact', icon: <MessageSquare className="w-4 h-4" /> }
                ].map((item) => (
                  <motion.button 
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      currentSection === item.id 
                        ? 'bg-white/20 text-white shadow-lg' 
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </motion.button>
                ))}
              </nav>
              
              {/* Desktop Social Links */}
              <div className="hidden md:flex items-center space-x-3">
                {[
                  { href: "https://linkedin.com/in/prachi-shrivastava", icon: <Linkedin className="w-5 h-5" />, color: "hover:bg-blue-500/20" },
                  { href: "mailto:prachi@rejoin.co.in", icon: <Mail className="w-5 h-5" />, color: "hover:bg-red-500/20" },
                  { href: "https://wa.me/918740889927", icon: <MessageCircle className="w-5 h-5" />, color: "hover:bg-green-500/20" }
                ].map((social, index) => (
                  <motion.a 
                    key={index}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`w-10 h-10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all duration-300 ${social.color}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <motion.button 
                className="md:hidden w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden mt-4 pb-4 border-t border-white/20 overflow-hidden"
                >
                  <nav className="flex flex-col space-y-2 mt-4">
                    {[
                      { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
                      { id: 'about', label: 'About', icon: <User className="w-4 h-4" /> },
                      { id: 'services', label: 'Services', icon: <WorkIcon className="w-4 h-4" /> },
                      { id: 'contact', label: 'Contact', icon: <MessageSquare className="w-4 h-4" /> }
                    ].map((item) => (
                      <motion.button 
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300"
                        whileHover={{ x: 10 }}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </motion.button>
                    ))}
                  </nav>
                  <div className="flex items-center space-x-4 mt-4">
                    {[
                      { href: "https://linkedin.com/in/prachi-shrivastava", icon: <Linkedin className="w-5 h-5" /> },
                      { href: "mailto:prachi@rejoin.co.in", icon: <Mail className="w-5 h-5" /> },
                      { href: "https://wa.me/918740889927", icon: <MessageCircle className="w-5 h-5" /> }
                    ].map((social, index) => (
                      <motion.a 
                        key={index}
                        href={social.href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Premium Cinematic Hero Section */}
        <section id="home" className="relative min-h-[88vh] md:min-h-[92vh] flex items-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 -z-10">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
            
            {/* Animated Orbs */}
            <motion.div 
              className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
              animate={{ 
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
              animate={{ 
                x: [0, -100, 0],
                y: [0, 50, 0],
                scale: [1, 0.8, 1]
              }}
              transition={{ 
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
              animate={{ 
                x: [0, 50, 0],
                y: [0, -100, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 30,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <div className="container mx-auto max-w-6xl px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content with Kinetic Typography */}
              <motion.div 
                className="space-y-8 text-center lg:text-left"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Premium Status Badge */}
                <motion.div 
                  className="inline-flex items-center space-x-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                  <span className="text-white/90 font-medium">Available for new projects</span>
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </motion.div>

                {/* Kinetic Typography */}
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold leading-tight"
                  style={{
                    transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.01}px, ${(mousePosition.y - window.innerHeight / 2) * 0.01}px)`
                  }}
                >
                  <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
                    Your Trusted HR
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                    Partner
                  </span>
                </motion.h1>

                <motion.p 
                  className="text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  HR Consulting, Talent Strategy, and Workforce Solutions tailored to your business growth.
                </motion.p>

                {/* Premium CTA Buttons */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.a 
                    href="https://calendly.com/prachi-hr/virtual-hr-consultation" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-2xl font-semibold hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl hover:shadow-yellow-500/25"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Calendar className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                    <span>Book a Consultation</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.a>
                  
                  <motion.button 
                    onClick={() => scrollToSection('services')}
                    className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-3"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Explore Services</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </motion.div>
              </motion.div>
              
              {/* Right - Premium 3D Profile Image */}
              <div className="flex justify-center lg:justify-end">
                <motion.div 
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {/* 3D Profile Container */}
                  <motion.div 
                    className="w-80 h-80 rounded-3xl overflow-hidden border border-white/20 shadow-2xl transition-all duration-500 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm"
                    whileHover={{ 
                      rotateY: 5,
                      rotateX: 5,
                      scale: 1.05
                    }}
                    style={{
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <OptimizedImage
                      src="/assets/images/about-prachi.svg"
                      alt="Prachi Shrivastava - HR Expert and POSH Trainer"
                      className="w-full h-full object-cover"
                      fallbackSrc="/fallback-image.jpg"
                    />
                  </motion.div>
                  
                  {/* Premium Achievement Badges */}
                  <motion.div 
                    className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold text-sm shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Certified POSH
                  </motion.div>
                  
                  <motion.div 
                    className="absolute -bottom-4 -left-4 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    Compliance Pro
                  </motion.div>
                  
                  {/* Premium Stats Cards */}
                  <motion.div 
                    className="absolute -left-16 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl"
                    whileHover={{ scale: 1.1, x: -10 }}
                    animate={{ x: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-1">{stats.projects}+</div>
                      <div className="text-sm text-white/70 font-medium">Projects</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute -right-16 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl"
                    whileHover={{ scale: 1.1, x: 10 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  >
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-1">{stats.experience}+</div>
                      <div className="text-sm text-white/70 font-medium">Years</div>
                    </div>
                  </motion.div>
                  
                  {/* Premium Floating Elements */}
                  <motion.div 
                    className="absolute top-4 left-4 w-14 h-14 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full shadow-2xl backdrop-blur-sm border border-white/30 flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <CheckCircle className="w-7 h-7 text-white" />
                  </motion.div>
                  
                  <motion.div 
                    className="absolute bottom-4 right-4 w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-2xl backdrop-blur-sm border border-white/30 flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, -360]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                  >
                    <TrendingUp className="w-7 h-7 text-white" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Premium Scroll Indicator */}
          <motion.div 
            className="absolute bottom-6 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-white/80" />
          </motion.div>
        </section>

        {/* Resources / Free Toolkit Section */}
        <section id="resources" className="py-20 px-4 relative">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white">Free HR Toolkit</h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">Download premium templates and checklists to accelerate your HR operations.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'HR Compliance Checklist (2024)', file: '/downloads/hr-compliance-checklist-2024.pdf' },
                { title: 'Employment Contract Template (India)', file: '/downloads/employment-contract-template-india.pdf' },
                { title: 'Employee Handbook Template (2024)', file: '/downloads/employee-handbook-template-2024.pdf' }
              ].map((item) => (
                <motion.div 
                  key={item.title}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 flex flex-col items-center justify-between gap-6 hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <Download className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="text-lg text-white/70 text-center">PDF • Free Download</p>
                  <a 
                    href={item.file} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Now</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Media & Gallery Section */}
        <section id="media" className="py-20 px-4 relative">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white">
                Media & Gallery
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                A curated collection of photos from training sessions, HR events, and client engagements.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { src: "/assets/images/about-img-1.jpg", alt: "Prachi conducting POSH training" },
                { src: "/assets/images/100.jpg", alt: "Speaking at an HR event" },
                { src: "/assets/images/services/employee-engagement-service.jpg", alt: "Employee engagement workshop" }
              ].map((img, idx) => (
                <motion.div 
                  key={idx}
                  className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/5"
                  whileHover={{ scale: 1.05 }}
                >
                  <OptimizedImage src={img.src} alt={img.alt} className="w-full h-64 object-cover" />
                  <div className="absolute bottom-4 left-4 right-4 text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1 text-sm inline-block w-auto max-w-[90%]">{img.alt}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 relative">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white">
                About <span className="text-white/70">Me</span>
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Passionate HR professional dedicated to transforming workplaces with strategic HR and compliance excellence.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Image */}
              <div className="relative">
                <div className="w-full h-96 rounded-3xl overflow-hidden border border-white/20 bg-white/5">
                  <OptimizedImage
                    src="/assets/images/about-prachi.svg"
                    alt="Prachi Shrivastava - About"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating Stats */}
                <motion.div 
                  className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-white">{stats.companies}+</div>
                    <div className="text-sm text-white/70">Companies</div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-white">{stats.contracts}+</div>
                    <div className="text-sm text-white/70">Contracts</div>
                  </div>
                </motion.div>
              </div>
              
              {/* Right - Content */}
              <div className="space-y-6">
                <motion.div 
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-2xl font-semibold mb-4 text-white">My Story</h3>
                  <p className="text-white/70 leading-relaxed mb-6">
                    With over 8 years of experience in HR, I've helped hundreds of companies build better workplaces. 
                    My expertise spans from compliance and POSH training to recruitment and employee engagement.
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    I believe that great HR is the foundation of successful businesses. Every company deserves 
                    professional HR support that drives growth and creates positive workplace cultures.
                  </p>
                </motion.div>
                
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div 
                      key={index}
                      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r flex items-center justify-center">
                        <div className="text-white">
                          {achievement.icon}
                        </div>
                      </div>
                      <div className="text-center">
                        <h4 className="font-semibold text-white">{achievement.title}</h4>
                        <p className="text-sm text-white/70">{achievement.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-4 relative">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white">
                Services
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Comprehensive HR solutions to transform your workplace and drive growth.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div 
                  key={index}
                  className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="p-8 border-b border-white/20 bg-white/5">
                    <div className="text-white/70 mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">{service.title}</h3>
                    <p className="text-white/70">{service.description}</p>
                  </div>
                  <div className="p-8">
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <span className="text-white/70">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <motion.button 
                      onClick={() => scrollToSection('contact')}
                      className="w-full px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-3"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 relative">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white">
                Client Testimonials
              </h2>
              <p className="text-lg text-white/70">Real feedback from businesses I've helped transform</p>
            </div>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 flex flex-col items-center justify-center gap-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-1">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-8 h-8 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </motion.button>
                  <motion.button 
                    onClick={() => setActiveTestimonial(0)}
                    className="w-8 h-8 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
              <motion.blockquote 
                className="text-xl text-white/70 mb-6 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                "{testimonials[activeTestimonial].content}"
              </motion.blockquote>
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold"
                  whileHover={{ scale: 1.1 }}
                >
                  {testimonials[activeTestimonial].avatar}
                </motion.div>
                <div>
                  <div className="font-semibold text-white">{testimonials[activeTestimonial].name}</div>
                  <div className="text-sm text-white/70">{testimonials[activeTestimonial].position}, {testimonials[activeTestimonial].company}</div>
                </div>
              </div>
            </motion.div>
            
            {/* Testimonial Navigation */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeTestimonial ? 'bg-white' : 'bg-white/50'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Skills & Expertise Matrix */}
        <section id="skills" className="py-20 px-4 relative">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white">
                Skills & Expertise
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Comprehensive HR expertise backed by certifications and proven results.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Skills Matrix */}
              <div className="space-y-6">
                <motion.div 
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 flex flex-col gap-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-2xl font-semibold mb-6 text-white">Core Competencies</h3>
                  <div className="space-y-6">
                    {[
                      { 
                        skill: "HR Compliance", 
                        level: 95, 
                         color: "from-neutral-900 to-neutral-700",
                        icon: <Shield className="w-5 h-5" />,
                        projects: 150,
                        description: "Expert in labor laws, compliance audits, and policy development"
                      },
                      { 
                        skill: "POSH Training", 
                        level: 98, 
                         color: "from-neutral-900 to-neutral-700",
                        icon: <Users className="w-5 h-5" />,
                        projects: 200,
                        description: "Certified POSH trainer with 100% compliance rate"
                      },
                      { 
                        skill: "Recruitment", 
                        level: 92, 
                         color: "from-neutral-900 to-neutral-700",
                        icon: <Users2 className="w-5 h-5" />,
                        projects: 180,
                        description: "End-to-end recruitment with 40% faster hiring"
                      },
                      { 
                        skill: "Employee Engagement", 
                        level: 90, 
                         color: "from-neutral-900 to-neutral-700",
                        icon: <Heart className="w-5 h-5" />,
                        projects: 120,
                        description: "Culture building and retention strategies"
                      },
                      { 
                        skill: "Policy Development", 
                        level: 94, 
                         color: "from-neutral-900 to-neutral-700",
                        icon: <FileText className="w-5 h-5" />,
                        projects: 160,
                        description: "Comprehensive HR policy frameworks"
                      }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        className="group cursor-pointer p-4 rounded-2xl flex flex-col gap-3 hover:bg-white/10 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        onMouseEnter={() => setHoveredSkill(index)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center`}>
                              {item.icon}
                            </div>
                            <span className="text-white font-semibold text-lg">{item.skill}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-white/70 font-semibold text-lg">{item.level}%</span>
                            <div className="text-sm text-white/70">{item.projects} projects</div>
                          </div>
                        </div>
                        
                        <div className="w-full bg-white/10 rounded-full h-3 mb-3 overflow-hidden">
                          <div 
                            className={`h-3 bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out relative`}
                            style={{ width: `${item.level}%` }}
                          >
                            <div className="absolute inset-0 bg-white/20"></div>
                          </div>
                        </div>
                        
                        {/* Skill Description - Shows on hover */}
                        <motion.div 
                          className={`text-sm text-white/70 transition-all duration-300 ${hoveredSkill === index ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          {item.description}
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              {/* Certifications */}
              <div className="space-y-6">
                <motion.div 
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 flex flex-col gap-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-2xl font-semibold mb-6 text-white">Certifications & Awards</h3>
                  <div className="space-y-4">
                    {[
                      { title: "Certified POSH Trainer", issuer: "Ministry of Women & Child Development", year: "2023" },
                      { title: "HR Management Professional", issuer: "SHRM", year: "2022" },
                      { title: "Compliance Specialist", issuer: "HRCI", year: "2021" },
                      { title: "Employee Engagement Expert", issuer: "Gallup", year: "2020" }
                    ].map((cert, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-center space-x-4 p-4 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{cert.title}</h4>
                          <p className="text-sm text-white/70">{cert.issuer}</p>
                        </div>
                        <span className="text-white/70 text-sm">{cert.year}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Portfolio Gallery */}
        <section id="portfolio" className="py-20 px-4 relative">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white">
                Featured Projects
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Transformative HR projects that delivered exceptional results.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Tech Startup HR Transformation",
                  category: "HR Strategy",
                  image: "/assets/images/portfolio-1.jpg",
                  description: "Complete HR overhaul for 100+ employee tech startup",
                  results: ["95% employee satisfaction", "40% faster hiring", "Zero compliance issues"]
                },
                {
                  title: "POSH Implementation",
                  category: "Compliance",
                  image: "/assets/images/portfolio-2.jpg",
                  description: "End-to-end POSH policy implementation and training",
                  results: ["100% compliance", "500+ employees trained", "Zero incidents"]
                },
                {
                  title: "Employee Engagement Program",
                  category: "Engagement",
                  image: "/assets/images/portfolio-3.jpg",
                  description: "Comprehensive employee engagement initiative",
                  results: ["85% engagement score", "30% retention improvement", "Award-winning program"]
                }
              ].map((project, index) => (
                <motion.div 
                  key={index}
                  className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="h-48 relative overflow-hidden bg-white/5">
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white/70">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-white/70 mb-4">{project.description}</p>
                    <div className="space-y-2">
                      {project.results.map((result, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm text-white/70">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Client Success Stories */}
        <section id="success" className="py-20 px-4 relative">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white">
                Client Success
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Real results from real clients — measurable impact and transformation.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { metric: "500+", label: "Projects Completed", icon: <Briefcase className="w-8 h-8" /> },
                { metric: "200+", label: "Companies Served", icon: <Users className="w-8 h-8" /> },
                { metric: "₹2Cr+", label: "Cost Savings Delivered", icon: <TrendingUp className="w-8 h-8" /> }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center flex flex-col items-center justify-center gap-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                    <div className="text-white">{stat.icon}</div>
                  </div>
                  <div className="text-3xl font-semibold text-white mb-2">{stat.metric}</div>
                  <div className="text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 flex flex-col items-center justify-center gap-6"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-white text-center">Success Timeline</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { year: "2020", title: "Started Journey", desc: "First 50 clients" },
                  { year: "2021", title: "Expanded Services", desc: "Added POSH training" },
                  { year: "2022", title: "National Reach", desc: "Served 100+ companies" },
                  { year: "2023", title: "Industry Leader", desc: "500+ projects completed" }
                ].map((milestone, index) => (
                  <motion.div 
                    key={index}
                    className="text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-white font-semibold">{milestone.year}</span>
                    </div>
                    <h4 className="font-semibold text-white mb-2">{milestone.title}</h4>
                    <p className="text-white/70 text-sm">{milestone.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Blog & Insights */}
        <section id="blog" className="py-20 px-4 relative">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white">
                Latest Insights
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Stay updated with the latest HR trends, compliance updates, and industry insights.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: "2025 HR Compliance Checklist",
                  excerpt: "Essential compliance requirements for Indian businesses in 2025",
                  category: "Compliance",
                  readTime: "5 min read",
                  date: "Jan 15, 2025"
                },
                {
                  title: "Building Remote-First Cultures",
                  excerpt: "Strategies for creating engaging remote workplace cultures",
                  category: "Culture",
                  readTime: "7 min read",
                  date: "Jan 10, 2025"
                },
                {
                  title: "POSH Training Best Practices",
                  excerpt: "Effective POSH training methods for modern workplaces",
                  category: "Training",
                  readTime: "6 min read",
                  date: "Jan 5, 2025"
                }
              ].map((post, index) => (
                <motion.div 
                  key={index}
                  className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="h-48 relative overflow-hidden bg-white/5">
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white/70">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-white/70 mb-3">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-white/70 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-white/70 mb-4">{post.excerpt}</p>
                    <motion.button 
                      className="text-white hover:underline font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Read More →
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center">
              <motion.button 
                onClick={() => window.location.href = '/blog'}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Articles
              </motion.button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 relative">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white">
                Let's Connect
              </h2>
              <p className="text-lg text-white/70">Ready to transform your workplace? Let's discuss your HR needs.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div 
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 flex flex-col gap-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-2xl font-semibold mb-6 text-white">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Email</p>
                        <p className="text-white/70">prachi@rejoin.co.in</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Phone</p>
                        <p className="text-white/70">+91 87408 89927</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Location</p>
                        <p className="text-white/70">India</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 flex flex-col gap-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-2xl font-semibold mb-6 text-white">Follow Me</h3>
                  <div className="flex space-x-4">
                    <motion.a 
                      href="https://linkedin.com/in/prachi-shrivastava" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Linkedin className="w-6 h-6 text-white" />
                    </motion.a>
                    <motion.a 
                      href="mailto:prachi@rejoin.co.in" 
                      className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Mail className="w-6 h-6 text-white" />
                    </motion.a>
                    <motion.a 
                      href="https://wa.me/918740889927" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <MessageCircle className="w-6 h-6 text-white" />
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Enhanced Smart Contact Form */}
              <motion.div 
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 flex flex-col gap-6"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-semibold mb-2 text-white">Let's Start Your HR Transformation</h3>
                  <p className="text-white/70">Get a personalized consultation based on your needs</p>
                </div>
                
                <form className="space-y-6" onSubmit={(e) => {
                  e.preventDefault();
                  // Handle form submission - redirect to Calendly
                  window.open('https://calendly.com/prachi-hr/virtual-hr-consultation', '_blank');
                }}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="input-group">
                      <label className="block text-sm font-medium text-white/70 mb-2">Your Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter your full name" 
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/20 transition-all duration-300"
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label className="block text-sm font-medium text-white/70 mb-2">Company Size</label>
                      <select className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/20 transition-all duration-300" required>
                        <option value="" className="text-white">Select size</option>
                        <option value="1-10" className="text-white">1-10 employees</option>
                        <option value="11-50" className="text-white">11-50 employees</option>
                        <option value="51-200" className="text-white">51-200 employees</option>
                        <option value="200+" className="text-white">200+ employees</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="input-group">
                    <label className="block text-sm font-medium text-white/70 mb-3">Primary HR Need</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'compliance', title: 'HR Compliance', icon: <Shield className="w-5 h-5" /> },
                        { id: 'posh', title: 'POSH Training', icon: <Users className="w-5 h-5" /> },
                        { id: 'recruitment', title: 'Recruitment', icon: <Users2 className="w-5 h-5" /> },
                        { id: 'engagement', title: 'Employee Engagement', icon: <Heart className="w-5 h-5" /> }
                      ].map((need) => (
                        <motion.button
                          key={need.id}
                          type="button"
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                            selectedNeed === need.id 
                              ? 'border-white bg-white/10' 
                              : 'border-white/20 bg-white/5 hover:bg-white/10'
                          }`}
                          onClick={() => setSelectedNeed(need.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              selectedNeed === need.id ? 'bg-white text-white' : 'bg-white/10 text-white/70'
                            }`}>
                              {need.icon}
                            </div>
                            <span className={`font-medium ${
                              selectedNeed === need.id ? 'text-white' : 'text-white/70'
                            }`}>
                              {need.title}
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="input-group">
                    <label className="block text-sm font-medium text-white/70 mb-2">Message</label>
                    <textarea 
                      placeholder="Tell us about your HR challenges and goals..." 
                      rows="4"
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/20 transition-all duration-300 resize-none"
                    ></textarea>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button 
                      type="submit"
                      className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-3"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Get Free Consultation</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                    <motion.button 
                      type="button"
                      onClick={() => window.open('https://calendly.com/prachi-hr/virtual-hr-consultation', '_blank')}
                      className="px-6 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-3"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Schedule Call</span>
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        <HireWithPrachiFooter />
      </div>
    </>
  );
};

export default PrachiPortfolio;