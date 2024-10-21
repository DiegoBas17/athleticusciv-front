import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TopBar = () => {
  const navigate = useNavigate();
  const atleta = useSelector((state) => state.atleta.atleta);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };
  return (
    <Navbar expand="lg" className="civ-color rounded-4 my-2 p-2">
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
                src={atleta?.avatar}
                style={{ height: "2rem", width: "2rem", cursor: "pointer" }}
                className="rounded-circle"
                alt="avatar"
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
