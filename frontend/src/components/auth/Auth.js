import React, { useEffect, useState, useMemo } from "react";
import {
  setUserSession,
  removeUserSession,
  getToken,
  getUser
} from "../../utils/Session";

export const AuthContext = React.createContext();

const Auth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    setIsAuthenticated(true);
    setUser(getUser());
  }, []);

  async function setContextLogin(user, token) {
    //context
    setUser(user);
    setIsAuthenticated(true);
    //sessionStorage
    setUserSession(token, user);
  }

  async function signup(user, token) {
    const userData = {
      user: "Nou Usuari",
      email: "noucorreu@gmail.com"
    };

    //context
    setUser(user);
    setIsAuthenticated(true);
    //sessionStorage
    setUserSession(token, user);
  }

  function setContextLogout() {
    setUser(null);
    setIsAuthenticated(false);
    removeUserSession();
  }

  const value = React.useMemo(() => {
    return {
      user,
      isAuthenticated,
      setContextLogin,
      signup,
      setContextLogout
    };
  }, [user, isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default Auth;
