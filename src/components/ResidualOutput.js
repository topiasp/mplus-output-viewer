import React from 'react'

import { getUniqueFromArray, rowToColumn } from '../utils/utils'
import ResultTable from './ResultTable'
import { Container } from 'react-bootstrap'


import uuidv4 from 'uuid'

const ResidualOutput = ({ output,show }) => {

  if ( output === null || !show || output === undefined ) {
    return('')
  }


  let groups = getUniqueFromArray( output.means.map(o => o.group) )

  const groupsExist = groups.length > 0 ? true : false

  if ( !groupsExist ) {
    groups = ['Value']
  }

  let headers = [
    { label: 'Statistic', index: 0, values: getUniqueFromArray( output.means.map(o => o.statistic) ) },
    { label: 'Parameter', index: 1, values: getUniqueFromArray( output.means.map(o => o.parameter) ) },
  ]

  headers = headers.concat( groups.map(group => {
    return({ 'label': group })
  }))
  // Define rows and column for pivoting
  output.means = output.means.map(m => {
    return { ...m, rows: [ m.statistic, m.parameter], column: m.group }
  })

  const pivotedMeans = rowToColumn(output.means)

  // If no group present, no output.means
  let meansTable = ((means) => {

    if (means.length === 0 ) {
      return ''
    }

    return (
      <div>
        <h3>Estimates and residuals for Means/Intercepts/Tresholds</h3>
        <ResultTable
          cells = {  pivotedMeans.map(cell => cell.rows.concat(cell.values.map(val => val.values))            )  }
          headers={ headers }/>
      </div>
    )
  })(output.means)

  // Return tables

  return(
    <Container>
      {
        meansTable
      }
      <h2>Covariance/Correlation tables</h2>
      {
        output.covariances.map(cov => correlationOrCovarianceTableFromData(cov,groups))
      }
    </Container>
  )

}


const correlationOrCovarianceTableFromData = (data,columns) => {




  const cells  = data.content.flat().map(o => {  return { column: o.group, rows: o.keys, value: o.value } })

  const pivotedCells = rowToColumn(cells)

  //console.log('cells', cells)
  //console.log('pivotedCells', pivotedCells)

  let headers = [
    { label: 'Parameter 1',  index: 0, values: getUniqueFromArray( cells.map(cell => cell.rows[0] ) )  },
    { label: 'Parameter 2',  index: 1, values: getUniqueFromArray( cells.map(cell => cell.rows[1] ) ) },
  ].concat( columns.map(group => {   return({ 'label': group })  }))

  console.log('headewrs', headers)

  return(
    <div key={uuidv4()} >
      <h3>{ data.header }</h3>
      <ResultTable
        cells = {  pivotedCells.map(cell => cell.rows.concat(cell.values.map(val => val.values))            )  }
        headers={ headers }/>
    </div>

  )

}

export default ResidualOutput