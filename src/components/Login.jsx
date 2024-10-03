import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = ({ handleToggle }) => {
  const [atletaLog, setAtletalog] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const fetchLogin = () => {
    fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(atletaLog),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel login");
        }
      })
      .then((result) => {
        /* console.log(result); */
        setAtletalog(result);
        localStorage.setItem("accessToken", result.accessToken);
        navigate("/home");
      })
      .catch((error) => console.log("Fetch error:", error));
  };

  const handleFieldChange = (propertyName, propertyValue) => {
    setAtletalog({ ...atletaLog, [propertyName]: propertyValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLogin();
  };

  return (
    <Row>
      <Col lg={6} className="position-relative bg-white">
        <div className="position-absolute top-50 start-50 translate-middle">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={atletaLog.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={atletaLog.password}
                onChange={(e) => handleFieldChange("password", e.target.value)}
              />
            </Form.Group>
            <Button type="submit">Login</Button>
          </Form>
          <p className="mt-3" onClick={handleToggle}>
            Non hai un account? <u>Registrati</u>
          </p>
        </div>
      </Col>
      <Col lg={6}>
        <div style={{ height: "100vh" }}></div>
      </Col>
    </Row>
  );
};
export default Login;
