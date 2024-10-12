import { useEffect, useState } from "react";
import TopBar from "./TopBar";
import { Button, Col, Container, Dropdown, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import httpClient from "../services/httpClient";
import { useSelector } from "react-redux";

const PartitePage = () => {
  const [partite, setPartite] = useState(null);
  const navigate = useNavigate();
  const loginError = useSelector((state) => state.errors.loginError);
  const atleta = useSelector((state) => state.atleta.atleta);
  const [showModal, setShowModal] = useState(false);
  const [newPartita, setNewPartita] = useState({
    data: "",
    luogo: "",
    orario: "",
    tipoPartita: "",
  });
  const [editingPartita, setEditingPartita] = useState(null);

  const fetchPartite = () => {
    httpClient
      .get("/partite")
      .then((response) => {
        setPartite(response.data.content);
        console.log(partite);
      })
      .catch((error) => {
        console.log("Errore nella richiesta:", error);
      });
  };

  useEffect(() => {
    if (loginError) {
      navigate("/login");
    }
  }, [loginError, navigate]);

  useEffect(() => {
    fetchPartite();
  }, []);

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

  const isPrenotato = (partita) => {
    return partita.prenotazioniPartite?.some(
      (prenotazione) => prenotazione.atleta.id === atleta.id
    );
  };

  const handlePrenotati = (partitaId) => {
    httpClient
      .post(`/prenotazioni-partite/${partitaId}`)
      .then((response) => {
        console.log(response);
        fetchPartite();
      })
      .catch((error) => {
        console.log("Errore nella richiesta:", error);
      });
  };

  const handleDisdici = (partita) => {
    const prenotazioneId = getPrenotazioneId(partita);
    httpClient
      .delete(`/prenotazioni-partite/${prenotazioneId}`)
      .then((response) => {
        console.log(response);
        console.log(`Atleta disdetto per la partita con ID ${partita.id}`);
        fetchPartite();
      })
      .catch((error) => {
        console.log("Errore nella richiesta:", error);
      });
  };

  const isAdminOrSuperadmin = () => {
    return atleta.ruolo === "ADMIN" || atleta.ruolo === "SUPERADMIN";
  };

  const getPrenotazioneId = (partita) => {
    const prenotazione = partita.prenotazioniPartite?.find(
      (prenotazione) => prenotazione.atleta.id === atleta.id
    );
    return prenotazione.id;
  };

  const handleCreatePartita = (e) => {
    e.preventDefault();
    const localDateTime = `${newPartita.data}T${newPartita.orario}`;
    const partitaData = { ...newPartita, data: localDateTime };
    console.log("Dati inviati:", partitaData);
    const request = editingPartita
      ? httpClient.put(`/partite/${editingPartita}`, {
          ...newPartita,
          data: localDateTime,
        })
      : httpClient.post("/partite", { ...newPartita, data: localDateTime });

    request
      .then((response) => {
        console.log("Partita creata:", response.data);
        setShowModal(false);
        fetchPartite();
      })
      .catch((error) => {
        console.log("Errore nella creazione della partita:", error);
      });
  };

  const handleEditPartita = (partita) => {
    const dateObj = new Date(partita.data);
    const formattedDate = dateObj.toISOString().split("T")[0];
    const formattedTime = dateObj.toISOString().split("T")[1].slice(0, 5);
    setNewPartita({
      data: formattedDate,
      orario: formattedTime,
      luogo: partita.luogo,
      tipoPartita: partita.tipoPartita,
    });
    setShowModal(true);
    setEditingPartita(partita.id);
  };

  const handleDeletePartita = (partitaId) => {
    httpClient
      .delete(`/partite/${partitaId}`)
      .then((response) => {
        console.log("Partita cancellata:", response.data);
        fetchPartite();
      })
      .catch((error) => {
        console.log("Errore nella cancellazione della partita:", error);
      });
  };

  const extractPlaceName = (url) => {
    const regex = /place\/([^/]+)/;
    const match = url.match(regex);
    return match
      ? decodeURIComponent(match[1].replace(/\+/g, " "))
      : "Luogo sconosciuto";
  };

  return (
    <Container>
      <TopBar />
      <div className="civ-color p-4 rounded-4">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Partite Del CIV</h1>
          {isAdminOrSuperadmin && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-plus-square me-1"
              viewBox="0 0 16 16"
              onClick={() => {
                setNewPartita({
                  data: "",
                  orario: "",
                  luogo: "",
                  tipoPartita: "",
                });
                setEditingPartita(null);
                setShowModal(true);
              }}
              style={{ cursor: "pointer" }}
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          )}
        </div>
        {partite?.map((partita, index) => (
          <div
            key={index}
            className="civ-secondColor my-2 p-2 rounded-4 border border-1 rounded-2"
          >
            <Row>
              <Col lg={2}>
                <div className="d-flex flex-column align-items-center border-end">
                  <h4>{getDateInfo(partita.data).giornoDellaSettimana}</h4>
                  <h2>{getDateInfo(partita.data).numeroDelGiorno}</h2>
                  <h6>{getDateInfo(partita.data).mese}</h6>
                </div>
              </Col>
              <Col lg={2}>
                <div className="text-center mt-4">
                  <div className="d-flex justify-content-center align-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-clock-fill me-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                    </svg>
                    <p className="mb-0">{getDateInfo(partita.data).orario}</p>
                  </div>
                  <div className="d-flex justify-content-center align-items-center mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-geo-alt-fill me-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                    </svg>
                    <a
                      href={partita.luogo}
                      className="text-decoration-none text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {extractPlaceName(partita.luogo)}
                    </a>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className="border-start border-1 h-100 px-3">
                  <div>Lista Partecipanati</div>
                  <div className="d-flex">
                    {partita.prenotazioniPartite?.map((prenotazione, index) => (
                      <div key={index}>
                        <img
                          src={prenotazione.atleta.avatar}
                          alt="avatar-atleta"
                          style={{ width: "2rem", height: "2rem" }}
                          className="rounded-circle"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
              <Col lg={2}>
                {isAdminOrSuperadmin() && (
                  <Dropdown align="end">
                    <Dropdown.Toggle as="span" id="dropdown-custom-components">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-person-fill-gear m-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                      </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as="button"
                        onClick={() => handleEditPartita(partita)}
                      >
                        Modifica partita
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={() => handleDeletePartita(partita.id)}
                      >
                        Cancella Partita
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={() =>
                          navigate(`/partite/prenotazioni/${partita.id}`)
                        }
                      >
                        Modifica prenotazioni
                      </Dropdown.Item>
                      <Dropdown.Item as="button">
                        Crea statistiche
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
                <div className="d-flex justify-content-between align-items-center">
                  {isPrenotato(partita) ? (
                    <Button
                      variant="danger"
                      onClick={() => handleDisdici(partita)}
                    >
                      Disdici
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      onClick={() => handlePrenotati(partita.id)}
                    >
                      Prenotati
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        ))}
      </div>
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
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annulla
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default PartitePage;
