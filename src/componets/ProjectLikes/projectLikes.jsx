import React, { useContext } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { AiOutlineFire, AiFillFire } from 'react-icons/ai';
import { UserContext } from '../../context/UserContext';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

const GET_LIKE_BY_PROJECT_ID = gql`
  query GetLikeBtPortfolioID($projectID: ID!) {
    likes(where: { project: { id: $projectID } }) {
      id
      user {
        id
        firstName
        lastName
      }
    }
  }
`;

const LIKE_MUTATION = gql`
  mutation AddOneLike($input: createLikeInput!) {
    createLike(input: $input) {
      like {
        id
        published_at
      }
    }
  }
`;

export default function ProjectLikes({ projectID, className }) {
  const { user } = useContext(UserContext);
  const history = useHistory();

  const { error, data, loading } = useQuery(GET_LIKE_BY_PROJECT_ID, {
    variables: { projectID: projectID },
    fetchPolicy: 'network-only',
  });

  const [addOneLike, { error: likesError }] = useMutation(LIKE_MUTATION, {
    refetchQueries: [
      { query: GET_LIKE_BY_PROJECT_ID, variables: { projectID: projectID } },
    ],
  });

  function checkIfLikedPost(likes, userID = null) {
    if (null) return false;
    const result = likes.find((like) => like.user.id === userID);
    return result;
  }

  function handleLike() {
    if (!user) history.push('/login');
    else {
      addOneLike({
        variables: {
          input: {
            data: {
              project: projectID,
              user: user.userID,
            },
          },
        },
      });
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error || likesError) return <p>Error</p>;

  return (
    <div
      className={classNames(
        'd-flex justify-content-center align-items-center flex-column-reverse',
        className
      )}
    >
      {checkIfLikedPost(data.likes, user?.userID) ? (
        <AiFillFire
          className="heart-icon text-danger fs-1"
          onClick={handleLike}
        />
      ) : (
        <AiOutlineFire
          className="heart-icon text-dark fs-1"
          onClick={handleLike}
        />
      )}
      <span className="text-dark fw-bold">{data.likes.length}</span>
    </div>
  );
}
