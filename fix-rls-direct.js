// Direct RLS Fix for Activity Logs
// Test database connectivity and provide manual fix instructions

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ktqrzokrqizfjqdgwmqs.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0cXJ6b2tycWl6ZmpxZGd3bXFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDIzMjM5MiwiZXhwIjoyMDY5ODA4MzkyfQ.WP_7F1w5xmbYPRrf5NQ-KM8X-uHlq44pYMaagTSGNis';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testAndFixRLS() {
  console.log('🔧 Testing Activity Logs RLS and Database Connectivity...');
  
  try {
    // Test 1: Try to access activity_logs table
    console.log('\n1. Testing activity_logs table access...');
    const { data: activityData, error: activityError } = await supabase
      .from('activity_logs')
      .select('*')
      .limit(1);
    
    if (activityError) {
      console.log('❌ Activity logs access error:', activityError.message);
      if (activityError.message.includes('403') || activityError.message.includes('RLS')) {
        console.log('🎯 Confirmed: RLS policy issue detected!');
      }
    } else {
      console.log('✅ Can access activity_logs table');
      console.log('Records found:', activityData?.length || 0);
    }
    
    // Test 2: Try to access admin_users table
    console.log('\n2. Testing admin_users table access...');
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .limit(1);
    
    if (adminError) {
      console.log('❌ Admin users access error:', adminError.message);
    } else {
      console.log('✅ Can access admin_users table');
      console.log('Admin users found:', adminData?.length || 0);
    }
    
    // Test 3: Check authentication
    console.log('\n3. Testing authentication...');
    const { data: authData, error: authError } = await supabase.auth.getUser();
    
    if (authError) {
      console.log('❌ Auth error:', authError.message);
    } else {
      console.log('✅ Service role authentication working');
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('🛠️  MANUAL FIX REQUIRED');
    console.log('='.repeat(60));
    console.log('\n📋 To fix the RLS policies manually:');
    console.log('\n1. Go to: https://supabase.com/dashboard/project/ktqrzokrqizfjqdgwmqs');
    console.log('2. Navigate to: SQL Editor');
    console.log('3. Copy and paste the following SQL:');
    console.log('\n' + '-'.repeat(50));
    console.log(`-- Fix Activity Logs RLS Policies
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Admin full access on activity_logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Admin can select activity_logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Admin can insert activity_logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Admin can update activity_logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Admin can delete activity_logs" ON public.activity_logs;

-- Create comprehensive admin policy
CREATE POLICY "Admin full access on activity_logs" ON public.activity_logs
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

-- Verify the policy
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'activity_logs';`);
    console.log('-'.repeat(50));
    console.log('\n4. Click "Run" to execute the SQL');
    console.log('5. Verify the policy was created successfully');
    
    console.log('\n✅ Manual fix instructions provided!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAndFixRLS();