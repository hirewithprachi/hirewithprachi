-- Manual Database Setup for HireWithPrachi
-- Execute this in Supabase Dashboard > SQL Editor
-- This will create all missing tables, functions, and policies

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- CREATE MISSING CORE TABLES
-- ============================================================================

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    company_name TEXT,
    job_title TEXT,
    company_size TEXT CHECK (company_size IN ('startup', 'small', 'medium', 'large', 'enterprise')),
    industry TEXT,
    phone TEXT,
    subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'basic', 'premium', 'enterprise')),
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin users table
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'admin',
    permissions JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT,
    excerpt TEXT,
    author_id UUID REFERENCES public.profiles(id),
    category TEXT,
    tags TEXT[],
    featured_image_url TEXT,
    published_at TIMESTAMP WITH TIME ZONE,
    read_count INTEGER DEFAULT 0,
    engagement_score DECIMAL(3,2) DEFAULT 0,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resources table
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category_id UUID REFERENCES public.resource_categories(id),
    type TEXT CHECK (type IN ('template', 'checklist', 'guide', 'tool', 'document')),
    file_path TEXT,
    file_size_bytes INTEGER,
    mime_type TEXT DEFAULT 'application/pdf',
    tags TEXT[],
    is_featured BOOLEAN DEFAULT false,
    is_premium BOOLEAN DEFAULT false,
    requires_lead_capture BOOLEAN DEFAULT true,
    ai_summary TEXT,
    preview_image_url TEXT,
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resource categories table
CREATE TABLE IF NOT EXISTS public.resource_categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT DEFAULT 'FileText',
    color TEXT DEFAULT 'blue',
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add trigger for resource_categories updated_at
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_resource_categories_updated_at') THEN
        CREATE TRIGGER update_resource_categories_updated_at
        BEFORE UPDATE ON public.resource_categories
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Add trigger for resources updated_at
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_resources_updated_at') THEN
        CREATE TRIGGER update_resources_updated_at
        BEFORE UPDATE ON public.resources
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Videos table
CREATE TABLE IF NOT EXISTS public.videos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    duration INTEGER,
    category TEXT,
    tags TEXT[],
    view_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resource downloads tracking table
CREATE TABLE IF NOT EXISTS public.resource_downloads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    resource_id UUID REFERENCES public.resources(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    user_email TEXT NOT NULL,
    user_name TEXT,
    company_name TEXT,
    phone TEXT,
    ip_address TEXT,
    user_agent TEXT,
    referrer TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    download_url TEXT,
    download_completed BOOLEAN DEFAULT false,
    download_completed_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Download tokens table
CREATE TABLE IF NOT EXISTS public.download_tokens (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    token TEXT NOT NULL UNIQUE,
    user_email TEXT NOT NULL,
    resource_id UUID REFERENCES public.resources(id),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_used BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- CALCULATOR TABLES
-- ============================================================================

-- Salary calculations table
CREATE TABLE IF NOT EXISTS public.salary_calculations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id),
    position TEXT NOT NULL,
    experience_level TEXT NOT NULL,
    location TEXT NOT NULL,
    industry TEXT,
    education_level TEXT,
    company_size TEXT,
    calculated_salary_min DECIMAL(10,2),
    calculated_salary_max DECIMAL(10,2),
    calculated_salary_median DECIMAL(10,2),
    market_average DECIMAL(10,2),
    confidence_score DECIMAL(3,2),
    calculation_factors JSONB,
    is_saved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- HR cost analysis table
CREATE TABLE IF NOT EXISTS public.hr_cost_analysis (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id),
    company_size TEXT NOT NULL,
    industry TEXT,
    current_hr_costs DECIMAL(12,2),
    projected_savings DECIMAL(12,2),
    roi_percentage DECIMAL(5,2),
    implementation_cost DECIMAL(12,2),
    payback_period_months INTEGER,
    recommendations JSONB,
    analysis_factors JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Compliance audits table
CREATE TABLE IF NOT EXISTS public.compliance_audits (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id),
    company_id UUID,
    audit_date DATE NOT NULL,
    risk_score INTEGER CHECK (risk_score >= 0 AND risk_score <= 100),
    compliance_status TEXT CHECK (compliance_status IN ('compliant', 'at_risk', 'non_compliant')),
    industry TEXT,
    company_size TEXT,
    audit_results JSONB,
    action_items JSONB,
    next_review_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Calculator sessions table  
CREATE TABLE IF NOT EXISTS public.calculator_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    calculator_type TEXT NOT NULL,
    session_data JSONB DEFAULT '{}',
    results JSONB DEFAULT '{}',
    is_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Salary benchmarks table
CREATE TABLE IF NOT EXISTS public.salary_benchmarks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    position TEXT NOT NULL,
    location TEXT NOT NULL,
    experience_level TEXT NOT NULL,
    industry TEXT,
    salary_min DECIMAL(10,2),
    salary_max DECIMAL(10,2),
    salary_median DECIMAL(10,2),
    salary_mean DECIMAL(10,2),
    data_source TEXT,
    sample_size INTEGER,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(position, location, experience_level, industry)
);

-- Market trends table
CREATE TABLE IF NOT EXISTS public.market_trends (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    metric_type TEXT NOT NULL,
    industry TEXT,
    location TEXT,
    trend_value DECIMAL(10,2),
    change_percentage DECIMAL(5,2),
    forecast_period TEXT,
    confidence_level DECIMAL(3,2),
    data_source TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User interactions table
CREATE TABLE IF NOT EXISTS public.user_interactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id),
    tool_type TEXT NOT NULL,
    tool_id TEXT,
    interaction_type TEXT CHECK (interaction_type IN ('view', 'calculate', 'download', 'share', 'save')),
    interaction_data JSONB,
    session_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI recommendations table
CREATE TABLE IF NOT EXISTS public.ai_recommendations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id),
    recommendation_type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    priority INTEGER DEFAULT 1,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'implemented', 'dismissed')),
    recommendation_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.download_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salary_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hr_cost_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calculator_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_recommendations ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to get current user email
CREATE OR REPLACE FUNCTION public.current_user_email()
RETURNS text
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE(NULLIF(auth.jwt() ->> 'email', ''), NULL);
$$;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin_user(user_email TEXT DEFAULT NULL)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_email text := user_email;
BEGIN
  IF v_email IS NULL THEN
    v_email := auth.jwt() ->> 'email';
  END IF;

  -- Prefer match by user_id when available
  IF v_uid IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.admin_users au
    WHERE au.user_id = v_uid AND au.is_active = true AND au.role = 'admin'
  ) THEN
    RETURN true;
  END IF;

  IF v_email IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.admin_users au
    WHERE au.email = v_email AND au.is_active = true AND au.role = 'admin'
  ) THEN
    RETURN true;
  END IF;

  RETURN false;
END;
$$;

-- Function to get admin permissions
CREATE OR REPLACE FUNCTION public.get_admin_permissions(user_email TEXT DEFAULT NULL)
RETURNS JSONB AS $$
DECLARE
    user_permissions JSONB;
BEGIN
    IF user_email IS NULL THEN
        user_email := auth.jwt() ->> 'email';
    END IF;
    
    SELECT permissions INTO user_permissions
    FROM public.admin_users 
    WHERE email = user_email 
    AND is_active = true;
    
    RETURN COALESCE(user_permissions, '[]'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- Profiles policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Admin users policies
DROP POLICY IF EXISTS "Admin users viewable by authenticated" ON public.admin_users;
CREATE POLICY "Admin users viewable by authenticated" ON public.admin_users
    FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin users insertable by service role" ON public.admin_users;
CREATE POLICY "Admin users insertable by service role" ON public.admin_users

-- Resource categories policies
DROP POLICY IF EXISTS "Public read resource categories" ON public.resource_categories;
CREATE POLICY "Public read resource categories" ON public.resource_categories
    FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Admin manage resource categories" ON public.resource_categories;
CREATE POLICY "Admin manage resource categories" ON public.resource_categories
    FOR ALL USING (auth.role() = 'authenticated');

-- Resources policies
DROP POLICY IF EXISTS "Public read resources" ON public.resources;
CREATE POLICY "Public read resources" ON public.resources
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin manage resources" ON public.resources;
CREATE POLICY "Admin manage resources" ON public.resources
    FOR ALL USING (auth.role() = 'authenticated');

-- Resource downloads policies
DROP POLICY IF EXISTS "Public insert resource downloads" ON public.resource_downloads;
CREATE POLICY "Public insert resource downloads" ON public.resource_downloads
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin read resource downloads" ON public.resource_downloads;
CREATE POLICY "Admin read resource downloads" ON public.resource_downloads
    FOR SELECT USING (auth.role() = 'authenticated');
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Blog posts policies
DROP POLICY IF EXISTS "Public read published blog posts" ON public.blog_posts;
CREATE POLICY "Public read published blog posts" ON public.blog_posts
  FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Admin manage blog posts" ON public.blog_posts;
CREATE POLICY "Admin manage blog posts" ON public.blog_posts
  FOR ALL USING (public.is_admin_user());

-- Resources policies
DROP POLICY IF EXISTS "Public read resources" ON public.resources;
CREATE POLICY "Public read resources" ON public.resources
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin manage resources" ON public.resources;
CREATE POLICY "Admin manage resources" ON public.resources
  FOR ALL USING (public.is_admin_user());

-- Resource categories policies
DROP POLICY IF EXISTS "Public read resource categories" ON public.resource_categories;
CREATE POLICY "Public read resource categories" ON public.resource_categories
  FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Admin manage resource categories" ON public.resource_categories;
CREATE POLICY "Admin manage resource categories" ON public.resource_categories
  FOR ALL USING (public.is_admin_user());

-- Videos policies
DROP POLICY IF EXISTS "Public read active videos" ON public.videos;
CREATE POLICY "Public read active videos" ON public.videos
  FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "Admin manage videos" ON public.videos;
CREATE POLICY "Admin manage videos" ON public.videos
  FOR ALL USING (public.is_admin_user());

-- Download tokens policies
DROP POLICY IF EXISTS "Users access own tokens" ON public.download_tokens;
CREATE POLICY "Users access own tokens" ON public.download_tokens
  FOR SELECT USING (user_email = public.current_user_email());

-- Calculator policies
DROP POLICY IF EXISTS "Users view own calculations" ON public.salary_calculations;
CREATE POLICY "Users view own calculations" ON public.salary_calculations
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert own calculations" ON public.salary_calculations;
CREATE POLICY "Users insert own calculations" ON public.salary_calculations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users update own calculations" ON public.salary_calculations;
CREATE POLICY "Users update own calculations" ON public.salary_calculations
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users view own analysis" ON public.hr_cost_analysis;
CREATE POLICY "Users view own analysis" ON public.hr_cost_analysis
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert own analysis" ON public.hr_cost_analysis;
CREATE POLICY "Users insert own analysis" ON public.hr_cost_analysis
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users view own sessions" ON public.calculator_sessions;
CREATE POLICY "Users view own sessions" ON public.calculator_sessions
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert own sessions" ON public.calculator_sessions;
CREATE POLICY "Users insert own sessions" ON public.calculator_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users update own sessions" ON public.calculator_sessions;
CREATE POLICY "Users update own sessions" ON public.calculator_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Public read access for market data
DROP POLICY IF EXISTS "Public read benchmarks" ON public.salary_benchmarks;
CREATE POLICY "Public read benchmarks" ON public.salary_benchmarks
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read trends" ON public.market_trends;
CREATE POLICY "Public read trends" ON public.market_trends
  FOR SELECT USING (true);

-- User interaction policies
DROP POLICY IF EXISTS "Users view own interactions" ON public.user_interactions;
CREATE POLICY "Users view own interactions" ON public.user_interactions
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert own interactions" ON public.user_interactions;
CREATE POLICY "Users insert own interactions" ON public.user_interactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- AI recommendations policies
DROP POLICY IF EXISTS "Users view own recommendations" ON public.ai_recommendations;
CREATE POLICY "Users view own recommendations" ON public.ai_recommendations
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert own recommendations" ON public.ai_recommendations;
CREATE POLICY "Users insert own recommendations" ON public.ai_recommendations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- TRIGGERS AND FUNCTIONS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
-- Check and create triggers only if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_profiles_updated_at') THEN
        CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
        FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_admin_users_updated_at') THEN
        CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON public.admin_users
        FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_blog_posts_updated_at') THEN
        CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
        FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_resources_updated_at') THEN
        CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON public.resources
        FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_videos_updated_at') THEN
        CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON public.videos
        FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_calculator_sessions_updated_at') THEN
        CREATE TRIGGER update_calculator_sessions_updated_at BEFORE UPDATE ON public.calculator_sessions
        FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
END $$;

-- ============================================================================
-- INSERT ADMIN USER
-- ============================================================================

-- Insert admin user
INSERT INTO public.admin_users (email, role, permissions, is_active) VALUES
    ('prachishri005@gmail.com', 'admin', '["read", "write", "delete", "admin"]', true)
ON CONFLICT (email) DO UPDATE SET
    role = EXCLUDED.role,
    permissions = EXCLUDED.permissions,
    is_active = EXCLUDED.is_active,
    updated_at = NOW();

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================

GRANT EXECUTE ON FUNCTION public.current_user_email() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin_user(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_admin_permissions(TEXT) TO authenticated;

-- Grant table permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- ============================================================================
-- STORAGE BUCKETS
-- ============================================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-images',
  'blog-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'general-files',
  'general-files',
  true,
  10485760,
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
) ON CONFLICT (id) DO NOTHING;

-- Storage policies for blog-images
DROP POLICY IF EXISTS "Public Access Blog Images" ON storage.objects;
CREATE POLICY "Public Access Blog Images" ON storage.objects 
  FOR SELECT USING (bucket_id = 'blog-images');

DROP POLICY IF EXISTS "Authenticated users upload blog images" ON storage.objects;
CREATE POLICY "Authenticated users upload blog images" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users update blog images" ON storage.objects;
CREATE POLICY "Authenticated users update blog images" ON storage.objects 
  FOR UPDATE USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users delete blog images" ON storage.objects;
CREATE POLICY "Authenticated users delete blog images" ON storage.objects 
  FOR DELETE USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

-- Storage policies for general-files
DROP POLICY IF EXISTS "Public Access General Files" ON storage.objects;
CREATE POLICY "Public Access General Files" ON storage.objects 
  FOR SELECT USING (bucket_id = 'general-files');

DROP POLICY IF EXISTS "Authenticated users upload files" ON storage.objects;
CREATE POLICY "Authenticated users upload files" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id = 'general-files' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users update files" ON storage.objects;
CREATE POLICY "Authenticated users update files" ON storage.objects 
  FOR UPDATE USING (bucket_id = 'general-files' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users delete files" ON storage.objects;
CREATE POLICY "Authenticated users delete files" ON storage.objects 
  FOR DELETE USING (bucket_id = 'general-files' AND auth.role() = 'authenticated');

-- ============================================================================
-- AI HR TOOLS & SERVICES TABLES
-- ============================================================================



-- ============================================================================
-- ADMIN DASHBOARD MISSING TABLES
-- ============================================================================

-- Notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
    is_read BOOLEAN DEFAULT false,
    action_url TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activity logs table
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT,
    entity_id TEXT,
    details JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email logs table
CREATE TABLE IF NOT EXISTS public.email_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    recipient_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    template_name TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'bounced')),
    provider TEXT DEFAULT 'sendgrid',
    metadata JSONB DEFAULT '{}',
    error_message TEXT,
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Calculator results table (for salary calculator, etc.)
CREATE TABLE IF NOT EXISTS public.calculator_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    calculator_type TEXT NOT NULL,
    input_data JSONB NOT NULL,
    result_data JSONB NOT NULL,
    session_id TEXT,
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- WhatsApp integrations table
CREATE TABLE IF NOT EXISTS public.whatsapp_integrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    access_token TEXT NOT NULL,
    webhook_url TEXT,
    verify_token TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- WhatsApp messages table
CREATE TABLE IF NOT EXISTS public.whatsapp_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    integration_id UUID REFERENCES public.whatsapp_integrations(id) ON DELETE CASCADE,
    message_id TEXT UNIQUE NOT NULL,
    from_number TEXT NOT NULL,
    to_number TEXT NOT NULL,
    message_type TEXT NOT NULL CHECK (message_type IN ('text', 'image', 'document', 'audio', 'video')),
    content TEXT,
    media_url TEXT,
    status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'read', 'failed')),
    is_incoming BOOLEAN DEFAULT false,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email automation rules table
CREATE TABLE IF NOT EXISTS public.email_automations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    trigger_event TEXT NOT NULL,
    conditions JSONB DEFAULT '{}',
    email_template TEXT NOT NULL,
    subject_template TEXT NOT NULL,
    delay_hours INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payment attempts table for tracking incomplete payments
CREATE TABLE IF NOT EXISTS public.payment_attempts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    tool_id UUID,
    session_id TEXT,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'INR',
    status TEXT DEFAULT 'initiated' CHECK (status IN ('initiated', 'pending', 'completed', 'failed', 'abandoned')),
    payment_method TEXT,
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    failure_reason TEXT,
    user_details JSONB,
    tool_details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leads table for tracking potential customers
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT, -- Full name field for display purposes
    first_name TEXT NOT NULL,
    last_name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    company_name TEXT,
    job_title TEXT,
    industry TEXT,
    company_size TEXT,
    source TEXT DEFAULT 'website',
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
    lead_score INTEGER DEFAULT 0,
    notes TEXT,
    assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    converted_at TIMESTAMP WITH TIME ZONE,
    last_contacted_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System settings table
CREATE TABLE IF NOT EXISTS public.system_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_key TEXT UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    setting_type TEXT DEFAULT 'general' CHECK (setting_type IN ('general', 'email', 'payment', 'security', 'integration')),
    description TEXT,
    is_encrypted BOOLEAN DEFAULT false,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Form submissions table
CREATE TABLE IF NOT EXISTS public.form_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    form_type TEXT NOT NULL,
    form_data JSONB NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    session_id TEXT,
    ip_address INET,
    user_agent TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'processed', 'archived')),
    processed_at TIMESTAMP WITH TIME ZONE,
    processed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- WhatsApp automation rules table
CREATE TABLE IF NOT EXISTS public.whatsapp_automations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    trigger_event TEXT NOT NULL,
    conditions JSONB DEFAULT '{}',
    message_template TEXT NOT NULL,
    delay_hours INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    integration_id UUID REFERENCES public.whatsapp_integrations(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- RLS POLICIES FOR NEW TABLES
-- ============================================================================

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calculator_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert notifications" ON public.notifications
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Users can update own notifications" ON public.notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- Activity logs policies
CREATE POLICY "Service role can insert activity logs" ON public.activity_logs
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Authenticated users can view activity logs" ON public.activity_logs
    FOR SELECT USING (auth.role() = 'authenticated');

-- Email logs policies
CREATE POLICY "Service role can manage email logs" ON public.email_logs
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Authenticated users can view email logs" ON public.email_logs
    FOR SELECT USING (auth.role() = 'authenticated');

-- Calculator results policies
CREATE POLICY "Users can view own calculator results" ON public.calculator_results
    FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert calculator results" ON public.calculator_results
    FOR INSERT WITH CHECK (true);

-- WhatsApp integrations policies
CREATE POLICY "Service role can manage whatsapp integrations" ON public.whatsapp_integrations
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Authenticated users can view whatsapp integrations" ON public.whatsapp_integrations
    FOR SELECT USING (auth.role() = 'authenticated');

-- WhatsApp messages policies
CREATE POLICY "Service role can manage whatsapp messages" ON public.whatsapp_messages
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Authenticated users can view whatsapp messages" ON public.whatsapp_messages
    FOR SELECT USING (auth.role() = 'authenticated');

-- Email automations policies
CREATE POLICY "Service role can manage email automations" ON public.email_automations
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Authenticated users can view email automations" ON public.email_automations
    FOR SELECT USING (auth.role() = 'authenticated');

-- WhatsApp automations policies
CREATE POLICY "Service role can manage whatsapp automations" ON public.whatsapp_automations
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Authenticated users can view whatsapp automations" ON public.whatsapp_automations
    FOR SELECT USING (auth.role() = 'authenticated');

-- Payment attempts policies
CREATE POLICY "Users can view own payment attempts" ON public.payment_attempts
    FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert payment attempts" ON public.payment_attempts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can manage payment attempts" ON public.payment_attempts
    FOR ALL USING (auth.role() = 'service_role');

-- Leads policies
CREATE POLICY "Service role can manage leads" ON public.leads
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Authenticated users can view leads" ON public.leads
    FOR SELECT USING (auth.role() = 'authenticated');

-- System settings policies
CREATE POLICY "Service role can manage system settings" ON public.system_settings
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Authenticated users can view system settings" ON public.system_settings
    FOR SELECT USING (auth.role() = 'authenticated');

-- Form submissions policies
CREATE POLICY "Users can view own form submissions" ON public.form_submissions
    FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert form submissions" ON public.form_submissions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can manage form submissions" ON public.form_submissions
    FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON public.activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON public.email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_created_at ON public.email_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_calculator_results_user_id ON public.calculator_results(user_id);
CREATE INDEX IF NOT EXISTS idx_calculator_results_type ON public.calculator_results(calculator_type);
CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_integration_id ON public.whatsapp_messages(integration_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_created_at ON public.whatsapp_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payment_attempts_user_id ON public.payment_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_attempts_status ON public.payment_attempts(status);
CREATE INDEX IF NOT EXISTS idx_payment_attempts_created_at ON public.payment_attempts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payment_attempts_razorpay_order_id ON public.payment_attempts(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON public.leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_system_settings_key ON public.system_settings(setting_key);
CREATE INDEX IF NOT EXISTS idx_system_settings_type ON public.system_settings(setting_type);
CREATE INDEX IF NOT EXISTS idx_form_submissions_type ON public.form_submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_form_submissions_status ON public.form_submissions(status);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON public.form_submissions(created_at DESC);

-- ============================================================================
-- SAMPLE DATA FOR TESTING
-- ============================================================================

-- Insert sample email automation rules
INSERT INTO public.email_automations (name, trigger_event, email_template, subject_template, delay_hours, is_active) VALUES
('Welcome Email', 'user_registered', 'Welcome to Hire with Prachi! We are excited to have you on board.', 'Welcome to Hire with Prachi', 0, true),
('Tool Purchase Confirmation', 'tool_purchased', 'Thank you for purchasing {{tool_name}}. You can access it from your dashboard.', 'Purchase Confirmation - {{tool_name}}', 0, true),
('Onboarding Follow-up', 'user_registered', 'Hi {{user_name}}, How are you finding our platform? Need any help?', 'How are you finding Hire with Prachi?', 24, true)
ON CONFLICT DO NOTHING;

-- Insert sample leads data
INSERT INTO public.leads (name, first_name, last_name, email, phone, company_name, job_title, industry, company_size, source, status, lead_score) VALUES
('Rajesh Kumar', 'Rajesh', 'Kumar', 'rajesh@techcorp.com', '+91-9876543210', 'TechCorp Solutions', 'HR Manager', 'Technology', 'medium', 'website', 'new', 85),
('Priya Sharma', 'Priya', 'Sharma', 'priya@innovate.in', '+91-9876543211', 'Innovate India', 'CHRO', 'Consulting', 'large', 'referral', 'contacted', 92),
('Amit Patel', 'Amit', 'Patel', 'amit@startup.com', '+91-9876543212', 'StartupXYZ', 'Founder', 'Startup', 'small', 'social_media', 'qualified', 78),
('Sneha Gupta', 'Sneha', 'Gupta', 'sneha@manufacturing.co', '+91-9876543213', 'Manufacturing Co', 'HR Director', 'Manufacturing', 'large', 'website', 'new', 67),
('Vikram Singh', 'Vikram', 'Singh', 'vikram@services.in', '+91-9876543214', 'Service Solutions', 'VP HR', 'Services', 'medium', 'email_campaign', 'contacted', 89)
ON CONFLICT DO NOTHING;

-- Insert sample system settings
INSERT INTO public.system_settings (setting_key, setting_value, setting_type, description) VALUES
('site_title', '"Hire with Prachi - Professional HR Solutions"', 'general', 'Website title'),
('contact_email', '"contact@hirewithprachi.com"', 'general', 'Main contact email'),
('support_phone', '"+91-XXXXXXXXXX"', 'general', 'Support phone number'),
('razorpay_key_id', '"rzp_live_gYfIm4bEnYMjkf"', 'payment', 'Razorpay Key ID'),
('email_provider', '"sendgrid"', 'email', 'Email service provider'),
('max_file_size', '10485760', 'general', 'Maximum file upload size in bytes'),
('session_timeout', '3600', 'security', 'Session timeout in seconds'),
('backup_retention_days', '30', 'general', 'Backup retention period in days'),
('api_rate_limit', '1000', 'security', 'API requests per hour per user'),
('maintenance_mode', 'false', 'general', 'Maintenance mode status')
ON CONFLICT (setting_key) DO NOTHING;

-- Insert sample form submissions
INSERT INTO public.form_submissions (form_type, form_data, status) VALUES
('contact', '{"name": "John Doe", "email": "john@example.com", "message": "Interested in HR services", "company": "Example Corp"}', 'new'),
('consultation', '{"name": "Jane Smith", "email": "jane@company.com", "phone": "+91-9876543215", "service": "Recruitment", "budget": "50000-100000"}', 'new'),
('demo_request', '{"name": "Mike Johnson", "email": "mike@startup.io", "tool": "AI Resume Parser", "company_size": "10-50"}', 'processed')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- COMPLETION MESSAGE
-- ============================================================================

-- Fix for Resource Manager File Upload - Add missing RLS policies
-- These policies allow authenticated users to upload files and manage resources

-- Enable RLS on resources table if not already enabled
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Admin manage resources" ON public.resources;
DROP POLICY IF EXISTS "Public read resources" ON public.resources;

-- Create comprehensive policies for resources table
CREATE POLICY "Public read resources" ON public.resources
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert resources" ON public.resources
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update resources" ON public.resources
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete resources" ON public.resources
    FOR DELETE USING (auth.role() = 'authenticated');

-- Enable RLS on resource_categories table if not already enabled
ALTER TABLE public.resource_categories ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Admin manage resource categories" ON public.resource_categories;
DROP POLICY IF EXISTS "Public read resource categories" ON public.resource_categories;

-- Create comprehensive policies for resource_categories table
CREATE POLICY "Public read resource categories" ON public.resource_categories
    FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can insert resource categories" ON public.resource_categories
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update resource categories" ON public.resource_categories
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete resource categories" ON public.resource_categories
    FOR DELETE USING (auth.role() = 'authenticated');

-- Enable RLS on resource_downloads table if not already enabled
ALTER TABLE public.resource_downloads ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Admin read resource downloads" ON public.resource_downloads;
DROP POLICY IF EXISTS "Public insert resource downloads" ON public.resource_downloads;

-- Create comprehensive policies for resource_downloads table
CREATE POLICY "Public insert resource downloads" ON public.resource_downloads
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can read resource downloads" ON public.resource_downloads
    FOR SELECT USING (auth.role() = 'authenticated');

-- Create storage bucket for resources if it doesn't exist
-- Note: This requires the storage extension to be enabled
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'resource-downloads',
    'resource-downloads',
    true,
    52428800, -- 50MB limit
    ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'image/jpeg', 'image/png', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for the resource-downloads bucket
CREATE POLICY "Public read access to resource-downloads" ON storage.objects
    FOR SELECT USING (bucket_id = 'resource-downloads');

CREATE POLICY "Authenticated users can upload to resource-downloads" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'resource-downloads' 
        AND auth.role() = 'authenticated'
    );

CREATE POLICY "Authenticated users can update files in resource-downloads" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'resource-downloads' 
        AND auth.role() = 'authenticated'
    );

CREATE POLICY "Authenticated users can delete files from resource-downloads" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'resource-downloads' 
        AND auth.role() = 'authenticated'
    );

SELECT 'Database setup with AI HR Tools and Admin Dashboard completed successfully!' as status;
