import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import httpClient from "../../services/httpClient";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TopBar from "../TopBar";
import StarRating from "./StarRating";
import { toast } from "react-toastify";
import ModalNewTracker from "./ModalNewTracker";

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
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(true);
    httpClient
      .get(`/partite/${partitaId}`)
      .then((response) => {
        setPartita(response.data);
        setModificaStatistica({
          ...modificaStatistica,
          tipoPartita: partita?.tipoPartita,
        });
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchPartita();
  }, []);

  const handleCreateStatistiche = () => {
    setIsLoading(true);
    httpClient
      .post(`/statistiche/${partita.id}`)
      .then(() => {
        toast.success("Statistica creata con successo");
        fetchPartita();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleSaveEdit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    httpClient
      .put(`/statistiche/${statisticaId}`, modificaStatistica)
      .then(() => {
        toast.success("Statistica modificata con successo");
        fetchPartita();
        setShowModal(false);
      })
      .catch((error) => {
        toast.error(error.message);
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
    setIsLoading(true);
    httpClient
      .post(`/tracker/${statisticaId}`, trackerData)
      .then(() => {
        toast.success("Tracker creato con successo");
        fetchPartita();
        setShowFormTracker(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const isAdminOrSuperadmin = () => {
    return atleta.ruolo === "ADMIN" || atleta.ruolo === "SUPERADMIN";
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <dotlottie-player
          src="https://lottie.host/bb186f94-4d64-4b4f-bc35-916801c9a288/r2wW2ZAOCi.json"
          background="transparent"
          speed="1"
          style={{ width: "300px", height: "300px" }}
          loop
          autoplay
        ></dotlottie-player>
      </div>
    );
  }

  return (
    <Container>
      <TopBar />
      {partita && partita.statistiche.length !== 0 ? (
        <div className="civ-color p-4 rounded-4 border border-3">
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
          <Row>
            {partita.statistiche?.map((statistica, index) => (
              <Col key={index} xs={12} lg={6}>
                <div className="rounded-4 border border-3 p-3">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={statistica.atleta.avatar}
                      className="rounded-circle"
                      style={{ width: "4rem", height: "4rem" }}
                    />
                    <h3 className="ms-2">
                      {statistica.atleta.nome} {statistica.atleta.cognome}
                    </h3>
                  </div>
                  <p className="mb-1">Squadra: {statistica.coloreSquadra}</p>
                  <p className="mb-1">Assist: {statistica.assist}</p>
                  <p className="mb-2">Gol: {statistica.gol}</p>
                  {statistica?.tracker ? (
                    <button
                      className="btn-shiny2 py-2 px-3 m-1 scale"
                      onClick={() => setShowTrackerDetails(!showTrackerDetails)}
                    >
                      {showTrackerDetails
                        ? "Nascondi Dettagli Tracker"
                        : "Mostra Dettagli Tracker"}
                    </button>
                  ) : (
                    isAdminOrSuperadmin() && (
                      <button
                        className="btn-shiny3 py-2 px-3 m-1 scale"
                        onClick={() => {
                          setShowFormTracker(true);
                          setStatisticaId(statistica.id);
                        }}
                      >
                        Aggiungi Tracker
                      </button>
                    )
                  )}
                  {isAdminOrSuperadmin() ? (
                    <button
                      className="btn-shiny2 py-2 px-3 m-1 scale"
                      onClick={() => {
                        setShowModal(true);
                        setModificaStatistica({
                          ...modificaStatistica,
                          tipoPartita: partita.tipoPartita,
                          coloreSquadra: statistica.coloreSquadra,
                          gol: statistica.gol,
                          assist: statistica.assist,
                        });
                        setStatisticaId(statistica.id);
                      }}
                    >
                      Modifica statistica
                    </button>
                  ) : (
                    <></>
                  )}
                  <StarRating statistica={statistica} />
                  {showTrackerDetails && (
                    <div className="mt-3 p-3 border border-secondary rounded">
                      <h5>Dettagli Tracker</h5>
                      <p>
                        <strong>Tipo Partita:</strong>{" "}
                        {statistica.tracker.tipoPartita}
                      </p>
                      <p>
                        <strong>Attività:</strong> {statistica.tracker.attività}{" "}
                        km
                      </p>
                      <p>
                        <strong>Distanza:</strong> {statistica.tracker.distanza}{" "}
                        km
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
                        <strong>Tiro Medio:</strong>{" "}
                        {statistica.tracker.tiroMedio} km/h
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
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <>
          <div className="centerGridCIV">
            <div className="text-center">
              <h2>Non ci sono ancora statistiche per questa partita!</h2>
              <h4>
                Assicurati di avere il giusto numero di partecipanti e i giusti
                partecipanti!
              </h4>
              <button
                className="btn-shiny2 py-2 px-3 m-1"
                onClick={() => handleCreateStatistiche()}
              >
                Crea Statistiche
              </button>
            </div>
          </div>
        </>
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
      <ModalNewTracker
        showFormTracker={showFormTracker}
        setShowFormTracker={setShowFormTracker}
        handleCreateTracker={handleCreateTracker}
        trackerData={trackerData}
        handleChange={handleChange}
      />
    </Container>
  );
};

export default StatistichePartite;
