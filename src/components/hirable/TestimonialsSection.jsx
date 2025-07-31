import React from "react";

const testimonials = [
  {
    quote: "This agency transformed our hiring process, providing top-tier talent quickly and efficiently. Their expertise and dedication have been invaluable to our growth!",
    name: "John Smith",
    title: "HR Director, ABC Corporation",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote: "We found the perfect candidates for our team thanks to Hirable. Highly recommended!",
    name: "Liya Allen",
    title: "Managing Partner",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote: "Professional, responsive, and results-driven. Our HR is now a strategic advantage.",
    name: "Michael Brown",
    title: "Talent Manager, XYZ Solutions",
    img: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

const TestimonialsSection = () => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#6c5ce7]">What Our Clients Say</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 hover:shadow-2xl transition">
            <img src={t.img} alt={t.name} className="w-20 h-20 object-cover rounded-full mx-auto mb-4 border-4 border-[#6c5ce7]" />
            <blockquote className="italic text-gray-700 mb-4">“{t.quote}”</blockquote>
            <div className="font-bold text-[#6c5ce7]">{t.name}</div>
            <div className="text-gray-500 text-sm">{t.title}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection; 