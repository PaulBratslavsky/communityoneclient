import React from "react";
import { Container } from "react-bootstrap";
import Bugtracker from "../componets/Bugtracker/bugtracker";

import { GET_ALL_ISSUES_QUERY } from '../apollo/queries/getAllIssues';

export default function Bugs() {
  return (
    <Container className="mt-3">
      <Bugtracker query={GET_ALL_ISSUES_QUERY} />
    </Container>
  );
}
