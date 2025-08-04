# 🔧 Environment Setup Guide

## ❌ Issue Identified
The "Supabase is currently unavailable" error is caused by missing environment variables.

## ✅ Solution

### Step 1: Create Environment File
Create a file named `.env.local` in your project root with the following content:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Other Environment Variables
VITE_APP_NAME=HR Solutions Hub
VITE_APP_VERSION=1.0.0
```

### Step 2: Get Your Supabase Credentials
1. **Go to your Supabase Dashboard**
2. **Select your project**
3. **Go to Settings → API**
4. **Copy the following values:**
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** → `VITE_SUPABASE_ANON_KEY`
   - **service_role secret** → `VITE_SUPABASE_SERVICE_ROLE_KEY`

### Step 3: Replace Placeholders
Replace the placeholder values in `.env.local` with your actual Supabase credentials.

### Step 4: Restart Development Server
```bash
npm run dev
```

## 🔍 Verification
After setting up the environment variables:
1. **Check browser console** - No more "Supabase is currently unavailable" errors
2. **Try admin registration** - Should work without network errors
3. **Check AuthDebug** - Should show proper connection status

## 🚨 Important Notes
- **Never commit `.env.local` to git** - It contains sensitive credentials
- **Keep your credentials secure** - Don't share them publicly
- **Restart the dev server** after changing environment variables

## 🎯 Expected Result
Once environment variables are properly configured, the admin registration system should work without any "Supabase is currently unavailable" errors. 