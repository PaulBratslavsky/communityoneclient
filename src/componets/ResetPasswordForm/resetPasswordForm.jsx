import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import BackButton from "../BackButton";

const RESET_PASSWORD_MUTATION = gql`
 mutation RESET_PASSWORD_MUTATION(
  $password: String!
  $passwordConfirmation: String!
  $code: String!
) {
  resetPassword(
    password: $password
    passwordConfirmation: $passwordConfirmation
    code: $code
  ) {
    user {
      id
    }
  }
}
`;

const INITIAL_FORM_STATE = { password: "", passwordConfirmation: "" };

export default function ResetPasswordForm({ code }) {

  const [ResetPasswordMutation, { error, loading, data }] = useMutation(RESET_PASSWORD_MUTATION);

  const [input, setInput] = useState(INITIAL_FORM_STATE);
  const [formError, setFormError] = useState(null);

  function handleInputChange(event) {
    console.log(event.target.name,  event.target.value, "INPUT");
    setInput({ ...input, [event.target.name]: event.target.value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (input.password !== "" && input.passwordConfirmation !== "") {
      if (input.password === input.passwordConfirmation) {
        ResetPasswordMutation({
          variables: {
            password: input.password,
            passwordConfirmation: input.passwordConfirmation,
            code
          }
        })
      } else {
        setFormError("Passwords do not match");
      }
     
    } else {
      setFormError("Please complete all the fields");
    }
  }

  if (loading) return <Spinner aniamtion="grow" />;
  if (error) return <h1>ARRGGHH !</h1>;
  if (data) return <Redirect to="/login" />;

  return (
    <Container>
      <Row className="justify-content-md-center align-items-center text-white">
        <Col md={5}>
          <Form onSubmit={handleFormSubmit}>
            
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleInputChange}
                value={input.password}
                className="border-0"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="passwordConfirmation"
                onChange={handleInputChange}
                value={input.passwordConfirmation}
                className="border-0"
              />
            </Form.Group>
            { (formError || error) && <p>{formError || error}</p> }
            <Button variant="outline-secondary" type="submit" className="me-2">
              Change Password
            </Button>
            <BackButton />
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
