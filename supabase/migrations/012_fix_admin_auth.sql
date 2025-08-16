-- Fix Admin Authentication and Permissions
-- This migration ensures the admin user exists and has proper permissions

-- First, ensure the admin_users table exists and has the correct structure
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'admin',
    permissions JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for admin_users
DROP POLICY IF EXISTS "Admin users are viewable by authenticated users" ON admin_users;
CREATE POLICY "Admin users are viewable by authenticated users" ON admin_users
    FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin users are insertable by service role" ON admin_users;
CREATE POLICY "Admin users are insertable by service role" ON admin_users
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Insert the admin user if it doesn't exist
INSERT INTO admin_users (email, role, permissions, is_active) VALUES
    ('prachishri005@gmail.com', 'admin', '["read", "write", "delete", "admin"]', true)
ON CONFLICT (email) DO UPDATE SET
    role = EXCLUDED.role,
    permissions = EXCLUDED.permissions,
    is_active = EXCLUDED.is_active,
    updated_at = NOW();

-- Create a function to check if a user is an admin
CREATE OR REPLACE FUNCTION is_admin_user(user_email TEXT DEFAULT NULL)
RETURNS BOOLEAN AS $$
BEGIN
    -- If no email provided, use the current user's email
    IF user_email IS NULL THEN
        user_email := auth.jwt() ->> 'email';
    END IF;
    
    -- Check if the user exists in admin_users table
    RETURN EXISTS (
        SELECT 1 FROM admin_users 
        WHERE email = user_email 
        AND is_active = true 
        AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get admin permissions
CREATE OR REPLACE FUNCTION get_admin_permissions(user_email TEXT DEFAULT NULL)
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
    FROM admin_users 
    WHERE email = user_email 
    AND is_active = true;
    
    RETURN COALESCE(user_permissions, '[]'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update blog_posts RLS policies to check for admin users
DROP POLICY IF EXISTS "Blog posts are insertable by authenticated users" ON blog_posts;
CREATE POLICY "Blog posts are insertable by authenticated users" ON blog_posts
    FOR INSERT WITH CHECK (
        auth.role() = 'authenticated' AND 
        is_admin_user()
    );

DROP POLICY IF EXISTS "Blog posts are updatable by authenticated users" ON blog_posts;
CREATE POLICY "Blog posts are updatable by authenticated users" ON blog_posts
    FOR UPDATE USING (
        auth.role() = 'authenticated' AND 
        is_admin_user()
    );

DROP POLICY IF EXISTS "Blog posts are deletable by authenticated users" ON blog_posts;
CREATE POLICY "Blog posts are deletable by authenticated users" ON blog_posts
    FOR DELETE USING (
        auth.role() = 'authenticated' AND 
        is_admin_user()
    );

-- Update leads RLS policies
DROP POLICY IF EXISTS "Leads are viewable by authenticated users" ON leads;
CREATE POLICY "Leads are viewable by authenticated users" ON leads
    FOR SELECT USING (
        auth.role() = 'authenticated' AND 
        is_admin_user()
    );

DROP POLICY IF EXISTS "Leads are updatable by authenticated users" ON leads;
CREATE POLICY "Leads are updatable by authenticated users" ON leads
    FOR UPDATE USING (
        auth.role() = 'authenticated' AND 
        is_admin_user()
    );

DROP POLICY IF EXISTS "Leads are deletable by authenticated users" ON leads;
CREATE POLICY "Leads are deletable by authenticated users" ON leads
    FOR DELETE USING (
        auth.role() = 'authenticated' AND 
        is_admin_user()
    );

-- Update videos RLS policies
DROP POLICY IF EXISTS "Videos are insertable by authenticated users" ON videos;
CREATE POLICY "Videos are insertable by authenticated users" ON videos
    FOR INSERT WITH CHECK (
        auth.role() = 'authenticated' AND 
        is_admin_user()
    );

DROP POLICY IF EXISTS "Videos are updatable by authenticated users" ON videos;
CREATE POLICY "Videos are updatable by authenticated users" ON videos
    FOR UPDATE USING (
        auth.role() = 'authenticated' AND 
        is_admin_user()
    );

DROP POLICY IF EXISTS "Videos are deletable by authenticated users" ON videos;
CREATE POLICY "Videos are deletable by authenticated users" ON videos
    FOR DELETE USING (
        auth.role() = 'authenticated' AND 
        is_admin_user()
    );

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION is_admin_user(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_admin_permissions(TEXT) TO authenticated;
GRANT ALL ON admin_users TO authenticated;
GRANT ALL ON blog_posts TO authenticated;
GRANT ALL ON leads TO authenticated;
GRANT ALL ON videos TO authenticated;

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_admin_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_admin_users_updated_at();
