import React from 'react'

import { Container } from 'react-bootstrap'



import { getUniqueFromArray } from '../utils/utils'
import ResultTable from './ResultTable'


const ModelFitInformation = ({ modelFitInformation, show }) => {
  if ( modelFitInformation === null || !show ) {
    return('')
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
      <div style={{float: 'left' }}>MODEL FIT INFORMATION</div>
      <ResultTable
        cells = { modelFitInformation.map(objectsToArrays) }
        headers = { headers }
      />

    </Container>
  )

}

export default ModelFitInformation