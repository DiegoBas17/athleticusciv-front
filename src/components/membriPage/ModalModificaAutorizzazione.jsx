import { Button, Form, Modal } from "react-bootstrap";

const ModalModificaAutorizzazione = ({
  showModalAuthorization,
  setShowModalAuthorization,
  handleUpdateAuthorization,
  authorization,
  setAuthorization,
}) => {
  return (
    <Modal
      show={showModalAuthorization}
      onHide={() => setShowModalAuthorization(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modifica Autorizzazione</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleUpdateAuthorization}>
          <Form.Group className="mb-3" controlId="roleSelect">
            <Form.Label>Ruolo nel CIV</Form.Label>
            <Form.Select
              value={authorization.ruolo}
              onChange={(e) =>
                setAuthorization({
                  ruolo: e.target.value,
                })
              }
              required
            >
              <option value="">Seleziona il ruolo nel CIV</option>
              <option value="VISITATORE">Visitatore</option>
              <option value="ATLETA">Atleta</option>
              <option value="ADMIN">Admin</option>
              <option value="SUPERADMIN">SuperAdmin</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Aggiorna Ruolo
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalModificaAutorizzazione;
