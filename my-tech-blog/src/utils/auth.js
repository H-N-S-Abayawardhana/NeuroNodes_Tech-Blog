// src/utils/auth.js
/**
 * Authentication utility functions for the admin panel
 */

/**
 * Check if the user is currently authenticated
 * @returns {boolean} - True if authenticated
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('blog_admin_token');
  const expiry = localStorage.getItem('blog_token_expiry');
  
  if (!token || !expiry) {
    return false;
  }
  
  // Check if token is expired
  return new Date().getTime() < parseInt(expiry);
};

/**
 * Authenticate with password
 * @param {string} password - Admin password to check
 * @returns {Promise<boolean>} - Resolves to true if authenticated
 */
export const authenticate = (password) => {
  return new Promise((resolve, reject) => {
    // In a real app, you would validate against an API endpoint
    // For this static implementation, we check against env var
    
    // Use environment variable or fallback (only for development!)
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'demo123';
    
    if (password === adminPassword) {
      // Set token and expiry (24 hours)
      const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
      localStorage.setItem('blog_admin_token', 'admin_authenticated');
      localStorage.setItem('blog_token_expiry', expiryTime.toString());
      
      resolve(true);
    } else {
      reject(new Error('Invalid password'));
    }
  });
};

/**
 * End the current session
 */
export const logout = () => {
  localStorage.removeItem('blog_admin_token');
  localStorage.removeItem('blog_token_expiry');
};

export default {
  isAuthenticated,
  authenticate,
  logout
};