import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import TopBar from "../TopBar";
import httpClient from "../../services/httpClient";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const [notizie, setNotizie] = useState(null);
  const atleta = useSelector((state) => state.atleta.atleta);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    titolo: "",
    testo: "",
    autore: "",
    immagine: null,
  });
  const [file, setFile] = useState(null);
  const [showModalUpdateImg, setShowModalUpdateImg] = useState(false);
  const [notiziaSelected, setNotiziaSelected] = useState(null);
  const [updateText, setUpdateText] = useState({
    titolo: "",
    testo: "",
    autore: "",
  });
  const [showModalText, setShowModalText] = useState(false);

  const fetchNotizie = () => {
    httpClient
      .get("/notizie?sortBy=dataCreazione&order=desc")
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

  const isAdminOrSuperadmin = () => {
    return atleta?.ruolo === "ADMIN" || atleta?.ruolo === "SUPERADMIN";
  };

  const handleCreateNotizia = (e) => {
    e.preventDefault();
    const bodyFormData = new FormData();
    bodyFormData.append("titolo", formData.titolo);
    bodyFormData.append("testo", formData.testo);
    bodyFormData.append("autore", formData.autore);
    if (formData.immagine) {
      bodyFormData.append("immagine", formData.immagine);
    }
    httpClient
      .post("/notizie", bodyFormData)
      .then((response) => {
        fetchNotizie();
        setShowModal(false);
      })
      .catch((error) => {
        console.log("Errore nella richiesta:", error);
      });
  };

  const handleUpdateImg = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("immagine", file);
    httpClient
      .put(`/notizie/${notiziaSelected}/immagine`, formData)
      .then((response) => {
        fetchNotizie();
        setShowModalUpdateImg(false);
      })
      .catch((error) => {
        console.log("Errore nella richiesta:", error);
      });
  };

  const handleUpdateText = (e) => {
    e.preventDefault();
    httpClient
      .put(`/notizie/${notiziaSelected}`, updateText)
      .then((response) => {
        fetchNotizie();
        setShowModalText(false);
      })
      .catch((error) => {
        console.log("Errore nella richiesta:", error);
      });
  };

  const deleteNotizia = (notiziaId) => {
    httpClient
      .delete(`/notizie/${notiziaId}`)
      .then((response) => {
        console.log("Notizia cancellata:", response.data);
        fetchNotizie();
      })
      .catch((error) => {
        console.log("Errore nella cancellazione della partita:", error);
      });
  };

  return (
    <Container>
      <TopBar />
      <div className="d-flex justify-content-between align-items-center">
        <h2>Notizie</h2>
        {isAdminOrSuperadmin() && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-plus-square me-1"
            viewBox="0 0 16 16"
            onClick={() => {
              setShowModal(true);
            }}
            style={{ cursor: "pointer" }}
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
        )}{" "}
      </div>
      <Row className="mt-4">
        {notizie?.length > 0 && (
          <>
            <Col xs={12} md={12} className="mb-4">
              <Card>
                <Card.Img variant="top" src={notizie[0].immagine} />
                {isAdminOrSuperadmin() && (
                  <div
                    onClick={() => {
                      setShowModalUpdateImg(true),
                        setNotiziaSelected(notizie[0].id);
                    }}
                  >
                    modifica img
                  </div>
                )}
                <Card.Body>
                  <Card.Title>{notizie[0].titolo}</Card.Title>
                  <Card.Text>{notizie[0].testo}</Card.Text>
                  <Card.Footer className="text-muted">
                    Autore: {notizie[0].autore}
                  </Card.Footer>
                  {isAdminOrSuperadmin() && (
                    <div
                      onClick={() => {
                        setShowModalText(true),
                          setNotiziaSelected(notizie[0].id),
                          setUpdateText({
                            titolo: notizie[0].titolo,
                            testo: notizie[0].testo,
                            autore: notizie[0].autore,
                          });
                      }}
                    >
                      modifica testo
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
            {notizie.length > 1 && (
              <Col xs={12} md={6} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={notizie[1].immagine} />
                  {isAdminOrSuperadmin() && (
                    <div
                      onClick={() => {
                        setShowModalUpdateImg(true),
                          setNotiziaSelected(notizie[1].id);
                      }}
                    >
                      modifica img
                    </div>
                  )}
                  <Card.Body>
                    <Card.Title>{notizie[1].titolo}</Card.Title>
                    <Card.Text>{notizie[1].testo}</Card.Text>
                    <Card.Footer className="text-muted">
                      Autore: {notizie[1].autore}
                    </Card.Footer>
                    {isAdminOrSuperadmin() && (
                      <div
                        onClick={() => {
                          setShowModalText(true),
                            setNotiziaSelected(notizie[1].id),
                            setUpdateText({
                              titolo: notizie[1].titolo,
                              testo: notizie[1].testo,
                              autore: notizie[1].autore,
                            });
                        }}
                      >
                        modifica testo
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            )}
            {notizie.length > 1 && (
              <Col xs={12} md={6} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={notizie[2].immagine} />
                  {isAdminOrSuperadmin() && (
                    <div
                      onClick={() => {
                        setShowModalUpdateImg(true),
                          setNotiziaSelected(notizie[2].id);
                      }}
                    >
                      modifica img
                    </div>
                  )}
                  <Card.Body>
                    <Card.Title>{notizie[2].titolo}</Card.Title>
                    <Card.Text>{notizie[2].testo}</Card.Text>
                    <Card.Footer className="text-muted">
                      Autore: {notizie[2].autore}
                    </Card.Footer>
                    {isAdminOrSuperadmin() && (
                      <div
                        onClick={() => {
                          setShowModalText(true),
                            setNotiziaSelected(notizie[2].id),
                            setUpdateText({
                              titolo: notizie[2].titolo,
                              testo: notizie[2].testo,
                              autore: notizie[2].autore,
                            });
                        }}
                      >
                        modifica testo
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            )}
            {notizie.slice(3).map((notizia, index) => (
              <Col xs={12} md={6} lg={4} key={index} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={notizia.immagine} />
                  {isAdminOrSuperadmin() && (
                    <div
                      onClick={() => {
                        setShowModalUpdateImg(true);
                        setNotiziaSelected(notizia.id);
                      }}
                    >
                      modifica img
                    </div>
                  )}
                  <Card.Body>
                    <Card.Title>{notizia.titolo}</Card.Title>
                    <Card.Text>{notizia.testo}</Card.Text>
                    <Card.Footer className="text-muted">
                      Autore: {notizia.autore}
                    </Card.Footer>
                    {isAdminOrSuperadmin() && (
                      <>
                        <div
                          onClick={() => {
                            setShowModalText(true);
                            setNotiziaSelected(notizia.id);
                            setUpdateText({
                              titolo: notizia.titolo,
                              testo: notizia.testo,
                              autore: notizia.autore,
                            });
                          }}
                        >
                          modifica testo
                        </div>
                        <div
                          onClick={() => {
                            deleteNotizia(notizia.id);
                          }}
                        >
                          cancella notizia
                        </div>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </>
        )}
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-black">Gestisci Notizia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateNotizia}>
            <Form.Group controlId="formTitolo">
              <Form.Label>Titolo</Form.Label>
              <Form.Control
                type="text"
                name="titolo"
                value={formData.titolo}
                onChange={(e) =>
                  setFormData({ ...formData, titolo: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formTesto">
              <Form.Label>Testo</Form.Label>
              <Form.Control
                as="textarea"
                name="testo"
                value={formData.testo}
                onChange={(e) =>
                  setFormData({ ...formData, testo: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formAutore">
              <Form.Label>Autore</Form.Label>
              <Form.Control
                type="text"
                name="autore"
                value={formData.autore}
                onChange={(e) =>
                  setFormData({ ...formData, autore: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formImmagine">
              <Form.Label>Immagine</Form.Label>
              <Form.Control
                type="file"
                name="immagine"
                onChange={(e) =>
                  setFormData({ ...formData, immagine: e.target.files[0] })
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Salva
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showModalText} onHide={() => setShowModalText(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-black">Gestisci Notizia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateText}>
            <Form.Group controlId="formTitolo">
              <Form.Label>Titolo</Form.Label>
              <Form.Control
                type="text"
                name="titolo"
                value={updateText.titolo}
                onChange={(e) =>
                  setUpdateText({ ...updateText, titolo: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formTesto">
              <Form.Label>Testo</Form.Label>
              <Form.Control
                as="textarea"
                name="testo"
                value={updateText.testo}
                onChange={(e) =>
                  setUpdateText({ ...updateText, testo: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formAutore">
              <Form.Label>Autore</Form.Label>
              <Form.Control
                type="text"
                name="autore"
                value={updateText.autore}
                onChange={(e) =>
                  setUpdateText({ ...updateText, autore: e.target.value })
                }
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Salva
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        show={showModalUpdateImg}
        onHide={() => setShowModalUpdateImg(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-black">Carica Immagine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateImg}>
            <Form.Group controlId="formImmagine">
              <Form.Label>Seleziona Immagine</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Salva
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
export default Home;
