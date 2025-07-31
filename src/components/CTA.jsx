import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => (
  <section className="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 dark:from-pink-700 dark:via-pink-800 dark:to-pink-900 text-white text-center py-20 px-6">
    <div className="max-w-2xl mx-auto">
      <h3 className="text-3xl md:text-4xl font-bold mb-4">Need help building your HR strategy?</h3>
      <p className="mb-8 text-lg">Let’s talk. We’ll understand your challenges and offer a custom HR plan for your business.</p>
      <Link to="/contact" className="bg-gradient-to-r from-pink-200 via-pink-300 to-pink-400 dark:from-pink-300 dark:via-pink-400 dark:to-pink-500 text-black dark:text-gray-900 px-8 py-4 rounded-full shadow font-bold text-lg hover:scale-105 transition inline-block">
        Book Free Consultation
      </Link>
    </div>
  </section>
);

export default CTA; 