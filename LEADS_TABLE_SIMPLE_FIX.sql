-- Simple Leads Table Fix - Add Missing Columns Only
-- Run this SQL in Supabase SQL Editor to fix the leads table structure

-- ============================================================================
-- ADD MISSING COLUMNS TO LEADS TABLE
-- ============================================================================

-- Add notes column if it doesn't exist
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS notes TEXT;

-- Add industry column if it doesn't exist
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS industry TEXT;

-- Add company_size column if it doesn't exist
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS company_size TEXT;

-- Add lead_score column if it doesn't exist
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS lead_score INTEGER DEFAULT 50;

-- Add updated_at column if it doesn't exist
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- ============================================================================
-- CREATE TRIGGER FOR UPDATED_AT COLUMN
-- ============================================================================

-- Create trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger for updated_at column (only if it doesn't exist)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_leads_updated_at') THEN
        CREATE TRIGGER update_leads_updated_at
        BEFORE UPDATE ON public.leads
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- ============================================================================
-- VERIFY CHANGES
-- ============================================================================

-- Check final leads table structure
SELECT 'Leads table columns after fix:' as info;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'leads' AND table_schema = 'public'
ORDER BY ordinal_position;

-- ============================================================================
-- COMPLETION MESSAGE
-- ============================================================================

SELECT 'Simple leads table fix completed successfully!' as status;
SELECT 'All required columns have been added to the leads table.' as details;
SELECT 'The resource download functionality should now work properly.' as next_steps;
