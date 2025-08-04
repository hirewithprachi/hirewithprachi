# 🔧 Supabase Integration Troubleshooting Guide

## **Issue: Data Not Saving to Supabase Database**

### **Root Cause Identified**
The issue is with **Row Level Security (RLS) policies** that are blocking anonymous user interactions and salary calculations.

### **✅ Solution Steps**

#### **Step 1: Fix RLS Policies**
Run this SQL in your **Supabase SQL Editor**:

```sql
-- Fix RLS Policies for Anonymous User Interactions
-- Drop existing policies for user_interactions
DROP POLICY IF EXISTS "Users can view own interactions" ON public.user_interactions;
DROP POLICY IF EXISTS "Users can insert own interactions" ON public.user_interactions;
DROP POLICY IF EXISTS "Users can update own interactions" ON public.user_interactions;

-- Create new policies that allow anonymous interactions
CREATE POLICY "Allow anonymous interactions" ON public.user_interactions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own interactions" ON public.user_interactions
  FOR SELECT USING (
    auth.uid() = user_id OR 
    user_id IS NULL
  );

CREATE POLICY "Users can update own interactions" ON public.user_interactions
  FOR UPDATE USING (auth.uid() = user_id);

-- Also fix salary_calculations policies to be more explicit
DROP POLICY IF EXISTS "Users can insert own calculations" ON public.salary_calculations;
CREATE POLICY "Users can insert own calculations" ON public.salary_calculations
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

#### **Step 2: Test the Connection**
Run the connection test:
```bash
node test-supabase-connection.js
```

#### **Step 3: Test Authentication**
1. Visit: `http://localhost:5173/auth-test`
2. Sign up with a test email
3. Check your email for confirmation
4. Sign in with the same credentials
5. Verify authentication status

#### **Step 4: Test the Calculator**
1. Visit: `http://localhost:5173/salary-calculator-supabase`
2. Fill in the form and calculate
3. Check the debug information
4. Verify data is being saved

---

## **🔍 Debug Information**

### **What's Working:**
- ✅ Supabase connection is successful
- ✅ Salary benchmarks data is available
- ✅ Calculator shows real-time results
- ✅ Environment variables are configured

### **What's Not Working:**
- ❌ User interactions not saving (RLS blocking)
- ❌ Salary calculations not saving (authentication required)
- ❌ Analytics tracking failing (RLS policies)

---

## **📊 Expected Behavior After Fix**

### **For Anonymous Users:**
- ✅ Calculator works with real-time data
- ✅ User interactions are tracked
- ✅ No salary calculations saved (by design)

### **For Authenticated Users:**
- ✅ Calculator works with real-time data
- ✅ User interactions are tracked
- ✅ Salary calculations are saved
- ✅ Profile data is accessible

---

## **🎯 Testing Checklist**

### **Before Authentication:**
- [ ] Calculator shows results
- [ ] Debug info shows "Not Authenticated"
- [ ] User interactions are tracked
- [ ] No salary calculations saved

### **After Authentication:**
- [ ] Debug info shows "Authenticated"
- [ ] User ID is displayed
- [ ] Profile is loaded
- [ ] Salary calculations are saved
- [ ] Data appears in Supabase dashboard

---

## **🔧 Manual Database Verification**

### **Check Supabase Dashboard:**
1. Go to your Supabase project
2. Navigate to "Table Editor"
3. Check these tables:
   - `user_interactions` - Should show anonymous interactions
   - `salary_calculations` - Should show authenticated user calculations
   - `profiles` - Should show user profiles

### **Expected Data:**
```sql
-- Check user interactions
SELECT * FROM user_interactions ORDER BY created_at DESC LIMIT 5;

-- Check salary calculations (only for authenticated users)
SELECT * FROM salary_calculations ORDER BY created_at DESC LIMIT 5;

-- Check profiles
SELECT * FROM profiles ORDER BY created_at DESC LIMIT 5;
```

---

## **🚨 Common Issues & Solutions**

### **Issue 1: "new row violates row-level security policy"**
**Solution:** Run the RLS policy fix SQL above

### **Issue 2: "User not authenticated"**
**Solution:** 
1. Use the auth test page: `/auth-test`
2. Sign up and confirm email
3. Sign in with credentials

### **Issue 3: "No market data available"**
**Solution:** 
1. Check `salary_benchmarks` table has data
2. Run the setup script again: `node setup-supabase.js`

### **Issue 4: Environment variables not loading**
**Solution:**
1. Verify `.env.local` file exists
2. Check credentials are correct
3. Restart development server

---

## **📈 Success Metrics**

### **Technical Success:**
- ✅ Connection test passes
- ✅ RLS policies allow anonymous interactions
- ✅ Authentication flow works
- ✅ Data saves correctly

### **User Experience Success:**
- ✅ Calculator loads quickly
- ✅ Real-time data displays
- ✅ Debug information shows status
- ✅ Authentication status is clear

---

## **🎉 Expected Results**

After implementing these fixes, you should see:

1. **Anonymous users:** Interactions tracked, no calculations saved
2. **Authenticated users:** Everything works, data saved
3. **Supabase dashboard:** Shows all interactions and calculations
4. **Real-time updates:** Data appears immediately in dashboard

---

## **📞 Next Steps**

1. **Run the RLS fix SQL** in Supabase
2. **Test the connection** with the test script
3. **Test authentication** with the auth test page
4. **Test the calculator** and verify data saving
5. **Check Supabase dashboard** for saved data

**Your Supabase integration will be fully functional! 🚀** 