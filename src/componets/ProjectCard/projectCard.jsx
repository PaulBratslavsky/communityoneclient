import React, { useContext } from "react";
import { Card, Col, Button } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import Avatar from "../Avatar/avatar";
import ProjectLikes from "../ProjectLikes/projectLikes";

export function ProjectCard({ project }) {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const { firstName, lastName } = project.developer;

  function handleDetailRedirect(projectID) {
    if (!user) history.push("/login");
    else history.push(`/details/${projectID}`);
  }

  return (
    <Col key={project.id}>
      <Card className="card">
        <Card.Img
          className="card-image"
          variant="top"
          src={project.featuredImage.formats.large.url}
        />
        <footer className="px-3 pt-3 d-flex justify-content-between">
          <Avatar
            imgUrl={project.developer.avatarImage.url}
            firstName={firstName}
            lastName={lastName}
          />

          <ProjectLikes projectID={project.id} />
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
