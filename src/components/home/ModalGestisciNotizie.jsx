import { Form, Modal } from "react-bootstrap";

const ModalGestisciNotizie = ({
  showModal,
  setShowModal,
  handleCreateNotizia,
  formData,
  setFormData,
}) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title className="text-black">Gestisci Notizia</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleCreateNotizia}>
          <Form.Group controlId="formTitolo">
            <Form.Label>Titolo</Form.Label>
            <Form.Control
              type="text"
              name="titolo"
              value={formData.titolo}
              onChange={(e) =>
                setFormData({ ...formData, titolo: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formTesto">
            <Form.Label>Testo</Form.Label>
            <Form.Control
              as="textarea"
              name="testo"
              value={formData.testo}
              onChange={(e) =>
                setFormData({ ...formData, testo: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formAutore">
            <Form.Label>Autore</Form.Label>
            <Form.Control
              type="text"
              name="autore"
              value={formData.autore}
              onChange={(e) =>
                setFormData({ ...formData, autore: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formImmagine">
            <Form.Label>Immagine</Form.Label>
            <Form.Control
              type="file"
              name="immagine"
              onChange={(e) =>
                setFormData({ ...formData, immagine: e.target.files[0] })
              }
            />
          </Form.Group>
          <button
            type="submit"
            className="btn-shiny2 py-2 px-3 m-1 w-100 scale mt-3"
          >
            Salva
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalGestisciNotizie;
