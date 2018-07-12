function random(max, min){
  min = min || 0;
  return Math.round(Math.random() * (max - min)) + min;
}

function rand(maxOrArray, min){
  if(maxOrArray && maxOrArray.__proto__ === Array.prototype){
    return maxOrArray[random(maxOrArray.length - 1)]
  }
  else{
    return random(maxOrArray, min)
  }
}

module.exports = rand;