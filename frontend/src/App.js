import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SignUp from "./components/signup.component.js";
import Login from "./components/login.component.js";
import About from "./components/about.component.js";
import Nav from "./components/nav.component.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/about" component={About} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
