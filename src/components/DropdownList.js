import React from 'react'

import Dropdown from 'react-bootstrap/Dropdown'

const DropdownList = ({ options })  => {

  return(
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        { options.label }
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {
          options.values.map((val, idx) => <Dropdown.Item key={'opt'+val+idx} eventKey={idx} href="#/action-1">{ val }</Dropdown.Item>)
        }

      </Dropdown.Menu>
    </Dropdown>)
}

export default DropdownList