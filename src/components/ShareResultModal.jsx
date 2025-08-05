import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, MessageCircle, Linkedin, Twitter, Mail, Copy, Check } from 'lucide-react';
// PDF generation removed - will be replaced with Supabase Edge Function
const ShareResultModal = ({ isOpen, onClose, calculatorType, result, userData }) => {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  if (!isOpen || !result) return null;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadCalculatorPDF(calculatorType, result, userData);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async (platform) => {
    setIsSharing(true);
    try {
      switch (platform) {
        case 'native':
          await shareCalculatorResult(calculatorType, result, userData);
          break;
        case 'whatsapp':
          await shareToWhatsApp();
          break;
        case 'linkedin':
          await shareToLinkedIn();
          break;
        case 'twitter':
          await shareToTwitter();
          break;
        case 'email':
          await shareToEmail();
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Share failed:', error);
    } finally {
      setIsSharing(false);
    }
  };

                const shareToWhatsApp = async () => {
                const text = `Check out my ${getCalculatorTitle(calculatorType)} from Hire With Prachi! 📊✨\n\nGet your own professional HR insights at prachi-hr.com`;
                const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
                window.open(url, '_blank');
              };

                const shareToLinkedIn = async () => {
                const text = `Just used Hire With Prachi ${getCalculatorTitle(calculatorType)} - amazing insights for HR professionals! 💼\n\n#HR #VirtualHR #HRConsulting #HireWithPrachi`;
                const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(text)}`;
                window.open(url, '_blank');
              };

                const shareToTwitter = async () => {
                const text = `Just discovered Hire With Prachi ${getCalculatorTitle(calculatorType)} - incredible HR insights! 🚀\n\n#HR #VirtualHR #HRConsulting`;
                const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
                window.open(url, '_blank');
              };

                const shareToEmail = async () => {
                    const subject = `${getCalculatorTitle(calculatorType)} - Hire With Prachi`;
    const body = `Hi,\n\nI just used Hire With Prachi ${getCalculatorTitle(calculatorType)} and got amazing insights!\n\nCheck it out: ${window.location.href}\n\nBest regards`;
                const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.open(url);
              };

                const copyToClipboard = async () => {
                try {
                  const text = `Check out my ${getCalculatorTitle(calculatorType)} from Hire With Prachi!\n\n${window.location.href}`;
                  await navigator.clipboard.writeText(text);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                } catch (error) {
                  console.error('Copy failed:', error);
                }
              };

  const getCalculatorTitle = (type) => {
    const titles = {
      'salary': 'Salary Calculator Report',
      'employee': 'Employee Salary Report',
      'cost-savings': 'HR Cost Savings Analysis',
      'roi': 'ROI Calculator Report',
      'needs-assessment': 'HR Needs Assessment Report',
      'engagement': 'Employee Engagement Report',
      'benchmarking': 'Salary Benchmarking Report'
    };
    return titles[type] || 'Calculator Report';
  };

  const shareOptions = [
    {
      id: 'download',
      label: 'Download PDF',
      icon: Download,
      color: 'bg-blue-500 hover:bg-blue-600',
      action: handleDownload,
      loading: isDownloading
    },
    {
      id: 'native',
      label: 'Share PDF',
      icon: Share2,
      color: 'bg-green-500 hover:bg-green-600',
      action: () => handleShare('native'),
      loading: isSharing
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-600 hover:bg-green-700',
      action: () => handleShare('whatsapp')
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => handleShare('linkedin')
    },
    {
      id: 'twitter',
      label: 'X (Twitter)',
      icon: Twitter,
      color: 'bg-black hover:bg-gray-800',
      action: () => handleShare('twitter')
    },
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      color: 'bg-purple-500 hover:bg-purple-600',
      action: () => handleShare('email')
    },
    {
      id: 'copy',
      label: copied ? 'Copied!' : 'Copy Link',
      icon: copied ? Check : Copy,
      color: copied ? 'bg-green-500' : 'bg-gray-500 hover:bg-gray-600',
      action: copyToClipboard
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">
                  Share Your Results
                </h2>
                <button
                  onClick={onClose}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <p className="text-blue-100 text-sm mt-1">
                {getCalculatorTitle(calculatorType)}
              </p>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Preview */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 mb-6 border border-blue-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {getCalculatorTitle(calculatorType)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Professional PDF report with your results
                  </div>
                </div>
              </div>

              {/* Share Options */}
              <div className="space-y-3">
                {shareOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={option.action}
                    disabled={option.loading}
                    className={`w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-xl text-white font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${option.color}`}
                  >
                    {option.loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <option.icon className="h-5 w-5" />
                    )}
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>

              {/* Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <div className="text-sm text-gray-600 text-center">
                  <p className="font-semibold mb-1">💡 Pro Tip</p>
                  <p>
                    Download the PDF for a professional report with your branding and contact details!
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="text-center">
                                            <p className="text-sm text-gray-600">
                              Powered by <span className="font-semibold text-blue-600">Hire With Prachi</span>
                            </p>
                <p className="text-xs text-gray-500 mt-1">
                  Professional HR Solutions & Consulting
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ShareResultModal; 