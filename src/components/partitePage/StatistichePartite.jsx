import { Button, Container, Form, Modal } from "react-bootstrap";
import httpClient from "../../services/httpClient";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TopBar from "../TopBar";
import StarRating from "./StarRating";

const StatistichePartite = () => {
  const { partitaId } = useParams();
  const [partita, setPartita] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modificaStatistica, setModificaStatistica] = useState({
    tipoPartita: "",
    coloreSquadra: "",
    gol: "",
    assist: "",
  });
  const [statisticaId, setStatisticaId] = useState();
  const [showTrackerDetails, setShowTrackerDetails] = useState(false);
  const [trackerData, setTrackerData] = useState({
    tipoPartita: "",
    attività: "",
    distanza: "",
    passaggi: "",
    corsa: "",
    numeroSprint: "",
    sprintMedio: "",
    sprintMassimo: "",
    possesso: "",
    tiri: "",
    tiroMassimo: "",
    tiroMedio: "",
    valutazione5Stelle: "",
    analisiAllenatore: "",
  });
  const [showFormTracker, setShowFormTracker] = useState();
  const atleta = useSelector((state) => state.atleta.atleta);

  const getDateInfo = (data) => {
    const mesi = [
      "Gennaio",
      "Febbraio",
      "Marzo",
      "Aprile",
      "Maggio",
      "Giugno",
      "Luglio",
      "Agosto",
      "Settembre",
      "Ottobre",
      "Novembre",
      "Dicembre",
    ];
    const giorniDellaSettimana = [
      "Domenica",
      "Lunedì",
      "Martedì",
      "Mercoledì",
      "Giovedì",
      "Venerdì",
      "Sabato",
    ];
    const dateObj = new Date(data);
    const mese = mesi[dateObj.getMonth()];
    const giornoDellaSettimana = giorniDellaSettimana[dateObj.getDay()];
    const numeroDelGiorno = dateObj.getDate();
    const ore = dateObj.getHours().toString().padStart(2, "0");
    const minuti = dateObj.getMinutes().toString().padStart(2, "0");
    const nextHourDate = new Date(dateObj);
    nextHourDate.setHours(dateObj.getHours() + 1);
    const nextOre = nextHourDate.getHours().toString().padStart(2, "0");
    const nextMinuti = nextHourDate.getMinutes().toString().padStart(2, "0");
    const orario = `${ore}:${minuti} - ${nextOre}:${nextMinuti}`;
    return {
      mese,
      giornoDellaSettimana,
      numeroDelGiorno,
      orario,
    };
  };

  const fetchPartita = () => {
    httpClient
      .get(`/partite/${partitaId}`)
      .then((response) => {
        setPartita(response.data);
        console.log(partita);
        setModificaStatistica({
          ...modificaStatistica,
          tipoPartita: partita.tipoPartita,
        });
      })
      .catch((error) => {
        console.log("Errore nella richiesta:", error);
      });
  };

  useEffect(() => {
    fetchPartita();
  }, []);

  const handleCreateStatistiche = () => {
    httpClient
      .post(`/statistiche/${partita.id}`)
      .then((response) => {
        console.log("Satistiche Create:", response);
        fetchPartita();
      })
      .catch((error) => {
        console.log("Errore nella creazione delle statistiche:", error);
      });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    console.log(modificaStatistica);
    httpClient
      .put(`/statistiche/${statisticaId}`, modificaStatistica)
      .then(() => {
        fetchPartita();
        setShowModal(false);
      })
      .catch((error) => {
        console.log("Errore nella modifica delle statistiche:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrackerData({
      ...trackerData,
      [name]: value,
    });
  };

  const handleCreateTracker = (e) => {
    e.preventDefault();
    httpClient
      .post(`/tracker/${statisticaId}`, trackerData)
      .then((response) => {
        console.log("Tracker creato:", response.data);
        fetchPartita();
        setShowFormTracker(false);
      })
      .catch((error) => {
        console.error("Errore nella creazione del tracker:", error);
      });
  };

  const isAdminOrSuperadmin = () => {
    return atleta.ruolo === "ADMIN" || atleta.ruolo === "SUPERADMIN";
  };

  return (
    <Container>
      <TopBar />
      {partita && partita.statistiche.length !== 0 ? (
        <div className="civ-color p-4 rounded-4">
          <h1>Statistiche Partita</h1>
          <h6>
            {getDateInfo(partita.data).mese} - {partita.tipoPartita}
          </h6>
          <p>
            {getDateInfo(partita.data).giornoDellaSettimana}{" "}
            {getDateInfo(partita.data).numeroDelGiorno} ore:{" "}
            {getDateInfo(partita.data).orario}
          </p>
          <h3>Lista Statistiche</h3>
          {partita.statistiche?.map((statistica, index) => (
            <div key={index}>
              <div className="d-flex align-items-center">
                <img src={statistica.atleta.avatar} />
                <h3 className="ms-1">
                  {statistica.atleta.nome} {statistica.atleta.cognome}
                </h3>
              </div>
              <div>Squadra: {statistica.coloreSquadra}</div>
              <div>Assist: {statistica.assist}</div>
              <div>Gol: {statistica.gol}</div>
              {statistica?.tracker ? (
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowTrackerDetails(!showTrackerDetails)}
                >
                  {showTrackerDetails
                    ? "Nascondi Dettagli Tracker"
                    : "Mostra Dettagli Tracker"}
                </button>
              ) : isAdminOrSuperadmin() ? (
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowFormTracker(true);
                    setStatisticaId(statistica.id);
                  }}
                >
                  Aggiungi Tracker
                </button>
              ) : (
                <></>
              )}
              {isAdminOrSuperadmin() ? (
                <Button
                  onClick={() => {
                    setShowModal(true);
                    setModificaStatistica({
                      ...modificaStatistica,
                      coloreSquadra: statistica.coloreSquadra,
                      gol: statistica.gol,
                      assist: statistica.assist,
                    });
                    setStatisticaId(statistica.id);
                  }}
                >
                  Modifica statistica
                </Button>
              ) : (
                <></>
              )}
              <Button>Vota {statistica.atleta.cognome}</Button>
              <StarRating statistica={statistica} />
              {showTrackerDetails && (
                <div className="mt-3 p-3 border border-secondary rounded">
                  <h5>Dettagli Tracker</h5>
                  <p>
                    <strong>Tipo Partita:</strong>{" "}
                    {statistica.tracker.tipoPartita}
                  </p>
                  <p>
                    <strong>Attività:</strong> {statistica.tracker.attività} km
                  </p>
                  <p>
                    <strong>Distanza:</strong> {statistica.tracker.distanza} km
                  </p>
                  <p>
                    <strong>Passaggi:</strong> {statistica.tracker.passaggi}
                  </p>
                  <p>
                    <strong>Corsa:</strong> {statistica.tracker.corsa}
                  </p>
                  <p>
                    <strong>Numero Sprint:</strong>{" "}
                    {statistica.tracker.numeroSprint}
                  </p>
                  <p>
                    <strong>Sprint Medio:</strong>{" "}
                    {statistica.tracker.sprintMedio} m/s
                  </p>
                  <p>
                    <strong>Sprint Massimo:</strong>{" "}
                    {statistica.tracker.sprintMassimo} m/s
                  </p>
                  <p>
                    <strong>Possesso:</strong> {statistica.tracker.possesso}
                  </p>
                  <p>
                    <strong>Tiri:</strong> {statistica.tracker.tiri}
                  </p>
                  <p>
                    <strong>Tiro Massimo:</strong>{" "}
                    {statistica.tracker.tiroMassimo} km/h
                  </p>
                  <p>
                    <strong>Tiro Medio:</strong> {statistica.tracker.tiroMedio}{" "}
                    km/h
                  </p>
                  <p>
                    <strong>Valutazione 5 Stelle:</strong>{" "}
                    {statistica.tracker.valutazione5Stelle}
                  </p>
                  <p>
                    <strong>Analisi Allenatore:</strong>{" "}
                    {statistica.tracker.analisiAllenatore}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <Button onClick={() => handleCreateStatistiche()}>
          Crea Statistiche
        </Button>
      )}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="text-black"
      >
        <Modal.Header closeButton>
          <Modal.Title>Crea Nuova Partita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSaveEdit}>
            <div className="mb-3">
              <label className="form-label">Colore Squadra</label>
              <select
                className="form-select"
                value={modificaStatistica.coloreSquadra}
                onChange={(e) =>
                  setModificaStatistica({
                    ...modificaStatistica,
                    coloreSquadra: e.target.value,
                  })
                }
                required
              >
                <option value="">Seleziona un colore</option>
                <option value="rosso">Rosso</option>
                <option value="blu">Blu</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Gol</label>
              <input
                type="number"
                className="form-control"
                value={modificaStatistica.gol}
                onChange={(e) =>
                  setModificaStatistica({
                    ...modificaStatistica,
                    gol: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Assist</label>
              <input
                type="number"
                className="form-control"
                value={modificaStatistica.assist}
                onChange={(e) =>
                  setModificaStatistica({
                    ...modificaStatistica,
                    assist: e.target.value,
                  })
                }
                required
              />
            </div>
            <Button type="submit">Salva modifica</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annulla
          </Button>
        </Modal.Footer>
      </Modal>
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
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFormTracker(false)}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default StatistichePartite;
