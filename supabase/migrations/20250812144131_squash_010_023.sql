-- Safe squash for pending migrations 010–023 (idempotent where possible)

-- Blog posts schema enhancements (idempotent)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='blog_posts') THEN
    ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
    ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS meta_title TEXT;
    ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS meta_description TEXT;
    ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS featured_image TEXT;
    ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS category TEXT;
    ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS tags TEXT[];
    ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft';
    ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;
    ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
    ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
  END IF;
END $$;

-- Blog posts trigger to keep updated_at fresh
CREATE OR REPLACE FUNCTION public.update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='blog_posts') THEN
    DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON public.blog_posts;
    CREATE TRIGGER update_blog_posts_updated_at
      BEFORE UPDATE ON public.blog_posts
      FOR EACH ROW EXECUTE FUNCTION public.update_blog_posts_updated_at();
  END IF;
END $$;

-- Enforce and harden blog_posts RLS
ALTER TABLE IF EXISTS public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Optional public read policy for published posts only (configurable)
DROP POLICY IF EXISTS "Public read published posts" ON public.blog_posts;
CREATE POLICY "Public read published posts" ON public.blog_posts
  FOR SELECT USING (
    status = 'published' AND (published_at IS NULL OR published_at <= NOW())
  );

-- Admin-only write access using admin_users.user_id
DROP POLICY IF EXISTS "Admin write blog_posts" ON public.blog_posts;
CREATE POLICY "Admin write blog_posts" ON public.blog_posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid() AND au.is_active = true
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid() AND au.is_active = true
    )
  );

-- Grant execute/select to authenticated as appropriate
GRANT SELECT ON public.blog_posts TO anon;
GRANT ALL ON public.blog_posts TO authenticated;


