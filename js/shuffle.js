'use strict';

const rand = require('roddeh-rand');

const shuffle = function(arr){
  arr = arr.slice();
  let shuffled = [];
  while(arr.length){
    shuffled.push(arr.splice(rand(0, arr.length - 1), 1)[0]);
  }
  return shuffled;
}

export default shuffle;