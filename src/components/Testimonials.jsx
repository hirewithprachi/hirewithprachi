import React from 'react';

const testimonials = [
  {
    quote: 'Working with Hirable was a game changer. Their HR experts helped us streamline hiring and retain top talent.',
    name: 'Neha Sharma',
    title: 'Startup Founder',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
  },
  {
    quote: 'The team is professional, responsive, and results-driven. Our HR is now a strategic advantage.',
    name: 'Michael Brown',
    title: 'Talent Manager',
    img: 'https://randomuser.me/api/portraits/men/65.jpg',
    rating: 5,
  },
];

const Testimonials = () => (
  <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
    <div className="max-w-4xl mx-auto text-center">
      <h3 className="text-3xl font-bold mb-10 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent dark:from-pink-300 dark:via-pink-400 dark:to-pink-500">What Our Clients Say</h3>
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition">
            <img src={t.img} alt={t.name} className="w-20 h-20 object-cover rounded-full mx-auto mb-4 border-4 border-pink-300 dark:border-pink-400" loading="lazy" />
            <blockquote className="italic text-gray-700 dark:text-gray-200 mb-4">“{t.quote}”</blockquote>
            <div className="flex items-center justify-center mb-2">
              {[...Array(t.rating)].map((_, idx) => (
                <svg key={idx} className="w-5 h-5" viewBox="0 0 20 20">
                  <defs>
                    <linearGradient id={`star-pink-gradient-${i}-${idx}`} x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0%" stopColor="#f472b6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                  <path fill={`url(#star-pink-gradient-${i}-${idx})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
              ))}
            </div>
            <div className="font-bold bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent dark:from-pink-300 dark:via-pink-400 dark:to-pink-500">{t.name}</div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">{t.title}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials; 