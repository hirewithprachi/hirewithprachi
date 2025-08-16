import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { supabase } from '../lib/supabase-client';
import AdminLogin from '../components/AdminLogin';

const CleanAdminDashboard = () => {
  // Core state
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalData, setModalData] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Data states
  const [leads, setLeads] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [videos, setVideos] = useState([]);
  const [files, setFiles] = useState([]);
  const [emails, setEmails] = useState([]);
  const [calculators, setCalculators] = useState([]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');

  const { user, loading: authLoading } = useAuth();

  // Load dashboard data on mount
  useEffect(() => {
    if (user && !authLoading) {
      loadDashboardData();
    }
  }, [user, authLoading]);

  // Load tab-specific data
  useEffect(() => {
    if (user && !authLoading) {
      switch (activeTab) {
        case 'leads':
          loadLeads();
          break;
        case 'blog':
          loadBlogPosts();
          break;
        case 'users':
          loadUsers();
          break;
        case 'videos':
          loadVideos();
          break;
        case 'files':
          loadFiles();
          break;
        case 'emails':
          loadEmails();
          break;
        case 'calculators':
          loadCalculators();
          break;
      }
    }
  }, [activeTab, user, authLoading]);

  // Core data loading function
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setError('No active session. Please log in again.');
        setLoading(false);
        return;
      }

      // Load all data directly from Supabase tables with proper error handling
      const loadTableData = async (tableName) => {
        try {
          const { data, error } = await supabase.from(tableName).select('*');
          return { data: data || [], error: error || null };
        } catch (err) {
          console.warn(`Error loading ${tableName}:`, err);
          return { data: [], error: err };
        }
      };

      const dataPromises = [
        loadTableData('leads'),
        loadTableData('blog_posts'),
        loadTableData('admin_users'),
        loadTableData('videos'),
        loadTableData('resources'),
        loadTableData('email_logs'),
        loadTableData('calculator_results')
      ];

      const results = await Promise.all(dataPromises);
      
      // Extract data and errors
      const [leadsResult, blogResult, usersResult, videosResult, filesResult, emailsResult, calculatorsResult] = results;
      
      // Set data with error handling
      setLeads(leadsResult.data || []);
      setBlogPosts(blogResult.data || []);
      setUsers(usersResult.data || []);
      setFiles(filesResult.data || []);
      setEmails(emailsResult.data || []);
      setCalculators(calculatorsResult.data || []);
      
      // Handle videos with service page integration
      await loadVideos();
      
      // Calculate dashboard stats
      const dashboardStats = {
        totalLeads: leadsResult.data?.length || 0,
        totalBlogPosts: blogResult.data?.length || 0,
        totalUsers: usersResult.data?.length || 0,
        totalVideos: (videosResult.data?.length || 0) + (JSON.parse(localStorage.getItem('serviceVideos') || '{}') ? Object.keys(JSON.parse(localStorage.getItem('serviceVideos') || '{}')).length : 0),
        totalFiles: filesResult.data?.length || 0,
        totalEmails: emailsResult.data?.length || 0,
        totalCalculators: calculatorsResult.data?.length || 0
      };
      
      setStats(dashboardStats);
      
      // Log any errors but don't fail completely
      const errors = [leadsResult.error, blogResult.error, usersResult.error, videosResult.error, filesResult.error, emailsResult.error, calculatorsResult.error].filter(Boolean);
      
      if (errors.length > 0) {
        console.warn('⚠️ Some data loading errors (non-critical):', errors);
        addNotification(`Loaded dashboard with ${errors.length} minor issues`, 'warning');
      } else {
        addNotification('Dashboard loaded successfully', 'success');
      }
      
    } catch (error) {
      console.error('❌ Critical error loading dashboard data:', error);
      setError(`Failed to load dashboard data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Tab-specific data loading functions
  const loadLeads = async () => {
    try {
      const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Supabase error loading leads:', error);
        addNotification('Failed to load leads', 'error');
        return;
      }
      setLeads(data || []);
    } catch (error) {
      console.error('Error loading leads:', error);
      addNotification('Failed to load leads', 'error');
    }
  };

  const loadBlogPosts = async () => {
    try {
      const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Supabase error loading blog posts:', error);
        addNotification('Failed to load blog posts', 'error');
        return;
      }
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error loading blog posts:', error);
      addNotification('Failed to load blog posts', 'error');
    }
  };

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase.from('admin_users').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Supabase error loading users:', error);
        addNotification('Failed to load users', 'error');
        return;
      }
      setUsers(data || []);
    } catch (error) {
      console.error('Error loading users:', error);
      addNotification('Failed to load users', 'error');
    }
  };

  const loadVideos = async () => {
    try {
      // Load database videos
      const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Supabase error loading videos:', error);
        // Continue with service page videos even if database videos fail
      }
      
      // Get all service pages for video management
      const servicePages = [
        { id: 'virtual-hr-management', name: 'Virtual HR Management', path: '/services/virtual-hr-management' },
        { id: 'hr-compliance', name: 'HR Compliance', path: '/services/hr-compliance' },
        { id: 'payroll-management', name: 'Payroll Management', path: '/services/payroll-management' },
        { id: 'recruitment-service', name: 'Recruitment Service', path: '/services/recruitment-service' },
        { id: 'performance-management', name: 'Performance Management', path: '/services/performance-management' },
        { id: 'employee-engagement', name: 'Employee Engagement', path: '/services/employee-engagement' },
        { id: 'hr-audit', name: 'HR Audit', path: '/services/hr-audit' },
        { id: 'mumbai', name: 'HR Services Mumbai', path: '/services/hr-services-mumbai' },
        { id: 'delhi', name: 'HR Services Delhi', path: '/services/hr-services-delhi' },
        { id: 'bangalore', name: 'HR Services Bangalore', path: '/services/hr-services-bangalore' },
        { id: 'hyderabad', name: 'HR Services Hyderabad', path: '/services/hr-services-hyderabad' },
        { id: 'chennai', name: 'HR Services Chennai', path: '/services/hr-services-chennai' },
        { id: 'pune', name: 'HR Services Pune', path: '/services/hr-services-pune' },
        { id: 'kolkata', name: 'HR Services Kolkata', path: '/services/hr-services-kolkata' },
        { id: 'ahmedabad', name: 'HR Services Ahmedabad', path: '/services/hr-services-ahmedabad' },
        { id: 'jaipur', name: 'HR Services Jaipur', path: '/services/hr-services-jaipur' },
        { id: 'lucknow', name: 'HR Services Lucknow', path: '/services/hr-services-lucknow' },
        { id: 'indore', name: 'HR Services Indore', path: '/services/hr-services-indore' },
        { id: 'nagpur', name: 'HR Services Nagpur', path: '/services/hr-services-nagpur' },
        { id: 'bhubaneswar', name: 'HR Services Bhubaneswar', path: '/services/hr-services-bhubaneswar' },
        { id: 'coimbatore', name: 'HR Services Coimbatore', path: '/services/hr-services-coimbatore' }
      ];
      
      // Load service page videos from localStorage
      const serviceVideos = JSON.parse(localStorage.getItem('serviceVideos') || '{}');
      
      // Create service page video entries for pages without videos
      const serviceVideoEntries = servicePages.map(service => {
        const existingVideo = serviceVideos[service.id];
        return {
          id: `service-${service.id}`,
          title: existingVideo?.title || `${service.name} Overview`,
          description: existingVideo?.description || `Learn about ${service.name} services and solutions`,
          video_url: existingVideo?.videoUrl || '',
          thumbnail_url: existingVideo?.thumbnailUrl || '',
          service_category: 'Service Pages',
          service_name: service.name,
          service_id: service.id,
          service_path: service.path,
          is_active: existingVideo?.isActive !== false,
          created_at: existingVideo?.createdAt || new Date().toISOString(),
          source: 'service_page',
          has_video: !!existingVideo?.videoUrl
        };
      });
      
      // Combine database videos with service videos
      const allVideos = [
        ...(data || []),
        ...serviceVideoEntries
      ];
      
      setVideos(allVideos);
    } catch (error) {
      console.error('Error loading videos:', error);
      addNotification('Failed to load videos', 'error');
    }
  };

  const loadFiles = async () => {
    try {
      const { data, error } = await supabase.from('resources').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Supabase error loading files:', error);
        addNotification('Failed to load files', 'error');
        return;
      }
      setFiles(data || []);
    } catch (error) {
      console.error('Error loading files:', error);
      addNotification('Failed to load files', 'error');
    }
  };

  const loadEmails = async () => {
    try {
      const { data, error } = await supabase.from('email_logs').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Supabase error loading emails:', error);
        addNotification('Failed to load emails', 'error');
        return;
      }
      setEmails(data || []);
    } catch (error) {
      console.error('Error loading emails:', error);
      addNotification('Failed to load emails', 'error');
    }
  };

  const loadCalculators = async () => {
    try {
      const { data, error } = await supabase.from('calculator_results').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Supabase error loading calculators:', error);
        addNotification('Failed to load calculators', 'error');
        return;
      }
      setCalculators(data || []);
    } catch (error) {
      console.error('Error loading calculators:', error);
      addNotification('Failed to load calculators', 'error');
    }
  };

  // Utility functions
  const addNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 9)]);
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

  // Handler functions
  const handleCreateLead = async (leadData) => {
    try {
      const { data, error } = await supabase.from('leads').insert([leadData]);
      if (error) throw error;
      addNotification('Lead created successfully', 'success');
      loadLeads();
      closeModal();
    } catch (error) {
      console.error('Error creating lead:', error);
      addNotification('Failed to create lead', 'error');
    }
  };

  const handleCreateBlogPost = async (postData) => {
    try {
      const { data, error } = await supabase.from('blog_posts').insert([postData]);
      if (error) throw error;
      addNotification('Blog post created successfully', 'success');
      loadBlogPosts();
      closeModal();
    } catch (error) {
      console.error('Error creating blog post:', error);
      addNotification('Failed to create blog post', 'error');
    }
  };

  const handleUpdateLeadStatus = async (leadId, status) => {
    try {
      const { error } = await supabase.from('leads').update({ status }).eq('id', leadId);
      if (error) throw error;
      addNotification('Lead status updated successfully', 'success');
      loadLeads();
    } catch (error) {
      console.error('Error updating lead status:', error);
      addNotification('Failed to update lead status', 'error');
    }
  };

  const handleDeleteBlogPost = async (postId) => {
    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', postId);
      if (error) throw error;
      addNotification('Blog post deleted successfully', 'success');
      loadBlogPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      addNotification('Failed to delete blog post', 'error');
    }
  };

  const handlePublishBlogPost = async (postId) => {
    try {
      const { error } = await supabase.from('blog_posts').update({ status: 'published' }).eq('id', postId);
      if (error) throw error;
      addNotification('Blog post published successfully', 'success');
      loadBlogPosts();
    } catch (error) {
      console.error('Error publishing blog post:', error);
      addNotification('Failed to publish blog post', 'error');
    }
  };

  const handleUpdateBlogPost = async (postId, postData) => {
    try {
      const { error } = await supabase.from('blog_posts').update(postData).eq('id', postId);
      if (error) throw error;
      addNotification('Blog post updated successfully', 'success');
      loadBlogPosts();
      closeModal();
    } catch (error) {
      console.error('Error updating blog post:', error);
      addNotification('Failed to update blog post', 'error');
    }
  };

  // Video management handlers
  const handleCreateVideo = async (videoData) => {
    try {
      // If this is a service page video, save to localStorage
      if (videoData.service_id && videoData.source === 'service_page') {
        const serviceVideos = JSON.parse(localStorage.getItem('serviceVideos') || '{}');
        serviceVideos[videoData.service_id] = {
          title: videoData.title,
          description: videoData.description,
          videoUrl: videoData.video_url,
          thumbnailUrl: videoData.thumbnail_url,
          isActive: videoData.is_active,
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('serviceVideos', JSON.stringify(serviceVideos));
        addNotification('Service page video saved successfully', 'success');
      } else {
        // Save to database for general videos
        const { data, error } = await supabase.from('videos').insert([videoData]);
        if (error) throw error;
        addNotification('Video created successfully', 'success');
      }
      loadVideos();
      closeModal();
    } catch (error) {
      console.error('Error creating video:', error);
      addNotification('Failed to create video', 'error');
    }
  };

  const handleUpdateVideo = async (videoId, videoData) => {
    try {
      // If this is a service page video, update localStorage
      if (videoData.service_id && videoData.source === 'service_page') {
        const serviceVideos = JSON.parse(localStorage.getItem('serviceVideos') || '{}');
        serviceVideos[videoData.service_id] = {
          title: videoData.title,
          description: videoData.description,
          videoUrl: videoData.video_url,
          thumbnailUrl: videoData.thumbnail_url,
          isActive: videoData.is_active,
          createdAt: videoData.created_at || new Date().toISOString()
        };
        localStorage.setItem('serviceVideos', JSON.stringify(serviceVideos));
        addNotification('Service page video updated successfully', 'success');
      } else {
        // Update database for general videos
        const { error } = await supabase.from('videos').update(videoData).eq('id', videoId);
        if (error) throw error;
        addNotification('Video updated successfully', 'success');
      }
      loadVideos();
      closeModal();
    } catch (error) {
      console.error('Error updating video:', error);
      addNotification('Failed to update video', 'error');
    }
  };

  // Function to handle video upload for service pages
  const handleServicePageVideoUpload = async (serviceId, videoFile) => {
    try {
      // Upload video file to Supabase Storage
      const fileExt = videoFile.name.split('.').pop();
      const fileName = `${serviceId}-${Date.now()}.${fileExt}`;
      const filePath = `service-videos/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('service-videos')
        .upload(filePath, videoFile);
      
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('service-videos')
        .getPublicUrl(filePath);
      
      // Save to localStorage
      const serviceVideos = JSON.parse(localStorage.getItem('serviceVideos') || '{}');
      serviceVideos[serviceId] = {
        title: `${serviceId} Service Video`,
        description: `Video for ${serviceId} service page`,
        videoUrl: publicUrl,
        thumbnailUrl: '',
        isActive: true,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('serviceVideos', JSON.stringify(serviceVideos));
      
      addNotification('Video uploaded successfully for service page', 'success');
      loadVideos();
    } catch (error) {
      console.error('Error uploading service page video:', error);
      addNotification('Failed to upload video', 'error');
    }
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      const { error } = await supabase.from('videos').delete().eq('id', videoId);
      if (error) throw error;
      addNotification('Video deleted successfully', 'success');
      loadVideos();
    } catch (error) {
      console.error('Error deleting video:', error);
      addNotification('Failed to delete video', 'error');
    }
  };

  // File management handlers
  const handleUploadFile = async (fileData) => {
    try {
      const { data, error } = await supabase.from('resources').insert([fileData]);
      if (error) throw error;
      addNotification('File uploaded successfully', 'success');
      loadFiles();
      closeModal();
    } catch (error) {
      console.error('Error uploading file:', error);
      addNotification('Failed to upload file', 'error');
    }
  };

  const handleFileDownload = async (fileId) => {
    try {
      const file = files.find(f => f.id === fileId);
      if (!file) {
        addNotification('File not found', 'error');
        return;
      }
      
      // Create a temporary link to download the file
      const link = document.createElement('a');
      link.href = file.file_url || file.url;
      link.download = file.title || file.name;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      addNotification('File download started', 'success');
    } catch (error) {
      console.error('Error downloading file:', error);
      addNotification('Failed to download file', 'error');
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      const { error } = await supabase.from('resources').delete().eq('id', fileId);
      if (error) throw error;
      addNotification('File deleted successfully', 'success');
      loadFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      addNotification('Failed to delete file', 'error');
    }
  };

  // Email management handlers
  const handleSendEmail = async (emailData) => {
    try {
      // Add email to email_logs table
      const { data, error } = await supabase.from('email_logs').insert([{
        recipient_email: emailData.recipient_email,
        subject: emailData.subject,
        content: emailData.content,
        type: emailData.type || 'notification',
        status: 'sent',
        metadata: {
          sender: emailData.sender || 'admin',
          template: emailData.template || 'custom'
        }
      }]);
      
      if (error) throw error;
      
      // Here you would integrate with your email service (SendGrid, AWS SES, etc.)
      // For now, we'll just log it
      console.log('Email would be sent:', emailData);
      
      addNotification('Email sent successfully', 'success');
      loadEmails();
      closeModal();
    } catch (error) {
      console.error('Error sending email:', error);
      addNotification('Failed to send email', 'error');
    }
  };

  // Calculator management handlers
  const handleBlogImageUpload = async (file) => {
    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);
      
      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      addNotification('Failed to upload image', 'error');
      return null;
    }
  };

  const handleCreateCalculator = async (calcData) => {
    try {
      const { data, error } = await supabase.from('calculator_results').insert([calcData]);
      if (error) throw error;
      addNotification('Calculator created successfully', 'success');
      loadCalculators();
      closeModal();
    } catch (error) {
      console.error('Error creating calculator:', error);
      addNotification('Failed to create calculator', 'error');
    }
  };

  // Utility functions
  const exportData = (type) => {
    let data = [];
    let filename = '';
    
    switch (type) {
      case 'leads':
        data = leads;
        filename = 'leads.csv';
        break;
      case 'blog':
        data = blogPosts;
        filename = 'blog-posts.csv';
        break;
      case 'videos':
        data = videos;
        filename = 'videos.csv';
        break;
      case 'files':
        data = files;
        filename = 'files.csv';
        break;
      case 'emails':
        data = emails;
        filename = 'emails.csv';
        break;
      case 'calculators':
        data = calculators;
        filename = 'calculators.csv';
        break;
      default:
        return;
    }
    
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    addNotification(`${type} data exported successfully`, 'success');
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

  const handleSelectAll = (checked) => {
    if (checked) {
      const currentData = getCurrentTabData();
      setSelectedItems(currentData.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId, checked) => {
    if (checked) {
      setSelectedItems(prev => [...prev, itemId]);
    } else {
      setSelectedItems(prev => prev.filter(id => id !== itemId));
    }
  };

  const getCurrentTabData = () => {
    switch (activeTab) {
      case 'leads':
        return leads;
      case 'blog':
        return blogPosts;
      case 'videos':
        return videos;
      case 'files':
        return files;
      case 'emails':
        return emails;
      case 'calculators':
        return calculators;
      default:
        return [];
    }
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
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
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
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Leads</p>
                    <p className="text-3xl font-bold text-blue-600">{stats?.totalLeads || 0}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">👥</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Blog Posts</p>
                    <p className="text-3xl font-bold text-green-600">{stats?.totalPosts || 0}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📝</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Videos</p>
                    <p className="text-3xl font-bold text-purple-600">{stats?.totalVideos || 0}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🎥</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Files</p>
                    <p className="text-3xl font-bold text-indigo-600">{stats?.totalFiles || 0}</p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📁</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <button 
                  onClick={() => openModal('createLead')}
                  className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-3xl mb-3">➕</div>
                  <h3 className="text-lg font-semibold mb-2">Add New Lead</h3>
                  <p className="text-blue-100 text-sm">Create a new lead entry</p>
                </button>
                
                <button 
                  onClick={() => openModal('createVideo')}
                  className="group bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-3xl mb-3">🎥</div>
                  <h3 className="text-lg font-semibold mb-2">Add Video</h3>
                  <p className="text-purple-100 text-sm">Upload a new video</p>
                </button>
                
                <button 
                  onClick={() => openModal('uploadFile')}
                  className="group bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-6 rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-3xl mb-3">📁</div>
                  <h3 className="text-lg font-semibold mb-2">Upload File</h3>
                  <p className="text-indigo-100 text-sm">Add a new resource</p>
                </button>
                
                <button 
                  onClick={() => openModal('sendEmail')}
                  className="group bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-3xl mb-3">📧</div>
                  <h3 className="text-lg font-semibold mb-2">Send Email</h3>
                  <p className="text-green-100 text-sm">Send a new email</p>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              {stats?.recentActivity && stats.recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {activity.first_name?.[0]}{activity.last_name?.[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {activity.first_name} {activity.last_name}
                          </p>
                          <p className="text-sm text-gray-600">{activity.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                          activity.status === 'new' ? 'bg-blue-100 text-blue-800' :
                          activity.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                          activity.status === 'converted' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {activity.status}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(activity.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📭</div>
                  <p className="text-gray-500 text-lg">No recent activity</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Lead Management</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => exportData('leads')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 font-medium text-sm"
                >
                  📊 Export
                </button>
                <button
                  onClick={() => openModal('createLead')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
                >
                  Add New Lead
                </button>
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {leads.length > 0 ? (
                      leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                <span className="text-blue-600 font-semibold text-sm">
                                  {lead.first_name?.[0]}{lead.last_name?.[0]}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {lead.first_name} {lead.last_name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.phone}</td>
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                              className="px-2 py-1 border border-gray-300 rounded text-xs"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="converted">Converted</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center">
                          <div className="text-4xl mb-4">👥</div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Leads Found</h3>
                          <p className="text-gray-500">Start by adding your first lead</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => exportData('blog')}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium text-sm"
                >
                  📊 Export Posts
                </button>
                <button
                  onClick={() => openModal('createBlogPost')}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 font-medium"
                >
                  ✏️ Create Blog Post
                </button>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.length > 0 ? (
                blogPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span>📅 {new Date(post.created_at).toLocaleDateString()}</span>
                        <span className={`px-2 py-1 rounded-full ${
                          post.status === 'published' ? 'bg-green-100 text-green-800' :
                          post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {post.status}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openModal('editBlogPost', post)}
                          className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          Edit
                        </button>
                        {post.status === 'draft' && (
                          <button
                            onClick={() => handlePublishBlogPost(post.id)}
                            className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            Publish
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteBlogPost(post.id)}
                          className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Blog Posts Found</h3>
                  <p className="text-gray-500 mb-6">Start by creating your first blog post</p>
                  <button
                    onClick={() => openModal('createBlogPost')}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 font-medium"
                  >
                    Create Your First Post
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => exportData('users')}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium text-sm"
                >
                  📊 Export Users
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                                <span className="text-indigo-600 font-semibold text-sm">
                                  {user.first_name?.[0]}{user.last_name?.[0]}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {user.first_name} {user.last_name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              user.role === 'admin' ? 'bg-red-100 text-red-800' :
                              user.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              user.status === 'active' ? 'bg-green-100 text-green-800' :
                              user.status === 'inactive' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => openModal('viewUser', user)}
                              className="text-indigo-600 hover:text-indigo-900 mr-3"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center">
                          <div className="text-4xl mb-4">👤</div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Users Found</h3>
                          <p className="text-gray-500">No users have been registered yet</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Video Management</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => exportData('videos')}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium text-sm"
                >
                  📊 Export Videos
                </button>
                <button
                  onClick={() => openModal('createVideo')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
                >
                  🎥 Add New Video
                </button>
              </div>
            </div>

            {/* Videos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.length > 0 ? (
                videos.map((video) => (
                  <div key={video.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="aspect-video bg-gray-200 relative">
                      {video.thumbnail_url ? (
                        <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-4xl">🎥</span>
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          video.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {video.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{video.title}</h3>
                        {video.source === 'service_page' && (
                          <span className="px-2 py-1 text-xs rounded-full font-medium bg-purple-100 text-purple-800">
                            Service Page
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                      {video.service_name && (
                        <p className="text-sm text-blue-600 mb-2">
                          📍 {video.service_name}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span>📅 {new Date(video.created_at).toLocaleDateString()}</span>
                        <span>👁️ {video.view_count || 0} views</span>
                      </div>
                      <div className="flex space-x-2">
                        {video.source === 'service_page' && !video.has_video && (
                          <button
                            onClick={() => {
                              const input = document.createElement('input');
                              input.type = 'file';
                              input.accept = 'video/*';
                              input.onchange = (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  handleServicePageVideoUpload(video.service_id, file);
                                }
                              };
                              input.click();
                            }}
                            className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            Upload Video
                          </button>
                        )}
                        <button
                          onClick={() => openModal('editVideo', video)}
                          className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(video.id)}
                          className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-6xl mb-4">🎥</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Videos Found</h3>
                  <p className="text-gray-500 mb-6">Start by adding your first video</p>
                  <button
                    onClick={() => openModal('createVideo')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
                  >
                    Add Your First Video
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'files' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">File Management</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => exportData('files')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 font-medium text-sm"
                >
                  📊 Export Files
                </button>
                <button
                  onClick={() => openModal('uploadFile')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
                >
                  📁 Upload File
                </button>
              </div>
            </div>

            {/* Files Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {files.length > 0 ? (
                      files.map((file) => (
                        <tr key={file.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-blue-600 text-sm">📄</span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{file.name}</div>
                                <div className="text-sm text-gray-500">{file.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{file.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{file.size}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(file.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleFileDownload(file.id)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Download
                              </button>
                              <button
                                onClick={() => handleDeleteFile(file.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center">
                          <div className="text-4xl mb-4">📁</div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Files Found</h3>
                          <p className="text-gray-500">Start by uploading your first file</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'emails' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Email Management</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => exportData('emails')}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium text-sm"
                >
                  📊 Export Emails
                </button>
                <button
                  onClick={() => openModal('sendEmail')}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 font-medium"
                >
                  📧 Send Email
                </button>
              </div>
            </div>

            {/* Email Logs Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {emails.length > 0 ? (
                      emails.map((email) => (
                        <tr key={email.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{email.to_email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{email.subject}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              email.status === 'sent' ? 'bg-green-100 text-green-800' :
                              email.status === 'failed' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {email.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(email.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => openModal('viewEmail', email)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center">
                          <div className="text-4xl mb-4">📧</div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Emails Found</h3>
                          <p className="text-gray-500">No emails have been sent yet</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'calculators' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Calculator Management</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => exportData('calculators')}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium text-sm"
                >
                  📊 Export Results
                </button>
                <button
                  onClick={() => openModal('createCalculator')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
                >
                  🧮 Add Calculator
                </button>
              </div>
            </div>

            {/* Calculator Results Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calculator</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Input</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {calculators.length > 0 ? (
                      calculators.map((calc) => (
                        <tr key={calc.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{calc.calculator_type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{calc.input_data}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{calc.result}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(calc.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => openModal('viewCalculator', calc)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center">
                          <div className="text-4xl mb-4">🧮</div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Calculator Results</h3>
                          <p className="text-gray-500">No calculator usage has been recorded yet</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
              <button
                onClick={() => addNotification('Settings saved successfully', 'success')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
              >
                Save Settings
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* General Settings */}
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time</option>
                      <option value="PST">Pacific Time</option>
                      <option value="IST">Indian Standard Time</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* System Information */}
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
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last Updated</span>
                    <span className="text-sm font-medium text-gray-900">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => addNotification('System check completed', 'success')}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 font-medium text-sm"
                  >
                    Run System Check
                  </button>
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
                   modalType === 'editBlogPost' ? 'Edit Blog Post' :
                   modalType === 'createVideo' ? 'Add New Video' :
                   modalType === 'editVideo' ? 'Edit Video' :
                   modalType === 'uploadFile' ? 'Upload File' :
                   modalType === 'sendEmail' ? 'Send Email' :
                   modalType === 'createCalculator' ? 'Add Calculator' :
                   modalType === 'viewEmail' ? 'View Email' :
                   modalType === 'viewCalculator' ? 'View Calculator' : 'Modal'}
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

              {modalType === 'editBlogPost' && (
                <EditBlogPostForm 
                  post={modalData} 
                  onSubmit={(postData) => handleUpdateBlogPost(modalData.id, postData)} 
                  onCancel={closeModal} 
                />
              )}

              {modalType === 'createVideo' && (
                <CreateVideoForm onSubmit={handleCreateVideo} onCancel={closeModal} />
              )}

              {modalType === 'editVideo' && (
                <EditVideoForm 
                  video={modalData} 
                  onSubmit={(videoData) => handleUpdateVideo(modalData.id, videoData)} 
                  onCancel={closeModal} 
                />
              )}

              {modalType === 'uploadFile' && (
                <UploadFileForm onSubmit={handleUploadFile} onCancel={closeModal} />
              )}

              {modalType === 'sendEmail' && (
                <SendEmailForm onSubmit={handleSendEmail} onCancel={closeModal} />
              )}

              {modalType === 'createCalculator' && (
                <CreateCalculatorForm onSubmit={handleCreateCalculator} onCancel={closeModal} />
              )}

              {modalType === 'viewEmail' && (
                <ViewEmailForm email={modalData} onCancel={closeModal} />
              )}

              {modalType === 'viewCalculator' && (
                <ViewCalculatorForm calculator={modalData} onCancel={closeModal} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CleanAdminDashboard;

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting lead:', error);
    } finally {
      setIsSubmitting(false);
    }
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
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
        >
          {isSubmitting ? 'Creating...' : 'Create Lead'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium disabled:opacity-50"
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
    status: 'draft',
    category: '',
    tags: '',
    featured_image_url: '',
    content_type: 'article',
    seo_title: '',
    seo_description: '',
    author: '',
    reading_time: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);

  // Predefined categories and tags
  const categories = [
    'HR Management', 'Compliance', 'Recruitment', 'Payroll', 'Performance Management',
    'Employee Engagement', 'HR Technology', 'Workplace Culture', 'Leadership',
    'Training & Development', 'Benefits & Compensation', 'Legal Updates', 'Industry Trends'
  ];

  const tagSuggestions = [
    'HR', 'Compliance', 'Recruitment', 'Payroll', 'Performance', 'Engagement',
    'Technology', 'Culture', 'Leadership', 'Training', 'Benefits', 'Legal',
    'Startup', 'SME', 'Enterprise', 'Remote Work', 'Diversity', 'Inclusion'
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleBlogImageUpload = async (file) => {
    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);
      
      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleCategorySelect = (category) => {
    setFormData({ ...formData, category });
    setShowCategorySuggestions(false);
  };

  const handleTagSelect = (tag) => {
    const currentTags = formData.tags.split(',').map(t => t.trim()).filter(t => t);
    if (!currentTags.includes(tag)) {
      const newTags = [...currentTags, tag].join(', ');
      setFormData({ ...formData, tags: newTags });
    }
    setShowTagSuggestions(false);
  };

  const handleTagInput = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, tags: value });
    setShowTagSuggestions(value.length > 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    try {
      let imageUrl = formData.featured_image_url;
      
      // Upload new image if selected
      if (imageFile) {
        imageUrl = await handleBlogImageUpload(imageFile);
        if (!imageUrl) {
          setIsUploading(false);
          return;
        }
      }
      
      const blogData = {
        ...formData,
        featured_image_url: imageUrl,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      
      onSubmit(blogData);
    } catch (error) {
      console.error('Error creating blog post:', error);
    } finally {
      setIsUploading(false);
    }
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
          rows="8"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Write your blog post content here..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({...formData, author: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Author name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
          <input
            type="text"
            value={formData.seo_title}
            onChange={(e) => setFormData({...formData, seo_title: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="SEO optimized title"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
        <textarea
          value={formData.seo_description}
          onChange={(e) => setFormData({...formData, seo_description: e.target.value})}
          rows="2"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="SEO meta description (150-160 characters)"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
          <select
            value={formData.content_type}
            onChange={(e) => setFormData({...formData, content_type: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="article">Article</option>
            <option value="guide">Guide</option>
            <option value="case-study">Case Study</option>
            <option value="news">News</option>
            <option value="tutorial">Tutorial</option>
            <option value="interview">Interview</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Reading Time (minutes)</label>
          <input
            type="number"
            value={formData.reading_time}
            onChange={(e) => setFormData({...formData, reading_time: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="5"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <div className="relative">
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            onFocus={() => setShowCategorySuggestions(true)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Select or type a category"
          />
          {showCategorySuggestions && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
              {categories.map((category) => (
                <div
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
        <div className="relative">
          <input
            type="text"
            value={formData.tags}
            onChange={handleTagInput}
            onFocus={() => setShowTagSuggestions(true)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Select tags or type new ones (comma-separated)"
          />
          {showTagSuggestions && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
              {tagSuggestions.map((tag) => (
                <div
                  key={tag}
                  onClick={() => handleTagSelect(tag)}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.tags.split(',').map((tag, index) => {
            const trimmedTag = tag.trim();
            return trimmedTag ? (
              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {trimmedTag}
              </span>
            ) : null;
          })}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        {imagePreview && (
          <div className="mt-2">
            <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" />
          </div>
        )}
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
          disabled={isUploading}
          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
        >
          {isUploading ? 'Creating...' : 'Create Post'}
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

const EditBlogPostForm = ({ post, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: post.title || '',
    content: post.content || '',
    excerpt: post.excerpt || '',
    status: post.status || 'draft'
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
          <option value="archived">Archived</option>
        </select>
      </div>
      
      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Update Post
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
    thumbnail_url: '',
    service_category: '',
    service_name: '',
    service_id: '',
    duration: '',
    is_active: true,
    tags: [],
    source: 'database'
  });

  const servicePages = [
    { id: 'virtual-hr-management', name: 'Virtual HR Management', path: '/services/virtual-hr-management' },
    { id: 'hr-compliance', name: 'HR Compliance', path: '/services/hr-compliance' },
    { id: 'payroll-management', name: 'Payroll Management', path: '/services/payroll-management' },
    { id: 'recruitment-service', name: 'Recruitment Service', path: '/services/recruitment-service' },
    { id: 'performance-management', name: 'Performance Management', path: '/services/performance-management' },
    { id: 'employee-engagement', name: 'Employee Engagement', path: '/services/employee-engagement' },
    { id: 'hr-audit', name: 'HR Audit', path: '/services/hr-audit' },
    { id: 'mumbai', name: 'HR Services Mumbai', path: '/services/hr-services-mumbai' },
    { id: 'delhi', name: 'HR Services Delhi', path: '/services/hr-services-delhi' },
    { id: 'bangalore', name: 'HR Services Bangalore', path: '/services/hr-services-bangalore' },
    { id: 'hyderabad', name: 'HR Services Hyderabad', path: '/services/hr-services-hyderabad' },
    { id: 'chennai', name: 'HR Services Chennai', path: '/services/hr-services-chennai' },
    { id: 'pune', name: 'HR Services Pune', path: '/services/hr-services-pune' },
    { id: 'kolkata', name: 'HR Services Kolkata', path: '/services/hr-services-kolkata' },
    { id: 'ahmedabad', name: 'HR Services Ahmedabad', path: '/services/hr-services-ahmedabad' },
    { id: 'jaipur', name: 'HR Services Jaipur', path: '/services/hr-services-jaipur' },
    { id: 'lucknow', name: 'HR Services Lucknow', path: '/services/hr-services-lucknow' },
    { id: 'indore', name: 'HR Services Indore', path: '/services/hr-services-indore' },
    { id: 'nagpur', name: 'HR Services Nagpur', path: '/services/hr-services-nagpur' },
    { id: 'bhubaneswar', name: 'HR Services Bhubaneswar', path: '/services/hr-services-bhubaneswar' },
    { id: 'coimbatore', name: 'HR Services Coimbatore', path: '/services/hr-services-coimbatore' }
  ];

  const handleServiceChange = (serviceId) => {
    const selectedService = servicePages.find(s => s.id === serviceId);
    setFormData({
      ...formData,
      service_id: serviceId,
      service_name: selectedService?.name || '',
      service_category: 'Service Pages',
      source: serviceId ? 'service_page' : 'database'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // If this is a service page video, save to localStorage
    if (formData.service_id && formData.source === 'service_page') {
      const serviceVideos = JSON.parse(localStorage.getItem('serviceVideos') || '{}');
      serviceVideos[formData.service_id] = {
        title: formData.title,
        description: formData.description,
        videoUrl: formData.video_url,
        thumbnailUrl: formData.thumbnail_url,
        isActive: formData.is_active,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('serviceVideos', JSON.stringify(serviceVideos));
    }
    
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
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
        <input
          type="url"
          value={formData.thumbnail_url}
          onChange={(e) => setFormData({...formData, thumbnail_url: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Service Page (Optional)</label>
        <select
          value={formData.service_id}
          onChange={(e) => handleServiceChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select Service Page (or leave empty for general video)</option>
          {servicePages.map(service => (
            <option key={service.id} value={service.id}>{service.name}</option>
          ))}
        </select>
        {formData.service_id && (
          <p className="text-sm text-gray-600 mt-1">
            This video will be embedded on the {formData.service_name} page
          </p>
        )}
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
            <option value="hr">HR Services</option>
            <option value="recruitment">Recruitment</option>
            <option value="consulting">Consulting</option>
            <option value="Service Pages">Service Pages</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration (seconds)</label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={formData.is_active}
          onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label className="text-sm font-medium text-gray-700">Active</label>
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

const EditVideoForm = ({ video, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: video.title || '',
    description: video.description || '',
    video_url: video.video_url || '',
    thumbnail_url: video.thumbnail_url || '',
    service_category: video.service_category || '',
    service_name: video.service_name || '',
    duration: video.duration || '',
    is_active: video.is_active !== undefined ? video.is_active : true,
    tags: video.tags || []
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
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
        <input
          type="url"
          value={formData.thumbnail_url}
          onChange={(e) => setFormData({...formData, thumbnail_url: e.target.value})}
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
            <option value="hr">HR Services</option>
            <option value="recruitment">Recruitment</option>
            <option value="consulting">Consulting</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration (seconds)</label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={formData.is_active}
          onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label className="text-sm font-medium text-gray-700">Active</label>
      </div>
      
      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Update Video
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

const UploadFileForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    size: '',
    url: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">File Name</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows="2"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">File Type</label>
          <input
            type="text"
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">File Size</label>
          <input
            type="text"
            value={formData.size}
            onChange={(e) => setFormData({...formData, size: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">File URL</label>
        <input
          type="url"
          required
          value={formData.url}
          onChange={(e) => setFormData({...formData, url: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Upload File
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

const SendEmailForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    to_email: '',
    subject: '',
    content: '',
    status: 'pending'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">To Email</label>
        <input
          type="email"
          required
          value={formData.to_email}
          onChange={(e) => setFormData({...formData, to_email: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
        <input
          type="text"
          required
          value={formData.subject}
          onChange={(e) => setFormData({...formData, subject: e.target.value})}
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
      
      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Send Email
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

const CreateCalculatorForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    calculator_type: '',
    input_data: '',
    result: '',
    user_id: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Calculator Type</label>
        <select
          required
          value={formData.calculator_type}
          onChange={(e) => setFormData({...formData, calculator_type: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">Select Calculator</option>
          <option value="salary">Salary Calculator</option>
          <option value="tax">Tax Calculator</option>
          <option value="benefits">Benefits Calculator</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Input Data</label>
        <textarea
          value={formData.input_data}
          onChange={(e) => setFormData({...formData, input_data: e.target.value})}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Result</label>
        <input
          type="text"
          required
          value={formData.result}
          onChange={(e) => setFormData({...formData, result: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
      
      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          Create Calculator
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

const ViewEmailForm = ({ email, onCancel }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">To Email</label>
        <p className="text-sm text-gray-900">{email.to_email}</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
        <p className="text-sm text-gray-900">{email.subject}</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
        <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto">
          {email.content}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
          email.status === 'sent' ? 'bg-green-100 text-green-800' :
          email.status === 'failed' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {email.status}
        </span>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sent Date</label>
        <p className="text-sm text-gray-900">{new Date(email.created_at).toLocaleString()}</p>
      </div>
      
      <div className="flex space-x-3 pt-4">
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const ViewCalculatorForm = ({ calculator, onCancel }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Calculator Type</label>
        <p className="text-sm text-gray-900">{calculator.calculator_type}</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Input Data</label>
        <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto">
          {calculator.input_data}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Result</label>
        <p className="text-sm text-gray-900 font-semibold">{calculator.result}</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Calculation Date</label>
        <p className="text-sm text-gray-900">{new Date(calculator.created_at).toLocaleString()}</p>
      </div>
      
      <div className="flex space-x-3 pt-4">
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
};
