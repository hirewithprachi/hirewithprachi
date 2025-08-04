import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { formSubmission } from '../lib/supabase';
import { downloadCalculatorPDF, shareCalculatorResult } from '../lib/html2pdfGenerator';
import { TrendingUp, Download, Mail, Calculator } from 'lucide-react';

const salaryData = {
  'HR Manager': { min: 600000, max: 900000, avg: 750000 },
  'HR Generalist': { min: 400000, max: 650000, avg: 525000 },
  'Recruiter': { min: 350000, max: 600000, avg: 475000 },
  'Payroll Specialist': { min: 420000, max: 700000, avg: 560000 },
  'HR Assistant': { min: 320000, max: 480000, avg: 400000 },
};

function getSalary(job, years) {
  // Demo: add 2% per year of experience
  const base = salaryData[job] || { min: 40000, max: 60000, avg: 50000 };
  const factor = 1 + (Number(years) || 0) * 0.02;
  return {
    min: Math.round(base.min * factor),
    max: Math.round(base.max * factor),
    avg: Math.round(base.avg * factor),
  };
}

export default function SalaryBenchmarkingTool() {
  const [job, setJob] = useState('HR Manager');
  const [location, setLocation] = useState('');
  const [years, setYears] = useState('');
  const [email, setEmail] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ min: 0, max: 0, avg: 0 });
  const [crmError, setCrmError] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const salaryResult = getSalary(job, years);
    setResult(salaryResult);
    setShowResult(true);
    
    // Submit form to Supabase (which also sends to HubSpot)
    if (email) {
      try {
        const result = await formSubmission.submitCalculatorForm({
          email: email,
          calculation_data: {
            job_title: job,
            location: location,
            years_experience: years,
            salary_min: salaryResult.min,
            salary_avg: salaryResult.avg,
            salary_max: salaryResult.max
          },
          lead_source: 'Salary Benchmarking Tool',
          page_source: '/salary-benchmarking-tool'
        }, 'salary_benchmarking');
        
        if (!result.success) {
          setCrmError(true);
        }
      } catch (error) {
        console.error('Form submission error:', error);
        setCrmError(true);
      }
    }
  };

  async function handleDownload() {
    try {
      console.log('Attempting PDF generation with:', result);
      
      // Prepare data for PDF generation
      const pdfData = {
        min: result.min,
        avg: result.avg,
        max: result.max,
        jobTitle: job,
        location: location,
        yearsExperience: years
      };
      
      const filename = await downloadCalculatorPDF('benchmarking', pdfData, { email });
      console.log('PDF generated successfully:', filename);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch (error) {
      console.error('PDF generation failed:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        result: result
      });
      
      // Fallback to old TXT method
      const text = `Salary Benchmarking Result\n\nJob Title: ${job}\nLocation: ${location}\nYears of Experience: ${years}\n\nEstimated Salary Range:\nMin: ₹${result.min.toLocaleString('en-IN')}\nAvg: ₹${result.avg.toLocaleString('en-IN')}\nMax: ₹${result.max.toLocaleString('en-IN')}`;
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'salary-benchmarking-result.txt';
      a.click();
      URL.revokeObjectURL(url);
      setDownloaded(true);
    }
  }

  // Structured data for the tool
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Salary Benchmarking Tool",
    "description": "Compare HR salaries by role, location, and experience level. Get accurate salary benchmarks for HR professionals.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "url": "https://hirewithprachi.com/salary-benchmarking-tool",
    "author": {
      "@type": "Person",
      "name": "Prachi Shrivastava",
      "jobTitle": "Virtual HR Consultant"
    }
  };

  return (
    <>
      <Helmet>
        <title>Salary Benchmarking Tool | HR Salary Calculator | Hire With Prachi</title>
        <meta name="description" content="Compare HR salaries by role, location, and experience. Get accurate salary benchmarks for HR professionals with our free salary benchmarking tool." />
        <meta name="keywords" content="salary benchmarking, HR salary calculator, HR salary comparison, salary range calculator, HR compensation" />
        <meta property="og:title" content="Salary Benchmarking Tool | Hire With Prachi" />
        <meta property="og:description" content="Compare HR salaries by role, location, and experience. Get accurate salary benchmarks for HR professionals." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hirewithprachi.com/salary-benchmarking-tool" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Salary Benchmarking Tool | Hire With Prachi" />
        <meta name="twitter:description" content="Compare HR salaries by role, location, and experience." />
        <link rel="canonical" href="https://hirewithprachi.com/salary-benchmarking-tool" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-6 py-3 rounded-full border border-blue-500/30 backdrop-blur-sm mb-6">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 text-sm font-semibold">Free HR Tool</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Salary <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Benchmarking Tool</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Compare HR salaries by role, location, and experience level. 
              Get accurate salary benchmarks for HR professionals in India.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Calculator className="w-6 h-6 text-blue-600" />
                  Calculate Salary Range
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Email</label>
                    <input 
                      type="email" 
                      placeholder="your@email.com (for detailed report)" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" 
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title</label>
                    <select 
                      value={job} 
                      onChange={e => setJob(e.target.value)} 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      {Object.keys(salaryData).map(j => (
                        <option key={j} value={j}>{j}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Mumbai, Bangalore" 
                        value={location} 
                        onChange={e => setLocation(e.target.value)} 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Years of Experience</label>
                      <input 
                        type="number" 
                        min="0" 
                        max="40" 
                        placeholder="e.g. 5" 
                        value={years} 
                        onChange={e => setYears(e.target.value)} 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" 
                      />
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Calculator className="w-5 h-5" />
                    Calculate Salary Range
                  </button>
                </form>
              </motion.div>

              {/* Results */}
              <AnimatePresence>
                {showResult && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-200"
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-4">💰</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Estimated Salary Range</h3>
                      <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <AnimatedNumber label="Minimum" value={result.min} color="text-red-600" />
                        <AnimatedNumber label="Average" value={result.avg} color="text-blue-600" />
                        <AnimatedNumber label="Maximum" value={result.max} color="text-green-600" />
                      </div>
                      
                      <div className="text-gray-600 mb-6">
                        Based on {job} role with {years || 0} years of experience in {location || 'India'}
                      </div>
                      
                      {crmError && (
                        <div className="text-red-600 text-sm mb-4">
                          (CRM integration failed, but your result is shown above.)
                        </div>
                      )}
                      
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                          onClick={handleDownload} 
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition-all duration-300"
                        >
                          <Download className="w-4 h-4" />
                          Download Result
                        </button>
                        <a
                          href="mailto:info@hirewithprachi.com?subject=Custom Salary Benchmarking Report"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-all duration-300"
                        >
                          <Mail className="w-4 h-4" />
                          Request Custom Report
                        </a>
                      </div>
                      
                      {downloaded && (
                        <div className="text-green-600 text-sm mt-4 font-semibold">
                          ✅ Result downloaded successfully!
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Info Panel */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  How It Works
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Enter your job title and experience</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Get instant salary range estimates</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Download your personalized report</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Request custom location-specific data</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white"
              >
                <h3 className="text-xl font-bold mb-4">Why Use This Tool?</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <span>Accurate market data</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <span>Experience-based calculations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <span>Location-specific insights</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <span>Free comprehensive reports</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function AnimatedNumber({ label, value, color }) {
  const [display, setDisplay] = useState(0);
  React.useEffect(() => {
    let start = 0;
    const duration = 800;
    const step = Math.ceil(value / (duration / 16));
    let raf;
    function animate() {
      start += step;
      if (start >= value) {
        setDisplay(value);
      } else {
        setDisplay(start);
        raf = requestAnimationFrame(animate);
      }
    }
    animate();
    return () => raf && cancelAnimationFrame(raf);
  }, [value]);
  return (
    <div>
      <div className={`text-2xl font-bold ${color}`}>₹{display.toLocaleString()}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
} 