import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { supabase } from '../lib/supabase';

const WorkingDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [leads, setLeads] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [notifications, setNotifications] = useState([]);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (user && !authLoading) {
      loadData();
    }
  }, [user, authLoading]);

  const loadData = async () => {
    try {
      const [leadsResult, blogResult] = await Promise.all([
        supabase.from('leads').select('*'),
        supabase.from('blog_posts').select('*')
      ]);

      setLeads(leadsResult.data || []);
      setBlogPosts(blogResult.data || []);

      // Mock video data for now
      setVideos([
        {
          id: 1,
          title: 'HR Compliance Basics',
          description: 'Learn HR compliance fundamentals',
          video_url: 'https://www.youtube.com/watch?v=sample1',
          service_category: 'Core HR',
          duration: 1800
        },
        {
          id: 2,
          title: 'Employee Onboarding',
          description: 'Complete onboarding guide',
          video_url: 'https://www.youtube.com/watch?v=sample2',
          service_category: 'Core HR',
          duration: 2400
        }
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
  };

  const addNotification = (message, type = 'info') => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const handleCreateLead = async (formData) => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .insert([formData])
        .select()
        .single();
      
      if (error) throw error;
      
      setLeads(prev => [data, ...prev]);
      addNotification('Lead created successfully', 'success');
      closeModal();
    } catch (error) {
      addNotification('Failed to create lead', 'error');
    }
  };

  const handleCreateBlogPost = async (formData) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([formData])
        .select()
        .single();
      
      if (error) throw error;
      
      setBlogPosts(prev => [data, ...prev]);
      addNotification('Blog post created successfully', 'success');
      closeModal();
    } catch (error) {
      addNotification('Failed to create blog post', 'error');
    }
  };

  const handleCreateVideo = async (formData) => {
    try {
      const newVideo = {
        id: Date.now(),
        ...formData,
        created_at: new Date().toISOString()
      };
      
      setVideos(prev => [newVideo, ...prev]);
      addNotification('Video created successfully', 'success');
      closeModal();
    } catch (error) {
      addNotification('Failed to create video', 'error');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please log in to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Working Admin Dashboard</h1>
                <p className="text-gray-600">Welcome back, {user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Role: Admin
              </div>
              <button
                onClick={() => supabase.auth.signOut()}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'leads', name: 'Leads', icon: '👥' },
              { id: 'blog', name: 'Blog', icon: '📝' },
              { id: 'videos', name: 'Videos', icon: '🎥' },
              { id: 'settings', name: 'Settings', icon: '⚙️' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Leads</p>
                    <p className="text-3xl font-bold text-blue-600">{leads.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">👥</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Blog Posts</p>
                    <p className="text-3xl font-bold text-green-600">{blogPosts.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📝</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Videos</p>
                    <p className="text-3xl font-bold text-purple-600">{videos.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🎥</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                    <p className="text-3xl font-bold text-indigo-600">
                      {leads.length > 0 ? ((leads.filter(l => l.status === 'converted').length / leads.length) * 100).toFixed(1) : '0.0'}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📈</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button 
                  onClick={() => openModal('createLead')}
                  className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-3xl mb-3">➕</div>
                  <h3 className="text-lg font-semibold mb-2">Add New Lead</h3>
                  <p className="text-blue-100 text-sm">Create a new lead entry</p>
                </button>
                
                <button 
                  onClick={() => openModal('createBlogPost')}
                  className="group bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-3xl mb-3">✍️</div>
                  <h3 className="text-lg font-semibold mb-2">Create Blog Post</h3>
                  <p className="text-green-100 text-sm">Write a new blog article</p>
                </button>
                
                <button 
                  onClick={() => openModal('createVideo')}
                  className="group bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-3xl mb-3">🎥</div>
                  <h3 className="text-lg font-semibold mb-2">Add Video</h3>
                  <p className="text-purple-100 text-sm">Add video for services</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Lead Management</h2>
              <button
                onClick={() => openModal('createLead')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
              >
                Add New Lead
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {lead.first_name} {lead.last_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                            lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                            lead.status === 'converted' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Videos Tab */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Video Management</h2>
              <button
                onClick={() => openModal('createVideo')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
              >
                Add New Video
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div key={video.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    <span className="text-4xl">🎥</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{video.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{video.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{video.service_category}</span>
                      <span>{Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                    <input
                      type="text"
                      defaultValue="Hire with Prachi"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => addNotification('Settings saved successfully', 'success')}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
                  >
                    Save Settings
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Version</span>
                    <span className="text-sm font-medium text-gray-900">1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Database</span>
                    <span className="text-sm font-medium text-gray-900">PostgreSQL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Backend</span>
                    <span className="text-sm font-medium text-gray-900">Supabase</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Frontend</span>
                    <span className="text-sm font-medium text-gray-900">React + Vite</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {modalType === 'createLead' ? 'Add New Lead' : 
                   modalType === 'createBlogPost' ? 'Create Blog Post' :
                   modalType === 'createVideo' ? 'Add New Video' : 'Modal'}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {modalType === 'createLead' && (
                <CreateLeadForm onSubmit={handleCreateLead} onCancel={closeModal} />
              )}

              {modalType === 'createBlogPost' && (
                <CreateBlogPostForm onSubmit={handleCreateBlogPost} onCancel={closeModal} />
              )}

              {modalType === 'createVideo' && (
                <CreateVideoForm onSubmit={handleCreateVideo} onCancel={closeModal} />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`px-4 py-3 rounded-lg shadow-lg text-white ${
                notification.type === 'success' ? 'bg-green-500' :
                notification.type === 'error' ? 'bg-red-500' :
                notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
              }`}
            >
              {notification.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Form Components
const CreateLeadForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    status: 'new'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            required
            value={formData.first_name}
            onChange={(e) => setFormData({...formData, first_name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            required
            value={formData.last_name}
            onChange={(e) => setFormData({...formData, last_name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
        <input
          type="text"
          value={formData.company}
          onChange={(e) => setFormData({...formData, company: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Create Lead
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const CreateBlogPostForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    status: 'draft'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
        <textarea
          value={formData.excerpt}
          onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
          rows="2"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
        <textarea
          required
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          rows="6"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({...formData, status: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
      
      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Create Post
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const CreateVideoForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video_url: '',
    service_category: '',
    duration: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
        <input
          type="url"
          required
          value={formData.video_url}
          onChange={(e) => setFormData({...formData, video_url: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service Category</label>
          <select
            value={formData.service_category}
            onChange={(e) => setFormData({...formData, service_category: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Category</option>
            <option value="Core HR">Core HR</option>
            <option value="Corporate & Startup">Corporate & Startup</option>
            <option value="POSH Compliance">POSH Compliance</option>
            <option value="Educational">Educational</option>
            <option value="Women & Child Rights">Women & Child Rights</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration (seconds)</label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Create Video
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default WorkingDashboard;
