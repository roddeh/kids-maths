import React from 'react'
import shallowClone from './utils/shallow_clone'


class QuestionEditor extends React.Component {

  constructor(props){
    super(props)
    this.state = shallowClone(props)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleRangeChange = this.handleRangeChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
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
    this.handleChange(event.currentTarget.name, event.currentTarget.checked)
  }

  handleRangeChange(event){
    this.handleChange(event.currentTarget.name, parseInt(event.currentTarget.value))
  }

  handleCheckboxSetChange(fieldName, values){
    this.handleChange(fieldName, values)
  }

  handleSelectChange(event){
    this.handleChange(event.currentTarget.name, event.currentTarget.value);
  }
}

module.exports = QuestionEditor