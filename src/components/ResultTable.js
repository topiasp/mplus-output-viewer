import React,{ useState } from 'react'
import { Table } from 'semantic-ui-react'

import uuidv4 from 'uuid'
import CheckboxList from './CheckboxList'

// Componente


const ResultTable = ({ headers, cells }) => {

  const [tableFilters, setTableFilters] = useState({})

  console.log('tableFilters ', tableFilters)

  const tableStyle = { fontSize: '75%',padding: '1px' }
  const cellStyle = { padding: 1 }

  const dataToCells = (cells,idx) => {
    const style = { backgroundColor: idx % 2 === 0 ? 'lightgrey' : '' }
    return( <tr key={uuidv4()} style={style}>{ cells.map(c => <td key={uuidv4()} style={cellStyle}>{ c }</td>)}</tr>    )
  }

  // handle list change
  const handleListChange = (filter) => {

    const filterUpdate = { ...tableFilters }
    filterUpdate[filter.label] = filter     // This fails if a table has two columns with identical names
    setTableFilters(filterUpdate)
  }



  // handle headers
  // if header has 'values' -attribute: create a select tag with options
  // if not, plain string header
  const createHeader = (header) => {
    if (header.values !== undefined) {

      const selectedOptions = tableFilters[header.label] !== undefined ? tableFilters[header.label].selectedOptions  : header.values

      return(<CheckboxList options={ { label: header.label, selectedOptions: selectedOptions, values: header.values } } handleListChange={ handleListChange }/>)
    }
    return header.label
  }

  // apply filter set in state
  // TODO: horrible
  const applyFilter = (row) => {

    let filters
    let filter = true
    let header
    // loop through header and see if exists in filters
    // Header is in filters, check that row value (of header index)
    // is included in 'selectedOptions' attribute
    for (let index=0; index<headers.length;index++) {
      header = headers[index]
      filters = tableFilters[header.label]
      if (tableFilters[header.label] !== undefined) {
        if (filters.selectedOptions.indexOf(row[header.index]) === -1) {
          filter = false
        }
      }
    }

    return filter
  }


  return(
    <Table style={tableStyle}  >
      <thead>
        <tr>
          {
            headers.map(createHeader).map(c => <th key={uuidv4()} style={cellStyle}>{ c }</th>)
          }
        </tr>
      </thead>
      <tbody>
        { cells.filter(applyFilter).map((c,idx) => dataToCells(c,idx)) }
      </tbody>
    </Table>

  )

}


export default ResultTable