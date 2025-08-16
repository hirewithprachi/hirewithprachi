import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import RichTextEditor from './RichTextEditor';
import BlogService from '../../services/blogService';
import { 
  PenTool, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Save, 
  X, 
  Upload,
  Search,
  Filter,
  Grid,
  List,
  Calendar,
  Clock,
  Tag,
  Image,
  Link as LinkIcon,
  Share,
  BarChart3,
  Users,
  TrendingUp,
  Star,
  CheckCircle,
  AlertCircle,
  Loader,
  ExternalLink,
  Copy,
  Download,
  FileText,
  Globe,
  Settings,
  Target,
  Zap,
  Award,
  Bookmark,
  MessageCircle,
  ThumbsUp,
  Layers,
  Hash,
  Type,
  AlignLeft,
  Bold,
  Italic,
  Underline,
  Quote,
  Code,
  ImageIcon,
  VideoIcon,
  Paperclip
} from 'lucide-react';
import { servicesData } from '../../data/servicesData';

// Enhanced blog categories with descriptions
const blogCategories = [
  { id: 'hr-management', name: 'HR Management', description: 'General HR management topics' },
  { id: 'compliance', name: 'Compliance', description: 'Legal and regulatory compliance' },
  { id: 'recruitment', name: 'Recruitment', description: 'Hiring and talent acquisition' },
  { id: 'employee-engagement', name: 'Employee Engagement', description: 'Team building and motivation' },
  { id: 'performance-management', name: 'Performance Management', description: 'Performance reviews and improvement' },
  { id: 'hr-technology', name: 'HR Technology', description: 'HR tools and digital transformation' },
  { id: 'leadership', name: 'Leadership', description: 'Management and leadership development' },
  { id: 'workplace-culture', name: 'Workplace Culture', description: 'Company culture and values' },
  { id: 'compensation-benefits', name: 'Compensation & Benefits', description: 'Salary, benefits and rewards' },
  { id: 'training-development', name: 'Training & Development', description: 'Learning and skill development' },
  { id: 'diversity-inclusion', name: 'Diversity & Inclusion', description: 'D&I initiatives and best practices' },
  { id: 'remote-work', name: 'Remote Work', description: 'Virtual teams and remote management' }
];

const statusOptions = [
  { value: 'draft', label: 'Draft', color: 'gray' },
  { value: 'review', label: 'Under Review', color: 'yellow' },
  { value: 'scheduled', label: 'Scheduled', color: 'blue' },
  { value: 'published', label: 'Published', color: 'green' },
  { value: 'archived', label: 'Archived', color: 'red' }
];

const AdvancedBlogManager = ({ onClose, addNotification }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  
  // Form state for advanced blog creation/editing
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    meta_title: '',
    meta_description: '',
    excerpt: '',
    content: '',
    featured_image_url: '',
    category: '',
    related_services: [],
    tags: [],
    status: 'draft',
    published_at: '',
    reading_time: '',
    author_name: 'Prachi Shrivastava',
    author_bio: 'Virtual HR Consultant & Business Strategist',
    seo_keywords: '',
    schema_markup: {},
    social_media_image: '',
    allow_comments: true,
    is_featured: false,
    custom_fields: {}
  });
  
  const [editorState, setEditorState] = useState({
    isPreview: false,
    wordCount: 0,
    selectedText: '',
    cursorPosition: 0
  });

  // Load blogs from database
  useEffect(() => {
    loadBlogs();
  }, [sortBy, sortOrder]);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      
      const result = await BlogService.getAllBlogPosts();

      if (result.success) {
        const sortedBlogs = result.data.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          
          if (sortBy === 'created_at') {
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
          } else if (sortBy === 'title') {
            return sortOrder === 'asc' 
              ? a.title.localeCompare(b.title)
              : b.title.localeCompare(a.title);
          }
          return dateB - dateA; // Default: newest first
        });

        setBlogs(sortedBlogs);
        
        if (result.offline) {
          addNotification(result.message, 'warning');
        }
      } else {
        throw new Error(result.error || 'Failed to load blogs');
      }
      
    } catch (error) {
      console.error('Error loading blogs:', error);
      addNotification('Failed to load blogs', 'error');
      
      // Fallback to demo data
      setBlogs(generateDemoBlogs());
    } finally {
      setLoading(false);
    }
  };

  const generateDemoBlogs = () => {
    return [
      {
        id: 'demo_1',
        title: 'Complete Guide to HR Compliance in 2025',
        slug: 'hr-compliance-guide-2025',
        excerpt: 'Everything you need to know about HR compliance regulations and best practices for Indian businesses.',
        status: 'published',
        category: 'compliance',
        tags: ['compliance', 'hr-management', 'legal'],
        created_at: new Date().toISOString(),
        published_at: new Date().toISOString(),
        reading_time: '12 min read',
        view_count: 245,
        like_count: 18,
        is_featured: true
      },
      {
        id: 'demo_2',
        title: 'Building High-Performance Teams: A Strategic Approach',
        slug: 'building-high-performance-teams',
        excerpt: 'Learn how to create and manage high-performance teams that drive business success.',
        status: 'draft',
        category: 'employee-engagement',
        tags: ['team-building', 'performance', 'leadership'],
        created_at: new Date(Date.now() - 86400000).toISOString(),
        reading_time: '8 min read',
        view_count: 0,
        like_count: 0,
        is_featured: false
      }
    ];
  };

  // Generate slug from title
  const generateSlug = useCallback((title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }, []);

  // Auto-update slug when title changes
  useEffect(() => {
    if (formData.title && (!formData.slug || modalType === 'create')) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(prev.title)
      }));
    }
  }, [formData.title, generateSlug, modalType]);

  // Update word count when content changes
  useEffect(() => {
    const wordCount = formData.content.trim().split(/\s+/).filter(word => word.length > 0).length;
    const readingTime = Math.ceil(wordCount / 200); // Assume 200 words per minute
    
    setEditorState(prev => ({ ...prev, wordCount }));
    setFormData(prev => ({ 
      ...prev, 
      reading_time: `${readingTime} min read`
    }));
  }, [formData.content]);

  const handleCreateBlog = async (blogData) => {
    try {
      // Process tags (related_services column doesn't exist in schema)
      const processedData = {
        ...blogData,
        tags: Array.isArray(blogData.tags) ? blogData.tags : blogData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        related_services: Array.isArray(blogData.related_services) ? blogData.related_services : [],
        author_id: null // Will be set by the service based on current user
      };

      const result = await BlogService.createBlogPost(processedData);

      if (result.success) {
        setBlogs(prev => [result.data, ...prev]);
        const message = result.offline 
          ? result.message 
          : 'Blog post created successfully';
        const type = result.offline ? 'warning' : 'success';
        
        addNotification(message, type);
        closeModal();
      } else {
        throw new Error(result.error || 'Failed to create blog post');
      }
      
    } catch (error) {
      console.error('Error creating blog:', error);
      addNotification('Failed to create blog post', 'error');
    }
  };

  const handleUpdateBlog = async (blogId, updates) => {
    try {
      console.log('🔧 handleUpdateBlog called with:', { blogId, updates });
      
      // Filter out non-existent columns from the database schema
      const { 
        meta_title, 
        meta_description, 
        allow_comments, 
        is_featured, 
        custom_fields,
        author_name,
        author_bio,
        seo_keywords,
        schema_markup,
        social_media_image,
        reading_time,
        ...validUpdates 
      } = updates;

      const processedUpdates = {
        ...validUpdates,
        tags: Array.isArray(validUpdates.tags) ? validUpdates.tags : 
              (validUpdates.tags ? validUpdates.tags.split(',').map(tag => tag.trim()).filter(Boolean) : []),
        related_services: Array.isArray(validUpdates.related_services) ? validUpdates.related_services : [],
        updated_at: new Date().toISOString()
      };

      console.log('🔧 Processed updates:', processedUpdates);

      if (blogId.startsWith('local_') || blogId.startsWith('demo_')) {
        // Update local/demo blog
        setBlogs(prev => prev.map(blog => 
          blog.id === blogId ? { ...blog, ...processedUpdates } : blog
        ));
        addNotification('Blog post updated locally', 'success');
      } else {
        // Update database blog
        console.log('🔧 Updating database blog with ID:', blogId);
        const { data, error } = await supabase
          .from('blog_posts')
          .update(processedUpdates)
          .eq('id', blogId)
          .select()
          .single();

        if (error) {
          console.error('❌ Database update error:', error);
          throw error;
        }

        console.log('✅ Database update successful:', data);
        setBlogs(prev => prev.map(blog => 
          blog.id === blogId ? data : blog
        ));
        addNotification('Blog post updated successfully', 'success');
      }
      
      closeModal();
    } catch (error) {
      console.error('Error updating blog:', error);
      addNotification('Failed to update blog post', 'error');
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      if (blogId.startsWith('local_') || blogId.startsWith('demo_')) {
        setBlogs(prev => prev.filter(blog => blog.id !== blogId));
        addNotification('Blog post deleted', 'success');
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .delete()
          .eq('id', blogId);

        if (error) throw error;

        setBlogs(prev => prev.filter(blog => blog.id !== blogId));
        addNotification('Blog post deleted successfully', 'success');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      addNotification('Failed to delete blog post', 'error');
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedBlogs.length === 0) return;

    try {
      switch (action) {
        case 'delete':
          if (!confirm(`Are you sure you want to delete ${selectedBlogs.length} blog posts?`)) return;
          
          for (const blogId of selectedBlogs) {
            await handleDeleteBlog(blogId);
          }
          break;
          
        case 'publish':
          const publishUpdates = { status: 'published', published_at: new Date().toISOString() };
          for (const blogId of selectedBlogs) {
            await handleUpdateBlog(blogId, publishUpdates);
          }
          break;
          
        case 'draft':
          const draftUpdates = { status: 'draft', published_at: null };
          for (const blogId of selectedBlogs) {
            await handleUpdateBlog(blogId, draftUpdates);
          }
          break;
      }
      
      setSelectedBlogs([]);
      setShowBulkActions(false);
      addNotification(`Bulk action completed for ${selectedBlogs.length} posts`, 'success');
      
    } catch (error) {
      console.error('Error performing bulk action:', error);
      addNotification('Failed to perform bulk action', 'error');
    }
  };

  const openModal = (type, blog = null) => {
    setModalType(type);
    setSelectedBlog(blog);
    
    if (blog) {
      setFormData({
        title: blog.title || '',
        slug: blog.slug || '',
        meta_title: blog.meta_title || '',
        meta_description: blog.meta_description || '',
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        featured_image_url: blog.featured_image_url || '',
        category: blog.category || '',
        related_services: blog.related_services || [],
        tags: Array.isArray(blog.tags) ? blog.tags : [],
        status: blog.status || 'draft',
        published_at: blog.published_at || '',
        reading_time: blog.reading_time || '',
        author_name: blog.author_name || 'Prachi Shrivastava',
        author_bio: blog.author_bio || 'Virtual HR Consultant & Business Strategist',
        seo_keywords: blog.seo_keywords || '',
        schema_markup: blog.schema_markup || {},
        social_media_image: blog.social_media_image || '',
        allow_comments: blog.allow_comments !== false,
        is_featured: blog.is_featured || false,
        custom_fields: blog.custom_fields || {}
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        meta_title: '',
        meta_description: '',
        excerpt: '',
        content: '',
        featured_image_url: '',
        category: '',
        related_services: [],
        tags: [],
        status: 'draft',
        published_at: '',
        reading_time: '',
        author_name: 'Prachi Shrivastava',
        author_bio: 'Virtual HR Consultant & Business Strategist',
        seo_keywords: '',
        schema_markup: {},
        social_media_image: '',
        allow_comments: true,
        is_featured: false,
        custom_fields: {}
      });
    }
    
    setEditorState({
      isPreview: false,
      wordCount: 0,
      selectedText: '',
      cursorPosition: 0
    });
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedBlog(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('🔧 handleSubmit called with modalType:', modalType);
    console.log('🔧 selectedBlog:', selectedBlog);
    console.log('🔧 formData:', formData);
    
    if (modalType === 'create') {
      console.log('🔧 Creating new blog post...');
      await handleCreateBlog(formData);
    } else if (modalType === 'edit') {
      console.log('🔧 Editing blog post with ID:', selectedBlog?.id);
      await handleUpdateBlog(selectedBlog.id, formData);
    }
  };

  // Filter and sort blogs
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || blog.category === filterCategory;
    const matchesStatus = !filterStatus || blog.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading blog posts...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Advanced Blog Manager</h2>
          <p className="text-gray-600 dark:text-gray-400">Create and manage professional blog content</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => openModal('create')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Blog Post</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white w-full sm:w-64"
              />
            </div>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Categories</option>
              {blogCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Status</option>
              {statusOptions.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={`${sortBy}_${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('_');
                setSortBy(field);
                setSortOrder(order);
              }}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="created_at_desc">Newest First</option>
              <option value="created_at_asc">Oldest First</option>
              <option value="title_asc">Title A-Z</option>
              <option value="title_desc">Title Z-A</option>
              <option value="view_count_desc">Most Viewed</option>
              <option value="like_count_desc">Most Liked</option>
            </select>
            
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedBlogs.length > 0 && (
          <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <span className="text-sm text-blue-700 dark:text-blue-300">
              {selectedBlogs.length} blog posts selected
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleBulkAction('publish')}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              >
                Publish
              </button>
              <button
                onClick={() => handleBulkAction('draft')}
                className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
              >
                Draft
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setSelectedBlogs([])}
                className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Posts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{blogs.length}</p>
            </div>
            <PenTool className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Published</p>
              <p className="text-2xl font-bold text-green-600">{blogs.filter(b => b.status === 'published').length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Drafts</p>
              <p className="text-2xl font-bold text-yellow-600">{blogs.filter(b => b.status === 'draft').length}</p>
            </div>
            <FileText className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
              <p className="text-2xl font-bold text-purple-600">
                {blogs.reduce((sum, blog) => sum + (blog.view_count || 0), 0)}
              </p>
            </div>
            <Eye className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Blog Posts Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredBlogs.map(blog => (
          <BlogCard
            key={blog.id}
            blog={blog}
            viewMode={viewMode}
            isSelected={selectedBlogs.includes(blog.id)}
            onSelect={(blogId, selected) => {
              if (selected) {
                setSelectedBlogs(prev => [...prev, blogId]);
              } else {
                setSelectedBlogs(prev => prev.filter(id => id !== blogId));
              }
            }}
            onEdit={() => openModal('edit', blog)}
            onDelete={() => handleDeleteBlog(blog.id)}
            blogCategories={blogCategories}
            statusOptions={statusOptions}
          />
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="text-center py-12">
          <PenTool className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No blog posts found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchTerm || filterCategory || filterStatus ? 'Try adjusting your filters' : 'Create your first blog post'}
          </p>
          <button
            onClick={() => openModal('create')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Create Blog Post
          </button>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <AdvancedBlogModal
            type={modalType}
            blog={selectedBlog}
            formData={formData}
            setFormData={setFormData}
            editorState={editorState}
            setEditorState={setEditorState}
            onSubmit={handleSubmit}
            onClose={closeModal}
            blogCategories={blogCategories}
            statusOptions={statusOptions}
            servicesData={servicesData}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Blog Card Component (same for grid and list views)
const BlogCard = ({ blog, viewMode, isSelected, onSelect, onEdit, onDelete, blogCategories, statusOptions }) => {
  const category = blogCategories.find(c => c.id === blog.category);
  const status = statusOptions.find(s => s.value === blog.status);

  const handleSelectChange = (e) => {
    onSelect(blog.id, e.target.checked);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleSelectChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <div className="w-20 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              {blog.featured_image_url ? (
                <img src={blog.featured_image_url} alt="" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <PenTool className="w-6 h-6 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1">{blog.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{category?.name || blog.category}</p>
              <div className="flex items-center space-x-4 mt-1">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs bg-${status?.color}-100 text-${status?.color}-800 dark:bg-${status?.color}-900 dark:text-${status?.color}-200`}>
                  {status?.label || blog.status}
                </span>
                <span className="text-xs text-gray-500">{blog.reading_time}</span>
                <span className="text-xs text-gray-500">{blog.view_count || 0} views</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <a
              href={`/blog/${blog.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-green-600 transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 overflow-hidden"
    >
      <div className="aspect-video bg-gray-100 dark:bg-gray-700 relative">
        {blog.featured_image_url ? (
          <img 
            src={blog.featured_image_url} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <PenTool className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <div className="absolute top-2 left-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleSelectChange}
            className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
          />
        </div>
        <div className="absolute top-2 right-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs bg-${status?.color}-100 text-${status?.color}-800`}>
            {status?.label || blog.status}
          </span>
        </div>
        {blog.is_featured && (
          <div className="absolute bottom-2 left-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2">
            {blog.title}
          </h3>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{category?.name || blog.category}</p>
        
        {blog.excerpt && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
            {blog.excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
          <span>{blog.reading_time}</span>
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              {blog.view_count || 0}
            </span>
            <span className="flex items-center">
              <ThumbsUp className="w-3 h-3 mr-1" />
              {blog.like_count || 0}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(blog.created_at).toLocaleDateString()}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onEdit}
              className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors duration-200"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 text-gray-400 hover:text-red-600 transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <a
              href={`/blog/${blog.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-gray-400 hover:text-green-600 transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Advanced Blog Modal Component
const AdvancedBlogModal = ({ 
  type, 
  blog, 
  formData, 
  setFormData, 
  editorState, 
  setEditorState, 
  onSubmit, 
  onClose, 
  blogCategories, 
  statusOptions, 
  servicesData 
}) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('content');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(e);
    } finally {
      setLoading(false);
    }
  };

  const handleTagInput = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (newTag && !formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
        e.target.value = '';
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const tabs = [
    { id: 'content', label: 'Content', icon: PenTool },
    { id: 'seo', label: 'SEO & Meta', icon: Search },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'preview', label: 'Preview', icon: Eye }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {type === 'create' ? 'Create Advanced Blog Post' : 'Edit Blog Post'}
          </h2>
          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-500">
              Words: {editorState.wordCount} | Reading time: {formData.reading_time}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-6">
            {/* Content Tab */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Enter blog post title..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="auto-generated-from-title"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    rows={3}
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Brief description of the blog post..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content *
                  </label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                    placeholder="Write your blog content here... Use the toolbar for formatting options."
                    height="400px"
                    showPreview={true}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select Category</option>
                      {blogCategories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Featured Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.featured_image_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured_image_url: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tags
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      onKeyDown={handleTagInput}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Type a tag and press Enter or comma..."
                    />
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 hover:text-blue-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Related Services
                  </label>
                  <select
                    multiple
                    value={formData.related_services}
                    onChange={(e) => {
                      const values = Array.from(e.target.selectedOptions, option => option.value);
                      setFormData(prev => ({ ...prev, related_services: values }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    size={4}
                  >
                    {servicesData?.services?.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    )) || []}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple services</p>
                </div>
              </div>
            )}

            {/* SEO Tab */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={formData.meta_title}
                    onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="SEO optimized title (60 characters max)"
                    maxLength={60}
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.meta_title.length}/60 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.meta_description}
                    onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="SEO meta description (160 characters max)"
                    maxLength={160}
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.meta_description.length}/160 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    SEO Keywords
                  </label>
                  <input
                    type="text"
                    value={formData.seo_keywords}
                    onChange={(e) => setFormData(prev => ({ ...prev, seo_keywords: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="comma, separated, keywords"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Social Media Image
                  </label>
                  <input
                    type="url"
                    value={formData.social_media_image}
                    onChange={(e) => setFormData(prev => ({ ...prev, social_media_image: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="https://example.com/social-image.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended: 1200x630px for optimal social sharing</p>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      {statusOptions.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Publish Date
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.published_at ? new Date(formData.published_at).toISOString().slice(0, 16) : ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, published_at: e.target.value ? new Date(e.target.value).toISOString() : '' }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={formData.author_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Author name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Reading Time
                    </label>
                    <input
                      type="text"
                      value={formData.reading_time}
                      onChange={(e) => setFormData(prev => ({ ...prev, reading_time: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Auto-calculated"
                      disabled
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Author Bio
                  </label>
                  <textarea
                    rows={3}
                    value={formData.author_bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, author_bio: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Brief author biography..."
                  />
                </div>

                <div className="flex items-center space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Featured Post
                    </span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.allow_comments}
                      onChange={(e) => setFormData(prev => ({ ...prev, allow_comments: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Allow Comments
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Preview Tab */}
            {activeTab === 'preview' && (
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {formData.title || 'Blog Post Title'}
                  </h1>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                    <span>By {formData.author_name}</span>
                    <span>•</span>
                    <span>{formData.reading_time}</span>
                    <span>•</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>

                  {formData.featured_image_url && (
                    <img 
                      src={formData.featured_image_url} 
                      alt={formData.title}
                      className="w-full aspect-video object-cover rounded-lg mb-6"
                    />
                  )}

                  {formData.excerpt && (
                    <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-6">
                      {formData.excerpt}
                    </p>
                  )}

                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    {formData.content ? (
                      <div dangerouslySetInnerHTML={{ 
                        __html: formData.content.replace(/\n/g, '<br />') 
                      }} />
                    ) : (
                      <p className="text-gray-500">Start writing your content to see the preview...</p>
                    )}
                  </div>

                  {formData.tags.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Tags:</h3>
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {type === 'edit' ? 'Last saved: Never' : 'Auto-save will begin after first save'}
              </div>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
                >
                  {loading && <Loader className="w-4 h-4 animate-spin" />}
                  <span>{loading ? 'Saving...' : type === 'create' ? 'Create Blog Post' : 'Update Blog Post'}</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AdvancedBlogManager;
