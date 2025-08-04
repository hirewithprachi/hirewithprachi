import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to recursively find all image files
function findImageFiles(dir, extensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif']) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory()) {
      results = results.concat(findImageFiles(filePath, extensions));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (extensions.includes(ext)) {
        results.push(filePath);
      }
    }
  });
  
  return results;
}

// Function to optimize a single image
async function optimizeImage(inputPath, outputPath, options = {}) {
  const {
    quality = 80,
    format = 'webp',
    width = null,
    height = null
  } = options;

  try {
    let pipeline = sharp(inputPath);
    
    // Resize if dimensions are specified
    if (width || height) {
      pipeline = pipeline.resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    // Convert format and set quality
    if (format === 'webp') {
      pipeline = pipeline.webp({ quality });
    } else if (format === 'jpeg') {
      pipeline = pipeline.jpeg({ quality });
    } else if (format === 'png') {
      pipeline = pipeline.png({ quality });
    }
    
    await pipeline.toFile(outputPath);
    console.log(`✅ Optimized: ${inputPath} -> ${outputPath}`);
    
    // Get file sizes for comparison
    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`📊 Size reduction: ${(originalSize / 1024).toFixed(1)}KB -> ${(optimizedSize / 1024).toFixed(1)}KB (${savings}% smaller)`);
    
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
  }
}

// Main optimization function
async function optimizeAllImages() {
  const publicDir = path.join(__dirname, '..', 'public');
  const imageFiles = findImageFiles(publicDir);
  
  console.log(`🔍 Found ${imageFiles.length} images to optimize`);
  
  for (const imagePath of imageFiles) {
    const relativePath = path.relative(publicDir, imagePath);
    const ext = path.extname(imagePath);
    const nameWithoutExt = path.basename(imagePath, ext);
    const dir = path.dirname(imagePath);
    
    // Create optimized version
    const optimizedPath = path.join(dir, `${nameWithoutExt}.webp`);
    
    // Skip if already optimized
    if (fs.existsSync(optimizedPath)) {
      console.log(`⏭️  Already optimized: ${relativePath}`);
      continue;
    }
    
    await optimizeImage(imagePath, optimizedPath, {
      quality: 80,
      format: 'webp',
      width: 1200 // Max width for responsive images
    });
  }
  
  console.log('🎉 Image optimization complete!');
}

// Run the optimization
optimizeAllImages().catch(console.error); 