import { Col, Dropdown, Row } from "react-bootstrap";
import RadarChart from "./RadarChart";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";
import httpClient from "../../services/httpClient";
import { useState } from "react";
import { toast } from "react-toastify";
import ModalModificaRuoliInCampo from "./ModalModificaRuoliInCampo";
import ModalModificaAtleta from "./ModalModificaAtleta";
import ModalModificaValutazione from "./ModalModificaValutazione";
import ModalValoriAtleta from "./ModalValoriAtleta";
import ModalModifcaAvatar from "./ModalModifcaAvatar";
import ModalModificaAutorizzazione from "./ModalModificaAutorizzazione";
import ModalEliminaAtleta from "./ModalEliminaAtleta";

const Profilo = ({
  showAtleta,
  meProfile,
  fetchAtleta,
  setSelectAtleta,
  handleDeleteAtleta,
}) => {
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
  const [storico, setStorico] = useState({
    mediaGol: "",
    mediaAssist: "",
    mediaVoti: "",
    partiteGiocate: "",
    totaleGol: "",
    totaleAssist: "",
  });
  const [showStorico, setShowStorico] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

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
      .then(() => {
        toast.success("Ruoli in campo aggiornati con successo");
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
        toast.error(error.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = isMeProfile() ? `/atleti/me` : `/atleti/${showAtleta.id}`;
    httpClient
      .put(endpoint, atleta)
      .then(() => {
        toast.success("Atleta aggiornato con successo");
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
        toast.error(error.message);
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
      .then(() => {
        toast.success("Avatar aggiornato con successo");
        fetchAtleta();
      })
      .catch((error) => {
        toast.error(error.message);
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
      .then(() => {
        toast.success("Autorizzazione aggiornata con successo");
        setSelectAtleta({
          ...showAtleta,
          ruolo: authorization.ruolo.toUpperCase(),
        });
        fetchAtleta();
        setShowModalAuthorization(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleUpadteValutazione = (e) => {
    e.preventDefault();
    httpClient
      .put(`/valutazioni/${valutazioneSelected.id}`, valutazione)
      .then(() => {
        toast.success("Valutazione aggiornata con successo");
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
        toast.error(error.message);
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

  const handleStorico = (e) => {
    e.preventDefault();
    httpClient
      .put(`/atleti/${showAtleta.id}/storico`, storico)
      .then(() => {
        toast.success("Storico aggiornato con successo");
        setSelectAtleta({
          ...showAtleta,
          mediaGol: storico.mediaGol,
          mediaAssist: storico.mediaAssist,
          mediaVoti: storico.mediaVoti,
          partiteGiocate: storico.partiteGiocate,
          totaleGol: storico.totaleGol,
          totaleAssist: storico.totaleAssist,
        });
        fetchAtleta();
        setShowStorico(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      {showAtleta && (
        <div className="civ-color p-3 rounded-4 border border-3">
          <h1>Profilo</h1>
          <Row className="g-2">
            <Col lg={5}>
              <div className="d-flex justify-content-between align-items-center">
                <h2>
                  {showAtleta.nome} {showAtleta.cognome}
                </h2>
                {(isMeProfile() || admin) && (
                  <Dropdown align="end" className="scale" role="button">
                    <Dropdown.Toggle as="span" id="dropdown-custom-components">
                      {isMeProfile() ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          fill="currentColor"
                          className="bi bi-gear-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                        </svg>
                      ) : (
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
                      )}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Header>Gestione Profilo</Dropdown.Header>
                      <Dropdown.Item
                        onClick={() => {
                          setShowModalAtleta(true),
                            setAtleta({
                              nome: showAtleta.nome,
                              cognome: showAtleta.cognome,
                              email: showAtleta.email,
                              numeroDiCellulare: showAtleta.numeroTelefono,
                              password: "",
                            });
                        }}
                      >
                        Modifica dati personali
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setShowModal(true)}>
                        Modifica ruoli preferti
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => modalAvatar()}>
                        Modifica immagine profilo
                      </Dropdown.Item>
                      {admin && (
                        <>
                          <Dropdown.Divider />
                          <Dropdown.Header>Gestione Admin</Dropdown.Header>
                          <Dropdown.Item
                            onClick={() => setShowModalAuthorization(true)}
                          >
                            Modifica Autorizzazione
                          </Dropdown.Item>
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
                          <Dropdown.Item onClick={() => setShowStorico(true)}>
                            Modifica Storico
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => setShowDelete(true)}>
                            Elimina Atleta
                          </Dropdown.Item>
                        </>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>
              <img
                src={showAtleta.avatar}
                alt="avatar"
                style={{ width: "10rem", height: "10rem" }}
                className="rounded-circle object-fit-cover"
              />
              <h3 className="mt-3 fw-bold">Dati:</h3>
              <div className="border border-3 rounded-4 p-2">
                <p className="mb-1">
                  <b>Membro CIV:</b> <br />
                  {showAtleta.ruolo}
                </p>
                <p className="mb-1">
                  <b>Ruolo in campo Principale: </b>
                  <br />
                  {showAtleta?.ruoloInCampoPrimario}
                </p>
                <p className="mb-1">
                  <b>Ruolo in campo Secondario: </b>
                  <br />
                  {showAtleta?.ruoloInCampoSecondario}
                </p>
                <p className="mb-0">
                  <b>Ruolo in campo Alternativo: </b>
                  <br />
                  {showAtleta?.ruoloInCampoAlternativo}
                </p>
              </div>
              <div className="mx-auto mt-2">
                <BarChart showAtleta={showAtleta} />
              </div>
            </Col>
            <Col xs={12} lg={7}>
              <div className="mx-auto mb-4">
                <RadarChart showAtleta={showAtleta} />
              </div>
              <div className="mx-auto">
                <DoughnutChart showAtleta={showAtleta} />
              </div>
            </Col>
          </Row>
        </div>
      )}
      <ModalModificaRuoliInCampo
        showModal={showModal}
        setShowModal={setShowModal}
        handleChangeRole={handleChangeRole}
        ruoliInCampo={ruoliInCampo}
        setRuoliInCampo={setRuoliInCampo}
        isMeProfile={isMeProfile}
      />
      <ModalModifcaAvatar
        showModalAvatar={showModalAvatar}
        setShowModalAvatar={setShowModalAvatar}
        handleUpdateAvatar={handleUpdateAvatar}
        setFile={setFile}
      />
      <ModalModificaAutorizzazione
        showModalAuthorization={showModalAuthorization}
        setShowModalAuthorization={setShowModalAuthorization}
        handleUpdateAuthorization={handleUpdateAuthorization}
        authorization={authorization}
        setAuthorization={setAuthorization}
      />
      <ModalModificaAtleta
        showModalAtleta={showModalAtleta}
        setShowModalAtleta={setShowModalAtleta}
        handleSubmit={handleSubmit}
        atleta={atleta}
        setAtleta={setAtleta}
      />
      <ModalModificaValutazione
        showModalValutazione={showModalValutazione}
        setShowModalValutazione={setShowModalValutazione}
        handleUpadteValutazione={handleUpadteValutazione}
        valutazione={valutazione}
        setValutazione={setValutazione}
      />
      <ModalValoriAtleta
        showStorico={showStorico}
        setShowStorico={setShowStorico}
        handleStorico={handleStorico}
        storico={storico}
        setStorico={setStorico}
      />
      <ModalEliminaAtleta
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        handleDeleteAtleta={handleDeleteAtleta}
        showAtleta={showAtleta}
      />
    </div>
  );
};

export default Profilo;
