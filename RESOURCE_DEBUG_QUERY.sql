-- Resource Debug Queries
-- Run these in Supabase SQL Editor to check the current state

-- 1. Check if resources table exists and has data
SELECT 'Checking resources table...' as info;
SELECT COUNT(*) as total_resources FROM public.resources;

-- 2. Show all resources with their categories
SELECT 'All resources with categories:' as info;
SELECT 
    r.id,
    r.title,
    r.description,
    r.type,
    r.category_id,
    rc.name as category_name,
    r.is_featured,
    r.is_premium,
    r.requires_lead_capture,
    r.download_count,
    r.created_at,
    r.updated_at
FROM public.resources r
LEFT JOIN public.resource_categories rc ON r.category_id = rc.id
ORDER BY r.created_at DESC;

-- 3. Check resource categories
SELECT 'Resource categories:' as info;
SELECT 
    id,
    name,
    description,
    icon,
    color,
    is_active,
    sort_order,
    created_at
FROM public.resource_categories
ORDER BY sort_order;

-- 4. Check RLS policies on resources table
SELECT 'RLS policies on resources table:' as info;
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual 
FROM pg_policies 
WHERE tablename = 'resources';

-- 5. Test a simple select query (should work for public read)
SELECT 'Testing public read access...' as info;
SELECT 
    id,
    title,
    description,
    type,
    category_id,
    is_featured,
    download_count,
    created_at
FROM public.resources
LIMIT 5;

-- 6. Check if there are any resources without categories
SELECT 'Resources without categories:' as info;
SELECT 
    id,
    title,
    description,
    type,
    category_id
FROM public.resources
WHERE category_id IS NULL;

-- 7. Check storage bucket
SELECT 'Storage bucket check:' as info;
SELECT 
    id,
    name,
    public,
    file_size_limit,
    allowed_mime_types
FROM storage.buckets 
WHERE id = 'resource-downloads';

-- 8. Check if any resources have file_path issues
SELECT 'Resources with file paths:' as info;
SELECT 
    id,
    title,
    file_path,
    file_size_bytes,
    mime_type
FROM public.resources
WHERE file_path IS NOT NULL;

-- Summary
SELECT 'Debug queries completed. Check the results above.' as summary;
