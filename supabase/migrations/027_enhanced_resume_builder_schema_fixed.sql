-- Enhanced Resume Builder Database Schema (FIXED VERSION)
-- This version fixes all dependency and column reference issues

-- =============================================
-- IMPORTANT: Run migrations in this order:
-- 1. This file (027_enhanced_resume_builder_schema_fixed.sql)
-- 2. Then 030_collaboration_system_fixed.sql
-- =============================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- User Profiles (Enhanced)
-- =============================================

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    full_name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    location TEXT,
    headline TEXT,
    links JSONB DEFAULT '{}',
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Resume Management
-- =============================================

CREATE TABLE IF NOT EXISTS resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT DEFAULT 'My Resume' NOT NULL,
    primary_language TEXT DEFAULT 'en' NOT NULL,
    template_key TEXT DEFAULT 'modern' NOT NULL,
    ats_score NUMERIC DEFAULT 0,
    jd_match JSONB DEFAULT NULL,
    current_version_id UUID,
    is_active BOOLEAN DEFAULT true,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS resume_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE NOT NULL,
    version INTEGER NOT NULL,
    data JSONB NOT NULL,
    notes TEXT,
    word_count INTEGER DEFAULT 0,
    page_count INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add foreign key constraint for current_version_id (after resume_versions table exists)
-- ALTER TABLE resumes 
-- ADD CONSTRAINT fk_resumes_current_version 
-- FOREIGN KEY (current_version_id) REFERENCES resume_versions(id);

-- =============================================
-- Resume Templates
-- =============================================

CREATE TABLE IF NOT EXISTS resume_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    preview_url TEXT,
    is_premium BOOLEAN DEFAULT false,
    features TEXT[] DEFAULT '{}',
    color_scheme JSONB DEFAULT '{}',
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default templates
INSERT INTO resume_templates (key, name, description, category, is_premium, features, color_scheme, sort_order) 
VALUES
('modern', 'Modern Professional', 'Clean, modern design for corporate roles', 'professional', false, ARRAY['ATS-friendly', 'Professional', 'Clean layout'], '{"primary": "#3B82F6", "secondary": "#1F2937"}', 1),
('minimal', 'Minimal Clean', 'Simple, elegant design', 'minimal', false, ARRAY['Minimalist', 'Elegant', 'Easy to read'], '{"primary": "#6B7280", "secondary": "#374151"}', 2),
('corporate', 'Corporate Executive', 'Sophisticated design for senior roles', 'executive', true, ARRAY['Executive', 'Sophisticated', 'Leadership-focused'], '{"primary": "#4F46E5", "secondary": "#1E1B4B"}', 3),
('creative', 'Creative Portfolio', 'Bold design for creative industries', 'creative', true, ARRAY['Visual appeal', 'Creative', 'Portfolio-ready'], '{"primary": "#7C3AED", "secondary": "#581C87"}', 4)
ON CONFLICT (key) DO NOTHING;

-- =============================================
-- Export Management
-- =============================================

CREATE TABLE IF NOT EXISTS exports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE NOT NULL,
    version_id UUID REFERENCES resume_versions(id) ON DELETE CASCADE NOT NULL,
    format TEXT CHECK (format IN ('pdf', 'docx', 'html')) NOT NULL,
    template_key TEXT NOT NULL,
    storage_path TEXT,
    file_size BIGINT,
    download_count INTEGER DEFAULT 0,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Subscription & Quota Management
-- =============================================

CREATE TABLE IF NOT EXISTS subscriptions (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    plan TEXT CHECK (plan IN ('free', 'pro', 'enterprise')) DEFAULT 'free' NOT NULL,
    status TEXT CHECK (status IN ('active', 'cancelled', 'expired', 'pending')) DEFAULT 'active',
    starts_at TIMESTAMPTZ DEFAULT NOW(),
    renews_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    razorpay_subscription_id TEXT,
    razorpay_customer_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS usage_quotas (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    month_key TEXT NOT NULL, -- e.g., '2025-08'
    ai_polish_count INTEGER DEFAULT 0,
    exports_count INTEGER DEFAULT 0,
    active_resumes INTEGER DEFAULT 0,
    jd_analysis_count INTEGER DEFAULT 0,
    cover_letter_count INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, month_key)
);

-- =============================================
-- AI & Content Enhancement
-- =============================================

CREATE TABLE IF NOT EXISTS ai_polish_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
    field_path TEXT NOT NULL,
    original_text TEXT NOT NULL,
    polished_text TEXT NOT NULL,
    polish_type TEXT DEFAULT 'general',
    tokens_used INTEGER DEFAULT 0,
    cost_cents INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS jd_analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
    jd_text TEXT NOT NULL,
    jd_hash TEXT NOT NULL,
    analysis_result JSONB NOT NULL,
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '24 hours'),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Analytics & Events
-- =============================================

CREATE TABLE IF NOT EXISTS tool_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
    event TEXT NOT NULL, -- 'resume_created', 'template_changed', 'ai_polish_used', etc.
    meta JSONB DEFAULT '{}',
    session_id TEXT,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- LinkedIn Import History
-- =============================================

CREATE TABLE IF NOT EXISTS linkedin_imports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
    import_source TEXT NOT NULL, -- 'pdf', 'api', 'manual'
    original_filename TEXT,
    parsed_data JSONB NOT NULL,
    data_quality_score INTEGER DEFAULT 0,
    fields_imported TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Cover Letters (Premium Feature)
-- =============================================

CREATE TABLE IF NOT EXISTS cover_letters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    company_name TEXT,
    position_title TEXT,
    content JSONB NOT NULL,
    template_key TEXT DEFAULT 'professional',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Functions and Triggers
-- =============================================

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_resumes_updated_at ON resumes;
CREATE TRIGGER update_resumes_updated_at BEFORE UPDATE ON resumes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON subscriptions;
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_cover_letters_updated_at ON cover_letters;
CREATE TRIGGER update_cover_letters_updated_at BEFORE UPDATE ON cover_letters FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- Utility Functions
-- =============================================

-- Function to get user's current plan
CREATE OR REPLACE FUNCTION get_user_plan(user_uuid UUID)
RETURNS TEXT AS $$
DECLARE
    plan TEXT;
BEGIN
    SELECT s.plan INTO plan
    FROM subscriptions s
    WHERE s.user_id = user_uuid
    AND s.status = 'active'
    AND (s.expires_at IS NULL OR s.expires_at > NOW());
    
    RETURN COALESCE(plan, 'free');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check quota limits
CREATE OR REPLACE FUNCTION check_quota_limit(
    user_uuid UUID,
    quota_type TEXT,
    current_month TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
    current_usage INTEGER;
    user_plan TEXT;
    limit_value INTEGER;
BEGIN
    user_plan := get_user_plan(user_uuid);
    
    SELECT 
        CASE 
            WHEN quota_type = 'ai_polish' THEN COALESCE(ai_polish_count, 0)
            WHEN quota_type = 'exports' THEN COALESCE(exports_count, 0)
            WHEN quota_type = 'jd_analysis' THEN COALESCE(jd_analysis_count, 0)
            WHEN quota_type = 'cover_letter' THEN COALESCE(cover_letter_count, 0)
            ELSE 0
        END INTO current_usage
    FROM usage_quotas 
    WHERE user_id = user_uuid AND month_key = current_month;
    
    current_usage := COALESCE(current_usage, 0);
    
    IF user_plan = 'free' THEN
        limit_value := CASE 
            WHEN quota_type = 'ai_polish' THEN 3
            WHEN quota_type = 'exports' THEN 3
            WHEN quota_type = 'jd_analysis' THEN 2
            WHEN quota_type = 'cover_letter' THEN 0
            ELSE 0
        END;
    ELSE
        limit_value := CASE 
            WHEN quota_type = 'ai_polish' THEN 50
            WHEN quota_type = 'exports' THEN 100
            WHEN quota_type = 'jd_analysis' THEN 50
            WHEN quota_type = 'cover_letter' THEN 25
            ELSE 100
        END;
    END IF;
    
    RETURN current_usage < limit_value;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment quota usage
CREATE OR REPLACE FUNCTION increment_quota_usage(
    user_uuid UUID,
    quota_type TEXT,
    current_month TEXT
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO usage_quotas (user_id, month_key, ai_polish_count, exports_count, jd_analysis_count, cover_letter_count)
    VALUES (
        user_uuid, 
        current_month,
        CASE WHEN quota_type = 'ai_polish' THEN 1 ELSE 0 END,
        CASE WHEN quota_type = 'exports' THEN 1 ELSE 0 END,
        CASE WHEN quota_type = 'jd_analysis' THEN 1 ELSE 0 END,
        CASE WHEN quota_type = 'cover_letter' THEN 1 ELSE 0 END
    )
    ON CONFLICT (user_id, month_key) 
    DO UPDATE SET
        ai_polish_count = usage_quotas.ai_polish_count + CASE WHEN quota_type = 'ai_polish' THEN 1 ELSE 0 END,
        exports_count = usage_quotas.exports_count + CASE WHEN quota_type = 'exports' THEN 1 ELSE 0 END,
        jd_analysis_count = usage_quotas.jd_analysis_count + CASE WHEN quota_type = 'jd_analysis' THEN 1 ELSE 0 END,
        cover_letter_count = usage_quotas.cover_letter_count + CASE WHEN quota_type = 'cover_letter' THEN 1 ELSE 0 END,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- Row Level Security (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exports ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_quotas ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_polish_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE jd_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE linkedin_imports ENABLE ROW LEVEL SECURITY;
ALTER TABLE cover_letters ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

DROP POLICY IF EXISTS "Users can view own resumes" ON resumes;
DROP POLICY IF EXISTS "Users can create own resumes" ON resumes;
DROP POLICY IF EXISTS "Users can update own resumes" ON resumes;
DROP POLICY IF EXISTS "Users can delete own resumes" ON resumes;

-- Create RLS Policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own resumes" ON resumes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own resumes" ON resumes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own resumes" ON resumes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own resumes" ON resumes FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own resume versions" ON resume_versions FOR SELECT USING (
    auth.uid() = (SELECT user_id FROM resumes WHERE id = resume_id)
);
CREATE POLICY "Users can create own resume versions" ON resume_versions FOR INSERT WITH CHECK (
    auth.uid() = (SELECT user_id FROM resumes WHERE id = resume_id)
);

CREATE POLICY "Users can view own exports" ON exports FOR SELECT USING (
    auth.uid() = (SELECT user_id FROM resumes WHERE id = resume_id)
);
CREATE POLICY "Users can create own exports" ON exports FOR INSERT WITH CHECK (
    auth.uid() = (SELECT user_id FROM resumes WHERE id = resume_id)
);

CREATE POLICY "Users can view own subscription" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own subscription" ON subscriptions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own subscription" ON subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own usage quotas" ON usage_quotas FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own usage quotas" ON usage_quotas FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own usage quotas" ON usage_quotas FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own AI polish history" ON ai_polish_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own AI polish history" ON ai_polish_history FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own JD analyses" ON jd_analyses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own JD analyses" ON jd_analyses FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own tool events" ON tool_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own tool events" ON tool_events FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own LinkedIn imports" ON linkedin_imports FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own LinkedIn imports" ON linkedin_imports FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own cover letters" ON cover_letters FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own cover letters" ON cover_letters FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cover letters" ON cover_letters FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own cover letters" ON cover_letters FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view templates" ON resume_templates FOR SELECT TO authenticated USING (true);

-- =============================================
-- Indexes for Performance
-- =============================================

CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_resumes_current_version ON resumes(current_version_id);
CREATE INDEX IF NOT EXISTS idx_resume_versions_resume_id ON resume_versions(resume_id);
CREATE INDEX IF NOT EXISTS idx_exports_resume_id ON exports(resume_id);
CREATE INDEX IF NOT EXISTS idx_exports_created_at ON exports(created_at);
CREATE INDEX IF NOT EXISTS idx_usage_quotas_month ON usage_quotas(month_key);
CREATE INDEX IF NOT EXISTS idx_ai_polish_user_date ON ai_polish_history(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_subscriptions_expires ON subscriptions(expires_at);
CREATE INDEX IF NOT EXISTS idx_jd_analyses_hash ON jd_analyses(jd_hash, expires_at);
CREATE INDEX IF NOT EXISTS idx_tool_events_user_date ON tool_events(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_tool_events_event ON tool_events(event, created_at);
CREATE INDEX IF NOT EXISTS idx_linkedin_imports_user ON linkedin_imports(user_id);
CREATE INDEX IF NOT EXISTS idx_cover_letters_user ON cover_letters(user_id);

-- =============================================
-- Final Verification
-- =============================================

-- Verify table creation
DO $$
DECLARE
    table_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO table_count
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name IN ('profiles', 'resumes', 'resume_versions', 'resume_templates', 'exports', 'subscriptions', 'usage_quotas', 'ai_polish_history', 'jd_analyses', 'tool_events', 'linkedin_imports', 'cover_letters');
    
    RAISE NOTICE 'Enhanced Resume Builder Schema Deployed Successfully - % tables created', table_count;
END $$;
