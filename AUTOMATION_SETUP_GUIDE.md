# 🚀 Automation Setup Guide

## Overview
This guide will help you set up WhatsApp API integration and Email automation for your Hire with Prachi platform.

## 📊 Database Setup

### Step 1: Apply Database Changes
Execute the updated `manual-database-setup.sql` file in your Supabase Dashboard > SQL Editor:

1. **Login to Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project: `hirewithprachi`

2. **Execute SQL Script**
   - Navigate to "SQL Editor"
   - Copy the entire content from `manual-database-setup.sql`
   - Paste and execute the script
   - Verify all tables are created successfully

### Step 2: Verify New Tables
Check that these tables were created:
- ✅ `notifications`
- ✅ `activity_logs`
- ✅ `email_logs`
- ✅ `calculator_results`
- ✅ `whatsapp_integrations`
- ✅ `whatsapp_messages`
- ✅ `email_automations`
- ✅ `whatsapp_automations`

## 📱 WhatsApp Business API Setup

### Step 1: Get WhatsApp Business API Access
1. **Apply for WhatsApp Business API**
   - Visit: https://business.whatsapp.com/products/business-api
   - Complete the application process
   - Get approved (usually takes 1-2 weeks)

2. **Alternative: Use WhatsApp Cloud API**
   - Visit: https://developers.facebook.com/docs/whatsapp/cloud-api
   - Create a Facebook Developer Account
   - Set up WhatsApp Cloud API (faster approval)

### Step 2: Configure WhatsApp Integration
1. **Access Admin Dashboard**
   - Go to `/admin` on your website
   - Navigate to "WhatsApp API" tab

2. **Add New Integration**
   - Click "Add Integration"
   - Fill in the required details:
     ```
     Integration Name: Hire with Prachi Main
     Phone Number: +91XXXXXXXXXX (your business number)
     Access Token: [Your WhatsApp API Token]
     Webhook URL: https://yoursite.com/api/whatsapp/webhook
     Verify Token: [Auto-generated or custom]
     ```

3. **Test Integration**
   - Use the "Test Integration" button
   - Verify messages are sent successfully

### Step 3: Set Up Webhooks
1. **Configure Webhook in Facebook/WhatsApp**
   - Use the webhook URL provided in the integration
   - Use the verify token from the integration
   - Subscribe to message events

2. **Verify Webhook**
   - Send a test message to your WhatsApp business number
   - Check if it appears in the "Messages" tab

## 📧 Email Automation Setup

### Step 1: Configure Email Service
1. **Choose Email Provider**
   - **Recommended**: SendGrid, Mailgun, or AWS SES
   - **Setup**: Create account and get API credentials

2. **Update Environment Variables**
   ```env
   # Add to your .env file
   EMAIL_PROVIDER=sendgrid
   SENDGRID_API_KEY=your_sendgrid_api_key
   FROM_EMAIL=noreply@hirewithprachi.com
   FROM_NAME=Hire with Prachi
   ```

### Step 2: Create Email Templates
1. **Access Admin Dashboard**
   - Navigate to "Email Automation" tab
   - Click "Add Automation"

2. **Pre-built Templates Available**:
   - **Welcome Email**: Sent when user registers
   - **Purchase Confirmation**: Sent after tool purchase
   - **Tool Results**: Sent when AI tool completes
   - **Follow-up**: Sent after user inactivity

3. **Template Variables**
   Use these in your email templates:
   ```
   {{user_name}} - User's full name
   {{user_email}} - User's email address
   {{tool_name}} - Name of purchased/used tool
   {{amount}} - Purchase amount
   {{transaction_id}} - Payment transaction ID
   {{company_name}} - User's company name
   {{dashboard_url}} - Link to user dashboard
   {{tool_access_url}} - Direct link to tool
   ```

### Step 3: Set Up Automation Rules
1. **Welcome Email**:
   ```
   Trigger: user_registered
   Delay: 0 hours
   Subject: Welcome to Hire with Prachi! 🎉
   ```

2. **Purchase Confirmation**:
   ```
   Trigger: tool_purchased
   Delay: 0 hours
   Subject: Purchase Confirmation - {{tool_name}}
   ```

3. **Follow-up Email**:
   ```
   Trigger: user_registered
   Delay: 24 hours
   Subject: How are you finding Hire with Prachi?
   ```

## 🔄 Automation Workflows

### WhatsApp Automations
1. **Welcome Message**: Sent when user registers
2. **Purchase Confirmation**: Sent after successful payment
3. **Tool Completion**: Sent when AI tool finishes processing
4. **Support Notifications**: Sent for customer service

### Email Automations
1. **Onboarding Sequence**: Multi-step email series for new users
2. **Purchase Flow**: Confirmation and follow-up emails
3. **Engagement**: Re-engagement emails for inactive users
4. **Notifications**: System and account notifications

## 🔧 API Endpoints (for developers)

### WhatsApp Webhook
```javascript
// POST /api/whatsapp/webhook
// Handles incoming WhatsApp messages
```

### Email Triggers
```javascript
// POST /api/email/trigger
// Manually trigger email automations
```

### Testing Endpoints
```javascript
// POST /api/whatsapp/test
// Test WhatsApp integration

// POST /api/email/test  
// Test email automation
```

## 📊 Monitoring & Analytics

### WhatsApp Metrics
- Message delivery rates
- Response times
- User engagement
- Automation effectiveness

### Email Metrics
- Open rates
- Click-through rates
- Bounce rates
- Unsubscribe rates

## 🔐 Security Considerations

### WhatsApp Security
- ✅ Verify token validation
- ✅ Webhook signature verification
- ✅ Rate limiting
- ✅ Message encryption

### Email Security
- ✅ DKIM/SPF records
- ✅ Unsubscribe compliance
- ✅ Data privacy (GDPR)
- ✅ Content filtering

## 🚨 Troubleshooting

### Common WhatsApp Issues
1. **Messages not sending**
   - Check access token validity
   - Verify phone number registration
   - Check rate limits

2. **Webhook not receiving**
   - Verify webhook URL accessibility
   - Check verify token match
   - Ensure HTTPS endpoint

### Common Email Issues
1. **Emails not sending**
   - Check API credentials
   - Verify sender domain
   - Check email quotas

2. **High bounce rate**
   - Verify email addresses
   - Check domain reputation
   - Review email content

## 📞 Support

### Resources
- 📚 WhatsApp API Documentation: https://developers.facebook.com/docs/whatsapp
- 📧 SendGrid Documentation: https://docs.sendgrid.com
- 🛠️ Admin Dashboard: `/admin` on your website

### Contact
- **Technical Support**: tech@hirewithprachi.com
- **Business Inquiries**: business@hirewithprachi.com
- **Emergency**: +91-XXXXXXXXXX

---

## ✅ Setup Checklist

### Database Setup
- [ ] Execute manual-database-setup.sql
- [ ] Verify all tables created
- [ ] Check RLS policies are active

### WhatsApp Setup
- [ ] WhatsApp Business API approved
- [ ] Integration configured in admin
- [ ] Webhook endpoints set up
- [ ] Test message sent successfully

### Email Setup
- [ ] Email service provider configured
- [ ] Environment variables set
- [ ] Email templates created
- [ ] Automation rules active

### Testing
- [ ] WhatsApp integration tested
- [ ] Email automation tested
- [ ] Admin dashboard accessible
- [ ] All features working

**Status**: 🟢 Ready for Production

---

*Last Updated: December 2024*
*Version: 1.0*
