import { Button, Modal } from "react-bootstrap";

const ModalModificaRuoliInCampo = ({
  showModal,
  setShowModal,
  handleChangeRole,
  ruoliInCampo,
  setRuoliInCampo,
  isMeProfile,
}) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Modifica Ruoli in Campo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleChangeRole}>
          <div className="mb-3">
            <label className="form-label">Ruolo Primario</label>
            <select
              className="form-select"
              value={ruoliInCampo.ruoloInCampoPrimario}
              onChange={(e) =>
                setRuoliInCampo({
                  ...ruoliInCampo,
                  ruoloInCampoPrimario: e.target.value,
                })
              }
              required
            >
              <option value="">Seleziona il ruolo primario</option>
              <option value="portiere">Portiere</option>
              <option value="difensore">Difensore</option>
              <option value="terzino">Terzino</option>
              <option value="centrocampista">Centrocampista Centrale</option>
              <option value="centrocampistalaterale">
                Centrocampista Laterale
              </option>
              <option value="attaccante">Attaccante</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Ruolo Secondario</label>
            <select
              className="form-select"
              value={ruoliInCampo.ruoloInCampoSecondario}
              onChange={(e) =>
                setRuoliInCampo({
                  ...ruoliInCampo,
                  ruoloInCampoSecondario: e.target.value,
                })
              }
              required
            >
              <option value="">Seleziona il ruolo secondario</option>
              <option value="portiere">Portiere</option>
              <option value="difensore">Difensore</option>
              <option value="terzino">Terzino</option>
              <option value="centrocampista">Centrocampista Centrale</option>
              <option value="centrocampistalaterale">
                Centrocampista Laterale
              </option>
              <option value="attaccante">Attaccante</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Ruolo Alternativo</label>
            <select
              className="form-select"
              value={ruoliInCampo.ruoloInCampoAlternativo}
              onChange={(e) =>
                setRuoliInCampo({
                  ...ruoliInCampo,
                  ruoloInCampoAlternativo: e.target.value,
                })
              }
              required
            >
              <option value="">Seleziona il ruolo alternativo</option>
              <option value="portiere">Portiere</option>
              <option value="difensore">Difensore</option>
              <option value="terzino">Terzino</option>
              <option value="centrocampista">Centrocampista Centrale</option>
              <option value="centrocampistalaterale">
                Centrocampista Laterale
              </option>
              <option value="attaccante">Attaccante</option>
            </select>
          </div>
          <Button type="submit">
            {isMeProfile() ? "Aggiorna Ruoli" : "Aggiorna Ruoli come Admin"}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalModificaRuoliInCampo;
