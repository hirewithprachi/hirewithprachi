import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { addContactToHubSpot } from '../lib/hubspot';

const industries = [
  { name: 'Tech', ratio: 75 },
  { name: 'Manufacturing', ratio: 100 },
  { name: 'Healthcare', ratio: 60 },
  { name: 'Retail', ratio: 120 },
  { name: 'Other', ratio: 100 },
];
const packages = [
  { name: 'Basic', max: 50 },
  { name: 'Pro', max: 200 },
  { name: 'Enterprise', max: Infinity },
];

export default function HRNeedsAssessmentCalculator() {
  const [employees, setEmployees] = useState('');
  const [industry, setIndustry] = useState(industries[0].name);
  const [showResult, setShowResult] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    employees: ''
  });
  const [crmError, setCrmError] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setShowResult(true);
    setShowLeadForm(true);
  };

  const handleLeadSubmit = async e => {
    e.preventDefault();
    setShowLeadForm(false);
    
    // CRM integration
    if (leadData.email) {
      const ok = await addContactToHubSpot({ 
        email: leadData.email,
        name: leadData.name,
        phone: leadData.phone,
        company: leadData.company
      });
      if (!ok) setCrmError(true);
    }
  };

  const handleDownload = () => {
    const text = `HR Needs Assessment Report\n\nCompany Details:\n- Industry: ${industry}\n- Number of Employees: ${employees}\n\nAssessment Results:\n- Recommended HR FTE: ${recommendedFTE}\n- Suggested Service Package: ${recommendedPackage}\n\nAnalysis:\nFor a ${industry} company with ${employees} employees, you typically need ${recommendedFTE} full-time HR staff.\n\nGenerated on: ${new Date().toLocaleDateString()}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hr-needs-assessment-report.txt';
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  const selectedIndustry = industries.find(i => i.name === industry);
  const recommendedFTE = selectedIndustry ? Math.max(1, Math.ceil(Number(employees) / selectedIndustry.ratio)) : 1;
  const recommendedPackage = packages.find(p => Number(employees) <= p.max)?.name || 'Enterprise';

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 max-w-2xl mx-auto">
      <motion.h1 className="text-3xl md:text-4xl font-bold mb-6 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>HR Needs Assessment</motion.h1>
      <motion.p className="mb-8 text-gray-700 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Find out how many HR staff you need and which service package fits your business.</motion.p>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4 mb-8">
        <input type="number" min="1" step="1" placeholder="Number of Employees" value={employees} onChange={e => setEmployees(e.target.value)} className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full" required />
        <select value={industry} onChange={e => setIndustry(e.target.value)} className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400">
          {industries.map(i => <option key={i.name} value={i.name}>{i.name}</option>)}
        </select>
        <button type="submit" className="px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition mt-4">Assess Needs</button>
      </form>
      {showResult && (
        <motion.div className="bg-blue-50 rounded-xl p-6 text-center mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="text-lg font-semibold mb-2">Recommended HR FTE:</div>
          <div className="text-3xl font-bold text-blue-700 mb-4">{recommendedFTE}</div>
          <div className="text-gray-600 mb-4">For a {industry} company with {employees} employees, you typically need {recommendedFTE} full-time HR staff.</div>
          <div className="text-lg font-semibold mb-2">Suggested Service Package:</div>
          <div className="text-xl font-bold text-indigo-700 mb-4">{recommendedPackage}</div>
        </motion.div>
      )}

      {/* Lead Form */}
      {showLeadForm && (
        <motion.div className="bg-white rounded-2xl shadow-lg p-8 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h3 className="text-xl font-bold text-center mb-6">Get Your Detailed Assessment Report</h3>
          <form onSubmit={handleLeadSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name *"
                value={leadData.name}
                onChange={e => setLeadData({...leadData, name: e.target.value})}
                className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
              <input
                type="email"
                placeholder="Email Address *"
                value={leadData.email}
                onChange={e => setLeadData({...leadData, email: e.target.value})}
                className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={leadData.phone}
                onChange={e => setLeadData({...leadData, phone: e.target.value})}
                className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="text"
                placeholder="Company Name"
                value={leadData.company}
                onChange={e => setLeadData({...leadData, company: e.target.value})}
                className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition"
            >
              Download Assessment Report
            </button>
          </form>
          {crmError && (
            <p className="text-red-600 text-sm mt-2">There was an issue saving your information, but your download will proceed.</p>
          )}
        </motion.div>
      )}

      {/* Download Button */}
      {!showLeadForm && showResult && (
        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button
            onClick={handleDownload}
            className="px-8 py-3 rounded-full bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 transition mr-4"
          >
            Download Report
          </button>
          <a
            href="https://calendly.com/prachi-hr-services"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition"
          >
            Book a Free Consultation
          </a>
        </motion.div>
      )}
    </div>
  );
} 