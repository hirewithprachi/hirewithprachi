import React from 'react';

export const LoadingSpinner = ({ size = 'md', color = 'primary', text = 'Loading...' }) => (
  <div className={`flex flex-col items-center justify-center p-4`}>
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-${color}-500`} 
         style={{
           width: size === 'sm' ? '1rem' : size === 'lg' ? '2rem' : '1.5rem',
           height: size === 'sm' ? '1rem' : size === 'lg' ? '2rem' : '1.5rem'
         }}>
    </div>
    {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
  </div>
);

export const Skeleton = ({ className = '', lines = 1 }) => (
  <div className={`animate-pulse ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className="h-4 bg-gray-200 rounded mb-2"></div>
    ))}
  </div>
);

export default LoadingSpinner; 