import { Children } from "react";
import styled from "styled-components";
import TableRow from "./tableRow";

const TableStyled = styled.table`
  display: table;
  width: 100%;
  color: #343a40;
  text-align: left;
  border-collapse: collapse;
  border-spacing: 1px;
  margin-bottom: 1.5rem;

  thead {
    vertical-align: middle;
    color: #7740d9;
  }

  td,
  th {
    padding: 0.85rem;
    white-space: nowrap;
  }

  td.first-col {
    color: #7740d9;
  }

  tr {
    display: table-row;
    vertical-align: bottom;
    border-bottom: 1px solid #3a4250;
  }
`;

export default function Table({ children, sourceData }) {
  const columns = Children.toArray(children);

  return (
    <TableStyled>
      <thead>
        <tr>
          <th>#</th>
          {columns.map((column) => (
            <th>{column.props.label}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {sourceData.map((row, index) => {
          return <TableRow row={row} columns={columns} index={index} />;
        })}
      </tbody>
    </TableStyled>
  );
}

/*

display: table;
  width: 100%;
  color: #adb5bd;
  text-align: left;
  border-collapse: collapse;
  border-spacing: 1px;
  margin-bottom: 1.5rem;

  thead {
    vertical-align: middle;
  }

  td,
  th {
    padding: 0.85rem;
    white-space: nowrap;
    
  }

  tr {
    display: table-row;
    vertical-align: bottom;
    border-bottom: 1px solid #3a4250;
  }

  */
