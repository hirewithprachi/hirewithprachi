import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Calculator, Users, Mail, Phone, TrendingUp, DollarSign, PieChart, Download, Share2, Star, CheckCircle, ArrowRight, Building, Award, Shield, Calendar, Clock, FileText, ArrowLeft, User } from 'lucide-react';
import { formSubmission } from '../lib/supabase';

import ShareResultModal from '../components/ShareResultModal';
import { useFormValidation, validationRules } from '../lib/useFormValidation';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

const packages = [
  { name: 'Basic', monthly: 9999 },
  { name: 'Pro', monthly: 29999 },
  { name: 'Enterprise', monthly: 59999 },
];

export default function HRCostSavingsCalculator() {
  const navigate = useNavigate();
  const [salary, setSalary] = useState('');
  const [benefits, setBenefits] = useState('');
  const [overhead, setOverhead] = useState('');
  const [employees, setEmployees] = useState('');
  const [pkg, setPkg] = useState(packages[0].name);
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
  const [crmError, setCrmError] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [shared, setShared] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [calculationResult, setCalculationResult] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);

  // Form validation function
  const validateForm = () => {
    const errors = {};
    
    if (!salary || salary <= 0) {
      errors.salary = 'Please enter a valid salary amount';
    }
    if (!benefits || benefits < 0) {
      errors.benefits = 'Please enter a valid benefits amount';
    }
    if (!overhead || overhead < 0) {
      errors.overhead = 'Please enter a valid overhead amount';
    }
    if (!employees || employees <= 0) {
      errors.employees = 'Please enter a valid number of employees';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsCalculating(true);
    
    // Simulate calculation time
    setTimeout(() => {
      setShowResult(true);
      setShowLeadForm(true);
      setIsCalculating(false);
    }, 1500);
    
    // Calculate and store result for PDF generation
    const totalCurrent = Number(salary) + Number(benefits) + Number(overhead);
    const selectedPackage = packages.find(p => p.name === pkg);
    const annualServiceCost = selectedPackage ? selectedPackage.monthly * 12 : 0;
    const estimatedSavings = totalCurrent * Number(employees) - annualServiceCost;
    
    setCalculationResult({
      currentCost: totalCurrent,
      virtualHRCost: annualServiceCost,
      annualSavings: estimatedSavings,
      savingsPercentage: ((estimatedSavings / (totalCurrent * Number(employees))) * 100).toFixed(1),
      selectedPackage: pkg,
      employeeCount: Number(employees),
      salary: Number(salary),
      benefits: Number(benefits),
      overhead: Number(overhead)
    });
  };

  const handleLeadSubmit = async e => {
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
          salary: salary,
          benefits: benefits,
          overhead: overhead,
          employees: employees,
          selected_package: pkg,
          total_current_cost: totalCurrent,
          annual_service_cost: annualServiceCost,
          estimated_savings: estimatedSavings,
          salary_formatted: formatCurrency(Number(salary)),
          benefits_formatted: formatCurrency(Number(benefits)),
          overhead_formatted: formatCurrency(Number(overhead)),
          savings_formatted: formatCurrency(estimatedSavings)
        },
        lead_source: 'HR Cost Savings Calculator',
        page_source: '/hr-cost-savings-calculator'
      }, 'hr_cost_savings');
      
      if (result.success) {
        // Create and download the professional text report
        try {
          const totalCurrent = Number(salary) + Number(benefits) + Number(overhead);
          const selectedPackage = packages.find(p => p.name === pkg);
          const annualServiceCost = selectedPackage ? selectedPackage.monthly * 12 : 0;
          const estimatedSavings = totalCurrent * Number(employees) - annualServiceCost;
          
          const report = `HIRE WITH PRACHI - PROFESSIONAL HR SOLUTIONS
====================================================
"Transforming HR for Startups & SMEs with Expert Solutions"
🌐 Website: prachi-hr.com | 📧 info@hirewithprachi.com | 📱 +91-8740889927

HR COST SAVINGS CALCULATOR REPORT
=================================

Dear ${leadData.name || 'Valued Client'},

Thank you for using our HR Cost Savings Calculator. Here's your comprehensive analysis to help you make informed decisions about your HR strategy.

📊 EXECUTIVE SUMMARY
====================
Your organization can achieve significant cost savings of ${((estimatedSavings / (totalCurrent * Number(employees))) * 100).toFixed(1)}% by transitioning to our Virtual HR Services, while maintaining or improving HR quality and compliance.

💰 CURRENT HR COSTS BREAKDOWN
============================
• Salary per employee: ₹${formatCurrency(Number(salary))}
• Benefits per employee: ₹${formatCurrency(Number(benefits))}
• Overhead per employee: ₹${formatCurrency(Number(overhead))}
• Total current cost per employee: ₹${formatCurrency(totalCurrent)}
• Number of employees: ${employees}
• Total annual HR cost: ₹${formatCurrency(totalCurrent * Number(employees))}

🚀 VIRTUAL HR SERVICE SOLUTION
==============================
• Selected package: ${pkg}
• Annual service cost: ₹${formatCurrency(annualServiceCost)}
• Service includes: Complete HR management, compliance, recruitment, payroll, and employee engagement

💡 SAVINGS ANALYSIS
==================
• Annual savings: ₹${formatCurrency(estimatedSavings)}
• Savings percentage: ${((estimatedSavings / (totalCurrent * Number(employees))) * 100).toFixed(1)}%
• Monthly savings: ₹${formatCurrency(estimatedSavings / 12)}
• 3-year savings potential: ₹${formatCurrency(estimatedSavings * 3)}

📈 BUSINESS IMPACT & BENEFITS
=============================
✅ Improved efficiency through professional HR management
✅ Reduced compliance risks and legal costs
✅ Enhanced employee satisfaction and retention
✅ Scalable HR solutions as your business grows
✅ Access to HR expertise without full-time overhead
✅ Focus on core business activities
✅ 24/7 HR support and guidance

🎯 OUR COMPREHENSIVE SERVICES
=============================
• HR Strategy & Consulting
• Recruitment & Talent Acquisition
• Employee Engagement Programs
• HR Compliance & Legal Support
• Performance Management Systems
• Payroll & Benefits Administration
• Training & Development Programs
• HR Technology Implementation
• Employee Handbook Development
• HR Audit & Risk Assessment
• Workplace Culture Building
• HR Process Optimization

👤 CLIENT DETAILS
=================
• Name: ${leadData.name}
• Email: ${leadData.email}
• Company: ${leadData.company}
• Designation: ${leadData.designation}
• Company Size: ${leadData.employees} employees

📞 CONTACT INFORMATION
======================
📧 Email: info@hirewithprachi.com
📱 Phone: +91-8740889927
🌐 Website: prachi-hr.com
📍 Location: India

🎯 NEXT STEPS
=============
Ready to transform your HR strategy? Book a FREE consultation with our HR experts to discuss how we can help you implement these cost-saving solutions and optimize your HR operations.

Our expert team will:
• Analyze your current HR processes
• Develop a customized implementation plan
• Guide you through the transition
• Provide ongoing support and optimization

Generated on: ${new Date().toLocaleDateString('en-IN')}
Report ID: HR-CS-${Date.now()}

---
"Professional HR Solutions for Startups & SMEs"
Hire With Prachi - Your HR Transformation Partner
🌐 prachi-hr.com | 📧 info@hirewithprachi.com | 📱 +91-8740889927
          `;

          const blob = new Blob([report], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `hr-cost-savings-report-${new Date().toISOString().split('T')[0]}.txt`;
          a.click();
          URL.revokeObjectURL(url);
          
          setFormSubmitted(true);
          
          // Hide the form after successful submission
          setTimeout(() => {
            setShowLeadForm(false);
            setFormSubmitted(false);
          }, 3000);
          
          alert('✅ Data saved successfully! Your cost savings report has been downloaded.');
        } catch (error) {
          console.error('Report generation failed:', error);
          alert('✅ Data saved successfully! However, there was an issue generating your report. Please contact support.');
        }
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

  const handleLeadInputChange = (field, value) => {
    setLeadData(prev => ({
      ...prev,
      [field]: value
    }));
  };



  const handleShare = () => {
    setShowShareModal(true);
  };

  const totalCurrent = Number(salary) + Number(benefits) + Number(overhead);
  const selectedPackage = packages.find(p => p.name === pkg);
  const annualServiceCost = selectedPackage ? selectedPackage.monthly * 12 : 0;
  const estimatedSavings = totalCurrent * Number(employees) - annualServiceCost;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Helmet>
        <title>HR Cost Savings Calculator 2025 | Virtual HR Services ROI - Prachi</title>
        <meta name="description" content="Calculate your annual HR cost savings by switching to virtual HR services. Free ROI calculator for HR outsourcing decisions." />
        <meta name="keywords" content="hr cost savings calculator, virtual hr services, hr outsourcing calculator, hr roi calculator, hr cost reduction, virtual hr consultant" />
        <link rel="canonical" href="https://www.hirewithprachi.com/hr-cost-savings-calculator" />
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
                <p className="text-sm text-gray-600">HR Cost Savings Calculator</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="h-4 w-4" />
                <span className="text-sm">50,000+ Users</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
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
              <span className="text-gray-300">|</span>
              <Link 
                to="/resources"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Resources
              </Link>
              <Link 
                to="/services"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Services
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/contact"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact
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
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6">
                <DollarSign className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                HR Cost Savings Calculator 2025
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                Calculate your annual savings by switching to virtual HR services. Compare costs and see the ROI of HR outsourcing.
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
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
                <p className="text-sm text-gray-600">Your data is never stored or shared</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-4 mx-auto">
                  <Award className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">ROI Focused</h3>
                <p className="text-sm text-gray-600">Based on real cost analysis data</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  Cost Analysis
                </span>
                <span className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  Savings Calculator
                </span>
                <span className="flex items-center gap-2">
                  <PieChart className="h-4 w-4 text-purple-500" />
                  ROI Comparison
                </span>
                <span className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-orange-500" />
                  Virtual HR Services
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Calculator */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <Calculator className="h-6 w-6" />
                  <span>HR Cost Savings Calculator</span>
                </h2>
                <p className="text-green-100 mt-1">Enter your current HR costs and compare with virtual services</p>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Current HR Costs */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Current HR Costs (Annual)
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          HR Salary *
                        </label>
            <input 
              type="number" 
              min="0" 
              step="any" 
                          placeholder="₹0" 
              value={salary} 
              onChange={e => setSalary(e.target.value)} 
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                            validationErrors.salary ? 'border-red-500' : 'border-gray-300'
                          }`}
              required 
            />
            {validationErrors.salary && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.salary}</p>
            )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Benefits & Perks *
                        </label>
            <input 
              type="number" 
              min="0" 
              step="any" 
                          placeholder="₹0" 
              value={benefits} 
              onChange={e => setBenefits(e.target.value)} 
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                            validationErrors.benefits ? 'border-red-500' : 'border-gray-300'
                          }`}
              required 
            />
            {validationErrors.benefits && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.benefits}</p>
            )}
          </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Overhead Costs *
                        </label>
            <input 
              type="number" 
              min="0" 
              step="any" 
                          placeholder="₹0" 
              value={overhead} 
              onChange={e => setOverhead(e.target.value)} 
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                            validationErrors.overhead ? 'border-red-500' : 'border-gray-300'
                          }`}
              required 
            />
            {validationErrors.overhead && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.overhead}</p>
            )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Number of Employees *
                        </label>
            <input 
              type="number" 
              min="1" 
              step="1" 
                          placeholder="1" 
              value={employees} 
              onChange={e => setEmployees(e.target.value)} 
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                            validationErrors.employees ? 'border-red-500' : 'border-gray-300'
                          }`}
              required 
            />
            {validationErrors.employees && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.employees}</p>
            )}
          </div>
                    </div>
                  </div>

                  {/* Service Package Selection */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Virtual HR Service Package
                    </h3>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Select Package *
                      </label>
            <select 
              value={pkg} 
              onChange={e => setPkg(e.target.value)} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            >
              {packages.map(p => (
                <option key={p.name} value={p.name}>
                  {p.name} - ₹{p.monthly.toLocaleString('en-IN')}/month
                </option>
              ))}
            </select>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isCalculating}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
                      isCalculating 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                    }`}
                  >
                    {isCalculating ? (
                      <div className="flex items-center justify-center gap-2">
                        <LoadingSpinner size="sm" color="white" text="" />
                        <span>Calculating...</span>
                      </div>
                    ) : (
                      'Calculate Cost Savings'
                    )}
                  </button>
          </form>
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
                  <p className="text-green-100 mt-1">Fill in your details to download a comprehensive cost savings analysis</p>
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
                    Your cost savings report has been downloaded and your information has been saved successfully.
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
            {showResult ? (
              <motion.div 
                className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sticky top-8" 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <DollarSign className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Cost Savings Results</h3>
                  <p className="text-sm text-gray-600">Your potential annual savings</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 text-center border border-green-200 shadow-sm">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {formatCurrency(estimatedSavings)}
                    </div>
                    <div className="text-sm text-green-600 font-medium">Annual Savings</div>
                    <div className="text-xs text-green-500 mt-1">Potential cost reduction</div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <div className="text-center mb-3">
                      <div className="text-sm font-semibold text-blue-700 mb-2">Cost Comparison</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                        <div className="text-lg font-bold text-blue-600">
                          {formatCurrency(totalCurrent * Number(employees))}
                        </div>
                        <div className="text-xs text-blue-500">Current Cost</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                        <div className="text-lg font-bold text-blue-600">
                          {formatCurrency(annualServiceCost)}
                        </div>
                        <div className="text-xs text-blue-500">Service Cost</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm font-semibold text-blue-600">
                      You could save {formatCurrency(estimatedSavings)} annually by switching to virtual HR services!
                    </p>
                  </div>

                  {crmError && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-yellow-800 text-sm">
                        Note: CRM integration failed, but your result is shown above.
                      </p>
                    </div>
                  )}

                  <div className="space-y-3 pt-4">
                    <button 
                      onClick={handleShare}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Share Results</span>
                    </button>
                    {shared && (
                      <div className="text-blue-600 text-sm text-center font-medium">
                        ✓ Results shared successfully!
                      </div>
                    )}
                    
                    <a
                      href="/contact"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-center block shadow-lg hover:shadow-xl"
                    >
                      Book Free Consultation
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sticky top-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Calculator className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Calculate Your Savings</h3>
                  <p className="text-gray-600 text-sm">
                    Enter your current HR costs to see potential savings with virtual HR services.
                  </p>
                </div>
              </div>
            )}


          </div>
        </div>
      </main>

      {/* Call-to-Action Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Start Saving?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get expert guidance on transitioning to virtual HR services and maximize your cost savings.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Talk to an Expert</h3>
              <p className="text-gray-600 mb-6">
                Schedule a free consultation to discuss your HR needs and get a customized savings plan.
              </p>
              <a
                href="/contact"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 inline-block"
              >
                Schedule Consultation
            </a>
          </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Download className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Download Report</h3>
              <p className="text-gray-600 mb-6">
                Get a detailed cost analysis report with industry benchmarks and transition recommendations.
              </p>
              <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300">
                Download Report
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Free Quote</h3>
              <p className="text-gray-600 mb-6">
                Request a customized quote for virtual HR services tailored to your organization.
              </p>
              <Link
                to="/contact"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 inline-block"
              >
                Get Free Quote
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured HR Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive virtual HR solutions designed to reduce costs and improve efficiency.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group bg-white rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Virtual HR Management</h3>
              <p className="text-gray-600 mb-6">
                Complete HR management services including payroll, compliance, and employee relations.
              </p>
              <Link
                to="/services"
                className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all duration-300 cursor-pointer"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group bg-white rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">HR Consulting</h3>
              <p className="text-gray-600 mb-6">
                Strategic HR consulting to optimize your workforce and improve organizational efficiency.
              </p>
              <Link
                to="/services"
                className="flex items-center text-green-600 font-semibold group-hover:gap-2 transition-all duration-300 cursor-pointer"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group bg-white rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Compliance Management</h3>
              <p className="text-gray-600 mb-6">
                Stay compliant with labor laws and statutory requirements with expert guidance.
              </p>
              <Link
                to="/services"
                className="flex items-center text-purple-600 font-semibold group-hover:gap-2 transition-all duration-300 cursor-pointer"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Calculator className="h-6 w-6 text-green-400" />
                <span className="text-xl font-bold">Prachi</span>
              </div>
              <p className="text-gray-400 text-sm">
                Leading virtual HR solutions provider helping businesses reduce costs and improve efficiency.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Cost Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Virtual HR Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">HR Consulting</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Tools</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">HR Cost Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Salary Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ROI Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Engagement Calculator</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@hirewithprachi.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 87408 89927</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4" />
                  <span>Delhi, India</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 Prachi HR Solutions. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Share Result Modal */}
      <ShareResultModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        calculatorType="cost-savings"
        result={calculationResult}
        userData={leadData}
      />
    </div>
  );
}
