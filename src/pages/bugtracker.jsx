import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import IssuesList from "../componets/IssuesList/issuesList";
import AddIssue from "../componets/AddIssue/addIssue";
import Pane from "../componets/Pane/pane";

export default function Bugtracker() {
  const [showAddIssue, setShowAddIssue] = useState(false);

  return (
    <Container>
      <Button
        variant="primary"
        onClick={() => setShowAddIssue((prev) => !prev)}
      >
        {showAddIssue ? "-" : "+"}
      </Button>
      <Pane>{showAddIssue ? <AddIssue /> : <IssuesList />}</Pane>
    </Container>
  );
}
