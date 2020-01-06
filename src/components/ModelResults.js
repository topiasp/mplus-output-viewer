import React from 'react'
import { Container } from 'react-bootstrap'
import ResultTable from './ResultTable'
import { getUniqueFromArray } from '../utils/utils'
import extractResultTable from '../utils/extractResultTable'
import columnsToRows from '../utils/columnsToRows'
import Error from './Error'


const ModelResults = ({ mplusOutput, show, type  }) => {

  if ( mplusOutput === null || !show ) {
    return('')
  }

  // Extract results (depending on type )
  let results

  try {
    results = applyExtraction(mplusOutput,type)
  } catch(e) {
    return(
      <Error message={ 'Error with parsing model results: ' + e.message }/>
    )
  }


  const groups = getUniqueFromArray( results.cells.flat().map((c) => c.group ) )


  /// Create results

  const cells = results.cells


  let headersForGroupTable = [
    { label: 'Parameter header', index: 0, values: getUniqueFromArray(  cells.flat().map(cell => cell.keys[0]) ) },
    { label: 'Parameter', index: 1,  values: getUniqueFromArray(  cells.flat().map(cell => cell.keys[1]) ) },
    { label: 'Statistic', index: 2, values: getUniqueFromArray(  cells.flat().map(cell => cell.keys[2]) ) }
  ]

  headersForGroupTable = headersForGroupTable.concat( groups.map(group => {
    return({ 'label': group })
  }))


  const cellGroupsAsColumns = (cell) => cell[0].keys.concat(cell.map((cell) => cell.value))


  return(
    <Container>
      <div style={{ float: 'left' }}>{ results.header }</div>
      <ResultTable
        cells = { cells.map(cellGroupsAsColumns) }
        headers = { headersForGroupTable }
      />
    </Container>
  )
}

const applyExtraction = (mplusOutput,type) => {

  let variables = ['Estimate','S.E.','Est/S.E.','P-Value']
  let tableheaders = ['Column1','Column2','Column3'].concat(variables)

  const parsed = mplusOutput.parsed


  let header = type === 'standardized' ? 'STANDARDIZED MODEL RESULTS' : 'MODEL RESULTS'

  let cells = extractResultTable(
    { chapters: parsed.chapters, headerToFind: header,tableheaders: tableheaders, NumberOfGroups: parsed.NumberOfGroups  }
  )

  return {
    header: header,
    cells: columnsToRows({ cells: cells, variables: variables }) // Pivot columns to rows
  }
}


export default ModelResults