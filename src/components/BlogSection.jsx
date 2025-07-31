import React from 'react';
import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';
import { getFeaturedPosts } from '../data/blogPosts';

const BlogSection = () => {
  const featuredPosts = getFeaturedPosts(3);

  return (
    <section className="py-20 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4 text-[#e84393] dark:text-pink-300">Latest Insights</h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay updated with the latest HR trends, insights, and best practices from our expert team.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuredPosts.map((post, index) => (
            <BlogCard 
              key={post.id} 
              post={post} 
              index={index}
              variant="compact"
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/blog" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#e84393] to-pink-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            View All Articles
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection; 