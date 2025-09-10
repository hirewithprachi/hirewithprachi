import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { formSubmission } from '../lib/supabase';
import { CheckCircle, Users, TrendingUp, Shield, Award, Clock } from 'lucide-react';

const questions = [
  {
    q: 'How confident are you in your current HR compliance?',
    options: ['Very confident', 'Somewhat confident', 'Not confident'],
    category: 'Compliance'
  },
  {
    q: 'Do you have documented HR policies and procedures?',
    options: ['Yes, fully documented', 'Partially documented', 'No documentation'],
    category: 'Documentation'
  },
  {
    q: 'How often do you conduct employee engagement surveys?',
    options: ['Annually', 'Occasionally', 'Never'],
    category: 'Engagement'
  },
  {
    q: 'Do you use any HR technology or software?',
    options: ['Yes, advanced HRMS', 'Basic tools (Excel, etc.)', 'No digital tools'],
    category: 'Technology'
  },
  {
    q: 'What is your biggest HR challenge?',
    options: ['Recruitment', 'Compliance', 'Retention', 'Payroll', 'Other'],
    category: 'Challenges'
  },
  {
    q: 'How many employees does your company have?',
    options: ['1-10 employees', '11-50 employees', '51-200 employees', '200+ employees'],
    category: 'Company Size'
  },
  {
    q: 'Do you have a dedicated HR person or team?',
    options: ['Yes, full-time HR team', 'Part-time HR person', 'No dedicated HR'],
    category: 'HR Resources'
  },
  {
    q: 'How often do you review and update HR policies?',
    options: ['Annually', 'Every 2-3 years', 'Rarely or never'],
    category: 'Policy Management'
  }
];

const benefits = [
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Personalized HR Assessment",
    description: "Get customized recommendations based on your specific business needs and current HR maturity level."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Expert HR Guidance",
    description: "Receive insights from a certified HR consultant with 15+ years of experience helping businesses grow."
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Cost Savings Analysis",
    description: "Discover how virtual HR services can save you 60-70% compared to hiring full-time HR staff."
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Compliance Risk Assessment",
    description: "Identify potential compliance gaps and get actionable steps to ensure legal adherence."
  }
];

const testimonials = [
  {
    text: "The HR quiz helped us identify critical gaps in our policies. Prachi's recommendations saved us from potential compliance issues.",
    author: "Rajesh Kumar",
    company: "Tech Startup, Bangalore"
  },
  {
    text: "After taking the quiz, we realized we needed better HR processes. The consultation was incredibly valuable for our growth.",
    author: "Meera Patel",
    company: "Manufacturing SME, Pune"
  }
];

const faqData = [
  {
    question: "How long does the HR assessment quiz take?",
    answer: "The quiz takes approximately 3-5 minutes to complete. It consists of 8 targeted questions designed to assess your current HR maturity and identify areas for improvement."
  },
  {
    question: "What will I receive after completing the quiz?",
    answer: "You'll receive a personalized HR assessment report with recommendations, compliance gap analysis, and an invitation for a free 30-minute consultation to discuss your specific needs."
  },
  {
    question: "Is the quiz results consultation really free?",
    answer: "Yes, absolutely! The 30-minute consultation to discuss your quiz results and HR needs is completely free with no obligations. It's my way of helping businesses understand their HR requirements."
  },
  {
    question: "How accurate are the quiz recommendations?",
    answer: "The quiz is based on 15+ years of HR consulting experience and industry best practices. While it provides valuable insights, a detailed consultation will give you more personalized and comprehensive recommendations."
  },
  {
    question: "Can I retake the quiz if my business situation changes?",
    answer: "Absolutely! I recommend retaking the quiz annually or whenever you experience significant business changes like rapid growth, new locations, or major policy updates."
  },
  {
    question: "What types of businesses benefit most from this assessment?",
    answer: "The quiz is designed for startups, SMEs, and growing businesses with 1-200 employees who want to optimize their HR processes, ensure compliance, and improve employee engagement."
  }
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
    
    // Submit form to Supabase (which also sends to HubSpot)
    if (email) {
      try {
        const result = await formSubmission.submitCalculatorForm({
          email: email,
          calculation_data: {
            answers: answers,
            total_questions: questions.length,
            questions: questions.map(q => q.q)
          },
          lead_source: 'HR Quiz',
          page_source: '/hr-quiz'
        }, 'hr_quiz');
        
        if (!result.success) {
          setCrmError(true);
        }
      } catch (error) {
        console.error('Form submission error:', error);
        setCrmError(true);
      }
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
      <Helmet>
        <title>Free HR Assessment Quiz - Evaluate Your HR Maturity | Prachi Shrivastava</title>
        <meta name="description" content="Take our free HR assessment quiz to evaluate your HR processes, compliance status, and get personalized recommendations. Trusted by 200+ companies across India." />
        <meta name="keywords" content="HR assessment quiz, HR maturity assessment, HR compliance check, virtual HR consultant, HR evaluation tool, business HR audit, employee engagement assessment, HR policy review" />
        <link rel="canonical" href="https://www.virtualhrconsultant.com/hr-quiz" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Free HR Assessment Quiz - Evaluate Your HR Maturity" />
        <meta property="og:description" content="Take our comprehensive HR assessment quiz to identify gaps in your HR processes and get expert recommendations for improvement." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.virtualhrconsultant.com/hr-quiz" />
        <meta property="og:image" content="https://www.virtualhrconsultant.com/images/hr-quiz-assessment.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free HR Assessment Quiz - Evaluate Your HR Maturity" />
        <meta name="twitter:description" content="Take our comprehensive HR assessment quiz to identify gaps in your HR processes and get expert recommendations." />
        <meta name="twitter:image" content="https://www.virtualhrconsultant.com/images/hr-quiz-assessment.jpg" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "HR Assessment Quiz",
            "description": "Comprehensive HR maturity assessment tool for businesses to evaluate their HR processes and compliance status",
            "url": "https://www.virtualhrconsultant.com/hr-quiz",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR",
              "description": "Free HR assessment with personalized recommendations"
            },
            "provider": {
              "@type": "Person",
              "name": "Prachi Shrivastava",
              "jobTitle": "HR Consultant",
              "url": "https://www.virtualhrconsultant.com"
            }
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Helmet>
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
          >
            Free HR Assessment Quiz
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
          >
            Evaluate your HR maturity, identify compliance gaps, and get personalized recommendations from India's leading virtual HR consultant. Trusted by 200+ companies.
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center gap-4 text-sm text-gray-500"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
          >
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 3-5 minutes</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4" /> Free consultation</span>
            <span className="flex items-center gap-1"><Award className="h-4 w-4" /> Expert recommendations</span>
          </motion.div>
        </div>
        
        {/* Benefits Section */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-indigo-600 mb-4">{benefit.icon}</div>
              <h3 className="font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </motion.div>
        
        {/* Quiz Section */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-16 mb-16">
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
                href="/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition mt-2"
              >
                Book a Consultation
              </a>
            </div>
          )}
        </div>
        
        {/* Testimonials Section */}
        <motion.div 
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-gray-500">{testimonial.company}</div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* FAQ Section */}
        <motion.div 
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div 
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-xl p-8 md:p-12 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your HR?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join 200+ companies that have improved their HR processes with expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-indigo-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              Schedule Free Consultation
            </a>
            <a
              href="/services"
              className="inline-block px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-indigo-600 transition-colors"
            >
              Explore HR Services
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}