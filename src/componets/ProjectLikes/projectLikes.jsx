import React, { useContext } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { UserContext } from "../../context/UserContext";
import { useHistory } from "react-router-dom";

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

export default function ProjectLikes({ projectID }) {
  const { user } = useContext(UserContext);
  const history = useHistory();

  const { error, data, loading } = useQuery(GET_LIKE_BY_PROJECT_ID, {
    variables: { projectID: projectID },
    fetchPolicy: "network-only",
  });

  const [addOneLike, { error: likesError }] = useMutation(LIKE_MUTATION, {
    refetchQueries: [
      { query: GET_LIKE_BY_PROJECT_ID, variables: { projectID: projectID} },
    ],
  });

  function checkIfLikedPost(likes, userID = null) {
    if (null) return false;
    const result = likes.find((like) => like.user.id === userID);
    console.log(result, "LIEKD POST");
    return result;
  }

  function handleLike() {
    if (!user) history.push("/login");
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
    <div className="d-flex justify-content-center align-items-center flex-column-reverse">
      <span>Likes: {data.likes.length}</span>
      {checkIfLikedPost(data.likes, user?.userID) ? (
        <AiFillHeart className="heart-icon" onClick={handleLike}>
          Like
        </AiFillHeart>
      ) : (
        <AiOutlineHeart className="heart-icon" onClick={handleLike}>
          Like
        </AiOutlineHeart>
      )}
    </div>
  );
}
