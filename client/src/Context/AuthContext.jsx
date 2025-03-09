import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);

  // Function to log in and store the token
  const login = (token) => {
    localStorage.setItem('authToken', token); // Store token in localStorage
    setToken(token); // Update token state
    setIsLoggedIn(true); // Update login state
  };

  // Function to log out and clear the token
  const logout = () => {
    localStorage.removeItem('authToken'); // Remove token from localStorage
    setToken(null); // Clear token state
    setIsLoggedIn(false); // Update login state
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);