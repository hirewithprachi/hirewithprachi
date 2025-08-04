# 🔧 Integration Setup Guide - Required for Full Functionality

## ⚠️ **CRITICAL: These Integrations Need to be Set Up**

The website has several placeholder API keys and form IDs that need to be replaced with real values for full functionality.

## 📋 **Required Integrations:**

### **1. Formspree Forms (High Priority)**
**Purpose**: Contact form submissions and lead capture

**Files to Update:**
- `src/components/ContactForm.jsx` (line 44)
- `src/pages/ServiceDetailPage.jsx` (line 553)
- `src/pages/GDPRDataDeletion.jsx` (line 19)
- `src/components/ServiceBuilder.jsx` (line 31)
- `src/components/sections/ContactForm.jsx` (line 35)
- `src/components/MultiStepLeadForm.jsx` (line 63)

**Setup Steps:**
1. Go to [Formspree.io](https://formspree.io)
2. Create a free account
3. Create a new form
4. Copy the form ID (format: `xabc123`)
5. Replace `YOUR_FORM_ID` with your actual form ID

**Example:**
```javascript
// Before
action="https://formspree.io/f/YOUR_FORM_ID"

// After
action="https://formspree.io/f/xabc123"
```

### **2. HubSpot CRM (Medium Priority)**
**Purpose**: Lead management and CRM integration

**Files to Update:**
- `src/lib/hubspot.js` (lines 3-4)

**Setup Steps:**
1. Go to [HubSpot.com](https://hubspot.com)
2. Create a free account
3. Get your API key from Settings > Integrations > API Keys
4. Get your Portal ID from Settings > Account Setup > Account Defaults
5. Replace the placeholders

**Example:**
```javascript
// Before
const apiKey = localStorage.getItem('hubspotApiKey') || 'YOUR_HUBSPOT_API_KEY';
const portalId = 'YOUR_PORTAL_ID';

// After
const apiKey = localStorage.getItem('hubspotApiKey') || 'pat-na1-12345678-1234-1234-1234-123456789abc';
const portalId = '12345678';
```

### **3. Firebase Authentication (Optional)**
**Purpose**: User login/registration system

**Files to Update:**
- `src/lib/firebase.js` (lines 6-12)

**Setup Steps:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Authentication
4. Get your config from Project Settings
5. Replace the placeholders

**Example:**
```javascript
// Before
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// After
const firebaseConfig = {
  apiKey: 'AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz',
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'your-project',
  storageBucket: 'your-project.appspot.com',
  messagingSenderId: '123456789012',
  appId: '1:123456789012:web:abc123def456',
};
```

### **4. Google Analytics (Optional)**
**Purpose**: Website analytics and tracking

**Setup Steps:**
1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new property
3. Get your Measurement ID (format: G-XXXXXXXXXX)
4. Add to your HTML head section

**Example:**
```html
<!-- Add to public/index.html head section -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🎯 **Priority Order:**

### **High Priority (Must Have):**
1. **Formspree Forms** - Contact forms won't work without this
2. **HubSpot CRM** - Lead capture won't work without this

### **Medium Priority (Nice to Have):**
3. **Google Analytics** - For tracking website performance
4. **Firebase Auth** - For user login system

## 🔧 **Quick Setup Instructions:**

### **For Immediate Functionality:**
1. **Set up Formspree** (5 minutes)
   - Create account at formspree.io
   - Get form ID
   - Replace `YOUR_FORM_ID` in ContactForm.jsx

2. **Set up HubSpot** (10 minutes)
   - Create free account at hubspot.com
   - Get API key and Portal ID
   - Replace placeholders in hubspot.js

### **For Advanced Features:**
3. **Set up Google Analytics** (5 minutes)
4. **Set up Firebase** (15 minutes)

## 📝 **Admin Panel Integration:**

The admin panel at `/admin/integrations` allows you to:
- Store API keys securely in localStorage
- Manage all integrations from one place
- Update settings without code changes

## ⚠️ **Security Notes:**

- Never commit real API keys to version control
- Use environment variables in production
- Consider using the admin panel for key management
- Test all integrations before going live

## 🚀 **After Setup:**

1. Test contact forms work
2. Verify lead capture in HubSpot
3. Check analytics tracking
4. Test user registration/login (if Firebase is set up)

## 📞 **Support:**

If you need help setting up any of these integrations:
1. Check the official documentation for each service
2. Use the admin panel for easy configuration
3. Test each integration individually before going live 