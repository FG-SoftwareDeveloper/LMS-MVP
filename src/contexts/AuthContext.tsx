import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { loginStart, loginSuccess, loginFailure, logout, setLoading } from '../store/slices/authSlice';
import { supabase } from '../services/supabase';

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          const user = {
            id: session.user.id,
            email: session.user.email || '',
            firstName: session.user.user_metadata?.firstName || session.user.email?.split('@')[0] || 'User',
            lastName: session.user.user_metadata?.lastName || '',
            role: 'STUDENT' as const,
            avatar: session.user.user_metadata?.avatar,
            isEmailVerified: !!session.user.email_confirmed_at,
            createdAt: session.user.created_at,
            lastLoginAt: new Date().toISOString(),
          };

          dispatch(loginSuccess({ user, token: session.access_token }));
        } else {
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.error('Session check error:', error);
        dispatch(setLoading(false));
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const user = {
          id: session.user.id,
          email: session.user.email || '',
          firstName: session.user.user_metadata?.firstName || session.user.email?.split('@')[0] || 'User',
          lastName: session.user.user_metadata?.lastName || '',
          role: 'STUDENT' as const,
          avatar: session.user.user_metadata?.avatar,
          isEmailVerified: !!session.user.email_confirmed_at,
          createdAt: session.user.created_at,
          lastLoginAt: new Date().toISOString(),
        };

        dispatch(loginSuccess({ user, token: session.access_token }));
      } else {
        dispatch(logout());
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  const login = async (email: string, password: string) => {
    dispatch(loginStart());

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const user = {
          id: data.user.id,
          email: data.user.email || '',
          firstName: data.user.user_metadata?.firstName || data.user.email?.split('@')[0] || 'User',
          lastName: data.user.user_metadata?.lastName || '',
          role: 'STUDENT' as const,
          avatar: data.user.user_metadata?.avatar,
          isEmailVerified: !!data.user.email_confirmed_at,
          createdAt: data.user.created_at,
          lastLoginAt: new Date().toISOString(),
        };

        dispatch(loginSuccess({ user, token: data.session?.access_token || '' }));
      }
    } catch (error: any) {
      dispatch(loginFailure(error.message || 'Login failed'));
      throw error;
    }
  };

  const register = async (userData: any) => {
    dispatch(loginStart());

    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        const user = {
          id: data.user.id,
          email: data.user.email || '',
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: 'STUDENT' as const,
          avatar: undefined,
          isEmailVerified: !!data.user.email_confirmed_at,
          createdAt: data.user.created_at,
          lastLoginAt: new Date().toISOString(),
        };

        dispatch(loginSuccess({ user, token: data.session?.access_token || '' }));
      }
    } catch (error: any) {
      dispatch(loginFailure(error.message || 'Registration failed'));
      throw error;
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    dispatch(logout());
  };

  const forgotPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
  };

  const resetPassword = async (token: string, password: string) => {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logout: handleLogout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};