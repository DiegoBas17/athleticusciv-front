import { Button, Modal } from "react-bootstrap";

const ModalEliminaAtleta = ({
  showDelete,
  setShowDelete,
  handleDeleteAtleta,
  showAtleta,
}) => {
  return (
    <Modal
      show={showDelete}
      onHide={() => setShowDelete(false)}
      className="text-black"
    >
      <Modal.Header closeButton>
        <Modal.Title>Elimina Atleta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Sei sicuro di voler eliminare questo Atleta?</h3>
        <Button
          className="mt-2"
          type="button"
          onClick={() => {
            setShowDelete(false);
            handleDeleteAtleta(showAtleta.id);
          }}
        >
          elimina
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ModalEliminaAtleta;
