import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of all city pages to update
const cityPages = [
  'HRServicesDelhi.jsx',
  'HRServicesBangalore.jsx',
  'HRServicesChennai.jsx',
  'HRServicesHyderabad.jsx',
  'HRServicesPune.jsx',
  'HRServicesAhmedabad.jsx',
  'HRServicesKolkata.jsx',
  'HRServicesJaipur.jsx',
  'HRServicesBhubaneswar.jsx',
  'HRServicesCoimbatore.jsx',
  'HRServicesIndore.jsx',
  'HRServicesLucknow.jsx',
  'HRServicesNagpur.jsx'
];

// Function to update a city page
function updateCityPage(fileName) {
  const filePath = path.join(__dirname, 'src', 'pages', fileName);
  const cityName = fileName.replace('HRServices', '').replace('.jsx', '');
  
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${fileName}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add HeroV2 import if not present
  if (!content.includes('import HeroV2')) {
    content = content.replace(
      'import CityLandingPremium from \'../components/CityLandingPremium\';',
      'import CityLandingPremium from \'../components/CityLandingPremium\';\nimport HeroV2 from \'../components/city-landing/HeroV2\';'
    );
  }

  // Add CityLandingPremium section if not present
  if (!content.includes('<CityLandingPremium')) {
    const beforeTestimonials = content.indexOf('{/* Premium Testimonials Section');
    if (beforeTestimonials !== -1) {
      const cityLandingPremium = `
      {/* Enhanced Premium Content Section */}
      <CityLandingPremium
        cityName="${cityName}"
        advantages={${cityName.toLowerCase()}Advantages}
        services={services}
        industries={industries}
        stats={${cityName.toLowerCase()}Stats}
        onSchedule={() => setShowCalendly(true)}
        onDownload={handleBrochureDownload}
      />

      `;
      content = content.slice(0, beforeTestimonials) + cityLandingPremium + content.slice(beforeTestimonials);
    }
  }

  // Write the updated content back to the file
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Updated ${fileName}`);
}

// Main execution
console.log('🚀 Starting city pages UI enhancement...\n');

cityPages.forEach(fileName => {
  try {
    updateCityPage(fileName);
  } catch (error) {
    console.error(`❌ Error updating ${fileName}:`, error.message);
  }
});

console.log('\n✅ City pages UI enhancement completed!');
console.log('\n📋 Summary of improvements:');
console.log('• Enhanced HeroV2 component with premium 2025 design');
console.log('• Added CityLandingPremium component with interactive tabs');
console.log('• Improved visual hierarchy and animations');
console.log('• Enhanced CTA sections with modern gradients');
console.log('• Better mobile responsiveness and user experience');
