import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from './ui/OptimizedImage';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span>info@hirewithprachi.com</span>
          <span>|</span>
          <span>+91 87408 89927</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a href="https://linkedin.com/in/prachi-shrivastava" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
          <a href="https://wa.me/918740889927" target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp</a>
        </div>
      </div>
      
      {/* Main Nav */}
      <div className="bg-white shadow-sm px-4 py-3 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <OptimizedImage 
              src="/assets/images/prachi-navbar-logo.webp" 
              alt="Hire With Prachi Logo" 
              className="h-12 w-auto object-contain"
              fallbackSrc="/assets/images/prachi-logo.webp"
              loading="eager"
              sizes="(max-width: 768px) 120px, 150px"
            />
            <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide hidden">
              Hire With Prachi
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8 text-base font-medium text-gray-700">
            <Link to="/" className="hover:text-blue-600 transition-colors duration-300">Home</Link>
            <Link to="/about" className="hover:text-blue-600 transition-colors duration-300">About</Link>
            <Link to="/services" className="hover:text-blue-600 transition-colors duration-300">Services</Link>
            <Link to="/resources" className="hover:text-blue-600 transition-colors duration-300">Resources</Link>
            <Link to="/blog" className="hover:text-blue-600 transition-colors duration-300">Blog</Link>
            <Link to="/contact" className="hover:text-blue-600 transition-colors duration-300">Contact</Link>
          </nav>
          
          {/* CTA */}
          <Link 
            to="/contact" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg shadow-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 hidden md:inline-block"
          >
            Get Started
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-gray-700 ml-4 p-2" 
            aria-label="Open menu"
            onClick={toggleMobileMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <>
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
            <nav className="flex flex-col py-4">
              <Link 
                to="/" 
                className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/services" 
                className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/resources" 
                className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link 
                to="/blog" 
                className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="px-4 py-3">
                <Link 
                  to="/contact" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg shadow-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 block text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 