import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { useStateContext } from "../../Contexts/ContextProvider";

function GuestLayout() {
  const { user, token } = useStateContext();

  if (token) {
    return <Navigate to="/dashboard" />
  }

  return (
    <div className="flex min-h-screen max-w-screen-xl mx-auto flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default GuestLayout;
