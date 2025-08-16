import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  ArrowLeft, 
  ArrowRight,
  Save, 
  Download, 
  Plus, 
  Trash2,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Settings,
  Eye,
  Wand2,
  Sparkles,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  Crown,
  Palette,
  Layout,
  FileText,
  Share2,
  Users,
  ChevronDown,
  ChevronUp,
  Star,
  Zap,
  Upload,
  Globe,
  Brain,
  TrendingUp,
  Hash
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { EnhancedResumeService } from '../services/enhancedResumeService';
import { LinkedInImportService } from '../services/linkedinImportService';
import { IndustryTemplateService } from '../services/industryTemplateService';
import { CollaborationService } from '../services/collaborationService';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Enhanced Zod Schema for validation
const resumeSchema = z.object({
  profile: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().optional(),
    location: z.string().optional(),
    headline: z.string().optional(),
    links: z.array(z.object({
      label: z.string(),
      url: z.string().url('Please enter a valid URL')
    })).optional()
  }),
  summary: z.string().min(50, 'Summary should be at least 50 characters').max(500, 'Summary should not exceed 500 characters'),
  experience: z.array(z.object({
    company: z.string().min(1, 'Company name is required'),
    role: z.string().min(1, 'Role is required'),
    location: z.string().optional(),
    start: z.string().min(1, 'Start date is required'),
    end: z.string().min(1, 'End date is required'),
    bullets: z.array(z.string()),
    technologies: z.array(z.string()).optional()
  })),
  education: z.array(z.object({
    school: z.string().min(1, 'School name is required'),
    degree: z.string().min(1, 'Degree is required'),
    start: z.string().optional(),
    end: z.string().optional(),
    details: z.string().optional()
  })),
  skills: z.object({
    core: z.array(z.string()),
    tools: z.array(z.string()),
    soft: z.array(z.string())
  }),
  projects: z.array(z.object({
    name: z.string(),
    role: z.string().optional(),
    link: z.string().optional(),
    bullets: z.array(z.string()),
    technologies: z.array(z.string()).optional()
  })).optional(),
  extras: z.object({
    certifications: z.array(z.string()),
    awards: z.array(z.string()),
    languages: z.array(z.string())
  }).optional()
});

const PremiumResumeBuilder = () => {
  // Core State
  const [user, setUser] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeData, setResumeData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [quotas, setQuotas] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Premium Features State
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [showLinkedInImport, setShowLinkedInImport] = useState(false);
  const [showCollaboration, setShowCollaboration] = useState(false);
  const [showAIPolish, setShowAIPolish] = useState(false);
  const [showJDAnalysis, setShowJDAnalysis] = useState(false);
  const [industryRecommendations, setIndustryRecommendations] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  
  // UI State
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [activeTab, setActiveTab] = useState('content');

  // AI Polish State
  const [aiPolishLoading, setAiPolishLoading] = useState(false);
  const [aiPolishHistory, setAiPolishHistory] = useState([]);
  const [selectedField, setSelectedField] = useState(null);

  // Form handling
  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      profile: { name: '', email: '', phone: '', location: '', headline: '', links: [] },
      summary: '',
      experience: [{ company: '', role: '', location: '', start: '', end: '', bullets: [''], technologies: [] }],
      education: [{ school: '', degree: '', start: '', end: '', details: '' }],
      skills: { core: [], tools: [], soft: [] },
      projects: [],
      extras: { certifications: [], awards: [], languages: [] }
    }
  });

  // Move useFieldArray to top level to fix hooks error
  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: 'experience'
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'education'
  });

  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
    control,
    name: 'projects'
  });

  const watchedData = watch();

  // Enhanced step configuration
  const steps = useMemo(() => [
    {
      id: 1,
      title: 'Personal Information',
      icon: User,
      description: 'Basic contact details and professional headline',
      fields: ['profile'],
      estimated: '2 min'
    },
    {
      id: 2,
      title: 'Professional Summary',
      icon: FileText,
      description: 'Compelling overview of your expertise',
      fields: ['summary'],
      estimated: '3 min',
      aiFeature: 'AI Polish Available'
    },
    {
      id: 3,
      title: 'Work Experience',
      icon: Briefcase,
      description: 'Your professional journey and achievements',
      fields: ['experience'],
      estimated: '8 min',
      aiFeature: 'AI Enhancement'
    },
    {
      id: 4,
      title: 'Education',
      icon: GraduationCap,
      description: 'Academic background and qualifications',
      fields: ['education'],
      estimated: '3 min'
    },
    {
      id: 5,
      title: 'Skills & Technologies',
      icon: Zap,
      description: 'Technical and soft skills',
      fields: ['skills'],
      estimated: '4 min',
      aiFeature: 'Industry Recommendations'
    },
    {
      id: 6,
      title: 'Projects & Achievements',
      icon: Award,
      description: 'Notable projects and accomplishments',
      fields: ['projects'],
      estimated: '5 min'
    },
    {
      id: 7,
      title: 'Review & Export',
      icon: Download,
      description: 'Final review and download options',
      fields: ['extras'],
      estimated: '2 min'
    }
  ], []);

  // Enhanced Resume Service instance
  const enhancedResumeService = useMemo(() => new EnhancedResumeService(), []);

  // Initialize component
  useEffect(() => {
    initializeBuilder();
  }, []);

  const initializeBuilder = async () => {
    try {
      setIsLoading(true);
      
      // Get current user
      const userResult = await EnhancedResumeService.getCurrentUser();
      if (userResult.success) {
        setUser(userResult.user);
        
        // Get user quotas
        const quotasResult = await EnhancedResumeService.getUserQuotas(userResult.user.id);
        if (quotasResult.success) {
          setQuotas(quotasResult);
        }

        // Get industry recommendations
        const recommendations = await IndustryTemplateService.recommendTemplate(watchedData, userResult.user);
        if (recommendations.success) {
          setIndustryRecommendations(recommendations.recommendations.slice(0, 3));
        }
      }
    } catch (error) {
      console.error('Error initializing builder:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-save functionality
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      autoSave();
    }, 2000);

    return () => clearTimeout(saveTimeout);
  }, [watchedData]);

  const autoSave = async () => {
    if (!user || isSaving) return;

    try {
      setIsSaving(true);
      // Auto-save logic here
      setLastSaved(new Date());
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Navigation functions
  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  // Premium feature handlers
  const handleLinkedInImport = async (file) => {
    try {
      const result = await LinkedInImportService.parseLinkedInPDF(file);
      if (result.success) {
        // Pre-fill form with imported data
        Object.keys(result.data).forEach(key => {
          if (result.data[key]) {
            setValue(key, result.data[key]);
          }
        });
        setShowLinkedInImport(false);
      }
    } catch (error) {
      console.error('LinkedIn import failed:', error);
    }
  };

  // AI Polish Functions
  const handleAIPolish = async (fieldName, currentValue, type = 'polish') => {
    if (!user) {
      setShowUpgradeModal(true);
      return;
    }

    // Check quota for free users
    if (quotas?.plan === 'free' && aiPolishHistory.length >= 3) {
      setShowUpgradeModal(true);
      return;
    }

    setAiPolishLoading(true);
    setSelectedField(fieldName);

    try {
      let result;

      switch (type) {
        case 'polish':
          result = await enhancedResumeService.polishContent(currentValue, 'professional');
          break;
        case 'metrics':
          result = await enhancedResumeService.addMetrics(currentValue);
          break;
        case 'keywords':
          result = await enhancedResumeService.addIndustryKeywords(currentValue, watchedData.profile?.headline || '');
          break;
        default:
          result = await enhancedResumeService.polishContent(currentValue, 'professional');
      }

      if (result.success) {
        setValue(fieldName, result.improved);
        setAiPolishHistory(prev => [...prev, { field: fieldName, type, timestamp: new Date() }]);
        
        // Show success notification
        showNotification('AI enhancement applied successfully!', 'success');
      } else {
        showNotification('AI enhancement failed. Please try again.', 'error');
      }
    } catch (error) {
      console.error('AI Polish error:', error);
      showNotification('AI service temporarily unavailable.', 'error');
    } finally {
      setAiPolishLoading(false);
      setSelectedField(null);
    }
  };

  // Notification function
  const showNotification = (message, type = 'info') => {
    // Simple notification - you can enhance this with a proper notification system
    console.log(`${type.toUpperCase()}: ${message}`);
  };

  // Template change handler
  const handleTemplateChange = (templateKey) => {
    setSelectedTemplate(templateKey);
    // Track template change
    if (user) {
      EnhancedResumeService.trackEvent(user.id, 'template_changed', { 
        template: templateKey,
        step: currentStep 
      });
    }
  };

  // Render functions for each step
  const renderStepContent = () => {
    const stepConfig = steps.find(s => s.id === currentStep);
    
    return (
      <div className="space-y-8">
        {/* Step Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 text-white p-3 rounded-lg">
              {React.createElement(stepConfig.icon, { size: 24 })}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{stepConfig.title}</h2>
              <p className="text-gray-600 mt-1">{stepConfig.description}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm text-blue-600 font-medium">
                  <Clock size={14} className="inline mr-1" />
                  {stepConfig.estimated}
                </span>
                {stepConfig.aiFeature && (
                  <span className="text-sm text-purple-600 font-medium">
                    <Sparkles size={14} className="inline mr-1" />
                    {stepConfig.aiFeature}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          {currentStep === 1 && renderPersonalInfo()}
          {currentStep === 2 && renderSummary()}
          {currentStep === 3 && renderExperience()}
          {currentStep === 4 && renderEducation()}
          {currentStep === 5 && renderSkills()}
          {currentStep === 6 && renderProjectsExtras()}
          {currentStep === 7 && renderReview()}
        </div>
      </div>
    );
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <Controller
            name="profile.name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., John Smith"
              />
            )}
          />
          {errors.profile?.name && (
            <p className="text-red-500 text-sm mt-1">{errors.profile.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <Controller
            name="profile.email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="john.smith@email.com"
              />
            )}
          />
          {errors.profile?.email && (
            <p className="text-red-500 text-sm mt-1">{errors.profile.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number
          </label>
          <Controller
            name="profile.phone"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="+1 (555) 123-4567"
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Location
          </label>
          <Controller
            name="profile.location"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="New York, NY"
              />
            )}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Professional Headline
        </label>
        <Controller
          name="profile.headline"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="e.g., Senior Software Engineer | Full-Stack Developer"
            />
          )}
        />
        <p className="text-gray-500 text-sm mt-1">
          A brief, compelling statement that summarizes your professional identity
        </p>
      </div>

      {/* LinkedIn Import CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Upload size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Import from LinkedIn</h3>
              <p className="text-gray-600 text-sm">Auto-fill your profile from LinkedIn PDF export</p>
            </div>
          </div>
          <button
            onClick={() => setShowLinkedInImport(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Import Profile
          </button>
        </div>
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-gray-700">
            Professional Summary <span className="text-red-500">*</span>
          </label>
          <button
            onClick={() => handleAIPolish('summary', watchedData.summary)}
            className="flex items-center gap-2 bg-purple-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
          >
            <Wand2 size={14} />
            AI Polish
          </button>
        </div>
        <Controller
          name="summary"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Write a compelling 2-3 sentence overview of your professional background, key skills, and career achievements. This is your elevator pitch to potential employers."
            />
          )}
        />
        {errors.summary && (
          <p className="text-red-500 text-sm mt-1">{errors.summary.message}</p>
        )}
        <div className="flex justify-between mt-2">
          <p className="text-gray-500 text-sm">
            Tip: Focus on your unique value proposition and key achievements
          </p>
          <span className={`text-sm ${watchedData.summary?.length > 400 ? 'text-red-500' : 'text-gray-500'}`}>
            {watchedData.summary?.length || 0}/500
          </span>
        </div>
      </div>

      {/* AI Writing Assistance */}
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-purple-600 text-white p-2 rounded-lg">
            <Sparkles size={20} />
          </div>
          <h3 className="font-semibold text-gray-900">AI Writing Assistant</h3>
        </div>
        <p className="text-gray-700 mb-4">
          Get personalized suggestions to improve your summary's impact and ATS compatibility.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button 
            onClick={() => handleAIPolish('summary', watchedData.summary, 'polish')}
            disabled={aiPolishLoading && selectedField === 'summary'}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              aiPolishLoading && selectedField === 'summary'
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-purple-200 text-purple-700 hover:bg-purple-50'
            }`}
          >
            {aiPolishLoading && selectedField === 'summary' ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
            ) : (
              <Brain size={14} />
            )}
            Professional Tone
          </button>
          <button 
            onClick={() => handleAIPolish('summary', watchedData.summary, 'metrics')}
            disabled={aiPolishLoading && selectedField === 'summary'}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              aiPolishLoading && selectedField === 'summary'
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-purple-200 text-purple-700 hover:bg-purple-50'
            }`}
          >
            {aiPolishLoading && selectedField === 'summary' ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
            ) : (
              <TrendingUp size={14} />
            )}
            Add Metrics
          </button>
          <button 
            onClick={() => handleAIPolish('summary', watchedData.summary, 'keywords')}
            disabled={aiPolishLoading && selectedField === 'summary'}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              aiPolishLoading && selectedField === 'summary'
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-purple-200 text-purple-700 hover:bg-purple-50'
            }`}
          >
            {aiPolishLoading && selectedField === 'summary' ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
            ) : (
              <Hash size={14} />
            )}
            Industry Keywords
          </button>
        </div>
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      {experienceFields.map((field, index) => (
        <div key={field.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Experience #{index + 1}
            </h3>
            {experienceFields.length > 1 && (
              <button
                onClick={() => removeExperience(index)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company <span className="text-red-500">*</span>
              </label>
              <Controller
                name={`experience.${index}.company`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Google Inc."
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Role/Position <span className="text-red-500">*</span>
              </label>
              <Controller
                name={`experience.${index}.role`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Senior Software Engineer"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Start Date <span className="text-red-500">*</span>
              </label>
              <Controller
                name={`experience.${index}.start`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., JAN 2022"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                End Date <span className="text-red-500">*</span>
              </label>
              <Controller
                name={`experience.${index}.end`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Present or DEC 2023"
                  />
                )}
              />
            </div>
          </div>

          <ExperienceBullets experienceIndex={index} control={control} />
        </div>
      ))}

      <button
        onClick={() => appendExperience({ company: '', role: '', location: '', start: '', end: '', bullets: [''] })}
        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
      >
        <Plus size={24} className="mx-auto mb-2" />
        Add Another Experience
      </button>
    </div>
  );

  const ExperienceBullets = ({ experienceIndex, control }) => {
    const { fields, append, remove } = useFieldArray({
      control,
      name: `experience.${experienceIndex}.bullets`
    });

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-gray-700">
            Key Achievements & Responsibilities
          </label>
          <button
            onClick={() => handleAIPolish(`experience.${experienceIndex}.bullets`, fields.map(f => f.value).join('\n'), 'polish')}
            className="flex items-center gap-2 bg-purple-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
          >
            <Wand2 size={14} />
            AI Enhance
          </button>
        </div>
        
        {fields.map((field, bulletIndex) => (
          <div key={field.id} className="flex gap-2">
            <Controller
              name={`experience.${experienceIndex}.bullets.${bulletIndex}`}
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={2}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="• Quantify your achievements with metrics (e.g., increased sales by 25%, managed team of 10 people)"
                />
              )}
            />
            {fields.length > 1 && (
              <button
                onClick={() => remove(bulletIndex)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
        
        <button
          onClick={() => append('')}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
        >
          <Plus size={16} />
          Add Achievement
        </button>
      </div>
    );
  };

  const renderEducation = () => (
    <div className="space-y-6">
      {educationFields.map((field, index) => (
        <div key={field.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Education #{index + 1}
            </h3>
            {educationFields.length > 1 && (
              <button
                onClick={() => removeEducation(index)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                School/University <span className="text-red-500">*</span>
              </label>
              <Controller
                name={`education.${index}.school`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Stanford University"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Degree <span className="text-red-500">*</span>
              </label>
              <Controller
                name={`education.${index}.degree`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Bachelor of Science in Computer Science"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Start Year
              </label>
              <Controller
                name={`education.${index}.start`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 2018"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                End Year
              </label>
              <Controller
                name={`education.${index}.end`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 2022"
                  />
                )}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => appendEducation({ school: '', degree: '', start: '', end: '', details: '' })}
        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
      >
        <Plus size={24} className="mx-auto mb-2" />
        Add Education
      </button>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-6">
      <SkillsSection title="Core Technical Skills" name="skills.core" control={control} />
      <SkillsSection title="Tools & Technologies" name="skills.tools" control={control} />
      <SkillsSection title="Soft Skills" name="skills.soft" control={control} />
      
      {/* Industry Recommendations */}
      {industryRecommendations.length > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-600 text-white p-2 rounded-lg">
              <Target size={20} />
            </div>
            <h3 className="font-semibold text-gray-900">Industry Skill Recommendations</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Based on your profile, consider adding these in-demand skills:
          </p>
          <div className="flex flex-wrap gap-2">
            {industryRecommendations.map((rec, index) => (
              <span key={index} className="bg-white border border-green-300 text-green-700 px-3 py-1 rounded-full text-sm">
                {rec.template.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const SkillsSection = ({ title, name, control }) => {
    const { fields, append, remove } = useFieldArray({
      control,
      name
    });

    return (
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {fields.map((field, index) => (
            <div key={field.id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
              <Controller
                name={`${name}.${index}`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="bg-transparent border-none outline-none text-sm"
                    placeholder="Skill name"
                  />
                )}
              />
              <button
                onClick={() => remove(index)}
                className="text-blue-600 hover:text-blue-800"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => append('')}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
        >
          <Plus size={16} />
          Add Skill
        </button>
      </div>
    );
  };

  const renderProjectsExtras = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Projects (Optional)</h3>
        <ProjectsSection control={control} />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
        <ExtrasSection control={control} />
      </div>
    </div>
  );

  const ProjectsSection = ({ control }) => (
    <div className="space-y-4">
      {projectFields.map((field, index) => (
        <div key={field.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Project #{index + 1}</h4>
            <button
              onClick={() => removeProject(index)}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name={`projects.${index}.name`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Project name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
            />
            <Controller
              name={`projects.${index}.link`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Project URL (optional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
            />
          </div>
        </div>
      ))}
      
      <button
        onClick={() => appendProject({ name: '', role: '', link: '', bullets: [], technologies: [] })}
        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
      >
        <Plus size={20} className="mx-auto mb-1" />
        Add Project
      </button>
    </div>
  );

  const ExtrasSection = ({ control }) => (
    <div className="space-y-6">
      <ExtrasList title="Certifications" name="extras.certifications" control={control} />
      <ExtrasList title="Awards & Achievements" name="extras.awards" control={control} />
      <ExtrasList title="Languages" name="extras.languages" control={control} />
    </div>
  );

  const ExtrasList = ({ title, name, control }) => {
    const { fields, append, remove } = useFieldArray({
      control,
      name
    });

    return (
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">{title}</h4>
        <div className="space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <Controller
                name={`${name}.${index}`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder={`Add ${title.toLowerCase()}`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}
              />
              <button
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            onClick={() => append('')}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
          >
            <Plus size={16} />
            Add {title}
          </button>
        </div>
      </div>
    );
  };

  const renderReview = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-green-600 text-white p-2 rounded-lg">
            <CheckCircle size={20} />
          </div>
          <h3 className="font-semibold text-gray-900">Resume Complete!</h3>
        </div>
        <p className="text-gray-700">
          Your professional resume is ready. Review the preview and export when you're satisfied.
        </p>
      </div>

      {/* Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
          <Download size={20} />
          Download PDF
        </button>
        <button className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
          <FileText size={20} />
          Download DOCX
        </button>
      </div>

      {/* Premium Features */}
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-purple-600 text-white p-2 rounded-lg">
            <Crown size={20} />
          </div>
          <h3 className="font-semibold text-gray-900">Premium Features</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <Target className="mx-auto mb-2 text-purple-600" size={24} />
            <p className="font-medium">ATS Score: 85%</p>
            <p className="text-sm text-gray-600">Excellent</p>
          </div>
          <div className="text-center">
            <Users className="mx-auto mb-2 text-purple-600" size={24} />
            <p className="font-medium">Share & Collaborate</p>
            <p className="text-sm text-gray-600">Get feedback</p>
          </div>
          <div className="text-center">
            <Globe className="mx-auto mb-2 text-purple-600" size={24} />
            <p className="font-medium">Cover Letter</p>
            <p className="text-sm text-gray-600">Auto-generate</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Resume Builder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-900">Resume Builder</h1>
              {lastSaved && (
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <CheckCircle size={14} className="text-green-500" />
                  Last saved: {lastSaved.toLocaleTimeString()}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              {/* Template Selector */}
              <button
                onClick={() => setShowTemplateLibrary(true)}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Palette size={16} />
                Template
              </button>
              
              {/* Preview Toggle */}
              <button
                onClick={() => setPreviewMode(previewMode === 'desktop' ? 'mobile' : 'desktop')}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Eye size={16} />
                {previewMode === 'desktop' ? 'Mobile' : 'Desktop'} Preview
              </button>
              
              {/* Save Button */}
              <button
                onClick={autoSave}
                disabled={isSaving}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <div className={`${sidebarCollapsed ? 'col-span-1' : 'col-span-3'} transition-all duration-300`}>
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                {!sidebarCollapsed && <h3 className="font-semibold text-gray-900">Progress</h3>}
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {sidebarCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                </button>
              </div>
              
              {!sidebarCollapsed && (
                <div className="space-y-3">
                  {steps.map((step) => (
                    <button
                      key={step.id}
                      onClick={() => goToStep(step.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                        currentStep === step.id
                          ? 'bg-blue-50 border border-blue-200 text-blue-700'
                          : 'hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          currentStep === step.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {React.createElement(step.icon, { size: 16 })}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{step.title}</p>
                          <p className="text-xs opacity-70">{step.estimated}</p>
                        </div>
                        {currentStep > step.id && (
                          <CheckCircle size={16} className="text-green-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className={`${sidebarCollapsed ? 'col-span-7' : 'col-span-5'} transition-all duration-300`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={20} />
                Previous
              </button>
              
              <button
                onClick={nextStep}
                disabled={currentStep === steps.length}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Live Preview */}
          <div className={`${sidebarCollapsed ? 'col-span-4' : 'col-span-4'} transition-all duration-300`}>
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Live Preview</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{selectedTemplate}</span>
                  <button className="text-gray-500 hover:text-gray-700">
                    <Settings size={16} />
                  </button>
                </div>
              </div>
              
              <div className={`border border-gray-200 rounded-lg overflow-hidden ${
                previewMode === 'mobile' ? 'max-w-xs mx-auto' : ''
              }`}>
                <div className="bg-white p-4 text-xs">
                  <div className="mb-3">
                    <h3 className="font-bold text-sm text-gray-900">
                      {watchedData.profile?.name || 'Your Name'}
                    </h3>
                    <p className="text-gray-600">{watchedData.profile?.email || 'your.email@example.com'}</p>
                    <p className="text-gray-600">{watchedData.profile?.headline || 'Professional Headline'}</p>
                  </div>
                  
                  {watchedData.summary && (
                    <div className="mb-3">
                      <h4 className="font-semibold text-gray-900 mb-1">Summary</h4>
                      <p className="text-gray-700 text-xs leading-relaxed">
                        {watchedData.summary.substring(0, 120)}...
                      </p>
                    </div>
                  )}
                  
                  {watchedData.experience?.length > 0 && (
                    <div className="mb-3">
                      <h4 className="font-semibold text-gray-900 mb-1">Experience</h4>
                      {watchedData.experience.slice(0, 2).map((exp, index) => (
                        <div key={index} className="mb-2">
                          <p className="font-medium text-xs">{exp.role || 'Role'}</p>
                          <p className="text-gray-600 text-xs">{exp.company || 'Company'}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {watchedData.skills?.core?.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {watchedData.skills.core.slice(0, 4).map((skill, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 mb-2">Live preview updates as you type</p>
                <div className="flex justify-center gap-2">
                  <Star className="text-yellow-400" size={14} />
                  <Star className="text-yellow-400" size={14} />
                  <Star className="text-yellow-400" size={14} />
                  <Star className="text-yellow-400" size={14} />
                  <Star className="text-gray-300" size={14} />
                </div>
                <p className="text-xs text-gray-500 mt-1">ATS Score: 85%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals and Overlays */}
      {showUpgradeModal && (
        <UpgradeModal onClose={() => setShowUpgradeModal(false)} />
      )}
      
      {showLinkedInImport && (
        <LinkedInImportModal 
          onClose={() => setShowLinkedInImport(false)}
          onImport={handleLinkedInImport}
        />
      )}
    </div>
  );
};

// Modal Components
const UpgradeModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-8 max-w-md mx-4">
      <div className="text-center">
        <div className="bg-purple-100 text-purple-600 p-3 rounded-full inline-block mb-4">
          <Crown size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Upgrade to Premium</h3>
        <p className="text-gray-600 mb-6">
          Unlock unlimited AI enhancements, premium templates, and advanced features.
        </p>
        <div className="space-y-3">
          <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
            Upgrade Now - $9.99/month
          </button>
          <button 
            onClick={onClose}
            className="w-full text-gray-600 hover:text-gray-800"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  </div>
);

const LinkedInImportModal = ({ onClose, onImport }) => {
  const [dragActive, setDragActive] = useState(false);
  
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files[0]) {
      onImport(files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-lg mx-4">
        <div className="text-center mb-6">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full inline-block mb-4">
            <Upload size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Import from LinkedIn</h3>
          <p className="text-gray-600">
            Upload your LinkedIn PDF export to auto-fill your resume
          </p>
        </div>
        
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
        >
          <Upload size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-2">Drag and drop your LinkedIn PDF here</p>
          <p className="text-sm text-gray-500">or click to browse files</p>
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => e.target.files[0] && onImport(e.target.files[0])}
          />
        </div>
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Browse Files
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumResumeBuilder;
