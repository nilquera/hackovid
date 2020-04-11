import React, { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { AuthContext } from "./auth/Auth";
import AdForm from "./AdForm";

const AddAdButton = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Nou Anunci
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <AdForm />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tancar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddAdButton;
