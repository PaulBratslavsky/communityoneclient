import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { useApolloClient } from "@apollo/client";
import UserAvatar from "../UserAvatar/userAvatar";
import { useNavigate, NavLink } from "react-router-dom";

export default function TopNavigation() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const client = useApolloClient();

  function handleLogout() {
    localStorage.clear();
    setUser(null);
    client.clearStore();
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>Dev Hunt</Navbar.Brand>
        </NavLink>
        <Nav className="me-auto">
          <NavLink
            className={(isActive) => "nav-link" + (isActive ? " active" : "")}
            to="/"
          >
            <span>Home</span>
          </NavLink>
          <NavLink
            className={(isActive) => "nav-link" + (isActive ? " active" : "")}
            to="/developers"
          >
            <span>Developers</span>
          </NavLink>
          <NavLink
            className={(isActive) => "nav-link" + (isActive ? " active" : "")}
            to="/blog"
          >
            <span>Blog</span>
          </NavLink>
          {!user && (
            <NavLink
              className={(isActive) => "nav-link" + (isActive ? " active" : "")}
              to="/login"
            >
              <span>Login</span>
            </NavLink>
          )}
        </Nav>
        {user && (
          <div className="d-flex">
            <NavLink to="/dashboard">
              <UserAvatar size={30} />
            </NavLink>
            <Button
              variant="primary"
              size="sm"
              className="me-2"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>

            <Button variant="secondary" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </Container>
    </Navbar>
  );
}
