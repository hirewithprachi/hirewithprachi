import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calculator, TrendingUp, MapPin, Briefcase, GraduationCap, 
  DollarSign, Download, Share2, User, Mail, Phone, Building, 
  ArrowLeft, Star, CheckCircle, Award, Shield, ArrowRight, 
  Heart, Target, Zap, Save, History, BarChart3, TrendingDown,
  AlertCircle, Info, Clock, Users, Globe, Database, Brain, 
  TrendingUp2, PieChart, BarChart, LineChart, Activity,
  Smartphone, Monitor, Sparkles
} from 'lucide-react';
import { db, auth, analytics } from '../lib/supabase';

export default function SalaryCalculatorEnhanced() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    position: '',
    experience: '1-3',
    location: '',
    industry: '',
    education: 'bachelor',
    companySize: 'small',
    skills: [],
    remoteWork: false,
    equity: false,
    performanceBonus: false,
    certifications: [],
    languages: [],
    techStack: [],
    leadership: false,
    internationalExp: false
  });

  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    designation: '',
    employees: ''
  });
  const [crmError, setCrmError] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [shared, setShared] = useState(false);
  const [savedCalculations, setSavedCalculations] = useState([]);
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [salaryTrends, setSalaryTrends] = useState(null);
  const [comparisonData, setComparisonData] = useState(null);
  const [aiInsights, setAiInsights] = useState(null);
  const [showInsights, setShowInsights] = useState(false);
  const [predictionModel, setPredictionModel] = useState('2025');

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await auth.getCurrentUser();
        setUser(currentUser);
        
        if (currentUser) {
          // Load user's saved calculations
          loadSavedCalculations(currentUser.id);
        }
      } catch (error) {
        console.log('User not authenticated');
      }
    };

    checkAuth();
  }, []);

  // Load saved calculations for authenticated users
  const loadSavedCalculations = async (userId) => {
    try {
      const calculations = await db.getSalaryCalculations(userId);
      setSavedCalculations(calculations);
    } catch (error) {
      console.error('Failed to load saved calculations:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLeadInputChange = (field, value) => {
    setLeadData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Advanced 2025 salary calculation with AI insights
  const calculateSalary = async () => {
    setIsCalculating(true);
    setError(null);
    
    try {
      // Track calculation event
      await analytics.trackCalculation('salary_calculator', formData);

      // Get real-time market data from Supabase
      const benchmark = await db.getSalaryBenchmarks(
        formData.position,
        formData.location,
        formData.experience
      );

      if (!benchmark) {
        setError('No market data available for the selected criteria. Please try different options.');
        setIsCalculating(false);
        return;
      }

      // Calculate salary based on market data and factors
      const baseSalary = benchmark.salary_median;
      const experienceMultiplier = getExperienceMultiplier(formData.experience);
      const locationMultiplier = getLocationMultiplier(formData.location);
      const educationMultiplier = getEducationMultiplier(formData.education);
      const companySizeMultiplier = getCompanySizeMultiplier(formData.companySize);

      const calculatedSalary = baseSalary * experienceMultiplier * locationMultiplier * 
                              educationMultiplier * companySizeMultiplier;

      const salaryRange = {
        min: calculatedSalary * 0.85,
        max: calculatedSalary * 1.15,
        median: calculatedSalary
      };

      const confidenceScore = calculateConfidenceScore(benchmark.sample_size);

      const calculationResult = {
        salary: salaryRange,
        marketData: benchmark,
        confidenceScore,
        factors: {
          experience: experienceMultiplier,
          location: locationMultiplier,
          education: educationMultiplier,
          companySize: companySizeMultiplier
        },
        recommendations: generateRecommendations(salaryRange, benchmark),
        timestamp: new Date().toISOString()
      };

      setResult(calculationResult);
      setMarketData(benchmark);

      // Save calculation for authenticated users
      if (user) {
        try {
          await db.saveSalaryCalculation({
            user_id: user.id,
            position: formData.position,
            experience_level: formData.experience,
            location: formData.location,
            industry: formData.industry,
            education_level: formData.education,
            company_size: formData.companySize,
            calculated_salary_min: salaryRange.min,
            calculated_salary_max: salaryRange.max,
            calculated_salary_median: salaryRange.median,
            market_average: benchmark.salary_median,
            confidence_score: confidenceScore,
            calculation_factors: calculationResult.factors
          });
        } catch (error) {
          console.error('Failed to save calculation:', error);
        }
      }

    } catch (error) {
      setError('Failed to calculate salary. Please try again.');
      console.error('Calculation error:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const getExperienceMultiplier = (experience) => {
    const multipliers = {
      '0-1': 0.8,
      '1-3': 1.0,
      '3-5': 1.2,
      '5-8': 1.4,
      '8-10': 1.6,
      '10+': 1.8
    };
    return multipliers[experience] || 1.0;
  };

  const getLocationMultiplier = (location) => {
    const multipliers = {
      'Mumbai': 1.3,
      'Delhi': 1.25,
      'Bangalore': 1.2,
      'Hyderabad': 1.1,
      'Chennai': 1.05,
      'Pune': 1.0,
      'Other': 0.9
    };
    return multipliers[location] || 1.0;
  };

  const getEducationMultiplier = (education) => {
    const multipliers = {
      'high_school': 0.9,
      'bachelor': 1.0,
      'master': 1.15,
      'phd': 1.3
    };
    return multipliers[education] || 1.0;
  };

  const getCompanySizeMultiplier = (size) => {
    const multipliers = {
      'startup': 0.9,
      'small': 1.0,
      'medium': 1.1,
      'large': 1.2,
      'enterprise': 1.3
    };
    return multipliers[size] || 1.0;
  };

  const calculateConfidenceScore = (sampleSize) => {
    if (sampleSize > 100) return 0.95;
    if (sampleSize > 50) return 0.85;
    if (sampleSize > 20) return 0.75;
    return 0.60;
  };

  const generateRecommendations = (salary, marketData) => {
    const recommendations = [];
    
    if (salary.median < marketData.salary_min) {
      recommendations.push({
        type: 'warning',
        message: 'Your calculated salary is below market minimum. Consider negotiating for better compensation.',
        icon: AlertCircle
      });
    }

    if (salary.median > marketData.salary_max) {
      recommendations.push({
        type: 'info',
        message: 'Your calculated salary is above market maximum. You may be overqualified for this position.',
        icon: Info
      });
    }

    recommendations.push({
      type: 'success',
      message: `Based on ${marketData.sample_size} data points, this calculation has ${Math.round(calculateConfidenceScore(marketData.sample_size) * 100)}% confidence.`,
      icon: CheckCircle
    });

    return recommendations;
  };

  // Advanced 2025 features
  const calculateAdvancedFactors = useCallback((baseSalary) => {
    let totalCompensation = baseSalary;
    const breakdown = {
      base: baseSalary,
      remote: 0,
      equity: 0,
      bonus: 0,
      certifications: 0,
      languages: 0,
      techStack: 0,
      leadership: 0,
      international: 0
    };

    // Remote work premium (2025 trend)
    if (formData.remoteWork) {
      const remotePremium = baseSalary * 0.08; // 8% premium for remote work
      breakdown.remote = remotePremium;
      totalCompensation += remotePremium;
    }

    // Equity compensation
    if (formData.equity) {
      const equityValue = baseSalary * 0.15; // 15% equity value
      breakdown.equity = equityValue;
      totalCompensation += equityValue;
    }

    // Performance bonus
    if (formData.performanceBonus) {
      const bonusAmount = baseSalary * 0.12; // 12% performance bonus
      breakdown.bonus = bonusAmount;
      totalCompensation += bonusAmount;
    }

    // Certifications premium
    const certPremium = formData.certifications.length * (baseSalary * 0.03);
    breakdown.certifications = certPremium;
    totalCompensation += certPremium;

    // Language skills premium
    const languagePremium = formData.languages.length * (baseSalary * 0.02);
    breakdown.languages = languagePremium;
    totalCompensation += languagePremium;

    // Tech stack premium
    const techPremium = formData.techStack.length * (baseSalary * 0.025);
    breakdown.techStack = techPremium;
    totalCompensation += techPremium;

    // Leadership premium
    if (formData.leadership) {
      const leadershipPremium = baseSalary * 0.10;
      breakdown.leadership = leadershipPremium;
      totalCompensation += leadershipPremium;
    }

    // International experience premium
    if (formData.internationalExp) {
      const internationalPremium = baseSalary * 0.06;
      breakdown.international = internationalPremium;
      totalCompensation += internationalPremium;
    }

    return { totalCompensation, breakdown };
  }, [formData]);

  // AI-powered insights for 2025
  const generateAIInsights = useCallback((salary, marketData, breakdown) => {
    const insights = [];
    
    // Market positioning insights
    const marketPercentile = ((salary - marketData?.salary_min) / (marketData?.salary_max - marketData?.salary_min)) * 100;
    
    if (marketPercentile < 25) {
      insights.push({
        type: 'warning',
        title: 'Below Market Range',
        message: 'Your salary is in the bottom 25% of the market. Consider highlighting your unique value proposition.',
        action: 'Negotiate for higher compensation'
      });
    } else if (marketPercentile > 75) {
      insights.push({
        type: 'success',
        title: 'Above Market Range',
        message: 'Your compensation is in the top 25% of the market. Focus on non-monetary benefits.',
        action: 'Negotiate for better benefits'
      });
    }

    // Remote work insights
    if (formData.remoteWork) {
      insights.push({
        type: 'info',
        title: 'Remote Work Premium',
        message: `Remote work adds ₹${formatCurrency(breakdown.remote)} to your total compensation.`,
        action: 'Leverage remote work benefits'
      });
    }

    // Skills gap analysis
    const highDemandSkills = ['AI/ML', 'Cloud Computing', 'Cybersecurity', 'Data Science'];
    const missingSkills = highDemandSkills.filter(skill => !formData.skills.includes(skill));
    
    if (missingSkills.length > 0) {
      insights.push({
        type: 'opportunity',
        title: 'Skills Development Opportunity',
        message: `Consider developing: ${missingSkills.join(', ')}. These skills can add 15-25% to your salary.`,
        action: 'Invest in skill development'
      });
    }

    // 2025 market trends
    insights.push({
      type: 'trend',
      title: '2025 Market Trends',
      message: 'AI skills, remote work, and international experience are highly valued in 2025.',
      action: 'Stay updated with market trends'
    });

    return insights;
  }, [formData]);

  // Predictive salary modeling for 2025
  const predictFutureSalary = useCallback((currentSalary, years = 3) => {
    const annualGrowthRate = 0.08; // 8% annual growth
    const futureSalary = currentSalary * Math.pow(1 + annualGrowthRate, years);
    
    return {
      year1: currentSalary * (1 + annualGrowthRate),
      year2: currentSalary * Math.pow(1 + annualGrowthRate, 2),
      year3: currentSalary * Math.pow(1 + annualGrowthRate, 3),
      totalGrowth: ((futureSalary - currentSalary) / currentSalary) * 100
    };
  }, []);

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create lead in Supabase
      await db.createLead({
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        company: leadData.company,
        job_title: leadData.designation,
        company_size: leadData.employees,
        source: 'salary_calculator',
        lead_score: 75
      });

      setShowLeadForm(false);
      setLeadData({
        name: '',
        email: '',
        phone: '',
        company: '',
        designation: '',
        employees: ''
      });

      // Show success message
      alert('Thank you! We\'ll contact you soon with personalized HR solutions.');
    } catch (error) {
      setCrmError(true);
      console.error('Failed to submit lead:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (!result) return;

    const reportData = {
      calculation: result,
      formData,
      marketData,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `salary-calculation-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const handleShare = async () => {
    if (!result) return;

    const shareData = {
      title: 'Salary Calculation Results',
      text: `Salary range for ${formData.position} in ${formData.location}: ₹${formatCurrency(result.salary.min)} - ₹${formatCurrency(result.salary.max)}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text);
        alert('Results copied to clipboard!');
      }
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch (error) {
      console.error('Failed to share:', error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const positions = [
    'HR Manager', 'HR Generalist', 'Recruiter', 'HR Coordinator',
    'HR Director', 'Talent Acquisition', 'Compensation Analyst', 'Benefits Specialist'
  ];

  const locations = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Other'
  ];

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Education', 'Other'
  ];

  return (
    <>
      <Helmet>
        <title>Advanced Salary Calculator - HR Solutions Hub</title>
        <meta name="description" content="Calculate competitive salary ranges with real-time market data. Get personalized recommendations and industry insights." />
        <meta name="keywords" content="salary calculator, HR tools, compensation analysis, market data, salary benchmarking" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
              
              <div className="flex items-center space-x-4">
                {user ? (
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-700">{user.email}</span>
                  </div>
                ) : (
                  <button
                    onClick={() => navigate('/contact')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Contact Us
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Calculator */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-100 rounded-xl mr-4">
                    <Calculator className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Advanced Salary Calculator</h1>
                    <p className="text-gray-600 mt-1">Get real-time market data and personalized recommendations</p>
                  </div>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                      <span className="text-red-700">{error}</span>
                    </div>
                  </div>
                )}

                {/* Calculator Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position *
                    </label>
                    <select
                      value={formData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Position</option>
                      {positions.map(pos => (
                        <option key={pos} value={pos}>{pos}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level *
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-8">5-8 years</option>
                      <option value="8-10">8-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Location</option>
                      {locations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Industry</option>
                      {industries.map(ind => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Education Level
                    </label>
                    <select
                      value={formData.education}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="high_school">High School</option>
                      <option value="bachelor">Bachelor's Degree</option>
                      <option value="master">Master's Degree</option>
                      <option value="phd">PhD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Size
                    </label>
                    <select
                      value={formData.companySize}
                      onChange={(e) => handleInputChange('companySize', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="startup">Startup (1-50)</option>
                      <option value="small">Small (51-200)</option>
                      <option value="medium">Medium (201-1000)</option>
                      <option value="large">Large (1001-5000)</option>
                      <option value="enterprise">Enterprise (5000+)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={calculateSalary}
                  disabled={!formData.position || !formData.location || isCalculating}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                >
                  {isCalculating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Calculator className="w-5 h-5 mr-2" />
                      Calculate Salary
                    </>
                  )}
                </button>
              </motion.div>

              {/* Results Section */}
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 bg-white rounded-2xl shadow-xl p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Salary Analysis Results</h2>
                    <div className="flex space-x-2">
                      <button
                        onClick={downloadReport}
                        className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {downloaded ? 'Downloaded!' : 'Download'}
                      </button>
                      <button
                        onClick={handleShare}
                        className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        {shared ? 'Shared!' : 'Share'}
                      </button>
                    </div>
                  </div>

                  {/* Salary Range */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                      <div className="flex items-center mb-2">
                        <TrendingDown className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-green-700">Minimum</span>
                      </div>
                      <div className="text-2xl font-bold text-green-800">
                        {formatCurrency(result.salary.min)}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-center mb-2">
                        <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm font-medium text-blue-700">Median</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-800">
                        {formatCurrency(result.salary.median)}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                      <div className="flex items-center mb-2">
                        <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-sm font-medium text-purple-700">Maximum</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-800">
                        {formatCurrency(result.salary.max)}
                      </div>
                    </div>
                  </div>

                  {/* Market Data */}
                  {marketData && (
                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Database className="w-5 h-5 mr-2 text-blue-600" />
                        Market Data Insights
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <span className="text-sm text-gray-600">Market Median</span>
                          <div className="font-semibold text-gray-900">
                            {formatCurrency(marketData.salary_median)}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Data Points</span>
                          <div className="font-semibold text-gray-900">
                            {marketData.sample_size}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Confidence</span>
                          <div className="font-semibold text-gray-900">
                            {Math.round(result.confidenceScore * 100)}%
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Last Updated</span>
                          <div className="font-semibold text-gray-900">
                            {new Date(marketData.last_updated).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900">Recommendations</h3>
                    {result.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                        <rec.icon className={`w-5 h-5 mr-3 mt-0.5 ${
                          rec.type === 'warning' ? 'text-red-500' :
                          rec.type === 'info' ? 'text-blue-500' : 'text-green-500'
                        }`} />
                        <span className="text-gray-700">{rec.message}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* User Dashboard */}
              {user && (
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    Your Dashboard
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm text-gray-600">Saved Calculations</span>
                      <span className="font-semibold text-blue-600">{savedCalculations.length}</span>
                    </div>
                    
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Dashboard
                    </button>
                  </div>
                </div>
              )}

              {/* Lead Capture */}
              {!user && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-6 border border-purple-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-600" />
                    Get Personalized HR Solutions
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    Get expert HR consulting and customized solutions for your business.
                  </p>
                  
                  <button
                    onClick={() => setShowLeadForm(true)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                  >
                    Get Free Consultation
                  </button>
                </div>
              )}

              {/* Features */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Premium Features
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Real-time market data
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    AI-powered recommendations
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Save calculations
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Export reports
                  </div>
                </div>
              </div>

              {/* Related Tools */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Tools</h3>
                
                <div className="space-y-3">
                  <Link
                    to="/hr-cost-savings-calculator"
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Calculator className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">HR Cost Calculator</div>
                      <div className="text-sm text-gray-600">Calculate HR operational costs</div>
                    </div>
                  </Link>
                  
                  <Link
                    to="/compliance-checker"
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Shield className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Compliance Checker</div>
                      <div className="text-sm text-gray-600">Assess HR compliance status</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Form Modal */}
        {showLeadForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Free HR Consultation</h3>
              
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={leadData.name}
                    onChange={(e) => handleLeadInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={leadData.email}
                    onChange={(e) => handleLeadInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={leadData.phone}
                    onChange={(e) => handleLeadInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={leadData.company}
                    onChange={(e) => handleLeadInputChange('company', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowLeadForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
} 