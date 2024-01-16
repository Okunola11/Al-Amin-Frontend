import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { roles, isStudent } = useAuth();

  return roles.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : isStudent ? (
    <Navigate to="/login/student" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
