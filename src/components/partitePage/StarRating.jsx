import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import httpClient from "../../services/httpClient";

const StarRating = ({ statistica }) => {
  console.log(statistica);

  const atleta = useSelector((state) => state.atleta.atleta);
  const [rating, setRating] = useState(0);
  const [existingVote, setExistingVote] = useState(null);
  const [averageVote, setAverageVote] = useState(0);

  useEffect(() => {
    if (statistica.voti) {
      const voto = statistica.voti.find((voto) => voto.atleta.id === atleta.id);
      if (voto) {
        setRating(voto.voto);
        setExistingVote(voto);
      }
      calculateAverageVote(statistica.voti);
    }
  }, []);

  const calculateAverageVote = (votes) => {
    if (votes.length > 0) {
      const average =
        votes.reduce((acc, voto) => acc + voto.voto, 0) / votes.length;
      setAverageVote(average);
    } else {
      setAverageVote(0);
    }
  };

  const handleClick = (value) => {
    setRating(value);
    if (existingVote) {
      httpClient
        .put(`/voti/${existingVote.id}`, { voto: value })
        .then((response) => {
          console.log("Voto aggiornato:", response);
          const updatedVote = { ...existingVote, voto: value };
          setExistingVote(updatedVote);
          const updatedVotes = statistica.voti.map((v) =>
            v.atleta.id === atleta.id ? { ...v, voto: value } : v
          );
          calculateAverageVote(updatedVotes);
          statistica.voti = updatedVotes;
        })
        .catch((error) => {
          console.error("Errore durante l'aggiornamento del voto:", error);
        });
    } else {
      httpClient
        .post(`/voti/${statistica.id}`, {
          atletaId: atleta.id,
          statisticaId: statistica.id,
          voto: value,
        })
        .then((response) => {
          console.log("Voto salvato:", response);
          const newVote = {
            id: response.data.id,
            atleta: { id: atleta.id },
            voto: value,
          };
          setExistingVote(newVote);
          const updatedVotes = [...statistica.voti, newVote];
          calculateAverageVote(updatedVotes);
          statistica.voti = updatedVotes;
        })
        .catch((error) => {
          console.error("Errore durante il salvataggio del voto:", error);
        });
    }
  };

  return (
    <div>
      <h3>Vota {statistica?.atleta.cognome}</h3>
      {[...Array(10)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleClick(index + 1)}
          style={{
            cursor: "pointer",
            color: index < rating ? "#FFD700" : "#ccc",
          }}
        >
          ★
        </span>
      ))}
      <p>Voto medio: {averageVote}</p>
    </div>
  );
};

export default StarRating;
