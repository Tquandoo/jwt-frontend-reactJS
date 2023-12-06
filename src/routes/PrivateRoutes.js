import { useEffect, useContext } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { privateRoutes } from "../config/config";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = () => {
  const { user } = useContext(UserContext);
  return user && user.isAuthenticated === true ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
