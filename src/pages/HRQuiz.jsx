import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addContactToHubSpot } from '../lib/hubspot';

const questions = [
  {
    q: 'How confident are you in your current HR compliance?',
    options: ['Very confident', 'Somewhat confident', 'Not confident'],
  },
  {
    q: 'Do you have documented HR policies and procedures?',
    options: ['Yes, fully documented', 'Partially documented', 'No documentation'],
  },
  {
    q: 'How often do you conduct employee engagement surveys?',
    options: ['Annually', 'Occasionally', 'Never'],
  },
  {
    q: 'Do you use any HR technology or software?',
    options: ['Yes, advanced HRMS', 'Basic tools (Excel, etc.)', 'No digital tools'],
  },
  {
    q: 'What is your biggest HR challenge?',
    options: ['Recruitment', 'Compliance', 'Retention', 'Payroll', 'Other'],
  },
];

export default function HRQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [email, setEmail] = useState('');
  const [completed, setCompleted] = useState(false);
  const [crmError, setCrmError] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleSelect = (option) => {
    setAnswers(a => [...a.slice(0, step), option]);
    setStep(s => Math.min(s + 1, questions.length));
  };
  const handleBack = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = async e => {
    e.preventDefault();
    setCompleted(true);
    localStorage.setItem('hrQuizResult', JSON.stringify({ email, answers }));
    if (email) {
      const ok = await addContactToHubSpot({ email });
      if (!ok) setCrmError(true);
    }
  };

  function handleDownload() {
    const text = `HR Assessment Quiz Result\n\nEmail: ${email}\n\n${questions.map((q, i) => `${q.q}\nAnswer: ${answers[i] || ''}\n`).join('\n')}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hr-quiz-result.txt';
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-16 mb-12">
          <motion.h1 className="text-3xl md:text-4xl font-bold mb-6 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>HR Assessment Quiz</motion.h1>
          <motion.p className="mb-8 text-gray-700 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Take this quick HR assessment to get personalized recommendations and a free consultation offer.</motion.p>
          {!completed ? (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4 mb-8">
              <input type="email" placeholder="Your Email (for result & quote)" value={email} onChange={e => setEmail(e.target.value)} className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full" required />
              <AnimatePresence mode="wait">
                {step < questions.length && (
                  <motion.div key={step} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4 }}>
                    <div className="mb-6 text-lg font-semibold">{questions[step].q}</div>
                    <div className="flex flex-col gap-3 mb-6">
                      {questions[step].options.map(opt => (
                        <button
                          key={opt}
                          type="button"
                          className="px-6 py-3 rounded-full bg-indigo-100 text-indigo-700 font-medium hover:bg-indigo-200 transition"
                          onClick={() => handleSelect(opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between mt-6">
                      {step > 0 && <button type="button" className="px-6 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold" onClick={handleBack}>Back</button>}
                    </div>
                  </motion.div>
                )}
                {step === questions.length && (
                  <motion.div key="summary" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4 }}>
                    <div className="mb-4 text-lg font-semibold">Quiz Complete!</div>
                    <div className="mb-6 text-gray-600">Review your answers and submit to get your personalized recommendations.</div>
                    <ul className="mb-6 text-left list-disc pl-6">
                      {questions.map((q, i) => (
                        <li key={q.q}><span className="font-medium">{q.q}</span><br />Answer: <span className="text-indigo-700">{answers[i]}</span></li>
                      ))}
                    </ul>
                    <button type="submit" className="w-full px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition mb-2">Submit & Get Results</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          ) : (
            <div className="text-center mt-8">
              <h2 className="text-2xl font-bold mb-4 text-green-600">Thank you for completing the quiz!</h2>
              <p className="mb-6">Book a free consultation to discuss your results and next steps.</p>
              {crmError && <div className="text-red-600 text-sm mb-2">(CRM integration failed, but your result is shown below.)</div>}
              <button onClick={handleDownload} className="inline-block px-8 py-3 rounded-full bg-indigo-100 text-indigo-700 font-semibold shadow-lg hover:bg-indigo-200 transition mb-2">Download Result</button>
              {downloaded && <div className="text-green-600 text-sm mt-2">Result downloaded!</div>}
              <a
                href="https://calendly.com/prachi-hr-services"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition mt-2"
              >
                Book a Consultation
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 