import React from 'react';
import PropTypes from "prop-types";
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Generator from './generator';

class App extends React.Component {

  render(){
    return (
      <Router>
        <div className='app'>
          <Route path='/generator' component={ Generator }/>
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