function doTimes(number, callback){
  let arr = [];
  for(var i = 0; i < number; i++){
    arr.push(callback(i));
  }
  return arr;
}

export default doTimes;