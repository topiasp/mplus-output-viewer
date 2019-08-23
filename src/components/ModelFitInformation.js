import React from 'react'
import { Segment, Table, Header, Container } from 'semantic-ui-react'
import DownloadCSVButton from './DownloadCSVbutton'


import ResultTable from './ResultTable'


const ModelFitInformation = ({ modelFitInformation, show }) => {
  if ( modelFitInformation === null || !show ) {
    return('')
  }

  // Hard coded headers for table (and CSV)
  const headers = ['Statistic group','Statistic','Value']

  const statisticToTableRow = (stat) => {
    return(
      <Table.Row key = { stat.header+stat.statistic+stat.value }>
        <Table.Cell>{ stat.header }</Table.Cell>
        <Table.Cell>{ stat.statistic }</Table.Cell>
        <Table.Cell>{ stat.value }</Table.Cell>
      </Table.Row>)
  }

  // Expects array of arrays
  const dataToCSVconversion = modelFitInformation.map(f => [ f.header, f.statistic, f.value  ])
  console.log('modelfit', dataToCSVconversion)

  return(
    <Container>
      <Header as='h4'>
        MODEL FIT INFORMATION
        <DownloadCSVButton  params = { { data: dataToCSVconversion, headers: headers } } />
      </Header>

      <ResultTable
        cells = { modelFitInformation }
        headers = { headers }
        cellToTableRow = { statisticToTableRow }
      />

    </Container>
  )

}

export default ModelFitInformation