import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import OptimizedImage from './ui/OptimizedImage';

const BlogCard = ({ post, index = 0, variant = 'default' }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Different card variants for different use cases
  const cardVariants = {
    default: "bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group",
    compact: "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group",
    featured: "bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100",
    list: "bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col md:flex-row"
  };

  const imageVariants = {
    default: "h-48 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center",
    compact: "h-32 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center",
    featured: "h-56 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center",
    list: "h-48 md:h-auto md:w-64 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center flex-shrink-0"
  };

  const contentVariants = {
    default: "p-6",
    compact: "p-4",
    featured: "p-6",
    list: "p-6 flex-1"
  };

  const titleVariants = {
    default: "text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2",
    compact: "text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2",
    featured: "text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2",
    list: "text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2"
  };

  const excerptVariants = {
    default: "text-gray-600 mb-4 line-clamp-3 leading-relaxed",
    compact: "text-gray-600 mb-3 line-clamp-2 leading-relaxed text-sm",
    featured: "text-gray-600 mb-4 line-clamp-3 leading-relaxed text-lg",
    list: "text-gray-600 mb-4 line-clamp-2 leading-relaxed text-lg"
  };

  return (
    <Link to={`/blog/${post.slug}`} className="block">
      <motion.article
        className={`${cardVariants[variant]} hover:-translate-y-2 cursor-pointer`}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
      >
      {/* Featured Image */}
      <div className={imageVariants[variant]}>
        {post.image ? (
          post.image.endsWith('.svg') ? (
            <OptimizedImage 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-contain p-4"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <OptimizedImage 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )
        ) : (
          <svg className="w-16 h-16 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        )}
      </div>

      <div className={contentVariants[variant]}>
        {/* Category Badge & Date */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold">
            {post.category || 'HR Insights'}
          </span>
          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-500">
            {formatDate(post.date)}
          </span>
          {post.readTime && (
            <>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-500">{post.readTime}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className={titleVariants[variant]}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className={excerptVariants[variant]}>
          {post.excerpt}
        </p>

        {/* Author & Read More */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {post.authorImage ? (
              <OptimizedImage 
                src={post.authorImage} 
                alt={post.author} 
                className="w-8 h-8 rounded-full object-cover"
                loading="lazy"
                sizes="32px"
              />
            ) : (
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-semibold text-sm">
                  {post.author?.charAt(0) || 'P'}
                </span>
              </div>
            )}
            <span className="text-sm text-gray-600">{post.author || 'Prachi Shrivastava'}</span>
          </div>
          
          {/* Ultra-Futuristic Read More Button */}
          <div 
            className="group relative inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            {/* Animated Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-xl border border-white/20 group-hover:border-white/40 transition-all duration-300"></div>
            
            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
              <span>Read More</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </span>
            
            {/* Holographic Glow Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-blue-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>

        {/* Tags (for featured variant) */}
        {variant === 'featured' && post.tags && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
            {post.tags.slice(0, 3).map((tag, tagIndex) => (
              <span 
                key={tagIndex}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      </motion.article>
    </Link>
  );
};

export default BlogCard; 