import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Mail, Phone } from 'lucide-react';

export default function PrivacyPolicy() {
  const lastUpdated = "January 15, 2025";

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Hire With Prachi | Data Protection & Privacy Rights</title>
        <meta name="description" content="Comprehensive privacy policy for Hire With Prachi HR services. Learn how we protect your personal data, GDPR compliance, and your privacy rights when using our virtual HR consulting services." />
        <meta name="keywords" content="privacy policy, data protection, GDPR compliance, personal data, privacy rights, HR services privacy, virtual HR consulting privacy, Hire With Prachi privacy" />
        <link rel="canonical" href="https://hirewithprachi.com/privacy-policy" />
        <meta property="og:title" content="Privacy Policy - Hire With Prachi | Data Protection & Privacy Rights" />
        <meta property="og:description" content="Comprehensive privacy policy for Hire With Prachi HR services. Learn how we protect your personal data and your privacy rights." />
        <meta property="og:url" content="https://hirewithprachi.com/privacy-policy" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Privacy Policy - Hire With Prachi" />
        <meta name="twitter:description" content="Learn how we protect your personal data and privacy rights at Hire With Prachi." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
        <motion.div 
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full">
                <Shield className="w-12 h-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-600 mb-4">Your Privacy is Our Priority</p>
            <p className="text-sm text-gray-500">Last Updated: {lastUpdated}</p>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                At <strong>Hire With Prachi</strong>, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our virtual HR consulting services.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="mb-10">
            <div className="flex items-center mb-6">
              <Eye className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Name, email address, and phone number</li>
                  <li>Company name and job title</li>
                  <li>Business requirements and HR needs</li>
                  <li>Communication preferences</li>
                  <li>Payment and billing information (when applicable)</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Automatically Collected Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>IP address and browser information</li>
                  <li>Device type and operating system</li>
                  <li>Website usage patterns and analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Referral sources and page interactions</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-10">
            <div className="flex items-center mb-6">
              <FileText className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-3">Service Delivery</h3>
                <ul className="list-disc list-inside text-green-700 space-y-1 text-sm">
                  <li>Provide HR consulting services</li>
                  <li>Respond to inquiries and requests</li>
                  <li>Schedule consultations and meetings</li>
                  <li>Deliver customized HR solutions</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">Communication</h3>
                <ul className="list-disc list-inside text-purple-700 space-y-1 text-sm">
                  <li>Send service updates and newsletters</li>
                  <li>Provide customer support</li>
                  <li>Share relevant HR insights and resources</li>
                  <li>Process feedback and testimonials</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                <h3 className="text-lg font-semibold text-orange-800 mb-3">Website Improvement</h3>
                <ul className="list-disc list-inside text-orange-700 space-y-1 text-sm">
                  <li>Analyze website performance</li>
                  <li>Enhance user experience</li>
                  <li>Optimize content and services</li>
                  <li>Conduct market research</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h3 className="text-lg font-semibold text-red-800 mb-3">Legal Compliance</h3>
                <ul className="list-disc list-inside text-red-700 space-y-1 text-sm">
                  <li>Comply with legal obligations</li>
                  <li>Protect against fraud and abuse</li>
                  <li>Enforce terms and conditions</li>
                  <li>Resolve disputes and claims</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Protection */}
          <section className="mb-10">
            <div className="flex items-center mb-6">
              <Lock className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Data Protection & Security</h2>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg border border-blue-200">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">Security Measures</h3>
                  <ul className="list-disc list-inside text-blue-700 space-y-2">
                    <li>SSL encryption for data transmission</li>
                    <li>Secure cloud storage with access controls</li>
                    <li>Regular security audits and updates</li>
                    <li>Employee training on data protection</li>
                    <li>Multi-factor authentication systems</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">GDPR Compliance</h3>
                  <ul className="list-disc list-inside text-blue-700 space-y-2">
                    <li>Lawful basis for data processing</li>
                    <li>Data minimization principles</li>
                    <li>Right to access and portability</li>
                    <li>Right to rectification and erasure</li>
                    <li>Data breach notification procedures</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Third-Party Services */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Third-Party Services</h2>
            
            <div className="space-y-4">
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">Analytics & Tracking</h3>
                <p className="text-yellow-700 mb-3">We use Google Analytics, Facebook Pixel, and similar services to understand website usage and improve our services.</p>
                <p className="text-sm text-yellow-600">You can opt-out of tracking through browser settings or privacy tools.</p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-3">Communication Tools</h3>
                <p className="text-green-700 mb-3">We use Formspree, Calendly, and email services to facilitate communication and scheduling.</p>
                <p className="text-sm text-green-600">These services have their own privacy policies and security measures.</p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Privacy Rights</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-indigo-50 p-6 rounded-lg text-center border border-indigo-200">
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-indigo-800 mb-2">Access</h3>
                <p className="text-indigo-700 text-sm">Request access to your personal data we hold</p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg text-center border border-green-200">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Rectification</h3>
                <p className="text-green-700 text-sm">Correct inaccurate or incomplete information</p>
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg text-center border border-red-200">
                <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">Erasure</h3>
                <p className="text-red-700 text-sm">Request deletion of your personal data</p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
            
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-8 rounded-lg border">
              <p className="text-gray-700 mb-6">If you have any questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-blue-600">prachi@rejoin.co.in</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-800">Phone</p>
                    <p className="text-blue-600">+91 87408 89927</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-100 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Data Protection Officer:</strong> Prachi Shrivastava<br />
                  <strong>Response Time:</strong> We will respond to privacy requests within 30 days<br />
                  <strong>GDPR Requests:</strong> Use our <a href="/gdpr-data-deletion" className="underline hover:text-blue-900">GDPR Data Deletion form</a>
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              This Privacy Policy is effective as of {lastUpdated} and may be updated periodically. 
              Continued use of our services constitutes acceptance of any changes.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}