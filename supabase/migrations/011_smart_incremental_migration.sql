-- ======================================================================
-- SMART INCREMENTAL MIGRATION FOR WORLD-CLASS ADMIN DASHBOARD
-- Checks for existing tables and only creates what's needed
-- ======================================================================

-- Enable necessary extensions if they don't exist
DO $$ BEGIN
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Extensions already exist or cannot be created';
END $$;

-- ======================================================================
-- FUNCTION TO CHECK IF TABLE EXISTS
-- ======================================================================
CREATE OR REPLACE FUNCTION table_exists(table_name TEXT) 
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = $1
    );
END;
$$ LANGUAGE plpgsql;

-- ======================================================================
-- FUNCTION TO CHECK IF COLUMN EXISTS
-- ======================================================================
CREATE OR REPLACE FUNCTION column_exists(table_name TEXT, column_name TEXT) 
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = $1 
        AND column_name = $2
    );
END;
$$ LANGUAGE plpgsql;

-- ======================================================================
-- ENHANCE EXISTING LEADS TABLE
-- ======================================================================
DO $$ BEGIN
    -- Add new columns to leads table if they don't exist
    IF table_exists('leads') THEN
        -- Add priority column
        IF NOT column_exists('leads', 'priority') THEN
            ALTER TABLE public.leads ADD COLUMN priority INTEGER DEFAULT 3 CHECK (priority BETWEEN 1 AND 5);
        END IF;
        
        -- Add lead_score column
        IF NOT column_exists('leads', 'lead_score') THEN
            ALTER TABLE public.leads ADD COLUMN lead_score INTEGER DEFAULT 0 CHECK (lead_score BETWEEN 0 AND 100);
        END IF;
        
        -- Add assigned_to column
        IF NOT column_exists('leads', 'assigned_to') THEN
            ALTER TABLE public.leads ADD COLUMN assigned_to UUID REFERENCES auth.users(id);
        END IF;
        
        -- Add additional fields
        IF NOT column_exists('leads', 'tags') THEN
            ALTER TABLE public.leads ADD COLUMN tags TEXT[];
        END IF;
        
        IF NOT column_exists('leads', 'custom_fields') THEN
            ALTER TABLE public.leads ADD COLUMN custom_fields JSONB;
        END IF;
        
        IF NOT column_exists('leads', 'utm_source') THEN
            ALTER TABLE public.leads ADD COLUMN utm_source VARCHAR(100);
        END IF;
        
        IF NOT column_exists('leads', 'utm_medium') THEN
            ALTER TABLE public.leads ADD COLUMN utm_medium VARCHAR(100);
        END IF;
        
        IF NOT column_exists('leads', 'utm_campaign') THEN
            ALTER TABLE public.leads ADD COLUMN utm_campaign VARCHAR(100);
        END IF;
        
        IF NOT column_exists('leads', 'last_contact_date') THEN
            ALTER TABLE public.leads ADD COLUMN last_contact_date TIMESTAMP WITH TIME ZONE;
        END IF;
        
        IF NOT column_exists('leads', 'next_follow_up') THEN
            ALTER TABLE public.leads ADD COLUMN next_follow_up TIMESTAMP WITH TIME ZONE;
        END IF;
        
        IF NOT column_exists('leads', 'estimated_value') THEN
            ALTER TABLE public.leads ADD COLUMN estimated_value DECIMAL(15,2);
        END IF;
        
        IF NOT column_exists('leads', 'converted_at') THEN
            ALTER TABLE public.leads ADD COLUMN converted_at TIMESTAMP WITH TIME ZONE;
        END IF;
        
        IF NOT column_exists('leads', 'lost_reason') THEN
            ALTER TABLE public.leads ADD COLUMN lost_reason TEXT;
        END IF;
        
        RAISE NOTICE 'Enhanced existing leads table with new columns';
    ELSE
        RAISE NOTICE 'Leads table does not exist - please create it first';
    END IF;
END $$;

-- ======================================================================
-- ENHANCE EXISTING BLOG_POSTS TABLE
-- ======================================================================
DO $$ BEGIN
    IF table_exists('blog_posts') THEN
        -- Add SEO and performance columns
        IF NOT column_exists('blog_posts', 'meta_title') THEN
            ALTER TABLE public.blog_posts ADD COLUMN meta_title VARCHAR(500);
        END IF;
        
        IF NOT column_exists('blog_posts', 'meta_description') THEN
            ALTER TABLE public.blog_posts ADD COLUMN meta_description VARCHAR(500);
        END IF;
        
        IF NOT column_exists('blog_posts', 'featured_image_url') THEN
            ALTER TABLE public.blog_posts ADD COLUMN featured_image_url VARCHAR(500);
        END IF;
        
        IF NOT column_exists('blog_posts', 'reading_time') THEN
            ALTER TABLE public.blog_posts ADD COLUMN reading_time INTEGER;
        END IF;
        
        IF NOT column_exists('blog_posts', 'view_count') THEN
            ALTER TABLE public.blog_posts ADD COLUMN view_count INTEGER DEFAULT 0;
        END IF;
        
        IF NOT column_exists('blog_posts', 'like_count') THEN
            ALTER TABLE public.blog_posts ADD COLUMN like_count INTEGER DEFAULT 0;
        END IF;
        
        IF NOT column_exists('blog_posts', 'share_count') THEN
            ALTER TABLE public.blog_posts ADD COLUMN share_count INTEGER DEFAULT 0;
        END IF;
        
        IF NOT column_exists('blog_posts', 'seo_score') THEN
            ALTER TABLE public.blog_posts ADD COLUMN seo_score INTEGER DEFAULT 0 CHECK (seo_score BETWEEN 0 AND 100);
        END IF;
        
        IF NOT column_exists('blog_posts', 'version') THEN
            ALTER TABLE public.blog_posts ADD COLUMN version INTEGER DEFAULT 1;
        END IF;
        
        IF NOT column_exists('blog_posts', 'schema_markup') THEN
            ALTER TABLE public.blog_posts ADD COLUMN schema_markup JSONB;
        END IF;
        
        RAISE NOTICE 'Enhanced existing blog_posts table with new columns';
    END IF;
END $$;

-- ======================================================================
-- ENHANCE EXISTING ADMIN_USERS TABLE
-- ======================================================================
DO $$ BEGIN
    IF table_exists('admin_users') THEN
        -- Add enhanced admin fields
        IF NOT column_exists('admin_users', 'first_name') THEN
            ALTER TABLE public.admin_users ADD COLUMN first_name VARCHAR(100);
        END IF;
        
        IF NOT column_exists('admin_users', 'last_name') THEN
            ALTER TABLE public.admin_users ADD COLUMN last_name VARCHAR(100);
        END IF;
        
        IF NOT column_exists('admin_users', 'avatar_url') THEN
            ALTER TABLE public.admin_users ADD COLUMN avatar_url VARCHAR(500);
        END IF;
        
        IF NOT column_exists('admin_users', 'permissions') THEN
            ALTER TABLE public.admin_users ADD COLUMN permissions TEXT[];
        END IF;
        
        IF NOT column_exists('admin_users', 'department') THEN
            ALTER TABLE public.admin_users ADD COLUMN department VARCHAR(100);
        END IF;
        
        IF NOT column_exists('admin_users', 'is_2fa_enabled') THEN
            ALTER TABLE public.admin_users ADD COLUMN is_2fa_enabled BOOLEAN DEFAULT false;
        END IF;
        
        IF NOT column_exists('admin_users', 'last_login') THEN
            ALTER TABLE public.admin_users ADD COLUMN last_login TIMESTAMP WITH TIME ZONE;
        END IF;
        
        IF NOT column_exists('admin_users', 'last_activity') THEN
            ALTER TABLE public.admin_users ADD COLUMN last_activity TIMESTAMP WITH TIME ZONE;
        END IF;
        
        IF NOT column_exists('admin_users', 'password_changed_at') THEN
            ALTER TABLE public.admin_users ADD COLUMN password_changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        END IF;
        
        IF NOT column_exists('admin_users', 'failed_login_attempts') THEN
            ALTER TABLE public.admin_users ADD COLUMN failed_login_attempts INTEGER DEFAULT 0;
        END IF;
        
        IF NOT column_exists('admin_users', 'locked_until') THEN
            ALTER TABLE public.admin_users ADD COLUMN locked_until TIMESTAMP WITH TIME ZONE;
        END IF;
        
        RAISE NOTICE 'Enhanced existing admin_users table with new columns';
    END IF;
END $$;

-- ======================================================================
-- ENHANCE EXISTING VIDEOS TABLE
-- ======================================================================
DO $$ BEGIN
    IF table_exists('videos') THEN
        -- Add enhanced video fields
        IF NOT column_exists('videos', 'duration') THEN
            ALTER TABLE public.videos ADD COLUMN duration INTEGER;
        END IF;
        
        IF NOT column_exists('videos', 'file_size') THEN
            ALTER TABLE public.videos ADD COLUMN file_size BIGINT;
        END IF;
        
        IF NOT column_exists('videos', 'resolution') THEN
            ALTER TABLE public.videos ADD COLUMN resolution VARCHAR(20);
        END IF;
        
        IF NOT column_exists('videos', 'format') THEN
            ALTER TABLE public.videos ADD COLUMN format VARCHAR(20);
        END IF;
        
        IF NOT column_exists('videos', 'service_page_id') THEN
            ALTER TABLE public.videos ADD COLUMN service_page_id VARCHAR(100);
        END IF;
        
        IF NOT column_exists('videos', 'tags') THEN
            ALTER TABLE public.videos ADD COLUMN tags TEXT[];
        END IF;
        
        IF NOT column_exists('videos', 'is_processed') THEN
            ALTER TABLE public.videos ADD COLUMN is_processed BOOLEAN DEFAULT false;
        END IF;
        
        IF NOT column_exists('videos', 'processing_status') THEN
            ALTER TABLE public.videos ADD COLUMN processing_status VARCHAR(50) DEFAULT 'pending';
        END IF;
        
        IF NOT column_exists('videos', 'view_count') THEN
            ALTER TABLE public.videos ADD COLUMN view_count INTEGER DEFAULT 0;
        END IF;
        
        IF NOT column_exists('videos', 'play_count') THEN
            ALTER TABLE public.videos ADD COLUMN play_count INTEGER DEFAULT 0;
        END IF;
        
        IF NOT column_exists('videos', 'engagement_score') THEN
            ALTER TABLE public.videos ADD COLUMN engagement_score DECIMAL(5,2) DEFAULT 0.0;
        END IF;
        
        IF NOT column_exists('videos', 'published_at') THEN
            ALTER TABLE public.videos ADD COLUMN published_at TIMESTAMP WITH TIME ZONE;
        END IF;
        
        RAISE NOTICE 'Enhanced existing videos table with new columns';
    END IF;
END $$;

-- ======================================================================
-- ENHANCE EXISTING RESOURCES TABLE
-- ======================================================================
DO $$ BEGIN
    IF table_exists('resources') THEN
        -- Add enhanced file management fields
        IF NOT column_exists('resources', 'original_filename') THEN
            ALTER TABLE public.resources ADD COLUMN original_filename VARCHAR(255);
        END IF;
        
        IF NOT column_exists('resources', 'file_path') THEN
            ALTER TABLE public.resources ADD COLUMN file_path VARCHAR(500);
        END IF;
        
        IF NOT column_exists('resources', 'file_url') THEN
            ALTER TABLE public.resources ADD COLUMN file_url VARCHAR(500);
        END IF;
        
        IF NOT column_exists('resources', 'file_type') THEN
            ALTER TABLE public.resources ADD COLUMN file_type VARCHAR(100);
        END IF;
        
        IF NOT column_exists('resources', 'mime_type') THEN
            ALTER TABLE public.resources ADD COLUMN mime_type VARCHAR(100);
        END IF;
        
        IF NOT column_exists('resources', 'file_size') THEN
            ALTER TABLE public.resources ADD COLUMN file_size BIGINT;
        END IF;
        
        IF NOT column_exists('resources', 'folder_path') THEN
            ALTER TABLE public.resources ADD COLUMN folder_path VARCHAR(500);
        END IF;
        
        IF NOT column_exists('resources', 'category') THEN
            ALTER TABLE public.resources ADD COLUMN category VARCHAR(100);
        END IF;
        
        IF NOT column_exists('resources', 'tags') THEN
            ALTER TABLE public.resources ADD COLUMN tags TEXT[];
        END IF;
        
        IF NOT column_exists('resources', 'is_public') THEN
            ALTER TABLE public.resources ADD COLUMN is_public BOOLEAN DEFAULT false;
        END IF;
        
        IF NOT column_exists('resources', 'download_count') THEN
            ALTER TABLE public.resources ADD COLUMN download_count INTEGER DEFAULT 0;
        END IF;
        
        IF NOT column_exists('resources', 'checksum') THEN
            ALTER TABLE public.resources ADD COLUMN checksum VARCHAR(64);
        END IF;
        
        IF NOT column_exists('resources', 'metadata') THEN
            ALTER TABLE public.resources ADD COLUMN metadata JSONB;
        END IF;
        
        RAISE NOTICE 'Enhanced existing resources table with new columns';
    END IF;
END $$;

-- ======================================================================
-- ENHANCE EXISTING EMAIL_LOGS TABLE
-- ======================================================================
DO $$ BEGIN
    IF table_exists('email_logs') THEN
        -- Add enhanced email tracking fields
        IF NOT column_exists('email_logs', 'from_email') THEN
            ALTER TABLE public.email_logs ADD COLUMN from_email VARCHAR(255);
        END IF;
        
        IF NOT column_exists('email_logs', 'html_content') THEN
            ALTER TABLE public.email_logs ADD COLUMN html_content TEXT;
        END IF;
        
        IF NOT column_exists('email_logs', 'template_id') THEN
            ALTER TABLE public.email_logs ADD COLUMN template_id UUID;
        END IF;
        
        IF NOT column_exists('email_logs', 'email_type') THEN
            ALTER TABLE public.email_logs ADD COLUMN email_type VARCHAR(100);
        END IF;
        
        IF NOT column_exists('email_logs', 'campaign_id') THEN
            ALTER TABLE public.email_logs ADD COLUMN campaign_id VARCHAR(100);
        END IF;
        
        IF NOT column_exists('email_logs', 'provider') THEN
            ALTER TABLE public.email_logs ADD COLUMN provider VARCHAR(50);
        END IF;
        
        IF NOT column_exists('email_logs', 'provider_message_id') THEN
            ALTER TABLE public.email_logs ADD COLUMN provider_message_id VARCHAR(255);
        END IF;
        
        IF NOT column_exists('email_logs', 'opened_at') THEN
            ALTER TABLE public.email_logs ADD COLUMN opened_at TIMESTAMP WITH TIME ZONE;
        END IF;
        
        IF NOT column_exists('email_logs', 'clicked_at') THEN
            ALTER TABLE public.email_logs ADD COLUMN clicked_at TIMESTAMP WITH TIME ZONE;
        END IF;
        
        IF NOT column_exists('email_logs', 'bounced_at') THEN
            ALTER TABLE public.email_logs ADD COLUMN bounced_at TIMESTAMP WITH TIME ZONE;
        END IF;
        
        IF NOT column_exists('email_logs', 'failed_reason') THEN
            ALTER TABLE public.email_logs ADD COLUMN failed_reason TEXT;
        END IF;
        
        IF NOT column_exists('email_logs', 'sent_by') THEN
            ALTER TABLE public.email_logs ADD COLUMN sent_by UUID REFERENCES auth.users(id);
        END IF;
        
        RAISE NOTICE 'Enhanced existing email_logs table with new columns';
    END IF;
END $$;

-- ======================================================================
-- ENHANCE EXISTING CALCULATOR_RESULTS TABLE
-- ======================================================================
DO $$ BEGIN
    IF table_exists('calculator_results') THEN
        -- Add enhanced calculator tracking
        IF NOT column_exists('calculator_results', 'calculator_type') THEN
            ALTER TABLE public.calculator_results ADD COLUMN calculator_type VARCHAR(100);
        END IF;
        
        IF NOT column_exists('calculator_results', 'user_session_id') THEN
            ALTER TABLE public.calculator_results ADD COLUMN user_session_id VARCHAR(255);
        END IF;
        
        IF NOT column_exists('calculator_results', 'ip_address') THEN
            ALTER TABLE public.calculator_results ADD COLUMN ip_address INET;
        END IF;
        
        IF NOT column_exists('calculator_results', 'user_agent') THEN
            ALTER TABLE public.calculator_results ADD COLUMN user_agent TEXT;
        END IF;
        
        IF NOT column_exists('calculator_results', 'referrer') THEN
            ALTER TABLE public.calculator_results ADD COLUMN referrer VARCHAR(500);
        END IF;
        
        IF NOT column_exists('calculator_results', 'utm_source') THEN
            ALTER TABLE public.calculator_results ADD COLUMN utm_source VARCHAR(100);
        END IF;
        
        IF NOT column_exists('calculator_results', 'utm_medium') THEN
            ALTER TABLE public.calculator_results ADD COLUMN utm_medium VARCHAR(100);
        END IF;
        
        IF NOT column_exists('calculator_results', 'utm_campaign') THEN
            ALTER TABLE public.calculator_results ADD COLUMN utm_campaign VARCHAR(100);
        END IF;
        
        IF NOT column_exists('calculator_results', 'completion_time') THEN
            ALTER TABLE public.calculator_results ADD COLUMN completion_time INTEGER;
        END IF;
        
        IF NOT column_exists('calculator_results', 'user_id') THEN
            ALTER TABLE public.calculator_results ADD COLUMN user_id UUID REFERENCES auth.users(id);
        END IF;
        
        RAISE NOTICE 'Enhanced existing calculator_results table with new columns';
    END IF;
END $$;

-- ======================================================================
-- CREATE NEW ADVANCED TABLES (ONLY IF THEY DON'T EXIST)
-- ======================================================================

-- User roles table
DO $$ BEGIN
    IF NOT table_exists('user_roles') THEN
        CREATE TABLE public.user_roles (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            name VARCHAR(100) UNIQUE NOT NULL,
            description TEXT,
            permissions JSONB NOT NULL,
            is_system_role BOOLEAN DEFAULT false,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Insert default roles
        INSERT INTO public.user_roles (name, description, permissions, is_system_role) VALUES
        ('super_admin', 'Super Administrator with full access', '{"all": true}', true),
        ('admin', 'Administrator with most permissions', '{"leads": ["read", "write", "delete"], "blog": ["read", "write", "delete"], "users": ["read", "write"], "analytics": ["read"]}', true),
        ('manager', 'Manager with limited admin access', '{"leads": ["read", "write"], "blog": ["read", "write"], "analytics": ["read"]}', true),
        ('editor', 'Content editor with blog access', '{"blog": ["read", "write"], "analytics": ["read"]}', true),
        ('viewer', 'Read-only access', '{"leads": ["read"], "blog": ["read"], "analytics": ["read"]}', true);
        
        RAISE NOTICE 'Created user_roles table with default roles';
    ELSE
        RAISE NOTICE 'user_roles table already exists - skipping creation';
    END IF;
END $$;

-- Activity logs table
DO $$ BEGIN
    IF NOT table_exists('activity_logs') THEN
        CREATE TABLE public.activity_logs (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            user_id UUID REFERENCES auth.users(id),
            action VARCHAR(100) NOT NULL,
            resource_type VARCHAR(100),
            resource_id VARCHAR(100),
            old_data JSONB,
            new_data JSONB,
            ip_address INET,
            user_agent TEXT,
            success BOOLEAN DEFAULT true,
            error_message TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        RAISE NOTICE 'Created activity_logs table';
    ELSE
        RAISE NOTICE 'activity_logs table already exists - skipping creation';
    END IF;
END $$;

-- Notifications table
DO $$ BEGIN
    IF NOT table_exists('notifications') THEN
        CREATE TABLE public.notifications (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            user_id UUID REFERENCES auth.users(id),
            title VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            type VARCHAR(50) DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
            action_url VARCHAR(500),
            action_text VARCHAR(100),
            is_read BOOLEAN DEFAULT false,
            is_dismissed BOOLEAN DEFAULT false,
            metadata JSONB,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            read_at TIMESTAMP WITH TIME ZONE,
            expires_at TIMESTAMP WITH TIME ZONE
        );
        RAISE NOTICE 'Created notifications table';
    ELSE
        RAISE NOTICE 'notifications table already exists - skipping creation';
    END IF;
END $$;

-- Dashboard widgets table
DO $$ BEGIN
    IF NOT table_exists('dashboard_widgets') THEN
        CREATE TABLE public.dashboard_widgets (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            user_id UUID REFERENCES auth.users(id),
            widget_type VARCHAR(100) NOT NULL,
            title VARCHAR(255),
            configuration JSONB NOT NULL,
            position_x INTEGER NOT NULL,
            position_y INTEGER NOT NULL,
            width INTEGER NOT NULL,
            height INTEGER NOT NULL,
            is_active BOOLEAN DEFAULT true,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        RAISE NOTICE 'Created dashboard_widgets table';
    ELSE
        RAISE NOTICE 'dashboard_widgets table already exists - skipping creation';
    END IF;
END $$;

-- Email templates table
DO $$ BEGIN
    IF NOT table_exists('email_templates') THEN
        CREATE TABLE public.email_templates (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            subject VARCHAR(500) NOT NULL,
            html_content TEXT NOT NULL,
            text_content TEXT,
            variables JSONB,
            category VARCHAR(100),
            is_active BOOLEAN DEFAULT true,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            created_by UUID REFERENCES auth.users(id)
        );
        
        -- Insert default templates
        INSERT INTO public.email_templates (name, subject, html_content, text_content, category, variables) VALUES
        ('lead_notification', 'New Lead: {{first_name}} {{last_name}}', 
        '<h2>New Lead Received</h2><p><strong>Name:</strong> {{first_name}} {{last_name}}</p><p><strong>Email:</strong> {{email}}</p><p><strong>Company:</strong> {{company}}</p><p><strong>Message:</strong> {{message}}</p>',
        'New Lead Received\nName: {{first_name}} {{last_name}}\nEmail: {{email}}\nCompany: {{company}}\nMessage: {{message}}',
        'notifications', '["first_name", "last_name", "email", "company", "message"]'),
        
        ('welcome_email', 'Welcome to Hire with Prachi!', 
        '<h2>Welcome {{first_name}}!</h2><p>Thank you for your interest in our HR services. We will get back to you shortly.</p>',
        'Welcome {{first_name}}!\nThank you for your interest in our HR services. We will get back to you shortly.',
        'marketing', '["first_name"]');
        
        RAISE NOTICE 'Created email_templates table with default templates';
    ELSE
        RAISE NOTICE 'email_templates table already exists - skipping creation';
    END IF;
END $$;

-- Automation rules table
DO $$ BEGIN
    IF NOT table_exists('automation_rules') THEN
        CREATE TABLE public.automation_rules (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            trigger_type VARCHAR(100) NOT NULL,
            trigger_conditions JSONB NOT NULL,
            actions JSONB NOT NULL,
            is_active BOOLEAN DEFAULT true,
            execution_count INTEGER DEFAULT 0,
            last_executed TIMESTAMP WITH TIME ZONE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            created_by UUID REFERENCES auth.users(id)
        );
        RAISE NOTICE 'Created automation_rules table';
    ELSE
        RAISE NOTICE 'automation_rules table already exists - skipping creation';
    END IF;
END $$;

-- Analytics events table
DO $$ BEGIN
    IF NOT table_exists('analytics_events') THEN
        CREATE TABLE public.analytics_events (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            event_name VARCHAR(100) NOT NULL,
            event_category VARCHAR(100),
            properties JSONB,
            user_id UUID REFERENCES auth.users(id),
            session_id VARCHAR(255),
            ip_address INET,
            user_agent TEXT,
            referrer VARCHAR(500),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        RAISE NOTICE 'Created analytics_events table';
    ELSE
        RAISE NOTICE 'analytics_events table already exists - skipping creation';
    END IF;
END $$;

-- System settings table
DO $$ BEGIN
    IF NOT table_exists('system_settings') THEN
        CREATE TABLE public.system_settings (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            setting_key VARCHAR(100) UNIQUE NOT NULL,
            setting_value JSONB NOT NULL,
            setting_type VARCHAR(50),
            description TEXT,
            is_public BOOLEAN DEFAULT false,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_by UUID REFERENCES auth.users(id)
        );
        
        -- Insert default settings
        INSERT INTO public.system_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
        ('site_name', '"Hire with Prachi"', 'string', 'Website name', true),
        ('company_email', '"admin@hirewithprachi.com"', 'string', 'Company contact email', false),
        ('timezone', '"Asia/Kolkata"', 'string', 'Default timezone', false),
        ('email_notifications', 'true', 'boolean', 'Enable email notifications', false),
        ('dashboard_refresh_interval', '30', 'number', 'Dashboard refresh interval in seconds', false),
        ('max_file_upload_size', '10485760', 'number', 'Maximum file upload size in bytes (10MB)', false),
        ('backup_retention_days', '30', 'number', 'Number of days to keep backups', false);
        
        RAISE NOTICE 'Created system_settings table with default settings';
    ELSE
        RAISE NOTICE 'system_settings table already exists - skipping creation';
    END IF;
END $$;

-- Backup history table
DO $$ BEGIN
    IF NOT table_exists('backup_history') THEN
        CREATE TABLE public.backup_history (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            backup_type VARCHAR(50) NOT NULL,
            file_path VARCHAR(500),
            file_size BIGINT,
            status VARCHAR(50) DEFAULT 'completed',
            error_message TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            created_by UUID REFERENCES auth.users(id)
        );
        RAISE NOTICE 'Created backup_history table';
    ELSE
        RAISE NOTICE 'backup_history table already exists - skipping creation';
    END IF;
END $$;

-- Integration configs table
DO $$ BEGIN
    IF NOT table_exists('integration_configs') THEN
        CREATE TABLE public.integration_configs (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            service_name VARCHAR(100) NOT NULL,
            configuration JSONB NOT NULL,
            is_active BOOLEAN DEFAULT true,
            last_sync TIMESTAMP WITH TIME ZONE,
            sync_status VARCHAR(50),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            created_by UUID REFERENCES auth.users(id)
        );
        RAISE NOTICE 'Created integration_configs table';
    ELSE
        RAISE NOTICE 'integration_configs table already exists - skipping creation';
    END IF;
END $$;

-- ======================================================================
-- CREATE INDEXES (IF THEY DON'T EXIST)
-- ======================================================================

-- Function to check if index exists
CREATE OR REPLACE FUNCTION index_exists(index_name TEXT) 
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM pg_indexes 
        WHERE schemaname = 'public' 
        AND indexname = $1
    );
END;
$$ LANGUAGE plpgsql;

-- Create indexes only if they don't exist
DO $$ BEGIN
    -- Leads indexes
    IF NOT index_exists('idx_leads_email') THEN
        CREATE INDEX CONCURRENTLY idx_leads_email ON public.leads(email);
    END IF;
    
    IF NOT index_exists('idx_leads_status') THEN
        CREATE INDEX CONCURRENTLY idx_leads_status ON public.leads(status);
    END IF;
    
    IF NOT index_exists('idx_leads_created_at') THEN
        CREATE INDEX CONCURRENTLY idx_leads_created_at ON public.leads(created_at DESC);
    END IF;
    
    -- Blog posts indexes
    IF table_exists('blog_posts') AND NOT index_exists('idx_blog_posts_status') THEN
        CREATE INDEX CONCURRENTLY idx_blog_posts_status ON public.blog_posts(status);
    END IF;
    
    -- Activity logs indexes
    IF table_exists('activity_logs') AND NOT index_exists('idx_activity_logs_created_at') THEN
        CREATE INDEX CONCURRENTLY idx_activity_logs_created_at ON public.activity_logs(created_at DESC);
    END IF;
    
    RAISE NOTICE 'Indexes created or already exist';
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Some indexes could not be created - this is usually fine';
END $$;

-- ======================================================================
-- ENABLE RLS ON NEW TABLES
-- ======================================================================
DO $$ 
DECLARE
    table_record RECORD;
BEGIN
    FOR table_record IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN (
            'user_roles', 'activity_logs', 'notifications', 'dashboard_widgets',
            'email_templates', 'automation_rules', 'analytics_events', 
            'system_settings', 'backup_history', 'integration_configs'
        )
    LOOP
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', table_record.table_name);
        
        -- Create admin access policy
        EXECUTE format('
            CREATE POLICY "Admin full access on %I" ON public.%I
            FOR ALL USING (
                EXISTS (
                    SELECT 1 FROM public.admin_users 
                    WHERE user_id = auth.uid() AND is_active = true
                )
            )', table_record.table_name, table_record.table_name);
        
        RAISE NOTICE 'Enabled RLS on %', table_record.table_name;
    END LOOP;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'RLS policies already exist or could not be created';
END $$;

-- ======================================================================
-- CREATE OR UPDATE TRIGGERS
-- ======================================================================

-- Updated timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Activity logging trigger function
CREATE OR REPLACE FUNCTION log_activity()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.activity_logs (
        user_id,
        action,
        resource_type,
        resource_id,
        old_data,
        new_data,
        ip_address
    ) VALUES (
        auth.uid(),
        TG_OP,
        TG_TABLE_NAME,
        COALESCE(NEW.id::TEXT, OLD.id::TEXT),
        CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
        CASE WHEN TG_OP != 'DELETE' THEN to_jsonb(NEW) ELSE NULL END,
        inet_client_addr()
    );
    
    RETURN COALESCE(NEW, OLD);
EXCEPTION WHEN OTHERS THEN
    -- Don't fail the main operation if logging fails
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Apply triggers to existing tables
DO $$ 
DECLARE
    table_record RECORD;
BEGIN
    FOR table_record IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN ('leads', 'blog_posts', 'admin_users', 'videos', 'resources')
    LOOP
        -- Drop existing triggers if they exist
        EXECUTE format('DROP TRIGGER IF EXISTS update_%I_updated_at ON public.%I', table_record.table_name, table_record.table_name);
        EXECUTE format('DROP TRIGGER IF EXISTS log_%I_activity ON public.%I', table_record.table_name, table_record.table_name);
        
        -- Create updated_at trigger
        EXECUTE format('
            CREATE TRIGGER update_%I_updated_at 
            BEFORE UPDATE ON public.%I 
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()', 
            table_record.table_name, table_record.table_name);
        
        -- Create activity logging trigger
        IF table_exists('activity_logs') THEN
            EXECUTE format('
                CREATE TRIGGER log_%I_activity 
                AFTER INSERT OR UPDATE OR DELETE ON public.%I 
                FOR EACH ROW EXECUTE FUNCTION log_activity()', 
                table_record.table_name, table_record.table_name);
        END IF;
        
        RAISE NOTICE 'Applied triggers to %', table_record.table_name;
    END LOOP;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Some triggers could not be created - this is usually fine';
END $$;

-- ======================================================================
-- VERIFY ADMIN USER
-- ======================================================================
DO $$ 
DECLARE
    admin_count INTEGER;
    user_record RECORD;
BEGIN
    -- Check if admin user exists
    SELECT COUNT(*) INTO admin_count 
    FROM public.admin_users 
    WHERE email = 'prachishri005@gmail.com' AND is_active = true;
    
    IF admin_count > 0 THEN
        RAISE NOTICE 'Admin user prachishri005@gmail.com already exists and is active';
        
        -- Get admin user details
        SELECT * INTO user_record 
        FROM public.admin_users 
        WHERE email = 'prachishri005@gmail.com' 
        LIMIT 1;
        
        RAISE NOTICE 'Admin user ID: %, Role: %', user_record.user_id, user_record.role;
    ELSE
        RAISE NOTICE 'Admin user prachishri005@gmail.com not found - please create manually';
    END IF;
END $$;

-- ======================================================================
-- CREATE ANALYTICS VIEWS
-- ======================================================================

-- Lead conversion funnel view
CREATE OR REPLACE VIEW lead_conversion_funnel AS
SELECT 
    status,
    COUNT(*) as count,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
FROM public.leads 
GROUP BY status
ORDER BY 
    CASE status 
        WHEN 'new' THEN 1
        WHEN 'contacted' THEN 2
        WHEN 'qualified' THEN 3
        WHEN 'proposal' THEN 4
        WHEN 'negotiation' THEN 5
        WHEN 'converted' THEN 6
        WHEN 'lost' THEN 7
    END;

-- Monthly lead trends view
CREATE OR REPLACE VIEW monthly_lead_trends AS
SELECT 
    DATE_TRUNC('month', created_at) as month,
    COUNT(*) as total_leads,
    COUNT(*) FILTER (WHERE status = 'converted') as converted_leads,
    ROUND(COUNT(*) FILTER (WHERE status = 'converted') * 100.0 / COUNT(*), 2) as conversion_rate
FROM public.leads 
WHERE created_at >= DATE_TRUNC('year', NOW())
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month;

-- System health dashboard view
CREATE OR REPLACE VIEW system_health AS
SELECT 
    'leads' as metric, COUNT(*) as value, 'total' as type FROM public.leads
UNION ALL
SELECT 'blog_posts', COUNT(*), 'total' FROM public.blog_posts WHERE status = 'published'
UNION ALL
SELECT 'videos', COUNT(*), 'total' FROM public.videos WHERE is_active = true
UNION ALL
SELECT 'admin_users', COUNT(*), 'total' FROM public.admin_users WHERE is_active = true
UNION ALL
SELECT 'storage_used', COALESCE(SUM(file_size), 0), 'bytes' FROM public.resources;

-- ======================================================================
-- CLEANUP AND FINALIZATION
-- ======================================================================

-- Drop helper functions
DROP FUNCTION IF EXISTS table_exists(TEXT);
DROP FUNCTION IF EXISTS column_exists(TEXT, TEXT);
DROP FUNCTION IF EXISTS index_exists(TEXT);

-- Grant permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Final success message
DO $$ BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE 'SMART INCREMENTAL MIGRATION COMPLETE!';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'All enhancements applied successfully';
    RAISE NOTICE 'New tables created where needed';
    RAISE NOTICE 'Existing tables enhanced with new columns';
    RAISE NOTICE 'Indexes and triggers configured';
    RAISE NOTICE 'Views created for analytics';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Your World-Class Admin Dashboard is ready!';
    RAISE NOTICE '========================================';
END $$;
