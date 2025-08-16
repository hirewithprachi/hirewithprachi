import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { 
  Settings, 
  Globe, 
  Database, 
  Mail, 
  Bell, 
  Shield, 
  Palette, 
  Monitor, 
  Smartphone, 
  Wifi, 
  HardDrive, 
  Cpu, 
  MemoryStick, 
  Activity, 
  BarChart3, 
  Zap, 
  Clock, 
  Calendar, 
  Users, 
  FileText, 
  Video, 
  Image, 
  Download, 
  Upload, 
  RefreshCw, 
  Save, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Copy, 
  ExternalLink,
  Loader,
  Search,
  Filter,
  MoreVertical,
  Key,
  Lock,
  Unlock,
  Star,
  Award,
  Target,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const SystemSettings = ({ onClose, addNotification }) => {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({});
  const [activeTab, setActiveTab] = useState('general');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedSetting, setSelectedSetting] = useState(null);

  // Settings form data
  const [formData, setFormData] = useState({
    site_name: 'Hire With Prachi',
    site_description: 'Professional HR Services & Virtual HR Solutions',
    site_url: 'https://hirewithprachi.com',
    admin_email: 'prachishri005@gmail.com',
    contact_email: 'contact@hirewithprachi.com',
    phone: '+91 9876543210',
    timezone: 'Asia/Kolkata',
    date_format: 'DD/MM/YYYY',
    time_format: '24',
    language: 'en',
    currency: 'INR',
    maintenance_mode: false,
    registration_enabled: true,
    comments_enabled: true,
    auto_backups: true,
    email_notifications: true,
    sms_notifications: false,
    push_notifications: true,
    analytics_enabled: true,
    seo_enabled: true,
    cache_enabled: true,
    compression_enabled: true,
    cdn_enabled: false,
    ssl_enabled: true,
    api_rate_limit: 1000,
    max_file_size: '10MB',
    allowed_file_types: 'jpg,jpeg,png,gif,pdf,doc,docx',
    session_timeout: 30,
    max_login_attempts: 5,
    password_min_length: 8,
    require_2fa: false
  });

  // System status data
  const [systemStatus, setSystemStatus] = useState({
    server: { status: 'online', uptime: '99.9%', response_time: '45ms' },
    database: { status: 'online', connections: 12, size: '1.2GB' },
    storage: { used: '2.3GB', total: '100GB', percentage: 2.3 },
    memory: { used: '1.2GB', total: '4GB', percentage: 30 },
    cpu: { usage: '15%', cores: 4, load: 0.3 },
    bandwidth: { used: '45GB', total: '1TB', percentage: 4.5 }
  });

  // Integration settings
  const [integrations, setIntegrations] = useState([
    { id: 'google_analytics', name: 'Google Analytics', status: 'connected', config: { tracking_id: 'GA-XXXX-X' }},
    { id: 'google_workspace', name: 'Google Workspace', status: 'connected', config: { domain: 'hirewithprachi.com' }},
    { id: 'resend', name: 'Resend Email', status: 'configured', config: { api_key: 're_***' }},
    { id: 'sendgrid', name: 'SendGrid', status: 'available', config: { api_key: 'SG.***' }},
    { id: 'calendly', name: 'Calendly', status: 'connected', config: { username: 'prachi-hr' }},
    { id: 'supabase', name: 'Supabase', status: 'connected', config: { project_id: 'ktqrzokrqizfjqdgwmqs' }},
    { id: 'stripe', name: 'Stripe', status: 'available', config: { public_key: 'pk_test_***' }}
  ]);

  useEffect(() => {
    loadSystemSettings();
    loadSystemStatus();
  }, []);

  const loadSystemSettings = async () => {
    try {
      setLoading(true);

      // Try to load from database
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data && !error) {
        setSettings(data.settings || {});
        setFormData(prev => ({ ...prev, ...(data.settings || {}) }));
      }

    } catch (error) {
      console.error('Error loading system settings:', error);
      addNotification('Using default settings (database unavailable)', 'warning');
    } finally {
      setLoading(false);
    }
  };

  const loadSystemStatus = () => {
    // Simulate real-time system monitoring
    const updateStatus = () => {
      setSystemStatus(prev => ({
        ...prev,
        server: {
          ...prev.server,
          response_time: `${Math.floor(Math.random() * 50) + 20}ms`
        },
        database: {
          ...prev.database,
          connections: Math.floor(Math.random() * 20) + 5
        },
        memory: {
          ...prev.memory,
          percentage: Math.floor(Math.random() * 40) + 20
        },
        cpu: {
          ...prev.cpu,
          usage: `${Math.floor(Math.random() * 30) + 10}%`
        }
      }));
    };

    updateStatus();
    const interval = setInterval(updateStatus, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  };

  const handleSaveSettings = async (settingsData) => {
    try {
      // Save to database
      const { data, error } = await supabase
        .from('system_settings')
        .upsert({
          id: 'main',
          settings: settingsData,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      setSettings(settingsData);
      addNotification('Settings saved successfully', 'success');

    } catch (error) {
      console.error('Error saving settings:', error);
      
      // Fallback: save to local state
      setSettings(settingsData);
      addNotification('Settings saved locally (database unavailable)', 'warning');
    }
  };

  const handleIntegrationToggle = async (integrationId, newStatus) => {
    try {
      setIntegrations(prev => prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, status: newStatus } 
          : integration
      ));

      // Here you would typically call an API to enable/disable the integration
      addNotification(`Integration ${newStatus}`, 'success');

    } catch (error) {
      console.error('Error toggling integration:', error);
      addNotification('Failed to update integration', 'error');
    }
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'system-settings.json';
    link.click();
    URL.revokeObjectURL(url);
    addNotification('Settings exported successfully', 'success');
  };

  const importSettings = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedSettings = JSON.parse(e.target.result);
        setFormData(prev => ({ ...prev, ...importedSettings }));
        addNotification('Settings imported successfully', 'success');
      } catch (error) {
        addNotification('Invalid settings file', 'error');
      }
    };
    reader.readAsText(file);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings, color: 'blue' },
    { id: 'system', label: 'System Status', icon: Activity, color: 'green' },
    { id: 'integrations', label: 'Integrations', icon: Zap, color: 'purple' },
    { id: 'security', label: 'Security', icon: Shield, color: 'red' },
    { id: 'performance', label: 'Performance', icon: BarChart3, color: 'orange' },
    { id: 'backup', label: 'Backup & Restore', icon: Database, color: 'indigo' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading system settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">System Settings</h2>
          <p className="text-gray-600 dark:text-gray-400">Configure system preferences and integrations</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={exportSettings}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>Import</span>
            <input
              type="file"
              accept=".json"
              onChange={importSettings}
              className="hidden"
            />
          </label>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id
                  ? `bg-${tab.color}-600 text-white shadow-lg`
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content based on active tab */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'general' && (
            <GeneralSettingsTab
              formData={formData}
              setFormData={setFormData}
              onSave={handleSaveSettings}
            />
          )}
          {activeTab === 'system' && (
            <SystemStatusTab
              systemStatus={systemStatus}
              onRefresh={loadSystemStatus}
            />
          )}
          {activeTab === 'integrations' && (
            <IntegrationsTab
              integrations={integrations}
              onToggle={handleIntegrationToggle}
            />
          )}
          {activeTab === 'security' && (
            <SecuritySettingsTab
              formData={formData}
              setFormData={setFormData}
              onSave={handleSaveSettings}
            />
          )}
          {activeTab === 'performance' && (
            <PerformanceTab
              formData={formData}
              setFormData={setFormData}
              onSave={handleSaveSettings}
            />
          )}
          {activeTab === 'backup' && (
            <BackupRestoreTab />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// General Settings Tab
const GeneralSettingsTab = ({ formData, setFormData, onSave }) => {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(formData);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Site Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Site Name
            </label>
            <input
              type="text"
              value={formData.site_name}
              onChange={(e) => setFormData(prev => ({ ...prev, site_name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Site URL
            </label>
            <input
              type="url"
              value={formData.site_url}
              onChange={(e) => setFormData(prev => ({ ...prev, site_url: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Site Description
            </label>
            <textarea
              rows={3}
              value={formData.site_description}
              onChange={(e) => setFormData(prev => ({ ...prev, site_description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Admin Email
            </label>
            <input
              type="email"
              value={formData.admin_email}
              onChange={(e) => setFormData(prev => ({ ...prev, admin_email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contact Email
            </label>
            <input
              type="email"
              value={formData.contact_email}
              onChange={(e) => setFormData(prev => ({ ...prev, contact_email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Timezone
            </label>
            <select
              value={formData.timezone}
              onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
          >
            {saving && <Loader className="w-4 h-4 animate-spin" />}
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// System Status Tab
const SystemStatusTab = ({ systemStatus, onRefresh }) => {
  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Server Status</h3>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Status</span>
              <span className="text-green-600 font-medium">Online</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Uptime</span>
              <span className="text-gray-900 dark:text-white">{systemStatus.server.uptime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Response</span>
              <span className="text-gray-900 dark:text-white">{systemStatus.server.response_time}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Database</h3>
            <Database className="w-5 h-5 text-blue-600" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Status</span>
              <span className="text-green-600 font-medium">Connected</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Connections</span>
              <span className="text-gray-900 dark:text-white">{systemStatus.database.connections}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Size</span>
              <span className="text-gray-900 dark:text-white">{systemStatus.database.size}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resources</h3>
            <Activity className="w-5 h-5 text-purple-600" />
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600 dark:text-gray-400">CPU</span>
                <span className="text-gray-900 dark:text-white">{systemStatus.cpu.usage}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: systemStatus.cpu.usage }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600 dark:text-gray-400">Memory</span>
                <span className="text-gray-900 dark:text-white">{systemStatus.memory.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${systemStatus.memory.percentage}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Storage Usage</h3>
            <HardDrive className="w-5 h-5 text-orange-600" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Used Space</span>
                <span className="text-gray-900 dark:text-white">{systemStatus.storage.used} / {systemStatus.storage.total}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div className="bg-orange-600 h-3 rounded-full" style={{ width: `${systemStatus.storage.percentage}%` }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">{systemStatus.storage.percentage}% used</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bandwidth Usage</h3>
            <Globe className="w-5 h-5 text-green-600" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">This Month</span>
                <span className="text-gray-900 dark:text-white">{systemStatus.bandwidth.used} / {systemStatus.bandwidth.total}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full" style={{ width: `${systemStatus.bandwidth.percentage}%` }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">{systemStatus.bandwidth.percentage}% used</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Status</span>
        </button>
      </div>
    </div>
  );
};

// Integrations Tab
const IntegrationsTab = ({ integrations, onToggle }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'green';
      case 'configured': return 'blue';
      case 'available': return 'gray';
      case 'error': return 'red';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return CheckCircle;
      case 'configured': return Settings;
      case 'available': return Plus;
      case 'error': return AlertCircle;
      default: return Settings;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map(integration => {
          const StatusIcon = getStatusIcon(integration.status);
          const statusColor = getStatusColor(integration.status);
          
          return (
            <div key={integration.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {integration.name}
                </h3>
                <StatusIcon className={`w-5 h-5 text-${statusColor}-600`} />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Status</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full bg-${statusColor}-100 text-${statusColor}-800 dark:bg-${statusColor}-900 dark:text-${statusColor}-200`}>
                    {integration.status}
                  </span>
                </div>
                
                {integration.config && Object.entries(integration.config).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400 capitalize">
                      {key.replace('_', ' ')}
                    </span>
                    <span className="text-gray-900 dark:text-white text-sm font-mono">
                      {typeof value === 'string' && value.includes('*') ? value : value.toString().slice(0, 10) + '...'}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => onToggle(integration.id, integration.status === 'connected' ? 'available' : 'connected')}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium ${
                    integration.status === 'connected'
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                </button>
                
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Security Settings Tab
const SecuritySettingsTab = ({ formData, setFormData, onSave }) => {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(formData);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Authentication & Access</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={formData.session_timeout}
                onChange={(e) => setFormData(prev => ({ ...prev, session_timeout: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Max Login Attempts
              </label>
              <input
                type="number"
                value={formData.max_login_attempts}
                onChange={(e) => setFormData(prev => ({ ...prev, max_login_attempts: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password Min Length
              </label>
              <input
                type="number"
                value={formData.password_min_length}
                onChange={(e) => setFormData(prev => ({ ...prev, password_min_length: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                API Rate Limit (per hour)
              </label>
              <input
                type="number"
                value={formData.api_rate_limit}
                onChange={(e) => setFormData(prev => ({ ...prev, api_rate_limit: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Require 2FA for admin users</p>
              </div>
              <div 
                onClick={() => setFormData(prev => ({ ...prev, require_2fa: !prev.require_2fa }))}
                className={`w-12 h-6 rounded-full transition-colors duration-200 cursor-pointer relative ${
                  formData.require_2fa ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${
                  formData.require_2fa ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">SSL Enforcement</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Force HTTPS connections</p>
              </div>
              <div 
                onClick={() => setFormData(prev => ({ ...prev, ssl_enabled: !prev.ssl_enabled }))}
                className={`w-12 h-6 rounded-full transition-colors duration-200 cursor-pointer relative ${
                  formData.ssl_enabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${
                  formData.ssl_enabled ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
          >
            {saving && <Loader className="w-4 h-4 animate-spin" />}
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Security Settings'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Performance Tab
const PerformanceTab = ({ formData, setFormData, onSave }) => {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(formData);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Options</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Max File Size
              </label>
              <select
                value={formData.max_file_size}
                onChange={(e) => setFormData(prev => ({ ...prev, max_file_size: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="5MB">5MB</option>
                <option value="10MB">10MB</option>
                <option value="25MB">25MB</option>
                <option value="50MB">50MB</option>
                <option value="100MB">100MB</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Allowed File Types
              </label>
              <input
                type="text"
                value={formData.allowed_file_types}
                onChange={(e) => setFormData(prev => ({ ...prev, allowed_file_types: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="jpg,jpeg,png,gif,pdf"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Cache Enabled</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Enable caching for better performance</p>
              </div>
              <div 
                onClick={() => setFormData(prev => ({ ...prev, cache_enabled: !prev.cache_enabled }))}
                className={`w-12 h-6 rounded-full transition-colors duration-200 cursor-pointer relative ${
                  formData.cache_enabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${
                  formData.cache_enabled ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Compression</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Enable GZIP compression</p>
              </div>
              <div 
                onClick={() => setFormData(prev => ({ ...prev, compression_enabled: !prev.compression_enabled }))}
                className={`w-12 h-6 rounded-full transition-colors duration-200 cursor-pointer relative ${
                  formData.compression_enabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${
                  formData.compression_enabled ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">CDN</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Content Delivery Network</p>
              </div>
              <div 
                onClick={() => setFormData(prev => ({ ...prev, cdn_enabled: !prev.cdn_enabled }))}
                className={`w-12 h-6 rounded-full transition-colors duration-200 cursor-pointer relative ${
                  formData.cdn_enabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${
                  formData.cdn_enabled ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
          >
            {saving && <Loader className="w-4 h-4 animate-spin" />}
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Performance Settings'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Backup & Restore Tab
const BackupRestoreTab = () => {
  const [backups, setBackups] = useState([
    { id: 1, name: 'Daily Backup', date: new Date().toISOString(), size: '156MB', type: 'automatic' },
    { id: 2, name: 'Weekly Backup', date: new Date(Date.now() - 86400000 * 7).toISOString(), size: '145MB', type: 'automatic' },
    { id: 3, name: 'Manual Backup', date: new Date(Date.now() - 86400000 * 2).toISOString(), size: '152MB', type: 'manual' }
  ]);

  const createBackup = () => {
    const newBackup = {
      id: Date.now(),
      name: 'Manual Backup',
      date: new Date().toISOString(),
      size: `${Math.floor(Math.random() * 50) + 140}MB`,
      type: 'manual'
    };
    setBackups(prev => [newBackup, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Backup Management</h3>
          <button
            onClick={createBackup}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Database className="w-4 h-4" />
            <span>Create Backup</span>
          </button>
        </div>

        <div className="space-y-4">
          {backups.map(backup => (
            <div key={backup.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <Database className="w-5 h-5 text-blue-600" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{backup.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(backup.date).toLocaleDateString()} • {backup.size} • {backup.type}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 transition-colors duration-200">
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
