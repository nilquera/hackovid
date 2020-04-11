import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./auth/Auth";
import { Navbar, Nav } from "react-bootstrap";

const NavLagout = () => {
  const { contextLogout } = useContext(AuthContext);
  const handleLogout = () => {
    contextLogout();
  };
  return (
    <Nav.Link style={{ color: "red" }} href="/" onClick={handleLogout}>
      Logout
    </Nav.Link>
  );
};

export default NavLagout;
