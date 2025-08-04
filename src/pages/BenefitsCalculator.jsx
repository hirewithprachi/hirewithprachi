import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calculator, Gift, DollarSign, Download, Share2, Star, ArrowLeft, CheckCircle, User } from 'lucide-react';
import { formSubmission } from '../lib/supabase';
import { downloadCalculatorPDF, shareCalculatorResult } from '../lib/html2pdfGenerator';
import ShareResultBanner from '../components/ShareResultBanner';

export default function BenefitsCalculator() {
  const [formData, setFormData] = useState({
    baseSalary: '',
    healthInsurance: '',
    dentalInsurance: '',
    visionInsurance: '',
    retirementMatch: '',
    paidTimeOff: '',
    bonuses: '',
    stockOptions: '',
    otherBenefits: ''
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

  const calculateBenefits = () => {
    const baseSalary = parseInt(formData.baseSalary) || 0;
    const healthInsurance = parseInt(formData.healthInsurance) || 0;
    const dentalInsurance = parseInt(formData.dentalInsurance) || 0;
    const visionInsurance = parseInt(formData.visionInsurance) || 0;
    const retirementMatch = parseInt(formData.retirementMatch) || 0;
    const paidTimeOff = parseInt(formData.paidTimeOff) || 0;
    const bonuses = parseInt(formData.bonuses) || 0;
    const stockOptions = parseInt(formData.stockOptions) || 0;
    const otherBenefits = parseInt(formData.otherBenefits) || 0;

    const totalBenefits = healthInsurance + dentalInsurance + visionInsurance + 
                         retirementMatch + paidTimeOff + bonuses + stockOptions + otherBenefits;
    
    const totalCompensation = baseSalary + totalBenefits;
    const benefitsPercentage = baseSalary > 0 ? ((totalBenefits / baseSalary) * 100) : 0;

    let packageRating = '';
    let color = '';

    if (benefitsPercentage >= 40) {
      packageRating = 'Excellent';
      color = 'text-green-600';
    } else if (benefitsPercentage >= 30) {
      packageRating = 'Very Good';
      color = 'text-blue-600';
    } else if (benefitsPercentage >= 20) {
      packageRating = 'Good';
      color = 'text-yellow-600';
    } else if (benefitsPercentage >= 10) {
      packageRating = 'Fair';
      color = 'text-orange-600';
    } else {
      packageRating = 'Basic';
      color = 'text-red-600';
    }

    return {
      totalBenefits: totalBenefits.toLocaleString('en-IN'),
      totalCompensation: totalCompensation.toLocaleString('en-IN'),
      benefitsPercentage: benefitsPercentage.toFixed(1),
      packageRating,
      color,
      breakdown: {
        healthInsurance: healthInsurance.toLocaleString('en-IN'),
        dentalInsurance: dentalInsurance.toLocaleString('en-IN'),
        visionInsurance: visionInsurance.toLocaleString('en-IN'),
        retirementMatch: retirementMatch.toLocaleString('en-IN'),
        paidTimeOff: paidTimeOff.toLocaleString('en-IN'),
        bonuses: bonuses.toLocaleString('en-IN'),
        stockOptions: stockOptions.toLocaleString('en-IN'),
        otherBenefits: otherBenefits.toLocaleString('en-IN')
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const calculations = calculateBenefits();
    
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
      const submitResult = await formSubmission.submitCalculatorForm({
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        company: leadData.company,
        designation: leadData.designation,
        calculator_result: result,
        source: 'Benefits Calculator'
      }, 'benefits_calculator');
      
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
        
        alert('✅ Data saved successfully! Your benefits analysis report has been downloaded.');
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
      console.log('Attempting PDF generation with:', result);
      
      // Prepare data for PDF generation
      const pdfData = {
        totalBenefits: result.totalBenefits,
        totalCompensation: result.totalCompensation,
        healthInsurance: result.breakdown.healthInsurance,
        dentalInsurance: result.breakdown.dentalInsurance,
        visionInsurance: result.breakdown.visionInsurance,
        retirementMatch: result.breakdown.retirementMatch,
        paidTimeOff: result.breakdown.paidTimeOff,
        bonuses: result.breakdown.bonuses,
        stockOptions: result.breakdown.stockOptions,
        otherBenefits: result.breakdown.otherBenefits,
        benefitsPercentage: result.benefitsPercentage,
        packageRating: result.packageRating
      };
      
      // Try main PDF generator first
      try {
        const filename = await downloadCalculatorPDF('benefits', pdfData, leadData);
        console.log('Main PDF generated successfully:', filename);
        setDownloaded(true);
        setTimeout(() => setDownloaded(false), 3000);
        return;
      } catch (mainError) {
        console.error('Main PDF generator failed:', mainError);
        
        // Try simple PDF generator as fallback
        try {
          console.log('Trying simple PDF generator...');
          const simpleFilename = await downloadSimplePDF('benefits', pdfData, leadData);
          console.log('Simple PDF generated successfully:', simpleFilename);
          setDownloaded(true);
          setTimeout(() => setDownloaded(false), 3000);
          return;
        } catch (simpleError) {
          console.error('Simple PDF generator also failed:', simpleError);
          throw new Error(`Both PDF generators failed. Main: ${mainError.message}, Simple: ${simpleError.message}`);
        }
      }
    } catch (error) {
      console.error('All PDF generation failed:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        result: result
      });
      
      // Fallback to TXT method
      const report = `Employee Benefits Analysis Report
=====================================

Company: ${result.companyInfo.name}
Analysis Date: ${result.date}

BENEFITS ANALYSIS:
- Base Salary: ₹${result.formData.baseSalary}
- Total Benefits: ₹${result.totalBenefits}
- Total Compensation: ₹${result.totalCompensation}
- Benefits Percentage: ${result.benefitsPercentage}%
- Package Rating: ${result.packageRating}

BENEFITS BREAKDOWN:
- Health Insurance: ₹${result.breakdown.healthInsurance}
- Dental Insurance: ₹${result.breakdown.dentalInsurance}
- Vision Insurance: ₹${result.breakdown.visionInsurance}
- Retirement Match: ₹${result.breakdown.retirementMatch}
- Paid Time Off: ₹${result.breakdown.paidTimeOff}
- Bonuses: ₹${result.breakdown.bonuses}
- Stock Options: ₹${result.breakdown.stockOptions}
- Other Benefits: ₹${result.breakdown.otherBenefits}

RECOMMENDATIONS:
${result.benefitsPercentage >= 40 ? 
  'Excellent benefits package! This is highly competitive and should attract top talent.' :
  result.benefitsPercentage >= 30 ?
  'Very good benefits package. Consider adding more benefits to become more competitive.' :
  result.benefitsPercentage >= 20 ?
  'Good benefits package. There is room for improvement to attract better candidates.' :
  result.benefitsPercentage >= 10 ?
  'Fair benefits package. Consider enhancing benefits to improve employee satisfaction and retention.' :
  'Basic benefits package. Significant improvements needed to remain competitive in the market.'
}

Generated by: Hire With Prachi
Professional HR Solutions & Consulting
    `;

      const blob = new Blob([report], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `benefits-analysis-${result.companyInfo.name.toLowerCase().replace(/\s+/g, '-')}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      setDownloaded(true);
    }
  };

  const handleShare = async (shareText) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Benefits Analysis Results',
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-100">
      <Helmet>
        <title>Benefits Calculator 2025 | Employee Benefits Analysis - Prachi</title>
        <meta name="description" content="Calculate and compare employee benefits packages for competitive compensation." />
      </Helmet>

      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-amber-600 to-yellow-600 p-2 rounded-lg">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Prachi HR Solutions</h1>
                <p className="text-sm text-gray-600">Benefits Calculator</p>
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
      <section className="py-20 px-4 text-center bg-gradient-to-br from-amber-50 via-white to-yellow-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/20 to-yellow-100/20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full mb-6">
                <Gift className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Benefits Calculator 2025
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                Calculate and compare employee benefits packages for competitive compensation analysis.
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
                  <Gift className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Comprehensive</h3>
                <p className="text-sm text-gray-600">Complete benefits analysis</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4 mx-auto">
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Cost Analysis</h3>
                <p className="text-sm text-gray-600">Detailed cost breakdown</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <Gift className="h-4 w-4 text-amber-500" />
                  Benefits Package
                </span>
                <span className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  Total Compensation
                </span>
                <span className="flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-blue-500" />
                  Cost Analysis
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-500" />
                  Package Rating
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
              <div className="bg-gradient-to-r from-amber-600 to-yellow-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <Calculator className="h-6 w-6" />
                  <span>Benefits Calculator</span>
                </h2>
                <p className="text-amber-100 mt-1">Calculate the total value of your employee benefits package</p>
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                            required 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Base Salary */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        Base Compensation
                      </h3>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Base Salary (₹) *
                        </label>
                        <input 
                          type="number" 
                          min="0" 
                          value={formData.baseSalary} 
                          onChange={(e) => handleInputChange('baseSalary', e.target.value)} 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                          required 
                        />
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        Benefits (Annual Value)
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Health Insurance (₹)
                          </label>
                          <input 
                            type="number" 
                            min="0" 
                            value={formData.healthInsurance} 
                            onChange={(e) => handleInputChange('healthInsurance', e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Dental Insurance (₹)
                          </label>
                          <input 
                            type="number" 
                            min="0" 
                            value={formData.dentalInsurance} 
                            onChange={(e) => handleInputChange('dentalInsurance', e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Vision Insurance (₹)
                          </label>
                          <input 
                            type="number" 
                            min="0" 
                            value={formData.visionInsurance} 
                            onChange={(e) => handleInputChange('visionInsurance', e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Retirement Match (₹)
                          </label>
                          <input 
                            type="number" 
                            min="0" 
                            value={formData.retirementMatch} 
                            onChange={(e) => handleInputChange('retirementMatch', e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Paid Time Off (₹)
                          </label>
                          <input 
                            type="number" 
                            min="0" 
                            value={formData.paidTimeOff} 
                            onChange={(e) => handleInputChange('paidTimeOff', e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Bonuses (₹)
                          </label>
                          <input 
                            type="number" 
                            min="0" 
                            value={formData.bonuses} 
                            onChange={(e) => handleInputChange('bonuses', e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Stock Options (₹)
                          </label>
                          <input 
                            type="number" 
                            min="0" 
                            value={formData.stockOptions} 
                            onChange={(e) => handleInputChange('stockOptions', e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Other Benefits (₹)
                          </label>
                          <input 
                            type="number" 
                            min="0" 
                            value={formData.otherBenefits} 
                            onChange={(e) => handleInputChange('otherBenefits', e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                          />
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-amber-700 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Calculate Benefits
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Analysis Complete!</h3>
                    <p className="text-gray-600">Your benefits analysis results are ready.</p>
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
                <div className="bg-gradient-to-r from-amber-600 to-yellow-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                    <User className="h-6 w-6" />
                    <span>Get Your Detailed Report</span>
                  </h2>
                  <p className="text-amber-100 mt-1">Fill in your details to download a comprehensive benefits analysis</p>
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                        <input
                          type="text"
                          value={leadData.company}
                          onChange={(e) => handleLeadInputChange('company', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Enter your designation"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Company Size</label>
                        <select
                          value={leadData.employees}
                          onChange={(e) => handleLeadInputChange('employees', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                      className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    Your benefits analysis report has been downloaded and your information has been saved successfully.
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
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Gift className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Benefits Analysis</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-amber-50 rounded-xl p-4 text-center">
                      <div className={`text-3xl font-bold ${result.color} mb-1`}>
                        ₹{result.totalBenefits}
                      </div>
                      <div className="text-sm text-amber-600">Total Benefits Value</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Compensation:</span>
                        <span className="font-semibold">₹{result.totalCompensation}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Benefits %:</span>
                        <span className={`font-semibold ${result.color}`}>
                          {result.benefitsPercentage}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Package Rating:</span>
                        <span className={`font-semibold ${result.color}`}>
                          {result.packageRating}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Share Banner */}
                <ShareResultBanner
                  result={result}
                  calculatorType="Benefits Calculator"
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
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Calculate Benefits</h3>
                  <p className="text-gray-600 text-sm">
                    Calculate the total value of your employee benefits package for competitive analysis.
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
              <Calculator className="h-6 w-6 text-amber-400" />
              <span className="text-xl font-bold">Prachi HR Solutions</span>
            </div>
            <p className="text-gray-400 text-sm">
              Professional HR solutions for benefits analysis and compensation strategies.
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