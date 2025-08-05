import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Calculator, Users, Mail, Phone, TrendingUp, DollarSign, PieChart, Download, Share2, Star, CheckCircle, ArrowRight, Building, Award, Shield, Calendar, Clock, FileText, ArrowLeft, User, Target } from 'lucide-react';
import { formSubmission } from '../lib/supabase';
import { generatePdfWithStates } from '../lib/supabasePdfGenerator';
import ShareResultModal from '../components/ShareResultModal';

const questions = [
  'Employees feel valued and recognized for their work.',
  'Communication between management and staff is effective.',
  'Employees have opportunities for growth and development.',
  'Work-life balance is supported by the organization.',
  'Employees are motivated to go above and beyond in their roles.',
];

function AnimatedNumber({ value }) {
  const [displayValue, setDisplayValue] = useState(0);

  React.useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1000;
    const increment = end / (duration / 16);

    function animate() {
      start += increment;
      if (start < end) {
        setDisplayValue(parseFloat(start.toFixed(2)));
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
      }
    }
    animate();
  }, [value]);

  return <div className="text-4xl font-bold text-green-700">{displayValue.toFixed(2)}</div>;
}

export default function EmployeeEngagementCalculator() {
  const navigate = useNavigate();
  const [numEmployees, setNumEmployees] = useState('');
  const [answers, setAnswers] = useState(Array(5).fill(3));
  const [email, setEmail] = useState('');
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
  const [avg, setAvg] = useState(0);
  const [crmError, setCrmError] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [shared, setShared] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [calculationResult, setCalculationResult] = useState(null);

  const handleChange = (idx, value) => {
    const updated = [...answers];
    updated[idx] = Number(value);
    setAnswers(updated);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const sum = answers.reduce((a, b) => a + b, 0);
    setAvg(sum / answers.length);
    setShowResult(true);
    setShowLeadForm(true);
    
    // Calculate engagement score
    const scores = answers.map(q => parseInt(q) || 0);
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    const maxScore = scores.length * 5;
    const engagementPercentage = Math.round((totalScore / maxScore) * 100);
    
    // Determine engagement level
    let engagementLevel = '';
    let levelColor = '';
    if (engagementPercentage >= 80) {
      engagementLevel = 'Highly Engaged';
      levelColor = 'green';
    } else if (engagementPercentage >= 60) {
      engagementLevel = 'Moderately Engaged';
      levelColor = 'blue';
    } else if (engagementPercentage >= 40) {
      engagementLevel = 'Low Engagement';
      levelColor = 'yellow';
    } else {
      engagementLevel = 'Disengaged';
      levelColor = 'red';
    }
    
    // Get engagement analysis
    const analysis = getEngagementAnalysis(engagementPercentage);
    
    setCalculationResult({
      engagementScore: engagementPercentage,
      engagementLevel: engagementLevel,
      category: engagementLevel,
      totalScore: totalScore,
      maxScore: maxScore,
      averageScore: (totalScore / scores.length).toFixed(1),
      responses: answers,
      description: analysis.description,
      recommendations: analysis.recommendations,
      keyAreas: analysis.keyAreas
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
          engagement_percentage: calculationResult.engagementScore,
          engagement_level: calculationResult.engagementLevel,
          total_score: calculationResult.totalScore,
          max_score: calculationResult.maxScore,
          average_score: calculationResult.averageScore,
          responses: calculationResult.responses
        },
        lead_source: 'Employee Engagement Calculator',
        page_source: '/employee-engagement-calculator'
      }, 'employee_engagement');
      
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
        
        alert('✅ Data saved successfully! Your engagement report has been downloaded.');
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

  const handleDownload = async () => {
    if (!calculationResult) return;
    
    try {
      console.log('Preparing to send PDF via email:', calculationResult);
      
      await generatePdfWithStates(
        'engagement',
        calculationResult,
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

  const handleShare = () => {
    setShowShareModal(true);
  };

  const getEngagementAnalysis = (score) => {
    if (score >= 80) {
      return {
        description: "Excellent engagement! Your team is highly motivated and productive.",
        recommendations: "Maintain current practices and consider advanced engagement strategies.",
        keyAreas: ["Recognition Programs", "Career Development", "Work-Life Balance", "Communication"]
      };
    } else if (score >= 60) {
      return {
        description: "Good engagement levels. Consider targeted improvements for even better results.",
        recommendations: "Focus on communication and recognition programs.",
        keyAreas: ["Employee Recognition", "Communication Channels", "Professional Development", "Team Building"]
      };
    } else if (score >= 40) {
      return {
        description: "Moderate engagement. Focus on communication and recognition programs.",
        recommendations: "Implement comprehensive engagement initiatives.",
        keyAreas: ["Leadership Training", "Employee Feedback", "Recognition Systems", "Career Growth"]
      };
    } else {
      return {
        description: "Low engagement levels. Consider comprehensive engagement strategy review.",
        recommendations: "Immediate attention needed for team morale and engagement.",
        keyAreas: ["Leadership Development", "Employee Surveys", "Engagement Programs", "Culture Building"]
      };
    }
  };

  const getEngagementColor = (score) => {
    if (score >= 4.5) return "text-green-600";
    if (score >= 4.0) return "text-blue-600";
    if (score >= 3.5) return "text-yellow-600";
    if (score >= 3.0) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-rose-100">
      <Helmet>
        <title>Employee Engagement Calculator 2025 | Team Engagement Score - Prachi</title>
        <meta name="description" content="Calculate your team's engagement score with our free employee engagement calculator. Get insights and recommendations for improving workplace morale." />
        <meta name="keywords" content="employee engagement calculator, team engagement score, workplace morale calculator, hr engagement tool, employee satisfaction calculator" />
      </Helmet>

      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-pink-600 to-rose-600 p-2 rounded-lg">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Prachi HR Solutions</h1>
                <p className="text-sm text-gray-600">Employee Engagement Calculator</p>
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
      <section className="py-20 px-4 text-center bg-gradient-to-br from-pink-50 via-white to-rose-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100/20 to-rose-100/20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full mb-6">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Employee Engagement Calculator 2025
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                Calculate your team's engagement score and get insights to improve workplace morale and productivity.
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
                <div className="flex items-center justify-center w-12 h-12 bg-pink-100 rounded-full mb-4 mx-auto">
                  <Award className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Data-Driven</h3>
                <p className="text-sm text-gray-600">Based on proven engagement metrics</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-pink-500" />
                  Team Assessment
                </span>
                <span className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  Engagement Score
                </span>
                <span className="flex items-center gap-2">
                  <PieChart className="h-4 w-4 text-blue-500" />
                  Actionable Insights
                </span>
                <span className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-orange-500" />
                  Improvement Plans
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
              <div className="bg-gradient-to-r from-pink-600 to-rose-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <User className="h-6 w-6" />
                  <span>Employee Engagement Survey</span>
                </h2>
                <p className="text-pink-100 mt-1">Complete the survey to assess your team's engagement levels</p>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Contact Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input 
                          type="email" 
                          placeholder="your@email.com" 
                          value={email} 
                          onChange={e => setEmail(e.target.value)} 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" 
                          required 
                        />
                        <p className="text-sm text-gray-500 mt-1">We'll send your detailed engagement report to this email</p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Number of Employees *
                        </label>
                        <input 
                          type="number" 
                          min="1" 
                          placeholder="e.g. 50" 
                          value={numEmployees} 
                          onChange={e => setNumEmployees(e.target.value)} 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" 
                          required 
                        />
                        <p className="text-sm text-gray-500 mt-1">Total number of employees in your organization</p>
                      </div>
                    </div>
                  </div>

                  {/* Engagement Questions */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Engagement Assessment Questions
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Rate each statement on a scale of 1-5 (1 = Strongly Disagree, 5 = Strongly Agree)
                    </p>
                    <div className="space-y-6">
                      {questions.map((question, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="mb-3">
                            <label className="text-sm font-semibold text-gray-700">
                              {index + 1}. {question}
                            </label>
                          </div>
                          <div className="flex gap-4">
                            {[1, 2, 3, 4, 5].map(val => (
                              <label key={val} className="flex flex-col items-center cursor-pointer">
                                <input 
                                  type="radio" 
                                  name={`q${index}`} 
                                  value={val} 
                                  checked={answers[index] === val} 
                                  onChange={() => handleChange(index, val)} 
                                  className="sr-only" 
                                />
                                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-all ${
                                  answers[index] === val 
                                    ? 'bg-pink-500 border-pink-500 text-white' 
                                    : 'border-gray-300 text-gray-600 hover:border-pink-300'
                                }`}>
                                  {val}
                                </div>
                                <span className="text-xs text-gray-500 mt-1">
                                  {val === 1 ? 'Strongly Disagree' : val === 5 ? 'Strongly Agree' : ''}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Calculate Engagement Score
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
                <div className="bg-gradient-to-r from-pink-600 to-rose-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                    <User className="h-6 w-6" />
                    <span>Get Your Detailed Report</span>
                  </h2>
                  <p className="text-pink-100 mt-1">Fill in your details to download a comprehensive engagement analysis</p>
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                        <input
                          type="text"
                          value={leadData.company}
                          onChange={(e) => handleLeadInputChange('company', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="Enter your designation"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Company Size</label>
                        <select
                          value={leadData.employees}
                          onChange={(e) => handleLeadInputChange('employees', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                      className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    Your engagement report has been downloaded and your information has been saved successfully.
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
                className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sticky top-8 z-10" 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Engagement Results</h3>
                  <p className="text-sm text-gray-600">Your team's engagement analysis</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 text-center border border-green-200 shadow-sm">
                    <AnimatedNumber value={avg} />
                    <div className="text-sm text-green-600 font-medium mt-1">out of 5.0</div>
                    <div className="text-xs text-green-500 mt-1">Team Engagement Score</div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <div className="text-center mb-3">
                      <div className="text-sm font-semibold text-blue-700 mb-2">Analysis</div>
                    </div>
                    <p className={`text-sm font-semibold ${getEngagementColor(avg)}`}>
                      {getEngagementAnalysis(avg).description}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="text-center mb-3">
                      <div className="text-sm font-semibold text-gray-700 mb-2">Survey Details</div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Employees:</span>
                        <span className="font-semibold">{numEmployees}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Survey Date:</span>
                        <span className="font-semibold">{new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
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
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Calculate Your Engagement</h3>
                  <p className="text-gray-600 text-sm">
                    Complete the survey to get your team's engagement score and recommendations.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Call-to-Action Section */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Boost Your Team's Engagement
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get expert guidance on improving employee engagement and creating a positive workplace culture.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group bg-white rounded-2xl p-8 shadow-xl border border-gray-200 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Talk to an Expert</h3>
              <p className="text-gray-600 mb-6">
                Schedule a free consultation to discuss your engagement strategies and get personalized recommendations.
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
              className="group bg-white rounded-2xl p-8 shadow-xl border border-gray-200 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Download className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Download Report</h3>
              <p className="text-gray-600 mb-6">
                Get a comprehensive engagement analysis report with actionable recommendations.
              </p>
              <button 
                onClick={handleDownload}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
              >
                Download Report
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group bg-white rounded-2xl p-8 shadow-xl border border-gray-200 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Management</h3>
              <p className="text-gray-600 mb-6">
                Effective performance management systems to drive productivity and engagement.
              </p>
              <div className="flex items-center text-purple-600 font-semibold group-hover:gap-2 transition-all duration-300">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
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
                <Calculator className="h-6 w-6 text-pink-400" />
                <span className="text-xl font-bold">Prachi</span>
              </div>
              <p className="text-gray-400 text-sm">
                Leading HR solutions provider helping businesses improve employee engagement and drive success.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Engagement Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">HR Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">HR Consulting</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Tools</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Engagement Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Salary Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ROI Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cost Calculator</a></li>
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
        calculatorType="engagement"
        result={calculationResult}
        userData={leadData}
      />
    </div>
  );
} 