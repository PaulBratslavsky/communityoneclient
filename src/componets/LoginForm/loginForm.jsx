import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap"

export default function LoginForm() {
  return (
    <Container>
      <Row className="justify-content-md-center align-items-center text-white" >
        <Col md={5}>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
  
        <Button variant="outline-secondary" type="submit">
          Sign In
        </Button>

      </Form>
      </Col>
      </Row>
    </Container>
  );
}
