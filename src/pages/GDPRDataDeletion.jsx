// Add this at the top of the file
// To enable GDPR data deletion requests, set your Formspree form ID in the fetch URL below.
// Example: https://formspree.io/f/YOUR_FORM_ID
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function GDPRDataDeletion() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    // For demo, POST to Formspree
    fetch('https://formspree.io/f/mvgqrvje', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
  }

  if (submitted) {
    return <div className="bg-green-100 text-green-700 rounded-xl p-6 text-center font-semibold">Thank you! Your data deletion request has been received.</div>;
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-8 max-w-lg mx-auto mt-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-2xl font-bold mb-4 text-center">GDPR Data Deletion Request</h1>
      <p className="mb-4 text-gray-600 text-center">Request deletion of your personal data in accordance with GDPR.</p>
      <input
        name="name"
        type="text"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        required
        className="mb-4 px-4 py-3 rounded-lg border w-full"
      />
      <input
        name="email"
        type="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        required
        className="mb-4 px-4 py-3 rounded-lg border w-full"
      />
      <textarea
        name="message"
        placeholder="Describe your request (optional)"
        value={form.message}
        onChange={handleChange}
        rows={4}
        className="mb-6 px-4 py-3 rounded-lg border w-full"
      />
      <button type="submit" className="w-full px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition">Submit Request</button>
    </motion.form>
  );
} 