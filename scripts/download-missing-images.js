import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Missing images with their Unsplash URLs
const missingImages = [
  {
    filename: 'hero-section.jpg',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=800&fit=crop',
    description: 'Main homepage hero image'
  },
  {
    filename: 'about-section.jpg',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1200&h=800&fit=crop',
    description: 'About page section image'
  },
  {
    filename: 'blog-engagement.jpg',
    url: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&h=800&fit=crop',
    description: 'Blog engagement article image'
  },
  {
    filename: 'blog-ai.jpg',
    url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=1200&h=800&fit=crop',
    description: 'Blog AI article image'
  },
  {
    filename: 'service-detail.jpg',
    url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=800&fit=crop',
    description: 'Service detail page image'
  },
  {
    filename: 'consultation.jpg',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
    description: 'Consultation section image'
  },
  {
    filename: 'team-profile.jpg',
    url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1200&h=800&fit=crop',
    description: 'Team profile section image'
  },
  {
    filename: 'before-after.jpg',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=800&fit=crop',
    description: 'Before/after comparison image'
  }
];

// Function to download image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file if download failed
      reject(err);
    });
  });
}

// Main function to download all missing images
async function downloadMissingImages() {
  const imagesDir = path.resolve(__dirname, '../public/assets/images');
  
  // Create images directory if it doesn't exist
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log('✅ Created images directory:', imagesDir);
  }

  console.log('🖼️  Starting download of 8 missing images...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const image of missingImages) {
    const filepath = path.join(imagesDir, image.filename);
    
    try {
      console.log(`📥 Downloading: ${image.filename} (${image.description})`);
      await downloadImage(image.url, filepath);
      
      // Check file size to ensure download was successful
      const stats = fs.statSync(filepath);
      if (stats.size > 0) {
        console.log(`✅ Successfully downloaded: ${image.filename} (${(stats.size / 1024).toFixed(1)} KB)`);
        successCount++;
      } else {
        throw new Error('Downloaded file is empty');
      }
    } catch (error) {
      console.log(`❌ Failed to download ${image.filename}: ${error.message}`);
      errorCount++;
    }
    
    console.log(''); // Empty line for readability
  }

  console.log('📊 Download Summary:');
  console.log(`✅ Successfully downloaded: ${successCount} images`);
  console.log(`❌ Failed downloads: ${errorCount} images`);
  
  if (successCount === missingImages.length) {
    console.log('\n🎉 All missing images have been successfully downloaded!');
    console.log('📍 Location: public/assets/images/');
  } else {
    console.log('\n⚠️  Some images failed to download. Please check the errors above.');
  }
}

// Run the download
downloadMissingImages().catch(console.error); 