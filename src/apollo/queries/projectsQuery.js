import { gql } from "@apollo/client"

export const PROJECTS_QUERY = gql`
  query GetAllProjects {
    projects(limit: 3) {
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