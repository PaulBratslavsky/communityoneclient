import React from 'react'

export default function TableRow({row, columns, index}) {
  return (
    <tr>
      <td>{index + 1}</td>  
      {columns.map(column => {
        const result = Object.keys(row).find(key => key === column.props.source);
        return <td>{row[result]}</td>
      })}
    </tr>
  )
}
