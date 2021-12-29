import { gql, useQuery } from "@apollo/client";
import { Container, Image, Spinner, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Avatar from "../componets/Avatar/avatar";
import BackButton from "../componets/BackButton/backButton";
// import ProjectLikes from "../componets/ProjectLikes/projectLikes";
import { AiFillGithub, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import { IoDocumentText } from "react-icons/io5";
import MessageCard from "../componets/MessageCard/messageCard";
import Bugtracker from "../componets/Bugtracker/bugtracker";

const GET_ISSUES_BY_PROJECT_ID_QUERY = gql`
  query GET_ALL_ISSUES($projectID: ID!) {
    issues(where: { project: { id: $projectID } }) {
      id
      isPrivate
      created_at
      issueBrief
      dueDate
      createdBy {
        id
        firstName
        lastName
      }
      project {
        id
        name
      }
      type
      status
      severity
      priority
    }
  }
`;

const GET_PROJECT = gql`
  query SingleProjectQuerry($id: ID!) {
    project(id: $id) {
      id
      featuredImage {
        url
      }
      gitUrl
      siteUrl
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
    gitUrl,
    siteUrl,
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
          {featuredImage && (
            <Image
              src={featuredImage.url}
              alt="name"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          )}
        </div>

        <div className="project-details bg-light rounded p-3">
          <div>
            <header>
              <h1>{name}</h1>
            </header>
            <p>{description}</p>
            <div className="d-flex justify-content-end">
              <BackButton />
            </div>
          </div>
        </div>

        <div className="user-details bg-dark mt-3 rounded p-3">
          <div className="d-flex justify-content-center align-items-center mt-3">
            <Avatar
              size={175}
              imgUrl={avatarImage.url}
              firstName={firstName}
              lastName={lastName}
              className="text-secondary fs-3"
              showName
            />
          </div>
          <div className="d-flex justify-content-evenly align-items-center w-100">
            {gitHub && (
              <a
                href={gitHub}
                target="_blank"
                rel="noreferrer"
                className="text-secondary display-6"
              >
                <AiFillGithub />
              </a>
            )}
            {linkedIn && (
              <a
                href={linkedIn}
                target="_blank"
                rel="noreferrer"
                className="text-secondary display-6"
              >
                <AiFillLinkedin />
              </a>
            )}
            {youTube && (
              <a
                href={youTube}
                target="_blank"
                rel="noreferrer"
                className="text-secondary display-6"
              >
                <AiFillYoutube />
              </a>
            )}
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noreferrer"
                className="text-secondary display-6"
              >
                <CgWebsite />
              </a>
            )}
            {resume && (
              <a
                href={resume}
                target="_blank"
                rel="noreferrer"
                className="text-secondary display-6"
              >
                <IoDocumentText />
              </a>
            )}
          </div>
          <div className="d-grid gap-2 mx-2 mt-4">
            {siteUrl && (
              <Button
                variant="primary"
                size="lg"
                href={siteUrl}
                target="_blank"
              >
                Live Demo
              </Button>
            )}
            {gitUrl && (
              <Button
                variant="secondary"
                size="lg"
                href={gitUrl}
                target="_blank"
              >
                GitHub
              </Button>
            )}
          </div>
        </div>

        <MessageCard projectID={projectID} />

        <div className="bugtracker-area mb-3 p-1">
          <Bugtracker
            query={GET_ISSUES_BY_PROJECT_ID_QUERY}
            variables={{
              variables: { projectID: projectID },
            }}
          />
        </div>
      </div>
    </Container>
  );
}
