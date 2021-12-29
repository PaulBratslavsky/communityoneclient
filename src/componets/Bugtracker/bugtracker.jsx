import React, { useState } from "react";
import { Button } from "react-bootstrap";
import IssuesList from "../IssuesList/issuesList";
import AddIssue from "../AddIssue/addIssue";
import Pane from "../Pane/pane";

import { useQuery } from "@apollo/client";

export default function Bugtracker({ query, variables}) {
  const [showAddIssue, setShowAddIssue] = useState(false);
  const { data, loading, error } = useQuery(query, variables);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const { issues } = data;

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setShowAddIssue((prev) => !prev)}
      >
        {showAddIssue ? "-" : "+"}
      </Button>
      <Pane>{showAddIssue ? <AddIssue /> : <IssuesList issues={issues}/>}</Pane>
    </>
  );
}
