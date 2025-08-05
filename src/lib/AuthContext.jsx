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
        console.log('🔍 Getting initial session...');
        const { data: { session } } = await supabase.auth.getSession();
        console.log('📋 Session data:', session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          console.log('👤 User found, loading admin info...');
          await loadAdminInfo(session.user.id);
        } else {
          console.log('❌ No user in session');
        }
      } catch (error) {
        console.error('❌ Error getting initial session:', error);
      } finally {
        console.log('✅ Setting loading to false');
        setLoading(false);
      }
    };

    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.log('⏰ Authentication timeout - forcing loading to false');
      setLoading(false);
    }, 10000); // 10 second timeout

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state change:', event, session);
        clearTimeout(timeoutId); // Clear timeout on auth change
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await loadAdminInfo(session.user.id);
        } else {
          setAdminInfo(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []);

  const loadAdminInfo = async (userId) => {
    try {
      console.log('🔍 Loading admin info for user:', userId);
      
      // Use direct query to admin_users table
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .single();
        
      console.log('📋 Admin query result:', { data, error });
        
      if (!error && data) {
        console.log('✅ Admin info loaded successfully:', data);
        setAdminInfo(data);
      } else {
        console.error('❌ Error loading admin info:', error);
        setAdminInfo(null);
      }
    } catch (error) {
      console.error('❌ Error loading admin info:', error);
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