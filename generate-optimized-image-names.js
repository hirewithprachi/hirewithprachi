import fs from 'fs';
import path from 'path';

// City data with optimized image names
const CITY_DATA = [
  {
    name: 'Mumbai',
    slug: 'mumbai',
    imageName: 'hr-services-mumbai-1200x630.jpg',
    webpName: 'hr-services-mumbai-1200x630.webp',
    avifName: 'hr-services-mumbai-1200x630.avif',
    description: 'Expert HR services in Mumbai for financial services, entertainment & manufacturing. BKC, Andheri, Powai coverage. Complete HR solutions for Mumbai businesses.',
    keywords: 'HR services Mumbai, HR consultant Mumbai, recruitment Mumbai, HR compliance Mumbai, BKC HR services, Andheri HR consultant'
  },
  {
    name: 'Delhi',
    slug: 'delhi',
    imageName: 'hr-services-delhi-1200x630.jpg',
    webpName: 'hr-services-delhi-1200x630.webp',
    avifName: 'hr-services-delhi-1200x630.avif',
    description: 'Professional HR services in Delhi for government, IT & consulting firms. Connaught Place, Gurgaon, Noida coverage. Expert HR solutions for Delhi NCR.',
    keywords: 'HR services Delhi, HR consultant Delhi, recruitment Delhi, HR compliance Delhi, Gurgaon HR services, Noida HR consultant'
  },
  {
    name: 'Bangalore',
    slug: 'bangalore',
    imageName: 'hr-services-bangalore-1200x630.jpg',
    webpName: 'hr-services-bangalore-1200x630.webp',
    avifName: 'hr-services-bangalore-1200x630.avif',
    description: 'Specialized HR services in Bangalore for IT, startups & biotech companies. Whitefield, Electronic City, Koramangala coverage. Complete HR solutions.',
    keywords: 'HR services Bangalore, HR consultant Bangalore, recruitment Bangalore, HR compliance Bangalore, Whitefield HR services, Electronic City HR consultant'
  },
  {
    name: 'Chennai',
    slug: 'chennai',
    imageName: 'hr-services-chennai-1200x630.jpg',
    webpName: 'hr-services-chennai-1200x630.webp',
    avifName: 'hr-services-chennai-1200x630.avif',
    description: 'Expert HR services in Chennai for automotive, IT & healthcare sectors. T Nagar, Anna Nagar, Adyar coverage. Professional HR solutions for Chennai businesses.',
    keywords: 'HR services Chennai, HR consultant Chennai, recruitment Chennai, HR compliance Chennai, T Nagar HR services, Anna Nagar HR consultant'
  },
  {
    name: 'Hyderabad',
    slug: 'hyderabad',
    imageName: 'hr-services-hyderabad-1200x630.jpg',
    webpName: 'hr-services-hyderabad-1200x630.webp',
    avifName: 'hr-services-hyderabad-1200x630.avif',
    description: 'Professional HR services in Hyderabad for IT, pharmaceutical & biotech companies. HITEC City, Genome Valley coverage. Expert HR solutions.',
    keywords: 'HR services Hyderabad, HR consultant Hyderabad, recruitment Hyderabad, HR compliance Hyderabad, HITEC City HR services, Genome Valley HR consultant'
  },
  {
    name: 'Pune',
    slug: 'pune',
    imageName: 'hr-services-pune-1200x630.jpg',
    webpName: 'hr-services-pune-1200x630.webp',
    avifName: 'hr-services-pune-1200x630.avif',
    description: 'Specialized HR services in Pune for automotive, IT & education sectors. Hinjewadi, Kharadi, Baner coverage. Complete HR solutions for Pune businesses.',
    keywords: 'HR services Pune, HR consultant Pune, recruitment Pune, HR compliance Pune, Hinjewadi HR services, Kharadi HR consultant'
  },
  {
    name: 'Ahmedabad',
    slug: 'ahmedabad',
    imageName: 'hr-services-ahmedabad-1200x630.jpg',
    webpName: 'hr-services-ahmedabad-1200x630.webp',
    avifName: 'hr-services-ahmedabad-1200x630.avif',
    description: 'Expert HR services in Ahmedabad for textile, chemical & pharmaceutical industries. GIFT City, Naroda, Vastrapur coverage. Professional HR solutions.',
    keywords: 'HR services Ahmedabad, HR consultant Ahmedabad, recruitment Ahmedabad, HR compliance Ahmedabad, GIFT City HR services, Naroda HR consultant'
  },
  {
    name: 'Kolkata',
    slug: 'kolkata',
    imageName: 'hr-services-kolkata-1200x630.jpg',
    webpName: 'hr-services-kolkata-1200x630.webp',
    avifName: 'hr-services-kolkata-1200x630.avif',
    description: 'Professional HR services in Kolkata for manufacturing, IT & financial services. Salt Lake, New Town, Park Street coverage. Expert HR solutions.',
    keywords: 'HR services Kolkata, HR consultant Kolkata, recruitment Kolkata, HR compliance Kolkata, Salt Lake HR services, New Town HR consultant'
  },
  {
    name: 'Jaipur',
    slug: 'jaipur',
    imageName: 'hr-services-jaipur-1200x630.jpg',
    webpName: 'hr-services-jaipur-1200x630.webp',
    avifName: 'hr-services-jaipur-1200x630.avif',
    description: 'Specialized HR services in Jaipur for tourism, handicrafts & IT sectors. Malviya Nagar, C-Scheme, Vaishali Nagar coverage. Complete HR solutions.',
    keywords: 'HR services Jaipur, HR consultant Jaipur, recruitment Jaipur, HR compliance Jaipur, Malviya Nagar HR services, C-Scheme HR consultant'
  },
  {
    name: 'Lucknow',
    slug: 'lucknow',
    imageName: 'hr-services-lucknow-1200x630.jpg',
    webpName: 'hr-services-lucknow-1200x630.webp',
    avifName: 'hr-services-lucknow-1200x630.avif',
    description: 'Expert HR services in Lucknow for government, education & healthcare sectors. Gomti Nagar, Hazratganj, Aliganj coverage. Professional HR solutions.',
    keywords: 'HR services Lucknow, HR consultant Lucknow, recruitment Lucknow, HR compliance Lucknow, Gomti Nagar HR services, Hazratganj HR consultant'
  },
  {
    name: 'Indore',
    slug: 'indore',
    imageName: 'hr-services-indore-1200x630.jpg',
    webpName: 'hr-services-indore-1200x630.webp',
    avifName: 'hr-services-indore-1200x630.avif',
    description: 'Professional HR services in Indore for manufacturing, IT & education sectors. Vijay Nagar, Palasia, Rajendra Nagar coverage. Expert HR solutions.',
    keywords: 'HR services Indore, HR consultant Indore, recruitment Indore, HR compliance Indore, Vijay Nagar HR services, Palasia HR consultant'
  },
  {
    name: 'Bhubaneswar',
    slug: 'bhubaneswar',
    imageName: 'hr-services-bhubaneswar-1200x630.jpg',
    webpName: 'hr-services-bhubaneswar-1200x630.webp',
    avifName: 'hr-services-bhubaneswar-1200x630.avif',
    description: 'Specialized HR services in Bhubaneswar for government, IT & education sectors. KIIT, Patia, Chandrasekharpur coverage. Complete HR solutions.',
    keywords: 'HR services Bhubaneswar, HR consultant Bhubaneswar, recruitment Bhubaneswar, HR compliance Bhubaneswar, KIIT HR services, Patia HR consultant'
  },
  {
    name: 'Nagpur',
    slug: 'nagpur',
    imageName: 'hr-services-nagpur-1200x630.jpg',
    webpName: 'hr-services-nagpur-1200x630.webp',
    avifName: 'hr-services-nagpur-1200x630.avif',
    description: 'Expert HR services in Nagpur for manufacturing, logistics & education sectors. Civil Lines, Dhantoli, Ramdaspeth coverage. Professional HR solutions.',
    keywords: 'HR services Nagpur, HR consultant Nagpur, recruitment Nagpur, HR compliance Nagpur, Civil Lines HR services, Dhantoli HR consultant'
  },
  {
    name: 'Coimbatore',
    slug: 'coimbatore',
    imageName: 'hr-services-coimbatore-1200x630.jpg',
    webpName: 'hr-services-coimbatore-1200x630.webp',
    avifName: 'hr-services-coimbatore-1200x630.avif',
    description: 'Professional HR services in Coimbatore for textile, manufacturing & IT sectors. RS Puram, Peelamedu, Saibaba Colony coverage. Expert HR solutions.',
    keywords: 'HR services Coimbatore, HR consultant Coimbatore, recruitment Coimbatore, HR compliance Coimbatore, RS Puram HR services, Peelamedu HR consultant'
  }
];

// Service data with optimized image names
const SERVICE_DATA = [
  {
    name: 'HR Compliance',
    slug: 'hr-compliance',
    imageName: 'hr-compliance-services-1200x630.jpg',
    webpName: 'hr-compliance-services-1200x630.webp',
    avifName: 'hr-compliance-services-1200x630.avif',
    description: 'Complete HR compliance services for Indian businesses. POSH compliance, labor law adherence, statutory compliance. Expert HR compliance consultant.',
    keywords: 'HR compliance services, POSH compliance, labor law compliance, statutory compliance, HR compliance consultant India'
  },
  {
    name: 'Recruitment & Hiring',
    slug: 'recruitment-hiring',
    imageName: 'recruitment-hiring-services-1200x630.jpg',
    webpName: 'recruitment-hiring-services-1200x630.webp',
    avifName: 'recruitment-hiring-services-1200x630.avif',
    description: 'Professional recruitment and hiring services. End-to-end hiring process, talent acquisition, candidate screening. Expert recruitment consultant.',
    keywords: 'recruitment services, hiring services, talent acquisition, candidate screening, recruitment consultant India'
  },
  {
    name: 'Employee Engagement',
    slug: 'employee-engagement',
    imageName: 'employee-engagement-services-1200x630.jpg',
    webpName: 'employee-engagement-services-1200x630.webp',
    avifName: 'employee-engagement-services-1200x630.avif',
    description: 'Employee engagement strategies and programs. Workplace culture, employee satisfaction, retention strategies. Expert employee engagement consultant.',
    keywords: 'employee engagement services, workplace culture, employee satisfaction, retention strategies, engagement consultant'
  },
  {
    name: 'Virtual HR Services',
    slug: 'virtual-hr-services',
    imageName: 'virtual-hr-services-1200x630.jpg',
    webpName: 'virtual-hr-services-1200x630.webp',
    avifName: 'virtual-hr-services-1200x630.avif',
    description: 'Comprehensive virtual HR services for remote and hybrid workplaces. Virtual HR support, remote HR management, digital HR solutions.',
    keywords: 'virtual HR services, remote HR support, hybrid workplace HR, digital HR solutions, virtual HR consultant'
  },
  {
    name: 'Payroll Management',
    slug: 'payroll-management',
    imageName: 'payroll-management-services-1200x630.jpg',
    webpName: 'payroll-management-services-1200x630.webp',
    avifName: 'payroll-management-services-1200x630.avif',
    description: 'Complete payroll management services. Salary processing, tax compliance, statutory deductions. Expert payroll management consultant.',
    keywords: 'payroll management services, salary processing, tax compliance, statutory deductions, payroll consultant India'
  },
  {
    name: 'Performance Management',
    slug: 'performance-management',
    imageName: 'performance-management-services-1200x630.jpg',
    webpName: 'performance-management-services-1200x630.webp',
    avifName: 'performance-management-services-1200x630.avif',
    description: 'Performance management systems and strategies. KPI development, performance reviews, employee development. Expert performance management consultant.',
    keywords: 'performance management services, KPI development, performance reviews, employee development, performance consultant'
  },
  {
    name: 'HR Audit',
    slug: 'hr-audit',
    imageName: 'hr-audit-services-1200x630.jpg',
    webpName: 'hr-audit-services-1200x630.webp',
    avifName: 'hr-audit-services-1200x630.avif',
    description: 'Comprehensive HR audit services. HR process review, compliance audit, HR efficiency assessment. Expert HR audit consultant.',
    keywords: 'HR audit services, HR process review, compliance audit, HR efficiency assessment, HR audit consultant'
  }
];

// Generate image name mapping
function generateImageMapping() {
  console.log('🖼️  GENERATING OPTIMIZED IMAGE NAMES FOR SEO 2025');
  console.log('=' .repeat(80));
  
  console.log('\n📋 CITY PAGES IMAGE NAMES:');
  console.log('=' .repeat(50));
  CITY_DATA.forEach(city => {
    console.log(`\n🏙️  ${city.name}:`);
    console.log(`  • JPG: ${city.imageName}`);
    console.log(`  • WebP: ${city.webpName}`);
    console.log(`  • AVIF: ${city.avifName}`);
    console.log(`  • Description: ${city.description.substring(0, 100)}...`);
  });
  
  console.log('\n📋 SERVICE PAGES IMAGE NAMES:');
  console.log('=' .repeat(50));
  SERVICE_DATA.forEach(service => {
    console.log(`\n🔧 ${service.name}:`);
    console.log(`  • JPG: ${service.imageName}`);
    console.log(`  • WebP: ${service.webpName}`);
    console.log(`  • AVIF: ${service.avifName}`);
    console.log(`  • Description: ${service.description.substring(0, 100)}...`);
  });
  
  console.log('\n📋 IMAGE OPTIMIZATION RECOMMENDATIONS:');
  console.log('=' .repeat(50));
  console.log('✅ All images should be 1200x630 pixels for optimal social sharing');
  console.log('✅ Use WebP format for better compression and faster loading');
  console.log('✅ Use AVIF format for modern browsers (best compression)');
  console.log('✅ Include descriptive alt text for all images');
  console.log('✅ Optimize file sizes to under 200KB for fast loading');
  console.log('✅ Use consistent naming convention for easy management');
  
  console.log('\n📋 SEO BENEFITS:');
  console.log('=' .repeat(50));
  console.log('🚀 Improved page load speed (Core Web Vitals)');
  console.log('🚀 Better social media sharing appearance');
  console.log('🚀 Enhanced local search rankings');
  console.log('🚀 Improved user experience');
  console.log('🚀 Better search engine indexing');
  
  console.log('\n' + '=' .repeat(80));
  console.log('✅ IMAGE NAMING STRATEGY COMPLETE');
  console.log('=' .repeat(80));
  
  return {
    cities: CITY_DATA,
    services: SERVICE_DATA
  };
}

// Export the data
export { CITY_DATA, SERVICE_DATA, generateImageMapping };

// Run if called directly
generateImageMapping();
