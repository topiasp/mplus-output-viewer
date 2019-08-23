import React from 'react'
import { Grid, Menu } from 'semantic-ui-react'

const Navbar = ({ mplusOutput, handlePageChange }) => {
  if (mplusOutput === null) {
    return('')
  }

  const LinkToGroupComparison =  mplusOutput.parsed.NumberOfGroups > 1 ? <Menu.Item onClick={ () =>  handlePageChange('groupcomparison') }>Group comparison</Menu.Item> : ''

  const extraStyle = {
    marginBottom: '2%'
  }

  return(
    <Grid columns={1} doubling style={ extraStyle }>
      <Grid.Column>
        <Menu inverted>
          <Menu.Item  onClick={ () =>  handlePageChange('wholeoutput') }>Whole output</Menu.Item>
          <Menu.Item  onClick={ () =>  handlePageChange('modelinformation') }>Model information</Menu.Item>
          <Menu.Item  onClick={ () =>  handlePageChange('modelresults') }>Model results</Menu.Item>
          <Menu.Item  onClick={ () =>  handlePageChange('stdmodelresults') }>Standardized model results</Menu.Item>
         
        </Menu>
      </Grid.Column>
    </Grid>
  )

}
export default Navbar