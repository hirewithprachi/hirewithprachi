-- Fix Activity Logs RLS Policy for INSERT operations
-- The current policy only works for SELECT, we need to ensure INSERT works too

-- Drop existing policy and recreate with proper permissions
DROP POLICY IF EXISTS "Admin full access on activity_logs" ON public.activity_logs;

-- Create separate policies for different operations to be more explicit
CREATE POLICY "Admin can select activity_logs" ON public.activity_logs 
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

CREATE POLICY "Admin can insert activity_logs" ON public.activity_logs 
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

CREATE POLICY "Admin can update activity_logs" ON public.activity_logs 
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

CREATE POLICY "Admin can delete activity_logs" ON public.activity_logs 
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

-- Verify the policies are created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'activity_logs'
ORDER BY policyname;