import React, { useEffect, useState, useMemo } from "react";

export const AuthContext = React.createContext();

const Auth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    setIsAuthenticated(false);
  }, []);

  async function login(email, password) {
    const userData = {
      user: "Nil Quera",
      email: "nlquera97@gmail.com"
    };

    if (email === "nlquera97@gmail.com") {
      setUser(userData);
      setIsAuthenticated(true);
    }

    console.log(user);
    console.log(isAuthenticated);
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
      loadingUser,
      login,
      signup,
      logout
    };
  }, [user, loadingUser, isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default Auth;
