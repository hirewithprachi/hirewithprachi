import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, Plus, Edit, Trash2, Save, X, Check, 
  AlertCircle, Settings, Phone, Link, Key, Globe,
  Send, Inbox, TrendingUp, Users, Clock, RefreshCw,
  Copy, ExternalLink, PlayCircle, StopCircle
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const WhatsAppIntegration = () => {
  const [integrations, setIntegrations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [automations, setAutomations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'integration', 'automation', 'test'
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('integrations');

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    access_token: '',
    webhook_url: '',
    verify_token: '',
    is_active: true,
    settings: {}
  });

  const [automationData, setAutomationData] = useState({
    name: '',
    trigger_event: 'user_registered',
    message_template: '',
    delay_hours: 0,
    is_active: true,
    conditions: {}
  });

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadIntegrations(),
        loadMessages(),
        loadAutomations()
      ]);
    } catch (err) {
      setError('Failed to load WhatsApp data');
      console.error('Error loading WhatsApp data:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadIntegrations = async () => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_integrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIntegrations(data || []);
    } catch (err) {
      console.error('Error loading integrations:', err);
    }
  };

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_messages')
        .select(`
          *,
          whatsapp_integrations!inner(name)
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error('Error loading messages:', err);
    }
  };

  const loadAutomations = async () => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_automations')
        .select(`
          *,
          whatsapp_integrations!inner(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAutomations(data || []);
    } catch (err) {
      console.error('Error loading automations:', err);
    }
  };

  const handleSaveIntegration = async () => {
    try {
      setLoading(true);

      // Generate verify token if not provided
      if (!formData.verify_token) {
        formData.verify_token = `verify_${Math.random().toString(36).substring(2, 15)}`;
      }

      // Generate webhook URL if not provided
      if (!formData.webhook_url) {
        formData.webhook_url = `${window.location.origin}/api/whatsapp/webhook`;
      }

      let result;
      if (selectedItem) {
        result = await supabase
          .from('whatsapp_integrations')
          .update(formData)
          .eq('id', selectedItem.id);
      } else {
        result = await supabase
          .from('whatsapp_integrations')
          .insert([formData]);
      }

      if (result.error) throw result.error;

      setShowModal(false);
      setSelectedItem(null);
      resetFormData();
      loadIntegrations();
      
      alert(selectedItem ? 'Integration updated!' : 'Integration created!');
    } catch (err) {
      console.error('Error saving integration:', err);
      alert('Failed to save integration: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAutomation = async () => {
    try {
      setLoading(true);

      let result;
      if (selectedItem) {
        result = await supabase
          .from('whatsapp_automations')
          .update(automationData)
          .eq('id', selectedItem.id);
      } else {
        result = await supabase
          .from('whatsapp_automations')
          .insert([automationData]);
      }

      if (result.error) throw result.error;

      setShowModal(false);
      setSelectedItem(null);
      resetAutomationData();
      loadAutomations();
      
      alert(selectedItem ? 'Automation updated!' : 'Automation created!');
    } catch (err) {
      console.error('Error saving automation:', err);
      alert('Failed to save automation: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      setLoading(true);
      
      const table = type === 'integration' ? 'whatsapp_integrations' : 'whatsapp_automations';
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;

      if (type === 'integration') {
        loadIntegrations();
      } else {
        loadAutomations();
      }

      alert('Item deleted successfully!');
    } catch (err) {
      console.error('Error deleting item:', err);
      alert('Failed to delete item: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTestWebhook = async (integration) => {
    try {
      const response = await fetch('/api/whatsapp/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          integration_id: integration.id,
          test_message: 'Hello from Hire with Prachi! This is a test message.'
        })
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Test message sent successfully!');
      } else {
        alert('Test failed: ' + result.error);
      }
    } catch (err) {
      console.error('Test webhook error:', err);
      alert('Test failed: ' + err.message);
    }
  };

  const resetFormData = () => {
    setFormData({
      name: '',
      phone_number: '',
      access_token: '',
      webhook_url: '',
      verify_token: '',
      is_active: true,
      settings: {}
    });
  };

  const resetAutomationData = () => {
    setAutomationData({
      name: '',
      trigger_event: 'user_registered',
      message_template: '',
      delay_hours: 0,
      is_active: true,
      conditions: {}
    });
  };

  const renderIntegrations = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">WhatsApp Business Integrations</h3>
        <button
          onClick={() => {
            setModalType('integration');
            setSelectedItem(null);
            resetFormData();
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus className="w-4 h-4" />
          Add Integration
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {integrations.map((integration) => (
          <div key={integration.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-600" />
                <h4 className="font-medium">{integration.name}</h4>
                {integration.is_active ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                ) : (
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Inactive</span>
                )}
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleTestWebhook(integration)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  title="Test Integration"
                >
                  <PlayCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setModalType('integration');
                    setSelectedItem(integration);
                    setFormData(integration);
                    setShowModal(true);
                  }}
                  className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete('integration', integration.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{integration.phone_number}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="truncate">{integration.webhook_url}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(integration.webhook_url)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                Created: {new Date(integration.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {integrations.length === 0 && (
        <div className="text-center py-8">
          <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No WhatsApp integrations configured yet.</p>
          <button
            onClick={() => {
              setModalType('integration');
              setSelectedItem(null);
              resetFormData();
              setShowModal(true);
            }}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Add Your First Integration
          </button>
        </div>
      )}
    </div>
  );

  const renderAutomations = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">WhatsApp Automations</h3>
        <button
          onClick={() => {
            setModalType('automation');
            setSelectedItem(null);
            resetAutomationData();
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Automation
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {automations.map((automation) => (
          <div key={automation.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium">{automation.name}</h4>
                {automation.is_active ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                ) : (
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Inactive</span>
                )}
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setModalType('automation');
                    setSelectedItem(automation);
                    setAutomationData(automation);
                    setShowModal(true);
                  }}
                  className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete('automation', automation.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Trigger: {automation.trigger_event}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Delay: {automation.delay_hours}h</span>
              </div>
              <div className="bg-gray-50 p-2 rounded text-xs">
                <span className="font-medium">Message:</span>
                <div className="mt-1 truncate">{automation.message_template}</div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                Integration: {automation.whatsapp_integrations?.name || 'Unknown'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {automations.length === 0 && (
        <div className="text-center py-8">
          <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No WhatsApp automations configured yet.</p>
          <button
            onClick={() => {
              setModalType('automation');
              setSelectedItem(null);
              resetAutomationData();
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Your First Automation
          </button>
        </div>
      )}
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recent Messages</h3>
      
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className="p-4 border-b border-gray-100 last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {message.is_incoming ? (
                    <Inbox className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Send className="w-4 h-4 text-green-600" />
                  )}
                  <span className="font-medium text-sm">
                    {message.is_incoming ? message.from_number : message.to_number}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(message.created_at).toLocaleString()}
                </span>
              </div>
              
              <div className="text-sm text-gray-700 mb-2">
                {message.content}
              </div>
              
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>Type: {message.message_type}</span>
                <span>Status: {message.status}</span>
                <span>Via: {message.whatsapp_integrations?.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {messages.length === 0 && (
        <div className="text-center py-8">
          <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No messages yet.</p>
        </div>
      )}
    </div>
  );

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">
              {modalType === 'integration' && (selectedItem ? 'Edit Integration' : 'Add Integration')}
              {modalType === 'automation' && (selectedItem ? 'Edit Automation' : 'Add Automation')}
            </h2>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            {modalType === 'integration' ? (
              <form onSubmit={(e) => { e.preventDefault(); handleSaveIntegration(); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Integration Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="My WhatsApp Business"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone_number}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone_number: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="+1234567890"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Access Token *
                  </label>
                  <input
                    type="password"
                    value={formData.access_token}
                    onChange={(e) => setFormData(prev => ({ ...prev, access_token: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="WhatsApp Business API Token"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Webhook URL
                  </label>
                  <input
                    type="url"
                    value={formData.webhook_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, webhook_url: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="https://yoursite.com/api/whatsapp/webhook"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Verify Token
                  </label>
                  <input
                    type="text"
                    value={formData.verify_token}
                    onChange={(e) => setFormData(prev => ({ ...prev, verify_token: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Webhook verification token"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate</p>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">Active</label>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Integration'}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); handleSaveAutomation(); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Automation Name *
                  </label>
                  <input
                    type="text"
                    value={automationData.name}
                    onChange={(e) => setAutomationData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Welcome Message"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Integration *
                  </label>
                  <select
                    value={automationData.integration_id || ''}
                    onChange={(e) => setAutomationData(prev => ({ ...prev, integration_id: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Integration</option>
                    {integrations.map(integration => (
                      <option key={integration.id} value={integration.id}>
                        {integration.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trigger Event *
                  </label>
                  <select
                    value={automationData.trigger_event}
                    onChange={(e) => setAutomationData(prev => ({ ...prev, trigger_event: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="user_registered">User Registered</option>
                    <option value="tool_purchased">Tool Purchased</option>
                    <option value="contact_form">Contact Form Submitted</option>
                    <option value="ai_tool_used">AI Tool Used</option>
                    <option value="manual_trigger">Manual Trigger</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message Template *
                  </label>
                  <textarea
                    value={automationData.message_template}
                    onChange={(e) => setAutomationData(prev => ({ ...prev, message_template: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Hello {{user_name}}, welcome to Hire with Prachi! 🎉"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use {'{user_name}'}, {'{tool_name}'}, {'{company_name}'} for dynamic content
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delay (hours)
                  </label>
                  <input
                    type="number"
                    value={automationData.delay_hours}
                    onChange={(e) => setAutomationData(prev => ({ ...prev, delay_hours: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="168"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={automationData.is_active}
                    onChange={(e) => setAutomationData(prev => ({ ...prev, is_active: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">Active</label>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Automation'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    );
  };

  if (loading && integrations.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-green-600" />
          <p className="text-gray-600">Loading WhatsApp integrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">WhatsApp Integration</h1>
          <p className="text-gray-600">Manage WhatsApp Business API integrations and automations</p>
        </div>
        
        <button
          onClick={loadData}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-800">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          {[
            { id: 'integrations', label: 'Integrations', icon: MessageCircle },
            { id: 'automations', label: 'Automations', icon: Settings },
            { id: 'messages', label: 'Messages', icon: Inbox }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'integrations' && renderIntegrations()}
        {activeTab === 'automations' && renderAutomations()}
        {activeTab === 'messages' && renderMessages()}
      </div>

      {/* Modal */}
      {renderModal()}
    </div>
  );
};

export default WhatsAppIntegration;
