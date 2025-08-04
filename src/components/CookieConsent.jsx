import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Settings, Check } from 'lucide-react';
import analytics from '../lib/analytics';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consentSettings, setConsentSettings] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem('analytics_consent');
    const cookieConsent = localStorage.getItem('cookie_consent');
    
    // Show consent banner if no consent has been given
    if (hasConsent === null && cookieConsent === null) {
      setShowConsent(true);
    } else if (cookieConsent) {
      // If cookie consent exists, parse it and set analytics consent accordingly
      try {
        const consentData = JSON.parse(cookieConsent);
        if (consentData.analytics) {
          analytics.setUserConsent(true);
        }
      } catch (error) {
        console.error('Error parsing cookie consent:', error);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    console.log('Accept All clicked');
    
    setConsentSettings({
      necessary: true,
      analytics: true,
      marketing: true
    });
    
    // Set analytics consent
    analytics.setUserConsent(true);
    
    // Store cookie consent
    const consentData = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('cookie_consent', JSON.stringify(consentData));
    localStorage.setItem('analytics_consent', 'true');
    
    console.log('Cookie consent saved:', consentData);
    setShowConsent(false);
  };

  const handleAcceptSelected = () => {
    // Set analytics consent based on user selection
    analytics.setUserConsent(consentSettings.analytics);
    
    // Store cookie consent
    const consentData = {
      ...consentSettings,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('cookie_consent', JSON.stringify(consentData));
    localStorage.setItem('analytics_consent', consentSettings.analytics.toString());
    
    setShowConsent(false);
    setShowSettings(false);
  };

  const handleDecline = () => {
    console.log('Decline clicked');
    
    // Set analytics consent to false
    analytics.setUserConsent(false);
    
    // Store cookie consent
    const consentData = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('cookie_consent', JSON.stringify(consentData));
    localStorage.setItem('analytics_consent', 'false');
    
    console.log('Cookie consent saved:', consentData);
    setShowConsent(false);
  };

  const toggleSetting = (setting) => {
    if (setting === 'necessary') return; // Necessary cookies cannot be disabled
    setConsentSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Function to reset consent (for testing purposes)
  const resetConsent = () => {
    localStorage.removeItem('analytics_consent');
    localStorage.removeItem('cookie_consent');
    setShowConsent(true);
  };

  // Add reset function to window for testing
  if (typeof window !== 'undefined') {
    window.resetCookieConsent = resetConsent;
  }

  if (!showConsent) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          {!showSettings ? (
            /* Main Consent Banner */
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">We value your privacy</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                  By clicking "Accept All", you consent to our use of cookies. 
                  <button
                    onClick={() => setShowSettings(true)}
                    className="text-blue-600 hover:text-blue-800 underline ml-1"
                  >
                    Learn more
                  </button>
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  <Settings className="w-4 h-4" />
                  Customize
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDecline();
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                >
                  Decline
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAcceptAll();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Accept All
                </button>
              </div>
            </div>
          ) : (
            /* Detailed Settings */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Cookie Preferences</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3">
                {/* Necessary Cookies */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Necessary Cookies</h4>
                    <p className="text-sm text-gray-600">Required for the website to function properly</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Always Active</span>
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Analytics Cookies</h4>
                    <p className="text-sm text-gray-600">Help us understand how visitors interact with our website</p>
                  </div>
                  <button
                    onClick={() => toggleSetting('analytics')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      consentSettings.analytics ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        consentSettings.analytics ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Marketing Cookies</h4>
                    <p className="text-sm text-gray-600">Used to deliver personalized advertisements</p>
                  </div>
                  <button
                    onClick={() => toggleSetting('marketing')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      consentSettings.marketing ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        consentSettings.marketing ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDecline();
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                >
                  Decline All
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAcceptSelected();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieConsent; 