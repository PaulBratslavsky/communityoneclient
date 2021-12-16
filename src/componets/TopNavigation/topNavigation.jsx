import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { useApolloClient } from "@apollo/client";
import UserAvatar from "../UserAvatar/userAvatar";
import { useNavigate, Link } from "react-router-dom";

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
        <Link to="/">
          <Navbar.Brand>Dev Hunt</Navbar.Brand>
        </Link>
        <Nav className="me-auto">
          <Link to="/">
            <span>Home</span>
          </Link>
          <Link to="/blog">
            <span>Blog</span>
          </Link>
          {!user && (
            <Link to="/login">
              <span>Login</span>
            </Link>
          )}
        </Nav>
        {user && (
          <div className="d-flex">
            <Link to="/dashboard">
              <UserAvatar size={30} />
            </Link>
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
