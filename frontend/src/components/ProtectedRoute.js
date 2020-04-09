import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./auth/Auth";

const ProtectedRoute = ({ component: Component }, ...rest) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
