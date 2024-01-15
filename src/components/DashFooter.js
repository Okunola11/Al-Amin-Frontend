import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashFooter = () => {
  const { isStudent, status, usernum } = useAuth();
  return (
    <footer className="dash-footer">
      {isStudent ? (
        <Link to="/dash/student">Home</Link>
      ) : (
        <Link to="/dash">Home</Link>
      )}
      <p>Current user: {usernum}</p>
      <p>Status: {status}</p>
    </footer>
  );
};
export default DashFooter;
