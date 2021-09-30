import React from 'react'
import { Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
export default function BackButton() {
const route = useHistory();

    return (
        <Button variant="primary" size="md" onClick={() => route.goBack()}>
            Back
        </Button>
    )
}
