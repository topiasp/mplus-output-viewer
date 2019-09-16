import React, { useReducer, useEffect } from 'react'


import { FaAngleRight,FaAngleDown } from 'react-icons/fa'



function reducer(state, action) {
  switch (action.type) {
  case 'show':
    return { display: 'block', show: true }
  case 'hide':
    return { display: 'none', show: false }
  default:
    throw new Error()
  }
}

const initialShowState = () =>  { return({ display: 'block', show: true } )}


const CheckboxList = ({ options, handleListChange }) => {

  const [showlist, dispatch] = useReducer(reducer,initialShowState)


  useEffect(() => {
    dispatch({ type: 'hide' })
  },[])

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

  const areAllSelected = () => options.selectedOptions === options.values
  // Select all
  const toggleSelectAll = () => {

    handleListChange({
      label: options.label,
      selectedOptions: areAllSelected() ? [] : options.values
    })

  }


  // Toggle list

  const toggleListDisplay = () => {
    if (showlist.show) {
      dispatch({ type: 'hide' })
    } else {
      dispatch({ type: 'show' })
    }
  }


  const listStyle = {

    position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
    border: '1px solid black',
    boxShadow: '1px 1px'
  }

  const buttonStyle = {

    border: 'none',
    borderRadius: '5px',
    backgroundColor: 'white',
    padding: '3px',
    margin: '2px'
  }

  const angle = showlist ? <FaAngleDown/> : <FaAngleRight/>

  const selectAllButtonStyle = {
    border: '1px solid black',
    backgroundColor: 'white',
    marginBottom: '10px'
  }


  return(
    <div className={'buttonContainer'}>
      <button style={buttonStyle} onClick={toggleListDisplay}>{ options.label}{angle}</button>
      <div style={listStyle} className={'hidden'}  >
        <button style={selectAllButtonStyle} onClick={ toggleSelectAll }>(De-)select all</button>
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