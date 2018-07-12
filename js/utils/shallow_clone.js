module.exports = (subject) => {
  let target = {}
  for(let key in subject){
    target[key] = subject[key]
  }
  return target
}