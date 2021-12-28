import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import MarkdownEditor from "../MarkdownEditor/markdownEditor";
import { gql, useMutation } from "@apollo/client";

const INITIAL_FORM_STATE = {
  title: "",
};

const ADD_POST_MUTATION = gql`
  mutation ADD_POST_MUTATION($post: createPostInput!) {
    createPost(input: $post) {
      post {
        id
        title
        content
      }
    }
  }
`;

export default function AddPost() {
  const { handleSetFields, fields } = useForm(INITIAL_FORM_STATE);

  const [content, setContent] = useState("");
  const [addPost, { loading, error, data }] = useMutation(ADD_POST_MUTATION);

  async function handleSubmitForm(event) {
    event.preventDefault();

    await addPost({
      variables: {
        post: {
          data: {
            title: fields.title,
            content: content,
          },
        },
      },
    });
  }

  if (error) return <h1>{error.message}</h1>;

  return (
    <Form onSubmit={handleSubmitForm} className="p-3">
      <fieldset disabled={loading}>
        <Form.Group className="mb-3" controlId="formText">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={fields.title}
            onChange={handleSetFields}
            type="text"
            placeholder="Enter post title"
            required
          />
        </Form.Group>
        this is where we will put our form
        <MarkdownEditor onChange={setContent} value={content} />
        <Button variant="primary" type="submit" className="me-2">
          Create Post
        </Button>
      </fieldset>
    </Form>
  );
}
