import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const Registrazione = ({ handleToggle }) => {
  const [atleta, setAtleti] = useState({
    nome: "",
    cognome: "",
    email: "",
    numeroDiCellulare: "",
    password: "",
  });

  const fetchRegistrazione = () => {
    fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(atleta),
    })
      .then((response) => {
        console.log("Response received:", response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nella registrazione");
        }
      })
      .then((result) => {
        console.log("Fatture fetched:", result);
        setAtleti(result);
        handleToggle();
      })
      .catch((error) => toast.error(error.message));
  };

  const handleFieldChange = (propertyName, propertyValue) => {
    setAtleti({ ...atleta, [propertyName]: propertyValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRegistrazione();
  };

  return (
    <Row>
      <Col md={6} lg={6} className="d-none d-md-block">
        <div style={{ height: "100vh" }}></div>
      </Col>
      <Col
        sm={12}
        md={6}
        lg={6}
        className="d-flex justify-content-center align-items-center bg-white"
        style={{ height: "100vh" }}
      >
        <div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="nome"
                value={atleta.nome}
                onChange={(e) => handleFieldChange("nome", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                placeholder="cognome"
                value={atleta.cognome}
                onChange={(e) => handleFieldChange("cognome", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={atleta.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Numero di Telefono</Form.Label>
              <Form.Control
                type="text"
                placeholder="cellulare"
                value={atleta.numeroDiCellulare}
                onChange={(e) =>
                  handleFieldChange("numeroDiCellulare", e.target.value)
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={atleta.password}
                onChange={(e) => handleFieldChange("password", e.target.value)}
              />
            </Form.Group>
            <Button type="submit">Registrati</Button>
          </Form>
          <p className="mt-3" onClick={handleToggle}>
            Hai già un account? <u>Accedi</u>
          </p>
        </div>
      </Col>
    </Row>
  );
};
export default Registrazione;
