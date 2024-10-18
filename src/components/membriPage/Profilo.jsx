import { Button, Col, Dropdown, Modal, Row } from "react-bootstrap";
import RadarChart from "./RadarChart";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";
import httpClient from "../../services/httpClient";
import { useState } from "react";

const Profilo = ({ showAtleta, meProfile, fetchAtleta, setSelectAtleta }) => {
  const admin = meProfile?.ruolo == "ADMIN" || meProfile?.ruolo == "SUPERADMIN";
  const [ruoliInCampo, setRuoliInCampo] = useState({
    ruoloInCampoPrimario: "",
    ruoloInCampoSecondario: "",
    ruoloInCampoAlternativo: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [showModalAtleta, setShowModalAtleta] = useState(false);
  const [atleta, setAtleta] = useState({
    nome: showAtleta?.nome,
    cognome: showAtleta?.cognome,
    email: showAtleta?.email,
    numeroDiCellulare: showAtleta?.numeroTelefono,
    password: "",
  });
  const [file, setFile] = useState(null);
  const [showModalAvatar, setShowModalAvatar] = useState(false);
  const [showModalAuthorization, setShowModalAuthorization] = useState(false);
  const [authorization, setAuthorization] = useState({
    ruolo: "",
  });
  const [valutazione, setValutazione] = useState({
    difesa: 0,
    velocità: 0,
    resistenza: 0,
    tiro: 0,
    tecnica: 0,
  });
  const [showModalValutazione, setShowModalValutazione] = useState(false);
  const [valutazioneSelected, setValutazioneSelected] = useState({
    id: "",
    tipoValutazione: "",
  });

  const isMeProfile = () => {
    return showAtleta?.id == meProfile?.id;
  };

  const handleChangeRole = (e) => {
    e.preventDefault();
    const endpoint = isMeProfile()
      ? `/atleti/me/ruoli`
      : `/atleti/${showAtleta.id}/ruoli`;
    httpClient
      .put(endpoint, ruoliInCampo)
      .then((response) => {
        console.log("Ruolo aggiornato con successo", response);
        setSelectAtleta({
          ...showAtleta,
          ruoloInCampoPrimario: ruoliInCampo.ruoloInCampoPrimario.toUpperCase(),
          ruoloInCampoSecondario:
            ruoliInCampo.ruoloInCampoSecondario.toUpperCase(),
          ruoloInCampoAlternativo:
            ruoliInCampo.ruoloInCampoAlternativo.toUpperCase(),
        });
        fetchAtleta();
        setShowModal(false);
        setRuoliInCampo({
          ruoloInCampoPrimario: "",
          ruoloInCampoSecondario: "",
          ruoloInCampoAlternativo: "",
        });
      })
      .catch((error) => {
        console.log("Errore nella richiesta:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = isMeProfile() ? `/atleti/me` : `/atleti/${showAtleta.id}`;
    httpClient
      .put(endpoint, atleta)
      .then((response) => {
        console.log("Atleta aggiornato con successo", response);
        fetchAtleta();
        setShowModalAtleta(false);
        setSelectAtleta({
          ...showAtleta,
          nome: atleta.nome,
          cognome: atleta.cognome,
          email: atleta.email,
          numeroTelefono: atleta.numeroDiCellulare,
        });
        setAtleta({
          nome: showAtleta.nome,
          cognome: showAtleta.cognome,
          email: showAtleta.email,
          numeroDiCellulare: showAtleta.numeroTelefono,
          password: "",
        });
      })
      .catch((error) => {
        console.log("Errore nella richiesta:", error);
      });
  };

  const handleUpdateAvatar = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", file);
    const endpoint = isMeProfile()
      ? `/atleti/me/avatar`
      : `/atleti/${showAtleta.id}/avatar`;
    httpClient
      .put(endpoint, formData)
      .then((response) => {
        console.log("Avatar aggiornato con successo", response);
        fetchAtleta();
      })
      .catch((error) => {
        console.log("Errore nella richiesta:", error);
      });
  };

  const modalAvatar = () => {
    if (isMeProfile() || admin) {
      setShowModalAvatar(true);
    }
  };

  const handleUpdateAuthorization = (e) => {
    e.preventDefault();
    httpClient
      .patch(`/atleti/${showAtleta.id}/authorization`, authorization)
      .then((response) => {
        console.log("Autorizzazione aggiornata con successo", response);
        setSelectAtleta({
          ...showAtleta,
          ruolo: authorization.ruolo.toUpperCase(),
        });
        fetchAtleta();
        setShowModalAuthorization(false);
      })
      .catch((error) => {
        console.log("Errore nella richiesta:", error);
      });
  };

  const handleUpadteValutazione = (e) => {
    e.preventDefault();
    httpClient
      .put(`/valutazioni/${valutazioneSelected.id}`, valutazione)
      .then((response) => {
        console.log("Valutazione aggiornata con successo", response);
        setSelectAtleta((prevAtleta) => ({
          ...prevAtleta,
          [valutazioneSelected.tipoValutazione === "valutazioneAdmin"
            ? "valutazioneAdmin"
            : "valutazioneCIV"]: {
            ...valutazione,
          },
        }));
        fetchAtleta();
        setShowModalValutazione(false);
      })
      .catch((error) => {
        console.log("Errore nella richiesta:", error);
      });
  };

  const handleOpenModalValutazione = (tipo, valutazioneData) => {
    setValutazioneSelected({
      id: valutazioneData.id,
      tipoValutazione: tipo,
    });
    setValutazione({
      difesa: valutazioneData.difesa,
      velocità: valutazioneData.velocità,
      resistenza: valutazioneData.resistenza,
      tiro: valutazioneData.tiro,
      tecnica: valutazioneData.tecnica,
    });
    setShowModalValutazione(true);
  };

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
              <div onClick={() => modalAvatar()}>
                <img
                  src={showAtleta.avatar}
                  alt="avatar"
                  style={{ width: "10rem", height: "10rem" }}
                  className="rounded-circle"
                />
              </div>
              <div>
                <h3>Dati:</h3>
                <div className="d-flex justify-content-between">
                  <p>Membro CIV: {showAtleta.ruolo}</p>{" "}
                  {(isMeProfile() || admin) && (
                    <div onClick={() => setShowModalAuthorization(true)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="border border-1 rounded-4 p-2">
                  <div className="d-flex justify-content-between">
                    <p>email: {showAtleta.email}</p>
                    {(isMeProfile() || admin) && (
                      <div
                        onClick={() => {
                          setShowModalAtleta(true),
                            setAtleta({
                              nome: showAtleta.nome || "",
                              cognome: showAtleta.cognome || "",
                              email: showAtleta.email || "",
                              numeroDiCellulare:
                                showAtleta.numeroTelefono || "",
                              password: "",
                            });
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pencil"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p>numero di telefono: {showAtleta.numeroTelefono}</p>
                </div>
              </div>
              <div className="border border-1 rounded-4 p-2">
                <div className="d-flex justify-content-between">
                  <p>
                    Ruolo in campo Principale:{" "}
                    {showAtleta?.ruoloInCampoPrimario}
                  </p>
                  {(isMeProfile() || admin) && (
                    <div onClick={() => setShowModal(true)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                      </svg>
                    </div>
                  )}
                </div>
                <p>
                  Ruolo in campo Secondario:{" "}
                  {showAtleta?.ruoloInCampoSecondario}
                </p>
                <p>
                  Ruolo in campo Alternativo:{" "}
                  {showAtleta?.ruoloInCampoAlternativo}
                </p>
              </div>
            </Col>
            <Col lg={6}>
              <div style={{ height: "20rem" }} className="rounded-4 p-3">
                <Dropdown align="end">
                  <Dropdown.Toggle as="span" id="dropdown-custom-components">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-gear-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                    </svg>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() =>
                        handleOpenModalValutazione(
                          "valutazioneAdmin",
                          showAtleta.valutazioneAdmin
                        )
                      }
                    >
                      Modifica Valutazione Admin
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        handleOpenModalValutazione(
                          "valutazioneCIV",
                          showAtleta.valutazioneCIV
                        )
                      }
                    >
                      Modifica Valutazione CIV
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
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
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="text-black"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifica Ruoli in Campo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleChangeRole}>
            <div className="mb-3">
              <label className="form-label">Ruolo Primario</label>
              <select
                className="form-select"
                value={ruoliInCampo.ruoloInCampoPrimario}
                onChange={(e) =>
                  setRuoliInCampo({
                    ...ruoliInCampo,
                    ruoloInCampoPrimario: e.target.value,
                  })
                }
                required
              >
                <option value="">Seleziona il ruolo primario</option>
                <option value="portiere">Portiere</option>
                <option value="difensore">Difensore</option>
                <option value="terzino">Terzino</option>
                <option value="centrocampista">Centrocampista Centrale</option>
                <option value="centrocampistalaterale">
                  Centrocampista Laterale
                </option>
                <option value="attaccante">Attaccante</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Ruolo Secondario</label>
              <select
                className="form-select"
                value={ruoliInCampo.ruoloInCampoSecondario}
                onChange={(e) =>
                  setRuoliInCampo({
                    ...ruoliInCampo,
                    ruoloInCampoSecondario: e.target.value,
                  })
                }
                required
              >
                <option value="">Seleziona il ruolo secondario</option>
                <option value="portiere">Portiere</option>
                <option value="difensore">Difensore</option>
                <option value="terzino">Terzino</option>
                <option value="centrocampista">Centrocampista Centrale</option>
                <option value="centrocampistalaterale">
                  Centrocampista Laterale
                </option>
                <option value="attaccante">Attaccante</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Ruolo Alternativo</label>
              <select
                className="form-select"
                value={ruoliInCampo.ruoloInCampoAlternativo}
                onChange={(e) =>
                  setRuoliInCampo({
                    ...ruoliInCampo,
                    ruoloInCampoAlternativo: e.target.value,
                  })
                }
                required
              >
                <option value="">Seleziona il ruolo alternativo</option>
                <option value="portiere">Portiere</option>
                <option value="difensore">Difensore</option>
                <option value="terzino">Terzino</option>
                <option value="centrocampista">Centrocampista Centrale</option>
                <option value="centrocampistalaterale">
                  Centrocampista Laterale
                </option>
                <option value="attaccante">Attaccante</option>
              </select>
            </div>
            <Button type="submit">
              {isMeProfile() ? "Aggiorna Ruoli" : "Aggiorna Ruoli come Admin"}
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annulla
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showModalAvatar}
        onHide={() => setShowModalAvatar(false)}
        className="text-black"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifica Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateAvatar}>
            <input
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              accept="image/*"
              required
            />
            <Button type="submit">Aggiorna Avatar</Button>
          </form>
          <Modal.Footer>
            <Button type="button" onClick={() => setShowModalAvatar(false)}>
              Chiudi
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
      <Modal
        show={showModalAuthorization}
        onHide={() => setShowModalAuthorization(false)}
        className="text-black"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifica Autorizzazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateAuthorization}>
            <div className="mb-3">
              <label className="form-label">Ruolo nel CIV</label>
              <select
                className="form-select"
                value={authorization.ruolo}
                onChange={(e) =>
                  setAuthorization({
                    ruolo: e.target.value,
                  })
                }
                required
              >
                <option value="">Seleziona il ruolo nel CIV</option>
                <option value="VISITATORE">Visitatore</option>
                <option value="ATLETA">Atleta</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPERADMIN">SuperAdmin</option>
              </select>
            </div>
            <Button type="submit">Aggiorna Ruolo</Button>
          </form>
          <Modal.Footer>
            <Button
              type="button"
              onClick={() => setShowModalAuthorization(false)}
            >
              Chiudi
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
      <Modal
        show={showModalAtleta}
        onHide={() => setShowModalAtleta(false)}
        className="text-black"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifica Atleta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input
                type="text"
                className="form-control"
                name="nome"
                value={atleta.nome}
                onChange={(e) =>
                  setAtleta({
                    ...atleta,
                    nome: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Cognome</label>
              <input
                type="text"
                className="form-control"
                name="cognome"
                value={atleta.cognome}
                onChange={(e) =>
                  setAtleta({
                    ...atleta,
                    cognome: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={atleta.email}
                onChange={(e) =>
                  setAtleta({
                    ...atleta,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Numero di Cellulare</label>
              <input
                type="text"
                className="form-control"
                name="numeroDiCellulare"
                value={atleta.numeroDiCellulare}
                onChange={(e) =>
                  setAtleta({
                    ...atleta,
                    numeroDiCellulare: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={atleta.password}
                onChange={(e) =>
                  setAtleta({
                    ...atleta,
                    password: e.target.value,
                  })
                }
                required
              />
            </div>
            <Button type="submit">Salva Atleta</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalAtleta(false)}>
            Annulla
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showModalValutazione}
        onHide={() => setShowModalValutazione(false)}
        className="text-black"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifica Valutazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpadteValutazione}>
            <div className="mb-3">
              <label>
                Difesa:
                <input
                  type="number"
                  name="difesa"
                  min="0"
                  max="100"
                  value={valutazione.difesa}
                  onChange={(e) =>
                    setValutazione({
                      ...valutazione,
                      difesa: e.target.value,
                    })
                  }
                  required
                />
              </label>
            </div>
            <div className="mb-3">
              <label>
                Velocità:
                <input
                  type="number"
                  name="velocita"
                  min="0"
                  max="100"
                  value={valutazione.velocità}
                  onChange={(e) =>
                    setValutazione({
                      ...valutazione,
                      velocità: e.target.value,
                    })
                  }
                  required
                />
              </label>
            </div>
            <div className="mb-3">
              <label>
                Resistenza:
                <input
                  type="number"
                  name="resistenza"
                  min="0"
                  max="100"
                  value={valutazione.resistenza}
                  onChange={(e) =>
                    setValutazione({
                      ...valutazione,
                      resistenza: e.target.value,
                    })
                  }
                  required
                />
              </label>
            </div>
            <div className="mb-3">
              <label>
                Tiro:
                <input
                  type="number"
                  name="tiro"
                  min="0"
                  max="100"
                  value={valutazione.tiro}
                  onChange={(e) =>
                    setValutazione({
                      ...valutazione,
                      tiro: e.target.value,
                    })
                  }
                  required
                />
              </label>
            </div>
            <div className="mb-3">
              <label>
                Tecnica:
                <input
                  type="number"
                  name="tecnica"
                  min="0"
                  max="100"
                  value={valutazione.tecnica}
                  onChange={(e) =>
                    setValutazione({
                      ...valutazione,
                      tecnica: e.target.value,
                    })
                  }
                  required
                />
              </label>
            </div>
            <Button type="submit">Salva</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setShowModalValutazione(false)}>Chiudi</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profilo;
