-- A/B Testing Database Schema
-- Support for experimentation and conversion optimization

-- =============================================
-- A/B Test Management
-- =============================================

CREATE TABLE IF NOT EXISTS ab_tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    status TEXT CHECK (status IN ('draft', 'active', 'paused', 'completed')) DEFAULT 'draft',
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    target_metrics TEXT[] DEFAULT '{}',
    variants JSONB NOT NULL DEFAULT '{}',
    traffic_allocation NUMERIC DEFAULT 100, -- Percentage of traffic to include
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- User Assignment Tracking
-- =============================================

CREATE TABLE IF NOT EXISTS ab_test_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_name TEXT NOT NULL,
    user_id TEXT NOT NULL, -- Can be authenticated user ID or anonymous ID
    variant_name TEXT NOT NULL,
    variant_config JSONB DEFAULT '{}',
    is_authenticated BOOLEAN DEFAULT false,
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Conversion tracking
    converted BOOLEAN DEFAULT false,
    conversion_type TEXT,
    converted_at TIMESTAMPTZ,
    conversion_metadata JSONB DEFAULT '{}',
    
    -- Unique constraint to prevent duplicate assignments
    UNIQUE(test_name, user_id)
);

-- =============================================
-- Event Tracking
-- =============================================

CREATE TABLE IF NOT EXISTS ab_test_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    data JSONB NOT NULL DEFAULT '{}',
    session_id TEXT,
    user_agent TEXT,
    ip_address INET,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Conversion Funnels
-- =============================================

CREATE TABLE IF NOT EXISTS conversion_funnels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    steps JSONB NOT NULL, -- Array of step definitions
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Example funnel data
INSERT INTO conversion_funnels (name, description, steps) VALUES
('upgrade_funnel', 'Freemium to Pro conversion', '[
  {"step": 1, "name": "quota_warning", "description": "User reached quota limit"},
  {"step": 2, "name": "upgrade_modal_viewed", "description": "Viewed upgrade modal"},
  {"step": 3, "name": "pricing_page_visited", "description": "Visited pricing page"},
  {"step": 4, "name": "checkout_initiated", "description": "Started checkout process"},
  {"step": 5, "name": "payment_completed", "description": "Completed payment"},
  {"step": 6, "name": "user_upgraded", "description": "Successfully upgraded"}
]');

-- =============================================
-- User Cohorts
-- =============================================

CREATE TABLE IF NOT EXISTS user_cohorts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    criteria JSONB NOT NULL, -- Conditions for cohort membership
    size INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Example cohorts
INSERT INTO user_cohorts (name, description, criteria) VALUES
('power_users', 'Users who have created multiple documents', '{"document_count": {"gte": 3}, "ai_usage": {"gte": 10}}'),
('new_users', 'Users registered in the last 7 days', '{"days_since_signup": {"lte": 7}}'),
('trial_users', 'Users on free trial', '{"subscription_plan": "free", "days_since_signup": {"lte": 30}}'),
('enterprise_prospects', 'Users with enterprise-like usage patterns', '{"team_size": {"gte": 50}, "export_count": {"gte": 20}}');

-- =============================================
-- Feature Flags
-- =============================================

CREATE TABLE IF NOT EXISTS feature_flags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    is_enabled BOOLEAN DEFAULT false,
    rollout_percentage NUMERIC DEFAULT 0, -- 0-100
    target_cohorts TEXT[] DEFAULT '{}',
    conditions JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Example feature flags
INSERT INTO feature_flags (name, description, is_enabled, rollout_percentage) VALUES
('enhanced_ai_polish', 'Advanced AI content improvement with style options', true, 50),
('real_time_collaboration', 'Real-time document editing with team members', false, 0),
('linkedin_import', 'Import profile data from LinkedIn', true, 25),
('video_introductions', 'Create video introductions for job applications', false, 0),
('industry_templates', 'Industry-specific document templates', true, 75),
('document_scoring', 'Real-time document quality scoring', true, 100);

-- =============================================
-- Performance Metrics
-- =============================================

CREATE TABLE IF NOT EXISTS performance_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_name TEXT NOT NULL,
    metric_value NUMERIC NOT NULL,
    metric_type TEXT CHECK (metric_type IN ('counter', 'gauge', 'histogram')) DEFAULT 'counter',
    dimensions JSONB DEFAULT '{}', -- Additional metadata
    user_id TEXT,
    session_id TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Conversion Attribution
-- =============================================

CREATE TABLE IF NOT EXISTS conversion_attribution (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    conversion_type TEXT NOT NULL,
    conversion_value NUMERIC DEFAULT 0,
    attribution_data JSONB NOT NULL, -- Source, medium, campaign, etc.
    touchpoints JSONB DEFAULT '[]', -- Journey touchpoints
    time_to_convert INTERVAL,
    converted_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Indexes for Performance
-- =============================================

-- A/B Test Assignments
CREATE INDEX idx_ab_assignments_test_user ON ab_test_assignments(test_name, user_id);
CREATE INDEX idx_ab_assignments_converted ON ab_test_assignments(converted, converted_at);
CREATE INDEX idx_ab_assignments_variant ON ab_test_assignments(test_name, variant_name);

-- Events
CREATE INDEX idx_ab_events_type_time ON ab_test_events(event_type, created_at);
CREATE INDEX idx_ab_events_data_gin ON ab_test_events USING gin(data);

-- Performance Metrics
CREATE INDEX idx_performance_metrics_name_time ON performance_metrics(metric_name, timestamp);
CREATE INDEX idx_performance_metrics_user ON performance_metrics(user_id, timestamp);

-- Attribution
CREATE INDEX idx_attribution_user_type ON conversion_attribution(user_id, conversion_type);
CREATE INDEX idx_attribution_time ON conversion_attribution(converted_at);

-- =============================================
-- Row Level Security
-- =============================================

-- Enable RLS
ALTER TABLE ab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_test_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_test_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversion_funnels ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversion_attribution ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Admin access for most tables)
CREATE POLICY "Admin can manage A/B tests" ON ab_tests FOR ALL TO authenticated 
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can view their assignments" ON ab_test_assignments FOR SELECT 
USING (user_id = COALESCE(auth.uid()::text, current_setting('request.jwt.claims', true)::json ->> 'sub'));

CREATE POLICY "Anyone can insert events" ON ab_test_events FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can read feature flags" ON feature_flags FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Users can insert metrics" ON performance_metrics FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Users can view their attribution" ON conversion_attribution FOR SELECT 
USING (user_id = COALESCE(auth.uid()::text, current_setting('request.jwt.claims', true)::json ->> 'sub'));

-- =============================================
-- Functions and Triggers
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_ab_testing()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers
CREATE TRIGGER update_ab_tests_updated_at 
    BEFORE UPDATE ON ab_tests 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_ab_testing();

CREATE TRIGGER update_user_cohorts_updated_at 
    BEFORE UPDATE ON user_cohorts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_ab_testing();

CREATE TRIGGER update_feature_flags_updated_at 
    BEFORE UPDATE ON feature_flags 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_ab_testing();

-- Function to check feature flag status
CREATE OR REPLACE FUNCTION is_feature_enabled(
    flag_name TEXT,
    user_identifier TEXT DEFAULT NULL,
    user_cohorts TEXT[] DEFAULT '{}'
)
RETURNS BOOLEAN AS $$
DECLARE
    flag_record feature_flags%ROWTYPE;
    random_value NUMERIC;
BEGIN
    -- Get the feature flag
    SELECT * INTO flag_record
    FROM feature_flags
    WHERE name = flag_name AND is_enabled = true;
    
    -- If flag doesn't exist or is disabled, return false
    IF NOT FOUND THEN
        RETURN FALSE;
    END IF;
    
    -- Check cohort targeting
    IF array_length(flag_record.target_cohorts, 1) > 0 THEN
        IF NOT (user_cohorts && flag_record.target_cohorts) THEN
            RETURN FALSE;
        END IF;
    END IF;
    
    -- Check rollout percentage
    IF user_identifier IS NOT NULL THEN
        -- Deterministic rollout based on user hash
        SELECT (hashtext(user_identifier) % 100) INTO random_value;
    ELSE
        -- Random rollout for anonymous users
        SELECT (random() * 100) INTO random_value;
    END IF;
    
    RETURN random_value < flag_record.rollout_percentage;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to track conversion funnel step
CREATE OR REPLACE FUNCTION track_funnel_step(
    funnel_name TEXT,
    step_name TEXT,
    user_identifier TEXT,
    metadata JSONB DEFAULT '{}'
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO ab_test_events (event_type, data)
    VALUES ('funnel_step', jsonb_build_object(
        'funnel_name', funnel_name,
        'step_name', step_name,
        'user_id', user_identifier,
        'metadata', metadata
    ));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate conversion rates
CREATE OR REPLACE FUNCTION get_conversion_rate(
    test_name TEXT,
    start_date TIMESTAMPTZ DEFAULT NULL,
    end_date TIMESTAMPTZ DEFAULT NULL
)
RETURNS TABLE(
    variant_name TEXT,
    total_users BIGINT,
    conversions BIGINT,
    conversion_rate NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.variant_name,
        COUNT(*) as total_users,
        COUNT(*) FILTER (WHERE a.converted = true) as conversions,
        ROUND(
            (COUNT(*) FILTER (WHERE a.converted = true)::NUMERIC / COUNT(*)) * 100, 
            2
        ) as conversion_rate
    FROM ab_test_assignments a
    WHERE a.test_name = get_conversion_rate.test_name
    AND (start_date IS NULL OR a.assigned_at >= start_date)
    AND (end_date IS NULL OR a.assigned_at <= end_date)
    GROUP BY a.variant_name
    ORDER BY conversion_rate DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- Views for Analytics
-- =============================================

-- Daily A/B test summary
CREATE OR REPLACE VIEW daily_ab_test_summary AS
SELECT 
    DATE(assigned_at) as test_date,
    test_name,
    variant_name,
    COUNT(*) as assignments,
    COUNT(*) FILTER (WHERE converted = true) as conversions,
    ROUND(
        (COUNT(*) FILTER (WHERE converted = true)::NUMERIC / COUNT(*)) * 100, 
        2
    ) as conversion_rate,
    COUNT(*) FILTER (WHERE is_authenticated = true) as auth_users,
    COUNT(*) FILTER (WHERE is_authenticated = false) as anon_users
FROM ab_test_assignments
GROUP BY DATE(assigned_at), test_name, variant_name
ORDER BY test_date DESC, test_name, variant_name;

-- Funnel analysis view
CREATE OR REPLACE VIEW funnel_analysis AS
WITH funnel_events AS (
    SELECT 
        data->>'funnel_name' as funnel_name,
        data->>'step_name' as step_name,
        data->>'user_id' as user_id,
        created_at
    FROM ab_test_events
    WHERE event_type = 'funnel_step'
),
step_counts AS (
    SELECT 
        funnel_name,
        step_name,
        COUNT(DISTINCT user_id) as unique_users,
        COUNT(*) as total_events
    FROM funnel_events
    GROUP BY funnel_name, step_name
)
SELECT 
    f.name as funnel_name,
    step_data->>'name' as step_name,
    (step_data->>'step')::INTEGER as step_order,
    COALESCE(sc.unique_users, 0) as unique_users,
    COALESCE(sc.total_events, 0) as total_events,
    LAG(COALESCE(sc.unique_users, 0)) OVER (
        PARTITION BY f.name ORDER BY (step_data->>'step')::INTEGER
    ) as prev_step_users,
    CASE 
        WHEN LAG(COALESCE(sc.unique_users, 0)) OVER (
            PARTITION BY f.name ORDER BY (step_data->>'step')::INTEGER
        ) > 0 THEN
            ROUND(
                (COALESCE(sc.unique_users, 0)::NUMERIC / 
                 LAG(COALESCE(sc.unique_users, 0)) OVER (
                    PARTITION BY f.name ORDER BY (step_data->>'step')::INTEGER
                 )) * 100, 
                2
            )
        ELSE 0
    END as conversion_rate_from_prev
FROM conversion_funnels f
CROSS JOIN LATERAL jsonb_array_elements(f.steps) as step_data
LEFT JOIN step_counts sc ON f.name = sc.funnel_name 
    AND step_data->>'name' = sc.step_name
WHERE f.is_active = true
ORDER BY f.name, (step_data->>'step')::INTEGER;
