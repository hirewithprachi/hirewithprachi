#!/usr/bin/env node

/**
 * PDF System Verification Script
 * 
 * This script verifies that all calculator files have been properly updated
 * to use the new Supabase PDF generation system and removes any remaining
 * references to the old PDF generation methods.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Calculator files to check
const calculatorFiles = [
  'src/pages/BenefitsCalculator.jsx',
  'src/pages/TurnoverCalculator.jsx',
  'src/pages/ROICalculator.jsx',
  'src/pages/ResumeParser.jsx',
  'src/pages/PerformanceCalculator.jsx',
  'src/pages/HRNeedsAssessmentCalculator.jsx',
  'src/pages/HRCostSavingsCalculator.jsx',
  'src/pages/EmployeeEngagementCalculator.jsx',
  'src/pages/DocumentAnalyzer.jsx',
  'src/pages/ComplianceRiskChecker.jsx'
];

// Files that should exist
const requiredFiles = [
  'src/lib/supabasePdfGenerator.js',
  'supabase/functions/generate-pdf/index.ts',
  'supabase/functions/generate-pdf/env.example'
];

// Old PDF files that should NOT exist
const oldPdfFiles = [
  'src/lib/html2pdfGenerator.js',
  'src/lib/pdfGenerator.js',
  'src/lib/simplePdfGenerator.js',
  'src/lib/pdfValidation.js'
];

// Patterns to check for
const oldPatterns = [
  'await downloadCalculatorPDF',
  'downloadCalculatorPDF\\(',
  'shareCalculatorResult\\(',
  'downloadSimplePDF\\(',
  'import.*html2pdf.js',
  'import.*jspdf',
  'from.*html2pdfGenerator',
  'from.*simplePdfGenerator'
];

const newPatterns = [
  'generatePdfWithStates',
  'from.*supabasePdfGenerator'
];

console.log('🔍 PDF System Verification Report');
console.log('================================\n');

let allChecksPassed = true;

// Check if required files exist
console.log('📁 Checking Required Files:');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allChecksPassed = false;
});

// Check if old PDF files are removed
console.log('\n🗑️  Checking Old PDF Files (should NOT exist):');
oldPdfFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`  ${!exists ? '✅' : '❌'} ${file} ${exists ? '(STILL EXISTS!)' : '(removed)'}`);
  if (exists) allChecksPassed = false;
});

// Check calculator files
console.log('\n🧮 Checking Calculator Files:');
calculatorFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`  ❌ ${file} (file not found)`);
    allChecksPassed = false;
    return;
  }

  const content = fs.readFileSync(file, 'utf8');
  const foundOldPatterns = oldPatterns.filter(pattern => {
    const regex = new RegExp(pattern, 'i');
    return regex.test(content);
  });
  
  const foundNewPatterns = newPatterns.filter(pattern => {
    const regex = new RegExp(pattern, 'i');
    return regex.test(content);
  });

  const hasOldPatterns = foundOldPatterns.length > 0;
  const hasNewPatterns = foundNewPatterns.length > 0;

  console.log(`  ${!hasOldPatterns && hasNewPatterns ? '✅' : '❌'} ${file}`);
  if (hasOldPatterns || !hasNewPatterns) {
    allChecksPassed = false;
    if (hasOldPatterns) {
      console.log(`    ⚠️  Contains old PDF patterns: ${foundOldPatterns.join(', ')}`);
    }
    if (!hasNewPatterns) {
      console.log(`    ⚠️  Missing new PDF patterns`);
    }
  }
});

// Check package.json for old dependencies
console.log('\n📦 Checking Package Dependencies:');
const packageJsonPath = 'package.json';
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  const oldDeps = ['html2pdf.js', 'jspdf'];
  oldDeps.forEach(dep => {
    const hasDep = dependencies[dep];
    console.log(`  ${!hasDep ? '✅' : '❌'} ${dep} ${hasDep ? '(STILL IN PACKAGE.JSON!)' : '(removed)'}`);
    if (hasDep) allChecksPassed = false;
  });
} else {
  console.log('  ❌ package.json not found');
  allChecksPassed = false;
}

// Check Supabase Edge Function structure
console.log('\n⚡ Checking Supabase Edge Function:');
const edgeFunctionPath = 'supabase/functions/generate-pdf';
if (fs.existsSync(edgeFunctionPath)) {
  const files = fs.readdirSync(edgeFunctionPath);
  const hasIndexTs = files.includes('index.ts');
  const hasEnvExample = files.includes('env.example');
  
  console.log(`  ${hasIndexTs ? '✅' : '❌'} index.ts`);
  console.log(`  ${hasEnvExample ? '✅' : '❌'} env.example`);
  
  if (!hasIndexTs || !hasEnvExample) {
    allChecksPassed = false;
  }
  
  // Check if index.ts contains required imports
  if (hasIndexTs) {
    const indexContent = fs.readFileSync(path.join(edgeFunctionPath, 'index.ts'), 'utf8');
    const hasPuppeteer = indexContent.includes('puppeteer');
    const hasResend = indexContent.includes('Resend');
    const hasServe = indexContent.includes('serve');
    
    console.log(`  ${hasPuppeteer ? '✅' : '❌'} Puppeteer import`);
    console.log(`  ${hasResend ? '✅' : '❌'} Resend import`);
    console.log(`  ${hasServe ? '✅' : '❌'} Serve import`);
    
    if (!hasPuppeteer || !hasResend || !hasServe) {
      allChecksPassed = false;
    }
  }
} else {
  console.log('  ❌ Supabase Edge Function directory not found');
  allChecksPassed = false;
}

// Final summary
console.log('\n📊 Verification Summary:');
console.log('========================');

if (allChecksPassed) {
  console.log('🎉 ALL CHECKS PASSED!');
  console.log('✅ PDF system migration completed successfully');
  console.log('✅ All calculators updated to use Supabase Edge Functions');
  console.log('✅ Old PDF generation methods completely removed');
  console.log('✅ Ready for deployment');
  
  console.log('\n🚀 Next Steps:');
  console.log('1. Deploy Supabase Edge Function: supabase functions deploy generate-pdf');
  console.log('2. Set environment variables in Supabase dashboard');
  console.log('3. Test PDF generation with any calculator');
  console.log('4. Monitor email delivery via Resend.com dashboard');
  
} else {
  console.log('❌ SOME CHECKS FAILED!');
  console.log('⚠️  Please review the issues above and fix them before deployment');
  console.log('⚠️  The PDF system may not work correctly until all issues are resolved');
}

console.log('\n📝 Additional Notes:');
console.log('- The new system uses Supabase Edge Functions with Puppeteer');
console.log('- PDFs are sent via email using Resend.com');
console.log('- No files are stored in Supabase Storage (cost-effective)');
console.log('- All calculators now have consistent PDF generation behavior');
console.log('- Professional branding with "Hire With Prachi" styling');

process.exit(allChecksPassed ? 0 : 1); 