import React, { useState } from "react";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";

export function RechargeModal(props: { onSave; onCancel; show }) {
  const [amount, setAmount] = useState("");

  return (
    <>
      <Modal show={props.show} onHide={props.onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>¿Cuántos créditos quieres recargar?</Modal.Title>
        </Modal.Header>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Cantidad"
            aria-label="Cantidad"
            aria-describedby="basic-addon1"
            type="number"
            onChange={(event) => setAmount(event.target.value)}
          />
        </InputGroup>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onCancel}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => props.onSave(amount)}>
            Recargar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
