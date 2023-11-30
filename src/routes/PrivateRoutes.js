import { useEffect } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { privateRoutes } from "../config/config";

const PrivateRoutes = () => {
  // useEffect(() => {
  //   if (!session) {
  //     navigate("/login");
  //   }
  // }, [session, navigate]);

  const session = sessionStorage.getItem("account");
  return session ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
