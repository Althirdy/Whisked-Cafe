import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Auth/Login";
import GuestLayout from "../Components/Layout/GuestLayout";
import Register from "../Pages/Auth/Register";
import OwnerDefaultLayout from "../Components/Layout/OwnerDefaultLayout";
import Dashboard from "../Pages/Owner/Dashboard";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<GuestLayout />}>
        <Route index element={<h1>Hello</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="/dashboard" element={<OwnerDefaultLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default Router;
