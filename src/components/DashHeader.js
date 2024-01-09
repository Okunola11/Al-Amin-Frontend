import { Link } from "react-router-dom";

const DashHeader = () => {
  return (
    <header className="dash-header">
      <div className="dash-header__container">
        <Link to="/dash">
          <h1>Al Amin</h1>
        </Link>
        <nav>{/*We add nav Buttons here later*/}</nav>
      </div>
    </header>
  );
};
export default DashHeader;
