
import { extractChapters } from './extractChapters'


const getChapterGroupPartitions = (params, chapters) => {

  const { nameOfChapter, splitter } = params
  const chapter = getChapter({ nameOfChapter: nameOfChapter, chapters: chapters })

  return( extractChapters({ string: chapter.content.join('\n'), regex: splitter  }) )
}


const getChapter = (params) => {
  const { nameOfChapter, chapters  } = params
  return( chapters.filter((chapt) => chapt.header.result === nameOfChapter)[0] )
}


const extractOutputPerGroup = (chapters) => {

  let regex = /UNIVARIATE HIGHER-ORDER MOMENT DESCRIPTIVE STATISTICS FOR [A-Z0-9_]+$/gm
  const UNIVARIATE = { nameOfChapter: 'UNIVARIATE SAMPLE STATISTICS', splitter: regex  }
  UNIVARIATE.content = getChapterGroupPartitions(UNIVARIATE, chapters)

  const MODELRESULTS = { nameOfChapter: 'MODEL RESULTS', splitter: /Group [A-Z_]+$/gm  }
  MODELRESULTS.content = getChapterGroupPartitions(MODELRESULTS, chapters)

  const RESIDUALOUTPUT = { nameOfChapter: 'RESIDUAL OUTPUT', splitter: /ESTIMATED MODEL AND RESIDUALS \(OBSERVED - ESTIMATED\) FOR [A-Z0-9_]+$/gm  }
  RESIDUALOUTPUT.content = getChapterGroupPartitions(RESIDUALOUTPUT, chapters)

  return([
    UNIVARIATE,
    MODELRESULTS,
    RESIDUALOUTPUT
  ])

}

export default extractOutputPerGroup