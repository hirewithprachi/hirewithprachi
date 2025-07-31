import React from 'react';

const testimonials = [
  {
    quote: 'Prachi HR transformed our hiring process and helped us build a world-class team. Highly recommended!',
    name: 'Amit Sharma',
    title: 'CEO, Tech Innovators',
    img: 'https://demo.awaikenthemes.com/hirable/wp-content/uploads/2025/04/about-img-1.jpg',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 font-heading bg-background">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary">What Our Clients Say</h2>
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center p-10 mb-8">
            <img src={t.img} alt={t.name} className="w-20 h-20 object-cover rounded-full border-4 border-primary mb-4" loading="lazy" />
            <blockquote className="text-lg md:text-xl text-neutral font-medium italic mb-4 text-center">“{t.quote}”</blockquote>
            <div className="flex items-center gap-2 mb-2">
              {[...Array(t.rating)].map((_, j) => (
                <svg key={j} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" /></svg>
              ))}
            </div>
            <div className="text-primary font-bold text-lg">{t.name}</div>
            <div className="text-neutral text-base">{t.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
} 