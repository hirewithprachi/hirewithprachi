import React, { useState } from 'react';
import { motion } from 'framer-motion';

const questions = [
  'Do you have up-to-date employee contracts for all staff?',
  'Are your payroll processes fully compliant with local laws?',
  'Do you conduct regular HR policy reviews?',
  'Is your employee handbook current and distributed?',
  'Do you have a documented process for handling grievances?',
  'Are you GDPR/compliance ready for employee data?',
];

export default function ComplianceRiskChecker() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (idx, value) => {
    const updated = [...answers];
    updated[idx] = value;
    setAnswers(updated);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setShowResult(true);
  };

  const yesCount = answers.filter(a => a === 'yes').length;
  const riskScore = Math.round(((questions.length - yesCount) / questions.length) * 100);
  let riskLevel = 'Low';
  let recommendation = 'Your HR compliance looks strong!';
  if (riskScore > 33 && riskScore <= 66) {
    riskLevel = 'Medium';
    recommendation = 'Consider a compliance review to address gaps.';
  } else if (riskScore > 66) {
    riskLevel = 'High';
    recommendation = 'Immediate action recommended. Book a compliance consultation.';
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 max-w-2xl mx-auto">
      <motion.h1 className="text-3xl md:text-4xl font-bold mb-6 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>Compliance Risk Checker</motion.h1>
      <motion.p className="mb-8 text-gray-700 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Assess your HR compliance risk in minutes.</motion.p>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6 mb-8">
        {questions.map((q, idx) => (
          <div key={q} className="flex flex-col md:flex-row items-center gap-4">
            <span className="flex-1 font-medium text-gray-700">{q}</span>
            <div className="flex gap-2">
              <button type="button" onClick={() => handleAnswer(idx, 'yes')} className={`px-4 py-2 rounded-full font-semibold ${answers[idx] === 'yes' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'} transition`}>Yes</button>
              <button type="button" onClick={() => handleAnswer(idx, 'no')} className={`px-4 py-2 rounded-full font-semibold ${answers[idx] === 'no' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'} transition`}>No</button>
            </div>
          </div>
        ))}
        <button type="submit" className="px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition mt-4">Check Risk</button>
      </form>
      {showResult && (
        <motion.div className="bg-yellow-50 rounded-xl p-6 text-center mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="text-lg font-semibold mb-2">Compliance Risk Score:</div>
          <div className={`text-3xl font-bold mb-4 ${riskLevel === 'High' ? 'text-red-700' : riskLevel === 'Medium' ? 'text-yellow-700' : 'text-green-700'}`}>{riskScore}% ({riskLevel} Risk)</div>
          <div className="text-gray-600 mb-4">{recommendation}</div>
          <a
            href="https://calendly.com/prachi-hr-services"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition"
          >
            Book a Compliance Consultation
          </a>
        </motion.div>
      )}
    </div>
  );
} 