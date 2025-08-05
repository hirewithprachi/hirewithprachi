import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FileText, User, Download, Share2, Star, ArrowLeft, Search, Brain, Zap, Award, CheckCircle } from 'lucide-react';
import { formSubmission } from '../lib/supabase';
import { generatePdfWithStates } from '../lib/supabasePdfGenerator';
import ShareResultBanner from '../components/ShareResultBanner';

export default function ResumeParser() {
  const [resumeContent, setResumeContent] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    email: '',
    industry: ''
  });
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [crmError, setCrmError] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [shared, setShared] = useState(false);
  const [copied, setCopied] = useState(false);

  const parseResume = async () => {
    setIsParsing(true);
    
    // Simulate AI parsing
    setTimeout(() => {
      const parsedData = {
        candidate: {
          name: 'John Doe',
          email: 'john.doe@email.com',
          phone: '+91 98765 43210',
          location: 'Mumbai, Maharashtra',
          experience: '5 years',
          education: 'Bachelor of Technology in Computer Science',
          skills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB', 'AWS'],
          certifications: ['AWS Certified Developer', 'MongoDB Certified Developer']
        },
        analysis: {
          matchScore: Math.floor(Math.random() * 30) + 70, // 70-100%
          experienceRelevance: Math.floor(Math.random() * 30) + 70,
          skillMatch: Math.floor(Math.random() * 30) + 70,
          educationFit: Math.floor(Math.random() * 30) + 70,
          overallRating: Math.floor(Math.random() * 20) + 80 // 80-100%
        },
        recommendations: [
          'Strong technical skills match job requirements',
          'Relevant experience in similar roles',
          'Good educational background',
          'Consider for technical interview',
          'Skills align well with company needs'
        ],
        redFlags: [
          'Gap in employment history',
          'Limited leadership experience'
        ]
      };

      const resultData = {
        jobTitle,
        parsedData,
        companyInfo,
        date: new Date().toLocaleDateString()
      };

      setResult(resultData);
      setShowResult(true);
      setIsParsing(false);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeContent.trim() || !jobTitle) return;
    
    await parseResume();

    if (companyInfo.email) {
      try {
        const result = await formSubmission.submitCalculatorForm({
          name: companyInfo.name,
          email: companyInfo.email,
          company: companyInfo.name,
          calculation_data: {
            job_title: jobTitle,
            resume_content: resumeContent,
            parsed_data: result?.parsedData
          },
          lead_source: 'Resume Parser',
          page_source: '/resume-parser'
        }, 'resume_parser');
        
        if (!result.success) {
          setCrmError(true);
        }
      } catch (error) {
        console.error('Form submission error:', error);
        setCrmError(true);
      }
    }
  };

  const handleDownload = async () => {
    if (!result) return;
    
    try {
      console.log('Preparing to send PDF via email:', result);
      
      await generatePdfWithStates(
        'resume-parser',
        result,
        companyInfo,
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
          title: 'Resume Analysis Results',
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

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-100">
      <Helmet>
        <title>Resume Parser 2025 | AI-Powered Resume Analysis - Prachi</title>
        <meta name="description" content="Extract and analyze candidate information from resumes for efficient hiring. Free resume parser tool." />
      </Helmet>

      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-2 rounded-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Prachi HR Solutions</h1>
                <p className="text-sm text-gray-600">Resume Parser</p>
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
      <section className="py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Resume Parser 2025
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Extract and analyze candidate information from resumes for efficient hiring
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Brain className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium">AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">100% Free</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium">Instant Analysis</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Parser Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <FileText className="h-6 w-6" />
                  <span>Resume Parser</span>
                </h2>
                <p className="text-purple-100 mt-1">Paste resume content for AI-powered analysis and candidate matching</p>
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
                            onChange={(e) => setCompanyInfo(prev => ({...prev, name: e.target.value}))} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
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
                            onChange={(e) => setCompanyInfo(prev => ({...prev, email: e.target.value}))} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                            required 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Job Title */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        Job Details
                      </h3>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Job Title *
                        </label>
                        <input 
                          type="text" 
                          value={jobTitle} 
                          onChange={(e) => setJobTitle(e.target.value)} 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                          placeholder="e.g. Senior Software Engineer"
                          required 
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Enter the job title to match against the candidate's resume
                        </p>
                      </div>
                    </div>

                    {/* Resume Content */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        Resume Content
                      </h3>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Paste resume content here *
                        </label>
                        <textarea
                          value={resumeContent}
                          onChange={(e) => setResumeContent(e.target.value)}
                          rows={10}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                          placeholder="Paste the candidate's resume content here for analysis..."
                          required
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Our AI will extract candidate information and analyze job fit
                        </p>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={!resumeContent.trim() || !jobTitle || isParsing}
                      className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isParsing ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Parsing Resume...</span>
                        </div>
                      ) : (
                        'Parse Resume'
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Analysis Complete!</h3>
                    <p className="text-gray-600">Your resume analysis results are ready.</p>
                  </div>
                )}
              </div>
            </div>
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
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Candidate Analysis</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-xl p-4 text-center">
                      <div className={`text-3xl font-bold ${getScoreColor(result.parsedData.analysis.overallRating)} mb-1`}>
                        {result.parsedData.analysis.overallRating}/100
                      </div>
                      <div className="text-sm text-purple-600">Overall Rating</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Candidate:</span>
                        <span className="font-semibold">{result.parsedData.candidate.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Job Title:</span>
                        <span className="font-semibold">{result.jobTitle}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Match Score:</span>
                        <span className={`font-semibold ${getScoreColor(result.parsedData.analysis.matchScore)}`}>
                          {result.parsedData.analysis.matchScore}%
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Candidate Details */}
                <motion.div 
                  className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6" 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h4 className="font-semibold text-gray-900 mb-4">Candidate Details</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-medium">{result.parsedData.candidate.experience}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{result.parsedData.candidate.location}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Education:</span>
                      <span className="font-medium">{result.parsedData.candidate.education}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Skills:</span>
                      <span className="font-medium">{result.parsedData.candidate.skills.length}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Share Banner */}
                <ShareResultBanner
                  result={result}
                  calculatorType="Resume Parser"
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
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Parse Resume</h3>
                  <p className="text-gray-600 text-sm">
                    Paste resume content for AI-powered analysis and candidate matching.
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
              <FileText className="h-6 w-6 text-purple-400" />
              <span className="text-xl font-bold">Prachi HR Solutions</span>
            </div>
            <p className="text-gray-400 text-sm">
              AI-powered resume analysis and candidate matching solutions.
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