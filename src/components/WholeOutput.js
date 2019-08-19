import React,{ useState } from 'react'

import { Grid, Checkbox, Sticky, Header, Button } from 'semantic-ui-react'




const WholeOutput = ({ mplusOutput, show }) => {

  const [ selectedChapters, setSelectedChapters ] = useState([])


  if (mplusOutput === null || !show ) {
    return('')
  }

  const getChapterHeaders = () => {
    return mplusOutput === null ? [] : mplusOutput.parsed.chapters.map(chap =>   chap.header.result  )
  }

  const chapterHeaders = getChapterHeaders()

  const chapters = mplusOutput.parsed.chapters

  const toggleChapterSelection = (header) => {

    if (  isHeaderSelected(header)  ) {
      // Included in selected chapters -> remove it
      return selectedChapters.filter(chapter => chapter !== header)
    }
    // Not included in selected chapters -> add it
    return selectedChapters.concat(header)

  }

  // Shorthand for checking if header is selected
  const isHeaderSelected = (header) => selectedChapters.indexOf(header)>-1

  // Function handle checkbox changes

  const handleCheckBoxChange = (e) => {

    const clickedChapter = e.target.innerText
    setSelectedChapters(toggleChapterSelection(clickedChapter))
  }

  // A container for each chapter
  const chapterContentContainer = (chapter,idx) => {

    const style = {
      whiteSpace: 'pre-wrap',
      fontFamily: 'Consolas',
      display: isHeaderSelected( chapter.header ) ? '' : 'none'
    }
    return(
      <div>
        <div></div>
        <Header style={ style }>{ chapter.header }</Header>
        <div key={ 'chapter_'+idx } style={ style }  dangerouslySetInnerHTML={{ __html: chapter.content }} />
      </div>
    )
  }


  // (De-)select all
  const toggleSelectAll = () => {

    if ( selectedChapters.length !== chapterHeaders.length) {

      setSelectedChapters(chapterHeaders)

    } else {

      setSelectedChapters([])
    }
  }

  return(

    <Grid columns={2} doubling>     
      <Grid.Column width={4}>
        <Grid.Row>
          <Button primary onClick={ toggleSelectAll }>{  selectedChapters.length !== chapterHeaders.length ? 'SELECT ALL' : 'DESELECT ALL' }</Button>
        </Grid.Row>
        <Grid.Row>
          <Sticky>
            {
              chapterHeaders.map(header =>  {
                const checked = isHeaderSelected(header)
                return(
                  <Grid.Row key={ 'checkbox_'+header}><Checkbox label={ header } checked = {checked} onChange={handleCheckBoxChange} /></Grid.Row>
                )
              })
            }
          </Sticky>
        </Grid.Row>
      </Grid.Column>
      <Grid.Column width={12}>
        {
          chapters.map((chap,idx) => chapterContentContainer( { content: chap.content.join('\n'), header: chap.header.result },idx) )
        }
      </Grid.Column>

    </Grid>


  )

}


export default WholeOutput