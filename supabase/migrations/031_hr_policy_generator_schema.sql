-- HR Policy Generator Schema
-- Migration: 031_hr_policy_generator_schema.sql

-- Create enum for policy categories
CREATE TYPE policy_category AS ENUM (
  'leave_policy',
  'remote_work_policy',
  'code_of_conduct',
  'dei_policy',
  'privacy_policy',
  'it_security_policy',
  'data_protection_policy',
  'travel_policy',
  'anti_harassment_policy',
  'performance_management_policy',
  'compensation_policy',
  'benefits_policy',
  'workplace_safety_policy',
  'social_media_policy',
  'confidentiality_policy'
);

-- Create enum for policy tone
CREATE TYPE policy_tone AS ENUM (
  'friendly',
  'professional',
  'formal',
  'casual'
);

-- Create enum for policy status
CREATE TYPE policy_status AS ENUM (
  'draft',
  'active',
  'archived',
  'pending_review'
);

-- Create enum for acknowledgment status
CREATE TYPE acknowledgment_status AS ENUM (
  'pending',
  'acknowledged',
  'declined',
  'expired'
);

-- Create enum for compliance update type
CREATE TYPE compliance_update_type AS ENUM (
  'regulation_change',
  'legal_update',
  'policy_revision',
  'compliance_alert'
);

-- Policies table
CREATE TABLE IF NOT EXISTS hr_policies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  category policy_category NOT NULL,
  tone policy_tone NOT NULL DEFAULT 'professional',
  status policy_status NOT NULL DEFAULT 'draft',
  version INTEGER NOT NULL DEFAULT 1,
  
  -- Company information
  company_name VARCHAR(255) NOT NULL,
  company_size VARCHAR(100),
  industry VARCHAR(255),
  location_country VARCHAR(100),
  location_state VARCHAR(100),
  
  -- Policy content
  input_data JSONB NOT NULL, -- Store form inputs
  generated_policy TEXT NOT NULL,
  custom_points TEXT[], -- Additional custom requirements
  
  -- Jurisdiction and compliance
  jurisdiction_country VARCHAR(100),
  jurisdiction_state VARCHAR(100),
  compliance_notes TEXT,
  
  -- Metadata
  language VARCHAR(10) DEFAULT 'en',
  word_count INTEGER,
  estimated_read_time INTEGER, -- in minutes
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  
  -- RLS
  CONSTRAINT hr_policies_user_id_check CHECK (user_id IS NOT NULL)
);

-- Policy acknowledgments table
CREATE TABLE IF NOT EXISTS policy_acknowledgments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  policy_id UUID REFERENCES hr_policies(id) ON DELETE CASCADE,
  employee_email VARCHAR(255) NOT NULL,
  employee_name VARCHAR(255),
  status acknowledgment_status NOT NULL DEFAULT 'pending',
  
  -- Acknowledgment details
  acknowledged_at TIMESTAMP WITH TIME ZONE,
  declined_at TIMESTAMP WITH TIME ZONE,
  declined_reason TEXT,
  
  -- Distribution details
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reminder_sent_at TIMESTAMP WITH TIME ZONE,
  reminder_count INTEGER DEFAULT 0,
  
  -- Access tracking
  viewed_at TIMESTAMP WITH TIME ZONE,
  ip_address INET,
  user_agent TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  UNIQUE(policy_id, employee_email)
);

-- Compliance updates table
CREATE TABLE IF NOT EXISTS compliance_updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  policy_id UUID REFERENCES hr_policies(id) ON DELETE CASCADE,
  update_type compliance_update_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  
  -- Update details
  regulation_reference VARCHAR(255),
  effective_date DATE,
  deadline_date DATE,
  priority VARCHAR(50) DEFAULT 'medium',
  
  -- Notification status
  notified_at TIMESTAMP WITH TIME ZONE,
  notification_sent BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Policy templates table (for premium users)
CREATE TABLE IF NOT EXISTS policy_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category policy_category NOT NULL,
  description TEXT,
  
  -- Template content
  template_content TEXT NOT NULL,
  variables JSONB, -- Template variables
  sample_data JSONB, -- Sample data for preview
  
  -- Metadata
  is_premium BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Policy distribution logs
CREATE TABLE IF NOT EXISTS policy_distribution_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  policy_id UUID REFERENCES hr_policies(id) ON DELETE CASCADE,
  distribution_type VARCHAR(50) NOT NULL, -- 'email', 'link', 'download'
  
  -- Distribution details
  recipient_count INTEGER,
  sent_count INTEGER,
  opened_count INTEGER,
  acknowledged_count INTEGER,
  
  -- Email details (if applicable)
  email_subject VARCHAR(255),
  email_body TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_hr_policies_user_id ON hr_policies(user_id);
CREATE INDEX IF NOT EXISTS idx_hr_policies_category ON hr_policies(category);
CREATE INDEX IF NOT EXISTS idx_hr_policies_status ON hr_policies(status);
CREATE INDEX IF NOT EXISTS idx_hr_policies_created_at ON hr_policies(created_at);

CREATE INDEX IF NOT EXISTS idx_policy_acknowledgments_policy_id ON policy_acknowledgments(policy_id);
CREATE INDEX IF NOT EXISTS idx_policy_acknowledgments_status ON policy_acknowledgments(status);
CREATE INDEX IF NOT EXISTS idx_policy_acknowledgments_employee_email ON policy_acknowledgments(employee_email);

CREATE INDEX IF NOT EXISTS idx_compliance_updates_policy_id ON compliance_updates(policy_id);
CREATE INDEX IF NOT EXISTS idx_compliance_updates_type ON compliance_updates(update_type);
CREATE INDEX IF NOT EXISTS idx_compliance_updates_effective_date ON compliance_updates(effective_date);

CREATE INDEX IF NOT EXISTS idx_policy_templates_category ON policy_templates(category);
CREATE INDEX IF NOT EXISTS idx_policy_templates_premium ON policy_templates(is_premium);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_hr_policies_updated_at BEFORE UPDATE ON hr_policies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_policy_acknowledgments_updated_at BEFORE UPDATE ON policy_acknowledgments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_compliance_updates_updated_at BEFORE UPDATE ON compliance_updates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_policy_templates_updated_at BEFORE UPDATE ON policy_templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE hr_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_acknowledgments ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_distribution_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for hr_policies
CREATE POLICY "Users can view their own policies" ON hr_policies
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own policies" ON hr_policies
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own policies" ON hr_policies
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own policies" ON hr_policies
    FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for policy_acknowledgments
CREATE POLICY "Users can view acknowledgments for their policies" ON policy_acknowledgments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM hr_policies 
            WHERE hr_policies.id = policy_acknowledgments.policy_id 
            AND hr_policies.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert acknowledgments for their policies" ON policy_acknowledgments
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM hr_policies 
            WHERE hr_policies.id = policy_acknowledgments.policy_id 
            AND hr_policies.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update acknowledgments for their policies" ON policy_acknowledgments
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM hr_policies 
            WHERE hr_policies.id = policy_acknowledgments.policy_id 
            AND hr_policies.user_id = auth.uid()
        )
    );

-- RLS Policies for compliance_updates
CREATE POLICY "Users can view compliance updates for their policies" ON compliance_updates
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM hr_policies 
            WHERE hr_policies.id = compliance_updates.policy_id 
            AND hr_policies.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert compliance updates for their policies" ON compliance_updates
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM hr_policies 
            WHERE hr_policies.id = compliance_updates.policy_id 
            AND hr_policies.user_id = auth.uid()
        )
    );

-- RLS Policies for policy_templates (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view policy templates" ON policy_templates
    FOR SELECT USING (auth.role() = 'authenticated');

-- RLS Policies for policy_distribution_logs
CREATE POLICY "Users can view distribution logs for their policies" ON policy_distribution_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM hr_policies 
            WHERE hr_policies.id = policy_distribution_logs.policy_id 
            AND hr_policies.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert distribution logs for their policies" ON policy_distribution_logs
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM hr_policies 
            WHERE hr_policies.id = policy_distribution_logs.policy_id 
            AND hr_policies.user_id = auth.uid()
        )
    );

-- Insert sample policy templates
INSERT INTO policy_templates (name, category, description, template_content, variables, sample_data, is_premium, sort_order) VALUES
(
  'Standard Leave Policy',
  'leave_policy',
  'Comprehensive leave policy covering annual leave, sick leave, and other time off',
  '## Leave Policy for {{company_name}}

### 1. Annual Leave
Employees are entitled to {{annual_leave_days}} days of annual leave per year.

### 2. Sick Leave
Employees may take up to {{sick_leave_days}} days of sick leave with pay.

### 3. Other Leave Types
- Maternity/Paternity Leave: {{maternity_leave_days}} days
- Bereavement Leave: {{bereavement_leave_days}} days
- Study Leave: {{study_leave_days}} days

### 4. Leave Application Process
1. Submit leave request at least {{advance_notice_days}} days in advance
2. Obtain manager approval
3. Update leave calendar
4. Ensure work handover is completed',
  '{"company_name": "string", "annual_leave_days": "number", "sick_leave_days": "number", "maternity_leave_days": "number", "bereavement_leave_days": "number", "study_leave_days": "number", "advance_notice_days": "number"}',
  '{"company_name": "Acme Corp", "annual_leave_days": 25, "sick_leave_days": 10, "maternity_leave_days": 180, "bereavement_leave_days": 5, "study_leave_days": 10, "advance_notice_days": 14}',
  FALSE,
  1
),
(
  'Remote Work Policy',
  'remote_work_policy',
  'Policy governing remote work arrangements and expectations',
  '## Remote Work Policy for {{company_name}}

### 1. Eligibility
{{remote_work_eligibility}}

### 2. Work Hours
- Core hours: {{core_hours}}
- Flexible hours: {{flexible_hours}}
- Time zone considerations: {{timezone_requirements}}

### 3. Communication Expectations
- Daily check-ins: {{daily_checkin_required}}
- Team meetings: {{team_meeting_frequency}}
- Response times: {{response_time_expectation}}

### 4. Equipment and Technology
- Company-provided equipment: {{company_equipment}}
- Internet requirements: {{internet_requirements}}
- Security protocols: {{security_protocols}}

### 5. Performance Monitoring
{{performance_monitoring_approach}}',
  '{"company_name": "string", "remote_work_eligibility": "string", "core_hours": "string", "flexible_hours": "string", "timezone_requirements": "string", "daily_checkin_required": "boolean", "team_meeting_frequency": "string", "response_time_expectation": "string", "company_equipment": "string", "internet_requirements": "string", "security_protocols": "string", "performance_monitoring_approach": "string"}',
  '{"company_name": "TechCorp", "remote_work_eligibility": "All employees after 3 months", "core_hours": "10:00 AM - 2:00 PM", "flexible_hours": "8:00 AM - 6:00 PM", "timezone_requirements": "Must be available during core hours", "daily_checkin_required": true, "team_meeting_frequency": "Weekly", "response_time_expectation": "Within 2 hours", "company_equipment": "Laptop and accessories provided", "internet_requirements": "Minimum 50 Mbps", "security_protocols": "VPN required", "performance_monitoring_approach": "Regular check-ins and goal tracking"}',
  TRUE,
  2
),
(
  'Code of Conduct',
  'code_of_conduct',
  'Professional standards and behavioral expectations for all employees',
  '## Code of Conduct for {{company_name}}

### 1. Professional Behavior
{{professional_behavior_standards}}

### 2. Anti-Discrimination and Harassment
{{anti_discrimination_policy}}

### 3. Confidentiality
{{confidentiality_requirements}}

### 4. Conflict of Interest
{{conflict_of_interest_policy}}

### 5. Social Media Guidelines
{{social_media_guidelines}}

### 6. Reporting Violations
{{violation_reporting_process}}

### 7. Consequences
{{violation_consequences}}',
  '{"company_name": "string", "professional_behavior_standards": "string", "anti_discrimination_policy": "string", "confidentiality_requirements": "string", "conflict_of_interest_policy": "string", "social_media_guidelines": "string", "violation_reporting_process": "string", "violation_consequences": "string"}',
  '{"company_name": "Professional Corp", "professional_behavior_standards": "Treat all colleagues with respect and dignity", "anti_discrimination_policy": "Zero tolerance for discrimination based on protected characteristics", "confidentiality_requirements": "Maintain strict confidentiality of company and client information", "conflict_of_interest_policy": "Disclose any potential conflicts of interest", "social_media_guidelines": "Represent the company professionally on social media", "violation_reporting_process": "Report violations to HR or management immediately", "violation_consequences": "Disciplinary action up to and including termination"}',
  FALSE,
  3
);

-- Create function to calculate policy statistics
CREATE OR REPLACE FUNCTION get_policy_statistics(user_uuid UUID)
RETURNS TABLE (
  total_policies BIGINT,
  active_policies BIGINT,
  draft_policies BIGINT,
  total_acknowledgments BIGINT,
  pending_acknowledgments BIGINT,
  compliance_updates_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(DISTINCT hp.id) as total_policies,
    COUNT(DISTINCT CASE WHEN hp.status = 'active' THEN hp.id END) as active_policies,
    COUNT(DISTINCT CASE WHEN hp.status = 'draft' THEN hp.id END) as draft_policies,
    COUNT(DISTINCT pa.id) as total_acknowledgments,
    COUNT(DISTINCT CASE WHEN pa.status = 'pending' THEN pa.id END) as pending_acknowledgments,
    COUNT(DISTINCT cu.id) as compliance_updates_count
  FROM hr_policies hp
  LEFT JOIN policy_acknowledgments pa ON hp.id = pa.policy_id
  LEFT JOIN compliance_updates cu ON hp.id = cu.policy_id
  WHERE hp.user_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;
