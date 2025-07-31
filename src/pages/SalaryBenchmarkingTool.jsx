import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addContactToHubSpot } from '../lib/hubspot';

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
    setResult(getSalary(job, years));
    setShowResult(true);
    // CRM integration
    if (email) {
      const ok = await addContactToHubSpot({ email });
      if (!ok) setCrmError(true);
    }
  };

  function handleDownload() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-16 mb-12">
          <motion.h1 className="text-3xl md:text-4xl font-bold mb-6 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>Salary Benchmarking Tool</motion.h1>
          <motion.p className="mb-8 text-gray-700 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Compare HR salaries by role, location, and experience. Enter your email to get a personalized result and download your calculation. (Demo data)</motion.p>
          <form onSubmit={handleSubmit} className="bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-lg p-8 flex flex-col gap-4 mb-8">
            <input type="email" placeholder="Your Email (for result & quote)" value={email} onChange={e => setEmail(e.target.value)} className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full" required />
            <label className="font-semibold">Job Title</label>
            <select value={job} onChange={e => setJob(e.target.value)} className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full">
              {Object.keys(salaryData).map(j => <option key={j}>{j}</option>)}
            </select>
            <label className="font-semibold">Location</label>
            <input type="text" placeholder="e.g. New York, London" value={location} onChange={e => setLocation(e.target.value)} className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full" />
            <label className="font-semibold">Years of Experience</label>
            <input type="number" min="0" max="40" placeholder="e.g. 5" value={years} onChange={e => setYears(e.target.value)} className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full" />
            <button type="submit" className="px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition mt-4">Show Salary Range</button>
          </form>
          <AnimatePresence>
            {showResult && (
              <motion.div className="bg-blue-50 rounded-xl p-6 text-center mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="text-lg font-semibold mb-2">Estimated Salary Range:</div>
                <div className="flex justify-center gap-8 mb-4">
                  <AnimatedNumber label="Min" value={result.min} />
                  <AnimatedNumber label="Avg" value={result.avg} />
                  <AnimatedNumber label="Max" value={result.max} />
                </div>
                <div className="text-gray-600 mb-4">Contact us for a custom, location-specific report.</div>
                {crmError && <div className="text-red-600 text-sm mb-2">(CRM integration failed, but your result is shown below.)</div>}
                <button onClick={handleDownload} className="inline-block px-8 py-3 rounded-full bg-indigo-100 text-indigo-700 font-semibold shadow-lg hover:bg-indigo-200 transition mb-2">Download Result</button>
                {downloaded && <div className="text-green-600 text-sm mt-2">Result downloaded!</div>}
                <a
                  href="mailto:info@hirewithprachi.com?subject=Custom Salary Benchmarking Report"
                  className="inline-block px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition mt-2"
                >
                  Request Custom Report
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function AnimatedNumber({ label, value }) {
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
      <div className="text-2xl font-bold text-indigo-700">${display.toLocaleString()}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
} 