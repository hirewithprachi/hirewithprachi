import React from 'react';

const logos = [
  'https://demo.awaikenthemes.com/hirable/wp-content/uploads/2025/04/client-logo-1.svg',
  'https://demo.awaikenthemes.com/hirable/wp-content/uploads/2025/04/client-logo-2.svg',
  'https://demo.awaikenthemes.com/hirable/wp-content/uploads/2025/04/client-logo-3.svg',
  'https://demo.awaikenthemes.com/hirable/wp-content/uploads/2025/04/client-logo-4.svg',
  'https://demo.awaikenthemes.com/hirable/wp-content/uploads/2025/04/client-logo-5.svg',
  'https://demo.awaikenthemes.com/hirable/wp-content/uploads/2025/04/client-logo-6.svg',
];

export default function ClientLogosCarousel() {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto flex flex-row items-center justify-center gap-10 overflow-x-auto scrollbar-hide">
        {logos.map((logo, i) => (
          <img key={i} src={logo} alt={`Client Logo ${i + 1}`} className="h-10 md:h-12 w-auto object-contain grayscale hover:grayscale-0 transition duration-300" loading="lazy" />
        ))}
      </div>
    </section>
  );
} 