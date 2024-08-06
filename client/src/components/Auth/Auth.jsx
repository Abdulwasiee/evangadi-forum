import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to check authentication status
  const checkAuthStatus = async () => {
    try {
      const response = await fetch("http://localhost:2000/api/user/checkUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authToken") || "",
        },
      });
      setIsAuthenticated(response.ok);
    } catch (error) {
      console.error("Error checking authentication status:", error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthStatus(); // Check auth status when component mounts
  }, []); // Empty dependency array to run once on mount

  // Function to handle login
  const login = async (token) => {
    localStorage.setItem("authToken", `Bearer ${token}`);
    await checkAuthStatus(); // Update auth status after login
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false); // Update auth status after logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
