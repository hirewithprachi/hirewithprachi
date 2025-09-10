import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  indexHtmlPath: path.join(__dirname, '..', 'index.html'),
  cssFiles: [
    // Add paths to critical CSS files that should be inlined
    // Example: path.join(__dirname, '..', 'src', 'critical.css')
  ],
  deferNonCriticalJS: true,
  preloadFonts: true,
  preloadCriticalAssets: true,
  criticalAssets: [
    // List critical assets to preload
    '/src/main.jsx',
    '/src/index.css'
  ],
  fontFiles: [
    // List font files to preload
    // Example: '/assets/fonts/roboto.woff2'
  ]
};

// Function to read the index.html file
async function readIndexHtml() {
  try {
    return await fs.readFile(config.indexHtmlPath, 'utf8');
  } catch (error) {
    console.error('Error reading index.html:', error);
    throw error;
  }
}

// Function to inline critical CSS
async function inlineCriticalCSS(html) {
  if (config.cssFiles.length === 0) {
    console.log('No critical CSS files specified for inlining.');
    return html;
  }

  try {
    let criticalCSS = '';
    for (const cssFile of config.cssFiles) {
      const css = await fs.readFile(cssFile, 'utf8');
      criticalCSS += css;
    }

    // Minify CSS (basic minification)
    criticalCSS = criticalCSS
      .replace(/\s+/g, ' ')
      .replace(/\s*({|})\s*/g, '$1')
      .replace(/\s*;\s*/g, ';')
      .replace(/\s*:\s*/g, ':')
      .trim();

    // Insert the critical CSS into the head
    return html.replace('</head>', `<style id="critical-css">${criticalCSS}</style></head>`);
  } catch (error) {
    console.error('Error inlining critical CSS:', error);
    return html;
  }
}

// Function to defer non-critical JavaScript
function deferNonCriticalJS(html) {
  if (!config.deferNonCriticalJS) {
    return html;
  }

  // Add defer attribute to script tags that don't have it
  // Exclude scripts that have async attribute or are type="module"
  return html.replace(
    /<script([^>]*)>([\s\S]*?)<\/script>/g,
    (match, attributes, content) => {
      // Skip if already has defer or async attribute
      if (attributes.includes('defer') || attributes.includes('async')) {
        return match;
      }
      
      // Skip if it's an inline script with content
      if (content.trim() && !attributes.includes('src=')) {
        return match;
      }

      // Add defer attribute
      return `<script${attributes} defer>${content}</script>`;
    }
  );
}

// Function to add preload for critical assets
function preloadCriticalAssets(html) {
  if (!config.preloadCriticalAssets || config.criticalAssets.length === 0) {
    return html;
  }

  let preloadTags = '';
  for (const asset of config.criticalAssets) {
    const ext = path.extname(asset).toLowerCase();
    let as = 'script';
    
    if (['.css'].includes(ext)) {
      as = 'style';
    } else if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'].includes(ext)) {
      as = 'image';
    }

    preloadTags += `<link rel="preload" href="${asset}" as="${as}"${as === 'script' ? ' type="module"' : ''}>`;
  }

  return html.replace('</head>', `${preloadTags}</head>`);
}

// Function to add preload for fonts
function preloadFonts(html) {
  if (!config.preloadFonts || config.fontFiles.length === 0) {
    return html;
  }

  let preloadTags = '';
  for (const font of config.fontFiles) {
    const ext = path.extname(font).toLowerCase();
    let type = 'font/woff2';
    
    if (ext === '.woff') {
      type = 'font/woff';
    } else if (ext === '.ttf') {
      type = 'font/ttf';
    }

    preloadTags += `<link rel="preload" href="${font}" as="font" type="${type}" crossorigin>`;
  }

  return html.replace('</head>', `${preloadTags}</head>`);
}

// Function to add font-display: swap to font-face declarations
async function addFontDisplaySwap() {
  try {
    // Find CSS files that might contain @font-face declarations
    const cssFiles = await findCSSFiles();
    
    for (const cssFile of cssFiles) {
      let cssContent = await fs.readFile(cssFile, 'utf8');
      
      // Add font-display: swap to @font-face declarations if not already present
      const updatedCss = cssContent.replace(
        /@font-face\s*{([^}]*)}/g,
        (match, fontFaceContent) => {
          if (!fontFaceContent.includes('font-display:')) {
            return `@font-face{${fontFaceContent}font-display:swap;}`;
          }
          return match;
        }
      );
      
      if (cssContent !== updatedCss) {
        await fs.writeFile(cssFile, updatedCss, 'utf8');
        console.log(`Added font-display: swap to ${cssFile}`);
      }
    }
  } catch (error) {
    console.error('Error adding font-display: swap:', error);
  }
}

// Helper function to find CSS files
async function findCSSFiles() {
  const srcDir = path.join(__dirname, '..', 'src');
  const cssFiles = [];
  
  async function scanDir(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        await scanDir(fullPath);
      } else if (entry.name.endsWith('.css')) {
        cssFiles.push(fullPath);
      }
    }
  }
  
  await scanDir(srcDir);
  return cssFiles;
}

// Main function
async function optimizeRenderBlocking() {
  try {
    console.log('🚀 Starting render-blocking resources optimization...');
    
    // Read the index.html file
    let html = await readIndexHtml();
    
    // Apply optimizations
    html = await inlineCriticalCSS(html);
    html = deferNonCriticalJS(html);
    html = preloadCriticalAssets(html);
    html = preloadFonts(html);
    
    // Write the optimized HTML back to the file
    await fs.writeFile(config.indexHtmlPath, html, 'utf8');
    
    // Add font-display: swap to @font-face declarations
    await addFontDisplaySwap();
    
    console.log('✅ Render-blocking resources optimization completed!');
  } catch (error) {
    console.error('Error optimizing render-blocking resources:', error);
    process.exit(1);
  }
}

// Run the optimization
optimizeRenderBlocking();