import React from 'react'
import { Table } from 'semantic-ui-react'

const ResultTable = ({ headers, cells, cellToTableRow }) => {

  return(
    <Table celled selectable striped collapsing compact>
      <Table.Header>
        <Table.Row>
          {
            headers.map(c => <Table.HeaderCell celled striped>{ c }</Table.HeaderCell>)
          }
        </Table.Row>
      </Table.Header>
      <Table.Body>
        { cells.map(cellToTableRow) }
      </Table.Body>
    </Table>

  )

}


export default ResultTable