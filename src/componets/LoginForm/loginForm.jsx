import React, { useState, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import BackButton from "../BackButton";

const LOGIN_USER = gql`
  mutation LoginMutation($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        username
        id
      }
    }
  }
`;

const INITIAL_FORM_STATE = { email: "", password: "" };

export default function LoginForm() {
  const { user, setUser } = useContext(UserContext);

  const [LoginMutation, { error, loading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      if (data) {
        const { login } = data;
        setUser({ token: login.jwt, userID: login.user.id });
      }
    },
  });
  const [input, setInput] = useState(INITIAL_FORM_STATE);

  function handleInputChange(event) {
    setInput({ ...input, [event.target.name]: event.target.value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (input.password !== "" && input.email !== "") {
      LoginMutation({
        variables: {
          input: {
            identifier: input.email,
            password: input.password,
          },
        },
      });
    } else {
      alert("Please complete all the fields");
    }
  }

  if (loading) return <Spinner aniamtion="grow" />;
  if (error) return <h1>ARRGGHH !</h1>;
  if (user) return <Navigate to="/" />;

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
                className="border-0"
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
                className="border-0"
              />
            </Form.Group>
            <Button variant="outline-secondary" type="submit" className="me-2">
              Sign In
            </Button>

            <Link className="text-light" to="/forgot-password">
              Forgot Password
            </Link>

            <BackButton />
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
