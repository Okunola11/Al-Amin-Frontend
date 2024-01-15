import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const DashFooter = () => {
  const { isStudent, status, usernum } = useAuth();
  const homeButton = (
    <button className="icon-home">
      <FontAwesomeIcon icon={faHouse} />
    </button>
  );

  return (
    <footer className="dash-footer">
      {isStudent ? (
        <Link to="/dash/student">{homeButton}</Link>
      ) : (
        <Link to="/dash">{homeButton}</Link>
      )}
      <p>Current user: {usernum}</p>
      <p>Status: {status}</p>
    </footer>
  );
};
export default DashFooter;
