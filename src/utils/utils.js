const getUniqueFromArray = (arr) => {

  let f = (obj,elem) => {
    obj[elem] = 1
    return obj
  }
  const obj =   arr.reduce(f,{})

  return Object.getOwnPropertyNames(obj)
}


export { getUniqueFromArray }