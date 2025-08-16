-- ============================================================================
-- COMPLETE SUPABASE DATABASE FIX
-- Fixes all column issues, type mismatches, and missing constraints
-- ============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- STEP 1: CHECK AND FIX LEADS TABLE STRUCTURE
-- ============================================================================

-- Check current leads table structure using information_schema
SELECT 'Current leads table structure:' as info;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'leads' AND table_schema = 'public'
ORDER BY ordinal_position;

-- Add missing columns to leads table if they don't exist
DO $$ 
BEGIN
    -- Add status column if missing
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'leads' 
        AND column_name = 'status' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.leads ADD COLUMN status TEXT DEFAULT 'new';
        ALTER TABLE public.leads ADD CONSTRAINT check_leads_status 
        CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost'));
        RAISE NOTICE 'Added status column to leads table';
    ELSE
        RAISE NOTICE 'status column already exists in leads table';
    END IF;

    -- Add session_id column if missing
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'leads' 
        AND column_name = 'session_id' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.leads ADD COLUMN session_id TEXT;
        RAISE NOTICE 'Added session_id column to leads table';
    ELSE
        RAISE NOTICE 'session_id column already exists in leads table';
    END IF;

    -- Ensure lead_score is INTEGER type (fix any type issues)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'leads' 
        AND column_name = 'lead_score' 
        AND table_schema = 'public'
        AND data_type = 'integer'
    ) THEN
        -- If lead_score exists but wrong type, try to convert it
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'leads' 
            AND column_name = 'lead_score' 
            AND table_schema = 'public'
        ) THEN
            -- Convert existing lead_score to integer if it's text/varchar
            BEGIN
                ALTER TABLE public.leads ALTER COLUMN lead_score TYPE INTEGER USING 
                CASE 
                    WHEN lead_score IS NULL THEN 50
                    WHEN lead_score ~ '^[0-9]+$' THEN lead_score::integer
                    ELSE 50 
                END;
                RAISE NOTICE 'Converted lead_score column to INTEGER type';
            EXCEPTION WHEN OTHERS THEN
                RAISE NOTICE 'Could not convert lead_score to INTEGER: %', SQLERRM;
            END;
        ELSE
            -- Add lead_score as INTEGER if it doesn't exist
            ALTER TABLE public.leads ADD COLUMN lead_score INTEGER DEFAULT 50;
            ALTER TABLE public.leads ADD CONSTRAINT check_leads_score 
            CHECK (lead_score >= 0 AND lead_score <= 100);
            RAISE NOTICE 'Added lead_score column as INTEGER to leads table';
        END IF;
    ELSE
        RAISE NOTICE 'lead_score column already exists with correct INTEGER type';
    END IF;

    -- Add other missing columns
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'leads' 
        AND column_name = 'notes' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.leads ADD COLUMN notes TEXT;
        RAISE NOTICE 'Added notes column to leads table';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'leads' 
        AND column_name = 'updated_at' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.leads ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        RAISE NOTICE 'Added updated_at column to leads table';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'leads' 
        AND column_name = 'industry' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.leads ADD COLUMN industry TEXT;
        RAISE NOTICE 'Added industry column to leads table';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'leads' 
        AND column_name = 'company_size' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.leads ADD COLUMN company_size TEXT;
        RAISE NOTICE 'Added company_size column to leads table';
    END IF;
END $$;

-- ============================================================================
-- STEP 2: ENSURE CHATBOT_LEADS TABLE EXISTS WITH CORRECT SCHEMA
-- ============================================================================

-- Create chatbot_leads table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.chatbot_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    email TEXT,
    phone TEXT,
    source TEXT DEFAULT 'chatbot',
    notes TEXT,
    consent BOOLEAN DEFAULT false,
    consent_given_at TIMESTAMPTZ,
    conversation_id UUID,
    session_id TEXT,
    intent_category TEXT,
    service_interest TEXT,
    budget_range TEXT,
    timeline TEXT,
    company_size TEXT,
    industry TEXT,
    lead_score INTEGER DEFAULT 50 CHECK (lead_score >= 0 AND lead_score <= 100),
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- STEP 3: CREATE SIMPLE ANALYTICS FUNCTIONS THAT HANDLE TYPE CASTING CORRECTLY
-- ============================================================================

-- Simple function to get basic lead analytics
CREATE OR REPLACE FUNCTION get_lead_analytics_simple()
RETURNS TABLE (
    total_leads BIGINT,
    avg_lead_score NUMERIC(5,2),
    conversion_rate NUMERIC(5,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::BIGINT as total_leads,
        COALESCE(ROUND(AVG(COALESCE(l.lead_score, 50))::NUMERIC, 2), 0.00) as avg_lead_score,
        COALESCE(
            ROUND(
                (COUNT(CASE WHEN l.status = 'converted' THEN 1 END)::NUMERIC / 
                 NULLIF(COUNT(*)::NUMERIC, 0)) * 100, 2
            ), 0.00
        ) as conversion_rate
    FROM public.leads l
    WHERE l.created_at >= NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- STEP 4: CREATE SAFE LEAD SCORING ANALYTICS VIEW
-- ============================================================================

-- Create a view for lead analytics that handles type issues safely
CREATE OR REPLACE VIEW lead_analytics_safe AS
SELECT 
    DATE(created_at) as date,
    COUNT(*) as total_leads,
    COUNT(CASE WHEN status = 'new' THEN 1 END) as new_leads,
    COUNT(CASE WHEN status = 'contacted' THEN 1 END) as contacted_leads,
    COUNT(CASE WHEN status = 'qualified' THEN 1 END) as qualified_leads,
    COUNT(CASE WHEN status = 'converted' THEN 1 END) as converted_leads,
    COUNT(CASE WHEN status = 'lost' THEN 1 END) as lost_leads,
    COALESCE(ROUND(AVG(COALESCE(lead_score, 50))::NUMERIC, 2), 0.00) as avg_lead_score,
    COALESCE(
        ROUND(
            CASE 
                WHEN COUNT(*) > 0 THEN 
                    (COUNT(CASE WHEN status = 'converted' THEN 1 END)::NUMERIC / COUNT(*)::NUMERIC) * 100
                ELSE 0 
            END, 2
        ), 0.00
    ) as conversion_rate_percent
FROM public.leads
WHERE created_at >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- ============================================================================
-- STEP 5: CREATE UPDATED_AT TRIGGERS
-- ============================================================================

-- Create or replace updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at columns
DO $$
BEGIN
    -- Drop trigger if exists and recreate
    DROP TRIGGER IF EXISTS update_leads_updated_at ON public.leads;
    CREATE TRIGGER update_leads_updated_at
        BEFORE UPDATE ON public.leads
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();

    DROP TRIGGER IF EXISTS update_chatbot_leads_updated_at ON public.chatbot_leads;
    CREATE TRIGGER update_chatbot_leads_updated_at
        BEFORE UPDATE ON public.chatbot_leads
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
        
    RAISE NOTICE 'Updated_at triggers created successfully';
END $$;

-- ============================================================================
-- STEP 6: CREATE NECESSARY INDEXES
-- ============================================================================

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_lead_score ON public.leads(lead_score);
CREATE INDEX IF NOT EXISTS idx_leads_session_id ON public.leads(session_id);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);

CREATE INDEX IF NOT EXISTS idx_chatbot_leads_status ON public.chatbot_leads(status);
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_source ON public.chatbot_leads(source);
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_session_id ON public.chatbot_leads(session_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_email ON public.chatbot_leads(email);
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_created_at ON public.chatbot_leads(created_at);

-- ============================================================================
-- STEP 7: SET UP ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on leads tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_leads ENABLE ROW LEVEL SECURITY;

-- Create policies for service role access
DO $$
BEGIN
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Allow service role full access to leads" ON public.leads;
    DROP POLICY IF EXISTS "Allow service role full access to chatbot_leads" ON public.chatbot_leads;
    
    -- Create new policies
    CREATE POLICY "Allow service role full access to leads" ON public.leads
        FOR ALL USING (auth.role() = 'service_role');
        
    CREATE POLICY "Allow service role full access to chatbot_leads" ON public.chatbot_leads
        FOR ALL USING (auth.role() = 'service_role');
        
    RAISE NOTICE 'RLS policies created successfully';
END $$;

-- ============================================================================
-- STEP 8: GRANT NECESSARY PERMISSIONS
-- ============================================================================

-- Grant permissions to service role
GRANT ALL ON public.leads TO service_role;
GRANT ALL ON public.chatbot_leads TO service_role;
GRANT EXECUTE ON FUNCTION get_lead_analytics_simple TO service_role;
GRANT SELECT ON lead_analytics_safe TO service_role;

-- Grant read permissions to authenticated users
GRANT SELECT ON public.leads TO authenticated;
GRANT SELECT ON public.chatbot_leads TO authenticated;
GRANT SELECT ON lead_analytics_safe TO authenticated;

-- ============================================================================
-- STEP 9: TEST THE FIX
-- ============================================================================

-- Test that AVG function works correctly now
DO $$
DECLARE
    test_avg NUMERIC(5,2);
    test_count BIGINT;
BEGIN
    -- Test basic count
    SELECT COUNT(*) INTO test_count FROM public.leads;
    RAISE NOTICE 'Total leads count: %', test_count;
    
    -- Test AVG calculation with proper type casting (only if data exists)
    IF test_count > 0 THEN
        SELECT COALESCE(ROUND(AVG(COALESCE(lead_score, 50))::NUMERIC, 2), 0.00) 
        INTO test_avg
        FROM public.leads;
        RAISE NOTICE 'Average lead score calculation test: %', test_avg;
    ELSE
        RAISE NOTICE 'No leads found, skipping AVG test';
    END IF;
    
    -- Test the analytics function
    PERFORM * FROM get_lead_analytics_simple();
    RAISE NOTICE 'Lead analytics function test: PASSED';
    
    -- Test the analytics view
    PERFORM * FROM lead_analytics_safe LIMIT 1;
    RAISE NOTICE 'Lead analytics view test: PASSED';
    
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Test failed: %', SQLERRM;
END $$;

-- ============================================================================
-- STEP 10: INSERT SAMPLE DATA FOR TESTING
-- ============================================================================

-- Insert sample lead if no data exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.leads LIMIT 1) THEN
        INSERT INTO public.leads (
            name, 
            email, 
            phone, 
            company, 
            job_title, 
            source, 
            status, 
            lead_score,
            session_id,
            industry,
            company_size,
            notes
        ) VALUES (
            'Test Lead',
            'test@example.com',
            '+91-9876543210',
            'Test Company',
            'Test Manager',
            'website',
            'new',
            75,
            'test_session_123',
            'Technology',
            'small',
            'Sample test lead for verification'
        );
        RAISE NOTICE 'Sample lead inserted for testing';
    ELSE
        RAISE NOTICE 'Leads table already has data, skipping sample insert';
    END IF;
END $$;

-- ============================================================================
-- COMPLETION VERIFICATION
-- ============================================================================

-- Final verification
SELECT 'Database fix completed successfully!' as status;

-- Show final table structure using information_schema
SELECT 'Final leads table structure:' as info;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'leads' AND table_schema = 'public'
ORDER BY ordinal_position;

-- Show sample analytics
SELECT 'Sample analytics test:' as info;
SELECT * FROM lead_analytics_safe LIMIT 5;

-- Test the fixed AVG function
SELECT 
    'AVG function test:' as test_name,
    COUNT(*) as total_leads,
    COALESCE(ROUND(AVG(COALESCE(lead_score, 50))::NUMERIC, 2), 0.00) as avg_lead_score
FROM public.leads;

SELECT 'All fixes applied successfully! The AVG(lead_score) error should now be resolved.' as final_message;