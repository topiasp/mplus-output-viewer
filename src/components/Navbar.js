import React from 'react'
import { Grid, Menu } from 'semantic-ui-react'

const Navbar = ({ mplusOutput, handlePageChange }) => {
  if (mplusOutput === null) {
    return('')
  }


  const LinkToGroupComparison =  mplusOutput.parsed.NumberOfGroups > 1 ? <Menu.Item onClick={ () =>  handlePageChange('groupcomparison') }>Group comparison</Menu.Item> : ''


  return(
    <Grid columns={1} doubling>
      <Grid.Column>
        <Menu>
          <Menu.Item  onClick={ () =>  handlePageChange('wholeoutput') }>Whole output</Menu.Item>
          <Menu.Item  onClick={ () =>  handlePageChange('modelresults') }>Model results</Menu.Item>
          <Menu.Item  onClick={ () =>  handlePageChange('stdmodelresults') }>Standardized model results</Menu.Item>
          { LinkToGroupComparison }
        </Menu>
      </Grid.Column>
    </Grid>
  )

}
export default Navbar