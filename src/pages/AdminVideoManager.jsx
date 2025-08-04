import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Edit, Trash2, Plus, Eye, Link as LinkIcon } from 'lucide-react';
import { servicesData } from '../data/servicesData';

const AdminVideoManager = () => {
  const [videoData, setVideoData] = useState({});
  const [editingService, setEditingService] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Load video data from localStorage or use defaults
  useEffect(() => {
    const savedVideoData = localStorage.getItem('serviceVideos');
    if (savedVideoData) {
      setVideoData(JSON.parse(savedVideoData));
    } else {
      // Initialize with default video URLs for all services
      const defaultVideos = {};
      servicesData.services.forEach(service => {
        defaultVideos[service.id] = {
          videoUrl: '',
          title: `${service.title} Service Overview`,
          description: `Learn more about our ${service.title.toLowerCase()} services and how we can help your business.`,
          isActive: false
        };
      });
      setVideoData(defaultVideos);
    }
  }, []);

  const handleSave = async (serviceId) => {
    setIsLoading(true);
    try {
      // Save to localStorage (in production, this would be saved to database)
      localStorage.setItem('serviceVideos', JSON.stringify(videoData));
      setMessage('Video data saved successfully!');
      setEditingService(null);
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving video data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (serviceId) => {
    setEditingService(serviceId);
  };

  const handleCancel = () => {
    setEditingService(null);
    // Reload original data
    const savedVideoData = localStorage.getItem('serviceVideos');
    if (savedVideoData) {
      setVideoData(JSON.parse(savedVideoData));
    }
  };

  const updateVideoData = (serviceId, field, value) => {
    setVideoData(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        [field]: value
      }
    }));
  };

  const validateYouTubeUrl = (url) => {
    if (!url) return true; // Allow empty URLs
    const patterns = [
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)[^&\n?#]+/,
      /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?.*v=[^&\n?#]+/
    ];
    return patterns.some(pattern => pattern.test(url));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Service Video Manager</h1>
          <p className="text-gray-600">Manage video content for all service pages. Add YouTube video URLs to enhance user engagement.</p>
        </div>

        {/* Success/Error Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg mb-6 ${
              message.includes('Error') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'
            }`}
          >
            {message}
          </motion.div>
        )}

        {/* Video Management Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {servicesData.services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              {/* Service Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{service.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.category}</p>
                </div>
              </div>

              {/* Video Status */}
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${videoData[service.id]?.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm text-gray-600">
                    {videoData[service.id]?.isActive ? 'Video Active' : 'No Video Set'}
                  </span>
                </div>
              </div>

              {editingService === service.id ? (
                /* Edit Mode */
                <div className="space-y-4">
                  {/* Video URL Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      YouTube Video URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={videoData[service.id]?.videoUrl || ''}
                        onChange={(e) => updateVideoData(service.id, 'videoUrl', e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => updateVideoData(service.id, 'isActive', !videoData[service.id]?.isActive)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium ${
                          videoData[service.id]?.isActive
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {videoData[service.id]?.isActive ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                    {videoData[service.id]?.videoUrl && !validateYouTubeUrl(videoData[service.id]?.videoUrl) && (
                      <p className="text-red-600 text-sm mt-1">Please enter a valid YouTube URL</p>
                    )}
                  </div>

                  {/* Video Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Video Title
                    </label>
                    <input
                      type="text"
                      value={videoData[service.id]?.title || ''}
                      onChange={(e) => updateVideoData(service.id, 'title', e.target.value)}
                      placeholder="Service Overview Video"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Video Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Video Description
                    </label>
                    <textarea
                      value={videoData[service.id]?.description || ''}
                      onChange={(e) => updateVideoData(service.id, 'description', e.target.value)}
                      placeholder="Brief description of the video content..."
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleSave(service.id)}
                      disabled={isLoading}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      {isLoading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div className="space-y-4">
                  {/* Current Video Info */}
                  {videoData[service.id]?.videoUrl && videoData[service.id]?.isActive ? (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <LinkIcon className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Current Video</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{videoData[service.id].videoUrl}</p>
                      <p className="text-sm text-gray-500 mt-1">{videoData[service.id].title}</p>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 rounded-lg p-3">
                      <p className="text-sm text-yellow-700">No video configured for this service</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(service.id)}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    >
                      <Edit className="w-4 h-4" />
                      {videoData[service.id]?.videoUrl ? 'Edit Video' : 'Add Video'}
                    </button>
                    {videoData[service.id]?.videoUrl && (
                      <a
                        href={videoData[service.id].videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </a>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">📹 Video Management Instructions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h4 className="font-medium mb-2">Supported Video Formats:</h4>
              <ul className="space-y-1">
                <li>• YouTube watch URLs (youtube.com/watch?v=...)</li>
                <li>• YouTube short URLs (youtu.be/...)</li>
                <li>• YouTube embed URLs (youtube.com/embed/...)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices:</h4>
              <ul className="space-y-1">
                <li>• Use videos 2-5 minutes long</li>
                <li>• Ensure high-quality audio and video</li>
                <li>• Include clear service explanations</li>
                <li>• Add captions for accessibility</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminVideoManager; 