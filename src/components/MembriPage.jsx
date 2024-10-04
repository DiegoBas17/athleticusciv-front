import { useEffect, useState } from "react";
import TopBar from "./TopBar";

const MembriPage = () => {
  const [atleti, setAtleti] = useState(null);
  const fetchAtleta = () => {
    fetch(`http://localhost:3001/atleti`, {
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
        console.log(result.content);

        setAtleti(result.content);
      })
      .catch((error) => console.log("Fetch error:", error));
  };

  useEffect(() => {
    fetchAtleta();
  }, []);
  return (
    <>
      <TopBar />
      <div>membri</div>
      <div>ciao</div>
      {atleti?.map((membro, index) => (
        <div key={index}>
          <h3>{membro.nome}</h3>
        </div>
      ))}
    </>
  );
};
export default MembriPage;
