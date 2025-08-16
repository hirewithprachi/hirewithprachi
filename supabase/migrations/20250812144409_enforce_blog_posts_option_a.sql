-- Blog posts RLS Option A: public can read published posts only; admin-only writes
ALTER TABLE IF EXISTS public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Replace any existing public read policy with published-only
DROP POLICY IF EXISTS "Public read published posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Blog posts are viewable by everyone" ON public.blog_posts;
CREATE POLICY "Public read published posts" ON public.blog_posts
  FOR SELECT USING (
    status = 'published' AND (published_at IS NULL OR published_at <= NOW())
  );

-- Enforce admin-only writes via admin_users.user_id
DROP POLICY IF EXISTS "Admin write blog_posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Blog posts are insertable by authenticated users" ON public.blog_posts;
DROP POLICY IF EXISTS "Blog posts are updatable by authenticated users" ON public.blog_posts;
DROP POLICY IF EXISTS "Blog posts are deletable by authenticated users" ON public.blog_posts;
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

-- Ensure grants align
GRANT SELECT ON public.blog_posts TO anon;
GRANT ALL ON public.blog_posts TO authenticated;


