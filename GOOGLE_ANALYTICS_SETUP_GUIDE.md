# 🔍 Complete Google Analytics & Tag Manager Setup Guide

## 📊 Google Analytics 4 Configuration

### **Measurement ID**: `G-F2Y8KBDKWV`

---

## 🚀 Step-by-Step Setup Instructions

### **1. Google Analytics 4 Setup**

#### **A. Create GA4 Property (if not already done)**
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring" or "Create Property"
3. Enter property name: "Hire With Prachi"
4. Select timezone: "Asia/Kolkata"
5. Select currency: "Indian Rupee (INR)"
6. Click "Next"
7. Enter business information:
   - Industry category: "Business Services"
   - Business size: "Small Business"
   - How do you plan to use GA4: "Optimize user experience"
8. Click "Create"

#### **B. Configure Data Streams**
1. In your GA4 property, go to "Admin" → "Data Streams"
2. Click "Add Stream" → "Web"
3. Enter website URL: `https://yourdomain.com`
4. Stream name: "Hire With Prachi Website"
5. Click "Create Stream"
6. Copy the Measurement ID: `G-F2Y8KBDKWV`

#### **C. Enhanced Measurement Setup**
1. In your data stream, enable "Enhanced Measurement"
2. Enable all options:
   - ✅ Page views
   - ✅ Scrolls
   - ✅ Outbound clicks
   - ✅ Site search
   - ✅ Video engagement
   - ✅ File downloads

#### **D. Configure Events**
1. Go to "Events" in GA4
2. Create custom events:

**Service Page View Event:**
- Event name: `service_view`
- Parameters:
  - `service_id` (text)
  - `service_name` (text)
  - `event_category` (text) = "services"

**Contact Form Submission:**
- Event name: `contact_form_submit`
- Parameters:
  - `form_type` (text)
  - `form_id` (text)
  - `event_category` (text) = "conversion"

**Phone Call Click:**
- Event name: `phone_call`
- Parameters:
  - `phone_number` (text)
  - `event_category` (text) = "conversion"

**WhatsApp Click:**
- Event name: `whatsapp_click`
- Parameters:
  - `event_category` (text) = "conversion"

**Video Play:**
- Event name: `video_play`
- Parameters:
  - `video_title` (text)
  - `service_id` (text)
  - `event_category` (text) = "engagement"

**Scroll Depth:**
- Event name: `scroll_depth`
- Parameters:
  - `scroll_depth` (number)
  - `event_category` (text) = "engagement"

**CTA Click:**
- Event name: `cta_click`
- Parameters:
  - `cta_type` (text)
  - `cta_text` (text)
  - `event_category` (text) = "conversion"

---

### **2. Google Tag Manager Setup**

#### **A. Create GTM Container**
1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Click "Create Account"
3. Account name: "Hire With Prachi"
4. Container name: "Website"
5. Target platform: "Web"
6. Click "Create"
7. Accept the terms of service
8. Copy your GTM Container ID (format: GTM-XXXXXXX)

#### **B. Install GTM Code**
1. Copy the GTM code snippet
2. Add to your website's `<head>` section:

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

3. Add to your website's `<body>` section (right after opening `<body>` tag):

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

#### **C. Import GTM Configuration**
1. In GTM, go to "Admin" → "Import Container"
2. Upload the `gtm-config.json` file from this project
3. Choose "Merge" option
4. Review and publish

---

### **3. Website Integration**

#### **A. Update Analytics Configuration**
1. Open `src/lib/analytics.js`
2. Update the GTM ID:
```javascript
this.gtmId = 'GTM-XXXXXXX'; // Replace with your actual GTM ID
```

#### **B. Add Data Layer Pushes**
Add these data layer pushes to your website components:

**Service Pages:**
```javascript
// In ServiceDetailPage.jsx
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  'event': 'service_view',
  'service_id': serviceId,
  'service_name': service.title,
  'page_title': document.title,
  'page_location': window.location.href
});
```

**Contact Forms:**
```javascript
// Add to form submission handlers
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  'event': 'contact_form_submit',
  'form_type': 'contact',
  'form_id': 'main-contact-form'
});
```

**CTA Buttons:**
```javascript
// Add to CTA button click handlers
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  'event': 'cta_click',
  'cta_type': 'consultation',
  'cta_text': 'Get Free HR Consultation'
});
```

**Video Plays:**
```javascript
// Add to video play handlers
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  'event': 'video_play',
  'video_title': videoTitle,
  'service_id': serviceId
});
```

---

### **4. Testing & Validation**

#### **A. Google Analytics Debug Mode**
1. Install Google Analytics Debugger extension
2. Open browser console
3. Visit your website
4. Check for GA4 events in console

#### **B. GTM Preview Mode**
1. In GTM, click "Preview"
2. Enter your website URL
3. Click "Start"
4. Visit your website in the new tab
5. Check GTM preview panel for events

#### **C. Real-Time Reports**
1. In GA4, go to "Reports" → "Realtime"
2. Visit your website
3. Check for real-time data

---

### **5. Goals & Conversions Setup**

#### **A. Configure Goals in GA4**
1. Go to "Admin" → "Events" → "Conversions"
2. Mark these events as conversions:
   - ✅ `contact_form_submit`
   - ✅ `phone_call`
   - ✅ `whatsapp_click`
   - ✅ `cta_click`

#### **B. Create Custom Audiences**
1. Go to "Admin" → "Audiences"
2. Create audiences:
   - **Service Page Visitors**: Users who viewed service pages
   - **Form Submitters**: Users who submitted contact forms
   - **High Engagement Users**: Users with >2 minutes session duration
   - **Return Visitors**: Users with >1 session

#### **C. Set Up Funnels**
1. Go to "Explore" → "Funnel Exploration"
2. Create conversion funnels:
   - Homepage → Service Page → Contact Form
   - Service Page → CTA Click → Form Submission

---

### **6. Advanced Tracking Features**

#### **A. E-commerce Tracking (if applicable)**
```javascript
// For service purchases
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  'event': 'purchase',
  'ecommerce': {
    'transaction_id': 'T_12345',
    'value': 50000,
    'currency': 'INR',
    'items': [{
      'item_id': 'service_001',
      'item_name': 'HR Compliance Service',
      'price': 50000,
      'quantity': 1
    }]
  }
});
```

#### **B. User Properties**
```javascript
// Set user properties
gtag('set', 'user_properties', {
  'user_type': 'business_owner',
  'company_size': '10-50',
  'industry': 'technology'
});
```

#### **C. Custom Dimensions**
1. In GA4, go to "Admin" → "Custom Definitions"
2. Create custom dimensions:
   - `service_category` (text)
   - `user_location` (text)
   - `referrer_source` (text)

---

### **7. Privacy & Compliance**

#### **A. Cookie Consent Integration**
1. Ensure cookie consent is implemented
2. Only fire GA4 after consent is given
3. Respect user privacy preferences

#### **B. Data Retention**
1. In GA4, go to "Admin" → "Data Settings" → "Data Retention"
2. Set retention period: 26 months
3. Enable data deletion requests

#### **C. GDPR Compliance**
1. Implement cookie consent banner
2. Provide opt-out mechanisms
3. Document data processing activities

---

### **8. Monitoring & Optimization**

#### **A. Regular Monitoring**
- Check real-time reports daily
- Review conversion rates weekly
- Analyze user behavior monthly

#### **B. Performance Optimization**
- Monitor Core Web Vitals
- Track page load times
- Optimize for mobile performance

#### **C. A/B Testing**
- Test different CTA variations
- Optimize form designs
- Improve page layouts

---

## 📋 Checklist

### **Setup Complete:**
- [ ] GA4 Property created
- [ ] Measurement ID configured: `G-F2Y8KBDKWV`
- [ ] GTM Container created
- [ ] GTM code installed on website
- [ ] Custom events configured
- [ ] Goals and conversions set up
- [ ] Real-time tracking verified
- [ ] Privacy compliance implemented
- [ ] Testing completed

### **Files Updated:**
- [ ] `src/lib/analytics.js` - Updated with your Measurement ID
- [ ] `public/gtm-config.json` - Complete GTM configuration
- [ ] Website components - Data layer pushes added

---

## 🎯 Expected Results

### **Tracking Capabilities:**
- ✅ **Page Views**: All pages tracked with metadata
- ✅ **User Behavior**: Scroll depth, time on page, engagement
- ✅ **Conversions**: Form submissions, phone calls, WhatsApp clicks
- ✅ **Service Performance**: Individual service page tracking
- ✅ **Video Engagement**: Video play tracking
- ✅ **CTA Performance**: Button click tracking

### **Analytics Insights:**
- **User Journey**: Complete user flow analysis
- **Conversion Funnels**: Lead generation optimization
- **Content Performance**: Service page effectiveness
- **Engagement Metrics**: User interaction patterns
- **ROI Tracking**: Marketing campaign effectiveness

---

## 🚀 Next Steps

1. **Deploy the updated analytics code**
2. **Test all tracking events**
3. **Set up custom reports in GA4**
4. **Configure email alerts for key metrics**
5. **Train team on analytics dashboard**
6. **Implement regular reporting schedule**

**Your Google Analytics setup is now complete and ready for comprehensive tracking!** 🎉 