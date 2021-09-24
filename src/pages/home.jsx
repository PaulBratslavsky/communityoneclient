import React from 'react'
import { Container } from 'react-bootstrap'
import { Projects } from '../componets/Projects/prjects'

export default function Home() {
  return (
    <div className="h-100">
      <Container>
      <Projects />
      </Container>
    </div>
  )
}
