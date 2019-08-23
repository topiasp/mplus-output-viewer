import React, { useState, useEffect } from 'react'
import { Container, Sticky } from 'semantic-ui-react'
import Navbar from './components/Navbar'

//import dummydata from './dummydata/dummy.js'


import parseOut from './utils/parseOut'
import FileLoader from './components/FileLoader'
import ModelResults from './components/ModelResults'
import WholeOutput from './components/WholeOutput'
import GroupComparison from './dummydata/deadcode/GroupComparison'
import ModelFitInformation from './components/ModelFitInformation'


const App = () => {

  const [ mplusOutput, setMplusOutput ] = useState(null)
  const [ page, setPage ] = useState('modelinformation')


  //useEffect(() => { setMplusOutput({ filename: 'dummydata', string: dummydata.raw,parsed: parseOut(dummydata.raw) })  }, [])


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

  const handlePageChange = (page) => {
    setPage(page)
  }

  console.log('mplusOutput: ', mplusOutput)

  const groups = mplusOutput !== null ? mplusOutput.parsed.groups : null

  return (
    <Container>
      <FileLoader mplusOutput = { mplusOutput } handleFileLoad={handleFileLoad}/>
      <Sticky>
        <Navbar mplusOutput = { mplusOutput } handlePageChange = { handlePageChange }/>
      </Sticky>
      <WholeOutput          show = { page === 'wholeoutput' }         mplusOutput = { mplusOutput } />
      <ModelFitInformation  show = { page === 'modelinformation' }    modelFitInformation = { mplusOutput !== null ? mplusOutput.parsed.modelFitInformation : null } />
      <ModelResults         show = { page === 'modelresults' }  groups = { groups }   results = { mplusOutput !== null ? mplusOutput.parsed.modelResults : null } />
      <ModelResults         show = { page === 'stdmodelresults' }  groups = { groups } results = { mplusOutput !== null ? mplusOutput.parsed.standardizedModelResults : null } />
    </Container>
  )

}
export default App
