import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import NewsletterSignup from "../components/NewsletterSignup";
import Breadcrumbs from "../components/Breadcrumbs";
import { motion, AnimatePresence } from "framer-motion";
import HireWithPrachiTopBar from '../components/hirable/HirableTopBar';
import HireWithPrachiHeader from '../components/hirable/HirableHeader';
import HireWithPrachiFooter from '../components/hirable/HirableFooter';
import GPT4oMiniChatbot from '../components/GPT4oMiniChatbot';
import BlogCard from '../components/BlogCard';
import { blogPosts, blogCategories, trendingTopics } from '../data/blogPosts';
import { blogTopics, getFeaturedBlogTopics } from '../data/blogTopics';
import SEOOptimizer from '../components/SEOOptimizer';
import { supabase } from '../lib/supabase';

export default function Blog() {
  // SEO Data for Blog page
  const seoData = {
    title: "HR Blog - Latest HR Insights & Tips | Hire With Prachi",
    description: "Latest HR insights, compliance updates, recruitment tips, and employee engagement strategies. Expert HR blog for Indian businesses.",
    keywords: "HR blog, HR insights, HR tips, HR compliance, recruitment tips, employee engagement",
    pageType: "blog",
    pageData: {
      title: "HR Blog - Latest Insights & Tips",
      description: "Expert HR insights and strategies for Indian businesses",
      image: "https://hirewithprachi.com/assets/images/hr-blog-1200x630.jpg"
    }
  };

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

  // Load blog posts from our data file and database
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate loading for better UX
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Fetch blog posts from database
        console.log('🔍 Blog: Fetching blog posts from database...');
        const { data: dbPosts, error: dbError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .order('published_at', { ascending: false });
        
        if (dbError) {
          console.error('❌ Blog: Error fetching from database:', dbError);
        } else {
          console.log('✅ Blog: Fetched', dbPosts?.length || 0, 'posts from database');
        }
        
        // Transform database posts to match static post format
        const transformedDbPosts = (dbPosts || []).map(post => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt || 'No excerpt available',
          content: post.content || '',
          author: 'Prachi Shrivastava',
          date: post.published_at || post.created_at,
          category: post.category || 'HR Strategy',
          readTime: '5 min read', // Default read time
          featured: false, // Default to not featured
          tags: post.tags || [],
          image: post.featured_image_url || 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          slug: post.slug,
          source: 'database' // Mark as database post
        }));
        
        // Combine existing blog posts with new blog topics
        const staticPosts = [...blogPosts, ...blogTopics.map(topic => {
          // Set specific images for certain blog posts
          let image = 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
          
          // Use specific images for certain blog posts
          if (topic.slug === 'hr-outsourcing-services-guide') {
            image = '/assets/images/HR Outsourcing Services When and How to Outsource HR Functions.svg';
          } else if (topic.slug === 'hiring-recruitment-startups-strategic-approach') {
            image = '/assets/images/Hiring & Recruitment for Startups A Strategic Approach.png';
          } else if (topic.slug === 'employee-handbook-design-best-practices') {
            image = '/assets/images/Employee Handbook Design Best Practices for Modern Organizations.png';
          } else if (topic.slug === 'posh-compliance-complete-guide-2025') {
            image = '/assets/images/POSH Compliance Complete Guide for 2025.png';
          } else if (topic.slug === 'contractual-freelance-hr-support') {
            image = '/assets/images/Flexible HR Support for the Modern Workplace.svg';
          } else if (topic.slug === 'employee-experience-culture-building') {
            image = '/assets/images/Employee Experience & Culture Building.svg';
          } else if (topic.slug === 'workplace-policy-education-institutes') {
            image = '/assets/images/Workplace Policy for Education Institutes Ensuring Safety and Compliance.svg';
          } else if (topic.slug === 'women-safety-legal-hr-setup') {
            image = '/assets/images/Women Safety & Legal HR Setup Creating Inclusive Workplaces.svg';
          } else if (topic.slug === 'labor-law-compliance-advisory') {
            image = '/assets/images/Labor Law & Compliance Advisory.svg';
          }
          
          return {
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
            image: image,
            slug: topic.slug,
            source: 'static' // Mark as static post
          };
        })];
        
        // Combine static and database posts, prioritizing database posts (newer)
        const allPosts = [...transformedDbPosts, ...staticPosts];
        
        console.log('✅ Blog: Total posts loaded:', allPosts.length);
        console.log('   - Database posts:', transformedDbPosts.length);
        console.log('   - Static posts:', staticPosts.length);
        
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
      {/* Comprehensive SEO Optimization */}
      <SEOOptimizer
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        image={seoData.pageData.image}
        pageType={seoData.pageType}
        pageData={seoData.pageData}
        canonical="https://hirewithprachi.com/blog"
      />
      
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
        <GPT4oMiniChatbot />

        {/* Ultra-Futuristic Blog Hero Section */}
        <section className="relative min-h-[90vh] bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 overflow-hidden">
          {/* Advanced Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Neural Network Grid */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="neural-grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="5" cy="5" r="0.5" fill="white" opacity="0.3">
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    <line x1="5" y1="0" x2="5" y2="10" stroke="white" strokeWidth="0.1" opacity="0.2">
                      <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite"/>
                    </line>
                    <line x1="0" y1="5" x2="10" y2="5" stroke="white" strokeWidth="0.1" opacity="0.2">
                      <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.5s" repeatCount="indefinite"/>
                    </line>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#neural-grid)"/>
              </svg>
          </div>
          
            {/* Holographic Gradient Mesh */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/95 to-blue-900/90"></div>
            
            {/* Quantum Floating Orbs with Holographic Effects */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64">
              <div className="w-full h-full bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-400/5 to-blue-400/5 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80">
              <div className="w-full h-full bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400/5 to-indigo-400/5 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96">
              <div className="w-full h-full bg-gradient-to-r from-indigo-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-400/8 to-purple-400/8 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2.5s'}}></div>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-400/3 to-purple-400/3 rounded-full blur-xl animate-pulse" style={{animationDelay: '3s'}}></div>
            </div>
            
            {/* Futuristic Geometric Patterns */}
            <div className="absolute top-0 left-0 w-full h-full opacity-15">
              <div className="absolute top-20 left-20 w-32 h-32 border border-white/30 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
              <div className="absolute top-40 right-32 w-24 h-24 border border-white/30 rotate-45 animate-pulse"></div>
              <div className="absolute bottom-32 left-1/3 w-40 h-40 border border-white/30 rounded-full animate-spin" style={{animationDuration: '25s', animationDirection: 'reverse'}}></div>
              <div className="absolute bottom-20 right-20 w-28 h-28 border border-white/30 rotate-12 animate-pulse"></div>
              
              {/* Hexagonal Patterns */}
              <div className="absolute top-1/3 left-1/6 w-16 h-16 border border-white/20 rotate-45 animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-1/3 right-1/6 w-12 h-12 border border-white/20 rotate-12 animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>
            
            {/* AI-Powered Floating Particles with Trails */}
            <div className="absolute top-1/3 left-1/6 w-2 h-2">
              <div className="w-full h-full bg-purple-300 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
              <div className="absolute top-0 left-0 w-full h-full bg-purple-300/50 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
            </div>
            <div className="absolute top-2/3 right-1/4 w-1 h-1">
              <div className="w-full h-full bg-blue-300 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-0 left-0 w-full h-full bg-blue-300/50 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
            </div>
            <div className="absolute bottom-1/3 left-2/3 w-1.5 h-1.5">
              <div className="w-full h-full bg-indigo-300 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
              <div className="absolute top-0 left-0 w-full h-full bg-indigo-300/50 rounded-full animate-ping" style={{animationDelay: '2.5s'}}></div>
            </div>
            <div className="absolute top-1/4 right-1/3 w-1 h-1">
              <div className="w-full h-full bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '3s'}}></div>
              <div className="absolute top-0 left-0 w-full h-full bg-purple-400/50 rounded-full animate-ping" style={{animationDelay: '3.5s'}}></div>
            </div>
            
            {/* Data Stream Effect */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse"></div>
              <div className="absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-3/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" style={{animationDelay: '1.5s'}}></div>
            </div>
          </div>

          {/* Main Content with Ultra-Modern Design */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            {/* Breadcrumbs integrated into hero */}
              <motion.div
              initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 text-center"
            >
              <Breadcrumbs variant="dark" />
            </motion.div>
            
            <div className="text-center">
              {/* Ultra-Premium AI Badge */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md px-8 py-4 rounded-full border border-white/20 mb-8 shadow-2xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                  <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                </div>
                <span className="text-white text-sm font-bold uppercase tracking-widest">AI-Powered HR Insights & Trends</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.9s'}}></div>
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full animate-pulse" style={{animationDelay: '1.2s'}}></div>
                  <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
                </div>
              </motion.div>

              {/* Ultra-Modern Main Headline with Holographic Effect */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight mb-6 text-white relative"
              >
                <span className="relative">
                  HR <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">Insights</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-indigo-400/20 blur-xl animate-pulse"></div>
                </span>
                <br />
                <span className="relative">
                  That Drive <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-pulse" style={{animationDelay: '0.5s'}}>Success</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 blur-xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
                </span>
              </motion.h1>

              {/* Futuristic Subheadline with Glitch Effect */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-white/90 text-lg md:text-xl lg:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed font-medium relative"
              >
                <span className="relative">
                  Stay ahead with expert insights, trends, and best practices from India's leading virtual HR consultant.
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-blue-400/10 blur-sm animate-pulse" style={{animationDelay: '1s'}}></div>
                </span>
                <br />
                <span className="relative">
                  Transform your business with actionable strategies and proven solutions.
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 blur-sm animate-pulse" style={{animationDelay: '1.5s'}}></div>
                </span>
              </motion.p>

              {/* Ultra-Modern Interactive Stats with Holographic Cards */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
              >
                <motion.div 
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:shadow-2xl relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">{posts.length}+</div>
                    <div className="text-white/80 text-sm md:text-base">Expert Articles</div>
                  </div>
              </motion.div>

              <motion.div
                  whileHover={{ scale: 1.05, rotateY: -5 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:shadow-2xl relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">50K+</div>
                    <div className="text-white/80 text-sm md:text-base">Monthly Readers</div>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:shadow-2xl relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">{blogCategories.length}</div>
                    <div className="text-white/80 text-sm md:text-base">HR Categories</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Ultra-Premium AI-Powered Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="max-w-2xl mx-auto mb-8"
              >
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-white/60 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search articles, topics, or keywords..."
                    value={search} 
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/30"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </motion.div>

              {/* Premium CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="group relative inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-sm shadow-xl hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    {viewMode === 'grid' ? 'List View' : 'Grid View'}
                  </span>
                </button>
                
                <button
                  onClick={() => setSortBy(sortBy === 'latest' ? 'popular' : 'latest')}
                  className="group relative inline-flex items-center px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold text-sm hover:bg-white/20 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    {sortBy === 'latest' ? 'Popular Posts' : 'Latest Posts'}
                  </span>
                </button>
              </motion.div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/5 to-transparent"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-transparent rounded-full blur-3xl"></div>
        </section>

        {/* Ultra-Futuristic Categories Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 relative overflow-hidden">
          {/* Futuristic Background Elements */}
          <div className="absolute inset-0">
            {/* Neural Network Grid */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="neural-grid-categories" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                    <circle cx="4" cy="4" r="0.3" fill="white" opacity="0.4">
                      <animate attributeName="opacity" values="0.4;1;0.4" dur="4s" repeatCount="indefinite"/>
                    </circle>
                    <line x1="4" y1="0" x2="4" y2="8" stroke="white" strokeWidth="0.05" opacity="0.3">
                      <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite"/>
                    </line>
                    <line x1="0" y1="4" x2="8" y2="4" stroke="white" strokeWidth="0.05" opacity="0.3">
                      <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.5s" repeatCount="indefinite"/>
                    </line>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#neural-grid-categories)"/>
              </svg>
            </div>
            
            {/* Floating Quantum Particles */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Explore Categories
                </span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                Discover insights across different HR domains and stay updated with industry trends
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
              <motion.button
                className={`relative group overflow-hidden rounded-2xl font-semibold transition-all duration-500 ${
                  selectedCategory === 'All' 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-2xl scale-105' 
                    : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20'
                }`}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  handleCategoryChange('All');
                  trackEvent('blog_category_click', 'All');
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 p-6">
                  <div className="text-2xl mb-2">📚</div>
                  <div className="text-sm font-bold">All Posts</div>
                  <div className="text-xs opacity-75 mt-1">{posts.length} articles</div>
                </div>
              </motion.button>
              
              {blogCategories.map((category, index) => (
                <motion.button
                  key={category.name}
                  onClick={() => {
                    handleCategoryChange(category.name);
                    trackEvent('blog_category_click', category.name);
                  }}
                  className={`relative group overflow-hidden rounded-2xl font-semibold transition-all duration-500 ${
                    selectedCategory === category.name 
                      ? `bg-gradient-to-r ${category.color} text-white shadow-2xl scale-105` 
                      : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20'
                  }`}
                  whileHover={{ scale: 1.05, rotateY: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 p-6">
                    <div className="text-2xl mb-2">
                      {category.name === 'HR Strategy' && '🎯'}
                      {category.name === 'Cost Analysis' && '💰'}
                      {category.name === 'Employee Engagement' && '❤️'}
                      {category.name === 'Remote Work' && '🏠'}
                      {category.name === 'HR Tech' && '🤖'}
                    </div>
                    <div className="text-sm font-bold">{category.name}</div>
                    <div className="text-xs opacity-75 mt-1">{category.count} articles</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Ultra-Futuristic Latest Articles Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
          {/* Futuristic Background Elements */}
          <div className="absolute inset-0">
            {/* Quantum Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="quantum-grid" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
                    <circle cx="2.5" cy="2.5" r="0.2" fill="purple" opacity="0.6">
                      <animate attributeName="opacity" values="0.6;1;0.6" dur="5s" repeatCount="indefinite"/>
                    </circle>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#quantum-grid)"/>
              </svg>
            </div>
            
            {/* Floating Holographic Elements */}
            <div className="absolute top-20 left-20 w-32 h-32 border border-purple-300/30 rounded-full animate-spin" style={{animationDuration: '30s'}}></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 border border-blue-300/30 rounded-full animate-spin" style={{animationDuration: '25s', animationDirection: 'reverse'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-indigo-300/20 rounded-full animate-pulse"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Ultra-Modern Controls Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6"
            >
              <div className="text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
                  </span>
                </h2>
                <p className="text-lg text-gray-600">
                  Showing <span className="font-bold text-purple-600">{filtered.length}</span> of <span className="font-bold text-blue-600">{posts.length}</span> articles
                  {search && (
                    <span className="block mt-1">
                      Results for <span className="font-bold text-indigo-600">"{search}"</span>
                    </span>
                  )}
                  {selectedCategory !== 'All' && (
                    <span className="block mt-1">
                      in <span className="font-bold text-purple-600">{selectedCategory}</span>
                    </span>
                  )}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Ultra-Modern Sort Dropdown */}
                <div className="relative group">
                  <select 
                    value={sortBy} 
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="appearance-none px-6 py-3 rounded-xl border-2 border-purple-200 bg-white/80 backdrop-blur-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 text-gray-700 font-semibold pr-12 cursor-pointer hover:border-purple-300"
                    aria-label="Sort articles by"
                  >
                    <option value="latest">Latest</option>
                    <option value="popular">Popular</option>
                    <option value="trending">Trending</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
                
                {/* Ultra-Modern View Mode Toggle */}
                <div className="flex bg-white/80 backdrop-blur-sm rounded-xl p-1 border border-purple-200" role="group" aria-label="View mode">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      viewMode === 'grid' 
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
                        : 'text-gray-600 hover:text-purple-600'
                    }`}
                    aria-label="Grid view"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      viewMode === 'list' 
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
                        : 'text-gray-600 hover:text-purple-600'
                    }`}
                    aria-label="List view"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
            
            {loading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mb-4"></div>
                <p className="text-gray-600 text-lg font-semibold">Loading articles...</p>
              </motion.div>
            ) : error ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Something went wrong</h3>
                <p className="text-gray-600 mb-8 text-lg">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Try Again
                </button>
              </motion.div>
            ) : filtered.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
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
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
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
              </motion.div>
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

        {/* Ultra-Futuristic Newsletter Section */}
        <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 relative overflow-hidden">
          {/* Advanced Futuristic Background Elements */}
          <div className="absolute inset-0">
            {/* Neural Network Grid */}
            <div className="absolute inset-0 opacity-15">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="neural-grid-newsletter" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
                    <circle cx="3" cy="3" r="0.4" fill="white" opacity="0.4">
                      <animate attributeName="opacity" values="0.4;1;0.4" dur="4s" repeatCount="indefinite"/>
                    </circle>
                    <line x1="3" y1="0" x2="3" y2="6" stroke="white" strokeWidth="0.1" opacity="0.3">
                      <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite"/>
                    </line>
                    <line x1="0" y1="3" x2="6" y2="3" stroke="white" strokeWidth="0.1" opacity="0.3">
                      <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.5s" repeatCount="indefinite"/>
                    </line>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#neural-grid-newsletter)"/>
              </svg>
            </div>
            
            {/* Quantum Floating Orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64">
              <div className="w-full h-full bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80">
              <div className="w-full h-full bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '3s'}}></div>
            </div>
            
            {/* Holographic Data Streams */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse"></div>
              <div className="absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-3/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" style={{animationDelay: '1.5s'}}></div>
            </div>
            
            {/* Floating Particles */}
            <div className="absolute top-1/3 left-1/6 w-2 h-2 bg-purple-300 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
            <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-1/3 left-2/3 w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '3s'}}></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                {/* Ultra-Futuristic Glass Effect Container */}
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-12 md:p-16 shadow-2xl border border-white/20 overflow-hidden">
                  {/* Holographic Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-blue-400/10 to-indigo-400/10 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Geometric Patterns */}
                  <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-10 left-10 w-20 h-20 border border-white/30 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
                    <div className="absolute top-20 right-20 w-16 h-16 border border-white/30 rotate-45 animate-pulse"></div>
                    <div className="absolute bottom-20 left-20 w-12 h-12 border border-white/30 rounded-full animate-spin" style={{animationDuration: '25s', animationDirection: 'reverse'}}></div>
                  </div>
                  
                  <div className="relative z-10 text-center">
                    {/* Ultra-Modern Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-8"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
                        <div className="w-1 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                        <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                      </div>
                      <span className="text-white text-sm font-bold uppercase tracking-widest">AI-Powered HR Insights</span>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full animate-pulse" style={{animationDelay: '0.9s'}}></div>
                        <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full animate-pulse" style={{animationDelay: '1.2s'}}></div>
                        <div className="w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
                      </div>
                    </motion.div>

                    {/* Ultra-Modern Headline */}
                    <motion.h2
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-8 text-white"
                    >
                      <span className="relative">
                        Stay Updated with
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-indigo-400/20 blur-xl animate-pulse"></div>
                      </span>
                      <br />
                      <span className="relative">
                        <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
                          HR Trends
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-indigo-400/20 blur-xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
                      </span>
                    </motion.h2>

                    {/* Ultra-Modern Subheadline */}
                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="text-white/90 text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
                    >
                      Get the latest HR insights, tips, and industry updates delivered to your inbox. 
                      Join <span className="font-bold text-purple-300">10,000+</span> HR professionals who trust our AI-powered content.
                    </motion.p>

                    {/* Ultra-Modern Stats */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:shadow-2xl relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                          <div className="text-3xl md:text-4xl font-bold text-white mb-2">10K+</div>
                          <div className="text-white/80 text-sm md:text-base">HR Professionals</div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.05, rotateY: -5 }}
                        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:shadow-2xl relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                          <div className="text-3xl md:text-4xl font-bold text-white mb-2">Weekly</div>
                          <div className="text-white/80 text-sm md:text-base">AI-Curated Content</div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:shadow-2xl relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                          <div className="text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
                          <div className="text-white/80 text-sm md:text-base">Free & Valuable</div>
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Ultra-Modern Newsletter Component */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.0 }}
                    >
                      <NewsletterSignup />
                    </motion.div>
                  </div>
                </div>
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