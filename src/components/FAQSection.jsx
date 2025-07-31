import React, { useState } from 'react';

const faqs = [
  {
    q: 'How do I get started with your HR services?',
    a: 'Simply contact us for a free consultation. We’ll assess your needs and recommend the best solutions.'
  },
  {
    q: 'What industries do you specialize in?',
    a: 'We work with startups, SMEs, and corporates across tech, finance, healthcare, and more.'
  },
  {
    q: 'Do you offer remote HR support?',
    a: 'Yes, our virtual HR services are designed for remote and hybrid teams.'
  },
  {
    q: 'How do you ensure compliance?',
    a: 'Our experts stay updated on the latest regulations and handle all compliance documentation for you.'
  },
  {
    q: 'Can you help with employee engagement?',
    a: 'Absolutely! We offer engagement surveys, team-building, and recognition programs.'
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-3xl font-bold mb-12 text-center text-[#e84393] dark:text-pink-300">Frequently Asked Questions</h3>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-100 dark:border-gray-700">
              <button
                className="w-full flex justify-between items-center px-6 py-5 text-lg font-semibold text-[#e84393] dark:text-pink-300 focus:outline-none"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {faq.q}
                <span className="ml-4 text-pink-400 text-2xl">{open === i ? '-' : '+'}</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-gray-700 dark:text-gray-200 text-base transition-all duration-300">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 