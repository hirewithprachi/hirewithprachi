import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Share2, 
  Settings, 
  Globe, 
  Users, 
  Building, 
  Shield, 
  CheckCircle, 
  Star, 
  Crown, 
  ArrowRight, 
  Zap, 
  Lock,
  Mail,
  Clock,
  Eye,
  Edit,
  Play,
  Calendar,
  TrendingUp,
  DollarSign,
  X,
  ChevronRight,
  ChevronLeft,
  User,
  Phone,
  AlertCircle,
  Loader,
  Award,
  Sparkles,
  Target,
  ShieldCheck
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import { formSubmission } from '../lib/supabase';

// Policy categories for free and premium tiers
const FREE_CATEGORIES = [
  { value: 'leave_policy', label: 'Leave Policy', icon: Calendar, description: 'Vacation, sick leave, and time-off policies' },
  { value: 'remote_work_policy', label: 'Remote Work Policy', icon: Globe, description: 'Guidelines for remote and hybrid work arrangements' },
  { value: 'code_of_conduct', label: 'Code of Conduct', icon: Shield, description: 'Professional behavior and ethics guidelines' },
  { value: 'dei_policy', label: 'Diversity & Inclusion', icon: Users, description: 'Creating inclusive workplace policies' },
  { value: 'privacy_policy', label: 'Privacy Policy', icon: Lock, description: 'Employee data protection and privacy rights' }
];

const PREMIUM_CATEGORIES = [
  ...FREE_CATEGORIES,
  { value: 'it_security_policy', label: 'IT Security Policy', icon: ShieldCheck, description: 'Technology usage and cybersecurity guidelines' },
  { value: 'data_protection_policy', label: 'Data Protection Policy', icon: Lock, description: 'GDPR and data handling compliance' },
  { value: 'travel_policy', label: 'Travel Policy', icon: Globe, description: 'Business travel and expense guidelines' },
  { value: 'anti_harassment_policy', label: 'Anti-Harassment Policy', icon: Shield, description: 'Workplace harassment prevention' },
  { value: 'performance_management_policy', label: 'Performance Management', icon: TrendingUp, description: 'Employee evaluation and development' },
  { value: 'compensation_policy', label: 'Compensation Policy', icon: DollarSign, description: 'Salary, bonuses, and benefits structure' },
  { value: 'benefits_policy', label: 'Benefits Policy', icon: Star, description: 'Health, retirement, and welfare benefits' },
  { value: 'workplace_safety_policy', label: 'Workplace Safety', icon: Shield, description: 'Health and safety protocols' },
  { value: 'social_media_policy', label: 'Social Media Policy', icon: Share2, description: 'Professional social media guidelines' },
  { value: 'confidentiality_policy', label: 'Confidentiality Policy', icon: Lock, description: 'Trade secrets and NDA policies' }
];

const COMPANY_SIZES = [
  '1-10 employees',
  '11-50 employees', 
  '51-200 employees',
  '201-500 employees',
  '501-1000 employees',
  '1000+ employees'
];

const COUNTRIES = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 
  'France', 'India', 'Singapore', 'Netherlands', 'Japan', 'Brazil', 'Other'
];

const INDUSTRIES = [
  'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail',
  'Education', 'Government', 'Non-profit', 'Consulting', 'Real Estate',
  'Media & Entertainment', 'Transportation', 'Energy', 'Other'
];

export default function HRPolicyGenerator() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Wizard state
  const [currentStep, setCurrentStep] = useState(1);
  const [planType, setPlanType] = useState('free');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPolicy, setGeneratedPolicy] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showDistributionModal, setShowDistributionModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [selectedTemplateStyle, setSelectedTemplateStyle] = useState('simple');
  const [isRendering, setIsRendering] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    company_name: '',
    category: '',
    tone: 'professional',
    industry: '',
    company_size: '',
    location_country: '',
    location_state: '',
    jurisdiction_country: '',
    jurisdiction_state: '',
    custom_points: [''],
    language: 'en'
  });

  // Lead capture for non-authenticated users
  const [leadData, setLeadData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: ''
  });

  // Policy management state
  const [userPolicies, setUserPolicies] = useState([]);
  const [isLoadingPolicies, setIsLoadingPolicies] = useState(false);
  const [policyStats, setPolicyStats] = useState({
    total_policies: 0,
    active_policies: 0,
    draft_policies: 0,
    total_acknowledgments: 0,
    pending_acknowledgments: 0
  });

  useEffect(() => {
    if (user) {
      loadUserPolicies();
      loadPolicyStats();
    }
  }, [user]);

  const loadUserPolicies = async () => {
    setIsLoadingPolicies(true);
    try {
      const { data, error } = await supabase
        .from('hr_policies')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      setUserPolicies(data || []);
    } catch (error) {
      console.error('Error loading policies:', error);
    } finally {
      setIsLoadingPolicies(false);
    }
  };

  const loadPolicyStats = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_policy_statistics', { user_uuid: user.id });
      
      if (error) throw error;
      if (data && data.length > 0) {
        setPolicyStats(data[0]);
      }
    } catch (error) {
      console.error('Error loading policy stats:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCustomPointChange = (index, value) => {
    const newPoints = [...formData.custom_points];
    newPoints[index] = value;
    setFormData(prev => ({
      ...prev,
      custom_points: newPoints
    }));
  };

  const addCustomPoint = () => {
    setFormData(prev => ({
      ...prev,
      custom_points: [...prev.custom_points, '']
    }));
  };

  const removeCustomPoint = (index) => {
    const newPoints = formData.custom_points.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      custom_points: newPoints.length > 0 ? newPoints : ['']
    }));
  };

  const handlePremiumFeatureClick = () => {
    if (planType === 'free') {
      setShowUpgradeModal(true);
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.company_name && formData.category;
      case 2:
        return formData.tone;
      case 3:
        return true; // Optional fields
      case 4:
        return true; // Template selection
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleGenerate = async () => {
    if (!user) {
      setShowSignupModal(true);
      return;
    }

    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-hr-policy', {
        body: {
          ...formData,
          custom_points: formData.custom_points.filter(point => point.trim()),
          user_id: user.id
        }
      });

      if (error) throw error;

      if (data.success) {
        setGeneratedPolicy(data.policy);
        setShowPreview(true);
        loadUserPolicies();
        loadPolicyStats();
      } else {
        throw new Error(data.error || 'Failed to generate policy');
      }
    } catch (error) {
      console.error('Error generating policy:', error);
      alert('Failed to generate policy. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (format = 'pdf') => {
    if (!generatedPolicy) return;

    try {
      if (format === 'txt') {
        const element = document.createElement('a');
        const file = new Blob([generatedPolicy.content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${generatedPolicy.title}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        return;
      }

      if (format === 'pdf') {
        setIsRendering(true);
        const html = buildStyledHtml(generatedPolicy, selectedTemplateStyle, formData.company_name);
        const safeTitle = generatedPolicy.title.replace(/[^a-z0-9\-]+/gi, '-').toLowerCase();
        const outputPath = `policies/${user?.id || 'anon'}/${safeTitle}-${selectedTemplateStyle}.pdf`;

        const { data, error } = await supabase.functions.invoke('render-pdf', {
          body: { html, title: generatedPolicy.title, outputPath }
        });

        if (error) throw error;
        if (data?.signedUrl) {
          const link = document.createElement('a');
          link.href = data.signedUrl;
          link.download = `${generatedPolicy.title}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          throw new Error('Failed to generate PDF');
        }

        setIsRendering(false);
        return;
      }

      alert('DOCX download coming soon. Please use PDF or Text for now.');
    } catch (error) {
      console.error('Error downloading policy:', error);
      alert('Failed to download policy. Please try again.');
    } finally {
      setIsRendering(false);
    }
  };

  const templateStyles = [
    { id: 'plain', name: 'Plain', description: 'Simple, clean layout for quick sharing', premium: false, preview: '📄' },
    { id: 'simple', name: 'Simple Pro', description: 'Readable headings and proper spacing', premium: false, preview: '📋' },
    { id: 'branded-minimal', name: 'Branded Minimal', description: 'Header with company branding', premium: true, preview: '🎨' },
    { id: 'corporate', name: 'Corporate', description: 'Professional layout with footer', premium: true, preview: '🏢' },
    { id: 'modern', name: 'Modern Executive', description: 'Premium typography and styling', premium: true, preview: '✨' }
  ];

  const buildStyledHtml = (policy, styleId, companyName) => {
    const bodyHtml = policy.content
      .replace(/\n\n/g, '</p><p>')
      .replace(/^###\s+(.*)$/gm, '</p><h3>$1</h3><p>')
      .replace(/^##\s+(.*)$/gm, '</p><h2>$1</h2><p>')
      .replace(/^#\s+(.*)$/gm, '</p><h1>$1</h1><p>')
      .replace(/^\-\s+(.*)$/gm, '</p><li>$1</li><p>')
      .replace(/<p><\/p>/g, '')
      .replace(/^<\/p>/, '')
      .replace(/<p>$/, '');

    const baseStyles = `
      body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.6; }
      h1,h2,h3 { color: #0f172a; margin: 1.5rem 0 0.75rem; }
      h1 { font-size: 28px; font-weight: 700; }
      h2 { font-size: 22px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
      h3 { font-size: 18px; font-weight: 600; }
      p { margin: 0.75rem 0; }
      li { margin: 0.25rem 0; }
      ul { margin: 0.5rem 0 0.5rem 2rem; }
      .container { max-width: 800px; margin: 0 auto; padding: 32px; }
      .meta { font-size: 14px; color: #64748b; margin-bottom: 16px; }
      .header { border-bottom: 3px solid #3b82f6; padding-bottom: 16px; margin-bottom: 24px; }
      .footer { border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 32px; font-size: 12px; color: #64748b; }
    `;

    const styleMap = {
      plain: {
        wrapperStart: `<div class="container">`,
        wrapperEnd: `</div>`,
        extraCss: `body { background: #ffffff; }`
      },
      simple: {
        wrapperStart: `<div class="container" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">`,
        wrapperEnd: `</div>`,
        extraCss: `body { background: #f8fafc; }`
      },
      'branded-minimal': {
        wrapperStart: `
          <div class="container" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px -3px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 24px 32px;">
              <div style="font-size: 14px; opacity: 0.9; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">${companyName || 'Company'}</div>
              <div style="font-size: 24px; font-weight: 700;">${policy.title}</div>
            </div>
            <div style="padding: 32px;">`,
        wrapperEnd: `</div></div>`,
        extraCss: `body { background: #f1f5f9; }`
      },
      corporate: {
        wrapperStart: `
          <div class="container" style="background: white; border: 1px solid #e2e8f0; border-radius: 8px;">
            <div class="header">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-size: 20px; font-weight: 700; color: #1e293b;">${companyName || 'Company'}</div>
                <div style="font-size: 14px; color: #64748b;">Generated: ${new Date().toLocaleDateString()}</div>
              </div>
            </div>`,
        wrapperEnd: `<div class="footer">© ${new Date().getFullYear()} ${companyName || 'Company'}. All rights reserved. | Confidential Document</div></div>`,
        extraCss: `body { background: #ffffff; }`
      },
      modern: {
        wrapperStart: `
          <div class="container" style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);">
            <div style="background: linear-gradient(135deg, #1e293b, #334155); color: white; padding: 32px;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                <div style="width: 48px; height: 48px; background: rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px;">📋</div>
                <div>
                  <div style="font-size: 16px; opacity: 0.8;">${companyName || 'Company'}</div>
                  <div style="font-size: 28px; font-weight: 700; line-height: 1.2;">${policy.title}</div>
                </div>
              </div>
              <div style="background: rgba(255,255,255,0.1); padding: 12px 16px; border-radius: 8px; display: inline-block;">
                <div style="font-size: 14px; opacity: 0.9;">📖 ${policy.estimated_read_time} min read • ${policy.word_count} words</div>
              </div>
            </div>
            <div style="padding: 40px;">`,
        wrapperEnd: `</div></div>`,
        extraCss: `body { background: linear-gradient(135deg, #f1f5f9, #e2e8f0); } h2 { border-color: #3b82f6; }`
      }
    };

    const picked = styleMap[styleId] || styleMap.simple;
    return `<!doctype html><html><head><meta charset='utf-8'><style>${baseStyles} ${picked.extraCss}</style></head><body>${picked.wrapperStart}
      ${styleId !== 'modern' ? `<div class="meta">📖 ${policy.estimated_read_time} min read • ${policy.word_count} words</div>` : ''}
      <p>${bodyHtml}</p>
    ${picked.wrapperEnd}</body></html>`;
  };

  const steps = [
    { id: 1, title: 'Company & Policy', desc: 'Basic information' },
    { id: 2, title: 'Customization', desc: 'Tone and style' },
    { id: 3, title: 'Advanced Options', desc: 'Premium features' },
    { id: 4, title: 'Template & Generate', desc: 'Final review' }
  ];

  return (
    <>
      <Helmet>
        <title>AI HR Policy Generator | Create Professional HR Policies | Hire with Prachi</title>
        <meta 
          name="description" 
          content="Generate comprehensive, legally compliant HR policies instantly with AI. Free and premium templates for leave policies, remote work, compliance, and more." 
        />
        <meta name="keywords" content="HR policy generator, AI HR policies, employee handbook, compliance policies, remote work policy" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center mb-6"
              >
                <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                  <FileText className="h-10 w-10 text-white" />
                </div>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              >
                AI-Powered HR Policy Generator
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                Create professional, legally compliant HR policies in minutes. Choose from 200+ templates 
                and customize for your industry and location.
              </motion.p>
            </div>

            {/* Stats */}
            {user && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8"
              >
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{policyStats.total_policies}</div>
                  <div className="text-sm text-blue-700">Policies Created</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{policyStats.active_policies}</div>
                  <div className="text-sm text-green-700">Active</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">{policyStats.draft_policies}</div>
                  <div className="text-sm text-yellow-700">Drafts</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{policyStats.total_acknowledgments}</div>
                  <div className="text-sm text-purple-700">Acknowledged</div>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">{policyStats.pending_acknowledgments}</div>
                  <div className="text-sm text-red-700">Pending</div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Plan Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex bg-white p-1 rounded-xl shadow-lg border border-gray-200">
              <button
                onClick={() => setPlanType('free')}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  planType === 'free'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Free Plan
              </button>
              <button
                onClick={() => setPlanType('premium')}
                className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center ${
                  planType === 'premium'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Crown className="h-4 w-4 mr-2" />
                Premium Plan
              </button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Main Wizard */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                
                {/* Progress Steps */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                  <div className="flex items-center justify-between">
                    {steps.map((step, index) => (
                      <div key={step.id} className="flex items-center">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                          currentStep >= step.id 
                            ? 'bg-white text-blue-600' 
                            : 'bg-blue-500 text-blue-200'
                        }`}>
                          {currentStep > step.id ? (
                            <CheckCircle className="h-6 w-6" />
                          ) : (
                            <span className="font-semibold">{step.id}</span>
                          )}
                        </div>
                        {index < steps.length - 1 && (
                          <div className={`w-16 h-1 mx-4 ${
                            currentStep > step.id ? 'bg-white' : 'bg-blue-500'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-white">
                      {steps[currentStep - 1]?.title}
                    </h3>
                    <p className="text-blue-100">
                      {steps[currentStep - 1]?.desc}
                    </p>
                  </div>
                </div>

                {/* Form Content */}
                <div className="p-8">
                  <AnimatePresence mode="wait">
                    
                    {/* Step 1: Company & Policy */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-3">
                            Company Name *
                          </label>
                          <input
                            type="text"
                            value={formData.company_name}
                            onChange={(e) => handleInputChange('company_name', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
                            placeholder="Enter your company name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-3">
                            Policy Category *
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(planType === 'free' ? FREE_CATEGORIES : PREMIUM_CATEGORIES).map((category) => {
                              const IconComponent = category.icon;
                              const isLocked = planType === 'free' && !FREE_CATEGORIES.find(c => c.value === category.value);
                              
                              return (
                                <button
                                  key={category.value}
                                  type="button"
                                  onClick={() => {
                                    if (isLocked) {
                                      handlePremiumFeatureClick();
                                    } else {
                                      handleInputChange('category', category.value);
                                    }
                                  }}
                                  className={`p-4 rounded-xl border-2 text-left transition-all group ${
                                    formData.category === category.value
                                      ? 'border-blue-500 bg-blue-50'
                                      : isLocked
                                      ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                                  }`}
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <IconComponent className={`h-6 w-6 ${
                                      formData.category === category.value 
                                        ? 'text-blue-600' 
                                        : isLocked 
                                        ? 'text-gray-400' 
                                        : 'text-gray-600 group-hover:text-blue-600'
                                    }`} />
                                    {isLocked && <Crown className="h-4 w-4 text-purple-500" />}
                                  </div>
                                  <div className="font-semibold text-gray-900 mb-1">{category.label}</div>
                                  <div className="text-sm text-gray-500">{category.description}</div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Customization */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-3">
                            Policy Tone *
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                              { value: 'friendly', emoji: '😊', desc: 'Warm and approachable' },
                              { value: 'professional', emoji: '🤝', desc: 'Business standard' },
                              { value: 'formal', emoji: '📋', desc: 'Corporate and structured' },
                              { value: 'casual', emoji: '👋', desc: 'Relaxed and informal' }
                            ].map((tone) => (
                              <button
                                key={tone.value}
                                type="button"
                                onClick={() => handleInputChange('tone', tone.value)}
                                className={`p-4 rounded-xl border-2 text-center transition-all ${
                                  formData.tone === tone.value
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-blue-300'
                                }`}
                              >
                                <div className="text-2xl mb-2">{tone.emoji}</div>
                                <div className="font-semibold text-gray-900 capitalize mb-1">{tone.value}</div>
                                <div className="text-xs text-gray-500">{tone.desc}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-3">
                            Industry
                          </label>
                          <select
                            value={formData.industry}
                            onChange={(e) => handleInputChange('industry', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0"
                          >
                            <option value="">Select your industry</option>
                            {INDUSTRIES.map((industry) => (
                              <option key={industry} value={industry}>{industry}</option>
                            ))}
                          </select>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Advanced Options */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        {planType === 'premium' && (
                          <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200">
                            <h3 className="text-lg font-semibold text-purple-900 flex items-center mb-4">
                              <Crown className="h-5 w-5 mr-2" />
                              Premium Features
                            </h3>
                            
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Company Size
                                </label>
                                <select
                                  value={formData.company_size}
                                  onChange={(e) => handleInputChange('company_size', e.target.value)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                  <option value="">Select company size</option>
                                  {COMPANY_SIZES.map((size) => (
                                    <option key={size} value={size}>{size}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Country
                                </label>
                                <select
                                  value={formData.location_country}
                                  onChange={(e) => handleInputChange('location_country', e.target.value)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                  <option value="">Select country</option>
                                  {COUNTRIES.map((country) => (
                                    <option key={country} value={country}>{country}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  State/Province
                                </label>
                                <input
                                  type="text"
                                  value={formData.location_state}
                                  onChange={(e) => handleInputChange('location_state', e.target.value)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                  placeholder="Enter state or province"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Legal Jurisdiction
                                </label>
                                <select
                                  value={formData.jurisdiction_country}
                                  onChange={(e) => handleInputChange('jurisdiction_country', e.target.value)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                  <option value="">Select jurisdiction</option>
                                  {COUNTRIES.map((country) => (
                                    <option key={country} value={country}>{country}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Custom Requirements
                              </label>
                              <div className="space-y-3">
                                {formData.custom_points.map((point, index) => (
                                  <div key={index} className="flex gap-2">
                                    <input
                                      type="text"
                                      value={point}
                                      onChange={(e) => handleCustomPointChange(index, e.target.value)}
                                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                      placeholder="Enter custom requirement"
                                    />
                                    {formData.custom_points.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={() => removeCustomPoint(index)}
                                        className="px-3 py-2 text-red-600 hover:text-red-800"
                                      >
                                        Remove
                                      </button>
                                    )}
                                  </div>
                                ))}
                                <button
                                  type="button"
                                  onClick={addCustomPoint}
                                  className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                                >
                                  + Add another requirement
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {planType === 'free' && (
                          <div className="text-center p-8 bg-gray-50 rounded-xl">
                            <Crown className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              Unlock Advanced Features
                            </h3>
                            <p className="text-gray-600 mb-4">
                              Upgrade to Premium for jurisdiction compliance, custom requirements, and more.
                            </p>
                            <button
                              onClick={handlePremiumFeatureClick}
                              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                            >
                              Upgrade to Premium
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Step 4: Template & Generate */}
                    {currentStep === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Download Template</h3>
                          <p className="text-sm text-gray-600 mb-6">Select how your policy will look when downloaded.</p>
                          <div className="grid md:grid-cols-3 gap-4">
                            {templateStyles.map((tpl) => {
                              const isLocked = tpl.premium && planType !== 'premium';
                              return (
                                <button
                                  key={tpl.id}
                                  type="button"
                                  onClick={() => {
                                    if (isLocked) { setShowUpgradeModal(true); return; }
                                    setSelectedTemplateStyle(tpl.id);
                                  }}
                                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                                    selectedTemplateStyle === tpl.id
                                      ? 'border-blue-500 bg-blue-50'
                                      : isLocked
                                      ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                                      : 'border-gray-200 hover:border-blue-300'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="text-2xl">{tpl.preview}</div>
                                    {tpl.premium && <Crown className="h-4 w-4 text-purple-600" />}
                                  </div>
                                  <div className="font-semibold text-gray-900 mb-1">{tpl.name}</div>
                                  <div className="text-xs text-gray-500">{tpl.description}</div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ready to Generate</h3>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="font-medium text-gray-900">Company: {formData.company_name}</div>
                              <div className="text-gray-600">Category: {FREE_CATEGORIES.concat(PREMIUM_CATEGORIES).find(c => c.value === formData.category)?.label}</div>
                              <div className="text-gray-600">Tone: {formData.tone}</div>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Template: {templateStyles.find(t => t.id === selectedTemplateStyle)?.name}</div>
                              <div className="text-gray-600">Plan: {planType}</div>
                              {formData.industry && <div className="text-gray-600">Industry: {formData.industry}</div>}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </button>

                    <div className="flex items-center space-x-2">
                      {steps.map((step) => (
                        <div
                          key={step.id}
                          className={`w-3 h-3 rounded-full ${
                            currentStep >= step.id ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    {currentStep < 4 ? (
                      <button
                        onClick={nextStep}
                        disabled={!validateStep(currentStep)}
                        className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    ) : (
                      <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !validateStep(currentStep)}
                        className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isGenerating ? (
                          <>
                            <Loader className="h-5 w-5 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Zap className="h-5 w-5 mr-2" />
                            Generate Policy
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {isRendering && (
                    <div className="mt-4 text-center">
                      <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-lg">
                        <Loader className="h-4 w-4 mr-2 animate-spin text-blue-600" />
                        <span className="text-sm text-blue-700">Rendering your professional PDF...</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Plan Comparison */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-xl p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Features</h3>
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg border ${planType === 'free' ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}>
                    <h4 className="font-semibold text-gray-900 mb-2">Free Plan</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />5 policy categories</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Basic templates</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />PDF & text download</li>
                    </ul>
                  </div>
                  <div className={`p-4 rounded-lg border ${planType === 'premium' ? 'border-purple-200 bg-purple-50' : 'border-gray-200'}`}>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Crown className="h-4 w-4 mr-2 text-purple-600" />
                      Premium Plan
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />200+ templates</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Jurisdiction compliance</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Email distribution</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Premium templates</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Multi-language</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Recent Policies */}
              {user && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl shadow-xl p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Policies</h3>
                  {isLoadingPolicies ? (
                    <div className="text-center py-4">
                      <Loader className="h-6 w-6 text-gray-400 animate-spin mx-auto" />
                    </div>
                  ) : userPolicies.length > 0 ? (
                    <div className="space-y-3">
                      {userPolicies.map((policy) => (
                        <div key={policy.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 text-sm">{policy.title}</h4>
                              <p className="text-xs text-gray-500 mt-1">
                                {policy.category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                                <span className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {policy.estimated_read_time}m
                                </span>
                                <span className="flex items-center">
                                  <FileText className="h-3 w-3 mr-1" />
                                  {policy.word_count} words
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <button className="p-1 text-gray-400 hover:text-blue-600">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-green-600">
                                <Download className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm text-center py-4">
                      No policies created yet. Generate your first policy!
                    </p>
                  )}
                </motion.div>
              )}

              {/* Call to Action for Non-Users */}
              {!user && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white"
                >
                  <h3 className="text-lg font-semibold mb-2">Get Started Today</h3>
                  <p className="text-blue-100 mb-4">
                    Join thousands of HR professionals using our AI policy generator
                  </p>
                  <ul className="space-y-2 text-sm text-blue-100 mb-4">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Generate policies instantly
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Legally compliant templates
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Professional formatting
                    </li>
                  </ul>
                  <button
                    onClick={() => setShowSignupModal(true)}
                    className="w-full bg-white text-blue-600 text-center py-3 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Start Free Trial
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Policy Preview Modal */}
        {showPreview && generatedPolicy && (
          <PolicyPreviewModal
            policy={generatedPolicy}
            onClose={() => setShowPreview(false)}
            onDownload={handleDownload}
            onDistribute={() => setShowDistributionModal(true)}
            planType={planType}
            isRendering={isRendering}
          />
        )}

        {/* Upgrade Modal */}
        {showUpgradeModal && (
          <UpgradeModal onClose={() => setShowUpgradeModal(false)} />
        )}

        {/* Signup Modal */}
        {showSignupModal && (
          <SignupModal 
            onClose={() => setShowSignupModal(false)}
            onSignup={async (data) => {
              try {
                const result = await formSubmission.submitCalculatorForm({
                  ...data,
                  source: 'HR Policy Generator',
                  calculator_result: { action: 'signup_for_policy_generation' }
                }, 'hr_policy_signup');
                
                if (result.success) {
                  setShowSignupModal(false);
                  alert('Thank you for signing up! We\'ll contact you soon with access details.');
                } else {
                  throw new Error(result.error || 'Failed to submit signup');
                }
              } catch (error) {
                console.error('Signup error:', error);
                alert('Failed to submit signup. Please try again.');
              }
            }}
          />
        )}

        {/* Distribution Modal */}
        {showDistributionModal && generatedPolicy && (
          <DistributionModal
            policy={generatedPolicy}
            onClose={() => setShowDistributionModal(false)}
          />
        )}
      </div>
    </>
  );
}

// Policy Preview Modal Component
function PolicyPreviewModal({ policy, onClose, onDownload, onDistribute, planType, isRendering }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{policy.title}</h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-blue-100">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {policy.estimated_read_time} min read
                </span>
                <span className="flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  {policy.word_count} words
                </span>
                <span className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  AI Generated
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div 
            className="prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-700"
            dangerouslySetInnerHTML={{ 
              __html: policy.content
                .replace(/\n\n/g, '</p><p>')
                .replace(/^###\s+(.*)$/gm, '</p><h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3">$1</h3><p>')
                .replace(/^##\s+(.*)$/gm, '</p><h2 class="text-xl font-bold text-gray-900 mt-8 mb-4">$1</h2><p>')
                .replace(/^#\s+(.*)$/gm, '</p><h1 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h1><p>')
                .replace(/^\-\s+(.*)$/gm, '</p><li class="text-gray-700">$1</li><p>')
                .replace(/<p><\/p>/g, '')
                .replace(/^<\/p>/, '<p>')
                .replace(/<p>$/, '</p>')
            }}
          />
        </div>
        
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onDownload('txt')}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center min-w-[120px]"
            >
              <Download className="h-4 w-4 mr-2" />
              Text
            </button>
            <button
              onClick={() => onDownload('pdf')}
              disabled={isRendering}
              className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center min-w-[120px] disabled:opacity-50"
            >
              {isRendering ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Rendering...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </>
              )}
            </button>
            {planType === 'premium' && (
              <button
                onClick={onDistribute}
                className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center min-w-[120px]"
              >
                <Mail className="h-4 w-4 mr-2" />
                Distribute
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Upgrade Modal Component
function UpgradeModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl max-w-md w-full"
      >
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Upgrade to Premium</h2>
            <p className="text-gray-600">
              Unlock advanced features and 200+ policy templates
            </p>
          </div>
          
          <div className="space-y-3 mb-6">
            {[
              '200+ policy templates',
              'Jurisdiction compliance',
              'Email distribution',
              'Acknowledgment tracking',
              'Premium templates',
              'Multi-language support'
            ].map((feature) => (
              <div key={feature} className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Maybe Later
            </button>
            <button
              onClick={() => {
                // Navigate to pricing page or open subscription flow
                onClose();
              }}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Signup Modal Component
function SignupModal({ onClose, onSignup }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onSignup(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl max-w-md w-full"
      >
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Free Access</h2>
            <p className="text-gray-600">
              Sign up to generate unlimited HR policies with our AI tool
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="First Name *"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Last Name"
                />
              </div>
            </div>
            
            <div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Email Address *"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            
            <div>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Phone Number"
              />
            </div>
            
            <div>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.company ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Company Name *"
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-500">{errors.company}</p>
              )}
            </div>
            
            <div>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Job Title"
              />
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Signing Up...
                  </>
                ) : (
                  'Get Free Access'
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// Distribution Modal Component
function DistributionModal({ policy, onClose }) {
  const [emails, setEmails] = useState(['']);
  const [subject, setSubject] = useState(`New HR Policy: ${policy.title}`);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const addEmailField = () => {
    setEmails([...emails, '']);
  };

  const removeEmailField = (index) => {
    if (emails.length > 1) {
      setEmails(emails.filter((_, i) => i !== index));
    }
  };

  const updateEmail = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handleDistribute = async () => {
    const validEmails = emails.filter(email => email.trim() && email.includes('@'));
    if (validEmails.length === 0) {
      alert('Please enter at least one valid email address');
      return;
    }

    setIsSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('distribute-policy', {
        body: {
          policy_id: policy.id,
          employee_emails: validEmails,
          distribution_type: 'email',
          email_subject: subject,
          email_body: message
        }
      });

      if (error) throw error;

      if (data.success) {
        alert(`Policy sent to ${data.sent_count} recipients successfully!`);
        onClose();
      } else {
        throw new Error(data.error || 'Failed to distribute policy');
      }
    } catch (error) {
      console.error('Error distributing policy:', error);
      alert('Failed to distribute policy. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Distribute Policy</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee Email Addresses
              </label>
              {emails.map((email, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => updateEmail(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="employee@company.com"
                  />
                  {emails.length > 1 && (
                    <button
                      onClick={() => removeEmailField(index)}
                      className="px-3 py-2 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addEmailField}
                className="text-purple-600 hover:text-purple-800 text-sm font-medium"
              >
                + Add another email
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Add a custom message for your employees..."
              />
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDistribute}
              disabled={isSending}
              className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSending ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Policy
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}