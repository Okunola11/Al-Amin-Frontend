import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "./authSlice";
import { useUserLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";

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

      console.log(response);
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
          <h2>About Us</h2>
          <p>
            Welcome to Al Amin School, where excellence is not just a goal but a
            way of life. As staffs and students of our prestigious school, it is
            expected to always uphold the core values of the school at all time.
            Our staff are of upmost importance as they serve as the mentors for
            the bright minds of the next great generation. Remember to always
            treat every student with utmost importance, care and equality. Every
            child is a future leader. Happy teaching and learning!
          </p>
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

  return isLoading ? <p>Loading...</p> : content;
};

export default UsersLogin;
