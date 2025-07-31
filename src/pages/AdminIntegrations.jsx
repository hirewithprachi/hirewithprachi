// Add this at the top of the file
// Admin Setup Instructions:
// - Enter your Mailchimp/ConvertKit API keys and list IDs for newsletter.
// - Enter your Formspree form ID for contact/GDPR forms.
// - Enter your analytics and chatbot IDs as needed.
// These values are stored in localStorage and used by the app for integrations.
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const fields = [
  { key: 'typeformUrl', label: 'Typeform/Tally Form URL' },
  { key: 'mailchimpApiKey', label: 'Mailchimp API Key' },
  { key: 'convertkitApiKey', label: 'ConvertKit API Key' },
  { key: 'firebaseMessagingKey', label: 'Firebase Cloud Messaging Key' },
  { key: 'chatbaseBotId', label: 'Chatbase/Voiceflow Bot ID' },
  { key: 'mailchimpListId', label: 'Mailchimp List ID' },
  { key: 'hubspotApiKey', label: 'HubSpot API Key' },
  { key: 'sanityProjectId', label: 'Sanity Project ID' },
  { key: 'sanityDataset', label: 'Sanity Dataset' },
];

export default function AdminIntegrations() {
  const [values, setValues] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = {};
    fields.forEach(f => {
      stored[f.key] = localStorage.getItem(f.key) || '';
    });
    setValues(stored);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
  }

  function handleSave(e) {
    e.preventDefault();
    fields.forEach(f => {
      localStorage.setItem(f.key, values[f.key] || '');
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 max-w-2xl mx-auto">
      <Helmet>
        <title>Admin Integrations | Prachi Shrivastava Virtual HR</title>
      </Helmet>
      <motion.form
        onSubmit={handleSave}
        className="bg-white rounded-2xl shadow-lg p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Admin: Integrations & API Keys</h1>
        <p className="mb-6 text-gray-600 text-center">Paste your API keys and integration IDs here. These will be used for real API calls in production.</p>
        {fields.map(f => (
          <div key={f.key} className="mb-4">
            <label className="block font-semibold mb-1" htmlFor={f.key}>{f.label}</label>
            <input
              id={f.key}
              name={f.key}
              type="text"
              value={values[f.key] || ''}
              onChange={handleChange}
              className="px-4 py-3 rounded-lg border w-full"
              autoComplete="off"
            />
          </div>
        ))}
        <button type="submit" className="w-full px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition">Save Integrations</button>
        {saved && <div className="text-green-600 text-center mt-4 font-semibold">Saved!</div>}
      </motion.form>
    </div>
  );
} 