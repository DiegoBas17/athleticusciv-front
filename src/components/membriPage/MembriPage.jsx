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

  const fetchAtleta = () => {
    httpClient
      .get("/atleti")
      .then((response) => {
        setAtleti(response.data.content);
      })
      .catch((error) => {
        toast.error(error.message);
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
                  className="rounded-circle"
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
