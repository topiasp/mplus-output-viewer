
import { extractChapters } from './extractChapters'
import extractTitle    from './extractTitle'
import extractNumberOfGroups from './extractNumberOfGroups'
import extractResultTable from './extractResultTable'
import extractModelIndicesTable from './extractModelModIndices'
import extractResidualOutput from './extractResidualOutput'
import columnsToRows from './columnsToRows'
import extractModelFitInformation from './extractModelFitInformation'

import { getUniqueFromArray } from './utils'

const parseOut = (mplusoutputstring) => {

  const parsed = {}

  // Extract main chapters
  const RegExpChapter = /(^[A-Z][A-Z 0-9-]+[A-Z]$)/gm
  try {
    parsed.chapters =  extractChapters({ string: mplusoutputstring, regex: RegExpChapter, filteringRegex: / (BY|WITH|ON)$/m  })
    parsed.title    =  extractTitle(parsed.chapters)
    parsed.NumberOfGroups = extractNumberOfGroups(mplusoutputstring)
  } catch(e) {
    console.log('Error with extracting chapters: ', e)
  }

  // Create variables
  let header
  let cells
  let tableheaders
  let variables

  // Extract model results
  try {
    variables = ['Estimate','S.E.','Est/S.E.','P-Value']
    tableheaders = ['Column1','Column2','Column3'].concat(variables)

    header = 'MODEL RESULTS'

    cells = extractResultTable(
      { chapters: parsed.chapters, headerToFind: header,tableheaders: tableheaders, NumberOfGroups: parsed.NumberOfGroups  }
    )

    parsed.modelResults = {
      header: header,
      cells: columnsToRows({ cells: cells, variables: variables }) // Pivot columns to rows
    }
  } catch(e) {
    console.log('Error with model results: ', e.message)
  }

  // Extract standardized model results
  try {
    header = 'STANDARDIZED MODEL RESULTS'

    cells = extractResultTable(
      { chapters: parsed.chapters, headerToFind: header,tableheaders: tableheaders, NumberOfGroups: parsed.NumberOfGroups  }
    )

    parsed.standardizedModelResults = {
      header: header,
      cells: columnsToRows({ cells: cells, variables: variables }) // Pivot columns to rows
    }
  } catch(e) {
    console.log('Error with standardized model results: ', e.message)
  }

  // Get group names from model results

  parsed.groups = getUniqueFromArray( parsed.modelResults.cells.flat().map((c) => c.group ) )

  // extractModelFitInformation
  try {
    parsed.modelFitInformation = extractModelFitInformation(parsed.chapters.find(chap => chap.header.result==='MODEL FIT INFORMATION'))
  } catch(e) {
    console.log('Error with model fit information: ', e.message)
  }

  // extractResidualOutput
  try {
    parsed.residualOutput = extractResidualOutput({ chapter: parsed.chapters.find(chap => chap.header.result==='RESIDUAL OUTPUT'), NumberOfGroups: parsed.NumberOfGroups })
  } catch(e) {
    console.log('Error with residual output: ', e.message)
  }

  // extract model mod indices
  try {
    parsed.modelIndices = extractModelIndicesTable(
      { chapter: parsed.chapters.find(chap => chap.header.result==='MODEL MODIFICATION INDICES')
        , NumberOfGroups: parsed.NumberOfGroups
      })
  } catch(e) {
    console.log('Error with mod indices: ', e.message)
  }

  return parsed
}

export default parseOut