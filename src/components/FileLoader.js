import React from 'react'
import { Header, Button, Input } from 'semantic-ui-react'

const FileLoader = (  { handleFileLoad, mplusOutput }) => {
  if (mplusOutput !== null) {
    return('')
  }

  const inputStyle = {
    display: 'block',
    color: 'red'
  }



  return(
    <div>
      <Header>
            Load .out file
      </Header>
      <Button>
        <Input type="file" style={inputStyle} onChange={ handleFileLoad }></Input>
          Load
      </Button>
    </div>

  )

}

export default FileLoader