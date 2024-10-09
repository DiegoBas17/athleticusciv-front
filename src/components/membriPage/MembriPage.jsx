import { useEffect, useState } from "react";
import TopBar from "../TopBar";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import httpClient from "../../services/httpClient";
import Profilo from "./Profilo";
import "./membriPage.scss";

const MembriPage = () => {
  const [atleti, setAtleti] = useState(null);
  const navigate = useNavigate();
  const loginError = useSelector((state) => state.errors.loginError);
  const startingAtleta = useSelector((state) => state.atleta.atleta);
  const [selectAtleta, setSelectAtleta] = useState(null);
  const showAtleta = selectAtleta ? selectAtleta : startingAtleta;

  const fetchAtleta = () => {
    httpClient
      .get("/atleti")
      .then((response) => {
        setAtleti(response.data.content);
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
    fetchAtleta();
  }, []);
  return (
    <Container>
      <TopBar />
      <Row className="g-2">
        <Col lg={4}>
          <div className="civ-color p-4 rounded-4">
            <h2 className="text-center">Leggende dell&rsquo;Athleticus</h2>
            {atleti?.map((membro, index) => (
              <div
                key={index}
                className="border-bottom d-flex justify-content-between mt-2"
                onClick={() => setSelectAtleta(membro)}
              >
                <p>
                  {membro.nome} {membro.cognome}
                </p>
                <img
                  src={membro.avatar}
                  alt="avatar"
                  style={{ width: "2rem", height: "2rem" }}
                  className="rounded-circle"
                />
              </div>
            ))}
          </div>
        </Col>
        <Col lg={8}>
          <Profilo showAtleta={showAtleta} />
        </Col>
      </Row>
    </Container>
  );
};
export default MembriPage;
