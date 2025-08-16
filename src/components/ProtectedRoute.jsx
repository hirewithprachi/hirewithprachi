import React from 'react';
import { useAuth } from '../lib/AuthContext';
import AdminLogin from './AdminLogin';

const ProtectedRoute = ({ children, requireAdmin = true }) => {
  const { user, loading } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If no user, show login
  if (!user) {
    return <AdminLogin />;
  }

  // If admin access is required, check user role
  if (requireAdmin) {
    // For now, we'll allow any authenticated user to access admin
    // In production, you should check the user's role using the RPC function
    return children;
  }

  // User is authenticated and has required permissions
  return children;
};

export default ProtectedRoute;
