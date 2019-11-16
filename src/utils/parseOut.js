
import { extractChapters } from './extractChapters'
import extractTitle    from './extractTitle'
import extractNumberOfGroups from './extractNumberOfGroups'
import { Alert } from 'react-bootstrap'


const parseOut = (mplusoutputstring) => {

  const parsed = {}

  // Extract main chapters
  const RegExpChapter = /(^[A-Z][A-Z 0-9-]+[A-Z]$)/gm
  try {
    parsed.chapters =  extractChapters({ string: mplusoutputstring, regex: RegExpChapter, filteringRegex: / (BY|WITH|ON)$/m  })
    parsed.title    =  extractTitle(parsed.chapters)
    parsed.NumberOfGroups = extractNumberOfGroups(mplusoutputstring)
  } catch(e) {
    Alert('Error with extracting chapters: ', e)
  }

  return parsed
}

export default parseOut