import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Facebook Pixel Configuration
const FB_PIXEL_ID = '123456789012345'; // Replace with your actual Pixel ID

// Initialize Facebook Pixel
const initializeFacebookPixel = () => {
  if (typeof window !== 'undefined' && !window.fbq) {
    // Facebook Pixel Code
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    
    fbq('init', FB_PIXEL_ID);
    fbq('track', 'PageView');
  }
};

// Track custom events
const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    fbq('track', eventName, parameters);
  }
};

// Track page views
const trackPageView = (pagePath, pageTitle) => {
  if (typeof window !== 'undefined' && window.fbq) {
    fbq('track', 'PageView', {
      page_path: pagePath,
      page_title: pageTitle
    });
  }
};

// Track form submissions
const trackFormSubmission = (formName, formType = 'contact') => {
  trackEvent('Lead', {
    content_name: formName,
    content_category: formType,
    value: 1.00,
    currency: 'INR'
  });
};

// Track service page views
const trackServiceView = (serviceName) => {
  trackEvent('ViewContent', {
    content_name: serviceName,
    content_category: 'HR Services',
    value: 1.00,
    currency: 'INR'
  });
};

// Track calculator usage
const trackCalculatorUsage = (calculatorName) => {
  trackEvent('CustomizeProduct', {
    content_name: calculatorName,
    content_category: 'HR Tools',
    value: 1.00,
    currency: 'INR'
  });
};

// Track blog engagement
const trackBlogEngagement = (blogTitle, action = 'view') => {
  trackEvent('ViewContent', {
    content_name: blogTitle,
    content_category: 'Blog',
    content_type: 'article',
    value: 1.00,
    currency: 'INR'
  });
};

// Track city page views
const trackCityPageView = (cityName) => {
  trackEvent('ViewContent', {
    content_name: `HR Services ${cityName}`,
    content_category: 'Local Services',
    content_type: 'location',
    value: 1.00,
    currency: 'INR'
  });
};

// Track contact actions
const trackContactAction = (actionType, method = 'website') => {
  trackEvent('Contact', {
    content_name: actionType,
    content_category: 'Contact',
    value: 1.00,
    currency: 'INR',
    custom_parameter: method
  });
};

// Track download actions
const trackDownload = (resourceName, resourceType = 'document') => {
  trackEvent('Download', {
    content_name: resourceName,
    content_category: resourceType,
    value: 1.00,
    currency: 'INR'
  });
};

// Facebook Pixel Component
const FacebookPixel = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Facebook Pixel on first load
    initializeFacebookPixel();
  }, []);

  useEffect(() => {
    // Track page views on route changes
    if (typeof window !== 'undefined' && window.fbq) {
      const pagePath = location.pathname;
      const pageTitle = document.title || 'Hire With Prachi';
      
      trackPageView(pagePath, pageTitle);
      
      // Track specific page types
      if (pagePath.includes('/services/')) {
        const serviceName = pagePath.split('/').pop().replace(/-/g, ' ');
        trackServiceView(serviceName);
      }
      
      if (pagePath.includes('/hr-services-')) {
        const cityName = pagePath.split('-').slice(2).join(' ');
        trackCityPageView(cityName);
      }
      
      if (pagePath.includes('/blog/')) {
        const blogTitle = document.title || 'Blog Post';
        trackBlogEngagement(blogTitle);
      }
      
      if (pagePath.includes('calculator') || pagePath.includes('tool')) {
        const toolName = pagePath.split('/').pop().replace(/-/g, ' ');
        trackCalculatorUsage(toolName);
      }
    }
  }, [location]);

  return null; // This component doesn't render anything
};

// Export functions for use in other components
export {
  FacebookPixel,
  trackEvent,
  trackPageView,
  trackFormSubmission,
  trackServiceView,
  trackCalculatorUsage,
  trackBlogEngagement,
  trackCityPageView,
  trackContactAction,
  trackDownload
};

export default FacebookPixel;
