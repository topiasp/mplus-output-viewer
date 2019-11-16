import React, { useState } from 'react'

import {  Button, Modal } from 'react-bootstrap'


const FileLoader = (  { handleFileLoad, showFileUpload, handleShowFileChange }) => {


  const initialDragStatus = 'Drag an .out -file here'
  const [dragStatus,setDragStatus] = useState(initialDragStatus)

  if (!showFileUpload) {
    return('')
  }

  const inputStyle = {
    display: 'none'
  }


  const handleUpload = () => handleShowFileChange()


  const dropAreaStyle = {
    background: '#efefef' ,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid 3px transparent',
    transition: 'all 250ms ease-in-out 0s',
    position: 'relative',
    padding: '35px',
    fontSize: '120%',
  }

  // Drag and drop functionality
  const onDragEnter = event => {
    event.preventDefault()
    event.stopPropagation()
    setDragStatus('Drop file')
    event.target.style.border = 'dashed black 3px'
  }
  const onDragLeave =  event => {
    event.preventDefault()
    event.stopPropagation()

    setDragStatus(initialDragStatus)
    event.target.style.border = dropAreaStyle.border
  }

  const doNothing = event => {
    event.preventDefault()
    event.stopPropagation()
  }

  const onDrop = event => {
    event.preventDefault()
    event.stopPropagation()

    const file = event.dataTransfer.files[0]

    if ( file.name.toLowerCase().match(/.out$/) ) {

      handleFileLoad(file)

    } else {

      alert('Not an .out -file!')
      setDragStatus(initialDragStatus)
      event.target.style.border = dropAreaStyle.border

    }
  }

  return(

    <Modal show={true}onHide={handleUpload}>
      <Modal.Header>
        <Modal.Title>Mplus output viewer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="DropArea"
          style={dropAreaStyle}
          onDrop={onDrop}
          onDragEnter={onDragEnter}
          onDragOver={doNothing}
          onDragLeave ={onDragLeave}
        >
          { dragStatus }
        </div>

      </Modal.Body>

      <Button primary={'true'} style={{ margin: '1%'}} >
        <input id="file-upload" type="file" style={inputStyle} onChange={ (e) => handleFileLoad(e.target.files[0]) }></input>
        <label htmlFor="file-upload" className="custom-file-upload"  style={{ margin: '0px' }}>Or use the file explorer</label>
      </Button>

    </Modal>




  )

}

export default FileLoader