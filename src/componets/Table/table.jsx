import styled from "styled-components";
import TableRow from './tableRow';

const TableStyled = styled.table`
  background: red;
  color: white;
  th {
    padding: 10px;
  }
`;

export default function Table({ children: columns, sourceData }) {
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
          return <TableRow row={row} columns={columns} index={index} />;  })}
      </tbody>
    </TableStyled>
  );
}
