import React from 'react';
import OptimizedImage from './ui/OptimizedImage';

const posts = [
  {
    title: 'How to Build a Winning HR Strategy',
    img: 'https://demo.awaikenthemes.com/hirable/wp-content/uploads/2025/04/about-img-2.jpg',
    excerpt: 'Discover the key elements of a successful HR strategy for modern businesses.'
  },
  {
    title: 'Top 5 HR Compliance Tips for 2025',
    img: 'https://demo.awaikenthemes.com/hirable/wp-content/uploads/2025/04/about-img-3.jpg',
    excerpt: 'Stay ahead of regulations with these essential HR compliance tips.'
  },
  {
    title: 'Remote Onboarding Best Practices',
    img: 'https://demo.awaikenthemes.com/hirable/wp-content/uploads/2025/04/hero-image.png',
    excerpt: 'Make remote onboarding seamless and engaging for new hires.'
  },
];

export default function BlogPreviewSection() {
  return (
    <section className="py-20 font-heading bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary text-center">Latest Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.map((p, i) => (
            <div key={p.title} className="bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center p-8 hover:shadow-2xl transition duration-300 group">
              <OptimizedImage 
                src={p.img} 
                alt={p.title} 
                className="w-full h-48 object-cover rounded-2xl mb-6 border-4 border-primary group-hover:scale-105 transition duration-300" 
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              />
              <h3 className="text-xl font-bold text-primary mb-2 text-center">{p.title}</h3>
              <p className="text-neutral text-base text-center mb-4">{p.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 