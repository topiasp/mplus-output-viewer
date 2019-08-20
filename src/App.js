import React, { useState, useEffect } from 'react'
import { Container, Sticky } from 'semantic-ui-react'
import Navbar from './components/Navbar'

//import dummydata from './dummydata/dummy.js'


import parseOut from './utils/parseOut'
import FileLoader from './components/FileLoader'
import ModelResults from './components/ModelResults'
import WholeOutput from './components/WholeOutput'
import GroupComparison from './components/GroupComparison'


const App = () => {

  const [ mplusOutput, setMplusOutput ] = useState(null)
  const [ page, setPage ] = useState('groupcomparison')


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

  console.log('page', page)
  console.log('mplusOutput: ', mplusOutput)

  return (
    <Container>
      <FileLoader mplusOutput = { mplusOutput } handleFileLoad={handleFileLoad}/>
      <Sticky>
        <Navbar mplusOutput = { mplusOutput } handlePageChange = { handlePageChange }/>
      </Sticky>
      <WholeOutput  show = { page === 'wholeoutput' }     mplusOutput = { mplusOutput } />
      <ModelResults show = { page === 'modelresults' }    results = { mplusOutput !== null ? mplusOutput.parsed.modelResults : null } />
      <ModelResults show = { page === 'stdmodelresults' } results = { mplusOutput !== null ? mplusOutput.parsed.standardizedModelResults : null } />
      <GroupComparison
        show = { page === 'groupcomparison' }
        chaptersbygroup = { mplusOutput !== null ? mplusOutput.parsed.chaptersbygroup : null }
      />
    </Container>
  )

}
export default App
