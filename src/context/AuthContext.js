import React, { createContext, useState, useEffect } from 'react';
import { apiLogin, apiRegister, apiLogout, apiCheckAuth } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setLoading(true);
        const userData = await apiCheckAuth();
        if (userData) {
          setCurrentUser(userData);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        // No need to set error here as this is just a check
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const userData = await apiLogin(email, password);
      setCurrentUser(userData);
      return userData;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const newUser = await apiRegister(userData);
      setCurrentUser(newUser);
      return newUser;
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      await apiLogout();
      setCurrentUser(null);
    } catch (err) {
      setError(err.message || 'Logout failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update user function
  const updateUser = (userData) => {
    setCurrentUser(prevUser => ({
      ...prevUser,
      ...userData
    }));
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};