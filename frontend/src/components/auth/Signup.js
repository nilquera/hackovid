import React, { useState, useContext } from "react";
import { AuthContext } from "./Auth";
import axios from "axios";

const SignUp = props => {
  const [nom, setNom] = useState("");
  const [cognom, setCognom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefon, setTelefon] = useState("");
  const [esVenedor, setEsVenedor] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { contextLogin } = useContext(AuthContext);

  const validateForm = () =>
    nom.length > 0 &&
    cognom.length > 0 &&
    email.length > 0 &&
    password.length > 0;

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    axios
      .post("http://localhost:3001/api/users", {
        username: nom,
        email: email,
        password: password
      })
      .then(response => {
        setLoading(false);
        contextLogin(response.data.user, response.data.token); //set context
        props.history.push("/");
      })
      .catch(e => {
        setLoading(false);
        setError("Couldn't Register");
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Crea un compte</h3>
      <p>És ràpid i fàcil</p>

      <label style={{ marginRight: "5%" }}>
        <input
          type="radio"
          name="esVenedor"
          checked={esVenedor}
          onChange={e => setEsVenedor(true)}
        ></input>
        Venedor
      </label>
      <label>
        <input
          type="radio"
          name="esVenedor"
          checked={!esVenedor}
          onChange={e => setEsVenedor(false)}
        ></input>
        Comprador
      </label>
      <div className="form-group">
        <input
          autoFocus
          type="text"
          className="form-control"
          placeholder="Nom"
          onChange={e => setNom(e.target.value)}
          value={nom}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Cognom"
          onChange={e => setCognom(e.target.value)}
          value={cognom}
        />
      </div>

      <div className="form-group">
        <input
          type="email"
          className="form-control"
          placeholder="Correu electrònic"
          onChange={e => setEmail(e.target.value)}
          value={email}
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
      {esVenedor && (
        <div className="form-group">
          <input
            type="tel"
            className="form-control"
            placeholder="Telèfon mòbil"
            onChange={e => setTelefon(e.target.value)}
            value={telefon}
          />
        </div>
      )}

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
        Inscriu-te
      </button>
    </form>
  );
};
// <p className="forgot-password text-right">
//   Already registered <a href="#">sign in?</a>
// </p>

export default SignUp;
