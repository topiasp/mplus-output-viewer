import { extractChapters, addEnds, extractChapterContent } from './extractChapters'
import extractOccurancesOfRegex from './extractOccurancesOfRegex'
import { joinTwoArrays } from '../utils/utils'



// Transform plain text table rows to JS-objects

var TableRowsToObject = (occurances) => {

  const getTableCellsFromRow = (rowString) => {
    let cells =   rowString
      .split(/([0-9]+\.[0-9]+)/)
      .filter((cell) => /[A-Z0-9]/.test(cell)    )
      .map(cell => cell.trim())
    return(cells)
  }


  let originalTableRows =  occurances.content.map((r) =>   getTableCellsFromRow(r)).filter((r) => r.length>0)



  const rowAsObject = (row,additionalKey) => {
    const rowObj = {}
    rowObj.keys = [ additionalKey, row[0] ]
    row.splice(0,1)
    rowObj.values = row
    return rowObj
  }

  const tableRows = originalTableRows.map((or) => rowAsObject(or,occurances.header.result))
  return(tableRows)
}




// Extract rows of table
const ExtractTableRows = (group) => {

  // Return if no mod indices
  // .includes is dangerous since must account for newline characters
  if ( group.content.find(c => c.indexOf('No modification indices above the minimum value')>-1) ) {
    return(undefined)
  }

  const groupName = group.header.result.replace('Group ','')

  group.content = group.content.filter(c => c.length>1)

  let  subtableheaders  = extractOccurancesOfRegex({ string: group.content.join('\n'), start: 0, chapters: [], regex: /(.+[A-Za-z]$)/gm })
  subtableheaders       = addEnds(subtableheaders)
  const subtables       = extractChapterContent(subtableheaders)

  let subtableCells     = subtables.occurances.map(TableRowsToObject).flat().map(cell => ({ ...cell, values: cell.values.filter(val => !(/[^0-9.-]/.test(val))) }) )
  subtableCells = subtableCells.map(cell => ({ ...cell, keys: [groupName].concat(cell.keys) }) )


  return( subtableCells )
}



const extractModelIndicesTable = (params) => {

  const chapter = params.chapter
  const NumberOfGroups = params.NumberOfGroups

  if (NumberOfGroups === 1) {
    // Apparently, if no groups in analysis -> no mod indices
    return undefined
  }


  const modVariables =  ['M.I.'  ,'E.P.C.' ,'Std E.P.C.' ,'StdYX E.P.C.']


  if (chapter === undefined | chapter === null) {
    alert('No output loaded to get model results from!')
  }

  // Find limit for minimum M.I. value
  const minimumMIvalue = chapter.content.find(row => row.indexOf('Minimum M.I. value for printing the modification index')>-1)


  // Find group specific parts of the output
  const RegExpGroup =  /Group [A-Z_]+$/gm
  const groups = extractChapters({ string: chapter.content.join('\n'), regex: RegExpGroup })

  const cells = groups
    .map((group) => ExtractTableRows(group))
    .filter(grouptable => grouptable !== undefined)
    .flat()
    .map(tablerow => ({ ...tablerow, columns: modVariables }))
    .map(table => {
      return joinTwoArrays(table.columns,table.values).map(arr => ({ keys: table.keys.concat(arr[0]), value: arr[1]   }))
    }).flat()


  return({
    cells,
    minimumMIvalue
  })

}

export default extractModelIndicesTable