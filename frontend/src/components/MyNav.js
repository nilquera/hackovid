import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./auth/Auth";
import NavItem from "./NavItem";
import NavLogout from "./NavLogout";
import AddAdButton from "./AddAdButton";

import { Navbar, Nav } from "react-bootstrap";

const MyNav = () => {
  const { contextUser, isAuthenticated } = useContext(AuthContext);
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">Comencia</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Mapa</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
        <Nav className="justify-content-center">
          {isAuthenticated && (
            <Navbar.Text>Benvingut/da, {contextUser.name}</Navbar.Text>
          )}
        </Nav>
        <Nav className="ml-auto">
          {!isAuthenticated && (
            <>
              <Nav.Link href="/login">Entra</Nav.Link>
              <Nav.Link href="/signup">Registra't</Nav.Link>
            </>
          )}
          {isAuthenticated && contextUser.role === "seller" && (
            <>
              <AddAdButton />
              <Nav.Link href="/ventes">Ventes</Nav.Link>
            </>
          )}
          {isAuthenticated && contextUser.role === "buyer" && (
            <>
              <Nav.Link href="/compres">Compres</Nav.Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <NavLogout />
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

// <Nav.Link href="/settings">Configuració</Nav.Link>
export default MyNav;
