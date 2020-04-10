import React, { useContext, useState } from "react";
import { AuthContext } from "./Auth";
import axios from "axios";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { contextLogin } = useContext(AuthContext);

  const validateForm = () => email.length > 0 && password.length > 0;

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    axios
      .post("http://localhost:3001/api/login", {
        username: "admin",
        password: password
      })
      .then(response => {
        setLoading(false);
        contextLogin(response.data.user, response.data.token); //set context
        props.history.push("/");
      })
      .catch(e => {
        setLoading(false);
        setError("Couldn't Sign In");
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign In</h3>

      <div className="form-group">
        <label>Email address</label>
        <input
          autoFocus
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
      </div>
      {error && (
        <>
          <small style={{ color: "red" }}>{error}</small>
          <br />
        </>
      )}
      <br />

      <button
        type="submit"
        disabled={!validateForm() || loading}
        className="btn btn-primary btn-block"
      >
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
