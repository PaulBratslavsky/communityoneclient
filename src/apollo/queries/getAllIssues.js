import { gql } from '@apollo/client';

export const GET_ALL_ISSUES_QUERY = gql`
  query GET_ALL_ISSUES {
    issues(sort: "created_at:desc") {
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