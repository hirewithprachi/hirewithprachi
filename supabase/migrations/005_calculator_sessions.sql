-- Calculator Sessions Migration
-- This migration creates the calculator_sessions table for storing calculation history

-- Create calculator_sessions table
CREATE TABLE IF NOT EXISTS calculator_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  calculator_type VARCHAR(50) NOT NULL CHECK (calculator_type IN ('salary', 'benefits', 'hr_costs', 'employee_engagement', 'compliance_risk')),
  input_data JSONB NOT NULL,
  result_data JSONB NOT NULL,
  pdf_url VARCHAR(500),
  is_favorite BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_calculator_sessions_user_id ON calculator_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_calculator_sessions_type ON calculator_sessions(calculator_type);
CREATE INDEX IF NOT EXISTS idx_calculator_sessions_created_at ON calculator_sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_calculator_sessions_favorite ON calculator_sessions(is_favorite);

-- Create RLS policies for calculator_sessions
ALTER TABLE calculator_sessions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own calculator sessions
CREATE POLICY "Users can view own calculator sessions" ON calculator_sessions
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own calculator sessions
CREATE POLICY "Users can insert own calculator sessions" ON calculator_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own calculator sessions
CREATE POLICY "Users can update own calculator sessions" ON calculator_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can delete their own calculator sessions
CREATE POLICY "Users can delete own calculator sessions" ON calculator_sessions
  FOR DELETE USING (auth.uid() = user_id);

-- Policy: Admins can view all calculator sessions
CREATE POLICY "Admins can view all calculator sessions" ON calculator_sessions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_calculator_sessions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_calculator_sessions_updated_at
  BEFORE UPDATE ON calculator_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_calculator_sessions_updated_at();

-- Create view for calculator analytics (admin only)
CREATE OR REPLACE VIEW calculator_analytics AS
SELECT 
  calculator_type,
  COUNT(*) as total_calculations,
  COUNT(DISTINCT user_id) as unique_users,
  DATE_TRUNC('day', created_at) as calculation_date
FROM calculator_sessions
GROUP BY calculator_type, DATE_TRUNC('day', created_at)
ORDER BY calculation_date DESC;

-- Grant access to the view for authenticated users
GRANT SELECT ON calculator_analytics TO authenticated;

-- Create function to get user's calculation history
CREATE OR REPLACE FUNCTION get_user_calculator_history(user_uuid UUID)
RETURNS TABLE (
  id UUID,
  calculator_type VARCHAR(50),
  input_summary TEXT,
  result_summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  is_favorite BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    cs.id,
    cs.calculator_type,
    CASE 
      WHEN cs.calculator_type = 'salary' THEN 
        'Base: ₹' || (cs.input_data->>'base_salary')::text || ', Location: ' || (cs.input_data->>'location')::text
      WHEN cs.calculator_type = 'benefits' THEN 
        'Package: ' || (cs.input_data->>'benefits_package')::text || ', Employees: ' || (cs.input_data->>'employee_count')::text
      WHEN cs.calculator_type = 'hr_costs' THEN 
        'Employees: ' || (cs.input_data->>'employee_count')::text || ', Avg Salary: ₹' || (cs.input_data->>'average_salary')::text
      ELSE 'Custom calculation'
    END as input_summary,
    CASE 
      WHEN cs.calculator_type = 'salary' THEN 
        'Calculated: ₹' || (cs.result_data->>'calculated_salary')::text
      WHEN cs.calculator_type = 'benefits' THEN 
        'Total Value: ₹' || (cs.result_data->>'total_benefits_value')::text
      WHEN cs.calculator_type = 'hr_costs' THEN 
        'Total Cost: ₹' || (cs.result_data->>'total_hr_costs')::text
      ELSE 'Calculation completed'
    END as result_summary,
    cs.created_at,
    cs.is_favorite
  FROM calculator_sessions cs
  WHERE cs.user_id = user_uuid
  ORDER BY cs.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION get_user_calculator_history(UUID) TO authenticated;

-- Create function to get popular calculation types
CREATE OR REPLACE FUNCTION get_popular_calculators()
RETURNS TABLE (
  calculator_type VARCHAR(50),
  total_uses BIGINT,
  unique_users BIGINT,
  avg_rating NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    cs.calculator_type,
    COUNT(*) as total_uses,
    COUNT(DISTINCT cs.user_id) as unique_users,
    COALESCE(AVG((cs.result_data->>'rating')::numeric), 0) as avg_rating
  FROM calculator_sessions cs
  WHERE cs.created_at >= NOW() - INTERVAL '30 days'
  GROUP BY cs.calculator_type
  ORDER BY total_uses DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION get_popular_calculators() TO authenticated;
