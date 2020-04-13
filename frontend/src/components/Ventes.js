import React, { useState, useEffect, useContext } from "react";
import {
  Accordion,
  Card,
  Button,
  Container,
  Col,
  Alert
} from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "./auth/Auth";

const Ventes = () => {
  const [ventes, setVentes] = useState([]);
  const [error, setError] = useState(false);

  const { contextUser, contextToken } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(
        `https://comencia.herokuapp.com/transaction/seller?seller=${contextUser.email}&access_token=${contextToken}`
      )
      .then(response => {
        setVentes(response.data);
      })
      .catch(e => {
        setError("No s'ha pogut connectar amb la base de dades.");
      });
  }, []);

  return (
    <Container fluid="sm">
      <br />
      <h3>Aquestes son les teves ventes:</h3>
      <br />

      {ventes.length > 0 && (
        <Accordion>
          {ventes.map(venta => {
            return (
              <Card key={venta.advertisement}>
                <Card.Header>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey={`${venta.buyer}${venta.pack.title}`}
                  >
                    {venta.pack.title}
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse
                  eventKey={`${venta.buyer}${venta.pack.title}`}
                >
                  <Card.Body>
                    <p>{venta.pack.description}</p>
                    <p>Contacte del comprador: {venta.buyer}</p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          })}
        </Accordion>
      )}
      {error && (
        <>
          <br />
          <Col>
            <Alert variant={"danger"}>{error}</Alert>
          </Col>
        </>
      )}
    </Container>
  );
};

export default Ventes;
