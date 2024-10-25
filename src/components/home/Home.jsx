import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import TopBar from "../TopBar";
import httpClient from "../../services/httpClient";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HeroHome from "./HeroHome";
import { toast } from "react-toastify";
import ModalDeleteNotizia from "./ModalDeleteNotizia";
import ModalGestisciNotizie from "./ModalGestisciNotizie";
import DropdownHome from "./DropdownHome";
import ModalCorpoNotizia from "./ModalCorpoNotizia";

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
  const [pagina, setPagina] = useState(0);
  const [showDelete, setShowDelete] = useState(false);

  const fetchNotizie = () => {
    httpClient
      .get(`/notizie?sortBy=dataCreazione&order=desc&page=${pagina}`)
      .then((response) => {
        setNotizie(response.data.content);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    fetchNotizie();
  }, [pagina]);

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
        toast.success("Notizia creata con successo");
      })
      .catch((error) => {
        toast.error(error.message);
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
        toast.success("Notizia aggiornata con successo");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleUpdateText = (e) => {
    e.preventDefault();
    httpClient
      .put(`/notizie/${notiziaSelected}`, updateText)
      .then(() => {
        fetchNotizie();
        setShowModalText(false);
        toast.success("Notizia aggiornata con successo");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const deleteNotizia = (notiziaId) => {
    httpClient
      .delete(`/notizie/${notiziaId}`)
      .then(() => {
        toast.success("Notizia eliminata con successo");
        fetchNotizie();
      })
      .catch((error) => {
        toast.error(error.message);
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
              className="bi bi-plus-square me-1 scale"
              viewBox="0 0 16 16"
              onClick={() => {
                setShowModal(true);
              }}
              style={{ cursor: "pointer" }}
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          )}
        </div>
        <Row className="mt-4 g-2">
          {notizie?.length > 0 && (
            <>
              {/* Notizia 1 */}
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
                      <div className="p-3 h-100 d-flex flex-column">
                        <div className="d-flex justify-content-between">
                          <h3>{notizie[0].titolo}</h3>
                        </div>
                        <h5>{notizie[0].testo}</h5>
                        <div className="d-flex justify-content-between mt-auto">
                          {isAdminOrSuperadmin() && (
                            <div>
                              <DropdownHome
                                setShowModalUpdateImg={setShowModalUpdateImg}
                                setNotiziaSelected={setNotiziaSelected}
                                notizia={notizie[0]}
                                setShowModalText={setShowModalText}
                                setUpdateText={setUpdateText}
                                setShowDelete={setShowDelete}
                              />
                              <ModalDeleteNotizia
                                showDelete={showDelete}
                                setShowDelete={setShowDelete}
                                deleteNotizia={deleteNotizia}
                                notizia={notizie[0]}
                              />
                            </div>
                          )}
                          <p>Autore: {notizie[0].autore}</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              {/* Notizia 2 */}
              {notizie.length > 1 && (
                <Col xs={12} md={6} className="mb-4">
                  <div className="boxShadowCiv rounded-4 overflow-hidden h-100 d-flex flex-column">
                    <img
                      src={notizie[1].immagine}
                      alt="immagine notizia principale"
                      width="100%"
                    />
                    <div className="p-3 d-flex flex-column flex-grow-1">
                      <h3>{notizie[1].titolo}</h3>
                      <h5>{notizie[1].testo}</h5>
                      <div className="d-flex justify-content-between mt-auto">
                        {isAdminOrSuperadmin() && (
                          <>
                            <DropdownHome
                              setShowModalUpdateImg={setShowModalUpdateImg}
                              setNotiziaSelected={setNotiziaSelected}
                              notizia={notizie[1]}
                              setShowModalText={setShowModalText}
                              setUpdateText={setUpdateText}
                              setShowDelete={setShowDelete}
                            />
                            <ModalDeleteNotizia
                              showDelete={showDelete}
                              setShowDelete={setShowDelete}
                              deleteNotizia={deleteNotizia}
                              notizia={notizie[1]}
                            />
                          </>
                        )}
                        <p>Autore: {notizie[1].autore}</p>
                      </div>
                    </div>
                  </div>
                </Col>
              )}
              {/* notizia 3 */}
              {notizie.length > 2 && (
                <Col xs={12} md={6} className="mb-4">
                  <div className="boxShadowCiv rounded-4 overflow-hidden h-100 d-flex flex-column">
                    <img
                      src={notizie[2].immagine}
                      alt="immagine notizia principale"
                      width="100%"
                    />
                    <div className="p-3 d-flex flex-column flex-grow-1">
                      <h3>{notizie[2].titolo}</h3>
                      <h5>{notizie[2].testo}</h5>
                      <div className="d-flex justify-content-between mt-auto">
                        {isAdminOrSuperadmin() && (
                          <>
                            <DropdownHome
                              setShowModalUpdateImg={setShowModalUpdateImg}
                              setNotiziaSelected={setNotiziaSelected}
                              notizia={notizie[2]}
                              setShowModalText={setShowModalText}
                              setUpdateText={setUpdateText}
                              setShowDelete={setShowDelete}
                            />
                            <ModalDeleteNotizia
                              showDelete={showDelete}
                              setShowDelete={setShowDelete}
                              deleteNotizia={deleteNotizia}
                              notizia={notizie[2]}
                            />
                          </>
                        )}
                        <p>Autore: {notizie[2].autore}</p>
                      </div>
                    </div>
                  </div>
                </Col>
              )}
              {/* Altre Notizie */}
              {notizie.slice(3).map((notizia, index) => (
                <Col xs={12} md={6} lg={4} key={index} className="mb-4">
                  <div className="boxShadowCiv rounded-4 overflow-hidden h-100 d-flex flex-column">
                    <img src={notizia.immagine} width="100%" />
                    <div className="p-3 d-flex flex-column flex-grow-1">
                      <div className="d-flex justify-content-between">
                        <h3>{notizia.titolo}</h3>
                      </div>
                      <h5>{notizia.testo}</h5>
                      <div className="d-flex justify-content-between mt-auto">
                        {isAdminOrSuperadmin() && (
                          <>
                            <DropdownHome
                              setShowModalUpdateImg={setShowModalUpdateImg}
                              setNotiziaSelected={setNotiziaSelected}
                              notizia={notizia}
                              setShowModalText={setShowModalText}
                              setUpdateText={setUpdateText}
                              setShowDelete={setShowDelete}
                            />
                            <ModalDeleteNotizia
                              showDelete={showDelete}
                              setShowDelete={setShowDelete}
                              deleteNotizia={deleteNotizia}
                              notizia={notizia}
                            />
                          </>
                        )}
                        <p>Autore: {notizia.autore}</p>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </>
          )}
        </Row>
        <div className="d-flex justify-content-between">
          {pagina > 0 && (
            <button
              className="btn-shiny2 py-2 px-3 m-1"
              onClick={() => setPagina(pagina - 1)}
            >
              Indietro
            </button>
          )}
          <button
            className="btn-shiny2 py-2 px-3 m-1"
            onClick={() => setPagina(pagina + 1)}
          >
            Avanti
          </button>
        </div>
      </div>
      <ModalGestisciNotizie
        showModal={showModal}
        setShowModal={setShowModal}
        handleCreateNotizia={handleCreateNotizia}
        formData={formData}
        setFormData={setFormData}
      />
      <ModalCorpoNotizia
        showModalText={showModalText}
        setShowModalText={setShowModalText}
        handleUpdateText={handleUpdateText}
        updateText={updateText}
        setUpdateText={setUpdateText}
      />
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
            <Button variant="primary" type="submit" className="mt-2">
              Salva
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
export default Home;
