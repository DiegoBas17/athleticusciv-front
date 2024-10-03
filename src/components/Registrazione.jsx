import { Button, Col, Form, Row } from "react-bootstrap";

const Registrazione = ({ handleToggle }) => {
  return (
    <Row>
      <Col lg={6}>
        <div className="first-color" style={{ height: "100vh" }}></div>
      </Col>
      <Col lg={6} className="position-relative bg-white">
        <div className="position-absolute top-50 start-50 translate-middle">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="nome" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cognome</Form.Label>
              <Form.Control type="text" placeholder="cognome" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Numero di Telefono</Form.Label>
              <Form.Control type="text" placeholder="cellulare" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form>
          <Button className="mt-3" onClick={handleToggle}>
            Hai già un account? Accedi
          </Button>
        </div>
      </Col>
    </Row>
  );
};
export default Registrazione;
