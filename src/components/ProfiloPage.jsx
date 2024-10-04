import { useParams } from "react-router-dom";
import TopBar from "./TopBar";
import { useEffect, useState } from "react";

const ProfiloPage = () => {
  const { id } = useParams();
  const [atleta, setAtleta] = useState(null);

  const fetchAtleta = () => {
    fetch(`http://localhost:3001/atleti/${id}`, {
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
        setAtleta(result);
      })
      .catch((error) => console.log("Fetch error:", error));
  };

  useEffect(() => {
    fetchAtleta();
  }, []);

  return (
    <>
      <TopBar />
      <div>Profilo</div>
      <div>ciao {atleta?.nome}</div>
    </>
  );
};
export default ProfiloPage;
