const extractTitle = (chapters) => {
  const title = chapters[0].content.filter((c) => c.toLowerCase().indexOf('title:')>-1)
  return title === undefined ? undefined : title[0]
}

export default extractTitle