import React from 'react'
import { Container, Header, Table } from 'semantic-ui-react'
import DownloadCSVbutton from './DownloadCSVbutton'

import ResultTable from './ResultTable'





const ModelResults = ({ results, show, groups  }) => {

  if ( results === null || !show ) {
    return('')
  }
  const headersForGroupTable = ['Parameter header','Parameter','Value type'].concat( groups )
  const headersForCSV = ['Parameter header','Parameter','Value type','Group','Value']

  const cells = results.cells


  const cellGroupsAsColumns = (cell) => cell[0].keys.concat(cell.map((cell) => cell.value))

  const groupGrowsAsCells = (groupRow) => {

    return(
      <Table.Row>
        { cellGroupsAsColumns(groupRow).map(c => <Table.Cell>{ c }</Table.Cell>  )}
      </Table.Row>
    )

  }

  // Expects array of arrays
  const dataToCSVconversion = cells.flat().map(cell => [...cell.keys].concat(cell.group).concat(cell.value) )

  return(
    <Container>
      <Header>{ results.header }
        <DownloadCSVbutton params = { { data: dataToCSVconversion, headers: headersForCSV } } />
      </Header>
      <ResultTable
        cells = { cells }
        cellToTableRow = { groupGrowsAsCells }
        headers = { headersForGroupTable }
      />
    </Container>
  )
}


export default ModelResults