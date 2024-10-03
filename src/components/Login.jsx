import { Button, Col, Form, Row } from "react-bootstrap";

const Login = ({ handleToggle }) => {
  return (
    <Row>
      <Col lg={6} className="position-relative bg-white">
        <div className="position-absolute top-50 start-50 translate-middle">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form>
          <Button className="mt-3" onClick={handleToggle}>
            Non hai un account? Registrati
          </Button>
        </div>
      </Col>
      <Col lg={6}>
        <div className="first-color" style={{ height: "100vh" }}></div>
      </Col>
    </Row>
  );
};
export default Login;
