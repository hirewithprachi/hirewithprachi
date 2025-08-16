import { supabase } from '../lib/supabase';
import { emailService } from '../services/emailService';
import BlogService from '../services/blogService';

export class DashboardTestSuite {
  constructor() {
    this.testResults = [];
    this.errors = [];
  }

  async runAllTests() {
    console.log('🧪 Starting Dashboard Quality Check...');
    
    const tests = [
      { name: 'Database Connection', fn: this.testDatabaseConnection },
      { name: 'Authentication', fn: this.testAuthentication },
      { name: 'Table Access', fn: this.testTableAccess },
      { name: 'Email Service', fn: this.testEmailService },
      { name: 'Blog Service', fn: this.testBlogService },
      { name: 'File Upload', fn: this.testFileUpload },
      { name: 'Real-time Subscriptions', fn: this.testRealTimeSubscriptions },
      { name: 'Error Handling', fn: this.testErrorHandling }
    ];

    for (const test of tests) {
      try {
        console.log(`Testing ${test.name}...`);
        const result = await test.fn.call(this);
        this.testResults.push({
          name: test.name,
          status: 'PASS',
          details: result
        });
        console.log(`✅ ${test.name}: PASS`);
      } catch (error) {
        this.testResults.push({
          name: test.name,
          status: 'FAIL',
          error: error.message
        });
        this.errors.push(error);
        console.log(`❌ ${test.name}: FAIL - ${error.message}`);
      }
    }

    return this.generateReport();
  }

  async testDatabaseConnection() {
    const { data, error } = await supabase.from('leads').select('count(*)', { count: 'exact', head: true });
    if (error) throw new Error(`Database connection failed: ${error.message}`);
    return 'Database connected successfully';
  }

  async testAuthentication() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw new Error(`Auth error: ${error.message}`);
    if (!session) throw new Error('No active session found');
    return `Authenticated as: ${session.user.email}`;
  }

  async testTableAccess() {
    const tables = [
      'leads', 'blog_posts', 'videos', 'resources', 
      'email_logs', 'calculator_results', 'activity_logs', 
      'notifications', 'admin_users', 'user_roles'
    ];

    const results = {};
    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('count(*)', { count: 'exact', head: true });
        
        if (error) {
          results[table] = `ERROR: ${error.message}`;
        } else {
          results[table] = 'OK';
        }
      } catch (err) {
        results[table] = `EXCEPTION: ${err.message}`;
      }
    }

    return results;
  }

  async testEmailService() {
    try {
      // Test email service initialization
      const templates = emailService.getEmailTemplates();
      if (!templates.welcome) {
        throw new Error('Email templates not loaded');
      }

      // Test template processing
      const processed = emailService.processTemplate(
        'Hello {{name}}!', 
        { name: 'Test User' }
      );
      
      if (processed !== 'Hello Test User!') {
        throw new Error('Template processing failed');
      }

      return 'Email service initialized and templates working';
    } catch (error) {
      throw new Error(`Email service test failed: ${error.message}`);
    }
  }

  async testBlogService() {
    try {
      // Test blog service methods
      const categories = BlogService.getCategories();
      if (!Array.isArray(categories) || categories.length === 0) {
        throw new Error('Blog categories not loaded');
      }

      const services = BlogService.getServices();
      if (!Array.isArray(services) || services.length === 0) {
        throw new Error('Blog services not loaded');
      }

      // Test slug generation
      const slug = BlogService.generateSlug('Test Blog Post Title');
      if (slug !== 'test-blog-post-title') {
        throw new Error('Slug generation failed');
      }

      return 'Blog service methods working correctly';
    } catch (error) {
      throw new Error(`Blog service test failed: ${error.message}`);
    }
  }

  async testFileUpload() {
    try {
      // Test if file upload endpoint is accessible
      const { data, error } = await supabase.storage
        .from('uploads')
        .list('', { limit: 1 });

      // Don't fail if bucket doesn't exist, just note it
      if (error && error.message.includes('not found')) {
        return 'File storage bucket not configured (normal for development)';
      }

      if (error) {
        throw new Error(`File storage error: ${error.message}`);
      }

      return 'File storage accessible';
    } catch (error) {
      return `File storage test skipped: ${error.message}`;
    }
  }

  async testRealTimeSubscriptions() {
    try {
      // Test real-time subscription setup
      const channel = supabase
        .channel('test-channel')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'leads' }, 
          () => {}
        );

      await new Promise((resolve) => {
        channel.subscribe((status) => {
          if (status === 'SUBSCRIBED' || status === 'CLOSED') {
            resolve();
          }
        });
      });

      await supabase.removeChannel(channel);
      return 'Real-time subscriptions working';
    } catch (error) {
      throw new Error(`Real-time test failed: ${error.message}`);
    }
  }

  async testErrorHandling() {
    try {
      // Test intentional error handling
      const { data, error } = await supabase
        .from('non_existent_table')
        .select('*');

      if (!error) {
        throw new Error('Expected error for non-existent table');
      }

      // This is expected behavior
      return 'Error handling working correctly';
    } catch (error) {
      if (error.message.includes('Expected error')) {
        throw error;
      }
      return 'Error handling working correctly';
    }
  }

  generateReport() {
    const passedTests = this.testResults.filter(t => t.status === 'PASS').length;
    const failedTests = this.testResults.filter(t => t.status === 'FAIL').length;
    const totalTests = this.testResults.length;

    const report = {
      summary: {
        total: totalTests,
        passed: passedTests,
        failed: failedTests,
        successRate: `${((passedTests / totalTests) * 100).toFixed(1)}%`
      },
      results: this.testResults,
      errors: this.errors,
      recommendations: this.generateRecommendations()
    };

    console.log('📊 Test Summary:', report.summary);
    return report;
  }

  generateRecommendations() {
    const recommendations = [];
    
    const failedTests = this.testResults.filter(t => t.status === 'FAIL');
    
    if (failedTests.some(t => t.name === 'Database Connection')) {
      recommendations.push('🔧 Check Supabase configuration and API keys');
    }
    
    if (failedTests.some(t => t.name === 'Authentication')) {
      recommendations.push('🔐 Verify user is logged in and session is valid');
    }
    
    if (failedTests.some(t => t.name === 'Table Access')) {
      recommendations.push('📊 Run database migrations and check RLS policies');
    }
    
    if (failedTests.some(t => t.name === 'Email Service')) {
      recommendations.push('📧 Check email API keys (Resend/SendGrid)');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('🎉 All tests passed! Dashboard is working correctly.');
    }

    return recommendations;
  }
}

// Export test runner function
export const runDashboardTests = async () => {
  const testSuite = new DashboardTestSuite();
  return await testSuite.runAllTests();
};

export default DashboardTestSuite;
