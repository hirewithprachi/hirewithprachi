#!/usr/bin/env node

// Backend Setup Script for Enhanced Resume Builder
// Sets up Docker services, environment, and database

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkPrerequisites() {
  log('🔍 Checking prerequisites...', 'blue');
  
  try {
    execSync('docker --version', { stdio: 'ignore' });
    log('✅ Docker is installed', 'green');
  } catch (error) {
    log('❌ Docker is not installed. Please install Docker Desktop.', 'red');
    process.exit(1);
  }

  try {
    execSync('docker-compose --version', { stdio: 'ignore' });
    log('✅ Docker Compose is available', 'green');
  } catch (error) {
    log('❌ Docker Compose is not available.', 'red');
    process.exit(1);
  }
}

function createEnvironmentFile() {
  log('📝 Setting up environment file...', 'blue');
  
  const envExample = `# Enhanced Resume Builder Environment Variables
# Copy this file to .env.local and fill in your values

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE=your_supabase_service_role_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# LanguageTool Configuration (Self-hosted)
LT_API_BASE_URL=http://localhost:8010

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Resend Email Configuration
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=noreply@yourdomain.com

# Application Configuration
BASE_URL=http://localhost:5173
NODE_ENV=development

# Security
JWT_SECRET=your_jwt_secret_for_additional_security

# Monitoring & Analytics (Optional)
SENTRY_DSN=your_sentry_dsn_optional
`;

  if (!fs.existsSync('.env.local')) {
    fs.writeFileSync('.env.example', envExample);
    log('✅ Created .env.example file', 'green');
    log('⚠️  Please copy .env.example to .env.local and fill in your API keys', 'yellow');
  } else {
    log('✅ Environment file already exists', 'green');
  }
}

function setupDockerServices() {
  log('🐳 Setting up Docker services...', 'blue');
  
  try {
    // Pull and start LanguageTool
    log('  📥 Pulling LanguageTool image...', 'cyan');
    execSync('docker-compose pull languagetool', { stdio: 'inherit' });
    
    log('  🚀 Starting LanguageTool service...', 'cyan');
    execSync('docker-compose up -d languagetool redis', { stdio: 'inherit' });
    
    // Wait for services to be ready
    log('  ⏳ Waiting for services to be ready...', 'cyan');
    await new Promise(resolve => setTimeout(resolve, 30000)); // Wait 30 seconds
    
    // Test LanguageTool
    try {
      execSync('curl -f http://localhost:8010/v2/languages', { stdio: 'ignore' });
      log('✅ LanguageTool is running and accessible', 'green');
    } catch (error) {
      log('⚠️  LanguageTool may still be starting up. Please check manually.', 'yellow');
    }
    
    log('✅ Docker services started successfully', 'green');
  } catch (error) {
    log('❌ Failed to start Docker services', 'red');
    console.error(error.message);
  }
}

function setupSupabaseDatabase() {
  log('🗄️  Setting up Supabase database...', 'blue');
  
  const migrationFiles = [
    'supabase/migrations/027_enhanced_resume_builder_schema.sql',
    'supabase/migrations/028_ab_testing_schema.sql'
  ];
  
  for (const file of migrationFiles) {
    if (fs.existsSync(file)) {
      log(`  ✅ Found migration: ${file}`, 'green');
    } else {
      log(`  ❌ Missing migration: ${file}`, 'red');
    }
  }
  
  log('📝 Manual step required:', 'yellow');
  log('  1. Run the migration files in your Supabase dashboard', 'yellow');
  log('  2. Or use: supabase db reset (if you have Supabase CLI)', 'yellow');
}

function createVercelConfig() {
  log('⚡ Creating Vercel configuration...', 'blue');
  
  const vercelConfig = {
    "functions": {
      "api/**/*.js": {
        "runtime": "nodejs18.x",
        "maxDuration": 30
      }
    },
    "build": {
      "env": {
        "VITE_SUPABASE_URL": "@vite_supabase_url",
        "VITE_SUPABASE_ANON_KEY": "@vite_supabase_anon_key"
      }
    },
    "env": {
      "SUPABASE_SERVICE_ROLE": "@supabase_service_role",
      "OPENAI_API_KEY": "@openai_api_key",
      "RAZORPAY_KEY_ID": "@razorpay_key_id",
      "RAZORPAY_KEY_SECRET": "@razorpay_key_secret",
      "RESEND_API_KEY": "@resend_api_key",
      "LT_API_BASE_URL": "http://localhost:8010"
    }
  };
  
  fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));
  log('✅ Created vercel.json configuration', 'green');
}

function printPostSetupInstructions() {
  log('\n🎉 Backend setup completed!', 'green');
  log('\n📋 Next steps:', 'bright');
  log('1. Fill in your API keys in .env.local:', 'cyan');
  log('   - Supabase URL and keys', 'cyan');
  log('   - OpenAI API key', 'cyan');
  log('   - Razorpay keys', 'cyan');
  log('   - Resend API key', 'cyan');
  
  log('\n2. Run database migrations:', 'cyan');
  log('   - Import the SQL files in supabase/migrations/', 'cyan');
  log('   - Or use Supabase CLI: supabase db reset', 'cyan');
  
  log('\n3. Test the services:', 'cyan');
  log('   - LanguageTool: http://localhost:8010/v2/languages', 'cyan');
  log('   - Redis: docker-compose logs redis', 'cyan');
  
  log('\n4. Deploy to Vercel:', 'cyan');
  log('   - Set environment variables in Vercel dashboard', 'cyan');
  log('   - Deploy: vercel --prod', 'cyan');
  
  log('\n🚀 Your Enhanced Resume Builder backend is ready!', 'green');
}

async function main() {
  log('🚀 Enhanced Resume Builder - Backend Setup', 'bright');
  log('=========================================\n', 'bright');
  
  checkPrerequisites();
  createEnvironmentFile();
  await setupDockerServices();
  setupSupabaseDatabase();
  createVercelConfig();
  printPostSetupInstructions();
}

main().catch(error => {
  log(`❌ Setup failed: ${error.message}`, 'red');
  process.exit(1);
});
