import { useQuery } from "@apollo/client";
import { Row } from "react-bootstrap";
import { ProjectCard } from "../ProjectCard/projectCard";
import { PROJECTS_QUERY } from "../../apollo/queries/projectsQuery";


export function Projects() {
  const { error, data, loading } = useQuery(PROJECTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <Row xs={1} sm={1} md={2} lg={3} className="g-4 py-4">
      {data &&
        data.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
    </Row>
  );
}
