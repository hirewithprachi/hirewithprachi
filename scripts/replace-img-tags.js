import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  srcDir: 'src',
  extensions: ['.jsx', '.js', '.tsx', '.ts'],
  excludeDirs: ['node_modules', 'dist', 'build', '.git'],
  dryRun: false // Set to true to see changes without applying them
};

// Regular expression to match img tags
const imgTagRegex = /<img\s+([^>]*)\s*\/?>(?:<\/img>)?/g;
const srcAttributeRegex = /src=['"]([^'"]*)['"]|src=\{([^}]*)\}/;
const altAttributeRegex = /alt=['"]([^'"]*)['"]|alt=\{([^}]*)\}/;
const classAttributeRegex = /className=['"]([^'"]*)['"]|className=\{([^}]*)\}/;
const loadingAttributeRegex = /loading=['"]([^'"]*)['"]|loading=\{([^}]*)\}/;
const widthAttributeRegex = /width=['"]([^'"]*)['"]|width=\{([^}]*)\}/;
const heightAttributeRegex = /height=['"]([^'"]*)['"]|height=\{([^}]*)\}/;
const sizesAttributeRegex = /sizes=['"]([^'"]*)['"]|sizes=\{([^}]*)\}/;

// Function to extract attribute value
function extractAttribute(attributeRegex, imgTag) {
  const match = imgTag.match(attributeRegex);
  if (!match) return null;
  
  // Check if it's a string literal or JSX expression
  if (match[1] !== undefined) {
    return { type: 'string', value: match[1] };
  } else if (match[2] !== undefined) {
    return { type: 'expression', value: match[2] };
  }
  return null;
}

// Function to check if the image is from an external source
function isExternalImage(src) {
  if (!src) return false;
  return src.startsWith('http') || src.startsWith('https');
}

// Function to convert img tag to ResponsiveImage component
function convertToResponsiveImage(imgTag) {
  const src = extractAttribute(srcAttributeRegex, imgTag);
  const alt = extractAttribute(altAttributeRegex, imgTag);
  const className = extractAttribute(classAttributeRegex, imgTag);
  const loading = extractAttribute(loadingAttributeRegex, imgTag);
  const width = extractAttribute(widthAttributeRegex, imgTag);
  const height = extractAttribute(heightAttributeRegex, imgTag);
  const sizes = extractAttribute(sizesAttributeRegex, imgTag);
  
  // Skip external images or if src is missing
  if (!src || isExternalImage(src.value)) {
    return null;
  }
  
  // Build the ResponsiveImage component
  let responsiveImage = '<ResponsiveImage';
  
  // Add src attribute
  if (src.type === 'string') {
    responsiveImage += ` src="${src.value}"`;
  } else {
    responsiveImage += ` src={${src.value}}`;
  }
  
  // Add alt attribute
  if (alt) {
    if (alt.type === 'string') {
      responsiveImage += ` alt="${alt.value}"`;
    } else {
      responsiveImage += ` alt={${alt.value}}`;
    }
  } else {
    responsiveImage += ` alt=""`;
  }
  
  // Add className attribute
  if (className) {
    if (className.type === 'string') {
      responsiveImage += ` className="${className.value}"`;
    } else {
      responsiveImage += ` className={${className.value}}`;
    }
  }
  
  // Add sizes attribute if present
  if (sizes) {
    if (sizes.type === 'string') {
      responsiveImage += ` sizes="${sizes.value}"`;
    } else {
      responsiveImage += ` sizes={${sizes.value}}`;
    }
  }
  
  // Add any other attributes as props
  responsiveImage += ' />';
  
  return responsiveImage;
}

// Function to check if ResponsiveImage is already imported
function checkForResponsiveImageImport(fileContent) {
  const importRegex = /import\s+ResponsiveImage\s+from\s+['"].*ResponsiveImage['"];?/;
  return importRegex.test(fileContent);
}

// Function to add ResponsiveImage import
function addResponsiveImageImport(fileContent) {
  // Check for React import to place our import after it
  const reactImportRegex = /import\s+.*\s+from\s+['"]react['"];?/;
  const reactImportMatch = fileContent.match(reactImportRegex);
  
  if (reactImportMatch) {
    const importStatement = "import ResponsiveImage from '../components/ui/ResponsiveImage';";
    return fileContent.replace(reactImportMatch[0], `${reactImportMatch[0]}\n${importStatement}`);
  }
  
  // If no React import, add at the beginning
  return `import ResponsiveImage from '../components/ui/ResponsiveImage';\n${fileContent}`;
}

// Process a single file
async function processFile(filePath) {
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    let modifiedContent = fileContent;
    let hasChanges = false;
    let imgTagsReplaced = 0;
    
    // Find all img tags
    const imgTags = fileContent.match(imgTagRegex);
    
    if (imgTags && imgTags.length > 0) {
      // Process each img tag
      for (const imgTag of imgTags) {
        const responsiveImage = convertToResponsiveImage(imgTag);
        
        // Skip if conversion is not applicable
        if (!responsiveImage) continue;
        
        // Replace the img tag with ResponsiveImage component
        modifiedContent = modifiedContent.replace(imgTag, responsiveImage);
        imgTagsReplaced++;
        hasChanges = true;
      }
      
      // Add import if changes were made and import doesn't exist
      if (hasChanges && !checkForResponsiveImageImport(modifiedContent)) {
        modifiedContent = addResponsiveImageImport(modifiedContent);
      }
      
      // Write changes to file if not in dry run mode
      if (hasChanges && !config.dryRun) {
        await fs.writeFile(filePath, modifiedContent, 'utf8');
        console.log(`✅ Updated ${filePath} - Replaced ${imgTagsReplaced} img tags`);
      } else if (hasChanges) {
        console.log(`🔍 Would update ${filePath} - Found ${imgTagsReplaced} img tags to replace`);
      }
    }
    
    return { filePath, hasChanges, imgTagsReplaced };
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return { filePath, hasChanges: false, imgTagsReplaced: 0, error: error.message };
  }
}

// Main function
async function main() {
  console.log('🚀 Starting img tag replacement...');
  console.log(`Mode: ${config.dryRun ? 'Dry Run (no changes will be made)' : 'Live Run'}\n`);
  
  // Get all files with specified extensions
  const files = [];
  
  for (const ext of config.extensions) {
    const pattern = `${config.srcDir}/**/*${ext}`;
    const matches = await glob(pattern, {
      ignore: config.excludeDirs.map(dir => `**/${dir}/**`)
    });
    files.push(...matches);
  }
  
  console.log(`Found ${files.length} files to process.\n`);
  
  // Process all files
  const results = [];
  
  for (const file of files) {
    const result = await processFile(file);
    results.push(result);
  }
  
  // Summary
  const changedFiles = results.filter(r => r.hasChanges);
  const totalImgTagsReplaced = results.reduce((sum, r) => sum + r.imgTagsReplaced, 0);
  const errors = results.filter(r => r.error);
  
  console.log('\n📊 Summary:');
  console.log('========================');
  console.log(`Total files processed: ${files.length}`);
  console.log(`Files with changes: ${changedFiles.length}`);
  console.log(`Total img tags replaced: ${totalImgTagsReplaced}`);
  console.log(`Errors: ${errors.length}`);
  
  if (config.dryRun) {
    console.log('\n⚠️ This was a dry run. No changes were made.');
    console.log('Set config.dryRun = false to apply changes.');
  }
  
  console.log('\n✅ Process completed!');
}

// Run the script
main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});