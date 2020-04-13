import React, { useContext, useState } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  InputGroup,
  ListGroup,
  Tab,
  Alert
} from "react-bootstrap";
import { AuthContext } from "./auth/Auth";
import axios from "axios";

const PackForm = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  //const [product, setProducts] = useState([]);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);
  const [sucess, setSuccess] = useState(null);

  const [packs, setPacks] = useState([]);

  const { contextUser, contextToken } = useContext(AuthContext);

  function handleSubmit(event) {
    console.log(contextToken);
    event.preventDefault();
    if (event.target.checkValidity() === false) {
      setError("Error: algun dels camps és invàlid");
      setSuccess(null);
      event.stopPropagation();
      return;
    }

    axios
      .post(
        `https://comencia.herokuapp.com/pack?title=${title}&description=${description}&advertisement=${contextUser.email}&price=${price}&access_token=${contextToken}`
      )
      .then(response => {
        setError(null);
        setSuccess("El pack s'ha afegit correctament");
        setValidated(true);

        const newPack = {
          title: title,
          description: description,
          price: price
        };

        setPacks(packs.concat(newPack));
      })
      .catch(e => {
        setSuccess(null);
        setError("Error: no s'ha pogut afegir el pack");
      });
  }

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formTitle">
          <Form.Label column="sm" sm={2}>
            Nom del Pack
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              size="sm"
              required
              onChange={e => setTitle(e.target.value)}
              value={title}
              placeholder="p.e. Superpack"
              type="text"
            />
            <Form.Control.Feedback type="invalid">
              Afegeix un nom
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Evita títols massa llargs.
            </Form.Text>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPrice">
          <Form.Label column="sm" sm={2}>
            Preu
          </Form.Label>
          <Col sm={10}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">€</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                required
                onChange={e => setPrice(e.target.value)}
                value={price}
                type="number"
                aria-describedby="inputGroupPrepend"
              />
              <Form.Control.Feedback type="invalid">
                Afegeix un preu
              </Form.Control.Feedback>
            </InputGroup>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formDescription">
          <Form.Label column="sm" sm={2}>
            Descripció Pack
          </Form.Label>
          <Col sm={10}>
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

        <Button variant="primary" type="submit">
          Afegir Pack
        </Button>
      </Form>

      <hr />
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row>
          <Col sm={4}>
            <ListGroup>
              {packs.map(pack => {
                return (
                  <ListGroup.Item action href={`#${pack.title}`}>
                    {pack.title}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              {packs.map(pack => {
                return (
                  <Tab.Pane eventKey={`#${pack.title}`}>
                    {pack.description}
                  </Tab.Pane>
                );
              })}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
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

export default PackForm;
