import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/athleticusCIVLogo.jpg";

const TopBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };
  return (
    <Navbar
      expand="lg"
      className="civ-color rounded-4 my-2"
      data-bs-theme="dark"
    >
      <Container>
        <NavLink to="/" className="nav-link me-4">
          Athleticus CIV
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/leggende-del-CIV" className="nav-link">
              Leggende Del CIV
            </NavLink>
            <NavLink to="/partite" className="nav-link">
              Partite
            </NavLink>
          </Nav>
          <Dropdown align="end">
            <Dropdown.Toggle as="span" id="dropdown-custom-components">
              <img
                src={logo}
                style={{ height: "3vh", cursor: "pointer" }}
                className="rounded-circle"
                alt="Logo"
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default TopBar;
