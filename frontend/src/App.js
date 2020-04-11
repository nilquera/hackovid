import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import SignUp from "./components/auth/Signup";
import Login from "./components/auth/Login";
import About from "./components/About";
import MyNav from "./components/MyNav";
import MyMap from "./components/MyMap";
import Settings from "./components/Settings";
import Auth from "./components/auth/Auth";
import { PrivateRoute, PublicRoute } from "./components/SpecialRoutes";

function App() {
  return (
    <Auth>
      <MyNav />
      <Router>
        <Switch>
          <Route exact path="/" component={MyMap} />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/signup" component={SignUp} />
          <PrivateRoute path="/settings" component={Settings} />
          <Route path="/about" component={About} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </Router>
    </Auth>
  );
}

export default App;
