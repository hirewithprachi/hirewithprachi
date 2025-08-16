import fs from 'fs';
import path from 'path';

// List of all city pages to clean up
const cityPages = [
  'HRServicesDelhi',
  'HRServicesBangalore',
  'HRServicesChennai',
  'HRServicesPune',
  'HRServicesKolkata',
  'HRServicesAhmedabad',
  'HRServicesBhubaneswar',
  'HRServicesCoimbatore',
  'HRServicesIndore',
  'HRServicesJaipur',
  'HRServicesLucknow',
  'HRServicesNagpur'
];

// City data mapping
const cityDataMapping = {
  'HRServicesDelhi': 'delhi',
  'HRServicesBangalore': 'bangalore',
  'HRServicesChennai': 'chennai',
  'HRServicesPune': 'pune',
  'HRServicesKolkata': 'kolkata',
  'HRServicesAhmedabad': 'ahmedabad',
  'HRServicesBhubaneswar': 'bhubaneswar',
  'HRServicesCoimbatore': 'coimbatore',
  'HRServicesIndore': 'indore',
  'HRServicesJaipur': 'jaipur',
  'HRServicesLucknow': 'lucknow',
  'HRServicesNagpur': 'nagpur'
};

// Function to create clean city page
function createCleanCityPage(cityName, cityKey) {
  const filePath = `src/pages/${cityName}.jsx`;
  
  const cleanContent = `import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HireWithPrachiTopBar from '../components/hirable/HirableTopBar';
import HireWithPrachiHeader from '../components/hirable/HirableHeader';
import HireWithPrachiFooter from '../components/hirable/HirableFooter';
import AIChatbotWidget from '../components/AIChatbotWidget';
import ScrollProgressBar from '../components/ScrollProgressBar';
import BrochureDownloadModal from '../components/BrochureDownloadModal';
import CalendlyBooking from '../components/CalendlyBooking';
import { getCityData } from '../data/cityData';
import PremiumFAQ from '../components/sections/PremiumFAQ';
import PremiumTestimonials from '../components/sections/PremiumTestimonials';
import CityInternalLinks from '../components/sections/CityInternalLinks';
import CityLandingPremium from '../components/CityLandingPremium';
import { CheckCircle, Users, Shield, Zap, Award, MessageSquare, BarChart2, Search, Phone, Mail, ChevronDown, ChevronUp, Download, Calendar, MessageCircle, FileText, MapPin, Building, Briefcase, TrendingUp, Globe, Star, Clock, ArrowRight, Play, Landmark, Home, User, Heart, Eye, AlertTriangle, CheckSquare, ClipboardList, BookOpen, Settings, Target, Rocket, Cpu, Brain, Sparkles, HeartHandshake, Smile, Presentation, PieChart, Activity, Database, KeyRound, UserPlus, FileSpreadsheet, Lightbulb } from 'lucide-react';

export default function ${cityName}() {
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const handleBrochureDownload = () => {
    setShowBrochureModal(true);
  };

  // Get city data
  const cityData = getCityData('${cityKey}');

  // FAQ data for ${cityName.replace('HRServices', '')}
  const faqs = [
    {
      question: "Do you have experience with ${cityName.replace('HRServices', '')}'s business ecosystem?",
      answer: "Yes, we have extensive experience with ${cityName.replace('HRServices', '')}'s unique business landscape and can provide specialized HR solutions tailored to your industry and requirements."
    },
    {
      question: "Can you help with local compliance requirements?",
      answer: "Absolutely! We ensure full compliance with state-specific labor laws and regulations, staying updated with the latest changes affecting businesses in ${cityName.replace('HRServices', '')}."
    },
    {
      question: "What industries do you specialize in?",
      answer: "We serve all major industries in ${cityName.replace('HRServices', '')} including IT, manufacturing, financial services, healthcare, and more, with specialized expertise for each sector."
    },
    {
      question: "How do you handle recruitment for specialized roles?",
      answer: "We have deep expertise in recruiting for specialized roles across various industries, understanding the unique skill requirements and market dynamics in ${cityName.replace('HRServices', '')}."
    },
    {
      question: "Can you help with both startup and enterprise HR needs?",
      answer: "Yes, we serve the full spectrum from early-stage startups to large enterprises, providing customized HR solutions that scale with your business growth."
    },
    {
      question: "What is your approach to employee engagement?",
      answer: "We focus on creating engaging workplace cultures that align with ${cityName.replace('HRServices', '')}'s business environment, helping you attract and retain top talent."
    }
  ];

  // Map local question/answer format to the reusable FAQ section props
  const faqsForSection = faqs.map(({ question, answer }) => ({ q: question, a: answer }));

  return (
    <>
      {/* SEO Metadata */}
      <Helmet>
        <title>HR Services ${cityName.replace('HRServices', '')} - Professional HR Solutions | Hire With Prachi</title>
        <meta name="description" content="Expert HR services in ${cityName.replace('HRServices', '')} for businesses of all sizes. Professional recruitment, compliance, and workforce management solutions." />
        <meta name="keywords" content="hr services ${cityName.replace('HRServices', '').toLowerCase()}, recruitment ${cityName.replace('HRServices', '').toLowerCase()}, hr consultant ${cityName.replace('HRServices', '').toLowerCase()}, workforce management ${cityName.replace('HRServices', '').toLowerCase()}" />
        
        {/* Open Graph */}
        <meta property="og:title" content="HR Services ${cityName.replace('HRServices', '')} - Professional Solutions" />
        <meta property="og:description" content="Specialized HR services for ${cityName.replace('HRServices', '')}'s business community. Expert recruitment, compliance, and workforce management." />
        <meta property="og:type" content="service" />
        <meta property="og:url" content="https://prachi-hr.com/hr-services-${cityName.replace('HRServices', '').toLowerCase()}" />
        <meta property="og:image" content="https://prachi-hr.com/assets/images/hr-services-${cityName.replace('HRServices', '').toLowerCase()}.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://prachi-hr.com/hr-services-${cityName.replace('HRServices', '').toLowerCase()}" />
      </Helmet>

      <ScrollProgressBar />
      <HireWithPrachiTopBar />
      <HireWithPrachiHeader />

      {/* Premium City Landing Component */}
      <CityLandingPremium
        cityName={cityData.name}
        description={cityData.description}
        stats={cityData.stats}
        advantages={cityData.advantages}
        services={cityData.services}
        industries={cityData.industries}
        testimonials={cityData.testimonials}
        onSchedule={() => setShowCalendly(true)}
        onDownload={handleBrochureDownload}
        contactInfo={{
          phone: "+91-8740889927",
          email: "info@hirewithprachi.com"
        }}
      />

      {/* FAQ Section - Premium */}
      <PremiumFAQ
        items={faqsForSection}
        region="${cityName.replace('HRServices', '')}"
        subtitle="Common questions about our HR services specifically for ${cityName.replace('HRServices', '')}'s business ecosystem."
      />

      {/* Internal links to other city pages */}
      <CityInternalLinks />

      <HireWithPrachiFooter />
      <AIChatbotWidget />

      {/* Modals */}
      {showBrochureModal && (
        <BrochureDownloadModal
          isOpen={showBrochureModal}
          onClose={() => setShowBrochureModal(false)}
          brochureType="hr-services-${cityName.replace('HRServices', '').toLowerCase()}"
          title="${cityName.replace('HRServices', '')} HR Guide"
        />
      )}

      {showCalendly && (
        <CalendlyBooking
          isOpen={showCalendly}
          onClose={() => setShowCalendly(false)}
        />
      )}
    </>
  );
}`;

  // Write clean content
  fs.writeFileSync(filePath, cleanContent);
  console.log(`Created clean ${filePath}`);
}

// Clean up all city pages
cityPages.forEach(cityName => {
  const cityKey = cityDataMapping[cityName];
  if (cityKey) {
    createCleanCityPage(cityName, cityKey);
  }
});

console.log('All city pages cleaned up successfully!');
