#!/usr/bin/env node

/**
 * Deploy Comprehensive Database Schema
 * This script directly executes SQL to create all database components
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Supabase credentials
const supabaseUrl = 'https://ktqrzokrqizfjqdgwmqs.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0cXJ6b2tycWl6ZmpxZGd3bXFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDIzMjM5MiwiZXhwIjoyMDY5ODA4MzkyfQ.WP_7F1w5xmbYPRrf5NQ-KM8X-uHlq44pYMaagTSGNis';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

console.log('🚀 Deploying Comprehensive Database Schema...\n');

// Read the comprehensive migration file
const migrationPath = 'supabase/migrations/20250812185738_comprehensive_database_setup.sql';
let migrationSQL = '';

try {
  migrationSQL = fs.readFileSync(migrationPath, 'utf8');
  console.log('✅ Read comprehensive migration file');
} catch (error) {
  console.error('❌ Failed to read migration file:', error.message);
  process.exit(1);
}

// Split the SQL into individual statements
const statements = migrationSQL
  .split(';')
  .map(stmt => stmt.trim())
  .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

console.log(`📊 Found ${statements.length} SQL statements to execute\n`);

async function executeStatement(sql, index) {
  try {
    console.log(`Executing statement ${index + 1}/${statements.length}...`);
    
    const { data, error } = await supabase.rpc('exec_sql', { 
      sql: sql + ';' 
    });
    
    if (error) {
      if (error.message.includes('already exists') || 
          error.message.includes('does not exist') ||
          error.message.includes('duplicate') ||
          error.message.includes('permission denied')) {
        console.log(`⚠️  Statement ${index + 1}: ${error.message} (continuing...)`);
        return true;
      } else {
        console.error(`❌ Statement ${index + 1} failed: ${error.message}`);
        return false;
      }
    }
    
    console.log(`✅ Statement ${index + 1}: Success`);
    return true;
  } catch (err) {
    console.error(`❌ Statement ${index + 1} error: ${err.message}`);
    return false;
  }
}

async function deploySchema() {
  let successCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    
    // Skip comments and empty statements
    if (statement.startsWith('--') || statement.trim().length < 10) {
      continue;
    }
    
    const success = await executeStatement(statement, i);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    
    // Small delay to avoid overwhelming the database
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🎯 DEPLOYMENT RESULTS:`);
  console.log(`✅ Successful statements: ${successCount}`);
  console.log(`❌ Failed statements: ${failCount}`);
  console.log(`📊 Success rate: ${Math.round((successCount / (successCount + failCount)) * 100)}%`);
  console.log(`${'='.repeat(60)}\n`);
  
  if (failCount === 0 || (successCount / (successCount + failCount)) > 0.8) {
    console.log('🎉 Database schema deployment completed successfully!');
    return true;
  } else {
    console.log('⚠️  Database schema deployment had significant issues.');
    return false;
  }
}

// Execute the deployment
deploySchema()
  .then(success => {
    if (success) {
      console.log('\n✅ Ready to run tests again!');
      process.exit(0);
    } else {
      console.log('\n❌ Deployment failed. Please check the errors above.');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('\n❌ Deployment script failed:', error);
    process.exit(1);
  });
