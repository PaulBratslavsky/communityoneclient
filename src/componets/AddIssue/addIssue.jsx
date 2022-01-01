import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Form, Button, Row } from "react-bootstrap";
import BackButton from "../BackButton/backButton";
import useForm from "../../hooks/useForm";
import "react-datepicker/dist/react-datepicker.css";
import FormInput from "../FormInput/FormInput";
import FormDatePicker from "../FormDatePicker/FormDatePicker";
import FormSelect from "../FormSelect/FormSelect";

const TYPES = [
  { id: "BUG", value: "BUG" },
  { id: "FEATURE", value: "FEATURE" },
  { id: "TASK", value: "TASK" },
];

const PRIORITY = [
  { id: "IMMEDIATE", value: "IMMEDIATE" },
  { id: "HIGH", value: "HIGH" },
  { id: "MEDIUM", value: "MEDIUM" },
  { id: "LOW", value: "LOW" },
];

const SEVERITY = [
  { id: "CRITICAL", value: "CRITICAL" },
  { id: "MAJOR", value: "MAJOR" },
  { id: "MODERATE", value: "MODERATE" },
  { id: "LOW", value: "LOW" },
];

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
  type: "",
  priority: "",
  severity: "",
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

  console.log(data?.projects, "hello");

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
        <FormInput
          label="Issue Brief Description"
          name="issueBrief"
          value={fields.issueBrief}
          onChange={handleSetFields}
          type="text"
          placeholder="Enter brief description"
          required
        />
        <Row className="mb-3">
          <FormSelect
            label="Type"
            name="type"
            defaultOption="Select Type"
            options={TYPES}
            optionKey="value"
            onChange={handleSetFields}
            value={fields.type}
            error={error}
            errorMessage={errorMessage}
          />

          <FormDatePicker
            setDate={setDueDate}
            date={dueDate}
            error={error}
            errorMessage={errorMessage}
          />

          <FormSelect
            label="Project"
            name="project"
            defaultOption="Select Project"
            options={data?.projects}
            optionKey="name"
            loading={loadingProjects}
            onChange={handleSetFields}
            value={projectID || fields.project}
            disabled={projectID}
            error={error || errorProjects}
            errorMessage={errorMessage}
          />
          
        </Row>

        <FormInput
          label="Full Issue Description"
          name="description"
          value={fields.description}
          onChange={handleSetFields}
          as="textarea"
          placeholder="Enter project description"
          rows={3}
          required
        />

        <Row className="mb-3">
          <FormSelect
            label="Priority"
            name="priority"
            defaultOption="Select Type"
            options={PRIORITY}
            optionKey="value"
            onChange={handleSetFields}
            value={fields.priority}
            error={error}
            errorMessage={errorMessage}
          />

          <FormSelect
            label="Severity"
            name="severity"
            defaultOption="Select Severity"
            options={SEVERITY}
            optionKey="value"
            onChange={handleSetFields}
            value={fields.severity}
            error={error}
            errorMessage={errorMessage}
          />
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

/*

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

          */
