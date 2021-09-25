import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { UserContext } from "../../context/UserContext";
import { useApolloClient } from "@apollo/client";

export default function TopNavigation() {
  const { user, setUser } = useContext(UserContext);
  const client = useApolloClient();

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
          {!user && (
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
        {user && (
          <Button varient="ouline-secondary" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
}
