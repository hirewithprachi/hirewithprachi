import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import About from '../components/About';
import Services from '../components/Services';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import BlogSection from '../components/BlogSection';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import { servicesData } from '../data/servicesData';

export default function HomePage() {
  // Use static data instead of PHP API
  const featuredServices = servicesData.services.filter(service => 
    ['virtual-hr-management', 'hr-policy-development', 'recruitment-process-outsourcing', 'performance-management'].includes(service.id)
  );

  return (
    <>
      <Header />
      <HeroSection />
      <About />
      <Services services={featuredServices} />
      <Stats />
      <Testimonials />
      <BlogSection />
      <FAQSection />
      <Footer />
    </>
  );
}