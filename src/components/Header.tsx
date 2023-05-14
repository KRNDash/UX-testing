import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "../styles/style.css";

function Header() {
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

export default Header;

// import "../styles/header-style.css";
// import "../utils/header";

// export function Header() {
//   return (
//     <>
//       <header className="cd-header">
//         <div className="header-wrapper">
//           <div className="logo-wrap">
//             <a href="#" className="hover-target">
//               <img className="logo" src="src/assets/images/logo.svg" alt="" />
//             </a>
//           </div>
//           <div className="nav-but-wrap">
//             <div className="menu-icon hover-target">
//               <span className="menu-icon__line menu-icon__line-left"></span>
//               <span className="menu-icon__line"></span>
//               <span className="menu-icon__line menu-icon__line-right"></span>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="nav">
//         <div className="nav__content">
//           <ul className="nav__list">
//             <li className="nav__list-item active-nav">
//               <a href="#" className="hover-target">
//                 home
//               </a>
//             </li>
//             <li className="nav__list-item">
//               <a href="#" className="hover-target">
//                 studio
//               </a>
//             </li>
//             <li className="nav__list-item">
//               <a href="#" className="hover-target">
//                 news
//               </a>
//             </li>
//             <li className="nav__list-item">
//               <a href="#" className="hover-target">
//                 contact
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// }
