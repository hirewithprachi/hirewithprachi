import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Users, 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  Filter, 
  Search, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  TrendingUp,
  FileText,
  MessageSquare,
  User,
  Shield,
  LogOut,
  RefreshCw,
  Activity,
  BarChart3,
  Database,
  Video,
  Settings,
  Image,
  ArrowLeft,
  Home,
  Menu,
  X,
  Bell,
  UserCheck
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [showAuditLogs, setShowAuditLogs] = useState(false);
  const [networkStatus, setNetworkStatus] = useState('checking');
  const [activeTab, setActiveTab] = useState('submissions'); // 'submissions' or 'leads'
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const initializeDashboard = async () => {
      // Check authentication first
      const isAuthenticated = await handleAuthenticationCheck();
      if (!isAuthenticated) return;

      const checkNetworkStatus = async () => {
        if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
          setNetworkStatus('offline');
          return;
        }
        
        try {
          const { data, error } = await supabase.from('admin_users').select('count').limit(1);
          if (error) {
            if (error.message.includes('fetch failed') || error.message.includes('ENOTFOUND')) {
              setNetworkStatus('offline');
            } else {
              setNetworkStatus('online');
            }
          } else {
            setNetworkStatus('online');
          }
        } catch (error) {
          setNetworkStatus('offline');
        }
      };
      
      checkNetworkStatus();
      fetchSubmissions();
      fetchLeads();
      fetchStats();
      getCurrentUser();
      getAdminInfo();
      fetchAuditLogs();
    };

    initializeDashboard();
  }, []);

  // Close mobile menu and notifications when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMobileMenu && !event.target.closest('.mobile-menu')) {
        setShowMobileMenu(false);
      }
      if (showNotifications && !event.target.closest('.notifications-panel')) {
        setShowNotifications(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowMobileMenu(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showMobileMenu, showNotifications]);

  // Periodic authentication check
  useEffect(() => {
    const authCheckInterval = setInterval(async () => {
      const isAuthenticated = await handleAuthenticationCheck();
      if (!isAuthenticated) {
        clearInterval(authCheckInterval);
      }
    }, 60000); // Check every minute

    return () => clearInterval(authCheckInterval);
  }, []);

  // Auto-hide notifications after 5 seconds
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(prev => prev.slice(1)); // Remove oldest notification
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notifications]);

  const getCurrentUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const getAdminInfo = async () => {
    try {
      // Check if Supabase is available
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn('⚠️ Supabase not configured - using mock admin info');
        setAdminInfo({
          email: 'prachishri005@gmail.com',
          role: 'admin',
          is_active: true
        });
        return;
      }
      
      const { data, error } = await supabase.rpc('get_admin_info');
      if (!error && data) {
        setAdminInfo(data);
      } else if (error && (error.message.includes('fetch failed') || error.message.includes('ENOTFOUND'))) {
        console.warn('⚠️ Network error - using mock admin info');
        setAdminInfo({
          email: 'prachishri005@gmail.com',
          role: 'admin',
          is_active: true
        });
      }
    } catch (error) {
      console.error('Error fetching admin info:', error);
      setAdminInfo({
        email: 'prachishri005@gmail.com',
        role: 'admin',
        is_active: true
      });
    }
  };

  const fetchAuditLogs = async () => {
    try {
      // Check if Supabase is available
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn('⚠️ Supabase not configured - using mock audit logs');
        setAuditLogs([]);
        return;
      }
      
      const { data, error } = await supabase.rpc('get_recent_audit_logs', { limit_count: 20 });
      if (!error && data) {
        setAuditLogs(data);
      } else if (error && (error.message.includes('fetch failed') || error.message.includes('ENOTFOUND'))) {
        console.warn('⚠️ Network error - using mock audit logs');
        setAuditLogs([]);
      }
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      setAuditLogs([]);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleBackToWebsite = () => {
    navigate('/');
  };

  const handleAuthenticationCheck = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
        return false;
      }
      
      // Check if session is about to expire (within 5 minutes)
      const expiresAt = session.expires_at * 1000; // Convert to milliseconds
      const now = Date.now();
      const timeUntilExpiry = expiresAt - now;
      
      if (timeUntilExpiry < 5 * 60 * 1000 && timeUntilExpiry > 0) {
        // Show session timeout warning
        setNotifications(prev => [...prev, {
          message: 'Your session will expire soon. Please save your work.',
          time: new Date().toLocaleTimeString()
        }]);
      }
      
      // Check if session has expired
      if (timeUntilExpiry <= 0) {
        console.log('Session expired, logging out...');
        await supabase.auth.signOut();
        navigate('/admin/login');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Authentication check error:', error);
      navigate('/admin/login');
      return false;
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        fetchSubmissions(),
        fetchLeads(),
        fetchStats(),
        fetchAuditLogs()
      ]);
      
      // Show success notification
      setNotifications(prev => [...prev, {
        message: 'Data refreshed successfully',
        time: new Date().toLocaleTimeString()
      }]);
    } catch (error) {
      console.error('Refresh error:', error);
      // Show error notification
      setNotifications(prev => [...prev, {
        message: 'Failed to refresh data. Please try again.',
        time: new Date().toLocaleTimeString()
      }]);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchSubmissions = async () => {
    try {
      // Check if Supabase is available
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn('⚠️ Supabase not configured - using mock data');
        setSubmissions([]);
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        if (error.message.includes('fetch failed') || error.message.includes('ENOTFOUND')) {
          console.warn('⚠️ Network error - using mock data');
          setSubmissions([]);
        } else {
          console.error('Database error fetching submissions:', error);
          setSubmissions([]);
        }
      } else {
        setSubmissions(data || []);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeads = async () => {
    try {
      // Check if Supabase is available
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn('⚠️ Supabase not configured - using mock leads data');
        setLeads([]);
        return;
      }
      
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        if (error.message.includes('fetch failed') || error.message.includes('ENOTFOUND')) {
          console.warn('⚠️ Network error - using mock leads data');
          setLeads([]);
        } else {
          throw error;
        }
      } else {
        setLeads(data || []);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
      setLeads([]);
    }
  };

  const fetchStats = async () => {
    try {
      // Check if Supabase is available
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn('⚠️ Supabase not configured - using mock stats');
        setStats({
          total: 0,
          byType: {},
          byStatus: {},
          recent: 0
        });
        return;
      }
      
      const { data, error } = await supabase
        .from('form_submissions')
        .select('form_type, status, created_at');

      if (error) {
        if (error.message.includes('fetch failed') || error.message.includes('ENOTFOUND')) {
          console.warn('⚠️ Network error - using mock stats');
          setStats({
            total: 0,
            byType: {},
            byStatus: {},
            recent: 0
          });
        } else {
          throw error;
        }
        return;
      }

      const stats = {
        total: data.length,
        byType: {},
        byStatus: {},
        recent: data.filter(item => {
          const date = new Date(item.created_at);
          const now = new Date();
          return (now - date) < (7 * 24 * 60 * 60 * 1000);
        }).length
      };

      data.forEach(item => {
        stats.byType[item.form_type] = (stats.byType[item.form_type] || 0) + 1;
        stats.byStatus[item.status] = (stats.byStatus[item.status] || 0) + 1;
      });

      setStats(stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({
        total: 0,
        byType: {},
        byStatus: {},
        recent: 0
      });
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      // Check if Supabase is available
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn('⚠️ Supabase not configured - cannot update status');
        return;
      }
      
      const { error } = await supabase
        .from('form_submissions')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        if (error.message.includes('fetch failed') || error.message.includes('ENOTFOUND')) {
          console.warn('⚠️ Network error - cannot update status');
        } else {
          throw error;
        }
        return;
      }
      
      // Refresh data
      fetchSubmissions();
      fetchStats();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const updateLeadStatus = async (id, newStatus) => {
    try {
      // Check if Supabase is available
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn('⚠️ Supabase not configured - cannot update lead status');
        return;
      }
      
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        if (error.message.includes('fetch failed') || error.message.includes('ENOTFOUND')) {
          console.warn('⚠️ Network error - cannot update lead status');
        } else {
          throw error;
        }
        return;
      }
      
      // Refresh data
      fetchLeads();
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  const exportToCSV = () => {
    try {
      const headers = ['ID', 'Form Type', 'Name', 'Email', 'Phone', 'Company', 'Status', 'Created At'];
      const csvData = submissions.map(sub => [
        sub.id,
        sub.form_type,
        sub.form_data.name || '',
        sub.form_data.email || '',
        sub.form_data.phone || '',
        sub.form_data.company || '',
        sub.status,
        new Date(sub.created_at).toLocaleString()
      ]);

      const csvContent = [headers, ...csvData]
        .map(row => row.map(cell => `"${cell}"`).join(','))
        .join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `form-submissions-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      
      // Clean up the URL object
      window.URL.revokeObjectURL(url);
      
      // Show success notification
      setNotifications(prev => [...prev, {
        message: 'CSV exported successfully',
        time: new Date().toLocaleTimeString()
      }]);
    } catch (error) {
      console.error('Export error:', error);
      // Show error notification
      setNotifications(prev => [...prev, {
        message: 'Failed to export CSV. Please try again.',
        time: new Date().toLocaleTimeString()
      }]);
    }
  };

  const filteredSubmissions = submissions.filter(sub => {
    const matchesFilter = filter === 'all' || sub.form_type === filter;
    const matchesSearch = searchTerm === '' || 
      sub.form_data.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.form_data.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.form_data.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'processed': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-purple-100 text-purple-800';
      case 'converted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormTypeIcon = (type) => {
    switch (type) {
      case 'contact': return <Mail className="w-4 h-4" />;
      case 'newsletter': return <MessageSquare className="w-4 h-4" />;
      case 'brochure_download': return <Download className="w-4 h-4" />;
      case 'resource_download': return <FileText className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Form Submissions</title>
        <meta name="description" content="Admin dashboard for managing form submissions" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Enhanced Header */}
        <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="lg:hidden p-2 rounded-xl hover:bg-gray-100/80 transition-all duration-200"
                >
                  {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                
                <div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleBackToWebsite}
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all duration-200 hover:bg-blue-50 px-3 py-1 rounded-lg"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span className="text-sm font-medium">Back to Website</span>
                    </button>
                    <div className="w-px h-6 bg-gray-300"></div>
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                        Admin Dashboard
                      </h1>
                      <p className="text-gray-600 mt-1 text-sm">Manage and track all form submissions and leads</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Notifications */}
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-xl hover:bg-gray-100/80 transition-all duration-200"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {notifications.length}
                    </span>
                  )}
                </button>
                
                {/* Admin Info */}
                {adminInfo && (
                  <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-lg">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="font-medium">{adminInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        networkStatus === 'online' ? 'bg-green-500' : 
                        networkStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}></div>
                      <span className="font-medium">{networkStatus === 'online' ? 'Online' : 
                             networkStatus === 'offline' ? 'Offline' : 'Checking...'}</span>
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={() => navigate('/admin/videos')}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:from-purple-700 hover:to-purple-800 transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Video className="w-4 h-4" />
                    Videos
                  </button>
                  <button
                    onClick={() => setShowAuditLogs(!showAuditLogs)}
                    className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:from-orange-700 hover:to-orange-800 transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Activity className="w-4 h-4" />
                    Logs
                  </button>
                  <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:from-green-700 hover:to-green-800 transition-all duration-200 disabled:opacity-50 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                    {refreshing ? '...' : 'Refresh'}
                  </button>
                  <button
                    onClick={exportToCSV}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleBackToWebsite}
                    className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:from-gray-700 hover:to-gray-800 transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Home className="w-4 h-4" />
                    <span className="hidden sm:inline">Website</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:from-red-700 hover:to-red-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-b border-gray-200/50 mobile-menu shadow-lg"
          >
            <div className="px-4 py-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate('/admin/videos')}
                  className="flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition-all duration-200 border border-gray-100 hover:border-purple-200"
                >
                  <Video className="w-5 h-5" />
                  <span className="font-medium">Videos</span>
                </button>
                <button
                  onClick={() => setShowAuditLogs(!showAuditLogs)}
                  className="flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-orange-50 hover:text-orange-700 rounded-xl transition-all duration-200 border border-gray-100 hover:border-orange-200"
                >
                  <Activity className="w-5 h-5" />
                  <span className="font-medium">Logs</span>
                </button>
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-xl transition-all duration-200 border border-gray-100 hover:border-green-200 disabled:opacity-50"
                >
                  <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
                  <span className="font-medium">Refresh</span>
                </button>
                <button
                  onClick={exportToCSV}
                  className="flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all duration-200 border border-gray-100 hover:border-blue-200"
                >
                  <Download className="w-5 h-5" />
                  <span className="font-medium">Export</span>
                </button>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <button
                  onClick={handleBackToWebsite}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200"
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Back to Website</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Notifications Panel */}
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-20 right-4 bg-white rounded-lg shadow-lg border border-gray-200 w-80 z-50 notifications-panel"
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              {notifications.length > 0 && (
                <button
                  onClick={() => setNotifications([])}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="p-4">
              {notifications.length === 0 ? (
                <div className="text-center py-4">
                  <Bell className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">No new notifications</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {notifications.map((notification, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Enhanced Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-all duration-200 hover:bg-blue-50 px-3 py-1 rounded-lg">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link to="/admin/login" className="text-gray-500 hover:text-blue-600 transition-all duration-200 hover:bg-blue-50 px-3 py-1 rounded-lg">
              Admin
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-semibold bg-gray-100 px-3 py-1 rounded-lg">Dashboard</span>
          </nav>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Submissions</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">{stats.total || 0}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+12% from last month</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Leads</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">{leads.length || 0}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+8% from last month</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">New Submissions</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">{stats.byStatus?.new || 0}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-yellow-600">
                <Clock className="w-4 h-4 mr-1" />
                <span>Awaiting review</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Converted</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">{stats.byStatus?.converted || 0}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-purple-600">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span>Successfully converted</span>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Tab Navigation */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 mb-6">
            <div className="border-b border-gray-200/50">
              <nav className="-mb-px flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('submissions')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                    activeTab === 'submissions'
                      ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                      : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Form Submissions ({submissions.length})
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                    activeTab === 'leads'
                      ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                      : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4" />
                    Leads ({leads.length})
                  </div>
                </button>
              </nav>
            </div>
          </div>

          {/* Audit Logs Section */}
          {showAuditLogs && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow mb-6"
            >
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-orange-600" />
                  Recent Audit Logs
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Table</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">{log.user_email || 'System'}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              log.action === 'INSERT' ? 'bg-green-100 text-green-800' :
                              log.action === 'UPDATE' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {log.action}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">{log.table_name}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {new Date(log.created_at).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {auditLogs.length === 0 && (
                    <div className="text-center py-8">
                      <Activity className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">No audit logs found</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Enhanced Filters */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 mb-6">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by name, email, or company..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-3 border border-gray-300/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200 font-medium"
                  >
                    <option value="all">All Forms</option>
                    <option value="contact">Contact</option>
                    <option value="newsletter">Newsletter</option>
                    <option value="brochure_download">Brochure Download</option>
                    <option value="resource_download">Resource Download</option>
                    <option value="calculator_salary">Salary Calculator</option>
                    <option value="calculator_hr_needs_assessment">HR Needs Assessment</option>
                    <option value="calculator_roi">ROI Calculator</option>
                    <option value="calculator_employee_engagement">Employee Engagement</option>
                  </select>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilter('all');
                    }}
                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200 font-medium"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Submissions Table */}
          {activeTab === 'submissions' && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200/50">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Form Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Contact Info
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/50 divide-y divide-gray-200/50">
                    {filteredSubmissions.map((submission) => (
                      <motion.tr
                        key={submission.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50/80 transition-all duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-sm">
                              {getFormTypeIcon(submission.form_type)}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-semibold text-gray-900">
                                {submission.form_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {submission.form_data.name || 'N/A'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {submission.form_data.email || 'N/A'}
                            </div>
                            {submission.form_data.phone && (
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {submission.form_data.phone}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {submission.form_data.company || 'N/A'}
                          </div>
                          {submission.form_data.designation && (
                            <div className="text-sm text-gray-500">
                              {submission.form_data.designation}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${getStatusColor(submission.status)}`}>
                            {submission.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(submission.created_at).toLocaleDateString()}
                          <br />
                          <span className="text-xs">
                            {new Date(submission.created_at).toLocaleTimeString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <select
                              value={submission.status}
                              onChange={(e) => updateStatus(submission.id, e.target.value)}
                              className="text-xs border border-gray-300/50 rounded-lg px-3 py-2 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            >
                              <option value="new">New</option>
                              <option value="processed">Processed</option>
                              <option value="contacted">Contacted</option>
                              <option value="converted">Converted</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredSubmissions.length === 0 && (
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No submissions found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Enhanced Leads Table */}
          {activeTab === 'leads' && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200/50">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Contact Info
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Source
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Lead Score
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/50 divide-y divide-gray-200/50">
                    {leads.map((lead) => (
                      <motion.tr
                        key={lead.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50/80 transition-all duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {lead.name || 'N/A'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {lead.email || 'N/A'}
                            </div>
                            {lead.phone && (
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {lead.phone}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {lead.company || 'N/A'}
                          </div>
                          {lead.job_title && (
                            <div className="text-sm text-gray-500">
                              {lead.job_title}
                            </div>
                          )}
                          {lead.company_size && (
                            <div className="text-xs text-gray-400">
                              {lead.company_size}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {lead.source || 'website'}
                          </div>
                          {lead.calculator_used && (
                            <div className="text-xs text-gray-500">
                              Calculator: {lead.calculator_used}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${getStatusColor(lead.status)}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {lead.lead_score || 0}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(lead.created_at).toLocaleDateString()}
                          <br />
                          <span className="text-xs">
                            {new Date(lead.created_at).toLocaleTimeString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <select
                              value={lead.status}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                              className="text-xs border border-gray-300/50 rounded-lg px-3 py-2 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="qualified">Qualified</option>
                              <option value="converted">Converted</option>
                              <option value="lost">Lost</option>
                            </select>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {leads.length === 0 && (
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No leads found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Leads will appear here when forms are submitted.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard; 