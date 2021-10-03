import React from 'react';
import { Card, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Avatar from '../Avatar/avatar';
import ProjectLikes from '../ProjectLikes/projectLikes';

export function ProjectCard({ project }) {
  const history = useHistory();

  function handleDetailRedirect(projectID) {
    history.push(`/details/${projectID}`);
  }

  return (
    <Col key={project.id}>
      <Card className="card">
      {project.featuredImage && <Card.Img
          className="card-image"
          variant="top"
          src={project.featuredImage.formats.large.url}
        /> }
        
        <footer className="px-3 pt-3 d-flex justify-content-between">
          {project.developer && (
            <Avatar
              imgUrl={project.developer.avatarImage.url}
              firstName={project.developer.firstName}
              lastName={project.developer.lastName}
            />
          )}

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
