import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gray-900 text-white py-8 mt-16">
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0 font-bold text-lg">Prachi HR Services</div>
      <div className="flex flex-wrap gap-6 text-sm">
        <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
        <a href="/terms-of-service" className="hover:underline">Terms of Service</a>
        <a href="/gdpr-data-deletion" className="hover:underline">GDPR Data Deletion</a>
        <a href="/admin/integrations" className="text-gray-400 hover:underline ml-2" style={{ fontSize: '0.85em' }}>Admin</a>
      </div>
      <div className="mt-4 md:mt-0 text-xs text-gray-400">&copy; {new Date().getFullYear()} Prachi HR Services. All rights reserved.</div>
    </div>
  </footer>
);

export default Footer; 