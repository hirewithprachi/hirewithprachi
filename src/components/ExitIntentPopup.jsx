import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConsultationModal from './LeadCapturePreview';

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [showConsultation, setShowConsultation] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('exitIntentShown')) return;
    function handleMouseOut(e) {
      if (e.clientY < 40) {
        setShow(true);
        localStorage.setItem('exitIntentShown', 'true');
      }
    }
    function handleMobileTimeout() {
      if (!localStorage.getItem('exitIntentShown')) {
        setShow(true);
        localStorage.setItem('exitIntentShown', 'true');
      }
    }
    window.addEventListener('mouseout', handleMouseOut);
    // Mobile: show after 30s
    const mobileTimeout = setTimeout(handleMobileTimeout, 30000);
    return () => {
      window.removeEventListener('mouseout', handleMouseOut);
      clearTimeout(mobileTimeout);
    };
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-40 z-[1000] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setShow(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2">Wait! Get a Free HR Consultation</h2>
            <p className="mb-6 text-gray-700">Before you go, book a free call or get a personalized HR audit for your business.</p>
            <button
              className="inline-block px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition mb-2"
              onClick={() => setShowConsultation(true)}
            >
              Claim My Free Consultation
            </button>
            <div className="text-xs text-gray-400 mt-2">No spam. No obligation.</div>
            <ConsultationModal open={showConsultation} onClose={() => setShowConsultation(false)} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 