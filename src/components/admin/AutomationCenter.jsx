import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { 
  Zap, 
  Bot, 
  Settings, 
  Play, 
  Pause, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  X, 
  Save, 
  Copy, 
  Download, 
  Upload, 
  RefreshCw,
  Loader,
  Clock,
  Calendar,
  Users,
  Mail,
  Target,
  Activity,
  BarChart3,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Info,
  ArrowRight,
  Filter,
  Search,
  MoreVertical,
  Database,
  Globe,
  Workflow,
  Hash,
  Tag,
  FileText,
  Award,
  Star
} from 'lucide-react';

// Automation workflow templates
const workflowTemplates = [
  {
    id: 'lead_nurturing',
    name: 'Lead Nurturing Campaign',
    description: 'Automatically nurture new leads with email sequences',
    category: 'marketing',
    triggers: ['New Lead Created'],
    actions: ['Send Welcome Email', 'Add to CRM', 'Schedule Follow-up'],
    isActive: true,
    color: 'blue'
  },
  {
    id: 'blog_promotion',
    name: 'Blog Post Promotion',
    description: 'Automatically promote new blog posts across channels',
    category: 'content',
    triggers: ['Blog Post Published'],
    actions: ['Share on Social Media', 'Send to Newsletter', 'Update SEO'],
    isActive: false,
    color: 'purple'
  },
  {
    id: 'customer_onboarding',
    name: 'Customer Onboarding',
    description: 'Automate the customer onboarding process',
    category: 'customer',
    triggers: ['Payment Completed'],
    actions: ['Send Welcome Package', 'Create Account', 'Schedule Kickoff'],
    isActive: true,
    color: 'green'
  },
  {
    id: 'event_reminder',
    name: 'Event Reminder System',
    description: 'Send automated reminders for upcoming events',
    category: 'events',
    triggers: ['Event Created', 'Time-based'],
    actions: ['Send Email Reminder', 'SMS Notification', 'Calendar Invite'],
    isActive: true,
    color: 'orange'
  },
  {
    id: 'feedback_collection',
    name: 'Feedback Collection',
    description: 'Automatically collect feedback from customers',
    category: 'feedback',
    triggers: ['Service Completed'],
    actions: ['Send Survey', 'Request Review', 'Follow-up Email'],
    isActive: false,
    color: 'yellow'
  }
];

// AI-powered automation suggestions
const aiSuggestions = [
  {
    id: 'lead_scoring',
    title: 'AI Lead Scoring',
    description: 'Automatically score leads based on behavior and engagement',
    impact: 'High',
    effort: 'Medium',
    savings: '15 hours/week'
  },
  {
    id: 'content_optimization',
    title: 'Content Optimization',
    description: 'AI-powered SEO optimization for blog posts',
    impact: 'Medium',
    effort: 'Low',
    savings: '8 hours/week'
  },
  {
    id: 'email_optimization',
    title: 'Email Send Time Optimization',
    description: 'AI determines optimal send times for each recipient',
    impact: 'Medium',
    effort: 'Low',
    savings: '5 hours/week'
  }
];

const AutomationCenter = ({ onClose, addNotification }) => {
  const [loading, setLoading] = useState(true);
  const [automationRules, setAutomationRules] = useState([]);
  const [workflows, setWorkflows] = useState(workflowTemplates);
  const [activeTab, setActiveTab] = useState('workflows');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // Form data for creating/editing workflows
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    trigger_type: '',
    trigger_conditions: {},
    actions: [],
    is_active: true
  });

  useEffect(() => {
    loadAutomationData();
  }, []);

  const loadAutomationData = async () => {
    try {
      setLoading(true);

      // Load automation rules from database
      const { data: rules, error } = await supabase
        .from('automation_rules')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setAutomationRules(rules || []);

      // Merge with templates
      const mergedWorkflows = [
        ...workflowTemplates,
        ...(rules || []).map(rule => ({
          id: rule.id,
          name: rule.name,
          description: rule.description,
          category: 'custom',
          triggers: [rule.trigger_type],
          actions: rule.actions || [],
          isActive: rule.is_active,
          color: 'indigo',
          isCustom: true
        }))
      ];

      setWorkflows(mergedWorkflows);

    } catch (error) {
      console.error('Error loading automation data:', error);
      addNotification('Failed to load automation data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWorkflow = async (workflowData) => {
    try {
      const { data, error } = await supabase
        .from('automation_rules')
        .insert([{
          ...workflowData,
          created_at: new Date().toISOString(),
          execution_count: 0
        }])
        .select()
        .single();

      if (error) throw error;

      setAutomationRules(prev => [data, ...prev]);
      addNotification('Automation workflow created successfully', 'success');
      closeModal();
      loadAutomationData();

    } catch (error) {
      console.error('Error creating workflow:', error);
      addNotification('Failed to create workflow', 'error');
    }
  };

  const handleToggleWorkflow = async (workflowId, isActive) => {
    try {
      if (workflowTemplates.find(w => w.id === workflowId)) {
        // For templates, just update local state
        setWorkflows(prev => prev.map(w => 
          w.id === workflowId ? { ...w, isActive: !isActive } : w
        ));
        addNotification(`Workflow ${!isActive ? 'activated' : 'deactivated'}`, 'success');
      } else {
        // For custom workflows, update database
        const { error } = await supabase
          .from('automation_rules')
          .update({ is_active: !isActive })
          .eq('id', workflowId);

        if (error) throw error;

        setWorkflows(prev => prev.map(w => 
          w.id === workflowId ? { ...w, isActive: !isActive } : w
        ));
        addNotification(`Workflow ${!isActive ? 'activated' : 'deactivated'}`, 'success');
      }
    } catch (error) {
      console.error('Error toggling workflow:', error);
      addNotification('Failed to toggle workflow', 'error');
    }
  };

  const openModal = (type, workflow = null) => {
    setModalType(type);
    setSelectedWorkflow(workflow);
    
    if (workflow) {
      setFormData({
        name: workflow.name || '',
        description: workflow.description || '',
        category: workflow.category || '',
        trigger_type: workflow.triggers?.[0] || '',
        trigger_conditions: {},
        actions: workflow.actions || [],
        is_active: workflow.isActive !== false
      });
    } else {
      setFormData({
        name: '',
        description: '',
        category: '',
        trigger_type: '',
        trigger_conditions: {},
        actions: [],
        is_active: true
      });
    }
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedWorkflow(null);
  };

  const tabs = [
    { id: 'workflows', label: 'Workflows', icon: Workflow, color: 'blue' },
    { id: 'ai', label: 'AI Suggestions', icon: Bot, color: 'purple' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'green' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'gray' }
  ];

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'content', label: 'Content' },
    { value: 'customer', label: 'Customer' },
    { value: 'events', label: 'Events' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'custom', label: 'Custom' }
  ];

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || workflow.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading automation center...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Automation Center</h2>
          <p className="text-gray-600 dark:text-gray-400">Automate your business processes with AI</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => openModal('create')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Workflow</span>
          </button>
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
          {activeTab === 'workflows' && (
            <WorkflowsTab
              workflows={filteredWorkflows}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              categories={categories}
              onToggleWorkflow={handleToggleWorkflow}
              onEditWorkflow={(workflow) => openModal('edit', workflow)}
              onCreateWorkflow={() => openModal('create')}
            />
          )}
          {activeTab === 'ai' && (
            <AISuggestionsTab suggestions={aiSuggestions} />
          )}
          {activeTab === 'analytics' && (
            <AnalyticsTab automationRules={automationRules} />
          )}
          {activeTab === 'settings' && (
            <SettingsTab />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <WorkflowModal
            type={modalType}
            workflow={selectedWorkflow}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleCreateWorkflow}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Workflows Tab Component
const WorkflowsTab = ({ 
  workflows, 
  searchTerm, 
  setSearchTerm, 
  filterCategory, 
  setFilterCategory, 
  categories, 
  onToggleWorkflow, 
  onEditWorkflow, 
  onCreateWorkflow 
}) => {
  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search workflows..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white w-full sm:w-64"
              />
            </div>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={onCreateWorkflow}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Workflow</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Workflows</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{workflows.length}</p>
            </div>
            <Workflow className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
              <p className="text-2xl font-bold text-green-600">{workflows.filter(w => w.isActive).length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
              <p className="text-2xl font-bold text-purple-600">1,234</p>
            </div>
            <Activity className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Time Saved</p>
              <p className="text-2xl font-bold text-orange-600">42h</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Workflows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.map(workflow => (
          <WorkflowCard
            key={workflow.id}
            workflow={workflow}
            onToggle={onToggleWorkflow}
            onEdit={onEditWorkflow}
          />
        ))}
      </div>

      {workflows.length === 0 && (
        <div className="text-center py-12">
          <Workflow className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No workflows found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchTerm || filterCategory ? 'Try adjusting your filters' : 'Create your first automation workflow'}
          </p>
          <button
            onClick={onCreateWorkflow}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Create Workflow
          </button>
        </div>
      )}
    </div>
  );
};

// Workflow Card Component
const WorkflowCard = ({ workflow, onToggle, onEdit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg bg-${workflow.color}-100 dark:bg-${workflow.color}-900/20`}>
            <Workflow className={`w-6 h-6 text-${workflow.color}-600`} />
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggle(workflow.id, workflow.isActive)}
              className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${
                workflow.isActive ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${
                workflow.isActive ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
            {workflow.isCustom && (
              <button
                onClick={() => onEdit(workflow)}
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {workflow.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {workflow.description}
        </p>
        
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Triggers:</p>
            <div className="flex flex-wrap gap-1">
              {workflow.triggers.map(trigger => (
                <span
                  key={trigger}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {trigger}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Actions:</p>
            <div className="flex flex-wrap gap-1">
              {workflow.actions.slice(0, 2).map(action => (
                <span
                  key={action}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  {action}
                </span>
              ))}
              {workflow.actions.length > 2 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                  +{workflow.actions.length - 2} more
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
            workflow.isActive 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
          }`}>
            {workflow.isActive ? 'Active' : 'Inactive'}
          </span>
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {workflow.category}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// AI Suggestions Tab
const AISuggestionsTab = ({ suggestions }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <Bot className="w-8 h-8 text-purple-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI-Powered Suggestions</h3>
            <p className="text-gray-600 dark:text-gray-400">Intelligent automation recommendations based on your data</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {suggestions.map(suggestion => (
            <div key={suggestion.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-gray-900 dark:text-white">{suggestion.title}</h4>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                    suggestion.impact === 'High' ? 'bg-red-100 text-red-800' :
                    suggestion.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {suggestion.impact} Impact
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                    suggestion.effort === 'High' ? 'bg-red-100 text-red-800' :
                    suggestion.effort === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {suggestion.effort} Effort
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{suggestion.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <Clock className="w-4 h-4" />
                  <span>Saves {suggestion.savings}</span>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm">
                  Implement
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Analytics Tab
const AnalyticsTab = ({ automationRules }) => {
  const stats = [
    { label: 'Total Executions', value: '12,456', change: '+15.3%', trend: 'up' },
    { label: 'Success Rate', value: '98.7%', change: '+0.5%', trend: 'up' },
    { label: 'Time Saved', value: '142h', change: '+23.1%', trend: 'up' },
    { label: 'Cost Savings', value: '₹45,000', change: '+18.7%', trend: 'up' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              <div className={`flex items-center space-x-1 text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{stat.change}</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Execution Trends</h3>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Execution trend chart</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance by Workflow</h3>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Performance chart</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Workflows */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Performing Workflows</h3>
        <div className="space-y-3">
          {automationRules.slice(0, 5).map((rule, index) => (
            <div key={rule.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-sm">{index + 1}</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{rule.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Executed {rule.execution_count || 0} times
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold text-green-600">98.5%</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Settings Tab
const SettingsTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Automation Settings</h3>
        
        <div className="space-y-6">
          {/* Global Settings */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Global Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Enable Automation</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Master switch for all automation</p>
                </div>
                <div className="w-12 h-6 bg-green-500 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 translate-x-6 transition-transform duration-200" />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Error Notifications</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get notified of automation failures</p>
                </div>
                <div className="w-12 h-6 bg-green-500 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 translate-x-6 transition-transform duration-200" />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Debug Mode</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Enable detailed logging</p>
                </div>
                <div className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 translate-x-0.5 transition-transform duration-200" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Rate Limits */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Rate Limits</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-gray-700 dark:text-gray-300">Max executions per minute</label>
                <input
                  type="number"
                  defaultValue="100"
                  className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-gray-700 dark:text-gray-300">Retry attempts</label>
                <input
                  type="number"
                  defaultValue="3"
                  className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
          
          {/* Integrations */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Integrations</h4>
            <div className="space-y-3">
              {['Email Service', 'SMS Provider', 'CRM System', 'Analytics'].map(integration => (
                <div key={integration} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">{integration}</span>
                  <span className="text-green-600 text-sm">Connected</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Workflow Modal
const WorkflowModal = ({ type, workflow, formData, setFormData, onSubmit, onClose }) => {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {type === 'create' ? 'Create Automation Workflow' : 'Edit Workflow'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Workflow Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Enter workflow name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Describe what this workflow does..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Category</option>
                <option value="marketing">Marketing</option>
                <option value="content">Content</option>
                <option value="customer">Customer</option>
                <option value="events">Events</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Trigger Type
              </label>
              <select
                value={formData.trigger_type}
                onChange={(e) => setFormData(prev => ({ ...prev, trigger_type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Trigger</option>
                <option value="New Lead Created">New Lead Created</option>
                <option value="Blog Post Published">Blog Post Published</option>
                <option value="Payment Completed">Payment Completed</option>
                <option value="Event Created">Event Created</option>
                <option value="Service Completed">Service Completed</option>
                <option value="Time-based">Time-based</option>
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="is_active" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Activate workflow immediately
            </label>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
            >
              {loading && <Loader className="w-4 h-4 animate-spin" />}
              <span>{loading ? 'Saving...' : type === 'create' ? 'Create Workflow' : 'Update Workflow'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AutomationCenter;
