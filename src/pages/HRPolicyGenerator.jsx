import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  X
} from 'lucide-react';
import { supabase } from '../lib/supabase-client';
import { useAuth } from '../lib/AuthContext';

// Policy categories for free and premium tiers
const FREE_CATEGORIES = [
  { value: 'leave_policy', label: 'Leave Policy', icon: Calendar },
  { value: 'remote_work_policy', label: 'Remote Work Policy', icon: Globe },
  { value: 'code_of_conduct', label: 'Code of Conduct', icon: Shield },
  { value: 'dei_policy', label: 'Diversity & Inclusion Policy', icon: Users },
  { value: 'privacy_policy', label: 'Privacy Policy', icon: Lock }
];

const PREMIUM_CATEGORIES = [
  ...FREE_CATEGORIES,
  { value: 'it_security_policy', label: 'IT Security Policy', icon: Shield },
  { value: 'data_protection_policy', label: 'Data Protection Policy', icon: Lock },
  { value: 'travel_policy', label: 'Travel Policy', icon: Globe },
  { value: 'anti_harassment_policy', label: 'Anti-Harassment Policy', icon: Shield },
  { value: 'performance_management_policy', label: 'Performance Management', icon: TrendingUp },
  { value: 'compensation_policy', label: 'Compensation Policy', icon: DollarSign },
  { value: 'benefits_policy', label: 'Benefits Policy', icon: Star },
  { value: 'workplace_safety_policy', label: 'Workplace Safety', icon: Shield },
  { value: 'social_media_policy', label: 'Social Media Policy', icon: Share2 },
  { value: 'confidentiality_policy', label: 'Confidentiality Policy', icon: Lock }
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
  'France', 'India', 'Singapore', 'Netherlands', 'Other'
];

export default function HRPolicyGenerator() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Form state
  const [currentStep, setCurrentStep] = useState(1);
  const [planType, setPlanType] = useState('free'); // 'free' or 'premium'
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPolicy, setGeneratedPolicy] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showDistributionModal, setShowDistributionModal] = useState(false);
  
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

  const validateForm = () => {
    const requiredFields = ['company_name', 'category', 'tone'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return false;
      }
    }
    return true;
  };

  const handleGenerate = async () => {
    if (!validateForm()) {
      alert('Please fill in all required fields');
      return;
    }

    if (!user) {
      alert('Please sign in to generate policies. You can sign up for free!');
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
        loadUserPolicies(); // Refresh the policies list
        loadPolicyStats(); // Refresh stats
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
      // Implementation for PDF/DOCX download would go here
      // For now, we'll create a simple text download
      const element = document.createElement('a');
      const file = new Blob([generatedPolicy.content], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${generatedPolicy.title}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (error) {
      console.error('Error downloading policy:', error);
      alert('Failed to download policy. Please try again.');
    }
  };

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

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-100 rounded-full">
                <FileText className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI-Powered HR Policy Generator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Create comprehensive, legally compliant HR policies in minutes. Choose from 200+ templates 
              and customize for your industry, location, and company needs.
            </p>
            
            {/* Stats */}
            {user && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">{policyStats.total_policies}</div>
                  <div className="text-sm text-gray-600">Total Policies</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-green-600">{policyStats.active_policies}</div>
                  <div className="text-sm text-gray-600">Active</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-yellow-600">{policyStats.draft_policies}</div>
                  <div className="text-sm text-gray-600">Drafts</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">{policyStats.total_acknowledgments}</div>
                  <div className="text-sm text-gray-600">Acknowledgments</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-red-600">{policyStats.pending_acknowledgments}</div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
              </div>
            )}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Main Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                
                {/* Plan Toggle */}
                <div className="mb-8">
                  <div className="flex justify-center mb-6">
                    <div className="bg-gray-100 p-1 rounded-lg">
                      <button
                        onClick={() => setPlanType('free')}
                        className={`px-6 py-2 rounded-md font-medium transition-all ${
                          planType === 'free'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Free Plan
                      </button>
                      <button
                        onClick={() => setPlanType('premium')}
                        className={`px-6 py-2 rounded-md font-medium transition-all ${
                          planType === 'premium'
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <Crown className="h-4 w-4 inline mr-2" />
                        Premium Plan
                      </button>
                    </div>
                  </div>

                  {/* Plan Features */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className={`p-6 rounded-lg border-2 ${planType === 'free' ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Free Plan</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />5 policy categories</li>
                        <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Basic customization</li>
                        <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Text & PDF download</li>
                        <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Professional tone</li>
                      </ul>
                    </div>
                    <div className={`p-6 rounded-lg border-2 ${planType === 'premium' ? 'border-purple-200 bg-purple-50' : 'border-gray-200'}`}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        <Crown className="h-5 w-5 inline mr-2 text-purple-600" />
                        Premium Plan
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />200+ policy templates</li>
                        <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Jurisdiction compliance</li>
                        <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Email distribution</li>
                        <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Acknowledgment tracking</li>
                        <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Multi-language support</li>
                        <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Branded PDF/DOCX</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          value={formData.company_name}
                          onChange={(e) => handleInputChange('company_name', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your company name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Industry
                        </label>
                        <input
                          type="text"
                          value={formData.industry}
                          onChange={(e) => handleInputChange('industry', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Technology, Healthcare"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Policy Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Policy Category *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
                            className={`p-4 rounded-lg border text-left transition-all ${
                              formData.category === category.value
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : isLocked
                                ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <IconComponent className="h-5 w-5" />
                              {isLocked && <Lock className="h-4 w-4" />}
                            </div>
                            <div className="text-sm font-medium">{category.label}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tone Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Policy Tone *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['friendly', 'professional', 'formal', 'casual'].map((tone) => (
                        <button
                          key={tone}
                          type="button"
                          onClick={() => handleInputChange('tone', tone)}
                          className={`p-3 rounded-lg border text-center transition-all ${
                            formData.tone === tone
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          <div className="text-sm font-medium capitalize">{tone}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Premium Fields */}
                  {planType === 'premium' && (
                    <div className="space-y-6 p-6 bg-purple-50 rounded-lg border border-purple-200">
                      <h3 className="text-lg font-semibold text-purple-900 flex items-center">
                        <Crown className="h-5 w-5 mr-2" />
                        Premium Features
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
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

                      <div className="grid md:grid-cols-2 gap-4">
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

                      {/* Custom Requirements */}
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

                  {/* Generate Button */}
                  <div className="pt-6">
                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating || !validateForm()}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isGenerating ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="mr-3"
                          >
                            <Settings className="h-5 w-5" />
                          </motion.div>
                          Generating Policy...
                        </>
                      ) : (
                        <>
                          <Zap className="h-5 w-5 mr-2" />
                          Generate HR Policy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Recent Policies */}
              {user && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl shadow-xl p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Policies</h3>
                  {isLoadingPolicies ? (
                    <div className="text-center py-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block"
                      >
                        <Settings className="h-6 w-6 text-gray-400" />
                      </motion.div>
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
                                  {policy.estimated_read_time}m read
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

              {/* Features List */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-xl p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose Our Generator?</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">AI-Powered Generation</h4>
                      <p className="text-sm text-gray-600">Advanced AI creates comprehensive, legally compliant policies</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Industry Specific</h4>
                      <p className="text-sm text-gray-600">Tailored to your industry and company size</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Compliance Ready</h4>
                      <p className="text-sm text-gray-600">Meets legal requirements for your jurisdiction</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Easy Distribution</h4>
                      <p className="text-sm text-gray-600">Send to employees and track acknowledgments</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CTA */}
              {!user && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white"
                >
                  <h3 className="text-lg font-semibold mb-2">Get Started Today</h3>
                  <p className="text-blue-100 mb-4">
                    Sign up to save your policies and access premium features
                  </p>
                  <Link
                    to="/register"
                    className="block w-full bg-white text-blue-600 text-center py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Create Free Account
                  </Link>
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
          />
        )}

        {/* Upgrade Modal */}
        {showUpgradeModal && (
          <UpgradeModal onClose={() => setShowUpgradeModal(false)} />
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
function PolicyPreviewModal({ policy, onClose, onDownload, onDistribute, planType }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{policy.title}</h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {policy.estimated_read_time} min read
                </span>
                <span className="flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  {policy.word_count} words
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: policy.content.replace(/\n/g, '<br>').replace(/## (.*)/g, '<h2>$1</h2>').replace(/### (.*)/g, '<h3>$1</h3>')
            }}
          />
        </div>
        
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-4">
            <button
              onClick={() => onDownload('txt')}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Text
            </button>
            <button
              onClick={() => onDownload('pdf')}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </button>
            {planType === 'premium' && (
              <button
                onClick={onDistribute}
                className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center"
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
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Crown className="h-8 w-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Upgrade to Premium</h2>
            <p className="text-gray-600">
              Unlock advanced features and 200+ policy templates
            </p>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <span className="text-gray-700">200+ policy templates</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <span className="text-gray-700">Jurisdiction compliance</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <span className="text-gray-700">Email distribution</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <span className="text-gray-700">Acknowledgment tracking</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <span className="text-gray-700">Branded documents</span>
            </div>
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
              className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Upgrade Now
            </button>
          </div>
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
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Distribute Policy</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
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
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    <Settings className="h-4 w-4" />
                  </motion.div>
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
