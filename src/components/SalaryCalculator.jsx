import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, MapPin, Briefcase, GraduationCap, DollarSign, Download, Share2, User, Mail, Phone, Building } from 'lucide-react';

export default function SalaryCalculator() {
  const [formData, setFormData] = useState({
    position: '',
    experience: '1-3',
    location: '',
    industry: '',
    education: 'bachelor',
    companySize: 'small',
    skills: []
  });

  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    designation: '',
    employees: ''
  });

  // Sample data - in real app, this would come from API
  const salaryData = {
    positions: {
      'HR Manager': { base: 800000, range: 600000, max: 1200000 },
      'HR Generalist': { base: 550000, range: 400000, max: 800000 },
      'Recruiter': { base: 500000, range: 350000, max: 750000 },
      'HR Coordinator': { base: 450000, range: 350000, max: 650000 },
      'HR Director': { base: 1200000, range: 900000, max: 1800000 },
      'Talent Acquisition': { base: 650000, range: 500000, max: 950000 },
      'Compensation Analyst': { base: 700000, range: 550000, max: 1000000 },
      'Benefits Specialist': { base: 600000, range: 450000, max: 850000 }
    },
    experienceMultipliers: {
      '0-1': 0.8,
      '1-3': 1.0,
      '3-5': 1.2,
      '5-8': 1.4,
      '8-10': 1.6,
      '10+': 1.8
    },
    locationMultipliers: {
      'Mumbai': 1.3,
      'Delhi': 1.25,
      'Bangalore': 1.2,
      'Hyderabad': 1.1,
      'Chennai': 1.05,
      'Pune': 1.0,
      'Other': 0.9
    },
    educationMultipliers: {
      'high_school': 0.9,
      'bachelor': 1.0,
      'master': 1.15,
      'phd': 1.3
    },
    companySizeMultipliers: {
      'startup': 0.9,
      'small': 1.0,
      'medium': 1.1,
      'large': 1.2,
      'enterprise': 1.3
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
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

  const calculateSalary = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const position = salaryData.positions[formData.position];
      if (!position) {
        setResult({ error: 'Please select a valid position' });
        setIsCalculating(false);
        return;
      }

      const baseSalary = position.base;
      const experienceMultiplier = salaryData.experienceMultipliers[formData.experience] || 1.0;
      const locationMultiplier = salaryData.locationMultipliers[formData.location] || 1.0;
      const educationMultiplier = salaryData.educationMultipliers[formData.education] || 1.0;
      const companySizeMultiplier = salaryData.companySizeMultipliers[formData.companySize] || 1.0;

      const calculatedSalary = Math.round(
        baseSalary * 
        experienceMultiplier * 
        locationMultiplier * 
        educationMultiplier * 
        companySizeMultiplier
      );

      const minSalary = Math.round(calculatedSalary * 0.85);
      const maxSalary = Math.round(calculatedSalary * 1.15);

      setResult({
        position: formData.position,
        calculatedSalary,
        minSalary,
        maxSalary,
        breakdown: {
          base: baseSalary,
          experience: experienceMultiplier,
          location: locationMultiplier,
          education: educationMultiplier,
          companySize: companySizeMultiplier
        }
      });
      setIsCalculating(false);
      setShowLeadForm(true);
    }, 1500);
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    console.log('Lead data submitted:', leadData);
    setShowLeadForm(false);
    // Here you would typically send the data to your CRM
    alert('Thank you! Your salary report is ready for download.');
  };

  const downloadReport = () => {
    if (!result) return;
    
    const report = `
Salary Calculator Report
=======================

Position: ${result.position}
Calculated Salary: ₹${result.calculatedSalary.toLocaleString('en-IN')}
Salary Range: ₹${result.minSalary.toLocaleString('en-IN')} - ₹${result.maxSalary.toLocaleString('en-IN')}

Breakdown:
- Base Salary: ₹${result.breakdown.base.toLocaleString('en-IN')}
- Experience Multiplier: ${result.breakdown.experience}x
- Location Multiplier: ${result.breakdown.location}x
- Education Multiplier: ${result.breakdown.education}x
- Company Size Multiplier: ${result.breakdown.companySize}x

User Details:
- Name: ${leadData.name}
- Email: ${leadData.email}
- Phone: ${leadData.phone}
- Company: ${leadData.company}
- Designation: ${leadData.designation}
- Company Size: ${leadData.employees} employees

Generated on: ${new Date().toLocaleDateString('en-IN')}
    `;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `salary-report-${result.position.toLowerCase().replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Salary Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate competitive salary ranges for HR positions in India based on experience, location, and other factors
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calculator className="h-6 w-6 text-emerald-600" />
              Salary Parameters
            </h2>

            <div className="space-y-6">
              {/* Position */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Briefcase className="w-4 h-4 inline mr-2" />
                  Position *
                </label>
                <select
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Select HR Position</option>
                  <option value="HR Manager">HR Manager</option>
                  <option value="HR Generalist">HR Generalist</option>
                  <option value="Recruiter">Recruiter</option>
                  <option value="HR Coordinator">HR Coordinator</option>
                  <option value="HR Director">HR Director</option>
                  <option value="Talent Acquisition">Talent Acquisition</option>
                  <option value="Compensation Analyst">Compensation Analyst</option>
                  <option value="Benefits Specialist">Benefits Specialist</option>
                </select>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <TrendingUp className="w-4 h-4 inline mr-2" />
                  Years of Experience
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-8">5-8 years</option>
                  <option value="8-10">8-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Location
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Select Location</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Pune">Pune</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Education */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <GraduationCap className="w-4 h-4 inline mr-2" />
                  Education Level
                </label>
                <select
                  value={formData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="high_school">High School</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD</option>
                </select>
              </div>

              {/* Company Size */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Building className="w-4 h-4 inline mr-2" />
                  Company Size
                </label>
                <select
                  value={formData.companySize}
                  onChange={(e) => handleInputChange('companySize', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="startup">Startup (1-50)</option>
                  <option value="small">Small (51-200)</option>
                  <option value="medium">Medium (201-1000)</option>
                  <option value="large">Large (1001-5000)</option>
                  <option value="enterprise">Enterprise (5000+)</option>
                </select>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="text-center mt-8">
              <button
                onClick={calculateSalary}
                disabled={!formData.position || isCalculating}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCalculating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Calculating...
                  </div>
                ) : (
                  'Calculate Salary'
                )}
              </button>
            </div>
          </motion.div>

          {/* Results & Lead Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Results */}
            {result && !result.error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Salary Calculation Results</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">
                      {formatCurrency(result.calculatedSalary)}
                    </div>
                    <div className="text-sm text-gray-600">Calculated Salary</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-700 mb-2">
                      {formatCurrency(result.minSalary)}
                    </div>
                    <div className="text-sm text-gray-600">Minimum Range</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-700 mb-2">
                      {formatCurrency(result.maxSalary)}
                    </div>
                    <div className="text-sm text-gray-600">Maximum Range</div>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="bg-white rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Calculation Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Base Salary:</span>
                      <span>{formatCurrency(result.breakdown.base)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Experience Multiplier:</span>
                      <span>{result.breakdown.experience}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Location Multiplier:</span>
                      <span>{result.breakdown.location}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Education Multiplier:</span>
                      <span>{result.breakdown.education}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Company Size Multiplier:</span>
                      <span>{result.breakdown.companySize}x</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Lead Form */}
            {showLeadForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-emerald-600" />
                  Get Your Detailed Report
                </h3>
                <p className="text-gray-600 mb-4">
                  Fill in your details to download a comprehensive salary report with market insights and recommendations.
                </p>
                
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={leadData.name}
                        onChange={(e) => handleLeadInputChange('name', e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                      <input
                        type="text"
                        value={leadData.company}
                        onChange={(e) => handleLeadInputChange('company', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Enter your designation"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Company Size</label>
                      <select
                        value={leadData.employees}
                        onChange={(e) => handleLeadInputChange('employees', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                    className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Download Detailed Report
                  </button>
                </form>
              </motion.div>
            )}

            {result && result.error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
                {result.error}
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
              <strong>Disclaimer:</strong> This calculator provides estimates based on Indian market data and should be used as a reference only. Actual salaries may vary based on specific company policies, market conditions, and individual qualifications. For accurate salary information, consult with HR professionals or use industry-specific salary surveys.
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 