import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./auth/Auth";
// import { setContextLogout } from "./auth/Auth";

const LogoutButton = () => {
  const { setContextLogout } = useContext(AuthContext);

  const handleLogout = () => {
    setContextLogout();
  };
  return (
    <li className="nav-item">
      <Link className="nav-link" to={"/"} onClick={handleLogout}>
        <div style={{ color: "red" }}>Logout</div>
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
export default LogoutButton;
