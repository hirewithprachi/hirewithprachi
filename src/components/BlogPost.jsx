import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  getBlogTopicById, 
  getRelatedBlogTopics 
} from '../data/blogTopics';
import { 
  getBlogContent, 
  generateSchemaMarkup 
} from '../data/blogContent';
import { 
  servicesData, 
  getServiceById 
} from '../data/servicesData';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  ExternalLink,
  ChevronRight,
  Share2,
  Bookmark,
  MessageCircle,
  TrendingUp,
  Award,
  Target,
  Users,
  Star,
  Heart,
  Eye,
  ThumbsUp,
  // Download and Printer imports removed
  Mail,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Globe,
  CheckCircle,
  Lightbulb,
  Zap,
  Shield,
  ArrowUpRight,
  Quote,
  BarChart3,
  PieChart,
  Activity,
  TrendingDown,
  AlertCircle,
  Info,
  HelpCircle,
  Search,
  Filter,
  SortAsc,
  BookOpen,
  GraduationCap,
  Briefcase,
  Home,
  Phone,
  MapPin
} from 'lucide-react';

const BlogPost = ({ topicId }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showTableOfContents, setShowTableOfContents] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 20);
  const [views, setViews] = useState(Math.floor(Math.random() * 200) + 100);
  const [isLiked, setIsLiked] = useState(false);

  const topic = getBlogTopicById(topicId);
  const content = getBlogContent(topicId);
  const schemaMarkup = generateSchemaMarkup(topicId);
  const relatedTopics = getRelatedBlogTopics(topicId, 3);

  // Reading progress effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-increment views
  useEffect(() => {
    const timer = setInterval(() => {
      setViews(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  if (!topic || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md"
        >
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-6">The requested blog post could not be found.</p>
          <Link 
            to="/blog" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Back to Blog
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  const relatedServices = content.relatedServices.map(serviceId => 
    getServiceById(serviceId)
  ).filter(Boolean);

  const suggestedBlogs = content.suggestedBlogs.map(blogId => 
    getBlogTopicById(blogId)
  ).filter(Boolean);

  // Extract headings for table of contents
  const headings = content.content.match(/<h[2-3][^>]*>(.*?)<\/h[2-3]>/g) || [];
  const tableOfContents = headings.map((heading, index) => {
    const text = heading.replace(/<[^>]*>/g, '');
    const level = heading.match(/<h([2-3])/)[1];
    return { text, level: parseInt(level), id: `heading-${index}` };
  });

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = content.title;
    const text = content.metaDescription;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`
    };
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  const handleLike = () => {
    if (!isLiked) {
      setLikes(prev => prev + 1);
      setIsLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setIsLiked(false);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{content.title}</title>
        <meta name="title" content={content.title} />
        <meta name="description" content={content.metaDescription} />
        <meta name="keywords" content={topic.keywords.join(', ')} />
        <meta name="author" content="Prachi Shrivastava" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://hirewithprachi.com/blog/${topic.slug}`} />
        <meta property="og:title" content={content.title} />
        <meta property="og:description" content={content.metaDescription} />
        <meta property="og:image" content="https://hirewithprachi.com/blog-og-image.png" />
        <meta property="og:site_name" content="Hire With Prachi" />
        <meta property="og:locale" content="en_US" />
        <meta property="article:published_time" content={topic.publishDate} />
        <meta property="article:author" content="Prachi Shrivastava" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://hirewithprachi.com/blog/${topic.slug}`} />
        <meta property="twitter:title" content={content.title} />
        <meta property="twitter:description" content={content.metaDescription} />
        <meta property="twitter:image" content="https://hirewithprachi.com/blog-twitter-image.png" />
        <meta property="twitter:creator" content="@hirewithprachi" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Hire With Prachi Blog" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://hirewithprachi.com/blog/${topic.slug}`} />
        
        {/* Schema Markup */}
        {schemaMarkup && (
          <>
            <script type="application/ld+json">
              {JSON.stringify(schemaMarkup.article)}
            </script>
            <script type="application/ld+json">
              {JSON.stringify(schemaMarkup.faq)}
            </script>
            <script type="application/ld+json">
              {JSON.stringify(schemaMarkup.breadcrumb)}
            </script>
          </>
        )}
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
            style={{ width: `${readingProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Enhanced Breadcrumb Navigation */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Link to="/" className="hover:text-blue-600 transition-colors flex items-center">
                  <Home className="h-4 w-4 mr-1" />
                  Home
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link to="/blog" className="hover:text-blue-600 transition-colors flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  Blog
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-gray-900 font-medium truncate max-w-xs">{content.title}</span>
              </div>
              
              {/* Quick Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleBookmark}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    isBookmarked 
                      ? 'bg-yellow-100 text-yellow-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
                >
                  <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
                
                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300"
                    title="Share this article"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  
                  <AnimatePresence>
                    {showShareMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-2 min-w-[200px]"
                      >
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handleShare('twitter')}
                            className="flex items-center p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                          >
                            <Twitter className="h-4 w-4 mr-2" />
                            Twitter
                          </button>
                          <button
                            onClick={() => handleShare('facebook')}
                            className="flex items-center p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                          >
                            <Facebook className="h-4 w-4 mr-2" />
                            Facebook
                          </button>
                          <button
                            onClick={() => handleShare('linkedin')}
                            className="flex items-center p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                          >
                            <Linkedin className="h-4 w-4 mr-2" />
                            LinkedIn
                          </button>
                          <button
                            onClick={() => handleShare('whatsapp')}
                            className="flex items-center p-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors"
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            WhatsApp
                          </button>
                          <button
                            onClick={() => handleShare('email')}
                            className="flex items-center p-2 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Table of Contents */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <BookOpen className="h-5 w-5 mr-2" />
                      Table of Contents
                    </h3>
                    <button
                      onClick={() => setShowTableOfContents(!showTableOfContents)}
                      className="lg:hidden p-1 rounded-lg hover:bg-gray-100"
                    >
                      <ChevronRight className={`h-4 w-4 transition-transform ${showTableOfContents ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                  
                  <div className={`${showTableOfContents ? 'block' : 'hidden lg:block'}`}>
                    <nav className="space-y-2">
                      {tableOfContents.map((item, index) => (
                        <a
                          key={index}
                          href={`#${item.id}`}
                          className={`block text-sm py-2 px-3 rounded-lg transition-all duration-300 ${
                            item.level === 2 
                              ? 'font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-600' 
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 ml-4'
                          }`}
                        >
                          {item.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                </motion.div>

                {/* Article Stats */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-lg p-6 mt-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Article Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Views</span>
                      <span className="text-sm font-medium text-gray-900 flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {views.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Likes</span>
                      <span className="text-sm font-medium text-gray-900 flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {likes}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Reading Time</span>
                      <span className="text-sm font-medium text-gray-900 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {topic.readTime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Category</span>
                      <span className="text-sm font-medium text-blue-600">{topic.category}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Enhanced Article Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-100 to-blue-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
                  
                  {/* Category Badge */}
                  <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 mb-6 border border-blue-200">
                    <Target className="h-4 w-4 mr-2" />
                    {topic.category}
                  </div>

                  {/* Title */}
                  <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                    {content.title}
                  </h1>

                  {/* Enhanced Meta Information */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
                    <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                      <User className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="font-medium">Prachi Shrivastava</span>
                    </div>
                    <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                      <Calendar className="h-4 w-4 mr-2 text-green-600" />
                      <span className="font-medium">{new Date(topic.publishDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                      <Clock className="h-4 w-4 mr-2 text-orange-600" />
                      <span className="font-medium">{topic.readTime}</span>
                    </div>
                  </div>

                  {/* Enhanced Featured Image */}
                  <div className="relative w-full h-80 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-2xl mb-8 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-8xl mb-6 animate-pulse">🌟</div>
                        <h2 className="text-2xl font-bold mb-2">HR Excellence</h2>
                        <p className="text-lg opacity-90">Employee Experience & Culture Building</p>
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-white text-sm font-medium">Featured Article</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={handleLike}
                      className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                        isLiked 
                          ? 'bg-red-100 text-red-600 border border-red-200' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                      }`}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                      {isLiked ? 'Liked' : 'Like'} ({likes})
                    </button>
                    
                    {/* Print and download buttons removed as requested */}
                  </div>
                </div>
              </motion.div>

                                {/* Enhanced Article Content */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-xl p-8 mb-8 relative overflow-hidden"
                      >
                        {/* Content Background Pattern */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full -translate-y-10 translate-x-10 opacity-30"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-indigo-50 to-blue-50 rounded-full translate-y-8 -translate-x-8 opacity-30"></div>
                        
                        {/* Content Header */}
                        <div className="mb-8 pb-6 border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                              <BookOpen className="h-6 w-6 mr-3 text-blue-600" />
                              Article Content
                            </h2>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                {content.content.split(' ').length} words
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Content */}
                        <div
                          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-2xl prose-h2:mb-6 prose-h2:mt-8 prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-6 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-ul:list-disc prose-ul:pl-6 prose-li:text-gray-700 prose-li:mb-2 prose-strong:text-gray-900 prose-strong:font-semibold prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-700 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600"
                          dangerouslySetInnerHTML={{ __html: content.content }}
                        />

                        {/* Content Footer */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <span className="text-sm text-gray-500">Last updated: {new Date(topic.publishDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500">Share this article:</span>
                              <button
                                onClick={() => handleShare('twitter')}
                                className="p-2 text-blue-400 hover:text-blue-600 transition-colors"
                                title="Share on Twitter"
                              >
                                <Twitter className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleShare('linkedin')}
                                className="p-2 text-blue-400 hover:text-blue-600 transition-colors"
                                title="Share on LinkedIn"
                              >
                                <Linkedin className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Enhanced FAQ Section */}
                      {content.faqs && content.faqs.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          className="bg-white rounded-2xl shadow-xl p-8 mb-8 relative overflow-hidden"
                        >
                          {/* FAQ Background Pattern */}
                          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-50 to-blue-50 rounded-full -translate-y-12 translate-x-12 opacity-40"></div>
                          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-50 to-pink-50 rounded-full translate-y-10 -translate-x-10 opacity-40"></div>
                          
                          {/* FAQ Header */}
                          <div className="mb-8 pb-6 border-b border-gray-200">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                              <HelpCircle className="h-8 w-8 mr-3 text-blue-600" />
                              Frequently Asked Questions
                            </h2>
                            <p className="text-gray-600 text-lg">Find answers to common questions about employee experience and culture building.</p>
                          </div>
                          
                          <div className="space-y-6">
                            {content.faqs.map((faq, index) => (
                              <motion.div 
                                key={index} 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-gray-50 to-white"
                              >
                                <div className="flex items-start space-x-4">
                                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                                      <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                                      {faq.question}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed text-lg">{faq.answer}</p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                          
                          {/* FAQ Footer */}
                          <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="text-center">
                              <p className="text-gray-600 mb-4">Still have questions? We're here to help!</p>
                              <Link 
                                to="/contact"
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                              >
                                <MessageCircle className="h-5 w-5 mr-2" />
                                Contact Our Experts
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}

          {/* Enhanced Related Services Section */}
          {relatedServices.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8 relative overflow-hidden"
            >
              {/* Services Background Pattern */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full -translate-y-14 translate-x-14 opacity-40"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-50 to-pink-50 rounded-full translate-y-12 -translate-x-12 opacity-40"></div>
              
              {/* Services Header */}
              <div className="mb-8 pb-6 border-b border-gray-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                  <Briefcase className="h-8 w-8 mr-3 text-blue-600" />
                  Related Services
                </h2>
                <p className="text-gray-600 text-lg">Discover our comprehensive HR services that can help you implement these strategies.</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedServices.map((service, index) => (
                  <motion.div 
                    key={service.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-indigo-50 relative overflow-hidden"
                  >
                    {/* Service Card Background */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-8 translate-x-8 opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    
                    <div className="relative z-10">
                      <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                      <Link 
                        to={`/services/${service.id}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold group-hover:translate-x-1 transition-all duration-300"
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Link 
                  to="/services"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Globe className="h-5 w-5 mr-2" />
                  Explore All Services
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* Enhanced Suggested Blogs Section */}
          {suggestedBlogs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8 relative overflow-hidden"
            >
              {/* Blogs Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-50 to-blue-50 rounded-full -translate-y-16 translate-x-16 opacity-40"></div>
              <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-orange-50 to-red-50 rounded-full translate-y-14 -translate-x-14 opacity-40"></div>
              
              {/* Blogs Header */}
              <div className="mb-8 pb-6 border-b border-gray-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="h-8 w-8 mr-3 text-blue-600" />
                  Suggested Reading
                </h2>
                <p className="text-gray-600 text-lg">Continue your HR learning journey with these related articles.</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestedBlogs.map((blog, index) => (
                  <motion.div 
                    key={blog.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 hover:from-green-50 hover:to-blue-50 relative overflow-hidden"
                  >
                    {/* Blog Card Background */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-full -translate-y-10 translate-x-10 opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    
                    <div className="relative z-10">
                      <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                        📖
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">{blog.metaDescription}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {blog.readTime}
                        </span>
                        <Link 
                          to={`/blog/${blog.slug}`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold group-hover:translate-x-1 transition-all duration-300"
                        >
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Link 
                  to="/blog"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Explore All Articles
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default BlogPost; 