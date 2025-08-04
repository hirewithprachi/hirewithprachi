import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white py-16 mt-16">
    <div className="container mx-auto px-4">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Company Info */}
        <div className="space-y-4">
          <div className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Hire With Prachi
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Professional HR consulting and virtual HR services for modern businesses. 
            Transform your HR operations with expert guidance.
          </p>
          <div className="flex space-x-4">
            <a 
              href="https://linkedin.com/in/prachi-shrivastava" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              href="https://wa.me/918740889927" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-400 transition-colors duration-300"
              aria-label="WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.205 5.077 4.372.71.306 1.263.489 1.695.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Services */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-white">Services</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/services" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Virtual HR Management</Link></li>
            <li><Link to="/services" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">HR Policy Development</Link></li>
            <li><Link to="/services" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Recruitment & Hiring</Link></li>
            <li><Link to="/services" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Employee Engagement</Link></li>
            <li><Link to="/services" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">POSH Compliance</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-white">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/resources" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">HR Templates</Link></li>
            <li><Link to="/blog" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Blog & Articles</Link></li>
            <li><Link to="/hr-cost-savings-calculator" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">HR Calculator</Link></li>
            <li><Link to="/compliance-risk-checker" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Compliance Checker</Link></li>
            <li><Link to="/salary-calculator" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Salary Calculator</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-white">Contact</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>info@hirewithprachi.com</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span>+91 87408 89927</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>India</span>
            </div>
          </div>
          <Link 
            to="/contact" 
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300"
          >
            Get Free Consultation
          </Link>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Hire With Prachi. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Terms of Service</Link>
            <Link to="/gdpr-data-deletion" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">GDPR Data Deletion</Link>
            <Link to="/admin/dashboard" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Admin</Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer; 