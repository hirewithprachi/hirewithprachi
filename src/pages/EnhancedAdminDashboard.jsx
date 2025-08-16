import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { supabase } from '../lib/supabase-client';
import AdminLogin from '../components/AdminLogin';

const EnhancedAdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [leads, setLeads] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [videos, setVideos] = useState([]);
  const [files, setFiles] = useState([]);
  const [emails, setEmails] = useState([]);
  const [calculators, setCalculators] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalData, setModalData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (user && !authLoading) {
      loadDashboardData();
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (activeTab === 'leads') {
      loadLeads();
    } else if (activeTab === 'blog') {
      loadBlogPosts();
    } else if (activeTab === 'users') {
      loadUsers();
    } else if (activeTab === 'videos') {
      loadVideos();
    } else if (activeTab === 'files') {
      loadFiles();
    } else if (activeTab === 'emails') {
      loadEmails();
    } else if (activeTab === 'calculators') {
      loadCalculators();
    }
  }, [activeTab]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load data directly from Supabase tables
      const [leadsResult, blogResult, usersResult, videosResult, filesResult, emailsResult, calculatorsResult] = await Promise.all([
        supabase.from('leads').select('*'),
        supabase.from('blog_posts').select('*'),
        supabase.from('admin_users').select('*'),
        supabase.from('videos').select('*'),
        supabase.from('resources').select('*'),
        supabase.from('email_logs').select('*'),
        supabase.from('calculator_results').select('*')
      ]);

      const stats = {
        totalLeads: leadsResult.data?.length || 0,
        totalPosts: blogResult.data?.length || 0,
        totalUsers: usersResult.data?.length || 0,
        totalVideos: videosResult.data?.length || 0,
        totalFiles: filesResult.data?.length || 0,
        totalEmails: emailsResult.data?.length || 0,
        totalCalculators: calculatorsResult.data?.length || 0,
        recentLeads: leadsResult.data?.filter(l => {
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return new Date(l.created_at) > weekAgo;
        }).length || 0,
        conversionRate: calculateConversionRate(leadsResult.data || []),
        recentActivity: leadsResult.data?.slice(0, 5) || []
      };

      setStats(stats);
      setLeads(leadsResult.data || []);
      setBlogPosts(blogResult.data || []);
      setUsers(usersResult.data || []);
      setVideos(videosResult.data || []);
      setFiles(filesResult.data || []);
      setEmails(emailsResult.data || []);
      setCalculators(calculatorsResult.data || []);
    } catch (err) {
      console.error('Dashboard error:', err);
      setError(err?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const calculateConversionRate = (leads) => {
    if (!leads || leads.length === 0) return 0;
    const converted = leads.filter(l => l.status === 'converted').length;
    return ((converted / leads.length) * 100).toFixed(1);
  };

  const loadLeads = async () => {
    try {
      const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
      if (!error) setLeads(data || []);
    } catch (error) {
      console.error('Error loading leads:', error);
    }
  };

  const loadBlogPosts = async () => {
    try {
      const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      if (!error) setBlogPosts(data || []);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    }
  };

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase.from('admin_users').select('*').order('created_at', { ascending: false });
      if (!error) setUsers(data || []);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const loadVideos = async () => {
    try {
      const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
      if (!error) setVideos(data || []);
    } catch (error) {
      console.error('Error loading videos:', error);
    }
  };

  const loadFiles = async () => {
    try {
      const { data, error } = await supabase.from('resources').select('*').order('created_at', { ascending: false });
      if (!error) setFiles(data || []);
    } catch (error) {
      console.error('Error loading files:', error);
    }
  };

  const loadEmails = async () => {
    try {
      const { data, error } = await supabase.from('email_logs').select('*').order('created_at', { ascending: false });
      if (!error) setEmails(data || []);
    } catch (error) {
      console.error('Error loading emails:', error);
    }
  };

  const loadCalculators = async () => {
    try {
      const { data, error } = await supabase.from('calculator_results').select('*').order('created_at', { ascending: false });
      if (!error) setCalculators(data || []);
    } catch (error) {
      console.error('Error loading calculators:', error);
    }
  };

  const openModal = (type, data = {}) => {
    setModalType(type);
    setModalData(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setModalData({});
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

  // Show loading state
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={loadDashboardData}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show login required
  if (!user) {
    return <AdminLogin onLoginSuccess={() => loadDashboardData()} />;
  }

  // Main dashboard content
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
                <h1 className="text-3xl font-bold text-gray-900">Enhanced Admin Dashboard</h1>
                <p className="text-gray-600">Welcome back, {user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <span className="text-2xl">🔔</span>
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map(notification => (
                          <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                            <div className="flex items-start space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                notification.type === 'success' ? 'bg-green-500' :
                                notification.type === 'error' ? 'bg-red-500' :
                                notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                              }`}></div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-900">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {notification.timestamp.toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          No notifications
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
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

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'leads', name: 'Leads', icon: '👥' },
              { id: 'blog', name: 'Blog', icon: '📝' },
              { id: 'users', name: 'Users', icon: '👤' },
              { id: 'videos', name: 'Videos', icon: '🎥' },
              { id: 'files', name: 'Files', icon: '📁' },
              { id: 'emails', name: 'Emails', icon: '📧' },
              { id: 'calculators', name: 'Calculators', icon: '🧮' },
              { id: 'analytics', name: 'Analytics', icon: '📈' },
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
        {/* Content will be added in the next part */}
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
          </h2>
          <p className="text-gray-600">This tab is being implemented...</p>
        </div>
      </main>
    </div>
  );
};

export default EnhancedAdminDashboard;
