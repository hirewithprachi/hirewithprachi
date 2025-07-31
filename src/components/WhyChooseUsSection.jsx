import React from 'react';

const features = [
  'Proven Expertise in HR Solutions',
  'Access to Top Talent Pool',
  'Innovative Workforce Solutions',
  'Dedicated Support & Consultation',
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 font-heading bg-background">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Why Choose Us</h2>
        <p className="text-lg text-neutral mb-8">We deliver expert HR solutions, connecting talent with opportunity and ensuring business success with personalized support.</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {features.map(f => (
            <li key={f} className="flex items-center gap-3 text-lg md:text-xl text-neutral font-medium">
              <svg className="text-accent w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
} 