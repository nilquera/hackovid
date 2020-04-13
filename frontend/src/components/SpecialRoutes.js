import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./auth/Auth";

export const PrivateRoute = ({ component: Component, seller }, ...rest) => {
  const { contextUser, isAuthenticated } = useContext(AuthContext);

  const valid =
    (contextUser.role === "seller" && seller) ||
    (contextUser.role === "buyer" && !seller);

  return (
    valid && (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    )
  );
};

export const PublicRoute = ({ component: Component }, ...rest) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};
