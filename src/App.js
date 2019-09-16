import React, { useState, useEffect } from 'react'
import Menu from './components/Menu'

//import dummydata from './dummydata/dummy.js'
//import dummydata_single from './dummydata/dummy_single'


import parseOut from './utils/parseOut'
import FileLoader from './components/FileLoader'
import ModelResults from './components/ModelResults'
import WholeOutput from './components/WholeOutput'
import ModelFitInformation from './components/ModelFitInformation'
import ResidualOutput from './components/ResidualOutput'
import ModelModificationIndices from './components/ModelModificationIndices'



const App = () => {

  const [ mplusOutput, setMplusOutput ] = useState(null)
  const [ page, setPage ] = useState('wholeoutput')
  const [ showFileUpload, setShowFileUpload ] = useState(true)

  //useEffect(() => { setMplusOutput({ filename: 'dummydata', string: dummydata.raw,parsed: parseOut(dummydata.raw) })  }, [])
  //useEffect(() => { setMplusOutput({ filename: 'dummydata', string: dummydata_single.raw,parsed: parseOut(dummydata_single.raw) })  }, [])


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
    setShowFileUpload(false)
  }

  const handlePageChange = (page) => {
    setPage(page)
  }

  console.log('mplusOutput: ', mplusOutput)

  const groups = mplusOutput !== null ? mplusOutput.parsed.groups : null

  // Menu is position: fixed, so this:
  const contentStyle = {
    zIndex: -1,
    marginTop: '5%'

  }
  const containerStyle = {
    position: 'relative'
  }

  const showModal = showFileUpload & mplusOutput === null

  return (
    <div style={containerStyle}>

      <FileLoader
        handleFileLoad={handleFileLoad}
        showFileUpload={ showModal }
        handleShowFileChange = {() => setShowFileUpload(false) }/>

      <Menu mplusOutput = { mplusOutput }     handlePageChange = { handlePageChange } page={page}/>
      <div style={contentStyle}>
        <WholeOutput          show = { page === 'wholeoutput' }         mplusOutput = { mplusOutput } />
        <ModelFitInformation  show = { page === 'modelfitinformation' }    modelFitInformation = { mplusOutput !== null ? mplusOutput.parsed.modelFitInformation : null } />
        <ModelResults         show = { page === 'modelresults' }  groups = { groups }   results = { mplusOutput !== null ? mplusOutput.parsed.modelResults : null } />
        <ModelResults         show = { page === 'stdmodelresults' }  groups = { groups } results = { mplusOutput !== null ? mplusOutput.parsed.standardizedModelResults : null } />
        <ResidualOutput       show = { page === 'residualoutput' }  output={ mplusOutput !== null ? mplusOutput.parsed.residualOutput : null }/>
        <ModelModificationIndices show = {  page === 'modelmodificationindices' } modelmodificationindices={ mplusOutput !== null ? mplusOutput.parsed.modelIndices : null }/>
      </div>
    </div>
  )

}
export default App
