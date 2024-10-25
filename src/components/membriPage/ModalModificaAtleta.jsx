import { Button, Modal } from "react-bootstrap";

const ModalModificaAtleta = ({
  showModalAtleta,
  setShowModalAtleta,
  handleSubmit,
  atleta,
  setAtleta,
}) => {
  return (
    <Modal show={showModalAtleta} onHide={() => setShowModalAtleta(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Modifica Atleta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              name="nome"
              value={atleta.nome}
              onChange={(e) =>
                setAtleta({
                  ...atleta,
                  nome: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Cognome</label>
            <input
              type="text"
              className="form-control"
              name="cognome"
              value={atleta.cognome}
              onChange={(e) =>
                setAtleta({
                  ...atleta,
                  cognome: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={atleta.email}
              onChange={(e) =>
                setAtleta({
                  ...atleta,
                  email: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Numero di Cellulare</label>
            <input
              type="text"
              className="form-control"
              name="numeroDiCellulare"
              value={atleta.numeroDiCellulare}
              onChange={(e) =>
                setAtleta({
                  ...atleta,
                  numeroDiCellulare: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={atleta.password}
              onChange={(e) =>
                setAtleta({
                  ...atleta,
                  password: e.target.value,
                })
              }
              required
            />
          </div>
          <Button type="submit">Salva Atleta</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalModificaAtleta;
