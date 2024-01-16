import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { store } from "../../app/store";
import { resultsApiSlice } from "../results/resultsApiSlice";
import { studentsApiSlice } from "../students/studentsApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";

const PreFetch = () => {
  useEffect(() => {
    console.log("Suscribing");
    const results = store.dispatch(
      resultsApiSlice.endpoints.getResults.initiate()
    );
    const students = store.dispatch(
      studentsApiSlice.endpoints.getStudents.initiate()
    );
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    return () => {
      console.log("Unsuscribing");
      results.unsubscribe();
      students.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
export default PreFetch;
