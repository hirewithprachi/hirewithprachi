// Fix RLS Policies for Activity Logs
// This script fixes the RLS policies that are causing 403 errors

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ktqrzokrqizfjqdgwmqs.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0cXJ6b2tycWl6ZmpxZGd3bXFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDIzMjM5MiwiZXhwIjoyMDY5ODA4MzkyfQ.WP_7F1w5xmbYPRrf5NQ-KM8X-uHlq44pYMaagTSGNis';

// Create admin client with service role key
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function fixRLSPolicies() {
  console.log('🔧 Fixing RLS Policies for Activity Logs...');
  
  try {
    // First, let's check current policies
    console.log('\n1. Checking current policies...');
    const { data: currentPolicies, error: policiesError } = await supabaseAdmin
      .from('pg_policies')
      .select('*')
      .eq('tablename', 'activity_logs');
    
    if (policiesError) {
      console.error('❌ Error checking policies:', policiesError.message);
    } else {
      console.log('Current policies:', currentPolicies?.length || 0);
    }
    
    // Drop existing policy
    console.log('\n2. Dropping existing policy...');
    const dropPolicy = `DROP POLICY IF EXISTS "Admin full access on activity_logs" ON public.activity_logs;`;
    const { error: dropError } = await supabaseAdmin.rpc('exec_sql', { sql: dropPolicy });
    
    if (dropError) {
      console.log('Note: Drop policy error (expected if policy doesn\'t exist):', dropError.message);
    } else {
      console.log('✅ Existing policy dropped');
    }
    
    // Create new SELECT policy
    console.log('\n3. Creating SELECT policy...');
    const selectPolicy = `
      CREATE POLICY "Admin can select activity_logs" ON public.activity_logs 
      FOR SELECT USING (
        EXISTS (
          SELECT 1 FROM public.admin_users 
          WHERE user_id = auth.uid() AND is_active = true
        )
      );
    `;
    
    const { error: selectError } = await supabaseAdmin.rpc('exec_sql', { sql: selectPolicy });
    if (selectError) {
      console.error('❌ SELECT policy error:', selectError.message);
    } else {
      console.log('✅ SELECT policy created');
    }
    
    // Create new INSERT policy
    console.log('\n4. Creating INSERT policy...');
    const insertPolicy = `
      CREATE POLICY "Admin can insert activity_logs" ON public.activity_logs 
      FOR INSERT WITH CHECK (
        EXISTS (
          SELECT 1 FROM public.admin_users 
          WHERE user_id = auth.uid() AND is_active = true
        )
      );
    `;
    
    const { error: insertError } = await supabaseAdmin.rpc('exec_sql', { sql: insertPolicy });
    if (insertError) {
      console.error('❌ INSERT policy error:', insertError.message);
    } else {
      console.log('✅ INSERT policy created');
    }
    
    // Create UPDATE policy
    console.log('\n5. Creating UPDATE policy...');
    const updatePolicy = `
      CREATE POLICY "Admin can update activity_logs" ON public.activity_logs 
      FOR UPDATE USING (
        EXISTS (
          SELECT 1 FROM public.admin_users 
          WHERE user_id = auth.uid() AND is_active = true
        )
      );
    `;
    
    const { error: updateError } = await supabaseAdmin.rpc('exec_sql', { sql: updatePolicy });
    if (updateError) {
      console.error('❌ UPDATE policy error:', updateError.message);
    } else {
      console.log('✅ UPDATE policy created');
    }
    
    // Create DELETE policy
    console.log('\n6. Creating DELETE policy...');
    const deletePolicy = `
      CREATE POLICY "Admin can delete activity_logs" ON public.activity_logs 
      FOR DELETE USING (
        EXISTS (
          SELECT 1 FROM public.admin_users 
          WHERE user_id = auth.uid() AND is_active = true
        )
      );
    `;
    
    const { error: deleteError } = await supabaseAdmin.rpc('exec_sql', { sql: deletePolicy });
    if (deleteError) {
      console.error('❌ DELETE policy error:', deleteError.message);
    } else {
      console.log('✅ DELETE policy created');
    }
    
    console.log('\n✅ RLS Policies fix completed!');
    
  } catch (error) {
    console.error('❌ Fix failed:', error.message);
  }
}

// Alternative approach: Create a simpler, more permissive policy
async function createSimplePolicy() {
  console.log('\n🔧 Creating simple admin policy...');
  
  try {
    // Drop all existing policies first
    const dropAllPolicies = `
      DROP POLICY IF EXISTS "Admin full access on activity_logs" ON public.activity_logs;
      DROP POLICY IF EXISTS "Admin can select activity_logs" ON public.activity_logs;
      DROP POLICY IF EXISTS "Admin can insert activity_logs" ON public.activity_logs;
      DROP POLICY IF EXISTS "Admin can update activity_logs" ON public.activity_logs;
      DROP POLICY IF EXISTS "Admin can delete activity_logs" ON public.activity_logs;
    `;
    
    await supabaseAdmin.rpc('exec_sql', { sql: dropAllPolicies });
    console.log('✅ Cleared existing policies');
    
    // Create one comprehensive policy
    const comprehensivePolicy = `
      CREATE POLICY "Admin full access activity_logs" ON public.activity_logs 
      FOR ALL USING (
        auth.uid() IN (
          SELECT user_id FROM public.admin_users 
          WHERE is_active = true
        )
      ) WITH CHECK (
        auth.uid() IN (
          SELECT user_id FROM public.admin_users 
          WHERE is_active = true
        )
      );
    `;
    
    const { error } = await supabaseAdmin.rpc('exec_sql', { sql: comprehensivePolicy });
    if (error) {
      console.error('❌ Comprehensive policy error:', error.message);
    } else {
      console.log('✅ Comprehensive policy created');
    }
    
  } catch (error) {
    console.error('❌ Simple policy creation failed:', error.message);
  }
}

// Run both approaches
async function main() {
  await fixRLSPolicies();
  await createSimplePolicy();
}

main();