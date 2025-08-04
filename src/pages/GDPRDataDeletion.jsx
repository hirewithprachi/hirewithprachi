// Add this at the top of the file
// To enable GDPR data deletion requests, set your Formspree form ID in the fetch URL below.
// Example: https://formspree.io/f/YOUR_FORM_ID
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import { formSubmission } from '../lib/supabase';

export default function GDPRDataDeletion() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Submit to Supabase (which also sends to HubSpot)
    formSubmission.submitGDPRForm(formData)
      .then(result => {
        if (result.success) {
          setIsSubmitted(true);
          setFormData({
            name: '',
            email: '',
            reason: '',
            additionalInfo: ''
          });
          
          // Reset form after 5 seconds
          setTimeout(() => {
            setIsSubmitted(false);
          }, 5000);
        } else {
          setError(result.error || 'Failed to submit request. Please try again.');
        }
      })
      .catch(error => {
        console.error('GDPR form submission error:', error);
        setError('An error occurred. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  if (isSubmitted) {
    return (
      <div className="bg-green-100 text-green-700 rounded-xl p-6 text-center font-semibold">
        <CheckCircle className="inline-block mr-2" />
        Thank you! Your data deletion request has been received.
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-8 max-w-lg mx-auto mt-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Helmet>
        <title>GDPR Data Deletion Request - Your Data, Your Control</title>
        <meta name="description" content="Request deletion of your personal data in accordance with GDPR." />
      </Helmet>
      <h1 className="text-2xl font-bold mb-4 text-center">GDPR Data Deletion Request</h1>
      <p className="mb-4 text-gray-600 text-center">Request deletion of your personal data in accordance with GDPR.</p>
      <input
        name="name"
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleInputChange}
        required
        className="mb-4 px-4 py-3 rounded-lg border w-full"
      />
      <input
        name="email"
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleInputChange}
        required
        className="mb-4 px-4 py-3 rounded-lg border w-full"
      />
      <textarea
        name="reason"
        placeholder="Reason for deletion (required)"
        value={formData.reason}
        onChange={handleInputChange}
        rows={4}
        className="mb-6 px-4 py-3 rounded-lg border w-full"
        required
      />
      <textarea
        name="additionalInfo"
        placeholder="Additional information (optional)"
        value={formData.additionalInfo}
        onChange={handleInputChange}
        rows={4}
        className="mb-6 px-4 py-3 rounded-lg border w-full"
      />
      <button
        type="submit"
        className="w-full px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="ml-2">Submitting...</span>
          </div>
        ) : (
          'Submit Request'
        )}
      </button>
      {error && (
        <div className="mt-4 text-red-500 text-center">
          <AlertTriangle className="inline-block mr-2" />
          {error}
        </div>
      )}
    </motion.form>
  );
} 