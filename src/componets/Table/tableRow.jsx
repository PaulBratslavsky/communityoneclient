import React from 'react'

export default function TableRow({row, columns, index}) {
  return (
    <tr>
      <td class="first-col">{index + 1}</td>  
      {columns.map(column => {
        const result = Object.keys(row).find(key => key === column.props.source);
        
        if (column.props.render) return <td>{column.props.render(row[result])}</td>

        return <td>{row[result]}</td>
      })}
    </tr>
  )
}
