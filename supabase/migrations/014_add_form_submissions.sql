-- Add form_submissions table for website form data
-- This table stores all form submissions from contact forms, calculators, and other website forms

-- Create form_submissions table
CREATE TABLE IF NOT EXISTS public.form_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  form_type TEXT NOT NULL, -- 'contact', 'calculator', 'download', 'newsletter', etc.
  form_data JSONB NOT NULL, -- Flexible storage for all form fields
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost', 'spam')),
  source TEXT, -- 'website', 'landing_page', 'calculator', etc.
  page_url TEXT, -- URL where form was submitted
  user_agent TEXT, -- Browser/device info
  ip_address INET, -- IP address for tracking
  lead_score INTEGER DEFAULT 0, -- Calculated lead score
  notes TEXT, -- Admin notes
  assigned_to UUID REFERENCES auth.users(id), -- Admin assigned to handle
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_form_submissions_form_type ON public.form_submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_form_submissions_status ON public.form_submissions(status);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON public.form_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_form_submissions_user_id ON public.form_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_form_submissions_source ON public.form_submissions(source);

-- Enable Row Level Security
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for form_submissions
CREATE POLICY "Form submissions are viewable by authenticated users" ON public.form_submissions
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Form submissions are insertable by authenticated users" ON public.form_submissions
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Form submissions are updatable by authenticated users" ON public.form_submissions
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Form submissions are deletable by authenticated users" ON public.form_submissions
    FOR DELETE USING (auth.role() = 'authenticated');

-- Grant permissions
GRANT ALL ON public.form_submissions TO authenticated;
GRANT ALL ON public.form_submissions TO service_role;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_form_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_form_submissions_updated_at
    BEFORE UPDATE ON public.form_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_form_submissions_updated_at();

-- Create function to calculate lead score based on form data
CREATE OR REPLACE FUNCTION calculate_form_lead_score(form_data JSONB, form_type TEXT)
RETURNS INTEGER AS $$
DECLARE
    score INTEGER := 0;
BEGIN
    -- Base score by form type
    CASE form_type
        WHEN 'contact' THEN score := 10;
        WHEN 'calculator' THEN score := 15;
        WHEN 'download' THEN score := 20;
        WHEN 'newsletter' THEN score := 5;
        ELSE score := 5;
    END CASE;
    
    -- Bonus for complete information
    IF form_data ? 'email' AND form_data ? 'name' THEN
        score := score + 5;
    END IF;
    
    IF form_data ? 'phone' THEN
        score := score + 10;
    END IF;
    
    IF form_data ? 'company' THEN
        score := score + 10;
    END IF;
    
    IF form_data ? 'message' AND length(form_data->>'message') > 50 THEN
        score := score + 5;
    END IF;
    
    RETURN score;
END;
$$ LANGUAGE plpgsql;

-- Insert some sample form submissions for testing
INSERT INTO public.form_submissions (form_type, form_data, source, page_url, status) VALUES
('contact', '{"name": "John Doe", "email": "john@example.com", "phone": "1234567890", "company": "Tech Corp", "message": "Interested in HR services"}', 'website', '/contact', 'new'),
('calculator', '{"name": "Jane Smith", "email": "jane@example.com", "company": "Startup Inc", "service_interest": "salary_calculator"}', 'calculator', '/salary-calculator', 'new'),
('download', '{"name": "Bob Wilson", "email": "bob@example.com", "company": "Enterprise Ltd", "resource_type": "hr_templates"}', 'download', '/resources', 'new')
ON CONFLICT DO NOTHING;
