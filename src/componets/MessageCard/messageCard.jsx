import React, { useContext } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import Messages from '../Messages/Messages';
import MessageForm from '../Messages/MessageForm';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const COMMENT_MUTATION = gql`
  mutation COMMENT_MUTATION($input: createCommentInput!) {
    createComment(input: $input) {
      comment {
        id
      }
    }
  }
`;


const COMMENTS_QUERY_BY_PROJECT = gql`
  query COMMENTS_QUERY_BY_PROJECT($id: ID!) {
    comments(where: { project: { id: $id } }) {
      id
      comment
      created_at
      author {
        id
        firstName
        lastName
        avatarImage {
          url
        }
      }
    }
  }
`;

export default function MessageCard({ projectID }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(COMMENTS_QUERY_BY_PROJECT, {
    variables: { id: projectID },
  });

  const [createComment] = useMutation(COMMENT_MUTATION);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  function sendMessage(message) {
    createComment({
      variables: {
        input: {
          data: {
            author: user.userID,
            project: projectID,
            comment: message,
          },
        },
      },
      refetchQueries: [
        { query: COMMENTS_QUERY_BY_PROJECT, variables: { id: projectID } },
      ],
    });
  }

  const { comments } = data;

  return (
    <div className="message-area bg-white shadow text-white rounded p-3">
      <h3 className="text-dark">Lattest Comments</h3>
      <Messages comments={comments} />
      {user ? (
        <MessageForm callback={sendMessage} />
      ) : (
        <div className="d-grid gap-2">
          <Button
            onClick={() => navigate('/login')}
            variant="primary"
            size="sm"
          >
            Login
          </Button>
        </div>
      )}
    </div>
  );
}
