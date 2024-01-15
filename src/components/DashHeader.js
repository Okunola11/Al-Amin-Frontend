import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const DashHeader = () => {
  const navigate = useNavigate();
  const { isStudent } = useAuth();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log("Success");
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const logOutButton = (
    <button className="icon-button" onClick={sendLogout} title="Logout">
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  const buttonContent = isLoading ? <p>Loading...</p> : <> {logOutButton} </>;

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
