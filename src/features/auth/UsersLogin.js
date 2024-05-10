import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "./authSlice";
import { useUserLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { PulseLoader } from "react-spinners";

const UsersLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [userLogin, { isLoading }] = useUserLoginMutation();

  const [usernum, setUsernum] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [usernum, password]);

  useEffect(() => {
    errRef.current.focus();
  }, [errMsg]);

  const onUsernumChange = (e) => setUsernum(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const handleToggle = (e) => setPersist((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await userLogin({ usernum, password }).unwrap();

      dispatch(setCredentials({ ...response, usernum }));

      setUsernum("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        console.error(err);
        setErrMsg("No server response");
      } else if (err.status === 400) {
        setErrMsg("Missing ID or password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err?.data?.message);
      }
    }
  };

  const content = (
    <article className="login__article">
      <header className="login__header">
        <h1>Al Amin Schools</h1>
      </header>

      <main className="login__main">
        <section className="login__info">
          <h2>Hi, welcome 👋</h2>
          <p className="login__info-p">
            This primarily display brief information or updates for the
            Employees but I have decided to put in login credentials details for
            the sole purpose of exploring and testing the application.
          </p>
          <h5>Login with the following credentials:</h5>
          <div className="login-details-container">
            <div className="login-details">
              <div className="login-details__div">
                <p>Username: 2018-Ab</p>
                <p>Password: aaaa</p>
                <p>Roles: Employee/Admin</p>
              </div>
              <div className="login-details__div">
                <p>Username: 2018-AC</p>
                <p>Password: aaaa</p>
                <p>Roles: Employee</p>
              </div>
            </div>
          </div>
        </section>

        <section className="login__login">
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
            {errMsg}
          </p>

          <h2>Employee Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="login__div">
              <label className="login__label" htmlFor="usernum">
                Employee ID
              </label>
              <input
                className="login__input"
                type="text"
                id="usernum"
                ref={userRef}
                autoComplete="off"
                required
                placeholder="Employee ID"
                value={usernum}
                onChange={onUsernumChange}
              />
            </div>

            <div className="login__div">
              <label className="login__label" htmlFor="password">
                Password
              </label>
              <input
                className="login__input"
                type="password"
                id="password"
                required
                value={password}
                onChange={onPasswordChange}
              />
            </div>

            <label className="login__label login__active" htmlFor="persist">
              Trust this device
              <input
                className="login__active--button"
                type="checkbox"
                id="persist"
                checked={persist}
                onChange={handleToggle}
              />
            </label>

            <button className="login__button">Login</button>
          </form>
        </section>
      </main>
      <footer className="login__footer">
        <Link to="/">Back to Home</Link>
      </footer>
    </article>
  );

  return isLoading ? <PulseLoader color={"#FFF"} /> : content;
};

export default UsersLogin;
