import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Download, Copy, CheckCircle } from 'lucide-react';

export default function ShareResultBanner({ 
  result, 
  calculatorType, 
  onShare, 
  onDownload, 
  onCopy,
  isShared = false,
  isDownloaded = false,
  isCopied = false 
}) {
  const generateShareText = () => {
    const baseText = `Check out my ${calculatorType} results from Hire With Prachi!`;
    
    if (result) {
      switch (calculatorType) {
        case 'Salary Calculator':
          return `${baseText}\n\nPosition: ${result.position}\nCalculated Salary: ₹${result.calculatedSalary?.toLocaleString('en-IN') || 'N/A'}\nSalary Range: ₹${result.minSalary?.toLocaleString('en-IN') || 'N/A'} - ₹${result.maxSalary?.toLocaleString('en-IN') || 'N/A'}`;
        
        case 'Employee Engagement Calculator':
          return `${baseText}\n\nEngagement Score: ${result.avg?.toFixed(2) || 'N/A'}/5.0\nTeam Size: ${result.numEmployees || 'N/A'} employees`;
        
        case 'HR Needs Assessment':
          return `${baseText}\n\nRecommended HR FTE: ${result.recommendedFTE || 'N/A'}\nIndustry: ${result.industry || 'N/A'}\nCompany Size: ${result.employees || 'N/A'} employees`;
        
        case 'ROI Calculator':
          return `${baseText}\n\nROI: ${result.roi?.toFixed(2) || 'N/A'}%\nInvestment: ₹${result.investment?.toLocaleString('en-IN') || 'N/A'}\nReturns: ₹${result.returns?.toLocaleString('en-IN') || 'N/A'}`;
        
        case 'Performance Calculator':
          return `${baseText}\n\nPerformance Score: ${result.score?.toFixed(2) || 'N/A'}/100\nRating: ${result.rating || 'N/A'}`;
        
        case 'Turnover Calculator':
          return `${baseText}\n\nTurnover Rate: ${result.turnoverRate?.toFixed(2) || 'N/A'}%\nCost of Turnover: ₹${result.cost?.toLocaleString('en-IN') || 'N/A'}`;
        
        case 'Benefits Calculator':
          return `${baseText}\n\nTotal Benefits Value: ₹${result.totalValue?.toLocaleString('en-IN') || 'N/A'}\nBenefits Package: ${result.package || 'N/A'}`;
        
        default:
          return baseText;
      }
    }
    
    return baseText;
  };

  const shareText = generateShareText();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 shadow-lg"
    >
      {/* Branded Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900">Hire With Prachi</h3>
        </div>
        <p className="text-sm text-gray-600">Share your {calculatorType} results</p>
      </div>

      {/* Results Preview */}
      {result && (
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-3">Your Results:</h4>
          <div className="text-sm text-gray-700 space-y-2">
            {calculatorType === 'Salary Calculator' && (
              <>
                <div className="flex justify-between">
                  <span>Position:</span>
                  <span className="font-medium">{result.position}</span>
                </div>
                <div className="flex justify-between">
                  <span>Salary:</span>
                  <span className="font-medium">₹{result.calculatedSalary?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Range:</span>
                  <span className="font-medium">₹{result.minSalary?.toLocaleString('en-IN')} - ₹{result.maxSalary?.toLocaleString('en-IN')}</span>
                </div>
              </>
            )}
            
            {calculatorType === 'Employee Engagement Calculator' && (
              <>
                <div className="flex justify-between">
                  <span>Engagement Score:</span>
                  <span className="font-medium">{result.avg?.toFixed(2)}/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Team Size:</span>
                  <span className="font-medium">{result.numEmployees} employees</span>
                </div>
              </>
            )}
            
            {calculatorType === 'HR Needs Assessment' && (
              <>
                <div className="flex justify-between">
                  <span>HR FTE Needed:</span>
                  <span className="font-medium">{result.recommendedFTE}</span>
                </div>
                <div className="flex justify-between">
                  <span>Industry:</span>
                  <span className="font-medium">{result.industry}</span>
                </div>
              </>
            )}
            
            {calculatorType === 'ROI Calculator' && (
              <>
                <div className="flex justify-between">
                  <span>ROI:</span>
                  <span className="font-medium">{result.roi?.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Investment:</span>
                  <span className="font-medium">₹{result.investment?.toLocaleString('en-IN')}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Share Actions */}
      <div className="space-y-3">
        <button
          onClick={() => onShare(shareText)}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <Share2 className="h-4 w-4" />
          <span>Share Results</span>
        </button>
        
        {isShared && (
          <div className="flex items-center justify-center text-green-600 text-sm">
            <CheckCircle className="h-4 w-4 mr-1" />
            Results shared successfully!
          </div>
        )}
        
        <button
          onClick={() => onCopy(shareText)}
          className="w-full bg-gradient-to-r from-gray-600 to-slate-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-gray-700 hover:to-slate-700 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <Copy className="h-4 w-4" />
          <span>Copy to Clipboard</span>
        </button>
        
        {isCopied && (
          <div className="flex items-center justify-center text-green-600 text-sm">
            <CheckCircle className="h-4 w-4 mr-1" />
            Copied to clipboard!
          </div>
        )}
        
        <button
          onClick={onDownload}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>Download Report</span>
        </button>
        
        {isDownloaded && (
          <div className="flex items-center justify-center text-green-600 text-sm">
            <CheckCircle className="h-4 w-4 mr-1" />
            Report downloaded!
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center mt-4 pt-4 border-t border-emerald-200">
        <p className="text-xs text-gray-500">
          Powered by <span className="font-semibold text-emerald-600">Hire With Prachi</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Professional HR Solutions & Consulting
        </p>
      </div>
    </motion.div>
  );
} 