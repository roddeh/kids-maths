const doTimes = require('./do_times');

function zerosToSpace(str, char){
  let ind = 0;
  while(ind <= str.length){
    if(str.charAt(ind) === char){
      ind++;  
    }
    else{
      break;
    }
  }
  str = str.substring(ind);

  if(str.length === 0){
    str = '0';
    ind--;
  }

  doTimes(ind, () => {
    str = '&nbsp;' + str;
  })
  return str;
}

export default zerosToSpace;