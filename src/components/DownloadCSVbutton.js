import React from 'react'
import { Button } from 'react-bootstrap'



const convertArrayOfCellsToCSV = (args) => {

  let headers,data,delimiter

  headers = args.headers
  data    = args.data
  delimiter = args.delimiter || ';'

  let result = ''

  result += headers.join(delimiter) + '\n'

  let tmp = data.map((cell) => {
    if (!Array.isArray(cell)) {
      return cell.join(delimiter)
    }
    return cell.join(delimiter)
  }).map(str => str.replace(/(\r\n|\n|\r)/gm,'')) // replace possible existing linechanges


  result += tmp.join('\n')
  return result
}

const downloadCSV = (args) => {


  let data, filename, link
  let csv = convertArrayOfCellsToCSV(args)
  if (csv === null) return


  filename = args.filename || 'export.csv'

  if (!csv.match(/^data:text\/csv/i)) {
    csv = 'data:text/csv;charset=utf-8,' + csv
  }
  data = encodeURI(csv)

  link = document.createElement('a')
  link.setAttribute('href', data)
  link.setAttribute('download', filename)
  link.click()
}






const DownloadCSVbutton = ({ params, float }) => {

  if (params === null) {
    return('')
  }

  const data = params.data
  const headers = params.headers

  const handleClick = () => {

    console.log('downloading ', data)
    downloadCSV({ data: data, headers: headers })


  }


  const style = {
    margin: '0.5%',
    float: 'right',
    fontSize: '75%',
    padding: 3
  }

  return(
    <Button
      style = { style }
      primary={'true'}
      onClick={ handleClick }
    >
      Download as CSV
    </Button>
  )


}

export default DownloadCSVbutton