import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Col,
  Row,
  Tab,
  ListGroup,
  Accordion,
  Card,
  Alert
} from "react-bootstrap";
import Geocode from "react-geocode";
import { AuthContext } from "./auth/Auth";
import PackForm from "./PackForm";

const AdForm = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [carrer, setCarrer] = useState("");
  const [num, setNum] = useState("");
  const [ciutat, setCiutat] = useState("");

  const [error, setError] = useState(null);
  const [sucess, setSuccess] = useState(null);
  const [validated, setValidated] = useState(false);

  const { contextUser } = useContext(AuthContext);

  useEffect(() => {
    Geocode.setApiKey("AIzaSyD7gwBypoFxjJW8OSDCKkvcymW00n1Bqw8");
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
      setError("Error: algun dels camps és invàlid");
      return;
    }

    Geocode.fromAddress(`${carrer} ${num}, ${ciutat}`).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        axios
          .post(
            `http://localhost:8000/advertisement?seller=${contextUser.email}&title=${title}&description=${description}&city=${ciutat}&street=${carrer}&number=${num}&lat=${lat}&long=${lng}`
          )
          .then(response => {
            setError(null);
            setSuccess(
              "L'anunci s'ha penjat correctament. Siusplau, introdueix algun pack"
            );
          })
          .catch(e => {
            setSuccess(null);
            setError("Error: no s'ha pogut penjar l'anunci");
          });
      },
      error => {
        event.stopPropagation();
        setError("Error: Adreça no detectada");
        setSuccess(null);
      }
    );
  }

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label column="lg">Títol</Form.Label>
          <Col>
            <Form.Control
              size="lg"
              required
              onChange={e => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Títol de l'anunci"
            />
            <Form.Control.Feedback type="invalid">
              Afegeix un títol
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Pots posar el nom de la teva botiga.
            </Form.Text>
          </Col>
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label column="sm">Descripció</Form.Label>
          <Col>
            <Form.Control
              required
              onChange={e => setDescription(e.target.value)}
              value={description}
              as="textarea"
              rows="3"
            />
            <Form.Control.Feedback type="invalid">
              Afegeix una descripció
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Row>
          <Col>
            <Form.Label column="sm">Ciutat</Form.Label>
            <Form.Group as={Col} controlId="formCiutat">
              <Form.Control
                required
                onChange={e => setCiutat(e.target.value)}
                value={ciutat}
              />
              <Form.Control.Feedback type="invalid">
                Afegeix la ciutat on està la botiga
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Label column="sm">Carrer</Form.Label>
            <Form.Group as={Col} controlId="formCarrer">
              <Form.Control
                required
                onChange={e => setCarrer(e.target.value)}
                value={carrer}
              />
              <Form.Control.Feedback type="invalid">
                Afegeix el carrer on està la botiga
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Label column="sm">Número</Form.Label>
            <Form.Group as={Col} controlId="formNum">
              <Form.Control
                required
                onChange={e => setNum(e.target.value)}
                value={num}
                type="number"
              />
              <Form.Control.Feedback type="invalid">
                Afegeix el número del carrer
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Col>
          <Button variant="primary" type="submit">
            Penjar Anunci
          </Button>
        </Col>
      </Form>

      <hr />

      <Col>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Afegir Pack
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <PackForm />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Col>

      {error && (
        <>
          <br />
          <Col>
            <Alert variant={"danger"}>{error}</Alert>
          </Col>
        </>
      )}
      {sucess && (
        <>
          <br />
          <Col>
            <Alert variant={"success"}>{sucess}</Alert>
          </Col>
        </>
      )}
    </>
  );
};

export default AdForm;
