


// Gets hits of given regex (location)
const extractOccurancesOfRegex = (params) => {

  const regex = params.regex
  let idx = 0

  const occurances = []
  let res = ''
  while ((res = regex.exec(params.string)) !== null) {
    occurances.push({ result: res[0], id: 'C'+idx, contentStart: res.index + res[0].length, start: res.index  })
    idx++
  }

  return { occurances: occurances,
    string: params.string
  }
}


export default extractOccurancesOfRegex