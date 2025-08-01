import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ConsultationModal from '../LeadCapturePreview';

const navLinks = [
  { label: 'Home', href: '/', icon: '🏠' },
  { label: 'About Us', href: '/about', icon: '👥' },
  { label: 'Services', href: '/services', icon: '⚡' },
  { label: 'Resources', href: '/resources', icon: '📚' },
  { label: 'Blog', href: '/blog', icon: '📝' },
  { label: 'Contact Us', href: '/contact', icon: '📞' },
];

export default function HirableHeader({ openConsultationModal }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-700 font-heading ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-2xl shadow-2xl border-b border-neutral-200' 
        : 'bg-gradient-to-r from-primary-800 via-primary-900 to-primary-950'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        <div className="absolute top-4 left-1/4 w-2 h-2 bg-primary-400/60 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-8 right-1/3 w-1 h-1 bg-accent-400/80 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-12 left-2/3 w-1.5 h-1.5 bg-primary-300/70 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-r from-primary-400/10 to-accent-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-gradient-to-r from-accent-400/10 to-primary-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-primary-300/5 to-accent-300/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Mouse Follow Effect */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-primary-400/5 to-accent-400/5 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            opacity: isScrolled ? 0.3 : 0.6
          }}
        ></div>
      </div>

      <nav className="relative container mx-auto flex items-center justify-between py-4 px-4 md:px-6 lg:px-8">
        {/* Logo space - currently empty */}
        <div className="w-16 md:w-20 lg:w-24 xl:w-28"></div>

        {/* Desktop Navigation */}
        <ul className="hidden xl:flex gap-1 md:gap-2 items-center font-medium text-sm md:text-base mx-auto">
          {navLinks.map((link, idx) => (
            <li key={link.label} className="relative group">
              {link.dropdown ? (
                <>
                  <button
                    className={`transition-all duration-500 flex items-center gap-1 md:gap-2 py-2 md:py-3 px-3 md:px-4 rounded-xl md:rounded-2xl backdrop-blur-sm border border-transparent ${
                      isScrolled 
                        ? `hover:text-primary-600 hover:bg-white/60 hover:border-white/30 ${
                            openDropdown === idx ? 'text-primary-600 font-semibold bg-white/40 shadow-lg' : 'text-neutral-700'
                          }`
                        : `hover:text-white hover:bg-white/10 hover:border-white/20 ${
                            openDropdown === idx ? 'text-white font-semibold bg-white/20 shadow-lg' : 'text-white/90'
                          }`
                    }`}
                    onClick={() => setOpenDropdown(openDropdown === idx ? null : idx)}
                    onMouseEnter={() => setOpenDropdown(idx)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <span className="text-xs md:text-sm">{link.icon}</span>
                    <span className="text-xs md:text-sm lg:text-base">{link.label}</span>
                    <svg className={`w-2 h-2 md:w-3 md:h-3 transition-all duration-500 ${openDropdown === idx ? 'rotate-180 scale-110' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openDropdown === idx && (
                    <ul className="absolute left-1/2 -translate-x-1/2 top-full mt-2 md:mt-4 bg-white/95 backdrop-blur-2xl border border-neutral-200 rounded-2xl md:rounded-3xl shadow-2xl py-2 md:py-4 min-w-[200px] md:min-w-[240px] z-50 animate-fadeInUp">
                      <div className="absolute -top-1 md:-top-2 left-1/2 -translate-x-1/2 w-2 h-2 md:w-4 md:h-4 bg-white/95 rotate-45 border-l border-t border-neutral-200"></div>
                      {link.dropdown.map((item) => (
                        <li key={item.href}>
                          <Link 
                            to={item.href} 
                            className="block px-4 md:px-6 py-2 md:py-3 text-neutral-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 hover:text-primary-600 transition-all duration-300 text-xs md:text-sm font-medium mx-2 md:mx-3 rounded-xl md:rounded-2xl group/item"
                            onMouseEnter={() => setOpenDropdown(idx)} 
                            onMouseLeave={() => setOpenDropdown(null)}
                          >
                            <span className="flex items-center gap-2 md:gap-3">
                              <span className="text-sm md:text-base group-hover/item:scale-110 transition-transform duration-300">{item.icon}</span>
                              <span className="text-xs md:text-sm">{item.label}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link 
                  to={link.href} 
                  className={`transition-all duration-500 flex items-center gap-1 md:gap-2 py-2 md:py-3 px-3 md:px-4 rounded-xl md:rounded-2xl backdrop-blur-sm border border-transparent ${
                    isScrolled 
                      ? `hover:text-primary-600 hover:bg-white/60 hover:border-white/30 ${
                          location.pathname === link.href ? 'text-primary-600 font-semibold bg-white/40 shadow-lg' : 'text-neutral-700'
                        }`
                      : `hover:text-white hover:bg-white/10 hover:border-white/20 ${
                          location.pathname === link.href ? 'text-white font-semibold bg-white/20 shadow-lg' : 'text-white/90'
                        }`
                  }`}
                >
                  <span className="text-xs md:text-sm">{link.icon}</span>
                  <span className="text-xs md:text-sm lg:text-base">{link.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA Section */}
        <div className="hidden xl:flex items-center gap-4">
          {/* Search Button */}
          <button className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group ${
            isScrolled 
              ? 'bg-neutral-100 hover:bg-neutral-200' 
              : 'bg-white/10 hover:bg-white/20'
          }`}>
            <svg className={`w-5 h-5 transition-colors duration-300 ${
              isScrolled 
                ? 'text-neutral-600 group-hover:text-primary-600' 
                : 'text-white/90 group-hover:text-white'
            }`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          {/* Enhanced CTA Button */}
          <Link 
            to="/contact" 
            className="group relative hidden xl:inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold text-xs md:text-sm lg:text-base rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl hover:shadow-accent-500/25 transition-all duration-500 overflow-hidden"
            onClick={openConsultationModal}
          >
            {/* Button Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl md:rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
            
            <span className="relative z-10 flex items-center gap-2 md:gap-3">
              <div className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-2 h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="text-xs md:text-sm lg:text-base">Get Started</span>
              <svg className="w-3 h-3 md:w-4 md:h-5 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Enhanced Mobile Hamburger */}
        <button 
          className="xl:hidden relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl md:shadow-2xl hover:shadow-primary-500/25 transition-all duration-500 group"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl md:rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
          
          <div className="relative z-10 flex flex-col gap-1 md:gap-1.5">
            <span className={`w-5 h-0.5 md:w-6 md:h-0.5 bg-white transition-all duration-500 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5 md:translate-y-2' : ''}`}></span>
            <span className={`w-5 h-0.5 md:w-6 md:h-0.5 bg-white transition-all duration-500 ${isMobileMenuOpen ? 'opacity-0 scale-0' : ''}`}></span>
            <span className={`w-5 h-0.5 md:w-6 md:h-0.5 bg-white transition-all duration-500 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5 md:-translate-y-2' : ''}`}></span>
          </div>
        </button>
      </nav>

      {/* Enhanced Mobile Menu */}
      <div className={`xl:hidden transition-all duration-700 overflow-hidden ${
        isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white/95 backdrop-blur-2xl border-t border-neutral-200 shadow-2xl px-4 py-6 md:py-8">
          <ul className="flex flex-col gap-2 md:gap-3">
            {navLinks.map((link, idx) => (
              <li key={link.label}>
                {link.dropdown ? (
                  <>
                    <button
                      className="w-full flex items-center justify-between text-neutral-700 hover:text-primary-600 py-3 md:py-4 px-4 md:px-6 rounded-xl md:rounded-2xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 transition-all duration-500 font-medium group"
                      onClick={() => setOpenDropdown(openDropdown === idx ? null : idx)}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-base md:text-lg group-hover:scale-110 transition-transform duration-300">{link.icon}</span>
                        <span className="text-sm md:text-base">{link.label}</span>
                      </span>
                      <svg className={`w-4 h-4 md:w-5 md:h-5 transition-all duration-500 ${openDropdown === idx ? 'rotate-180 scale-110' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ${openDropdown === idx ? 'max-h-96' : 'max-h-0'}`}>
                      <ul className="pl-8 md:pl-12 space-y-1 md:space-y-2 border-l-2 border-primary-200 ml-4 md:ml-6">
                        {link.dropdown.map((item) => (
                          <li key={item.href}>
                            <Link 
                              to={item.href} 
                              className="block px-4 md:px-6 py-2 md:py-3 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl md:rounded-2xl transition-all duration-300 text-xs md:text-sm font-medium group/item" 
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <span className="flex items-center gap-3">
                                <span className="text-sm md:text-base group-hover/item:scale-110 transition-transform duration-300">{item.icon}</span>
                                <span className="text-xs md:text-sm">{item.label}</span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link 
                    to={link.href} 
                    className={`block py-3 md:py-4 px-4 md:px-6 rounded-xl md:rounded-2xl transition-all duration-500 font-medium ${
                      location.pathname === link.href 
                        ? 'text-primary-600 bg-gradient-to-r from-primary-50 to-accent-50 shadow-lg' 
                        : 'text-neutral-700 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-base md:text-lg">{link.icon}</span>
                      <span className="text-sm md:text-base">{link.label}</span>
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          {/* Enhanced Mobile CTA */}
          <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-neutral-200">
            <button
              type="button"
              className="group relative inline-flex items-center justify-center w-full px-6 md:px-8 py-4 md:py-5 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold text-base md:text-lg rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl hover:shadow-accent-500/25 transition-all duration-500 overflow-hidden"
              onClick={openConsultationModal}
            >
              {/* Button Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl md:rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
              
              <span className="relative z-10 flex items-center gap-3 md:gap-4">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-sm md:text-base">Get Started Now</span>
                <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 