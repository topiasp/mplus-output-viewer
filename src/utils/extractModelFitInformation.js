

import { extractChapters } from './extractChapters'
import { trimString } from './utils'



// this handles (extracst numbers and titles) single chapter in model fit information
const handleModelFitChapter = (chap) => {


  const header = chap.header.result

  const handleRow = (row) => {
    // extract number and name of statistic
    // by splitting with two or more spaces
    const splitted = trimString(row).split(/[ ]{2,}/)
    const statistic =  trimString(splitted[0])

    return({
      header: header,
      statistic:  statistic,
      value: splitted.length === 1 ? -1 : splitted.slice(1,).map(s => trimString(s)).join(', ')//splittetrimString(splitted[1])
    })

  }

  return  chap.content.map(handleRow)

}


// modelInformationChapter = temp1.parsed.chapters.find(chap => chap.header.result==='MODEL FIT INFORMATION')

const extractModelFitInformation = (modelInformationChapter) => {



  // The model fit information is structured as follows:
  // HEADER ROW
  //      NAME_OF_STATISTIC       VALUE_OF_STATISTIC
  // with exception of the first statistic 'Number of free parameters'


  // First get chapters of model fit information based on header rows
  const params = {
    string: modelInformationChapter.content.join('\n'),
    regex: /^[A-Z*].+$/gm
  }
  let chaptersOfModelInformation = extractChapters(params)

  // MANIPULATIONS

  // 1. Remove useless chapter starting with *
  chaptersOfModelInformation = chaptersOfModelInformation.filter(chap => chap.header.result.substring(0,1)!=='*')

  // 2. Handle exception of first statistic and clean empty objects from content array
  chaptersOfModelInformation = chaptersOfModelInformation.map(chap =>  {
    chap.content = chap.content.filter(c => c.length>1)

    if (chap.content.length === 0) {

      chap.content = [ chap.header.result ] // if empty, replace w/ header
      chap.header.result =  trimString( chap.header.result.replace(/[0-9]{1,}/,'') )//  removing any numbers from header (for exception Number of free parameters') // 
    }
    return chap
  })

  // Get statistics
  const statistics = chaptersOfModelInformation.map( handleModelFitChapter )

  return statistics.flat()

}

export default extractModelFitInformation
