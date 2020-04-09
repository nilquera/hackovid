import React, { useEffect, useState, useMemo } from "react";

export const AuthContext = React.createContext();

const Auth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsAuthenticated(false);
  }, []);

  async function login(email) {
    setUser(email);
    setIsAuthenticated(true);

    console.log("Auth:", user);
  }

  async function signup(email, password) {
    const userData = {
      user: "Nou Usuari",
      email: "noucorreu@gmail.com"
    };

    setUser(userData);
    setIsAuthenticated(true);
  }

  function logout() {
    setUser(null);
    setIsAuthenticated(false);
  }

  const value = React.useMemo(() => {
    return {
      user,
      isAuthenticated,
      login,
      signup,
      logout
    };
  }, [user, isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default Auth;
