import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FileText, Scale, Shield, AlertTriangle, CheckCircle, Mail, Phone } from 'lucide-react';

export default function TermsOfService() {
  const lastUpdated = "January 15, 2025";

  return (
    <>
      <Helmet>
        <title>Terms of Service - Hire With Prachi | Virtual HR Consulting Terms & Conditions</title>
        <meta name="description" content="Terms of service for Hire With Prachi virtual HR consulting services. Understand our service terms, conditions, and policies for HR consulting, POSH training, and compliance services." />
        <meta name="keywords" content="terms of service, HR consulting terms, virtual HR services terms, POSH training terms, HR compliance terms, service conditions, Hire With Prachi terms" />
        <link rel="canonical" href="https://hirewithprachi.com/terms-of-service" />
        <meta property="og:title" content="Terms of Service - Hire With Prachi | Virtual HR Consulting Terms" />
        <meta property="og:description" content="Terms of service for Hire With Prachi virtual HR consulting services. Understand our service terms and conditions." />
        <meta property="og:url" content="https://hirewithprachi.com/terms-of-service" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Terms of Service - Hire With Prachi" />
        <meta name="twitter:description" content="Terms of service for Hire With Prachi virtual HR consulting services." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 py-16 px-4">
        <motion.div 
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-slate-100 p-4 rounded-full">
                <Scale className="w-12 h-12 text-slate-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-xl text-gray-600 mb-4">Professional HR Consulting Services Agreement</p>
            <p className="text-sm text-gray-500">Last Updated: {lastUpdated}</p>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <div className="bg-slate-50 border-l-4 border-slate-500 p-6 rounded-r-lg mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                Welcome to <strong>Hire With Prachi</strong>. These Terms of Service ("Terms") govern your use of our website and virtual HR consulting services. By accessing our website or engaging our services, you agree to be bound by these Terms and our Privacy Policy.
              </p>
            </div>
          </section>

          {/* Service Overview */}
          <section className="mb-10">
            <div className="flex items-center mb-6">
              <FileText className="w-6 h-6 text-slate-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Our Services</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Virtual HR Consulting</h3>
                <ul className="list-disc list-inside text-blue-700 space-y-1 text-sm">
                  <li>Strategic HR planning and implementation</li>
                  <li>HR policy development and documentation</li>
                  <li>Compliance audits and risk assessment</li>
                  <li>Employee engagement and retention strategies</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-3">POSH Training & Compliance</h3>
                <ul className="list-disc list-inside text-green-700 space-y-1 text-sm">
                  <li>Prevention of Sexual Harassment training</li>
                  <li>POSH policy development and implementation</li>
                  <li>Internal Committee formation and training</li>
                  <li>Compliance documentation and reporting</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">Recruitment Services</h3>
                <ul className="list-disc list-inside text-purple-700 space-y-1 text-sm">
                  <li>End-to-end recruitment solutions</li>
                  <li>Candidate sourcing and screening</li>
                  <li>Interview coordination and assessment</li>
                  <li>Onboarding process optimization</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                <h3 className="text-lg font-semibold text-orange-800 mb-3">HR Tools & Resources</h3>
                <ul className="list-disc list-inside text-orange-700 space-y-1 text-sm">
                  <li>HR calculators and assessment tools</li>
                  <li>Policy templates and documentation</li>
                  <li>Training materials and resources</li>
                  <li>Compliance checklists and guides</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Terms of Use */}
          <section className="mb-10">
            <div className="flex items-center mb-6">
              <Shield className="w-6 h-6 text-slate-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Terms of Use</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Acceptance of Terms</h3>
                <p className="text-gray-700 mb-3">
                  By accessing our website or engaging our services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
                </p>
                <p className="text-gray-700">
                  These Terms apply to all users, including clients, website visitors, and service recipients.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Service Engagement</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Services are provided based on mutual agreement and signed contracts</li>
                  <li>Service scope, deliverables, and timelines are defined in individual service agreements</li>
                  <li>All services are subject to our professional standards and industry best practices</li>
                  <li>Client cooperation and timely information sharing are essential for service delivery</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Professional Standards</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>All services are provided in accordance with applicable laws and regulations</li>
                  <li>We maintain strict confidentiality and data protection standards</li>
                  <li>Our recommendations are based on professional expertise and industry best practices</li>
                  <li>We reserve the right to decline services that conflict with legal or ethical standards</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Payment Terms */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Terms & Conditions</h2>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-lg border border-green-200">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-4">Payment Schedule</h3>
                  <ul className="list-disc list-inside text-green-700 space-y-2">
                    <li>Consultation fees are due upon booking</li>
                    <li>Project-based services require 50% advance payment</li>
                    <li>Monthly retainer services are billed in advance</li>
                    <li>Additional services are billed separately</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-4">Payment Methods</h3>
                  <ul className="list-disc list-inside text-green-700 space-y-2">
                    <li>Bank transfer (NEFT/RTGS/UPI)</li>
                    <li>Online payment gateways</li>
                    <li>Digital wallets and payment apps</li>
                    <li>Cheque payments (for corporate clients)</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-100 rounded-lg">
                <p className="text-green-800 text-sm">
                  <strong>Late Payment:</strong> Overdue payments may incur a 2% monthly service charge. Services may be suspended for accounts overdue by more than 30 days.
                </p>
              </div>
            </div>
          </section>

          {/* Limitations & Disclaimers */}
          <section className="mb-10">
            <div className="flex items-center mb-6">
              <AlertTriangle className="w-6 h-6 text-amber-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Limitations & Disclaimers</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                <h3 className="text-lg font-semibold text-amber-800 mb-3">Service Limitations</h3>
                <ul className="list-disc list-inside text-amber-700 space-y-1 text-sm">
                  <li>Our services are advisory in nature and do not constitute legal advice</li>
                  <li>Implementation success depends on client cooperation and external factors</li>
                  <li>We cannot guarantee specific outcomes or results from our recommendations</li>
                  <li>Compliance with local laws and regulations remains the client's responsibility</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h3 className="text-lg font-semibold text-red-800 mb-3">Liability Limitations</h3>
                <ul className="list-disc list-inside text-red-700 space-y-1 text-sm">
                  <li>Our liability is limited to the fees paid for the specific service</li>
                  <li>We are not liable for indirect, consequential, or punitive damages</li>
                  <li>Force majeure events may affect service delivery without liability</li>
                  <li>Client must notify us of any issues within 30 days of service delivery</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Intellectual Property Rights</h2>
            
            <div className="bg-indigo-50 p-8 rounded-lg border border-indigo-200">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-indigo-800 mb-4">Our Rights</h3>
                  <ul className="list-disc list-inside text-indigo-700 space-y-2">
                    <li>All methodologies, templates, and tools remain our property</li>
                    <li>Website content, logos, and branding are protected by copyright</li>
                    <li>Proprietary processes and frameworks are confidential</li>
                    <li>Client testimonials and case studies may be used for marketing</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-indigo-800 mb-4">Client Rights</h3>
                  <ul className="list-disc list-inside text-indigo-700 space-y-2">
                    <li>Customized deliverables become client property upon payment</li>
                    <li>Client data and confidential information remain client property</li>
                    <li>Right to use our recommendations for internal purposes</li>
                    <li>License to use templates and tools as specified in agreements</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Termination */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Termination</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">By Client</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>30-day written notice for ongoing services</li>
                  <li>Immediate termination with full payment for completed work</li>
                  <li>No refund for advance payments unless specified in contract</li>
                  <li>Return of confidential materials within 7 days</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">By Hire With Prachi</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Immediate termination for breach of terms</li>
                  <li>30-day notice for convenience termination</li>
                  <li>Refund of unused advance payments</li>
                  <li>Completion of work in progress at our discretion</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Governing Law */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Governing Law & Dispute Resolution</h2>
            
            <div className="bg-slate-50 p-8 rounded-lg border border-slate-200">
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Jurisdiction</h3>
                    <p className="text-slate-700">These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Dispute Resolution</h3>
                    <p className="text-slate-700">We encourage amicable resolution of disputes through direct communication. If necessary, disputes may be resolved through mediation or arbitration as per Indian Arbitration and Conciliation Act, 2015.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-8 rounded-lg border">
              <p className="text-gray-700 mb-6">For questions about these Terms of Service or our services, please contact us:</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-slate-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-slate-600">prachi@rejoin.co.in</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-slate-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-800">Phone</p>
                    <p className="text-slate-600">+91 87408 89927</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-slate-100 rounded-lg">
                <p className="text-slate-800 text-sm">
                  <strong>Business Hours:</strong> Monday to Friday, 9:00 AM to 6:00 PM IST<br />
                  <strong>Response Time:</strong> We respond to inquiries within 24-48 hours<br />
                  <strong>Emergency Support:</strong> Available for existing clients during service delivery
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              These Terms of Service are effective as of {lastUpdated} and may be updated periodically. 
              We will notify clients of material changes via email or website notice.
            </p>
            <p className="text-xs text-gray-400">
              By continuing to use our services after changes are posted, you agree to the updated Terms.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}