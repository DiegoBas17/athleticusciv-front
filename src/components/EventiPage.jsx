import { useEffect, useState } from "react";
import TopBar from "./TopBar";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import httpClient from "../services/httpClient";
import { useSelector } from "react-redux";

const EventiPage = () => {
  const [partite, setPartite] = useState(null);
  const navigate = useNavigate();
  const loginError = useSelector((state) => state.errors.loginError);

  const fetchPartite = () => {
    httpClient
      .get("/partite")
      .then((response) => {
        setPartite(response.data.content);
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

  return (
    <>
      <TopBar />
      <div>eventi</div>
      <div>ciao</div>
      {partite?.map((partita, index) => (
        <div key={index}>
          <h3>{partita.data}</h3>
          <Button onClick={() => navigate("/partite/" + partita.id)}>
            partita
          </Button>
        </div>
      ))}
    </>
  );
};
export default EventiPage;
