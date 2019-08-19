

import extractOccurancesOfRegex from './extractOccurancesOfRegex'




// Adds the end of string to hits gotten by extractOccurencesOfRegec
const addEnds = (obj) => {


  let arr = obj.occurances
  arr[arr.length-1].end = obj.string.length

  for (let i = (arr.length-2); i >= 0;i--) {
    arr[i].end = arr[(i+1)].start-1
  }
  obj.occurances = arr

  return obj
}

// Gets strings between headers (extracted through extractOccurencesOfRegec)
const extractChapterContent = (headersObj) => {

  let headers =  headersObj.occurances
  const string = headersObj.string

  const arr = []
  for (let headerIdx in headers) {
    let header = headers[headerIdx]
    arr.push({
      header: header,
      id: header.id,
      content: string.substring(header.contentStart,header.end).split('\n')
    })
  }

  headersObj.occurances = arr
  return(headersObj)
}

// Brings them all together

const extractChapters = (params) => {



  let headers = extractOccurancesOfRegex({ string: params.string, start: 0, chapters: [], regex: params.regex })

  if (params.filteringRegex) {
    headers.occurances = headers.occurances.filter((h) => !params.filteringRegex.test(h.result))
  }

  headers = addEnds(headers)

  let chapters = extractChapterContent(headers)
  return chapters.occurances

}

export { extractChapters, extractChapterContent, addEnds }