-- Storage bucket policies and resources.content column (idempotent)

-- 1) Add content column to resources if missing
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'resources'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'resources' AND column_name = 'content'
  ) THEN
    ALTER TABLE public.resources ADD COLUMN content TEXT;
  END IF;
END $$;

-- 2) Ensure storage policies for resource-downloads bucket
-- Public read (allow listing and reading objects in bucket)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables WHERE table_schema = 'storage' AND table_name = 'objects'
  ) THEN
    -- Enable RLS just in case
    ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

    -- Public read access policy
    IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public read access - resource-downloads') THEN
      DROP POLICY "Public read access - resource-downloads" ON storage.objects;
    END IF;
    CREATE POLICY "Public read access - resource-downloads" ON storage.objects
      FOR SELECT USING (bucket_id = 'resource-downloads');

    -- Admin-only insert policy (uploads)
    IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admin upload access - resource-downloads') THEN
      DROP POLICY "Admin upload access - resource-downloads" ON storage.objects;
    END IF;
    CREATE POLICY "Admin upload access - resource-downloads" ON storage.objects
      FOR INSERT WITH CHECK (
        bucket_id = 'resource-downloads' AND EXISTS (
          SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid() AND au.is_active = true
        )
      );
  END IF;
END $$;


