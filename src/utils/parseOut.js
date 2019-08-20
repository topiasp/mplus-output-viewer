
import { extractChapters } from './extractChapters'
import extractTitle    from './extractTitle'
import extractNumberOfGroups from './extractNumberOfGroups'
import extractResultTable from './extractResultTable'
import extractOutputPerGroup from './extractOutputPerGroup'
import columnsToRows from './columnsToRows'

import { getUniqueFromArray } from './utils'

const parseOut = (mplusoutputstring) => {

  const parsed = {}

  // Extract main chapters
  const RegExpChapter = /(^[A-Z][A-Z 0-9]+[A-Z]$)/gm
  parsed.chapters =  extractChapters({ string: mplusoutputstring, regex: RegExpChapter, filteringRegex: / (BY|WITH|ON)$/m  })
  parsed.title    =  extractTitle(parsed.chapters)
  parsed.NumberOfGroups = extractNumberOfGroups(mplusoutputstring)

  // Extract model results
  const variables = ['Estimate','S.E.','Est/S.E.','P-Value']
  const tableheaders = ['Column1','Column2','Column3'].concat(variables)

  let header = 'MODEL RESULTS'

  let cells = extractResultTable(
    { chapters: parsed.chapters, headerToFind: header,tableheaders: tableheaders, NumberOfGroups: parsed.NumberOfGroups  }
  )

  parsed.modelResults = {
    header: header,
    cells: columnsToRows({ cells: cells, variables: variables }) // Pivot columns to rows
  }

  // Extract standardized model results

  header = 'STANDARDIZED MODEL RESULTS'

  cells = extractResultTable(
    { chapters: parsed.chapters, headerToFind: header,tableheaders: tableheaders, NumberOfGroups: parsed.NumberOfGroups  }
  )

  parsed.standardizedModelResults = {
    header: header,
    cells: columnsToRows({ cells: cells, variables: variables }) // Pivot columns to rows
  }

  // Get group names from model results
  parsed.groups =  getUniqueFromArray( parsed.modelResults.cells.map((c) => c.group ) )



  // Extract chapter group partitions for comparison
  parsed.chaptersbygroup =   extractOutputPerGroup(parsed.chapters)

  return parsed
}

export default parseOut