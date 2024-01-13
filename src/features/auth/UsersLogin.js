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
        setErrMsg("No server response");
      } else if (err.status === 400) {
        setErrMsg("Missing ID or password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err?.data?.message);
      }
      //errRef.current.focus();
    }
  };

  const content = (
    <>
      <header>
        <h1>Employee Login</h1>
      </header>
      <main>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
          {errMsg}
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="usernum">Employee ID</label>
          <input
            type="text"
            id="usernum"
            ref={userRef}
            autoComplete="off"
            required
            placeholder="Employee ID"
            value={usernum}
            onChange={onUsernumChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={onPasswordChange}
          />

          <button>Login</button>
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </>
  );

  return isLoading ? <p>Loading...</p> : content;
};

export default UsersLogin;
