#!/usr/bin/env node

/**
 * IDENTIFY REMAINING PAGES FOR SEO IMPLEMENTATION
 * Scans all pages to identify which ones still need SEOOptimizer implementation
 */

import fs from 'fs';
import path from 'path';

// List of all page files to check
const PAGE_FILES = [
  // City Pages
  'src/pages/HRServicesChennai.jsx',
  'src/pages/HRServicesHyderabad.jsx',
  'src/pages/HRServicesPune.jsx',
  'src/pages/HRServicesAhmedabad.jsx',
  'src/pages/HRServicesKolkata.jsx',
  'src/pages/HRServicesJaipur.jsx',
  'src/pages/HRServicesLucknow.jsx',
  'src/pages/HRServicesIndore.jsx',
  'src/pages/HRServicesBhubaneswar.jsx',
  'src/pages/HRServicesNagpur.jsx',
  'src/pages/HRServicesCoimbatore.jsx',
  
  // Service Pages
  'src/pages/PerformanceManagementService.jsx',
  'src/pages/HRAuditService.jsx',
  
  // Main Pages
  'src/pages/HirableHomepage.jsx'
];

// Pages that already have SEOOptimizer implemented
const IMPLEMENTED_PAGES = [
  'src/pages/About.jsx',
  'src/pages/Services.jsx',
  'src/pages/Contact.jsx',
  'src/pages/Blog.jsx',
  'src/pages/HRServicesMumbai.jsx',
  'src/pages/HRServicesDelhi.jsx',
  'src/pages/HRServicesBangalore.jsx',
  'src/pages/HRComplianceService.jsx',
  'src/pages/RecruitmentService.jsx',
  'src/pages/EmployeeEngagementService.jsx',
  'src/pages/VirtualHRServices.jsx',
  'src/pages/PayrollManagementService.jsx'
];

function checkPageImplementation(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return { exists: false, hasSEOOptimizer: false, hasHelmet: false };
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const hasSEOOptimizer = content.includes('import SEOOptimizer') || content.includes('<SEOOptimizer');
    const hasHelmet = content.includes('import { Helmet }') || content.includes('<Helmet');
    
    return {
      exists: true,
      hasSEOOptimizer,
      hasHelmet,
      needsImplementation: !hasSEOOptimizer
    };
  } catch (error) {
    return { exists: false, hasSEOOptimizer: false, hasHelmet: false, error: error.message };
  }
}

function generateRemainingPagesReport() {
  console.log('🔍 IDENTIFYING REMAINING PAGES FOR SEO IMPLEMENTATION');
  console.log('================================================================================');
  console.log('📅 Scan Date: ' + new Date().toLocaleDateString());
  console.log('🎯 Target: Find all pages that need SEOOptimizer implementation');
  console.log('================================================================================\n');

  console.log('📋 SCANNING ALL PAGES:');
  console.log('================================================================================');
  
  let totalPages = 0;
  let implementedCount = 0;
  let remainingCount = 0;
  let missingCount = 0;
  
  const remainingPages = [];
  const missingPages = [];
  
  // Check implemented pages first
  console.log('✅ ALREADY IMPLEMENTED PAGES:');
  console.log('────────────────────────────────────────────────────────────────────────────────');
  IMPLEMENTED_PAGES.forEach(filePath => {
    const result = checkPageImplementation(filePath);
    totalPages++;
    
    if (result.exists) {
      if (result.hasSEOOptimizer) {
        console.log(`✅ ${filePath} - SEOOptimizer implemented`);
        implementedCount++;
      } else {
        console.log(`⚠️  ${filePath} - Exists but needs SEOOptimizer`);
        remainingPages.push(filePath);
        remainingCount++;
      }
    } else {
      console.log(`❌ ${filePath} - File not found`);
      missingPages.push(filePath);
      missingCount++;
    }
  });
  
  console.log('');
  console.log('🔧 REMAINING PAGES TO IMPLEMENT:');
  console.log('────────────────────────────────────────────────────────────────────────────────');
  
  PAGE_FILES.forEach(filePath => {
    const result = checkPageImplementation(filePath);
    totalPages++;
    
    if (result.exists) {
      if (result.hasSEOOptimizer) {
        console.log(`✅ ${filePath} - SEOOptimizer implemented`);
        implementedCount++;
      } else {
        console.log(`🔧 ${filePath} - Needs SEOOptimizer implementation`);
        remainingPages.push(filePath);
        remainingCount++;
      }
    } else {
      console.log(`❌ ${filePath} - File not found`);
      missingPages.push(filePath);
      missingCount++;
    }
  });
  
  console.log('');
  console.log('📊 IMPLEMENTATION SUMMARY:');
  console.log('================================================================================');
  console.log(`Total Pages Scanned: ${totalPages}`);
  console.log(`✅ Implemented: ${implementedCount}`);
  console.log(`🔧 Remaining: ${remainingCount}`);
  console.log(`❌ Missing: ${missingCount}`);
  console.log(`📈 Progress: ${Math.round((implementedCount / totalPages) * 100)}%`);
  console.log('');
  
  if (remainingPages.length > 0) {
    console.log('🎯 NEXT STEPS - REMAINING PAGES:');
    console.log('================================================================================');
    remainingPages.forEach((filePath, index) => {
      console.log(`${index + 1}. ${filePath}`);
    });
    console.log('');
    
    console.log('📝 IMPLEMENTATION TEMPLATE:');
    console.log('================================================================================');
    console.log('For each remaining page, add:');
    console.log('');
    console.log('1. Import statement:');
    console.log('   import SEOOptimizer from \'../components/SEOOptimizer\';');
    console.log('');
    console.log('2. SEO data object (example for city page):');
    console.log('   const seoData = {');
    console.log('     title: "HR Services [City] - Expert HR Consultant",');
    console.log('     description: "Expert HR services in [City] for [industries]. Complete HR solutions.",');
    console.log('     keywords: "HR services [City], HR consultant [City], recruitment [City]",');
    console.log('     pageType: "localBusiness",');
    console.log('     pageData: {');
    console.log('       city: "[City]",');
    console.log('       latitude: "[lat]",');
    console.log('       longitude: "[lng]",');
    console.log('       title: "HR Services [City] - Expert HR Consultant",');
    console.log('       description: "Expert HR services in [City] for [industries]",');
    console.log('       image: "https://hirewithprachi.com/assets/images/hr-services-[city]-1200x630.jpg"');
    console.log('     }');
    console.log('   };');
    console.log('');
    console.log('3. Replace Helmet with SEOOptimizer:');
    console.log('   <SEOOptimizer');
    console.log('     title={seoData.title}');
    console.log('     description={seoData.description}');
    console.log('     keywords={seoData.keywords}');
    console.log('     image={seoData.pageData.image}');
    console.log('     pageType={seoData.pageType}');
    console.log('     pageData={seoData.pageData}');
    console.log('     canonical="https://hirewithprachi.com/[page-url]"');
    console.log('   />');
    console.log('');
  }
  
  if (missingPages.length > 0) {
    console.log('⚠️  MISSING PAGES:');
    console.log('================================================================================');
    missingPages.forEach(filePath => {
      console.log(`• ${filePath}`);
    });
    console.log('');
  }
  
  console.log('================================================================================');
  console.log('✅ SCAN COMPLETE');
  console.log('================================================================================');
  
  return {
    totalPages,
    implementedCount,
    remainingCount,
    missingCount,
    remainingPages,
    missingPages
  };
}

// Run the scan
const results = generateRemainingPagesReport();

// Export results for potential use in other scripts
export { results };
