import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { store } from "./app/store";
import { Provider } from "react-redux";
import { usersApiSlice } from "./features/users/usersApiSlice";
import { studentsApiSlice } from "./features/students/studentsApiSlice";
import { resultsApiSlice } from "./features/results/resultsApiSlice";

//store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
//store.dispatch(studentsApiSlice.endpoints.getStudents.initiate());
//store.dispatch(resultsApiSlice.endpoints.getResults.initiate());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
