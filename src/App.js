import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import UsersList from "./features/users/UsersList";
import StudentsList from "./features/students/StudentsList";
import ResultsList from "./features/results/ResultsList";
import NewUserForm from "./features/users/NewUserForm";
import NewStudent from "./features/students/NewStudent";
import NewResult from "./features/results/NewResult";
import EditResult from "./features/results/EditResult";
import EditStudent from "./features/students/EditStudent";
import EditUser from "./features/users/EditUser";
import UsersLogin from "./features/auth/UsersLogin";
import StudentLogin from "./features/auth/StudentLogin";
import StudentWelcome from "./features/studentPage/StudentWelcome";
import StudentResult from "./features/studentPage/StudentResult";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login">
          <Route index element={<UsersLogin />} />
          <Route path="student" element={<StudentLogin />} />
        </Route>

        {/*Protected Routes*/}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route path="dash" element={<DashLayout />}>
              <Route index element={<Welcome />} />

              <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>
                <Route path="student">
                  <Route index element={<StudentWelcome />} />
                  <Route path="result" element={<StudentResult />} />
                </Route>
              </Route>

              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Executive]} />
                }
              >
                <Route path="users">
                  <Route index element={<UsersList />} />
                  <Route path="new" element={<NewUserForm />} />
                  <Route path=":id" element={<EditUser />} />
                </Route>
              </Route>

              <Route
                element={
                  <RequireAuth
                    allowedRoles={[
                      ROLES.Employee,
                      ROLES.Admin,
                      ROLES.Executive,
                    ]}
                  />
                }
              >
                <Route path="students">
                  <Route index element={<StudentsList />} />
                  <Route
                    element={
                      <RequireAuth
                        allowedRoles={[ROLES.Admin, ROLES.Executive]}
                      />
                    }
                  >
                    <Route path="new" element={<NewStudent />} />
                    <Route path=":id" element={<EditStudent />} />
                  </Route>
                </Route>
              </Route>

              <Route
                element={
                  <RequireAuth
                    allowedRoles={[
                      ROLES.Employee,
                      ROLES.Admin,
                      ROLES.Executive,
                    ]}
                  />
                }
              >
                <Route path="results">
                  <Route index element={<ResultsList />} />
                  <Route path="new" element={<NewResult />} />
                  <Route path=":id" element={<EditResult />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
