import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const response = await fetch("http://localhost:2000/api/user/checkUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      setIsAuthenticated(response.ok);
    } catch (error) {
      console.error("Error checking authentication status:", error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthStatus(); 
  }, []); 

  const login = async (token) => {
    localStorage.setItem("authToken", `Bearer ${token}`);
    await checkAuthStatus(); 
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
