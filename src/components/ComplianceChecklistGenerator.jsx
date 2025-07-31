import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { addContactToHubSpot } from '../lib/hubspot';

const checklistItems = [
  'Employee Handbook is up to date',
  'Payroll compliance (PF, ESI, TDS, etc.)',
  'POSH policy and training in place',
  'Statutory registers maintained',
  'Offer letters and contracts compliant',
  'Leave and attendance policy documented',
  'Grievance redressal mechanism',
  'Exit process and F&F compliance',
  'HR data privacy and security',
  'Mandatory labor law posters displayed',
];

export default function ComplianceChecklistGenerator() {
  const [email, setEmail] = useState(localStorage.getItem('complianceEmail') || '');
  const [checked, setChecked] = useState(Array(checklistItems.length).fill(false));
  const [submitted, setSubmitted] = useState(false);
  const [crmError, setCrmError] = useState(false);

  function handleCheck(i) {
    setChecked(arr => arr.map((v, idx) => (idx === i ? !v : v)));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem('complianceEmail', email);
    setSubmitted(true);
    setTimeout(() => window.print(), 500); // For demo, print as PDF
    // Send to HubSpot CRM
    const ok = await addContactToHubSpot({ email });
    if (!ok) setCrmError(true);
  }

  if (submitted) {
    return <div className="bg-green-100 text-green-700 rounded-xl p-6 text-center font-semibold">Thank you! Your checklist is ready for download/print.{crmError && <div className="text-red-600 text-sm mt-2">(CRM integration failed, but your request was received.)</div>}</div>;
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-8 max-w-lg mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">HR Compliance Checklist Generator</h2>
      <p className="mb-4 text-gray-600 text-center">Check off your compliance items and download your custom checklist as a PDF.</p>
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="mb-6 px-4 py-3 rounded-lg border w-full"
      />
      <div className="mb-6 flex flex-col gap-3">
        {checklistItems.map((item, i) => (
          <label key={item} className="flex items-center gap-2">
            <input type="checkbox" checked={checked[i]} onChange={() => handleCheck(i)} />
            <span>{item}</span>
          </label>
        ))}
      </div>
      <button type="submit" className="w-full px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition">Download Checklist as PDF</button>
    </motion.form>
  );
} 