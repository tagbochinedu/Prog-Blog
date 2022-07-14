import { useAuth } from "../Context/AuthContext";

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  if (currentUser !== null || currentUser !== undefined) {
    console.log(currentUser);
    return <Outlet />;
  }
  return <Navigate to="/signin" />;
};

export default PrivateRoute;
