import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/logoBlu.jpeg";

const Login = ({ handleToggle }) => {
  const [atletaLog, setAtletalog] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const fetchLogin = () => {
    fetch("https://handsome-verna-pollito117-551d08b7.koyeb.app/auth/login", {
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
        setAtletalog(result);
        localStorage.setItem("accessToken", result.accessToken);
        navigate("/");
        toast.success("Login Effettuato con successo");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleFieldChange = (propertyName, propertyValue) => {
    setAtletalog({ ...atletaLog, [propertyName]: propertyValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLogin();
  };

  return (
    <>
      <Row>
        <Col
          sm={12}
          md={6}
          lg={6}
          className="d-flex justify-content-center align-items-center bg-white"
          style={{ height: "100vh" }}
        >
          <div className="border border-1 p-3 rounded-4">
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
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
                  onChange={(e) =>
                    handleFieldChange("password", e.target.value)
                  }
                />
              </Form.Group>
              <Button type="submit">Login</Button>
            </Form>
            <p className="mt-3" onClick={handleToggle}>
              Non hai un account? <u role="button">Registrati</u>
            </p>
          </div>
        </Col>
        <Col md={6} lg={6} className="d-none d-md-block">
          <div
            style={{ height: "100vh" }}
            className="w-100 d-flex justify-content-center align-items-center"
          >
            <img src={logo} alt="logo" height="40%" />
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Login;
