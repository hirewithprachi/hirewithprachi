// Google Analytics and User Tracking System
class Analytics {
  constructor() {
    this.gaId = 'G-F2Y8KBDKWV'; // Your GA4 Measurement ID
    this.gtmId = 'GTM-XXXXXXXX'; // Replace with your actual GTM ID if you have one
    this.isInitialized = false;
    this.userConsent = false;
    this.userId = null;
    this.sessionId = null;
    this.pageViews = [];
    this.events = [];
    
    this.init();
  }

  init() {
    // Check for existing consent
    this.userConsent = this.getCookieConsent();
    
    if (this.userConsent) {
      this.initializeAnalytics();
    }
    
    // Generate session ID
    this.sessionId = this.generateSessionId();
    
    // Track page load (will work even without GA loaded)
    this.trackPageView();
    
    // Set up event listeners
    this.setupEventListeners();
  }

  // Initialize Google Analytics
  initializeAnalytics() {
    if (this.isInitialized) return;

    try {
      // Load Google Analytics
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
      document.head.appendChild(script);

      // Initialize dataLayer and gtag function
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };

      // Wait for script to load before initializing
      script.onload = () => {
        try {
          window.gtag('js', new Date());
          window.gtag('config', this.gaId, {
            page_title: document.title,
            page_location: window.location.href,
            custom_map: {
              'custom_parameter_1': 'user_id',
              'custom_parameter_2': 'session_id',
              'custom_parameter_3': 'user_type'
            }
          });

          // Load Google Tag Manager (only if GTM ID is valid)
          if (this.gtmId && this.gtmId !== 'GTM-XXXXXXXX') {
            const gtmScript = document.createElement('script');
            gtmScript.innerHTML = `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${this.gtmId}');
            `;
            document.head.appendChild(gtmScript);

            // Add GTM noscript
            const gtmNoscript = document.createElement('noscript');
            gtmNoscript.innerHTML = `
              <iframe src="https://www.googletagmanager.com/ns.html?id=${this.gtmId}"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `;
            document.body.appendChild(gtmNoscript);
          }

          this.isInitialized = true;
          console.log('Analytics initialized successfully');
        } catch (error) {
          console.error('Error initializing analytics:', error);
        }
      };

      script.onerror = () => {
        console.error('Failed to load Google Analytics script');
      };
    } catch (error) {
      console.error('Error setting up analytics:', error);
    }
  }

  // Set user consent and initialize analytics
  setUserConsent(consent) {
    this.userConsent = consent;
    localStorage.setItem('analytics_consent', consent);
    
    if (consent) {
      this.initializeAnalytics();
      this.trackEvent('consent_granted', {
        event_category: 'privacy',
        event_label: 'user_consent'
      });
    }
  }

  // Get user consent from storage
  getCookieConsent() {
    return localStorage.getItem('analytics_consent') === 'true';
  }

  // Generate unique session ID
  generateSessionId() {
    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  }

  // Generate or get user ID
  getUserId() {
    if (!this.userId) {
      this.userId = localStorage.getItem('user_id');
      if (!this.userId) {
        this.userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('user_id', this.userId);
      }
    }
    return this.userId;
  }

  // Track page view
  trackPageView(pageTitle = null, pageUrl = null) {
    const pageData = {
      page_title: pageTitle || document.title,
      page_location: pageUrl || window.location.href,
      page_referrer: document.referrer,
      user_id: this.getUserId(),
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      screen_resolution: `${screen.width}x${screen.height}`,
      language: navigator.language
    };

    this.pageViews.push(pageData);

    if (this.isInitialized && this.userConsent && typeof window.gtag !== 'undefined') {
      window.gtag('config', this.gaId, {
        page_title: pageData.page_title,
        page_location: pageData.page_location,
        custom_map: {
          'custom_parameter_1': 'user_id',
          'custom_parameter_2': 'session_id'
        }
      });
    }

    // Store in localStorage for offline tracking
    this.storePageView(pageData);
  }

  // Track custom events
  trackEvent(eventName, parameters = {}) {
    try {
      const eventData = {
        event_name: eventName,
        event_category: parameters.event_category || 'engagement',
        event_label: parameters.event_label || '',
        event_value: parameters.event_value || 0,
        user_id: this.getUserId(),
        session_id: this.sessionId,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        ...parameters
      };

      this.events.push(eventData);

      // Only track to Google Analytics if everything is properly initialized
      if (this.isInitialized && this.userConsent && typeof window.gtag !== 'undefined' && window.gtag) {
        try {
          window.gtag('event', eventName, {
            event_category: eventData.event_category,
            event_label: eventData.event_label,
            event_value: eventData.event_value,
            custom_parameter_1: eventData.user_id,
            custom_parameter_2: eventData.session_id
          });
        } catch (gtagError) {
          console.error('Google Analytics tracking error:', gtagError);
        }
      }

      // Store in localStorage for offline tracking
      this.storeEvent(eventData);
    } catch (error) {
      console.error('Analytics trackEvent error:', error);
    }
  }

  // Track service page views
  trackServiceView(serviceId, serviceName) {
    // Push to data layer for GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'service_view',
        'service_id': serviceId,
        'service_name': serviceName,
        'page_title': document.title,
        'page_location': window.location.href
      });
    }

    this.trackEvent('service_view', {
      event_category: 'services',
      event_label: serviceName,
      service_id: serviceId,
      service_name: serviceName
    });
  }

  // Track contact form submissions
  trackContactForm(formType = 'general', formId = 'contact-form') {
    // Push to data layer for GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'contact_form_submit',
        'form_type': formType,
        'form_id': formId
      });
    }

    this.trackEvent('contact_form_submit', {
      event_category: 'conversion',
      event_label: formType,
      form_type: formType,
      form_id: formId
    });
  }

  // Track phone calls
  trackPhoneCall(phoneNumber) {
    // Push to data layer for GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'phone_call',
        'phone_number': phoneNumber
      });
    }

    this.trackEvent('phone_call', {
      event_category: 'conversion',
      event_label: phoneNumber,
      phone_number: phoneNumber
    });
  }

  // Track WhatsApp clicks
  trackWhatsAppClick() {
    // Push to data layer for GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'whatsapp_click'
      });
    }

    this.trackEvent('whatsapp_click', {
      event_category: 'conversion',
      event_label: 'whatsapp_contact'
    });
  }

  // Track brochure downloads
  trackBrochureDownload(serviceName) {
    this.trackEvent('brochure_download', {
      event_category: 'conversion',
      event_label: serviceName,
      service_name: serviceName
    });
  }

  // Track video plays
  trackVideoPlay(serviceId, videoTitle) {
    // Push to data layer for GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'video_play',
        'video_title': videoTitle,
        'service_id': serviceId
      });
    }

    this.trackEvent('video_play', {
      event_category: 'engagement',
      event_label: videoTitle,
      service_id: serviceId,
      video_title: videoTitle
    });
  }

  // Track scroll depth
  trackScrollDepth(depth) {
    this.trackEvent('scroll_depth', {
      event_category: 'engagement',
      event_label: `${depth}%`,
      scroll_depth: depth
    });
  }

  // Track time on page
  trackTimeOnPage(timeSpent) {
    this.trackEvent('time_on_page', {
      event_category: 'engagement',
      event_label: `${Math.round(timeSpent / 1000)}s`,
      time_spent: timeSpent
    });
  }

  // Track CTA button clicks
  trackCTAClick(ctaType, ctaText) {
    // Push to data layer for GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'cta_click',
        'cta_type': ctaType,
        'cta_text': ctaText
      });
    }

    this.trackEvent('cta_click', {
      event_category: 'conversion',
      event_label: ctaType,
      cta_type: ctaType,
      cta_text: ctaText
    });
  }

  // Store page view in localStorage
  storePageView(pageData) {
    try {
      const stored = JSON.parse(localStorage.getItem('analytics_pageviews') || '[]');
      stored.push(pageData);
      
      // Keep only last 100 page views
      if (stored.length > 100) {
        stored.splice(0, stored.length - 100);
      }
      
      localStorage.setItem('analytics_pageviews', JSON.stringify(stored));
    } catch (error) {
      console.error('Error storing page view:', error);
    }
  }

  // Store event in localStorage
  storeEvent(eventData) {
    try {
      const stored = JSON.parse(localStorage.getItem('analytics_events') || '[]');
      stored.push(eventData);
      
      // Keep only last 200 events
      if (stored.length > 200) {
        stored.splice(0, stored.length - 200);
      }
      
      localStorage.setItem('analytics_events', JSON.stringify(stored));
    } catch (error) {
      console.error('Error storing event:', error);
    }
  }

  // Set up event listeners
  setupEventListeners() {
    // Track form submissions
    document.addEventListener('submit', (e) => {
      if (e.target.tagName === 'FORM') {
        const formType = e.target.getAttribute('data-form-type') || 'general';
        this.trackContactForm(formType);
      }
    });

    // Track phone clicks
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && e.target.href && e.target.href.startsWith('tel:')) {
        this.trackPhoneCall(e.target.href.replace('tel:', ''));
      }
      
      if (e.target.tagName === 'A' && e.target.href && e.target.href.includes('wa.me')) {
        this.trackWhatsAppClick();
      }
    });

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
          this.trackScrollDepth(maxScroll);
        }
      }
    });

    // Track time on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
      const timeSpent = Date.now() - startTime;
      this.trackTimeOnPage(timeSpent);
    });
  }

  // Get analytics data for admin dashboard
  getAnalyticsData() {
    return {
      pageViews: this.pageViews,
      events: this.events,
      userId: this.getUserId(),
      sessionId: this.sessionId,
      userConsent: this.userConsent,
      isInitialized: this.isInitialized
    };
  }

  // Export analytics data
  exportAnalyticsData() {
    return {
      pageViews: JSON.parse(localStorage.getItem('analytics_pageviews') || '[]'),
      events: JSON.parse(localStorage.getItem('analytics_events') || '[]'),
      user: {
        id: this.getUserId(),
        sessionId: this.sessionId,
        consent: this.userConsent
      }
    };
  }

  // Clear analytics data
  clearAnalyticsData() {
    localStorage.removeItem('analytics_pageviews');
    localStorage.removeItem('analytics_events');
    this.pageViews = [];
    this.events = [];
  }

  // Check if analytics is ready
  isAnalyticsReady() {
    return this.isInitialized && typeof window.gtag !== 'undefined';
  }

  // Retry initialization if needed
  retryInitialization() {
    if (!this.isInitialized && this.userConsent) {
      console.log('Retrying analytics initialization...');
      this.initializeAnalytics();
    }
  }
}

// Create global analytics instance
const analytics = new Analytics();

export default analytics; 