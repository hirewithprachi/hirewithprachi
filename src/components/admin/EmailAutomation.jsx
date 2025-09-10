import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Plus, Edit, Trash2, Save, X, Check, 
  AlertCircle, Settings, Send, Clock, RefreshCw,
  TrendingUp, Users, Eye, PlayCircle, StopCircle,
  FileText, MessageSquare, Copy, ExternalLink
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { sendTestEmail } from '../../lib/automatedEmails';

const EmailAutomation = () => {
  const [automations, setAutomations] = useState([]);
  const [emailLogs, setEmailLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'automation', 'preview', 'logs'
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('automations');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    trigger_event: 'user_registered',
    conditions: {},
    email_template: '',
    subject_template: '',
    delay_hours: 0,
    is_active: true
  });

  // Email templates
  const emailTemplates = {
    welcome: {
      subject: 'Welcome to Hire with Prachi! 🎉',
      template: `Hello {{user_name}},

Welcome to Hire with Prachi! We're thrilled to have you join our community of HR professionals.

Here's what you can do now:
• Explore our AI-powered HR tools
• Access professional templates
• Connect with HR experts
• Get personalized career guidance

Start your journey: {{dashboard_url}}

Best regards,
The Hire with Prachi Team

---
This email was sent to {{user_email}}. If you didn't sign up, please ignore this email.`
    },
    purchase_confirmation: {
      subject: 'Purchase Confirmation - {{tool_name}}',
      template: `Hi {{user_name}},

Thank you for purchasing {{tool_name}}! Your payment has been processed successfully.

Order Details:
• Tool: {{tool_name}}
• Amount: ₹{{amount}}
• Transaction ID: {{transaction_id}}
• Purchase Date: {{purchase_date}}

Access your tool: {{tool_access_url}}

Download receipt: {{receipt_url}}

If you have any questions, feel free to reach out to our support team.

Best regards,
Hire with Prachi Team`
    },
    tool_used: {
      subject: 'Your {{tool_name}} Results Are Ready!',
      template: `Hello {{user_name}},

Great news! Your {{tool_name}} results are ready for download.

{{#if pdf_available}}
Download your professional PDF report: {{pdf_download_url}}
{{/if}}

View results online: {{results_url}}

Need help with your results? Book a consultation: {{consultation_url}}

Keep building your HR excellence!

Hire with Prachi Team`
    },
    follow_up: {
      subject: 'How are you finding Hire with Prachi?',
      template: `Hi {{user_name}},

It's been a while since you joined Hire with Prachi. We hope you're finding our platform helpful!

Quick question: What would make your HR journey even better?

• More AI tools?
• Additional templates?
• Expert consultations?
• Training resources?

Let us know: {{feedback_url}}

Special offer: Get 20% off any premium tool with code FEEDBACK20

Best regards,
Prachi & Team`
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadAutomations(),
        loadEmailLogs()
      ]);
    } catch (err) {
      setError('Failed to load email automation data');
      console.error('Error loading email data:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadAutomations = async () => {
    try {
      const { data, error } = await supabase
        .from('email_automations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAutomations(data || []);
    } catch (err) {
      console.error('Error loading automations:', err);
    }
  };

  const loadEmailLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('email_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setEmailLogs(data || []);
    } catch (err) {
      console.error('Error loading email logs:', err);
    }
  };

  const handleSaveAutomation = async () => {
    try {
      setLoading(true);

      let result;
      if (selectedItem) {
        result = await supabase
          .from('email_automations')
          .update(formData)
          .eq('id', selectedItem.id);
      } else {
        result = await supabase
          .from('email_automations')
          .insert([formData]);
      }

      if (result.error) throw result.error;

      setShowModal(false);
      setSelectedItem(null);
      resetFormData();
      loadAutomations();
      
      alert(selectedItem ? 'Automation updated!' : 'Automation created!');
    } catch (err) {
      console.error('Error saving automation:', err);
      alert('Failed to save automation: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this automation?')) return;

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('email_automations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      loadAutomations();
      alert('Automation deleted successfully!');
    } catch (err) {
      console.error('Error deleting automation:', err);
      alert('Failed to delete automation: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('email_automations')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      loadAutomations();
    } catch (err) {
      console.error('Error toggling automation:', err);
      alert('Failed to update automation status');
    }
  };

  const handleTestEmail = async (automation) => {
    try {
      const testData = {
        user_name: 'Test User',
        user_email: 'test@example.com',
        tool_name: 'Sample HR Tool',
        amount: '299',
        transaction_id: 'TEST123456',
        dashboard_url: `${window.location.origin}/dashboard`,
        tool_access_url: `${window.location.origin}/tools/sample`,
        feedback_url: `${window.location.origin}/feedback`,
        support_url: `${window.location.origin}/support`
      };

      const result = await sendTestEmail(automation.id, 'test@example.com', testData);
      
      if (result.success) {
        alert('Test email sent successfully!');
      } else {
        alert('Test failed: ' + result.error);
      }
    } catch (err) {
      console.error('Test email error:', err);
      alert('Test failed: ' + err.message);
    }
  };

  const loadTemplate = (templateKey) => {
    const template = emailTemplates[templateKey];
    if (template) {
      setFormData(prev => ({
        ...prev,
        subject_template: template.subject,
        email_template: template.template
      }));
    }
  };

  const resetFormData = () => {
    setFormData({
      name: '',
      trigger_event: 'user_registered',
      conditions: {},
      email_template: '',
      subject_template: '',
      delay_hours: 0,
      is_active: true
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      'sent': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'failed': 'bg-red-100 text-red-800',
      'bounced': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const renderAutomations = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Email Automations</h3>
        <button
          onClick={() => {
            setModalType('automation');
            setSelectedItem(null);
            resetFormData();
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
                <Mail className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium">{automation.name}</h4>
                {automation.is_active ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                ) : (
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Inactive</span>
                )}
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleTestEmail(automation)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  title="Test Email"
                >
                  <PlayCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleToggleActive(automation.id, automation.is_active)}
                  className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                  title={automation.is_active ? 'Deactivate' : 'Activate'}
                >
                  {automation.is_active ? <StopCircle className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    setModalType('automation');
                    setSelectedItem(automation);
                    setFormData(automation);
                    setShowModal(true);
                  }}
                  className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(automation.id)}
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
                <span className="font-medium">Subject:</span>
                <div className="mt-1 truncate">{automation.subject_template}</div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                Created: {new Date(automation.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {automations.length === 0 && (
        <div className="text-center py-8">
          <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No email automations configured yet.</p>
          <button
            onClick={() => {
              setModalType('automation');
              setSelectedItem(null);
              resetFormData();
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

  const renderEmailLogs = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Email Logs</h3>
      
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sent At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {emailLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.recipient_email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="max-w-xs truncate">{log.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.sent_at ? new Date(log.sent_at).toLocaleString() : 'Not sent'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => {
                        setModalType('preview');
                        setSelectedItem(log);
                        setShowModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {emailLogs.length === 0 && (
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No email logs yet.</p>
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
          className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">
              {modalType === 'automation' && (selectedItem ? 'Edit Automation' : 'Add Automation')}
              {modalType === 'preview' && 'Email Preview'}
            </h2>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            {modalType === 'automation' ? (
              <form onSubmit={(e) => { e.preventDefault(); handleSaveAutomation(); }} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Automation Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Welcome Email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Trigger Event *
                    </label>
                    <select
                      value={formData.trigger_event}
                      onChange={(e) => setFormData(prev => ({ ...prev, trigger_event: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="user_registered">User Registered</option>
                      <option value="tool_purchased">Tool Purchased</option>
                      <option value="ai_tool_used">AI Tool Used</option>
                      <option value="contact_form">Contact Form Submitted</option>
                      <option value="payment_failed">Payment Failed</option>
                      <option value="manual_trigger">Manual Trigger</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Templates
                  </label>
                  <div className="flex gap-2 mb-2">
                    {Object.keys(emailTemplates).map(key => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => loadTemplate(key)}
                        className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                      >
                        {key.replace('_', ' ').toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject Template *
                  </label>
                  <input
                    type="text"
                    value={formData.subject_template}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject_template: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Welcome to {{company_name}}!"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Template *
                  </label>
                  <textarea
                    value={formData.email_template}
                    onChange={(e) => setFormData(prev => ({ ...prev, email_template: e.target.value }))}
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    placeholder="Hello {{user_name}}, ..."
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use {'{user_name}'}, {'{user_email}'}, {'{tool_name}'}, {'{amount}'}, {'{company_name}'} for dynamic content
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delay (hours)
                    </label>
                    <input
                      type="number"
                      value={formData.delay_hours}
                      onChange={(e) => setFormData(prev => ({ ...prev, delay_hours: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                      max="168"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">Active</label>
                  </div>
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
            ) : modalType === 'preview' && selectedItem && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Email Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">To:</span>
                      <div className="font-medium">{selectedItem.recipient_email}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Status:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedItem.status)}`}>
                        {selectedItem.status}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Template:</span>
                      <div className="font-medium">{selectedItem.template_name || 'Custom'}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Sent:</span>
                      <div className="font-medium">
                        {selectedItem.sent_at ? new Date(selectedItem.sent_at).toLocaleString() : 'Not sent'}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Subject</h4>
                  <div className="bg-white border p-3 rounded">{selectedItem.subject}</div>
                </div>

                {selectedItem.error_message && (
                  <div>
                    <h4 className="font-medium mb-2 text-red-600">Error</h4>
                    <div className="bg-red-50 border border-red-200 p-3 rounded text-red-700">
                      {selectedItem.error_message}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  };

  if (loading && automations.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading email automations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Email Automation</h1>
          <p className="text-gray-600">Manage automated email campaigns and workflows</p>
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
            { id: 'automations', label: 'Automations', icon: Settings },
            { id: 'logs', label: 'Email Logs', icon: FileText }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
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
        {activeTab === 'automations' && renderAutomations()}
        {activeTab === 'logs' && renderEmailLogs()}
      </div>

      {/* Modal */}
      {renderModal()}
    </div>
  );
};

export default EmailAutomation;
