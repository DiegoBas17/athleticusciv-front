import { useEffect, useState } from "react";
import TopBar from "./TopBar";

const EventiPage = () => {
  const [partite, setPartite] = useState(null);

  const fetchAtleta = () => {
    fetch(`http://localhost:3001/partite`, {
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
        setPartite(result.content);
      })
      .catch((error) => console.log("Fetch error:", error));
  };

  useEffect(() => {
    fetchAtleta();
  }, []);
  return (
    <>
      <TopBar />
      <div>eventi</div>
      <div>ciao</div>
      {partite?.map((partita, index) => (
        <div key={index}>
          <h3>{partita.data}</h3>
        </div>
      ))}
    </>
  );
};
export default EventiPage;
