// Test Admin Authentication Flow
// This script tests the admin login and authentication fixes

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ktqrzokrqizfjqdgwmqs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0cXJ6b2tycWl6ZmpxZGd3bXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMzIzOTIsImV4cCI6MjA2OTgwODM5Mn0.2g3y9b7bsX444RlJ5_syCtHb-WEhHmZf2WxucPrRiPQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAdminAuth() {
  console.log('🔍 Testing Admin Authentication...');
  
  try {
    // Test 1: Sign in with admin credentials
    console.log('\n1. Testing admin sign in...');
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'prachishri005@gmail.com',
      password: 'PrachiAdmin2025!'
    });
    
    if (authError) {
      console.error('❌ Auth error:', authError.message);
      return;
    }
    
    console.log('✅ Authentication successful');
    console.log('User ID:', authData.user.id);
    console.log('Email:', authData.user.email);
    
    // Test 2: Check admin status using RPC function
    console.log('\n2. Testing admin status check...');
    const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin_user');
    
    if (adminError) {
      console.error('❌ Admin check error:', adminError.message);
    } else {
      console.log('✅ Admin status:', isAdmin);
    }
    
    // Test 3: Check admin_users table directly
    console.log('\n3. Testing direct admin_users query...');
    const { data: adminUser, error: queryError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', 'prachishri005@gmail.com')
      .single();
    
    if (queryError) {
      console.error('❌ Admin users query error:', queryError.message);
    } else {
      console.log('✅ Admin user data:', adminUser);
    }
    
    // Test 4: Test activity_logs access
    console.log('\n4. Testing activity_logs access...');
    const { data: logs, error: logsError } = await supabase
      .from('activity_logs')
      .select('*')
      .limit(1);
    
    if (logsError) {
      console.error('❌ Activity logs error:', logsError.message);
    } else {
      console.log('✅ Activity logs accessible, count:', logs?.length || 0);
    }
    
    // Test 5: Test inserting activity log
    console.log('\n5. Testing activity log insertion...');
    const { error: insertError } = await supabase
      .from('activity_logs')
      .insert([{
        action: 'test_login',
        entity_type: 'auth',
        entity_id: authData.user.id,
        details: { test: true },
        created_at: new Date().toISOString()
      }]);
    
    if (insertError) {
      console.error('❌ Activity log insert error:', insertError.message);
    } else {
      console.log('✅ Activity log inserted successfully');
    }
    
    // Sign out
    await supabase.auth.signOut();
    console.log('\n✅ Test completed successfully');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testAdminAuth();