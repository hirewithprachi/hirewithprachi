import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronLeft, ChevronRight, Star, Quote, Building2, Rocket, Users } from 'lucide-react';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      role: 'Deputy Director HR',
      company: 'BHEL, Delhi',
      companyType: 'PSU',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
      content: 'Their understanding of PSU requirements and government procedures is exceptional. Helped streamline our recruitment and performance management processes.',
      rating: 5,
      gradient: 'from-blue-500 to-indigo-600',
      icon: Building2
    },
    {
      id: 2,
      name: 'Anita Sharma',
      role: 'CHRO',
      company: 'Fortune 500 Company, Gurgaon',
      companyType: 'Corporate',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
      content: 'Professional service with deep understanding of corporate governance. Their support during our organizational restructuring was invaluable.',
      rating: 5,
      gradient: 'from-purple-500 to-pink-600',
      icon: Users
    },
    {
      id: 3,
      name: 'Vikash Agarwal',
      role: 'Co-founder',
      company: 'TechStartup, Noida',
      companyType: 'Startup',
      image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=400&h=400&fit=crop&crop=face',
      content: 'Perfect partner for our scaling journey. They understand the unique challenges of growing tech companies in NCR.',
      rating: 5,
      gradient: 'from-green-500 to-emerald-600',
      icon: Rocket
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const clientLogos = [
    'BHEL', 'NTPC', 'DRDO', 'TCS', 'Infosys', 'HCL', 'Maruti', 'Airtel', 'HDFC', 'SBI'
  ];

  // Get the current testimonial's icon component
  const CurrentIcon = testimonials[currentIndex].icon;

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-gray-900">What </span>
            <span className="text-gradient bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Delhi NCR Clients</span>
            <span className="text-gray-900"> Say</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Success stories from government, corporate, and startup organizations across the capital region 
            who have transformed their HR operations with our premium solutions.
          </motion.p>
        </motion.div>

        {/* Main Testimonial */}
        <div className="relative max-w-5xl mx-auto mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.9 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-premium overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-2">
                    {/* Content Side */}
                    <div className="p-8 lg:p-12">
                      <motion.div 
                        className="flex items-center space-x-3 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <Badge className={`bg-gradient-to-r ${testimonials[currentIndex].gradient} text-white px-3 py-1`}>
                          {testimonials[currentIndex].companyType}
                        </Badge>
                        <div className="flex">
                          {renderStars(testimonials[currentIndex].rating)}
                        </div>
                      </motion.div>

                      <motion.div 
                        className={`text-6xl mb-6 bg-gradient-to-r ${testimonials[currentIndex].gradient} bg-clip-text text-transparent`}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        <Quote className="h-16 w-16" />
                      </motion.div>

                      <motion.blockquote 
                        className="text-xl lg:text-2xl text-gray-800 leading-relaxed mb-8 font-medium"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        "{testimonials[currentIndex].content}"
                      </motion.blockquote>

                      <motion.div 
                        className="flex items-center space-x-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
                          <ImageWithFallback
                            src={testimonials[currentIndex].image}
                            alt={testimonials[currentIndex].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">
                            {testimonials[currentIndex].name}
                          </h4>
                          <p className="text-gray-600 font-medium">
                            {testimonials[currentIndex].role}
                          </p>
                          <p className={`text-sm font-semibold bg-gradient-to-r ${testimonials[currentIndex].gradient} bg-clip-text text-transparent`}>
                            {testimonials[currentIndex].company}
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Visual Side */}
                    <div className={`bg-gradient-to-br ${testimonials[currentIndex].gradient} p-8 lg:p-12 flex items-center justify-center relative overflow-hidden`}>
                      <motion.div
                        className="text-white/20"
                        animate={{ 
                          rotate: 360,
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        <CurrentIcon className="h-32 w-32" />
                      </motion.div>
                      
                      {/* Floating elements */}
                      <motion.div 
                        className="absolute top-8 right-8 bg-white/20 p-3 rounded-xl"
                        animate={{ 
                          y: [0, -10, 0],
                          rotate: [0, 5, 0]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                      >
                        <Star className="h-6 w-6 text-white" />
                      </motion.div>
                      
                      <motion.div 
                        className="absolute bottom-8 left-8 bg-white/20 p-3 rounded-xl"
                        animate={{ 
                          y: [0, 10, 0],
                          rotate: [0, -5, 0]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          delay: 1
                        }}
                      >
                        <Quote className="h-6 w-6 text-white" />
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border-2 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </motion.div>

            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex 
                      ? `bg-gradient-to-r ${testimonials[currentIndex].gradient}` 
                      : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border-2 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Client Logos */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-8 text-lg">Trusted by leading organizations across Delhi NCR</p>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-6 items-center">
            {clientLogos.map((logo, index) => (
              <motion.div
                key={logo}
                className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100 hover:shadow-premium transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-gray-700 font-bold text-sm text-center">{logo}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}