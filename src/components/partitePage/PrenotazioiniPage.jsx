import { useParams } from "react-router-dom";
import { Button, Col, Container, Dropdown, Modal, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import httpClient from "../../services/httpClient";
import TopBar from "../TopBar";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const PrenotazioiniPage = () => {
  const { partitaId } = useParams();
  const [partita, setPartita] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statoPrenotazione, setStatoPrenotazione] = useState(null);
  const [prenotazioneSelezionata, setPrenotazioneSelezionata] = useState(null);
  const atleta = useSelector((state) => state.atleta.atleta);
  const admin = atleta?.ruolo == "ADMIN" || atleta?.ruolo == "SUPERADMIN";
  const [showDelete, setShowDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPartita = () => {
    setIsLoading(true);
    httpClient
      .get(`/partite/${partitaId}`)
      .then((response) => {
        setPartita(response.data);
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

  const statoPrenotazioneIcon = (statoPrenotazione) => {
    switch (statoPrenotazione) {
      case "ATTESA":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="blck"
            className="bi bi-hourglass-split"
            viewBox="0 0 16 16"
          >
            <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z" />
          </svg>
        );
      case "APPROVATA":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="green"
            className="bi bi-check-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8a8 8 0 1 1-16 0 8 8 0 0 1 16 0zM6.97 10.97l6-6a.75.75 0 0 0-1.06-1.06L6 9.94 4.53 8.47a.75.75 0 1 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0z" />
          </svg>
        );
      case "RIFIUTATA":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="red"
            className="bi bi-sign-stop-fill"
            viewBox="0 0 16 16"
          >
            <path d="M10.371 8.277v-.553c0-.827-.422-1.234-.987-1.234-.572 0-.99.407-.99 1.234v.553c0 .83.418 1.237.99 1.237.565 0 .987-.408.987-1.237m2.586-.24c.463 0 .735-.272.735-.744s-.272-.741-.735-.741h-.774v1.485z" />
            <path d="M4.893 0a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146A.5.5 0 0 0 11.107 0zM3.16 10.08c-.931 0-1.447-.493-1.494-1.132h.653c.065.346.396.583.891.583.524 0 .83-.246.83-.62 0-.303-.203-.467-.637-.572l-.656-.164c-.61-.147-.978-.51-.978-1.078 0-.706.597-1.184 1.444-1.184.853 0 1.386.475 1.436 1.087h-.645c-.064-.32-.352-.542-.797-.542-.472 0-.77.246-.77.6 0 .261.196.437.553.522l.654.161c.673.164 1.06.487 1.06 1.11 0 .736-.574 1.228-1.544 1.228Zm3.427-3.51V10h-.665V6.57H4.753V6h3.006v.568H6.587Zm4.458 1.16v.544c0 1.131-.636 1.805-1.661 1.805-1.026 0-1.664-.674-1.664-1.805V7.73c0-1.136.638-1.807 1.664-1.807s1.66.674 1.66 1.807ZM11.52 6h1.535c.82 0 1.316.55 1.316 1.292 0 .747-.501 1.289-1.321 1.289h-.865V10h-.665V6.001Z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleDeletePrenotazione = (prenotazioneId) => {
    setIsLoading(true);
    httpClient
      .delete(`/prenotazioni-partite/${prenotazioneId}`)
      .then(() => {
        toast.success("Prenotazione eliminata con successo");
        fetchPartita();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleEditPrenotazione = (prenotazione) => {
    setPrenotazioneSelezionata(prenotazione);
    setShowModal(true);
  };

  const handleSavePrenotazione = (event) => {
    event.preventDefault();
    const updatedPrenotazione = {
      ...prenotazioneSelezionata,
      statoPrenotazione,
    };
    setIsLoading(true);
    httpClient
      .put(
        `/prenotazioni-partite/${prenotazioneSelezionata.id}`,
        updatedPrenotazione
      )
      .then(() => {
        toast.success("Prenotazione modificata con successo");
        fetchPartita();
        setShowModal(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
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
      {partita && (
        <div className="civ-color p-4 rounded-4 border border-3">
          <h1>Prenotazioni Partita</h1>
          <div className="my-4">
            <h4>
              {getDateInfo(partita.data).mese} - {partita.tipoPartita}
            </h4>
            <h5>
              {getDateInfo(partita.data).giornoDellaSettimana}{" "}
              {getDateInfo(partita.data).numeroDelGiorno} ore:{" "}
              {getDateInfo(partita.data).orario}
            </h5>
          </div>
          <h2 className="mb-4">Lista Prenotati</h2>
          <Row className="g-3">
            {partita.prenotazioniPartite.map((prenotazione, index) => (
              <Col key={index} xs={12}>
                <Row className=" border border-1 p-3 rounded-4 g-2">
                  <Col xs={12}>
                    <div className="d-flex align-items-center">
                      <img
                        src={prenotazione.atleta.avatar}
                        alt="avatar-atleta"
                        className="rounded-circle object-fit-cover"
                        style={{ width: "4rem", height: "4rem" }}
                      />
                      <h4 className="ms-2">
                        {prenotazione.atleta.nome} {prenotazione.atleta.cognome}
                      </h4>
                      <div className="ms-auto">
                        <div>
                          {statoPrenotazioneIcon(
                            prenotazione.statoPrenotazione
                          )}
                        </div>
                        {admin && (
                          <>
                            <Dropdown align="end" className="scale">
                              <Dropdown.Toggle
                                as="div"
                                id="dropdown-custom-components"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="1.3rem"
                                  height="1.3rem"
                                  fill="currentColor"
                                  className="bi bi-person-fill-gear"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                                </svg>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  as="button"
                                  onClick={() =>
                                    handleEditPrenotazione(prenotazione)
                                  }
                                >
                                  Modifica Prenotazione
                                </Dropdown.Item>
                                <Dropdown.Item
                                  as="button"
                                  onClick={() => setShowDelete(true)}
                                >
                                  Cancella Prenotazione
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                            <Modal
                              show={showDelete}
                              onHide={() => setShowDelete(false)}
                            >
                              <Modal.Header closeButton>
                                <Modal.Title>Elimina Prenotazione</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <h3>
                                  Sei sicuro di voler eliminare questa
                                  Prenotazione?
                                </h3>
                                <Button
                                  className="mt-2"
                                  type="button"
                                  onClick={() => {
                                    setShowDelete(false);
                                    handleDeletePrenotazione(prenotazione.id);
                                  }}
                                >
                                  elimina
                                </Button>
                              </Modal.Body>
                            </Modal>
                          </>
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col>
                    {prenotazione.atleta.ruoloInCampoPrimario && (
                      <>
                        <p>
                          <b>Ruolo in Campo principale: </b>
                          {prenotazione.atleta.ruoloInCampoPrimario}
                        </p>
                        <p>
                          <b>Ruolo in Campo secondario: </b>
                          {prenotazione.atleta.ruoloInCampoSecondario}
                        </p>
                        <p>
                          <b>Ruolo in Campo alternativo: </b>
                          {prenotazione.atleta.ruoloInCampoAlternativo}
                        </p>
                      </>
                    )}
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
        </div>
      )}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="text-black"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifica Prenotazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSavePrenotazione}>
            <div className="mb-3">
              <label className="form-label">Stato Prenotazione</label>
              <select
                className="form-select"
                value={
                  statoPrenotazione ||
                  prenotazioneSelezionata?.statoPrenotazione ||
                  ""
                }
                onChange={(e) => setStatoPrenotazione(e.target.value)}
                required
              >
                <option value="">Seleziona lo stato</option>
                <option value="ATTESA">Attesa</option>
                <option value="APPROVATA">Approvata</option>
                <option value="RIFIUTATA">Rifiutata</option>
              </select>
            </div>
            <Button variant="primary" type="submit">
              Salva Modifiche
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

export default PrenotazioiniPage;
