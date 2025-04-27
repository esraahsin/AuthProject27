
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, LoginRequest, RegisterRequest, PasswordResetRequest, VerifyEmailRequest, PasswordReset } from '@/types/auth';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  forgotPassword: (data: PasswordResetRequest) => Promise<void>;
  verifyEmail: (data: VerifyEmailRequest) => Promise<boolean>;
  resetPassword: (data: PasswordReset) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  
  // Check for stored token on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('authUser');
      
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          
          // Validate token with backend
          const response = await fetch('http://localhost:8081/api/auth/validate-token', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${parsedUser.token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            setUser(parsedUser);
          } else {
            // Token invalid, remove from storage
            localStorage.removeItem('authUser');
            setUser(null);
          }
        } catch (error) {
          console.error("Auth validation error:", error);
          localStorage.removeItem('authUser');
          setUser(null);
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (data: LoginRequest): Promise<void> => {
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8081/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to login');
      }
      
      const authResponse = await response.json();
      
      // Create user object from response
      const loggedInUser: User = {
        ...authResponse.user,
        token: authResponse.accessToken,
      };
      
      // Save to state and localStorage
      setUser(loggedInUser);
      
      if (data.rememberMe) {
        localStorage.setItem('authUser', JSON.stringify(loggedInUser));
      } else {
        sessionStorage.setItem('authUser', JSON.stringify(loggedInUser));
      }
      
      toast.success("Login successful!");
      navigate('/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to login');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest): Promise<void> => {
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8081/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      
      toast.success("Registration successful! Please check your email for verification.");
      navigate('/login', { state: { registrationSuccess: true } });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem('authUser');
    sessionStorage.removeItem('authUser');
    setUser(null);
    toast.success("Logged out successfully");
    navigate('/login');
  };

  const forgotPassword = async (data: PasswordResetRequest): Promise<void> => {
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8081/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Password reset request failed');
      }
      
      toast.success("Password reset email sent! Please check your inbox.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Password reset request failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (data: VerifyEmailRequest): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8081/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Email verification failed');
      }
      
      toast.success("Email verified successfully! You can now log in.");
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Email verification failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (data: PasswordReset): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8081/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Password reset failed');
      }
      
      toast.success("Password reset successful! You can now log in with your new password.");
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Password reset failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated: !!user, 
      login, 
      register, 
      logout, 
      forgotPassword,
      verifyEmail,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
