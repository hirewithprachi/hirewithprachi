#!/usr/bin/env node

// ========================================
// DASHBOARD QUALITY CHECK & VERIFICATION SCRIPT
// ========================================

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Configuration
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'your-supabase-url';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-key';

if (!SUPABASE_URL.startsWith('https://') || !SUPABASE_SERVICE_KEY.startsWith('eyJ')) {
  console.error('❌ Please set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false }
});

// ========================================
// VERIFICATION FUNCTIONS
// ========================================

async function verifyDatabaseTables() {
  console.log('🗄️  Verifying database tables...');
  
  const requiredTables = [
    'leads', 'blog_posts', 'admin_users', 'videos', 'resources', 
    'email_logs', 'calculator_results', 'user_roles', 'activity_logs',
    'notifications', 'dashboard_widgets', 'email_templates', 
    'automation_rules', 'analytics_events', 'system_settings'
  ];
  
  const results = {};
  let totalTables = 0;
  let existingTables = 0;
  
  for (const table of requiredTables) {
    totalTables++;
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        results[table] = { exists: false, count: 0, error: error.message };
        console.log(`❌ ${table}: ${error.message}`);
      } else {
        results[table] = { exists: true, count: count || 0, error: null };
        console.log(`✅ ${table}: ${count || 0} records`);
        existingTables++;
      }
    } catch (err) {
      results[table] = { exists: false, count: 0, error: err.message };
      console.log(`❌ ${table}: ${err.message}`);
    }
  }
  
  console.log(`\n📊 Table Status: ${existingTables}/${totalTables} tables exist`);
  return { results, existingTables, totalTables };
}

async function verifyAdminUser() {
  console.log('\n👤 Verifying admin user...');
  
  try {
    const { data: adminUsers, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', 'prachishri005@gmail.com');
    
    if (error) {
      console.log('❌ Error checking admin user:', error.message);
      return { exists: false, error: error.message };
    }
    
    if (adminUsers && adminUsers.length > 0) {
      const admin = adminUsers[0];
      console.log('✅ Admin user found:');
      console.log(`   📧 Email: ${admin.email}`);
      console.log(`   🆔 User ID: ${admin.user_id}`);
      console.log(`   👑 Role: ${admin.role}`);
      console.log(`   ✅ Active: ${admin.is_active}`);
      console.log(`   📅 Created: ${new Date(admin.created_at).toLocaleDateString()}`);
      
      return { 
        exists: true, 
        admin, 
        isActive: admin.is_active,
        role: admin.role 
      };
    } else {
      console.log('⚠️  Admin user not found');
      return { exists: false, error: 'Admin user not found' };
    }
  } catch (err) {
    console.log('❌ Error verifying admin user:', err.message);
    return { exists: false, error: err.message };
  }
}

async function verifyTableColumns() {
  console.log('\n🔧 Verifying enhanced table columns...');
  
  const columnChecks = [
    { table: 'leads', columns: ['lead_score', 'priority', 'assigned_to', 'tags'] },
    { table: 'blog_posts', columns: ['meta_title', 'view_count', 'seo_score'] },
    { table: 'admin_users', columns: ['permissions', 'last_login', 'is_2fa_enabled'] },
    { table: 'videos', columns: ['duration', 'file_size', 'view_count'] },
    { table: 'email_logs', columns: ['campaign_id', 'opened_at', 'clicked_at'] }
  ];
  
  const results = {};
  
  for (const check of columnChecks) {
    results[check.table] = {};
    
    for (const column of check.columns) {
      try {
        // Try to select the column to see if it exists
        const { error } = await supabase
          .from(check.table)
          .select(column)
          .limit(1);
        
        if (error && error.message.includes('column') && error.message.includes('does not exist')) {
          results[check.table][column] = false;
          console.log(`❌ ${check.table}.${column}: Missing`);
        } else {
          results[check.table][column] = true;
          console.log(`✅ ${check.table}.${column}: Present`);
        }
      } catch (err) {
        results[check.table][column] = false;
        console.log(`❌ ${check.table}.${column}: Error - ${err.message}`);
      }
    }
  }
  
  return results;
}

async function verifyIndexes() {
  console.log('\n📈 Verifying database indexes...');
  
  try {
    const { data: indexes, error } = await supabase
      .rpc('exec_sql', {
        sql: `
          SELECT schemaname, tablename, indexname, indexdef 
          FROM pg_indexes 
          WHERE schemaname = 'public' 
          AND (indexname LIKE 'idx_%' OR indexname LIKE '%_pkey')
          ORDER BY tablename, indexname;
        `
      });
    
    if (error) {
      console.log('⚠️  Could not verify indexes:', error.message);
      return { count: 0, indexes: [] };
    }
    
    console.log(`✅ Found ${indexes?.length || 0} indexes`);
    
    if (indexes && indexes.length > 0) {
      const indexGroups = indexes.reduce((acc, idx) => {
        if (!acc[idx.tablename]) acc[idx.tablename] = [];
        acc[idx.tablename].push(idx.indexname);
        return acc;
      }, {});
      
      Object.entries(indexGroups).forEach(([table, tableIndexes]) => {
        console.log(`   📊 ${table}: ${tableIndexes.length} indexes`);
      });
    }
    
    return { count: indexes?.length || 0, indexes: indexes || [] };
  } catch (err) {
    console.log('⚠️  Could not verify indexes:', err.message);
    return { count: 0, indexes: [] };
  }
}

async function verifyDashboardFiles() {
  console.log('\n📁 Verifying dashboard files...');
  
  const requiredFiles = [
    { path: 'src/pages/WorldClassAdminDashboard.jsx', name: 'Main Dashboard Component' },
    { path: 'src/services/worldClassAdminService.js', name: 'Advanced Backend Services' },
    { path: 'supabase/migrations/011_smart_incremental_migration.sql', name: 'Smart Migration Script' },
    { path: 'WORLD_CLASS_ADMIN_DASHBOARD_README.md', name: 'Comprehensive Documentation' },
    { path: 'DEPLOYMENT_CHECKLIST.md', name: 'Deployment Guide' }
  ];
  
  const results = {};
  let existingFiles = 0;
  
  for (const file of requiredFiles) {
    try {
      if (fs.existsSync(file.path)) {
        const stats = fs.statSync(file.path);
        results[file.path] = {
          exists: true,
          size: stats.size,
          modified: stats.mtime
        };
        console.log(`✅ ${file.name}: ${(stats.size / 1024).toFixed(1)}KB`);
        existingFiles++;
      } else {
        results[file.path] = { exists: false };
        console.log(`❌ ${file.name}: Missing`);
      }
    } catch (err) {
      results[file.path] = { exists: false, error: err.message };
      console.log(`❌ ${file.name}: Error - ${err.message}`);
    }
  }
  
  console.log(`📊 Files Status: ${existingFiles}/${requiredFiles.length} files exist`);
  return { results, existingFiles, totalFiles: requiredFiles.length };
}

async function testDashboardConnectivity() {
  console.log('\n🔗 Testing dashboard connectivity...');
  
  const tests = [
    { name: 'Basic Auth', test: () => supabase.auth.getSession() },
    { name: 'Leads Query', test: () => supabase.from('leads').select('count', { count: 'exact', head: true }) },
    { name: 'Admin Query', test: () => supabase.from('admin_users').select('count', { count: 'exact', head: true }) },
    { name: 'Real-time Channel', test: () => supabase.channel('test').subscribe() }
  ];
  
  const results = {};
  let passedTests = 0;
  
  for (const test of tests) {
    try {
      const startTime = Date.now();
      await test.test();
      const responseTime = Date.now() - startTime;
      
      results[test.name] = { passed: true, responseTime };
      console.log(`✅ ${test.name}: ${responseTime}ms`);
      passedTests++;
    } catch (err) {
      results[test.name] = { passed: false, error: err.message };
      console.log(`❌ ${test.name}: ${err.message}`);
    }
  }
  
  console.log(`📊 Connectivity: ${passedTests}/${tests.length} tests passed`);
  return { results, passedTests, totalTests: tests.length };
}

async function generateQualityReport() {
  console.log('\n📋 Generating comprehensive quality report...');
  
  const report = {
    timestamp: new Date().toISOString(),
    version: '2.0',
    environment: {
      supabaseUrl: SUPABASE_URL,
      nodeVersion: process.version,
      platform: process.platform
    },
    checks: {}
  };
  
  // Run all verification checks
  report.checks.tables = await verifyDatabaseTables();
  report.checks.adminUser = await verifyAdminUser();
  report.checks.columns = await verifyTableColumns();
  report.checks.indexes = await verifyIndexes();
  report.checks.files = await verifyDashboardFiles();
  report.checks.connectivity = await testDashboardConnectivity();
  
  // Calculate overall health score
  const scores = {
    tables: (report.checks.tables.existingTables / report.checks.tables.totalTables) * 100,
    adminUser: report.checks.adminUser.exists ? 100 : 0,
    files: (report.checks.files.existingFiles / report.checks.files.totalFiles) * 100,
    connectivity: (report.checks.connectivity.passedTests / report.checks.connectivity.totalTests) * 100
  };
  
  const overallScore = Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length;
  report.overallScore = Math.round(overallScore);
  report.scores = scores;
  
  // Generate recommendations
  report.recommendations = [];
  
  if (scores.tables < 100) {
    report.recommendations.push('🔧 Run the smart incremental migration to create missing tables');
  }
  
  if (scores.adminUser < 100) {
    report.recommendations.push('👤 Create admin user record in admin_users table');
  }
  
  if (scores.files < 100) {
    report.recommendations.push('📁 Ensure all dashboard files are properly created');
  }
  
  if (scores.connectivity < 100) {
    report.recommendations.push('🔗 Check Supabase connection and permissions');
  }
  
  if (overallScore >= 90) {
    report.recommendations.push('🚀 Dashboard is ready for production use!');
    report.status = 'EXCELLENT';
  } else if (overallScore >= 70) {
    report.recommendations.push('⚠️  Dashboard needs minor fixes before production');
    report.status = 'GOOD';
  } else {
    report.recommendations.push('❌ Dashboard needs significant fixes');
    report.status = 'NEEDS_WORK';
  }
  
  return report;
}

async function displayQualityReport(report) {
  console.log('\n' + '='.repeat(80));
  console.log('📋 WORLD-CLASS ADMIN DASHBOARD - QUALITY REPORT');
  console.log('='.repeat(80));
  
  console.log(`📊 Overall Health Score: ${report.overallScore}/100 (${report.status})`);
  console.log(`⏰ Generated: ${new Date(report.timestamp).toLocaleString()}`);
  
  console.log('\n🎯 COMPONENT SCORES:');
  Object.entries(report.scores).forEach(([component, score]) => {
    const emoji = score >= 90 ? '✅' : score >= 70 ? '⚠️' : '❌';
    console.log(`   ${emoji} ${component.padEnd(15)} ${Math.round(score)}%`);
  });
  
  console.log('\n💡 RECOMMENDATIONS:');
  report.recommendations.forEach(rec => {
    console.log(`   ${rec}`);
  });
  
  console.log('\n🌐 ACCESS INFORMATION:');
  console.log(`   Dashboard URL: http://localhost:5173/admin`);
  console.log(`   Supabase URL: ${report.environment.supabaseUrl}`);
  console.log(`   Admin Email:  prachishri005@gmail.com`);
  
  if (report.checks.adminUser.exists) {
    console.log(`   Admin ID:     ${report.checks.adminUser.admin?.user_id}`);
    console.log(`   Admin Role:   ${report.checks.adminUser.admin?.role}`);
    console.log(`   Admin Active: ${report.checks.adminUser.admin?.is_active}`);
  }
  
  console.log('\n🚀 NEXT STEPS:');
  if (report.overallScore >= 90) {
    console.log('   1. Start the development server: npm run dev');
    console.log('   2. Access the dashboard: http://localhost:5173/admin');
    console.log('   3. Login with your credentials');
    console.log('   4. Explore all the world-class features!');
  } else {
    console.log('   1. Run the smart migration: Copy/paste 011_smart_incremental_migration.sql');
    console.log('   2. Verify admin user exists in admin_users table');
    console.log('   3. Re-run this verification script');
    console.log('   4. Start development server once all checks pass');
  }
  
  console.log('\n' + '='.repeat(80));
  
  // Save detailed report to file
  try {
    fs.writeFileSync('quality-report.json', JSON.stringify(report, null, 2));
    console.log('📄 Detailed report saved to: quality-report.json');
  } catch (err) {
    console.log('⚠️  Could not save detailed report:', err.message);
  }
  
  return report;
}

// ========================================
// MAIN EXECUTION
// ========================================

async function main() {
  console.log('🔍 WORLD-CLASS ADMIN DASHBOARD - QUALITY CHECK');
  console.log('='.repeat(60));
  
  try {
    const report = await generateQualityReport();
    await displayQualityReport(report);
    
    // Exit with appropriate code
    process.exit(report.overallScore >= 70 ? 0 : 1);
  } catch (error) {
    console.error('❌ Quality check failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default main;
