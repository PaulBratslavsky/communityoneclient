import { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";
import { Row } from "react-bootstrap";
import { ProjectCard } from "../ProjectCard/projectCard";

const GET_PROJECTS_QUERY = gql`
  query GetAllProjects {
    projects {
      id
      name
      description
      likesCount
      developer {
        id
        firstName
        lastName
        avatarImage {
          url
        }
      }
      featuredImage {
        formats
      }
      published_at
    }
  }
`;

export function Projects() {
  const { error, data, loading } = useQuery(GET_PROJECTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <Row xs={1} md={3} className="g-4 py-4">
      {data &&
        data.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
    </Row>
  );
}
