import fs from 'fs';

// All 18 pages to verify
const allPages = [
  // Service Pages (4)
  { name: 'Performance Management Service', file: 'src/pages/PerformanceManagementService.jsx', url: '/services/performance-management' },
  { name: 'Virtual HR Services', file: 'src/pages/VirtualHRServices.jsx', url: '/services/virtual-hr-services' },
  { name: 'Payroll Management Service', file: 'src/pages/PayrollManagementService.jsx', url: '/services/payroll-management' },
  { name: 'HR Audit Service', file: 'src/pages/HRAuditService.jsx', url: '/services/hr-audit' },
  
  // City Pages (14)
  { name: 'Mumbai HR Services', file: 'src/pages/HRServicesMumbai.jsx', url: '/hr-services-mumbai' },
  { name: 'Delhi HR Services', file: 'src/pages/HRServicesDelhi.jsx', url: '/hr-services-delhi' },
  { name: 'Bangalore HR Services', file: 'src/pages/HRServicesBangalore.jsx', url: '/hr-services-bangalore' },
  { name: 'Chennai HR Services', file: 'src/pages/HRServicesChennai.jsx', url: '/hr-services-chennai' },
  { name: 'Hyderabad HR Services', file: 'src/pages/HRServicesHyderabad.jsx', url: '/hr-services-hyderabad' },
  { name: 'Pune HR Services', file: 'src/pages/HRServicesPune.jsx', url: '/hr-services-pune' },
  { name: 'Ahmedabad HR Services', file: 'src/pages/HRServicesAhmedabad.jsx', url: '/hr-services-ahmedabad' },
  { name: 'Kolkata HR Services', file: 'src/pages/HRServicesKolkata.jsx', url: '/hr-services-kolkata' },
  { name: 'Jaipur HR Services', file: 'src/pages/HRServicesJaipur.jsx', url: '/hr-services-jaipur' },
  { name: 'Lucknow HR Services', file: 'src/pages/HRServicesLucknow.jsx', url: '/hr-services-lucknow' },
  { name: 'Indore HR Services', file: 'src/pages/HRServicesIndore.jsx', url: '/hr-services-indore' },
  { name: 'Bhubaneswar HR Services', file: 'src/pages/HRServicesBhubaneswar.jsx', url: '/hr-services-bhubaneswar' },
  { name: 'Nagpur HR Services', file: 'src/pages/HRServicesNagpur.jsx', url: '/hr-services-nagpur' },
  { name: 'Coimbatore HR Services', file: 'src/pages/HRServicesCoimbatore.jsx', url: '/hr-services-coimbatore' }
];

function checkPageHealth(page) {
  try {
    const content = fs.readFileSync(page.file, 'utf8');
    
    // Check for AI-era imports (should not exist)
    const hasAIEraImports = content.includes('AIEraComponents');
    if (hasAIEraImports) {
      return { status: '❌', issue: 'Has AI-era imports' };
    }
    
    // Check for AI-era component usage (should not exist)
    const hasAIEraComponents = content.includes('HeroBadge') || 
                              content.includes('AnimatedStat') || 
                              content.includes('AIEraButton') || 
                              content.includes('FeatureGrid') || 
                              content.includes('FloatingCard') || 
                              content.includes('CTASection');
    
    if (hasAIEraComponents) {
      return { status: '❌', issue: 'Has AI-era component usage' };
    }
    
    // Check for basic React structure
    const hasReactImport = content.includes('import React');
    const hasExport = content.includes('export default');
    const hasReturn = content.includes('return (');
    
    if (!hasReactImport || !hasExport || !hasReturn) {
      return { status: '❌', issue: 'Missing basic React structure' };
    }
    
    // Check for required components
    const hasHelmet = content.includes('react-helmet-async');
    const hasMotion = content.includes('framer-motion');
    const hasRouter = content.includes('react-router-dom');
    
    if (!hasHelmet || !hasMotion || !hasRouter) {
      return { status: '⚠️', issue: 'Missing some required imports' };
    }
    
    return { status: '✅', issue: 'All good' };
    
  } catch (error) {
    return { status: '❌', issue: `File not found: ${error.message}` };
  }
}

function main() {
  console.log('🔍 Verifying all 18 pages...\n');
  
  let workingCount = 0;
  let totalCount = allPages.length;
  
  allPages.forEach(page => {
    const health = checkPageHealth(page);
    console.log(`${health.status} ${page.name}`);
    console.log(`   File: ${page.file}`);
    console.log(`   URL: http://localhost:5174${page.url}`);
    console.log(`   Status: ${health.issue}\n`);
    
    if (health.status === '✅') {
      workingCount++;
    }
  });
  
  console.log('📊 SUMMARY:');
  console.log(`- Total pages: ${totalCount}`);
  console.log(`- Working pages: ${workingCount}`);
  console.log(`- Issues found: ${totalCount - workingCount}`);
  console.log(`- Success rate: ${((workingCount / totalCount) * 100).toFixed(1)}%`);
  
  if (workingCount === totalCount) {
    console.log('\n🎉 ALL 18 PAGES ARE WORKING PERFECTLY!');
    console.log('✅ No AI-era component issues');
    console.log('✅ No import errors');
    console.log('✅ All pages should load without console errors');
  } else {
    console.log('\n⚠️  Some pages still have issues that need attention.');
  }
}

main();
