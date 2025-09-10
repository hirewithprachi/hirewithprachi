import React, { useState, useEffect } from 'react';
import ResponsiveImage from '../ui/ResponsiveImage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const testimonials = [
  {
    quote: "Prachi's virtual HR services transformed our startup. Her expertise in HR compliance and policy development saved us countless hours and potential legal issues. Highly recommended for any growing business!",
    author: "Sarah Johnson",
    title: "CEO Of Company",
    image: "/assets/images/author-1.jpg",
    rating: 5,
    isHighlighted: false,
  },
  {
    quote: "Working with Prachi as our virtual HR consultant has been game-changing. Her remote HR support is professional, efficient, and cost-effective. She's become an invaluable part of our team.",
    author: "Michael Chen",
    title: "CEO Of Company",
    image: "/assets/images/author-2.jpg",
    rating: 5,
    isHighlighted: true, // Middle card with blue background
  },
  {
    quote: "As a small business owner, I was struggling with HR compliance. Prachi's virtual HR agency provided the perfect solution - expert guidance without the overhead. Our HR processes are now streamlined and compliant.",
    author: "Emily Rodriguez",
    title: "CEO Of Company",
    image: "/assets/images/author-3.jpg",
    rating: 5,
    isHighlighted: false,
  },
  {
    quote: "The level of professionalism and attention to detail Prachi brings is exceptional. Our employee satisfaction scores increased by 40% within 6 months of working with her virtual HR services.",
    author: "David Kumar",
    title: "CEO Of Company",
    image: "/assets/images/author-4.jpg",
    rating: 5,
    isHighlighted: false,
  },
  {
    quote: "Prachi's HR expertise helped us set up all compliance and policies for our tech startup in Bangalore. Highly recommended for Indian SMEs!",
    author: "Rohit Sharma",
    title: "Founder, Tech Innovate Pvt Ltd",
    image: "/assets/images/author-1.jpg",
    rating: 5,
    isHighlighted: false,
  },
  {
    quote: "We were struggling with employee engagement. Prachi's virtual HR solutions made a huge difference for our team in Mumbai.",
    author: "Anjali Mehta",
    title: "HR Manager, FinEdge Solutions",
    image: "/assets/images/author-2.jpg",
    rating: 5,
    isHighlighted: false,
  },
  {
    quote: "Prachi's remote HR support is professional and cost-effective. Our compliance audits are now always successful.",
    author: "Suresh Kumar",
    title: "Director, Kumar Textiles",
    image: "/assets/images/author-3.jpg",
    rating: 5,
    isHighlighted: false,
  },
  {
    quote: "We needed HR policies for our growing business in Delhi. Prachi delivered everything on time and with great attention to detail.",
    author: "Neha Gupta",
    title: "COO, Gupta Logistics",
    image: "/assets/images/author-4.jpg",
    rating: 5,
    isHighlighted: false,
  },
];

export default function HirableTestimonials() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log('HirableTestimonials component mounted - CLEAN VERSION!');
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          console.log('Testimonials section is now visible!');
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('.testimonials-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="testimonials-section py-20 md:py-32 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Floating Particles */}
        <div className="absolute top-20 left-1/3 w-2 h-2 bg-blue-400/60 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-1/4 w-1 h-1 bg-purple-400/80 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-2/3 w-1.5 h-1.5 bg-pink-400/70 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-8 py-4 rounded-full border border-blue-500/30 backdrop-blur-sm mb-8">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-blue-600 text-sm font-bold uppercase tracking-widest">Client Success Stories</span>
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            What Our <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Clients Say</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover how our virtual HR services have transformed businesses and helped them achieve their HR goals
          </p>
        </div>

        {/* Testimonials Grid as Swiper */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation, FreeMode]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          freeMode={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
            1440: { slidesPerView: 4 },
          }}
          className="mb-16"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div
                className={`group relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  testimonial.isHighlighted ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' : ''
                }`}
                style={{ animationDelay: `${index * 200}ms`, minHeight: '320px', maxHeight: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                {/* Profile Picture */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <ResponsiveImage src={testimonial.image} alt={testimonial.author} className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-lg" />
                    {testimonial.isHighlighted && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white text-lg shadow-lg">
                        "
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg ${testimonial.isHighlighted ? 'text-white' : 'text-gray-900'}`}>{testimonial.author}</h4>
                    <p className={`text-sm ${testimonial.isHighlighted ? 'text-blue-100' : 'text-gray-600'}`}>{testimonial.title}</p>
                  </div>
                </div>
                {/* Quote Text */}
                <blockquote className={`text-sm leading-relaxed mb-4 ${testimonial.isHighlighted ? 'text-white/90' : 'text-gray-600'}`}>"{testimonial.quote}"</blockquote>
                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${testimonial.isHighlighted ? 'text-blue-300' : 'text-yellow-400'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>


      </div>
    </section>
  );
}