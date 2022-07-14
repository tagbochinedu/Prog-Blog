import { useAuth } from "../Context/AuthContext";

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser, isLogged } = useAuth();
  if ((currentUser !== null || currentUser !== undefined)&& isLogged) {
    console.log(currentUser);
    return <Outlet />;
  }
  return <Navigate to="/signin" />;
};

export default PrivateRoute;
