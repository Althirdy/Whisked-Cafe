import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";

export default function ProtectedNotCustomer() {
  const { user, token } = useStateContext();
  if (token && !user) {
    return;
  }
  if (!token) {
    return <Navigate to="/login" />;
  } else if (token && user?.role == "Customer") {
    return <Navigate to="/customer" />;
  }
  return <Outlet />;
}
