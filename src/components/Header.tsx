import "../styles/header-style.css";
import "../utils/header";

export function Header() {
  return (
    <>
      <header className="cd-header">
        <div className="header-wrapper">
          <div className="logo-wrap">
            <a href="#" className="hover-target">
              <img className="logo" src="src/assets/images/logo.svg" alt="" />
            </a>
          </div>
          <div className="nav-but-wrap">
            <div className="menu-icon hover-target">
              <span className="menu-icon__line menu-icon__line-left"></span>
              <span className="menu-icon__line"></span>
              <span className="menu-icon__line menu-icon__line-right"></span>
            </div>
          </div>
        </div>
      </header>

      <div className="nav">
        <div className="nav__content">
          <ul className="nav__list">
            <li className="nav__list-item active-nav">
              <a href="#" className="hover-target">
                home
              </a>
            </li>
            <li className="nav__list-item">
              <a href="#" className="hover-target">
                studio
              </a>
            </li>
            <li className="nav__list-item">
              <a href="#" className="hover-target">
                news
              </a>
            </li>
            <li className="nav__list-item">
              <a href="#" className="hover-target">
                contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
