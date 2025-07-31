import React, { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookieConsent')) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-gray-100 py-4 px-6 flex flex-col md:flex-row items-center justify-between z-50 shadow-lg">
      <span className="mb-2 md:mb-0">This website uses cookies and third-party services to enhance your experience. By using this site, you agree to our <a href="/privacy-policy" className="underline text-indigo-300">Privacy Policy</a>.</span>
      <button
        onClick={acceptCookies}
        className="mt-2 md:mt-0 px-6 py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
      >
        Accept
      </button>
    </div>
  );
} 