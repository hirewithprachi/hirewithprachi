import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toolsData } from '../../data/toolsData';
import ConsultationModal from '../LeadCapturePreview';

export default function HirableFeatures({ openConsultationModal }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredTool, setHoveredTool] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Limit to 4 tools for homepage
  const filteredTools = selectedCategory === 'All' 
    ? toolsData.slice(0, 4) 
    : toolsData.filter(tool => tool.category === selectedCategory).slice(0, 4);

  const categories = ['All', ...new Set(toolsData.map(tool => tool.category))];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('.features-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section className="features-section py-20 md:py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Floating Particles */}
        <div className="absolute top-20 left-1/3 w-2 h-2 bg-blue-400/60 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-1/4 w-1 h-1 bg-purple-400/80 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-2/3 w-1.5 h-1.5 bg-pink-400/70 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-8 py-4 rounded-full border border-blue-500/30 backdrop-blur-sm mb-8">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-blue-600 text-sm font-bold uppercase tracking-widest">Free HR Tools & Resources</span>
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Discover Our <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Amazing Features</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Access a comprehensive suite of HR tools, calculators, and resources designed to streamline your HR operations and drive business success
          </p>

          {/* Category Filter */}
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
        </div>

        {/* Features Grid - Limited to 4 tools */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {filteredTools.map((tool, index) => (
            <div
              key={tool.id}
              className={`group relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                hoveredTool === tool.id ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredTool(tool.id)}
              onMouseLeave={() => setHoveredTool(null)}
              style={{ animationDelay: `${index * 100}ms` }}
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
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {tool.timeEstimate}
                </div>
              )}

              {/* Action Button */}
              <Link
                to={tool.link}
                className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${tool.color || 'from-blue-600 to-purple-600'} text-white font-semibold rounded-2xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 group/btn`}
              >
                <span>Explore Tool</span>
                <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              {/* Hover Effect */}
              <div className={`
                absolute inset-0 bg-gradient-to-br ${tool.bgColor || 'from-blue-50 to-purple-50'} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10
              `}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 