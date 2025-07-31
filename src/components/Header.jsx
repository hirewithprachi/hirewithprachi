import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="w-full">
    {/* Top Bar */}
    <div className="bg-lime-300 text-xs text-gray-900 dark:bg-gray-900 dark:text-white py-2 px-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <span>info@yourdomain.com</span>
        <span>|</span>
        <span>+123 456 789</span>
      </div>
      <div className="hidden md:flex items-center gap-4">
        <a href="#" className="hover:underline">Instagram</a>
        <a href="#" className="hover:underline">Facebook</a>
        <a href="#" className="hover:underline">LinkedIn</a>
      </div>
    </div>
    {/* Main Nav */}
    <div className="bg-white dark:bg-gray-800 shadow-sm px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-lime-500 tracking-wide dark:text-lime-300">HIRABLE.</Link>
        {/* Center Nav */}
        <nav className="hidden lg:flex gap-8 text-base font-medium text-gray-700 dark:text-white">
          <Link to="/" className="hover:text-[#e84393] dark:hover:text-pink-300 transition">Home</Link>
          <Link to="/about" className="hover:text-[#e84393] dark:hover:text-pink-300 transition">About</Link>
          <Link to="/services" className="hover:text-[#e84393] dark:hover:text-pink-300 transition">Services</Link>
          <Link to="/resources" className="hover:text-[#e84393] dark:hover:text-pink-300 transition">Resources</Link>
          <Link to="/contact" className="hover:text-[#e84393] dark:hover:text-pink-300 transition">Contact</Link>
          <Link to="/blog" className="hover:text-[#e84393] dark:hover:text-pink-300 transition">Blog</Link>
        </nav>
        {/* CTA */}
        <Link to="/contact" className="bg-lime-400 text-black dark:bg-lime-500 dark:text-gray-900 px-6 py-2 rounded shadow font-semibold hover:scale-105 transition hidden md:inline-block">
          Get Started
        </Link>
        {/* Mobile Menu Button */}
        <button className="lg:hidden text-[#e84393] dark:text-pink-300 ml-4" aria-label="Open menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
        </button>
      </div>
    </div>
  </header>
);

export default Header; 