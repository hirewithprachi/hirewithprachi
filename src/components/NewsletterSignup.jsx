// Add this at the top of the file
// To enable newsletter signup, set your Mailchimp form action URL in the handleSubmit function below.
// Example: https://YOUR_DC.list-manage.com/subscribe/post?u=YOUR_U&id=YOUR_ID
// You can find this in your Mailchimp audience > Signup forms > Embedded forms.
import React, { useState } from 'react';
import { addContactToHubSpot } from '../lib/hubspot';

export default function NewsletterSignup() {
  const [email, setEmail] = useState(localStorage.getItem('newsletterEmail') || '');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const mailchimpApiKey = localStorage.getItem('mailchimpApiKey');
  const convertkitApiKey = localStorage.getItem('convertkitApiKey');

  // Replace handleSubmit with a static-compatible Mailchimp form POST
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    // POST to Formspree
    fetch('https://formspree.io/f/xldlnoqw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    // Also send to HubSpot CRM
    await addContactToHubSpot({ email, firstname: '', lastname: '' });
    setEmail('');
    setSubmitted(true);
  };

  if (submitted) {
    return <div className="bg-green-100 text-green-700 rounded-xl p-4 text-center font-semibold">Thank you for subscribing!</div>;
  }

  return (
    <form action="https://formspree.io/f/xldlnoqw" method="POST" className="flex gap-2 w-full md:w-auto">
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        type="submit"
        className="px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition"
        disabled={!mailchimpApiKey && !convertkitApiKey}
      >
        Subscribe
      </button>
      {(mailchimpApiKey || convertkitApiKey) && <div className="text-red-600 text-xs mt-2">Newsletter API key not set. Please update in Admin Integrations.</div>}
      {error && <div className="text-red-600 text-xs ml-2">{error}</div>}
    </form>
  );
} 