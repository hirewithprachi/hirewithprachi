# 🔧 MANUAL FORM FIX - Execute in Supabase Dashboard

## 🚨 **URGENT: Form Submission 403 Error Fix**

Your forms are failing because of incorrect RLS (Row Level Security) policies. Follow these steps to fix it:

---

## 📋 **STEP 1: Go to Supabase Dashboard**

1. Open: https://supabase.com/dashboard
2. Select your project: `ktqrzokrqizfjqdgwmqs`
3. Go to **SQL Editor** in the left sidebar

---

## 📝 **STEP 2: Execute This SQL Script**

Copy and paste this entire script into the SQL Editor and click **RUN**:

```sql
-- ========================================
-- FIX FORM SUBMISSION 403 ERRORS
-- ========================================

-- 1. FIX FORM_SUBMISSIONS TABLE RLS POLICIES
-- Drop existing problematic policies
DROP POLICY IF EXISTS "Form submissions are viewable by authenticated users" ON public.form_submissions;
DROP POLICY IF EXISTS "Form submissions are insertable by authenticated users" ON public.form_submissions;
DROP POLICY IF EXISTS "Form submissions are updatable by authenticated users" ON public.form_submissions;
DROP POLICY IF EXISTS "Form submissions are deletable by authenticated users" ON public.form_submissions;
DROP POLICY IF EXISTS "Users can insert form submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Admin can view all form submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Admin can update form submissions" ON public.form_submissions;

-- Create new policies that allow anonymous submissions
CREATE POLICY "Allow anonymous form submissions" ON public.form_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin to view all form submissions" ON public.form_submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Allow admin to update form submissions" ON public.form_submissions
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid()
    )
  );

-- 2. FIX LEADS TABLE RLS POLICIES
DROP POLICY IF EXISTS "Allow anonymous lead submissions" ON public.leads;
DROP POLICY IF EXISTS "Allow authenticated users to view own leads" ON public.leads;
DROP POLICY IF EXISTS "Allow admin to view all leads" ON public.leads;
DROP POLICY IF EXISTS "Allow admin to update leads" ON public.leads;

CREATE POLICY "Allow anonymous lead submissions" ON public.leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin to view all leads" ON public.leads
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Allow admin to update leads" ON public.leads
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid()
    )
  );

-- 3. FIX BLOG_POSTS TABLE RLS POLICIES
DROP POLICY IF EXISTS "Public read access for blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admin can manage blog posts" ON public.blog_posts;

CREATE POLICY "Public read access for published blog posts" ON public.blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admin can manage all blog posts" ON public.blog_posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid()
    )
  );

-- 4. FIX RESOURCES TABLE RLS POLICIES
DROP POLICY IF EXISTS "Public read access for resources" ON public.resources;
DROP POLICY IF EXISTS "Admin can manage resources" ON public.resources;

CREATE POLICY "Public read access for all resources" ON public.resources
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage all resources" ON public.resources
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid()
    )
  );

-- 5. FIX USER_INTERACTIONS TABLE RLS POLICIES
DROP POLICY IF EXISTS "Users can view own interactions" ON public.user_interactions;
DROP POLICY IF EXISTS "Users can insert own interactions" ON public.user_interactions;
DROP POLICY IF EXISTS "Admin can view all interactions" ON public.user_interactions;

CREATE POLICY "Allow anonymous interactions" ON public.user_interactions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can view all interactions" ON public.user_interactions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid()
    )
  );

-- 6. FIX CALCULATOR TABLES RLS POLICIES
-- Salary calculations
DROP POLICY IF EXISTS "Users can view own calculations" ON public.salary_calculations;
DROP POLICY IF EXISTS "Users can insert own calculations" ON public.salary_calculations;
DROP POLICY IF EXISTS "Users can update own calculations" ON public.salary_calculations;

CREATE POLICY "Allow anonymous calculations" ON public.salary_calculations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can view all calculations" ON public.salary_calculations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid()
    )
  );

-- HR cost analysis
DROP POLICY IF EXISTS "Users can view own analysis" ON public.hr_cost_analysis;
DROP POLICY IF EXISTS "Users can insert own analysis" ON public.hr_cost_analysis;

CREATE POLICY "Allow anonymous cost analysis" ON public.hr_cost_analysis
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can view all cost analysis" ON public.hr_cost_analysis
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid()
    )
  );

-- Compliance audits
DROP POLICY IF EXISTS "Users can view own audits" ON public.compliance_audits;
DROP POLICY IF EXISTS "Users can insert own audits" ON public.compliance_audits;

CREATE POLICY "Allow anonymous compliance audits" ON public.compliance_audits
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can view all compliance audits" ON public.compliance_audits
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid()
    )
  );

-- 7. FIX AI RECOMMENDATIONS TABLE RLS POLICIES
DROP POLICY IF EXISTS "Users can view own recommendations" ON public.ai_recommendations;
DROP POLICY IF EXISTS "Users can insert own recommendations" ON public.ai_recommendations;

CREATE POLICY "Allow anonymous AI recommendations" ON public.ai_recommendations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can view all AI recommendations" ON public.ai_recommendations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid()
    )
  );

-- 8. ENSURE PUBLIC ACCESS TO MARKET DATA
DROP POLICY IF EXISTS "Public read access for benchmarks" ON public.salary_benchmarks;
DROP POLICY IF EXISTS "Public read access for trends" ON public.market_trends;

CREATE POLICY "Public read access for salary benchmarks" ON public.salary_benchmarks
  FOR SELECT USING (true);

CREATE POLICY "Public read access for market trends" ON public.market_trends
  FOR SELECT USING (true);

-- 9. GRANT NECESSARY PERMISSIONS
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.form_submissions TO anon, authenticated, service_role;
GRANT ALL ON public.leads TO anon, authenticated, service_role;
GRANT ALL ON public.blog_posts TO anon, authenticated, service_role;
GRANT ALL ON public.resources TO anon, authenticated, service_role;
GRANT ALL ON public.user_interactions TO anon, authenticated, service_role;
GRANT ALL ON public.salary_calculations TO anon, authenticated, service_role;
GRANT ALL ON public.hr_cost_analysis TO anon, authenticated, service_role;
GRANT ALL ON public.compliance_audits TO anon, authenticated, service_role;
GRANT ALL ON public.ai_recommendations TO anon, authenticated, service_role;
GRANT ALL ON public.salary_benchmarks TO anon, authenticated, service_role;
GRANT ALL ON public.market_trends TO anon, authenticated, service_role;

-- 10. GRANT SEQUENCE PERMISSIONS
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

-- 11. VERIFY RLS IS ENABLED
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salary_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hr_cost_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salary_benchmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_trends ENABLE ROW LEVEL SECURITY;

-- SUCCESS MESSAGE
SELECT '✅ RLS policies fixed successfully! Forms should now work for anonymous users.' as status;
```

---

## ✅ **STEP 3: Verify the Fix**

After running the SQL, test your forms:

1. **Go to your website**: http://localhost:5175/
2. **Try submitting a contact form**
3. **Check the browser console** - should see success instead of 403 errors
4. **Check admin dashboard** - should see the new submission

---

## 🧪 **STEP 4: Test All Forms**

Test these forms to ensure they work:

- ✅ **Main Contact Form** (Homepage)
- ✅ **CTA Form** (Call-to-action forms)
- ✅ **Calculator Forms** (Salary, HR Cost, Benefits)
- ✅ **Blog Comment Forms** (if any)
- ✅ **Resource Download Forms** (if any)

---

## 🔍 **STEP 5: Check Admin Dashboard**

1. **Login to admin**: http://localhost:5175/admin
   - Email: `prachishri005@gmail.com`
   - Password: `PrachiAdmin2025!`

2. **Verify you can see**:
   - ✅ New form submissions
   - ✅ Lead data
   - ✅ All tables accessible

---

## 🚨 **If Still Having Issues**

If forms still don't work after this fix:

1. **Check browser console** for specific error messages
2. **Clear browser cache** and try again
3. **Check Supabase logs** in the dashboard
4. **Verify environment variables** are correct

---

## 📞 **Need Help?**

If you're still experiencing issues after following these steps, the problem might be:

1. **Environment variables** not set correctly
2. **Supabase client configuration** issues
3. **Network connectivity** problems
4. **Browser security** settings

---

## 🎉 **Expected Result**

After applying this fix:

- ✅ **All forms submit successfully**
- ✅ **No more 403 errors**
- ✅ **Admin dashboard shows all data**
- ✅ **Calculators work properly**
- ✅ **Blog posts display correctly**
- ✅ **Resources are accessible**

**Your forms should work immediately after running this SQL script!**
