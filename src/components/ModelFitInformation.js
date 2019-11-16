import React from 'react'

import { Container } from 'react-bootstrap'



import { getUniqueFromArray } from '../utils/utils'
import ResultTable from './ResultTable'
import extractModelFitInformation from '../utils/extractModelFitInformation'
import Error from './Error'


const ModelFitInformation = ({ mplusOutput, show }) => {
  if ( mplusOutput === null || !show ) {
    return('')
  }

  // extractModelFitInformation
  let modelFitInformation
  try {
    modelFitInformation = extractModelFitInformation(mplusOutput.parsed.chapters.find(chap => chap.header.result==='MODEL FIT INFORMATION'))
  } catch(e) {
    return(
      <Error message={ 'Error with parsing model fit information: ' + e.message }/>
    )
  }

  // Hard coded headers for table
  const headers = [
    { label: 'Statistic group', index: 0, values: getUniqueFromArray( modelFitInformation.map(info => info.header) ) },
    { label: 'Statistic', index: 1 },
    { label: 'Value', index: 2 }
  ]

  const objectsToArrays = (ob) => {
    return([ob.header, ob.statistic, ob.value ])
  }


  return(
    <Container>
      <div style={{ float: 'left' }}>MODEL FIT INFORMATION</div>
      <ResultTable
        cells = { modelFitInformation.map(objectsToArrays) }
        headers = { headers }
      />

    </Container>
  )

}

export default ModelFitInformation