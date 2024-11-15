import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import Giocatore from "./Giocatore";
import { Container } from "react-bootstrap";
import TopBar from "../TopBar";

const Formazione = () => {
  const [giocatori, setGiocatori] = useState([
    { id: "1", nome: "Giocatore 1", x: 0, y: 0, isOnField: false },
    { id: "2", nome: "Giocatore 2", x: 0, y: 0, isOnField: false },
    { id: "3", nome: "Giocatore 3", x: 0, y: 0, isOnField: false },
  ]);

  const handleDragEnd = (event) => {
    const { active, delta } = event;

    setGiocatori((prevGiocatori) =>
      prevGiocatori.map((giocatore) =>
        giocatore.id === active.id
          ? {
              ...giocatore,
              x: giocatore.isOnField ? giocatore.x + delta.x : delta.x,
              y: giocatore.isOnField ? giocatore.y + delta.y : delta.y,
              isOnField: true,
            }
          : giocatore
      )
    );
  };

  return (
    <Container>
      <TopBar />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div>
          <h2>Lista Giocatori</h2>
          {giocatori
            .filter((giocatore) => !giocatore.isOnField)
            .map((giocatore) => (
              <Giocatore
                key={giocatore.id}
                giocatore={giocatore}
                isOnField={false}
              />
            ))}
        </div>
        <h2>Campo</h2>
        <div className="bg-campo">
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
