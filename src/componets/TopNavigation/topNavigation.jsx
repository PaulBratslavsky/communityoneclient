import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function TopNavigation() {
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
          {/* <LinkContainer to="/details">
            <Nav.Link >Project Detail</Nav.Link>
          </LinkContainer> */}
          <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  );
}
