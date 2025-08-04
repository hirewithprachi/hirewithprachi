import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HireWithPrachiTopBar from '../components/hirable/HirableTopBar';
import HireWithPrachiHeader from '../components/hirable/HirableHeader';
import HireWithPrachiFooter from '../components/hirable/HirableFooter';
import AIChatbotWidget from '../components/AIChatbotWidget';
import ScrollProgressBar from '../components/ScrollProgressBar';
import BrochureDownloadModal from '../components/BrochureDownloadModal';
import { CheckCircle, Users, Shield, Zap, Award, MessageSquare, BarChart2, Search, Phone, Mail, ChevronDown, ChevronUp, Download, Calendar, MessageCircle, Target, UserPlus, Briefcase } from 'lucide-react';

export default function RecruitmentService() {
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleBrochureDownload = () => {
    setShowBrochureModal(true);
  };

  return (
    <>
      <Helmet>
        <title>Strategic Recruitment & Hiring Services | Expert Talent Acquisition India</title>
        <meta name="description" content="End-to-end recruitment solutions including job description optimization, candidate sourcing, interview management, and onboarding programs. Build your dream team efficiently." />
      </Helmet>

      <main className="min-h-screen bg-white" role="main">
        <ScrollProgressBar />
        <HireWithPrachiTopBar />
        <HireWithPrachiHeader />
        
        {/* Enhanced Page Header Section - Mobile Optimized */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 md:w-80 md:h-80 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
            {/* Breadcrumb - Mobile Optimized */}
            <nav className="mb-6 md:mb-8">
              <ol className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm flex-wrap">
                <li>
                  <Link to="/" className="text-blue-200 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-blue-300">/</li>
                <li>
                  <Link to="/services" className="text-blue-200 hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li className="text-blue-300">/</li>
                <li className="text-white font-medium truncate">Strategic Recruitment & Hiring</li>
              </ol>
            </nav>
            
            {/* Service Title with Enhanced Design - Mobile Optimized */}
            <div className="max-w-5xl">
              <div className="inline-flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full border border-white/20 mb-4 md:mb-6">
                <UserPlus className="w-4 h-4 md:w-5 md:h-5 text-blue-200" />
                <span className="text-blue-200 text-xs md:text-sm font-semibold uppercase tracking-widest">Talent Acquisition</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                Strategic Recruitment & 
                <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent"> Hiring</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 leading-relaxed mb-6 md:mb-8 max-w-4xl">
                End-to-end recruitment solutions to build your dream team. From talent sourcing to onboarding, we help you find and hire the best candidates for your organization.
              </p>
              
              {/* Key Benefits - Mobile Optimized */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
                  <UserPlus className="w-6 h-6 md:w-8 md:h-8 text-blue-300 mb-2" />
                  <h3 className="font-semibold text-white mb-1 text-sm md:text-base">Talent Sourcing</h3>
                  <p className="text-blue-200 text-xs md:text-sm">Access to extensive candidate networks</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
                  <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-blue-300 mb-2" />
                  <h3 className="font-semibold text-white mb-1 text-sm md:text-base">Expert Screening</h3>
                  <p className="text-blue-200 text-xs md:text-sm">Rigorous candidate evaluation</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20 sm:col-span-2 md:col-span-1">
                  <Target className="w-6 h-6 md:w-8 md:h-8 text-blue-300 mb-2" />
                  <h3 className="font-semibold text-white mb-1 text-sm md:text-base">Quality Hires</h3>
                  <p className="text-blue-200 text-xs md:text-sm">95% success rate guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Hero Image Section with Real Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src="/assets/images/services/recruitment-service.webp" 
                    alt="Recruitment Process Outsourcing - End-to-end hiring solutions for startups and SMEs in India by Prachi Shrivastava"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Service Overview Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Service Overview</h2>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-gray-700 leading-relaxed text-lg mb-6">
                      End-to-end recruitment solutions including job description optimization, candidate sourcing, interview management, and onboarding programs. Build your dream team efficiently with our expert recruitment services.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Job Description Optimization</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Candidate Sourcing & Screening</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Interview Process Design</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Key Highlights</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700">50% Faster Hiring</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700">₹15K Per Hire</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700">95% Success Rate</span>
                      </div>
                    </div>
                  </div>
                </div>
            </motion.div>

              {/* Why Choose Us Section */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Recruitment Services?</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { icon: Target, title: 'Expert Sourcing', desc: 'Access to top talent pools' },
                    { icon: UserPlus, title: 'Fast Hiring', desc: '50% faster recruitment' },
                    { icon: Zap, title: 'Quality Focus', desc: '95% success rate' },
                    { icon: Award, title: 'Cost Effective', desc: '₹15K per hire' },
                    { icon: MessageSquare, title: '24/7 Support', desc: 'Round-the-clock assistance' },
                    { icon: BarChart2, title: 'Proven Results', desc: '500+ successful hires' }
                  ].map((item, index) => (
                    <div key={index} className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <item.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
              ))}
            </div>
              </motion.div>

              {/* Supporting Imagery Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid md:grid-cols-2 gap-6"
              >
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Data-Driven Approach</h3>
                  <p className="text-gray-600">We use analytics and insights to deliver optimal results for your business.</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center">
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Customized Solutions</h3>
                  <p className="text-gray-600">Tailored strategies that align with your specific business needs and goals.</p>
                </div>
            </motion.div>

              {/* Service-Specific Description */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Strategic Recruitment & Hiring Solutions</h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-8">
                  Our recruitment services are designed to help you build high-performing teams efficiently and cost-effectively. We combine proven methodologies with cutting-edge technology to deliver exceptional candidates who drive your business success.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Job Description Optimization</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Candidate Sourcing & Screening</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Interview Process Design</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Background Verification</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Onboarding Support</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Our Process</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Requirement Analysis</h4>
                          <p className="text-gray-600 text-sm">Understand your hiring needs and company culture</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Candidate Sourcing</h4>
                          <p className="text-gray-600 text-sm">Find qualified candidates from multiple channels</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Screening & Shortlisting</h4>
                          <p className="text-gray-600 text-sm">Evaluate candidates and present top matches</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Interview & Selection</h4>
                          <p className="text-gray-600 text-sm">Facilitate interviews and final selection</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </motion.div>

              {/* Enhanced FAQ Accordion Section with 6 FAQs - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Frequently Asked Questions</h2>
                <div className="space-y-3 md:space-y-4">
                  {[
                    { q: 'What recruitment services do you offer?', a: 'We offer end-to-end recruitment services including job description optimization, candidate sourcing, screening, interview management, and onboarding support.' },
                    { q: 'How fast can you hire candidates?', a: 'We typically reduce hiring time by 50% compared to traditional methods, with most positions filled within 2-4 weeks.' },
                    { q: 'What industries do you recruit for?', a: 'We recruit across all industries including IT, manufacturing, finance, healthcare, and startups.' },
                    { q: 'How much do recruitment services cost?', a: 'Our recruitment services start at ₹15,000 per hire with flexible pricing based on position level and requirements.' },
                    { q: 'Do you guarantee candidate quality?', a: 'Yes, we offer a 95% success rate with replacement guarantees if candidates don\'t meet expectations.' },
                    { q: 'What is your recruitment process?', a: 'Our process includes job analysis, targeted sourcing, multi-stage screening, competency-based interviews, reference checks, and comprehensive onboarding support.' }
                  ].map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full px-4 md:px-6 py-3 md:py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                      >
                        <span className="font-semibold text-gray-900 text-sm md:text-base pr-2">{faq.q}</span>
                        {openFaq === index ? (
                          <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-gray-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-gray-600 flex-shrink-0" />
                        )}
                      </button>
                      {openFaq === index && (
                        <div className="px-4 md:px-6 py-3 md:py-4 bg-white">
                          <p className="text-gray-700 text-sm md:text-base">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar Section - Mobile Optimized */}
            <div className="space-y-4 md:space-y-6">
              {/* Service List */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6"
              >
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Our Services</h3>
                <div className="space-y-2 md:space-y-3">
                  {[
                    {
                      id: 'hr-compliance',
                      title: 'HR Compliance & Legal Services',
                      description: 'Comprehensive compliance management to keep your business legally protected',
                      icon: '⚖️',
                      link: '/services/hr-compliance'
                    },
                    {
                      id: 'recruitment',
                      title: 'Strategic Recruitment & Hiring',
                      description: 'End-to-end recruitment solutions to build your dream team',
                      icon: '🎯',
                      link: '/services/recruitment-hiring'
                    },
                    {
                      id: 'employee-engagement',
                      title: 'Employee Engagement & Culture',
                      description: 'Build a thriving workplace culture that retains top talent',
                      icon: '❤️',
                      link: '/services/employee-engagement'
                    }
                  ].map((service) => (
                    <Link
                      key={service.id}
                      to={service.link}
                      className={`block p-2 md:p-3 rounded-lg transition-colors ${
                        service.id === 'recruitment'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 md:gap-3">
                        <span className="text-xl md:text-2xl">{service.icon}</span>
                        <div>
                          <h4 className="font-semibold text-xs md:text-sm">{service.title}</h4>
                          <p className="text-xs text-gray-500">{service.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6"
              >
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Search Services</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for services..."
                    className="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
              </motion.div>

              {/* Download Brochure */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl md:rounded-2xl p-4 md:p-6 text-white"
              >
                <div className="text-center">
                  <Download className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 md:mb-4" />
                  <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Download Brochure</h3>
                  <p className="text-blue-100 text-sm md:text-base mb-3 md:mb-4">Get detailed information about our Recruitment services</p>
                  <button 
                    onClick={handleBrochureDownload}
                    className="w-full bg-white text-blue-600 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base"
                  >
                    Download PDF
                  </button>
                </div>
              </motion.div>

              {/* Contact Widget */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6"
              >
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Need Help?</h3>
                <div className="space-y-3 md:space-y-4">
                  <a
                    href="tel:+918740889927"
                    className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Phone className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="font-semibold text-sm md:text-base">Call Us</span>
                  </a>
                  <a
                    href="https://wa.me/918740889927"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="font-semibold text-sm md:text-base">WhatsApp</span>
                  </a>
                  <a
                    href="mailto:info@hirewithprachi.com"
                    className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Mail className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="font-semibold text-sm md:text-base">Email Us</span>
                  </a>
                </div>
              </motion.div>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl md:rounded-2xl p-4 md:p-6 text-white"
              >
                <div className="text-center">
                  <Calendar className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 md:mb-4" />
                  <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Talk to our Experts</h3>
                  <p className="text-purple-100 text-sm md:text-base mb-3 md:mb-4">Get a free recruitment consultation and personalized quote</p>
                  <a
                    href="/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-white text-purple-600 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base"
                  >
                    Book Free Consultation
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <HireWithPrachiFooter />
        <AIChatbotWidget />
        
        {/* Brochure Download Modal */}
        <BrochureDownloadModal
          isOpen={showBrochureModal}
          onClose={() => setShowBrochureModal(false)}
          serviceName="Strategic Recruitment & Hiring"
          brochureUrl="/downloads/recruitment-brochure.pdf"
        />
      </main>
    </>
  );
} 