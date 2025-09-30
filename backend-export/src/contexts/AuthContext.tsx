import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { loginStart, loginSuccess, loginFailure, logout, setLoading } from '../store/slices/authSlice';

// Dummy user data for testing
const DUMMY_USER = {
  id: '1',
  email: 'admin@learnhub.com',
  firstName: 'John',
  lastName: 'Doe',
  role: 'ADMIN' as const,
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  isEmailVerified: true,
  createdAt: '2024-01-01T00:00:00Z',
  lastLoginAt: new Date().toISOString(),
};

const DUMMY_TOKEN = 'dummy-jwt-token-12345';

// Valid login credentials
const VALID_CREDENTIALS = [
  { email: 'admin@learnhub.com', password: 'admin123' },
  { email: 'user@learnhub.com', password: 'user123' },
  { email: 'student@learnhub.com', password: 'student123' },
  { email: 'instructor@learnhub.com', password: 'instructor123' },
];

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
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        // Simulate token validation with dummy user
        if (token === DUMMY_TOKEN) {
          dispatch(loginSuccess({ user: DUMMY_USER, token }));
        } else {
          dispatch(logout());
        }
      } else {
        dispatch(setLoading(false));
      }
    };

    validateToken();
  }, [dispatch, token]);

  const login = async (email: string, password: string) => {
    dispatch(loginStart());
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if credentials are valid
    const validCredential = VALID_CREDENTIALS.find(
      cred => cred.email === email && cred.password === password
    );
    
    if (validCredential) {
      // Create user based on email
      let user = { ...DUMMY_USER };
      if (email === 'student@learnhub.com') {
        user = { ...user, role: 'STUDENT' as const, firstName: 'Jane', lastName: 'Student' };
      } else if (email === 'instructor@learnhub.com') {
        user = { ...user, role: 'INSTRUCTOR' as const, firstName: 'Mike', lastName: 'Instructor' };
      } else if (email === 'user@learnhub.com') {
        user = { ...user, role: 'STUDENT' as const, firstName: 'Alex', lastName: 'User' };
      }
      
      user.email = email;
      user.lastLoginAt = new Date().toISOString();
      
      dispatch(loginSuccess({
        user,
        token: DUMMY_TOKEN,
      }));
    } else {
      dispatch(loginFailure('Invalid email or password'));
      throw new Error('Invalid email or password');
    }
  };

  const register = async (userData: any) => {
    dispatch(loginStart());
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create new user from registration data
    const newUser = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: 'STUDENT' as const,
      avatar: undefined,
      isEmailVerified: true,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
    
    try {
      dispatch(loginSuccess({
        user: newUser,
        token: DUMMY_TOKEN,
      }));
    } catch (error: any) {
      dispatch(loginFailure('Registration failed'));
      throw error;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const forgotPassword = async (email: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Always succeed for demo purposes
    return Promise.resolve();
  };

  const resetPassword = async (token: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Always succeed for demo purposes
    return Promise.resolve();
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