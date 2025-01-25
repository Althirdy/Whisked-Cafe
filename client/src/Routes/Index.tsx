import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Auth/Login";
import GuestLayout from "../Components/Layout/GuestLayout";
import Register from "../Pages/Auth/Register";
import OwnerDefaultLayout from "../Components/Layout/OwnerDefaultLayout";
import Dashboard from "../Pages/Owner/Dashboard";
import Pos from "../Pages/Owner/Pos";
import Employee from "../Pages/Owner/Employee";
import Reports from "../Pages/Owner/Reports";
import Home from "../Pages/Home";
import Protected from "./Protected";
import Menu from "../Pages/Owner/Menu";
import Customer from "./Customer";
import ProtectedNotCustomer from "./ProtectedNotCustomer";
import Guest from "./Guest";
import CustomerLayout from "../Components/Layout/CustomerLayout";
import CustomerMenu from "../Pages/Customer/CustomerMenu";
import CustomerOrder from "../Pages/Customer/CustomerOrder";
import OnlineOrders from "../Pages/Owner/OnlineOrders";
import Inventory from "../Pages/Owner/Inventory";

const Router = () => {
  return (
    <Routes>
      <Route element={<Guest />}>
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>
      <Route path="/customer" element={<Customer />}>
        <Route path="" element={<CustomerLayout />}>
          <Route index element={<CustomerMenu />} />
          <Route path="/customer/order" element={<CustomerOrder />} />
        </Route>
      </Route>

      <Route element={<ProtectedNotCustomer />}>
        <Route element={<OwnerDefaultLayout />}>
          <Route element={<Protected />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/meals" element={<Menu />} />
            <Route path="/inventory" element={<Inventory/>}/>
          </Route>
          <Route path="/pos" element={<Pos />} />
          <Route path="/online" element={<OnlineOrders />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
