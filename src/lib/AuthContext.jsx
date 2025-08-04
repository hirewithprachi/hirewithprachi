import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, auth } from './supabase';

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
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await loadAdminInfo(session.user.id);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await loadAdminInfo(session.user.id);
        } else {
          setAdminInfo(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadAdminInfo = async (userId) => {
    try {
      // Check if Supabase is available
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn('⚠️ Supabase not configured - using mock admin info');
        setAdminInfo({
          email: 'prachishri005@gmail.com',
          role: 'admin',
          is_active: true
        });
        return;
      }
      
      const { data, error } = await supabase.rpc('get_admin_info');
      if (!error && data) {
        setAdminInfo(data);
      } else {
        console.error('Error loading admin info:', error);
        setAdminInfo(null);
      }
    } catch (error) {
      console.error('Error loading admin info:', error);
      setAdminInfo(null);
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await auth.signIn(email, password);
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error during sign out:', error);
      // Clear local state even if there's an error
      setUser(null);
      setAdminInfo(null);
    }
  };

  const resetPassword = async (email) => {
    try {
      const { error } = await auth.resetPassword(email);
      if (error) throw error;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    adminInfo,
    loading,
    signIn,
    signOut,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 