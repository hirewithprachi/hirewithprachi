import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import About from './components/About';
import Services from './components/Services';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import BlogSection from './components/BlogSection';
import FAQSection from './components/sections/FAQSection';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <HeroSection />
      <About />
      <Services />
      <Stats />
      <Testimonials />
      <BlogSection />
      <FAQSection />
      <Footer />
    </>
  );
}

export default App;