# Database Setup Instructions

## Critical Issue: Missing Database Columns

The salary calculator is not working because the `leads` table is missing required columns. Follow these steps to fix it:

### Step 1: Go to Supabase Dashboard
1. Open your Supabase project dashboard
2. Go to the SQL Editor
3. Create a new query

### Step 2: Run This SQL Code

```sql
-- Fix leads table by adding missing columns
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS calculator_used TEXT,
ADD COLUMN IF NOT EXISTS calculation_data JSONB,
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'calculator',
ADD COLUMN IF NOT EXISTS user_type TEXT DEFAULT 'individual',
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';

-- Create calculator_results table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.calculator_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  calculator_type TEXT NOT NULL,
  input_data JSONB NOT NULL,
  output_data JSONB NOT NULL,
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_calculator_used ON public.leads(calculator_used);
CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads(source);
CREATE INDEX IF NOT EXISTS idx_calculator_results_lead_id ON public.calculator_results(lead_id);

-- Enable RLS and create policies
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calculator_results ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for both tables
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.leads;
CREATE POLICY "Allow anonymous inserts" ON public.leads
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.calculator_results;
CREATE POLICY "Allow anonymous inserts" ON public.calculator_results
    FOR INSERT WITH CHECK (true);

-- Verify the changes
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'leads' 
AND table_schema = 'public'
ORDER BY ordinal_position;
```

### Step 3: Test the Fix

After running the SQL, run this command in your terminal:

```bash
node test-salary-calculator.cjs
```

You should see:
```
🎉 SALARY CALCULATOR TEST RESULTS:
✅ Database connection: WORKING
✅ Lead creation: WORKING
✅ Calculator result creation: WORKING
✅ Data retrieval: WORKING
✅ Data cleanup: WORKING

🚀 The salary calculator is ready for production use!
```

### Step 4: Test the Website

1. Start the development server: `npm run dev`
2. Go to `/salary-calculator`
3. Fill out the form and click "Calculate Salary"
4. The lead form should now appear
5. Fill out the lead form and submit
6. Data should be saved to the database

## What Was Fixed

1. **Lead Form Visibility**: Removed the problematic `setTimeout` that was preventing the form from showing
2. **Database Schema**: Added missing columns to the `leads` table
3. **Error Handling**: Enhanced error messages and logging
4. **Data Validation**: Added null checks and default values

## Current Status

- ✅ Search-based dropdowns: WORKING
- ✅ Skills management: WORKING  
- ✅ UI/UX polish: WORKING
- ❌ Lead form appearance: FIXED (needs database update)
- ❌ Database integration: FIXED (needs database update)

After running the SQL above, everything should work perfectly! 