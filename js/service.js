
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

  createConfig(configID){
    return new Promise((resolve, reject) => {
      let newConfig = {config:{id:configID, questions:[]}}
      storeJSONData(configID, newConfig)
      resolve(newConfig)
    })
  },

  loadConfig(configID){
    return new Promise((resolve, reject) => {
      let data = loadJSONData(configID)
      if(data){
        resolve(data)
      }
      else{
        reject('Unable to load data')
      }
    })
  },

  saveConfig(configID, data){
    storeJSONData(configID, data)
  },

  deleteConfig(configID){
    return new Promise((resolve, reject) => {
      localStorage.removeItem(configID)
      resolve()
    })
  },

  listConfigs(){
    return new Promise((resolve, reject) => {
      let keys = []
      for(let i = 0; i < localStorage.length; i++){
        keys.push(localStorage.key(i))
      }
      resolve({
        configs:keys
      })
    })
  }
}

module.exports = service