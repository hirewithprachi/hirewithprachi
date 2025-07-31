import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { addContactToHubSpot } from '../lib/hubspot';

const serviceOptions = [
  { name: 'Recruitment', price: 99 },
  { name: 'Payroll', price: 79 },
  { name: 'Compliance', price: 59 },
  { name: 'HR Analytics', price: 129 },
  { name: 'Training', price: 89 },
  { name: 'POSH', price: 49 },
];

export default function ServiceBuilder() {
  const [selected, setSelected] = useState([]);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const total = selected.reduce((sum, s) => sum + s.price, 0);

  function toggleService(option) {
    setSelected(sel =>
      sel.find(s => s.name === option.name)
        ? sel.filter(s => s.name !== option.name)
        : [...sel, option]
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    // For demo, POST to Formspree
    fetch('https://formspree.io/f/mdkdzpqg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, services: selected.map(s => s.name), total }),
    });
    // Also send to HubSpot CRM
    const [firstname, ...rest] = email.split('@')[0].split('.');
    const lastname = rest.join(' ');
    await addContactToHubSpot({ email, firstname, lastname });
  };

  if (submitted) {
    return <div className="bg-green-100 text-green-700 rounded-xl p-6 text-center font-semibold">Thank you! We'll send your custom quote soon.</div>;
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-8 max-w-lg mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Build Your HR Service Package</h2>
      <p className="mb-4 text-gray-600 text-center">Select the services you need and get an instant price estimate.</p>
      <div className="mb-6 flex flex-col gap-3">
        {serviceOptions.map(opt => (
          <label key={opt.name} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={!!selected.find(s => s.name === opt.name)}
              onChange={() => toggleService(opt)}
            />
            <span>{opt.name} <span className="text-xs text-gray-400">(${opt.price})</span></span>
          </label>
        ))}
      </div>
      <div className="mb-6 text-lg font-semibold text-center">Estimated Total: <span className="text-indigo-600">${total}</span></div>
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="mb-6 px-4 py-3 rounded-lg border w-full"
      />
      <button type="submit" className="w-full px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition mb-2">Request Custom Quote</button>
      <a
        href="https://calendly.com/prachi-hr-services"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full px-8 py-3 rounded-full bg-white text-indigo-700 font-semibold shadow-lg border border-indigo-600 hover:bg-indigo-50 transition"
      >
        Book a Free Consultation
      </a>
    </motion.form>
  );
} 