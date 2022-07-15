

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {

  if ( JSON.parse(localStorage.getItem('currentUser'))) {
    return <Outlet />;
  }
  return <Navigate to="/signin" />;
};

export default PrivateRoute;
