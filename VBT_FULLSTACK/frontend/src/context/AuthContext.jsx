import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/api';

// Auth Context oluşturma
const AuthContext = createContext(null);

// Auth Provider bileşeni
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Uygulama başladığında localStorage'dan kullanıcı bilgilerini al
  useEffect(() => {
    const initAuth = () => {
      try {
        const user = authService.getCurrentUser();
        if (user) {
          setCurrentUser(user);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Kayıt işlemi
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      return response;
    } catch (err) {
      setError(err.message || 'Kayıt işlemi başarısız oldu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Giriş işlemi
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.login(credentials);
      setCurrentUser(data.user);
      return data;
    } catch (err) {
      setError(err.message || 'Giriş başarısız oldu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sosyal medya ile giriş
  const socialLogin = async (provider, userData) => {
    // Gerçek implementasyonda, backend'e sosyal medya token'ı gönderilir
    // Şimdilik simüle ediyoruz
    setCurrentUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', 'social-auth-token-example');
    return userData;
  };

  // Çıkış işlemi
  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  // Context değerleri
  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    socialLogin,
    logout,
    isAuthenticated: authService.isAuthenticated
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Auth Context hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;