import React from 'react';

const plans = [
  {
    name: 'Basic Plan',
    price: '$29',
    period: '/Per Month',
    features: [
      'Basic Compliance Support',
      'HR Documentation',
      'Performance Management',
    ],
  },
  {
    name: 'Standard Plan',
    price: '$39',
    period: '/Per Month',
    features: [
      'Standard Compliance Support',
      'HR Documentation',
      'Performance Management',
    ],
  },
  {
    name: 'Premium Plan',
    price: '$49',
    period: '/Per Month',
    features: [
      'Basic Compliance Support',
      'HR Documentation',
      'Performance Management',
    ],
  },
];

export default function HirablePricing() {
  return (
    <section className="relative py-20 font-heading bg-white overflow-hidden">
      {/* Decorative SVG divider at the top */}
      <svg className="absolute left-0 top-0 w-full h-16 z-0" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#a5b4fc" fillOpacity="0.25" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
      </svg>
      <div className="container mx-auto max-w-6xl relative z-10 animate-fadeInUp">
        <h3 className="text-lg md:text-xl font-semibold text-accent mb-2 tracking-widest uppercase text-center">PRICING PLAN</h3>
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-primary text-center">Flexible HR solutions for every business need</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((p, i) => (
            <div key={p.name} className="bg-background rounded-2xl shadow flex flex-col items-center justify-center p-8 border border-gray-100 animate-fadeInUp" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="text-xl font-bold text-primary mb-2 text-center">{p.name}</div>
              <div className="text-4xl font-bold text-secondary mb-2 text-center">{p.price} <span className="text-base font-medium text-neutral">{p.period}</span></div>
              <ul className="mb-4 space-y-2">
                {p.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-base text-neutral font-medium">
                    <svg className="text-accent w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-white font-bold text-lg shadow-xl hover:scale-105 hover:bg-secondary transition-transform duration-300 mb-2">Get Started Now</a>
              <div className="text-xs text-neutral text-center">Get 30 day free trial<br/>No any hidden fees pay<br/>You can cancel anytime</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 