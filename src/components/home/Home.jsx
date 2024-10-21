import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import TopBar from "../TopBar";
import httpClient from "../../services/httpClient";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HeroHome from "./HeroHome";

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
      .then(() => {
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
      .then(() => {
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
      .then(() => {
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
      <HeroHome />
      <div className="civ-color p-4 rounded-4 mt-3">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Notizie</h1>
          {isAdminOrSuperadmin() && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.6rem"
              height="1.6rem"
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
        <Row className="mt-4 g-2">
          {notizie?.length > 0 && (
            <>
              <Col xs={12} className="mb-4">
                <div className="boxShadowCiv rounded-4 overflow-hidden">
                  <Row>
                    <Col xs={12} lg={6}>
                      <img
                        src={notizie[0].immagine}
                        alt="immagine notizia principale"
                        width="100%"
                      />
                    </Col>
                    <Col xs={12} lg={6}>
                      <div className="p-3">
                        <div className="d-flex justify-content-between">
                          <h3>{notizie[0].titolo}</h3>
                          {isAdminOrSuperadmin() && (
                            <div>
                              <Dropdown align="end">
                                <Dropdown.Toggle
                                  as="span"
                                  id="dropdown-custom-components"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    fill="currentColor"
                                    className="bi bi-person-fill-gear"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                                  </svg>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    as="button"
                                    onClick={() => {
                                      setShowModalUpdateImg(true),
                                        setNotiziaSelected(notizie[0].id);
                                    }}
                                  >
                                    Modifica Immagine
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    as="button"
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
                                    Modifica Testo
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    as="button"
                                    onClick={() => {
                                      deleteNotizia(notizie[0].id);
                                    }}
                                  >
                                    Elimina Notizia
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          )}
                        </div>
                        <h5>{notizie[0].testo}</h5>
                        <p className="text-end me-3">
                          Autore: {notizie[0].autore}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              {notizie.length > 1 && (
                <Col xs={12} md={6} className="mb-4">
                  <div className="boxShadowCiv rounded-4 overflow-hidden">
                    <img
                      src={notizie[1].immagine}
                      alt="immagine notizia principale"
                      width="100%"
                    />
                    <div className="p-3">
                      <div className="d-flex justify-content-between">
                        <h3>{notizie[1].titolo}</h3>
                        {isAdminOrSuperadmin() && (
                          <div>
                            <Dropdown align="end">
                              <Dropdown.Toggle
                                as="span"
                                id="dropdown-custom-components"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="25"
                                  height="25"
                                  fill="currentColor"
                                  className="bi bi-person-fill-gear"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                                </svg>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  as="button"
                                  onClick={() => {
                                    setShowModalUpdateImg(true),
                                      setNotiziaSelected(notizie[1].id);
                                  }}
                                >
                                  Modifica Immagine
                                </Dropdown.Item>
                                <Dropdown.Item
                                  as="button"
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
                                  Modifica Testo
                                </Dropdown.Item>
                                <Dropdown.Item
                                  as="button"
                                  onClick={() => {
                                    deleteNotizia(notizie[1].id);
                                  }}
                                >
                                  Elimina Notizia
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        )}
                      </div>
                      <h5>{notizie[1].testo}</h5>
                      <p className="text-end">Autore: {notizie[1].autore}</p>
                    </div>
                  </div>
                </Col>
              )}
              {notizie.length > 2 && (
                <Col xs={12} md={6} className="mb-4">
                  <div className="boxShadowCiv rounded-4 overflow-hidden">
                    <img
                      src={notizie[2].immagine}
                      alt="immagine notizia principale"
                      width="100%"
                    />
                    <div className="p-3">
                      <div className="d-flex justify-content-between">
                        <h2>{notizie[2].titolo}</h2>
                        {isAdminOrSuperadmin() && (
                          <Dropdown align="end">
                            <Dropdown.Toggle
                              as="span"
                              id="dropdown-custom-components"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor"
                                className="bi bi-person-fill-gear"
                                viewBox="0 0 16 16"
                              >
                                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                              </svg>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                as="button"
                                onClick={() => {
                                  setShowModalUpdateImg(true),
                                    setNotiziaSelected(notizie[2].id);
                                }}
                              >
                                Modifica Immagine
                              </Dropdown.Item>
                              <Dropdown.Item
                                as="button"
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
                                Modifica Testo
                              </Dropdown.Item>
                              <Dropdown.Item
                                as="button"
                                onClick={() => {
                                  deleteNotizia(notizie[2].id);
                                }}
                              >
                                Elimina Notizia
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        )}
                      </div>
                      <h5>{notizie[2].testo}</h5>
                      <p className="text-end">Autore: {notizie[2].autore}</p>
                    </div>
                  </div>
                </Col>
              )}
              {notizie.slice(3).map((notizia, index) => (
                <Col xs={12} md={6} lg={4} key={index} className="mb-4">
                  <div className="boxShadowCiv rounded-4 overflow-hidden">
                    <img src={notizia.immagine} width="100%" />
                    <div className="p-3">
                      <div className="d-flex justify-content-between">
                        <h3>{notizia.titolo}</h3>
                        <Dropdown align="end">
                          <Dropdown.Toggle
                            as="span"
                            id="dropdown-custom-components"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              fill="currentColor"
                              className="bi bi-person-fill-gear"
                              viewBox="0 0 16 16"
                            >
                              <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                            </svg>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              as="button"
                              onClick={() => {
                                setShowModalUpdateImg(true);
                                setNotiziaSelected(notizia.id);
                              }}
                            >
                              Modifica Immagine
                            </Dropdown.Item>
                            <Dropdown.Item
                              as="button"
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
                              Modifica Testo
                            </Dropdown.Item>
                            <Dropdown.Item
                              as="button"
                              onClick={() => {
                                deleteNotizia(notizia.id);
                              }}
                            >
                              Elimina Notizia
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <h5>{notizia.testo}</h5>
                      <p className="text-end">Autore: {notizia.autore}</p>
                    </div>
                  </div>
                </Col>
              ))}
            </>
          )}
        </Row>
      </div>
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
