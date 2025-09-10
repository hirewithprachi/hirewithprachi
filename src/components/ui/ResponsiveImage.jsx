import React from 'react';

const ResponsiveImage = ({ 
  src, 
  alt, 
  className = '', 
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props 
}) => {
  // Handle null or undefined src
  if (!src) {
    return (
      <img
        src="/fallback-image.jpg"
        alt={alt || 'Image not available'}
        className={className}
        loading="lazy"
        {...props}
      />
    );
  }
  
  // Check if the image is an SVG - SVGs don't need optimization
  if (src.toLowerCase().endsWith('.svg')) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        {...props}
      />
    );
  }
  
  // Safe extraction of file extension and base name for non-SVG images
  const baseName = src.replace(/\.[^/.]+$/, '');
  const fileExtension = src.match(/\.[^/.]+$/);
  const extension = fileExtension ? fileExtension[0] : '.jpg';
  
  // Extract filename from path for optimized images
  const filename = baseName.split('/').pop();
  const pathPrefix = baseName.substring(0, baseName.lastIndexOf('/'));
  const optimizedBasePath = `${pathPrefix}/optimized/${filename}`;
  
  return (
    <picture>
      {/* AVIF format - best compression */}
      <source
        srcSet={`${optimizedBasePath}-small.avif 300w, ${optimizedBasePath}-medium.avif 600w, ${optimizedBasePath}-large.avif 1200w, ${optimizedBasePath}-xlarge.avif 1920w`}
        type="image/avif"
        sizes={sizes}
      />
      
      {/* WebP format - good compression, wide support */}
      <source
        srcSet={`${optimizedBasePath}-small.webp 300w, ${optimizedBasePath}-medium.webp 600w, ${optimizedBasePath}-large.webp 1200w, ${optimizedBasePath}-xlarge.webp 1920w`}
        type="image/webp"
        sizes={sizes}
      />
      
      {/* Fallback to original format */}
      <img
        src={`${optimizedBasePath}-optimized${extension}`}
        alt={alt}
        className={className}
        loading="lazy"
        sizes={sizes}
        onError={(e) => {
          // If optimized image fails to load, fallback to original
          e.target.src = src;
        }}
        {...props}
      />
    </picture>
  );
};

export default ResponsiveImage;
