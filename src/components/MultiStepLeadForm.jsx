// Add this at the top of the file
// To enable multi-step lead form submissions, set your Formspree form ID in the fetch URL below.
// Example: https://formspree.io/f/YOUR_FORM_ID
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Building, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { formSubmission } from '../lib/supabase';

const steps = [
  'Contact Info',
  'Company Size',
  'Service Interest',
  'Other Details',
  'Review & Submit',
];

export default function MultiStepLeadForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '',
    email: '',
    size: '',
    services: [],
    other: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const serviceOptions = [
    'Recruitment',
    'Payroll',
    'Compliance',
    'HR Analytics',
    'Training',
    'Other',
  ];

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm(f => ({
        ...f,
        services: checked
          ? [...f.services, value]
          : f.services.filter(s => s !== value),
      }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  }

  function next() {
    if (step === 2 && form.services.includes('Other')) setStep(3);
    else setStep(s => Math.min(s + 1, steps.length - 1));
  }
  function prev() {
    if (step === 3 && form.services.includes('Other')) setStep(2);
    else setStep(s => Math.max(s - 1, 0));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Submit form to Supabase (which also sends to HubSpot)
      const result = await formSubmission.submitForm(form, 'multi_step_lead');
      
      if (result.success) {
        setIsSubmitted(true);
        setForm({
          name: '',
          email: '',
          size: '',
          services: [],
          other: '',
        });
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setStep(0);
        }, 5000);
      } else {
        setError(result.error || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Multi-step form submission error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
      >
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-800 mb-2">Thank you!</h3>
        <p className="text-green-700">
          We'll be in touch soon with personalized HR solutions for your business.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 max-w-lg mx-auto">
      {/* Progress Bar */}
      <div className="flex mb-8">
        {steps.map((s, i) => (
          <div key={s} className={`flex-1 h-2 mx-1 rounded-full ${i <= step ? 'bg-indigo-500' : 'bg-gray-200'}`}></div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="step1" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="text-xl font-bold mb-4">Contact Info</h2>
            <input name="name" type="text" placeholder="Your Name" value={form.name} onChange={handleChange} required className="mb-4 px-4 py-3 rounded-lg border w-full" />
            <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} required className="mb-4 px-4 py-3 rounded-lg border w-full" />
            <div className="flex justify-between mt-6">
              <div></div>
              <button type="button" className="px-6 py-2 rounded-full bg-indigo-600 text-white font-semibold" onClick={next}>Next</button>
            </div>
          </motion.div>
        )}
        {step === 1 && (
          <motion.div key="step2" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="text-xl font-bold mb-4">Company Size</h2>
            <div className="flex flex-col gap-2 mb-4">
              {["1-10", "11-50", "51-200", "201-1000", "1000+"].map(size => (
                <label key={size} className="flex items-center gap-2">
                  <input type="radio" name="size" value={size} checked={form.size === size} onChange={handleChange} required />
                  {size}
                </label>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <button type="button" className="px-6 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold" onClick={prev}>Back</button>
              <button type="button" className="px-6 py-2 rounded-full bg-indigo-600 text-white font-semibold" onClick={next}>Next</button>
            </div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div key="step3" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="text-xl font-bold mb-4">Service Interest</h2>
            <div className="flex flex-col gap-2 mb-4">
              {serviceOptions.map(opt => (
                <label key={opt} className="flex items-center gap-2">
                  <input type="checkbox" name="services" value={opt} checked={form.services.includes(opt)} onChange={handleChange} />
                  {opt}
                </label>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <button type="button" className="px-6 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold" onClick={prev}>Back</button>
              <button type="button" className="px-6 py-2 rounded-full bg-indigo-600 text-white font-semibold" onClick={next} disabled={form.services.length === 0}>Next</button>
            </div>
          </motion.div>
        )}
        {step === 3 && form.services.includes('Other') && (
          <motion.div key="step4" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="text-xl font-bold mb-4">Other Details</h2>
            <input name="other" type="text" placeholder="Please specify..." value={form.other} onChange={handleChange} className="mb-4 px-4 py-3 rounded-lg border w-full" />
            <div className="flex justify-between mt-6">
              <button type="button" className="px-6 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold" onClick={prev}>Back</button>
              <button type="button" className="px-6 py-2 rounded-full bg-indigo-600 text-white font-semibold" onClick={next}>Next</button>
            </div>
          </motion.div>
        )}
        {((step === 3 && !form.services.includes('Other')) || step === 4) && (
          <motion.div key="step5" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="text-xl font-bold mb-4">Review & Submit</h2>
            <div className="mb-4">
              <div><span className="font-semibold">Name:</span> {form.name}</div>
              <div><span className="font-semibold">Email:</span> {form.email}</div>
              <div><span className="font-semibold">Company Size:</span> {form.size}</div>
              <div><span className="font-semibold">Services:</span> {form.services.join(', ')}</div>
              {form.services.includes('Other') && <div><span className="font-semibold">Other:</span> {form.other}</div>}
            </div>
            <div className="flex justify-between mt-6">
              <button type="button" className="px-6 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold" onClick={prev}>Back</button>
              <button type="submit" className="px-6 py-2 rounded-full bg-indigo-600 text-white font-semibold">Submit</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
} 