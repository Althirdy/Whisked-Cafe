import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";

export default function Protected() {
  const { user } = useStateContext();

  return user?.role == "Owner" ? <Outlet /> : <Navigate to="/pos" />;
}
