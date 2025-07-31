import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import HireWithPrachiTopBar from '../components/hirable/HirableTopBar';
import HireWithPrachiHeader from '../components/hirable/HirableHeader';
import HireWithPrachiFooter from '../components/hirable/HirableFooter';
import AIChatbotWidget from '../components/AIChatbotWidget';
import Breadcrumbs from '../components/Breadcrumbs';
import HireWithPrachiTestimonials from '../components/hirable/HirableTestimonials';
import HireWithPrachiFAQ from '../components/hirable/HirableFAQ';
import ConsultationModal from '../components/LeadCapturePreview';

const galleryImages = [
  {
    src: '/Hirable – Human Resources & Recruiting WordPress Theme_files/about-img-1.jpg',
    title: 'Keynote at HR Tech Summit',
    date: '2024-03-15',
    desc: 'Prachi delivering a keynote on digital HR transformation.'
  },
  {
    src: '/Hirable – Human Resources & Recruiting WordPress Theme_files/about-img-2.jpg',
    title: 'Panelist at Women in Leadership',
    date: '2023-11-10',
    desc: 'Panel discussion on women in HR leadership roles.'
  },
  {
    src: '/Hirable – Human Resources & Recruiting WordPress Theme_files/about-img-3.jpg',
    title: 'Corporate Training Workshop',
    date: '2023-08-22',
    desc: 'Prachi conducting a talent management workshop.'
  },
  {
    src: '/Hirable – Human Resources & Recruiting WordPress Theme_files/benefit-img-1.jpg',
    title: 'HR Compliance Seminar',
    date: '2022-12-05',
    desc: 'Seminar on latest HR compliance trends.'
  }
];

const services = [
  { icon: '🧑‍💼', title: 'HR Consulting', desc: 'Strategic HR solutions for startups and SMEs.' },
  { icon: '📄', title: 'Policy Drafting', desc: 'Custom HR policies and handbooks.' },
  { icon: '🎯', title: 'Talent Management', desc: 'Attract, retain, and develop top talent.' },
  { icon: '🧑‍🏫', title: 'Training & Workshops', desc: 'Upskill your team with expert-led sessions.' },
  { icon: '🔍', title: 'Compliance Audits', desc: 'Stay compliant with Indian labor laws.' },
  { icon: '💬', title: 'Employee Engagement', desc: 'Boost morale and productivity with proven programs.' }
];

const achievements = [
  { year: '2024', icon: '🏆', title: 'Keynote Speaker, HR Tech Summit', desc: 'Recognized for digital HR innovation.' },
  { year: '2023', icon: '🎤', title: 'Panelist, Women in Leadership', desc: 'Advocating for women in HR.' },
  { year: '2022', icon: '🏅', title: 'Awarded Top Virtual HR Consultant', desc: 'By HR Tech Awards.' },
  { year: '2021', icon: '🤝', title: '500+ Clients Served', desc: 'Across India and globally.' }
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Prachi Shrivastava",
  "jobTitle": "Virtual HR Consultant",
  "image": "/Hirable – Human Resources & Recruiting WordPress Theme_files/about-img-1.jpg",
  "description": "India's leading virtual HR consultant for startups and SMEs. Expert in HR consulting, policy drafting, talent management, and compliance.",
  "sameAs": [
    "https://www.linkedin.com/in/prachi-shrivastava-hr",
    "https://instagram.com/prachi_hr"
  ]
};
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Prachi Shrivastava HR Consulting",
  "url": "https://hirewithprachi.com",
  "logo": "/Hirable – Human Resources & Recruiting WordPress Theme_files/logo.svg"
};
const imageGallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": "Prachi Shrivastava Event Gallery",
  "image": galleryImages.map(img => ({
    "@type": "ImageObject",
    "contentUrl": img.src,
    "name": img.title,
    "description": img.desc
  }))
};

export default function AboutPage() {
  const [showConsultation, setShowConsultation] = useState(false);
  
  return (
    <>
      <Helmet>
        <title>About Prachi Shrivastava – Virtual HR Consultant & Expert</title>
        <meta name="description" content="Meet Prachi Shrivastava, India's leading virtual HR consultant. Explore her services and event gallery. Book a free consultation today!" />
        <meta name="keywords" content="Prachi Shrivastava, virtual HR consultant, HR expert, HR services India, HR events, HR seminars, HR gallery, HR consulting, HR compliance" />
        <meta property="og:title" content="About Prachi Shrivastava – Virtual HR Consultant & Expert" />
        <meta property="og:description" content="Meet Prachi Shrivastava, India's leading virtual HR consultant. Explore her services and event gallery. Book a free consultation today!" />
        <meta property="og:image" content="/Hirable – Human Resources & Recruiting WordPress Theme_files/about-img-1.jpg" />
        <meta property="og:url" content="https://hirewithprachi.com/about" />
        <meta property="og:type" content="profile" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Prachi Shrivastava – Virtual HR Consultant & Expert" />
        <meta name="twitter:description" content="Meet Prachi Shrivastava, India's leading virtual HR consultant. Explore her services and event gallery. Book a free consultation today!" />
        <meta name="twitter:image" content="/Hirable – Human Resources & Recruiting WordPress Theme_files/about-img-1.jpg" />
        <link rel="canonical" href="https://hirewithprachi.com/about" />
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(imageGallerySchema)}</script>
      </Helmet>
      <main className="min-h-screen bg-white" role="main" style={{ margin: 0, padding: 0 }}>
        <HireWithPrachiTopBar />
        <HireWithPrachiHeader />
        
        {/* Hero section with responsive background video */}
        <section className="relative w-full overflow-hidden hero-section-responsive" style={{ margin: 0, padding: 0 }}>
          {/* Fallback background image */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center video-fallback"
            style={{
              backgroundImage: 'url(/Hirable – Human Resources & Recruiting WordPress Theme_files/about-img-1.jpg)',
              filter: 'brightness(0.8)'
            }}
          />
          
          {/* Responsive video background */}
          <video
            src="/assets/videos/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full mobile-video md:desktop-video"
            onCanPlay={() => {
              console.log("Video can play");
              // Show video when it's ready
              document.querySelector('.video-fallback').style.display = 'none';
            }}
            onLoadedData={() => console.log("Video data loaded")}
            onError={(e) => {
              console.error("Video error:", e);
              // Hide video on error to show fallback image
              e.target.style.display = 'none';
              // Ensure fallback image is visible
              document.querySelector('.video-fallback').style.display = 'block';
            }}
          />
          
          {/* Subtle gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </section>

        {/* About Prachi Section - Modern & Trendy Design */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-40 right-10 w-48 md:w-72 h-48 md:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-48 md:w-72 h-48 md:h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
              {/* Image Section with Modern Effects */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative group order-2 lg:order-1"
              >
                <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl">
                  <img 
                    src="/Hirable – Human Resources & Recruiting WordPress Theme_files/about-img-2.jpg" 
                    alt="Prachi Shrivastava at HR event" 
                    className="w-full h-[400px] md:h-[600px] object-cover transform group-hover:scale-110 transition-transform duration-700" 
                    loading="lazy" 
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
                
                {/* Floating stats card */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute -bottom-4 md:-bottom-8 -right-4 md:-right-8 bg-white/95 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-8 shadow-2xl border border-white/30"
                >
                  <div className="text-center">
                    <div className="text-2xl md:text-4xl font-bold text-blue-600 mb-1 md:mb-2">8+</div>
                    <div className="text-xs md:text-sm text-gray-600 font-medium">Years Experience</div>
              </div>
            </motion.div>

                {/* Floating achievement badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute -top-4 md:-top-6 -left-4 md:-left-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full px-3 md:px-6 py-2 md:py-3 shadow-xl"
                >
                  <div className="text-xs md:text-sm font-semibold">🏆 Top HR Consultant</div>
            </motion.div>
              </motion.div>

              {/* Content Section with Modern Design */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6 md:space-y-10 order-1 lg:order-2"
              >
                {/* Main heading with gradient text */}
                <div className="space-y-3 md:space-y-4">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 md:mb-6 leading-tight"
                  >
                    About Prachi
                  </motion.h2>
                  <motion.div 
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: "80px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-1 md:h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                  ></motion.div>
                </div>

                {/* Main description with glassmorphism */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-xl md:shadow-2xl border border-white/30"
                >
                  <p className="text-base md:text-xl text-gray-700 leading-relaxed mb-6 md:mb-8 font-medium">
                    Prachi Shrivastava is a passionate virtual HR consultant with 8+ years of experience helping startups and SMEs build world-class HR systems. Her mission is to make HR accessible, strategic, and impactful for every business.
                  </p>
                  
                  {/* Expertise highlights with modern icons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {[
                      { icon: "🎯", text: "Expert in HR compliance, policy drafting, and talent management" },
                      { icon: "🚀", text: "Known for a tech-driven, people-first approach" },
                      { icon: "🤝", text: "Trusted by 500+ companies across India" },
                      { icon: "📈", text: "Proven results: 95% client satisfaction, ₹2Cr+ cost savings delivered" }
                    ].map((item, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                        className="flex items-start gap-3 p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 border border-white/20"
                      >
                        <span className="text-xl md:text-3xl flex-shrink-0">{item.icon}</span>
                        <span className="text-sm md:text-base text-gray-700 font-medium leading-relaxed">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Quote section with modern design */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="relative"
                >
                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-10 border border-blue-200/30 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <div className="text-3xl md:text-5xl text-blue-500 mb-4 md:mb-6 opacity-60">"</div>
                    <blockquote className="text-lg md:text-2xl text-gray-700 italic font-medium leading-relaxed mb-4 md:mb-6">
                      I believe HR should be a growth engine, not a cost center. My approach blends empathy, analytics, and innovation to help every client thrive.
                    </blockquote>
                    <div className="text-3xl md:text-5xl text-purple-500 opacity-60 text-right">"</div>
                    <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                </div>
                </motion.div>

                {/* Social links with modern buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="flex flex-wrap gap-3 md:gap-6"
                >
                  <a 
                    href="https://www.linkedin.com/in/prachi-shrivastava-hr" 
                    target="_blank" 
                    rel="noopener" 
                    className="flex items-center gap-2 md:gap-3 bg-blue-600 text-white px-4 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base"
                  >
                    <svg className="w-4 md:w-6 h-4 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a 
                    href="https://instagram.com/prachi_hr" 
                    target="_blank" 
                    rel="noopener" 
                    className="flex items-center gap-2 md:gap-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base"
                  >
                    <svg className="w-4 md:w-6 h-4 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.875-1.418-2.026-1.418-3.244s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244z"/>
                    </svg>
                    Instagram
                  </a>

                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Services Offered */}
        <section id="services-section" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Services Offered</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive HR solutions tailored for your business growth</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="group bg-white rounded-2xl shadow-xl p-8 text-center hover:scale-105 transition-all duration-300">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-primary-700 mb-2">{service.title}</h3>
                  <p className="text-gray-700">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Glimpses from Events & Seminars Section - Classy Design */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute top-40 right-10 w-48 md:w-72 h-48 md:h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-48 md:w-72 h-48 md:h-72 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-7xl">
            {/* Section Header */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16 md:mb-20"
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
                Glimpses from Events & Seminars
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                From corporate workshops to industry conferences, here's a glimpse into Prachi's journey of knowledge sharing and thought leadership in the HR space.
              </p>
            </motion.div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  image: "/Hirable – Human Resources & Recruiting WordPress Theme_files/about-img-1.jpg",
                  title: "HR Tech Summit 2024",
                  description: "Keynote speaker on 'Future of HR Technology' at India's premier HR tech conference",
                  date: "March 2024",
                  attendees: "500+ HR professionals"
                },
                {
                  image: "/Hirable – Human Resources & Recruiting WordPress Theme_files/about-img-3.jpg", 
                  title: "Startup HR Workshop",
                  description: "Intensive 2-day workshop on building HR foundations for early-stage startups",
                  date: "February 2024",
                  attendees: "50+ startup founders"
                },
                {
                  image: "/Hirable – Human Resources & Recruiting WordPress Theme_files/about-img-2.jpg",
                  title: "Women in HR Leadership",
                  description: "Panel discussion on breaking barriers and building inclusive workplaces",
                  date: "January 2024", 
                  attendees: "200+ HR leaders"
                }
              ].map((event, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-48 md:h-64">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <div className="space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                        {event.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {event.description}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-4 pt-4 border-t border-white/20">
                        <span className="text-sm md:text-base text-blue-300 font-medium">
                          📅 {event.date}
                        </span>
                        <span className="text-sm md:text-base text-purple-300 font-medium">
                          👥 {event.attendees}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl md:rounded-3xl"></div>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}

          </div>
        </section>
        {/* Tools & Tech You Use Section (after Gallery) */}
        <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Tools & Tech You Use</h2>
            <div className="flex flex-wrap justify-center gap-8">
              <img src="/images/unnamed.png" alt="Zoho HR" className="h-12 w-auto object-contain" />
              <img src="/images/BambooHR-Logo.jpg" alt="BambooHR" className="h-12 w-auto object-contain" />
              <img src="/images/HiView-Solutions-Google-Workspace-Reseller.-Super-G-Icon.png" alt="Google Workspace" className="h-12 w-auto object-contain" />
              <img src="/images/microsoft-365-copilot-logo-png_seeklogo-501781.png" alt="Microsoft 365" className="h-12 w-auto object-contain" />
              <img src="/images/nforceit-partner-google-workspace-logo-800x400.png" alt="Google Workspace Alt" className="h-12 w-auto object-contain" />
              <img src="/images/People-Logo-1024x1024.webp" alt="People HR" className="h-12 w-auto object-contain" />
            </div>
          </div>
        </section>
        {/* Achievements Section - Elegant Design */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-blue-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-40 right-10 w-48 md:w-72 h-48 md:h-72 bg-purple-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-48 md:w-72 h-48 md:h-72 bg-indigo-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-7xl">
            {/* Section Header */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16 md:mb-20"
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 md:mb-6">
                Achievements & Impact
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                A testament to Prachi's expertise and impact in transforming HR practices across diverse industries.
              </p>
            </motion.div>

            {/* Achievements Grid - 4 in a row horizontal scroll */}
            <div className="mb-16 md:mb-20">
              <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-6 scrollbar-hide">
                {[
                  {
                    icon: "🏆",
                    title: "Top HR Consultant",
                    value: "2024",
                    description: "Recognized as one of India's leading HR consultants by HR Tech Awards"
                  },
                  {
                    icon: "📈",
                    title: "Cost Savings Delivered",
                    value: "₹2Cr+",
                    description: "Helped clients save over 2 crores through optimized HR processes"
                  },
                  {
                    icon: "🤝",
                    title: "Happy Clients",
                    value: "500+",
                    description: "Successfully served 500+ companies across various industries"
                  },
                  {
                    icon: "⭐",
                    title: "Client Satisfaction",
                    value: "95%",
                    description: "Maintained 95% client satisfaction rate across all projects"
                  }
                ].map((achievement, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="flex-shrink-0 w-72 md:w-80 bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl md:shadow-2xl border border-white/30 hover:shadow-2xl hover:scale-105 transition-all duration-500 group"
                  >
                    <div className="text-center space-y-4 md:space-y-6">
                      <div className="text-4xl md:text-6xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                        {achievement.icon}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                        {achievement.title}
                      </h3>
                      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {achievement.value}
                      </div>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Impact Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20"
            >
              {[
                { number: "150+", label: "HR Policies Created" },
                { number: "200+", label: "Recruitment Campaigns" },
                { number: "50+", label: "Training Programs" },
                { number: "100+", label: "Compliance Audits" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                  className="text-center bg-white/60 backdrop-blur-md rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg border border-white/30 hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <div className="text-2xl md:text-4xl font-bold text-blue-600 mb-2 md:mb-3">
                    {stat.number}
                    </div>
                  <div className="text-sm md:text-base text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-8 md:p-12 border border-blue-200/30">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">
                  Ready to transform your HR?
                </h3>
                <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
                  Let's discuss how Prachi can help you build a world-class HR system that drives growth and employee satisfaction.
                </p>
                <button 
                  onClick={() => setShowConsultation(true)}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-base md:text-lg"
                >
                  <svg className="w-5 md:w-6 h-5 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Book Free Consultation
                </button>
            </div>
            </motion.div>
          </div>
        </section>
        {/* Testimonials (imported) */}
        <HireWithPrachiTestimonials />
        {/* FAQ (imported) */}
        <HireWithPrachiFAQ />
        {/* Why Work With Me Section - Elegant Design */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute top-40 right-10 w-48 md:w-72 h-48 md:h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-48 md:w-72 h-48 md:h-72 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-7xl">
            {/* Section Header */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16 md:mb-20"
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
                Why Work With Me?
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Discover what makes Prachi the preferred choice for HR transformation across India's leading companies.
              </p>
            </motion.div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
              {[
                {
                  icon: "🎯",
                  title: "Proven Expertise",
                  description: "8+ years of hands-on experience with 500+ successful HR transformations across diverse industries"
                },
                {
                  icon: "⚡",
                  title: "Fast Implementation",
                  description: "Quick turnaround times with scalable solutions that adapt to your business needs"
                },
                {
                  icon: "💰",
                  title: "Cost-Effective",
                  description: "Save up to 40% on HR costs while improving efficiency and compliance"
                },
                {
                  icon: "🤝",
                  title: "Personal Touch",
                  description: "Direct access to Prachi throughout the project with personalized attention to your needs"
                },
                {
                  icon: "📊",
                  title: "Data-Driven",
                  description: "Analytics-based approach ensuring measurable results and continuous improvement"
                },
                {
                  icon: "🛡️",
                  title: "Compliance First",
                  description: "100% compliance guarantee with latest labor laws and industry best practices"
                }
              ].map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20 hover:bg-white/20 transition-all duration-500"
                >
                  <div className="space-y-4 md:space-y-6">
                    <div className="text-4xl md:text-6xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Comparison Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16 md:mb-20"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-8 md:p-12 border border-white/20">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 md:mb-12 text-center">
                  Traditional HR vs. Prachi's Approach
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                  {/* Traditional HR */}
                  <div className="space-y-6">
                    <h4 className="text-xl md:text-2xl font-bold text-red-400 mb-6">Traditional HR</h4>
                    <div className="space-y-4">
                      {[
                        "❌ Expensive in-house teams",
                        "❌ Slow implementation (6-12 months)",
                        "❌ Generic one-size-fits-all solutions",
                        "❌ Limited expertise in modern HR tech",
                        "❌ High turnover and training costs",
                        "❌ Reactive approach to compliance"
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <span className="text-red-400 text-lg md:text-xl mt-1">❌</span>
                          <span className="text-gray-300 leading-relaxed">{item.replace("❌ ", "")}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prachi's Approach */}
                  <div className="space-y-6">
                    <h4 className="text-xl md:text-2xl font-bold text-green-400 mb-6">Prachi's Approach</h4>
                    <div className="space-y-4">
                      {[
                        "✅ Cost-effective virtual solutions",
                        "✅ Fast implementation (2-4 weeks)",
                        "✅ Customized for your business needs",
                        "✅ Latest HR technology integration",
                        "✅ No training or turnover costs",
                        "✅ Proactive compliance management"
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <span className="text-green-400 text-lg md:text-xl mt-1">✅</span>
                          <span className="text-gray-300 leading-relaxed">{item.replace("✅ ", "")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl md:rounded-3xl p-8 md:p-12 border border-blue-200/30">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
                  Ready to experience the difference?
                </h3>
                <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
                  Join hundreds of companies who have transformed their HR with Prachi's innovative approach.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
                  <button 
                    onClick={() => setShowConsultation(true)}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-base md:text-lg"
                  >
                    <svg className="w-5 md:w-6 h-5 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Book Free Consultation
                  </button>
                  <a 
                    href="/contact" 
                    className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl transform hover:scale-105 text-base md:text-lg"
                  >
                    <svg className="w-5 md:w-6 h-5 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Get in Touch
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        {/* Book a Free Consultation - Modern Glassy Pill CTA */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-full max-w-2xl mx-auto px-2"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-full bg-white/95 backdrop-blur-2xl shadow-2xl border border-white/30 px-4 sm:px-10 py-6 hover:shadow-3xl transition-all duration-300 min-h-[90px]">
              <span className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl sm:text-3xl shadow-lg mr-0 sm:mr-4 mb-2 sm:mb-0">🤝</span>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 tracking-tight drop-shadow-lg mb-1">Book a Free Consultation</h2>
                <p className="text-sm sm:text-base text-gray-700">Ready to transform your HR? Get a personalized strategy session with Prachi Shrivastava.</p>
              </div>
              <button
                type="button"
                className="px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-base sm:text-lg shadow-xl hover:scale-105 hover:shadow-3xl transition-all duration-300 flex items-center gap-2 group whitespace-nowrap"
                onClick={() => setShowConsultation(true)}
              >
                <span>Book Now</span>
                <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </motion.div>
        </section>
        <ConsultationModal open={showConsultation} onClose={() => setShowConsultation(false)} />
        <HireWithPrachiFooter />
        <AIChatbotWidget />
      </main>
    </>
  );
} 