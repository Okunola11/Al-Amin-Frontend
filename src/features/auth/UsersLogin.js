import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "./authSlice";
import { useUserLoginMutation } from "./authApiSlice";

const UsersLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [userLogin, { isLoading }] = useUserLoginMutation();

  const [usernum, setUsernum] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

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
            way of life. At Al Amin, we pride ourselves on providing a holistic
            educational experience that goes beyond the classroom. Our dedicated
            faculty strives to inspire a passion for learning, nurturing the
            intellectual and emotional growth of each student. With
            state-of-the-art facilities, a vibrant extracurricular program, and
            a commitment to fostering a supportive community, we create an
            environment where students can thrive academically and personally.
            Discover the best in education at Al Amin School, where every day is
            an opportunity to learn, grow, and succeed.
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
