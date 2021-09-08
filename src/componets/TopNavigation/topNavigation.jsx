import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'

export default function TopNavigation() {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">Dev Hunt</Navbar.Brand>
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link >Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/details">
            <Nav.Link >Project Detail</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/login">
            <Nav.Link >Login</Nav.Link>
          </LinkContainer>
          
        </Nav>
      </Container>
    </Navbar>
  );
}

