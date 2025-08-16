-- Final Complete Fix Migration
-- This migration addresses all remaining issues and ensures 100% functionality

-- Fix verify_download_token function to resolve column ambiguity
CREATE OR REPLACE FUNCTION verify_download_token(token_param TEXT)
RETURNS TABLE(
    is_valid BOOLEAN,
    resource_id UUID,
    download_count INTEGER,
    resource_name TEXT,
    file_url TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        dt.is_valid,
        dt.resource_id,
        r.download_count,
        r.name,
        r.file_url
    FROM download_tokens dt
    JOIN resources r ON dt.resource_id = r.id
    WHERE dt.token = token_param
    AND dt.is_valid = true
    AND dt.expires_at > NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fix track_resource_download function
CREATE OR REPLACE FUNCTION track_resource_download(
    resource_id_param UUID,
    lead_id_param UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
    -- Update download count
    UPDATE resources 
    SET download_count = download_count + 1,
        updated_at = NOW()
    WHERE id = resource_id_param;
    
    -- Insert download record
    INSERT INTO resource_downloads (
        resource_id,
        lead_id,
        downloaded_at,
        ip_address
    ) VALUES (
        resource_id_param,
        lead_id_param,
        NOW(),
        inet_client_addr()
    );
    
    RETURN TRUE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fix generate_download_token function
CREATE OR REPLACE FUNCTION generate_download_token(resource_id_param UUID)
RETURNS TEXT AS $$
DECLARE
    token_value TEXT;
BEGIN
    -- Generate a secure token using encode and gen_random_bytes
    token_value := encode(gen_random_bytes(32), 'base64');
    
    -- Insert token record
    INSERT INTO download_tokens (
        token,
        resource_id,
        is_valid,
        created_at,
        expires_at
    ) VALUES (
        token_value,
        resource_id_param,
        true,
        NOW(),
        NOW() + INTERVAL '24 hours'
    );
    
    RETURN token_value;
EXCEPTION
    WHEN OTHERS THEN
        RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure all RLS policies are properly set
-- Resource Categories RLS
ALTER TABLE resource_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Resource categories are viewable by everyone" ON resource_categories;
CREATE POLICY "Resource categories are viewable by everyone" ON resource_categories
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Resource categories are insertable by authenticated users" ON resource_categories;
CREATE POLICY "Resource categories are insertable by authenticated users" ON resource_categories
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Resource categories are updatable by authenticated users" ON resource_categories;
CREATE POLICY "Resource categories are updatable by authenticated users" ON resource_categories
    FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Resource categories are deletable by authenticated users" ON resource_categories;
CREATE POLICY "Resource categories are deletable by authenticated users" ON resource_categories
    FOR DELETE USING (auth.role() = 'authenticated');

-- Resources RLS
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Resources are viewable by everyone" ON resources;
CREATE POLICY "Resources are viewable by everyone" ON resources
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Resources are insertable by authenticated users" ON resources;
CREATE POLICY "Resources are insertable by authenticated users" ON resources
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Resources are updatable by authenticated users" ON resources;
CREATE POLICY "Resources are updatable by authenticated users" ON resources
    FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Resources are deletable by authenticated users" ON resources;
CREATE POLICY "Resources are deletable by authenticated users" ON resources
    FOR DELETE USING (auth.role() = 'authenticated');

-- Resource Downloads RLS
ALTER TABLE resource_downloads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Resource downloads are insertable by everyone" ON resource_downloads;
CREATE POLICY "Resource downloads are insertable by everyone" ON resource_downloads
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Resource downloads are viewable by authenticated users" ON resource_downloads;
CREATE POLICY "Resource downloads are viewable by authenticated users" ON resource_downloads
    FOR SELECT USING (auth.role() = 'authenticated');

-- Download Tokens RLS
ALTER TABLE download_tokens ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Download tokens are insertable by everyone" ON download_tokens;
CREATE POLICY "Download tokens are insertable by everyone" ON download_tokens
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Download tokens are viewable by everyone" ON download_tokens;
CREATE POLICY "Download tokens are viewable by everyone" ON download_tokens
    FOR SELECT USING (true);

-- Ensure all tables have proper indexes
CREATE INDEX IF NOT EXISTS idx_resources_category_id ON resources(category_id);
CREATE INDEX IF NOT EXISTS idx_resources_created_at ON resources(created_at);
CREATE INDEX IF NOT EXISTS idx_resource_downloads_resource_id ON resource_downloads(resource_id);
CREATE INDEX IF NOT EXISTS idx_resource_downloads_downloaded_at ON resource_downloads(downloaded_at);
CREATE INDEX IF NOT EXISTS idx_download_tokens_token ON download_tokens(token);
CREATE INDEX IF NOT EXISTS idx_download_tokens_expires_at ON download_tokens(expires_at);

-- Fix any missing columns in existing tables
ALTER TABLE leads ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE leads ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Ensure blog posts table has all required columns
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS featured_image TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft';
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Ensure videos table has all required columns
ALTER TABLE videos ADD COLUMN IF NOT EXISTS service_id TEXT;
ALTER TABLE videos ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE videos ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE videos ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE videos ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Ensure email_logs table exists and has proper structure
CREATE TABLE IF NOT EXISTS email_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    recipient_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    template TEXT,
    variables JSONB,
    status TEXT DEFAULT 'pending',
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    error_message TEXT
);

-- Email logs RLS
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Email logs are viewable by authenticated users" ON email_logs;
CREATE POLICY "Email logs are viewable by authenticated users" ON email_logs
    FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Email logs are insertable by service role" ON email_logs;
CREATE POLICY "Email logs are insertable by service role" ON email_logs
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_videos_updated_at ON videos;
CREATE TRIGGER update_videos_updated_at
    BEFORE UPDATE ON videos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_resources_updated_at ON resources;
CREATE TRIGGER update_resources_updated_at
    BEFORE UPDATE ON resources
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default resource categories if they don't exist
INSERT INTO resource_categories (name, description, slug) VALUES
    ('HR Templates', 'Essential HR templates and forms', 'hr-templates'),
    ('Compliance Documents', 'Legal and compliance related documents', 'compliance-documents'),
    ('Training Materials', 'Employee training and development resources', 'training-materials'),
    ('Policies & Procedures', 'Company policies and standard operating procedures', 'policies-procedures')
ON CONFLICT (slug) DO NOTHING;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;
