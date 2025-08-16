import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { downloadService } from '../../services/downloadService';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Star,
  X,
  Save,
  Loader,
  AlertCircle,
  CheckCircle,
  Crown,
  Sparkles,
  BarChart3,
  Users,
  Calendar,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import * as Lucide from 'lucide-react'

// Helper function to get category color classes
const getCategoryColorClass = (color) => {
  const colorMap = {
    blue: 'bg-blue-100 dark:bg-blue-900/20',
    green: 'bg-green-100 dark:bg-green-900/20',
    orange: 'bg-orange-100 dark:bg-orange-900/20',
    purple: 'bg-purple-100 dark:bg-purple-900/20',
    indigo: 'bg-indigo-100 dark:bg-indigo-900/20',
    pink: 'bg-pink-100 dark:bg-pink-900/20',
    emerald: 'bg-emerald-100 dark:bg-emerald-900/20',
    red: 'bg-red-100 dark:bg-red-900/20',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/20',
    cyan: 'bg-cyan-100 dark:bg-cyan-900/20'
  };
  return colorMap[color] || colorMap.blue;
};

const ResourceManager = ({ onClose, addNotification }) => {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [downloadStats, setDownloadStats] = useState(null);
  const [activeTab, setActiveTab] = useState('resources');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedResource, setSelectedResource] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    type: 'template',
    file_path: '',
    file_size_bytes: 0,
    mime_type: 'application/pdf',
    tags: [],
    is_featured: false,
    is_premium: false,
    requires_lead_capture: true,
    ai_summary: '',
    preview_image_url: ''
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      const [resourcesResult, categoriesResult, statsResult] = await Promise.all([
        downloadService.getResources(),
        downloadService.getCategories(),
        downloadService.getDownloadStats()
      ]);

      if (resourcesResult.success) {
        setResources(resourcesResult.data);
      }

      if (categoriesResult.success) {
        setCategories(categoriesResult.data);
      }

      if (statsResult.success) {
        setDownloadStats(statsResult);
      }

    } catch (error) {
      console.error('Failed to load data:', error);
      addNotification('Failed to load resource data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateResource = async (e) => {
    e.preventDefault();
    
    setUploading(true);
    
    // Generate AI summary if description provided
    if (formData.description && !formData.ai_summary) {
      const summaryResult = await downloadService.generateAISummary(
        formData.title, 
        formData.description
      );
      
      if (summaryResult.success) {
        formData.ai_summary = summaryResult.summary;
      }
    }

    const result = await downloadService.createResource(formData);
    
    if (result.success) {
      setResources(prev => [result.data, ...prev]);
      addNotification('Resource created successfully', 'success');
      closeModal();
      loadData(); // Refresh data
    } else {
      throw new Error(result.error);
    }

  };

  const handleUpdateResource = async (e) => {
    e.preventDefault();
    
    const result = await downloadService.updateResource(selectedResource.id, formData);
    
    if (result.success) {
      setResources(prev => 
        prev.map(resource => 
          resource.id === selectedResource.id ? result.data : resource
        )
      );
      addNotification('Resource updated successfully', 'success');
      closeModal();
    } else {
      throw new Error(result.error);
    }

  };

  const handleDeleteResource = async (resourceId) => {
    if (!confirm('Are you sure you want to delete this resource? This action cannot be undone.')) {
      return;
    }

    const result = await downloadService.deleteResource(resourceId);
    
    if (result.success) {
      setResources(prev => prev.filter(resource => resource.id !== resourceId));
      addNotification('Resource deleted successfully', 'success');
    } else {
      throw new Error(result.error);
    }

  };

  const handleFileUpload = async (file) => {
    try {
      setUploading(true);
      setUploadProgress(0);
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const uploadResult = await downloadService.uploadFile(file, file.name);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (uploadResult.success) {
        setFormData(prev => ({
          ...prev,
          file_path: uploadResult.filePath,
          file_size_bytes: uploadResult.size,
          mime_type: file.type
        }));
        
        addNotification('File uploaded successfully', 'success');
      } else {
        throw new Error(uploadResult.error);
      }

    } catch (error) {
      console.error('File upload failed:', error);
      addNotification(error.message || 'File upload failed', 'error');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const generateAISummary = async () => {
    if (!formData.title || !formData.description) {
      addNotification('Please provide title and description first', 'warning');
      return;
    }

    try {
      const result = await downloadService.generateAISummary(formData.title, formData.description);
      
      if (result.success) {
        setFormData(prev => ({ ...prev, ai_summary: result.summary }));
        addNotification('AI summary generated', 'success');
      } else {
        addNotification('Failed to generate AI summary', 'error');
      }
    } catch (error) {
      console.error('AI summary generation failed:', error);
      addNotification('AI summary generation failed', 'error');
    }
  };

  const openModal = (type, resource = null) => {
    setModalType(type);
    setSelectedResource(resource);
    
    if (resource && type === 'edit') {
      setFormData({
        title: resource.title || '',
        description: resource.description || '',
        category_id: resource.category_id || '',
        type: resource.type || 'template',
        file_path: resource.file_path || '',
        file_size_bytes: resource.file_size_bytes || 0,
        mime_type: resource.mime_type || 'application/pdf',
        tags: resource.tags || [],
        is_featured: resource.is_featured || false,
        is_premium: resource.is_premium || false,
        requires_lead_capture: resource.requires_lead_capture !== false,
        ai_summary: resource.ai_summary || '',
        preview_image_url: resource.preview_image_url || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category_id: '',
        type: 'template',
        file_path: '',
        file_size_bytes: 0,
        mime_type: 'application/pdf',
        tags: [],
        is_featured: false,
        is_premium: false,
        requires_lead_capture: true,
        ai_summary: '',
        preview_image_url: ''
      });
    }
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedResource(null);
    setUploadProgress(0);
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || resource.category_id === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const tabs = [
    { id: 'resources', label: 'Resources', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'categories', label: 'Categories', icon: Filter },
    { id: 'generate', label: 'Generate Resource', icon: Sparkles }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading resource manager...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Resource Manager</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage downloadable resources and track downloads</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => openModal('create')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Resource</span>
          </button>
          <button
            onClick={loadData}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      {downloadStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Resources</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{resources.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Downloads</p>
                <p className="text-2xl font-bold text-green-600">{downloadStats.stats.totalDownloads}</p>
              </div>
              <Download className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Unique Users</p>
                <p className="text-2xl font-bold text-purple-600">{downloadStats.stats.uniqueUsers}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Conversion Rate</p>
                <p className="text-2xl font-bold text-orange-600">{downloadStats.stats.conversionRate}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex space-x-4 overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'resources' && (
            <ResourcesTab
              resources={filteredResources}
              categories={categories}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              viewMode={viewMode}
              setViewMode={setViewMode}
              onEdit={(resource) => openModal('edit', resource)}
              onDelete={handleDeleteResource}
              onCreate={() => openModal('create')}
            />
          )}
          {activeTab === 'analytics' && downloadStats && (
            <AnalyticsTab downloadStats={downloadStats} />
          )}
          {activeTab === 'categories' && (
            <CategoriesTab categories={categories} onRefresh={loadData} />
          )}
          {activeTab === 'generate' && (
            <GenerateResourceTab onCreated={loadData} categories={categories} addNotification={addNotification} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <ResourceModal
            type={modalType}
            resource={selectedResource}
            categories={categories}
            formData={formData}
            setFormData={setFormData}
            onSubmit={modalType === 'create' ? handleCreateResource : handleUpdateResource}
            onClose={closeModal}
            onFileUpload={handleFileUpload}
            onGenerateAISummary={generateAISummary}
            uploading={uploading}
            uploadProgress={uploadProgress}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Resources Tab Component
const ResourcesTab = ({ 
  resources, 
  categories, 
  searchTerm, 
  setSearchTerm, 
  filterCategory, 
  setFilterCategory,
  viewMode,
  setViewMode,
  onEdit, 
  onDelete, 
  onCreate 
}) => {
  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white w-full sm:w-64"
              />
            </div>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={onCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Resource</span>
          </button>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map(resource => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {resources.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No resources found</h3>
          <p className="text-gray-600 dark:text-gray-400">Create your first resource to get started</p>
        </div>
      )}
    </div>
  );
};

// Resource Card Component
const ResourceCard = ({ resource, onEdit, onDelete }) => {
  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {resource.title}
            </h3>
            {resource.is_featured && (
              <Star className="w-4 h-4 text-yellow-500" />
            )}
            {resource.is_premium && (
              <Crown className="w-4 h-4 text-purple-500" />
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            {resource.description}
          </p>
          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
            <span>{resource.resource_categories?.name || 'No category'}</span>
            <span>{formatFileSize(resource.file_size_bytes)}</span>
            <span>{resource.download_count || 0} downloads</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(resource)}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(resource.id)}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(resource.created_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

// Analytics Tab Component
const AnalyticsTab = ({ downloadStats }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Download Analytics</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Resources */}
          <div>
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Top Downloaded Resources</h4>
            <div className="space-y-3">
              {downloadStats.resourceStats.slice(0, 5).map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {stat.resource?.title || 'Unknown Resource'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {stat.downloads} downloads • {stat.uniqueUsers} unique users
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-600">
                      {Math.round((stat.completed / stat.downloads) * 100)}%
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">completion</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Downloads */}
          <div>
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Recent Downloads</h4>
            <div className="space-y-3">
              {downloadStats.downloads.slice(0, 5).map((download, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {download.user_name || download.user_email}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {download.resources?.title}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-medium ${
                      download.download_completed ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {download.download_completed ? 'Completed' : 'Pending'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(download.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Categories Tab Component
const CategoriesTab = ({ categories, onRefresh }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('FileText');
  const [color, setColor] = useState('blue');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName('');
    setDescription('');
    setEditingId(null);
    setIcon('FileText');
    setColor('blue');
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    const result = await downloadService.createCategory({ name: name.trim(), description: description.trim(), icon, color });
    setLoading(false);
    if (result.success) {
      resetForm();
      onRefresh();
    }
  };

  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setName(cat.name || '');
    setDescription(cat.description || '');
    setIcon(cat.icon || 'FileText');
    setColor(cat.color || 'blue');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingId || !name.trim()) return;
    setLoading(true);
    const result = await downloadService.updateCategory(editingId, { name: name.trim(), description: description.trim(), icon, color });
    setLoading(false);
    if (result.success) {
      resetForm();
      onRefresh();
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this category?')) return;
    setLoading(true);
    await downloadService.deleteCategory(id);
    setLoading(false);
    onRefresh();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Manage Categories</h3>
        <form onSubmit={editingId ? handleUpdate : handleCreate} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <select
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            {['FileText','Shield','CheckSquare','Users','TrendingUp','BookOpen','DollarSign','Scale','BarChart3','UserPlus'].map(i => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            {['blue','green','orange','purple','indigo','pink','emerald','red','yellow','cyan'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {editingId ? 'Update' : 'Add'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">Cancel</button>
            )}
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(category => (
            <div key={category.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1 flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getCategoryColorClass(category.color)}`}>
                    {React.createElement((Lucide[category.icon] || FileText), { className: 'w-5 h-5' })}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{category.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{category.icon} • {category.color}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit(category)} className="text-blue-600 hover:underline text-sm">Edit</button>
                  <button onClick={() => handleDelete(category.id)} className="text-red-600 hover:underline text-sm">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Resource Modal Component
const ResourceModal = ({ 
  type, 
  resource, 
  categories, 
  formData, 
  setFormData, 
  onSubmit, 
  onClose, 
  onFileUpload,
  onGenerateAISummary,
  uploading,
  uploadProgress
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
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
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {type === 'create' ? 'Add New Resource' : 'Edit Resource'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Resource title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Describe the resource and its benefits"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category_id}
                    onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="template">Template</option>
                    <option value="checklist">Checklist</option>
                    <option value="guide">Guide</option>
                    <option value="tool">Tool</option>
                    <option value="document">Document</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="hr, policy, template, etc."
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="is_featured" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Featured resource
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="is_premium"
                    checked={formData.is_premium}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_premium: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="is_premium" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Premium resource
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="requires_lead_capture"
                    checked={formData.requires_lead_capture}
                    onChange={(e) => setFormData(prev => ({ ...prev, requires_lead_capture: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="requires_lead_capture" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Require lead capture for download
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  File Upload {type === 'create' && '*'}
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {uploading ? (
                    <div className="space-y-2">
                      <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Uploading... {uploadProgress}%
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  ) : formData.file_path ? (
                    <div className="space-y-2">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto" />
                      <p className="text-sm text-green-600">File uploaded successfully</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{formData.file_path}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Drop your PDF file here, or{' '}
                        <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
                          browse
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileSelect}
                            className="hidden"
                          />
                        </label>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PDF, DOC, DOCX up to 50MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Summary */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    AI Summary
                  </label>
                  <button
                    type="button"
                    onClick={onGenerateAISummary}
                    disabled={!formData.title || !formData.description}
                    className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Generate</span>
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={formData.ai_summary}
                  onChange={(e) => setFormData(prev => ({ ...prev, ai_summary: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="AI-generated summary will appear here..."
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  This summary will be displayed to users to help them understand the resource's value.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preview Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.preview_image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, preview_image_url: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading || (type === 'create' && !formData.file_path)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
            >
              {uploading && <Loader className="w-4 h-4 animate-spin" />}
              <Save className="w-4 h-4" />
              <span>{uploading ? 'Processing...' : type === 'create' ? 'Create Resource' : 'Update Resource'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ResourceManager;

// Generate Resource Tab
const GenerateResourceTab = ({ categories, onCreated, addNotification }) => {
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!title || !categoryId || !prompt) {
      addNotification('Please fill all required fields', 'warning');
      return;
    }
    try {
      setLoading(true);
      const result = await downloadService.generateResource({ title, categoryId, prompt });
      if (result.success) {
        addNotification('Resource generated successfully', 'success');
        setTitle('');
        setCategoryId('');
        setPrompt('');
        onCreated();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Generate resource failed:', error);
      addNotification('Failed to generate resource', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI-Powered Resource Generation</h3>
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label htmlFor="gen-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
            <input
              id="gen-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="e.g., POSH Compliance Checklist"
              required
            />
          </div>
          <div>
            <label htmlFor="gen-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category *</label>
            <select
              id="gen-category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="gen-prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Prompt / Description *</label>
            <textarea
              id="gen-prompt"
              rows={6}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Describe the resource you want to generate..."
              required
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? 'Generating...' : 'Generate Resource'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
