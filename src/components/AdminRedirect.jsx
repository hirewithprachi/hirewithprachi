import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const AdminRedirect = () => {
  useEffect(() => {
    // Optional: Add any logging or analytics here
    console.log('Admin redirect: /admin -> /admin/login');
  }, []);

  return <Navigate to="/admin/login" replace />;
};

export default AdminRedirect; 