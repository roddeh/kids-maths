// Creates &nbsp; but in a react compatible manner.
import doTimes from './do_times'

function pad(times){
  return doTimes(times, (i) => {
    return '\xA0'
  }).join('')
}

module.exports = pad