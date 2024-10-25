import { Button, Form, Modal } from "react-bootstrap";

const ModalModifcaAvatar = ({
  showModalAvatar,
  setShowModalAvatar,
  handleUpdateAvatar,
  setFile,
}) => {
  return (
    <Modal show={showModalAvatar} onHide={() => setShowModalAvatar(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Modifica Avatar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleUpdateAvatar}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Seleziona un&rsquo;immagine</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Aggiorna Avatar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalModifcaAvatar;
