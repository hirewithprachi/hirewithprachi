-- Fix Blog Posts RLS Policies
-- This migration addresses the 403 Forbidden error when creating blog posts

-- Enable RLS on blog_posts table
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Blog posts are viewable by everyone" ON blog_posts;
DROP POLICY IF EXISTS "Blog posts are insertable by authenticated users" ON blog_posts;
DROP POLICY IF EXISTS "Blog posts are updatable by authenticated users" ON blog_posts;
DROP POLICY IF EXISTS "Blog posts are deletable by authenticated users" ON blog_posts;

-- Create new RLS policies for blog_posts
-- Allow public read access to published blog posts
CREATE POLICY "Blog posts are viewable by everyone" ON blog_posts
    FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');

-- Allow authenticated users to insert blog posts
CREATE POLICY "Blog posts are insertable by authenticated users" ON blog_posts
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update blog posts
CREATE POLICY "Blog posts are updatable by authenticated users" ON blog_posts
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete blog posts
CREATE POLICY "Blog posts are deletable by authenticated users" ON blog_posts
    FOR DELETE USING (auth.role() = 'authenticated');

-- Also fix leads table RLS if needed
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Leads are insertable by everyone" ON leads;
DROP POLICY IF EXISTS "Leads are viewable by authenticated users" ON leads;
DROP POLICY IF EXISTS "Leads are updatable by authenticated users" ON leads;
DROP POLICY IF EXISTS "Leads are deletable by authenticated users" ON leads;

-- Create RLS policies for leads
CREATE POLICY "Leads are insertable by everyone" ON leads
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Leads are viewable by authenticated users" ON leads
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Leads are updatable by authenticated users" ON leads
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Leads are deletable by authenticated users" ON leads
    FOR DELETE USING (auth.role() = 'authenticated');

-- Fix videos table RLS if needed
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Videos are viewable by everyone" ON videos;
DROP POLICY IF EXISTS "Videos are insertable by authenticated users" ON videos;
DROP POLICY IF EXISTS "Videos are updatable by authenticated users" ON videos;
DROP POLICY IF EXISTS "Videos are deletable by authenticated users" ON videos;

-- Create RLS policies for videos
CREATE POLICY "Videos are viewable by everyone" ON videos
    FOR SELECT USING (true);

CREATE POLICY "Videos are insertable by authenticated users" ON videos
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Videos are updatable by authenticated users" ON videos
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Videos are deletable by authenticated users" ON videos
    FOR DELETE USING (auth.role() = 'authenticated');

-- Grant necessary permissions
GRANT ALL ON blog_posts TO authenticated;
GRANT ALL ON leads TO authenticated;
GRANT ALL ON videos TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;
