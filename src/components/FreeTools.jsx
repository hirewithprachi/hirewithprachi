import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  TrendingUp, 
  FileText, 
  CheckSquare, 
  ArrowRight, 
  Download, 
  Sparkles, 
  Users, 
  BarChart3, 
  Shield,
  Zap,
  Target,
  Clock,
  Star,
  Search,
  Bot
} from 'lucide-react';
import ComplianceChecklistGenerator from './ComplianceChecklistGenerator';
import { toolsData } from '../data/toolsData';

// Debounce hook for search
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Smart suggestions for business types
const businessTypeSuggestions = [
  'Startup', 'SME', 'IT', 'NGO', 'Education', 'Healthcare', 
  'Manufacturing', 'Retail', 'Finance', 'Consulting', 'Real Estate',
  'Hospitality', 'Transportation', 'Media', 'Non-Profit'
];

export default function FreeTools({ tools, limit, showLimited = false }) {
  const [showChecklist, setShowChecklist] = useState(false);
  const [hoveredTool, setHoveredTool] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showToolkitModal, setShowToolkitModal] = useState(false);
  const [toolkitForm, setToolkitForm] = useState({ name: '', email: '', businessType: '', intendedUse: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionIndex, setSuggestionIndex] = useState(-1);
  const suggestionsRef = useRef(null);

  // Debounce search query
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Handle click outside suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setSuggestionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToolkitChange = e => {
    const { name, value } = e.target;
    setToolkitForm({ ...toolkitForm, [name]: value });
    
    // Show suggestions for business type
    if (name === 'businessType') {
      setShowSuggestions(value.length > 0);
      setSuggestionIndex(-1);
    }
  };

  const handleToolkitSubmit = e => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setShowToolkitModal(false);
        setSubmitted(false);
        // Redirect to Google Drive ZIP
        window.location.href = 'https://drive.google.com/drive/folders/1q-GrYuR2rUOubK7UJu4NFAuJsbQaKeRO?usp=sharing';
      }, 1500);
    }, 1000);
  };

  // Filter suggestions based on input
  const filteredSuggestions = businessTypeSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(toolkitForm.businessType.toLowerCase())
  );

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setToolkitForm({ ...toolkitForm, businessType: suggestion });
    setShowSuggestions(false);
  };

  // Handle keyboard navigation for suggestions
  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSuggestionIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (suggestionIndex >= 0 && filteredSuggestions[suggestionIndex]) {
          handleSuggestionClick(filteredSuggestions[suggestionIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSuggestionIndex(-1);
        break;
    }
  };

  // Use dynamic data if available, otherwise use default tools
  const displayTools = toolsData || tools || [];
  const categories = ['All', ...new Set(displayTools.map(tool => tool.category))];

  // Filter tools based on search query and category
  const filteredTools = useMemo(() => {
    return displayTools.filter(tool => {
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesSearch = debouncedSearchQuery === '' || 
        tool.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(debouncedSearchQuery.toLowerCase())));
      
      return matchesCategory && matchesSearch;
    });
  }, [displayTools, selectedCategory, debouncedSearchQuery]);

  // Apply limit if specified (for homepage/services page), otherwise show all
  const finalTools = showLimited ? filteredTools.slice(0, 4) : (limit ? filteredTools.slice(0, limit) : filteredTools);

  // Open Chatbase widget for tool-specific help
  const openToolChatbot = (toolName) => {
    console.log('Tool chatbot requested for:', toolName);
    
    // Create a custom event to trigger the main chatbot
    const event = new CustomEvent('open-chat', { 
      detail: { context: `Help with ${toolName}` }
    });
    window.dispatchEvent(event);
  };

  // Schema markup for tools
  const toolsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "HR Tools & Calculators",
    "description": "Professional HR tools and calculators for businesses",
    "numberOfItems": displayTools.length,
    "itemListElement": displayTools.map((tool, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": tool.title,
        "description": tool.description,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "url": `https://hirewithprachi.com${tool.link}`
      }
    }))
  };

  return (
    <>
      {/* Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify(toolsSchema)}
      </script>
      
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="h-4 w-4" />
            Free Tools & Resources
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Access Our <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">HR Tools</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Access a comprehensive suite of HR tools, calculators, and resources designed to streamline your HR operations and drive business success
          </p>

          {/* Search Bar */}
          {!showLimited && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search tools by name, description, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm shadow-lg"
                  aria-label="Search HR tools"
                  aria-describedby="search-description"
                />
                <div id="search-description" className="sr-only">
                  Search through our collection of HR tools, calculators, and resources
                </div>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Category Filter */}
          {!showLimited && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`group flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl shadow-blue-500/25'
                      : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <span className="text-lg">
                    {category === 'All' ? '🌟' : 
                     category === 'calculator' ? '🧮' :
                     category === 'tool' ? '⚙️' :
                     category === 'assessment' ? '📊' : '🛠️'}
                  </span>
                  {category === 'All' ? 'All Tools' : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Tools Grid */}
        <AnimatePresence mode="wait">
          {finalTools.length > 0 ? (
            <motion.div
              key={`${selectedCategory}-${debouncedSearchQuery}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16`}
            >
              {finalTools.map((tool, index) => (
                <motion.div
                  key={tool.id || index}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col ${
                    hoveredTool === tool.id ? 'scale-105' : ''
                  }`}
                  onMouseEnter={() => setHoveredTool(tool.id)}
                  onMouseLeave={() => setHoveredTool(null)}
                >
                  {/* Badge */}
                  {tool.badge && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        tool.badge === 'Popular' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' :
                        tool.badge === 'New' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
                        tool.badge === 'Essential' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
                        'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                      }`}>
                        {tool.badge}
                      </span>
                    </div>
                  )}

                  {/* Chatbot Help Button */}
                  <button
                    onClick={() => openToolChatbot(tool.title)}
                    className="absolute top-4 right-4 z-10 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:opacity-100"
                    title={`Get help with ${tool.title}`}
                    aria-label={`Get AI assistance for ${tool.title}`}
                  >
                    <Bot className="w-4 h-4 text-white" aria-hidden="true" />
                  </button>

                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${tool.color || 'from-blue-500 to-purple-600'} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {tool.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {tool.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {tool.description}
                  </p>

                  {/* Features */}
                  {tool.features && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {tool.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
                            <span className="text-xs text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Time Estimate */}
                  {tool.timeEstimate && (
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                      <Clock className="h-3 w-3" />
                      {tool.timeEstimate}
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="mt-auto">
                    {tool.title === 'Compliance Checklist' ? (
                      <button 
                        onClick={() => setShowChecklist(true)}
                        className="w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-gray-800 hover:to-gray-600 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                      >
                        <Zap className="h-4 w-4" />
                        Try Tool Now
                      </button>
                    ) : (
                      <a 
                        href={tool.link}
                        className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gray-900 to-gray-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-gray-800 hover:to-gray-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                      >
                        <ArrowRight className="h-4 w-4" />
                        Access Tool
                      </a>
                    )}
                  </div>

                  {/* Hover Effect */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-br ${tool.bgColor || 'from-blue-50 to-purple-50'} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10
                  `}></div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No tools found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or category filter
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="h-6 w-6 text-yellow-500 fill-current" />
              <h3 className="text-2xl font-bold text-gray-900">
                More Resources Coming Soon
              </h3>
            </div>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're constantly adding new tools and resources to help you excel in HR management. 
              Stay updated with our latest releases.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-200 shadow-lg"
                onClick={() => setShowToolkitModal(true)}
                type="button"
              >
                <Download className="h-4 w-4" />
                Download Free HR Toolkit
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {showLimited ? (
                <a
                  href="/resources"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg"
                >
                  <Download className="h-4 w-4" />
                  View All Tools
                </a>
              ) : (
                <>
                  <a
                    href="/resources"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg"
                  >
                    <Download className="h-4 w-4" />
                    Browse All Resources
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                  >
                    <Shield className="h-4 w-4" />
                    Request Custom Tool
                  </a>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Compliance Checklist Modal */}
      {showChecklist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[1000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold z-10" 
              onClick={() => setShowChecklist(false)} 
              aria-label="Close"
            >
              &times;
            </button>
            <ComplianceChecklistGenerator />
          </motion.div>
        </div>
      )}

      {/* Toolkit Download Modal with Smart Suggestions */}
      {showToolkitModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40">
          <form
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full flex flex-col gap-4 relative"
            onSubmit={handleToolkitSubmit}
          >
            <button
              type="button"
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setShowToolkitModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2 text-center">Download Free HR Toolkit</h2>
            <p className="mb-4 text-gray-700 text-center">Fill in your details to access the toolkit ZIP.</p>
            
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={toolkitForm.name}
              onChange={handleToolkitChange}
              required
              className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={toolkitForm.email}
              onChange={handleToolkitChange}
              required
              className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            
            {/* Business Type with Smart Suggestions */}
            <div className="relative" ref={suggestionsRef}>
              <input
                type="text"
                name="businessType"
                placeholder="Business Type (e.g. IT, Manufacturing)"
                value={toolkitForm.businessType}
                onChange={handleToolkitChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowSuggestions(toolkitForm.businessType.length > 0)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                aria-label="Business type"
                aria-autocomplete="list"
                aria-expanded={showSuggestions}
                aria-describedby="business-type-suggestions"
              />
              
              {/* Smart Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto"
                    id="business-type-suggestions"
                    role="listbox"
                    aria-label="Business type suggestions"
                  >
                    {filteredSuggestions.map((suggestion, index) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors ${
                          index === suggestionIndex ? 'bg-blue-100' : ''
                        } ${index === 0 ? 'rounded-t-lg' : ''} ${index === filteredSuggestions.length - 1 ? 'rounded-b-lg' : ''}`}
                        role="option"
                        aria-selected={index === suggestionIndex}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <textarea
              name="intendedUse"
              placeholder="How do you intend to use this toolkit?"
              rows={3}
              value={toolkitForm.intendedUse}
              onChange={handleToolkitChange}
              className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            
            <button
              type="submit"
              className="mt-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Download Toolkit'}
            </button>
            {submitted && <div className="text-green-600 text-center font-semibold mt-2">Thank you! Redirecting...</div>}
          </form>
        </div>
      )}
    </section>
    </>
  );
} 