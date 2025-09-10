# Email Setup Instructions

## CORS Issues Resolution ✅
The CORS issues have been successfully resolved by implementing a Supabase Edge Function approach. The email service now routes through your Supabase Edge Function instead of making direct browser requests to email APIs.

## Required Configuration

### 1. Get API Keys
You need to obtain actual API keys from your email providers:

**For SendGrid:**
1. Go to [SendGrid Dashboard](https://app.sendgrid.com/)
2. Navigate to Settings > API Keys
3. Create a new API key with "Full Access" or "Mail Send" permissions
4. Copy the API key (starts with `SG.`)

**For Resend:**
1. Go to [Resend Dashboard](https://resend.com/)
2. Navigate to API Keys
3. Create a new API key
4. Copy the API key (starts with `re_`)

### 2. Configure Supabase Secrets
You need to set these API keys as secrets in your Supabase project:

**Option A: Using Supabase Dashboard**
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard/project/ktqrzokrqizfjqdgwmqs/settings/functions)
2. Navigate to Project Settings > Edge Functions
3. Scroll down to "Function Secrets"
4. Add these secrets:
   - `SENDGRID_API_KEY`: Your SendGrid API key
   - `RESEND_API_KEY`: Your Resend API key
   - `FROM_EMAIL`: noreply@hirewithprachi.com
   - `FROM_NAME`: Hire with Prachi

**Option B: Using Supabase CLI (if installed)**
```bash
supabase secrets set SENDGRID_API_KEY=your_actual_sendgrid_key_here
supabase secrets set RESEND_API_KEY=your_actual_resend_key_here
supabase secrets set FROM_EMAIL=noreply@hirewithprachi.com
supabase secrets set FROM_NAME="Hire with Prachi"
```

### 3. Update Local Environment (Optional)
Update your `.env` file with actual values for local development:
```env
VITE_EMAIL_PROVIDER=sendgrid
VITE_SENDGRID_API_KEY=your_actual_sendgrid_key_here
VITE_FROM_EMAIL=noreply@hirewithprachi.com
VITE_FROM_NAME=Hire with Prachi
```

### 4. Test Email Functionality
After configuring the secrets:
1. Go to your admin dashboard
2. Try sending a test email
3. Check the browser console for any errors
4. Verify that emails are being sent successfully

## Current Status
- ✅ CORS issues resolved
- ✅ Edge Function deployed and active
- ✅ Database table structure verified
- ⚠️ API keys need to be configured with actual values
- ⚠️ Email functionality testing pending

## Troubleshooting
If you encounter issues:
1. Check the Supabase Edge Function logs in your dashboard
2. Verify API keys are correctly set in Supabase secrets
3. Ensure your email provider accounts are active and have sending permissions
4. Check that the `email_logs` table is receiving entries

## Next Steps
1. Configure the API keys as described above
2. Test email sending functionality
3. Monitor email logs in the database