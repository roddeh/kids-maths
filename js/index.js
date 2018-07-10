import React from 'react';
import PropTypes from "prop-types";
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Generator from './generator';
import Editor from './editor';

class App extends React.Component {

  render(){
    return (
      <Router>
        <div className='app'>
          <Route path='/generator' component={ Generator }/>
          <Route path='/editor' component={ Editor }/>
        </div>
      </Router>
    )
  }
}

function initialise(){
  render((
    <App/>
  ), document.getElementById('root'));
}

window.onload = initialise;

// function preparePage(test, pageConfig){

//   let result = layout(pageConfig);

//   let div = document.createElement('div');
//   div.className = 'maths-page';
//   document.body.appendChild(div);

//   div.innerHTML = result.html;
//   // document.body.innerHTML = result.html;
//   result.questions.forEach((q) => {
//     if(q.finalise){
//       q.finalise();
//     }
//   });

//   if(pages > 1){
//     pages--
//     preparePage(test, pageConfig);
//   }
//   // if(test){
//   //   return;
//   // }

//   // return domtoimage.toPng(document.body)
//   //   .then (function (dataUrl) {
//   //       var img = new Image();
//   //       img.src = dataUrl;
//   //       document.body.innerHTML = '';
//   //       return img;
//   //   })
//   //   .catch(function (error) {
//   //       console.error('oops, something went wrong!', error);
//   //   });
// }

// function makePage(pageConfig){
//   preparePage(false, pageConfig);
//   return;

//   preparePage(false, pageConfig).then(function (img){
//     images.push(img);
//     if(images.length > pages - 1){
//       images.forEach(function (i){
//         document.body.appendChild(i);
//       })
//     }
//     else {
//       makePage(pageConfig);
//     }
//   });  
// }

// function parseQuery(){
//   let loc = location.search.substr(1)
//   let query = {}
//   let pieces = loc.split('&');
//   pieces.forEach((piece) => {
//     piece = piece.split('=');
//     query[piece[0]] = piece[1];
//   })
//   return query;
// }

// function loadConfig(name){
//   return fetch(`${ name }.json?rand=${ Math.random() }`)
//     .then((response) =>{
//       return response.json();
//     })
// }

// function preparePageConfig(config){
//   let pageConfig = [];
//   for(let key in config.questions){
//     pageConfig.push(
//       questions[key].prepare(config.questions[key])
//     )
//   }
//   return pageConfig
// }

// function go(){
//   let query = parseQuery();
//   loadConfig(query.config)
//     .then(preparePageConfig)
//     .then((pageConfig) => {
      
//       if(query.test === 'true'){
//         preparePage(true, pageConfig);  
//       }
//       else{
//         pages = query.pages || 5;
//         makePage(pageConfig);
//       }
      
//     })
// }

// window.onload = go;