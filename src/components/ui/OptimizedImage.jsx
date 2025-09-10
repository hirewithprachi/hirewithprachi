import React, { useState, useEffect, useRef } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = null,
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YWFhYSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+',
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    // Set up intersection observer for lazy loading
    if (loading === 'lazy' && 'IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observerRef.current?.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '50px 0px', // Start loading 50px before the image comes into view
          threshold: 0.1
        }
      );

      if (imgRef.current) {
        observerRef.current.observe(imgRef.current);
      }
    } else {
      // Fallback for browsers without IntersectionObserver
      setIsInView(true);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading]);

  useEffect(() => {
    if (isInView) {
      setImageSrc(src);
      setIsLoading(true);
      setHasError(false);
    }
  }, [src, isInView]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    
    // Try fallback image if available
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  // Generate optimized image URL using optimized folder structure
  const getOptimizedSrc = (originalSrc) => {
    if (!originalSrc || originalSrc === placeholder) return originalSrc;
    
    // For external URLs, return as is
    if (originalSrc.startsWith('http')) {
      return originalSrc;
    }
    
    // For local images, use optimized folder structure
    try {
      const baseName = originalSrc.replace(/\.[^/.]+$/, '');
      const fileExtension = originalSrc.match(/\.[^/.]+$/);
      const extension = fileExtension ? fileExtension[0] : '.jpg';
      
      // Extract filename from path for optimized images
      const filename = baseName.split('/').pop();
      const pathPrefix = baseName.substring(0, baseName.lastIndexOf('/'));
      const optimizedPath = `${pathPrefix}/optimized/${filename}-optimized${extension}`;
      
      return optimizedPath;
    } catch (error) {
      return originalSrc;
    }
  };

  const optimizedSrc = getOptimizedSrc(imageSrc);

  return (
    <div className={`relative ${className}`} ref={imgRef}>
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
      )}
      
      {/* Main image with picture element for better optimization */}
      <picture>
        {/* Try WebP format first */}
        <source 
          srcSet={optimizedSrc.replace(/\.[^/.]+$/, '.webp')} 
          type="image/webp" 
        />
        {/* Try AVIF format */}
        <source 
          srcSet={optimizedSrc.replace(/\.[^/.]+$/, '.avif')} 
          type="image/avif" 
        />
        {/* Fallback to optimized original format */}
        <img 
          src={optimizedSrc} 
          alt={alt} 
          className={`${className}`} 
          sizes={sizes} 
          loading={loading} 
          onLoad={handleLoad} 
          onError={handleError} 
        />
      </picture>
      
      {/* Error fallback */}
      {hasError && fallbackSrc && (
        <img src={fallbackSrc} alt={alt} className={className} sizes={sizes} loading={loading} />
      )}
      
      {/* Error placeholder */}
      {hasError && !fallbackSrc && (
        <div className={`${className} bg-gray-100 flex items-center justify-center text-gray-500 text-sm`}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;