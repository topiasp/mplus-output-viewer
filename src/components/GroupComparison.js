import React, { useState, useEffect } from 'react'
import { Grid, Container, Checkbox, Header } from 'semantic-ui-react'

const GroupComparison = ({ chaptersbygroup, show }) => {

  const [ chosenChapter, setChosenChapter ] = useState(null)

  useEffect(() => {
    const initialChapter = chaptersbygroup !== null ? chaptersbygroup[0] : null
    console.log('initialChapter', initialChapter)
    setChosenChapter(initialChapter)
  },[chaptersbygroup])

  if (chaptersbygroup === null || !show ) {
    return('')
  }

  const chaptersToChooseFrom = chaptersbygroup.map(chap => chap.nameOfChapter)


  const handleCheckBoxChange = (e) => {
    console.log('checking')
    setChosenChapter(chaptersbygroup[ chaptersToChooseFrom.indexOf(e.target.innerText) ])
  }


  const displayAsPlainText = (string) => {
    const style = {
      whiteSpace: 'pre-wrap',
      fontFamily: 'Consolas',
      fontSize: '65%'
    }
    return(
      <div>
        <div  style={ style }  dangerouslySetInnerHTML={{ __html: string }} />
      </div>
    )
  }

  const chosenChapterAsContent = (chosenChapter) => {

    if (chosenChapter !== null) {
      return chosenChapter.content.map(chap =>  <Grid.Column>{ displayAsPlainText( [chap.header.result].concat(chap.content).join('\n')   ) }</Grid.Column>)
    } else {
      return ''
    }
  }

  const helper = () => {
    return chosenChapter !== null ? chosenChapter.nameOfChapter : null
  }

  const extraStyle = {
    marginLeft: '2%'
  }

  return(
    <Container>
      {
        chaptersToChooseFrom.map(chapter => {
          return(<Checkbox radio
            name='checkboxRadioGroup'
            style={ extraStyle }
            label={ chapter }
            checked= { helper() === chapter }
            onChange={handleCheckBoxChange} />)
        })
      }

      <Grid columns={2} celled>
        {
          chosenChapterAsContent(chosenChapter)
        }
      </Grid>
    </Container>

  )


}


export default GroupComparison