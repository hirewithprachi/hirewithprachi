import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, adminInfo, loading } = useAuth();

  // Show loading only if auth is still loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading authentication...</p>
        </div>
      </div>
    );
  }

  // If no user or no admin info, redirect to login
  if (!user || !adminInfo) {
    console.log('❌ Access denied - redirecting to admin login');
    return <Navigate to="/admin/login" replace />;
  }

  // If admin, show the protected content
  console.log('✅ Admin access granted - showing protected content');
  return children;
};

export default AdminRoute; 