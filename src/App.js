import React, { useState, useEffect } from 'react'
import { Container, Sticky } from 'semantic-ui-react'
import Navbar from './components/Navbar'
//import dummydata from './dummydata/dummy.js'

import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

import parseOut from './utils/parseOut'
import FileLoader from './components/FileLoader'
import ModelResults from './components/ModelResults'
import WholeOutput from './components/WholeOutput'


const App = () => {

  const [ mplusOutput, setMplusOutput ] = useState(null)


  // useEffect(() => { setMplusOutput({ filename: 'dummydata', string: dummydata.raw,parsed: parseOut(dummydata.raw) })  }, [])


  const handleFileLoad = (e) => {
    const fileInput = e.target
    const file = fileInput.files[0]
    const reader = new FileReader()

    reader.onload = () =>  {
      setMplusOutput(
        {
          string: reader.result
          ,filename: fileInput.files[0].name
          ,parsed: parseOut(reader.result)
        })
    }

    reader.readAsText(file,'ISO-881')
  }

  return (
    <Container>
      <Router>
        <FileLoader mplusOutput = { mplusOutput } handleFileLoad={handleFileLoad}/>
        <Sticky>
          <Navbar mplusOutput = { mplusOutput }/>
        </Sticky>
        <Route path="/wholeoutput" render={() => <WholeOutput mplusOutput={mplusOutput} />} />
        <Route path="/modelresults" render={() => <ModelResults results = { mplusOutput !== null ? mplusOutput.parsed.modelResults : null } />} />
        <Route path="/standardizedmodelresults" render={() => <ModelResults results = { mplusOutput !== null ? mplusOutput.parsed.standardizedModelResults : null } />} />
      </Router>
    </Container>
  )
}
export default App
