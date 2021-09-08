import { gql, useQuery } from "@apollo/client";
import { Card, Col, Image } from "react-bootstrap";
const GET_LIKE_BY_PROJECT_ID = gql`
  query GetLikeBtPortfolioID($projectID: ID!) {
    likes(where: { project: { id: $projectID } }) {
      id
    }
  }
`;

export function ProjectCard({ project }) {
  const { firstName, lastName } = project.developer;

  function handleLike() {
    console.log("liked button clicked");
  }
  const { error, data, loading } = useQuery(GET_LIKE_BY_PROJECT_ID, {
    variables: { projectID: project.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <Col key={project.id}>
      <Card>
        <Card.Img variant="top" src={project.featuredImage.formats.large.url} />
        <Card.Body>
          <Card.Title>{project.name}</Card.Title>
          <Card.Text>{project.description} </Card.Text>
        </Card.Body>
        <footer className="p-3 d-flex justify-content-between">
          <div>
            <Image
              className="avatar"
              src={project.developer.avatarImage.url}
              roundedCircle
            />
            <p>{`${firstName} ${lastName}`}</p>
          </div>
          <div>
            <span>Likes: {data.likes.length}</span>
            <button onClick={handleLike}>Like</button>
          </div>
        </footer>
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
