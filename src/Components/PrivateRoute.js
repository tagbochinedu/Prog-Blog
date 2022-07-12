import { useAuth } from "../Context/AuthContext";

import React from "react";
import { Navigate, Outlet } from "react-router-dom";



const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  return currentUser? <Outlet/> : <Navigate to='/signin' />
}

export default PrivateRoute;


