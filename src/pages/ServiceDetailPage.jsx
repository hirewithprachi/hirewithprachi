import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import HireWithPrachiTopBar from '../components/hirable/HirableTopBar';
import HireWithPrachiHeader from '../components/hirable/HirableHeader';
import HireWithPrachiFooter from '../components/hirable/HirableFooter';
import GPT4oMiniChatbot from '../components/GPT4oMiniChatbot';
import ScrollProgressBar from '../components/ScrollProgressBar';
import BrochureDownloadModal from '../components/BrochureDownloadModal';
import ServiceVideo from '../components/ServiceVideo';
import { CheckCircle, Users, Shield, Zap, Award, MessageSquare, BarChart2, Search, Phone, Mail, ChevronDown, ChevronUp, Download, Calendar, MessageCircle, FileText, Gavel, AlertTriangle, Target, UserPlus, Briefcase, Heart, Smile, Building, DollarSign, Settings, Brain, Presentation, HeartHandshake, Star, Clock, MapPin, Globe, TrendingUp, CheckSquare, ArrowRight, BookOpen, Lightbulb, Target as TargetIcon, Zap as ZapIcon, Shield as ShieldIcon } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import analytics from '../lib/analytics';

// Enhanced service data with SEO-optimized content
const getServiceData = (serviceId) => {
  const service = servicesData.services.find(s => s.id === serviceId);
  if (!service) return null;
  
  // SEO-optimized content mapping
  const seoContent = {
    'virtual-hr-management': {
      title: 'Virtual HR Management Services India | Remote HR Solutions | Hire With Prachi',
      description: 'Professional virtual HR management services in India. Complete remote HR solutions including policy development, recruitment, compliance & employee management. Expert HR consultants available 24/7.',
      keywords: 'virtual HR management, remote HR services, HR outsourcing India, virtual HR consultant, HR management services, remote HR solutions, HR consulting services, virtual HR department',
      longDescription: 'Transform your business with our comprehensive virtual HR management services in India. Our expert HR consultants provide complete remote HR solutions including policy development, recruitment process outsourcing, compliance management, and employee lifecycle management. With over 8+ years of experience, we help businesses of all sizes establish professional HR frameworks without the overhead of maintaining an in-house HR department.',
      benefits: [
        '24/7 HR support and consultation with dedicated HR professionals',
        'Cost-effective alternative to in-house HR department (Save 60% on HR costs)',
        'Scalable solutions that grow with your business needs',
        'Compliance with Indian labor laws and regulations',
        'Access to experienced HR consultants and specialists',
        'Secure, cloud-based HR management systems'
      ],
      features: [
        'Complete employee lifecycle management from hiring to exit',
        'HR policy development and implementation',
        'Recruitment and talent acquisition support',
        'Performance management and appraisal systems',
        'Employee relations and conflict resolution',
        'HR compliance and legal documentation',
        'Payroll coordination and benefits administration',
        'Training and development program management'
      ],
      process: [
        'Initial HR assessment and requirement gathering',
        'Customized HR framework design and implementation',
        'Policy development and legal compliance setup',
        'System integration and team training',
        'Ongoing HR support and consultation services',
        'Regular reviews and process optimization'
      ],
      pricing: 'Starting from ₹30,000 per month',
      location: 'Available across India - Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, Kolkata',
      industry: 'Suitable for startups, SMEs, and large enterprises across all industries'
    },
    'hr-policy-development': {
      title: 'HR Policy Development Services India | Employee Handbook Creation | Hire With Prachi',
      description: 'Expert HR policy development services in India. Create comprehensive employee handbooks, workplace policies & compliance documentation. Legal-compliant HR policies for Indian businesses.',
      keywords: 'HR policy development, employee handbook, workplace policies, HR policies India, employee manual, HR compliance, labor law compliance, HR documentation',
      longDescription: 'Establish a strong HR foundation with our comprehensive HR policy development services in India. Our expert team creates legally compliant HR policies, employee handbooks, and workplace documentation that align with Indian labor laws and industry best practices. We ensure your organization has clear, comprehensive policies that protect both employees and employers while fostering a positive workplace culture.',
      benefits: [
        'Legally compliant policy frameworks aligned with Indian labor laws',
        'Customized policies tailored to your business needs and industry',
        'Regular updates and maintenance to ensure ongoing compliance',
        'Comprehensive employee handbook creation and documentation',
        'Expert legal review and compliance verification',
        'Implementation support and employee training programs'
      ],
      features: [
        'Employee handbook development and customization',
        'Code of conduct and workplace behavior policies',
        'Leave and attendance policy creation',
        'Performance management and appraisal policies',
        'Compensation and benefits policy documentation',
        'Disciplinary and grievance handling procedures',
        'Health and safety policy development',
        'Data protection and privacy policy creation'
      ],
      process: [
        'Requirement gathering and business analysis',
        'Policy drafting and customization',
        'Legal review and compliance verification',
        'Stakeholder feedback and policy refinement',
        'Implementation support and training',
        'Ongoing policy maintenance and updates'
      ],
      pricing: 'Starting from ₹25,000',
      location: 'Pan India - Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Pune, Kolkata',
      industry: 'All industries including IT, manufacturing, healthcare, education, retail'
    },
    'recruitment-process-outsourcing': {
      title: 'Recruitment Process Outsourcing India | RPO Services | Talent Acquisition | Hire With Prachi',
      description: 'Professional recruitment process outsourcing (RPO) services in India. End-to-end talent acquisition, candidate sourcing, screening & hiring solutions. 50% faster hiring with 95% success rate.',
      keywords: 'recruitment process outsourcing, RPO services, talent acquisition, hiring services, recruitment outsourcing, candidate sourcing, HR recruitment, hiring solutions India',
      longDescription: 'Accelerate your hiring process with our professional recruitment process outsourcing (RPO) services in India. Our expert recruitment team handles the complete talent acquisition process from job analysis to onboarding, ensuring you get the best candidates while reducing time-to-hire by 50%. With access to extensive talent pools and proven screening methodologies, we deliver quality hires with a 95% success rate.',
      benefits: [
        '50% faster hiring cycles compared to traditional methods',
        'Access to extensive talent pools and professional networks',
        'Reduced recruitment costs and improved ROI',
        '95% success rate with replacement guarantees',
        'Comprehensive candidate screening and assessment',
        'Scalable solutions for all hiring volumes'
      ],
      features: [
        'Job analysis and description optimization',
        'Multi-channel candidate sourcing and recruitment',
        'Comprehensive candidate screening and assessment',
        'Interview coordination and candidate management',
        'Background verification and reference checks',
        'Offer management and negotiation support',
        'Onboarding coordination and integration',
        'Employer branding and recruitment marketing'
      ],
      process: [
        'Job analysis and requirement understanding',
        'Strategic sourcing and candidate identification',
        'Multi-stage screening and assessment',
        'Interview coordination and candidate evaluation',
        'Selection and offer management',
        'Onboarding support and integration'
      ],
      pricing: 'Starting from ₹15,000 per hire',
      location: 'Nationwide coverage - All major cities in India',
      industry: 'IT, manufacturing, finance, healthcare, startups, corporate sectors'
    },
    'employee-onboarding': {
      title: 'Employee Onboarding Services India | New Hire Integration | HR Onboarding | Hire With Prachi',
      description: 'Professional employee onboarding services in India. Structured new hire integration programs, training coordination & digital onboarding solutions. Improve retention with effective onboarding.',
      keywords: 'employee onboarding, new hire onboarding, onboarding services, HR onboarding, employee integration, onboarding programs, digital onboarding, new employee training',
      longDescription: 'Set your new hires up for success with our comprehensive employee onboarding services in India. Our structured onboarding programs ensure smooth integration, faster productivity, and improved employee retention. From digital onboarding systems to personalized training programs, we create welcoming experiences that help new employees become productive team members quickly while feeling valued and supported.',
      benefits: [
        'Improved employee retention and satisfaction rates',
        'Faster productivity ramp-up and time-to-value',
        'Enhanced employee experience and engagement',
        'Reduced turnover and associated costs',
        'Consistent onboarding experience across all hires',
        'Digital-first approach with remote onboarding capabilities'
      ],
      features: [
        'Comprehensive onboarding program design and customization',
        'Digital onboarding system setup and management',
        'Orientation and training coordination',
        'System access setup and IT coordination',
        'Policy familiarization and compliance training',
        'Integration support and buddy system coordination',
        'Performance tracking and feedback collection',
        'Onboarding success measurement and optimization'
      ],
      process: [
        'Onboarding program design and customization',
        'Pre-boarding communication and preparation',
        'Orientation and training coordination',
        'System access and documentation setup',
        'Integration and support during initial period',
        'Feedback collection and program optimization'
      ],
      pricing: 'Starting from ₹8,000 per hire',
      location: 'Available across India - All major cities and remote locations',
      industry: 'All industries with customizable programs'
    }
  };

  const seoData = seoContent[serviceId] || {
    title: `${service.title} Services India | Professional HR Solutions | Hire With Prachi`,
    description: `${service.description} Expert ${service.title.toLowerCase()} services in India. Professional HR solutions with 8+ years experience. Get customized ${service.title.toLowerCase()} services for your business.`,
    keywords: `${service.title.toLowerCase()}, HR services India, ${service.title.toLowerCase()} services, HR consulting, human resources, HR solutions`,
    longDescription: `${service.description} Our expert team provides comprehensive ${service.title.toLowerCase()} services in India with over 8 years of experience in human resources management. We deliver customized solutions that align with your business needs and industry requirements.`,
    benefits: service.benefits,
    features: service.features,
    process: [
      'Initial consultation and requirement analysis',
      'Service design and customization',
      'Implementation and delivery',
      'Training and support',
      'Ongoing maintenance and optimization'
    ],
    pricing: 'Contact us for customized pricing',
    location: 'Available across India',
    industry: 'All industries'
  };
  
  return {
    icon: service.icon,
    title: service.title,
    description: service.description,
    longDescription: seoData.longDescription,
    items: seoData.features,
    benefits: seoData.benefits,
    category: service.category,
    imageUrl: service.imageUrl,
    seoData: seoData
  };
};

// Enhanced FAQ data with SEO-optimized questions and answers
const serviceFaqs = {
  'virtual-hr-management': [
    { 
      q: 'What is virtual HR management and how does it work?', 
      a: 'Virtual HR management provides complete HR services remotely through dedicated HR professionals who manage all aspects of human resources using digital tools and secure platforms. Our virtual HR services include employee lifecycle management, policy development, recruitment support, compliance management, and 24/7 HR consultation. We use enterprise-grade security protocols and cloud-based HRIS platforms to ensure data protection while delivering the same quality as in-house HR departments.' 
    },
    { 
      q: 'How much do virtual HR management services cost in India?', 
      a: 'Our virtual HR management services start at ₹30,000 per month with flexible pricing based on organization size and service requirements. We offer scalable solutions for growing businesses, with packages ranging from basic HR support to comprehensive virtual HR departments. Our pricing includes 24/7 HR support, policy development, compliance management, and access to our team of experienced HR professionals.' 
    },
    { 
      q: 'Is virtual HR management suitable for startups and small businesses?', 
      a: 'Yes, virtual HR management is ideal for startups and small businesses as it provides cost-effective HR solutions without the overhead of maintaining an in-house HR department. Our scalable frameworks grow with your business, offering essential HR services like policy development, recruitment support, and compliance management at a fraction of the cost of hiring full-time HR staff.' 
    },
    { 
      q: 'What HR services are included in virtual HR management?', 
      a: 'Our virtual HR management services include complete employee lifecycle management, HR policy development and implementation, recruitment and talent acquisition support, performance management systems, employee relations and conflict resolution, HR compliance and legal documentation, payroll coordination, and training program management. We also provide 24/7 HR consultation and support.' 
    },
    { 
      q: 'How do you ensure data security in virtual HR management?', 
      a: 'We use enterprise-grade security protocols, encrypted communication channels, and secure HRIS platforms to ensure complete data protection and confidentiality. Our systems comply with international security standards and Indian data protection regulations. We implement strict access controls, regular security audits, and secure data backup procedures to protect all HR information.' 
    },
    { 
      q: 'Can virtual HR management handle international employees?', 
      a: 'Yes, our virtual HR management services can handle international employees and remote teams. We provide support for international hiring, compliance with local employment laws, visa documentation, cultural orientation, and cross-border HR management. Our team has experience managing HR for companies with global operations and remote workforces.' 
    }
  ],
  'hr-policy-development': [
    { 
      q: 'What HR policies do you develop for Indian businesses?', 
      a: 'We create comprehensive HR policies including employee handbooks, code of conduct, leave policies, performance management policies, and all compliance documentation required by Indian labor laws.' },
    { q: 'How long does policy development take?', a: 'Typically 2-4 weeks depending on the complexity and number of policies required. We ensure all policies are legally compliant and customized to your business needs.' },
    { q: 'Do you update existing policies?', a: 'Yes, we review and update existing policies to ensure they remain compliant with current laws and industry best practices. We provide regular policy maintenance services.' },
    { q: 'Are policies legally compliant?', a: 'All our policies are reviewed by legal experts to ensure compliance with Indian labor laws including the Industrial Disputes Act, Factories Act, and other relevant legislation.' },
    { q: 'How do you implement policies?', a: 'We provide comprehensive implementation support including employee training, communication strategies, and ongoing guidance to ensure smooth policy adoption.' },
    { q: 'What is the cost of policy development?', a: 'Policy development services start at ₹25,000 with pricing based on the number and complexity of policies required. We offer package deals for comprehensive policy frameworks.' }
  ],
  'recruitment-process-outsourcing': [
    { q: 'What recruitment services do you offer?', a: 'We handle end-to-end recruitment from job posting to onboarding, including candidate sourcing, screening, interviewing, background verification, and offer management.' },
    { q: 'What industries do you recruit for?', a: 'We recruit across all industries including IT, manufacturing, finance, healthcare, startups, and corporate sectors. Our extensive network covers diverse talent pools.' },
    { q: 'How fast can you fill positions?', a: 'We typically fill positions 50% faster than traditional methods, with most roles filled within 2-4 weeks depending on position complexity and market conditions.' },
    { q: 'Do you guarantee candidate quality?', a: 'Yes, we offer a 95% success rate with replacement guarantees if candidates don\'t meet expectations. Our rigorous screening process ensures quality hires.' },
    { q: 'What is your recruitment process?', a: 'Our process includes job analysis, targeted sourcing, multi-stage screening, competency-based interviews, reference checks, and comprehensive onboarding support.' },
    { q: 'How much do recruitment services cost?', a: 'Our recruitment services start at ₹15,000 per hire with flexible pricing based on position level and requirements. We offer volume discounts for multiple hires.' }
  ],
  'employee-onboarding': [
    { q: 'Is onboarding remote-friendly?', a: 'Yes, our onboarding process is fully digital and remote-ready with virtual orientation sessions, online training modules, and digital documentation systems.' },
    { q: 'How long does onboarding take?', a: 'Typically 1-2 days, customized per client requirements. We ensure new hires are productive quickly while feeling welcomed and supported.' },
    { q: 'What is included in onboarding?', a: 'Our onboarding includes orientation programs, training coordination, system access setup, policy familiarization, and integration support to ensure smooth transition.' },
    { q: 'Do you handle international onboarding?', a: 'Yes, we handle onboarding for international hires including visa documentation, cultural orientation, and compliance with local employment laws.' },
    { q: 'How do you measure onboarding success?', a: 'We track onboarding success through employee satisfaction surveys, time-to-productivity metrics, and retention rates to ensure effective onboarding.' },
    { q: 'Can you customize onboarding programs?', a: 'Yes, we customize onboarding programs based on your company culture, industry requirements, and specific role needs to ensure relevance and effectiveness.' }
  ],
  'performance-management': [
    { q: 'How do you measure performance?', a: 'We use KPI-based systems, 360-degree feedback, regular performance reviews, and data-driven metrics to provide comprehensive performance assessment.' },
    { q: 'What performance tools do you use?', a: 'We implement modern performance management tools and customize them to your needs, including goal-setting frameworks and development planning systems.' },
    { q: 'How often are performance reviews conducted?', a: 'We recommend quarterly performance reviews with monthly check-ins, though frequency can be customized based on your organizational needs.' },
    { q: 'Do you provide performance training?', a: 'Yes, we provide training for managers and employees on effective performance management, feedback techniques, and goal-setting methodologies.' },
    { q: 'How do you handle underperforming employees?', a: 'We provide structured improvement plans, coaching support, and clear action steps to help underperforming employees improve and succeed.' },
    { q: 'What is the cost of performance management services?', a: 'Performance management services start at ₹20,000 per month with pricing based on organization size and complexity of performance systems.' }
  ],
  'compensation-benefits': [
    { q: 'How do you benchmark salaries?', a: 'We use comprehensive market data, industry surveys, and regional analysis to provide accurate salary benchmarking for all positions and levels.' },
    { q: 'What benefits do you recommend?', a: 'We design competitive benefits packages including health insurance, retirement plans, wellness programs, and other perks based on industry standards and employee preferences.' },
    { q: 'How do you ensure pay equity?', a: 'We conduct pay equity audits, analyze compensation data, and provide recommendations to ensure fair and equitable compensation across all demographics.' },
    { q: 'Do you handle compensation negotiations?', a: 'Yes, we provide guidance on compensation negotiations, offer structuring, and help develop competitive compensation strategies.' },
    { q: 'How often should compensation be reviewed?', a: 'We recommend annual compensation reviews with market adjustments, though this can vary based on industry trends and organizational needs.' },
    { q: 'What is the cost of compensation services?', a: 'Compensation and benefits services start at ₹25,000 per month with pricing based on organization size and complexity of compensation structures.' }
  ],
  'employee-relations': [
    { q: 'How do you handle employee conflicts?', a: 'We provide structured conflict resolution processes, mediation services, and clear communication channels to resolve workplace conflicts effectively.' },
    { q: 'What is your approach to workplace investigations?', a: 'We conduct thorough, impartial investigations following legal guidelines and best practices to ensure fair and objective outcomes.' },
    { q: 'How do you improve workplace culture?', a: 'We assess current culture, identify improvement areas, and implement strategies including recognition programs, communication frameworks, and team-building activities.' },
    { q: 'Do you provide employee counseling?', a: 'Yes, we provide confidential employee counseling services and support programs to address workplace challenges and personal issues affecting work performance.' },
    { q: 'How do you prevent workplace issues?', a: 'We implement proactive measures including clear policies, regular training, open communication channels, and early intervention strategies.' },
    { q: 'What is the cost of employee relations services?', a: 'Employee relations services start at ₹18,000 per month with pricing based on organization size and complexity of employee relations needs.' }
  ],
  'hr-technology-implementation': [
    { q: 'What HR technologies do you recommend?', a: 'We recommend HRIS, ATS, performance management tools, and employee self-service platforms based on your specific needs and budget.' },
    { q: 'How long does implementation take?', a: 'Implementation typically takes 4-8 weeks depending on system complexity and customization requirements.' },
    { q: 'Do you provide training and support?', a: 'Yes, we provide comprehensive training for all users and ongoing technical support to ensure successful system adoption.' },
    { q: 'How do you ensure data migration?', a: 'We handle secure data migration from existing systems with thorough testing and validation to ensure data integrity.' },
    { q: 'What is the cost of HR technology implementation?', a: 'HR technology implementation services start at ₹50,000 with pricing based on system complexity and customization requirements.' },
    { q: 'Do you provide ongoing maintenance?', a: 'Yes, we provide ongoing system maintenance, updates, and optimization to ensure your HR technology continues to meet your needs.' }
  ],
  'hr-audit-compliance': [
    { q: 'What does an HR audit include?', a: 'Our HR audits include policy review, compliance assessment, process evaluation, risk identification, and recommendations for improvement.' },
    { q: 'How often should audits be conducted?', a: 'We recommend annual HR audits with quarterly reviews for high-risk areas to ensure ongoing compliance.' },
    { q: 'What compliance areas do you cover?', a: 'We cover all Indian labor law compliance including the Industrial Disputes Act, Factories Act, Minimum Wages Act, and other relevant legislation.' },
    { q: 'How do you handle compliance violations?', a: 'We identify compliance gaps and provide immediate action plans to rectify issues and prevent future violations.' },
    { q: 'Do you provide compliance training?', a: 'Yes, we provide comprehensive compliance training for HR teams and managers to ensure understanding of legal requirements.' },
    { q: 'What is the cost of HR audit services?', a: 'HR audit services start at ₹35,000 with pricing based on organization size and complexity of HR operations.' }
  ]
};

// Service process steps
const serviceProcess = {
  'virtual-hr-management': [
    'Initial HR assessment and requirement gathering',
    'Policy development and implementation',
    'System setup and team training',
    'Ongoing HR support and consultation',
    'Regular reviews and process optimization'
  ],
  'hr-policy-development': [
    'Requirement gathering and analysis',
    'Policy drafting and customization',
    'Legal review and compliance check',
    'Implementation support and training',
    'Ongoing policy maintenance and updates'
  ],
  'recruitment-process-outsourcing': [
    'Job analysis and description optimization',
    'Candidate sourcing and screening',
    'Interview coordination and assessment',
    'Selection and offer management',
    'Onboarding support and integration'
  ],
  'employee-onboarding': [
    'Onboarding program design',
    'Orientation and training coordination',
    'System access and documentation setup',
    'Integration and support',
    'Feedback and program optimization'
  ],
  'performance-management': [
    'Performance system design',
    'Goal setting and KPI development',
    'Review process implementation',
    'Training and support',
    'Ongoing optimization and feedback'
  ],
  'compensation-benefits': [
    'Market analysis and benchmarking',
    'Compensation structure design',
    'Benefits package development',
    'Implementation and communication',
    'Regular review and updates'
  ],
  'employee-relations': [
    'Culture assessment and analysis',
    'Policy and process development',
    'Training and communication',
    'Ongoing support and mediation',
    'Regular monitoring and improvement'
  ],
  'hr-technology-implementation': [
    'Technology assessment and selection',
    'System design and customization',
    'Implementation and data migration',
    'Training and user adoption',
    'Ongoing support and optimization'
  ],
  'hr-audit-compliance': [
    'Comprehensive audit planning',
    'Policy and process review',
    'Compliance gap analysis',
    'Remediation planning and implementation',
    'Ongoing monitoring and support'
  ]
};

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const service = getServiceData(serviceId);
  const [openFaq, setOpenFaq] = useState(null);
  const [showBrochureModal, setShowBrochureModal] = useState(false);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-6">The requested service could not be found.</p>
          <Link to="/services" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const faqs = serviceFaqs[serviceId] || [
    { q: 'What services do you offer?', a: 'We offer comprehensive HR services including policy development, recruitment, payroll, and employee management tailored to your specific needs.' },
    { q: 'How can I get started?', a: 'Contact us for a free consultation to discuss your specific HR needs and requirements. We\'ll provide a customized solution for your organization.' },
    { q: 'What is your pricing structure?', a: 'Our pricing is flexible and based on your organization size, service requirements, and complexity. We offer competitive rates starting from ₹15,000 per month.' },
    { q: 'Do you work with startups?', a: 'Yes, we specialize in helping startups build strong HR foundations with scalable solutions that grow with your business.' },
    { q: 'How do you ensure quality?', a: 'We maintain high quality standards through experienced professionals, proven methodologies, and continuous improvement processes.' },
    { q: 'What is your turnaround time?', a: 'Our turnaround times vary by service but typically range from 1-4 weeks depending on complexity and requirements.' }
  ];

  const process = service.seoData?.process || [
    'Initial consultation and requirement analysis',
    'Service design and customization',
    'Implementation and delivery',
    'Training and support',
    'Ongoing maintenance and optimization'
  ];

  // Get video data for this service
  const getVideoData = () => {
    try {
      const savedVideoData = localStorage.getItem('serviceVideos');
      if (savedVideoData) {
        const videoData = JSON.parse(savedVideoData);
        return videoData[serviceId] || null;
      }
    } catch (error) {
      console.error('Error loading video data:', error);
    }
    return null;
  };

  const videoData = getVideoData();

  // Track service page view
  useEffect(() => {
    if (service) {
      analytics.trackServiceView(serviceId, service.title);
    }
  }, [serviceId, service]);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleBrochureDownload = () => {
    setShowBrochureModal(true);
  };

  // Get all services for sidebar
  const allServices = servicesData.services.slice(0, 6); // Show first 6 services

  // Enhanced SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.seoData?.title || service.title,
    "description": service.seoData?.description || service.description,
    "keywords": service.seoData?.keywords,
    "provider": {
      "@type": "ProfessionalService",
      "name": "Hire With Prachi",
      "alternateName": "Prachi Shrivastava HR Consulting",
      "description": "Professional HR consulting services in India with 8+ years of experience",
      "url": "https://www.hirewithprachi.com",
      "telephone": "+91-8740889927",
      "email": "info@hirewithprachi.com",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN",
        "addressRegion": "Maharashtra",
        "addressLocality": "Mumbai"
      },
      "founder": {
        "@type": "Person",
        "name": "Prachi Shrivastava",
        "jobTitle": "Virtual HR Consultant",
        "description": "Expert HR consultant with 8+ years of experience in human resources management"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "HR Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Virtual HR Management",
              "url": "https://www.hirewithprachi.com/services/virtual-hr-management"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "HR Policy Development",
              "url": "https://www.hirewithprachi.com/services/hr-policy-development"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Recruitment Process Outsourcing",
              "url": "https://hirewithprachi.com/services/recruitment-process-outsourcing"
            }
          }
        ]
      }
    },
    "serviceType": service.title,
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `https://hirewithprachi.com/services/${serviceId}`,
      "servicePhone": "+91-8740889927"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${service.title} Services`,
      "itemListElement": service.items.map(item => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": item,
          "description": `${item} as part of ${service.title}`
        }
      }))
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah Johnson"
        },
        "reviewBody": "Excellent HR services. Prachi's team helped us set up complete HR infrastructure for our startup."
      }
    ]
  };

  // Local Business Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Hire With Prachi",
    "description": "Professional HR consulting services in India",
    "url": "https://hirewithprachi.com",
    "telephone": "+91-8740889927",
    "email": "info@hirewithprachi.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressRegion": "Maharashtra",
      "addressLocality": "Mumbai"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "19.0760",
      "longitude": "72.8777"
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "₹₹",
    "serviceArea": {
      "@type": "Country",
      "name": "India"
    }
  };

  return (
    <>
      <Helmet>
        <title>{service.seoData?.title || `${service.title} - Professional HR Services | Hire With Prachi`}</title>
        <meta name="description" content={service.seoData?.description || `${service.description} Expert ${service.title.toLowerCase()} services for startups and SMEs in India. Book free consultation with Prachi Shrivastava today!`} />
        <meta name="keywords" content={service.seoData?.keywords || `${service.title}, HR services, virtual HR, HR consulting, ${service.category}`} />
        
        {/* Enhanced Meta Tags */}
        <meta name="author" content="Prachi Shrivastava" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={service.seoData?.title || `${service.title} - Professional HR Services | Hire With Prachi`} />
        <meta property="og:description" content={service.seoData?.description || service.description} />
        <meta property="og:url" content={`https://hirewithprachi.com/services/${serviceId}`} />
        <meta property="og:site_name" content="Hire With Prachi" />
        <meta property="og:image" content={service.imageUrl || "https://hirewithprachi.com/assets/images/og-image.jpg"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={service.seoData?.title || `${service.title} - Professional HR Services | Hire With Prachi`} />
        <meta name="twitter:description" content={service.seoData?.description || service.description} />
        <meta name="twitter:image" content={service.imageUrl || "https://hirewithprachi.com/assets/images/twitter-image.jpg"} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://hirewithprachi.com/services/${serviceId}`} />
        
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Mumbai, Maharashtra, India" />
        <meta name="geo.position" content="19.0760;72.8777" />
        <meta name="ICBM" content="19.0760, 72.8777" />
        
        {/* Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        
        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": `What ${service.title} services do you offer?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `We offer comprehensive ${service.title.toLowerCase()} services including ${service.items.slice(0, 3).join(', ')} for startups and SMEs in India.`
                }
              },
              {
                "@type": "Question",
                "name": `How much do ${service.title} services cost?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `Our ${service.title.toLowerCase()} services start from ₹${service.price || '25K'} per month with flexible pricing plans for businesses of all sizes.`
                }
              },
              {
                "@type": "Question",
                "name": `What is the process for ${service.title} services?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `Our ${service.title.toLowerCase()} process includes initial consultation, needs assessment, customized solution development, implementation, and ongoing support.`
                }
              },
              {
                "@type": "Question",
                "name": `Do you provide ${service.title} services remotely?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `Yes, we provide all ${service.title.toLowerCase()} services remotely through virtual consultations, making it convenient for businesses across India.`
                }
              }
            ]
          })}
        </script>
        
        {/* Review Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            "itemReviewed": {
              "@type": "ProfessionalService",
              "name": `${service.title} Services`,
              "provider": {
                "@type": "Person",
                "name": "Prachi Shrivastava",
                "jobTitle": "Virtual HR Consultant",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "IN"
                }
              }
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5",
              "worstRating": "1"
            },
            "author": {
              "@type": "Person",
              "name": "Satisfied Client"
            },
            "reviewBody": `Excellent ${service.title.toLowerCase()} services provided by Prachi Shrivastava. Professional, efficient, and highly recommended for any business in India.`
          })}
        </script>
        
        {/* Video Schema */}
        {videoData && videoData.isActive && videoData.videoUrl && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": `${service.title} Services Overview`,
              "description": `Learn about our comprehensive ${service.title.toLowerCase()} services for startups and SMEs in India. Expert guidance by Prachi Shrivastava.`,
              "thumbnailUrl": service.imageUrl || "https://hirewithprachi.com/assets/images/video-thumbnail.jpg",
              "uploadDate": "2024-01-15",
              "duration": "PT3M30S",
              "contentUrl": videoData.videoUrl,
              "embedUrl": videoData.videoUrl,
              "publisher": {
                "@type": "Organization",
                "name": "Prachi Shrivastava Virtual HR Services",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://hirewithprachi.com/images/prachi-logo.webp"
                }
              },
              "creator": {
                "@type": "Person",
                "name": "Prachi Shrivastava",
                "jobTitle": "Virtual HR Consultant"
              }
            })}
          </script>
        )}
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://hirewithprachi.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://hirewithprachi.com/services"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": service.title,
                "item": `https://hirewithprachi.com/services/${serviceId}`
              }
            ]
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-white" role="main">
        <ScrollProgressBar />
        <HireWithPrachiTopBar />
        <HireWithPrachiHeader />
        
        {/* Enhanced Page Header Section - Mobile Optimized */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 md:w-80 md:h-80 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
            {/* Breadcrumb - Mobile Optimized */}
            <nav className="mb-6 md:mb-8">
              <ol className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm flex-wrap">
                <li>
                  <Link to="/" className="text-blue-200 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-blue-300">/</li>
                <li>
                  <Link to="/services" className="text-blue-200 hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li className="text-blue-300">/</li>
                <li className="text-white font-medium truncate">{service.title}</li>
              </ol>
            </nav>
            
            {/* Service Title with Enhanced Design - Mobile Optimized */}
            <div className="max-w-5xl">
              <div className="inline-flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full border border-white/20 mb-4 md:mb-6">
                <span className="text-xl md:text-2xl">{service.icon}</span>
                <span className="text-blue-200 text-xs md:text-sm font-semibold uppercase tracking-widest">{service.category}</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                {service.title.split(' ').slice(0, -1).join(' ')} 
                <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                  {' ' + service.title.split(' ').slice(-1)}
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 leading-relaxed mb-6 md:mb-8 max-w-4xl">
                {service.description}
              </p>
              
              {/* Key Benefits - Mobile Optimized */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
                {service.benefits.slice(0, 3).map((benefit, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
                    <Award className="w-6 h-6 md:w-8 md:h-8 text-blue-300 mb-2" />
                    <h3 className="font-semibold text-white mb-1 text-sm md:text-base">{benefit.split(' ').slice(0, 2).join(' ')}</h3>
                    <p className="text-blue-200 text-xs md:text-sm">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8 md:space-y-12">
              {/* Hero Image Section with Real Image - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={service.imageUrl || "/assets/images/services/hr-compliance-service.webp"} 
                    alt={`${service.title} - Expert ${service.title.toLowerCase()} services for startups and SMEs in India by Prachi Shrivastava`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Service Video Section */}
              {videoData && videoData.isActive && videoData.videoUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden"
                >
                  <ServiceVideo
                    serviceId={serviceId}
                    videoUrl={videoData.videoUrl}
                    title={videoData.title}
                    description={videoData.description}
                  />
                </motion.div>
              )}

              {/* Enhanced Service Overview Section with SEO Content - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8"
              >
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                  Professional {service.title} Services in India
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
                  <div>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4 md:mb-6">
                      {service.longDescription}
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4 md:mb-6">
                      As a leading <strong>HR consulting firm in India</strong>, our expert team brings over 8+ years of experience in {service.title.toLowerCase()} to help your organization achieve optimal results. We combine industry best practices with innovative approaches to deliver solutions that drive success and growth. Whether you're a <Link to="/services/startup-hr-foundation" className="text-blue-600 hover:text-blue-800 underline">startup looking for HR foundation</Link> or an established company seeking <Link to="/services/hr-policy-development" className="text-blue-600 hover:text-blue-800 underline">HR policy development</Link>, we provide customized solutions.
                    </p>
                    
                    {/* Enhanced Service Details */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Comprehensive {service.title} Solutions</h3>
                      <p className="text-gray-700 text-sm mb-3">
                        Our {service.title.toLowerCase()} services are tailored specifically for the Indian business landscape, addressing unique challenges faced by startups, SMEs, and established enterprises. We provide end-to-end solutions that ensure compliance, efficiency, and growth.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>India-specific compliance</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Remote/virtual delivery</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Cost-effective solutions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Expert consultation</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* SEO-optimized content with internal links */}
                    <div className="bg-blue-50 rounded-lg p-4 mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Why Choose Our {service.title} Services?</h3>
                      <p className="text-gray-700 text-sm mb-3">
                        Our {service.title.toLowerCase()} services are designed to address the unique challenges faced by Indian businesses. We understand the complexities of <Link to="/services/hr-audit-compliance" className="text-blue-600 hover:text-blue-800 underline">HR compliance in India</Link> and provide solutions that ensure legal adherence while optimizing your HR processes.
                      </p>
                    </div>
                    
                    {/* Voice Search Optimization - FAQ Section */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Frequently Asked Questions</h3>
                      <div className="space-y-3">
                        <div className="border-l-4 border-purple-500 pl-3">
                          <h4 className="font-medium text-gray-900 mb-1">What {service.title.toLowerCase()} services do you offer?</h4>
                          <p className="text-gray-700 text-sm">We offer comprehensive {service.title.toLowerCase()} services including {service.items.slice(0, 3).join(', ')} for startups and SMEs across India.</p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-3">
                          <h4 className="font-medium text-gray-900 mb-1">How much do {service.title.toLowerCase()} services cost?</h4>
                          <p className="text-gray-700 text-sm">Our {service.title.toLowerCase()} services start from ₹{service.price || '25K'} per month with flexible pricing plans for businesses of all sizes.</p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-3">
                          <h4 className="font-medium text-gray-900 mb-1">Do you provide {service.title.toLowerCase()} services remotely?</h4>
                          <p className="text-gray-700 text-sm">Yes, we provide all {service.title.toLowerCase()} services remotely through virtual consultations, making it convenient for businesses across India.</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Related Services Section */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Related HR Services</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Link to="/services/virtual-hr-management" className="text-blue-600 hover:text-blue-800 underline text-sm">
                          🏢 Virtual HR Management
                        </Link>
                        <Link to="/services/hr-policy-development" className="text-blue-600 hover:text-blue-800 underline text-sm">
                          📋 HR Policy Development
                        </Link>
                        <Link to="/services/recruitment-process-outsourcing" className="text-blue-600 hover:text-blue-800 underline text-sm">
                          👥 Recruitment Services
                        </Link>
                        <Link to="/services/employee-engagement" className="text-blue-600 hover:text-blue-800 underline text-sm">
                          💪 Employee Engagement
                        </Link>
                        <Link to="/services/hr-technology-implementation" className="text-blue-600 hover:text-blue-800 underline text-sm">
                          🚀 HR Technology
                        </Link>
                        <Link to="/services/hr-analytics" className="text-blue-600 hover:text-blue-800 underline text-sm">
                          📊 HR Analytics
                        </Link>
                      </div>
                    </div>
                    
                    <div className="space-y-2 md:space-y-3">
                      {service.items.map((item, index) => (
                        <div key={index} className="flex items-start gap-2 md:gap-3">
                          <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 text-sm md:text-base">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Key Benefits & ROI</h3>
                    <div className="space-y-2 md:space-y-3">
                      {service.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2 md:gap-3">
                          <Award className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                          <span className="text-gray-700 text-sm md:text-base">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Enhanced CTA Section */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Ready to Transform Your HR?</h4>
                      <p className="text-sm text-gray-600 mb-3">Get started with a free consultation and discover how we can help your business grow.</p>
                      
                      {/* Primary CTA */}
                      <Link to="/contact" className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 mb-3">
                        🚀 Get Free HR Consultation
                      </Link>
                      
                      {/* Secondary CTAs */}
                      <div className="space-y-2">
                                                   <Link to="/contact" className="block w-full bg-white text-blue-600 text-center py-2 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors border border-blue-200">
                             📅 Book Free Consultation
                           </Link>
                        <a href="https://wa.me/918740889927?text=Hi! I'm interested in your HR services. Can you help me?" target="_blank" rel="noopener noreferrer" className="block w-full bg-green-500 text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors">
                          💬 Chat on WhatsApp
                        </a>
                      </div>
                      
                      {/* Trust Indicators */}
                      <div className="mt-3 pt-3 border-t border-blue-200">
                        <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
                          <span>✅ No Hidden Costs</span>
                          <span>✅ Free Assessment</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Why Choose Us Section - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">Why Choose {service.title}?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {[
                    { icon: Users, title: 'Expert Team', desc: 'Experienced HR professionals' },
                    { icon: Shield, title: 'Quality Assurance', desc: 'Proven methodologies' },
                    { icon: Zap, title: 'Fast Delivery', desc: 'Quick turnaround times' },
                    { icon: Award, title: 'Proven Results', desc: 'Track record of success' },
                    { icon: MessageSquare, title: '24/7 Support', desc: 'Round-the-clock assistance' },
                    { icon: BarChart2, title: 'Data-Driven', desc: 'Analytics and insights' }
                  ].map((item, index) => (
                    <div key={index} className="text-center p-4 md:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                        <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-xs md:text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Supporting Imagery Section - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
              >
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl md:rounded-2xl p-6 md:p-8 text-center">
                  <div className="text-4xl md:text-6xl mb-3 md:mb-4">📊</div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Data-Driven Approach</h3>
                  <p className="text-gray-600 text-sm md:text-base">We use analytics and insights to deliver optimal results for your business.</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl md:rounded-2xl p-6 md:p-8 text-center">
                  <div className="text-4xl md:text-6xl mb-3 md:mb-4">🎯</div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Customized Solutions</h3>
                  <p className="text-gray-600 text-sm md:text-base">Tailored strategies that align with your specific business needs and goals.</p>
                </div>
              </motion.div>

              {/* Comprehensive SEO-Optimized Content Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                  Comprehensive {service.title} Solutions for Indian Businesses
                </h2>
                
                {/* Industry-specific content */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Industry Expertise</h3>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">
                    Our {service.title.toLowerCase()} services cater to diverse industries across India. Whether you're in <strong>IT and technology</strong>, <strong>manufacturing</strong>, <strong>healthcare</strong>, <strong>education</strong>, or <strong>startup ecosystem</strong>, we provide industry-specific solutions that address your unique challenges and compliance requirements.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {['IT & Technology', 'Manufacturing', 'Healthcare', 'Education', 'Startups', 'Finance', 'Retail', 'Consulting'].map((industry, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                        <span className="text-sm font-medium text-gray-700">{industry}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Process with enhanced content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">What's Included in Our {service.title} Services</h3>
                    <div className="space-y-2 md:space-y-3">
                      {service.items.map((item, index) => (
                        <div key={index} className="flex items-start gap-2 md:gap-3">
                          <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 text-sm md:text-base">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Our Proven Process</h3>
                    <div className="space-y-3 md:space-y-4">
                      {process.map((step, index) => (
                        <div key={index} className="flex items-start gap-2 md:gap-3">
                          <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-gray-700 text-sm md:text-base">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Related Services Section with Internal Links */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Related HR Services</h3>
                  <p className="text-gray-700 mb-4">
                    Our {service.title.toLowerCase()} services work best when combined with other comprehensive HR solutions. Consider these complementary services:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link to="/services/virtual-hr-management" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Virtual HR Management</h4>
                          <p className="text-sm text-gray-600">Complete remote HR solutions</p>
                        </div>
                      </div>
                    </Link>
                    <Link to="/services/hr-policy-development" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">HR Policy Development</h4>
                          <p className="text-sm text-gray-600">Comprehensive policy frameworks</p>
                        </div>
                      </div>
                    </Link>
                    <Link to="/services/recruitment-process-outsourcing" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <TargetIcon className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Recruitment Outsourcing</h4>
                          <p className="text-sm text-gray-600">End-to-end hiring solutions</p>
                        </div>
                      </div>
                    </Link>
                    <Link to="/services/hr-audit-compliance" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <ShieldIcon className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">HR Audit & Compliance</h4>
                          <p className="text-sm text-gray-600">Legal compliance assurance</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced FAQ Accordion Section with SEO Optimization */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
                  Frequently Asked Questions About {service.title} Services
                </h2>
                
                {/* FAQ Introduction */}
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <p className="text-gray-700 text-sm">
                    Get answers to common questions about our {service.title.toLowerCase()} services in India. Our expert team is here to help you understand how our solutions can benefit your organization.
                  </p>
                </div>
                
                <div className="space-y-3 md:space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full px-4 md:px-6 py-3 md:py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                      >
                        <span className="font-semibold text-gray-900 text-sm md:text-base pr-2">{faq.q}</span>
                        {openFaq === index ? (
                          <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-gray-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-gray-600 flex-shrink-0" />
                        )}
                      </button>
                      {openFaq === index && (
                        <div className="px-4 md:px-6 py-3 md:py-4 bg-white">
                          <p className="text-gray-700 text-sm md:text-base">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Additional Resources */}
                <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Need More Information?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link to="/contact" className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                      <MessageCircle className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Contact Our Experts</h4>
                        <p className="text-sm text-gray-600">Get personalized consultation</p>
                      </div>
                    </Link>
                    <Link to="/resources" className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                      <BookOpen className="w-5 h-5 text-green-600" />
                      <div>
                        <h4 className="font-semibold text-gray-900">HR Resources</h4>
                        <p className="text-sm text-gray-600">Download guides and templates</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Enhanced SEO-Optimized Sidebar */}
            <div className="space-y-4 md:space-y-6">
              {/* Service List with Internal Linking */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6"
              >
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Popular HR Services</h3>
                <div className="space-y-2 md:space-y-3">
                  {allServices.map((s) => (
                    <Link
                      key={s.id}
                      to={`/services/${s.id}`}
                      className={`block p-2 md:p-3 rounded-lg transition-colors ${
                        s.id === serviceId
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 md:gap-3">
                        <span className="text-xl md:text-2xl">{s.icon}</span>
                        <div>
                          <h4 className="font-semibold text-xs md:text-sm">{s.title}</h4>
                          <p className="text-xs text-gray-500">{s.description.substring(0, 60)}...</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                
                {/* View All Services Link */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link to="/services" className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View All HR Services <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6"
              >
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Search Services</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for services..."
                    className="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
              </motion.div>

              {/* Download Brochure with Modal */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl md:rounded-2xl p-4 md:p-6 text-white"
              >
                <div className="text-center">
                  <Download className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 md:mb-4" />
                  <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Download Brochure</h3>
                  <p className="text-blue-100 text-sm md:text-base mb-3 md:mb-4">Get detailed information about our {service.title} services</p>
                  <button 
                    onClick={handleBrochureDownload}
                    className="w-full bg-white text-blue-600 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base"
                  >
                    Download PDF
                  </button>
                </div>
              </motion.div>

              {/* Local SEO & Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6"
              >
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Contact Our HR Experts</h3>
                
                {/* Business Information */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Mumbai, Maharashtra, India</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">Mon-Fri: 9:00 AM - 6:00 PM IST</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">Available across India</span>
                  </div>
                </div>
                
                <div className="space-y-3 md:space-y-4">
                  <a
                    href="tel:+918740889927"
                    className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Phone className="w-4 h-4 md:w-5 md:h-5" />
                    <div>
                      <span className="font-semibold text-sm md:text-base block">Call Us</span>
                      <span className="text-xs text-gray-600">+91 87408 89927</span>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/918740889927"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                    <div>
                      <span className="font-semibold text-sm md:text-base block">WhatsApp</span>
                      <span className="text-xs text-gray-600">Quick response</span>
                    </div>
                  </a>
                  <a
                    href="mailto:info@hirewithprachi.com"
                    className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <Mail className="w-4 h-4 md:w-5 md:h-5" />
                    <div>
                      <span className="font-semibold text-sm md:text-base block">Email Us</span>
                      <span className="text-xs text-gray-600">info@hirewithprachi.com</span>
                    </div>
                  </a>
                </div>
                
                {/* Trust Indicators */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-900">4.8/5 Rating</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-700">500+ Happy Clients</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">8+ Years Experience</span>
                  </div>
                </div>
              </motion.div>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl md:rounded-2xl p-4 md:p-6 text-white"
              >
                <div className="text-center">
                  <Calendar className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 md:mb-4" />
                  <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Talk to our Experts</h3>
                  <p className="text-purple-100 text-sm md:text-base mb-3 md:mb-4">Get a free consultation and personalized quote</p>
                  <Link
                    to="/contact"
                    className="block w-full bg-white text-purple-600 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base"
                  >
                    Book Free Consultation
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <HireWithPrachiFooter />
        <GPT4oMiniChatbot />
        
        {/* Brochure Download Modal */}
        <BrochureDownloadModal
          isOpen={showBrochureModal}
          onClose={() => setShowBrochureModal(false)}
          serviceName={service.title}
          brochureUrl={`/downloads/${serviceId}-brochure.pdf`}
        />
      </main>
    </>
  );
};

export default ServiceDetailPage;