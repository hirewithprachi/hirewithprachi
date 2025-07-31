import React from 'react';
    import { Link } from 'react-router-dom';

const features = [
  'Smart HR Solutions',
  'Talent Meets Opportunity',
  'Strategic Hiring Solutions',
];

export default function Hero() {
      return (
    <section className="relative flex flex-col md:flex-row items-center justify-between min-h-[80vh] py-24 px-4 md:px-16 bg-gradient-primary font-heading overflow-hidden">
      {/* Left: Text */}
      <div className="flex-1 flex flex-col items-start justify-center z-10 max-w-xl">
        <h3 className="text-lg md:text-xl font-semibold text-accent mb-2 tracking-widest uppercase">WELCOME TO HIRABLE</h3>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-primary drop-shadow-lg animate-fadeInUp">
          Empowering businesses with strategic <span className="text-secondary">HR solutions</span>
        </h1>
        <ul className="flex flex-wrap gap-6 mb-8">
          {features.map(f => (
            <li key={f} className="flex items-center gap-2 text-lg md:text-xl text-neutral font-medium">
              <svg className="text-accent w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
              {f}
            </li>
          ))}
        </ul>
        <Link to="/contact" className="inline-flex items-center px-10 py-5 rounded-full bg-primary text-white font-bold text-xl shadow-xl hover:scale-105 hover:bg-secondary transition-transform duration-300">
          <span className="mr-2">Get Started Today</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Link>
      </div>
      {/* Right: Hero Image */}
      <div className="flex-1 flex items-center justify-center mt-12 md:mt-0 relative">
        <img
          src="/prachi-rejoin.png"
          alt="Prachi Rejoin Hero"
          className="w-full max-w-2xl rounded-3xl shadow-2xl border-4 border-white animate-fadeInUp"
          style={{ minHeight: 320, objectFit: 'cover' }}
        />
        {/* Decorative SVG or shapes can be added here if needed */}
          </div>
        </section>
      );
}