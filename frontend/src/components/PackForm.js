import React, { useContext, useState } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  InputGroup,
  ListGroup,
  Tab
} from "react-bootstrap";

const PackForm = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  //const [product, setProducts] = useState([]);
  const [validated, setValidated] = useState(false);

  const [packs, setPacks] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    if (event.target.checkValidity() === false) {
      console.log("Submit not validated");
      event.stopPropagation();
      return;
    }

    const newPack = {
      title: title,
      description: description,
      price: price
    };
    // setLoading(true);
    //
    setValidated(true);
    setPacks(packs.concat(newPack));

    console.log("Submit validated");
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
          Guardar Pack
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
    </>
  );
};

export default PackForm;
