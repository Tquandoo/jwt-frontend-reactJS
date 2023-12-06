import React, { useEffect, useState, useContext } from "react";
import "./Nav.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Link, NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { logoutUser } from "../../services/userService";

const NavHeader = (props) => {
  const { user, logoutContext } = useContext(UserContext);
  const location = useLocation();
  let navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("jwt"); // clear local storage
    logoutContext(); // clear user in context
    let data = await logoutUser(); // clear cookies
    if (data && +data.EC === 0) {
      navigate("/login");
      toast.success("Log out succeeds...");
    } else {
      toast.error(data.EM);
    }
  };
  if ((user && user.isAuthenticated === true) || location.pathname === "/") {
    return (
      <>
        {/* <div className="topnav">
          <NavLink to="/" exact="true">
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/project">Projects</NavLink>
          <NavLink to="/about">About</NavLink>
        </div> */}
        <div className="nav-header">
          <Navbar expand="lg" className="bg-header">
            <Container>
              <Navbar.Brand href="#home">Manager User App</Navbar.Brand>

              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavLink to="/" exact="true" className="nav-link">
                    Home
                  </NavLink>
                  <NavLink to="/users" className="nav-link">
                    Users
                  </NavLink>
                  <NavLink to="/roles" className="nav-link">
                    Roles
                  </NavLink>
                  <NavLink to="/project" className="nav-link">
                    Projects
                  </NavLink>
                  <NavLink to="/about" className="nav-link">
                    About
                  </NavLink>
                </Nav>
                <Nav>
                  {user && user.isAuthenticated === true ? (
                    <>
                      <Nav.Item className="nav-link">
                        Welcome {user.account.username} !
                      </Nav.Item>

                      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item>Change Password</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                          <span onClick={() => handleLogout()}>Logout</span>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <>
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default NavHeader;
