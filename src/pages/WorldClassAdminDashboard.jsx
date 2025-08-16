import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../lib/AuthContext';
import { supabase } from '../lib/supabase';
import AdminLogin from '../components/AdminLogin';
import ServiceVideoManager from '../components/admin/ServiceVideoManager';
import AdvancedBlogManager from '../components/admin/AdvancedBlogManager';
import AnalyticsProCenter from '../components/admin/AnalyticsProCenter';
import AutomationCenter from '../components/admin/AutomationCenter';
import SecurityCenter from '../components/admin/SecurityCenter';
import SystemSettings from '../components/admin/SystemSettings';
import ResourceManager from '../components/admin/ResourceManager';

import WhatsAppIntegration from '../components/admin/WhatsAppIntegration';
import EmailAutomation from '../components/admin/EmailAutomation';
import SystemSettingsManager from '../components/admin/SystemSettingsManager';
import LeadsManager from '../components/admin/LeadsManager';
import { emailService } from '../services/emailService';
import { runDashboardTests } from '../utils/dashboardTestSuite';
import {
  BarChart3, Users, FileText, Video, Mail, Calculator,
  Settings, Bell, Search, Filter, Download, Plus,
  TrendingUp, TrendingDown, Activity, Calendar,
  DollarSign, Target, Clock, AlertCircle, CheckCircle,
  ArrowUpRight, ArrowDownRight, MoreVertical, Trash2,
  Edit, Eye, Send, Upload, Zap, Shield, Database,
  Globe, Smartphone, Monitor, Tablet, RefreshCw,
  Star, Heart, Share2, MessageSquare, ChevronDown,
  ChevronRight, X, Check, AlertTriangle, Info,
  LogOut, Home, ChevronLeft, UserPlus, Key
} from 'lucide-react';

// ========================================
// WORLD-CLASS ADMIN DASHBOARD COMPONENT
// ========================================

const WorldClassAdminDashboard = () => {
  // ========================================
  // STATE MANAGEMENT
  // ========================================
  
  // Authentication and loading states
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Navigation and UI states
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Data states
  const [dashboardData, setDashboardData] = useState({});
  const [realTimeData, setRealTimeData] = useState({});
  const [notifications, setNotifications] = useState([]);
  
  // Modal and interaction states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalData, setModalData] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState({});
  
  // Data collections
  const [leads, setLeads] = useState([]);
  const [formSubmissions, setFormSubmissions] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [videos, setVideos] = useState([]);
  const [files, setFiles] = useState([]);
  const [emails, setEmails] = useState([]);
  const [analytics, setAnalytics] = useState({});
  
  // Specialized component states
  const [showServiceVideoManager, setShowServiceVideoManager] = useState(false);
  const [showAdvancedBlogManager, setShowAdvancedBlogManager] = useState(false);
  const [showAnalyticsPro, setShowAnalyticsPro] = useState(false);
  const [showAutomationCenter, setShowAutomationCenter] = useState(false);
  const [showSecurityCenter, setShowSecurityCenter] = useState(false);
  const [showSystemSettings, setShowSystemSettings] = useState(false);
  const [showResourceManager, setShowResourceManager] = useState(false);

  const [showWhatsAppIntegration, setShowWhatsAppIntegration] = useState(false);
  const [showEmailAutomation, setShowEmailAutomation] = useState(false);

  // ========================================
  // NAVIGATION CONFIGURATION
  // ========================================
  
  const navigationTabs = useMemo(() => [
    { 
      id: 'overview', 
      name: 'Dashboard', 
      icon: BarChart3, 
      badge: null,
      description: 'Real-time analytics and insights'
    },
    { 
      id: 'leads', 
      name: 'CRM & Leads', 
      icon: Users, 
      badge: leads.filter(l => l.status === 'new').length,
      description: 'Advanced lead management system'
    },
    { 
      id: 'content', 
      name: 'Content Hub', 
      icon: FileText, 
      badge: blogPosts.filter(p => p.status === 'draft').length,
      description: 'Blog and content management'
    },
    { 
      id: 'media', 
      name: 'Media Center', 
      icon: Video, 
      badge: null,
      description: 'Video and file management'
    },
    { 
      id: 'communication', 
      name: 'Communication', 
      icon: Mail, 
      badge: emails.filter(e => e.status === 'pending').length,
      description: 'Email campaigns and templates'
    },
    { 
      id: 'analytics', 
      name: 'Analytics Pro', 
      icon: TrendingUp, 
      badge: null,
      description: 'Advanced reporting and insights'
    },

    { 
      id: 'whatsapp', 
      name: 'WhatsApp API', 
      icon: Smartphone, 
      badge: null,
      description: 'WhatsApp Business API integration'
    },
    { 
      id: 'email-automation', 
      name: 'Email Automation', 
      icon: Mail, 
      badge: null,
      description: 'Automated email campaigns'
    },
    { 
      id: 'automation', 
      name: 'Automation', 
      icon: Zap, 
      badge: null,
      description: 'Workflow automation and AI'
    },
    { 
      id: 'security', 
      name: 'Security', 
      icon: Shield, 
      badge: null,
      description: 'User management and security'
    },
    { 
      id: 'settings', 
      name: 'Settings', 
      icon: Settings, 
      badge: null,
      description: 'System configuration'
    }
  ], [leads, blogPosts, emails]);

  // ========================================
  // DATA LOADING FUNCTIONS
  // ========================================
  
  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Verify authentication
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No active session. Please log in again.');
      }

      // Verify admin privileges
      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('is_active', true)
        .single();

      if (!adminUser) {
        throw new Error('Access denied. Admin privileges required.');
      }

      console.log('🚀 Loading world-class dashboard data...');

      // Load core data with enhanced error handling
      const dataQueries = await Promise.allSettled([
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
        supabase.from('form_submissions').select('*').order('created_at', { ascending: false }),
        supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
        supabase.from('videos').select('*').order('created_at', { ascending: false }),
        supabase.from('resources').select('*').order('created_at', { ascending: false }),
        supabase.from('email_logs').select('*').order('created_at', { ascending: false }),
        supabase.from('calculator_results').select('*').order('created_at', { ascending: false }),
        supabase.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(100),
        supabase.from('notifications').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false })
      ]);

      // Process results with graceful error handling
      const [
        leadsResult, formSubmissionsResult, blogResult, videosResult, filesResult, 
        emailsResult, calculatorsResult, activityResult, notificationsResult
      ] = dataQueries;

      // Extract data safely
      const leadsData = leadsResult.status === 'fulfilled' ? leadsResult.value.data || [] : [];
      const formSubmissionsData = formSubmissionsResult.status === 'fulfilled' ? formSubmissionsResult.value.data || [] : [];
      const blogData = blogResult.status === 'fulfilled' ? blogResult.value.data || [] : [];
      const videosData = videosResult.status === 'fulfilled' ? videosResult.value.data || [] : [];
      const filesData = filesResult.status === 'fulfilled' ? filesResult.value.data || [] : [];
      const emailsData = emailsResult.status === 'fulfilled' ? emailsResult.value.data || [] : [];
      const calculatorsData = calculatorsResult.status === 'fulfilled' ? calculatorsResult.value.data || [] : [];
      const activityData = activityResult.status === 'fulfilled' ? activityResult.value.data || [] : [];
      const notificationsData = notificationsResult.status === 'fulfilled' ? notificationsResult.value.data || [] : [];

      // Set data states
      setLeads(leadsData);
      setFormSubmissions(formSubmissionsData);
      setBlogPosts(blogData);
      setVideos(videosData);
      setFiles(filesData);
      setEmails(emailsData);
      setNotifications(notificationsData);

      // Calculate comprehensive analytics
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const dashboardStats = {
        // Core metrics
        totalLeads: leadsData.length,
        totalFormSubmissions: formSubmissionsData.length,
        newLeads: leadsData.filter(l => l.status === 'new').length,
        newFormSubmissions: formSubmissionsData.filter(f => f.status === 'new').length,
        convertedLeads: leadsData.filter(l => l.status === 'converted').length,
        convertedFormSubmissions: formSubmissionsData.filter(f => f.status === 'converted').length,
        recentLeads: leadsData.filter(l => new Date(l.created_at) > weekAgo).length,
        recentFormSubmissions: formSubmissionsData.filter(f => new Date(f.created_at) > weekAgo).length,
        
        // Content metrics
        totalPosts: blogData.length,
        publishedPosts: blogData.filter(p => p.status === 'published').length,
        draftPosts: blogData.filter(p => p.status === 'draft').length,
        
        // Media metrics
        totalVideos: videosData.length,
        activeVideos: videosData.filter(v => v.is_active).length,
        totalFiles: filesData.length,
        
        // Communication metrics
        totalEmails: emailsData.length,
        recentEmails: emailsData.filter(e => new Date(e.created_at) > weekAgo).length,
        
        // Conversion metrics
        conversionRate: leadsData.length > 0 ? 
          ((leadsData.filter(l => l.status === 'converted').length / leadsData.length) * 100).toFixed(1) : '0.0',
        
        // Growth metrics
        leadGrowth: calculateGrowthRate(leadsData, weekAgo),
        formSubmissionGrowth: calculateGrowthRate(formSubmissionsData, weekAgo),
        contentGrowth: calculateGrowthRate(blogData, weekAgo),
        emailGrowth: calculateGrowthRate(emailsData, weekAgo),
        
        // Recent activity
        recentActivity: activityData.slice(0, 10),
        
        // Performance indicators
        systemHealth: 98.5, // This would be calculated from real metrics
        responseTime: 85, // Average response time in ms
        uptime: 99.9 // System uptime percentage
      };

      setDashboardData(dashboardStats);
      addNotification('Dashboard loaded successfully', 'success');
      console.log('✅ Dashboard data loaded successfully');

    } catch (err) {
      console.error('❌ Dashboard loading error:', err);
      setError(err.message || 'Failed to load dashboard data');
      addNotification('Error loading dashboard', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  // ========================================
  // UTILITY FUNCTIONS
  // ========================================
  
  const calculateGrowthRate = (data, compareDate) => {
    const recent = data.filter(item => new Date(item.created_at) > compareDate).length;
    const previous = data.filter(item => new Date(item.created_at) <= compareDate).length;
    if (previous === 0) return recent > 0 ? 100 : 0;
    return ((recent - previous) / previous * 100).toFixed(1);
  };

  const addNotification = useCallback((message, type = 'info', autoRemove = true) => {
    const notification = {
      id: Date.now() + Math.random(),
      message,
      type,
      timestamp: new Date(),
      read: false
    };
    
    setNotifications(prev => [notification, ...prev.slice(0, 9)]);
    
    if (autoRemove) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 5000);
    }
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num?.toString() || '0';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount || 0);
  };

  // ========================================
  // MODAL MANAGEMENT
  // ========================================
  
  const openModal = useCallback((type, data = {}) => {
    setModalType(type);
    setModalData(data);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setModalType('');
    setModalData({});
  }, []);

  // ========================================
  // CRUD OPERATIONS
  // ========================================
  
  const handleCreateLead = async (leadData) => {
    try {
      // Combine first_name and last_name into name field for leads table
      const { first_name, last_name, ...restData } = leadData;
      const name = `${first_name || ''} ${last_name || ''}`.trim();
      
      const { data, error } = await supabase
        .from('leads')
        .insert([{
          name: name,
          ...restData,
          created_at: new Date().toISOString(),
          status: 'new'
        }])
        .select()
        .single();

      if (error) throw error;

      setLeads(prev => [data, ...prev]);
      addNotification('Lead created successfully', 'success');
      closeModal();
      
      // Refresh dashboard data
      loadDashboardData();
    } catch (error) {
      console.error('Error creating lead:', error);
      addNotification('Failed to create lead', 'error');
    }
  };

  const handleUpdateLead = async (leadId, updates) => {
    try {
      // Combine first_name and last_name into name field for leads table
      const { first_name, last_name, ...restUpdates } = updates;
      const updateData = {
        ...restUpdates,
        updated_at: new Date().toISOString()
      };
      
      // Only update name if first_name or last_name is provided
      if (first_name || last_name) {
        updateData.name = `${first_name || ''} ${last_name || ''}`.trim();
      }
      
      const { data, error } = await supabase
        .from('leads')
        .update(updateData)
        .eq('id', leadId)
        .select()
        .single();

      if (error) throw error;

      setLeads(prev => prev.map(lead => lead.id === leadId ? data : lead));
      addNotification('Lead updated successfully', 'success');
      closeModal();
    } catch (error) {
      console.error('Error updating lead:', error);
      addNotification('Failed to update lead', 'error');
    }
  };

  const handleCreateBlog = async (blogData) => {
    try {
      // Sanitize incoming fields and map to existing columns only
      const toSlug = (str) =>
        (str || '')
          .toString()
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');

      const normalizedTags = Array.isArray(blogData.tags)
        ? blogData.tags.filter(Boolean).map((t) => String(t).trim()).filter(Boolean)
        : String(blogData.tags || '')
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean);

      const payload = {
        title: blogData.title || '',
        slug: blogData.slug ? toSlug(blogData.slug) : toSlug(blogData.title || ''),
        content: blogData.content || '',
        excerpt: blogData.excerpt || null,
        category: blogData.category || null,
        tags: normalizedTags.length ? normalizedTags : null,
        featured_image_url: blogData.featured_image_url || null,
        status: blogData.status || 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      if (payload.status === 'published') {
        payload.published_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;

      setBlogPosts(prev => [data, ...prev]);
      addNotification('Blog post created successfully', 'success');
      closeModal();
    } catch (error) {
      console.error('Error creating blog post:', error);
      addNotification('Failed to create blog post', 'error');
    }
  };

  const handleUploadVideo = async (videoData) => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .insert([{
          ...videoData,
          created_at: new Date().toISOString(),
          is_active: true
        }])
        .select()
        .single();

      if (error) throw error;

      setVideos(prev => [data, ...prev]);
      addNotification('Video uploaded successfully', 'success');
      closeModal();
    } catch (error) {
      console.error('Error uploading video:', error);
      addNotification('Failed to upload video', 'error');
    }
  };

  const handleSendEmail = async (emailData) => {
    try {
      // Prepare email data
      const emailPayload = {
        to: emailData.to_email,
        subject: emailData.subject,
        html: emailData.content || undefined,
        template: emailData.template || undefined,
        variables: emailData.variables || {},
        replyTo: 'contact@hirewithprachi.com'
      };

      // Send email using email service
      const result = await emailService.sendEmail(emailPayload);

      // Log to database
      const { data, error } = await supabase
        .from('email_logs')
        .insert([{
          to_addresses: [emailData.to_email],
          subject: emailData.subject,
          content_html: emailData.content,
          status: 'sent',
          provider: result.provider,
          message_id: result.messageId,
          sent_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.warn('Failed to log email to database:', error);
        // Continue anyway since email was sent
      }

      setEmails(prev => [data || { 
        id: `temp_${Date.now()}`,
        to_addresses: [emailData.to_email],
        subject: emailData.subject,
        status: 'sent',
        sent_at: new Date().toISOString() 
      }, ...prev]);

      addNotification(
        `Email sent successfully via ${result.provider}`,
        'success'
      );
      closeModal();

    } catch (error) {
      console.error('Error sending email:', error);
      
      // Log failed email to database
      try {
        await supabase
          .from('email_logs')
          .insert([{
            to_addresses: [emailData.to_email],
            subject: emailData.subject,
            content_html: emailData.content,
            status: 'failed',
            error_message: error.message,
            created_at: new Date().toISOString()
          }]);
      } catch (logError) {
        console.warn('Failed to log email error:', logError);
      }

      addNotification(`Failed to send email: ${error.message}`, 'error');
    }
  };

  const handleUploadFile = async (fileData) => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .insert([{
          ...fileData,
          created_at: new Date().toISOString(),
          download_count: 0
        }])
        .select()
        .single();

      if (error) throw error;

      setFiles(prev => [data, ...prev]);
      addNotification('File uploaded successfully', 'success');
      closeModal();
    } catch (error) {
      console.error('Error uploading file:', error);
      addNotification('Failed to upload file', 'error');
    }
  };

  // Quality Check and Testing Functions
  const runQualityCheck = async () => {
    try {
      addNotification('Running quality check...', 'info');
      const testResults = await runDashboardTests();
      
      const { summary } = testResults;
      if (summary.failed === 0) {
        addNotification(
          `✅ Quality Check Passed! ${summary.passed}/${summary.total} tests successful`,
          'success'
        );
      } else {
        addNotification(
          `⚠️ Quality Check: ${summary.passed}/${summary.total} tests passed (${summary.successRate})`,
          'warning'
        );
      }
      
      console.log('📊 Quality Check Results:', testResults);
      return testResults;
    } catch (error) {
      console.error('Quality check failed:', error);
      addNotification('Quality check failed to run', 'error');
    }
  };

  // ========================================
  // REAL-TIME SUBSCRIPTIONS
  // ========================================
  
  useEffect(() => {
    if (!user) return;

    // Set up real-time subscriptions for live updates
    const subscriptions = [];

    // Subscribe to leads changes
    const leadsSubscription = supabase
      .channel('leads-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'leads' },
        (payload) => {
          console.log('🔄 Real-time leads update:', payload);
          if (payload.eventType === 'INSERT') {
            setLeads(prev => [payload.new, ...prev]);
            addNotification(`New lead: ${payload.new.name}`, 'success');
          } else if (payload.eventType === 'UPDATE') {
            setLeads(prev => prev.map(lead => 
              lead.id === payload.new.id ? payload.new : lead
            ));
          } else if (payload.eventType === 'DELETE') {
            setLeads(prev => prev.filter(lead => lead.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    subscriptions.push(leadsSubscription);

    // Subscribe to notifications
    const notificationsSubscription = supabase
      .channel('notifications-changes')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
        (payload) => {
          setNotifications(prev => [payload.new, ...prev.slice(0, 9)]);
        }
      )
      .subscribe();

    subscriptions.push(notificationsSubscription);

    // Cleanup subscriptions
    return () => {
      subscriptions.forEach(subscription => {
        supabase.removeChannel(subscription);
      });
    };
  }, [user, addNotification]);

  // ========================================
  // COMPONENT INITIALIZATION
  // ========================================
  
  useEffect(() => {
    if (user && !authLoading) {
      loadDashboardData();
    }
  }, [user, authLoading, loadDashboardData]);

  useEffect(() => {
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('admin-dark-mode') === 'true';
    setDarkMode(savedDarkMode);
    
    // Apply dark mode class
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // ========================================
  // RENDER CONDITIONS
  // ========================================
  
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 dark:border-blue-800 mx-auto"></div>
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-600 border-t-transparent absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">Loading Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Preparing your world-class experience...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900 dark:to-pink-900 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Dashboard Error</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            <button
              onClick={loadDashboardData}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4 inline mr-2" />
              Retry Loading
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  // ========================================
  // MAIN DASHBOARD RENDER
  // ========================================
  
  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* ========================================
          HEADER SECTION
          ======================================== */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <BarChart3 className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
              <div>
                {/* Breadcrumbs */}
                <div className="flex items-center space-x-2 mb-1">
                  <a href="/" className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </a>
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Admin</span>
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {navigationTabs.find(tab => tab.id === activeTab)?.name || 'Dashboard'}
                  </span>
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  World-Class Admin
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enterprise Dashboard
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 border-0 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.slice(0, 5).map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                              !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                notification.type === 'success' ? 'bg-green-500' :
                                notification.type === 'error' ? 'bg-red-500' :
                                notification.type === 'warning' ? 'bg-yellow-500' :
                                'bg-blue-500'
                              }`} />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-900 dark:text-white">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {new Date(notification.timestamp).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                          No notifications
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Quality Check Button */}
              <button
                onClick={runQualityCheck}
                className="p-2.5 rounded-xl hover:bg-green-100 dark:hover:bg-green-900 text-green-600 dark:text-green-400 transition-colors duration-200"
                title="Run Quality Check"
              >
                <CheckCircle className="w-5 h-5" />
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => {
                  const newDarkMode = !darkMode;
                  setDarkMode(newDarkMode);
                  localStorage.setItem('admin-dark-mode', newDarkMode.toString());
                  if (newDarkMode) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                }}
                className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {darkMode ? (
                  <div className="w-5 h-5 bg-yellow-400 rounded-full" />
                ) : (
                  <div className="w-5 h-5 bg-gray-800 rounded-full" />
                )}
              </button>

              {/* User Profile */}
              <div className="flex items-center space-x-3 pl-3 border-l border-gray-200 dark:border-gray-700">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.email?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
                <button
                  onClick={async () => {
                    try {
                      await supabase.auth.signOut();
                      window.location.href = '/admin-login';
                    } catch (error) {
                      console.error('Logout error:', error);
                      addNotification('Failed to logout', 'error');
                    }
                  }}
                  className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* ========================================
            SIDEBAR NAVIGATION
            ======================================== */}
        <nav className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        }`}>
          <div className="p-4 space-y-2">
            {navigationTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${
                    activeTab === tab.id ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                  }`} />
                  {!sidebarCollapsed && (
                    <>
                      <div className="flex-1 text-left">
                        <div className="font-medium">{tab.name}</div>
                        <div className="text-xs opacity-75 mt-0.5">{tab.description}</div>
                      </div>
                      {tab.badge && tab.badge > 0 && (
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          activeTab === tab.id
                            ? 'bg-white/20 text-white'
                            : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                        }`}>
                          {tab.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* ========================================
            MAIN CONTENT AREA
            ======================================== */}
        <main className="flex-1 overflow-hidden">
          <div className="p-6 h-screen overflow-y-auto">
            {/* Dashboard Overview Tab */}
            {activeTab === 'overview' && (
              <DashboardOverview 
                data={dashboardData} 
                onOpenModal={openModal}
                formatNumber={formatNumber}
                formatCurrency={formatCurrency}
              />
            )}

            {/* CRM & Leads Tab */}
            {activeTab === 'leads' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">CRM & Leads Management</h2>
                      <p className="text-gray-600 dark:text-gray-400">Manage leads and track payment attempts</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <LeadsManager />
                </div>
              </div>
            )}

            {/* Content Hub Tab */}
            {activeTab === 'content' && (
              <ContentHubSection 
                blogPosts={blogPosts} 
                onOpenModal={openModal}
                onOpenAdvancedBlogManager={() => setShowAdvancedBlogManager(true)}
                searchTerm={searchTerm}
              />
            )}

            {/* Media Center Tab */}
            {activeTab === 'media' && (
              <MediaCenterSection 
                videos={videos}
                files={files}
                onOpenModal={openModal}
                onOpenServiceVideoManager={() => setShowServiceVideoManager(true)}
                onOpenResourceManager={() => setShowResourceManager(true)}
                searchTerm={searchTerm}
              />
            )}

            {/* Communication Tab */}
            {activeTab === 'communication' && (
              <CommunicationSection 
                emails={emails}
                onOpenModal={openModal}
                searchTerm={searchTerm}
              />
            )}

            {/* Analytics Pro Tab */}
            {activeTab === 'analytics' && (
              <AnalyticsProSection 
                data={dashboardData}
                leads={leads}
                blogPosts={blogPosts}
                formatNumber={formatNumber}
                onOpenAnalyticsPro={() => setShowAnalyticsPro(true)}
              />
            )}

            {/* AI Tools Tab */}


            {/* WhatsApp API Tab */}
            {activeTab === 'whatsapp' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">WhatsApp Business API</h2>
                      <p className="text-gray-600 dark:text-gray-400">Configure WhatsApp integrations and automations</p>
                    </div>
                    <button
                      onClick={() => setShowWhatsAppIntegration(true)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Full Manager
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <WhatsAppIntegration />
                </div>
              </div>
            )}

            {/* Email Automation Tab */}
            {activeTab === 'email-automation' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Email Automation</h2>
                      <p className="text-gray-600 dark:text-gray-400">Manage automated email campaigns and workflows</p>
                    </div>
                    <button
                      onClick={() => setShowEmailAutomation(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Full Manager
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <EmailAutomation />
                </div>
              </div>
            )}

            {/* Automation Tab */}
            {activeTab === 'automation' && (
              <AutomationSection 
                onOpenModal={openModal}
                onOpenAutomationCenter={() => setShowAutomationCenter(true)}
              />
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <SecuritySection 
                onOpenModal={openModal} 
                onOpenSecurityCenter={() => setShowSecurityCenter(true)}
              />
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <SettingsSection 
                onOpenModal={openModal} 
                onOpenSystemSettings={() => setShowSystemSettings(true)}
              />
            )}
          </div>
        </main>
      </div>

      {/* ========================================
          MODAL SYSTEM
          ======================================== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {modalType === 'createLead' && 'Create New Lead'}
                {modalType === 'editLead' && 'Edit Lead'}
                {modalType === 'createBlog' && 'Create Blog Post'}
                {modalType === 'uploadVideo' && 'Upload Video'}
                {modalType === 'sendEmail' && 'Send Email'}
                {modalType === 'uploadFile' && 'Upload File'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <div className="p-6">
              {/* Render appropriate modal content */}
              {modalType === 'createLead' && <CreateLeadModal onSubmit={handleCreateLead} onCancel={closeModal} />}
              {modalType === 'editLead' && <EditLeadModal lead={modalData} onSubmit={handleUpdateLead} onCancel={closeModal} />}
              {modalType === 'createBlog' && <CreateBlogModal onSubmit={handleCreateBlog} onCancel={closeModal} />}
              {modalType === 'uploadVideo' && <UploadVideoModal onSubmit={handleUploadVideo} onCancel={closeModal} />}
              {modalType === 'sendEmail' && <SendEmailModal onSubmit={handleSendEmail} onCancel={closeModal} />}
              {modalType === 'uploadFile' && <UploadFileModal onSubmit={handleUploadFile} onCancel={closeModal} />}
            </div>
          </div>
        </div>
      )}

      {/* ========================================
          SPECIALIZED COMPONENTS
          ======================================== */}
      
      {/* Service Video Manager */}
      {showServiceVideoManager && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto">
          <ServiceVideoManager
            onClose={() => setShowServiceVideoManager(false)}
            addNotification={addNotification}
          />
        </div>
      )}

      {/* Advanced Blog Manager */}
      {showAdvancedBlogManager && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto">
          <AdvancedBlogManager
            onClose={() => setShowAdvancedBlogManager(false)}
            addNotification={addNotification}
          />
        </div>
      )}

      {/* Analytics Pro Center */}
      {showAnalyticsPro && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto">
          <AnalyticsProCenter
            data={dashboardData}
            leads={leads}
            blogPosts={blogPosts}
            onClose={() => setShowAnalyticsPro(false)}
            addNotification={addNotification}
          />
        </div>
      )}

      {/* Automation Center */}
      {showAutomationCenter && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto">
          <AutomationCenter
            onClose={() => setShowAutomationCenter(false)}
            addNotification={addNotification}
          />
        </div>
      )}

      {/* Security Center */}
      {showSecurityCenter && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            <SecurityCenter
              onClose={() => setShowSecurityCenter(false)}
              addNotification={addNotification}
            />
          </div>
        </div>
      )}

      {/* System Settings */}
      {showSystemSettings && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            <SystemSettings
              onClose={() => setShowSystemSettings(false)}
              addNotification={addNotification}
            />
          </div>
        </div>
      )}

      {showResourceManager && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            <ResourceManager
              onClose={() => setShowResourceManager(false)}
              addNotification={addNotification}
            />
          </div>
        </div>
      )}



      {showWhatsAppIntegration && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">WhatsApp Business API</h1>
              <button
                onClick={() => setShowWhatsAppIntegration(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
            <WhatsAppIntegration />
          </div>
        </div>
      )}

      {showEmailAutomation && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Email Automation Manager</h1>
              <button
                onClick={() => setShowEmailAutomation(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
            <EmailAutomation />
          </div>
        </div>
      )}

      {showSystemSettings && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Settings Manager</h1>
              <button
                onClick={() => setShowSystemSettings(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
            <SystemSettingsManager />
          </div>
        </div>
      )}

    </div>
  );
};

// ========================================
// DASHBOARD OVERVIEW COMPONENT
// ========================================

const DashboardOverview = ({ data, onOpenModal, formatNumber, formatCurrency }) => {
  const stats = [
    {
      name: 'Total Leads',
      value: formatNumber(data.totalLeads || 0),
      change: `+${data.leadGrowth || 0}%`,
      changeType: parseFloat(data.leadGrowth || 0) >= 0 ? 'positive' : 'negative',
      icon: Users,
      color: 'blue'
    },
    {
      name: 'Form Submissions',
      value: formatNumber(data.totalFormSubmissions || 0),
      change: `+${data.formSubmissionGrowth || 0}%`,
      changeType: parseFloat(data.formSubmissionGrowth || 0) >= 0 ? 'positive' : 'negative',
      icon: FileText,
      color: 'purple'
    },
    {
      name: 'Conversion Rate',
      value: `${data.conversionRate || 0}%`,
      change: '+2.3%',
      changeType: 'positive',
      icon: Target,
      color: 'green'
    },
    {
              name: 'Content Published',
        value: formatNumber(data.publishedPosts || 0),
        change: `+${data.contentGrowth || 0}%`,
        changeType: parseFloat(data.contentGrowth || 0) >= 0 ? 'positive' : 'negative',
        icon: FileText,
        color: 'green'
    },
    {
      name: 'System Health',
      value: `${data.systemHealth || 98.5}%`,
      change: '+0.2%',
      changeType: 'positive',
      icon: Activity,
      color: 'emerald'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Real-time insights and analytics for your HR business
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onOpenModal('createLead')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Lead</span>
          </button>
          <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {stat.changeType === 'positive' ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                  vs last week
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Conversion Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Lead Conversion Funnel
            </h2>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
              View Details
            </button>
          </div>
          <div className="space-y-4">
            {[
              { stage: 'New Leads', count: data.newLeads || 0, percentage: 100 },
              { stage: 'Contacted', count: Math.round((data.newLeads || 0) * 0.7), percentage: 70 },
              { stage: 'Qualified', count: Math.round((data.newLeads || 0) * 0.4), percentage: 40 },
              { stage: 'Converted', count: data.convertedLeads || 0, percentage: 25 }
            ].map((stage, index) => (
              <div key={stage.stage} className="flex items-center space-x-4">
                <div className="w-24 text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stage.stage}
                </div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-yellow-500' :
                      index === 2 ? 'bg-orange-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
                <div className="w-16 text-sm font-semibold text-gray-900 dark:text-white text-right">
                  {stage.count}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {(data.recentActivity || []).slice(0, 5).map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {activity.action || `New lead: ${activity.first_name} ${activity.last_name}`}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(activity.created_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ========================================
// CRM LEADS SECTION COMPONENT
// ========================================

const CRMLeadsSection = ({ leads, formSubmissions, onOpenModal, searchTerm, selectedItems, setSelectedItems }) => {
  const [dataSource, setDataSource] = useState('all'); // 'all', 'leads', 'form_submissions'
  const [statusFilter, setStatusFilter] = useState('all');
  const [formTypeFilter, setFormTypeFilter] = useState('all');

  // Filter leads
  const filteredLeads = leads.filter(lead =>
    (lead.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || lead.status === statusFilter)
  );

  // Filter form submissions
  const filteredFormSubmissions = formSubmissions.filter(submission => {
    const formData = submission.form_data || {};
    const matchesSearch = 
      formData.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formData.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formData.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.form_type?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    const matchesFormType = formTypeFilter === 'all' || submission.form_type === formTypeFilter;
    
    return matchesSearch && matchesStatus && matchesFormType;
  });

  // Combine data based on dataSource filter
  const getDisplayData = () => {
    switch (dataSource) {
      case 'leads':
        return filteredLeads.map(lead => ({
          ...lead,
          dataType: 'lead',
          displayName: lead.name || 'Unknown',
          displayEmail: lead.email,
          displayCompany: lead.company,
          displayStatus: lead.status,
          displayScore: lead.lead_score || 0,
          displayCreated: lead.created_at
        }));
      case 'form_submissions':
        return filteredFormSubmissions.map(submission => {
          const formData = submission.form_data || {};
          return {
            ...submission,
            dataType: 'form_submission',
            displayName: formData.name || 'Unknown',
            displayEmail: formData.email || 'No email',
            displayCompany: formData.company || 'N/A',
            displayStatus: submission.status,
            displayScore: submission.lead_score || 0,
            displayCreated: submission.created_at,
            formType: submission.form_type
          };
        });
      default: // 'all'
        const leadsData = filteredLeads.map(lead => ({
          ...lead,
          dataType: 'lead',
          displayName: lead.name || 'Unknown',
          displayEmail: lead.email,
          displayCompany: lead.company,
          displayStatus: lead.status,
          displayScore: lead.lead_score || 0,
          displayCreated: lead.created_at
        }));
        const formData = filteredFormSubmissions.map(submission => {
          const formDataObj = submission.form_data || {};
          return {
            ...submission,
            dataType: 'form_submission',
            displayName: formDataObj.name || 'Unknown',
            displayEmail: formDataObj.email || 'No email',
            displayCompany: formDataObj.company || 'N/A',
            displayStatus: submission.status,
            displayScore: submission.lead_score || 0,
            displayCreated: submission.created_at,
            formType: submission.form_type
          };
        });
        return [...leadsData, ...formData].sort((a, b) => 
          new Date(b.displayCreated) - new Date(a.displayCreated)
        );
    }
  };

  const displayData = getDisplayData();

  // Export function for combined data
  const exportData = (type) => {
    let data = [];
    let filename = '';
    
    if (type === 'combined') {
      data = displayData.map(item => ({
        Type: item.dataType === 'lead' ? 'Lead' : 'Form Submission',
        Name: item.displayName,
        Email: item.displayEmail,
        Company: item.displayCompany,
        Status: item.displayStatus,
        Score: item.displayScore,
        Created: new Date(item.displayCreated).toLocaleDateString(),
        FormType: item.formType || 'N/A',
        Source: item.dataType === 'lead' ? 'Manual Entry' : 'Website Form'
      }));
      filename = 'combined-leads-export.csv';
    }
    
    if (data.length === 0) {
      alert('No data to export');
      return;
    }
    
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const convertToCSV = (data) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header];
        return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
      });
      csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
  };

  const statusColors = {
    new: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    contacted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    qualified: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    converted: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    lost: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            CRM & Lead Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Advanced customer relationship management system
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onOpenModal('importLeads')}
            className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </button>
          <button
            onClick={() => onOpenModal('createLead')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Enhanced Filters and Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Data Source Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data Source</label>
            <select
              value={dataSource}
              onChange={(e) => setDataSource(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Data ({leads.length + formSubmissions.length})</option>
              <option value="leads">Leads Only ({leads.length})</option>
              <option value="form_submissions">Form Submissions ({formSubmissions.length})</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
              <option value="spam">Spam</option>
            </select>
          </div>

          {/* Form Type Filter (only show for form submissions) */}
          {dataSource === 'form_submissions' || dataSource === 'all' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Form Type</label>
              <select
                value={formTypeFilter}
                onChange={(e) => setFormTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Types</option>
                <option value="contact">Contact Form</option>
                <option value="calculator">Calculator</option>
                <option value="download">Download</option>
                <option value="newsletter">Newsletter</option>
                <option value="general">General</option>
              </select>
            </div>
          ) : (
            <div></div>
          )}

          {/* Export Button */}
          <div className="flex items-end">
            <button
              onClick={() => exportData('combined')}
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Showing {displayData.length} of {leads.length + formSubmissions.length} total records</span>
          {selectedItems.length > 0 && (
            <div className="flex items-center space-x-2">
              <span>{selectedItems.length} selected</span>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700">
                Mark Contacted
              </button>
              <button className="px-3 py-1 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Data Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 dark:border-gray-600"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems(displayData.map(item => item.id));
                      } else {
                        setSelectedItems([]);
                      }
                    }}
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {displayData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 dark:border-gray-600"
                      checked={selectedItems.includes(item.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems(prev => [...prev, item.id]);
                        } else {
                          setSelectedItems(prev => prev.filter(id => id !== item.id));
                        }
                      }}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      item.dataType === 'lead' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                    }`}>
                      {item.dataType === 'lead' ? 'Lead' : item.formType || 'Form'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        item.dataType === 'lead' 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                          : 'bg-gradient-to-r from-purple-500 to-pink-600'
                      }`}>
                        <span className="text-white text-sm font-medium">
                          {item.displayName?.[0] || 'U'}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.displayName || 'Unknown'}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.displayEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {item.displayCompany}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {item.dataType === 'lead' ? (item.position || 'Unknown Position') : (item.formType || 'Form Submission')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      statusColors[item.displayStatus] || statusColors.new
                    }`}>
                      {item.displayStatus || 'new'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(item.displayScore, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {item.displayScore}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(item.displayCreated).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onOpenModal(item.dataType === 'lead' ? 'editLead' : 'editFormSubmission', item)}
                        className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onOpenModal(item.dataType === 'lead' ? 'viewLead' : 'viewFormSubmission', item)}
                        className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No leads found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchTerm ? 'Try adjusting your search criteria' : 'Get started by adding your first lead'}
            </p>
            <button
              onClick={() => onOpenModal('createLead')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Add First Lead
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ========================================
// PLACEHOLDER COMPONENTS FOR OTHER SECTIONS
// ========================================

const ContentHubSection = ({ blogPosts, onOpenModal, onOpenAdvancedBlogManager, searchTerm }) => (
  <div className="space-y-8">
    {/* Header with Stats */}
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Content Hub</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your blog posts and content</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onOpenModal('createBlog')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Quick Create</span>
          </button>
          <button
            onClick={onOpenAdvancedBlogManager}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>Advanced Blog Manager</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Posts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{blogPosts.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Published</p>
              <p className="text-2xl font-bold text-green-600">{blogPosts.filter(p => p.status === 'published').length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Drafts</p>
              <p className="text-2xl font-bold text-yellow-600">{blogPosts.filter(p => p.status === 'draft').length}</p>
            </div>
            <FileText className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
              <p className="text-2xl font-bold text-purple-600">
                {blogPosts.filter(p => new Date(p.created_at).getMonth() === new Date().getMonth()).length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={onOpenAdvancedBlogManager}
          className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
        >
          <FileText className="w-6 h-6" />
          <div className="text-left">
            <div className="font-medium">Advanced Blog Editor</div>
            <div className="text-sm opacity-90">Full-featured content creation</div>
          </div>
        </button>
        <button
          onClick={() => onOpenModal('createBlog')}
          className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
        >
          <Plus className="w-6 h-6" />
          <div className="text-left">
            <div className="font-medium">Quick Blog Post</div>
            <div className="text-sm opacity-90">Simple blog creation</div>
          </div>
        </button>
        <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200">
          <Eye className="w-6 h-6" />
          <div className="text-left">
            <div className="font-medium">Content Analytics</div>
            <div className="text-sm opacity-90">View performance metrics</div>
          </div>
        </button>
      </div>
    </div>

    {/* Recent Posts */}
    {blogPosts.length > 0 && (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Posts</h3>
        <div className="space-y-3">
          {blogPosts.slice(0, 5).map(post => (
            <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">{post.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {post.status} • {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onOpenModal('editBlog', post)}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 transition-colors duration-200">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const MediaCenterSection = ({ videos, files, onOpenModal, onOpenServiceVideoManager, onOpenResourceManager, searchTerm }) => (
  <div className="space-y-8">
    {/* Header with Stats */}
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Media Center</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage videos and multimedia content</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onOpenModal('uploadVideo')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Quick Upload</span>
          </button>
          <button
            onClick={onOpenServiceVideoManager}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <Video className="w-4 h-4" />
            <span>Service Video Manager</span>
          </button>
          <button
            onClick={onOpenResourceManager}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Resource Manager</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Videos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{videos.length}</p>
            </div>
            <Video className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Videos</p>
              <p className="text-2xl font-bold text-green-600">{videos.filter(v => v.is_active).length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Files</p>
              <p className="text-2xl font-bold text-blue-600">{files.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Storage Used</p>
              <p className="text-2xl font-bold text-purple-600">2.1GB</p>
            </div>
            <Database className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Media Management</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={onOpenServiceVideoManager}
          className="flex items-center space-x-3 p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200"
        >
          <Video className="w-6 h-6" />
          <div className="text-left">
            <div className="font-medium">Service Video Manager</div>
            <div className="text-sm opacity-90">Manage videos for service pages</div>
          </div>
        </button>
        <button
          onClick={() => onOpenModal('uploadVideo')}
          className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
        >
          <Upload className="w-6 h-6" />
          <div className="text-left">
            <div className="font-medium">Quick Upload</div>
            <div className="text-sm opacity-90">Upload video or file</div>
          </div>
        </button>
        <button
          onClick={() => onOpenModal('uploadFile')}
          className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200"
        >
          <FileText className="w-6 h-6" />
          <div className="text-left">
            <div className="font-medium">File Manager</div>
            <div className="text-sm opacity-90">Organize files and assets</div>
          </div>
        </button>
      </div>
    </div>

    {/* Recent Media */}
    {videos.length > 0 && (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Videos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.slice(0, 6).map(video => (
            <div key={video.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="aspect-video bg-gray-200 dark:bg-gray-600 rounded-lg mb-3 flex items-center justify-center">
                {video.thumbnail_url ? (
                  <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <Video className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-1">{video.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {video.service_category} • {new Date(video.created_at).toLocaleDateString()}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className={`inline-flex px-2 py-1 rounded-full text-xs ${
                  video.is_active 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {video.is_active ? 'Active' : 'Inactive'}
                </span>
                <div className="flex items-center space-x-1">
                  <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                    <Edit className="w-3 h-3" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-green-600 transition-colors duration-200">
                    <Eye className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const CommunicationSection = ({ emails, onOpenModal, searchTerm }) => (
  <div className="text-center py-12">
    <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Communication Hub</h2>
    <p className="text-gray-600 dark:text-gray-400 mb-6">
      Email campaigns and communication tools coming soon
    </p>
    <button
      onClick={() => onOpenModal('sendEmail')}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
    >
      Send Email
    </button>
  </div>
);

const AnalyticsProSection = ({ data, leads, blogPosts, formatNumber, onOpenAnalyticsPro }) => (
  <div className="space-y-8">
    {/* Header with Stats */}
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Pro</h2>
          <p className="text-gray-600 dark:text-gray-400">Advanced analytics and business insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenAnalyticsPro}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Open Analytics Pro</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Page Views</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatNumber(15420)}</p>
            </div>
            <Activity className="w-8 h-8 text-indigo-600" />
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Unique Visitors</p>
              <p className="text-2xl font-bold text-green-600">{formatNumber(8640)}</p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Conversion Rate</p>
              <p className="text-2xl font-bold text-purple-600">4.2%</p>
            </div>
            <Target className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
              <p className="text-2xl font-bold text-orange-600">₹1.25L</p>
            </div>
            <DollarSign className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>
    </div>

    {/* Quick Insights */}
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Insights</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Top Traffic Sources</h4>
          <div className="space-y-2">
            {['Organic Search (45.2%)', 'Direct (23.8%)', 'Social Media (18.5%)', 'Referrals (8.9%)', 'Email (3.6%)'].map((source, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{source.split(' (')[0]}</span>
                <span className="font-medium text-gray-900 dark:text-white">{source.match(/\((.*?)\)/)?.[1]}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Lead Sources</h4>
          <div className="space-y-2">
            {['Website Forms (45)', 'Social Media (23)', 'Email Campaigns (18)', 'Referrals (14)'].map((source, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{source.split(' (')[0]}</span>
                <span className="font-medium text-gray-900 dark:text-white">{source.match(/\((.*?)\)/)?.[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <button
          onClick={onOpenAnalyticsPro}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 mx-auto"
        >
          <BarChart3 className="w-5 h-5" />
          <span>View Detailed Analytics</span>
        </button>
      </div>
    </div>
  </div>
);

const AutomationSection = ({ onOpenModal, onOpenAutomationCenter }) => (
  <div className="space-y-8">
    {/* Header with Stats */}
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Automation Center</h2>
          <p className="text-gray-600 dark:text-gray-400">Automate your business processes with AI</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenAutomationCenter}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <Zap className="w-4 h-4" />
            <span>Open Automation Center</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Workflows</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
            </div>
            <Zap className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Executions</p>
              <p className="text-2xl font-bold text-green-600">1,234</p>
            </div>
            <Activity className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Time Saved</p>
              <p className="text-2xl font-bold text-purple-600">42h</p>
            </div>
            <Clock className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
              <p className="text-2xl font-bold text-blue-600">98.7%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>
    </div>

    {/* Automation Templates */}
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Popular Automation Templates</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: 'Lead Nurturing', description: 'Automatically nurture new leads', active: true, color: 'blue' },
          { name: 'Blog Promotion', description: 'Auto-promote new blog posts', active: false, color: 'purple' },
          { name: 'Customer Onboarding', description: 'Automate customer onboarding', active: true, color: 'green' },
          { name: 'Event Reminders', description: 'Send automated event reminders', active: true, color: 'orange' },
          { name: 'Feedback Collection', description: 'Auto-collect customer feedback', active: false, color: 'yellow' },
          { name: 'AI Lead Scoring', description: 'AI-powered lead qualification', active: true, color: 'red' }
        ].map((template, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900 dark:text-white">{template.name}</h4>
              <span className={`w-3 h-3 rounded-full ${
                template.active ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}></span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{template.description}</p>
            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs bg-${template.color}-100 text-${template.color}-800 dark:bg-${template.color}-900 dark:text-${template.color}-200`}>
                {template.active ? 'Active' : 'Inactive'}
              </span>
              <button className="text-sm text-blue-600 hover:text-blue-700">Configure</button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <button
          onClick={onOpenAutomationCenter}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center space-x-2 mx-auto"
        >
          <Zap className="w-5 h-5" />
          <span>Open Automation Center</span>
        </button>
      </div>
    </div>
  </div>
);

const SecuritySection = ({ onOpenModal, onOpenSecurityCenter }) => (
  <div className="space-y-8">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
          <Shield className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Security Center</h2>
          <p className="text-gray-600 dark:text-gray-400">User management and system security</p>
        </div>
      </div>
      <button
        onClick={onOpenSecurityCenter}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
      >
        <Shield className="w-4 h-4" />
        <span>Open Security Center</span>
      </button>
    </div>

    {/* Quick Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">5</p>
          </div>
          <Users className="w-8 h-8 text-red-600" />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Sessions</p>
            <p className="text-2xl font-bold text-green-600">12</p>
          </div>
          <Activity className="w-8 h-8 text-green-600" />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Failed Logins</p>
            <p className="text-2xl font-bold text-orange-600">3</p>
          </div>
          <AlertCircle className="w-8 h-8 text-orange-600" />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Security Score</p>
            <p className="text-2xl font-bold text-blue-600">95%</p>
          </div>
          <CheckCircle className="w-8 h-8 text-blue-600" />
        </div>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Security Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200">
          <UserPlus className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-red-900 dark:text-red-200">Add User</p>
        </button>
        <button className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors duration-200">
          <Key className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-orange-900 dark:text-orange-200">Manage Roles</p>
        </button>
        <button className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200">
          <Activity className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-blue-900 dark:text-blue-200">View Audit Log</p>
        </button>
      </div>
    </div>
  </div>
);

const SettingsSection = ({ onOpenModal, onOpenSystemSettings }) => (
  <div className="space-y-8">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <Settings className="w-6 h-6 text-gray-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">System Settings</h2>
          <p className="text-gray-600 dark:text-gray-400">Configure system preferences and integrations</p>
        </div>
      </div>
      <button
        onClick={onOpenSystemSettings}
        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
      >
        <Settings className="w-4 h-4" />
        <span>Open Settings</span>
      </button>
    </div>

    {/* Quick Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">System Uptime</p>
            <p className="text-2xl font-bold text-green-600">99.9%</p>
          </div>
          <Activity className="w-8 h-8 text-green-600" />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Integrations</p>
            <p className="text-2xl font-bold text-blue-600">7</p>
          </div>
          <Zap className="w-8 h-8 text-blue-600" />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Storage Used</p>
            <p className="text-2xl font-bold text-orange-600">2.3GB</p>
          </div>
          <Database className="w-8 h-8 text-orange-600" />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Last Backup</p>
            <p className="text-2xl font-bold text-purple-600">2h ago</p>
          </div>
          <Shield className="w-8 h-8 text-purple-600" />
        </div>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick System Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
          <Globe className="w-8 h-8 text-gray-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-900 dark:text-gray-200">General Settings</p>
        </button>
        <button className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200">
          <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-blue-900 dark:text-blue-200">Integrations</p>
        </button>
        <button className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-200">
          <Database className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-purple-900 dark:text-purple-200">Backup & Restore</p>
        </button>
      </div>
    </div>
  </div>
);

// ========================================
// MODAL COMPONENTS
// ========================================

const CreateLeadModal = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    industry: '',
    company_size: '',
    message: '',
    source: 'website'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }
    
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    if (formData.phone && formData.phone.length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            First Name *
          </label>
          <input
            type="text"
            required
            value={formData.first_name}
            onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            required
            value={formData.last_name}
            onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Company
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Position
          </label>
          <input
            type="text"
            value={formData.position}
            onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Industry
          </label>
          <select
            value={formData.industry}
            onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select Industry</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Education">Education</option>
            <option value="Retail">Retail</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Company Size
          </label>
          <select
            value={formData.company_size}
            onChange={(e) => setFormData(prev => ({ ...prev, company_size: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select Size</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-1000">201-1000 employees</option>
            <option value="1000+">1000+ employees</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Message
        </label>
        <textarea
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="Tell us about your HR needs..."
        />
      </div>

      <div className="flex items-center justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200 flex items-center space-x-2"
        >
          {loading && <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />}
          <span>{loading ? 'Creating...' : 'Create Lead'}</span>
        </button>
      </div>
    </form>
  );
};

const EditLeadModal = ({ lead, onSubmit, onCancel }) => {
  // Split the name field into first and last name
  const splitName = (fullName) => {
    if (!fullName) return { first_name: '', last_name: '' };
    const parts = fullName.trim().split(' ');
    return {
      first_name: parts[0] || '',
      last_name: parts.slice(1).join(' ') || ''
    };
  };

  const { first_name, last_name } = splitName(lead?.name);
  
  const [formData, setFormData] = useState({
    first_name: first_name,
    last_name: last_name,
    email: lead?.email || '',
    phone: lead?.phone || '',
    company: lead?.company || '',
    position: lead?.position || lead?.job_title || '',
    industry: lead?.industry || '',
    company_size: lead?.company_size || '',
    message: lead?.message || '',
    status: lead?.status || 'new'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(lead.id, formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            First Name *
          </label>
          <input
            type="text"
            required
            value={formData.first_name}
            onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            required
            value={formData.last_name}
            onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="proposal">Proposal</option>
          <option value="negotiation">Negotiation</option>
          <option value="converted">Converted</option>
          <option value="lost">Lost</option>
        </select>
      </div>

      <div className="flex items-center justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200 flex items-center space-x-2"
        >
          {loading && <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />}
          <span>{loading ? 'Updating...' : 'Update Lead'}</span>
        </button>
      </div>
    </form>
  );
};

const CreateBlogModal = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    meta_title: '',
    meta_description: '',
    status: 'draft'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const blogData = {
        ...formData,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };
      await onSubmit(blogData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Excerpt
        </label>
        <textarea
          rows={2}
          value={formData.excerpt}
          onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="Brief description of the blog post..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select Category</option>
            <option value="HR Management">HR Management</option>
            <option value="Compliance">Compliance</option>
            <option value="Recruitment">Recruitment</option>
            <option value="Employee Engagement">Employee Engagement</option>
            <option value="Performance Management">Performance Management</option>
            <option value="HR Technology">HR Technology</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="HR, Recruitment, Management"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Content *
        </label>
        <textarea
          rows={8}
          required
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="Write your blog content here..."
        />
      </div>

      <div className="flex items-center justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200 flex items-center space-x-2"
        >
          {loading && <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />}
          <span>{loading ? 'Creating...' : 'Create Blog Post'}</span>
        </button>
      </div>
    </form>
  );
};

const UploadVideoModal = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video_url: '',
    service_category: '',
    thumbnail_url: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Video Title *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Video URL *
        </label>
        <input
          type="url"
          required
          value={formData.video_url}
          onChange={(e) => setFormData(prev => ({ ...prev, video_url: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="https://example.com/video.mp4"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="Describe what this video is about..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Service Category
        </label>
        <select
          value={formData.service_category}
          onChange={(e) => setFormData(prev => ({ ...prev, service_category: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select Category</option>
          <option value="HR Compliance">HR Compliance</option>
          <option value="Recruitment">Recruitment</option>
          <option value="Employee Engagement">Employee Engagement</option>
          <option value="Performance Management">Performance Management</option>
          <option value="Payroll Management">Payroll Management</option>
        </select>
      </div>

      <div className="flex items-center justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200 flex items-center space-x-2"
        >
          {loading && <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />}
          <span>{loading ? 'Uploading...' : 'Upload Video'}</span>
        </button>
      </div>
    </form>
  );
};

const SendEmailModal = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    to_email: '',
    subject: '',
    content: '',
    email_type: 'marketing',
    template: '',
    variables: {}
  });
  const [loading, setLoading] = useState(false);
  const [templates] = useState([
    { id: 'welcome', name: 'Welcome Email' },
    { id: 'lead_follow_up', name: 'Lead Follow-up' },
    { id: 'newsletter', name: 'Newsletter' },
    { id: 'appointment_confirmation', name: 'Appointment Confirmation' },
    { id: 'custom', name: 'Custom Email' }
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          To Email *
        </label>
        <input
          type="email"
          required
          value={formData.to_email}
          onChange={(e) => setFormData(prev => ({ ...prev, to_email: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Subject *
        </label>
        <input
          type="text"
          required
          value={formData.subject}
          onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email Template
        </label>
        <select
          value={formData.template}
          onChange={(e) => setFormData(prev => ({ ...prev, template: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select a template</option>
          {templates.map(template => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email Type
        </label>
        <select
          value={formData.email_type}
          onChange={(e) => setFormData(prev => ({ ...prev, email_type: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="marketing">Marketing</option>
          <option value="notification">Notification</option>
          <option value="newsletter">Newsletter</option>
          <option value="welcome">Welcome</option>
          <option value="follow_up">Follow-up</option>
          <option value="appointment">Appointment</option>
        </select>
      </div>

      {formData.template && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Template Variables (JSON)
          </label>
          <textarea
            rows={3}
            value={JSON.stringify(formData.variables, null, 2)}
            onChange={(e) => {
              try {
                const variables = JSON.parse(e.target.value);
                setFormData(prev => ({ ...prev, variables }));
              } catch (error) {
                // Keep the raw text for editing
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white font-mono text-sm"
            placeholder='{"name": "John Doe", "service": "HR Consultation"}'
          />
          <p className="text-xs text-gray-500 mt-1">
            Variables to substitute in the template (e.g., name, service, date)
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Content {!formData.template && '*'}
        </label>
        <textarea
          rows={8}
          required={!formData.template}
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder={formData.template ? "Custom content (optional - will override template)" : "Write your email content here..."}
        />
        {formData.template && (
          <p className="text-xs text-gray-500 mt-1">
            Leave empty to use the selected template, or add custom content to override it
          </p>
        )}
      </div>

      <div className="flex items-center justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200 flex items-center space-x-2"
        >
          {loading && <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />}
          <span>{loading ? 'Sending...' : 'Send Email'}</span>
        </button>
      </div>
    </form>
  );
};

const UploadFileModal = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    filename: '',
    file_url: '',
    category: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          File Name *
        </label>
        <input
          type="text"
          required
          value={formData.filename}
          onChange={(e) => setFormData(prev => ({ ...prev, filename: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          File URL *
        </label>
        <input
          type="url"
          required
          value={formData.file_url}
          onChange={(e) => setFormData(prev => ({ ...prev, file_url: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="https://example.com/file.pdf"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Category
        </label>
        <select
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select Category</option>
          <option value="templates">Templates</option>
          <option value="brochures">Brochures</option>
          <option value="documents">Documents</option>
          <option value="images">Images</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="Describe this file..."
        />
      </div>

      <div className="flex items-center justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200 flex items-center space-x-2"
        >
          {loading && <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />}
          <span>{loading ? 'Uploading...' : 'Upload File'}</span>
        </button>
      </div>
    </form>
  );
};

export default WorldClassAdminDashboard;
