import React, { useState } from 'react';
import ResponsiveImage from './ui/ResponsiveImage';

export default function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = '/fallback-image.jpg',
  ...props 
}) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    if (!hasError) {
      setImageSrc(fallbackSrc);
      setHasError(true);
    }
    setIsLoading(false);
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded"></div>
      )}
      <ResponsiveImage src={imageSrc} alt={alt} className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'}`} />
    </div>
  );
}