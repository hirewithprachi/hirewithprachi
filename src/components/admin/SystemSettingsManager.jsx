import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, Save, RefreshCw, AlertCircle, CheckCircle,
  Globe, Mail, CreditCard, Shield, Database, Bell,
  Key, Lock, User, Monitor, Smartphone, Activity,
  BarChart3, FileText, Download, Upload, Edit, Eye
} from 'lucide-react';
import { adminDashboardService } from '../../services/adminDashboardService';

const SystemSettingsManager = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeCategory, setActiveCategory] = useState('general');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const settingCategories = [
    { id: 'general', name: 'General', icon: Globe, color: 'blue' },
    { id: 'email', name: 'Email', icon: Mail, color: 'green' },
    { id: 'payment', name: 'Payment', icon: CreditCard, color: 'purple' },
    { id: 'security', name: 'Security', icon: Shield, color: 'red' },
    { id: 'integration', name: 'Integrations', icon: Database, color: 'orange' }
  ];

  const defaultSettings = {
    general: {
      site_title: 'Hire with Prachi - Professional HR Solutions',
      contact_email: 'contact@hirewithprachi.com',
      support_phone: '+91-XXXXXXXXXX',
      company_address: 'Mumbai, Maharashtra, India',
      max_file_size: 10485760, // 10MB
      backup_retention_days: 30,
      maintenance_mode: false,
      timezone: 'Asia/Kolkata'
    },
    email: {
      email_provider: 'sendgrid',
      from_email: 'noreply@hirewithprachi.com',
      from_name: 'Hire with Prachi',
      reply_to_email: 'support@hirewithprachi.com',
      smtp_host: '',
      smtp_port: 587,
      smtp_username: '',
      smtp_password: '',
      email_queue_enabled: true
    },
    payment: {
      razorpay_key_id: 'rzp_live_gYfIm4bEnYMjkf',
      razorpay_key_secret: 'OOq7jr5YYvvGIkIS49pBkZtB',
      currency: 'INR',
      payment_timeout: 900, // 15 minutes
      webhook_secret: '',
      test_mode: false
    },
    security: {
      session_timeout: 3600, // 1 hour
      max_login_attempts: 5,
      lockout_duration: 300, // 5 minutes
      password_min_length: 8,
      require_2fa: false,
      api_rate_limit: 1000, // per hour
      cors_origins: ['https://hirewithprachi.com'],
      csrf_enabled: true
    },
    integration: {
      whatsapp_enabled: true,
      google_analytics_id: '',
      facebook_pixel_id: '',
      intercom_app_id: '',
      slack_webhook_url: '',
      sentry_dsn: '',
      cloudinary_cloud_name: '',
      aws_s3_bucket: ''
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError('');
      
      const result = await adminDashboardService.getSystemSettings();
      
      if (result.success) {
        const loadedSettings = {};
        
        // Group settings by category
        result.data.forEach(setting => {
          const category = setting.setting_type || 'general';
          if (!loadedSettings[category]) {
            loadedSettings[category] = {};
          }
          loadedSettings[category][setting.setting_key] = JSON.parse(setting.setting_value);
        });
        
        // Merge with defaults
        const mergedSettings = {};
        Object.keys(defaultSettings).forEach(category => {
          mergedSettings[category] = {
            ...defaultSettings[category],
            ...(loadedSettings[category] || {})
          };
        });
        
        setSettings(mergedSettings);
      } else {
        // Use default settings if loading fails
        setSettings(defaultSettings);
        setError(result.error || 'Failed to load settings');
      }
    } catch (err) {
      console.error('Error loading settings:', err);
      setSettings(defaultSettings);
      setError('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const saveSetting = async (category, key, value) => {
    try {
      const result = await adminDashboardService.updateSystemSetting(
        key,
        JSON.stringify(value),
        category
      );
      
      if (result.success) {
        setSettings(prev => ({
          ...prev,
          [category]: {
            ...prev[category],
            [key]: value
          }
        }));
        setSuccess(`${key} updated successfully`);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      console.error('Error saving setting:', err);
      setError(`Failed to save ${key}: ${err.message}`);
      setTimeout(() => setError(''), 5000);
    }
  };

  const saveAllSettings = async () => {
    try {
      setSaving(true);
      setError('');
      
      const promises = [];
      
      Object.keys(settings).forEach(category => {
        Object.keys(settings[category]).forEach(key => {
          promises.push(
            adminDashboardService.updateSystemSetting(
              key,
              JSON.stringify(settings[category][key]),
              category
            )
          );
        });
      });
      
      await Promise.all(promises);
      
      setSuccess('All settings saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error saving all settings:', err);
      setError('Failed to save settings: ' + err.message);
      setTimeout(() => setError(''), 5000);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const renderSettingInput = (category, key, value, type = 'text', options = null) => {
    const inputId = `${category}_${key}`;
    
    if (type === 'boolean') {
      return (
        <div className="flex items-center justify-between">
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </label>
          <button
            type="button"
            onClick={() => {
              const newValue = !value;
              handleInputChange(category, key, newValue);
              saveSetting(category, key, newValue);
            }}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              value ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                value ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      );
    }
    
    if (type === 'select' && options) {
      return (
        <div>
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </label>
          <select
            id={inputId}
            value={value}
            onChange={(e) => handleInputChange(category, key, e.target.value)}
            onBlur={() => saveSetting(category, key, value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    }
    
    if (type === 'textarea') {
      return (
        <div>
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </label>
          <textarea
            id={inputId}
            value={value || ''}
            onChange={(e) => handleInputChange(category, key, e.target.value)}
            onBlur={() => saveSetting(category, key, value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      );
    }
    
    return (
      <div>
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </label>
        <input
          id={inputId}
          type={type}
          value={value || ''}
          onChange={(e) => {
            const newValue = type === 'number' ? parseInt(e.target.value) || 0 : e.target.value;
            handleInputChange(category, key, newValue);
          }}
          onBlur={() => saveSetting(category, key, value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={type === 'password' ? '••••••••' : ''}
        />
      </div>
    );
  };

  const renderCategorySettings = (category) => {
    const categorySettings = settings[category] || {};
    
    switch (category) {
      case 'general':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderSettingInput('general', 'site_title', categorySettings.site_title)}
              {renderSettingInput('general', 'contact_email', categorySettings.contact_email, 'email')}
              {renderSettingInput('general', 'support_phone', categorySettings.support_phone, 'tel')}
              {renderSettingInput('general', 'max_file_size', categorySettings.max_file_size, 'number')}
              {renderSettingInput('general', 'backup_retention_days', categorySettings.backup_retention_days, 'number')}
              {renderSettingInput('general', 'timezone', categorySettings.timezone, 'select', [
                { value: 'Asia/Kolkata', label: 'Asia/Kolkata (IST)' },
                { value: 'UTC', label: 'UTC' },
                { value: 'America/New_York', label: 'America/New_York (EST)' }
              ])}
            </div>
            <div className="border-t pt-6">
              {renderSettingInput('general', 'company_address', categorySettings.company_address, 'textarea')}
              {renderSettingInput('general', 'maintenance_mode', categorySettings.maintenance_mode, 'boolean')}
            </div>
          </div>
        );
        
      case 'email':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderSettingInput('email', 'email_provider', categorySettings.email_provider, 'select', [
                { value: 'sendgrid', label: 'SendGrid' },
                { value: 'mailgun', label: 'Mailgun' },
                { value: 'smtp', label: 'SMTP' }
              ])}
              {renderSettingInput('email', 'from_email', categorySettings.from_email, 'email')}
              {renderSettingInput('email', 'from_name', categorySettings.from_name)}
              {renderSettingInput('email', 'reply_to_email', categorySettings.reply_to_email, 'email')}
            </div>
            {categorySettings.email_provider === 'smtp' && (
              <div className="border-t pt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">SMTP Configuration</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderSettingInput('email', 'smtp_host', categorySettings.smtp_host)}
                  {renderSettingInput('email', 'smtp_port', categorySettings.smtp_port, 'number')}
                  {renderSettingInput('email', 'smtp_username', categorySettings.smtp_username)}
                  {renderSettingInput('email', 'smtp_password', categorySettings.smtp_password, 'password')}
                </div>
              </div>
            )}
            <div className="border-t pt-6">
              {renderSettingInput('email', 'email_queue_enabled', categorySettings.email_queue_enabled, 'boolean')}
            </div>
          </div>
        );
        
      case 'payment':
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Payment settings are sensitive. Changes take effect immediately.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderSettingInput('payment', 'razorpay_key_id', categorySettings.razorpay_key_id)}
              {renderSettingInput('payment', 'razorpay_key_secret', categorySettings.razorpay_key_secret, 'password')}
              {renderSettingInput('payment', 'currency', categorySettings.currency, 'select', [
                { value: 'INR', label: 'Indian Rupee (INR)' },
                { value: 'USD', label: 'US Dollar (USD)' },
                { value: 'EUR', label: 'Euro (EUR)' }
              ])}
              {renderSettingInput('payment', 'payment_timeout', categorySettings.payment_timeout, 'number')}
            </div>
            <div className="border-t pt-6">
              {renderSettingInput('payment', 'webhook_secret', categorySettings.webhook_secret, 'password')}
              {renderSettingInput('payment', 'test_mode', categorySettings.test_mode, 'boolean')}
            </div>
          </div>
        );
        
      case 'security':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderSettingInput('security', 'session_timeout', categorySettings.session_timeout, 'number')}
              {renderSettingInput('security', 'max_login_attempts', categorySettings.max_login_attempts, 'number')}
              {renderSettingInput('security', 'lockout_duration', categorySettings.lockout_duration, 'number')}
              {renderSettingInput('security', 'password_min_length', categorySettings.password_min_length, 'number')}
              {renderSettingInput('security', 'api_rate_limit', categorySettings.api_rate_limit, 'number')}
            </div>
            <div className="border-t pt-6">
              {renderSettingInput('security', 'require_2fa', categorySettings.require_2fa, 'boolean')}
              {renderSettingInput('security', 'csrf_enabled', categorySettings.csrf_enabled, 'boolean')}
              {renderSettingInput('security', 'cors_origins', Array.isArray(categorySettings.cors_origins) ? categorySettings.cors_origins.join(', ') : '', 'textarea')}
            </div>
          </div>
        );
        
      case 'integration':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderSettingInput('integration', 'google_analytics_id', categorySettings.google_analytics_id)}
              {renderSettingInput('integration', 'facebook_pixel_id', categorySettings.facebook_pixel_id)}
              {renderSettingInput('integration', 'intercom_app_id', categorySettings.intercom_app_id)}
              {renderSettingInput('integration', 'slack_webhook_url', categorySettings.slack_webhook_url)}
              {renderSettingInput('integration', 'sentry_dsn', categorySettings.sentry_dsn)}
              {renderSettingInput('integration', 'cloudinary_cloud_name', categorySettings.cloudinary_cloud_name)}
            </div>
            <div className="border-t pt-6">
              {renderSettingInput('integration', 'whatsapp_enabled', categorySettings.whatsapp_enabled, 'boolean')}
              {renderSettingInput('integration', 'aws_s3_bucket', categorySettings.aws_s3_bucket)}
            </div>
          </div>
        );
        
      default:
        return <div>No settings available for this category.</div>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading system settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600">Manage your application configuration and preferences</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={loadSettings}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={saveAllSettings}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save All'}
          </button>
        </div>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-800">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-800">
            <CheckCircle className="w-5 h-5" />
            <span>{success}</span>
          </div>
        </div>
      )}

      {/* Settings Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8 overflow-x-auto">
          {settingCategories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeCategory === category.id
                    ? `border-${category.color}-500 text-${category.color}-600`
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Settings Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {settingCategories.find(cat => cat.id === activeCategory)?.name} Settings
          </h2>
          <p className="text-sm text-gray-600">
            Configure your {activeCategory} preferences and options.
          </p>
        </div>
        
        {renderCategorySettings(activeCategory)}
      </div>
    </div>
  );
};

export default SystemSettingsManager;
