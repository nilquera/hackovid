import React, { useState } from "react";
import {
  setUserSession,
  removeUserSession,
  getToken,
  getUser
} from "../../utils/Session";

export const AuthContext = React.createContext();

const Auth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(getToken() !== null);
  const [contextUser, setContextUser] = useState(getUser());
  const [contextToken, setContextToken] = useState(getToken());

  async function contextLogin(user, token) {
    //context
    setContextUser(user);
    setContextToken(token);
    setIsAuthenticated(true);
    //localStorage
    setUserSession(token, user);
  }

  async function contextSignup(user, token) {
    //context
    setContextUser(user);
    setContextToken(token);
    setIsAuthenticated(true);
    //localStorage
    setUserSession(token, user);
  }

  function contextLogout() {
    //context
    setContextUser(null);
    setContextToken(null);
    setIsAuthenticated(false);
    //localStorage
    removeUserSession();
  }

  // const value = React.useMemo(() => {
  //   return {
  //     contextUser,
  //     contextToken,
  //     isAuthenticated,
  //     contextLogin,
  //     contextSignup,
  //     contextLogout
  //   };
  // }, [contextUser, contextToken, isAuthenticated]);

  const value = {
    contextUser,
    contextToken,
    isAuthenticated,
    contextLogin,
    contextSignup,
    contextLogout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default Auth;
