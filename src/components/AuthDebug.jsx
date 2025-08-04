import React, { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { supabase, isSupabaseAvailable } from '../lib/supabase';

const AuthDebug = () => {
  const { user, loading, adminInfo, networkStatus } = useAuth();
  const [testResults, setTestResults] = useState({});

  const testSupabaseConnection = async () => {
    try {
      console.log('🧪 Testing Supabase connection...');
      setTestResults(prev => ({ ...prev, connection: 'testing' }));
      
      const { data, error } = await supabase.from('admin_users').select('count').limit(1);
      console.log('✅ Supabase connection test:', { data, error });
      
      if (error) {
        setTestResults(prev => ({ ...prev, connection: { success: false, error: error.message } }));
        return { success: false, error };
      }
      
      setTestResults(prev => ({ ...prev, connection: { success: true, data } }));
      return { success: true, error: null };
    } catch (err) {
      console.error('❌ Supabase connection test failed:', err);
      setTestResults(prev => ({ ...prev, connection: { success: false, error: err.message } }));
      return { success: false, error: err };
    }
  };

  const testAdminCheck = async () => {
    if (!user) {
      console.log('❌ No user to test admin check');
      setTestResults(prev => ({ ...prev, admin: { success: false, error: 'No user logged in' } }));
      return;
    }
    
    try {
      console.log('🧪 Testing admin check for user:', user.email);
      setTestResults(prev => ({ ...prev, admin: 'testing' }));
      
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();
      
      console.log('✅ Admin check test:', { data, error });
      
      if (error) {
        setTestResults(prev => ({ ...prev, admin: { success: false, error: error.message } }));
        return { success: false, data: null, error };
      }
      
      setTestResults(prev => ({ ...prev, admin: { success: true, data } }));
      return { success: true, data, error: null };
    } catch (err) {
      console.error('❌ Admin check test failed:', err);
      setTestResults(prev => ({ ...prev, admin: { success: false, error: err.message } }));
      return { success: false, error: err };
    }
  };

  const testNetworkConnectivity = async () => {
    try {
      console.log('🧪 Testing network connectivity...');
      setTestResults(prev => ({ ...prev, network: 'testing' }));
      
      const response = await fetch('https://httpbin.org/get', { 
        method: 'GET',
        mode: 'cors'
      });
      
      if (response.ok) {
        console.log('✅ Network connectivity test successful');
        setTestResults(prev => ({ ...prev, network: { success: true, status: response.status } }));
        return { success: true };
      } else {
        console.log('⚠️ Network connectivity test failed with status:', response.status);
        setTestResults(prev => ({ ...prev, network: { success: false, status: response.status } }));
        return { success: false, status: response.status };
      }
    } catch (err) {
      console.error('❌ Network connectivity test failed:', err);
      setTestResults(prev => ({ ...prev, network: { success: false, error: err.message } }));
      return { success: false, error: err };
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online': return '🟢';
      case 'offline': return '🔴';
      case 'checking': return '🟡';
      default: return '⚪';
    }
  };

  const getTestResultIcon = (result) => {
    if (result === 'testing') return '🔄';
    if (result?.success) return '✅';
    if (result?.success === false) return '❌';
    return '⚪';
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-sm z-50">
      <h3 className="font-bold text-sm mb-2">🔧 Auth Debug</h3>
      <div className="text-xs space-y-1">
        <div>Loading: {loading ? '🔄 Yes' : '✅ No'}</div>
        <div>Network: {getStatusIcon(networkStatus)} {networkStatus}</div>
        <div>User: {user ? `✅ ${user.email}` : '❌ None'}</div>
        <div>Admin: {adminInfo ? '✅ Loaded' : '❌ None'}</div>
        
        {/* Test Results */}
        <div className="mt-2 pt-2 border-t border-gray-200">
          <div className="font-semibold text-xs mb-1">Test Results:</div>
          <div className="space-y-1">
            <div>Network: {getTestResultIcon(testResults.network)} {testResults.network?.success ? 'OK' : testResults.network?.error || 'Not tested'}</div>
            <div>Connection: {getTestResultIcon(testResults.connection)} {testResults.connection?.success ? 'OK' : testResults.connection?.error || 'Not tested'}</div>
            <div>Admin: {getTestResultIcon(testResults.admin)} {testResults.admin?.success ? 'OK' : testResults.admin?.error || 'Not tested'}</div>
          </div>
        </div>
        
        <div className="mt-2 space-y-1">
          <button 
            onClick={testNetworkConnectivity}
            className="bg-blue-500 text-white px-2 py-1 rounded text-xs w-full"
          >
            Test Network
          </button>
          <button 
            onClick={testSupabaseConnection}
            className="bg-green-500 text-white px-2 py-1 rounded text-xs w-full"
          >
            Test Connection
          </button>
          <button 
            onClick={testAdminCheck}
            className="bg-purple-500 text-white px-2 py-1 rounded text-xs w-full"
          >
            Test Admin
          </button>
        </div>
        
        {/* Network Status Info */}
        {networkStatus === 'offline' && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs">
            <div className="font-semibold text-red-700">⚠️ Network Issue Detected</div>
            <div className="text-red-600">
              Supabase is currently unavailable. This may be due to:
              <ul className="list-disc list-inside mt-1">
                <li>Internet connectivity issues</li>
                <li>DNS resolution problems</li>
                <li>Supabase service being down</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthDebug; 