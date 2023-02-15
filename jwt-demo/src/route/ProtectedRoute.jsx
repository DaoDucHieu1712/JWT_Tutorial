import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { authSelector } from "../features/auth/authSlice";

const IsAuth = () => {
  const user = useSelector(authSelector);
  if (user.login.currentUser !== null) {
    return true;
  } else {
    return false;
  }
};

const ProtectedRoute = () => {
  const navigate = useNavigate();
  console.log("PROTECTED ROUTES");
  useEffect(() => {
    if (IsAuth()) {
      navigate("/signin");
    }
  }, [navigate]);
  return <Outlet></Outlet>;
};

export default ProtectedRoute;
