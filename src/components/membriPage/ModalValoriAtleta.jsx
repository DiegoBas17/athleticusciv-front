import { Button, Form, Modal } from "react-bootstrap";

const ModalValoriAtleta = ({
  showStorico,
  setShowStorico,
  handleStorico,
  storico,
  setStorico,
}) => {
  return (
    <Modal show={showStorico} onHide={() => setShowStorico(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Inserisci Valori Atleta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleStorico}>
          <Form.Group controlId="mediaGol">
            <Form.Label>Media Gol</Form.Label>
            <Form.Control
              type="number"
              value={storico.mediaGol}
              onChange={(e) =>
                setStorico({ ...storico, mediaGol: e.target.value })
              }
              placeholder="Inserisci la media gol"
              min="0"
              step="0.01"
              required
            />
          </Form.Group>
          <Form.Group controlId="mediaAssist">
            <Form.Label>Media Assist</Form.Label>
            <Form.Control
              type="number"
              value={storico.mediaAssist}
              onChange={(e) =>
                setStorico({ ...storico, mediaAssist: e.target.value })
              }
              placeholder="Inserisci la media assist"
              min="0"
              step="0.01"
              required
            />
          </Form.Group>
          <Form.Group controlId="mediaVoti">
            <Form.Label>Media Voti</Form.Label>
            <Form.Control
              type="number"
              value={storico.mediaVoti}
              onChange={(e) =>
                setStorico({ ...storico, mediaVoti: e.target.value })
              }
              placeholder="Inserisci la media voti"
              min="0"
              max="10"
              step="0.01"
              required
            />
          </Form.Group>
          <Form.Group controlId="partiteGiocate">
            <Form.Label>Partite Giocate</Form.Label>
            <Form.Control
              type="number"
              value={storico.partiteGiocate}
              onChange={(e) =>
                setStorico({ ...storico, partiteGiocate: e.target.value })
              }
              placeholder="Inserisci il numero di partite giocate"
              min="0"
              required
            />
          </Form.Group>
          <Form.Group controlId="totaleGol">
            <Form.Label>Totale Gol</Form.Label>
            <Form.Control
              type="number"
              value={storico.totaleGol}
              onChange={(e) =>
                setStorico({ ...storico, totaleGol: e.target.value })
              }
              placeholder="Inserisci il totale gol"
              min="0"
              required
            />
          </Form.Group>
          <Form.Group controlId="totaleAssist">
            <Form.Label>Totale Assist</Form.Label>
            <Form.Control
              type="number"
              value={storico.totaleAssist}
              onChange={(e) =>
                setStorico({ ...storico, totaleAssist: e.target.value })
              }
              placeholder="Inserisci il totale assist"
              min="0"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2">
            Salva
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalValoriAtleta;
