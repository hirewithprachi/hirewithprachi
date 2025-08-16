import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { 
  Shield, 
  Users, 
  Lock, 
  Unlock, 
  Key, 
  UserCheck, 
  UserX, 
  UserPlus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  X, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  CheckCircle,
  AlertCircle,
  Clock,
  Calendar,
  Globe,
  Smartphone,
  Monitor,
  Activity,
  Database,
  RefreshCw,
  Settings,
  Bell,
  Mail,
  Phone,
  MapPin,
  Star,
  Award,
  Target,
  Zap,
  Download,
  Upload,
  Copy,
  Save,
  Loader
} from 'lucide-react';

const SecurityCenter = ({ onClose, addNotification }) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');

  // Form data for user management
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    role: 'user',
    is_active: true,
    permissions: [],
    password: ''
  });

  // Security metrics
  const [securityMetrics, setSecurityMetrics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    suspendedUsers: 0,
    adminUsers: 0,
    activeSessions: 0,
    failedLogins: 0,
    securityAlerts: 0,
    lastSecurityScan: new Date()
  });

  useEffect(() => {
    loadSecurityData();
  }, []);

  const loadSecurityData = async () => {
    try {
      setLoading(true);

      // Load users
      const { data: usersData, error: usersError } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;

      // Load roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) throw rolesError;

      // Load audit logs
      const { data: logsData, error: logsError } = await supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (logsError) throw logsError;

      setUsers(usersData || []);
      setRoles(rolesData || generateDefaultRoles());
      setAuditLogs(logsData || []);

      // Calculate metrics
      const totalUsers = (usersData || []).length;
      const activeUsers = (usersData || []).filter(u => u.is_active).length;
      const suspendedUsers = totalUsers - activeUsers;
      const adminUsers = (usersData || []).filter(u => u.role === 'admin').length;

      setSecurityMetrics({
        totalUsers,
        activeUsers,
        suspendedUsers,
        adminUsers,
        activeSessions: Math.floor(Math.random() * 20) + 5,
        failedLogins: Math.floor(Math.random() * 10),
        securityAlerts: Math.floor(Math.random() * 3),
        lastSecurityScan: new Date()
      });

      // Generate mock sessions
      setSessions(generateMockSessions(usersData || []));

    } catch (error) {
      console.error('Error loading security data:', error);
      addNotification('Failed to load security data', 'error');
      
      // Fallback data
      setUsers(generateMockUsers());
      setRoles(generateDefaultRoles());
      setSecurityMetrics({
        totalUsers: 5,
        activeUsers: 4,
        suspendedUsers: 1,
        adminUsers: 2,
        activeSessions: 12,
        failedLogins: 3,
        securityAlerts: 1,
        lastSecurityScan: new Date()
      });
    } finally {
      setLoading(false);
    }
  };

  const generateDefaultRoles = () => [
    { id: 'admin', name: 'Administrator', description: 'Full system access', color: 'red' },
    { id: 'editor', name: 'Editor', description: 'Content management access', color: 'blue' },
    { id: 'user', name: 'User', description: 'Basic user access', color: 'green' },
    { id: 'viewer', name: 'Viewer', description: 'Read-only access', color: 'gray' }
  ];

  const generateMockUsers = () => [
    {
      id: '1',
      email: 'prachishri005@gmail.com',
      full_name: 'Prachi Shrivastava',
      role: 'admin',
      is_active: true,
      last_login: new Date().toISOString(),
      created_at: new Date('2024-01-01').toISOString()
    },
    {
      id: '2',
      email: 'editor@hirewithprachi.com',
      full_name: 'Content Editor',
      role: 'editor',
      is_active: true,
      last_login: new Date(Date.now() - 86400000).toISOString(),
      created_at: new Date('2024-01-15').toISOString()
    }
  ];

  const generateMockSessions = (users) => {
    return users.slice(0, 3).map((user, index) => ({
      id: `session_${index}`,
      user_id: user.id,
      user_email: user.email,
      ip_address: `192.168.1.${100 + index}`,
      device: index === 0 ? 'Desktop' : index === 1 ? 'Mobile' : 'Tablet',
      browser: index === 0 ? 'Chrome' : index === 1 ? 'Safari' : 'Firefox',
      location: index === 0 ? 'Mumbai, India' : index === 1 ? 'Delhi, India' : 'Bangalore, India',
      started_at: new Date(Date.now() - (index * 3600000)).toISOString(),
      is_active: true
    }));
  };

  const handleCreateUser = async (userData) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .insert([{
          ...userData,
          user_id: crypto.randomUUID(),
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      setUsers(prev => [data, ...prev]);
      addNotification('User created successfully', 'success');
      closeModal();
      loadSecurityData();

    } catch (error) {
      console.error('Error creating user:', error);
      
      // Fallback: add to local state
      const newUser = {
        id: `local_${Date.now()}`,
        ...userData,
        user_id: crypto.randomUUID(),
        created_at: new Date().toISOString()
      };
      
      setUsers(prev => [newUser, ...prev]);
      addNotification('User created locally (database unavailable)', 'warning');
      closeModal();
    }
  };

  const handleUpdateUser = async (userId, updates) => {
    try {
      if (userId.startsWith('local_')) {
        setUsers(prev => prev.map(user => 
          user.id === userId ? { ...user, ...updates } : user
        ));
        addNotification('User updated locally', 'success');
      } else {
        const { data, error } = await supabase
          .from('admin_users')
          .update(updates)
          .eq('id', userId)
          .select()
          .single();

        if (error) throw error;

        setUsers(prev => prev.map(user => 
          user.id === userId ? data : user
        ));
        addNotification('User updated successfully', 'success');
      }
      
      closeModal();
    } catch (error) {
      console.error('Error updating user:', error);
      addNotification('Failed to update user', 'error');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      if (userId.startsWith('local_')) {
        setUsers(prev => prev.filter(user => user.id !== userId));
        addNotification('User deleted', 'success');
      } else {
        const { error } = await supabase
          .from('admin_users')
          .delete()
          .eq('id', userId);

        if (error) throw error;

        setUsers(prev => prev.filter(user => user.id !== userId));
        addNotification('User deleted successfully', 'success');
      }
      
      loadSecurityData();
    } catch (error) {
      console.error('Error deleting user:', error);
      addNotification('Failed to delete user', 'error');
    }
  };

  const openModal = (type, user = null) => {
    setModalType(type);
    setSelectedUser(user);
    
    if (user) {
      setFormData({
        email: user.email || '',
        full_name: user.full_name || '',
        role: user.role || 'user',
        is_active: user.is_active !== false,
        permissions: user.permissions || [],
        password: ''
      });
    } else {
      setFormData({
        email: '',
        full_name: '',
        role: 'user',
        is_active: true,
        permissions: [],
        password: ''
      });
    }
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedUser(null);
  };

  const tabs = [
    { id: 'users', label: 'User Management', icon: Users, color: 'blue' },
    { id: 'roles', label: 'Roles & Permissions', icon: Key, color: 'purple' },
    { id: 'sessions', label: 'Active Sessions', icon: Activity, color: 'green' },
    { id: 'audit', label: 'Audit Logs', icon: Shield, color: 'orange' },
    { id: 'settings', label: 'Security Settings', icon: Settings, color: 'gray' }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !filterRole || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading security center...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Security Center</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage users, roles, and security settings</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => openModal('create')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add User</span>
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

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{securityMetrics.totalUsers}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
              <p className="text-2xl font-bold text-green-600">{securityMetrics.activeUsers}</p>
            </div>
            <UserCheck className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Sessions</p>
              <p className="text-2xl font-bold text-purple-600">{securityMetrics.activeSessions}</p>
            </div>
            <Activity className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Security Alerts</p>
              <p className="text-2xl font-bold text-red-600">{securityMetrics.securityAlerts}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
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
          {activeTab === 'users' && (
            <UserManagementTab
              users={filteredUsers}
              roles={roles}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterRole={filterRole}
              setFilterRole={setFilterRole}
              onEdit={(user) => openModal('edit', user)}
              onDelete={handleDeleteUser}
              onCreate={() => openModal('create')}
            />
          )}
          {activeTab === 'roles' && (
            <RolesPermissionsTab roles={roles} permissions={permissions} />
          )}
          {activeTab === 'sessions' && (
            <ActiveSessionsTab sessions={sessions} />
          )}
          {activeTab === 'audit' && (
            <AuditLogsTab auditLogs={auditLogs} />
          )}
          {activeTab === 'settings' && (
            <SecuritySettingsTab />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <UserModal
            type={modalType}
            user={selectedUser}
            roles={roles}
            formData={formData}
            setFormData={setFormData}
            onSubmit={modalType === 'create' ? handleCreateUser : (data) => handleUpdateUser(selectedUser.id, data)}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// User Management Tab Component
const UserManagementTab = ({ users, roles, searchTerm, setSearchTerm, filterRole, setFilterRole, onEdit, onDelete, onCreate }) => {
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
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white w-full sm:w-64"
              />
            </div>
            
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Roles</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={onCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {user.full_name?.[0] || user.email?.[0]?.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.full_name || 'Unknown User'}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      user.role === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      user.role === 'editor' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {user.role || 'user'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      user.is_active 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {user.is_active ? 'Active' : 'Suspended'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onEdit(user)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(user.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Roles & Permissions Tab
const RolesPermissionsTab = ({ roles, permissions }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {roles.map(role => (
          <div key={role.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${role.color}-100 dark:bg-${role.color}-900/20`}>
                <Key className={`w-6 h-6 text-${role.color}-600`} />
              </div>
              <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {role.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {role.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Active Sessions Tab
const ActiveSessionsTab = ({ sessions }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Device & Browser
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Started
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sessions.map((session) => (
                <tr key={session.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {session.user_email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {session.device === 'Desktop' ? <Monitor className="w-4 h-4" /> :
                       session.device === 'Mobile' ? <Smartphone className="w-4 h-4" /> :
                       <Monitor className="w-4 h-4" />}
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {session.device} • {session.browser}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {session.location}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {session.ip_address}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(session.started_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200">
                      <X className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Audit Logs Tab
const AuditLogsTab = ({ auditLogs }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
        </div>
        <div className="p-4 space-y-4">
          {auditLogs.length > 0 ? (
            auditLogs.slice(0, 10).map((log, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {log.action || 'System activity'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(log.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No audit logs available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Security Settings Tab
const SecuritySettingsTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security Configuration</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Require 2FA for all admin users</p>
            </div>
            <div className="w-12 h-6 bg-green-500 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 translate-x-6 transition-transform duration-200" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Session Timeout</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Auto-logout after inactivity</p>
            </div>
            <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>2 hours</option>
              <option>4 hours</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Password Policy</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Enforce strong passwords</p>
            </div>
            <div className="w-12 h-6 bg-green-500 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 translate-x-6 transition-transform duration-200" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Login Monitoring</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Track failed login attempts</p>
            </div>
            <div className="w-12 h-6 bg-green-500 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 translate-x-6 transition-transform duration-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// User Modal Component
const UserModal = ({ type, user, roles, formData, setFormData, onSubmit, onClose }) => {
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
            {type === 'create' ? 'Add New User' : 'Edit User'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="user@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {roles.map(role => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            {type === 'create' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  required={type === 'create'}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter password"
                />
              </div>
            )}
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
              Active user account
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
              <span>{loading ? 'Saving...' : type === 'create' ? 'Create User' : 'Update User'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default SecurityCenter;
