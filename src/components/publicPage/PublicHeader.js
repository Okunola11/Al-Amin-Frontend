import { Link } from "react-router-dom";
import school_logo from "../../img/school_logo.jpg";
import { useState, useEffect } from "react";

const PublicHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        !event.target.closest(".nav-button") &&
        !event.target.closest(".has-subnav")
      ) {
        closeMenu();
      }
    };

    const handleScroll = () => {
      closeMenu();
    };

    if (isOpen) {
      document.addEventListener("click", handleDocumentClick);
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  const activeClass = isOpen ? "active" : "";

  const content = (
    <header className="public__header">
      <section className="public-header__section">
        <div className="logo">
          <img src={school_logo} alt="School logo" />
        </div>
        <div className="public-header__name">
          <h1>
            <span className="nowrap">Al Amin School</span>
          </h1>
          <p>Empowering Minds, Building Futures</p>
        </div>
        <button className="nav-button" onClick={toggleMenu}>
          <div className="nav-icon"></div>
        </button>
        <nav className="long-nav">
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#admissions">Admissions</a>
            </li>
            <li>
              <a href="#programs">Program</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li className="has-subnav">
              <a href="#home">Login</a>
              <ul className="subnav">
                <li>
                  <Link to="/login">Employee</Link>
                </li>
                <li>
                  <Link to="/login/student">Student</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </section>
      <section>
        <nav className={`small-nav ${activeClass}`}>
          <ul className="small-nav__list">
            <li onClick={closeMenu}>
              <a href="#home">Home</a>
            </li>
            <li onClick={closeMenu}>
              <a href="#about">About</a>
            </li>
            <li onClick={closeMenu}>
              <a href="#admissions">Admissions</a>
            </li>
            <li onClick={closeMenu}>
              <a href="#programs">Program</a>
            </li>
            <li onClick={closeMenu}>
              <a href="#contact">Contact</a>
            </li>
            <li className="has-subnav">
              <Link>Login Portal</Link>
              <ul className="subnav">
                <li>
                  <Link to="/login">Employee</Link>
                </li>
                <li>
                  <Link to="/login/student">Student</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );

  return content;
};
export default PublicHeader;
