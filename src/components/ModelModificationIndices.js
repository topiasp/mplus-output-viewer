import React from 'react'

import { getUniqueFromArray, rowToColumn } from '../utils/utils'
import ResultTable from './ResultTable'
import { Container } from 'react-bootstrap'



const ModelModificationIndices = ({ modelmodificationindices,show }) => {

  if ( modelmodificationindices === null || !show  ) {
    return ''
  }

  if ( modelmodificationindices === undefined  ) {
    return(
      <Container>
            No model modification indices to display
      </Container>
    )
  }

  //console.log('modelmodificationindices', modelmodificationindices)


  let groups = getUniqueFromArray( modelmodificationindices.cells.map(o => o.keys[0]) )
  const cells = manipulateModificationIndicesToTableCells(modelmodificationindices.cells, groups)



  // Table headers
  let headers = [
    { label: 'Subtable header', index: 0, values: getUniqueFromArray( cells.map(cell => cell.rows[0]) ) },
    { label: 'Parameter', index: 1, values: getUniqueFromArray( cells.map(cell => cell.rows[1]) ) },
    { label: 'Statistic', index: 1, values: getUniqueFromArray( cells.map(cell => cell.rows[2]) ) },
  ]

  headers = headers.concat( groups.map(group => {
    return({ 'label': group })
  }))


  return (
    <Container>
      <h3>Model modification indices</h3>
      <div>
        { modelmodificationindices.minimumMIvalue }
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