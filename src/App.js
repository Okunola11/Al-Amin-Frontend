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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />

        {/*Protected Routes*/}
        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />

          <Route path="users">
            <Route index element={<UsersList />} />
            <Route path="new" element={<NewUserForm />} />
            <Route path=":id" element={<EditUser />} />
          </Route>

          <Route path="students">
            <Route index element={<StudentsList />} />
            <Route path="new" element={<NewStudent />} />
            <Route path=":id" element={<EditStudent />} />
          </Route>

          <Route path="results">
            <Route index element={<ResultsList />} />
            <Route path="new" element={<NewResult />} />
            <Route path=":id" element={<EditResult />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
