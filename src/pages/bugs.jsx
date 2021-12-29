import React from "react";
import { Container } from "react-bootstrap";
import { gql } from "@apollo/client";
import Bugtracker from "../componets/Bugtracker/bugtracker";

const GET_ALL_ISSUES_QUERY = gql`
  query GET_ALL_ISSUES {
    issues {
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

export default function Bugs() {
  return (
    <Container className="mt-3">
      <Bugtracker query={GET_ALL_ISSUES_QUERY} />
    </Container>
  );
}
