import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ to = "/", name = "default" }) => {
  return (
    <li className="nav-item">
      <Link className="nav-link" to={to}>
        {name}
      </Link>
    </li>
  );
};

// Classes antigues:
// <li className="nav-item">
//   <Link className="nav-link" to={"/login"}>
//     Login
//   </Link>
// </li>
export default NavItem;
