import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import Maglia from "./Maglia";

const Giocatore = ({ giocatore, isOnField }) => {
  const [isDragging, setIsDragging] = useState(false);

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
    cursor: isDragging ? "grabbing" : "grab",
  };

  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd = () => setIsDragging(false);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
    >
      <Maglia
        numero={giocatore.id}
        nome={giocatore.nome}
        colore={giocatore.colore}
      />
    </div>
  );
};

export default Giocatore;
