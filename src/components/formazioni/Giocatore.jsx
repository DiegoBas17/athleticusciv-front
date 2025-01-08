import { useDraggable } from "@dnd-kit/core";
import Maglia from "./Maglia";

const Giocatore = ({ giocatore, isOnField }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: giocatore.id,
  });

  const style = {
    position: isOnField ? "absolute" : "relative",
    left: isOnField ? giocatore.x : undefined,
    top: isOnField ? giocatore.y : undefined,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : "",
    padding: "2px",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Maglia
        numero={giocatore.id}
        nome={giocatore.nome}
        colore={giocatore.colore}
      />
    </div>
  );
};

export default Giocatore;
