import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const MOCK_AUTH_KEY = 'nexuratask_pro_mock_user';
const LEGACY_MOCK_AUTH_KEY = 'taskflow_pro_mock_user';

/**
 * Custom hook for managing Supabase Authentication state and operations.
 * Gracefully switches to local interactive demo state if Supabase environment keys are omitted.
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      // Fallback local demo auth session
      let stored = localStorage.getItem(MOCK_AUTH_KEY);
      if (!stored) {
        stored = localStorage.getItem(LEGACY_MOCK_AUTH_KEY);
      }
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          setUser(null);
        }
      }
      setLoading(false);
      return;
    }

    // 1. Retrieve initial auth session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setUser(session?.user ?? null);
      } catch (err) {
        console.error('Error fetching session:', err.message);
        setAuthError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // 2. Subscribe to auth state updates (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign up handler
  const signUp = async (email, password) => {
    setAuthError(null);
    if (!isSupabaseConfigured) {
      const mockUser = {
        id: 'demo-user-777',
        email,
        user_metadata: { name: email.split('@')[0] },
      };
      localStorage.setItem(MOCK_AUTH_KEY, JSON.stringify(mockUser));
      setUser(mockUser);
      return { user: mockUser, error: null };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      return { user: data.user, error: null };
    } catch (err) {
      setAuthError(err.message);
      return { user: null, error: err.message };
    }
  };

  // Sign in handler
  const signIn = async (email, password) => {
    setAuthError(null);
    if (!isSupabaseConfigured) {
      const mockUser = {
        id: 'demo-user-777',
        email,
        user_metadata: { name: email.split('@')[0] },
      };
      localStorage.setItem(MOCK_AUTH_KEY, JSON.stringify(mockUser));
      setUser(mockUser);
      return { user: mockUser, error: null };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return { user: data.user, error: null };
    } catch (err) {
      setAuthError(err.message);
      return { user: null, error: err.message };
    }
  };

  // Sign out handler
  const signOut = async () => {
    if (!isSupabaseConfigured) {
      localStorage.removeItem(MOCK_AUTH_KEY);
      setUser(null);
      return;
    }
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err.message);
    }
  };

  return {
    user,
    loading,
    authError,
    signUp,
    signIn,
    signOut,
    isDemo: !isSupabaseConfigured,
  };
}
