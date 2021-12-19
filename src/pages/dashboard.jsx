import React, { useState } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import useForm from "../hooks/useForm";
import { gql, useMutation } from "@apollo/client";
import BackButton from "../componets/BackButton";
import { useNavigate } from "react-router-dom";
import { PROJECTS_QUERY } from "../apollo/queries/projectsQuery";
import TwoColumns from "../componets/TwoColumns/twoColumns";

const INITIAL_FORM_STATE = {
  name: "",
  description: "",
  gitUrl: "",
  siteUrl: "",
  file: "",
};
const checkURLRegex =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;

function isRegexValid(url, regex) {
  const result = url.match(regex) ? true : false;
  return result;
}

const UPLOAD_FEATURED_IMAGE_MUTATION = gql`
  mutation UPLOAD_FEATURED_IMAGE_MUTATION(
    $file: Upload!
    $collection: String!
    $collectionID: ID!
    $fieldName: String!
  ) {
    upload(
      file: $file
      ref: $collection
      refId: $collectionID
      field: $fieldName
    ) {
      id
    }
  }
`;

const CREATE_PROJECT_MUTATION = gql`
  mutation CREATE_PROJECT_MUTATIOM(
    $name: String!
    $description: String!
    $gitUrl: String
    $siteUrl: String
  ) {
    createProject(
      input: {
        data: {
          name: $name
          description: $description
          status: DRAFT
          gitUrl: $gitUrl
          siteUrl: $siteUrl
        }
      }
    ) {
      project {
        id
      }
    }
  }
`;

const INITIAL_ERROR = {
  siteUrl: false,
  gitUrl: false,
};

const errorMessage = {
  siteUrl: "Please Provide Proper GitHub URL",
  gitUrl: "Please Provide Proper Site URL",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { fields, handleSetFields, resetFields } = useForm(INITIAL_FORM_STATE);
  const [error, setError] = useState(INITIAL_ERROR);
  const [createProject] = useMutation(CREATE_PROJECT_MUTATION);
  const [uploadImage] = useMutation(UPLOAD_FEATURED_IMAGE_MUTATION);

  function validateUrlErrors(event) {
    if (isRegexValid(event.target.value, checkURLRegex)) {
      setError((prevState) => ({ ...prevState, [event.target.name]: false }));
    } else {
      setError((prevState) => ({ ...prevState, [event.target.name]: true }));
    }
  }

  function handleResetButton() {
    setError(INITIAL_ERROR);
    resetFields();
  }

  async function handleSubmitForm(e) {
    e.preventDefault();
    const { name, description, file, gitUrl, siteUrl } = fields;

    if (file && !error.siteUrl && !error.gitUrl) {
      setLoading(true);

      const projectResponse = await createProject({
        variables: {
          name,
          description,
          gitUrl,
          siteUrl,
        },
      });

      const imageResponse = await uploadImage({
        variables: {
          file: file,
          collection: "project",
          collectionID: projectResponse.data.createProject.project.id,
          fieldName: "featuredImage",
        },
        refetchQueries: [{ query: PROJECTS_QUERY }],
      });

      const { data } = imageResponse;

      if (data) navigate("/");

      setLoading(loading);
    }
  }
  return (
    <Container>
      <TwoColumns leftSize={"2fr"} rightSize={"1fr"}>
        <Form onSubmit={handleSubmitForm} className="shadow p-3 my-4 rounded">
          <fieldset disabled={loading}>
            <Form.Group className="mb-3" controlId="formText">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                name="name"
                value={fields.name}
                onChange={handleSetFields}
                type="text"
                placeholder="Enter name of project"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTextarea">
              <Form.Label>Project Description</Form.Label>
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

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Add Featured Image</Form.Label>
              <Form.Control
                name="file"
                onChange={handleSetFields}
                type="file"
                required
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridGitHub">
                <Form.Label>GitHub Link</Form.Label>
                <Form.Control
                  name="gitUrl"
                  value={fields.gitUrl}
                  onChange={handleSetFields}
                  type="text"
                  placeholder="Git Hub Url"
                  required
                  isInvalid={error.gitUrl}
                  onBlur={(e) => validateUrlErrors(e)}
                />
                <Form.Control.Feedback type="invalid">
                  {errorMessage.gitUrl}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLive">
                <Form.Label>Live Site Link</Form.Label>
                <Form.Control
                  name="siteUrl"
                  value={fields.siteUrl}
                  onChange={handleSetFields}
                  type="text"
                  placeholder="Site Url"
                  required
                  isInvalid={error.siteUrl}
                  onBlur={(e) => validateUrlErrors(e)}
                />
                <Form.Control.Feedback type="invalid">
                  {errorMessage.siteUrl}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Button variant="primary" type="submit" className="me-2">
                  Create Project
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
        <h1>this will be col 2</h1>
      </TwoColumns>
    </Container>
  );
}
