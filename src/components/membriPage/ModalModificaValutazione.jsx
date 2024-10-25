import { Button, Modal } from "react-bootstrap";

const ModalModificaValutazione = ({
  showModalValutazione,
  setShowModalValutazione,
  handleUpadteValutazione,
  valutazione,
  setValutazione,
}) => {
  return (
    <Modal
      show={showModalValutazione}
      onHide={() => setShowModalValutazione(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modifica Valutazione</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleUpadteValutazione}>
          <div className="mb-3">
            <label>
              Difesa:
              <input
                type="number"
                name="difesa"
                min="0"
                max="100"
                value={valutazione.difesa}
                onChange={(e) =>
                  setValutazione({
                    ...valutazione,
                    difesa: e.target.value,
                  })
                }
                required
              />
            </label>
          </div>
          <div className="mb-3">
            <label>
              Velocità:
              <input
                type="number"
                name="velocita"
                min="0"
                max="100"
                value={valutazione.velocità}
                onChange={(e) =>
                  setValutazione({
                    ...valutazione,
                    velocità: e.target.value,
                  })
                }
                required
              />
            </label>
          </div>
          <div className="mb-3">
            <label>
              Resistenza:
              <input
                type="number"
                name="resistenza"
                min="0"
                max="100"
                value={valutazione.resistenza}
                onChange={(e) =>
                  setValutazione({
                    ...valutazione,
                    resistenza: e.target.value,
                  })
                }
                required
              />
            </label>
          </div>
          <div className="mb-3">
            <label>
              Tiro:
              <input
                type="number"
                name="tiro"
                min="0"
                max="100"
                value={valutazione.tiro}
                onChange={(e) =>
                  setValutazione({
                    ...valutazione,
                    tiro: e.target.value,
                  })
                }
                required
              />
            </label>
          </div>
          <div className="mb-3">
            <label>
              Tecnica:
              <input
                type="number"
                name="tecnica"
                min="0"
                max="100"
                value={valutazione.tecnica}
                onChange={(e) =>
                  setValutazione({
                    ...valutazione,
                    tecnica: e.target.value,
                  })
                }
                required
              />
            </label>
          </div>
          <Button type="submit">Salva</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalModificaValutazione;
