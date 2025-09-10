import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Target, Zap, Users, TrendingUp, Shield, Brain, Star, ArrowRight } from 'lucide-react';

const questions = [
  {
    q: 'What is your biggest HR challenge?',
    options: ['Recruitment', 'Payroll', 'Compliance', 'Employee Engagement', 'Analytics'],
    icon: <Target className="w-6 h-6" />
  },
  {
    q: 'How many employees do you have?',
    options: ['1-10', '11-50', '51-200', '201+'],
    icon: <Users className="w-6 h-6" />
  },
  {
    q: 'What is your top priority?',
    options: ['Cost Savings', 'Growth', 'Compliance', 'Retention'],
    icon: <TrendingUp className="w-6 h-6" />
  },
];

const recommendations = {
  Recruitment: {
    name: 'Talent Acquisition Pro',
    description: 'AI-powered recruitment solutions',
    icon: <Users className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-500'
  },
  Payroll: {
    name: 'Payroll & Compliance Suite',
    description: 'Error-free payroll with full compliance',
    icon: <Shield className="w-8 h-8" />,
    color: 'from-green-500 to-emerald-500'
  },
  Compliance: {
    name: 'Compliance Guardian',
    description: 'Stay ahead of regulatory changes',
    icon: <Shield className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-500'
  },
  'Employee Engagement': {
    name: 'Engagement Booster',
    description: 'Build a thriving workplace culture',
    icon: <Star className="w-8 h-8" />,
    color: 'from-orange-500 to-red-500'
  },
  Analytics: {
    name: 'People Analytics Suite',
    description: 'Data-driven HR insights',
    icon: <Brain className="w-8 h-8" />,
    color: 'from-indigo-500 to-purple-500'
  },
};

export default function ServiceMatcher() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  function handleSelect(option) {
    setSelectedOption(option);
    setTimeout(() => {
      setAnswers(a => [...a.slice(0, step), option]);
      setStep(s => Math.min(s + 1, questions.length));
      setSelectedOption(null);
    }, 300);
  }

  function handleBack() {
    setStep(s => Math.max(s - 1, 0));
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  const mainNeed = answers[0];
  const rec = recommendations[mainNeed] || {
    name: 'Custom HR Solution',
    description: 'Tailored to your specific needs',
    icon: <Sparkles className="w-8 h-8" />,
    color: 'from-gray-500 to-slate-500'
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50"></div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-teal-200 to-blue-200 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full blur-xl"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-6 h-6" />
            <span className="text-sm font-semibold uppercase tracking-wider">AI-Powered</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            Find Your Perfect HR Solution
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Answer a few questions and get personalized HR service recommendations tailored to your business needs
          </p>
        </motion.div>

        {/* Two Box Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Box - Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              {/* Main Image */}
              <img
                src="/images/services/generic-service.svg"
                alt="HR Services"
                className="w-full h-96 md:h-[500px] object-cover rounded-3xl shadow-2xl"
              />
              
              {/* Overlay Badge */}
              <div className="absolute top-6 right-6 bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg">
                <span className="font-bold text-lg">25+ Years Experience</span>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">500+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Box - Quiz */}
          <motion.div
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {!submitted && step < questions.length && (
                <motion.div 
                  key={step} 
                  initial={{ x: 50, opacity: 0 }} 
                  animate={{ x: 0, opacity: 1 }} 
                  exit={{ x: -50, opacity: 0 }} 
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div 
                      className="bg-gradient-to-r from-teal-500 to-blue-600 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  {/* Question */}
                  <div className="text-center space-y-6">
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-teal-100 to-blue-100 rounded-full">
                        {questions[step].icon}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">{questions[step].q}</h3>
                    </div>
                    
                    {/* Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                      {questions[step].options.map((opt, index) => (
                        <motion.button
                          key={opt}
                          className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left group ${
                            selectedOption === opt 
                              ? 'border-teal-500 bg-gradient-to-r from-teal-50 to-blue-50 shadow-lg scale-105' 
                              : 'border-gray-200 hover:border-teal-300 hover:shadow-md hover:scale-102'
                          }`}
                          onClick={() => handleSelect(opt)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                              {opt}
                            </span>
                            <Zap className={`w-5 h-5 transition-all duration-300 ${
                              selectedOption === opt ? 'text-teal-500 scale-110' : 'text-gray-400 group-hover:text-teal-500'
                            }`} />
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-6">
                    {step > 0 && (
                      <motion.button 
                        className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
                        onClick={handleBack}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        ← Back
                      </motion.button>
                    )}
                    <div className="text-sm text-gray-500 ml-auto">
                      Step {step + 1} of {questions.length}
                    </div>
                  </div>
                </motion.div>
              )}

              {!submitted && step === questions.length && (
                <motion.div 
                  key="summary" 
                  initial={{ x: 50, opacity: 0 }} 
                  animate={{ x: 0, opacity: 1 }} 
                  exit={{ x: -50, opacity: 0 }} 
                  transition={{ duration: 0.5 }}
                  className="text-center space-y-8"
                >
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">Your Perfect Match</h3>
                    
                    {/* Recommendation Card */}
                    <motion.div 
                      className={`bg-gradient-to-r ${rec.color} rounded-2xl p-8 text-white shadow-xl`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="p-3 bg-white/20 rounded-full">
                          {rec.icon}
                        </div>
                        <div>
                          <h4 className="text-2xl font-bold">{rec.name}</h4>
                          <p className="text-white/90">{rec.description}</p>
                        </div>
                      </div>
                    </motion.div>

                    <p className="text-gray-600 max-w-md mx-auto">
                      Based on your answers, we recommend the <span className="font-semibold text-teal-600">{rec.name}</span>. 
                      Get started with a free consultation or request a custom quote.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <motion.button 
                      className="flex-1 px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={handleSubmit}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Request Custom Quote
                    </motion.button>
                    <motion.a
                      href="/contact"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-8 py-4 rounded-xl bg-white text-teal-600 font-semibold shadow-lg border-2 border-teal-600 hover:bg-teal-600 hover:text-white transition-all duration-300 text-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book Free Consultation
                    </motion.a>
                  </div>
                </motion.div>
              )}

              {submitted && (
                <motion.div 
                  key="thankyou" 
                  initial={{ x: 50, opacity: 0 }} 
                  animate={{ x: 0, opacity: 1 }} 
                  exit={{ x: -50, opacity: 0 }} 
                  transition={{ duration: 0.5 }}
                  className="text-center space-y-6"
                >
                  <div className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
                    <p className="text-green-700">
                      We'll follow up with your custom quote within 24 hours. 
                      Meanwhile, check out our free HR resources below.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}