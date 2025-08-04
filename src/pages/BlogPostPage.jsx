import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
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
  MapPin,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus
} from 'lucide-react';
import BlogPost from '../components/BlogPost';
import { getBlogTopicBySlug } from '../data/blogTopics';
import { getPostBySlug } from '../data/blogPosts';
import { servicesData } from '../data/servicesData';
import Breadcrumbs from '../components/Breadcrumbs';
import HireWithPrachiTopBar from '../components/hirable/HirableTopBar';
import HireWithPrachiHeader from '../components/hirable/HirableHeader';
import HireWithPrachiFooter from '../components/hirable/HirableFooter';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 20);
  const [views, setViews] = useState(Math.floor(Math.random() * 200) + 100);
  const [isLiked, setIsLiked] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  
  // First try to find the post in blogPosts.js (for featured posts from HR Insights section)
  const blogPost = getPostBySlug(slug);
  
  // If not found in blogPosts.js, try blogTopics.js
  const topic = blogPost ? null : getBlogTopicBySlug(slug);

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

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blogPost?.title || topic?.title;
    const text = blogPost?.excerpt || topic?.metaDescription;

    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
        break;
      default:
        return;
    }
    window.open(shareUrl, '_blank');
    setShowShareMenu(false);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // FAQ Data
  const faqData = [
    {
      question: "What are the key HR compliance requirements for Indian companies?",
      answer: "Indian companies must comply with various labor laws including the Industrial Disputes Act, Factories Act, Minimum Wages Act, and POSH (Prevention of Sexual Harassment) Act. Regular audits and policy updates are essential."
    },
    {
      question: "How can virtual HR services benefit startups?",
      answer: "Virtual HR services provide cost-effective access to professional HR expertise, compliance management, recruitment support, and policy development without the overhead of a full-time HR department."
    },
    {
      question: "What is the importance of employee engagement in modern workplaces?",
      answer: "Employee engagement directly impacts productivity, retention, and company culture. Engaged employees are more motivated, loyal, and contribute positively to organizational success."
    },
    {
      question: "How often should companies review their HR policies?",
      answer: "HR policies should be reviewed annually or whenever there are significant legal changes. Regular updates ensure compliance and alignment with current best practices."
    }
  ];
  
  if (!blogPost && !topic) {
    return (
      <>
        <Helmet>
          <title>Blog Post Not Found | Hire With Prachi</title>
          <meta name="description" content="The requested blog post could not be found. Browse our HR blog for insights and resources." />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
          <HireWithPrachiTopBar />
          <HireWithPrachiHeader />
          
          <div className="pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <Breadcrumbs />
              
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">
                  <div className="text-8xl mb-6">📝</div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-6">Blog Post Not Found</h1>
                  <p className="text-gray-600 mb-8 text-lg">The requested blog post could not be found. It may have been moved or deleted.</p>
                  <div className="space-y-4">
                <Link 
                  to="/blog" 
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-xl transition-all duration-300 font-semibold text-lg"
                >
                      <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
                  Back to Blog
                </Link>
                <Link 
                  to="/" 
                      className="block text-blue-600 hover:text-blue-700 transition-colors text-lg"
                >
                  Return to Homepage
                </Link>
              </div>
            </div>
          </motion.div>
            </div>
          </div>
          
          <HireWithPrachiFooter />
        </div>
      </>
    );
  }

  // If we have a blogPost from blogPosts.js, render it directly
  if (blogPost) {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": blogPost.title,
      "description": blogPost.metaDescription || blogPost.excerpt,
      "author": {
        "@type": "Person",
        "name": "Prachi Shrivastava",
        "jobTitle": "Virtual HR Consultant",
        "url": "https://hirewithprachi.com/about"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Hire With Prachi",
        "logo": {
          "@type": "ImageObject",
          "url": "https://hirewithprachi.com/logo.png"
        }
      },
      "datePublished": blogPost.date,
      "dateModified": blogPost.date,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://hirewithprachi.com/blog/${slug}`
      },
      "image": blogPost.image || "https://hirewithprachi.com/default-blog-image.jpg",
      "keywords": blogPost.seoKeywords?.join(", ") || "HR consulting, virtual HR, HR services",
      "articleSection": blogPost.category || "HR Consulting",
      "wordCount": blogPost.content?.length || 1000
    };

    return (
      <>
        <Helmet>
          <title>{blogPost.title} | Hire With Prachi</title>
          <meta name="description" content={blogPost.metaDescription || blogPost.excerpt} />
          <meta name="keywords" content={blogPost.seoKeywords?.join(", ")} />
          <meta property="og:title" content={blogPost.title} />
          <meta property="og:description" content={blogPost.metaDescription || blogPost.excerpt} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`https://hirewithprachi.com/blog/${slug}`} />
          <meta property="og:image" content={blogPost.image || "https://hirewithprachi.com/default-blog-image.jpg"} />
          <meta property="article:published_time" content={blogPost.date} />
          <meta property="article:author" content="Prachi Shrivastava" />
          <meta property="article:section" content={blogPost.category} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={blogPost.title} />
          <meta name="twitter:description" content={blogPost.metaDescription || blogPost.excerpt} />
          <meta name="twitter:image" content={blogPost.image || "https://hirewithprachi.com/default-blog-image.jpg"} />
          <link rel="canonical" href={`https://hirewithprachi.com/blog/${slug}`} />
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        </Helmet>
        
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
          <HireWithPrachiTopBar />
          <HireWithPrachiHeader />
          
          {/* Reading Progress Bar */}
          <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
              style={{ width: `${readingProgress}%` }}
            />
          </div>

          <div className="pt-24 pb-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <Breadcrumbs />
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100"
                  >
              {/* Article Header */}
              <div className="mb-8">
                      <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 mb-6">
                  {blogPost.category}
                </div>
                      <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {blogPost.title}
                      </h1>
                      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
                  <div className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                    <span>{blogPost.author}</span>
                  </div>
                  <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(blogPost.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                    <span>{blogPost.readTime}</span>
                  </div>
                </div>
                
                {/* Featured Image */}
                {blogPost.image && (
                        <div className="w-full h-64 lg:h-80 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-8 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-6xl mb-4">📊</div>
                      <h2 className="text-2xl font-bold">HR Insights</h2>
                    </div>
                  </div>
                )}
              </div>

              {/* Article Content */}
                    <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600">
                <div dangerouslySetInnerHTML={{ __html: blogPost.content.replace(/\n/g, '<br/>') }} />
              </div>

              {/* Article Footer */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">Tags:</span>
                    {blogPost.tags?.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={handleLike}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                              isLiked 
                                ? 'bg-red-100 text-red-600' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                            <span>{likes}</span>
                          </button>
                          <button
                            onClick={handleBookmark}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                              isBookmarked 
                                ? 'bg-blue-100 text-blue-600' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                          </button>
                          <div className="relative">
                            <button
                              onClick={() => setShowShareMenu(!showShareMenu)}
                              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all duration-300"
                            >
                              <Share2 className="w-4 h-4" />
                              <span>Share</span>
                            </button>
                            <AnimatePresence>
                              {showShareMenu && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 10 }}
                                  className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-2 z-10"
                                >
                                  <div className="grid grid-cols-2 gap-2">
                                    <button
                                      onClick={() => handleShare('twitter')}
                                      className="flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-50 rounded"
                                    >
                                      <Twitter className="w-4 h-4 text-blue-400" />
                                      <span>Twitter</span>
                                    </button>
                                    <button
                                      onClick={() => handleShare('linkedin')}
                                      className="flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-50 rounded"
                                    >
                                      <Linkedin className="w-4 h-4 text-blue-600" />
                                      <span>LinkedIn</span>
                                    </button>
                                    <button
                                      onClick={() => handleShare('facebook')}
                                      className="flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-50 rounded"
                                    >
                                      <Facebook className="w-4 h-4 text-blue-600" />
                                      <span>Facebook</span>
                                    </button>
                                    <button
                                      onClick={() => handleShare('email')}
                                      className="flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-50 rounded"
                                    >
                                      <Mail className="w-4 h-4 text-gray-600" />
                                      <span>Email</span>
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Author Info */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                        P
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">Prachi Shrivastava</h3>
                      <p className="text-sm text-gray-600 mb-4">Virtual HR Consultant</p>
                      <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          <span>{views}</span>
                        </div>
                        <div className="flex items-center">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          <span>{likes}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* FAQ Section */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
                  >
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                      <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                      Frequently Asked Questions
                    </h3>
                    <div className="space-y-3">
                      {faqData.map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg">
                          <button
                            onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                            className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                            {expandedFaq === index ? (
                              <ChevronUp className="w-4 h-4 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-500" />
                            )}
                          </button>
                          <AnimatePresence>
                            {expandedFaq === index && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-3 text-sm text-gray-600">
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Services Showcase */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
                  >
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                      Our Services
                    </h3>
                    <div className="space-y-3">
                      {servicesData.services.slice(0, 4).map((service, index) => (
                        <Link
                          key={service.id}
                          to={`/services/${service.id}`}
                          className="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 group"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                {service.title}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">
                                {service.description.substring(0, 60)}...
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link
                      to="/services"
                      className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-medium"
                    >
                      View All Services
                      <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          
          <HireWithPrachiFooter />
        </div>
      </>
    );
  }

  // If we have a topic from blogTopics.js, use the BlogPost component
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": topic.title,
    "description": topic.metaDescription,
    "author": {
      "@type": "Person",
      "name": "Prachi Shrivastava",
      "jobTitle": "Virtual HR Consultant",
      "url": "https://hirewithprachi.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Hire With Prachi",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hirewithprachi.com/logo.png"
      }
    },
    "datePublished": topic.publishDate,
    "dateModified": topic.publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://hirewithprachi.com/blog/${slug}`
    },
    "image": "https://hirewithprachi.com/default-blog-image.jpg",
    "keywords": topic.keywords?.join(", ") || "HR consulting, virtual HR, HR services",
    "articleSection": topic.category || "HR Consulting",
    "wordCount": 1000
  };

  return (
    <>
      <Helmet>
        <title>{topic.title} | Hire With Prachi</title>
        <meta name="description" content={topic.metaDescription} />
        <meta name="keywords" content={topic.keywords?.join(", ")} />
        <meta property="og:title" content={topic.title} />
        <meta property="og:description" content={topic.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://hirewithprachi.com/blog/${slug}`} />
        <meta property="og:image" content="https://hirewithprachi.com/default-blog-image.jpg" />
        <meta property="article:published_time" content={topic.publishDate} />
        <meta property="article:author" content="Prachi Shrivastava" />
        <meta property="article:section" content={topic.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={topic.title} />
        <meta name="twitter:description" content={topic.metaDescription} />
        <meta name="twitter:image" content="https://hirewithprachi.com/default-blog-image.jpg" />
        <link rel="canonical" href={`https://hirewithprachi.com/blog/${slug}`} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <BlogPost topicId={topic.id} />
    </>
  );
};

export default BlogPostPage; 