-- HR SaaS Business Platform Database Schema
-- This migration creates all tables needed for the automated HR SaaS business

-- =============================================
-- User Management & Authentication
-- =============================================

-- Enhanced user profiles for HR SaaS
CREATE TABLE IF NOT EXISTS hr_user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    phone TEXT,
    company_name TEXT,
    company_size TEXT CHECK (company_size IN ('startup', 'small', 'medium', 'large', 'enterprise')),
    industry TEXT,
    job_title TEXT,
    user_type TEXT NOT NULL CHECK (user_type IN ('job_seeker', 'employer', 'hr_professional', 'freelancer')),
    subscription_plan TEXT DEFAULT 'free' CHECK (subscription_plan IN ('free', 'basic', 'pro', 'enterprise')),
    subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'cancelled', 'expired', 'trial')),
    subscription_start_date TIMESTAMPTZ,
    subscription_end_date TIMESTAMPTZ,
    monthly_document_limit INTEGER DEFAULT 5,
    documents_used_this_month INTEGER DEFAULT 0,
    total_documents_created INTEGER DEFAULT 0,
    last_login_at TIMESTAMPTZ,
    preferences JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Document Management System
-- =============================================

-- HR tool categories
CREATE TABLE IF NOT EXISTS hr_tool_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    color TEXT,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- HR tools/templates
CREATE TABLE IF NOT EXISTS hr_tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES hr_tool_categories(id),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    tool_type TEXT NOT NULL CHECK (tool_type IN ('generator', 'template', 'calculator', 'tracker', 'analyzer')),
    input_schema JSONB NOT NULL, -- Form fields and validation rules
    output_format TEXT DEFAULT 'pdf' CHECK (output_format IN ('pdf', 'docx', 'txt', 'json')),
    is_free BOOLEAN DEFAULT false,
    price_inr INTEGER DEFAULT 0,
    is_popular BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    usage_count INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User documents (generated files)
CREATE TABLE IF NOT EXISTS user_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    tool_id UUID REFERENCES hr_tools(id),
    title TEXT NOT NULL,
    document_type TEXT NOT NULL,
    input_data JSONB NOT NULL, -- User inputs used to generate the document
    output_file_url TEXT, -- Generated file URL
    file_size_bytes INTEGER,
    status TEXT DEFAULT 'processing' CHECK (status IN ('processing', 'completed', 'failed', 'expired')),
    processing_time_seconds INTEGER,
    download_count INTEGER DEFAULT 0,
    last_downloaded_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ, -- Documents expire after 30 days for free users
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Document templates
CREATE TABLE IF NOT EXISTS document_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tool_id UUID REFERENCES hr_tools(id),
    name TEXT NOT NULL,
    description TEXT,
    template_type TEXT NOT NULL CHECK (template_type IN ('cover_letter', 'policy', 'contract', 'report')),
    template_data JSONB NOT NULL, -- Template structure and styling
    is_premium BOOLEAN DEFAULT false,
    price_inr INTEGER DEFAULT 0,
    usage_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Payment & Subscription System
-- =============================================

-- Subscription plans
CREATE TABLE IF NOT EXISTS subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    price_inr INTEGER NOT NULL,
    billing_cycle TEXT NOT NULL CHECK (billing_cycle IN ('monthly', 'yearly')),
    document_limit INTEGER,
    features JSONB NOT NULL, -- Array of features included
    is_popular BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User subscriptions
CREATE TABLE IF NOT EXISTS user_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES subscription_plans(id),
    status TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'expired', 'trial')),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    razorpay_subscription_id TEXT,
    razorpay_customer_id TEXT,
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    cancel_at_period_end BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payment transactions
CREATE TABLE IF NOT EXISTS payment_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    subscription_id UUID REFERENCES user_subscriptions(id),
    document_id UUID REFERENCES user_documents(id),
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('subscription', 'one_time', 'upgrade', 'downgrade')),
    amount_inr INTEGER NOT NULL,
    currency TEXT DEFAULT 'INR',
    razorpay_payment_id TEXT,
    razorpay_order_id TEXT,
    status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    payment_method TEXT,
    description TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Analytics & Usage Tracking
-- =============================================

-- Tool usage analytics
CREATE TABLE IF NOT EXISTS tool_usage_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    tool_id UUID REFERENCES hr_tools(id),
    document_id UUID REFERENCES user_documents(id),
    action_type TEXT NOT NULL CHECK (action_type IN ('view', 'start', 'complete', 'download', 'share')),
    session_id TEXT,
    user_agent TEXT,
    ip_address INET,
    referrer TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User behavior analytics
CREATE TABLE IF NOT EXISTS user_behavior_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    event_type TEXT NOT NULL,
    event_data JSONB NOT NULL,
    session_id TEXT,
    page_url TEXT,
    user_agent TEXT,
    ip_address INET,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- AI & Content Generation
-- =============================================

-- AI generation requests
CREATE TABLE IF NOT EXISTS ai_generation_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    tool_id UUID REFERENCES hr_tools(id),
    document_id UUID REFERENCES user_documents(id),
    prompt TEXT NOT NULL,
    input_data JSONB NOT NULL,
    output_data JSONB,
    model_used TEXT DEFAULT 'gpt-4o-mini',
    tokens_used INTEGER,
    cost_usd DECIMAL(10,4),
    status TEXT DEFAULT 'processing' CHECK (status IN ('processing', 'completed', 'failed')),
    error_message TEXT,
    processing_time_seconds INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content templates for AI generation
CREATE TABLE IF NOT EXISTS ai_content_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tool_id UUID REFERENCES hr_tools(id),
    template_name TEXT NOT NULL,
    prompt_template TEXT NOT NULL,
    variables JSONB NOT NULL, -- Template variables
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Notifications & Communication
-- =============================================

-- User notifications
CREATE TABLE IF NOT EXISTS user_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('document_ready', 'subscription_expiry', 'payment_success', 'system_update')),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    action_url TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email templates
CREATE TABLE IF NOT EXISTS email_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_name TEXT NOT NULL UNIQUE,
    subject TEXT NOT NULL,
    html_content TEXT NOT NULL,
    text_content TEXT,
    variables JSONB NOT NULL, -- Template variables
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Indexes for Performance
-- =============================================

-- User profiles indexes
CREATE INDEX IF NOT EXISTS idx_hr_user_profiles_user_id ON hr_user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_hr_user_profiles_email ON hr_user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_hr_user_profiles_subscription_plan ON hr_user_profiles(subscription_plan);
CREATE INDEX IF NOT EXISTS idx_hr_user_profiles_user_type ON hr_user_profiles(user_type);

-- Tool categories indexes
CREATE INDEX IF NOT EXISTS idx_hr_tool_categories_slug ON hr_tool_categories(slug);
CREATE INDEX IF NOT EXISTS idx_hr_tool_categories_is_active ON hr_tool_categories(is_active);
CREATE INDEX IF NOT EXISTS idx_hr_tool_categories_display_order ON hr_tool_categories(display_order);

-- HR tools indexes
CREATE INDEX IF NOT EXISTS idx_hr_tools_category_id ON hr_tools(category_id);
CREATE INDEX IF NOT EXISTS idx_hr_tools_slug ON hr_tools(slug);
CREATE INDEX IF NOT EXISTS idx_hr_tools_tool_type ON hr_tools(tool_type);
CREATE INDEX IF NOT EXISTS idx_hr_tools_is_free ON hr_tools(is_free);
CREATE INDEX IF NOT EXISTS idx_hr_tools_status ON hr_tools(status);
CREATE INDEX IF NOT EXISTS idx_hr_tools_usage_count ON hr_tools(usage_count);

-- User documents indexes
CREATE INDEX IF NOT EXISTS idx_user_documents_user_id ON user_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_user_documents_tool_id ON user_documents(tool_id);
CREATE INDEX IF NOT EXISTS idx_user_documents_status ON user_documents(status);
CREATE INDEX IF NOT EXISTS idx_user_documents_created_at ON user_documents(created_at);
CREATE INDEX IF NOT EXISTS idx_user_documents_expires_at ON user_documents(expires_at);

-- Subscription indexes
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_status ON user_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_end_date ON user_subscriptions(end_date);

-- Payment indexes
CREATE INDEX IF NOT EXISTS idx_payment_transactions_user_id ON payment_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_status ON payment_transactions(status);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_created_at ON payment_transactions(created_at);

-- Analytics indexes
CREATE INDEX IF NOT EXISTS idx_tool_usage_analytics_user_id ON tool_usage_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_tool_usage_analytics_tool_id ON tool_usage_analytics(tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_usage_analytics_created_at ON tool_usage_analytics(created_at);

-- AI generation indexes
CREATE INDEX IF NOT EXISTS idx_ai_generation_requests_user_id ON ai_generation_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_generation_requests_status ON ai_generation_requests(status);
CREATE INDEX IF NOT EXISTS idx_ai_generation_requests_created_at ON ai_generation_requests(created_at);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS idx_user_notifications_user_id ON user_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_user_notifications_is_read ON user_notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_user_notifications_created_at ON user_notifications(created_at);

-- =============================================
-- Row Level Security (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE hr_user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hr_tool_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE hr_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_usage_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_behavior_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_content_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;

-- Public read policies for tool categories and tools
CREATE POLICY "Tool categories are publicly readable" ON hr_tool_categories FOR SELECT USING (true);
CREATE POLICY "HR tools are publicly readable" ON hr_tools FOR SELECT USING (true);
CREATE POLICY "Document templates are publicly readable" ON document_templates FOR SELECT USING (true);
CREATE POLICY "Subscription plans are publicly readable" ON subscription_plans FOR SELECT USING (true);

-- User-specific policies
CREATE POLICY "Users can view their own profile" ON hr_user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON hr_user_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON hr_user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own documents" ON user_documents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own documents" ON user_documents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own documents" ON user_documents FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own subscriptions" ON user_subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own payments" ON payment_transactions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own notifications" ON user_notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications" ON user_notifications FOR UPDATE USING (auth.uid() = user_id);

-- Service role policies for analytics and AI
CREATE POLICY "Service role can manage analytics" ON tool_usage_analytics FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage behavior analytics" ON user_behavior_analytics FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage AI requests" ON ai_generation_requests FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage content templates" ON ai_content_templates FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage email templates" ON email_templates FOR ALL USING (auth.role() = 'service_role');

-- =============================================
-- Functions and Triggers
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_hr_user_profiles_updated_at
    BEFORE UPDATE ON hr_user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hr_tools_updated_at
    BEFORE UPDATE ON hr_tools
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_documents_updated_at
    BEFORE UPDATE ON user_documents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_subscriptions_updated_at
    BEFORE UPDATE ON user_subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_transactions_updated_at
    BEFORE UPDATE ON payment_transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_generation_requests_updated_at
    BEFORE UPDATE ON ai_generation_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_templates_updated_at
    BEFORE UPDATE ON email_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO hr_user_profiles (user_id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- Function to increment document usage count
CREATE OR REPLACE FUNCTION increment_document_usage()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE hr_user_profiles 
    SET documents_used_this_month = documents_used_this_month + 1,
        total_documents_created = total_documents_created + 1
    WHERE user_id = NEW.user_id;
    
    UPDATE hr_tools 
    SET usage_count = usage_count + 1
    WHERE id = NEW.tool_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to increment usage counts
CREATE TRIGGER on_document_created
    AFTER INSERT ON user_documents
    FOR EACH ROW
    EXECUTE FUNCTION increment_document_usage();

-- =============================================
-- Sample Data Population
-- =============================================

-- Insert tool categories
INSERT INTO hr_tool_categories (name, slug, description, icon, color, display_order) VALUES
('Job Search', 'job-search', 'Cover letters, interview prep, and job search tools', '🔍', '#10B981', 1),
('HR Policies', 'hr-policies', 'Company policies, handbooks, and compliance documents', '📋', '#F59E0B', 2),
('Recruitment', 'recruitment', 'Job descriptions, offer letters, and hiring tools', '👥', '#8B5CF6', 3),
('Employee Management', 'employee-management', 'Performance reviews, contracts, and employee documents', '👤', '#EF4444', 4),
('Calculators', 'calculators', 'Salary calculators, cost analysis, and HR metrics', '🧮', '#06B6D4', 5)
ON CONFLICT (slug) DO NOTHING;

-- Insert subscription plans
INSERT INTO subscription_plans (name, slug, description, price_inr, billing_cycle, document_limit, features, is_popular) VALUES
('Free', 'free', 'Basic tools with limited usage', 0, 'monthly', 5, '["Basic document templates", "Simple tools", "Email support"]', false),
('Basic', 'basic', 'Perfect for job seekers and small businesses', 999, 'monthly', 50, '["All tools", "Premium templates", "PDF downloads", "Email support", "Document history"]', false),
('Pro', 'pro', 'For HR professionals and growing companies', 2499, 'monthly', -1, '["Unlimited documents", "AI enhancement", "Priority support", "Custom branding", "API access", "Advanced analytics"]', true),
('Enterprise', 'enterprise', 'For large organizations with custom needs', 4999, 'monthly', -1, '["Everything in Pro", "White-label solution", "Dedicated support", "Custom integrations", "Team management", "Advanced security"]', false)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample HR tools
INSERT INTO hr_tools (category_id, name, slug, description, tool_type, input_schema, is_free, price_inr, is_popular) 
SELECT 
    c.id,
    'HR Policy Generator',
    'hr-policy-generator',
    'Generate comprehensive HR policies for your company',
    'generator',
    '{"fields": [{"name": "company_name", "type": "text", "required": true}, {"name": "company_size", "type": "select", "options": ["startup", "small", "medium", "large"], "required": true}, {"name": "industry", "type": "text", "required": true}, {"name": "policies_needed", "type": "array", "required": true}]}',
    false,
    1499,
    true
FROM hr_tool_categories c WHERE c.slug = 'hr-policies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO hr_tools (category_id, name, slug, description, tool_type, input_schema, is_free, price_inr, is_popular) 
SELECT 
    c.id,
    'Cover Letter Generator',
    'cover-letter-generator',
    'Create personalized cover letters for job applications',
    'generator',
    '{"fields": [{"name": "applicant_name", "type": "text", "required": true}, {"name": "job_title", "type": "text", "required": true}, {"name": "company_name", "type": "text", "required": true}, {"name": "job_description", "type": "textarea", "required": true}, {"name": "experience_summary", "type": "textarea", "required": true}]}',
    false,
    299,
    false
FROM hr_tool_categories c WHERE c.slug = 'job-search'
ON CONFLICT (slug) DO NOTHING;

-- Insert sample email templates
INSERT INTO email_templates (template_name, subject, html_content, text_content, variables) VALUES
('welcome_email', 'Welcome to HireWithPrachi HR Tools! 🎉', 
'<h1>Welcome to HireWithPrachi!</h1><p>Hi {{user_name}},</p><p>Thank you for joining our HR tools platform. You now have access to professional HR tools and templates.</p><p>Get started with our most popular tools:</p><ul><li>HR Policy Generator</li><li>Cover Letter Creator</li><li>Employee Handbook Templates</li></ul><p>Best regards,<br>The HireWithPrachi Team</p>',
'Welcome to HireWithPrachi! Hi {{user_name}}, Thank you for joining our HR tools platform. Get started with our tools today!',
'["user_name", "user_email"]'),
('document_ready', 'Your {{document_type}} is ready! 📄', 
'<h1>Your document is ready!</h1><p>Hi {{user_name}},</p><p>Your {{document_type}} has been generated successfully.</p><p><a href="{{download_url}}">Download Now</a></p><p>This link will expire in 30 days.</p>',
'Your {{document_type}} is ready! Download it from: {{download_url}}',
'["user_name", "document_type", "download_url"]')
ON CONFLICT (template_name) DO NOTHING;

-- =============================================
-- Permissions
-- =============================================

-- Grant permissions to service role
GRANT ALL ON hr_user_profiles TO service_role;
GRANT ALL ON hr_tool_categories TO service_role;
GRANT ALL ON hr_tools TO service_role;
GRANT ALL ON user_documents TO service_role;
GRANT ALL ON document_templates TO service_role;
GRANT ALL ON subscription_plans TO service_role;
GRANT ALL ON user_subscriptions TO service_role;
GRANT ALL ON payment_transactions TO service_role;
GRANT ALL ON tool_usage_analytics TO service_role;
GRANT ALL ON user_behavior_analytics TO service_role;
GRANT ALL ON ai_generation_requests TO service_role;
GRANT ALL ON ai_content_templates TO service_role;
GRANT ALL ON user_notifications TO service_role;
GRANT ALL ON email_templates TO service_role;

-- Grant select permissions to authenticated users
GRANT SELECT ON hr_tool_categories TO authenticated;
GRANT SELECT ON hr_tools TO authenticated;
GRANT SELECT ON document_templates TO authenticated;
GRANT SELECT ON subscription_plans TO authenticated;

-- Grant all permissions to authenticated users for their own data
GRANT ALL ON hr_user_profiles TO authenticated;
GRANT ALL ON user_documents TO authenticated;
GRANT ALL ON user_subscriptions TO authenticated;
GRANT ALL ON payment_transactions TO authenticated;
GRANT ALL ON user_notifications TO authenticated;
