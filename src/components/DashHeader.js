import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashHeader = () => {
  const { isStudent } = useAuth();
  return (
    <header className="dash-header">
      <div className="dash-header__container">
        {isStudent ? (
          <Link to="/dash/student">
            <h1>Al Amin</h1>
          </Link>
        ) : (
          <Link to="/dash">
            <h1>Al Amin</h1>
          </Link>
        )}

        <nav>{/*We add nav Buttons here later*/}</nav>
      </div>
    </header>
  );
};
export default DashHeader;
