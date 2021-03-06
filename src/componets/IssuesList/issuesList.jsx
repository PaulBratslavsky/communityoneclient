import React from "react";
import Table from "../Table/table";
import TableColumn from "../Table/tableColumn";
import styled from "styled-components";



const BadgeStyled = styled.span`
  display: inline-block;
  padding: 0.25em 0.4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  color: #fff;
  background-color: #ff5b5b;
`;

function Badge({ text, onClick }) {
  return <BadgeStyled onClick={onClick}>{text}</BadgeStyled>;
}

export default function IssuesList({ issues }) {
  
  return (
    <div>
      <Table sourceData={issues}>
        <TableColumn source="issueBrief" label="Issue Brief" />
        <TableColumn source="dueDate" label="Due Date" />
        <TableColumn source="type" label="Type" />
        <TableColumn
          source="createdBy"
          label="Created By"
          render={(data) => (
            <span>{data.firstName + " " + data.lastName[0]} </span>
          )}
        />
        <TableColumn
          source="status"
          label="Status"
          render={(data) => <Badge text={data} />}
        />
        <TableColumn source="priority" label="Priority" />
        <TableColumn source="severity" label="Severity" />

        <TableColumn
          source="project"
          label="Project"
          render={(data) => <span>{data?.name}</span>}
        />
        <TableColumn source="id" label="Issue ID" />
      </Table>
    </div>
  );
}
