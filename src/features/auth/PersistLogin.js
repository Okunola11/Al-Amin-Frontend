import { useState, useEffect, useRef } from "react";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { Outlet, Link } from "react-router-dom";
import { useRefreshMutation } from "./authApiSlice";
import { PulseLoader } from "react-spinners";

const PersistLogin = () => {
  const effectRan = useRef(false);
  const [persist] = usePersist();
  const [refresh, { isLoading, isSuccess, isError, error, isUninitialized }] =
    useRefreshMutation();

  const token = useSelector(selectCurrentToken);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!effectRan.current) {
      const refreshToken = async () => {
        try {
          await refresh();
          setSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) refreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = <PulseLoader color={"#FFF"} />;
  } else if (isError) {
    content = (
      <p className="errmsg">
        {`${error?.data?.message} - `}
        <Link to="/">Please login again</Link>
      </p>
    );
  } else if (isSuccess && success) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;
