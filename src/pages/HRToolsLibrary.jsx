import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Star, 
  Download, 
  Clock, 
  Users, 
  TrendingUp,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Play
} from 'lucide-react';
import { HRSaaSService } from '../services/hrSaaSService';

const HRToolsLibrary = () => {
  const [categories, setCategories] = useState([]);
  const [tools, setTools] = useState([]);
  const [popularTools, setPopularTools] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [userUsage, setUserUsage] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load categories
      const categoriesResult = await HRSaaSService.getToolCategories();
      if (categoriesResult.success) {
        setCategories(categoriesResult.categories);
      }
      
      // Load all tools
      const toolsResult = await HRSaaSService.getTools();
      if (toolsResult.success) {
        setTools(toolsResult.tools);
      }
      
      // Load popular tools
      const popularResult = await HRSaaSService.getPopularTools();
      if (popularResult.success) {
        setPopularTools(popularResult.tools);
      }
      
      // Load user usage (if authenticated)
      const usageResult = await HRSaaSService.getUserUsage();
      if (usageResult.success) {
        setUserUsage(usageResult.usage);
      }
      
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTools = tools.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || 
      tool.hr_tool_categories?.slug === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (icon) => {
    return <span className="text-2xl">{icon}</span>;
  };

  const getToolStatus = (tool) => {
    if (tool.is_free) {
      return { text: 'Free', color: 'bg-green-100 text-green-800' };
    }
    return { text: `₹${tool.price_inr}`, color: 'bg-blue-100 text-blue-800' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              HR Tools Library
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Professional HR tools and templates to streamline your work
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category.slug} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* User Usage Stats */}
        {userUsage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Your Usage This Month
                </h3>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-600">
                      {userUsage.used} / {userUsage.limit === -1 ? '∞' : userUsage.limit} documents
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-600">
                      {userUsage.total} total created
                    </span>
                  </div>
                </div>
              </div>
              {userUsage.plan === 'free' && (
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Upgrade Plan
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Popular Tools */}
        {popularTools.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900">Popular Tools</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularTools.map((tool, index) => (
                <ToolCard key={tool.id} tool={tool} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              All Tools
            </button>
            {categories.map(category => (
              <button
                key={category.slug}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  selectedCategory === category.slug
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {getCategoryIcon(category.icon)}
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {filteredTools.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No tools found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool, index) => (
                <ToolCard key={tool.id} tool={tool} index={index} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const ToolCard = ({ tool, index }) => {
  const status = getToolStatus(tool);
  
  const handleToolClick = () => {
    // Navigate to tool page
    if (tool.slug === 'resume-builder') {
      window.location.href = '/resume-builder';
    } else {
      window.location.href = `/tools/${tool.slug}`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden group cursor-pointer"
      onClick={handleToolClick}
    >
      {/* Tool Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${tool.hr_tool_categories?.color}20`, color: tool.hr_tool_categories?.color }}
            >
              {getCategoryIcon(tool.hr_tool_categories?.icon)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {tool.name}
              </h3>
              <p className="text-sm text-gray-500">
                {tool.hr_tool_categories?.name}
              </p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
            {status.text}
          </span>
        </div>

        {/* Tool Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {tool.description}
        </p>

        {/* Tool Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{tool.usage_count.toLocaleString()}</span>
            </div>
            {tool.rating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>{tool.rating}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>2-5 min</span>
          </div>
        </div>

        {/* Tool Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tool.is_popular && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              Popular
            </span>
          )}
          {tool.is_free && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Free
            </span>
          )}
        </div>

        {/* Action Button */}
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group-hover:gap-3">
          <Play className="w-4 h-4" />
          <span>Try Now</span>
          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </motion.div>
  );
};

const getToolStatus = (tool) => {
  if (tool.is_free) {
    return { text: 'Free', color: 'bg-green-100 text-green-800' };
  }
  return { text: `₹${tool.price_inr}`, color: 'bg-blue-100 text-blue-800' };
};

const getCategoryIcon = (icon) => {
  return <span className="text-2xl">{icon}</span>;
};

export default HRToolsLibrary;
