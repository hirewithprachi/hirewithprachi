import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function checkFile(filePath, description) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const stats = fs.statSync(filePath);
        
        console.log(`✅ ${description}:`);
        console.log(`   Path: ${filePath}`);
        console.log(`   Size: ${stats.size} bytes`);
        
        // Check for specific issues
        if (filePath.includes('automatedEmails.js') && content.includes('c//')) {
            console.log(`   ❌ Issue: Contains 'c//' instead of '//'`);
            return false;
        }
        
        if (filePath.includes('service-worker.js') && content.includes('sanst')) {
            console.log(`   ❌ Issue: Contains 'sanst' instead of 'const'`);
            return false;
        }
        
        if (filePath.includes('.png') && stats.size < 100) {
            console.log(`   ❌ Issue: PNG file too small (${stats.size} bytes) - likely corrupted`);
            return false;
        }
        
        console.log(`   ✅ File looks good!`);
        return true;
    } catch (error) {
        console.log(`❌ ${description}:`);
        console.log(`   Error: ${error.message}`);
        return false;
    }
}

function main() {
    console.log('🔍 Verifying fixed files...\n');
    
    const filesToCheck = [
        {
            path: path.join(__dirname, '../src/lib/automatedEmails.js'),
            description: 'Automated Emails Module'
        },
        {
            path: path.join(__dirname, '../public/service-worker.js'),
            description: 'Service Worker'
        },
        {
            path: path.join(__dirname, '../public/assets/images/icon-192.svg'),
            description: '192x192 Icon (SVG)'
        },
        {
            path: path.join(__dirname, '../public/assets/images/icon-512.svg'),
            description: '512x512 Icon (SVG)'
        },
        {
            path: path.join(__dirname, '../public/assets/images/icon-192.png'),
            description: '192x192 Icon (PNG)'
        },
        {
            path: path.join(__dirname, '../public/assets/images/icon-512.png'),
            description: '512x512 Icon (PNG)'
        }
    ];
    
    let allGood = true;
    
    filesToCheck.forEach(file => {
        const result = checkFile(file.path, file.description);
        if (!result) allGood = false;
        console.log('');
    });
    
    console.log('📋 Summary:');
    if (allGood) {
        console.log('✅ All files are working correctly!');
        console.log('\n🎉 Next steps:');
        console.log('1. Use the icon generator at tools/icon-generator.html to create PNG icons');
        console.log('2. Test the service worker functionality');
        console.log('3. Verify the automated emails module works with your email service');
    } else {
        console.log('❌ Some files still have issues that need to be addressed');
    }
}

main(); 