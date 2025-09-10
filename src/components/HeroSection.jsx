import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => (
  <section className="relative bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 dark:from-pink-700 dark:via-pink-800 dark:to-pink-900 text-white py-20 px-6 overflow-hidden">
    {/* Decorative shapes */}
    <div className="absolute left-0 top-0 w-40 h-40 bg-pink-300 dark:bg-pink-500 rounded-full opacity-20 blur-2xl -z-10" />
    <div className="absolute right-0 bottom-0 w-60 h-60 bg-pink-300 dark:bg-pink-500 rounded-full opacity-10 blur-2xl -z-10" />
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10">
      {/* Left: Text */}
      <div className="mb-10 lg:mb-0 max-w-xl">
        <p className="uppercase text-sm mb-2 tracking-widest font-semibold text-pink-100 dark:text-pink-200">Welcome to Hirable</p>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          Empowering businesses with <br />
          <span className="text-pink-200 dark:text-pink-300">strategic HR solutions</span>
        </h1>
        <p className="text-lg text-white/90 dark:text-white/80 mb-6">Professional HR support for modern teams. Recruitment, compliance, and growth made easy.</p>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Link to="/contact" className="bg-pink-200 dark:bg-pink-400 text-black dark:text-gray-900 px-8 py-3 rounded font-bold shadow hover:scale-105 transition text-center">Get Free Consultation</Link>
          <Link to="/about" className="bg-white/10 dark:bg-gray-800 border border-white dark:border-gray-700 text-white px-8 py-3 rounded font-bold hover:bg-white/20 dark:hover:bg-gray-700 transition text-center">How It Works</Link>
        </div>
        <ul className="flex flex-wrap gap-4 text-sm text-pink-100 dark:text-pink-200">
          <li>✔️ Smart HR Solutions</li>
          <li>✔️ Talent Meets Opportunity</li>
          <li>✔️ Strategic Hiring</li>
        </ul>
      </div>
      {/* Right: Group HR Team Image */}
      <div className="w-full lg:w-[420px] flex-shrink-0 flex justify-center relative">
        <img
          src="/images/services/generic-service.svg"
          alt="HR Team Group"
          className="rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800 w-full max-w-xs lg:max-w-none"
        />
        {/* Decorative badge or icon */}
        <div className="absolute -bottom-6 -right-6 bg-pink-200 dark:bg-pink-400 text-pink-900 dark:text-gray-900 font-bold px-6 py-3 rounded-full shadow-lg text-lg border-4 border-white dark:border-gray-800">HR Experts</div>
      </div>
    </div>
  </section>
);

export default HeroSection;