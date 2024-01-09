import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import UsersList from "./features/users/UsersList";
import StudentsList from "./features/students/StudentsList";

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
          </Route>

          <Route path="students">
            <Route index element={<StudentsList />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
