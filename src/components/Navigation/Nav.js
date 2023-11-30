import React, { useEffect, useState } from "react";
import "./Nav.scss";
import { NavLink, useLocation } from "react-router-dom";

const Nav = (props) => {
  const [isShowHeader, setIsShowHeader] = useState(true);
  const session = sessionStorage.getItem("account");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      setIsShowHeader("false");
    } else {
      setIsShowHeader("true");
    }
  }, [location]);
  return (
    <>
      {isShowHeader === "true" && (
        <div className="topnav">
          <NavLink to="/" exact="true">
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/project">Projects</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      )}
    </>
  );
};

export default Nav;
