import React,{ useState } from 'react'

import {  Col, Row } from 'react-bootstrap'
import uuidv4 from 'uuid'

const WholeOutput = ({ mplusOutput, show }) => {

  const [ selectedChapters, setSelectedChapters ] = useState(['THE MODEL ESTIMATION TERMINATED NORMALLY'])

  const getChapterHeaders = () => {
    return mplusOutput === null ? [] : mplusOutput.parsed.chapters.map(chap =>   chap.header.result  )
  }


  if (mplusOutput === null || !show ) {
    return('')
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
    //e.preventDefault()

    const clickedChapter = e.target.value
    setSelectedChapters(toggleChapterSelection(clickedChapter))
  }

  // A container for each chapter
  const chapterContentContainer = (chapter,idx) => {

    const style = {
      whiteSpace: 'pre-wrap',
      fontFamily: 'Consolas',
      fontSize: '70%',
      display: isHeaderSelected( chapter.header ) ? '' : 'none'
    }
    const content = '<h6>'+chapter.header +'</h6>\n' + '<div>' + chapter.content + '</div>'
    return(
      <div key={uuidv4()}>
        <div style={ style }  dangerouslySetInnerHTML={{ __html: content }} />
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

  const menuStyle = {
    position: 'fixed',
    marginLeft: '5%',
    marginTop: '2%'
  }

  return(
    <div style={ { width: '100%' } }>
      <Row>
        <Col xs={4}>
          <div style = {menuStyle} >
            <div style={{ fontSize: '65%' }}>
              <input type='checkbox'  onClick={ toggleSelectAll }/>
              {  selectedChapters.length !== chapterHeaders.length ? 'SELECT ALL' : 'DESELECT ALL' }
            </div>
            {
              chapterHeaders.map(header =>  {
                const checked = isHeaderSelected(header)
                const style = { fontSize: '65%' }
                return(
                  <div key={uuidv4()} style={style}>
                    <input type='checkbox' checked = { checked } onChange={handleCheckBoxChange} value = { header }/>
                    { header }
                  </div>
                )
              })
            }
          </div>

        </Col>
        <Col xs={8}>
          {
            chapters.map((chap,idx) => chapterContentContainer( { content: chap.content.join('\n'), header: chap.header.result },idx) )
          }
        </Col>
      </Row>
    </div>
  )

}


export default WholeOutput