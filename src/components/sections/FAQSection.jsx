import React, { useState } from 'react';

const faqs = [
  {
    q: 'What HR services do you offer?',
    a: 'We provide recruitment, payroll, compliance, employee management, HR analytics, remote work solutions, executive consulting, and HR tech integration.'
  },
  {
    q: 'How do I get started?',
    a: 'Simply book a free consultation or fill out our contact form. We’ll assess your needs and recommend the best solutions.'
  },
  {
    q: 'Are your services suitable for small businesses?',
    a: 'Absolutely! We tailor our HR solutions for startups, SMEs, and large enterprises alike.'
  },
  {
    q: 'Is my data secure?',
    a: 'Yes, we use secure, compliant systems and never share your data without consent.'
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <section className="py-20 font-heading bg-white">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-primary text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-background rounded-2xl shadow border border-gray-100">
              <button
                className="w-full flex justify-between items-center px-6 py-5 text-lg font-semibold text-primary focus:outline-none"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {faq.q}
                <span className="ml-4 text-accent">{open === i ? '-' : '+'}</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-neutral text-base animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
            ))}
        </div>
      </div>
    </section>
  );
}