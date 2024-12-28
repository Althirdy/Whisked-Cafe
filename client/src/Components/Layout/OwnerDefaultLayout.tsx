import React from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../../Contexts/ContextProvider";

function OwnerDefaultLayout() {
  const { user, token } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <div>DefaultLayout</div>;
}

export default OwnerDefaultLayout;
