import { Container } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";
import UserCard from '../componets/UserCard/userCard';

const GET_ALL_DEVELOPERS_QUERY = gql`
  query GET_ALL_USERS {
    users(where: { userType: "DEVELOPER" }) {
      id
      username
      firstName
      lastName
      bio
      avatarImage {
        url
      }
      projects {
        id
        name
      }
      issues {
        id
        issueBrief
      }
    }
  }
`;

export default function Developers() {
  const { data, loading, error } = useQuery(GET_ALL_DEVELOPERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const { users } = data;

  return (
    <Container>
      <h2>Developers Section will go here</h2>
      {users.map((user) => <UserCard key={user.id} user={user} /> )}
    </Container>
  );
}
