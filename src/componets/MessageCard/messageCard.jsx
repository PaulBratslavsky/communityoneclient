import React, { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import Messages from '../Messages/Messages';
import MessageForm from '../Messages/MessageForm';
import { UserContext } from '../../context/UserContext';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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
  const history = useHistory();

  const { loading, error, data } = useQuery(COMMENTS_QUERY_BY_PROJECT, {
    variables: { id: projectID },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  function sendMessage() {}

  const { comments } = data;

  return (
    <div className="message-area bg-white shadow text-white rounded mb-3 p-3">
      <h3 className="text-dark">Lattest Comments</h3>
      <Messages comments={comments} />
      {user ? (
        <MessageForm callback={sendMessage} />
      ) : (
        <div className="d-grid gap-2">
          <Button
            onClick={() => history.push('/login')}
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