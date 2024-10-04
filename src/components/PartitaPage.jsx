import { useEffect, useState } from "react";
import TopBar from "./TopBar";
import { useParams } from "react-router-dom";

const PartitaPage = () => {
  const { id } = useParams();
  const [partita, setPartita] = useState(null);

  const fetchPartita = () => {
    fetch(`http://localhost:3001/partite/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel reperimento del profilo");
        }
      })
      .then((result) => {
        console.log(result);

        setPartita(result);
      })
      .catch((error) => console.log("Fetch error:", error));
  };

  useEffect(() => {
    fetchPartita();
  }, []);
  return (
    <>
      <TopBar />
      <div>partita</div>
      <div>ciao {partita?.luogo}</div>
    </>
  );
};
export default PartitaPage;
