import React from 'react'
import {  Button } from 'react-bootstrap'

import uuidv4 from 'uuid'

const Menu = ({ mplusOutput, handlePageChange, page }) => {
  if (mplusOutput === null) {
    return('')
  }

  const menuoptions = [
    { page: 'wholeoutput',       label: 'Whole output' },
    { page: 'modelfitinformation',  label: 'Model information' },
    { page: 'modelresults',      label: 'Model results' },
    { page: 'stdmodelresults',   label: 'Standardized model results' }
  ]

  const buttonStyle = {
    margin: '0.5%',
    fontSize: '80%'
  }

  const buttonStyleWithBorder = {
    margin: '0.5%',
    fontSize: '80%',
    border: '3px solid white'
  }

  const menuBarStyle = {
    backgroundColor: 'black',
    position: 'fixed',
    width: '100%',
    zIndex: 999,
    top: 0
  }


  return(
    <div style={menuBarStyle}>
      {
        menuoptions.map(opt => <Button style={ opt.page === page ? buttonStyleWithBorder : buttonStyle } key={uuidv4()} onClick={ () =>  handlePageChange(opt.page)  }>{ opt.label }</Button>)
      }
    </div>

  )
}
export default Menu