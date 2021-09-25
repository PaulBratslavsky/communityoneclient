import React, { useContext } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Card, Col, Button } from "react-bootstrap";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; //AiFillHeart,
import { UserContext } from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import Avatar from "../Avatar/avatar";

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

export function ProjectCard({ project }) {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const { firstName, lastName } = project.developer;
  const [addOneLike, { error: likesError }] = useMutation(LIKE_MUTATION, {
    refetchQueries: [
      { query: GET_LIKE_BY_PROJECT_ID, variables: { projectID: project.id } },
    ],
  });

  const { error, data, loading } = useQuery(GET_LIKE_BY_PROJECT_ID, {
    variables: { projectID: project.id },
  });

  function handleLike() {
    if (!user) history.push("/login");
    else {
      addOneLike({
        variables: {
          input: {
            data: {
              project: project.id,
              user: user.userID,
            },
          },
        },
      });
    }
  }

  function handleDetailRedirect(projectID) {
    if (!user) history.push("/login");
    else history.push(`/details/${projectID}`);
  }

  function checkIfLikedPost(likes, userID = null) {
    if (null) return false;
    const result = likes.find((like) => like.user.id === userID);
    console.log(result, "LIEKD POST");
    return result;
  }

  if (loading) return <p>Loading...</p>;
  if (error || likesError) return <p>Error</p>;

  return (
    <Col key={project.id}>
      <Card className="card">
        <Card.Img
          className="card-image"
          variant="top"
          src={project.featuredImage.formats.large.url}
        />
        <footer className="px-3 pt-3 d-flex justify-content-between">
          <div className="d-flex justify-content-center align-items-center flex-column">
            <Avatar imgUrl={project.developer.avatarImage.url} />
            <p className="m-0">{`${firstName} ${lastName[0]}`}</p>
          </div>
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
        </footer>
        <Card.Body>
          <Card.Title>{project.name}</Card.Title>
          <Card.Text>{project.description.slice(0, 144)}... </Card.Text>
          <Button
            variant="primary"
            onClick={() => handleDetailRedirect(project.id)}
          >
            Details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

/*

 <Col>
      <Card>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>

*/
