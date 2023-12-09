import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Home from "../components/Home/Home";
// import { privateRoutes } from "../config/config";
import PrivateRoutes from "./PrivateRoutes";
import Users from "../components/ManageUsers/Users";
import Project from "../components/ProjectUser/ProjectUser";
import Role from "../components/Role.js/Role";
import GroupRole from "../components/GroupRole/GroupRole";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Users />} path="/users" />
          <Route element={<Project />} path="/project" />
          <Route element={<Role />} path="/roles" />
          <Route element={<GroupRole />} path="/group-role" />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<div>404 not found</div>} />
      </Routes>
    </>
  );
};

export default AppRoutes;
