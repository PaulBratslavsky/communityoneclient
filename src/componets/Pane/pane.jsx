import React from 'react'

export default function Pane({ children }) {
  return (
    <div className="shadow p-3 mt-3 rounded overflow-scroll">
      {children}
    </div>
  )
}
