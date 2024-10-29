import { Button, Modal } from "react-bootstrap";

const ModalDeleteNotizia = ({
  showDelete,
  setShowDelete,
  deleteNotizia,
  notizia,
}) => {
  return (
    <Modal show={showDelete} onHide={() => setShowDelete(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Elimina Notizia</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Sei sicuro di voler eliminare questa notizia?</h3>
        <Button
          className="mt-3 btn-shiny1 py-2 px-3 m-1 w-100 scale"
          type="button"
          onClick={() => {
            setShowDelete(false);
            deleteNotizia(notizia.id);
          }}
        >
          elimina
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDeleteNotizia;
