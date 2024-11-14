import { useEffect, useState } from "react";
import TopBar from "../TopBar";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import httpClient from "../../services/httpClient";
import Profilo from "./Profilo";
import { toast } from "react-toastify";

const MembriPage = () => {
  const [atleti, setAtleti] = useState(null);
  const navigate = useNavigate();
  const loginError = useSelector((state) => state.errors.loginError);
  const startingAtleta = useSelector((state) => state.atleta.atleta);
  const [selectAtleta, setSelectAtleta] = useState(null);
  const showAtleta = selectAtleta ? selectAtleta : startingAtleta;
  const [isLoading, setIsLoading] = useState(true);

  const fetchAtleta = () => {
    setIsLoading(true);
    httpClient
      .get("/atleti")
      .then((response) => {
        setAtleti(response.data.content);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteAtleta = (atletaId) => {
    httpClient
      .delete(`/atleti/${atletaId}`)
      .then(() => {
        toast.success("Atleta eliminato con successo");
        setSelectAtleta(startingAtleta);
        fetchAtleta();
      })
      .catch((error) => {
        toast.error(error.message);
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

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <dotlottie-player
          src="https://lottie.host/bb186f94-4d64-4b4f-bc35-916801c9a288/r2wW2ZAOCi.json"
          background="transparent"
          speed="1"
          style={{ width: "300px", height: "300px" }}
          loop
          autoplay
        ></dotlottie-player>
      </div>
    );
  }
  return (
    <Container>
      <TopBar />
      <Row className="g-2">
        <Col lg={8}>
          <Profilo
            showAtleta={showAtleta}
            meProfile={startingAtleta}
            fetchAtleta={fetchAtleta}
            setSelectAtleta={setSelectAtleta}
            handleDeleteAtleta={handleDeleteAtleta}
          />
        </Col>
        <Col lg={4}>
          <div className="civ-color p-4 rounded-4 border border-3">
            <h2 className="text-center titleCIV mb-3">
              Leggende dell&rsquo;Athleticus
            </h2>
            {atleti?.map((membro, index) => (
              <div
                key={index}
                className="border-bottom d-flex justify-content-between mt-2 scale"
                onClick={() => {
                  setSelectAtleta(membro);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <p className={membro.id == showAtleta.id ? "fw-bolder" : ""}>
                  {membro.nome} {membro.cognome}
                </p>
                <img
                  src={membro.avatar}
                  alt="avatar"
                  style={{ width: "2rem", height: "2rem" }}
                  className="rounded-circle object-fit-cover"
                />
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default MembriPage;
