import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Fuse from 'fuse.js';
import { addContactToHubSpot } from '../lib/hubspot';
import { downloadService } from '../services/downloadService';
import { 
  Search, 
  Download, 
  FileText, 
  BookOpen, 
  Filter, 
  Grid, 
  List, 
  Star, 
  Clock, 
  Eye,
  Bookmark,
  Share2,
  ArrowRight,
  Sparkles,
  User,
  Mail,
  Building,
  Phone,
  X,
  CheckCircle
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export default function ResourceLibrary() {
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    message: ''
  });

  // Fetch resources and categories from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch resources
        const resourcesResult = await downloadService.getResources();
        console.log('🔍 Resources fetch result:', resourcesResult);
        
        if (resourcesResult.success) {
          console.log('📦 Resources data:', resourcesResult.data);
          // Ensure we have an array of resources
          const resourcesArray = Array.isArray(resourcesResult.data) ? resourcesResult.data : [];
          console.log('📦 Processed resources array:', resourcesArray);
          setResources(resourcesArray);
          setFiltered(resourcesArray);
        } else {
          console.error('❌ Failed to fetch resources:', resourcesResult.error);
          // Set empty array as fallback
          setResources([]);
          setFiltered([]);
        }

        // Fetch categories
        const categoriesResult = await downloadService.getCategories();
        console.log('🔍 Categories fetch result:', categoriesResult);
        
        if (categoriesResult.success) {
          console.log('📦 Categories data:', categoriesResult.data);
          const categoriesArray = Array.isArray(categoriesResult.data) ? categoriesResult.data : [];
          setCategories(categoriesArray);
        } else {
          console.error('❌ Failed to fetch categories:', categoriesResult.error);
          setCategories([]);
        }

      } catch (error) {
        console.error('❌ Error fetching data:', error);
        // Set empty arrays as fallback
        setResources([]);
        setFiltered([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!search) {
      setFiltered(resources);
      return;
    }
    const fuse = new Fuse(resources, { keys: ['title', 'description', 'tags'] });
    setFiltered(fuse.search(search).map(r => r.item));
  }, [search, resources]);

  const handleDownloadClick = (resource) => {
    setSelectedResource(resource);
    setShowLeadForm(true);
    setError('');
    setIsSubmitted(false);
  };

  const handleLeadFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.email) {
        throw new Error('Please fill in all required fields (Name and Email)');
      }

      // Initiate download process
      const result = await downloadService.initiateDownload(
        selectedResource.id,
        formData,
        downloadService.getUserMetadata()
      );

      if (result.success) {
        setIsSubmitted(true);
        
        // Try to trigger download
        try {
          const link = document.createElement('a');
          link.href = result.downloadUrl;
          link.download = selectedResource.title || 'resource';
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          
          // Add click event to handle download
          link.addEventListener('click', (e) => {
            // If it's a direct file URL, let the browser handle it
            if (result.downloadUrl.includes('storage.googleapis.com') || result.downloadUrl.includes('supabase.co')) {
              // This should trigger the download
              console.log('Downloading from:', result.downloadUrl);
            } else {
              // For function URLs, we might need to handle differently
              console.log('Function download URL:', result.downloadUrl);
            }
          });
          
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Show success message
          console.log('Download initiated successfully');
          
        } catch (downloadError) {
          console.error('Download trigger error:', downloadError);
          // Still show success but inform user about manual download
          setError('Lead captured successfully! Please check your email for the download link or try clicking the download button again.');
        }

        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setShowLeadForm(false);
          setSelectedResource(null);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            position: '',
            message: ''
          });
        }, 5000);
      } else {
        setError(result.error || 'Failed to process download. Please try again.');
      }
    } catch (error) {
      console.error('Download form submission error:', error);
      setError(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Improved filtering logic
  const filteredByCategory = selectedCategory === 'all' 
    ? filtered 
    : filtered.filter(r => {
        // Handle different possible category structures
        const categoryName = r.resource_categories?.name || r.category_name || r.category;
        return categoryName === selectedCategory;
      });

  const categoryOptions = [
    { id: 'all', name: 'All Resources', count: resources.length },
    ...categories.map(cat => ({
      id: cat.name,
      name: cat.name,
      count: resources.filter(r => {
        const categoryName = r.resource_categories?.name || r.category_name || r.category;
        return categoryName === cat.name;
      }).length
    }))
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="h-4 w-4" />
            Resource Library
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Download <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">HR Resources</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Access our comprehensive collection of HR templates, guides, and resources to streamline your HR operations
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search resources, templates, guides..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 shadow-sm"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categoryOptions.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Resources Grid/List */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center gap-2 text-gray-600">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
              Loading resources...
            </div>
          </motion.div>
        ) : filteredByCategory.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No resources found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          </motion.div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-6"
          }>
            {filteredByCategory.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col ${
                  viewMode === 'list' ? 'flex items-center p-6' : 'p-6'
                }`}
              >
                {viewMode === 'grid' ? (
                  <>
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <FileText className="h-8 w-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                        {resource.resource_categories?.name || resource.category_name || resource.category || 'Uncategorized'}
                      </span>
                      <span className="text-xs text-gray-500">{resource.type}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {resource.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {resource.description || resource.ai_summary || resource.desc || 'No description available'}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        {resource.download_count || resource.downloads || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {resource.file_size_bytes ? downloadService.formatFileSize(resource.file_size_bytes) : (resource.size || 'Unknown size')}
                      </span>
                    </div>

                    {/* Download Button */}
                    <div className="mt-auto">
                      <button 
                        onClick={() => handleDownloadClick(resource)}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download Now
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* List View */}
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                      <FileText className="h-8 w-8 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                          {resource.resource_categories?.name || resource.category_name || resource.category || 'Uncategorized'}
                        </span>
                        <span className="text-xs text-gray-500">{resource.type}</span>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {resource.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-3">
                        {resource.description || resource.ai_summary || resource.desc || 'No description available'}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          {resource.download_count || resource.downloads || 0} downloads
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {resource.file_size_bytes ? downloadService.formatFileSize(resource.file_size_bytes) : (resource.size || 'Unknown size')}
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleDownloadClick(resource)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Request New Resource */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Request a custom resource or template tailored to your specific HR needs
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 mx-auto">
            <ArrowRight className="h-4 w-4" />
            Request Custom Resource
          </button>
        </motion.div>
      </div>

      {/* Lead Capture Modal */}
      <AnimatePresence>
        {showLeadForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => !isSubmitting && setShowLeadForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Download Started!</h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for your information. Your download should begin automatically.
                  </p>
                  <p className="text-sm text-gray-500">
                    We'll send you additional HR resources and updates to {formData.email}
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Download Resource</h3>
                    <button
                      onClick={() => setShowLeadForm(false)}
                      className="text-gray-400 hover:text-gray-600"
                      disabled={isSubmitting}
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  {selectedResource && (
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">{selectedResource.title}</h4>
                      <p className="text-sm text-gray-600">
                        {selectedResource.description || selectedResource.ai_summary || 'No description available'}
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleLeadFormSubmit} className="space-y-4">
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-red-600 text-sm">{error}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Position
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Notes
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Tell us how you plan to use this resource..."
                        disabled={isSubmitting}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          Download Resource
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
} 