-- Fix Admin Authentication Issues
-- This script ensures the admin user is properly set up with correct user_id linkage

-- First, check current admin user setup
SELECT 
  au.id as admin_id,
  au.email,
  au.user_id,
  au.is_active,
  u.id as auth_user_id,
  u.email as auth_email,
  u.email_confirmed_at
FROM admin_users au
LEFT JOIN auth.users u ON au.user_id = u.id
WHERE au.email = 'prachishri005@gmail.com';

-- Update admin user with correct user_id if needed
UPDATE admin_users 
SET user_id = (
  SELECT id FROM auth.users 
  WHERE email = 'prachishri005@gmail.com' 
  LIMIT 1
)
WHERE email = 'prachishri005@gmail.com' 
AND (user_id IS NULL OR user_id != (
  SELECT id FROM auth.users 
  WHERE email = 'prachishri005@gmail.com' 
  LIMIT 1
));

-- Ensure admin user is active
UPDATE admin_users 
SET is_active = true,
    role = 'admin',
    permissions = '["read", "write", "delete", "admin"]'::jsonb
WHERE email = 'prachishri005@gmail.com';

-- Create admin user if it doesn't exist
INSERT INTO admin_users (email, user_id, role, permissions, is_active)
SELECT 
  'prachishri005@gmail.com',
  u.id,
  'admin',
  '["read", "write", "delete", "admin"]'::jsonb,
  true
FROM auth.users u
WHERE u.email = 'prachishri005@gmail.com'
AND NOT EXISTS (
  SELECT 1 FROM admin_users 
  WHERE email = 'prachishri005@gmail.com'
);

-- Verify the setup
SELECT 
  'Admin user setup verification:' as status,
  au.email,
  au.user_id,
  au.is_active,
  au.role,
  u.email_confirmed_at IS NOT NULL as email_confirmed
FROM admin_users au
JOIN auth.users u ON au.user_id = u.id
WHERE au.email = 'prachishri005@gmail.com';

-- Test the is_admin_user function
SELECT is_admin_user() as admin_check_result;