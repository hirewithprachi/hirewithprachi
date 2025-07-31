import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Download, 
  FileText, 
  BookOpen, 
  Briefcase, 
  UserCheck, 
  FileCheck, 
  Calendar, 
  DollarSign,
  Shield,
  Users,
  Calculator,
  ArrowLeft,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';
import { addContactToHubSpot } from '../lib/hubspot';
import HireWithPrachiTopBar from '../components/hirable/HirableTopBar';
import HireWithPrachiHeader from '../components/hirable/HirableHeader';
import HireWithPrachiFooter from '../components/hirable/HirableFooter';

function trackEvent(name, params) {
  if (window.gtag) {
    window.gtag('event', name, params);
  }
}

// Template database with all available resources
const templateDatabase = {
  'hr-compliance-checklist-2024': {
    id: 'hr-compliance-checklist-2024',
    title: 'HR Compliance Checklist 2024',
    description: 'Comprehensive compliance checklist covering all major HR regulations and statutory requirements for Indian businesses',
    category: 'Compliance',
    type: 'PDF',
    downloads: 1247,
    rating: 4.9,
    icon: Shield,
    color: 'from-red-500 to-pink-500',
    size: '1.8 MB',
    fileUrl: '/downloads/hr-compliance-checklist-2024.pdf',
    fallbackUrl: 'https://drive.google.com/file/d/1ABC123/view?usp=sharing',
    tags: ['Compliance', 'Legal', 'HR Policies', 'India']
  },
  'employee-handbook-template-2024': {
    id: 'employee-handbook-template-2024',
    title: 'Employee Handbook Template 2024',
    description: 'Comprehensive employee handbook template with all essential policies, procedures, and company guidelines compliant with Indian labor laws',
    category: 'Policies',
    type: 'DOCX',
    downloads: 2341,
    rating: 4.9,
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500',
    size: '2.1 MB',
    fileUrl: '/downloads/employee-handbook-template-2024.docx',
    fallbackUrl: 'https://drive.google.com/file/d/1DEF456/view?usp=sharing',
    tags: ['Employee Handbook', 'Policies', 'Legal', 'India']
  },
  'job-description-template-professional': {
    id: 'job-description-template-professional',
    title: 'Job Description Template - Professional',
    description: 'Professional job description template with customizable sections for any role, including key responsibilities, qualifications, and performance metrics',
    category: 'Recruitment',
    type: 'DOCX',
    downloads: 1892,
    rating: 4.8,
    icon: Briefcase,
    color: 'from-green-500 to-emerald-500',
    size: '0.8 MB',
    fileUrl: '/downloads/job-description-template-professional.docx',
    fallbackUrl: 'https://drive.google.com/file/d/1GHI789/view?usp=sharing',
    tags: ['Job Description', 'Recruitment', 'Hiring', 'Templates']
  },
  '360-degree-performance-review-form': {
    id: '360-degree-performance-review-form',
    title: '360-Degree Performance Review Form',
    description: 'Comprehensive 360-degree performance review template with evaluation criteria, self-assessment, peer review, and manager feedback sections',
    category: 'Performance',
    type: 'PDF',
    downloads: 1567,
    rating: 4.7,
    icon: UserCheck,
    color: 'from-purple-500 to-pink-500',
    size: '1.2 MB',
    fileUrl: '/downloads/360-degree-performance-review-form.pdf',
    fallbackUrl: 'https://drive.google.com/file/d/1JKL012/view?usp=sharing',
    tags: ['Performance Review', '360 Degree', 'Evaluation', 'HR Forms']
  },
  'employment-contract-template-india': {
    id: 'employment-contract-template-india',
    title: 'Employment Contract Template - India',
    description: 'Standard employment contract template fully compliant with Indian labor laws, including all statutory requirements and employee rights',
    category: 'Legal',
    type: 'DOCX',
    downloads: 2103,
    rating: 4.9,
    icon: FileCheck,
    color: 'from-red-500 to-orange-500',
    size: '1.5 MB',
    fileUrl: '/downloads/employment-contract-template-india.docx',
    fallbackUrl: 'https://drive.google.com/file/d/1MNO345/view?usp=sharing',
    tags: ['Employment Contract', 'Legal', 'India', 'Compliance']
  },
  'leave-application-form-professional': {
    id: 'leave-application-form-professional',
    title: 'Leave Application Form - Professional',
    description: 'Professional leave application form with approval workflow, leave balance tracking, and manager approval process',
    category: 'Forms',
    type: 'PDF',
    downloads: 1345,
    rating: 4.6,
    icon: Calendar,
    color: 'from-indigo-500 to-purple-500',
    size: '0.6 MB',
    fileUrl: '/downloads/leave-application-form-professional.pdf',
    fallbackUrl: 'https://drive.google.com/file/d/1PQR678/view?usp=sharing',
    tags: ['Leave Application', 'Forms', 'HR Processes', 'Approval']
  },
  'salary-structure-template-comprehensive': {
    id: 'salary-structure-template-comprehensive',
    title: 'Salary Structure Template - Comprehensive',
    description: 'Comprehensive salary structure template with benefits breakdown, allowances, deductions, and tax calculations for Indian employees',
    category: 'Compensation',
    type: 'XLSX',
    downloads: 987,
    rating: 4.8,
    icon: DollarSign,
    color: 'from-yellow-500 to-orange-500',
    size: '1.8 MB',
    fileUrl: '/downloads/salary-structure-template-comprehensive.xlsx',
    fallbackUrl: 'https://drive.google.com/file/d/1STU901/view?usp=sharing',
    tags: ['Salary Structure', 'Compensation', 'Benefits', 'Excel']
  },
  'employee-engagement-survey-template': {
    id: 'employee-engagement-survey-template',
    title: 'Employee Engagement Survey Template',
    description: 'Ready-to-use survey templates to measure and improve employee engagement with proven questions and scoring methods',
    category: 'Engagement',
    type: 'Template',
    downloads: 892,
    rating: 4.8,
    icon: Users,
    color: 'from-blue-500 to-cyan-500',
    size: '1.1 MB',
    fileUrl: '/downloads/employee-engagement-survey-template.docx',
    fallbackUrl: 'https://drive.google.com/file/d/1VWX234/view?usp=sharing',
    tags: ['Employee Engagement', 'Survey', 'HR Tools', 'Feedback']
  }
};

export default function ResourceDownloads() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: '', email: '', businessType: '', intendedUse: '' });
  const [submitted, setSubmitted] = useState(false);
  const [crmError, setCrmError] = useState(false);
  const [downloadAttempted, setDownloadAttempted] = useState(false);
  const [downloadError, setDownloadError] = useState(false);

  // Get template data from URL or fallback to generic
  const template = templateDatabase[templateId] || null;
  const isSpecificTemplate = !!template;

  // SEO Schema for specific template
  const templateSchema = template ? {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": template.title,
    "description": template.description,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "downloadUrl": template.fileUrl,
    "fileSize": template.size
  } : null;

  useEffect(() => {
    // Track page view
    trackEvent('page_view', { 
      page_title: template ? template.title : 'Resource Downloads',
      page_location: location.pathname 
    });
  }, [template, location.pathname]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    localStorage.setItem('resourceDownloadEmail', form.email);
    setSubmitted(true);
    
    // Track form submission
    trackEvent('form_submit', { 
      form_name: 'resource_download',
      template_id: templateId || 'generic'
    });

    // Send to HubSpot CRM
    try {
      const ok = await addContactToHubSpot({ 
        email: form.email, 
        firstname: form.name, 
        businessType: form.businessType, 
        intendedUse: form.intendedUse,
        templateRequested: template ? template.title : 'Generic Resources'
      });
      if (!ok) setCrmError(true);
    } catch (error) {
      console.error('CRM Error:', error);
      setCrmError(true);
    }
  };

  const handleDownload = async (templateData = template) => {
    if (!templateData) return;

    setDownloadAttempted(true);
    setDownloadError(false);

    // Track download attempt
    trackEvent('download_attempt', { 
      resource_name: templateData.title,
      resource_type: templateData.type,
      resource_category: templateData.category
    });

    try {
      // Try direct download first
      const response = await fetch(templateData.fileUrl);
      
      if (response.ok) {
        // Create download link
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${templateData.title}.${templateData.type.toLowerCase()}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        // Track successful download
        trackEvent('download_success', { 
          resource_name: templateData.title,
          resource_type: templateData.type
        });
      } else {
        // Fallback to Google Drive or external link
        window.open(templateData.fallbackUrl, '_blank');
        
        // Track fallback download
        trackEvent('download_fallback', { 
          resource_name: templateData.title,
          fallback_url: templateData.fallbackUrl
        });
      }
    } catch (error) {
      console.error('Download error:', error);
      setDownloadError(true);
      
      // Track download error
      trackEvent('download_error', { 
        resource_name: templateData.title,
        error_message: error.message
      });
    }
  };

  const handleQuickDownload = () => {
    // Always show form first, even for quick download
    if (template) {
      setShowLeadForm(true);
    }
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>
          {template 
            ? `${template.title} - Free Download | Virtual HR Consultant`
            : 'Free HR Resources & Templates Download | Virtual HR Consultant'
          }
        </title>
        <meta 
          name="description" 
          content={
            template 
              ? `Download ${template.title} for free. ${template.description} Professional HR template for Indian businesses.`
              : 'Download free HR templates, checklists, and resources. Professional HR tools for Indian businesses. Employee handbooks, job descriptions, and more.'
          } 
        />
        <meta name="keywords" content={template ? template.tags.join(', ') : 'HR templates, free downloads, employee handbook, job description, performance review'} />
        <link rel="canonical" href={`https://virtualhrconsultant.com/resource-downloads${template ? `/${templateId}` : ''}`} />
        
        {/* Schema Markup */}
        {templateSchema && (
          <script type="application/ld+json">
            {JSON.stringify(templateSchema)}
          </script>
        )}
      </Helmet>

      <HireWithPrachiTopBar />
      <HireWithPrachiHeader />

      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 text-center">
          <div className="max-w-4xl mx-auto px-4">
            {isSpecificTemplate ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <template.icon className="h-4 w-4" />
                  {template.category}
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {template.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
                  {template.description}
                </p>
                
                {/* Template Stats */}
                <div className="flex flex-wrap justify-center gap-6 mb-8">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Download className="h-5 w-5" />
                    <span>{template.downloads.toLocaleString()} downloads</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span>{template.rating} rating</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-5 w-5" />
                    <span>{template.size}</span>
                  </div>
                </div>

                {/* Quick Download Button */}
                <motion.button
                  onClick={handleQuickDownload}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                >
                  <Download className="h-5 w-5" />
                  Download Now
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Download Free HR Toolkit & Resources
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-6">
                  Unlock premium HR templates, checklists, and guides to streamline your business. Fill in your details to access instant downloads and get exclusive business insights.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Conversion Form Section */}
        <section className="py-8">
          <div className="max-w-2xl mx-auto px-4">
            <motion.div 
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-12 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    {isSpecificTemplate ? `Get Your ${template.title}` : 'Access Your Free Resources'}
                  </h2>
                  <p className="text-gray-600 text-center mb-6">
                    {isSpecificTemplate 
                      ? 'Fill in your details to download this professional HR template instantly.'
                      : 'Fill in your details to access our complete collection of HR resources.'
                    }
                  </p>
                  
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  <input
                    type="text"
                    name="businessType"
                    placeholder="Business Type (e.g. IT, Manufacturing)"
                    value={form.businessType}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  <textarea
                    name="intendedUse"
                    placeholder="How do you intend to use these resources?"
                    rows={3}
                    value={form.intendedUse}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  <button 
                    type="submit" 
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                  >
                    {isSpecificTemplate ? 'Download Template' : 'Access Downloads'}
                  </button>
                  {crmError && (
                    <div className="text-red-600 text-sm mt-2 text-center">
                      (CRM integration failed, but your request was received.)
                    </div>
                  )}
                </form>
              ) : (
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Thank you! Your download is ready.
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {isSpecificTemplate 
                      ? `Your ${template.title} is ready for download.`
                      : 'Your resources are ready for download.'
                    }
                  </p>
                  
                  {isSpecificTemplate ? (
                    <motion.button
                      onClick={handleQuickDownload}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                    >
                      <Download className="h-5 w-5" />
                      Download {template.title}
                    </motion.button>
                  ) : (
                    <div className="space-y-4">
                      {Object.values(templateDatabase).slice(0, 6).map((resource) => (
                        <motion.button
                          key={resource.id}
                          onClick={() => handleDownload(resource)}
                          whileHover={{ scale: 1.02 }}
                          className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${resource.color} flex items-center justify-center`}>
                              <resource.icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="text-left">
                              <div className="font-semibold text-gray-900">{resource.title}</div>
                              <div className="text-sm text-gray-600">{resource.type} • {resource.size}</div>
                            </div>
                          </div>
                          <Download className="h-5 w-5 text-gray-400" />
                        </motion.button>
                      ))}
                    </div>
                  )}
                  
                  {downloadError && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700 text-sm">
                        Download failed. Please try again or contact support.
                      </p>
                    </div>
                  )}
                  
                  <div className="mt-8">
                    <button
                      onClick={() => navigate('/resources')}
                      className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to Resources
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      </div>

      <HireWithPrachiFooter />
    </>
  );
} 