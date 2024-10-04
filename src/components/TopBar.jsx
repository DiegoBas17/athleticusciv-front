import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/athleticusCIVLogo.jpg";

const TopBar = () => {
  const navigate = useNavigate();
  return (
    <Navbar expand="lg">
      <Container>
        <NavLink to="/home" className="nav-link">
          Athleticus CIV
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/home" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/Legends-of-Athleticus" className="nav-link">
              Membri
            </NavLink>
            <NavLink to="/Eventi" className="nav-link">
              Eventi
            </NavLink>
            <Nav.Link href="#link">Valutazioni</Nav.Link>
            <Nav.Link href="#link">Calendario</Nav.Link>
          </Nav>
          <div className="d-flex">
            <img
              src={logo}
              style={{ height: "3vh" }}
              className="rounded-circle"
            />
            <NavDropdown
              id="basic-nav-dropdown"
              align={"end"}
              autoClose="outside"
            >
              <NavDropdown.Item
                onClick={() => {
                  navigate("/profilo/me");
                }}
              >
                Profilo
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  navigate("/profilo");
                }}
              >
                Formazioni
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Impostazioni
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default TopBar;
