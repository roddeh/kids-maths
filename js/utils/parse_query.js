function parseQuery(){
  let loc = location.search.substr(1)
  let query = {}
  let pieces = loc.split('&')
  pieces.forEach((piece) => {
    piece = piece.split('=')
    query[piece[0]] = piece[1]
  })
  return query
}

module.exports = parseQuery