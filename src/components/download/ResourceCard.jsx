import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  FileText, 
  Star, 
  Clock, 
  Shield, 
  Users, 
  Eye,
  CheckCircle,
  AlertCircle,
  Loader,
  Crown,
  Lock,
  Unlock
} from 'lucide-react';
import LeadCaptureModal from './LeadCaptureModal';
import { downloadService } from '../../services/downloadService';

const ResourceCard = ({ 
  resource, 
  featured = false, 
  compact = false,
  showCategory = true 
}) => {
  const [showModal, setShowModal] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState(null);

  const handleDownloadClick = () => {
    if (resource.requires_lead_capture) {
      setShowModal(true);
    } else {
      // Direct download for free resources
      handleDirectDownload();
    }
  };

  const handleDirectDownload = async () => {
    try {
      setDownloading(true);
      
      // For free resources, we might still want minimal tracking
      const result = await downloadService.initiateDownload(
        resource.id,
        {
          firstName: 'Anonymous',
          lastName: 'User',
          email: 'anonymous@download.com',
          company: 'Unknown'
        },
        downloadService.getUserMetadata()
      );

      if (result.success) {
        window.open(result.downloadUrl, '_blank');
        setDownloadStatus('success');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadStatus('error');
    } finally {
      setDownloading(false);
    }
  };

  const handleLeadSubmit = async (leadData) => {
    try {
      setDownloading(true);
      
      const result = await downloadService.initiateDownload(
        resource.id,
        leadData,
        downloadService.getUserMetadata()
      );

      if (result.success) {
        setShowModal(false);
        
        // Open download in new tab
        window.open(result.downloadUrl, '_blank');
        
        setDownloadStatus('success');
        
        // Show success message
        setTimeout(() => {
          setDownloadStatus(null);
        }, 5000);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadStatus('error');
      
      // Show error message
      setTimeout(() => {
        setDownloadStatus(null);
      }, 5000);
    } finally {
      setDownloading(false);
    }
  };

  const getCategoryIcon = () => {
    const iconMap = {
      'FileText': FileText,
      'Shield': Shield,
      'CheckSquare': CheckCircle,
      'Users': Users,
      'TrendingUp': Star,
      'BookOpen': FileText,
      'DollarSign': Star,
      'Scale': Shield,
      'BarChart3': Star,
      'UserPlus': Users
    };
    
    const IconComponent = iconMap[resource.resource_categories?.icon] || FileText;
    return IconComponent;
  };

  const getCategoryColor = () => {
    const colorMap = {
      'blue': 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',
      'green': 'text-green-600 bg-green-100 dark:bg-green-900/20',
      'orange': 'text-orange-600 bg-orange-100 dark:bg-orange-900/20',
      'purple': 'text-purple-600 bg-purple-100 dark:bg-purple-900/20',
      'indigo': 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/20',
      'pink': 'text-pink-600 bg-pink-100 dark:bg-pink-900/20',
      'emerald': 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20',
      'red': 'text-red-600 bg-red-100 dark:bg-red-900/20',
      'yellow': 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
      'cyan': 'text-cyan-600 bg-cyan-100 dark:bg-cyan-900/20'
    };
    
    return colorMap[resource.resource_categories?.color] || colorMap.blue;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const CategoryIcon = getCategoryIcon();

  if (compact) {
    return (
      <>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <div className={`p-2 rounded-lg ${getCategoryColor()}`}>
                <CategoryIcon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {resource.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {resource.resource_categories?.name}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleDownloadClick}
              disabled={downloading}
              className="ml-3 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200 flex items-center space-x-1 text-sm"
            >
              {downloading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
            </button>
          </div>
        </motion.div>

        <LeadCaptureModal
          resource={resource}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleLeadSubmit}
          loading={downloading}
        />
      </>
    );
  }

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03 }}
        className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 ${
          featured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
        }`}
      >
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${getCategoryColor()}`}>
              <CategoryIcon className="w-6 h-6" />
            </div>
            
            <div className="flex items-center space-x-2">
              {featured && (
                <div className="flex items-center space-x-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full text-xs font-medium">
                  <Star className="w-3 h-3" />
                  <span>Featured</span>
                </div>
              )}
              
              {resource.is_premium && (
                <div className="flex items-center space-x-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full text-xs font-medium">
                  <Crown className="w-3 h-3" />
                  <span>Premium</span>
                </div>
              )}
              
              <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                {resource.requires_lead_capture ? (
                  <Lock className="w-4 h-4" />
                ) : (
                  <Unlock className="w-4 h-4" />
                )}
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {resource.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
            {resource.description}
          </p>

          {/* AI Summary */}
          {resource.ai_summary && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
              <div className="flex items-start space-x-2">
                <Star className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-blue-800 dark:text-blue-200 text-sm font-medium mb-1">
                    AI Summary
                  </p>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    {resource.ai_summary}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center space-x-4">
              {showCategory && resource.resource_categories && (
                <span className="flex items-center space-x-1">
                  <span>{resource.resource_categories.name}</span>
                </span>
              )}
              
              {resource.file_size_bytes && (
                <span className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>{formatFileSize(resource.file_size_bytes)}</span>
                </span>
              )}
              
              <span className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>Instant download</span>
              </span>
            </div>
            
            {resource.download_count > 0 && (
              <span className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{resource.download_count} downloads</span>
              </span>
            )}
          </div>

          {/* Tags */}
          {resource.tags && resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {resource.tags.slice(0, 4).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md text-xs"
                >
                  {tag}
                </span>
              ))}
              {resource.tags.length > 4 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md text-xs">
                  +{resource.tags.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={handleDownloadClick}
            disabled={downloading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
          >
            {downloading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : downloadStatus === 'success' ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Downloaded Successfully!</span>
              </>
            ) : downloadStatus === 'error' ? (
              <>
                <AlertCircle className="w-5 h-5" />
                <span>Download Failed - Try Again</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>
                  {resource.requires_lead_capture ? 'Get Free Download' : 'Download Now'}
                </span>
              </>
            )}
          </button>
          
          {resource.requires_lead_capture && (
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
              No signup required • Instant access
            </p>
          )}
        </div>
      </motion.div>

      <LeadCaptureModal
        resource={resource}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleLeadSubmit}
        loading={downloading}
      />
    </>
  );
};

export default ResourceCard;
