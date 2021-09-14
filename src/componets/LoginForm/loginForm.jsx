import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const INITIAL_FORM_STATE = { email: "", password: "" };

export default function LoginForm() {
  const [input, setInput] = useState(INITIAL_FORM_STATE);

  function handleInputChange(event) {
    setInput({ ...input, [event.target.name]: event.target.value });
  }

  function handleFormSubmit(event) {
    event.preventDefault()
    console.log(input)

    if (input.password !== "" && input.email !== "") {
      alert("Form submitted!")
    } else {
      alert("Please complete all the fields")
    }
    
  }
  return (
    <Container>
      <Row className="justify-content-md-center align-items-center text-white">
        <Col md={5}>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleInputChange}
                value={input.email}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleInputChange}
                value={input.password}
              />
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
