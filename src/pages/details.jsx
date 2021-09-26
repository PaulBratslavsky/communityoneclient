import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Avatar from "../componets/Avatar/avatar";
import BackButton from "../componets/BackButton";
import ProjectLikes from "../componets/ProjectLikes/projectLikes";

export default function Details() {
  const { projectID } = useParams();
  return (
    <Container>
      <div className="details">
          <div className="project-details bg-secondary shadow my-3 rounded p-3">
            <header>
              <h1>Details Page Private for blog with id {projectID}</h1>
              <BackButton />
            </header>
          </div>

          <div className="user-details bg-primary shadow mt-3 rounded p-3">
            <div className="d-flex justify-content-center align-items-center p-2">
              <Avatar
                size={175}
                imgUrl="https://res.cloudinary.com/course-share/image/upload/v1629672423/6153188_57ff4c2bc0_1c63dadd23.jpg"
                firstName={"Paul"}
                lastName={"Brats"}
                showName
              />
              
            </div>
            <ProjectLikes projectID={1}/>
          </div>
          <div className="message-area bg-dark text-white shadow rounded mb-3 p-3">messages</div>
          </div>
    </Container>
  );
}


