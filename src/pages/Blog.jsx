import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import Fuse from "fuse.js";
import NewsletterSignup from "../components/NewsletterSignup";
import Breadcrumbs from "../components/Breadcrumbs";
import { motion, AnimatePresence } from "framer-motion";
import HireWithPrachiTopBar from '../components/hirable/HirableTopBar';
import HireWithPrachiHeader from '../components/hirable/HirableHeader';
import HireWithPrachiFooter from '../components/hirable/HirableFooter';
import AIChatbotWidget from '../components/AIChatbotWidget';
import BlogCard from '../components/BlogCard';
import { blogPosts, blogCategories, trendingTopics } from '../data/blogPosts';
import { blogTopics, getFeaturedBlogTopics } from '../data/blogTopics';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('latest'); // latest, popular, trending
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // Load blog posts from our data file
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate loading for better UX
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Combine existing blog posts with new blog topics
        const allPosts = [...blogPosts, ...blogTopics.map(topic => ({
          id: topic.id,
          title: topic.title,
          excerpt: topic.metaDescription,
          content: topic.metaDescription,
          author: 'Prachi Shrivastava',
          date: topic.publishDate,
          category: topic.category,
          readTime: topic.readTime,
          featured: topic.featured,
          tags: topic.keywords,
          image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          slug: topic.slug
        }))];
        
        setPosts(allPosts);
        setFiltered(allPosts);
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.');
        console.error('Error loading blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Enhanced filtering and search logic
  useEffect(() => {
    if (!posts.length) return;
    
    let filteredPosts = [...posts];
    
    // Filter by category first
    if (selectedCategory !== 'All') {
      filteredPosts = posts.filter(post => 
        post.category === selectedCategory || 
        post.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase())))
      );
    }
    
    // Then filter by search
    if (search.trim()) {
      const fuse = new Fuse(filteredPosts, { 
        keys: ["title", "excerpt", "tags", "category", "author"],
        threshold: 0.3,
        includeScore: true
      });
      const searchResults = fuse.search(search.trim());
      filteredPosts = searchResults.map(r => r.item);
    }
    
    setFiltered(filteredPosts);
    setCurrentPage(1); // Reset to first page when filters change
  }, [search, selectedCategory, posts]);

  // Enhanced sorting logic
  const sortedPosts = React.useMemo(() => {
    let sorted = [...filtered];
    switch (sortBy) {
      case 'latest':
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'popular':
        return sorted.sort((a, b) => {
          // Featured posts first, then by date
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.date) - new Date(a.date);
        });
      case 'trending':
        return sorted.sort((a, b) => {
          // Sort by read time (shorter first for trending)
          const aTime = parseInt(a.readTime) || 0;
          const bTime = parseInt(b.readTime) || 0;
          return aTime - bTime;
        });
      default:
        return sorted;
    }
  }, [filtered, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = sortedPosts.slice(startIndex, endIndex);

  // Handle sort change with pagination reset
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  // Handle search with debouncing
  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Track analytics events
  const trackEvent = (action, label) => {
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: 'Blog',
        event_label: label
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>HR Blog | Latest HR Insights, Trends & Best Practices | Prachi Shrivastava</title>
        <meta name="description" content="Stay ahead with the latest HR insights, trends, and best practices from India's leading virtual HR consultant. Expert articles on HR strategy, compliance, employee engagement, and more." />
        <meta name="keywords" content="HR blog, HR insights, HR trends, HR best practices, virtual HR, HR consulting India, employee engagement, HR compliance, startup HR, SME HR services, HR strategy, remote work HR" />
        <meta name="author" content="Prachi Shrivastava" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Open Graph */}
        <meta property="og:title" content="HR Blog | Latest HR Insights & Best Practices | Prachi Shrivastava" />
        <meta property="og:description" content="Expert HR insights, trends, and best practices from India's leading virtual HR consultant. Stay updated with the latest in HR strategy and compliance." />
        <meta property="og:image" content="/Hirable – Human Resources & Recruiting WordPress Theme_files/about-img-1.jpg" />
        <meta property="og:url" content="https://hirewithprachi.com/blog" />
        <meta property="og:type" content="blog" />
        <meta property="og:site_name" content="Hire With Prachi" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HR Blog | Latest HR Insights & Best Practices" />
        <meta name="twitter:description" content="Expert HR insights, trends, and best practices from India's leading virtual HR consultant." />
        <meta name="twitter:image" content="/Hirable – Human Resources & Recruiting WordPress Theme_files/about-img-1.jpg" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://hirewithprachi.com/blog" />
        
        {/* Schema Markup */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "HR Blog | Prachi Shrivastava Virtual HR",
          "description": "Latest HR insights, trends, and best practices from India's leading virtual HR consultant",
          "url": "https://hirewithprachi.com/blog",
          "author": {
            "@type": "Person",
            "name": "Prachi Shrivastava",
            "jobTitle": "Virtual HR Consultant",
            "worksFor": {
              "@type": "Organization",
              "name": "Hire With Prachi"
            }
          },
          "publisher": {
            "@type": "Organization",
            "name": "Hire With Prachi",
            "logo": {
              "@type": "ImageObject",
              "url": "https://hirewithprachi.com/logo.png"
            }
          },
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": blogPosts.slice(0, 10).map((post, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "BlogPosting",
                "headline": post.title,
                "description": post.excerpt,
                "author": {
                  "@type": "Person",
                  "name": post.author
                },
                "datePublished": post.date,
                "image": post.image,
                "url": `https://hirewithprachi.com/blog/${post.slug}`
              }
            }))
          }
        })}</script>
      </Helmet>
      
      <style>
        {`
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .animate-spin {
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .glass-effect {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .floating-animation {
            animation: float 6s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .pulse-glow {
            animation: pulse-glow 2s ease-in-out infinite alternate;
          }
          
          @keyframes pulse-glow {
            from { box-shadow: 0 0 20px rgba(102, 126, 234, 0.4); }
            to { box-shadow: 0 0 40px rgba(102, 126, 234, 0.8); }
          }
        `}
      </style>
      
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50" role="main">
        <HireWithPrachiTopBar />
        <HireWithPrachiHeader />
        <AIChatbotWidget />

        {/* Hero Section with Advanced Animations */}
        <section className="relative pt-24 pb-20 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl floating-animation"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-indigo-400/15 to-pink-400/15 rounded-full blur-3xl floating-animation" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-3xl floating-animation" style={{animationDelay: '4s'}}></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50 mb-6">
                  <span className="w-2 h-2 bg-blue-500 rounded-full pulse-glow"></span>
                  <span className="text-sm font-medium text-blue-700">Latest HR Insights</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6 leading-tight">
                  HR Insights & Trends
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
                  Stay ahead with the latest HR insights, trends, and best practices. 
                  Curated by Prachi Shrivastava, India's leading virtual HR consultant.
                </p>
              </motion.div>

              {/* Advanced Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative max-w-2xl mx-auto mb-12"
              >
                <div className="relative">
                  <input 
                    type="text" 
                    value={search} 
                    onChange={e => handleSearchChange(e.target.value)} 
                    placeholder="Search HR topics, trends, or insights..." 
                    className="w-full px-8 py-5 rounded-2xl border-2 border-blue-200 focus:border-blue-500 transition-all duration-300 shadow-xl text-lg bg-white/80 backdrop-blur-sm focus:bg-white focus:shadow-2xl"
                    onKeyDown={(e) => {
                      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                        e.preventDefault();
                        e.target.focus();
                      }
                    }}
                    aria-label="Search blog posts"
                  />
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <kbd className="hidden md:inline-flex items-center px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded border">⌘K</kbd>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
              >
                <div className="glass-effect rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="text-3xl font-bold gradient-text mb-2">{posts.length}+</div>
                  <div className="text-gray-600 font-medium">Expert Articles</div>
                  <div className="text-sm text-gray-500 mt-1">Curated content</div>
                </div>
                <div className="glass-effect rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="text-3xl font-bold gradient-text mb-2">50K+</div>
                  <div className="text-gray-600 font-medium">Monthly Readers</div>
                  <div className="text-sm text-gray-500 mt-1">HR professionals</div>
                </div>
                <div className="glass-effect rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="text-3xl font-bold gradient-text mb-2">{blogCategories.length}</div>
                  <div className="text-gray-600 font-medium">Categories</div>
                  <div className="text-sm text-gray-500 mt-1">Specialized topics</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enhanced Categories Section */}
        <section className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Categories</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover insights across different HR domains and stay updated with industry trends</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <motion.button
                className={`px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  selectedCategory === 'All' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl scale-105' 
                    : 'bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-lg border border-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  handleCategoryChange('All');
                  trackEvent('blog_category_click', 'All');
                }}
              >
                <div className="text-lg mb-1">📚</div>
                <div className="text-sm">All Posts</div>
              </motion.button>
              
              {blogCategories.map((category, index) => (
                <motion.button
                  key={category.name}
                  onClick={() => {
                    handleCategoryChange(category.name);
                    trackEvent('blog_category_click', category.name);
                  }}
                  className={`px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                    selectedCategory === category.name 
                      ? `bg-gradient-to-r ${category.color} text-white shadow-xl scale-105` 
                      : 'bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-lg border border-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-lg mb-1">
                    {category.name === 'HR Strategy' && '🎯'}
                    {category.name === 'Cost Analysis' && '💰'}
                    {category.name === 'Employee Engagement' && '❤️'}
                    {category.name === 'Remote Work' && '🏠'}
                    {category.name === 'HR Tech' && '🤖'}
                  </div>
                  <div className="text-sm">{category.name}</div>
                  <div className="text-xs opacity-75 mt-1">{category.count}</div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Trending Topics */}
        <section className="py-12 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                <span className="text-2xl">🔥</span>
                Trending Topics
              </h3>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {trendingTopics.map((topic, index) => (
                <motion.span
                  key={topic}
                  className="px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => {
                    handleSearchChange(topic);
                    trackEvent('blog_trending_topic_click', topic);
                  }}
                >
                  {topic}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Posts Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold gradient-text mb-4">Featured Articles</h2>
              <p className="text-xl text-gray-600">Handpicked insights from our HR experts</p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {posts.filter(post => post.featured).slice(0, 2).map((post, index) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  index={index}
                  variant="featured"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Blog Posts Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />
            
            {/* Controls Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
                </h2>
                <p className="text-gray-600">
                  Showing {filtered.length} of {posts.length} articles
                  {search && ` for "${search}"`}
                  {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <select 
                  value={sortBy} 
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  aria-label="Sort articles by"
                >
                  <option value="latest">Latest</option>
                  <option value="popular">Popular</option>
                  <option value="trending">Trending</option>
                </select>
                
                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1" role="group" aria-label="View mode">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'
                    }`}
                    aria-label="Grid view"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'
                    }`}
                    aria-label="List view"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600 text-lg">Loading articles...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Something went wrong</h3>
                <p className="text-gray-600 mb-8 text-lg">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Try Again
                </button>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {search ? `No articles found for "${search}"` : 'No articles found'}
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  {search 
                    ? 'Try different keywords or browse our categories' 
                    : 'Try adjusting your search or category filter'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => { 
                      handleSearchChange(''); 
                      handleCategoryChange('All'); 
                    }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Clear Filters
                  </button>
                  {search && (
                    <button 
                      onClick={() => handleSearchChange('')}
                      className="px-8 py-4 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-300 hover:scale-105"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${viewMode}-${sortBy}-${selectedCategory}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className={viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
                    : "space-y-6"
                  }
                >
                  {currentPosts.map((post, index) => (
                    <BlogCard 
                      key={post.id} 
                      post={post} 
                      index={index}
                      variant={viewMode}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12"
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                    aria-label="Previous page"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                          currentPage === page
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                        aria-label={`Page ${page}`}
                        aria-current={currentPage === page ? 'page' : undefined}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                    aria-label="Next page"
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
                
                <div className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Enhanced Newsletter Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-effect rounded-3xl p-12 shadow-2xl"
              >
                <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                  Stay Updated with HR Trends
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Get the latest HR insights, tips, and industry updates delivered to your inbox. 
                  Join 10,000+ HR professionals who trust our content.
                </p>
                <NewsletterSignup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enhanced Guest Post CTA */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
                  <div className="absolute top-20 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
                  <div className="absolute bottom-20 left-20 w-12 h-12 border-2 border-white rounded-full"></div>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
                  Have HR Insights to Share?
                </h2>
                <p className="text-xl mb-8 opacity-90 relative z-10 max-w-2xl mx-auto">
                  We welcome guest contributions from HR professionals and industry experts. 
                  Share your expertise with our growing community.
                </p>
                <a 
                  href="/contact" 
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative z-10"
                  onClick={() => trackEvent('blog_guest_post_cta_click', 'Contact page')}
                >
                  Submit Guest Post
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        <HireWithPrachiFooter />
      </main>
    </>
  );
} 