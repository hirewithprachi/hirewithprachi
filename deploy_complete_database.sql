-- COMPLETE DATABASE DEPLOYMENT SCRIPT
-- Run this single file in Supabase SQL Editor
-- This includes all required schemas in the correct order

-- =============================================
-- STEP 1: Enable Extensions
-- =============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- =============================================
-- STEP 2: Enhanced Resume Builder Schema
-- =============================================

-- User Profiles (Enhanced)
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

-- Resume Management
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

-- Resume Templates
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

-- Export Management
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

-- Subscription & Quota Management
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
    month_key TEXT NOT NULL,
    ai_polish_count INTEGER DEFAULT 0,
    exports_count INTEGER DEFAULT 0,
    active_resumes INTEGER DEFAULT 0,
    jd_analysis_count INTEGER DEFAULT 0,
    cover_letter_count INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, month_key)
);

-- AI & Content Enhancement
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

-- Analytics & Events
CREATE TABLE IF NOT EXISTS tool_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
    event TEXT NOT NULL,
    meta JSONB DEFAULT '{}',
    session_id TEXT,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- LinkedIn Import History
CREATE TABLE IF NOT EXISTS linkedin_imports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
    import_source TEXT NOT NULL,
    original_filename TEXT,
    parsed_data JSONB NOT NULL,
    data_quality_score INTEGER DEFAULT 0,
    fields_imported TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cover Letters (Premium Feature)
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
-- STEP 3: A/B Testing Schema
-- =============================================

CREATE TABLE IF NOT EXISTS ab_tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    status TEXT CHECK (status IN ('draft', 'active', 'paused', 'completed')) DEFAULT 'draft',
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    target_metrics TEXT[] DEFAULT '{}',
    variants JSONB NOT NULL DEFAULT '{}',
    traffic_allocation NUMERIC DEFAULT 100,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ab_test_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_name TEXT NOT NULL,
    user_id TEXT NOT NULL,
    variant_name TEXT NOT NULL,
    variant_config JSONB DEFAULT '{}',
    is_authenticated BOOLEAN DEFAULT false,
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    converted BOOLEAN DEFAULT false,
    conversion_type TEXT,
    converted_at TIMESTAMPTZ,
    conversion_metadata JSONB DEFAULT '{}',
    UNIQUE(test_name, user_id)
);

CREATE TABLE IF NOT EXISTS ab_test_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    data JSONB NOT NULL DEFAULT '{}',
    session_id TEXT,
    user_agent TEXT,
    ip_address INET,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- STEP 4: Collaboration System Schema
-- =============================================

CREATE TABLE IF NOT EXISTS collaboration_changes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE NOT NULL,
    change_id TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    change_type TEXT NOT NULL,
    field_path TEXT NOT NULL,
    old_value JSONB,
    new_value JSONB,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    applied BOOLEAN DEFAULT false,
    conflict_resolved BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS collaboration_comments (
    id TEXT PRIMARY KEY,
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    user_profile JSONB NOT NULL DEFAULT '{}',
    content TEXT NOT NULL,
    field_path TEXT,
    position JSONB,
    type TEXT CHECK (type IN ('comment', 'suggestion', 'question', 'approval')) DEFAULT 'comment',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resolved BOOLEAN DEFAULT false,
    resolved_by UUID REFERENCES auth.users(id),
    resolved_at TIMESTAMPTZ,
    parent_comment_id TEXT REFERENCES collaboration_comments(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS collaboration_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    permission TEXT CHECK (permission IN ('view', 'comment', 'edit')) NOT NULL,
    granted_by UUID REFERENCES auth.users(id) NOT NULL,
    granted_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    UNIQUE(resume_id, user_id)
);

CREATE TABLE IF NOT EXISTS collaboration_invitations (
    id TEXT PRIMARY KEY,
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE NOT NULL,
    shared_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    target_email TEXT NOT NULL,
    permission TEXT CHECK (permission IN ('view', 'comment', 'edit')) NOT NULL,
    status TEXT CHECK (status IN ('pending', 'accepted', 'declined', 'expired')) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    accepted_by UUID REFERENCES auth.users(id),
    accepted_at TIMESTAMPTZ,
    message TEXT
);

CREATE TABLE IF NOT EXISTS collaboration_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    session_id TEXT NOT NULL,
    user_profile JSONB NOT NULL DEFAULT '{}',
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    last_seen TIMESTAMPTZ DEFAULT NOW(),
    status TEXT CHECK (status IN ('active', 'idle', 'disconnected')) DEFAULT 'active',
    cursor_position JSONB,
    current_field TEXT
);

-- =============================================
-- STEP 5: Insert Default Data
-- =============================================

-- Insert default resume templates
INSERT INTO resume_templates (key, name, description, category, is_premium, features, color_scheme, sort_order) 
VALUES
('modern', 'Modern Professional', 'Clean, modern design for corporate roles', 'professional', false, ARRAY['ATS-friendly', 'Professional', 'Clean layout'], '{"primary": "#3B82F6", "secondary": "#1F2937"}', 1),
('minimal', 'Minimal Clean', 'Simple, elegant design', 'minimal', false, ARRAY['Minimalist', 'Elegant', 'Easy to read'], '{"primary": "#6B7280", "secondary": "#374151"}', 2),
('corporate', 'Corporate Executive', 'Sophisticated design for senior roles', 'executive', true, ARRAY['Executive', 'Sophisticated', 'Leadership-focused'], '{"primary": "#4F46E5", "secondary": "#1E1B4B"}', 3),
('creative', 'Creative Portfolio', 'Bold design for creative industries', 'creative', true, ARRAY['Visual appeal', 'Creative', 'Portfolio-ready'], '{"primary": "#7C3AED", "secondary": "#581C87"}', 4),
('tech_modern', 'Tech Professional', 'Modern template for software engineers', 'technology', false, ARRAY['Technical skills emphasis', 'Project portfolio', 'GitHub integration'], '{"primary": "#0066CC", "secondary": "#004499"}', 5),
('healthcare_clinical', 'Clinical Professional', 'Template for doctors and clinical staff', 'healthcare', false, ARRAY['Certifications focus', 'Patient care experience', 'Clinical skills'], '{"primary": "#2e7d32", "secondary": "#1b5e20"}', 6)
ON CONFLICT (key) DO NOTHING;

-- Insert default A/B tests
INSERT INTO ab_tests (name, description, status, variants, target_metrics) VALUES
('resume_builder_flow', 'Test different resume builder flow lengths', 'active', 
 '{"control": {"stepCount": 7, "name": "7-step flow"}, "variant_a": {"stepCount": 5, "name": "5-step flow"}}',
 ARRAY['completion_rate', 'time_to_complete', 'user_satisfaction']),
('template_recommendation', 'Test template recommendation display', 'active',
 '{"control": {"showRecommendations": false}, "variant_a": {"showRecommendations": true, "maxRecommendations": 3}}',
 ARRAY['template_selection_rate', 'user_engagement'])
ON CONFLICT (name) DO NOTHING;

-- =============================================
-- STEP 6: Functions and Triggers
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

-- =============================================
-- STEP 7: Row Level Security (RLS)
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
ALTER TABLE collaboration_changes ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_test_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_test_events ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies (Main ones)
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

CREATE POLICY "Users can view own subscription" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own subscription" ON subscriptions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own subscription" ON subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view templates" ON resume_templates FOR SELECT TO authenticated USING (true);

-- =============================================
-- STEP 8: Indexes for Performance
-- =============================================

CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_resumes_current_version ON resumes(current_version_id);
CREATE INDEX IF NOT EXISTS idx_resume_versions_resume_id ON resume_versions(resume_id);
CREATE INDEX IF NOT EXISTS idx_exports_resume_id ON exports(resume_id);
CREATE INDEX IF NOT EXISTS idx_usage_quotas_month ON usage_quotas(month_key);
CREATE INDEX IF NOT EXISTS idx_tool_events_user_date ON tool_events(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_collaboration_changes_resume_id ON collaboration_changes(resume_id);
CREATE INDEX IF NOT EXISTS idx_collaboration_comments_resume_id ON collaboration_comments(resume_id);
CREATE INDEX IF NOT EXISTS idx_ab_test_assignments_test_user ON ab_test_assignments(test_name, user_id);

-- =============================================
-- STEP 9: Verification and Completion
-- =============================================

DO $$
DECLARE
    table_count INTEGER;
    function_count INTEGER;
    trigger_count INTEGER;
BEGIN
    -- Count tables
    SELECT COUNT(*) INTO table_count
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name IN (
        'profiles', 'resumes', 'resume_versions', 'resume_templates', 'exports', 
        'subscriptions', 'usage_quotas', 'ai_polish_history', 'jd_analyses', 
        'tool_events', 'linkedin_imports', 'cover_letters', 'ab_tests', 
        'ab_test_assignments', 'ab_test_events', 'collaboration_changes', 
        'collaboration_comments', 'collaboration_permissions', 'collaboration_invitations', 
        'collaboration_sessions'
    );
    
    -- Count functions
    SELECT COUNT(*) INTO function_count
    FROM information_schema.routines 
    WHERE routine_schema = 'public' 
    AND routine_name IN ('get_user_plan', 'check_quota_limit', 'update_updated_at_column');
    
    -- Count triggers
    SELECT COUNT(*) INTO trigger_count
    FROM information_schema.triggers 
    WHERE trigger_schema = 'public';
    
    RAISE NOTICE '=================================================';
    RAISE NOTICE 'DATABASE DEPLOYMENT COMPLETED SUCCESSFULLY!';
    RAISE NOTICE '=================================================';
    RAISE NOTICE 'Tables created: %', table_count;
    RAISE NOTICE 'Functions created: %', function_count;
    RAISE NOTICE 'Triggers created: %', trigger_count;
    RAISE NOTICE 'Template records: %', (SELECT COUNT(*) FROM resume_templates);
    RAISE NOTICE 'A/B Tests configured: %', (SELECT COUNT(*) FROM ab_tests);
    RAISE NOTICE '=================================================';
    RAISE NOTICE 'Your Enhanced Resume Builder is ready to use!';
    RAISE NOTICE '=================================================';
END $$;
