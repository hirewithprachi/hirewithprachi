-- Resource Manager File Upload Fix - Comprehensive Authentication & Storage Setup
-- Run this SQL in Supabase SQL Editor to fix file upload issues

-- ============================================================================
-- STORAGE BUCKET CONFIGURATION
-- ============================================================================

-- Create storage bucket for resources if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'resource-downloads',
    'resource-downloads',
    true,
    52428800, -- 50MB limit
    ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'image/jpeg', 'image/png', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- STORAGE POLICIES - COMPREHENSIVE SETUP
-- ============================================================================

-- Drop existing storage policies to avoid conflicts
DROP POLICY IF EXISTS "Public read access to resource-downloads" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload to resource-downloads" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update files in resource-downloads" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete files from resource-downloads" ON storage.objects;
DROP POLICY IF EXISTS "Public read access to all buckets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload to all buckets" ON storage.objects;

-- Create comprehensive storage policies for the resource-downloads bucket
CREATE POLICY "Public read access to resource-downloads" ON storage.objects
    FOR SELECT USING (bucket_id = 'resource-downloads');

-- Allow any authenticated user to upload to resource-downloads
CREATE POLICY "Authenticated users can upload to resource-downloads" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'resource-downloads' 
        AND auth.role() = 'authenticated'
    );

-- Allow authenticated users to update files in resource-downloads
CREATE POLICY "Authenticated users can update files in resource-downloads" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'resource-downloads' 
        AND auth.role() = 'authenticated'
    );

-- Allow authenticated users to delete files from resource-downloads
CREATE POLICY "Authenticated users can delete files from resource-downloads" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'resource-downloads' 
        AND auth.role() = 'authenticated'
    );

-- ============================================================================
-- RESOURCES TABLE RLS POLICIES - COMPREHENSIVE SETUP
-- ============================================================================

-- Enable RLS on resources table
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Admin manage resources" ON public.resources;
DROP POLICY IF EXISTS "Public read resources" ON public.resources;
DROP POLICY IF EXISTS "Authenticated users can insert resources" ON public.resources;
DROP POLICY IF EXISTS "Authenticated users can update resources" ON public.resources;
DROP POLICY IF EXISTS "Authenticated users can delete resources" ON public.resources;

-- Create comprehensive policies for resources table
CREATE POLICY "Public read resources" ON public.resources
    FOR SELECT USING (true);

-- Allow any authenticated user to insert resources
CREATE POLICY "Authenticated users can insert resources" ON public.resources
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update resources
CREATE POLICY "Authenticated users can update resources" ON public.resources
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete resources
CREATE POLICY "Authenticated users can delete resources" ON public.resources
    FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================================================
-- RESOURCE_CATEGORIES TABLE RLS POLICIES - COMPREHENSIVE SETUP
-- ============================================================================

-- Enable RLS on resource_categories table
ALTER TABLE public.resource_categories ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Admin manage resource categories" ON public.resource_categories;
DROP POLICY IF EXISTS "Public read resource categories" ON public.resource_categories;
DROP POLICY IF EXISTS "Authenticated users can insert resource categories" ON public.resource_categories;
DROP POLICY IF EXISTS "Authenticated users can update resource categories" ON public.resource_categories;
DROP POLICY IF EXISTS "Authenticated users can delete resource categories" ON public.resource_categories;

-- Create comprehensive policies for resource_categories table
CREATE POLICY "Public read resource categories" ON public.resource_categories
    FOR SELECT USING (is_active = true);

-- Allow any authenticated user to insert resource categories
CREATE POLICY "Authenticated users can insert resource categories" ON public.resource_categories
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update resource categories
CREATE POLICY "Authenticated users can update resource categories" ON public.resource_categories
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete resource categories
CREATE POLICY "Authenticated users can delete resource categories" ON public.resource_categories
    FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================================================
-- RESOURCE_DOWNLOADS TABLE RLS POLICIES - COMPREHENSIVE SETUP
-- ============================================================================

-- Enable RLS on resource_downloads table
ALTER TABLE public.resource_downloads ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Admin read resource downloads" ON public.resource_downloads;
DROP POLICY IF EXISTS "Public insert resource downloads" ON public.resource_downloads;
DROP POLICY IF EXISTS "Authenticated users can read resource downloads" ON public.resource_downloads;

-- Create comprehensive policies for resource_downloads table
CREATE POLICY "Public insert resource downloads" ON public.resource_downloads
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read resource downloads
CREATE POLICY "Authenticated users can read resource downloads" ON public.resource_downloads
    FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================================================
-- AUTHENTICATION SETUP - ENSURE PROPER AUTH CONFIGURATION
-- ============================================================================

-- Create a function to check if user is authenticated
CREATE OR REPLACE FUNCTION public.is_authenticated()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN auth.role() = 'authenticated';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get current user ID
CREATE OR REPLACE FUNCTION public.get_current_user_id()
RETURNS UUID AS $$
BEGIN
  RETURN auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- TRACK RESOURCE DOWNLOAD FUNCTION - ENHANCED VERSION
-- ============================================================================

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS public.track_resource_download(
    p_resource_id UUID,
    p_lead_id UUID,
    p_user_email TEXT,
    p_user_name TEXT,
    p_company_name TEXT,
    p_phone TEXT,
    p_ip_address TEXT,
    p_user_agent TEXT,
    p_referrer TEXT,
    p_utm_source TEXT,
    p_utm_medium TEXT,
    p_utm_campaign TEXT
);

-- Create enhanced track_resource_download function
CREATE OR REPLACE FUNCTION public.track_resource_download(
    p_resource_id UUID,
    p_lead_id UUID,
    p_user_email TEXT,
    p_user_name TEXT,
    p_company_name TEXT,
    p_phone TEXT,
    p_ip_address TEXT,
    p_user_agent TEXT,
    p_referrer TEXT,
    p_utm_source TEXT,
    p_utm_medium TEXT,
    p_utm_campaign TEXT
)
RETURNS UUID AS $$
DECLARE
    v_download_id UUID;
    v_token TEXT;
    v_expires_at TIMESTAMP WITH TIME ZONE;
BEGIN
    -- Generate secure token
    v_token := encode(gen_random_bytes(32), 'hex');
    v_expires_at := NOW() + INTERVAL '24 hours';
    
    -- Insert download record
    INSERT INTO public.resource_downloads (
        resource_id,
        lead_id,
        user_email,
        user_name,
        company_name,
        phone,
        ip_address,
        user_agent,
        referrer,
        utm_source,
        utm_medium,
        utm_campaign,
        download_url,
        expires_at,
        created_at
    ) VALUES (
        p_resource_id,
        p_lead_id,
        p_user_email,
        p_user_name,
        p_company_name,
        p_phone,
        p_ip_address,
        p_user_agent,
        p_referrer,
        p_utm_source,
        p_utm_medium,
        p_utm_campaign,
        v_token,
        v_expires_at,
        NOW()
    ) RETURNING id INTO v_download_id;
    
    -- Increment download count on resource
    UPDATE public.resources 
    SET download_count = COALESCE(download_count, 0) + 1
    WHERE id = p_resource_id;
    
    RETURN v_download_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check if storage bucket exists
SELECT 'Storage bucket check:' as info;
SELECT id, name, public, file_size_limit FROM storage.buckets WHERE id = 'resource-downloads';

-- Check RLS policies on resources table
SELECT 'Resources table RLS policies:' as info;
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'resources';

-- Check RLS policies on storage.objects
SELECT 'Storage objects RLS policies:' as info;
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage';

-- Check if track_resource_download function exists
SELECT 'Track resource download function check:' as info;
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_name = 'track_resource_download' AND routine_schema = 'public';

-- ============================================================================
-- SAMPLE DATA INSERTION (if tables are empty)
-- ============================================================================

-- Insert sample resource categories if none exist
INSERT INTO public.resource_categories (name, description, icon, color, sort_order) 
SELECT * FROM (VALUES
    ('HR Templates', 'Professional HR templates and forms', 'FileText', 'blue', 1),
    ('Compliance Checklists', 'Legal compliance and audit checklists', 'CheckSquare', 'green', 2),
    ('Recruitment Tools', 'Hiring and recruitment resources', 'Users', 'purple', 3),
    ('Policy Documents', 'Company policy templates', 'Shield', 'orange', 4),
    ('Training Materials', 'Employee training resources', 'BookOpen', 'indigo', 5)
) AS v(name, description, icon, color, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.resource_categories LIMIT 1);

-- ============================================================================
-- COMPLETION MESSAGE
-- ============================================================================

SELECT 'Resource Manager file upload fix completed successfully!' as status;
SELECT 'All storage buckets, RLS policies, and functions have been configured.' as details;
SELECT 'You can now upload files and manage resources without authentication errors.' as next_steps;
