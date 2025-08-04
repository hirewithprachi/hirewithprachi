import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from './ui/use-toast';
import { formSubmission } from '../lib/supabase';

export default function ConsultationModal({ open, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    topic: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const topics = [
    'Compliance',
    'Recruitment',
    'Employee Engagement',
    'Performance Management',
    'HR Technology',
    'Other'
  ];

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // Submit form to Supabase (which also sends to HubSpot)
      const result = await formSubmission.submitForm({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.businessType,
        designation: form.topic,
        message: form.message
      }, 'consultation_request');
      
      if (result.success) {
        setSubmitted(true);
        toast({ title: 'Thank you!', description: 'Your request has been received. Our team will contact you soon.' });
        setTimeout(() => {
          setSubmitted(false);
          onClose();
          setForm({
            name: '',
            email: '',
            phone: '',
            businessType: '',
            topic: '',
            message: ''
          });
        }, 2000);
      } else {
        setError(result.error || 'Failed to submit request. Please try again.');
        toast({ title: 'Error', description: 'Failed to submit request. Please try again.', variant: 'destructive' });
      }
    } catch (error) {
      console.error('Consultation form submission error:', error);
      setError('An error occurred. Please try again.');
      toast({ title: 'Error', description: 'An error occurred. Please try again.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.form
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full flex flex-col gap-4 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onSubmit={handleSubmit}
          >
            <button
              type="button"
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={onClose}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2 text-center">Book Free HR Consultation</h2>
            <p className="mb-4 text-gray-700 text-center">Fill in your details and our expert will contact you to understand your requirements.</p>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              name="businessType"
              placeholder="Business Type (e.g. IT, Manufacturing)"
              value={form.businessType}
              onChange={handleChange}
              className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <select
              name="topic"
              value={form.topic}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select Consultation Topic</option>
              {topics.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <textarea
              name="message"
              placeholder="Tell us about your HR needs..."
              rows={3}
              value={form.message}
              onChange={handleChange}
              className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="submit"
              className="mt-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Book Consultation'}
            </button>
            {submitted && <div className="text-green-600 text-center font-semibold mt-2">Thank you! We will contact you soon.</div>}
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 