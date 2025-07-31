import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Fuse from 'fuse.js';
import { addContactToHubSpot } from '../lib/hubspot';
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
  Sparkles
} from 'lucide-react';

export default function ResourceLibrary() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [formData, setFormData] = useState({
    _subject: 'New Resource Request',
    name: 'Resource Request',
    email: 'resource@example.com',
    message: 'Resource Request',
  });

  // Sample resources data for better UX
  const sampleResources = [
    {
      id: 1,
      title: "HR Policy Template Bundle",
      desc: "Complete set of HR policy templates for startups and growing companies",
      tags: ["policies", "templates", "compliance"],
      category: "Templates",
      type: "PDF",
      downloads: 2341,
      rating: 4.8,
      size: "2.4 MB",
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Employee Handbook 2024",
      desc: "Comprehensive employee handbook template with latest regulations",
      tags: ["handbook", "employee", "compliance"],
      category: "Templates",
      type: "DOCX",
      downloads: 1892,
      rating: 4.9,
      size: "1.8 MB",
      date: "2024-01-10"
    },
    {
      id: 3,
      title: "Recruitment Process Guide",
      desc: "Step-by-step guide for building an effective recruitment process",
      tags: ["recruitment", "hiring", "process"],
      category: "Guides",
      type: "PDF",
      downloads: 1456,
      rating: 4.7,
      size: "3.2 MB",
      date: "2024-01-08"
    },
    {
      id: 4,
      title: "Performance Review Templates",
      desc: "Professional performance review forms and evaluation criteria",
      tags: ["performance", "review", "evaluation"],
      category: "Templates",
      type: "PDF",
      downloads: 2103,
      rating: 4.8,
      size: "1.5 MB",
      date: "2024-01-05"
    },
    {
      id: 5,
      title: "HR Compliance Checklist",
      desc: "Comprehensive checklist covering all major HR compliance requirements",
      tags: ["compliance", "checklist", "legal"],
      category: "Compliance",
      type: "PDF",
      downloads: 3124,
      rating: 4.9,
      size: "0.8 MB",
      date: "2024-01-03"
    },
    {
      id: 6,
      title: "Employee Engagement Survey",
      desc: "Ready-to-use employee engagement survey with analysis framework",
      tags: ["engagement", "survey", "employee"],
      category: "Templates",
      type: "DOCX",
      downloads: 1678,
      rating: 4.6,
      size: "1.2 MB",
      date: "2024-01-01"
    }
  ];

  useEffect(() => {
    // Use sample data for better UX
    setResources(sampleResources);
    setFiltered(sampleResources);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!search) {
      setFiltered(resources);
      return;
    }
    const fuse = new Fuse(resources, { keys: ['title', 'desc', 'tags'] });
    setFiltered(fuse.search(search).map(r => r.item));
  }, [search, resources]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // POST to Formspree
    fetch('https://formspree.io/f/xeozkpyv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    // Also send to HubSpot CRM
    const [firstname, ...rest] = formData.name.split(' ');
    const lastname = rest.join(' ');
    await addContactToHubSpot({ email: formData.email, firstname, lastname });
    setSubmitted(true);
  };

  const categories = [
    { id: 'all', name: 'All Resources', count: resources.length },
    { id: 'Templates', name: 'Templates', count: resources.filter(r => r.category === 'Templates').length },
    { id: 'Guides', name: 'Guides', count: resources.filter(r => r.category === 'Guides').length },
    { id: 'Compliance', name: 'Compliance', count: resources.filter(r => r.category === 'Compliance').length }
  ];

  const filteredByCategory = selectedCategory === 'all' 
    ? filtered 
    : filtered.filter(r => r.category === selectedCategory);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
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
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
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
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
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
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden ${
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
                        {resource.category}
                      </span>
                      <span className="text-xs text-gray-500">{resource.type}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {resource.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {resource.desc}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        {resource.downloads}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        {resource.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {resource.size}
                      </span>
                    </div>

                    {/* Download Button */}
                    <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2">
                      <Download className="h-4 w-4" />
                      Download Now
                    </button>
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
                          {resource.category}
                        </span>
                        <span className="text-xs text-gray-500">{resource.type}</span>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {resource.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-3">
                        {resource.desc}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          {resource.downloads} downloads
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          {resource.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {resource.size}
                        </span>
                      </div>
                    </div>

                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2">
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
    </section>
  );
} 