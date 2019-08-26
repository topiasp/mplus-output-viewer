import React, { useState } from 'react'


import { FaAngleRight,FaAngleDown } from 'react-icons/fa'



const CheckboxList = ({ options, handleListChange }) => {

  const [showlist, setShowlist] = useState(false)

  // Shorthand for checking if option is selected
  const isOptionSelected = (option) => options.selectedOptions.indexOf(option)>-1

  // On check change
  const handleCheckBoxChange = (e) => {
    const clickedOption = e.target.value
    const isSelected = isOptionSelected(clickedOption)
    const updatedOptions = isSelected ? options.selectedOptions.filter(opt => opt !== clickedOption) :  options.selectedOptions.concat(clickedOption) 

    handleListChange({
      label: options.label,
      selectedOptions: updatedOptions
    })

  }


  // Toggle list
  const toggleListDisplay = () =>  setShowlist(!showlist)


  const listStyle = {
    display: showlist ? 'block' : 'none',
    position: 'fixed',
    backgroundColor: 'white',
    padding: 10,
    border: '1px solid black'

  }

  const buttonStyle = {
    border: '0.5px solid #0069d9',
    borderRadius: '5px',
    backgroundColor: 'white',
    padding: '5px',
    margin: '2px'
  }

  const angle = showlist ? <FaAngleDown/> : <FaAngleRight/>

  return(
    <div>
      <button style={buttonStyle} onClick={toggleListDisplay}>{ options.label}{angle}</button>
      <div style={listStyle}  >
        {
          options.values.map((val, idx) => {
            const checked = isOptionSelected(val)
            return(
              <div key={idx + val}><input type='checkbox' checked={checked} onChange={handleCheckBoxChange}  value={val} />{ val}</div>
            )
          })
        }
      </div>
    </div>
  )


}

export default CheckboxList