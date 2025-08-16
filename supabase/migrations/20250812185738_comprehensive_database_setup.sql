-- Comprehensive Database Setup for HireWithPrachi Platform
-- This migration creates all tables, RLS policies, functions, and triggers
-- needed for the complete HR services platform

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- Users/Profiles table (extends Supabase auth.users)
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
    type TEXT CHECK (type IN ('pdf', 'template', 'checklist', 'guide', 'tool')),
    file_url TEXT,
    download_count INTEGER DEFAULT 0,
    category TEXT,
    tags TEXT[],
    file_size INTEGER,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resource categories table
CREATE TABLE IF NOT EXISTS public.resource_categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Videos table
CREATE TABLE IF NOT EXISTS public.videos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    duration INTEGER, -- in seconds
    category TEXT,
    tags TEXT[],
    view_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leads table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    job_title TEXT,
    company_size TEXT,
    industry TEXT,
    source TEXT,
    lead_score INTEGER DEFAULT 0,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Form submissions table
CREATE TABLE IF NOT EXISTS public.form_submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    form_type TEXT NOT NULL,
    form_data JSONB NOT NULL DEFAULT '{}',
    user_email TEXT,
    user_name TEXT,
    user_phone TEXT,
    user_company TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'processed', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Download tokens table for secure PDF downloads
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

-- ============================================================================
-- MARKET DATA TABLES
-- ============================================================================

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

-- ============================================================================
-- ANALYTICS TABLES
-- ============================================================================

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
-- CHATBOT TABLES
-- ============================================================================

-- Chat conversations table
CREATE TABLE IF NOT EXISTS public.chat_conversations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    session_id TEXT NOT NULL,
    lead_data JSONB DEFAULT '{}',
    conversation_history JSONB DEFAULT '[]',
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
    total_messages INTEGER DEFAULT 0,
    total_tokens INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat messages table
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    conversation_id UUID REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    tokens_used INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Chat table indexes
CREATE INDEX IF NOT EXISTS idx_chat_conversations_session_id ON public.chat_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_user_id ON public.chat_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_status ON public.chat_conversations(status);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_created_at ON public.chat_conversations(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation_id ON public.chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_role ON public.chat_messages(role);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON public.chat_messages(created_at);

-- Other important indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_resources_type ON public.resources(type);
CREATE INDEX IF NOT EXISTS idx_resources_category ON public.resources(category);

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.download_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salary_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hr_cost_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calculator_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

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
    -- If no email provided, use the current user's email
    IF user_email IS NULL THEN
        user_email := auth.jwt() ->> 'email';
    END IF;
    
    -- Get user permissions
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
CREATE POLICY IF NOT EXISTS "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Admin users policies
CREATE POLICY IF NOT EXISTS "Admin users are viewable by authenticated users" ON public.admin_users
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Admin users are insertable by service role" ON public.admin_users
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Blog posts policies
CREATE POLICY IF NOT EXISTS "Public read access for published blog posts" ON public.blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY IF NOT EXISTS "Admin can manage blog posts" ON public.blog_posts
  FOR ALL USING (public.is_admin_user());

-- Resources policies
CREATE POLICY IF NOT EXISTS "Public read access for resources" ON public.resources
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Admin can manage resources" ON public.resources
  FOR ALL USING (public.is_admin_user());

-- Resource categories policies
CREATE POLICY IF NOT EXISTS "Public read access for resource categories" ON public.resource_categories
  FOR SELECT USING (is_active = true);

CREATE POLICY IF NOT EXISTS "Admin can manage resource categories" ON public.resource_categories
  FOR ALL USING (public.is_admin_user());

-- Videos policies
CREATE POLICY IF NOT EXISTS "Public read access for active videos" ON public.videos
  FOR SELECT USING (status = 'active');

CREATE POLICY IF NOT EXISTS "Admin can manage videos" ON public.videos
  FOR ALL USING (public.is_admin_user());

-- Leads policies
CREATE POLICY IF NOT EXISTS "Admin can manage leads" ON public.leads
  FOR ALL USING (public.is_admin_user());

-- Form submissions policies
CREATE POLICY IF NOT EXISTS "Users can insert form submissions" ON public.form_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Admin can view all form submissions" ON public.form_submissions
  FOR SELECT USING (public.is_admin_user());

CREATE POLICY IF NOT EXISTS "Admin can update form submissions" ON public.form_submissions
  FOR UPDATE USING (public.is_admin_user());

-- Download tokens policies
CREATE POLICY IF NOT EXISTS "Users access own tokens" ON public.download_tokens
  FOR SELECT USING (user_email = public.current_user_email());

-- Calculator-related policies
CREATE POLICY IF NOT EXISTS "Users can view own calculations" ON public.salary_calculations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert own calculations" ON public.salary_calculations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update own calculations" ON public.salary_calculations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can view own analysis" ON public.hr_cost_analysis
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert own analysis" ON public.hr_cost_analysis
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can view own sessions" ON public.calculator_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert own sessions" ON public.calculator_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update own sessions" ON public.calculator_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Public read access for market data
CREATE POLICY IF NOT EXISTS "Public read access for benchmarks" ON public.salary_benchmarks
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Public read access for trends" ON public.market_trends
  FOR SELECT USING (true);

-- User interaction policies
CREATE POLICY IF NOT EXISTS "Users can view own interactions" ON public.user_interactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert own interactions" ON public.user_interactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- AI recommendations policies
CREATE POLICY IF NOT EXISTS "Users can view own recommendations" ON public.ai_recommendations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert own recommendations" ON public.ai_recommendations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Chat policies
CREATE POLICY IF NOT EXISTS "Chat conversations are viewable by authenticated users" ON public.chat_conversations
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Chat conversations are insertable by authenticated users" ON public.chat_conversations
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Chat conversations are updatable by authenticated users" ON public.chat_conversations
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Chat messages are viewable by authenticated users" ON public.chat_messages
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Chat messages are insertable by authenticated users" ON public.chat_messages
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

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
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON public.admin_users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON public.resources
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON public.videos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_form_submissions_updated_at BEFORE UPDATE ON public.form_submissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_calculator_sessions_updated_at BEFORE UPDATE ON public.calculator_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_chat_conversations_updated_at BEFORE UPDATE ON public.chat_conversations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to count messages in a conversation
CREATE OR REPLACE FUNCTION public.update_conversation_message_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.chat_conversations 
        SET total_messages = total_messages + 1,
            updated_at = NOW()
        WHERE id = NEW.conversation_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.chat_conversations 
        SET total_messages = total_messages - 1,
            updated_at = NOW()
        WHERE id = OLD.conversation_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for message count
CREATE TRIGGER update_conversation_message_count
    AFTER INSERT OR DELETE ON public.chat_messages
    FOR EACH ROW
    EXECUTE FUNCTION public.update_conversation_message_count();

-- ============================================================================
-- INSERT ADMIN USER
-- ============================================================================

-- Insert the admin user if it doesn't exist
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

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.current_user_email() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin_user(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_admin_permissions(TEXT) TO authenticated;

-- Grant table permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

-- Grant sequence permissions
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- ============================================================================
-- STORAGE SETUP
-- ============================================================================

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-images',
  'blog-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'general-files',
  'general-files',
  true,
  10485760, -- 10MB limit
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
) ON CONFLICT (id) DO NOTHING;

-- Storage policies for blog-images bucket
CREATE POLICY IF NOT EXISTS "Public Access Blog Images" ON storage.objects 
  FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY IF NOT EXISTS "Authenticated users can upload blog images" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Authenticated users can update blog images" ON storage.objects 
  FOR UPDATE USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Authenticated users can delete blog images" ON storage.objects 
  FOR DELETE USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

-- Storage policies for general-files bucket
CREATE POLICY IF NOT EXISTS "Public Access General Files" ON storage.objects 
  FOR SELECT USING (bucket_id = 'general-files');

CREATE POLICY IF NOT EXISTS "Authenticated users can upload files" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id = 'general-files' AND auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Authenticated users can update files" ON storage.objects 
  FOR UPDATE USING (bucket_id = 'general-files' AND auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Authenticated users can delete files" ON storage.objects 
  FOR DELETE USING (bucket_id = 'general-files' AND auth.role() = 'authenticated');

-- ============================================================================
-- COMPLETION MESSAGE
-- ============================================================================

SELECT 'Comprehensive database setup completed successfully!' as status;
