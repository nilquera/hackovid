import React, { useContext, useState } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Col,
  Row,
  Tab,
  ListGroup,
  Accordion,
  Card
} from "react-bootstrap";
import { AuthContext } from "./auth/Auth";
import PackForm from "./PackForm";

const AdForm = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);

  const { contextLogin } = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    if (event.currentTarget.checkValidity() === false) {
      console.log("Submit not validated");
      event.stopPropagation();
      return;
    }
    setValidated(true);

    console.log("Submit validated");
    // axios
    //   .post("http://localhost:3001/api/login", {
    //     username: "admin",
    //     password: password
    //   })
    //   .then(response => {
    //     setLoading(false);
    //     contextLogin(response.data.user, response.data.token); //set context
    //     props.history.push("/");
    //   })
    //   .catch(e => {
    //     setLoading(false);
    //     setError("Couldn't Sign In");
    //   });
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
    </>
  );
};

export default AdForm;
