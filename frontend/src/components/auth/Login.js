import React, { useContext, useState } from "react";
import { AuthContext } from "./Auth";
import { Redirect } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);
  const { login } = useContext(AuthContext);

  function handleChange(event) {
    // console.log(email, password);
    event.target.type === "email"
      ? setEmail(event.target.value)
      : setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    login(email, password);
    // setRedirectToHome(true);
    // console.log(email, password);
  }

  if (redirectToHome) return <Redirect to={"/"} />;

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign In</h3>

      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        Submit
      </button>
    </form>
  );
};

export default Login;

// <div className="form-group">
//   <div className="custom-control custom-checkbox">
//     <input
//       type="checkbox"
//       className="custom-control-input"
//       id="customCheck1"
//       />
//     <label className="custom-control-label" htmlFor="customCheck1">
//       Remember me
//     </label>
//   </div>
// </div>
