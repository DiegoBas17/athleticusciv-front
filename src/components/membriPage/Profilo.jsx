import { Col, Row } from "react-bootstrap";
import RadarChart from "./RadarChart";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";

const Profilo = ({ showAtleta }) => {
  console.log(showAtleta);

  return (
    <div>
      {showAtleta ? (
        <div className="civ-color p-4 rounded-4">
          <h1>Profilo</h1>
          <Row className="g-2">
            <Col lg={4}>
              <h2>
                {showAtleta.nome} {showAtleta.cognome}
              </h2>
              <img
                src={showAtleta.avatar}
                alt="avatar"
                style={{ width: "50%" }}
                className="rounded-circle"
              />
              <div>
                <h3>Dati:</h3>
                <div className="border border-1 rounded-4 p-2">
                  <p>Membro CIV: {showAtleta.ruolo}</p>
                  <p>email: {showAtleta.email}</p>
                  <p>numero di telefono: {showAtleta.numeroTelefono}</p>
                </div>
              </div>
              <div className="border border-1 rounded-4 p-2">
                <p>partite giocate: {showAtleta.partiteGiocate}</p>
                <p>assist: {showAtleta.totaleAssist}</p>
                <p>gol: {showAtleta.totaleGol}</p>
                <p>media gol: {showAtleta.mediaGol}</p>
                <p>media assist: {showAtleta.mediaAssist}</p>
                <p>media voti: {showAtleta.mediaVoti}</p>
              </div>
            </Col>
            <Col lg={6}>
              <div
                style={{ height: "15rem" }}
                className="rounded-4 p-3 mx-auto"
              >
                <RadarChart showAtleta={showAtleta} />
              </div>
              <div style={{ height: "15rem" }} className="rounded-4 p-3">
                <BarChart showAtleta={showAtleta} />
              </div>
              <div style={{ height: "15rem" }} className="rounded-4 p-3">
                <DoughnutChart showAtleta={showAtleta} />
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <div>oh no..</div>
      )}
    </div>
  );
};

export default Profilo;
