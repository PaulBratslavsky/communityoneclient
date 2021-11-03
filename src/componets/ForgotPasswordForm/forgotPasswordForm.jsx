import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import BackButton from "../BackButton";

const FORGOT_PASSWORD_MUTATION = gql`
  mutation FORGOT_PASSWORD_MUTATION($email: String!) {
    forgotPassword(email: $email) {
      ok
    }
  }
`;

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const [forgotPaswordMutation, { data, loading, error }] = useMutation(FORGOT_PASSWORD_MUTATION, {
    variables: { email },
  });


  function handleFormSubmit(event) {
    event.preventDefault();
    if (email !== "") {
      forgotPaswordMutation();
    } else {
      alert("Please fill in your email");
    }
  }


  if (loading) return <Spinner aniamtion="grow" />;
  if (error) return <h1>ARRGGHH !</h1>;
  if (data) return <h1>Email sent to {email}</h1>;

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
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border-0"
                required
              />
            </Form.Group>

            <Button variant="outline-secondary" type="submit" className="me-2">
              Submit
            </Button>

            <BackButton />
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
