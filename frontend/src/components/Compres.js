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

const Compres = () => {
  const [compres, setCompres] = useState([]);
  const [error, setError] = useState(false);

  const { contextUser, contextToken } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(
        `https://comencia.herokuapp.com/transaction/buyer?buyer=${contextUser.email}&access_token=${contextToken}`
      )
      .then(response => {
        console.log(response.data);
        setCompres(response.data);
      })
      .catch(e => {
        setError("No s'ha pogut connectar amb la base de dades.");
      });
  }, []);

  return (
    <Container fluid="sm">
      <br />
      <h3>Aquestes son les teves compres:</h3>
      <br />

      {compres.length > 0 && (
        <Accordion>
          {compres.map(compra => {
            return (
              <Card key={compra.advertisement}>
                <Card.Header>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey={`${compra.seller}${compra.pack.title}`}
                  >
                    {compra.pack.title}
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse
                  eventKey={`${compra.seller}${compra.pack.title}`}
                >
                  <Card.Body>
                    <p>{compra.pack.description}</p>
                    <p>Contacte del venedor: {compra.advertisement}</p>
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

export default Compres;
