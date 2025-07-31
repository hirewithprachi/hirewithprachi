import React from 'react';
import { useParams } from 'react-router-dom';
import BlogPost from '../components/BlogPost';
import { getBlogTopicBySlug } from '../data/blogTopics';

const BlogPostPage = () => {
  const { slug } = useParams();
  const topic = getBlogTopicBySlug(slug);
  
  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-6">The requested blog post could not be found.</p>
          <a href="/blog" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Back to Blog
          </a>
        </div>
      </div>
    );
  }

  return <BlogPost topicId={topic.id} />;
};

export default BlogPostPage; 