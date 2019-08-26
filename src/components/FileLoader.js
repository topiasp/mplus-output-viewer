import React from 'react'

import {  Button, Modal } from 'react-bootstrap'


const FileLoader = (  { handleFileLoad, showFileUpload, handleShowFileChange }) => {

  if (!showFileUpload) {
    return('')
  }

  const inputStyle = {
    display: 'none'
  }


  const handleUpload = () => handleShowFileChange()


  return(

    <Modal show={true}onHide={handleUpload}>
      <Modal.Header>
        <Modal.Title>Mplus output viewer</Modal.Title>
      </Modal.Header>
      <Modal.Body>Upload an .out -file from Mplus</Modal.Body>
      <Modal.Footer>
        <Button primary={'true'}> <input id="file-upload" type="file" style={inputStyle} onChange={ handleFileLoad }></input>
          <label htmlFor="file-upload" className="custom-file-upload">Upload</label>
        </Button>
      </Modal.Footer>
    </Modal>




  )

}

export default FileLoader