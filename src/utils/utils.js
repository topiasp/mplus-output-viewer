const getUniqueFromArray = (arr) => {

  let f = (obj,elem) => {
    obj[elem] = 1
    return obj
  }
  const obj =   arr.reduce(f,{})

  return Object.getOwnPropertyNames(obj)
}


const trimString = (s) => {
  return s.replace(/^[ ]{1,}/,'').replace(/[ ]{1,}$/,'')
}


const rowToColumn = (obs) => {

  const pivoted = obs.reduce(pivot,{})
  return Object.entries(pivoted).map(e => e[1])


}


const pivot = (obj,elem) => {

  let key = elem.rows.join('_') // Defines the 'key' to distinguish variables

  if (obj[key]===undefined) {

    obj[key] = {
      rows: elem.rows,
      values: [
        {
          column: elem.column,
          values: elem.value
        }
      ]
    }

  } else {

    obj[key].values.push({
      column: elem.column,
      values: elem.value

    })
  }

  return obj
}


const joinTwoArrays = (a,b) => {

  if ( a.length !== b.length  ) {
    console.log('warning: array lengths differ in joinToArrays. Combining only lenght of shorter array.')
  }
  const shorterArray = a.length <= b.length ? [...a] : [...b]

  return shorterArray.map((a,idx) => [a,b[idx]])
}


export { getUniqueFromArray, trimString, rowToColumn, joinTwoArrays }