import React from 'react'

import { getUniqueFromArray, rowToColumn } from '../utils/utils'
import ResultTable from './ResultTable'
import { Container } from 'react-bootstrap'
import extractModelIndicesTable from '../utils/extractModelModIndices'
import Error from './Error'



const ModelModificationIndices = ({ mplusOutput,show }) => {

  if ( mplusOutput === undefined || mplusOutput === null || !show  ) {
    return ''
  }

  // extract model mod indices
  let modelIndices
  try {
    modelIndices = extractModelIndicesTable(
      { chapter: mplusOutput.parsed.chapters.find(chap => chap.header.result==='MODEL MODIFICATION INDICES')
        , NumberOfGroups: mplusOutput.parsed.NumberOfGroups
      })
  } catch(e) {
    return(
      <Error message={'Error with parsing model mod. indices: ' + e.message }/>
    )
  }

  // Return warnign message if no mod. indices exist
  if ( modelIndices === undefined  ) {
    return(
      <Error type='warning' message='No model modification indices to display'/>
    )
  }

  console.log('modelIndices',modelIndices)


  let groups = getUniqueFromArray( modelIndices.cells.map(o => o.keys[0]) )
  const cells = manipulateModificationIndicesToTableCells( modelIndices.cells, groups)



  // Table headers
  let headers = [

    { label: 'Subtable header', index: 0, values: getUniqueFromArray( cells.map(cell => cell.rows[1]) ) },
    { label: 'Parameter', index: 1, values: getUniqueFromArray( cells.map(cell => cell.rows[2]) ) },
    { label: 'Statistic', index: 2, values: getUniqueFromArray( cells.map(cell => cell.rows[3]) ) },
  ]

  headers = headers.concat( groups.map(group => {
    return({ 'label': group })
  }))


  return (
    <Container>
      <h3>Model modification indices</h3>
      <div>
        { modelIndices.minimumMIvalue }
      </div>
      <div>
        A group is not shown in the table if no modification indices are above the minimum value.
      </div>
      <ResultTable
        cells = {  cells.map(cell => cell.rows.concat(cell.values.map(val => val.values))            )  }
        headers={ headers }/>
    </Container>
  )


}



const manipulateModificationIndicesToTableCells = (indices,groups) => {

  console.log('idnices',indices)
  
  let cells = indices.map(cell => ({ ...cell, column: cell.keys[0], rows: cell.keys.slice(1,) }))
  cells = rowToColumn(cells)


  // add empty cells to table for coherence
  const ensureCellCount = cell => {
    const values =  groups
      .map(group => {
        // Check if value for group exists
        const value = cell.values.find(v => v.column === group)
        // And replace with null observation if not
        return value !== undefined ? value : { column: group, value: null }
      })

    return { ...cell, values: values }
  }

  cells = cells.map(ensureCellCount)
  
  return cells
}

export default ModelModificationIndices