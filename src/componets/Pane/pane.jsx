import React from 'react'

export default function Pane({ children }) {
  return (
    <div className="shadow p-3 rounded">
      {children}
    </div>
  )
}
