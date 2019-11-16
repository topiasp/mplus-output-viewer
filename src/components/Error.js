import React from 'react'
import { Container, Alert } from 'react-bootstrap'



const Error = ({ message, type }) => {

  return(
    <Container>
      <Alert variant={ type ? type : 'danger' }>
        { message }
      </Alert>
    </Container>
  )
}

export default Error