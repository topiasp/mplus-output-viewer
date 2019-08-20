import React from 'react'
import {  Button, Input, Grid, Container } from 'semantic-ui-react'

const FileLoader = (  { handleFileLoad, mplusOutput }) => {
  if (mplusOutput !== null) {
    return('')
  }

  const inputStyle = {
    display: 'none',
    color: 'red'
  }

  const buttonStyle = {
    fontSize: '200%',

  }


  return(
    <Container>
      <Grid>
        <Grid.Row></Grid.Row>
        <Grid.Row></Grid.Row>
        <Grid.Row></Grid.Row>
        <Grid.Row></Grid.Row>
        <Grid.Row centered>
          <Button primary style={buttonStyle}> <Input id="file-upload" type="file" style={inputStyle} onChange={ handleFileLoad }></Input>
            <label htmlFor="file-upload" className="custom-file-upload">Upload .out -file</label>
          </Button>
        </Grid.Row>
      </Grid>
    </Container>


  )

}

export default FileLoader