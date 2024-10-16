import { Card, Col, Container, Row } from "react-bootstrap";
import TopBar from "../TopBar";
import httpClient from "../../services/httpClient";
import { useEffect, useState } from "react";

const Home = () => {
  const [notizie, setNotizie] = useState(null);

  const fetchNotizie = () => {
    httpClient
      .get("/notizie?sortBy=dataCreazione&order=asc")
      .then((response) => {
        setNotizie(response.data.content);
        console.log(notizie);
      })
      .catch((error) => {
        console.log("Errore nella richiesta:", error);
      });
  };

  useEffect(() => {
    fetchNotizie();
  }, []);

  return (
    <Container>
      <TopBar />
      <h2>Notizie</h2>
      <Row className="mt-4">
        {notizie?.length > 0 && (
          <>
            <Col xs={12} md={12} className="mb-4">
              <Card>
                <Card.Img variant="top" src={notizie[0].immagine} />
                <Card.Body>
                  <Card.Title>{notizie[0].titolo}</Card.Title>
                  <Card.Text>{notizie[0].testo}</Card.Text>
                  <Card.Footer className="text-muted">
                    Autore: {notizie[0].autore}
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>
            {notizie.length > 1 && (
              <Col xs={12} md={6} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={notizie[1].immagine} />
                  <Card.Body>
                    <Card.Title>{notizie[1].titolo}</Card.Title>
                    <Card.Text>{notizie[1].testo}</Card.Text>
                    <Card.Footer className="text-muted">
                      Autore: {notizie[1].autore}
                    </Card.Footer>
                  </Card.Body>
                </Card>
              </Col>
            )}
            {notizie.length > 1 && (
              <Col xs={12} md={6} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={notizie[2].immagine} />
                  <Card.Body>
                    <Card.Title>{notizie[1].titolo}</Card.Title>
                    <Card.Text>{notizie[1].testo}</Card.Text>
                    <Card.Footer className="text-muted">
                      Autore: {notizie[1].autore}
                    </Card.Footer>
                  </Card.Body>
                </Card>
              </Col>
            )}
            {notizie.slice(3).map((notizia, index) => (
              <Col xs={12} md={6} lg={4} key={index} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={notizia.immagine} />
                  <Card.Body>
                    <Card.Title>{notizia.titolo}</Card.Title>
                    <Card.Text>{notizia.testo}</Card.Text>
                    <Card.Footer className="text-muted">
                      Autore: {notizia.autore}
                    </Card.Footer>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </>
        )}
      </Row>
    </Container>
  );
};
export default Home;
