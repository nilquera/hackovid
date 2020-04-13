import React, { useState, useContext } from "react";
import { AuthContext } from "./Auth";
import axios from "axios";
import { Container, Col, Alert } from "react-bootstrap";

const SignUp = props => {
  const [nom, setNom] = useState("");
  const [cognom, setCognom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefon, setTelefon] = useState(0);
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

    let rol = esVenedor ? "seller" : "buyer";

    axios
      .post(
        `https://comencia.herokuapp.com/user?password=${password}&name=${nom}%20${cognom}&email=${email}&role=${rol}&phone_number=${telefon}`
      )
      .then(response => {
        setLoading(false);
        contextLogin(response.data.user, response.data.token); //set context (TODO: response.data.token)
        props.history.push("/");
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
        setError("No s'ha pogut efectuar el registre");
      });
  }

  return (
    <Container fluid="sm">
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
            <br />
            <Col>
              <Alert variant={"danger"}>{error}</Alert>
            </Col>
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
    </Container>
  );
};
// <p className="forgot-password text-right">
//   Already registered <a href="#">sign in?</a>
// </p>

export default SignUp;
