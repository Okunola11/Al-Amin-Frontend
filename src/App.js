import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />

        {/*Protected Routes*/}
        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
