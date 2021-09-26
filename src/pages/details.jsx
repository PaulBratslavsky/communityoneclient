import { gql, useQuery } from "@apollo/client";
import { Container, Image, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Avatar from "../componets/Avatar/avatar";
import BackButton from "../componets/BackButton";
import ProjectLikes from "../componets/ProjectLikes/projectLikes";
import { AiFillGithub, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg"
import { IoDocumentText } from "react-icons/io5"

const GET_PROJECT = gql`
  query SingleProjectQuerry($id: ID!) {
    project(id: $id) {
      id
      featuredImage {
        url
      }
      name
      description
      developer {
        firstName
        lastName
        youTube
        linkedIn
        resume
        website
        gitHub
        avatarImage {
          url
        }
      }
    }
  }
`;

export default function Details() {
  const { projectID } = useParams();
  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: { id: projectID },
  });

  if (loading) return <Spinner aniamtion="grow" />;
  if (error) return <h1>Error</h1>;

  const {
    name,
    description,
    featuredImage,
    developer: {
      firstName,
      lastName,
      avatarImage,
      gitHub,
      linkedIn,
      youTube,
      resume,
      website,
    },
  } = data.project;

  return (
    <Container>
      <div className="details">
        <div className="project-header bg-secondary  mt-3 rounded overflow-hidden bg-primary">
          <Image
            src={featuredImage.url}
            alt="name"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="project-details bg-secondary  rounded p-3 mb-3">
          <div>
            <header>
              <h1>{name}</h1>
            </header>
            <p>{description}</p>
            <BackButton className="float-end" />
          </div>
        </div>

        <div className="user-details bg-primary  mt-3 rounded p-3">
          <div className="d-flex justify-content-center align-items-center mt-3">
            <Avatar
              size={175}
              imgUrl={avatarImage.url}
              firstName={firstName}
              lastName={lastName}
              className="text-dark"
              showName
            />
           
          </div>
          <div className="d-flex justify-content-evenly align-items-center w-100">
              {gitHub && <a href={gitHub} target="_blank" rel="noreferrer" className="text-dark display-6"><AiFillGithub /></a>}
              {linkedIn && <a href={linkedIn} target="_blank" rel="noreferrer" className="text-dark display-6"><AiFillLinkedin /></a>}
              {youTube && <a href={youTube} target="_blank" rel="noreferrer" className="text-dark display-6"><AiFillYoutube /></a>}
              {website && <a href={website} target="_blank" rel="noreferrer" className="text-dark display-6"><CgWebsite /></a>}
              {resume && <a href={resume} target="_blank" rel="noreferrer" className="text-dark display-6"><IoDocumentText /></a>}
            </div>
          <ProjectLikes projectID={projectID} />
          {/* <ul>
            <li>Projects: 3</li>
            <li>Likes: 12</li>
            <li>Comments: 55</li>
            <li>Favorites: 55</li>
          </ul> */}
        </div>
        <div className="message-area bg-dark text-white rounded mb-3 p-3">
          messages
        </div>
      </div>
    </Container>
  );
}
