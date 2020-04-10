import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SignUp from "./components/auth/Signup";
import Login from "./components/auth/Login";
import About from "./components/About";
import Nav from "./components/Nav";
import Mapa from "./components/Map";
import Settings from "./components/Settings";

import Auth from "./components/auth/Auth";
import { PrivateRoute, PublicRoute } from "./components/SpecialRoutes";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Auth>
              <Nav />
              <Switch>
                <Route exact path="/" component={Mapa} />
                <PublicRoute path="/login" component={Login} />
                <PublicRoute path="/signup" component={SignUp} />
                <PrivateRoute path="/settings" component={Settings} />
                <Route path="/about" component={About} />
                <Route path="*" component={() => "404 NOT FOUND"} />
              </Switch>
            </Auth>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
