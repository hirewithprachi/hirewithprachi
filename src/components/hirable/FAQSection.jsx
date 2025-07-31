import React, { useState } from "react";

const faqs = [
  {
    q: "How do I get started with your services?",
    a: "We offer a range of HR solutions, including recruitment services, employee training and development."
  },
  {
    q: "What services does your HR agency provide?",
    a: "We offer a range of HR solutions, including recruitment services, employee training and development."
  },
  {
    q: "How do I apply for a job through your platform?",
    a: "We offer a range of HR solutions, including recruitment services, employee training and development."
  },
  {
    q: "Do you offer employee training programs?",
    a: "We offer a range of HR solutions, including recruitment services, employee training and development."
  },
  {
    q: "What industries do you specialize in?",
    a: "We offer a range of HR solutions, including recruitment services, employee training and development."
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#6c5ce7]">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl shadow border border-gray-100">
              <button
                className="w-full flex justify-between items-center px-6 py-5 text-lg font-semibold text-[#6c5ce7] focus:outline-none"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {faq.q}
                <span className="ml-4 text-lime-400 text-2xl">{open === i ? '-' : '+'}</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-gray-700 text-base transition-all duration-300">
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