import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import { AuthContext } from "./auth/Auth";
import NavItem from "./NavItem";
import NavLogout from "./NavLogout";

import { Navbar, Nav } from "react-bootstrap";

const MyNav = () => {
  const { contextUser, isAuthenticated } = useContext(AuthContext);
  console.log(contextUser);
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">Comencia</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Mapa</Nav.Link>

          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          {!isAuthenticated && (
            <>
              <Nav.Link href="/login">Entra</Nav.Link>
              <Nav.Link href="/signup">Registra't</Nav.Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <Navbar.Text>{contextUser.username} |</Navbar.Text>
              <Nav.Link href="/settings">Configuració</Nav.Link>
              <NavLogout />
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNav;
