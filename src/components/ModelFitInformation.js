import React from 'react'

import { Container } from 'react-bootstrap'
import DownloadCSVButton from './DownloadCSVbutton'


import { getUniqueFromArray } from '../utils/utils'
import ResultTable from './ResultTable'


const ModelFitInformation = ({ modelFitInformation, show }) => {
  if ( modelFitInformation === null || !show ) {
    return('')
  }

  console.log('model fit info', modelFitInformation)
  // Hard coded headers for table (and CSV)
  const headers = [
    { label: 'Statistic group', index: 0, values: getUniqueFromArray( modelFitInformation.map(info => info.header) ) },
    { label: 'Statistic', index: 1 },
    { label: 'Value', index: 2 }
  ]

  console.log('headers', headers)


  const objectsToArrays = (ob) => {
    return([ob.header, ob.statistic, ob.value ])
  }

  // Expects array of arrays
  const dataToCSVconversion = modelFitInformation.map(f => [ f.header, f.statistic, f.value  ])
  

  return(
    <Container>
      <div style={{float: 'left'}}>MODEL FIT INFORMATION</div>
      <DownloadCSVButton  params = { { data: dataToCSVconversion, headers: headers } } />
      <ResultTable
        cells = { modelFitInformation.map(objectsToArrays) }
        headers = { headers }
      />

    </Container>
  )

}

export default ModelFitInformation