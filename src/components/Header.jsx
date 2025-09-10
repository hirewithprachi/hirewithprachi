import React, { useState, useEffect } from 'react';
import ResponsiveImage from './ui/ResponsiveImage';
import { Link, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import { supabase } from '../lib/supabase.js';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  // Handle scroll effect with improved detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    // Add passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'auto';
  };

  // Clean up body scroll on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Check user authentication status
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    
    getUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });
    
    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="w-full sticky top-0 z-50 sticky-header">
      {/* Top Bar - Blue gradient bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs py-1 px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">info@hirewithprachi.com</span>
          <span className="hidden sm:inline">|</span>
          <span>+91 87408 89927</span>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a 
            href="https://linkedin.com/in/prachi-shrivastava" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:underline transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href="https://wa.me/918740889927" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:underline transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* Main Navigation Bar - Enhanced sticky behavior */}
      <div 
        className={`navbar-sticky ${isScrolled ? 'scrolled backdrop-blur-navbar' : ''}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo - Enhanced with hover effects */}
          <Link to="/" className="flex items-center flex-shrink-0 navbar-logo">
            <img 
              src="/assets/images/hirewithprachi_navbar_logo.png" 
              alt="Hire with Prachi - HR Consulting Services" 
              className="h-8 w-auto max-w-[150px] transition-transform duration-300 hover:scale-105 block"
              onError={(e) => {
                console.error('Logo failed to load:', e.target.src);
                e.target.style.border = '2px solid red';
                e.target.alt = 'Logo Error';
                // Try fallback logo
                e.target.src = '/assets/images/logo.svg';
              }}
              onLoad={() => console.log('Logo loaded successfully')}
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation - Enhanced with underline effects */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-gray-700 mx-auto">
            <Link 
              to="/" 
              className={`nav-link px-4 py-2 rounded-lg ${
                location.pathname === '/' 
                  ? 'text-blue-600 bg-blue-50 font-semibold active' 
                  : 'hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`nav-link px-4 py-2 rounded-lg ${
                location.pathname === '/about' 
                  ? 'text-blue-600 bg-blue-50 font-semibold active' 
                  : 'hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              About
            </Link>
            <Link 
              to="/services" 
              className={`nav-link px-4 py-2 rounded-lg ${
                location.pathname === '/services' 
                  ? 'text-blue-600 bg-blue-50 font-semibold active' 
                  : 'hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Services
            </Link>
            <Link 
              to="/resources" 
              className={`nav-link px-4 py-2 rounded-lg ${
                location.pathname === '/resources' 
                  ? 'text-blue-600 bg-blue-50 font-semibold active' 
                  : 'hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Resources
            </Link>
            <Link 
              to="/tools" 
              className={`nav-link px-4 py-2 rounded-lg ${
                location.pathname === '/tools' 
                  ? 'text-blue-600 bg-blue-50 font-semibold active' 
                  : 'hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              HR Tools
            </Link>

            <Link 
              to="/blog" 
              className={`nav-link px-4 py-2 rounded-lg ${
                location.pathname === '/blog' 
                  ? 'text-blue-600 bg-blue-50 font-semibold active' 
                  : 'hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link px-4 py-2 rounded-lg ${
                location.pathname === '/contact' 
                  ? 'text-blue-600 bg-blue-50 font-semibold active' 
                  : 'hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button and Mobile Menu */}
          <div className="flex items-center gap-3">
            {user ? (
              <Link
                to="/dashboard"
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 hidden md:inline-flex items-center gap-2 text-sm"
              >
                <User className="w-4 h-4" />
                Dashboard
              </Link>
            ) : (
              <Link
                to="/contact"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 hidden md:inline-block text-sm"
              >
                Get Started
              </Link>
            )}

            {/* Mobile Menu Button - Enhanced styling */}
            <button
              className="lg:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle menu"
              onClick={toggleMobileMenu}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2"
                className={`transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
              >
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
        </div>

        {/* Mobile Menu - Enhanced with smooth animations */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg mobile-menu-enter mobile-menu-enter-active">
            <nav className="flex flex-col py-2">
              <Link
                to="/"
                className={`px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                  location.pathname === '/' 
                    ? 'text-blue-600 bg-blue-50 font-semibold' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                  location.pathname === '/about' 
                    ? 'text-blue-600 bg-blue-50 font-semibold' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/services"
                className={`px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                  location.pathname === '/services' 
                    ? 'text-blue-600 bg-blue-50 font-semibold' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/resources"
                className={`px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                  location.pathname === '/resources' 
                    ? 'text-blue-600 bg-blue-50 font-semibold' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link
                to="/tools"
                className={`px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                  location.pathname === '/tools' 
                    ? 'text-blue-600 bg-blue-50 font-semibold' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                HR Tools
              </Link>

              <Link
                to="/blog"
                className={`px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                  location.pathname === '/blog' 
                    ? 'text-blue-600 bg-blue-50 font-semibold' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className={`px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                  location.pathname === '/contact' 
                    ? 'text-blue-600 bg-blue-50 font-semibold' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="px-4 py-3 border-t border-gray-100">
                {user ? (
                  <Link
                    to="/dashboard"
                    className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg shadow-md font-semibold hover:shadow-lg transition-all duration-300 block text-center text-sm flex items-center justify-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/contact"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow-md font-semibold hover:shadow-lg transition-all duration-300 block text-center text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;