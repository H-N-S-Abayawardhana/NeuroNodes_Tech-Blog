// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create auth context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on load
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('blog_admin_token');
      const expiry = localStorage.getItem('blog_token_expiry');
      
      if (token && expiry) {
        // Check if token is expired
        if (new Date().getTime() < parseInt(expiry)) {
          setIsAuthenticated(true);
        } else {
          // Clear expired token
          localStorage.removeItem('blog_admin_token');
          localStorage.removeItem('blog_token_expiry');
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = (password) => {
    return new Promise((resolve, reject) => {
      // This would typically validate against an API
      // For this no-backend solution, we're checking against a hard-coded value
      // In a real app, you would use import.meta.env.VITE_ADMIN_PASSWORD
      const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'demo123'; // Default for dev only
      
      if (password === adminPassword) {
        // Set 24 hour expiry
        const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
        
        // Store auth token (simple implementation)
        localStorage.setItem('blog_admin_token', 'admin_authenticated');
        localStorage.setItem('blog_token_expiry', expiryTime);
        
        setIsAuthenticated(true);
        resolve(true);
      } else {
        reject(new Error('Invalid password'));
      }
    });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('blog_admin_token');
    localStorage.removeItem('blog_token_expiry');
    setIsAuthenticated(false);
  };

  // Provide auth context value
  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;