import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Tab, Row, Col, ListGroup, Alert } from "react-bootstrap";
import { AuthContext } from "./auth/Auth";

const Ad = ({ ad }) => {
  const { contextUser } = useContext(AuthContext);
  const [activePack, setActivePack] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState(false);

  const handleBuy = () => {
    console.log(ad);
    if (contextUser === null || contextUser.role === "seller") {
      setShowAlert(true);
      setShowSuccess(false);
      setShowError(false);
    } else {
      axios
        .post(
          `http://localhost:8000/transaction?buyer=${contextUser.email}&advertisement=${ad.seller}&seller=${ad.seller}&pack=${ad.seller}${activePack.title}`
        )
        .then(response => {
          setShowAlert(false);
          setShowSuccess(true);
          setShowError(false);
        })
        .catch(e => {
          setShowAlert(false);
          setShowSuccess(false);
          setShowError(true);
          setError("No s'ha pogut connectar amb el servidor");
        });
    }
  };

  return (
    <>
      <h1>{ad.title}</h1>
      <p>{ad.description}</p>
      <Tab.Container id="list-group-tabs-example">
        <Row>
          <Col sm={6}>
            <ListGroup>
              {ad.packs.map(pack => {
                return (
                  <ListGroup.Item
                    variant="info"
                    key={pack.title}
                    action
                    href={`#${pack.title}`}
                    onClick={() => {
                      setActivePack(pack);
                    }}
                  >
                    {pack.title}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
          <Col sm={6}>
            <Tab.Content>
              {ad.packs.map(pack => {
                return (
                  <Tab.Pane key={pack.title} eventKey={`#${pack.title}`}>
                    {pack.description}
                  </Tab.Pane>
                );
              })}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <hr></hr>
      {activePack && (
        <Button variant="primary" onClick={handleBuy}>
          Comprar {activePack.title}
        </Button>
      )}

      <br />
      <br />

      {showAlert && (
        <>
          <Alert
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            <Alert.Heading>
              Registra't com a comprador per efectuar la compra
            </Alert.Heading>
            <p>
              El sistema de compra actual delega la responsabilitat de la
              compra/venta als usuaris.{" "}
              <b>Necessitem que et registris amb un correu</b> perquè el venedor
              pugui contactar amb tu.
            </p>
          </Alert>
        </>
      )}
      {showSuccess && (
        <>
          <Alert
            variant="success"
            onClose={() => setShowSuccess(false)}
            dismissible
          >
            <Alert.Heading>Gràcies per ajudar la {ad.title}</Alert.Heading>
            <p>
              El teu contacte ha estat enviat al propietari de la botiga. En
              breus rebràs noticies seves!
            </p>
          </Alert>
        </>
      )}
      {showError && (
        <>
          <Alert
            variant="danger"
            onClose={() => setShowError(false)}
            dismissible
          >
            {error}
          </Alert>
        </>
      )}
    </>
  );
};
// <Button variant="primary">Go somewhere</Button>

export default Ad;
