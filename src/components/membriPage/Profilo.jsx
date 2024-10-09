import { Col, Row } from "react-bootstrap";
import RadarChart from "./RadarChart";

const Profilo = ({ showAtleta }) => {
  console.log(showAtleta);

  return (
    <div>
      {showAtleta ? (
        <div className="saturated-color p-4 rounded-4">
          <h1>Profilo</h1>
          <h2>
            {showAtleta.nome} {showAtleta.cognome}
          </h2>
          <Row>
            <Col>
              <img
                src={showAtleta.avatar}
                alt="avatar"
                style={{ width: "100%" }}
                className="rounded-circle"
              />
              <p>Membro CIV: {showAtleta.ruolo}</p>
              <p>email: {showAtleta.email}</p>
              <p>numero di telefono: {showAtleta.numeroTelefono}</p>
              <p>partite giocate: {showAtleta.partiteGiocate}</p>
              <p>assist: {showAtleta.totaleAssist}</p>
              <p>gol: {showAtleta.totaleGol}</p>
            </Col>
            <Col>
              <div
                style={{ height: "20rem" }}
                className="dark-color rounded-4 p-3"
              >
                <RadarChart showAtleta={showAtleta} />
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
