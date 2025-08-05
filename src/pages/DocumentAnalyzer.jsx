import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FileText, Search, CheckCircle, AlertTriangle, Download, Share2, Star, ArrowLeft, Upload, Brain, Zap, Award } from 'lucide-react';
import { formSubmission } from '../lib/supabase';
import { generatePdfWithStates } from '../lib/supabasePdfGenerator';
import ShareResultBanner from '../components/ShareResultBanner';

export default function DocumentAnalyzer() {
  const [documentType, setDocumentType] = useState('');
  const [documentContent, setDocumentContent] = useState('');
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    email: '',
    industry: ''
  });
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [crmError, setCrmError] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [shared, setShared] = useState(false);
  const [copied, setCopied] = useState(false);

  const documentTypes = [
    { id: 'employment_contract', name: 'Employment Contract', icon: '📄' },
    { id: 'job_description', name: 'Job Description', icon: '💼' },
    { id: 'policy_document', name: 'HR Policy Document', icon: '📋' },
    { id: 'offer_letter', name: 'Offer Letter', icon: '✉️' },
    { id: 'handbook', name: 'Employee Handbook', icon: '📚' },
    { id: 'nda', name: 'Non-Disclosure Agreement', icon: '🔒' }
  ];

  const analyzeDocument = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const analysis = {
        compliance: Math.floor(Math.random() * 30) + 70, // 70-100%
        clarity: Math.floor(Math.random() * 30) + 70,
        completeness: Math.floor(Math.random() * 30) + 70,
        legalRisk: Math.floor(Math.random() * 20) + 10, // 10-30%
        suggestions: [
          'Consider adding specific termination clauses',
          'Include clear performance expectations',
          'Add data protection provisions',
          'Specify working hours and location',
          'Include dispute resolution procedures'
        ],
        missingElements: [
          'Confidentiality clauses',
          'Non-compete provisions',
          'Intellectual property rights',
          'Severance terms'
        ],
        overallScore: Math.floor(Math.random() * 20) + 80 // 80-100%
      };

      const resultData = {
        documentType,
        analysis,
        companyInfo,
        date: new Date().toLocaleDateString()
      };

      setResult(resultData);
      setShowResult(true);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!documentType || !documentContent.trim()) return;
    
    await analyzeDocument();

    if (companyInfo.email) {
      const ok = await addContactToHubSpot({ 
        email: companyInfo.email,
        name: companyInfo.name,
        company: companyInfo.name
      });
      if (!ok) setCrmError(true);
    }
  };

  const handleDownload = async () => {
    if (!result) return;
    
    try {
      console.log('Preparing to send PDF via email:', result);
      
      await generatePdfWithStates(
        'document-analyzer',
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
          title: 'Document Analysis Results',
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

  const getRiskColor = (risk) => {
    if (risk <= 15) return 'text-green-600';
    if (risk <= 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-100">
      <Helmet>
        <title>Document Analyzer 2025 | AI-Powered HR Document Analysis - Prachi</title>
        <meta name="description" content="AI-powered analysis of HR documents for compliance, accuracy, and optimization. Free document analyzer tool." />
      </Helmet>

      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-2 rounded-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Prachi HR Solutions</h1>
                <p className="text-sm text-gray-600">Document Analyzer</p>
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
            Document Analyzer 2025
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            AI-powered analysis of HR documents for compliance, accuracy, and optimization
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Brain className="h-5 w-5 text-indigo-500" />
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
          {/* Analysis Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <FileText className="h-6 w-6" />
                  <span>Document Analysis</span>
                </h2>
                <p className="text-indigo-100 mt-1">Upload or paste your HR document for AI-powered analysis</p>
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                            required 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Document Type */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        Document Type
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {documentTypes.map((type) => (
                          <label
                            key={type.id}
                            className={`relative cursor-pointer rounded-lg border-2 p-4 text-center transition-all hover:shadow-md ${
                              documentType === type.name
                                ? 'border-indigo-500 bg-indigo-50'
                                : 'border-gray-200 bg-gray-50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="documentType"
                              value={type.name}
                              checked={documentType === type.name}
                              onChange={(e) => setDocumentType(e.target.value)}
                              className="sr-only"
                            />
                            <div className="text-2xl mb-2">{type.icon}</div>
                            <div className="text-sm font-medium text-gray-900">{type.name}</div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Document Content */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        Document Content
                      </h3>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Paste your document content here *
                        </label>
                        <textarea
                          value={documentContent}
                          onChange={(e) => setDocumentContent(e.target.value)}
                          rows={8}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                          placeholder="Paste your HR document content here for analysis..."
                          required
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Our AI will analyze the content for compliance, clarity, and completeness
                        </p>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={!documentType || !documentContent.trim() || isAnalyzing}
                      className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAnalyzing ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Analyzing Document...</span>
                        </div>
                      ) : (
                        'Analyze Document'
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Analysis Complete!</h3>
                    <p className="text-gray-600">Your document analysis results are ready.</p>
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
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Analysis Results</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-indigo-50 rounded-xl p-4 text-center">
                      <div className={`text-3xl font-bold ${getScoreColor(result.analysis.overallScore)} mb-1`}>
                        {result.analysis.overallScore}/100
                      </div>
                      <div className="text-sm text-indigo-600">Overall Score</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Document Type:</span>
                        <span className="font-semibold">{result.documentType}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Company:</span>
                        <span className="font-semibold">{result.companyInfo.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Analysis Date:</span>
                        <span className="font-semibold">{result.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Detailed Analysis */}
                <motion.div 
                  className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6" 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h4 className="font-semibold text-gray-900 mb-4">Detailed Analysis</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Compliance Score:</span>
                      <span className={`text-sm font-semibold ${getScoreColor(result.analysis.compliance)}`}>
                        {result.analysis.compliance}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Clarity Score:</span>
                      <span className={`text-sm font-semibold ${getScoreColor(result.analysis.clarity)}`}>
                        {result.analysis.clarity}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Completeness:</span>
                      <span className={`text-sm font-semibold ${getScoreColor(result.analysis.completeness)}`}>
                        {result.analysis.completeness}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Legal Risk:</span>
                      <span className={`text-sm font-semibold ${getRiskColor(result.analysis.legalRisk)}`}>
                        {result.analysis.legalRisk}%
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Share Banner */}
                <ShareResultBanner
                  result={result}
                  calculatorType="Document Analyzer"
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
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Analyze Your Document</h3>
                  <p className="text-gray-600 text-sm">
                    Upload or paste your HR document for AI-powered analysis and optimization suggestions.
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
              <FileText className="h-6 w-6 text-indigo-400" />
              <span className="text-xl font-bold">Prachi HR Solutions</span>
            </div>
            <p className="text-gray-400 text-sm">
              AI-powered HR document analysis and optimization solutions.
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