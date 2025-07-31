import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// This script helps generate PNG icons from SVG files
// You'll need to install puppeteer: npm install puppeteer

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateIcons() {
  try {
    // Check if puppeteer is available
    const puppeteer = await import('puppeteer');
    
    const browser = await puppeteer.default.launch();
    const page = await browser.newPage();
    
    // Generate 192x192 icon
    const svg192 = fs.readFileSync(path.join(__dirname, '../public/assets/images/icon-192.svg'), 'utf8');
    await page.setContent(svg192);
    await page.setViewport({ width: 192, height: 192 });
    await page.screenshot({
      path: path.join(__dirname, '../public/assets/images/icon-192.png'),
      type: 'png',
      omitBackground: true
    });
    
    // Generate 512x512 icon
    const svg512 = fs.readFileSync(path.join(__dirname, '../public/assets/images/icon-512.svg'), 'utf8');
    await page.setContent(svg512);
    await page.setViewport({ width: 512, height: 512 });
    await page.screenshot({
      path: path.join(__dirname, '../public/assets/images/icon-512.png'),
      type: 'png',
      omitBackground: true
    });
    
    await browser.close();
    console.log('✅ Icons generated successfully!');
  } catch (error) {
    console.log('❌ Error generating icons:', error.message);
    console.log('💡 To generate PNG icons, install puppeteer: npm install puppeteer');
    console.log('💡 Or manually convert the SVG files to PNG using an online converter or image editor');
  }
}

generateIcons(); 