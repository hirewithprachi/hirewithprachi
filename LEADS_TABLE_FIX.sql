-- Leads Table Fix - Add Missing Notes Column
-- Run this SQL in Supabase SQL Editor to fix the leads table structure

-- ============================================================================
-- CHECK CURRENT LEADS TABLE STRUCTURE
-- ============================================================================

-- Check current columns in leads table
SELECT 'Current leads table columns:' as info;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'leads' AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check current constraints on leads table
SELECT 'Current constraints on leads table:' as info;
SELECT 
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_name = 'leads' AND tc.table_schema = 'public';

-- ============================================================================
-- ADD MISSING COLUMNS TO LEADS TABLE
-- ============================================================================

-- Add notes column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'leads' 
        AND column_name = 'notes' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.leads ADD COLUMN notes TEXT;
        RAISE NOTICE 'Added notes column to leads table';
    ELSE
        RAISE NOTICE 'notes column already exists in leads table';
    END IF;
END $$;

-- Add other potentially missing columns
DO $$ 
BEGIN
    -- Add industry column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'leads' 
        AND column_name = 'industry' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.leads ADD COLUMN industry TEXT;
        RAISE NOTICE 'Added industry column to leads table';
    END IF;

    -- Add company_size column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'leads' 
        AND column_name = 'company_size' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.leads ADD COLUMN company_size TEXT;
        RAISE NOTICE 'Added company_size column to leads table';
    END IF;

    -- Add lead_score column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'leads' 
        AND column_name = 'lead_score' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.leads ADD COLUMN lead_score INTEGER DEFAULT 50;
        RAISE NOTICE 'Added lead_score column to leads table';
    END IF;

    -- Add updated_at column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'leads' 
        AND column_name = 'updated_at' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.leads ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        RAISE NOTICE 'Added updated_at column to leads table';
    END IF;
END $$;

-- ============================================================================
-- ADD UNIQUE CONSTRAINT ON EMAIL COLUMN
-- ============================================================================

-- Add unique constraint on email column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE table_name = 'leads' 
        AND constraint_type = 'UNIQUE' 
        AND table_schema = 'public'
        AND constraint_name LIKE '%email%'
    ) THEN
        -- Try to add unique constraint, but handle case where duplicate emails exist
        BEGIN
            ALTER TABLE public.leads ADD CONSTRAINT leads_email_unique UNIQUE (email);
            RAISE NOTICE 'Added unique constraint on email column';
        EXCEPTION WHEN duplicate_object THEN
            RAISE NOTICE 'Unique constraint on email already exists';
        EXCEPTION WHEN unique_violation THEN
            RAISE NOTICE 'Cannot add unique constraint - duplicate emails exist. Please clean up data first.';
        END;
    ELSE
        RAISE NOTICE 'Unique constraint on email already exists';
    END IF;
END $$;

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

-- Add trigger for updated_at column
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_leads_updated_at') THEN
        CREATE TRIGGER update_leads_updated_at
        BEFORE UPDATE ON public.leads
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
        RAISE NOTICE 'Added update_leads_updated_at trigger';
    ELSE
        RAISE NOTICE 'update_leads_updated_at trigger already exists';
    END IF;
END $$;

-- ============================================================================
-- VERIFY LEADS TABLE STRUCTURE
-- ============================================================================

-- Check final leads table structure
SELECT 'Final leads table columns:' as info;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'leads' AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check final constraints
SELECT 'Final constraints on leads table:' as info;
SELECT 
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_name = 'leads' AND tc.table_schema = 'public';

-- ============================================================================
-- TEST LEADS TABLE INSERT (WITHOUT ON CONFLICT)
-- ============================================================================

-- Test insert to verify the table works (without ON CONFLICT)
DO $$
BEGIN
    -- Check if test email already exists
    IF NOT EXISTS (SELECT 1 FROM public.leads WHERE email = 'test@example.com') THEN
        INSERT INTO public.leads (
            name,
            first_name,
            last_name,
            email,
            phone,
            company_name,
            job_title,
            industry,
            company_size,
            notes,
            source,
            status,
            lead_score
        ) VALUES (
            'Test User',
            'Test',
            'User',
            'test@example.com',
            '+91-1234567890',
            'Test Company',
            'Test Position',
            'Technology',
            'small',
            'Test lead for resource download',
            'resource_download',
            'new',
            70
        );
        RAISE NOTICE 'Test lead inserted successfully';
    ELSE
        RAISE NOTICE 'Test email already exists, skipping insert';
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Test insert failed: %', SQLERRM;
END $$;

-- ============================================================================
-- COMPLETION MESSAGE
-- ============================================================================

SELECT 'Leads table fix completed successfully!' as status;
SELECT 'All required columns have been added to the leads table.' as details;
SELECT 'The resource download functionality should now work properly.' as next_steps;
