import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import Giocatore from "./Giocatore";
import { Col, Container, Row } from "react-bootstrap";
import TopBar from "../TopBar";
import { useParams } from "react-router-dom";
import httpClient from "../../services/httpClient";
import { toast } from "react-toastify";

const Formazione = () => {
  const { partitaId } = useParams();
  const [partita, setPartita] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVertical, setIsVertical] = useState(false);
  const [giocatori, setGiocatori] = useState([
    {
      id: "1",
      nome: "Teti",
      x: 0,
      y: 0,
      isOnField: false,
      colore: "black",
    },
    {
      id: "2",
      nome: "Mikalinsky",
      x: 0,
      y: 0,
      isOnField: false,
      colore: "black",
    },
    {
      id: "3",
      nome: "Faro",
      x: 0,
      y: 0,
      isOnField: false,
      colore: "black",
    },
    {
      id: "4",
      nome: "Rico",
      x: 0,
      y: 0,
      isOnField: false,
      colore: "black",
    },
    {
      id: "5",
      nome: "de Sapio",
      x: 0,
      y: 0,
      isOnField: false,
      colore: "black",
    },
    {
      id: "6",
      nome: "Bianco",
      x: 0,
      y: 0,
      isOnField: false,
      colore: "black",
    },
    {
      id: "7",
      nome: "Bianco",
      x: 0,
      y: 0,
      isOnField: false,
      colore: "black",
    },
    {
      id: "8",
      nome: "Frontali",
      x: 0,
      y: 0,
      isOnField: false,
      colore: "black",
    },
    {
      id: "9",
      nome: "Bunduc",
      x: 0,
      y: 0,
      isOnField: false,
      colore: "black",
    },
    {
      id: "10",
      nome: "Torcolini",
      x: 0,
      y: 0,
      isOnField: false,
      colore: "black",
    },
    {
      id: "11",
      nome: "Raffioni",
      x: 0,
      y: 0,
      isOnField: false,
      colore: "black",
    },
    {
      id: "12",
      nome: "Ruiu",
      x: 0,
      y: 0,
      isOnField: false,
      colore: "black",
    },
    {
      id: "13",
      nome: "Picchi",
      x: 0,
      y: 0,
      isOnField: false,
      colore: "black",
    },
    {
      id: "14",
      nome: "Basili",
      x: 0,
      y: 0,
      isOnField: false,
      colore: "black",
    },
    {
      id: "15",
      nome: "di Pietro",
      x: 0,
      y: 0,
      isOnField: false,
      colore: "black",
    },
    {
      id: "16",
      nome: "Roccia",
      x: 0,
      y: 0,
      isOnField: false,
      colore: "black",
    },
  ]);

  const fetchPartita = () => {
    setIsLoading(true);
    httpClient
      .get(`/partite/${partitaId}`)
      .then((response) => {
        setPartita(response.data.prenotazioniPartite);
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
    console.log(partita);
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setIsVertical(true);
      } else {
        setIsVertical(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    const container = document.querySelector(".container-bg");
    const containerWidth = container
      ? container.getBoundingClientRect().width
      : 0;
    const containerHeight = container
      ? container.getBoundingClientRect().height
      : 0;
    const metaCampo = isVertical ? containerHeight / 2 : containerWidth / 2;

    setGiocatori((prevGiocatori) =>
      prevGiocatori.map((giocatore) => {
        if (giocatore.id === active.id) {
          const newX = giocatore.isOnField ? giocatore.x + delta.x : delta.x;
          const newY = giocatore.isOnField ? giocatore.y + delta.y : delta.y;
          let newColore;
          if (isVertical) {
            newColore = newY < metaCampo ? "red" : "blue";
          } else {
            newColore = newX < metaCampo ? "red" : "blue";
          }

          return {
            ...giocatore,
            x: newX,
            y: newY,
            isOnField: true,
            colore: newColore,
          };
        }
        return giocatore;
      })
    );
  };

  return (
    <Container>
      <TopBar />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div>
          <h2>Lista Giocatori</h2>
          <Row>
            {giocatori
              .filter((giocatore) => !giocatore.isOnField)
              .map((giocatore) => (
                <Col key={giocatore.id}>
                  <Giocatore giocatore={giocatore} isOnField={false} />
                </Col>
              ))}
          </Row>
        </div>
        <h2>Campo</h2>
        <div className="container-bg">
          <img
            src="../src/assets/vista-verticale-del-campo-di-calcio-mf1pxm0vhxxkmiex.jpg"
            alt="Campo di calcio"
            className="img-campo"
          />
          {giocatori
            .filter((giocatore) => giocatore.isOnField)
            .map((giocatore) => (
              <Giocatore
                key={giocatore.id}
                giocatore={giocatore}
                isOnField={true}
              />
            ))}
        </div>
      </DndContext>
    </Container>
  );
};

export default Formazione;
