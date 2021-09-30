import React, { useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import useForm from '../hooks/useForm';
import { gql, useMutation } from '@apollo/client';
import BackButton from '../componets/BackButton';
import { useHistory } from 'react-router-dom'
import { PROJECTS_QUERY } from '../apollo/queries/projectsQuery';
const INITIAL_FORM_STATE = {
  name: '',
  description: '',
  file: '',
};

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
  mutation CREATE_PROJECT_MUTATIOM($name: String!, $description: String!) {
    createProject(
      input: { data: { name: $name, description: $description, status: DRAFT } }
    ) {
      project {
        id
      }
    }
  }
`;

export default function Dashboard() {
  const history = useHistory()
  const [loading, setLoading] = useState(false);
  const { fields, handleSetFields, resetFields } = useForm(INITIAL_FORM_STATE);
  const [createProject] = useMutation(CREATE_PROJECT_MUTATION);
  const [uploadImage] = useMutation(UPLOAD_FEATURED_IMAGE_MUTATION);
  
  async function handleSubmitForm(e) {
    e.preventDefault();
    const { name, description, file} = fields;

    if (file) {
      setLoading(true);
      
      const projectResponse = await createProject({
        variables: {
          name,
          description,
        },
      });

      const imageResponse = await uploadImage({
        variables: {
          file: file,
          collection: "project",
          collectionID: projectResponse.data.createProject.project.id,
          fieldName: "featuredImage"
        },
        refetchQueries: [{ query: PROJECTS_QUERY }]
      })

      const { data } = imageResponse;

      if (data) history.push('/')

      setLoading(loading);
    }
  }

  return (
    <Container>
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

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Button variant="primary" type="submit" className="me-2">
                Create Project
              </Button>
              <Button variant="secondary" type="button" onClick={resetFields}>
                Reset
              </Button>
            </div>
            <BackButton />
          </div>
        </fieldset>
      </Form>
    </Container>
  );
}
