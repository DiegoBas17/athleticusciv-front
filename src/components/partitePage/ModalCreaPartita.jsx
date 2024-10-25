import { Button, Modal } from "react-bootstrap";

const ModalCreaPartita = ({
  showModal,
  setShowModal,
  handleCreatePartita,
  newPartita,
  setNewPartita,
  editingPartita,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      className="text-black"
    >
      <Modal.Header closeButton>
        <Modal.Title>Crea Nuova Partita</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleCreatePartita}>
          <div className="mb-3">
            <label className="form-label">Data</label>
            <input
              type="date"
              className="form-control"
              value={newPartita.data}
              onChange={(e) =>
                setNewPartita({ ...newPartita, data: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Luogo</label>
            <input
              type="text"
              className="form-control"
              value={newPartita.luogo}
              onChange={(e) =>
                setNewPartita({ ...newPartita, luogo: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Orario</label>
            <input
              type="time"
              className="form-control"
              value={newPartita.orario}
              onChange={(e) =>
                setNewPartita({ ...newPartita, orario: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Tipo Partita</label>
            <select
              className="form-select"
              value={newPartita.tipoPartita}
              onChange={(e) =>
                setNewPartita({ ...newPartita, tipoPartita: e.target.value })
              }
              required
            >
              <option value="">Seleziona il tipo di partita</option>
              <option value="calcio">Calcio</option>
              <option value="calcetto">Calcetto</option>
              <option value="calciotto">Calciotto</option>
            </select>
          </div>
          <Button type="submit">
            {editingPartita ? "Aggiorna Partita" : "Crea Partita"}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalCreaPartita;
