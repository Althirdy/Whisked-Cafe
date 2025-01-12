import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";

export default function Customer() {
  const { user } = useStateContext();

  return user?.role == "Customer" ? <Outlet /> : <Navigate to="/login" />;
}
