import React from 'react'

export default function TableRow({row, columns, index}) {
  console.log(row.id, row.title, );
  return (
    <tr>
      <td>{index + 1}</td>  
      {columns.map(column => {
        console.log(column, "COLUMN");
        const result = Object.keys(row).find(key => key === column.props.source);
        return <td>{row[result]}</td>
      })}
    </tr>
  )
}
