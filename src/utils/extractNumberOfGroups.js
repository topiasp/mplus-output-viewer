const extractNumberOfGroups = (string) => {
  const RegExpNumberOfGroups = /(Number of groups[ ]+[0-9]{1,2})/
  const StringContainingNumberOfGroups =  string.match(RegExpNumberOfGroups)
  return StringContainingNumberOfGroups ===  null ? undefined : StringContainingNumberOfGroups[0].replace(/[^0-9]/g,'') * 1
}

export default extractNumberOfGroups