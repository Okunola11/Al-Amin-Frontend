import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePen,
  faGraduationCap,
  faPoll,
  faRightFromBracket,
  faUserAlt,
  faUserGear,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const DASH_REGEX = /^\/dash(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;
const STUDENTS_REGEX = /^\/dash\/students(\/)?$/;
const RESULTS_REGEX = /^\/dash\/results(\/)?$/;
const individual_REGEX = /^\/dash\/student\/result(\/)?$/;

const DashHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { isStudent, isEmployee, isAdmin, isExecutive } = useAuth();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log("Success");
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const onUsersButtonClicked = () => navigate("/dash/users");
  const onStudentsButtonClicked = () => navigate("/dash/students");
  const onResultsButtonClicked = () => navigate("/dash/results");
  const onNewUserClicked = () => navigate("/dash/users/new");
  const onNewStudentClicked = () => navigate("/dash/students/new");
  const onNewResultClicked = () => navigate("/dash/results/new");
  const onIndividualClick = () => navigate("/dash/student/result");
  const onStudentPageClick = () => navigate("/dash/student");

  const logOutButton = (
    <button className="icon-button" onClick={sendLogout} title="Logout">
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  let usersButton = null;
  if (isAdmin || isExecutive) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
      usersButton = (
        <button
          className="icon-button"
          onClick={onUsersButtonClicked}
          title="Employees"
        >
          <FontAwesomeIcon icon={faUserGear} />
        </button>
      );
    }
  }

  let studentsButton = null;
  if (isEmployee || isAdmin || isExecutive) {
    if (!STUDENTS_REGEX.test(pathname) && pathname.includes("/dash")) {
      studentsButton = (
        <button
          className="icon-button"
          onClick={onStudentsButtonClicked}
          title="Students"
        >
          <FontAwesomeIcon icon={faGraduationCap} />
        </button>
      );
    }
  }

  let resultsButton = null;
  if (isEmployee || isAdmin || isExecutive) {
    if (!RESULTS_REGEX.test(pathname) && pathname.includes("/dash")) {
      resultsButton = (
        <button
          className="icon-button"
          onClick={onResultsButtonClicked}
          title="Results"
        >
          <FontAwesomeIcon icon={faPoll} />
        </button>
      );
    }
  }

  let newUserButton = null;
  if (isAdmin || isExecutive) {
    if (USERS_REGEX.test(pathname)) {
      newUserButton = (
        <button
          className="icon-button"
          onClick={onNewUserClicked}
          title="Add Employee"
        >
          <FontAwesomeIcon icon={faUserPlus} />
        </button>
      );
    }
  }

  let newStudentButton = null;
  if (isAdmin || isExecutive) {
    if (STUDENTS_REGEX.test(pathname)) {
      newStudentButton = (
        <button
          className="icon-button"
          onClick={onNewStudentClicked}
          title="Add Student"
        >
          <FontAwesomeIcon icon={faUserPlus} />
        </button>
      );
    }
  }

  let newResultButton = null;
  if (isEmployee || isAdmin || isExecutive) {
    if (RESULTS_REGEX.test(pathname)) {
      newResultButton = (
        <button
          className="icon-button"
          onClick={onNewResultClicked}
          title="Add Results"
        >
          <FontAwesomeIcon icon={faFilePen} />
        </button>
      );
    }
  }

  let individualStudentButton = null;
  if (isStudent) {
    if (!individual_REGEX.test(pathname) && pathname.includes("dash")) {
      individualStudentButton = (
        <button
          className="icon-button"
          onClick={onIndividualClick}
          title="Results"
        >
          <FontAwesomeIcon icon={faPoll} />
        </button>
      );
    }
  }

  let studentDataPage = null;
  if (isStudent) {
    if (individual_REGEX.test(pathname)) {
      studentDataPage = (
        <button
          className="icon-button"
          onClick={onStudentPageClick}
          title="Bio Data"
        >
          <FontAwesomeIcon icon={faUserAlt} />
        </button>
      );
    }
  }

  const buttonContent = isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      {usersButton}
      {studentsButton}
      {resultsButton}
      {newUserButton}
      {newStudentButton}
      {newResultButton}
      {studentDataPage}
      {individualStudentButton}
      {logOutButton}
    </>
  );

  const content = (
    <>
      <p className={isError ? "errmsg" : "offscreen"}>{error?.data?.message}</p>

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

          <nav className="dash-header__nav">
            {/*We add nav Buttons here later*/}
            {buttonContent}
          </nav>
        </div>
      </header>
    </>
  );
  return content;
};
export default DashHeader;
