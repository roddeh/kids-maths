
function loadJSONData(key){
  let data = localStorage.getItem(key)
  if(data){
    try{
      return JSON.parse(data)
    }
    catch(e){
      console.error('Unable to parse storage data')
    }
  }
  return null
}

function storeJSONData(key, data){
  localStorage.setItem(key, JSON.stringify(data));
}


const service = {

  loadConfig(configID){
    return new Promise((resolve, reject) => {
      let data = loadJSONData(configID)
      if(data){
        resolve(data)
      }
      else{
        reject('Unable to load data')
      }
      // resolve({
      //   config: {
      //     questions:[
      //       {name:"verticalAddition", enabled:true, "numDigits":4, carryOver:false},
      //       {name:"additionWithIcons", enabled:true, "minNumber":3, "maxNumber":12, includeTraceNumbers:true},
      //       {name:"arithmeticPyramid", enabled:true, "minNumber":6, "maxNumber":12},
      //       {name:"angleTypes", enabled:true},
      //     ]
      //   }
      // })
    })
  },

  saveConfig(configID, data){
    storeJSONData(configID, data)
  }
}

module.exports = service