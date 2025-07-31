import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { addContactToHubSpot } from '../lib/hubspot';

export default function ROICalculator() {
  const [investment, setInvestment] = useState('');
  const [benefit, setBenefit] = useState('');
  const [email, setEmail] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [crmError, setCrmError] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setShowResult(true);
    // CRM integration
    if (email) {
      const ok = await addContactToHubSpot({ email });
      if (!ok) setCrmError(true);
    }
  };

  const roi = investment && benefit ? Math.round(((Number(benefit) - Number(investment)) / Number(investment)) * 100) : 0;

  function handleDownload() {
    const text = `HR ROI Calculation\n\nInvestment: ₹${Number(investment).toLocaleString('en-IN')}\nBenefit: ₹${Number(benefit).toLocaleString('en-IN')}\nEstimated ROI: ${roi}%`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hr-roi-result.txt';
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-16 mb-12">
          <motion.h1 className="text-3xl md:text-4xl font-bold mb-6 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>HR ROI Calculator</motion.h1>
          <motion.p className="mb-8 text-gray-700 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Estimate your return on investment for HR services. Enter your details to get a personalized result and download/email your calculation.</motion.p>
          <form onSubmit={handleSubmit} className="bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-lg p-8 flex flex-col gap-4 mb-8">
            <input type="email" placeholder="Your Email (for result & quote)" value={email} onChange={e => setEmail(e.target.value)} className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full" required />
            <input type="number" min="0" step="any" placeholder="Annual Investment in HR Services (₹)" value={investment} onChange={e => setInvestment(e.target.value)} className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full" required />
            <input type="number" min="0" step="any" placeholder="Estimated Annual Benefit (₹)" value={benefit} onChange={e => setBenefit(e.target.value)} className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full" required />
            <button type="submit" className="px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition mt-4">Calculate ROI</button>
          </form>
          {showResult && (
            <motion.div className="bg-purple-50 rounded-xl p-6 text-center mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-lg font-semibold mb-2">Estimated ROI:</div>
              <div className={`text-3xl font-bold mb-4 ${roi > 0 ? 'text-green-700' : 'text-red-700'}`}>{roi}%</div>
              <div className="text-gray-600 mb-4">A positive ROI means your HR investment is paying off!</div>
              {crmError && <div className="text-red-600 text-sm mb-2">(CRM integration failed, but your result is shown below.)</div>}
              <button onClick={handleDownload} className="inline-block px-8 py-3 rounded-full bg-indigo-100 text-indigo-700 font-semibold shadow-lg hover:bg-indigo-200 transition mb-2">Download Result</button>
              {downloaded && <div className="text-green-600 text-sm mt-2">Result downloaded!</div>}
              <a
                href="https://calendly.com/prachi-hr-services"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition mt-2"
              >
                Book a Free Consultation
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 