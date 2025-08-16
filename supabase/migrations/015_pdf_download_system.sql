-- PDF Download System Migration
-- This adds tables and functions for secure PDF downloads with lead capture

-- Resource categories table
CREATE TABLE IF NOT EXISTS resource_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT DEFAULT 'FileText',
  color TEXT DEFAULT 'blue',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced resources table (extending existing if needed)
DO $$ 
BEGIN
  -- Add new columns to existing resources table if they don't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'resources' AND column_name = 'category_id') THEN
    ALTER TABLE public.resources ADD COLUMN category_id UUID REFERENCES resource_categories(id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'resources' AND column_name = 'file_path') THEN
    ALTER TABLE public.resources ADD COLUMN file_path TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'resources' AND column_name = 'file_size_bytes') THEN
    ALTER TABLE public.resources ADD COLUMN file_size_bytes BIGINT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'resources' AND column_name = 'mime_type') THEN
    ALTER TABLE public.resources ADD COLUMN mime_type TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'resources' AND column_name = 'ai_summary') THEN
    ALTER TABLE public.resources ADD COLUMN ai_summary TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'resources' AND column_name = 'requires_lead_capture') THEN
    ALTER TABLE public.resources ADD COLUMN requires_lead_capture BOOLEAN DEFAULT true;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'resources' AND column_name = 'is_premium') THEN
    ALTER TABLE public.resources ADD COLUMN is_premium BOOLEAN DEFAULT false;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'resources' AND column_name = 'preview_image_url') THEN
    ALTER TABLE public.resources ADD COLUMN preview_image_url TEXT;
  END IF;
END $$;

-- Resource downloads tracking table
CREATE TABLE IF NOT EXISTS resource_downloads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  resource_id UUID REFERENCES resources(id) ON DELETE CASCADE NOT NULL,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  user_email TEXT NOT NULL,
  user_name TEXT,
  company_name TEXT,
  phone TEXT,
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  download_completed BOOLEAN DEFAULT false,
  download_url TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Download verification tokens (for secure download links)
CREATE TABLE IF NOT EXISTS download_tokens (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  token TEXT UNIQUE NOT NULL,
  resource_id UUID REFERENCES resources(id) ON DELETE CASCADE NOT NULL,
  user_email TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE,
  is_used BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default resource categories
INSERT INTO resource_categories (name, description, icon, color, sort_order) VALUES 
('HR Templates', 'Ready-to-use HR document templates', 'FileText', 'blue', 1),
('Policy Documents', 'Company policy templates and guides', 'Shield', 'green', 2),
('Compliance Checklists', 'Legal and regulatory compliance tools', 'CheckSquare', 'orange', 3),
('Recruitment Tools', 'Hiring and recruitment resources', 'Users', 'purple', 4),
('Performance Management', 'Employee evaluation and development tools', 'TrendingUp', 'indigo', 5),
('Training Materials', 'Employee training and development resources', 'BookOpen', 'pink', 6),
('Payroll & Benefits', 'Compensation and benefits documentation', 'DollarSign', 'emerald', 7),
('Legal Forms', 'Legal documents and forms', 'Scale', 'red', 8),
('Analytics Templates', 'HR metrics and reporting templates', 'BarChart3', 'yellow', 9),
('Onboarding Kits', 'New employee onboarding resources', 'UserPlus', 'cyan', 10)
ON CONFLICT (name) DO NOTHING;

-- Enhance leads table for download tracking
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'download_count') THEN
    ALTER TABLE public.leads ADD COLUMN download_count INTEGER DEFAULT 0;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'first_download_at') THEN
    ALTER TABLE public.leads ADD COLUMN first_download_at TIMESTAMP WITH TIME ZONE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'last_download_at') THEN
    ALTER TABLE public.leads ADD COLUMN last_download_at TIMESTAMP WITH TIME ZONE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'lead_source_detail') THEN
    ALTER TABLE public.leads ADD COLUMN lead_source_detail TEXT;
  END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_resource_downloads_resource_id ON resource_downloads(resource_id);
CREATE INDEX IF NOT EXISTS idx_resource_downloads_user_email ON resource_downloads(user_email);
CREATE INDEX IF NOT EXISTS idx_resource_downloads_created_at ON resource_downloads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_download_tokens_token ON download_tokens(token);
CREATE INDEX IF NOT EXISTS idx_download_tokens_expires_at ON download_tokens(expires_at);
CREATE INDEX IF NOT EXISTS idx_resources_category_id ON resources(category_id);
CREATE INDEX IF NOT EXISTS idx_resources_requires_lead_capture ON resources(requires_lead_capture);

-- Function to generate secure download token
CREATE OR REPLACE FUNCTION generate_download_token(
  p_resource_id UUID,
  p_user_email TEXT,
  p_expires_minutes INTEGER DEFAULT 60
) RETURNS TEXT AS $$
DECLARE
  v_token TEXT;
  v_expires_at TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Generate secure token
  v_token := encode(gen_random_bytes(32), 'base64url');
  v_expires_at := NOW() + (p_expires_minutes || ' minutes')::INTERVAL;
  
  -- Store token
  INSERT INTO download_tokens (token, resource_id, user_email, expires_at)
  VALUES (v_token, p_resource_id, p_user_email, v_expires_at);
  
  RETURN v_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to verify and use download token
CREATE OR REPLACE FUNCTION verify_download_token(
  p_token TEXT,
  p_user_email TEXT
) RETURNS TABLE(
  is_valid BOOLEAN,
  resource_id UUID,
  file_path TEXT,
  resource_title TEXT
) AS $$
DECLARE
  v_token_record RECORD;
  v_resource_record RECORD;
BEGIN
  -- Get token record
  SELECT * INTO v_token_record
  FROM download_tokens 
  WHERE token = p_token 
    AND user_email = p_user_email
    AND expires_at > NOW()
    AND is_used = false;
  
  IF NOT FOUND THEN
    RETURN QUERY SELECT false, NULL::UUID, NULL::TEXT, NULL::TEXT;
    RETURN;
  END IF;
  
  -- Get resource record
  SELECT * INTO v_resource_record
  FROM resources 
  WHERE id = v_token_record.resource_id;
  
  IF NOT FOUND THEN
    RETURN QUERY SELECT false, NULL::UUID, NULL::TEXT, NULL::TEXT;
    RETURN;
  END IF;
  
  -- Mark token as used
  UPDATE download_tokens 
  SET is_used = true, used_at = NOW()
  WHERE token = p_token;
  
  -- Update download tracking
  UPDATE resource_downloads 
  SET download_completed = true
  WHERE resource_id = v_token_record.resource_id 
    AND user_email = p_user_email
    AND download_completed = false;
  
  -- Return success
  RETURN QUERY SELECT 
    true,
    v_resource_record.id,
    v_resource_record.file_path,
    v_resource_record.title;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to track resource download
CREATE OR REPLACE FUNCTION track_resource_download(
  p_resource_id UUID,
  p_lead_id UUID DEFAULT NULL,
  p_user_email TEXT DEFAULT NULL,
  p_user_name TEXT DEFAULT NULL,
  p_company_name TEXT DEFAULT NULL,
  p_phone TEXT DEFAULT NULL,
  p_ip_address INET DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL,
  p_referrer TEXT DEFAULT NULL,
  p_utm_source TEXT DEFAULT NULL,
  p_utm_medium TEXT DEFAULT NULL,
  p_utm_campaign TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
  v_download_id UUID;
  v_token TEXT;
  v_download_url TEXT;
  v_expires_at TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Generate secure download token
  v_token := generate_download_token(p_resource_id, p_user_email);
  v_expires_at := NOW() + INTERVAL '1 hour';
  v_download_url := '/api/download/' || v_token;
  
  -- Insert download record
  INSERT INTO resource_downloads (
    resource_id, lead_id, user_email, user_name, company_name, phone,
    ip_address, user_agent, referrer, utm_source, utm_medium, utm_campaign,
    download_url, expires_at
  ) VALUES (
    p_resource_id, p_lead_id, p_user_email, p_user_name, p_company_name, p_phone,
    p_ip_address, p_user_agent, p_referrer, p_utm_source, p_utm_medium, p_utm_campaign,
    v_download_url, v_expires_at
  ) RETURNING id INTO v_download_id;
  
  -- Update resource download count
  UPDATE resources 
  SET download_count = COALESCE(download_count, 0) + 1
  WHERE id = p_resource_id;
  
  -- Update lead download tracking if lead_id provided
  IF p_lead_id IS NOT NULL THEN
    UPDATE leads 
    SET 
      download_count = COALESCE(download_count, 0) + 1,
      first_download_at = COALESCE(first_download_at, NOW()),
      last_download_at = NOW()
    WHERE id = p_lead_id;
  END IF;
  
  RETURN v_download_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on new tables
ALTER TABLE resource_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE download_tokens ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Public read access to active resource categories
CREATE POLICY "Public read access to active categories" ON resource_categories
  FOR SELECT USING (is_active = true);

-- Admin full access to categories
CREATE POLICY "Admin full access to categories" ON resource_categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid() 
      AND is_active = true
    )
  );

-- Admin access to download tracking
CREATE POLICY "Admin access to downloads" ON resource_downloads
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid() 
      AND is_active = true
    )
  );

-- Users can access their own download tokens
CREATE POLICY "Users access own tokens" ON download_tokens
  FOR SELECT USING (user_email = auth.email());

-- Admin access to all tokens
CREATE POLICY "Admin access to tokens" ON download_tokens
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid() 
      AND is_active = true
    )
  );

-- Update existing resources RLS policy to include public read for non-premium resources
CREATE POLICY "Public read access to free resources" ON resources
  FOR SELECT USING (
    is_premium = false OR is_premium IS NULL
  );

-- Create updated_at trigger for categories
CREATE TRIGGER update_resource_categories_updated_at 
  BEFORE UPDATE ON resource_categories 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample resources if table is empty
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM resources LIMIT 1) THEN
    INSERT INTO resources (
      title, description, category_id, type, file_path, file_size_bytes, 
      mime_type, tags, is_featured, requires_lead_capture, ai_summary
    ) 
    SELECT 
      'Employee Handbook Template',
      'Comprehensive employee handbook template with all essential policies and procedures.',
      (SELECT id FROM resource_categories WHERE name = 'HR Templates'),
      'template',
      'templates/employee-handbook-template.pdf',
      2547821,
      'application/pdf',
      ARRAY['handbook', 'policies', 'employee', 'template'],
      true,
      true,
      'A complete employee handbook template covering company policies, procedures, and employee rights and responsibilities.'
    WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Employee Handbook Template');
    
    INSERT INTO resources (
      title, description, category_id, type, file_path, file_size_bytes, 
      mime_type, tags, is_featured, requires_lead_capture, ai_summary
    ) 
    SELECT 
      'POSH Compliance Checklist',
      'Prevention of Sexual Harassment compliance checklist for Indian companies.',
      (SELECT id FROM resource_categories WHERE name = 'Compliance Checklists'),
      'checklist',
      'checklists/posh-compliance-checklist.pdf',
      1234567,
      'application/pdf',
      ARRAY['POSH', 'compliance', 'sexual harassment', 'legal'],
      true,
      true,
      'Essential checklist to ensure your organization complies with POSH Act requirements and creates a safe workplace.'
    WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'POSH Compliance Checklist');
    
    INSERT INTO resources (
      title, description, category_id, type, file_path, file_size_bytes, 
      mime_type, tags, is_featured, requires_lead_capture, ai_summary
    ) 
    SELECT 
      'Job Description Template Pack',
      'Collection of job description templates for various roles.',
      (SELECT id FROM resource_categories WHERE name = 'Recruitment Tools'),
      'template',
      'templates/job-description-pack.pdf',
      3456789,
      'application/pdf',
      ARRAY['job description', 'recruitment', 'hiring', 'templates'],
      false,
      true,
      'Professional job description templates for different roles to streamline your recruitment process.'
    WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Job Description Template Pack');
  END IF;
END $$;
