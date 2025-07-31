import React from 'react';
import { motion } from 'framer-motion';

export default function ContactMap() {
  return (
    <motion.div
      className="my-12 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Our Location</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1234567890123!2d77.2090!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2a6b5b4a8a1%3A0x1234567890abcdef!2sNew%20Delhi%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
        title="Our Location"
        width="100%"
        height="350"
        frameBorder="0"
        className="rounded-2xl shadow-lg border border-gray-200"
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"
      />
    </motion.div>
  );
} 