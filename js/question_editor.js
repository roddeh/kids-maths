import React from 'react'
import shallowClone from './shallow_clone'


class QuestionEditor extends React.Component {

  constructor(props){
    super(props)
    this.state = shallowClone(props.config)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
  }

  handleChange(name, value){
    let newState = {}
    newState[name] = value
    this.setState(newState, () => { 
      if(this.props.onChange){
        this.props.onChange(this.state)
      }
    })
  }

  handleCheckboxChange(event){
    let value = event.currentTarget.value === 'on'
    this.handleChange(event.currentTarget.name, value)
  }

  handleRangeChange(event){
    let value = parseInt(event.currentTarget.value)
    this.handleChange(event.currentTarget.name, value)
  }

  // render(){
  //   return (
  //     <div className='editor-form'>
  //       <label>Number of digits:</label>
  //       <input type='range' name='numDigits' min='1' max='5' step='1' value={ this.state.numDigits } onChange={ this.handleRangeChange }></input>
        
  //     </div>
  //   )
  // }
}

module.exports = QuestionEditor