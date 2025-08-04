import React from 'react';

const Footer = () => (
  <footer className="bg-gray-900 text-white py-16">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Company Info */}
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div>
              <h3 className="text-lg font-bold">Prachi Shrivastava</h3>
              <p className="text-sm text-gray-400">Virtual HR Services</p>
            </div>
          </div>
          <p className="text-gray-400 mb-4">
            Professional virtual HR services for businesses of all sizes.
            Streamline your HR processes with expert guidance.
          </p>
        </div>
        {/* Services */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Our Services</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Recruitment & Hiring</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Payroll & Compliance</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Employee Management</a></li>
            <li><a href="#" className="hover:text-white transition-colors">HR Consulting</a></li>
          </ul>
        </div>
        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Free HR Audit</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Delhi, India</li>
            <li>info@hirewithprachi.com</li>
            <li>+91 87408 89927</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Prachi Shrivastava. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer; 