import React from 'react';
import { Helmet } from 'react-helmet';
import HireWithPrachiTopBar from '../components/hirable/HirableTopBar';
import HireWithPrachiHeader from '../components/hirable/HirableHeader';
import HireWithPrachiHero from '../components/hirable/HirableHero';
import HireWithPrachiAbout from '../components/hirable/HirableAbout';
import HireWithPrachiServices from '../components/hirable/HirableServices';
import ServicesSection from '../components/ServicesSection';
import HireWithPrachiWhyChooseUs from '../components/hirable/HirableWhyChooseUs';
import HireWithPrachiTestimonials from '../components/hirable/HirableTestimonials';
import HireWithPrachiFeatures from '../components/hirable/HirableFeatures';
import HireWithPrachiFAQ from '../components/hirable/HirableFAQ';
import HireWithPrachiBlog from '../components/hirable/HirableBlog';
import HireWithPrachiFooter from '../components/hirable/HirableFooter';
import AIChatbotWidget from '../components/AIChatbotWidget';
import ConsultationModal from '../components/LeadCapturePreview';
import { useState } from 'react';

export default function HireWithPrachiHomepage() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Hire With Prachi - Virtual HR Solutions",
    "alternateName": "Prachi Shrivastava Virtual HR Agency",
    "description": "Expert virtual HR consultant providing professional HR services for startups and SMEs. Remote HR support, compliance expertise, and strategic HR solutions without the overhead of an in-house team.",
    "url": "https://hirewithprachi.com",
    "logo": "https://hirewithprachi.com/logo.png",
    "image": "https://hirewithprachi.com/hero-image.png",
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
      "https://twitter.com/prachi_hr",
      "https://www.facebook.com/hirewithprachi"
    ]
  };

  const [showConsultation, setShowConsultation] = useState(false);
  const openConsultationModal = () => setShowConsultation(true);
  const closeConsultationModal = () => setShowConsultation(false);

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Virtual HR Consultant Prachi Shrivastava | HR Services for Startups & SMEs</title>
        <meta name="title" content="Virtual HR Consultant Prachi Shrivastava | HR Services for Startups & SMEs" />
        <meta name="description" content="Expert virtual HR consultant providing professional HR services for startups and SMEs. Remote HR support, compliance expertise, and strategic HR solutions. Book free consultation today!" />
        <meta name="keywords" content="virtual HR consultant, HR agency, remote HR support, HR services for startups, HR services for SMEs, virtual HR agency, HR Prachi Shrivastava, online HR outsourcing India, freelance HR agency, HR compliance services, employee engagement, recruitment support" />
        <meta name="author" content="Prachi Shrivastava" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hirewithprachi.com/" />
        <meta property="og:title" content="Virtual HR Consultant Prachi Shrivastava | HR Services for Startups & SMEs" />
        <meta property="og:description" content="Expert virtual HR consultant providing professional HR services for startups and SMEs. Remote HR support, compliance expertise, and strategic HR solutions. Book free consultation today!" />
        <meta property="og:image" content="https://hirewithprachi.com/og-image.png" />
        <meta property="og:site_name" content="Hire With Prachi" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://hirewithprachi.com/" />
        <meta property="twitter:title" content="Virtual HR Consultant Prachi Shrivastava | HR Services for Startups & SMEs" />
        <meta property="twitter:description" content="Expert virtual HR consultant providing professional HR services for startups and SMEs. Remote HR support, compliance expertise, and strategic HR solutions." />
        <meta property="twitter:image" content="https://hirewithprachi.com/twitter-image.png" />
        <meta property="twitter:creator" content="@prachi_hr" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Hire With Prachi" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://hirewithprachi.com/" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Additional Structured Data for FAQ */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What services does Prachi Shrivastava offer as a virtual HR consultant?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Prachi offers comprehensive virtual HR services including HR compliance, employee engagement, recruitment support, HR policy development, performance management, and HR cost optimization for startups and SMEs."
                }
              },
              {
                "@type": "Question",
                "name": "How much can I save with virtual HR services?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Virtual HR services can save 40-60% compared to in-house HR teams. Use our HR cost calculator to get a personalized estimate for your business."
                }
              },
              {
                "@type": "Question",
                "name": "Is the initial consultation free?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we offer a free 30-minute HR consultation with no commitment required. Book your session to discuss your HR needs and get expert advice."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-white" role="main">
        <HireWithPrachiTopBar />
        <HireWithPrachiHeader openConsultationModal={openConsultationModal} />
        <HireWithPrachiHero openConsultationModal={openConsultationModal} />
        <HireWithPrachiAbout />
        <HireWithPrachiServices openConsultationModal={openConsultationModal} />
        <ServicesSection />
        <HireWithPrachiWhyChooseUs openConsultationModal={openConsultationModal} />
        <HireWithPrachiTestimonials />
        <HireWithPrachiFeatures openConsultationModal={openConsultationModal} />
        <HireWithPrachiFAQ />
        <HireWithPrachiBlog />
        <HireWithPrachiFooter />
        
        {/* Modern AI Chat Widget */}
        <AIChatbotWidget />
        <ConsultationModal open={showConsultation} onClose={closeConsultationModal} />
      </main>
    </>
  );
} 