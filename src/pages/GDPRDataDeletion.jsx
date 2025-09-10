import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Trash2, CheckCircle, AlertTriangle, Shield, Info, Clock, FileText, Mail, Phone } from 'lucide-react';
import { formSubmission } from '../lib/supabase';

export default function GDPRDataDeletion() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Submit to Supabase (which also sends to HubSpot)
    formSubmission.submitGDPRForm(formData)
      .then(result => {
        if (result.success) {
          setIsSubmitted(true);
          setFormData({
            name: '',
            email: '',
            reason: '',
            additionalInfo: ''
          });
          
          // Reset form after 5 seconds
          setTimeout(() => {
            setIsSubmitted(false);
          }, 5000);
        } else {
          setError(result.error || 'Failed to submit request. Please try again.');
        }
      })
      .catch(error => {
        console.error('GDPR form submission error:', error);
        setError('An error occurred. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  if (isSubmitted) {
    return (
      <div className="bg-green-100 text-green-700 rounded-xl p-6 text-center font-semibold">
        <CheckCircle className="inline-block mr-2" />
        Thank you! Your data deletion request has been received.
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>GDPR Data Deletion Request - Hire With Prachi | Exercise Your Data Rights</title>
        <meta name="description" content="Exercise your GDPR data deletion rights with Hire With Prachi. Request removal of personal data from our HR consulting services. Secure, compliant, and processed within 30 days." />
        <meta name="keywords" content="GDPR data deletion, right to be forgotten, data privacy, personal data removal, HR consulting data rights, GDPR compliance, data protection" />
        <link rel="canonical" href="https://hirewithprachi.com/gdpr-data-deletion" />
        <meta property="og:title" content="GDPR Data Deletion Request - Hire With Prachi" />
        <meta property="og:description" content="Exercise your GDPR data deletion rights. Request removal of personal data from our HR consulting services." />
        <meta property="og:url" content="https://hirewithprachi.com/gdpr-data-deletion" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="GDPR Data Deletion Request - Hire With Prachi" />
        <meta name="twitter:description" content="Exercise your GDPR data deletion rights with our secure request form." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 p-4 rounded-full">
                <Trash2 className="w-12 h-12 text-red-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">GDPR Data Deletion Request</h1>
            <p className="text-xl text-gray-600 mb-4">Exercise Your Right to Be Forgotten</p>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto">
              Under the General Data Protection Regulation (GDPR), you have the right to request deletion of your personal data. 
              We are committed to processing your request promptly and securely.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Information Section */}
            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center mb-6">
                <Shield className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Your Data Rights</h2>
              </div>

              {/* What Data We Collect */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Info className="w-5 h-5 text-blue-600 mr-2" />
                  What Data We May Have
                </h3>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <ul className="list-disc list-inside text-blue-700 space-y-2 text-sm">
                    <li>Contact information (name, email, phone number)</li>
                    <li>Professional details (company, job title, industry)</li>
                    <li>Service inquiry and consultation records</li>
                    <li>Communication history and preferences</li>
                    <li>Website usage data and analytics</li>
                    <li>Training attendance and certification records</li>
                    <li>Payment and billing information</li>
                  </ul>
                </div>
              </div>

              {/* Process Timeline */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Clock className="w-5 h-5 text-green-600 mr-2" />
                  Deletion Process Timeline
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-green-100 rounded-full p-2 mr-4 mt-1">
                      <span className="text-green-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Request Received</h4>
                      <p className="text-gray-600 text-sm">We acknowledge your request within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 rounded-full p-2 mr-4 mt-1">
                      <span className="text-green-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Identity Verification</h4>
                      <p className="text-gray-600 text-sm">We verify your identity to protect your data (1-3 days)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 rounded-full p-2 mr-4 mt-1">
                      <span className="text-green-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Data Review & Deletion</h4>
                      <p className="text-gray-600 text-sm">We locate and securely delete your data (5-25 days)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 rounded-full p-2 mr-4 mt-1">
                      <span className="text-green-600 font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Confirmation</h4>
                      <p className="text-gray-600 text-sm">We confirm completion of your request</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                <h3 className="text-lg font-semibold text-amber-800 mb-3 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Important Notes
                </h3>
                <ul className="list-disc list-inside text-amber-700 space-y-1 text-sm">
                  <li>Some data may be retained for legal compliance purposes</li>
                  <li>Anonymized data used for analytics may not be deletable</li>
                  <li>Active service contracts may require data retention</li>
                  <li>Financial records may be kept for tax and audit purposes</li>
                  <li>You can request a data export before deletion</li>
                </ul>
              </div>

              {/* Contact Information */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-600 mr-3" />
                    <span className="text-gray-700 text-sm">prachi@rejoin.co.in</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-600 mr-3" />
                    <span className="text-gray-700 text-sm">+91 87408 89927</span>
                  </div>
                </div>
                <p className="text-gray-600 text-xs mt-3">
                  Our Data Protection Officer is available to assist with your request
                </p>
              </div>
            </motion.div>

            {/* Request Form */}
            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center mb-6">
                <FileText className="w-6 h-6 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Submit Deletion Request</h2>
              </div>

              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
      <input
        name="name"
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleInputChange}
        required
        className="mb-4 px-4 py-3 rounded-lg border w-full"
      />
      <input
        name="email"
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleInputChange}
        required
        className="mb-4 px-4 py-3 rounded-lg border w-full"
      />
      <textarea
        name="reason"
        placeholder="Reason for deletion (required)"
        value={formData.reason}
        onChange={handleInputChange}
        rows={4}
        className="mb-6 px-4 py-3 rounded-lg border w-full"
        required
      />
      <textarea
        name="additionalInfo"
        placeholder="Additional information (optional)"
        value={formData.additionalInfo}
        onChange={handleInputChange}
        rows={4}
        className="mb-6 px-4 py-3 rounded-lg border w-full"
      />
      <button
        type="submit"
        className="w-full px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="ml-2">Submitting...</span>
          </div>
        ) : (
          'Submit Request'
        )}
      </button>
                {error && (
                  <div className="mt-4 text-red-500 text-center">
                    <AlertTriangle className="inline-block mr-2" />
                    {error}
                  </div>
                )}
              </motion.form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}