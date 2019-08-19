import React from 'react'
import { Button } from 'semantic-ui-react'

class FileInput extends React.Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.fileInput = React.createRef()
  }
  handleSubmit(event) {
    event.preventDefault()
    alert(
      `Selected file - ${
        this.fileInput.current.files[0].name
      }`
    )
  }

  handleChange = (event) => {
    event.preventDefault()
    const reader = new FileReader()
    reader.onload = (e) =>  {
      this.props.handleFileLoad({ filename: this.fileInput.current.files[0].name,string: reader.result })
    }
    reader.readAsText(this.fileInput.current.files[0],'ISO-881')


  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
        Upload file:
          <input type="file" ref={this.fileInput} onChange={this.handleChange} />
        </label>
      </form>
    )
  }
}

export default FileInput
