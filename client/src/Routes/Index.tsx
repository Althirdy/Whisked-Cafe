import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Auth/Login";
import GuestLayout from "../Components/Layout/GuestLayout";
import Register from "../Pages/Auth/Register";
import OwnerDefaultLayout from "../Components/Layout/OwnerDefaultLayout";
import Dashboard from "../Pages/Owner/Dashboard";
import Pos from "../Pages/Owner/Pos";
import Employee from "../Pages/Owner/Employee";
import Reports from "../Pages/Owner/Reports";

const Router = () => {
  return (
    <Routes>
      <Route element={<GuestLayout />}>
        <Route path="/" element={<h1>Hello</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<OwnerDefaultLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pos" element={<Pos />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/reports" element={<Reports />} />
      </Route>
    </Routes>
  );
};

export default Router;
