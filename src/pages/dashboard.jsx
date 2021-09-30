import React, { useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import useForm from '../hooks/useForm';
import { gql, useMutation } from '@apollo/client';

const INITIAL_FORM_STATE = {
  name: 'test',
  description: 'test 2',
  imageFile: '',
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
  const [loading, setLoading] = useState(false);
  const { fields, handleSetFields, resetFields } = useForm(INITIAL_FORM_STATE);
  const [createProject] = useMutation(CREATE_PROJECT_MUTATION);
  const [upladImage] = useMutation(UPLOAD_FEATURED_IMAGE_MUTATION);
  function handleSubmitForm(e) {
    e.preventDefault();
    console.log(fields, 'submit this data');
    const { name, description } = fields;
    if (fields.imageFile) {
      createProject({
        variables: {
          name,
          description,
        },
        onCompleted: (data) => {
          console.log(data);
          console.log('now handle file upload');
        },
      });
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmitForm}>
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
              name="imageFile"
              onChange={handleSetFields}
              type="file"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="primary" type="button" onClick={resetFields}>
            Reset
          </Button>
        </fieldset>
      </Form>
    </Container>
  );
}
