import React, { useState } from 'react';
import { motion } from 'framer-motion';

const packages = [
  { name: 'Basic', monthly: 9999 },
  { name: 'Pro', monthly: 29999 },
  { name: 'Enterprise', monthly: 59999 },
];

export default function HRCostSavingsCalculator() {
  const [salary, setSalary] = useState('');
  const [benefits, setBenefits] = useState('');
  const [overhead, setOverhead] = useState('');
  const [employees, setEmployees] = useState('');
  const [pkg, setPkg] = useState(packages[0].name);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setShowResult(true);
  };

  const totalCurrent = Number(salary) + Number(benefits) + Number(overhead);
  const selectedPackage = packages.find(p => p.name === pkg);
  const annualServiceCost = selectedPackage ? selectedPackage.monthly * 12 : 0;
  const estimatedSavings = totalCurrent * Number(employees) - annualServiceCost;

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 max-w-2xl mx-auto">
      <motion.h1 className="text-3xl md:text-4xl font-bold mb-6 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>HR Cost Savings Calculator</motion.h1>
      <motion.p className="mb-8 text-gray-700 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Estimate your annual savings by switching to Prachi HR Services.</motion.p>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input type="number" min="0" step="any" placeholder="Current HR Salary (annual ₹)" value={salary} onChange={e => setSalary(e.target.value)} className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full" required />
          <input type="number" min="0" step="any" placeholder="Benefits (annual ₹)" value={benefits} onChange={e => setBenefits(e.target.value)} className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full" required />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <input type="number" min="0" step="any" placeholder="Overhead (annual ₹)" value={overhead} onChange={e => setOverhead(e.target.value)} className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full" required />
          <input type="number" min="1" step="1" placeholder="Number of Employees" value={employees} onChange={e => setEmployees(e.target.value)} className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full" required />
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <label className="font-medium text-gray-700">Service Package:</label>
          <select value={pkg} onChange={e => setPkg(e.target.value)} className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            {packages.map(p => <option key={p.name} value={p.name}>{p.name} (₹{p.monthly.toLocaleString('en-IN')}/mo)</option>)}
          </select>
        </div>
        <button type="submit" className="px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition mt-4">Calculate Savings</button>
      </form>
      {showResult && (
        <motion.div className="bg-green-50 rounded-xl p-6 text-center mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="text-lg font-semibold mb-2">Estimated Annual Savings:</div>
          <div className="text-3xl font-bold text-green-700 mb-4">₹{estimatedSavings > 0 ? estimatedSavings.toLocaleString('en-IN') : 0}</div>
          <div className="text-gray-600 mb-4">By switching to the {pkg} package, you could save significantly on HR costs.</div>
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