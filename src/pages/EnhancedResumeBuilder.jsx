import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  ArrowLeft, 
  Download, 
  Plus, 
  Trash2,
  Eye,
  Save,
  Settings,
  Palette,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Star,
  Sparkles,
  Zap,
  Target,
  TrendingUp,
  Users,
  Calendar,
  Edit3,
  Copy,
  Share2,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Clock,
  Crown,
  Upload,
  X,
  Wand2,
  BarChart3,
  RefreshCw,
  Lock
} from 'lucide-react';
import { EnhancedResumeService } from '../services/enhancedResumeService';
import { ABTestingService } from '../services/abTestingService';

// =============================================
// Validation Schemas
// =============================================

const PersonalInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  headline: z.string().min(10, 'Headline must be at least 10 characters'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  location: z.string().min(2, 'Location required'),
  links: z.array(z.object({
    label: z.string(),
    url: z.string().url()
  })).optional()
});

const ExperienceSchema = z.object({
  experiences: z.array(z.object({
    company: z.string().min(2, 'Company name required'),
    role: z.string().min(2, 'Role title required'),
    location: z.string().optional(),
    start: z.string().min(3, 'Start date required'),
    end: z.string().min(3, 'End date required'),
    bullets: z.array(z.string().min(12).max(200)).min(2, 'At least 2 achievements required'),
    technologies: z.array(z.string()).optional()
  })).min(1, 'At least one work experience required')
});

const SkillsSchema = z.object({
  core: z.array(z.string()).min(3, 'At least 3 core skills required'),
  tools: z.array(z.string()).optional(),
  soft: z.array(z.string()).optional()
});

// =============================================
// Main Component
// =============================================

const EnhancedResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [quotas, setQuotas] = useState(null);
  const [autoSaving, setAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [jdAnalysisModal, setJdAnalysisModal] = useState(false);
  const [jdText, setJdText] = useState('');
  const [jdAnalysis, setJdAnalysis] = useState(null);
  const [loadingStates, setLoadingStates] = useState({});
  const [abTestConfig, setAbTestConfig] = useState(null);

  // Enhanced steps with validation schemas (adjust based on A/B test)
  const getStepsConfiguration = () => {
    if (!abTestConfig?.flow) {
      // Default configuration
      return [
        { 
          id: 1, 
          title: 'Personal Info', 
          icon: Users,
          description: 'Basic contact and profile information',
          required: true,
          schema: PersonalInfoSchema
        },
        { 
          id: 2, 
          title: 'Summary', 
          icon: FileText,
          description: 'Professional summary and objective',
          required: true
        },
        { 
          id: 3, 
          title: 'Experience', 
          icon: Briefcase,
          description: 'Work history and achievements',
          required: true,
          schema: ExperienceSchema
        },
        { 
          id: 4, 
          title: 'Education', 
          icon: GraduationCap,
          description: 'Academic background',
          required: false
        },
        { 
          id: 5, 
          title: 'Skills & Projects', 
          icon: Award,
          description: 'Technical skills and project portfolio',
          required: false,
          schema: SkillsSchema
        },
        { 
          id: 6, 
          title: 'Template & Style', 
          icon: Palette,
          description: 'Choose design and formatting',
          required: false
        },
        { 
          id: 7, 
          title: 'Review & Export', 
          icon: Eye,
          description: 'Review and generate final resume',
          required: false
        }
      ];
    }

    // A/B test variant: Simplified 5-step flow
    if (abTestConfig.flow.stepCount === 5) {
      return [
        { 
          id: 1, 
          title: 'Profile & Summary', 
          icon: Users,
          description: 'Personal info and professional summary',
          required: true,
          schema: PersonalInfoSchema
        },
        { 
          id: 2, 
          title: 'Experience', 
          icon: Briefcase,
          description: 'Work history and achievements',
          required: true,
          schema: ExperienceSchema
        },
        { 
          id: 3, 
          title: 'Skills & Education', 
          icon: Award,
          description: 'Skills, education, and projects',
          required: false,
          schema: SkillsSchema
        },
        { 
          id: 4, 
          title: 'Design', 
          icon: Palette,
          description: 'Choose template and style',
          required: false
        },
        { 
          id: 5, 
          title: 'Export', 
          icon: Eye,
          description: 'Review and download resume',
          required: false
        }
      ];
    }

    // Default 7-step flow for other variants
    return [
      { 
        id: 1, 
        title: 'Personal Info', 
        icon: Users,
        description: 'Basic contact and profile information',
        required: true,
        schema: PersonalInfoSchema
      },
      { 
        id: 2, 
        title: 'Summary', 
        icon: FileText,
        description: 'Professional summary and objective',
        required: true
      },
      { 
        id: 3, 
        title: 'Experience', 
        icon: Briefcase,
        description: 'Work history and achievements',
        required: true,
        schema: ExperienceSchema
      },
      { 
        id: 4, 
        title: 'Education', 
        icon: GraduationCap,
        description: 'Academic background',
        required: false
      },
      { 
        id: 5, 
        title: 'Skills & Projects', 
        icon: Award,
        description: 'Technical skills and project portfolio',
        required: false,
        schema: SkillsSchema
      },
      { 
        id: 6, 
        title: 'Template & Style', 
        icon: Palette,
        description: 'Choose design and formatting',
        required: false
      },
      { 
        id: 7, 
        title: 'Review & Export', 
        icon: Eye,
        description: 'Review and generate final resume',
        required: false
      }
    ];
  };

  const steps = getStepsConfiguration();

  // Form setup for current step
  const getFormSchema = () => {
    const currentStepData = steps.find(s => s.id === currentStep);
    return currentStepData?.schema || z.object({});
  };

  const form = useForm({
    resolver: zodResolver(getFormSchema()),
    mode: 'onChange'
  });

  // =============================================
  // Initialization
  // =============================================

  useEffect(() => {
    initializeBuilder();
  }, []);

  const initializeBuilder = async () => {
    try {
      setLoadingStates(prev => ({ ...prev, init: true }));
      
      // Get user data
      const userResult = await EnhancedResumeService.getCurrentUser();
      if (userResult.success) {
        setUser(userResult.user);
        
        // Get quotas
        const quotasResult = await EnhancedResumeService.getUserQuotas(userResult.user.id);
        if (quotasResult.success) {
          setQuotas(quotasResult);
        }

        // Initialize A/B testing
        const abConfig = await ABTestingService.getResumeBuilderConfig(userResult.user.id);
        setAbTestConfig(abConfig);

        // Track page visit
        await ABTestingService.trackResumeEvent('page_visit', userResult.user.id, {
          entry_point: 'enhanced_resume_builder',
          user_plan: userResult.user.subscription?.plan || 'free'
        });
      } else {
        // Anonymous user A/B testing
        const abConfig = await ABTestingService.getResumeBuilderConfig();
        setAbTestConfig(abConfig);

        await ABTestingService.trackResumeEvent('page_visit', null, {
          entry_point: 'enhanced_resume_builder',
          user_type: 'anonymous'
        });
      }
      
      // Get templates
      const templatesResult = await EnhancedResumeService.getTemplates();
      if (templatesResult.success) {
        setTemplates(templatesResult.templates);
      }
      
      // Check if we're editing an existing resume
      const urlParams = new URLSearchParams(window.location.search);
      const existingResumeId = urlParams.get('resumeId');
      
      if (existingResumeId) {
        setResumeId(existingResumeId);
        await loadExistingResume(existingResumeId);
      } else {
        // Create new resume
        await createNewResume();
      }
      
    } catch (error) {
      console.error('Error initializing builder:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, init: false }));
    }
  };

  const createNewResume = async () => {
    if (!user) return;
    
    const result = await EnhancedResumeService.createResume(user.id);
    if (result.success) {
      setResumeId(result.resume.id);
    } else if (result.code === 'QUOTA_EXCEEDED') {
      setShowUpgradeModal(true);
    }
  };

  const loadExistingResume = async (id) => {
    if (!user) return;
    
    const result = await EnhancedResumeService.getResume(id, user.id);
    if (result.success && result.resume.current_version) {
      const resumeData = result.resume.current_version.data;
      setSelectedTemplate(result.resume.template_key);
      
      // Populate form with existing data
      form.reset(resumeData);
    }
  };

  // =============================================
  // Auto-save functionality
  // =============================================

  const autoSave = useCallback(async () => {
    if (!resumeId || !user) return;
    
    try {
      setAutoSaving(true);
      const formData = form.getValues();
      
      const result = await EnhancedResumeService.createResumeVersion(
        resumeId, 
        formData, 
        'Auto-save'
      );
      
      if (result.success) {
        setLastSaved(new Date());
      }
    } catch (error) {
      console.error('Auto-save error:', error);
    } finally {
      setAutoSaving(false);
    }
  }, [resumeId, user, form]);

  // Auto-save every 5 seconds when form data changes
  useEffect(() => {
    const subscription = form.watch(() => {
      const timer = setTimeout(autoSave, 5000);
      return () => clearTimeout(timer);
    });
    return () => subscription.unsubscribe();
  }, [form, autoSave]);

  // =============================================
  // AI Features
  // =============================================

  const handleGrammarCheck = async (text, fieldName) => {
    if (!user) return;
    
    try {
      setLoadingStates(prev => ({ ...prev, [fieldName]: 'grammar' }));
      
      const result = await EnhancedResumeService.checkGrammar(text, user.id);
      
      if (result.success) {
        // Show grammar suggestions in UI
        // This would typically show a modal or inline suggestions
        console.log('Grammar suggestions:', result.result);
      } else if (result.code === 'QUOTA_EXCEEDED') {
        setShowUpgradeModal(true);
      }
    } catch (error) {
      console.error('Grammar check error:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [fieldName]: null }));
    }
  };

  const handleAiPolish = async (text, fieldPath, options = {}) => {
    if (!user || !resumeId) return;
    
    try {
      setLoadingStates(prev => ({ ...prev, [fieldPath]: 'polish' }));
      
      const result = await EnhancedResumeService.polishText(
        text, 
        user.id, 
        resumeId, 
        fieldPath, 
        options
      );
      
      if (result.success) {
        // Update form field with improved text
        form.setValue(fieldPath, result.improved);
        
        // Track AI feature usage
        await ABTestingService.trackResumeEvent('ai_feature_used', user.id, {
          feature_type: 'ai_polish',
          field_path: fieldPath,
          text_length: text.length,
          improvement_score: result.stats?.qualityScore || 0
        });
        
        // Refresh quotas
        const quotasResult = await EnhancedResumeService.getUserQuotas(user.id);
        if (quotasResult.success) {
          setQuotas(quotasResult);
        }
      } else if (result.code === 'QUOTA_EXCEEDED') {
        setShowUpgradeModal(true);
        
        // Track quota exceeded event
        await ABTestingService.trackResumeEvent('quota_exceeded', user.id, {
          feature_type: 'ai_polish',
          quota_type: 'ai_polish_count'
        });
      }
    } catch (error) {
      console.error('AI polish error:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [fieldPath]: null }));
    }
  };

  const handleJdAnalysis = async () => {
    if (!user || !resumeId || !jdText.trim()) return;
    
    try {
      setLoadingStates(prev => ({ ...prev, jdAnalysis: true }));
      
      const formData = form.getValues();
      const result = await EnhancedResumeService.analyzeJobDescription(
        formData, 
        jdText, 
        user.id, 
        resumeId
      );
      
      if (result.success) {
        setJdAnalysis(result.analysis);
        
        // Refresh quotas
        const quotasResult = await EnhancedResumeService.getUserQuotas(user.id);
        if (quotasResult.success) {
          setQuotas(quotasResult);
        }
      } else if (result.code === 'QUOTA_EXCEEDED') {
        setShowUpgradeModal(true);
      }
    } catch (error) {
      console.error('JD analysis error:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, jdAnalysis: false }));
    }
  };

  // =============================================
  // Export Functions
  // =============================================

  const handleExport = async (format) => {
    if (!user || !resumeId) return;
    
    try {
      setLoadingStates(prev => ({ ...prev, [`export_${format}`]: true }));
      
      const formData = form.getValues();
      
      // Save current version first
      const versionResult = await EnhancedResumeService.createResumeVersion(
        resumeId, 
        formData, 
        'Pre-export save'
      );
      
      if (!versionResult.success) {
        throw new Error('Failed to save resume');
      }
      
      const exportResult = await EnhancedResumeService.exportResume(
        resumeId,
        versionResult.version.id,
        format,
        selectedTemplate,
        user.id
      );
      
      if (exportResult.success) {
        // Open download URL
        window.open(exportResult.url, '_blank');
        
        // Refresh quotas
        const quotasResult = await EnhancedResumeService.getUserQuotas(user.id);
        if (quotasResult.success) {
          setQuotas(quotasResult);
        }
      } else if (exportResult.code === 'QUOTA_EXCEEDED') {
        setShowUpgradeModal(true);
      }
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [`export_${format}`]: false }));
    }
  };

  // =============================================
  // UI Helper Functions
  // =============================================

  const getStepCompletion = (stepId) => {
    const stepData = steps.find(s => s.id === stepId);
    if (!stepData?.schema) return 100;
    
    try {
      const formData = form.getValues();
      stepData.schema.parse(formData);
      return 100;
    } catch {
      return 0;
    }
  };

  const getOverallProgress = () => {
    const completedSteps = steps.filter(step => getStepCompletion(step.id) === 100).length;
    return Math.round((completedSteps / steps.length) * 100);
  };

  const canUseFeature = (feature) => {
    if (!quotas || !user) return false;
    
    const plan = user.subscription?.plan || 'free';
    const limits = quotas.limits;
    const usage = quotas.quotas;
    
    switch (feature) {
      case 'ai_polish':
        return usage.ai_polish_count < limits.ai_polish;
      case 'exports':
        return usage.exports_count < limits.exports;
      case 'jd_analysis':
        return usage.jd_analysis_count < limits.jd_analysis;
      case 'premium_templates':
        return plan !== 'free';
      default:
        return true;
    }
  };

  const isPremiumTemplate = (templateKey) => {
    const template = templates.find(t => t.key === templateKey);
    return template?.is_premium || false;
  };

  // =============================================
  // Loading State
  // =============================================

  if (loadingStates.init) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Resume Builder</h2>
          <p className="text-gray-600">Setting up your workspace...</p>
        </div>
      </div>
    );
  }

  // =============================================
  // Main Render
  // =============================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => window.history.back()}
                className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI-Powered Resume Builder</h1>
                <div className="flex items-center gap-4 mt-1">
                  <p className="text-gray-600">Create ATS-optimized resumes with AI assistance</p>
                  
                  {/* Auto-save indicator */}
                  <div className="flex items-center gap-2 text-sm">
                    {autoSaving ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
                        <span className="text-blue-600">Saving...</span>
                      </>
                    ) : lastSaved ? (
                      <>
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span className="text-green-600">
                          Saved {EnhancedResumeService.getTimeAgo(lastSaved)}
                        </span>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Quota Display */}
              {quotas && (
                <div className="hidden md:flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-lg">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-700">
                      AI Polish: {quotas.quotas.ai_polish_count}/{quotas.limits.ai_polish}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-lg">
                    <Download className="w-4 h-4 text-green-600" />
                    <span className="text-green-700">
                      Exports: {quotas.quotas.exports_count}/{quotas.limits.exports}
                    </span>
                  </div>
                </div>
              )}
              
              {/* Plan Badge */}
              {user && (
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  user.subscription?.plan === 'free' 
                    ? 'bg-gray-100 text-gray-800' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {user.subscription?.plan === 'free' ? (
                    <>
                      <Crown className="w-3 h-3 inline mr-1" />
                      Free Plan
                    </>
                  ) : (
                    <>
                      <Star className="w-3 h-3 inline mr-1" />
                      Pro Plan
                    </>
                  )}
                </div>
              )}
              
              {/* JD Analysis Button */}
              <button
                onClick={() => setJdAnalysisModal(true)}
                disabled={!canUseFeature('jd_analysis')}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <BarChart3 className="w-4 h-4" />
                JD Match
                {!canUseFeature('jd_analysis') && <Lock className="w-3 h-3" />}
              </button>
              
              {/* Preview Toggle */}
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                {previewMode ? 'Edit Mode' : 'Preview'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-24">
              {/* Progress Overview */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Progress</h3>
                  <span className="text-sm font-medium text-blue-600">{getOverallProgress()}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${getOverallProgress()}%` }}
                  />
                </div>
                
                <div className="text-sm text-gray-600">
                  {getOverallProgress() === 100 ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Resume ready for export!</span>
                    </div>
                  ) : (
                    <span>{7 - Math.floor(getOverallProgress() / 14)} steps remaining</span>
                  )}
                </div>
              </div>

              {/* Steps Navigation */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Resume Sections</h3>
                
                <div className="space-y-2">
                  {steps.map((step) => {
                    const completion = getStepCompletion(step.id);
                    const isActive = currentStep === step.id;
                    const isCompleted = completion === 100;
                    
                    return (
                      <motion.button
                        key={step.id}
                        onClick={async () => {
                          // Track step navigation
                          if (currentStep !== step.id) {
                            await ABTestingService.trackResumeEvent('step_navigation', user?.id, {
                              from_step: currentStep,
                              to_step: step.id,
                              step_name: step.title,
                              navigation_type: 'click'
                            });
                          }
                          setCurrentStep(step.id);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                          isActive
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : isCompleted
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="relative">
                          {React.createElement(step.icon, { className: "w-5 h-5" })}
                          {isCompleted && (
                            <CheckCircle className="w-4 h-4 text-green-500 absolute -top-1 -right-1" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{step.title}</div>
                          <div className="text-xs text-gray-500 truncate">{step.description}</div>
                        </div>
                        {step.required && (
                          <span className="text-xs text-red-500 flex-shrink-0">*</span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Export</h3>
                
                <div className="space-y-3">
                  <button
                    onClick={() => handleExport('pdf')}
                    disabled={!canUseFeature('exports') || loadingStates.export_pdf}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingStates.export_pdf ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    Export PDF
                    {!canUseFeature('exports') && <Lock className="w-3 h-3 ml-auto" />}
                  </button>
                  
                  <button
                    onClick={() => handleExport('docx')}
                    disabled={!canUseFeature('exports') || loadingStates.export_docx}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingStates.export_docx ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    Export DOCX
                    {!canUseFeature('exports') && <Lock className="w-3 h-3 ml-auto" />}
                  </button>
                </div>
                
                {!canUseFeature('exports') && (
                  <button
                    onClick={() => setShowUpgradeModal(true)}
                    className="w-full mt-3 px-3 py-2 text-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    <Crown className="w-4 h-4 inline mr-2" />
                    Upgrade for More Exports
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[600px]">
              {/* Step Content Placeholder */}
              <div className="p-8">
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {steps[currentStep - 1]?.icon ? 
                      React.createElement(steps[currentStep - 1].icon, { className: "w-8 h-8 text-blue-600" }) :
                      <FileText className="w-8 h-8 text-blue-600" />
                    }
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {steps[currentStep - 1]?.title || 'Step'} Builder
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {steps[currentStep - 1]?.description || 'This step is under development'}
                  </p>
                  
                  {/* AI Enhancement Buttons */}
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <button
                      onClick={() => handleGrammarCheck('sample text', 'demo')}
                      disabled={!canUseFeature('ai_polish')}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
                    >
                      <Zap className="w-4 h-4" />
                      Grammar Check
                      {!canUseFeature('ai_polish') && <Lock className="w-3 h-3" />}
                    </button>
                    
                    <button
                      onClick={() => handleAiPolish('sample text', 'demo')}
                      disabled={!canUseFeature('ai_polish')}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors disabled:opacity-50"
                    >
                      <Wand2 className="w-4 h-4" />
                      AI Polish
                      {!canUseFeature('ai_polish') && <Lock className="w-3 h-3" />}
                    </button>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-6 text-left max-w-2xl mx-auto">
                    <h3 className="font-semibold text-blue-900 mb-3">Enhanced Features Coming Soon:</h3>
                    <ul className="text-blue-800 space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        React Hook Form with Zod validation
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        AI-powered grammar checking (LanguageTool)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        GPT-4o-mini content polishing
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        Job Description matching & ATS scoring
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        Multiple ATS-friendly templates
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        PDF/DOCX export with version control
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        Usage quotas & subscription management
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* JD Analysis Modal */}
      <AnimatePresence>
        {jdAnalysisModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Job Description Analysis</h3>
                  <button
                    onClick={() => setJdAnalysisModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Paste Job Description
                    </label>
                    <textarea
                      value={jdText}
                      onChange={(e) => setJdText(e.target.value)}
                      rows={8}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Paste the complete job description here..."
                    />
                  </div>
                  
                  <button
                    onClick={handleJdAnalysis}
                    disabled={!jdText.trim() || loadingStates.jdAnalysis}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loadingStates.jdAnalysis ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <BarChart3 className="w-4 h-4" />
                        Analyze Match
                      </>
                    )}
                  </button>
                  
                  {jdAnalysis && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Analysis Results</h4>
                      <div className="text-green-800">
                        <p>Match Score: {jdAnalysis.score}%</p>
                        <p>Missing Keywords: {jdAnalysis.missing_keywords?.join(', ')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upgrade Modal */}
      <AnimatePresence>
        {showUpgradeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full"
            >
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Upgrade to Pro</h3>
                <p className="text-gray-600 mb-6">
                  You've reached your free plan limit. Upgrade to Pro for unlimited access to all features.
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={async () => {
                      // Track upgrade click
                      await ABTestingService.trackResumeEvent('upgrade_clicked', user?.id, {
                        source: 'quota_modal',
                        plan_target: 'pro'
                      });
                      window.location.href = '/pricing';
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all"
                  >
                    View Pricing Plans
                  </button>
                  <button
                    onClick={async () => {
                      // Track modal dismissal
                      await ABTestingService.trackResumeEvent('upgrade_modal_dismissed', user?.id, {
                        source: 'quota_modal',
                        action: 'continue_free'
                      });
                      setShowUpgradeModal(false);
                    }}
                    className="w-full text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Continue with Free Plan
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedResumeBuilder;