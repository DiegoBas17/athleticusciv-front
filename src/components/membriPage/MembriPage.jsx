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
  const startingAtleta = JSON.parse(localStorage.getItem("atleta"));
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
      <Row>
        <Col lg={4}>
          <div className="pastel-color p-4 rounded-4">
            <h2 className="text-center">Leggende dell&rsquo;Athleticus</h2>
            <Row className="g-2">
              {atleti?.map((membro, index) => (
                <Col key={index} lg={12}>
                  <div
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

                    {/* <div className="position-relative" title="Media Gol">
                    <dotlottie-player
                      src="https://lottie.host/d23bab93-e20a-4353-bfc6-71063ce4c657/NY8kk3quhl.json"
                      background="transparent"
                      speed="1"
                      style={{ width: "5rem", height: "5rem" }}
                      loop
                      autoplay
                    ></dotlottie-player>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 100"
                      width="30"
                      height="30"
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                      }}
                    >
                      <circle cx="50" cy="50" r="45" fill="#FF0000" />
                      <text
                        x="50%"
                        y="53%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fontSize="40"
                        fontWeight="bold"
                        fill="white"
                      >
                        {membro.mediaGol}
                      </text>
                    </svg>
                  </div>
                  <div className="position-relative" title="Media Assist">
                    <dotlottie-player
                      src="https://lottie.host/a7b0185d-de69-4257-9b14-56fd0ab13f1a/VBWIEYmkXY.json"
                      ù
                      background="transparent"
                      speed="1"
                      style={{ width: "5rem", height: "5rem" }}
                      loop
                      autoplay
                    ></dotlottie-player>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 100"
                      width="30"
                      height="30"
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                      }}
                    >
                      <circle cx="50" cy="50" r="45" fill="#FF0000" />
                      <text
                        x="50%"
                        y="53%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fontSize="40"
                        fontWeight="bold"
                        fill="white"
                      >
                        {membro.mediaAssist}
                      </text>
                    </svg>
                  </div>
                  <div className="position-relative" title="Media Voti">
                    <dotlottie-player
                      src="https://lottie.host/f64a0278-6714-4350-bc5c-65011e006e8f/idMpk5d1nt.json"
                      background="transparent"
                      speed="1"
                      style={{ width: "5rem", height: "5rem" }}
                      loop
                      autoplay
                    ></dotlottie-player>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 100"
                      width="30"
                      height="30"
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                      }}
                    >
                      <circle cx="50" cy="50" r="45" fill="#FF0000" />
                      <text
                        x="50%"
                        y="53%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fontSize="40"
                        fontWeight="bold"
                        fill="white"
                      >
                        {membro.mediaVoti}
                      </text>
                    </svg>
                  </div> */}
                  </div>
                </Col>
              ))}
            </Row>
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
