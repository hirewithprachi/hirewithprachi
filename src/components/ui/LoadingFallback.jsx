import React from 'react';

const LoadingFallback = ({ minimal = false }) => {
  if (minimal) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full border-2 border-gray-300 border-t-primary-600 w-6 h-6"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full border-2 border-gray-300 border-t-primary-600 w-8 h-8 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingFallback;