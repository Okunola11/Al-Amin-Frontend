import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    const decode = jwtDecode(token);

    const { usernum, username, roles } = decode?.UserInfo;

    const isStudent = roles.includes("Student") ? true : false;

    const isEmployee = roles.includes("Employee") ? true : false;

    const isAdmin = roles.includes("Admin") ? true : false;

    const isExecutive = roles.includes("Executive") ? true : false;

    let status = "";
    if (isStudent) status = "Student";
    if (isEmployee) status = "Employee";
    if (isAdmin) status = "Admin";
    if (isExecutive) status = "Executive";

    return {
      usernum,
      username,
      roles,
      isStudent,
      isEmployee,
      isAdmin,
      isExecutive,
      status,
    };
  } else {
    return {
      usernum: "",
      username: "",
      roles: [],
      isStudent: false,
      isEmployee: false,
      isAdmin: false,
      isExecutive: false,
      status: "",
    };
  }
};
export default useAuth;
