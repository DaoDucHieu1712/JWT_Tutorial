import React from "react";
import { Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../features/auth/authSlice";
const PrivateRoute = ({ children, path, ...rest }) => {
  const authSe = useSelector(authSelector);
  const navigate = useNavigate();
  if (authSe.login.currentUser === null) {
    navigate("/signin");
  }
  return <Route {...rest} element={children}></Route>;
};

export default PrivateRoute;
