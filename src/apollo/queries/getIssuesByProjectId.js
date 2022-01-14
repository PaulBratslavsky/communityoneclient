import { gql } from '@apollo/client';

export const GET_ISSUES_BY_PROJECT_ID_QUERY = gql`
  query GET_ALL_ISSUES($projectID: ID!) {
    issues(sort: "created_at:desc" where: { project: { id: $projectID } }) {
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
