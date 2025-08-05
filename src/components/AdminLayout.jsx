import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
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

const AdminLayout = ({ children, title = "Admin Panel", showStats = false }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [adminInfo, setAdminInfo] = useState(null);
  const [networkStatus, setNetworkStatus] = useState('checking');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initializeLayout = async () => {
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
      getCurrentUser();
      getAdminInfo();
    };

    initializeLayout();
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

  const getCurrentUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser(user);
      }
    } catch (error) {
      console.error('Error getting current user:', error);
    }
  };

  const getAdminInfo = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('admin_users')
          .select('*')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .single();
        
        if (data && !error) {
          setAdminInfo(data);
        }
      }
    } catch (error) {
      console.error('Error getting admin info:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleBackToWebsite = () => {
    navigate('/');
  };

  const handleAuthenticationCheck = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/admin/login');
        return false;
      }

      // Check if user is admin
      const { data: adminData, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (error || !adminData) {
        navigate('/admin/login');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Authentication check failed:', error);
      navigate('/admin/login');
      return false;
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // Reload the current page
      window.location.reload();
    } catch (error) {
      console.error('Error refreshing:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/admin/videos')) return 'Video Manager';
    if (path.includes('/admin/dashboard')) return 'Dashboard';
    return title;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Admin Header */}
      <div className="bg-white shadow-lg border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            {/* Logo and Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100/80 transition-all duration-200"
              >
                {showMobileMenu ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                  <p className="text-sm text-gray-600">{getPageTitle()}</p>
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
                  onClick={() => navigate('/admin/dashboard')}
                  className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 ${
                    location.pathname === '/admin/dashboard' 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                      : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/admin/videos')}
                  className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 ${
                    location.pathname === '/admin/videos' 
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white' 
                      : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  Videos
                </button>
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:from-green-700 hover:to-green-800 transition-all duration-200 disabled:opacity-50 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                  {refreshing ? '...' : 'Refresh'}
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
                onClick={() => navigate('/admin/dashboard')}
                className={`flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-all duration-200 border ${
                  location.pathname === '/admin/dashboard'
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-gray-100 hover:border-blue-200'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </button>
              <button
                onClick={() => navigate('/admin/videos')}
                className={`flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-all duration-200 border ${
                  location.pathname === '/admin/videos'
                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                    : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700 border-gray-100 hover:border-purple-200'
                }`}
              >
                <Video className="w-5 h-5" />
                <span className="font-medium">Videos</span>
              </button>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-xl transition-all duration-200 border border-gray-100 hover:border-green-200 disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="font-medium">Refresh</span>
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
          <span className="text-gray-900 font-semibold bg-gray-100 px-3 py-1 rounded-lg">{getPageTitle()}</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout; 