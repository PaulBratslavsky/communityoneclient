import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Form, Button, Row, Col } from "react-bootstrap";
import BackButton from "../BackButton/backButton";
import useForm from "../../hooks/useForm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const GET_ALL_PROJECTS = gql`
  query GET_ALL_PROJECTS {
    projects {
      id
      name
    }
  }
`;

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const INITIAL_FORM_STATE = {
  issueBrief: "",
  description: "",
  project: "",
  siteUrl: "",
  file: "",
};

const INITIAL_ERROR = {
  dueDate: false,
  projects: false,
};

const errorMessage = {
  dueDate: "Please Provide Due Date",
  projects: "Please Provide Proper Site URL",
};

export default function AddIssue({ projectID }) {
  const [dueDate, setDueDate] = useState(new Date());
  const [loading] = useState(false); // setLoading
  const [error, setError] = useState(INITIAL_ERROR);

  const {
    data,
    loading: loadingProjects,
    error: errorProjects,
  } = useQuery(GET_ALL_PROJECTS);

  const { fields, handleSetFields, resetFields } = useForm(INITIAL_FORM_STATE);

  function handleSubmitForm(event) {
    event.preventDefault();
    console.log("submit");
  }

  function handleResetButton() {
    setError(INITIAL_ERROR);
    setDueDate(new Date());
    resetFields();
  }

  return (
    <Form onSubmit={handleSubmitForm} className="p-3">
      <fieldset disabled={loading}>
        <Form.Group className="mb-3" controlId="formText">
          <Form.Label>Issue Brief Description</Form.Label>
          <Form.Control
            name="issueBrief"
            value={fields.issueBrief}
            onChange={handleSetFields}
            type="text"
            placeholder="Enter brief description"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTextarea">
          <Form.Label>Full Issue Description</Form.Label>
          <Form.Control
            name="description"
            value={fields.description}
            onChange={handleSetFields}
            as="textarea"
            placeholder="Enter project description"
            rows={3}
            required
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridGitHub">
            <Form.Label>Due Date</Form.Label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
            />
            {error.dueDate && errorMessage.dueDate}
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLive">
            <Form.Label>Project</Form.Label>
            {loadingProjects ? (
              <p>Loading...</p>
            ) : (
              <Form.Select
                name="project"
                aria-label="Default select example"
                onChange={handleSetFields}
                value={projectID || fields.project}
                disabled={projectID}
              >
                <option>Select a Project</option>
                {data.projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </Form.Select>
            )}
            {errorProjects?.message ||
              (error.projects && errorMessage.projects)}
          </Form.Group>
        </Row>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Button variant="primary" type="submit" className="me-2">
              Add Issue
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={handleResetButton}
            >
              Reset
            </Button>
          </div>
          <BackButton />
        </div>
      </fieldset>
    </Form>
  );
}
