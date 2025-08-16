-- Missing Tables Migration
-- This migration creates the missing services and downloads tables

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  price DECIMAL(10,2),
  duration VARCHAR(50),
  features JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create downloads table
CREATE TABLE IF NOT EXISTS downloads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_type VARCHAR(50) NOT NULL,
  resource_name VARCHAR(255) NOT NULL,
  file_url VARCHAR(500),
  file_size INTEGER,
  download_count INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_downloads_user_id ON downloads(user_id);
CREATE INDEX IF NOT EXISTS idx_downloads_resource_type ON downloads(resource_type);

-- Create RLS policies for services table
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active services
CREATE POLICY "Anyone can view active services" ON services
  FOR SELECT USING (is_active = true);

-- Policy: Only admins can manage services
CREATE POLICY "Admins can manage services" ON services
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Create RLS policies for downloads table
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own downloads
CREATE POLICY "Users can view own downloads" ON downloads
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own downloads
CREATE POLICY "Users can insert own downloads" ON downloads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Admins can view all downloads
CREATE POLICY "Admins can view all downloads" ON downloads
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Create function to update updated_at timestamp for services
CREATE OR REPLACE FUNCTION update_services_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at for services
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_services_updated_at();

-- Insert some sample services
INSERT INTO services (name, description, category, price, duration, features) VALUES
('HR Consulting', 'Comprehensive HR consulting services for businesses of all sizes', 'Consulting', 5000.00, '3 months', '["Strategic Planning", "Policy Development", "Compliance Review"]'),
('Recruitment Services', 'End-to-end recruitment and talent acquisition services', 'Recruitment', 3000.00, '2 months', '["Job Posting", "Candidate Screening", "Interview Coordination"]'),
('Employee Training', 'Customized training programs for employee development', 'Training', 2000.00, '1 month', '["Needs Assessment", "Custom Content", "Progress Tracking"]'),
('Payroll Management', 'Complete payroll processing and management services', 'Payroll', 1500.00, 'Ongoing', '["Payroll Processing", "Tax Filing", "Compliance"]'),
('Performance Management', 'Performance review and management system implementation', 'Performance', 2500.00, '2 months', '["System Setup", "Training", "Ongoing Support"]')
ON CONFLICT DO NOTHING;
