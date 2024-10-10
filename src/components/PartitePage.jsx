import { useEffect, useState } from "react";
import TopBar from "./TopBar";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import httpClient from "../services/httpClient";
import { useSelector } from "react-redux";

const PartitePage = () => {
  const [partite, setPartite] = useState(null);
  const navigate = useNavigate();
  const loginError = useSelector((state) => state.errors.loginError);

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

  return (
    <Container>
      <TopBar />
      <div className="civ-color p-4 rounded-4">
        <h1>Partite Del CIV</h1>
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
                      Luogo
                    </a>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <p className="mt-3">Lista Partecipanati</p>
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
              </Col>
              <Col lg={2}>
                <Button>Prenotati</Button>
              </Col>
            </Row>
          </div>
        ))}
      </div>
    </Container>
  );
};
export default PartitePage;
