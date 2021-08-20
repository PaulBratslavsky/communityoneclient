import { gql, useQuery } from "@apollo/client";



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
      }
    }
  }
`;

const GET_LIKE_BY_PROJECT_ID = gql`
  query GetLikeBtPortfolioID($projectID: ID!) {
  likes(where: { project: { id: $projectID } }) {
    id
  }
}
`

function Card({project}) {
            const { firstName, lastName } = project.developer;

            function handleLike() {
              console.log("liked button clicked");
            }
            const { error, data, loading } = useQuery(GET_LIKE_BY_PROJECT_ID, {
              variables: {  projectID: project.id },
            });

            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;

            return (
              <div key={project.id}>
                <h1>{project.name}</h1>
                <p>{project.description}</p>
                <span>Likes: {data.likes.length}</span>
                <p>{`${firstName} ${lastName}`}</p>
                <button onClick={handleLike}>Like</button>
              </div>
            );
}

export function Projects() {
  const { error, data, loading } = useQuery(GET_PROJECTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <h1>Projects List</h1>
      {data && (
        <div>
          {data.projects.map((project) => <Card key={project.id} project={project} />)}
        </div>
      )}
    </div>
  );
}
