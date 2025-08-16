-- Admin Dashboard Schema Migration
-- This migration adds tables and fields needed for the admin dashboard

-- Add email_logs table for tracking email communications
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(100) NOT NULL,
  recipients TEXT NOT NULL,
  data JSONB,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_email_logs_type ON email_logs(type);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_created_at ON email_logs(created_at);
-- Add missing columns to existing tables if they don't exist
DO $$ 
BEGIN
  -- Add category column to downloads table
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'downloads' AND column_name = 'category') THEN
    ALTER TABLE downloads ADD COLUMN category VARCHAR(100) DEFAULT 'general';
  END IF;

  -- Add uploaded_by column to downloads table
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'downloads' AND column_name = 'uploaded_by') THEN
    ALTER TABLE downloads ADD COLUMN uploaded_by UUID REFERENCES users(id);
  END IF;

  -- Add description column to downloads table
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'downloads' AND column_name = 'description') THEN
    ALTER TABLE downloads ADD COLUMN description TEXT;
  END IF;

  -- Add role column to users table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'role') THEN
    ALTER TABLE users ADD COLUMN role VARCHAR(20) DEFAULT 'client' CHECK (role IN ('admin', 'client', 'guest'));
  END IF;

  -- Add is_active column to users table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'is_active') THEN
    ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT true;
  END IF;

  -- Add email_verified column to users table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'email_verified') THEN
    ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT false;
  END IF;

  -- Add verification_token column to users table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'verification_token') THEN
    ALTER TABLE users ADD COLUMN verification_token VARCHAR(255);
  END IF;

  -- Add reset_token column to users table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'reset_token') THEN
    ALTER TABLE users ADD COLUMN reset_token VARCHAR(255);
  END IF;

  -- Add reset_token_expires column to users table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'reset_token_expires') THEN
    ALTER TABLE users ADD COLUMN reset_token_expires TIMESTAMP;
  END IF;

  -- Add source column to leads table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'source') THEN
    ALTER TABLE leads ADD COLUMN source VARCHAR(100) DEFAULT 'website';
  END IF;

  -- Add priority column to leads table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'priority') THEN
    ALTER TABLE leads ADD COLUMN priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent'));
  END IF;

  -- Add assigned_to column to leads table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'assigned_to') THEN
    ALTER TABLE leads ADD COLUMN assigned_to UUID REFERENCES users(id);
  END IF;

  -- Add notes column to leads table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'notes') THEN
    ALTER TABLE leads ADD COLUMN notes TEXT;
  END IF;

  -- Add meta_title column to blog_posts table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'meta_title') THEN
    ALTER TABLE blog_posts ADD COLUMN meta_title VARCHAR(255);
  END IF;

  -- Add meta_description column to blog_posts table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'meta_description') THEN
    ALTER TABLE blog_posts ADD COLUMN meta_description TEXT;
  END IF;

  -- Add tags column to blog_posts table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'tags') THEN
    ALTER TABLE blog_posts ADD COLUMN tags TEXT[];
  END IF;

  -- Add view_count column to blog_posts table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'view_count') THEN
    ALTER TABLE blog_posts ADD COLUMN view_count INTEGER DEFAULT 0;
  END IF;

  -- Add features column to services table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'features') THEN
    ALTER TABLE services ADD COLUMN features TEXT[];
  END IF;

  -- Add pricing_info column to services table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'pricing_info') THEN
    ALTER TABLE services ADD COLUMN pricing_info TEXT;
  END IF;

  -- Add image_url column to services table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'image_url') THEN
    ALTER TABLE services ADD COLUMN image_url VARCHAR(500);
  END IF;

  -- Add is_active column to services table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'is_active') THEN
    ALTER TABLE services ADD COLUMN is_active BOOLEAN DEFAULT true;
  END IF;

  -- Add sort_order column to services table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'sort_order') THEN
    ALTER TABLE services ADD COLUMN sort_order INTEGER DEFAULT 0;
  END IF;

END $$;
-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_priority ON leads(priority);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);
CREATE INDEX IF NOT EXISTS idx_users_email_verified ON users(email_verified);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_view_count ON blog_posts(view_count);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_sort_order ON services(sort_order);
CREATE INDEX IF NOT EXISTS idx_downloads_category ON downloads(category);
CREATE INDEX IF NOT EXISTS idx_downloads_uploaded_by ON downloads(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_downloads_download_count ON downloads(download_count);
-- Create RLS policies for admin access
-- Note: These policies ensure only admin users can access certain data

-- Policy for users table - only admins can see all users
CREATE POLICY "Admin users can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
-- Policy for leads table - admins can see all leads
CREATE POLICY "Admin users can view all leads" ON leads
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
-- Policy for blog_posts table - admins can manage all posts
CREATE POLICY "Admin users can manage blog posts" ON blog_posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
-- Policy for services table - admins can manage all services
CREATE POLICY "Admin users can manage services" ON services
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
-- Policy for downloads table - admins can manage all files
CREATE POLICY "Admin users can manage downloads" ON downloads
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
-- Policy for email_logs table - admins can view all email logs
CREATE POLICY "Admin users can view email logs" ON email_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
-- Insert default admin user if not exists
INSERT INTO users (id, email, first_name, last_name, role, is_active, email_verified)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'admin@hirewithprachi.com',
  'Admin',
  'User',
  'admin',
  true,
  true
) ON CONFLICT (id) DO NOTHING;
-- Insert sample data for testing
INSERT INTO leads (first_name, last_name, email, phone, company, service_interest, message, status, priority)
VALUES 
  ('John', 'Doe', 'john.doe@example.com', '+1234567890', 'Tech Corp', 'HR Consulting', 'Interested in HR consulting services', 'new', 'high'),
  ('Jane', 'Smith', 'jane.smith@example.com', '+1234567891', 'Startup Inc', 'Recruitment', 'Looking for recruitment services', 'contacted', 'medium'),
  ('Mike', 'Johnson', 'mike.johnson@example.com', '+1234567892', 'Enterprise Ltd', 'Training', 'Need employee training programs', 'qualified', 'high')
ON CONFLICT DO NOTHING;
INSERT INTO services (name, slug, description, short_description, features, pricing_info, is_active, sort_order)
VALUES 
  ('HR Consulting', 'hr-consulting', 'Comprehensive HR consulting services', 'Expert HR guidance for your business', ARRAY['Strategic Planning', 'Policy Development', 'Compliance Review'], 'Starting from $500/month', true, 1),
  ('Recruitment Services', 'recruitment-services', 'End-to-end recruitment solutions', 'Find the best talent for your organization', ARRAY['Job Posting', 'Candidate Screening', 'Interview Coordination'], 'Starting from $300/month', true, 2),
  ('Employee Training', 'employee-training', 'Professional development programs', 'Enhance your team''s skills and productivity', ARRAY['Custom Training', 'Online Courses', 'Certification Programs'], 'Starting from $200/month', true, 3)
ON CONFLICT DO NOTHING;
INSERT INTO blog_posts (title, slug, content, excerpt, status, published_at, meta_title, meta_description, tags)
VALUES 
  ('Top HR Trends for 2024', 'top-hr-trends-2024', 'Comprehensive analysis of HR trends...', 'Discover the latest HR trends that will shape the industry in 2024', 'published', NOW(), 'Top HR Trends for 2024', 'Latest HR industry trends and insights for 2024', ARRAY['HR Trends', '2024', 'Industry Insights']),
  ('Building a Strong Company Culture', 'building-strong-company-culture', 'Learn how to create a positive company culture...', 'Essential strategies for building and maintaining a strong company culture', 'published', NOW(), 'Building a Strong Company Culture', 'Strategies for creating a positive and productive company culture', ARRAY['Company Culture', 'Leadership', 'Employee Engagement'])
ON CONFLICT DO NOTHING;
