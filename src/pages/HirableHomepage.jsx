import React, { useState } from 'react';
import SEOOptimizer from '../components/SEOOptimizer';
import HireWithPrachiTopBar from '../components/hirable/HirableTopBar';
import HireWithPrachiHeader from '../components/hirable/HirableHeader';
import HireWithPrachiHero from '../components/hirable/HirableHero';
import HireWithPrachiAbout from '../components/hirable/HirableAbout';
import ServicesSection from '../components/ServicesSection';
import HireWithPrachiWhyChooseUs from '../components/hirable/HirableWhyChooseUs';
import HireWithPrachiTestimonials from '../components/hirable/HirableTestimonials';
import HireWithPrachiFeatures from '../components/hirable/HirableFeatures';

import HireWithPrachiBlog from '../components/hirable/HirableBlog';
import HireWithPrachiFooter from '../components/hirable/HirableFooter';
import GPT4oMiniChatbot from '../components/GPT4oMiniChatbot';
import ConsultationModal from '../components/LeadCapturePreview';
import { generalFaqs } from '../data/faqData';

export default function HireWithPrachiHomepage() {
  // SEO Data for Homepage
  const seoData = {
    title: "Hire With Prachi - Leading Virtual HR Consultant in India",
    description: "Expert virtual HR services for startups and SMEs across India. HR compliance, recruitment, payroll, and employee engagement solutions.",
    keywords: "virtual HR consultant, HR services India, startup HR, SME HR, HR compliance, recruitment services",
    pageType: "homepage",
    pageData: {
      title: "Hire With Prachi - Leading Virtual HR Consultant",
      description: "Expert virtual HR services for startups and SMEs across India",
      image: "https://www.hirewithprachi.com/assets/images/homepage-1200x630.jpg"
    }
  };
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Hire With Prachi - Virtual HR Solutions",
    "alternateName": "Prachi Shrivastava Virtual HR Agency",
    "description": "Expert virtual HR consultant providing professional HR services for startups and SMEs. Remote HR support, compliance expertise, and strategic HR solutions without the overhead of an in-house team.",
    "url": "https://www.hirewithprachi.com",
    "logo": "https://www.hirewithprachi.com/logo.png",
    "image": "https://www.hirewithprachi.com/hero-image.png",
    "telephone": "+91-87408-89927",
    "email": "info@hirewithprachi.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressRegion": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "20.5937",
      "longitude": "78.9629"
    },
    "priceRange": "Contact for pricing",
    "currenciesAccepted": "INR, USD",
    "paymentAccepted": "Bank Transfer, Digital Payment",
    "areaServed": ["India", "United States", "United Kingdom", "Canada", "Australia"],
    "serviceType": [
      "Virtual HR Consulting",
      "HR Compliance Services",
      "Employee Engagement",
      "Recruitment Support",
      "HR Policy Development",
      "Performance Management",
      "HR Cost Optimization"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Virtual HR Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "HR Cost Calculator",
            "description": "Calculate your HR operational costs and discover potential savings"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Salary Calculator",
            "description": "Determine competitive salary ranges for optimal hiring"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Compliance Risk Checker",
            "description": "Assess HR compliance status and identify potential risks"
          }
        }
      ]
    },
    "founder": {
      "@type": "Person",
      "name": "Prachi Shrivastava",
      "jobTitle": "Virtual HR Consultant",
      "description": "Expert HR professional with 8+ years of experience in virtual HR services",
      "knowsAbout": ["Human Resources", "HR Compliance", "Employee Engagement", "Recruitment", "HR Strategy"]
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah Johnson"
        },
        "reviewBody": "Prachi's virtual HR services transformed our startup. Her expertise in HR compliance and policy development saved us countless hours and potential legal issues."
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Michael Chen"
        },
        "reviewBody": "Working with Prachi as our virtual HR consultant has been game-changing. Her remote HR support is professional, efficient, and cost-effective."
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://www.linkedin.com/in/prachi-shrivastava-hr",
              "https://www.facebook.com/hirewithprachi/",
      "https://www.facebook.com/hirewithprachi"
    ]
  };

  const [showConsultation, setShowConsultation] = useState(false);
  const openConsultationModal = () => setShowConsultation(true);
  const closeConsultationModal = () => setShowConsultation(false);

  return (
    <>
      {/* Comprehensive SEO Optimization */}
      <SEOOptimizer
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        image={seoData.pageData.image}
        pageType="organization"
        pageData={{
          ...seoData.pageData,
          structuredData: structuredData
        }}
        canonical="https://www.hirewithprachi.com/"
      />

      <main className="min-h-screen bg-white" role="main">
        <HireWithPrachiTopBar />
        <HireWithPrachiHeader openConsultationModal={openConsultationModal} />
        <HireWithPrachiHero openConsultationModal={openConsultationModal} />
        <HireWithPrachiAbout />
        <ServicesSection />
        <HireWithPrachiWhyChooseUs openConsultationModal={openConsultationModal} />
        <HireWithPrachiTestimonials />
        <HireWithPrachiFeatures openConsultationModal={openConsultationModal} />

        {/* Home Page FAQ Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Frequently Asked Questions
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Common <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Questions</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Get answers to the most frequently asked questions about our virtual HR services
              </p>
            </div>

            {/* FAQ Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              {(showAllFaqs ? generalFaqs : generalFaqs.slice(0, 6)).map((faq, index) => (
                <div
                  key={index}
                  className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-500"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left flex items-start justify-between gap-4 group"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 pr-4">
                      {faq.q}
                    </h3>
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center transition-transform duration-300 ${openFaq === index ? 'rotate-45' : ''}`}>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </button>
                  
                  {openFaq === index && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* View All FAQ Button */}
            {!showAllFaqs && (
              <div className="text-center">
                <button
                  onClick={() => setShowAllFaqs(true)}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span>View All FAQ</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}

            {/* Show Less Button */}
            {showAllFaqs && (
              <div className="text-center">
                <button
                  onClick={() => setShowAllFaqs(false)}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-4 rounded-2xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span>Show Less</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </section>

        <HireWithPrachiBlog />
        <HireWithPrachiFooter />
        
        {/* Modern AI Chat Widget */}
        <GPT4oMiniChatbot />
        <ConsultationModal open={showConsultation} onClose={closeConsultationModal} />
      </main>
    </>
  );
} 