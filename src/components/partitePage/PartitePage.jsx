import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TopBar from "../TopBar";
import httpClient from "../../services/httpClient";
import { toast } from "react-toastify";
import ModalCreaPartita from "./ModalCreaPartita";
import ModalEliminaPartita from "./ModalEliminaPartita";
import DropdownPartita from "./DropdownPartita";

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
  const [pagina, setPagina] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPartite = () => {
    setIsLoading(true);
    httpClient
      .get(`/partite?sortBy=data&page=${pagina}`)
      .then((response) => {
        setPartite(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (loginError) {
      navigate("/login");
    }
  }, [loginError, navigate]);

  useEffect(() => {
    fetchPartite();
    console.log(pagina);
  }, [pagina]);

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
    setIsLoading(true);
    httpClient
      .post(`/prenotazioni-partite/${partitaId}`)
      .then(() => {
        toast.success("Prenotazione effettuata con successo");
        fetchPartite();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleDisdici = (partita) => {
    setIsLoading(true);
    const prenotazioneId = getPrenotazioneId(partita);
    httpClient
      .delete(`/prenotazioni-partite/${prenotazioneId}`)
      .then(() => {
        toast.success("Prenotazione disdetta con successo");
        fetchPartite();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const isAdminOrSuperadmin = () => {
    return atleta?.ruolo === "ADMIN" || atleta?.ruolo === "SUPERADMIN";
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
    const request = editingPartita
      ? httpClient.put(`/partite/${editingPartita}`, {
          ...newPartita,
          data: localDateTime,
        })
      : httpClient.post("/partite", { ...newPartita, data: localDateTime });

    request
      .then(() => {
        toast.success("Partita creata con successo");
        setShowModal(false);
        fetchPartite();
      })
      .catch((error) => {
        toast.error(error.message);
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
    setIsLoading(true);
    httpClient
      .delete(`/partite/${partitaId}`)
      .then(() => {
        toast.success("Partita eliminata con successo");
        fetchPartite();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const extractPlaceName = (url) => {
    const regex = /place\/([^/]+)/;
    const match = url.match(regex);
    return match
      ? decodeURIComponent(match[1].replace(/\+/g, " "))
      : "Luogo sconosciuto";
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
      <div className="civ-color p-4 rounded-4 border border-3">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Partite Del CIV</h1>
          {isAdminOrSuperadmin() && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-plus-square me-1 scale"
              role="button"
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
        {partite.content?.map((partita, index) => (
          <div
            key={index}
            className="my-2 p-2 rounded-4 border border-3 rounded-2"
          >
            <Row className="g-3">
              <Col lg={2}>
                <div className="d-flex flex-column align-items-center mt-2">
                  <h4>{getDateInfo(partita.data).giornoDellaSettimana}</h4>
                  <h2>{getDateInfo(partita.data).numeroDelGiorno}</h2>
                  <h6>{getDateInfo(partita.data).mese}</h6>
                </div>
              </Col>
              <Col lg={2}>
                <div className="text-center border-start border-end p-3 h-100">
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
                      className="text-decoration-none"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#004aad" }}
                    >
                      {extractPlaceName(partita.luogo)}
                    </a>
                  </div>
                  <p className="pt-1">{partita.tipoPartita}</p>
                </div>
              </Col>
              <Col lg={6}>
                <div className="border border-1 h-100 p-2 text-center rounded-4 scale">
                  <div
                    onClick={() =>
                      navigate(`/partite/prenotazioni/${partita.id}`)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    Lista Partecipanti
                  </div>
                  <div className="d-flex justify-content-center">
                    {partita.prenotazioniPartite?.map((prenotazione, index) => (
                      <div key={index}>
                        <img
                          src={prenotazione.atleta.avatar}
                          alt="avatar-atleta"
                          style={{ width: "2rem", height: "2rem" }}
                          className="rounded-circle object-fit-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
              <Col lg={2} className="align-self-center">
                {isAdminOrSuperadmin() && (
                  <>
                    <DropdownPartita
                      handleEditPartita={handleEditPartita}
                      partita={partita}
                      setShowDelete={setShowDelete}
                      navigate={navigate}
                    />
                    <ModalEliminaPartita
                      showDelete={showDelete}
                      setShowDelete={setShowDelete}
                      handleDeletePartita={handleDeletePartita}
                      partita={partita}
                    />
                  </>
                )}
                {isPrenotato(partita) ? (
                  <button
                    className="btn-shiny1 py-2 px-3 m-1 w-100 scale"
                    onClick={() => handleDisdici(partita)}
                  >
                    Disdici
                  </button>
                ) : (
                  <button
                    className="btn-shiny3 py-2 px-3 m-1 w-100 scale"
                    onClick={() => handlePrenotati(partita.id)}
                  >
                    Prenotati
                  </button>
                )}
                {partita.statistiche.length > 0 ? (
                  <button
                    className="btn-shiny2 py-2 px-3 m-1 w-100 scale"
                    onClick={() => {
                      navigate(`/partite/statistiche/${partita.id}`);
                    }}
                  >
                    Statistiche
                  </button>
                ) : (
                  isAdminOrSuperadmin() && (
                    <button
                      className="btn-shiny2 py-2 px-3 m-1 w-100 scale"
                      onClick={() => {
                        navigate(`/partite/statistiche/${partita.id}`);
                      }}
                    >
                      Crea statistiche
                    </button>
                  )
                )}
              </Col>
            </Row>
          </div>
        ))}
        <div className="d-flex justify-content-between">
          {pagina > 0 && (
            <button
              className="btn-shiny2 py-2 px-3 m-1"
              onClick={() => setPagina(pagina - 1)}
            >
              Indietro
            </button>
          )}
          {pagina + 1 < partite?.totalPages && (
            <button
              className="btn-shiny2 py-2 px-3 m-1"
              onClick={() => setPagina(pagina + 1)}
            >
              Avanti
            </button>
          )}
        </div>
      </div>
      <ModalCreaPartita
        showModal={showModal}
        setShowModal={setShowModal}
        handleCreatePartita={handleCreatePartita}
        newPartita={newPartita}
        setNewPartita={setNewPartita}
        editingPartita={editingPartita}
      />
    </Container>
  );
};
export default PartitePage;
