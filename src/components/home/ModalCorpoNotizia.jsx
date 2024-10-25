import { Button, Form, Modal } from "react-bootstrap";

const ModalCorpoNotizia = ({
  showModalText,
  setShowModalText,
  handleUpdateText,
  updateText,
  setUpdateText,
}) => {
  return (
    <Modal show={showModalText} onHide={() => setShowModalText(false)}>
      <Modal.Header closeButton>
        <Modal.Title className="text-black">Gestisci Corpo Notizia</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleUpdateText}>
          <Form.Group controlId="formTitolo">
            <Form.Label>Titolo</Form.Label>
            <Form.Control
              type="text"
              name="titolo"
              value={updateText.titolo}
              onChange={(e) =>
                setUpdateText({ ...updateText, titolo: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formTesto">
            <Form.Label>Testo</Form.Label>
            <Form.Control
              as="textarea"
              name="testo"
              value={updateText.testo}
              onChange={(e) =>
                setUpdateText({ ...updateText, testo: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formAutore">
            <Form.Label>Autore</Form.Label>
            <Form.Control
              type="text"
              name="autore"
              value={updateText.autore}
              onChange={(e) =>
                setUpdateText({ ...updateText, autore: e.target.value })
              }
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2">
            Salva
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalCorpoNotizia;
