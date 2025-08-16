import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  inputDir: 'public/assets/images',
  outputDir: 'public/assets/images/optimized',
  quality: 80,
  formats: ['webp', 'avif'],
  sizes: {
    thumbnail: 150,
    small: 300,
    medium: 600,
    large: 1200,
    xlarge: 1920
  },
  skipExisting: true
};

// Supported image formats
const supportedFormats = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'];

// Create output directory if it doesn't exist
async function ensureOutputDir() {
  try {
    await fs.mkdir(config.outputDir, { recursive: true });
  } catch (error) {
    console.log('Output directory already exists or could not be created');
  }
}

// Get file size in human readable format
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Optimize a single image
async function optimizeImage(inputPath, outputPath, options = {}) {
  try {
    const { width, height, format, quality } = options;
    
    let pipeline = sharp(inputPath);
    
    // Resize if dimensions provided
    if (width || height) {
      pipeline = pipeline.resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    // Convert format and set quality
    if (format === 'webp') {
      pipeline = pipeline.webp({ quality: quality || config.quality });
    } else if (format === 'avif') {
      pipeline = pipeline.avif({ quality: quality || config.quality });
    } else if (format === 'jpeg') {
      pipeline = pipeline.jpeg({ quality: quality || config.quality });
    } else if (format === 'png') {
      pipeline = pipeline.png({ quality: quality || config.quality });
    }
    
    await pipeline.toFile(outputPath);
    
    // Get file sizes for comparison
    const originalStats = await fs.stat(inputPath);
    const optimizedStats = await fs.stat(outputPath);
    
    const savings = ((originalStats.size - optimizedStats.size) / originalStats.size * 100).toFixed(1);
    
    return {
      original: formatFileSize(originalStats.size),
      optimized: formatFileSize(optimizedStats.size),
      savings: `${savings}%`
    };
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
    return null;
  }
}

// Process all images in a directory
async function processImages() {
  console.log('🚀 Starting image optimization...\n');
  
  await ensureOutputDir();
  
  // Get all image files
  const imageFiles = await glob(`${config.inputDir}/**/*.{jpg,jpeg,png,gif,bmp,tiff,webp}`);
  
  if (imageFiles.length === 0) {
    console.log('No images found to optimize.');
    return;
  }
  
  console.log(`Found ${imageFiles.length} images to process.\n`);
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let processedCount = 0;
  let skippedCount = 0;
  
  for (const imagePath of imageFiles) {
    const relativePath = path.relative(config.inputDir, imagePath);
    const fileName = path.basename(imagePath, path.extname(imagePath));
    const ext = path.extname(imagePath).toLowerCase();
    
    // Skip if not a supported format
    if (!supportedFormats.includes(ext)) {
      console.log(`⏭️  Skipping ${relativePath} (unsupported format)`);
      skippedCount++;
      continue;
    }
    
    console.log(`📸 Processing: ${relativePath}`);
    
    // Get original file size
    const originalStats = await fs.stat(imagePath);
    totalOriginalSize += originalStats.size;
    
    // Create optimized versions
    const results = [];
    
    for (const format of config.formats) {
      for (const [sizeName, size] of Object.entries(config.sizes)) {
        const outputFileName = `${fileName}-${sizeName}.${format}`;
        const outputPath = path.join(config.outputDir, outputFileName);
        
        // Check if file already exists and skip if configured
        if (config.skipExisting) {
          try {
            await fs.access(outputPath);
            console.log(`  ⏭️  Skipping ${outputFileName} (already exists)`);
            continue;
          } catch (error) {
            // File doesn't exist, proceed with optimization
          }
        }
        
        const result = await optimizeImage(imagePath, outputPath, {
          width: size,
          format,
          quality: config.quality
        });
        
        if (result) {
          results.push({
            size: sizeName,
            format,
            ...result
          });
          
          const optimizedStats = await fs.stat(outputPath);
          totalOptimizedSize += optimizedStats.size;
          
          console.log(`  ✅ ${outputFileName}: ${result.original} → ${result.optimized} (${result.savings} smaller)`);
        }
      }
    }
    
    // Also create original format optimized version
    const originalFormat = ext.replace('.', '');
    const outputFileName = `${fileName}-optimized.${originalFormat}`;
    const outputPath = path.join(config.outputDir, outputFileName);
    
    if (!config.skipExisting || !(await fs.access(outputPath).catch(() => false))) {
      const result = await optimizeImage(imagePath, outputPath, {
        format: originalFormat,
        quality: config.quality
      });
      
      if (result) {
        const optimizedStats = await fs.stat(outputPath);
        totalOptimizedSize += optimizedStats.size;
        
        console.log(`  ✅ ${outputFileName}: ${result.original} → ${result.optimized} (${result.savings} smaller)`);
      }
    }
    
    processedCount++;
    console.log('');
  }
  
  // Summary
  console.log('📊 Optimization Summary:');
  console.log('========================');
  console.log(`Total images processed: ${processedCount}`);
  console.log(`Total images skipped: ${skippedCount}`);
  console.log(`Original total size: ${formatFileSize(totalOriginalSize)}`);
  console.log(`Optimized total size: ${formatFileSize(totalOptimizedSize)}`);
  
  if (totalOriginalSize > 0) {
    const totalSavings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
    console.log(`Total space saved: ${formatFileSize(totalOriginalSize - totalOptimizedSize)} (${totalSavings}%)`);
  }
  
  console.log(`\nOptimized images saved to: ${config.outputDir}`);
  console.log('\n🎉 Image optimization complete!');
}

// Generate responsive image component
async function generateResponsiveImageComponent() {
  const componentCode = `import React from 'react';

const ResponsiveImage = ({ 
  src, 
  alt, 
  className = '', 
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props 
}) => {
  const baseName = src.replace(/\\.[^/.]+$/, '');
  
  return (
    <picture>
      {/* AVIF format - best compression */}
      <source
        srcSet={\`\${baseName}-small.avif 300w, \${baseName}-medium.avif 600w, \${baseName}-large.avif 1200w, \${baseName}-xlarge.avif 1920w\`}
        type="image/avif"
        sizes={sizes}
      />
      
      {/* WebP format - good compression, wide support */}
      <source
        srcSet={\`\${baseName}-small.webp 300w, \${baseName}-medium.webp 600w, \${baseName}-large.webp 1200w, \${baseName}-xlarge.webp 1920w\`}
        type="image/webp"
        sizes={sizes}
      />
      
      {/* Fallback to original format */}
      <img
        src={\`\${baseName}-optimized\${src.match(/\\.[^/.]+$/)[0]}\`}
        alt={alt}
        className={className}
        loading="lazy"
        sizes={sizes}
        {...props}
      />
    </picture>
  );
};

export default ResponsiveImage;
`;

  try {
    await fs.writeFile('src/components/ui/ResponsiveImage.jsx', componentCode);
    console.log('✅ Generated ResponsiveImage component');
  } catch (error) {
    console.error('Error generating ResponsiveImage component:', error.message);
  }
}

// Main execution
async function main() {
  try {
    await processImages();
    await generateResponsiveImageComponent();
  } catch (error) {
    console.error('Error during image optimization:', error.message);
    process.exit(1);
  }
}

// Run if called directly
main(); 