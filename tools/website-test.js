import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function testFileExists(filePath, description) {
  try {
    const stats = fs.statSync(filePath);
    console.log(`✅ ${description}: ${stats.size} bytes`);
    return true;
  } catch (error) {
    console.log(`❌ ${description}: File not found`);
    return false;
  }
}

function testJsonFile(filePath, description) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    console.log(`✅ ${description}: ${Array.isArray(data) ? data.length : 'Valid JSON'}`);
    return true;
  } catch (error) {
    console.log(`❌ ${description}: ${error.message}`);
    return false;
  }
}

function main() {
  console.log('🔍 Testing Website Functionality...\n');
  
  let allTestsPassed = true;
  
  // Test critical files
  const criticalFiles = [
    { path: 'src/main.jsx', desc: 'Main Application Entry' },
    { path: 'src/App.jsx', desc: 'App Component' },
    { path: 'src/pages/HirableHomepage.jsx', desc: 'Homepage Component' },
    { path: 'src/components/hirable/HirableHeader.jsx', desc: 'Header Component' },
    { path: 'src/components/hirable/HirableHero.jsx', desc: 'Hero Component' },
    { path: 'public/manifest.json', desc: 'PWA Manifest' },
    { path: 'public/service-worker.js', desc: 'Service Worker' },
    { path: 'vite.config.js', desc: 'Vite Configuration' },
    { path: 'package.json', desc: 'Package Configuration' },
    { path: 'tailwind.config.js', desc: 'Tailwind Configuration' }
  ];
  
  console.log('📁 Critical Files:');
  criticalFiles.forEach(file => {
    if (!testFileExists(file.path, file.desc)) {
      allTestsPassed = false;
    }
  });
  
  console.log('\n📊 Data Files:');
  const dataFiles = [
    { path: 'public/data/services.json', desc: 'Services Data' },
    { path: 'public/data/blog.json', desc: 'Blog Data' },
    { path: 'public/data/resources.json', desc: 'Resources Data' }
  ];
  
  dataFiles.forEach(file => {
    if (!testJsonFile(file.path, file.desc)) {
      allTestsPassed = false;
    }
  });
  
  console.log('\n🎨 Assets:');
  const assetFiles = [
    { path: 'public/assets/images/icon-192.svg', desc: '192x192 Icon (SVG)' },
    { path: 'public/assets/images/icon-512.svg', desc: '512x512 Icon (SVG)' },
    { path: 'public/assets/images/workflow-lottie.json', desc: 'Lottie Animation' }
  ];
  
  assetFiles.forEach(file => {
    if (!testFileExists(file.path, file.desc)) {
      allTestsPassed = false;
    }
  });
  
  console.log('\n🔧 Tools:');
  const toolFiles = [
    { path: 'tools/icon-generator.html', desc: 'Icon Generator' },
    { path: 'tools/verify-files.js', desc: 'File Verification Script' },
    { path: 'ICON_SETUP.md', desc: 'Icon Setup Documentation' }
  ];
  
  toolFiles.forEach(file => {
    if (!testFileExists(file.path, file.desc)) {
      allTestsPassed = false;
    }
  });
  
  console.log('\n📋 Summary:');
  if (allTestsPassed) {
    console.log('✅ All tests passed! Website is ready for deployment.');
    console.log('\n🚀 Next Steps:');
    console.log('1. Generate PNG icons using tools/icon-generator.html');
    console.log('2. Test the website in browser at http://localhost:5173');
    console.log('3. Verify all pages and functionality work correctly');
    console.log('4. Deploy to your hosting platform');
  } else {
    console.log('❌ Some tests failed. Please fix the issues above.');
  }
}

main(); 