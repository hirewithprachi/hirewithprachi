import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Star, 
  Clock, 
  Users, 
  TrendingUp, 
  Sparkles,
  ArrowRight,
  Download,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const HRToolCard = ({ tool, onTryNow, onLearnMore }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getToolIcon = (category) => {
    const icons = {
      'resume': '📄',
      'policy': '📋',
      'contract': '📝',
      'salary': '💰',
      'attendance': '📅',
      'performance': '📊',
      'recruitment': '👥',
      'compliance': '✅'
    };
    return icons[category] || '⚡';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'popular':
        return 'bg-orange-100 text-orange-800';
      case 'new':
        return 'bg-green-100 text-green-800';
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600';
      case 'medium':
        return 'text-yellow-600';
      case 'hard':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tool Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-2xl">
              {getToolIcon(tool.category)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
              <p className="text-sm text-gray-600">{tool.category_name}</p>
            </div>
          </div>
          {tool.status && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tool.status)}`}>
              {tool.status}
            </span>
          )}
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {tool.description}
        </p>

        {/* Tool Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          {tool.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{tool.rating}</span>
            </div>
          )}
          {tool.usage_count && (
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{tool.usage_count.toLocaleString()}</span>
            </div>
          )}
          {tool.avg_time && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{tool.avg_time}</span>
            </div>
          )}
        </div>
      </div>

      {/* Tool Features */}
      {tool.features && tool.features.length > 0 && (
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex flex-wrap gap-2">
            {tool.features.slice(0, 3).map((feature, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-white rounded-full text-xs text-gray-600 border border-gray-200"
              >
                {feature}
              </span>
            ))}
            {tool.features.length > 3 && (
              <span className="px-2 py-1 bg-white rounded-full text-xs text-gray-500 border border-gray-200">
                +{tool.features.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Tool Actions */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${getDifficultyColor(tool.difficulty)}`}>
              {tool.difficulty}
            </span>
            {tool.is_premium && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                Premium
              </span>
            )}
          </div>
          {tool.price && (
            <div className="text-right">
              <span className="text-lg font-bold text-gray-900">₹{tool.price}</span>
              {tool.original_price && (
                <span className="text-sm text-gray-500 line-through ml-2">₹{tool.original_price}</span>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onTryNow(tool)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Try Now
          </button>
          <button
            onClick={() => onLearnMore(tool)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Preview */}
        {tool.preview && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">Quick Preview</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">{tool.preview}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HRToolCard;
