import React from 'react'


import { Container } from 'react-bootstrap'
import DownloadCSVbutton from './DownloadCSVbutton'

import ResultTable from './ResultTable'


import { getUniqueFromArray } from '../utils/utils'


const ModelResults = ({ results, show, groups  }) => {

  if ( results === null || !show ) {
    return('')
  }

  const cells = results.cells

  //let headersForGroupTable = ['Parameter header','Parameter','Statistic'].concat( groups )
  let headersForCSV = ['Parameter header','Parameter','Statistic','Group','Value']

  let headersForGroupTable = [
    { label: 'Parameter header', index: 0, values: getUniqueFromArray(  cells.flat().map(cell => cell.keys[0]) ) },
    { label: 'Parameter', index: 1,  values: getUniqueFromArray(  cells.flat().map(cell => cell.keys[1]) ) },
    { label: 'Statistic', index: 2, values: getUniqueFromArray(  cells.flat().map(cell => cell.keys[2]) ) }
  ]

  headersForGroupTable = headersForGroupTable.concat( groups.map(group => {
    return({ 'label': group })
  }))


  console.log('cell0', cells[0])

  const cellGroupsAsColumns = (cell) => cell[0].keys.concat(cell.map((cell) => cell.value))


  // Expects array of arrays
  const dataToCSVconversion = cells.flat().map(cell => [...cell.keys].concat(cell.group).concat(cell.value) )

  return(
    <Container>
      <div style={{float: 'left'}}>{ results.header }</div>
      <DownloadCSVbutton params = { { data: dataToCSVconversion, headers: headersForCSV } } />
      <ResultTable
        cells = { cells.map(cellGroupsAsColumns) }
        headers = { headersForGroupTable }
      />
    </Container>
  )
}


export default ModelResults