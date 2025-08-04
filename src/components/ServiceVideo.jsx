import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, AlertCircle } from 'lucide-react';

const ServiceVideo = ({ serviceId, videoUrl, title, description }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [videoError, setVideoError] = useState(false);

  // Default video URL if none provided
  const defaultVideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"; // Replace with your default video
  const finalVideoUrl = videoUrl || defaultVideoUrl;

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return defaultVideoUrl;
    
    try {
      // Handle different YouTube URL formats
      const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/watch\?.*v=([^&\n?#]+)/
      ];
      
      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
          return `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1&showinfo=0`;
        }
      }
      
      // If it's already an embed URL, return as is
      if (url.includes('youtube.com/embed/')) {
        return url;
      }
      
      return defaultVideoUrl;
    } catch (error) {
      console.error('Error parsing YouTube URL:', error);
      return defaultVideoUrl;
    }
  };

  const embedUrl = getYouTubeEmbedUrl(finalVideoUrl);

  // Handle iframe load error
  const handleIframeError = () => {
    setVideoError(true);
    console.error('Video failed to load:', embedUrl);
  };

  // Handle iframe load success
  const handleIframeLoad = () => {
    setVideoError(false);
    console.log('Video loaded successfully:', embedUrl);
  };

  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden">
      <div className="relative">
        {/* Video Container */}
        <div className="aspect-video relative bg-gray-900">
          {!videoError ? (
            <iframe
              src={embedUrl}
              title={`${title} - Service Overview`}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              onError={handleIframeError}
              onLoad={handleIframeLoad}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <div className="text-center text-white">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
                <p className="text-lg font-semibold mb-2">Video Unavailable</p>
                <p className="text-sm text-gray-300">The video could not be loaded. Please try again later.</p>
              </div>
            </div>
          )}
          
          {/* Video Overlay with Play Button */}
          {!isPlaying && !videoError && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(true)}
                className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 transition-all duration-300 transform hover:scale-110"
              >
                <Play className="w-8 h-8 text-gray-900 ml-1" />
              </button>
            </div>
          )}
        </div>
        
        {/* Video Controls */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {title || `${serviceId} Service Overview`}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            {description || "Watch this video to learn more about our professional HR services and how we can help your business grow."}
          </p>
          
          {/* Video Features */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>⏱️ 2-3 min</span>
            <span>📺 HD Quality</span>
            <span>🔊 Audio Available</span>
            {videoUrl && (
              <span className="text-green-600">✅ Custom Video</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceVideo; 