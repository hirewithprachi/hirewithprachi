import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  Hash,
  Monitor,
  Smartphone,
  Tablet,
  X
} from 'lucide-react';

// Modern Resume Schema
const resumeSchema = z.object({
  profile: z.object({
    name: z.string().min(2, 'Name required'),
    email: z.string().email('Valid email required'),
    phone: z.string().optional(),
    location: z.string().optional(),
    headline: z.string().optional(),
    website: z.string().optional()
  }),
  summary: z.string().min(50, 'Summary must be at least 50 characters'),
  experience: z.array(z.object({
    company: z.string().min(1, 'Company required'),
    role: z.string().min(1, 'Role required'),
    location: z.string().optional(),
    start: z.string().min(1, 'Start date required'),
    end: z.string().min(1, 'End date required'),
    achievements: z.array(z.string()).min(1, 'At least one achievement required')
  })),
  education: z.array(z.object({
    school: z.string().min(1, 'School required'),
    degree: z.string().min(1, 'Degree required'),
    year: z.string().optional(),
    gpa: z.string().optional()
  })),
  skills: z.object({
    technical: z.array(z.string()),
    soft: z.array(z.string()),
    languages: z.array(z.string())
  }),
  projects: z.array(z.object({
    name: z.string(),
    description: z.string(),
    tech: z.array(z.string()),
    link: z.string().optional()
  })).optional()
});

// Template configurations
const templates = [
  {
    id: 'modern',
    name: 'Modern',
    preview: '/api/placeholder/300/400',
    colors: { primary: '#3B82F6', secondary: '#1E40AF', accent: '#F3F4F6' }
  },
  {
    id: 'classic',
    name: 'Classic',
    preview: '/api/placeholder/300/400',
    colors: { primary: '#1F2937', secondary: '#374151', accent: '#F9FAFB' }
  },
  {
    id: 'creative',
    name: 'Creative',
    preview: '/api/placeholder/300/400',
    colors: { primary: '#7C3AED', secondary: '#5B21B6', accent: '#F5F3FF' }
  },
  {
    id: 'professional',
    name: 'Professional',
    preview: '/api/placeholder/300/400',
    colors: { primary: '#059669', secondary: '#047857', accent: '#ECFDF5' }
  }
];

const ModernResumeBuilder = () => {
  // Core state
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [previewMode, setPreviewMode] = useState('desktop');
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  
  // UI state
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  // Form setup
  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      profile: { name: '', email: '', phone: '', location: '', headline: '', website: '' },
      summary: '',
      experience: [{ company: '', role: '', location: '', start: '', end: '', achievements: [''] }],
      education: [{ school: '', degree: '', year: '', gpa: '' }],
      skills: { technical: [], soft: [], languages: [] },
      projects: []
    }
  });

  // Field arrays
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

  // Steps configuration
  const steps = useMemo(() => [
    { id: 1, title: 'Personal Info', icon: User, component: 'profile' },
    { id: 2, title: 'Summary', icon: FileText, component: 'summary' },
    { id: 3, title: 'Experience', icon: Briefcase, component: 'experience' },
    { id: 4, title: 'Education', icon: GraduationCap, component: 'education' },
    { id: 5, title: 'Skills', icon: Zap, component: 'skills' },
    { id: 6, title: 'Projects', icon: Award, component: 'projects' },
    { id: 7, title: 'Review', icon: CheckCircle, component: 'review' }
  ], []);

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      const data = JSON.stringify(watchedData);
      localStorage.setItem('resume-draft', data);
      setLastSaved(new Date());
    }, 2000);

    return () => clearTimeout(timer);
  }, [watchedData]);

  // Navigation functions
  const nextStep = useCallback(() => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, steps.length]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  // Template functions
  const handleTemplateChange = useCallback((templateId) => {
    setSelectedTemplate(templateId);
    setShowTemplateSelector(false);
  }, []);

  // AI Polish function
  const handleAIPolish = useCallback(async (field, content) => {
    setIsLoading(true);
    try {
      // Simulate AI enhancement
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Enhanced content simulation
      const enhanced = content + ' (AI Enhanced)';
      setValue(field, enhanced);
    } catch (error) {
      console.error('AI Polish failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [setValue]);

  // Achievement field array for experience
  const ExperienceAchievements = ({ experienceIndex }) => {
    const { fields, append, remove } = useFieldArray({
      control,
      name: `experience.${experienceIndex}.achievements`
    });

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Key Achievements
          </label>
          <button
            type="button"
            onClick={() => handleAIPolish(`experience.${experienceIndex}.achievements`, fields.map(f => f.value).join('\n'))}
            className="flex items-center gap-2 px-3 py-1 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors"
          >
            <Wand2 size={14} />
            AI Enhance
          </button>
        </div>
        
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <Controller
              name={`experience.${experienceIndex}.achievements.${index}`}
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={2}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="• Describe a key achievement with metrics..."
                />
              )}
            />
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-2 text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={() => append('')}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
        >
          <Plus size={16} className="inline mr-2" />
          Add Achievement
        </button>
      </div>
    );
  };

  // Render step content
  const renderStepContent = () => {
    const currentStepData = steps[currentStep - 1];
    
    switch (currentStepData.component) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <Controller
                  name="profile.name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  )}
                />
                {errors.profile?.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.profile.name.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <Controller
                  name="profile.email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  )}
                />
                {errors.profile?.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.profile.email.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Controller
                  name="profile.phone"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  )}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <Controller
                  name="profile.location"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="New York, NY"
                    />
                  )}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Headline
              </label>
              <Controller
                name="profile.headline"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Senior Software Engineer | Full-Stack Developer"
                  />
                )}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website/Portfolio
              </label>
              <Controller
                name="profile.website"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="url"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://johndoe.dev"
                  />
                )}
              />
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Professional Summary *
                </label>
                <button
                  type="button"
                  onClick={() => handleAIPolish('summary', watchedData.summary)}
                  className="flex items-center gap-2 px-3 py-1 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Wand2 size={14} />
                  )}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Write a compelling 2-3 sentence overview of your professional background, key skills, and career achievements..."
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
                <span className={`text-sm ${watchedData.summary?.length > 300 ? 'text-red-500' : 'text-gray-500'}`}>
                  {watchedData.summary?.length || 0}/500
                </span>
              </div>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-6">
            {experienceFields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Experience #{index + 1}
                  </h3>
                  {experienceFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company *
                    </label>
                    <Controller
                      name={`experience.${index}.company`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Google Inc."
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title *
                    </label>
                    <Controller
                      name={`experience.${index}.role`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Senior Software Engineer"
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <Controller
                      name={`experience.${index}.start`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Jan 2022"
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date *
                    </label>
                    <Controller
                      name={`experience.${index}.end`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Present"
                        />
                      )}
                    />
                  </div>
                </div>

                <ExperienceAchievements experienceIndex={index} />
              </motion.div>
            ))}

            <button
              type="button"
              onClick={() => appendExperience({ company: '', role: '', location: '', start: '', end: '', achievements: [''] })}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
            >
              <Plus size={24} className="mx-auto mb-2" />
              Add Work Experience
            </button>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-6">
            {educationFields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Education #{index + 1}
                  </h3>
                  {educationFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      School/University *
                    </label>
                    <Controller
                      name={`education.${index}.school`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Stanford University"
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Degree *
                    </label>
                    <Controller
                      name={`education.${index}.degree`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Bachelor of Science in Computer Science"
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Graduation Year
                    </label>
                    <Controller
                      name={`education.${index}.year`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="2022"
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GPA (Optional)
                    </label>
                    <Controller
                      name={`education.${index}.gpa`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="3.8/4.0"
                        />
                      )}
                    />
                  </div>
                </div>
              </motion.div>
            ))}

            <button
              type="button"
              onClick={() => appendEducation({ school: '', degree: '', year: '', gpa: '' })}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
            >
              <Plus size={24} className="mx-auto mb-2" />
              Add Education
            </button>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technical Skills
              </label>
              <Controller
                name="skills.technical"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value?.join(', ') || ''}
                    onChange={(e) => field.onChange(e.target.value.split(', ').filter(s => s.trim()))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="JavaScript, React, Node.js, Python, SQL"
                  />
                )}
              />
              <p className="text-gray-500 text-sm mt-1">Separate skills with commas</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Soft Skills
              </label>
              <Controller
                name="skills.soft"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value?.join(', ') || ''}
                    onChange={(e) => field.onChange(e.target.value.split(', ').filter(s => s.trim()))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Leadership, Communication, Problem Solving, Teamwork"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Languages
              </label>
              <Controller
                name="skills.languages"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value?.join(', ') || ''}
                    onChange={(e) => field.onChange(e.target.value.split(', ').filter(s => s.trim()))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="English (Native), Spanish (Fluent), French (Conversational)"
                  />
                )}
              />
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            {projectFields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Project #{index + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Name
                    </label>
                    <Controller
                      name={`projects.${index}.name`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="E-commerce Platform"
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Link
                    </label>
                    <Controller
                      name={`projects.${index}.link`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="url"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://github.com/username/project"
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Controller
                    name={`projects.${index}.description`}
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Describe what you built and its impact..."
                      />
                    )}
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Technologies Used
                  </label>
                  <Controller
                    name={`projects.${index}.tech`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        value={field.value?.join(', ') || ''}
                        onChange={(e) => field.onChange(e.target.value.split(', ').filter(s => s.trim()))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="React, Node.js, MongoDB"
                      />
                    )}
                  />
                </div>
              </motion.div>
            ))}

            <button
              type="button"
              onClick={() => appendProject({ name: '', description: '', tech: [], link: '' })}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
            >
              <Plus size={24} className="mx-auto mb-2" />
              Add Project
            </button>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="text-green-600" size={24} />
                <h3 className="text-lg font-semibold text-green-900">
                  Resume Complete!
                </h3>
              </div>
              <p className="text-green-700">
                Your resume is ready for download. Review the preview and make any final adjustments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center justify-center gap-3 bg-blue-600 text-white px-6 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <Download size={20} />
                Download PDF
              </button>
              
              <button
                type="button"
                onClick={() => setShowTemplateSelector(true)}
                className="flex items-center justify-center gap-3 bg-purple-600 text-white px-6 py-4 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                <Palette size={20} />
                Change Template
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Resume Preview Component
  const ResumePreview = () => {
    const template = templates.find(t => t.id === selectedTemplate);
    
    return (
      <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${
        previewMode === 'mobile' ? 'max-w-sm' : 
        previewMode === 'tablet' ? 'max-w-md' : 'max-w-2xl'
      }`}>
        <div 
          className="p-8"
          style={{ 
            backgroundColor: template?.colors.accent,
            color: template?.colors.primary 
          }}
        >
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">
              {watchedData.profile?.name || 'Your Name'}
            </h1>
            <p className="text-lg mb-3" style={{ color: template?.colors.secondary }}>
              {watchedData.profile?.headline || 'Professional Headline'}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              {watchedData.profile?.email && (
                <span>{watchedData.profile.email}</span>
              )}
              {watchedData.profile?.phone && (
                <span>{watchedData.profile.phone}</span>
              )}
              {watchedData.profile?.location && (
                <span>{watchedData.profile.location}</span>
              )}
              {watchedData.profile?.website && (
                <span>{watchedData.profile.website}</span>
              )}
            </div>
          </div>

          {/* Summary */}
          {watchedData.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3" style={{ color: template?.colors.primary }}>
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {watchedData.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {watchedData.experience?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3" style={{ color: template?.colors.primary }}>
                Work Experience
              </h2>
              {watchedData.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{exp.role}</h3>
                      <p style={{ color: template?.colors.secondary }}>{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-600">
                      {exp.start} - {exp.end}
                    </span>
                  </div>
                  {exp.achievements?.length > 0 && (
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {watchedData.education?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3" style={{ color: template?.colors.primary }}>
                Education
              </h2>
              {watchedData.education.map((edu, index) => (
                <div key={index} className="mb-2">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p style={{ color: template?.colors.secondary }}>
                    {edu.school} {edu.year && `• ${edu.year}`} {edu.gpa && `• GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {(watchedData.skills?.technical?.length > 0 || 
            watchedData.skills?.soft?.length > 0 || 
            watchedData.skills?.languages?.length > 0) && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3" style={{ color: template?.colors.primary }}>
                Skills
              </h2>
              {watchedData.skills.technical?.length > 0 && (
                <div className="mb-2">
                  <strong>Technical:</strong> {watchedData.skills.technical.join(', ')}
                </div>
              )}
              {watchedData.skills.soft?.length > 0 && (
                <div className="mb-2">
                  <strong>Soft Skills:</strong> {watchedData.skills.soft.join(', ')}
                </div>
              )}
              {watchedData.skills.languages?.length > 0 && (
                <div className="mb-2">
                  <strong>Languages:</strong> {watchedData.skills.languages.join(', ')}
                </div>
              )}
            </div>
          )}

          {/* Projects */}
          {watchedData.projects?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3" style={{ color: template?.colors.primary }}>
                Projects
              </h2>
              {watchedData.projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{project.name}</h3>
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm hover:underline"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                  {project.tech?.length > 0 && (
                    <p className="text-sm" style={{ color: template?.colors.secondary }}>
                      <strong>Technologies:</strong> {project.tech.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900">
                Resume Builder
              </h1>
              {lastSaved && (
                <span className="text-sm text-gray-500">
                  Saved {lastSaved.toLocaleTimeString()}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              {/* Preview Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`p-2 rounded ${previewMode === 'desktop' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Monitor size={16} />
                </button>
                <button
                  onClick={() => setPreviewMode('tablet')}
                  className={`p-2 rounded ${previewMode === 'tablet' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Tablet size={16} />
                </button>
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={`p-2 rounded ${previewMode === 'mobile' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Smartphone size={16} />
                </button>
              </div>
              
              {/* Template Button */}
              <button
                onClick={() => setShowTemplateSelector(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Palette size={16} />
                Templates
              </button>
              
              {/* Preview Toggle */}
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Eye size={16} />
                {showPreview ? 'Hide' : 'Show'} Preview
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid gap-8 ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Form Section */}
          <div className="space-y-6">
            {/* Step Progress */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
                </h2>
                <div className="text-sm text-gray-500">
                  {Math.round((currentStep / steps.length) * 100)}% Complete
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                />
              </div>
              
              {/* Step Navigation */}
              <div className="flex flex-wrap gap-2">
                {steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentStep === step.id
                        ? 'bg-blue-100 text-blue-700'
                        : currentStep > step.id
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <step.icon size={16} />
                    {step.title}
                    {currentStep > step.id && <CheckCircle size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <form onSubmit={handleSubmit((data) => console.log(data))}>
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
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft size={16} />
                    Previous
                  </button>
                  
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={currentStep === steps.length}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
                  <div className="text-sm text-gray-500">
                    {selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)} Template
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <ResumePreview />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Template Selector Modal */}
      <AnimatePresence>
        {showTemplateSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Choose Template</h2>
                  <button
                    onClick={() => setShowTemplateSelector(false)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`cursor-pointer rounded-lg border-2 transition-all ${
                        selectedTemplate === template.id
                          ? 'border-blue-500 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleTemplateChange(template.id)}
                    >
                      <div className="p-4">
                        <div
                          className="w-full h-48 rounded-lg mb-3"
                          style={{ backgroundColor: template.colors.accent }}
                        >
                          <div className="p-4 h-full flex flex-col justify-between">
                            <div>
                              <div className="h-3 bg-gray-400 rounded mb-2"></div>
                              <div className="h-2 bg-gray-300 rounded mb-1"></div>
                              <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                            </div>
                            <div>
                              <div className="h-2 bg-gray-300 rounded mb-1"></div>
                              <div className="h-2 bg-gray-300 rounded w-5/6"></div>
                            </div>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900">{template.name}</h3>
                        {selectedTemplate === template.id && (
                          <div className="flex items-center gap-2 mt-2 text-blue-600">
                            <CheckCircle size={16} />
                            <span className="text-sm">Selected</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModernResumeBuilder;
