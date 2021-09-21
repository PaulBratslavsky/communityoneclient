import React, { useContext } from "react";
import { useApolloClient } from "@apollo/client";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { UserContext } from "../../context/UserContext";

export default function TopNavigation() {
  const client = useApolloClient();
  const { user, setUser } = useContext(UserContext);

  function handleLogout() {
    localStorage.clear();
    setUser(null);
    client.clearStore();
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/" exact>
          <Navbar.Brand>Dev Hunt</Navbar.Brand>
        </LinkContainer>
        <Nav className="me-auto">
          <LinkContainer to="/" exact>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/details">
            <Nav.Link >Project Detail</Nav.Link>
          </LinkContainer>
          {!user && (
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
        {user && (
          <Button variant="outline-secondary" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
}
