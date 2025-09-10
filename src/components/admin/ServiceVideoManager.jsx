import React, { useState, useEffect } from 'react';
import ResponsiveImage from '../ui/ResponsiveImage';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { 
  Video, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Save, 
  X, 
  ExternalLink,
  Upload,
  Search,
  Filter,
  Grid,
  List,
  Play,
  Pause,
  Settings,
  Download,
  Share,
  BarChart3,
  Users,
  Clock,
  Calendar,
  MapPin,
  Tag,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';

// Service pages configuration
const servicePages = [
  { id: 'virtual-hr-management', name: 'Virtual HR Management', path: '/services/virtual-hr-management' },
  { id: 'hr-compliance', name: 'HR Compliance', path: '/services/hr-compliance' },
  { id: 'payroll-management', name: 'Payroll Management', path: '/services/payroll-management' },
  { id: 'recruitment-service', name: 'Recruitment Service', path: '/services/recruitment-service' },
  { id: 'performance-management', name: 'Performance Management', path: '/services/performance-management' },
  { id: 'employee-engagement', name: 'Employee Engagement', path: '/services/employee-engagement' },
  
  { id: 'mumbai', name: 'HR Services Mumbai', path: '/services/hr-services-mumbai' },
  { id: 'delhi', name: 'HR Services Delhi', path: '/services/hr-services-delhi' },
  { id: 'bangalore', name: 'HR Services Bangalore', path: '/services/hr-services-bangalore' },
  { id: 'hyderabad', name: 'HR Services Hyderabad', path: '/services/hr-services-hyderabad' },
  { id: 'chennai', name: 'HR Services Chennai', path: '/services/hr-services-chennai' },
  { id: 'pune', name: 'HR Services Pune', path: '/services/hr-services-pune' },
  { id: 'kolkata', name: 'HR Services Kolkata', path: '/services/hr-services-kolkata' },
  { id: 'ahmedabad', name: 'HR Services Ahmedabad', path: '/services/hr-services-ahmedabad' },
  { id: 'jaipur', name: 'HR Services Jaipur', path: '/services/hr-services-jaipur' },
  { id: 'lucknow', name: 'HR Services Lucknow', path: '/services/hr-services-lucknow' },
  { id: 'indore', name: 'HR Services Indore', path: '/services/hr-services-indore' },
  { id: 'nagpur', name: 'HR Services Nagpur', path: '/services/hr-services-nagpur' },
  { id: 'bhubaneswar', name: 'HR Services Bhubaneswar', path: '/services/hr-services-bhubaneswar' },
  { id: 'coimbatore', name: 'HR Services Coimbatore', path: '/services/hr-services-coimbatore' }
];

const ServiceVideoManager = ({ onClose, addNotification }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterService, setFilterService] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [formData, setFormData] = useState({
    service_id: '',
    title: '',
    description: '',
    video_url: '',
    thumbnail_url: '',
    duration: '',
    is_active: true,
    service_category: '',
    tags: '',
    created_by: ''
  });

  // Load videos from database and localStorage
  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      
      // Load from database
      const { data: dbVideos, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Load from localStorage
      const localVideos = getLocalStorageVideos();
      
      // Merge database and localStorage videos
      const mergedVideos = mergeVideos(dbVideos || [], localVideos);
      setVideos(mergedVideos);
      
    } catch (error) {
      console.error('Error loading videos:', error);
      addNotification('Failed to load videos', 'error');
      
      // Fallback to localStorage only
      const localVideos = getLocalStorageVideos();
      setVideos(localVideos);
    } finally {
      setLoading(false);
    }
  };

  const getLocalStorageVideos = () => {
    try {
      const savedVideoData = localStorage.getItem('serviceVideos');
      if (savedVideoData) {
        const videoData = JSON.parse(savedVideoData);
        return Object.entries(videoData).map(([serviceId, video]) => ({
          id: `local_${serviceId}`,
          service_id: serviceId,
          title: video.title || '',
          description: video.description || '',
          video_url: video.videoUrl || video.video_url || '',
          thumbnail_url: video.thumbnailUrl || video.thumbnail_url || '',
          is_active: video.isActive !== false,
          created_at: video.createdAt || new Date().toISOString(),
          source: 'localStorage'
        }));
      }
    } catch (error) {
      console.error('Error reading localStorage videos:', error);
    }
    return [];
  };

  const mergeVideos = (dbVideos, localVideos) => {
    const merged = [...dbVideos];
    
    // Add localStorage videos that don't exist in database
    localVideos.forEach(localVideo => {
      const existsInDb = dbVideos.some(dbVideo => 
        dbVideo.service_id === localVideo.service_id
      );
      if (!existsInDb) {
        merged.push(localVideo);
      }
    });
    
    return merged;
  };

  const saveToLocalStorage = (videoData) => {
    try {
      const currentData = JSON.parse(localStorage.getItem('serviceVideos') || '{}');
      currentData[videoData.service_id] = {
        title: videoData.title,
        description: videoData.description,
        videoUrl: videoData.video_url,
        thumbnailUrl: videoData.thumbnail_url,
        isActive: videoData.is_active,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('serviceVideos', JSON.stringify(currentData));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  const handleCreateVideo = async (videoData) => {
    try {
      // Save to database
      const { data, error } = await supabase
        .from('videos')
        .insert([{
          ...videoData,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      // Also save to localStorage for service page integration
      saveToLocalStorage(videoData);

      setVideos(prev => [data, ...prev]);
      addNotification('Video created successfully', 'success');
      closeModal();
      
    } catch (error) {
      console.error('Error creating video:', error);
      
      // Fallback: save to localStorage only
      const localVideo = {
        id: `local_${videoData.service_id}_${Date.now()}`,
        ...videoData,
        created_at: new Date().toISOString(),
        source: 'localStorage'
      };
      
      saveToLocalStorage(videoData);
      setVideos(prev => [localVideo, ...prev]);
      addNotification('Video saved locally (database unavailable)', 'warning');
      closeModal();
    }
  };

  const handleUpdateVideo = async (videoId, updates) => {
    try {
      if (videoId.startsWith('local_')) {
        // Update localStorage video
        const serviceId = updates.service_id || selectedVideo.service_id;
        saveToLocalStorage({ ...selectedVideo, ...updates });
        
        setVideos(prev => prev.map(video => 
          video.id === videoId ? { ...video, ...updates } : video
        ));
        addNotification('Video updated locally', 'success');
      } else {
        // Update database video
        const { data, error } = await supabase
          .from('videos')
          .update(updates)
          .eq('id', videoId)
          .select()
          .single();

        if (error) throw error;

        // Also update localStorage
        saveToLocalStorage({ ...data });

        setVideos(prev => prev.map(video => 
          video.id === videoId ? data : video
        ));
        addNotification('Video updated successfully', 'success');
      }
      
      closeModal();
    } catch (error) {
      console.error('Error updating video:', error);
      addNotification('Failed to update video', 'error');
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    try {
      if (videoId.startsWith('local_')) {
        // Remove from localStorage
        const video = videos.find(v => v.id === videoId);
        if (video) {
          const currentData = JSON.parse(localStorage.getItem('serviceVideos') || '{}');
          delete currentData[video.service_id];
          localStorage.setItem('serviceVideos', JSON.stringify(currentData));
        }
        
        setVideos(prev => prev.filter(video => video.id !== videoId));
        addNotification('Video removed from localStorage', 'success');
      } else {
        // Delete from database
        const { error } = await supabase
          .from('videos')
          .delete()
          .eq('id', videoId);

        if (error) throw error;

        setVideos(prev => prev.filter(video => video.id !== videoId));
        addNotification('Video deleted successfully', 'success');
      }
    } catch (error) {
      console.error('Error deleting video:', error);
      addNotification('Failed to delete video', 'error');
    }
  };

  const openModal = (type, video = null) => {
    setModalType(type);
    setSelectedVideo(video);
    if (video) {
      setFormData({
        service_id: video.service_id || '',
        title: video.title || '',
        description: video.description || '',
        video_url: video.video_url || '',
        thumbnail_url: video.thumbnail_url || '',
        duration: video.duration || '',
        is_active: video.is_active !== false,
        service_category: video.service_category || '',
        tags: Array.isArray(video.tags) ? video.tags.join(', ') : (video.tags || ''),
        created_by: video.created_by || ''
      });
    } else {
      setFormData({
        service_id: '',
        title: '',
        description: '',
        video_url: '',
        thumbnail_url: '',
        duration: '',
        is_active: true,
        service_category: '',
        tags: '',
        created_by: ''
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedVideo(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const processedData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    if (modalType === 'create') {
      await handleCreateVideo(processedData);
    } else if (modalType === 'edit') {
      await handleUpdateVideo(selectedVideo.id, processedData);
    }
  };

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterService || video.service_id === filterService;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading videos...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Service Video Manager</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage videos for all service pages</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => openModal('create')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Video</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Services</option>
              {servicePages.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Videos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{videos.length}</p>
            </div>
            <Video className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Videos</p>
              <p className="text-2xl font-bold text-green-600">{videos.filter(v => v.is_active).length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Services Covered</p>
              <p className="text-2xl font-bold text-purple-600">
                {new Set(videos.map(v => v.service_id)).size}
              </p>
            </div>
            <MapPin className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Local Storage</p>
              <p className="text-2xl font-bold text-orange-600">
                {videos.filter(v => v.source === 'localStorage').length}
              </p>
            </div>
            <Download className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Videos Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredVideos.map(video => (
          <VideoCard
            key={video.id}
            video={video}
            viewMode={viewMode}
            onEdit={() => openModal('edit', video)}
            onDelete={() => handleDeleteVideo(video.id)}
            servicePages={servicePages}
          />
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No videos found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchTerm || filterService ? 'Try adjusting your filters' : 'Create your first service video'}
          </p>
          <button
            onClick={() => openModal('create')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Add Video
          </button>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <VideoModal
            type={modalType}
            video={selectedVideo}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onClose={closeModal}
            servicePages={servicePages}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const VideoCard = ({ video, viewMode, onEdit, onDelete, servicePages }) => {
  const servicePage = servicePages.find(s => s.id === video.service_id);
  const serviceName = servicePage?.name || video.service_id;

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="w-16 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              {video.thumbnail_url ? (
                <ResponsiveImage src={video.thumbnail_url} alt="" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <Video className="w-6 h-6 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-white">{video.title || 'Untitled'}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{serviceName}</p>
              <div className="flex items-center space-x-4 mt-1">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                  video.is_active 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {video.is_active ? 'Active' : 'Inactive'}
                </span>
                {video.source === 'localStorage' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                    Local Storage
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            {video.video_url && (
              <a
                href={video.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-green-600 transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 overflow-hidden"
    >
      <div className="aspect-video bg-gray-100 dark:bg-gray-700 relative">
        {video.thumbnail_url ? (
          <ResponsiveImage src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Video className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
          {video.video_url && (
            <a
              href={video.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-0 hover:opacity-100 transition-opacity duration-200"
            >
              <Play className="w-12 h-12 text-white" />
            </a>
          )}
        </div>
        <div className="absolute top-2 right-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
            video.is_active 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {video.is_active ? 'Active' : 'Inactive'}
          </span>
        </div>
        {video.source === 'localStorage' && (
          <div className="absolute top-2 left-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
              Local
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2">
            {video.title || 'Untitled Video'}
          </h3>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{serviceName}</p>
        
        {video.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
            {video.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(video.created_at).toLocaleDateString()}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onEdit}
              className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors duration-200"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 text-gray-400 hover:text-red-600 transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const VideoModal = ({ type, video, formData, setFormData, onSubmit, onClose, servicePages }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {type === 'create' ? 'Add Service Video' : 'Edit Service Video'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Service Page *
              </label>
              <select
                required
                value={formData.service_id}
                onChange={(e) => setFormData(prev => ({ ...prev, service_id: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Service Page</option>
                {servicePages.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Video Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter video title"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Video URL *
            </label>
            <input
              type="url"
              required
              value={formData.video_url}
              onChange={(e) => setFormData(prev => ({ ...prev, video_url: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="https://example.com/video.mp4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Thumbnail URL
            </label>
            <input
              type="url"
              value={formData.thumbnail_url}
              onChange={(e) => setFormData(prev => ({ ...prev, thumbnail_url: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="https://example.com/thumbnail.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Enter video description..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration (optional)
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="e.g., 3:45"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Service Category
              </label>
              <select
                value={formData.service_category}
                onChange={(e) => setFormData(prev => ({ ...prev, service_category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Category</option>
                <option value="HR Compliance">HR Compliance</option>
                <option value="Recruitment">Recruitment</option>
                <option value="Employee Engagement">Employee Engagement</option>
                <option value="Performance Management">Performance Management</option>
                <option value="Payroll Management">Payroll Management</option>
                <option value="Virtual HR">Virtual HR</option>
                <option value="City Services">City Services</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="HR, Compliance, Management, etc."
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="is_active" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Active (visible on service page)
            </label>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
            >
              {loading && <Loader className="w-4 h-4 animate-spin" />}
              <span>{loading ? 'Saving...' : type === 'create' ? 'Create Video' : 'Update Video'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ServiceVideoManager;
