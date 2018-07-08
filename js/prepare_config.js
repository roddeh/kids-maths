function prepareConfig(cfg, defaultConfig){

  let config = {};

  for(let a in defaultConfig){
    if(cfg.hasOwnProperty(a)){
      config[a] = cfg[a];
    }
    else{
      config[a] = defaultConfig[a];
    }
  }
  return config;
}

export default prepareConfig;