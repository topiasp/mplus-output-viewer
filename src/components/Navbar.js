import React from 'react'
import { Grid, Menu, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Navbar = ({ mplusOutput }) => {
  if (mplusOutput === null) {
    return('')
  }


  const LinkToGroupComparison =  mplusOutput.parsed.NumberOfGroups !== undefined ? <Link to='groupcomparison' style={{ textDecoration: 'none' }}><Menu.Item>Group comparison</Menu.Item></Link> : null

  return(
    <Grid columns={1} doubling>
      <Grid.Column>
        <Menu>
          <Link to='wholeoutput' style={{ textDecoration: 'none' }}><Menu.Item>Whole output</Menu.Item></Link>
          <Link to='modelresults' style={{ textDecoration: 'none' }}><Menu.Item>Model results</Menu.Item></Link>
          <Link to='standardizedmodelresults' style={{ textDecoration: 'none' }}><Menu.Item>Standardized model results</Menu.Item></Link>
          { LinkToGroupComparison }
        </Menu>
      </Grid.Column>
    </Grid>
  )
}
export default Navbar