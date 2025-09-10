import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';
import { adminConfig } from '../config/environment.js';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        console.log('🔍 Getting initial session...');
        
        // Check if Supabase is properly configured
        if (!supabase.auth) {
          console.error('❌ Supabase auth is not properly configured');
          setError('Supabase configuration error');
          setLoading(false);
          return;
        }

        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('❌ Error getting session:', sessionError);
          setError(sessionError.message);
          setLoading(false);
          return;
        }

        console.log('📋 Session data:', session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('❌ Error getting initial session:', error);
        setError(error.message);
      } finally {
        console.log('✅ Setting loading to false');
        setLoading(false);
      }
    };

    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.log('⏰ Authentication timeout - forcing loading to false');
      setLoading(false);
      setError('Authentication timeout - please refresh the page');
    }, 10000); // 10 second timeout

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state change:', event, session);
        clearTimeout(timeoutId); // Clear timeout on auth change
        setError(null); // Clear any previous errors
        
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;

      // Update user state immediately
      setUser(data.user);
      
      // Wait for user state to be set before checking admin status
      await new Promise(resolve => setTimeout(resolve, 500));

      // Check if user is admin
      const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin_user');
      if (adminError) {
        console.warn('Admin check failed:', adminError.message);
      }

      // Store admin status for later use
      if (isAdmin) {
        console.log('✅ Admin user logged in successfully');
      }

      return { ...data, isAdmin };
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error during sign out:', error);
      setError(error.message);
      // Clear local state even if there's an error
      setUser(null);
    }
  };

  const signUp = async (email, password, userData = {}) => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name || userData.firstName + ' ' + (userData.lastName || ''),
            company: userData.company,
            position: userData.position,
            phone: userData.phone
          }
        }
      });
      
      if (error) throw error;
      
      // If user is created successfully, trigger welcome email automation
      if (data.user) {
        try {
          // Import email automation service
          const { handleUserRegistration } = await import('../lib/automatedEmails');
          
          // Trigger welcome email automation
          console.log('🎉 Triggering welcome email automation for new user');
          await handleUserRegistration(data.user);
        } catch (emailError) {
          console.error('❌ Failed to trigger welcome email automation:', emailError);
          // Don't throw error here as user registration was successful
        }
      }
      
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      setError(null);
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const clearError = () => {
    setError(null);
  };

  // Admin-specific login function
  const signInAsAdmin = async (email = adminConfig.email, password = adminConfig.password) => {
    try {
      setError(null);
      console.log('🔐 Attempting admin login...');
      
      const result = await signIn(email, password);
      
      // Verify admin status
      const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin_user');
      
      if (adminError) {
        throw new Error(`Admin verification failed: ${adminError.message}`);
      }
      
      if (!isAdmin) {
        await supabase.auth.signOut(); // Sign out if not admin
        throw new Error('Access denied: Admin privileges required');
      }
      
      console.log('✅ Admin login successful');
      return { ...result, isAdmin: true };
      
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Check if current user is admin
  const checkAdminStatus = async () => {
    try {
      // Get current user from Supabase auth
      const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !currentUser) {
        console.log('🔍 checkAdminStatus: No authenticated user found');
        return false;
      }
      
      console.log('🔍 checkAdminStatus: Checking admin status for user:', currentUser.email);
      
      const { data: isAdmin, error } = await supabase.rpc('is_admin_user');
      
      if (error) {
        console.error('❌ Admin status check failed:', error.message);
        // Try alternative check by email
        const { data: adminByEmail, error: emailError } = await supabase
          .from('admin_users')
          .select('is_active')
          .eq('email', currentUser.email)
          .eq('is_active', true)
          .single();
          
        if (emailError) {
          console.error('❌ Alternative admin check failed:', emailError.message);
          return false;
        }
        
        console.log('✅ checkAdminStatus: Alternative check result:', !!adminByEmail);
        return !!adminByEmail;
      }
      
      console.log('✅ checkAdminStatus: Result:', isAdmin);
      return isAdmin;
    } catch (error) {
      console.error('❌ Admin status check error:', error);
      return false;
    }
  };

  const value = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signInAsAdmin,
    signOut,
    resetPassword,
    clearError,
    checkAdminStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};