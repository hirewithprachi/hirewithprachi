import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { addContactToHubSpot } from '../lib/hubspot';

const questions = [
  'Employees feel valued and recognized for their work.',
  'Communication between management and staff is effective.',
  'Employees have opportunities for growth and development.',
  'Work-life balance is supported by the organization.',
  'Employees are motivated to go above and beyond in their roles.',
];

export default function EmployeeEngagementCalculator() {
  const [numEmployees, setNumEmployees] = useState('');
  const [answers, setAnswers] = useState(Array(5).fill(3));
  const [email, setEmail] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [avg, setAvg] = useState(0);
  const [crmError, setCrmError] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleChange = (idx, value) => {
    const updated = [...answers];
    updated[idx] = Number(value);
    setAnswers(updated);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const sum = answers.reduce((a, b) => a + b, 0);
    setAvg(sum / answers.length);
    setShowResult(true);
    // CRM integration
    if (email) {
      const ok = await addContactToHubSpot({ email });
      if (!ok) setCrmError(true);
    }
  };

  function handleDownload() {
    const text = `Employee Engagement Score\n\nNumber of Employees: ${numEmployees}\nEmail: ${email}\n\nSurvey Answers:\n${questions.map((q, i) => `${q} - ${answers[i]}/5`).join('\n')}\n\nAverage Engagement Score: ${avg.toFixed(2)} / 5`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employee-engagement-score.txt';
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-16 mb-12">
          <motion.h1 className="text-3xl md:text-4xl font-bold mb-6 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>Employee Engagement Score Calculator</motion.h1>
          <motion.p className="mb-8 text-gray-700 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Estimate your team's engagement with a quick survey. Enter your email to get a personalized result and download your calculation. (Demo only)</motion.p>
          <form onSubmit={handleSubmit} className="bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-lg p-8 flex flex-col gap-4 mb-8">
            <input type="email" placeholder="Your Email (for result & quote)" value={email} onChange={e => setEmail(e.target.value)} className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full" required />
            <label className="font-semibold">Number of Employees</label>
            <input type="number" min="1" placeholder="e.g. 50" value={numEmployees} onChange={e => setNumEmployees(e.target.value)} className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full" required />
            <div className="mt-4">
              {questions.map((q, i) => (
                <div key={i} className="mb-4">
                  <div className="mb-2 font-medium">{q}</div>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(val => (
                      <label key={val} className="flex flex-col items-center">
                        <input type="radio" name={`q${i}`} value={val} checked={answers[i] === val} onChange={() => handleChange(i, val)} className="accent-indigo-600" />
                        <span className="text-xs">{val}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button type="submit" className="px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition mt-4">Calculate Engagement Score</button>
          </form>
          {showResult && (
            <motion.div className="bg-green-50 rounded-xl p-6 text-center mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-lg font-semibold mb-2">Average Engagement Score:</div>
              <AnimatedNumber value={avg} />
              <div className="text-gray-600 mb-4">Score is out of 5. Higher is better. For a full engagement survey, contact us.</div>
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

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);
  React.useEffect(() => {
    let start = 0;
    const duration = 800;
    const step = (value - start) / (duration / 16);
    let raf;
    function animate() {
      start += step;
      if ((step > 0 && start >= value) || (step < 0 && start <= value)) {
        setDisplay(value);
      } else {
        setDisplay(Number(start.toFixed(2)));
        raf = requestAnimationFrame(animate);
      }
    }
    animate();
    return () => raf && cancelAnimationFrame(raf);
  }, [value]);
  return (
    <div className="text-3xl font-bold text-green-700 mb-4">{display.toFixed(2)} / 5</div>
  );
} 