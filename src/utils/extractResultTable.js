
import { extractChapters, addEnds, extractChapterContent } from './extractChapters'
import extractOccurancesOfRegex from './extractOccurancesOfRegex'


// Ensure that each cell has as many keys as there are headers in the table

const ensureCellKeyCount = ({ cell, headercount }) => {

  while (cell.keys.length + cell.values.length < headercount) {
    cell.values.push('')
  }
  return cell
}

// Transform plain text table rows to JS-objects

var TableRowsToObject = (occurances) => {

  const getTableCellsFromRow = (rowString) => {
    let cells = rowString.split(/([A-Z_\-0-9.$]+)/).filter((cell) => /[A-Z0-9]/.test(cell)    )
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

  // Group specific actions
  let grouptableheaders = extractOccurancesOfRegex({ string: group.content.join('\n'), start: 0, chapters: [], regex: /(.+[A-Za-z]$)/gm })
  grouptableheaders = addEnds(grouptableheaders)

  let grouptables = extractChapterContent(grouptableheaders)

  let tablerows = grouptables.occurances.map((occ) => TableRowsToObject(occ))

  // Add group as key to cells
  const addKeyToCell = (cell,key) => {
    cell.keys  =  [key].concat(cell.keys)
    return cell
  }
  tablerows = tablerows.map((row) => row.map((cell) => addKeyToCell(cell,group.header.result)))

  return(tablerows)
}



const extractResultTable = (params) => {

  const chapters = params.chapters
  const headerToFind = params.headerToFind
  const tableheaders = params.tableheaders
  const NumberOfGroups = params.NumberOfGroups

  if (chapters === undefined | chapters === null) {
    throw new Error('MODEL RESULTS chapter not found!')
  }

  let cells

  // Find the chapter that has the "headerToFind" (eg. MODEL RESULTS)
  let modelResults = chapters.find((chapt) => chapt.header.result === headerToFind)

  // If output has groups:
  if (NumberOfGroups !== undefined & NumberOfGroups>1)  {


    // Find group specific parts of the output
    const RegExpGroup =  /Group [A-Z_]+$/gm
    const groups = extractChapters({ string: modelResults.content.join('\n'), regex: RegExpGroup })

    const grouptablerows = groups.map((group) => ExtractTableRows(group))
    cells = grouptablerows.map((arr) => arr.flat()).flat()
    cells = cells.map((cell) => ensureCellKeyCount({ cell: cell, headercount: tableheaders.length }))

  // If output does not have gtroups
  } else {

    // This function works as it similar to number of groups = 1
    let tablerows = ExtractTableRows(modelResults)
    cells = tablerows.map((arr) => arr.flat()).flat()
    cells = cells.map((cell) => ensureCellKeyCount({ cell: cell, headercount: tableheaders.length }))
  }
  return(cells)

}

export default extractResultTable