import React from 'react'
import { Container, Header, Table } from 'semantic-ui-react'

const ModelResults = ({ results, show }) => {

  if ( results === null || !show ) {
    return('')
  }
  const cells = results.cells
  const cellToTableRow = (cell) => {
    return(
      <Table.Row>
        {cell.keys.concat(cell.value).map((key) => <Table.Cell>{ key }</Table.Cell>)}
      </Table.Row>
    )
  }

  return(
    <Container>
      <Header>{ results.header }</Header>
      <Table>
        <Table.Body>
          { cells.map(cellToTableRow) }
        </Table.Body>
      </Table>

    </Container>
  )
}


export default ModelResults