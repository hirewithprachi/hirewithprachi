import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calculator, TrendingUp, Target, Download, Share2, Star, ArrowLeft, CheckCircle, User } from 'lucide-react';
import { formSubmission } from '../lib/supabase';
import { generatePdfWithStates } from '../lib/supabasePdfGenerator';
import ShareResultBanner from '../components/ShareResultBanner';

export default function PerformanceCalculator() {
  const [formData, setFormData] = useState({
    employeeName: '',
    department: '',
    goals: '',
    quality: '',
    productivity: '',
    teamwork: ''
  });
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    email: '',
    manager: ''
  });
  const [showResult, setShowResult] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    designation: '',
    employees: ''
  });
  const [result, setResult] = useState(null);
  const [crmError, setCrmError] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [shared, setShared] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCompanyInfoChange = (field, value) => {
    setCompanyInfo(prev => ({
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

  const calculatePerformance = () => {
    const scores = {
      goals: parseInt(formData.goals) || 0,
      quality: parseInt(formData.quality) || 0,
      productivity: parseInt(formData.productivity) || 0,
      teamwork: parseInt(formData.teamwork) || 0
    };

    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const averageScore = totalScore / Object.keys(scores).length;
    const percentageScore = (averageScore / 10) * 100;

    let rating = '';
    let color = '';

    if (percentageScore >= 90) {
      rating = 'Outstanding';
      color = 'text-green-600';
    } else if (percentageScore >= 80) {
      rating = 'Excellent';
      color = 'text-blue-600';
    } else if (percentageScore >= 70) {
      rating = 'Good';
      color = 'text-yellow-600';
    } else if (percentageScore >= 60) {
      rating = 'Satisfactory';
      color = 'text-orange-600';
    } else {
      rating = 'Needs Improvement';
      color = 'text-red-600';
    }

    return {
      score: percentageScore.toFixed(1),
      rating,
      color,
      breakdown: scores,
      totalScore: totalScore,
      averageScore: averageScore.toFixed(1)
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const performance = calculatePerformance();
    
    const resultData = {
      ...performance,
      formData,
      companyInfo,
      date: new Date().toLocaleDateString()
    };

    setResult(resultData);
    setShowResult(true);
    setShowLeadForm(true);
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit form to Supabase (which also sends to HubSpot)
      const submitResult = await formSubmission.submitCalculatorForm({
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        company: leadData.company,
        designation: leadData.designation,
        calculator_result: result,
        source: 'Performance Calculator'
      }, 'performance_calculator');
      
      if (submitResult.success) {
        // Trigger download after successful submission
        handleDownload();
        setDownloaded(true);
        setFormSubmitted(true);
        
        // Hide the form after successful submission
        setTimeout(() => {
          setShowLeadForm(false);
          setFormSubmitted(false);
        }, 3000);
        
        alert('✅ Data saved successfully! Your performance analysis report has been downloaded.');
      } else {
        alert('Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert(`Error saving data: ${error.message}. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = async () => {
    if (!result) return;
    
    try {
      console.log('Preparing to send PDF via email:', result);
      
      // Prepare data for PDF generation
      const pdfData = {
        score: result.score,
        rating: result.rating,
        averageScore: result.averageScore,
        totalScore: result.totalScore,
        breakdown: result.breakdown,
        companyInfo: result.companyInfo,
        formData: result.formData,
        date: result.date
      };
      
      await generatePdfWithStates(
        'performance',
        pdfData,
        leadData,
        setDownloaded, // Used for loading state
        setDownloaded, // Used for success state
        (error) => console.error('PDF Error:', error)
      );
    } catch (error) {
      console.error('PDF generation failed:', error);
      setDownloaded(false);
    }
  };

  const handleShare = async (shareText) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Performance Analysis Results',
          text: shareText,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(shareText);
      }
      setShared(true);
      setTimeout(() => setShared(false), 3000);
    } catch (error) {
      console.log('Share failed:', error);
    }
  };

  const handleCopy = async (shareText) => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.log('Copy failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100">
      <Helmet>
        <title>Performance Calculator 2025 | Employee Performance Assessment - Prachi</title>
        <meta name="description" content="Calculate and track employee performance metrics for better management decisions." />
      </Helmet>

      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-2 rounded-lg">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Prachi HR Solutions</h1>
                <p className="text-sm text-gray-600">Performance Calculator</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-100/20 to-emerald-100/20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Performance Calculator 2025
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                Calculate and track employee performance metrics for better management decisions and career development.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4 mx-auto">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">100% Free</h3>
                <p className="text-sm text-gray-600">No hidden costs or registration required</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 mx-auto">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Data-Driven</h3>
                <p className="text-sm text-gray-600">Based on proven performance metrics</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4 mx-auto">
                  <Target className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Goal-Oriented</h3>
                <p className="text-sm text-gray-600">Track progress and achievements</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  Performance Metrics
                </span>
                <span className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-500" />
                  Goal Tracking
                </span>
                <span className="flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-emerald-500" />
                  Score Analysis
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-500" />
                  Rating System
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <Calculator className="h-6 w-6" />
                  <span>Performance Assessment</span>
                </h2>
                <p className="text-green-100 mt-1">Evaluate employee performance across multiple dimensions</p>
              </div>

              <div className="p-6">
                {!showResult ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Employee Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        Employee Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Employee Name *
                          </label>
                          <input 
                            type="text" 
                            value={formData.employeeName} 
                            onChange={(e) => handleInputChange('employeeName', e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                            required 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Department *
                          </label>
                          <input 
                            type="text" 
                            value={formData.department} 
                            onChange={(e) => handleInputChange('department', e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                            required 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Company Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        Company Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Company Name *
                          </label>
                          <input 
                            type="text" 
                            value={companyInfo.name} 
                            onChange={(e) => handleCompanyInfoChange('name', e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                            required 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Manager Name *
                          </label>
                          <input 
                            type="text" 
                            value={companyInfo.manager} 
                            onChange={(e) => handleCompanyInfoChange('manager', e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                            required 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input 
                            type="email" 
                            value={companyInfo.email} 
                            onChange={(e) => handleCompanyInfoChange('email', e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                            required 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        Performance Metrics (Rate 1-10)
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Goal Achievement *
                          </label>
                          <input 
                            type="number" 
                            min="1" 
                            max="10" 
                            value={formData.goals} 
                            onChange={(e) => handleInputChange('goals', e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                            required 
                          />
                          <p className="text-sm text-gray-500 mt-1">How well does the employee meet their goals?</p>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Quality of Work *
                          </label>
                          <input 
                            type="number" 
                            min="1" 
                            max="10" 
                            value={formData.quality} 
                            onChange={(e) => handleInputChange('quality', e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                            required 
                          />
                          <p className="text-sm text-gray-500 mt-1">How high is the quality of their work output?</p>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Productivity *
                          </label>
                          <input 
                            type="number" 
                            min="1" 
                            max="10" 
                            value={formData.productivity} 
                            onChange={(e) => handleInputChange('productivity', e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                            required 
                          />
                          <p className="text-sm text-gray-500 mt-1">How productive and efficient is the employee?</p>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Teamwork *
                          </label>
                          <input 
                            type="number" 
                            min="1" 
                            max="10" 
                            value={formData.teamwork} 
                            onChange={(e) => handleInputChange('teamwork', e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                            required 
                          />
                          <p className="text-sm text-gray-500 mt-1">How well does the employee work with others?</p>
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Calculate Performance
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Assessment Complete!</h3>
                    <p className="text-gray-600">Your performance assessment results are ready.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Lead Form - Now appears after input section */}
            {showLeadForm && !formSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                    <User className="h-6 w-6" />
                    <span>Get Your Detailed Report</span>
                  </h2>
                  <p className="text-green-100 mt-1">Fill in your details to download a comprehensive performance analysis</p>
                </div>

                <div className="p-6">
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          value={leadData.name}
                          onChange={(e) => handleLeadInputChange('name', e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                        <input
                          type="email"
                          value={leadData.email}
                          onChange={(e) => handleLeadInputChange('email', e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={leadData.phone}
                          onChange={(e) => handleLeadInputChange('phone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                        <input
                          type="text"
                          value={leadData.company}
                          onChange={(e) => handleLeadInputChange('company', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter your company name"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Your Designation</label>
                        <input
                          type="text"
                          value={leadData.designation}
                          onChange={(e) => handleLeadInputChange('designation', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter your designation"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Company Size</label>
                        <select
                          value={leadData.employees}
                          onChange={(e) => handleLeadInputChange('employees', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select company size</option>
                          <option value="1-50">1-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-1000">201-1000 employees</option>
                          <option value="1001-5000">1001-5000 employees</option>
                          <option value="5000+">5000+ employees</option>
                        </select>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-5 w-5" />
                          <span>Download Detailed Report</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
            
            {/* Success Message */}
            {formSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl border border-green-200 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                    <CheckCircle className="h-6 w-6" />
                    <span>Success!</span>
                  </h2>
                  <p className="text-green-100 mt-1">Your data has been saved and report downloaded</p>
                </div>

                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-4">
                    Your performance analysis report has been downloaded and your information has been saved successfully.
                  </p>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <p className="text-sm text-green-700">
                      ✓ Report downloaded to your device<br/>
                      ✓ Data saved to our secure database<br/>
                      ✓ You'll receive additional insights via email
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            {showResult && result ? (
              <div className="space-y-6">
                {/* Main Result */}
                <motion.div 
                  className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6" 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Performance Score</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-green-50 rounded-xl p-4 text-center">
                      <div className={`text-3xl font-bold ${result.color} mb-1`}>
                        {result.score}/100
                      </div>
                      <div className="text-sm text-green-600">Overall Score</div>
                      <div className={`text-sm font-semibold ${result.color} mt-1`}>
                        {result.rating}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Employee:</span>
                        <span className="font-semibold">{result.formData.employeeName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Department:</span>
                        <span className="font-semibold">{result.formData.department}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Manager:</span>
                        <span className="font-semibold">{result.companyInfo.manager}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Share Banner */}
                <ShareResultBanner
                  result={result}
                  calculatorType="Performance Calculator"
                  onShare={handleShare}
                  onDownload={handleDownload}
                  onCopy={handleCopy}
                  isShared={shared}
                  isDownloaded={downloaded}
                  isCopied={copied}
                />
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sticky top-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Calculator className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Assess Performance</h3>
                  <p className="text-gray-600 text-sm">
                    Evaluate employee performance across multiple dimensions for better management decisions.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Calculator className="h-6 w-6 text-green-400" />
              <span className="text-xl font-bold">Prachi HR Solutions</span>
            </div>
            <p className="text-gray-400 text-sm">
              Professional HR solutions for performance management and employee development.
            </p>
            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-gray-400 text-sm">
                © 2025 Prachi HR Solutions. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 