import { extractChapters } from './extractChapters'

/*
The structure of residual output is as follows:
   ESTIMATED MODEL AND RESIDUALS (OBSERVED - ESTIMATED) FOR groupname
         Model Estimated Means/Intercepts/Thresholds
         Residuals for Means/Intercepts/Thresholds
         Standardized Residuals (z-scores) for Means/Intercepts/Threshold
         Normalized Residuals for Means/Intercepts/Threshold
         Model Estimated Covariances/Correlations/Residual Correlations
      	 Model Estimated Correlations/Residual Correlations
         Residuals for Covariances/Correlations/Residual Correlations
         Residuals for Correlations/Residual Correlations

   UNIVARIATE PROPORTIONS FOR CATEGORICAL VARIABLES FOR groupname
*/

const parseESTIMATED = (ESTIMATED_GROUP) => {


  const params = {
    string: ESTIMATED_GROUP.content.join('\n'),
    regex: /[A-Z][a-z][a-zA-Z/ ()\\-]{1,}$/gm
  }
  let chaptersOfEstimated = extractChapters(params)


  let group = /FOR (.+$)/.exec(ESTIMATED_GROUP.header.result) // Get group name from header text

  if (group !== null) { // If no group is found, assume the analysis was not grouped

    group = group[1] // Cant be done earlier -> would result to error with undefined
    // Add group to each chapter
    chaptersOfEstimated = chaptersOfEstimated.map(chap => {
      return { ...chap, group: group }
    })
  }


  // Separate based on nature of table
  //  1. Means: Model Estimated Means.. & Residuals for means
  //  2. Covariances: These are cross-tabulations

  const chapterDivider = (chap) => /Residuals.+for Means/.test(chap.header.result) |  chap.header.result.indexOf('Model Estimated Means') > -1

  const means = chaptersOfEstimated.filter(chapterDivider)
  const parsedMeans = means.map(parseMeans)


  let covariances =  chaptersOfEstimated.filter(chap => !chapterDivider(chap))

  covariances = covariances.map(cov => {
    return { ...cov, key: cov.header.result }  // Add key for gatherByKey
  })
  // this gathers covarience/correlation tables that are spread into several tables in the output
  const  gatheredCovariances = gatherByKey(covariances)


  let parsedCovariances =   gatheredCovariances.map(table => {
    return {
      header: table.header,
      key: table.header, // Prepare for gatherByKey
      content:  table.content.map(subtable => {
        const str = getTableStructure(subtable)
        return getTableValues(str)
      }).flat()
      // add group
        .map(obs => {
          return { ...obs,group: group, keys: obs.keys }
        })
    }
  })


  return {
    means: parsedMeans,
    covariances: parsedCovariances
  }
}

const parseMeans = (means) => {

  const r =  means.content
    .filter(t => /[^ ]/.test(t))
    .map(m => m.split(' ').filter(res => res.length>1))
    .map(m => m.filter(mo => /[0-9A-Z]/.test(mo) )).filter(m => m.length>0)

  return r[0].map((o,idx) => {
    return { parameter: o, value: r[1][idx], group: means.group, statistic: means.header.result }
  })

}





const extractResidualOutput = (ResidualOutputChapter) => {


  const params = {
    string: ResidualOutputChapter.chapter.content.join('\n'),
    regex:  ResidualOutputChapter.NumberOfGroups > 1 ?   /^[A-Z ()-]{2,}FOR.+$/gm : /^[A-Z ()-]+$/gm
  }
  const chaptersOfResidualOutput = extractChapters(params)


  // Divide into two for ease
  const ESTIMATED = chaptersOfResidualOutput.filter(chap => chap.header.result.indexOf('ESTIMATED MODEL AND RESIDUAL') > -1)
  const UNIVARIATE = chaptersOfResidualOutput.filter(chap => chap.header.result.indexOf('ESTIMATED MODEL AND RESIDUAL') === -1)

  //console.log('ESTIMATED', ESTIMATED)
  //console.log('UNIVARIATE',UNIVARIATE)

  const PARSED_ESTIMATED  = ESTIMATED.map(parseESTIMATED)


  return {
    means: PARSED_ESTIMATED.map(E => E.means.flat()).flat(),
    covariances: gatherByKey( PARSED_ESTIMATED.map(E => E.covariances).flat() )
  }
}


const gatherByKey = arrayOfObjects => {

  const gatherer = (obj,elem) => {

    let key = elem.key // Defines the key to distinguish tables

    if (obj[key]===undefined) {

      obj[key] = {
        header: key,
        content: [elem.content]
      }

    } else {

      obj[key].content.push(elem.content)
    }

    return obj
  }

  return Object.entries(arrayOfObjects.reduce(gatherer,{})).map(arr => arr[1])
}




const getTableStructure = (table) => {

  // Remove empty
  table = table.filter(row => row.replace('\r','').length>0) // Contains new lines

  // Finds the index of the row that separates header row from table body
  const indexOfTableSeparator = table.findIndex(row => /^[_ \r]*$/.test(row))

  // get columns
  const columns = table[(indexOfTableSeparator-1)].split(/[ ]{1,}/).filter(col => col.length>1)

  // table body
  let body = table.slice((indexOfTableSeparator+1),)

  return ({
    columns: columns,
    body: body
  })

}


const getTableValues = ({ body, columns }) => {

  const rowsSplitted = body.filter(row => /[0-9]/.test(row)).map(row => row.split(/[ ]{1,}/).filter(cell => cell.length>0))

  const assignColumnNamesToValues = (values) => {

    const rowKey = values[0]

    return values.slice(1,).map((val,idx) => {
      return {
        rowKey: rowKey,
        colKey: columns[idx],
        keys: [rowKey,columns[idx]],
        value: val
      }

    })
  }

  return rowsSplitted.map(assignColumnNamesToValues).flat()

}


export default extractResidualOutput