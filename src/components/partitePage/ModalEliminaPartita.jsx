import { Button, Modal } from "react-bootstrap";

const ModalEliminaPartita = ({
  showDelete,
  setShowDelete,
  handleDeletePartita,
  partita,
}) => {
  return (
    <Modal show={showDelete} onHide={() => setShowDelete(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Elimina Partita</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Sei sicuro di voler eliminare questa Partita?</h3>
        <Button
          className="mt-2"
          type="button"
          onClick={() => {
            setShowDelete(false);
            handleDeletePartita(partita.id);
          }}
        >
          elimina
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ModalEliminaPartita;
