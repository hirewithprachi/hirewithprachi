// Calendly Configuration
export const calendlyConfig = {
  // Booking URL for the 30-minute consultation
  bookingUrl: 'https://calendly.com/hirewithprachi/30min',
  
  // Widget URL with parameters
  widgetUrl: 'https://calendly.com/hirewithprachi/30min?hide_event_type_details=1&hide_gdpr_banner=1',
  
  // Event type details
  eventType: {
    name: '30 Minute Meeting',
    duration: 30,
    description: 'Free HR consultation for startups and SMEs'
  },
  
  // Contact information
  contact: {
    email: 'info@hirewithprachi.com',
    whatsapp: '+918740889927',
    phone: '+91-87408-89927'
  },
  
  // Widget settings
  widget: {
    minWidth: '320px',
    height: '700px',
    hideEventTypeDetails: true,
    hideGdprBanner: true
  },
  
  // API configuration (for future use)
  api: {
    baseUrl: 'https://api.calendly.com',
    version: '2020-08-01'
  }
};

// Helper function to get widget URL with parameters
export const getWidgetUrl = (params = {}) => {
  const baseUrl = calendlyConfig.bookingUrl;
  const defaultParams = {
    hide_event_type_details: calendlyConfig.widget.hideEventTypeDetails ? '1' : '0',
    hide_gdpr_banner: calendlyConfig.widget.hideGdprBanner ? '1' : '0',
    ...params
  };
  
  const queryString = Object.entries(defaultParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
    
  return `${baseUrl}?${queryString}`;
};

// Helper function to open Calendly in new tab
export const openCalendly = (params = {}) => {
  const url = getWidgetUrl(params);
  window.open(url, '_blank');
};

// Helper function to get WhatsApp contact URL
export const getWhatsAppUrl = (message = '') => {
  const defaultMessage = "Hi! I'd like to book a free 30-minute HR consultation. Can you help me schedule this?";
  const encodedMessage = encodeURIComponent(message || defaultMessage);
  return `https://wa.me/${calendlyConfig.contact.whatsapp}?text=${encodedMessage}`;
};

// Helper function to get email contact URL
export const getEmailUrl = (subject = '', body = '') => {
  const defaultSubject = 'Free HR Consultation Booking Request';
  const defaultBody = `Hi Prachi,

I would like to book a free 30-minute HR consultation.

Please let me know your available time slots.

Best regards,
[Your Name]`;

  const encodedSubject = encodeURIComponent(subject || defaultSubject);
  const encodedBody = encodeURIComponent(body || defaultBody);
  
  return `mailto:${calendlyConfig.contact.email}?subject=${encodedSubject}&body=${encodedBody}`;
};

export default calendlyConfig; 