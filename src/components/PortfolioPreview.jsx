import React from 'react';
import ResponsiveImage from './ui/ResponsiveImage';

const projects = [
  {
    title: 'HR Transformation for Tech Startup',
    img: 'https://demo.awaikenthemes.com/hirable/wp-content/uploads/2025/04/portfolio-1.jpg',
    desc: 'Implemented scalable HR processes and compliance for a fast-growing SaaS company.'
  },
  {
    title: 'Payroll Automation for SME',
    img: 'https://demo.awaikenthemes.com/hirable/wp-content/uploads/2025/04/portfolio-2.jpg',
    desc: 'Streamlined payroll and reduced errors by 90% for a 100+ employee firm.'
  },
  {
    title: 'Remote Onboarding Success',
    img: 'https://demo.awaikenthemes.com/hirable/wp-content/uploads/2025/04/portfolio-3.jpg',
    desc: 'Designed a seamless onboarding experience for distributed teams.'
  },
];

export default function PortfolioPreview() {
  return (
    <section className="py-20 font-heading bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary text-center">Case Studies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {projects.map((p, i) => (
            <div key={p.title} className="bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center p-8 hover:shadow-2xl transition duration-300 group">
              <ResponsiveImage src={p.img} alt={p.title} className="w-full h-48 object-cover rounded-2xl mb-6 border-4 border-primary group-hover:scale-105 transition duration-300" />
              <h3 className="text-xl font-bold text-primary mb-2 text-center">{p.title}</h3>
              <p className="text-neutral text-base text-center mb-4">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}