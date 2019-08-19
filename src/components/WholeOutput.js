import React,{ useState, useEffect } from 'react'

import { Grid, Checkbox, Sticky, Header, Button } from 'semantic-ui-react'




const WholeOutput = ({ mplusOutput }) => {

  const [ selectedChapters, setSelectedChapters ] = useState([])


  const getChapterHeaders = () => {
    return mplusOutput === null ? [] : mplusOutput.parsed.chapters.map(chap =>   chap.header.result  )
  }

  const chapterHeaders = getChapterHeaders()
  /*
  useEffect(() => {
    setSelectedChapters(getChapterHeaders())
  }, [mplusOutput])
  */
  if (mplusOutput === null) {
    return('')
  }

  const chapters = mplusOutput.parsed.chapters

  const toggleChapterSelection = (header) => {

    if (  isHeaderSelected(header)  ) {
      // Included in selected chapters -> remove it
      return selectedChapters.filter(chapter => chapter !== header)
    }
    // Not included in selected chapters -> add it
    return selectedChapters.concat(header)

  }

  const isHeaderSelected = (header) => selectedChapters.indexOf(header)>-1

  // Function handle checkbox changes

  const handleCheckBoxChange = (e) => {

    const clickedChapter = e.target.innerText
    setSelectedChapters(toggleChapterSelection(clickedChapter))
  }


  const checkBox = (header) =>  {

    const checked = isHeaderSelected(header)

    return(
      <Grid.Row key={ 'checkbox_'+header}><Checkbox label={ header } checked = {checked} onChange={handleCheckBoxChange} /></Grid.Row>
    )
  }

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
          <Button onClick={ toggleSelectAll }>{  selectedChapters.length !== chapterHeaders.length ? 'SELECT ALL' : 'DESELECT ALL' }</Button>
        </Grid.Row>
        <Grid.Row>
          <Sticky>
            {
              chapterHeaders.map(checkBox)
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