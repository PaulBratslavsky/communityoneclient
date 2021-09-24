import React from 'react'
import { Container } from "react-bootstrap"
import { useParams } from "react-router-dom";
import BackButton from '../componets/BackButton';

export default function Details() {
  const { projectID } = useParams();

  return (
    <Container>
      <header>
        <h1>Details Page Private for blog with id {projectID}</h1>
        <BackButton />
      </header>
    </Container>
  )
}
