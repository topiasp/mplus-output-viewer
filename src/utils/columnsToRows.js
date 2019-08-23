



const cellsToGroupComparison = (obj,elem) => {

  let key = elem.keys.slice(1,3).join('') // Defines the 'key' to distinguish variables

  if (obj[key]===undefined) {

    obj[key] = {
      keys: elem.keys.slice(1,3),
      values: [
        {
          group: elem.keys[0],
          values: elem.values
        }
      ]
    }

  } else {

    obj[key].values.push({
      group: elem.keys[0],
      values: elem.values

    })
  }

  return obj
}




const columnsToRows = ({ cells, variables }) => {

  let cellsForGroupComparison =  Object.values( cells.reduce(cellsToGroupComparison,{}) )

  const extractVariableValuesPerGroup = (cellForGroupComparison,variable,variableIndex) => {
    return cellForGroupComparison.values.map((groupvalues) =>  { return({ keys: cellForGroupComparison.keys.concat(variable),group: groupvalues.group,  value: groupvalues.values[variableIndex] }) } )
  }

  cellsForGroupComparison = variables.map((variable,idx) => {
    return cellsForGroupComparison.map((cell) => extractVariableValuesPerGroup(cell,variable,idx))
  }).flat()

  return cellsForGroupComparison//.flat()
}


export default columnsToRows
