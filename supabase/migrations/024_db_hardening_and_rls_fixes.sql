-- Hardening extensions and RLS fixes (CLI-only)
-- 1) Ensure required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2) Provide helper for current email if needed
-- Use a stable SQL function instead of non-existent auth.email()
CREATE OR REPLACE FUNCTION public.current_user_email()
RETURNS text
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE(NULLIF(auth.jwt() ->> 'email', ''), NULL);
$$;

-- 3) Strengthen is_admin_user to check by auth.uid first, then email
CREATE OR REPLACE FUNCTION public.is_admin_user(user_email TEXT DEFAULT NULL)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_email text := user_email;
BEGIN
  IF v_email IS NULL THEN
    v_email := auth.jwt() ->> 'email';
  END IF;

  -- Prefer match by user_id when available
  IF v_uid IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.admin_users au
    WHERE au.user_id = v_uid AND au.is_active = true AND au.role = 'admin'
  ) THEN
    RETURN true;
  END IF;

  IF v_email IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.admin_users au
    WHERE au.email = v_email AND au.is_active = true AND au.role = 'admin'
  ) THEN
    RETURN true;
  END IF;

  RETURN false;
END;
$$;

GRANT EXECUTE ON FUNCTION public.is_admin_user(TEXT) TO authenticated;

-- 4) Backfill admin_users.user_id from email if missing and user exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'admin_users' AND column_name = 'user_id'
  ) THEN
    UPDATE public.admin_users au
    SET user_id = u.id
    FROM auth.users u
    WHERE au.user_id IS NULL AND u.email = au.email;
  END IF;
END $$;

-- 5) Replace auth.email() usage in RLS with helper
-- download_tokens policy
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'download_tokens' AND policyname = 'Users access own tokens'
  ) THEN
    DROP POLICY "Users access own tokens" ON public.download_tokens;
  END IF;
  CREATE POLICY "Users access own tokens" ON public.download_tokens
    FOR SELECT USING (user_email = public.current_user_email());
END $$;

-- 6) Ensure videos/resources categories policies prefer user_id-based admin check
-- (Recreate policies idempotently where they exist)
DO $$
BEGIN
  -- videos
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'videos') THEN
    DROP POLICY IF EXISTS "Admin full access videos" ON public.videos;
    CREATE POLICY "Admin full access videos" ON public.videos
      FOR ALL USING (
        EXISTS (
          SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid() AND au.is_active = true
        )
      );
  END IF;

  -- resource_categories
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'resource_categories') THEN
    DROP POLICY IF EXISTS "Admin full access categories" ON public.resource_categories;
    CREATE POLICY "Admin full access categories" ON public.resource_categories
      FOR ALL USING (
        EXISTS (
          SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid() AND au.is_active = true
        )
      );
  END IF;

  -- resources
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'resources') THEN
    DROP POLICY IF EXISTS "Admin full access resources" ON public.resources;
    CREATE POLICY "Admin full access resources" ON public.resources
      FOR ALL USING (
        EXISTS (
          SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid() AND au.is_active = true
        )
      );
  END IF;
END $$;


