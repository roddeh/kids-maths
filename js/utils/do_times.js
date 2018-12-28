function doTimes(number, callback, scope = null){
  let arr = [];
  for(var i = 0; i < number; i++){
    arr.push(callback.apply(scope, [i]));
  }
  return arr;
}

export default doTimes;