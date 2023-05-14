import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "../styles/style.css";

export default function Header() {
  return (
    <Navbar bg="#ffffff" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="Logo"
            src="src/assets/images/logo.svg"
            width="40"
            height="auto"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link className="link" to="/">
                Протестировать страницу
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="link" to="/add">
                Добавить правило
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="link" to="/edit">
                Изменить правило
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="link" to="/">
                Загрузить правила
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="link" to="/">
                Скачать правила
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
