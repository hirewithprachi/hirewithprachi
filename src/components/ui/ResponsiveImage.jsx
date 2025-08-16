import React from 'react';

const ResponsiveImage = ({ 
  src, 
  alt, 
  className = '', 
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props 
}) => {
  const baseName = src.replace(/\.[^/.]+$/, '');
  
  return (
    <picture>
      {/* AVIF format - best compression */}
      <source
        srcSet={`${baseName}-small.avif 300w, ${baseName}-medium.avif 600w, ${baseName}-large.avif 1200w, ${baseName}-xlarge.avif 1920w`}
        type="image/avif"
        sizes={sizes}
      />
      
      {/* WebP format - good compression, wide support */}
      <source
        srcSet={`${baseName}-small.webp 300w, ${baseName}-medium.webp 600w, ${baseName}-large.webp 1200w, ${baseName}-xlarge.webp 1920w`}
        type="image/webp"
        sizes={sizes}
      />
      
      {/* Fallback to original format */}
      <img
        src={`${baseName}-optimized${src.match(/\.[^/.]+$/)[0]}`}
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
