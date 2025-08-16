-- Compatible Admin Dashboard Migration
-- This migration only adds missing columns to existing tables
-- and creates the email_logs table if it doesn't exist

-- Add email_logs table for tracking email communications (only if it doesn't exist)
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(100) NOT NULL,
  recipients TEXT NOT NULL,
  data JSONB,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Add indexes for email_logs (only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_email_logs_type ON email_logs(type);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_created_at ON email_logs(created_at);

-- Add missing columns to existing tables using conditional logic
DO $$ 
BEGIN
  -- Add missing columns to leads table (only if they don't exist)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'priority') THEN
    ALTER TABLE leads ADD COLUMN priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'assigned_to') THEN
    ALTER TABLE leads ADD COLUMN assigned_to UUID REFERENCES admin_users(id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'notes') THEN
    ALTER TABLE leads ADD COLUMN notes TEXT;
  END IF;

  -- Add missing columns to blog_posts table (only if they don't exist)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'meta_title') THEN
    ALTER TABLE blog_posts ADD COLUMN meta_title VARCHAR(255);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'meta_description') THEN
    ALTER TABLE blog_posts ADD COLUMN meta_description TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'view_count') THEN
    ALTER TABLE blog_posts ADD COLUMN view_count INTEGER DEFAULT 0;
  END IF;

  -- Add missing columns to resources table (only if they don't exist)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'resources' AND column_name = 'category') THEN
    ALTER TABLE resources ADD COLUMN category VARCHAR(100) DEFAULT 'general';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'resources' AND column_name = 'uploaded_by') THEN
    ALTER TABLE resources ADD COLUMN uploaded_by UUID REFERENCES admin_users(id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'resources' AND column_name = 'description') THEN
    ALTER TABLE resources ADD COLUMN description TEXT;
  END IF;

END $$;

-- Create indexes for better performance (only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_leads_priority ON leads(priority);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_blog_posts_view_count ON blog_posts(view_count);
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_uploaded_by ON resources(uploaded_by);

-- Create RLS policies for email_logs table (only if they don't exist)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'email_logs' AND policyname = 'Admins can view email logs') THEN
    CREATE POLICY "Admins can view email logs" ON email_logs
      FOR SELECT USING (public.is_admin());
  END IF;
END $$;

-- Enable RLS on email_logs table
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Insert sample data for testing (only if tables are empty)
DO $$
BEGIN
  -- Insert sample leads if leads table is empty
  IF NOT EXISTS (SELECT 1 FROM leads LIMIT 1) THEN
    INSERT INTO leads (name, email, company, source, status, priority, notes)
    VALUES 
      ('John Doe', 'john.doe@example.com', 'Tech Corp', 'website', 'new', 'high', 'Interested in HR consulting services'),
      ('Jane Smith', 'jane.smith@example.com', 'Startup Inc', 'website', 'contacted', 'medium', 'Looking for recruitment services'),
      ('Mike Johnson', 'mike.johnson@example.com', 'Enterprise Ltd', 'website', 'qualified', 'high', 'Need employee training programs');
  END IF;

  -- Insert sample blog posts if blog_posts table is empty
  IF NOT EXISTS (SELECT 1 FROM blog_posts LIMIT 1) THEN
    INSERT INTO blog_posts (title, slug, content, excerpt, status, published_at, meta_title, meta_description, tags)
    VALUES 
      ('Top HR Trends for 2024', 'top-hr-trends-2024', 'Comprehensive analysis of HR trends...', 'Discover the latest HR trends that will shape the industry in 2024', 'published', NOW(), 'Top HR Trends for 2024', 'Latest HR industry trends and insights for 2024', ARRAY['HR Trends', '2024', 'Industry Insights']),
      ('Building a Strong Company Culture', 'building-strong-company-culture', 'Learn how to create a positive company culture...', 'Essential strategies for building and maintaining a strong company culture', 'published', NOW(), 'Building a Strong Company Culture', 'Strategies for creating a positive and productive company culture', ARRAY['Company Culture', 'Leadership', 'Employee Engagement']);
  END IF;

  -- Insert sample resources if resources table is empty
  IF NOT EXISTS (SELECT 1 FROM resources LIMIT 1) THEN
    INSERT INTO resources (title, description, category, type, file_url, tags)
    VALUES 
      ('HR Policy Template', 'Comprehensive HR policy template for small businesses', 'templates', 'pdf', '/downloads/hr-policy-template.pdf', ARRAY['HR Policy', 'Template', 'Small Business']),
      ('Employee Handbook Guide', 'Complete guide to creating an employee handbook', 'guides', 'pdf', '/downloads/employee-handbook-guide.pdf', ARRAY['Employee Handbook', 'Guide', 'Best Practices']);
  END IF;

END $$;
