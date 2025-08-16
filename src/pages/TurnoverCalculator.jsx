import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calculator, TrendingDown, DollarSign, Users, Download, Share2, Star, ArrowLeft, RefreshCw, AlertTriangle, CheckCircle, User } from 'lucide-react';
import { formSubmission } from '../lib/supabase';
import { generatePdfWithStates } from '../lib/supabasePdfGenerator';
import ShareResultBanner from '../components/ShareResultBanner';

export default function TurnoverCalculator() {
  const [formData, setFormData] = useState({
    totalEmployees: '',
    employeesLeft: '',
    timePeriod: '12',
    avgSalary: '',
    recruitmentCost: '',
    trainingCost: '',
    productivityLoss: ''
  });
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    email: '',
    industry: ''
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

  const calculateTurnover = () => {
    const total = parseInt(formData.totalEmployees);
    const left = parseInt(formData.employeesLeft);
    const period = parseInt(formData.timePeriod);
    const avgSalary = parseInt(formData.avgSalary);
    const recruitmentCost = parseInt(formData.recruitmentCost);
    const trainingCost = parseInt(formData.trainingCost);
    const productivityLoss = parseInt(formData.productivityLoss);

    // Calculate turnover rate
    const turnoverRate = ((left / total) * 100) / (period / 12);
    
    // Calculate costs
    const totalRecruitmentCost = left * recruitmentCost;
    const totalTrainingCost = left * trainingCost;
    const totalProductivityLoss = left * productivityLoss;
    const totalCost = totalRecruitmentCost + totalTrainingCost + totalProductivityLoss;

    // Calculate annualized costs
    const annualizedCost = totalCost * (12 / period);

    return {
      turnoverRate: turnoverRate.toFixed(2),
      totalCost: totalCost.toLocaleString('en-IN'),
      annualizedCost: annualizedCost.toLocaleString('en-IN'),
      breakdown: {
        recruitment: totalRecruitmentCost.toLocaleString('en-IN'),
        training: totalTrainingCost.toLocaleString('en-IN'),
        productivity: totalProductivityLoss.toLocaleString('en-IN')
      }
    };
  };

  const getTurnoverLevel = (rate) => {
    if (rate < 10) return { level: 'Low', color: 'text-green-600', bgColor: 'bg-green-50' };
    if (rate < 20) return { level: 'Moderate', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
    if (rate < 30) return { level: 'High', color: 'text-orange-600', bgColor: 'bg-orange-50' };
    return { level: 'Critical', color: 'text-red-600', bgColor: 'bg-red-50' };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const calculations = calculateTurnover();
    
    const resultData = {
      ...calculations,
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
      const result = await formSubmission.submitCalculatorForm({
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        company: leadData.company,
        designation: leadData.designation,
        employees: leadData.employees,
        calculation_data: {
          ...result,
          turnover_level: getTurnoverLevel(parseFloat(result.turnoverRate)).level,
          recommendations: parseFloat(result.turnoverRate) < 10 ? 
            'Excellent retention! Continue your current practices.' :
            parseFloat(result.turnoverRate) < 20 ?
            'Moderate turnover. Consider improving employee engagement and retention strategies.' :
            parseFloat(result.turnoverRate) < 30 ?
            'High turnover. Immediate action needed to improve retention and reduce costs.' :
            'Critical turnover levels. Comprehensive retention strategy required immediately.'
        },
        lead_source: 'Turnover Calculator',
        page_source: '/turnover-calculator'
      }, 'turnover');
      
      if (result.success) {
        // Trigger download after successful submission
        handleDownload();
        setDownloaded(true);
        setFormSubmitted(true);
        
        // Hide the form after successful submission
        setTimeout(() => {
          setShowLeadForm(false);
          setFormSubmitted(false);
        }, 3000);
        
        alert('✅ Data saved successfully! Your turnover analysis report has been downloaded.');
      } else {
        console.error('Form submission failed:', result.error);
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
        turnoverRate: result.turnoverRate,
        totalCost: parseInt(result.totalCost.replace(/,/g, '')),
        annualizedCost: parseInt(result.annualizedCost.replace(/,/g, '')),
        breakdown: {
          recruitment: parseInt(result.breakdown.recruitment.replace(/,/g, '')),
          training: parseInt(result.breakdown.training.replace(/,/g, '')),
          productivity: parseInt(result.breakdown.productivity.replace(/,/g, ''))
        },
        turnoverLevel: getTurnoverLevel(parseFloat(result.turnoverRate)),
        companyInfo: result.companyInfo,
        formData: result.formData,
        date: result.date
      };
      
      await generatePdfWithStates(
        'turnover',
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
          title: 'Turnover Analysis Results',
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-100">
      <Helmet>
        <title>Turnover Calculator 2025 | Employee Turnover Analysis - Prachi</title>
        <meta name="description" content="Analyze employee turnover rates and identify retention improvement opportunities. Free turnover calculator tool." />
        <link rel="canonical" href="https://www.hirewithprachi.com/turnover-calculator" />
      </Helmet>

      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-gray-600 to-slate-600 p-2 rounded-lg">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Prachi HR Solutions</h1>
                <p className="text-sm text-gray-600">Turnover Calculator</p>
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
      <section className="py-20 px-4 text-center bg-gradient-to-br from-gray-50 via-white to-slate-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100/20 to-slate-100/20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-slate-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-gray-500 to-slate-600 rounded-full mb-6">
                <TrendingDown className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Turnover Calculator 2025
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                Analyze employee turnover rates and identify retention improvement opportunities with comprehensive cost analysis.
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
                  <TrendingDown className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Data-Driven</h3>
                <p className="text-sm text-gray-600">Based on proven HR metrics</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4 mx-auto">
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Cost Analysis</h3>
                <p className="text-sm text-gray-600">Comprehensive cost breakdown</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  Turnover Rate
                </span>
                <span className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-red-500" />
                  Cost Analysis
                </span>
                <span className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  Financial Impact
                </span>
                <span className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  Risk Assessment
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
              <div className="bg-gradient-to-r from-gray-600 to-slate-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <Calculator className="h-6 w-6" />
                  <span>Turnover Calculator</span>
                </h2>
                <p className="text-gray-100 mt-1">Enter your data to calculate turnover rates and costs</p>
              </div>

              <div className="p-6">
                {!showResult ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
                            required 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Employee Data */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        Employee Data
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Total Employees *
                          </label>
                          <input 
                            type="number" 
                            min="1" 
                            value={formData.totalEmployees} 
                            onChange={(e) => handleInputChange('totalEmployees', e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
                            required 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Employees Who Left *
                          </label>
                          <input 
                            type="number" 
                            min="0" 
                            value={formData.employeesLeft} 
                            onChange={(e) => handleInputChange('employeesLeft', e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
                            required 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Time Period (months) *
                          </label>
                          <select 
                            value={formData.timePeriod} 
                            onChange={(e) => handleInputChange('timePeriod', e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          >
                            <option value="3">3 months</option>
                            <option value="6">6 months</option>
                            <option value="12">12 months</option>
                            <option value="24">24 months</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Average Salary (₹) *
                          </label>
                          <input 
                            type="number" 
                            min="0" 
                            value={formData.avgSalary} 
                            onChange={(e) => handleInputChange('avgSalary', e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
                            required 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Cost Data */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        Cost Data (per employee)
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Recruitment Cost (₹) *
                          </label>
                          <input 
                            type="number" 
                            min="0" 
                            value={formData.recruitmentCost} 
                            onChange={(e) => handleInputChange('recruitmentCost', e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
                            required 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Training Cost (₹) *
                          </label>
                          <input 
                            type="number" 
                            min="0" 
                            value={formData.trainingCost} 
                            onChange={(e) => handleInputChange('trainingCost', e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
                            required 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Productivity Loss (₹) *
                          </label>
                          <input 
                            type="number" 
                            min="0" 
                            value={formData.productivityLoss} 
                            onChange={(e) => handleInputChange('productivityLoss', e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
                            required 
                          />
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-gray-600 to-slate-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-gray-700 hover:to-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Calculate Turnover
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Analysis Complete!</h3>
                    <p className="text-gray-600">Your turnover analysis results are ready.</p>
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
                <div className="bg-gradient-to-r from-gray-600 to-slate-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                    <User className="h-6 w-6" />
                    <span>Get Your Detailed Report</span>
                  </h2>
                  <p className="text-gray-100 mt-1">Fill in your details to download a comprehensive turnover analysis</p>
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                        <input
                          type="text"
                          value={leadData.company}
                          onChange={(e) => handleLeadInputChange('company', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          placeholder="Enter your designation"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Company Size</label>
                        <select
                          value={leadData.employees}
                          onChange={(e) => handleLeadInputChange('employees', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
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
                      className="w-full px-6 py-4 bg-gradient-to-r from-gray-500 to-slate-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    Your turnover analysis report has been downloaded and your information has been saved successfully.
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
                    <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-slate-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <TrendingDown className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Turnover Analysis</h3>
                  </div>

                  <div className="space-y-4">
                    <div className={`rounded-xl p-4 text-center ${getTurnoverLevel(parseFloat(result.turnoverRate)).bgColor}`}>
                      <div className={`text-3xl font-bold ${getTurnoverLevel(parseFloat(result.turnoverRate)).color} mb-1`}>
                        {result.turnoverRate}%
                      </div>
                      <div className="text-sm text-gray-600">Turnover Rate</div>
                      <div className={`text-sm font-semibold ${getTurnoverLevel(parseFloat(result.turnoverRate)).color} mt-1`}>
                        {getTurnoverLevel(parseFloat(result.turnoverRate)).level} Level
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Cost:</span>
                        <span className="font-semibold">₹{result.totalCost}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Annualized Cost:</span>
                        <span className="font-semibold">₹{result.annualizedCost}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Company:</span>
                        <span className="font-semibold">{result.companyInfo.name}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Cost Breakdown */}
                <motion.div 
                  className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6" 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h4 className="font-semibold text-gray-900 mb-4">Cost Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Recruitment:</span>
                      <span className="text-sm font-semibold">₹{result.breakdown.recruitment}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Training:</span>
                      <span className="text-sm font-semibold">₹{result.breakdown.training}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Productivity Loss:</span>
                      <span className="text-sm font-semibold">₹{result.breakdown.productivity}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Share Banner */}
                <ShareResultBanner
                  result={result}
                  calculatorType="Turnover Calculator"
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
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Calculate Turnover</h3>
                  <p className="text-gray-600 text-sm">
                    Enter your data to calculate turnover rates and identify retention opportunities.
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
              <Calculator className="h-6 w-6 text-gray-400" />
              <span className="text-xl font-bold">Prachi HR Solutions</span>
            </div>
            <p className="text-gray-400 text-sm">
              Professional HR solutions for turnover analysis and retention strategies.
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