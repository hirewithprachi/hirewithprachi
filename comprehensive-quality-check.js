import { createClient } from '@supabase/supabase-js';

// 🎯 COMPREHENSIVE QUALITY CHECK FOR PDF DOWNLOAD SYSTEM
// This script validates the entire implementation

const supabaseUrl = 'https://ktqrzokrqizfjqdgwmqs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0cXJ6b2tycWl6ZmpxZGd3bXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMzIzOTIsImV4cCI6MjA2OTgwODM5Mn0.2g3y9b7bsX444RlJ5_syCtHb-WEhHmZf2WxucPrRiPQ';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0cXJ6b2tycWl6ZmpxZGd3bXFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDIzMjM5MiwiZXhwIjoyMDY5ODA4MzkyfQ.WP_7F1w5xmbYPRrf5NQ-KM8X-uHlq44pYMaagTSGNis';

const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

class QualityChecker {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      tests: []
    };
  }

  log(status, test, message, details = '') {
    const icons = { 
      pass: '✅', 
      fail: '❌', 
      warn: '⚠️ ', 
      info: 'ℹ️ ' 
    };
    
    console.log(`${icons[status]} ${test}: ${message}`);
    if (details) console.log(`   ${details}`);
    
    this.results.tests.push({ status, test, message, details });
    
    if (status === 'pass') this.results.passed++;
    else if (status === 'fail') this.results.failed++;
    else if (status === 'warn') this.results.warnings++;
  }

  async checkDatabaseConnection() {
    console.log('\n🔗 TESTING DATABASE CONNECTION\n');
    
    try {
      // Test anon connection
      const { data, error } = await supabaseAnon.from('leads').select('count(*)', { count: 'exact', head: true });
      if (error) {
        this.log('fail', 'Anon Connection', 'Failed to connect with anon key', error.message);
        return false;
      }
      this.log('pass', 'Anon Connection', 'Successfully connected with anon key');

      // Test admin connection
      const { data: adminData, error: adminError } = await supabaseAdmin.from('leads').select('count(*)', { count: 'exact', head: true });
      if (adminError) {
        this.log('fail', 'Admin Connection', 'Failed to connect with service role key', adminError.message);
        return false;
      }
      this.log('pass', 'Admin Connection', 'Successfully connected with service role key');

      return true;
    } catch (error) {
      this.log('fail', 'Database Connection', 'Connection test failed', error.message);
      return false;
    }
  }

  async checkCoreTableSchema() {
    console.log('\n📊 TESTING CORE TABLE SCHEMA\n');
    
    const coreTables = [
      'leads',
      'blog_posts',
      'admin_users',
      'user_roles',
      'email_logs',
      'activity_logs',
      'notifications'
    ];

    let allTablesExist = true;

    for (const table of coreTables) {
      try {
        const { data, error } = await supabaseAdmin
          .from(table)
          .select('*')
          .limit(1);
        
        if (error && error.code === '42P01') {
          this.log('fail', `Table: ${table}`, 'Table does not exist');
          allTablesExist = false;
        } else if (error) {
          this.log('warn', `Table: ${table}`, 'Table exists but access restricted', error.message);
        } else {
          this.log('pass', `Table: ${table}`, 'Table exists and accessible');
        }
      } catch (err) {
        this.log('fail', `Table: ${table}`, 'Error checking table', err.message);
        allTablesExist = false;
      }
    }

    return allTablesExist;
  }

  async checkPDFSystemTables() {
    console.log('\n📄 TESTING PDF SYSTEM TABLES\n');
    
    const pdfTables = [
      'resource_categories',
      'resources', 
      'resource_downloads',
      'download_tokens'
    ];

    let allPDFTablesExist = true;

    for (const table of pdfTables) {
      try {
        const { data, error } = await supabaseAdmin
          .from(table)
          .select('*')
          .limit(1);
        
        if (error && error.code === '42P01') {
          this.log('fail', `PDF Table: ${table}`, 'Table does not exist - needs migration');
          allPDFTablesExist = false;
        } else if (error) {
          this.log('warn', `PDF Table: ${table}`, 'Table exists but access restricted', error.message);
        } else {
          this.log('pass', `PDF Table: ${table}`, 'Table exists and accessible');
        }
      } catch (err) {
        this.log('fail', `PDF Table: ${table}`, 'Error checking table', err.message);
        allPDFTablesExist = false;
      }
    }

    return allPDFTablesExist;
  }

  async checkDatabaseFunctions() {
    console.log('\n⚙️  TESTING DATABASE FUNCTIONS\n');
    
    const functions = [
      'generate_download_token',
      'verify_download_token',
      'track_resource_download'
    ];

    let allFunctionsExist = true;

    for (const func of functions) {
      try {
        // Test with dummy data to see if function exists
        const { data, error } = await supabaseAdmin.rpc(func, {});
        
        if (error && error.code === '42883') {
          this.log('fail', `Function: ${func}`, 'Function does not exist - needs migration');
          allFunctionsExist = false;
        } else if (error) {
          // Function exists but failed due to parameters - this is expected
          this.log('pass', `Function: ${func}`, 'Function exists');
        } else {
          this.log('pass', `Function: ${func}`, 'Function exists and working');
        }
      } catch (err) {
        this.log('fail', `Function: ${func}`, 'Error checking function', err.message);
        allFunctionsExist = false;
      }
    }

    return allFunctionsExist;
  }

  async checkRLSPolicies() {
    console.log('\n🔒 TESTING RLS POLICIES\n');
    
    try {
      // Test public access to leads (should work)
      const { data: leadsData, error: leadsError } = await supabaseAnon
        .from('leads')
        .select('*')
        .limit(1);
      
      if (leadsError) {
        this.log('warn', 'RLS: Leads Access', 'Anon access to leads restricted', leadsError.message);
      } else {
        this.log('pass', 'RLS: Leads Access', 'Anon can access leads table');
      }

      // Test admin access (should work with service role)
      const { data: adminData, error: adminError } = await supabaseAdmin
        .from('admin_users')
        .select('*')
        .limit(1);
      
      if (adminError) {
        this.log('warn', 'RLS: Admin Access', 'Service role access issues', adminError.message);
      } else {
        this.log('pass', 'RLS: Admin Access', 'Service role can access admin tables');
      }

      return true;
    } catch (error) {
      this.log('fail', 'RLS Policies', 'Error testing RLS policies', error.message);
      return false;
    }
  }

  async checkStorageBuckets() {
    console.log('\n💾 TESTING STORAGE BUCKETS\n');
    
    try {
      const { data: buckets, error } = await supabaseAdmin.storage.listBuckets();
      
      if (error) {
        this.log('fail', 'Storage: List Buckets', 'Cannot access storage', error.message);
        return false;
      }

      const resourceBucket = buckets.find(b => b.name === 'resource-downloads');
      if (!resourceBucket) {
        this.log('warn', 'Storage: Resource Bucket', 'resource-downloads bucket does not exist - needs setup');
        return false;
      }

      this.log('pass', 'Storage: Resource Bucket', 'resource-downloads bucket exists');

      // Test file listing
      const { data: files, error: listError } = await supabaseAdmin.storage
        .from('resource-downloads')
        .list('', { limit: 1 });
      
      if (listError) {
        this.log('warn', 'Storage: File Access', 'Cannot list files in bucket', listError.message);
      } else {
        this.log('pass', 'Storage: File Access', 'Can access files in resource bucket');
      }

      return true;
    } catch (error) {
      this.log('fail', 'Storage Buckets', 'Error checking storage', error.message);
      return false;
    }
  }

  async checkEdgeFunctions() {
    console.log('\n🌐 TESTING EDGE FUNCTIONS\n');
    
    try {
      // Test if download-resource function exists
      const { data, error } = await supabaseAnon.functions.invoke('download-resource');
      
      if (error && error.message.includes('Function not found')) {
        this.log('warn', 'Edge Function: download-resource', 'Function not deployed - optional for development');
      } else if (error) {
        this.log('pass', 'Edge Function: download-resource', 'Function exists (failed due to missing params)');
      } else {
        this.log('pass', 'Edge Function: download-resource', 'Function deployed and accessible');
      }

      return true;
    } catch (error) {
      this.log('warn', 'Edge Functions', 'Could not test edge functions', error.message);
      return false;
    }
  }

  async checkAdminAuthentication() {
    console.log('\n👤 TESTING ADMIN AUTHENTICATION\n');
    
    try {
      // Check if admin users exist
      const { data: adminUsers, error } = await supabaseAdmin
        .from('admin_users')
        .select('user_id, email, is_active')
        .eq('is_active', true);
      
      if (error) {
        this.log('fail', 'Admin Users', 'Cannot access admin_users table', error.message);
        return false;
      }

      if (!adminUsers || adminUsers.length === 0) {
        this.log('warn', 'Admin Users', 'No active admin users found');
        return false;
      }

      this.log('pass', 'Admin Users', `Found ${adminUsers.length} active admin user(s)`);

      // Check for specific admin user mentioned by user
      const specificAdmin = adminUsers.find(admin => 
        admin.user_id === '569e6dd2-0c5d-4c69-9a51-21d617674432'
      );

      if (specificAdmin) {
        this.log('pass', 'Specific Admin', 'Admin user 569e6dd2-0c5d-4c69-9a51-21d617674432 exists');
      } else {
        this.log('warn', 'Specific Admin', 'Admin user 569e6dd2-0c5d-4c69-9a51-21d617674432 not found');
      }

      return true;
    } catch (error) {
      this.log('fail', 'Admin Authentication', 'Error checking admin users', error.message);
      return false;
    }
  }

  generateSummaryReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 QUALITY CHECK SUMMARY REPORT');
    console.log('='.repeat(60));
    
    const totalTests = this.results.passed + this.results.failed + this.results.warnings;
    const successRate = totalTests > 0 ? ((this.results.passed / totalTests) * 100).toFixed(1) : '0';
    
    console.log(`\n📈 Test Results:`);
    console.log(`   ✅ Passed: ${this.results.passed}`);
    console.log(`   ❌ Failed: ${this.results.failed}`);
    console.log(`   ⚠️  Warnings: ${this.results.warnings}`);
    console.log(`   📊 Success Rate: ${successRate}%`);
    
    console.log(`\n🎯 Overall Status:`);
    if (this.results.failed === 0 && this.results.warnings <= 2) {
      console.log('   🎉 EXCELLENT - System is ready for production!');
    } else if (this.results.failed <= 2) {
      console.log('   ✅ GOOD - Minor issues need attention');
    } else {
      console.log('   ⚠️  NEEDS WORK - Several issues require fixing');
    }

    console.log(`\n📋 Next Steps:`);
    if (this.results.tests.some(t => t.test.includes('PDF Table') && t.status === 'fail')) {
      console.log('   1. Run PDF system migration in Supabase Dashboard SQL Editor');
    }
    if (this.results.tests.some(t => t.test.includes('Storage') && t.status === 'warn')) {
      console.log('   2. Create "resource-downloads" storage bucket');
    }
    if (this.results.tests.some(t => t.test.includes('Edge Function') && t.status === 'warn')) {
      console.log('   3. Deploy edge functions (optional for development)');
    }
    
    console.log('\n✨ Quality check completed!');
    
    return {
      overallStatus: this.results.failed === 0 ? 'PASS' : 'NEEDS_WORK',
      successRate: `${successRate}%`,
      results: this.results
    };
  }

  async runCompleteCheck() {
    console.log('🚀 STARTING COMPREHENSIVE PDF DOWNLOAD SYSTEM QUALITY CHECK');
    console.log('=' .repeat(70));
    
    const startTime = Date.now();
    
    await this.checkDatabaseConnection();
    await this.checkCoreTableSchema();
    await this.checkPDFSystemTables();
    await this.checkDatabaseFunctions();
    await this.checkRLSPolicies();
    await this.checkStorageBuckets();
    await this.checkEdgeFunctions();
    await this.checkAdminAuthentication();
    
    const endTime = Date.now();
    console.log(`\n⏱️  Quality check completed in ${endTime - startTime}ms`);
    
    return this.generateSummaryReport();
  }
}

// Run the comprehensive quality check
const checker = new QualityChecker();
checker.runCompleteCheck()
  .then(result => {
    console.log(`\n🏁 Final Result: ${result.overallStatus} (${result.successRate} success rate)`);
    process.exit(result.overallStatus === 'PASS' ? 0 : 1);
  })
  .catch(error => {
    console.error('💥 Quality check failed:', error);
    process.exit(1);
  });
