import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import { AuthContext } from "./auth/Auth";
import NavItem from "./NavItem";
import LogoutButton from "./LogoutButton";

const Nav = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  console.log(user);
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to={"/login"}>
          <img src={logo} alt="logo" width="80vx" />
        </Link>
        {isAuthenticated && <div>hola {user.username}</div>}

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
            <NavItem to="/" name="Mapa" />
            {!isAuthenticated && <NavItem to="/login" name="Login" />}
            {!isAuthenticated && <NavItem to="/signup" name="Signup" />}
            {isAuthenticated && <NavItem to="/settings" name="Settings" />}
            {isAuthenticated && <LogoutButton />}
            <NavItem to="/about" name="About" />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
