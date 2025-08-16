// Environment configuration for HireWithPrachi platform
// This file contains all environment variables and configuration

export const config = {
  // Supabase Configuration
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || 'https://ktqrzokrqizfjqdgwmqs.supabase.co',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0cXJ6b2tycWl6ZmpxZGd3bXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMzIzOTIsImV4cCI6MjA2OTgwODM5Mn0.2g3y9b7bsX444RlJ5_syCtHb-WEhHmZf2WxucPrRiPQ'
  },

  // Admin Configuration
  admin: {
    email: import.meta.env.VITE_ADMIN_EMAIL || 'prachishri005@gmail.com',
    // Note: In production, remove hardcoded credentials
    password: import.meta.env.VITE_ADMIN_PASSWORD || 'PrachiAdmin2025!'
  },

  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'https://ktqrzokrqizfjqdgwmqs.supabase.co/functions/v1',
    endpoints: {
      adminDashboard: '/admin-dashboard',
      blogManagement: '/blog-management',
      leadManagement: '/lead-management',
      analytics: '/analytics',
      salaryCalculator: '/salary-calculator',
      benefitsCalculator: '/benefits-calculator',
      hrCostsCalculator: '/hr-costs-calculator',
      pdfGeneration: '/generate-pdf',
      emailService: '/email-service',
      fileUpload: '/file-upload',
      downloadResource: '/download-resource'
    }
  },

  // Application Settings
  app: {
    name: 'HireWithPrachi',
    url: import.meta.env.VITE_APP_URL || 'https://hirewithprachi.com',
    environment: import.meta.env.MODE || 'development'
  },

  // Analytics Configuration
  analytics: {
    googleAnalytics: import.meta.env.VITE_GA_TRACKING_ID || '',
    facebookPixel: import.meta.env.VITE_FACEBOOK_PIXEL_ID || '',
    hubspotPortalId: import.meta.env.VITE_HUBSPOT_PORTAL_ID || ''
  },

  // Feature Flags
  features: {
    enableChatbot: true,
    enableAnalytics: true,
    enableNewsletter: true,
    enableDownloads: true,
    enableCalculators: true,
    enableBlogComments: false, // Can be enabled later
    enableSocialLogin: false   // Can be enabled later
  }
};

// Validation function to check if required configuration is present
export const validateConfig = () => {
  const requiredFields = [
    { key: 'config.supabase.url', value: config.supabase.url },
    { key: 'config.supabase.anonKey', value: config.supabase.anonKey }
  ];

  const missingFields = requiredFields.filter(field => !field.value);

  if (missingFields.length > 0) {
    console.error('❌ Missing required configuration:');
    missingFields.forEach(field => {
      console.error(`   - ${field.key}`);
    });
    return false;
  }

  console.log('✅ Configuration validation successful');
  return true;
};

// Export specific configurations for easy access
export const supabaseConfig = config.supabase;
export const adminConfig = config.admin;
export const apiConfig = config.api;
export const appConfig = config.app;

export default config;
