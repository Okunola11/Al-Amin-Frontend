import school_logo from "../../img/school_logo.jpg";

const PublicHeader = () => {
  return (
    <header>
      <section className="public-header">
        <div className="logo">
          <img src={school_logo} alt="School logo" />
        </div>
        <div className="public-header__name">
          <h1>Al Amin School</h1>
          <p>Empowering Minds, Building Futures</p>
        </div>
        <button className="nav-button">
          <div className="nav-icon"></div>
        </button>
      </section>
      <nav>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default PublicHeader;
