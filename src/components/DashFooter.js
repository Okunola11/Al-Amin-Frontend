import { Link } from "react-router-dom";

const DashFooter = () => {
  return (
    <footer className="dash-footer">
      <Link to="/dash">Home</Link>
      <p>Current User:</p>
      <p>Status:</p>
    </footer>
  );
};
export default DashFooter;
