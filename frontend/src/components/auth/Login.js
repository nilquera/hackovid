import React, { useContext, useState } from "react";
import { AuthContext } from "./Auth";
import axios from "axios";
import { Container } from "react-bootstrap";

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
      .post(`http://localhost:8000/login?email=${email}&password=${password}`)
      .then(response => {
        console.log(response);
        setLoading(false);
        contextLogin(response.data.user, "tempToken"); //set context // response.data.token
        props.history.push("/");
      })
      .catch(e => {
        setLoading(false);
        setError("Couldn't Sign In");
      });
  }

  return (
    <Container fluid="sm">
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>

        <div className="form-group">
          <input
            autoFocus
            className="form-control"
            placeholder="Correu electrònic"
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Contrasenya"
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
    </Container>
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
