import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  outputDir: path.join(__dirname, '..', 'performance-reports'),
  timestamp: new Date().toISOString().replace(/[:.]/g, '-'),
  checkImageOptimization: true,
  checkJavaScriptSize: true,
  checkHTMLSize: true,
  checkCSSSize: true,
  checkFontFiles: true,
  checkRedirects: true,
  verbose: true
};

// Create output directory if it doesn't exist
async function ensureOutputDir() {
  try {
    await fs.mkdir(config.outputDir, { recursive: true });
    console.log(`Created output directory: ${config.outputDir}`);
  } catch (error) {
    console.error('Error creating output directory:', error);
  }
}

// Function to format file size
function formatFileSize(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
}

// Function to check image optimization
async function checkImageOptimization() {
  if (!config.checkImageOptimization) return null;
  
  console.log('Checking image optimization...');
  
  try {
    const publicDir = path.join(__dirname, '..', 'public');
    const optimizedImagesDir = path.join(publicDir, 'assets', 'images', 'optimized');
    
    // Check if optimized images directory exists
    try {
      await fs.access(optimizedImagesDir);
    } catch (error) {
      return {
        status: 'warning',
        message: 'Optimized images directory not found. Run optimize-images.js first.'
      };
    }
    
    // Count optimized images
    const webpFiles = await countFiles(optimizedImagesDir, '.webp');
    const avifFiles = await countFiles(optimizedImagesDir, '.avif');
    const totalOptimizedImages = webpFiles + avifFiles;
    
    // Check if ResponsiveImage component is being used
    const srcDir = path.join(__dirname, '..', 'src');
    const { stdout: grepResult } = await execAsync(`grep -r "<ResponsiveImage" ${srcDir} --include="*.jsx" --include="*.js" | wc -l`);
    const responsiveImageUsage = parseInt(grepResult.trim(), 10);
    
    return {
      status: 'success',
      details: {
        webpImages: webpFiles,
        avifImages: avifFiles,
        totalOptimizedImages,
        responsiveImageUsage
      },
      message: `Found ${totalOptimizedImages} optimized images (${webpFiles} WebP, ${avifFiles} AVIF) and ${responsiveImageUsage} uses of ResponsiveImage component.`
    };
  } catch (error) {
    console.error('Error checking image optimization:', error);
    return {
      status: 'error',
      message: `Error checking image optimization: ${error.message}`
    };
  }
}

// Function to check JavaScript size
async function checkJavaScriptSize() {
  if (!config.checkJavaScriptSize) return null;
  
  console.log('Checking JavaScript size...');
  
  try {
    const srcDir = path.join(__dirname, '..', 'src');
    const jsFiles = await findFiles(srcDir, ['.js', '.jsx']);
    
    let totalSize = 0;
    let lazyLoadedComponents = 0;
    
    // Check for lazy loaded components
    for (const file of jsFiles) {
      const content = await fs.readFile(file, 'utf8');
      const stats = await fs.stat(file);
      totalSize += stats.size;
      
      // Count lazy loaded components
      const lazyMatches = content.match(/React\.lazy|lazy\(\s*\(\)|lazy\(\s*\(\)\s*=>/g);
      if (lazyMatches) {
        lazyLoadedComponents += lazyMatches.length;
      }
    }
    
    // Check main.jsx for code splitting
    const mainJsxPath = path.join(srcDir, 'main.jsx');
    let codeSplittingImplemented = false;
    
    try {
      const mainJsxContent = await fs.readFile(mainJsxPath, 'utf8');
      codeSplittingImplemented = mainJsxContent.includes('lazy(') || mainJsxContent.includes('React.lazy');
    } catch (error) {
      console.warn(`Could not check main.jsx for code splitting: ${error.message}`);
    }
    
    return {
      status: 'success',
      details: {
        totalJsFiles: jsFiles.length,
        totalSize,
        formattedSize: formatFileSize(totalSize),
        lazyLoadedComponents,
        codeSplittingImplemented
      },
      message: `Found ${jsFiles.length} JavaScript files (${formatFileSize(totalSize)}), ${lazyLoadedComponents} lazy-loaded components, and code splitting is ${codeSplittingImplemented ? 'implemented' : 'not implemented'}.`
    };
  } catch (error) {
    console.error('Error checking JavaScript size:', error);
    return {
      status: 'error',
      message: `Error checking JavaScript size: ${error.message}`
    };
  }
}

// Function to check HTML size and optimization
async function checkHTMLSize() {
  if (!config.checkHTMLSize) return null;
  
  console.log('Checking HTML size and optimization...');
  
  try {
    const indexHtmlPath = path.join(__dirname, '..', 'index.html');
    const content = await fs.readFile(indexHtmlPath, 'utf8');
    const stats = await fs.stat(indexHtmlPath);
    
    // Check for preload directives
    const preloadDirectives = (content.match(/<link[^>]*rel=["']preload["'][^>]*>/g) || []).length;
    
    // Check for defer/async attributes
    const scriptTags = content.match(/<script[^>]*>/g) || [];
    const deferredScripts = scriptTags.filter(tag => tag.includes('defer')).length;
    const asyncScripts = scriptTags.filter(tag => tag.includes('async')).length;
    
    // Check for render-blocking resources
    const renderBlockingResources = (
      (content.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/g) || []).length +
      scriptTags.filter(tag => !tag.includes('defer') && !tag.includes('async')).length
    );
    
    return {
      status: 'success',
      details: {
        sizeBytes: stats.size,
        formattedSize: formatFileSize(stats.size),
        preloadDirectives,
        deferredScripts,
        asyncScripts,
        renderBlockingResources
      },
      message: `Index HTML is ${formatFileSize(stats.size)} with ${preloadDirectives} preload directives, ${deferredScripts} deferred scripts, ${asyncScripts} async scripts, and ${renderBlockingResources} potential render-blocking resources.`
    };
  } catch (error) {
    console.error('Error checking HTML size:', error);
    return {
      status: 'error',
      message: `Error checking HTML size: ${error.message}`
    };
  }
}

// Function to check CSS size and optimization
async function checkCSSSize() {
  if (!config.checkCSSSize) return null;
  
  console.log('Checking CSS size and optimization...');
  
  try {
    const srcDir = path.join(__dirname, '..', 'src');
    const cssFiles = await findFiles(srcDir, ['.css']);
    
    let totalSize = 0;
    let inlinedCriticalCSS = false;
    
    // Check for inlined critical CSS in index.html
    const indexHtmlPath = path.join(__dirname, '..', 'index.html');
    const indexHtmlContent = await fs.readFile(indexHtmlPath, 'utf8');
    inlinedCriticalCSS = indexHtmlContent.includes('<style id="critical-css">');
    
    for (const file of cssFiles) {
      const stats = await fs.stat(file);
      totalSize += stats.size;
    }
    
    return {
      status: 'success',
      details: {
        totalCssFiles: cssFiles.length,
        totalSize,
        formattedSize: formatFileSize(totalSize),
        inlinedCriticalCSS
      },
      message: `Found ${cssFiles.length} CSS files (${formatFileSize(totalSize)}), and critical CSS is ${inlinedCriticalCSS ? 'inlined' : 'not inlined'}.`
    };
  } catch (error) {
    console.error('Error checking CSS size:', error);
    return {
      status: 'error',
      message: `Error checking CSS size: ${error.message}`
    };
  }
}

// Function to check font files
async function checkFontFiles() {
  if (!config.checkFontFiles) return null;
  
  console.log('Checking font files...');
  
  try {
    const publicDir = path.join(__dirname, '..', 'public');
    const fontExtensions = ['.woff', '.woff2', '.ttf', '.eot', '.otf'];
    const fontFiles = [];
    
    // Find font files recursively
    async function findFontFiles(dir) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          await findFontFiles(fullPath);
        } else if (fontExtensions.some(ext => entry.name.endsWith(ext))) {
          fontFiles.push(fullPath);
        }
      }
    }
    
    await findFontFiles(publicDir);
    
    // Check for font-display: swap in CSS files
    const srcDir = path.join(__dirname, '..', 'src');
    const cssFiles = await findFiles(srcDir, ['.css']);
    let fontDisplaySwapCount = 0;
    
    for (const cssFile of cssFiles) {
      const content = await fs.readFile(cssFile, 'utf8');
      const fontFaceMatches = content.match(/@font-face\s*{[^}]*}/g) || [];
      
      for (const fontFace of fontFaceMatches) {
        if (fontFace.includes('font-display:') && fontFace.includes('swap')) {
          fontDisplaySwapCount++;
        }
      }
    }
    
    // Check for preloaded fonts in index.html
    const indexHtmlPath = path.join(__dirname, '..', 'index.html');
    const indexHtmlContent = await fs.readFile(indexHtmlPath, 'utf8');
    const preloadedFonts = (indexHtmlContent.match(/<link[^>]*rel=["']preload["'][^>]*as=["']font["'][^>]*>/g) || []).length;
    
    return {
      status: 'success',
      details: {
        totalFontFiles: fontFiles.length,
        fontDisplaySwapCount,
        preloadedFonts
      },
      message: `Found ${fontFiles.length} font files, ${fontDisplaySwapCount} @font-face rules with font-display: swap, and ${preloadedFonts} preloaded fonts.`
    };
  } catch (error) {
    console.error('Error checking font files:', error);
    return {
      status: 'error',
      message: `Error checking font files: ${error.message}`
    };
  }
}

// Function to check for redirects
async function checkRedirects() {
  if (!config.checkRedirects) return null;
  
  console.log('Checking for redirects...');
  
  try {
    const htaccessPath = path.join(__dirname, '..', 'public', '.htaccess');
    let htaccessContent;
    
    try {
      htaccessContent = await fs.readFile(htaccessPath, 'utf8');
    } catch (error) {
      return {
        status: 'warning',
        message: '.htaccess file not found.'
      };
    }
    
    // Check for redirect rules
    const redirectRules = (htaccessContent.match(/RewriteRule[^\n]*\[(R|r)=[0-9]{3}[^\]]*\]/g) || []).length;
    
    // Check for www to non-www redirect
    const wwwToNonWwwRedirect = htaccessContent.includes('RewriteCond %{HTTP_HOST} ^www\\.');
    
    // Check for HTTP to HTTPS redirect
    const httpToHttpsRedirect = htaccessContent.includes('RewriteCond %{HTTPS} off');
    
    return {
      status: 'success',
      details: {
        redirectRules,
        wwwToNonWwwRedirect,
        httpToHttpsRedirect
      },
      message: `Found ${redirectRules} redirect rules in .htaccess. WWW to non-WWW redirect: ${wwwToNonWwwRedirect ? 'Yes' : 'No'}. HTTP to HTTPS redirect: ${httpToHttpsRedirect ? 'Yes' : 'No'}.`
    };
  } catch (error) {
    console.error('Error checking redirects:', error);
    return {
      status: 'error',
      message: `Error checking redirects: ${error.message}`
    };
  }
}

// Helper function to count files with a specific extension
async function countFiles(dir, extension) {
  try {
    const files = await fs.readdir(dir, { withFileTypes: true });
    let count = 0;
    
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        count += await countFiles(fullPath, extension);
      } else if (file.name.endsWith(extension)) {
        count++;
      }
    }
    
    return count;
  } catch (error) {
    console.error(`Error counting files with extension ${extension}:`, error);
    return 0;
  }
}

// Helper function to find files with specific extensions
async function findFiles(dir, extensions) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    let files = [];
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        files = files.concat(await findFiles(fullPath, extensions));
      } else if (extensions.some(ext => entry.name.endsWith(ext))) {
        files.push(fullPath);
      }
    }
    
    return files;
  } catch (error) {
    console.error(`Error finding files with extensions ${extensions}:`, error);
    return [];
  }
}

// Main function
async function verifyPerformance() {
  try {
    console.log('🚀 Starting performance verification...');
    
    // Ensure output directory exists
    await ensureOutputDir();
    
    // Run all checks
    const results = {
      timestamp: config.timestamp,
      imageOptimization: await checkImageOptimization(),
      javaScriptSize: await checkJavaScriptSize(),
      htmlSize: await checkHTMLSize(),
      cssSize: await checkCSSSize(),
      fontFiles: await checkFontFiles(),
      redirects: await checkRedirects()
    };
    
    // Generate report
    const reportPath = path.join(config.outputDir, `performance-report-${config.timestamp}.json`);
    await fs.writeFile(reportPath, JSON.stringify(results, null, 2), 'utf8');
    
    console.log('\n📊 Performance Verification Summary:');
    console.log('===============================');
    
    if (results.imageOptimization) {
      console.log(`✅ Image Optimization: ${results.imageOptimization.message}`);
    }
    
    if (results.javaScriptSize) {
      console.log(`✅ JavaScript Size: ${results.javaScriptSize.message}`);
    }
    
    if (results.htmlSize) {
      console.log(`✅ HTML Size: ${results.htmlSize.message}`);
    }
    
    if (results.cssSize) {
      console.log(`✅ CSS Size: ${results.cssSize.message}`);
    }
    
    if (results.fontFiles) {
      console.log(`✅ Font Files: ${results.fontFiles.message}`);
    }
    
    if (results.redirects) {
      console.log(`✅ Redirects: ${results.redirects.message}`);
    }
    
    console.log('\n✅ Performance verification completed!');
    console.log(`📝 Report saved to: ${reportPath}`);
    console.log('\n🔍 Recommendations:');
    console.log('1. Run a Lighthouse test to verify improvements');
    console.log('2. Test the website on actual mobile devices');
    console.log('3. Consider implementing a service worker for offline support');
    console.log('4. Monitor real user metrics after deployment');
  } catch (error) {
    console.error('Error verifying performance:', error);
    process.exit(1);
  }
}

// Run the verification
verifyPerformance();