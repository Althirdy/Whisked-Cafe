import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";

export default function Guest() {
  const { user, token } = useStateContext();
  if (token && !user) {
    return;
  }

  if (token && user?.role != "Customer") {
    return <Navigate to="/dashboard" />;
  } else if (token && user?.role == "Customer") {
    return <Navigate to="/customer" />;
  }
  return <Outlet />;
}
