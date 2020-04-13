import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SignUp from "./components/auth/Signup";
import Login from "./components/auth/Login";
import About from "./components/About";
import MyNav from "./components/MyNav";
import MyMap from "./components/MyMap";
import Compres from "./components/Compres";
import Ventes from "./components/Ventes";
import { PrivateRoute, PublicRoute } from "./components/SpecialRoutes";

function App() {
  return (
    <div className="mycontainer">
      <MyNav />
      <Router>
        <Switch>
          <Route exact path="/" component={MyMap} />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/signup" component={SignUp} />
          <PrivateRoute path="/compres" component={Compres} />
          <PrivateRoute path="/ventes" component={Ventes} seller />
          <Route path="/about" component={About} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
