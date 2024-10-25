import { Button, Form, Modal } from "react-bootstrap";

const ModalNewTracker = ({
  showFormTracker,
  setShowFormTracker,
  handleCreateTracker,
  trackerData,
  handleChange,
}) => {
  return (
    <Modal
      show={showFormTracker}
      onHide={() => setShowFormTracker(false)}
      className="text-black"
    >
      <Modal.Header closeButton>
        <Modal.Title>Crea Nuovo Tracker</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleCreateTracker}>
          <Form.Group className="mb-3">
            <Form.Label>Tipo Partita</Form.Label>
            <Form.Control
              type="text"
              name="tipoPartita"
              value={trackerData.tipoPartita}
              onChange={(e) =>
                handleChange({ ...trackerData, tipoPartita: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Attività</Form.Label>
            <Form.Control
              type="number"
              name="attività"
              value={trackerData.attività}
              onChange={(e) =>
                handleChange({ ...trackerData, attività: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Distanza</Form.Label>
            <Form.Control
              type="number"
              name="distanza"
              value={trackerData.distanza}
              onChange={(e) =>
                handleChange({ ...trackerData, distanza: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Passaggi</Form.Label>
            <Form.Control
              type="number"
              name="passaggi"
              value={trackerData.passaggi}
              onChange={(e) =>
                handleChange({ ...trackerData, passaggi: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Corsa</Form.Label>
            <Form.Control
              type="text"
              name="corsa"
              value={trackerData.corsa}
              onChange={(e) =>
                handleChange({ ...trackerData, corsa: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Numero Sprint</Form.Label>
            <Form.Control
              type="number"
              name="numeroSprint"
              value={trackerData.numeroSprint}
              onChange={(e) =>
                handleChange({ ...trackerData, numeroSprint: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Sprint Medio (m/s)</Form.Label>
            <Form.Control
              type="number"
              name="sprintMedio"
              value={trackerData.sprintMedio}
              onChange={(e) =>
                handleChange({ ...trackerData, sprintMedio: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Sprint Massimo (m/s)</Form.Label>
            <Form.Control
              type="number"
              name="sprintMassimo"
              value={trackerData.sprintMassimo}
              onChange={(e) =>
                handleChange({
                  ...trackerData,
                  sprintMassimo: e.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Possesso</Form.Label>
            <Form.Control
              type="text"
              name="possesso"
              value={trackerData.possesso}
              onChange={(e) =>
                handleChange({ ...trackerData, possesso: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tiri</Form.Label>
            <Form.Control
              type="number"
              name="tiri"
              value={trackerData.tiri}
              onChange={(e) =>
                handleChange({ ...trackerData, tiri: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tiro Massimo (km/h)</Form.Label>
            <Form.Control
              type="number"
              name="tiroMassimo"
              value={trackerData.tiroMassimo}
              onChange={(e) =>
                handleChange({ ...trackerData, tiroMassimo: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tiro Medio (km/h)</Form.Label>
            <Form.Control
              type="number"
              name="tiroMedio"
              value={trackerData.tiroMedio}
              onChange={(e) =>
                handleChange({ ...trackerData, tiroMedio: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Valutazione 5 Stelle</Form.Label>
            <Form.Control
              type="number"
              step="0.1"
              name="valutazione5Stelle"
              value={trackerData.valutazione5Stelle}
              onChange={(e) =>
                handleChange({
                  ...trackerData,
                  valutazione5Stelle: e.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Analisi Allenatore</Form.Label>
            <Form.Control
              type="text"
              name="analisiAllenatore"
              value={trackerData.analisiAllenatore}
              onChange={(e) =>
                handleChange({
                  ...trackerData,
                  analisiAllenatore: e.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Button type="submit">Crea Tracker</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalNewTracker;
