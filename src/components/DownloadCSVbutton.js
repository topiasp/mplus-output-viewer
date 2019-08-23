import React from 'react'
import { Button, Icon } from 'semantic-ui-react'




const convertArrayOfCellsToCSV = (args) => {

  let headers,data,delimiter

  headers = args.headers
  data    = args.data
  delimiter = args.delimiter || ';'

  let result = ''

  result += headers.join(delimiter) + '\n'


  result += data.map((cell) => {
    if (!Array.isArray(cell)) {
      return cell.join(delimiter)
    }
    return cell.join(delimiter)
  }).join('\n')

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
    downloadCSV({ data: data, headers: headers })


  }


  const style = {
    margin: '0.5%',
    float: float
  }
  return(
    <Button style = { style } primary onClick={ handleClick } >
      <Icon size='small' name='download' />
        CSV
    </Button>
  )


}

export default DownloadCSVbutton